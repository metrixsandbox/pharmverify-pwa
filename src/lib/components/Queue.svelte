<script>
  import { orders, patients, showUpload, selectOrder, clearAll, resetDemo, difficulty, setDifficulty, setDisease } from '$lib/stores/app.js';
  import { DISEASES, DISEASE_CASES } from '$lib/data/diseases.js';

  let filter = $state('all');
  let selectedDisease = $state(null);
  let diseaseLevel = $state('medium');

  function pickDisease(id) {
    if (!DISEASE_CASES[id]) return;
    selectedDisease = id;
    setDisease(id, diseaseLevel);
  }
  function pickLevel(l) {
    diseaseLevel = l;
    if (selectedDisease) setDisease(selectedDisease, l);
  }

  let filtered = $derived(
    filter === 'stat' ? $orders.filter(o => o.priority === 'Stat') :
    filter === 'alerts' ? $orders.filter(o => o.alerts.length > 0) :
    $orders
  );

  let patientCount = $derived(new Set($orders.map(o => o.patientId)).size);

  const filters = [['all','All'],['stat','Stat'],['alerts','Alerts']];
  const difficulties = [
    ['default', 'Tutorial', 'Original demo orders'],
    ['easy', 'Easy', 'Every order has an issue \u2014 find it'],
    ['medium', 'Medium', 'Mix of correct and incorrect orders'],
    ['hard', 'Hard', 'Clinically nuanced \u2014 find the best action']
  ];
</script>

<div style="display:flex;flex-direction:column;height:100%">
  <div class="qhdr">
    <h1>Verification Queue <span class="ct">{$orders.length} orders &middot; {patientCount} patients</span></h1>
    <div class="qflt">
      {#each filters as [k, l]}
        <button class="fb" class:act={filter === k} onclick={() => filter = k}>{l}</button>
      {/each}
    </div>
    <div class="qact">
      <button class="fb fb-up" onclick={() => showUpload.set(true)}>&#x2B06; Import Cases</button>
      <button class="fb" onclick={resetDemo}>&#x21BA; Reset</button>
      {#if $orders.length > 0}
        <button class="fb fb-clr" onclick={clearAll}>&#x2715; Clear All</button>
      {/if}
    </div>
  </div>
  <div class="dz-bar">
    <span class="diff-label">Disease:</span>
    {#each DISEASES as d}
      {@const built = !!DISEASE_CASES[d.id]}
      <button class="dz-btn" class:act={selectedDisease === d.id} disabled={!built} title={built ? d.desc : 'Coming soon'} onclick={() => pickDisease(d.id)}>
        <span class="dz-ic">{d.icon}</span>{d.label}{#if !built}<span class="dz-soon">soon</span>{/if}
      </button>
    {/each}
    {#if selectedDisease}
      <span class="dz-sep"></span>
      {#each ['easy','medium','hard'] as l}
        <button class="fb" class:act={diseaseLevel === l} onclick={() => pickLevel(l)}>{l[0].toUpperCase() + l.slice(1)}</button>
      {/each}
    {/if}
  </div>
  <div class="diff-bar" data-tutorial="difficulty">
    <span class="diff-label">Difficulty:</span>
    {#each difficulties as [key, label, desc]}
      <button class="diff-btn diff-{key}" class:act={$difficulty === key} onclick={() => setDifficulty(key)}>{label}</button>
    {/each}
    <span class="diff-desc">{difficulties.find(d => d[0] === $difficulty)?.[2] || ''}</span>
  </div>
  <div class="qrhdr"><span>Patient</span><span>Medication</span><span>Pending</span><span>Priority</span><span>Alerts</span></div>
  <div class="ql" data-tutorial="queue">
    {#if filtered.length === 0}
      <div class="empty">
        <div class="big">{$orders.length === 0 ? '\u{1F4C2}' : '\u2713'}</div>
        <div style="font-size:16px;font-weight:600;color:{$orders.length === 0 ? 'var(--t2)' : 'var(--grn)'}">
          {$orders.length === 0 ? 'No Cases Loaded' : 'No Matching Orders'}
        </div>
        <div>{$orders.length === 0 ? 'Import a case file or reset to demo data' : 'Try a different filter'}</div>
        {#if $orders.length === 0}
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn bv" onclick={() => showUpload.set(true)}>&#x2B06; Import Cases</button>
            <button class="btn" onclick={resetDemo}>&#x21BA; Load Demo</button>
          </div>
        {/if}
      </div>
    {:else}
      {#each filtered as o (o.id)}
        {@const pt = $patients[o.patientId]}
        {#if pt}
          <div class="qr" onclick={() => selectOrder(o)}>
            <div>
              <div class="pt">{pt.name} <span style="font-weight:400;font-size:13px;color:var(--t3)">{pt.room}</span></div>
              <div class="dx">{pt.dx}</div>
            </div>
            <div>
              <div class="dr">{o.drugName.split(' ').slice(0, 4).join(' ')}{#if o.isNew}<span class="nb">New</span>{/if}</div>
              <div class="dl">{o.clinical?.dose}, {o.clinical?.route}, {o.clinical?.freq}</div>
            </div>
            <div class="tm">{o.timePending}</div>
            <div><span class="pri pri-{(o.priority || 'R')[0]}">{o.priority}</span></div>
            <div class="alc">
              {#if o.alerts.length > 0}
                <span style="color:{o.alerts.some(a => a.sev === 'critical') ? 'var(--red)' : o.alerts.some(a => a.sev === 'warning') ? 'var(--amb)' : 'var(--a)'}">{o.alerts.length}</span>
              {:else}
                &mdash;
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    {/if}
  </div>
</div>
