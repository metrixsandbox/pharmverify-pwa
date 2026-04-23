<script>
  import { fly, slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { customCases, blankPatient, blankOrder, createCase, updateCase, deleteCase, duplicateCase, exportCases, importCases } from '$lib/stores/casebuilder.js';
  import { patients, orders, view } from '$lib/stores/app.js';

  let mode = $state('list'); // list | edit
  let editingId = $state(null);
  let pt = $state(blankPatient());
  let ords = $state([blankOrder('temp')]);
  let activeTab = $state('patient');
  let activeOrdIdx = $state(0);
  let confirmDelete = $state(null);
  let importErr = $state('');

  function startNew() {
    editingId = null;
    pt = blankPatient();
    ords = [blankOrder('temp')];
    activeTab = 'patient';
    activeOrdIdx = 0;
    mode = 'edit';
  }

  function editExisting(c) {
    editingId = c.id;
    pt = structuredClone(c.patient);
    ords = structuredClone(c.orders);
    activeTab = 'patient';
    activeOrdIdx = 0;
    mode = 'edit';
  }

  function saveCase() {
    if (!pt.name.trim()) { alert('Patient name is required'); return; }
    if (ords.length === 0) { alert('At least one order is required'); return; }
    const validOrds = ords.filter(o => o.drugName.trim());
    if (validOrds.length === 0) { alert('At least one order needs a drug name'); return; }

    if (editingId) {
      updateCase(editingId, pt, validOrds);
    } else {
      createCase(pt, validOrds);
    }
    mode = 'list';
  }

  function addOrder() {
    ords = [...ords, blankOrder('temp')];
    activeOrdIdx = ords.length - 1;
  }

  function removeOrder(idx) {
    ords = ords.filter((_, i) => i !== idx);
    if (activeOrdIdx >= ords.length) activeOrdIdx = Math.max(0, ords.length - 1);
  }

  function addRejectReason(ordIdx) {
    ords[ordIdx].teaching.rejectReasons = [
      ...ords[ordIdx].teaching.rejectReasons,
      { id: 'r' + Date.now(), text: '', correct: false }
    ];
  }

  function removeRejectReason(ordIdx, rIdx) {
    ords[ordIdx].teaching.rejectReasons = ords[ordIdx].teaching.rejectReasons.filter((_, i) => i !== rIdx);
  }

  function loadCase(c) {
    const patientObj = { [c.patientId]: c.patient };
    patients.update(p => ({ ...p, ...patientObj }));
    orders.update(o => [...o, ...c.orders.map(ord => ({ ...ord, patientId: c.patientId }))]);
    view.set('queue');
  }

  function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const text = await file.text();
      const count = importCases(text);
      if (count > 0) {
        importErr = '';
      } else {
        importErr = 'No valid cases found in file';
        setTimeout(() => importErr = '', 3000);
      }
    };
    input.click();
  }

  function handleExport() {
    const json = exportCases();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pharmverify-custom-cases-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function addPmh() { pt.hp.pmh = [...pt.hp.pmh, '']; }
  function addMed() { pt.hp.meds = [...pt.hp.meds, '']; }
  function addPlan() { pt.hp.plan = [...pt.hp.plan, '']; }
  function addAllergy() { pt.allergies = [...pt.allergies, '']; }

  const ROUTES = ['Oral', 'IV', 'IVPB', 'IV Push', 'SQ', 'IM', 'Topical', 'Inhaled', 'Rectal', 'Ophthalmic'];
  const ACTIONS = [
    { value: 'verify', label: 'Verify' },
    { value: 'reject', label: 'Reject' },
    { value: 'message', label: 'Message Prescriber' }
  ];
</script>

<div class="cb-wrap">
  {#if mode === 'list'}
    <div class="cb-hdr">
      <h1>Case Builder</h1>
      <div class="cb-hdr-actions">
        {#if $customCases.length > 0}
          <button class="fb" onclick={handleExport}>&#x2B07; Export</button>
        {/if}
        <button class="fb" onclick={handleImport}>&#x2B06; Import</button>
        <button class="btn bv" onclick={startNew}>+ New Case</button>
      </div>
    </div>

    {#if importErr}
      <div class="cb-err" transition:slide={{ duration: 200 }}>{importErr}</div>
    {/if}

    {#if $customCases.length === 0}
      <div class="cb-empty">
        <div style="font-size:48px;opacity:.4">&#x1F3D7;</div>
        <div style="font-size:18px;font-weight:600;color:var(--t2)">No Custom Cases</div>
        <p style="font-size:14px;color:var(--t3);max-width:400px;text-align:center">
          Create your own patient cases and orders to use in the verification queue. Cases are saved locally and can be exported to share.
        </p>
        <button class="btn bv" style="margin-top:12px" onclick={startNew}>Create Your First Case</button>
      </div>
    {:else}
      <div class="cb-list">
        {#each $customCases as c, i (c.id)}
          <div class="cb-card" in:fly={{ y: 16, duration: 350, delay: i * 40, easing: quintOut }}>
            <div class="cb-card-main">
              <div class="cb-card-name">{c.patient.name || 'Unnamed Patient'}</div>
              <div class="cb-card-meta">
                <span>{c.patient.age || '—'}</span>
                <span>{c.patient.dx || 'No diagnosis'}</span>
                <span>{c.orders.length} order{c.orders.length !== 1 ? 's' : ''}</span>
              </div>
              <div class="cb-card-date">Created {new Date(c.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="cb-card-actions">
              <button class="cb-act-btn" title="Load into queue" onclick={() => loadCase(c)}>&#x25B6;</button>
              <button class="cb-act-btn" title="Edit" onclick={() => editExisting(c)}>&#x270E;</button>
              <button class="cb-act-btn" title="Duplicate" onclick={() => duplicateCase(c.id)}>&#x2398;</button>
              {#if confirmDelete === c.id}
                <button class="cb-act-btn cb-act-del" onclick={() => { deleteCase(c.id); confirmDelete = null; }}>Confirm</button>
                <button class="cb-act-btn" onclick={() => confirmDelete = null}>Cancel</button>
              {:else}
                <button class="cb-act-btn cb-act-del" title="Delete" onclick={() => confirmDelete = c.id}>&#x2717;</button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}

  {:else}
    <!-- EDIT MODE -->
    <div class="cb-hdr">
      <button class="cb-back" onclick={() => mode = 'list'}>&larr; Back</button>
      <h1>{editingId ? 'Edit Case' : 'New Case'}</h1>
      <button class="btn bv" onclick={saveCase}>Save Case</button>
    </div>

    <div class="cb-tabs">
      <button class="cb-tab" class:act={activeTab === 'patient'} onclick={() => activeTab = 'patient'}>Patient</button>
      <button class="cb-tab" class:act={activeTab === 'orders'} onclick={() => activeTab = 'orders'}>Orders ({ords.length})</button>
    </div>

    {#if activeTab === 'patient'}
      <div class="cb-section" transition:fly={{ x: -12, duration: 250 }}>
        <h2>Demographics</h2>
        <div class="cb-grid">
          <label class="cb-field">
            <span>Patient Name *</span>
            <input type="text" bind:value={pt.name} placeholder="LAST, FIRST MI" />
          </label>
          <label class="cb-field">
            <span>MRN</span>
            <input type="text" bind:value={pt.mrn} placeholder="00123456" />
          </label>
          <label class="cb-field">
            <span>DOB</span>
            <input type="text" bind:value={pt.dob} placeholder="MM/DD/YYYY" />
          </label>
          <label class="cb-field">
            <span>Age/Sex</span>
            <input type="text" bind:value={pt.age} placeholder="65M or 42F" />
          </label>
          <label class="cb-field">
            <span>Weight</span>
            <input type="text" bind:value={pt.weight} placeholder="78 kg" />
          </label>
          <label class="cb-field">
            <span>Height</span>
            <input type="text" bind:value={pt.height} placeholder="170 cm" />
          </label>
          <label class="cb-field">
            <span>Room</span>
            <input type="text" bind:value={pt.room} placeholder="4N-402A" />
          </label>
          <label class="cb-field">
            <span>Admit Date</span>
            <input type="text" bind:value={pt.admitDate} placeholder="MM/DD/YYYY" />
          </label>
          <label class="cb-field">
            <span>Attending</span>
            <input type="text" bind:value={pt.attending} placeholder="Smith, John, MD" />
          </label>
          <label class="cb-field cb-field-wide">
            <span>Diagnosis</span>
            <input type="text" bind:value={pt.dx} placeholder="e.g., Community-acquired pneumonia (J18.9)" />
          </label>
        </div>

        <h3>Allergies</h3>
        <div class="cb-list-edit">
          {#each pt.allergies as allergy, i}
            <div class="cb-list-row">
              <input type="text" bind:value={pt.allergies[i]} placeholder="Allergy (reaction)" />
              <button class="cb-rm" onclick={() => pt.allergies = pt.allergies.filter((_, j) => j !== i)}>&#x2717;</button>
            </div>
          {/each}
          <button class="cb-add-btn" onclick={addAllergy}>+ Add allergy</button>
        </div>

        <h2>H&P</h2>
        <label class="cb-field cb-field-wide">
          <span>Chief Complaint</span>
          <input type="text" bind:value={pt.hp.cc} placeholder="Shortness of breath x 3 days" />
        </label>
        <label class="cb-field cb-field-wide">
          <span>HPI</span>
          <textarea bind:value={pt.hp.hpi} rows="4" placeholder="History of present illness..."></textarea>
        </label>

        <h3>Past Medical History</h3>
        <div class="cb-list-edit">
          {#each pt.hp.pmh as item, i}
            <div class="cb-list-row">
              <input type="text" bind:value={pt.hp.pmh[i]} placeholder="e.g., HTN, T2DM" />
              <button class="cb-rm" onclick={() => pt.hp.pmh = pt.hp.pmh.filter((_, j) => j !== i)}>&#x2717;</button>
            </div>
          {/each}
          <button class="cb-add-btn" onclick={addPmh}>+ Add condition</button>
        </div>

        <h3>Home Medications</h3>
        <div class="cb-list-edit">
          {#each pt.hp.meds as med, i}
            <div class="cb-list-row">
              <input type="text" bind:value={pt.hp.meds[i]} placeholder="e.g., Lisinopril 10 mg PO daily" />
              <button class="cb-rm" onclick={() => pt.hp.meds = pt.hp.meds.filter((_, j) => j !== i)}>&#x2717;</button>
            </div>
          {/each}
          <button class="cb-add-btn" onclick={addMed}>+ Add medication</button>
        </div>

        <h2>Physical Exam</h2>
        <div class="cb-grid">
          <label class="cb-field cb-field-wide">
            <span>Vitals</span>
            <input type="text" bind:value={pt.hp.exam.vitals} placeholder="T 98.6 | HR 80 | BP 130/80 | RR 18 | SpO2 97% RA" />
          </label>
          <label class="cb-field">
            <span>CV</span>
            <input type="text" bind:value={pt.hp.exam.cv} placeholder="RRR, no m/r/g" />
          </label>
          <label class="cb-field">
            <span>Pulm</span>
            <input type="text" bind:value={pt.hp.exam.pulm} placeholder="CTAB" />
          </label>
          <label class="cb-field">
            <span>Ext</span>
            <input type="text" bind:value={pt.hp.exam.ext} placeholder="No edema" />
          </label>
          <label class="cb-field">
            <span>Neuro</span>
            <input type="text" bind:value={pt.hp.exam.neuro} placeholder="A&O x4" />
          </label>
        </div>

        <label class="cb-field cb-field-wide">
          <span>Assessment</span>
          <textarea bind:value={pt.hp.assessment} rows="3" placeholder="Clinical assessment..."></textarea>
        </label>

        <h3>Plan</h3>
        <div class="cb-list-edit">
          {#each pt.hp.plan as item, i}
            <div class="cb-list-row">
              <input type="text" bind:value={pt.hp.plan[i]} placeholder="Plan item..." />
              <button class="cb-rm" onclick={() => pt.hp.plan = pt.hp.plan.filter((_, j) => j !== i)}>&#x2717;</button>
            </div>
          {/each}
          <button class="cb-add-btn" onclick={addPlan}>+ Add plan item</button>
        </div>
      </div>

    {:else}
      <!-- ORDERS TAB -->
      <div class="cb-section" transition:fly={{ x: 12, duration: 250 }}>
        <div class="cb-ord-tabs">
          {#each ords as o, i}
            <button class="cb-ord-tab" class:act={activeOrdIdx === i} onclick={() => activeOrdIdx = i}>
              {o.drugName ? o.drugName.split(' ').slice(0, 2).join(' ') : `Order ${i + 1}`}
            </button>
          {/each}
          <button class="cb-ord-tab cb-ord-add" onclick={addOrder}>+</button>
        </div>

        {#if ords[activeOrdIdx]}
          {@const o = ords[activeOrdIdx]}
          {@const idx = activeOrdIdx}
          <div class="cb-ord-form">
            <div class="cb-grid">
              <label class="cb-field cb-field-wide">
                <span>Drug Name *</span>
                <input type="text" bind:value={ords[idx].drugName} placeholder="e.g., metoprolol tartrate 25 MG tablet" />
              </label>
              <label class="cb-field cb-field-wide">
                <span>Order Line</span>
                <input type="text" bind:value={ords[idx].orderLine} placeholder="e.g., 25 mg, Oral, BID" />
              </label>
              <label class="cb-field">
                <span>Dose</span>
                <input type="text" bind:value={ords[idx].clinical.dose} placeholder="25 mg" />
              </label>
              <label class="cb-field">
                <span>Route</span>
                <select bind:value={ords[idx].clinical.route}>
                  {#each ROUTES as r}<option>{r}</option>{/each}
                </select>
              </label>
              <label class="cb-field">
                <span>Frequency</span>
                <input type="text" bind:value={ords[idx].clinical.freq} placeholder="BID, TID, Q8H..." />
              </label>
              <label class="cb-field">
                <span>Priority</span>
                <select bind:value={ords[idx].priority}>
                  <option>Routine</option>
                  <option>Stat</option>
                  <option>Now</option>
                  <option>Timed</option>
                </select>
              </label>
              <label class="cb-field">
                <span>Ordered By</span>
                <input type="text" bind:value={ords[idx].orderedBy} placeholder="Smith, John, MD" />
              </label>
              <label class="cb-field">
                <span>Product Name</span>
                <input type="text" bind:value={ords[idx].product.name} placeholder="METOPROLOL TARTRATE 25MG TABS" />
              </label>
            </div>

            <h3>Teaching / Correct Action</h3>
            <div class="cb-grid">
              <label class="cb-field">
                <span>Correct Action</span>
                <select bind:value={ords[idx].teaching.correctAction}>
                  {#each ACTIONS as a}<option value={a.value}>{a.label}</option>{/each}
                </select>
              </label>
            </div>
            <label class="cb-field cb-field-wide">
              <span>Explanation (shown after grading)</span>
              <textarea bind:value={ords[idx].teaching.explanation} rows="4" placeholder="Explain why this action is correct..."></textarea>
            </label>

            {#if ords[idx].teaching.correctAction === 'reject'}
              <h3>Reject Reasons</h3>
              <div class="cb-list-edit">
                {#each ords[idx].teaching.rejectReasons as reason, ri}
                  <div class="cb-list-row cb-reason-row">
                    <label class="cb-check">
                      <input type="checkbox" bind:checked={ords[idx].teaching.rejectReasons[ri].correct} />
                      <span class="cb-check-mark">{reason.correct ? '&#x2713;' : ''}</span>
                    </label>
                    <input type="text" bind:value={ords[idx].teaching.rejectReasons[ri].text} placeholder="Reason text..." />
                    <button class="cb-rm" onclick={() => removeRejectReason(idx, ri)}>&#x2717;</button>
                  </div>
                {/each}
                <button class="cb-add-btn" onclick={() => addRejectReason(idx)}>+ Add reason</button>
                <p class="cb-hint">Check the box for correct reasons. Leave unchecked for distractors.</p>
              </div>
            {/if}

            <h3>Guideline Link (optional)</h3>
            <div class="cb-grid">
              <label class="cb-field">
                <span>Guideline Name</span>
                <input type="text" value={ords[idx].teaching.guideline?.name || ''}
                  oninput={(e) => {
                    if (!ords[idx].teaching.guideline) ords[idx].teaching.guideline = { name: '', url: '' };
                    ords[idx].teaching.guideline = { ...ords[idx].teaching.guideline, name: e.target.value };
                  }}
                  placeholder="e.g., AHA HF Guidelines 2022" />
              </label>
              <label class="cb-field">
                <span>URL</span>
                <input type="text" value={ords[idx].teaching.guideline?.url || ''}
                  oninput={(e) => {
                    if (!ords[idx].teaching.guideline) ords[idx].teaching.guideline = { name: '', url: '' };
                    ords[idx].teaching.guideline = { ...ords[idx].teaching.guideline, url: e.target.value };
                  }}
                  placeholder="https://..." />
              </label>
            </div>

            {#if ords.length > 1}
              <button class="cb-del-ord" onclick={() => removeOrder(idx)}>Remove this order</button>
            {/if}
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</div>
