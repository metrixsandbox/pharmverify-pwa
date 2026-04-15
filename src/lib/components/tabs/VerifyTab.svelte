<script>
  import { difficulty, reviewMode, editMode, updateOrder, updateOrderPath } from '$lib/stores/app.js';
  import Editable from '../Editable.svelte';
  import { recordAttempt } from '$lib/stores/metrics.js';
  let { order, patient, toast, onVerify } = $props();

  function track(action, isCorrect, grade) {
    if ($reviewMode) return;
    recordAttempt({
      orderId: order.id, orderDbId: order.orderId, patientId: order.patientId,
      drugName: order.drugName, difficulty: $difficulty,
      actionTaken: action, correctAction: order.teaching?.correctAction || action,
      isCorrect, grade: grade || null, rejectReasonsScore: null,
      orderSnapshot: order, patientSnapshot: patient
    });
  }

  const SEV = {
    critical: { bg: 'rgba(248,113,113,0.1)', bd: 'rgba(248,113,113,0.25)', c: '#f87171', d: '\u{1F534}' },
    warning: { bg: 'rgba(251,191,36,0.1)', bd: 'rgba(251,191,36,0.2)', c: '#fbbf24', d: '\u{1F7E1}' },
    info: { bg: 'rgba(91,138,245,0.08)', bd: 'rgba(91,138,245,0.15)', c: '#5b8af5', d: '\u{1F535}' }
  };

  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let vt = $state('clinical');
  let sched = $state(JSON.parse(JSON.stringify(order.schedule || [])));
  let editTarget = $state(null);
  let editValue = $state('');

  // Feedback modal state
  let feedback = $state(null); // { correct, title, message }
  // Reject reasons modal state
  let rejectModal = $state(null); // { reasons, selected: Set }
  // Reject results state
  let rejectResult = $state(null); // { correct, score, total, message }

  function openEdit(di, ti, v) {
    editTarget = { di, ti };
    editValue = v;
  }

  function saveEdit() {
    if (!editTarget) return;
    sched[editTarget.di].times[editTarget.ti] = editValue;
    sched = [...sched];
    editTarget = null;
    toast('Time updated');
  }

  function getLatestLab(key) {
    const labs = Object.values(patient.labs || {});
    if (!labs[0] || !labs[0][key]) return '\u2014';
    return Array.isArray(labs[0][key]) ? labs[0][key][0] : labs[0][key];
  }

  function calcCrCl() {
    const scr = parseFloat(getLatestLab('SCr'));
    const age = parseInt(patient.age);
    const wt = parseFloat(patient.weight);
    const female = (patient.age || '').includes('F');
    if (!scr || !age || !wt) return '\u2014';
    return Math.round(((140 - age) * wt) / (72 * scr) * (female ? 0.85 : 1)) + ' mL/min';
  }

  const GRADE_CONFIG = {
    optimal:    { title: 'Optimal!', icon: '\u2605', advances: true, css: 'fb-optimal' },
    acceptable: { title: 'Acceptable', icon: '\u2713', advances: true, css: 'fb-acceptable' },
    suboptimal: { title: 'Not Ideal', icon: '\u26A0', advances: false, css: 'fb-suboptimal' },
    incorrect:  { title: 'Incorrect', icon: '\u2717', advances: false, css: 'fb-incorrect' }
  };

  function handleAction(action) {
    const teaching = order.teaching;
    if (!teaching) {
      if (action === 'verify') { toast(`Order ${order.orderId} verified \u2713`); if (!$reviewMode) setTimeout(onVerify, 600); }
      else if (action === 'reject') toast('Order rejected', 'er');
      else if (action === 'message') toast('Message sent to prescriber', 'inf');
      return;
    }

    // Hard mode: graded feedback
    if (teaching.detailedFeedback) {
      const af = teaching.detailedFeedback[action];
      if (!af) { toast('Message sent to prescriber', 'inf'); return; }

      // If reject with reasons and grade is optimal/acceptable, show reasons first
      if (action === 'reject' && teaching.rejectReasons && (af.grade === 'optimal' || af.grade === 'acceptable')) {
        rejectModal = { reasons: shuffled(teaching.rejectReasons), selected: new Set() };
        return;
      }

      const gc = GRADE_CONFIG[af.grade];
      // For optimal reject, also show what would be better
      let betterMsg = '';
      if (af.grade !== 'optimal') {
        const optEntry = Object.entries(teaching.detailedFeedback).find(([, v]) => v.grade === 'optimal');
        if (optEntry) {
          const actionNames = { verify: 'Verify', reject: 'Reject', message: 'Message Prescriber' };
          betterMsg = `\n\nBetter choice: ${actionNames[optEntry[0]]} \u2014 ${optEntry[1].message}`;
        }
      }
      feedback = {
        correct: gc.advances,
        title: gc.title,
        message: af.message + betterMsg,
        grade: af.grade,
        graded: true
      };
      track(action, gc.advances, af.grade);
      return;
    }

    if (action === 'message') {
      toast('Message sent to prescriber', 'inf');
      return;
    }

    if (action === 'reject' && teaching.rejectReasons) {
      rejectModal = { reasons: shuffled(teaching.rejectReasons), selected: new Set() };
      return;
    }

    const isCorrect = teaching.correctAction === action;
    const actionLabels = { verify: 'verified', reject: 'rejected', message: 'sent to the prescriber' };
    feedback = {
      correct: isCorrect,
      title: isCorrect ? 'Correct!' : 'Incorrect',
      message: isCorrect
        ? teaching.explanation
        : `This order should have been ${actionLabels[teaching.correctAction] || teaching.correctAction}. ${teaching.explanation}`
    };
    track(action, isCorrect, null);
  }

  function toggleReason(id) {
    if (!rejectModal) return;
    const next = new Set(rejectModal.selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    rejectModal = { ...rejectModal, selected: next };
  }

  function submitRejectReasons() {
    if (!rejectModal) return;
    const teaching = order.teaching;
    const correctIds = new Set(rejectModal.reasons.filter(r => r.correct).map(r => r.id));
    const selectedIds = rejectModal.selected;
    const savedReasons = rejectModal.reasons;

    let correctPicks = 0;
    let totalCorrectReasons = correctIds.size;
    for (const id of selectedIds) {
      if (correctIds.has(id)) correctPicks++;
    }
    let falsePicks = 0;
    for (const id of selectedIds) {
      if (!correctIds.has(id)) falsePicks++;
    }

    const allCorrectSelected = correctPicks === totalCorrectReasons && falsePicks === 0;
    rejectModal = null;

    // Hard mode with graded feedback
    if (teaching.detailedFeedback) {
      const af = teaching.detailedFeedback.reject;
      const gc = GRADE_CONFIG[af.grade];
      const reasonMsg = allCorrectSelected
        ? ''
        : ` You identified ${correctPicks} of ${totalCorrectReasons} correct reason(s)${falsePicks > 0 ? ` and selected ${falsePicks} incorrect reason(s)` : ''}.`;
      feedback = {
        correct: gc.advances,
        title: allCorrectSelected ? gc.title : 'Partially Correct',
        message: af.message + reasonMsg,
        grade: af.grade,
        graded: true,
        showReasons: true,
        reasonDetails: savedReasons,
        selectedIds
      };
      track('reject', gc.advances, af.grade);
      return;
    }

    // Standard mode
    const isActionCorrect = teaching.correctAction === 'reject';

    if (!isActionCorrect) {
      rejectResult = null;
      feedback = {
        correct: false,
        title: 'Incorrect Action',
        message: `Rejecting this order was not the correct action. This order should have been ${teaching.correctAction === 'verify' ? 'verified' : 'sent to the prescriber for clarification'}. ${teaching.explanation}`
      };
      track('reject', false, null);
      return;
    }

    rejectResult = {
      correct: allCorrectSelected,
      score: correctPicks,
      total: totalCorrectReasons,
      falsePicks,
      reasons: savedReasons,
      selected: selectedIds,
      message: allCorrectSelected
        ? teaching.explanation
        : `You identified ${correctPicks} of ${totalCorrectReasons} correct reason(s)${falsePicks > 0 ? ` and selected ${falsePicks} incorrect reason(s)` : ''}. ${teaching.explanation}`
    };
    feedback = {
      correct: allCorrectSelected,
      title: allCorrectSelected ? 'Correct!' : 'Partially Correct',
      message: rejectResult.message,
      showReasons: true,
      reasonDetails: savedReasons,
      selectedIds
    };
    track('reject', allCorrectSelected, null);
  }

  function closeFeedback() {
    const wasCorrect = feedback?.correct;
    feedback = null;
    rejectResult = null;
    if (wasCorrect && !$reviewMode) {
      setTimeout(onVerify, 200);
    }
  }

  const clinicalFields = $derived([
    ['Order Dose', 'dose', order.clinical?.dose],
    ['Route', 'route', order.clinical?.route],
    ['Frequency', 'freq', order.clinical?.freq],
    ['Admin Duration', 'duration', order.clinical?.duration || ''],
    ['Rate', 'rate', order.clinical?.rate || ''],
    ['Volume', 'volume', order.clinical?.volume || ''],
    ['Priority', 'priority', order.clinical?.priority],
    ['Start', 'start', order.clinical?.start],
    ['Stop', 'stop', order.clinical?.stop || '']
  ]);

  const quickRef = $derived([
    ['SCr', getLatestLab('SCr')],
    ['K+', getLatestLab('K')],
    ['BUN', getLatestLab('BUN')],
    ['WBC', getLatestLab('WBC')],
    ['Weight', patient.weight]
  ]);

  const dispenseRows = $derived(order.dispense ? [
    ['Dispense From', order.dispense.from],
    ['First Doses', order.dispense.firstDose],
    ['Code', order.dispense.code],
    ['Triggered', order.dispense.triggered ? '\u2713 Yes' : 'No']
  ] : []);
</script>

<div class="vp">
  <div class="vpm">
    <div class="oh">
      <div class="od"><Editable value={order.drugName} onCommit={(v) => updateOrder(order.id, { drugName: v })} />{#if order.isNew}<span class="nb">New</span>{/if}</div>
      <div class="ol"><Editable value={order.orderLine} onCommit={(v) => updateOrder(order.id, { orderLine: v })} multiline /></div>
      <div class="oid">Order: <Editable value={order.orderId} onCommit={(v) => updateOrder(order.id, { orderId: v })} /></div>
      {#each order.alerts || [] as a}
        {@const s = SEV[a.sev] || SEV.info}
        <div class="ar" style="background:{s.bg};color:{s.c};border:1px solid {s.bd}">{s.d} {a.text}</div>
      {/each}
    </div>
    <div class="vts">
      {#each ['clinical', 'schedule', 'product'] as t}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="vt" class:act={vt === t} onclick={() => vt = t}>
          {t === 'clinical' ? 'Clinical Details' : t === 'schedule' ? 'Scheduled Times' : 'Product Info'}
        </div>
      {/each}
    </div>
    {#if vt === 'clinical' && order.clinical}
      <div class="cd" style="margin-bottom:0">
        <div class="cg">
          {#each clinicalFields as [label, key, value]}
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <div class="fg"><label>{label}</label><div class="fv"><Editable value={value} onCommit={(v) => updateOrderPath(order.id, `clinical.${key}`, v)} /></div></div>
          {/each}
        </div>
      </div>
    {/if}
    {#if vt === 'schedule'}
      <div class="cd" style="margin-bottom:0">
        <p style="font-size:13px;color:var(--t3);margin-bottom:10px">Click any time chip to edit.</p>
        <table class="stbl">
          <thead><tr><th>Date</th><th>Times</th></tr></thead>
          <tbody>
            {#each sched as row, di}
              <tr>
                <td>{row.date}</td>
                <td>
                  {#each row.times || [] as t, ti}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <span class="tc" onclick={() => openEdit(di, ti, t)}>{t}</span>
                  {/each}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
    {#if vt === 'product' && order.product}
      <div class="cd" style="margin-bottom:0">
        <table class="dtbl">
          <thead><tr><th>Product</th><th>Dose</th><th>Package</th></tr></thead>
          <tbody>
            <tr>
              <td style="font-weight:500;color:var(--a)">{order.product.name}</td>
              <td>{order.clinical?.dose}</td>
              <td style="font-size:13px;color:var(--t3)">{order.product.pkg}</td>
            </tr>
          </tbody>
        </table>
        {#if order.product.imageUrl}
          <div class="prod-img-wrap">
            <img src={order.product.imageUrl} alt={order.product.name} class="prod-img" />
            <p class="prod-img-src">Image: DailyMed / NLM</p>
          </div>
        {/if}
      </div>
    {/if}
    <div class="va">
      <button class="btn bv" onclick={() => handleAction('verify')}>&#x2713; Verify</button>
      <button class="btn br" onclick={() => handleAction('reject')}>&#x2715; Reject</button>
      <button class="btn" onclick={() => handleAction('message')}>&#x1F4AC; Message</button>
    </div>
  </div>
  <div class="vps">
    <div class="dp" style="margin-bottom:14px">
      <h3>Dispense Details</h3>
      {#each dispenseRows as [label, value]}
        <div class="drow"><span class="dll">{label}</span><span class="dvv">{value || '\u2014'}</span></div>
      {/each}
    </div>
    <div class="dp" style="margin-bottom:14px">
      <h3>Order Details</h3>
      <div class="drow"><span class="dll">Ordered By</span><span class="dvv" style="color:var(--a)"><Editable value={order.orderedBy} onCommit={(v) => updateOrder(order.id, { orderedBy: v })} /></span></div>
      <div class="drow"><span class="dll">Date/Time</span><span class="dvv"><Editable value={order.orderedDt} onCommit={(v) => updateOrder(order.id, { orderedDt: v })} /></span></div>
    </div>
    {#if $editMode}
      {@const t = order.teaching || {}}
      {@const reasons = t.rejectReasons || []}
      <div class="dp tch-edit" style="margin-bottom:14px">
        <h3>&#x270E; Teaching (preceptor)</h3>
        <div class="drow"><span class="dll">Correct action</span></div>
        <div style="display:flex;gap:6px;margin:4px 0 10px">
          {#each ['verify','reject','message'] as a}
            <button
              type="button"
              class="fb"
              class:act={t.correctAction === a}
              onclick={() => updateOrderPath(order.id, 'teaching.correctAction', a)}
            >{a[0].toUpperCase() + a.slice(1)}</button>
          {/each}
        </div>
        <div class="drow" style="margin-top:8px"><span class="dll">Explanation</span></div>
        <div style="margin-top:4px"><Editable value={t.explanation || ''} multiline onCommit={(v) => updateOrderPath(order.id, 'teaching.explanation', v)} /></div>

        <div class="drow" style="margin-top:14px;align-items:center">
          <span class="dll">Reject reasons</span>
          <button type="button" class="fb" onclick={() => {
            const next = [...reasons, { id: 'r' + (reasons.length + 1), text: 'New reason', correct: false }];
            updateOrderPath(order.id, 'teaching.rejectReasons', next);
          }}>+ Add</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px">
          {#each reasons as r, i}
            <div class="tch-reason">
              <button
                type="button"
                class="tch-toggle"
                class:on={r.correct}
                title={r.correct ? 'Correct reason — click to mark incorrect' : 'Incorrect reason — click to mark correct'}
                onclick={() => updateOrderPath(order.id, `teaching.rejectReasons.${i}.correct`, !r.correct)}
              >{r.correct ? '\u2713' : '\u2715'}</button>
              <div style="flex:1;font-size:12px"><Editable value={r.text} multiline onCommit={(v) => updateOrderPath(order.id, `teaching.rejectReasons.${i}.text`, v)} /></div>
              <button type="button" class="fb" title="Remove" onclick={() => {
                const next = reasons.filter((_, idx) => idx !== i);
                updateOrderPath(order.id, 'teaching.rejectReasons', next);
              }}>&#x2715;</button>
            </div>
          {/each}
          {#if reasons.length === 0}
            <div style="font-size:12px;color:var(--t3)">No reject reasons. Click + Add to create one.</div>
          {/if}
        </div>
      </div>
    {/if}
    <div class="dp">
      <h3>Quick Reference</h3>
      {#each quickRef as [label, value]}
        <div class="drow"><span class="dll">{label}</span><span class="dvv" style="font-family:var(--m)">{value}</span></div>
      {/each}
      <div class="drow"><span class="dll">CrCl (est)</span><span class="dvv" style="font-family:var(--m)">{calcCrCl()}</span></div>
      <div style="height:1px;background:var(--gbo);margin:6px 0"></div>
      <div class="drow"><span class="dll">Allergies</span><span class="dvv" style="color:var(--red);font-size:12px">{(patient.allergies || ['NKDA']).join(', ')}</span></div>
    </div>
  </div>

  <!-- Edit time modal -->
  {#if editTarget}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="tmo" onclick={() => editTarget = null}>
      <div class="tmb" onclick={(e) => e.stopPropagation()}>
        <h3>Edit Scheduled Time</h3>
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label style="font-size:12px;color:var(--t3);display:block;margin-bottom:4px">TIME (24HR)</label>
        <!-- svelte-ignore a11y_autofocus -->
        <input type="text" bind:value={editValue} maxlength="4" autofocus onkeydown={(e) => e.key === 'Enter' && saveEdit()} />
        <div class="tma">
          <button class="btn" onclick={() => editTarget = null}>Cancel</button>
          <button class="btn bv" onclick={saveEdit} style="padding:7px 14px">Save</button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Reject reasons modal -->
  {#if rejectModal}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="tmo" onclick={() => rejectModal = null}>
      <div class="tmb fb-modal" onclick={(e) => e.stopPropagation()}>
        <h3>Why are you rejecting this order?</h3>
        <p style="font-size:13px;color:var(--t3);margin-bottom:12px">Select all reasons that apply:</p>
        <div class="reject-reasons">
          {#each rejectModal.reasons as reason}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="reject-reason"
              class:selected={rejectModal.selected.has(reason.id)}
              onclick={() => toggleReason(reason.id)}
            >
              <span class="reject-check">{rejectModal.selected.has(reason.id) ? '\u2611' : '\u2610'}</span>
              <span>{reason.text}</span>
            </div>
          {/each}
        </div>
        <div class="tma" style="margin-top:14px">
          <button class="btn" onclick={() => rejectModal = null}>Cancel</button>
          <button
            class="btn bv"
            disabled={rejectModal.selected.size === 0}
            onclick={submitRejectReasons}
          >Submit</button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Feedback modal -->
  {#if feedback}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="tmo" onclick={closeFeedback}>
      <div class="tmb fb-modal" onclick={(e) => e.stopPropagation()}>
        <div class="fb-header" class:fb-correct={!feedback.graded && feedback.correct} class:fb-incorrect={!feedback.graded && !feedback.correct} class:fb-optimal={feedback.grade === 'optimal'} class:fb-acceptable={feedback.grade === 'acceptable'} class:fb-suboptimal={feedback.grade === 'suboptimal'} class:fb-grade-incorrect={feedback.grade === 'incorrect'}>
          <span class="fb-icon">{feedback.graded ? (GRADE_CONFIG[feedback.grade]?.icon || '\u2713') : (feedback.correct ? '\u2713' : '\u2717')}</span>
          <span class="fb-title">{feedback.title}</span>
          {#if feedback.graded}<span class="fb-grade-tag">{feedback.grade}</span>{/if}
        </div>
        <div class="fb-body">
          <p>{feedback.message}</p>
          {#if feedback.showReasons && feedback.reasonDetails}
            <div class="fb-reason-review">
              <p style="font-size:13px;font-weight:600;color:var(--t2);margin:12px 0 8px">Reason breakdown:</p>
              {#each feedback.reasonDetails as reason}
                {@const wasSelected = feedback.selectedIds?.has(reason.id)}
                {@const isCorrectReason = reason.correct}
                <div class="fb-reason-row" class:fb-reason-right={wasSelected === isCorrectReason} class:fb-reason-wrong={wasSelected !== isCorrectReason}>
                  <span class="fb-reason-icon">
                    {#if wasSelected && isCorrectReason}
                      &#x2713;
                    {:else if !wasSelected && !isCorrectReason}
                      &#x2713;
                    {:else if wasSelected && !isCorrectReason}
                      &#x2717;
                    {:else}
                      &#x25CB;
                    {/if}
                  </span>
                  <span class="fb-reason-text">{reason.text}</span>
                  <span class="fb-reason-tag">
                    {#if isCorrectReason}
                      {wasSelected ? 'Correct' : 'Missed'}
                    {:else}
                      {wasSelected ? 'Incorrect' : ''}
                    {/if}
                  </span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
        <div class="tma" style="margin-top:14px">
          <button class="btn bv" onclick={closeFeedback}>
            {feedback.correct ? 'Continue to Next Order' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
