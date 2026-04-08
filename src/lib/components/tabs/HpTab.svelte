<script>
  import Editable from '../Editable.svelte';
  import { updatePatientPath } from '$lib/stores/app.js';

  let { hp, patientId } = $props();

  function set(path, value) {
    updatePatientPath(patientId, `hp.${path}`, value);
  }
</script>

{#if !hp}
  <div class="cd"><p>No H&P available for this patient.</p></div>
{:else}
  {#if hp.exam?.vitals}
    {@const vitals = hp.exam.vitals.split('|').map(v => {
      const p = v.trim().split(' ');
      return { label: p[0], value: p.slice(1).join(' ') };
    })}
    <div class="vi">
      {#each vitals as vt, i}
        <div class="vit">
          <span class="vl"><Editable value={vt.label} onCommit={(nv) => {
            const next = vitals.map((x, idx) => idx === i ? { ...x, label: nv } : x);
            set('exam.vitals', next.map(x => `${x.label} ${x.value}`).join(' | '));
          }} /></span>
          <span class="vv"><Editable value={vt.value} onCommit={(nv) => {
            const next = vitals.map((x, idx) => idx === i ? { ...x, value: nv } : x);
            set('exam.vitals', next.map(x => `${x.label} ${x.value}`).join(' | '));
          }} /></span>
        </div>
      {/each}
    </div>
  {/if}
  <div class="g2">
    <div class="cd">
      <h3>Chief Complaint</h3>
      <p><Editable value={hp.cc} onCommit={(v) => set('cc', v)} multiline /></p>
      <h3>HPI</h3>
      <p><Editable value={hp.hpi} onCommit={(v) => set('hpi', v)} multiline /></p>
    </div>
    <div class="cd">
      <h3>PMH</h3>
      <ul>
        {#each hp.pmh || [] as item, i}
          <li><Editable value={item} onCommit={(v) => set(`pmh.${i}`, v)} /></li>
        {/each}
      </ul>
      <h3>Home Meds</h3>
      <ul>
        {#each hp.meds || [] as item, i}
          <li><Editable value={item} onCommit={(v) => set(`meds.${i}`, v)} /></li>
        {/each}
      </ul>
    </div>
  </div>
  {#if hp.exam}
    <div class="cd">
      <h3>Physical Exam</h3>
      <div class="peg">
        {#each Object.entries(hp.exam).filter(([k]) => k !== 'vitals') as [k, v]}
          <div class="pei">
            <div class="pl">{k}</div>
            <div class="pv"><Editable value={v} onCommit={(nv) => set(`exam.${k}`, nv)} multiline /></div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  <div class="cd">
    <h3>Assessment</h3>
    <p><Editable value={hp.assessment} onCommit={(v) => set('assessment', v)} multiline /></p>
    {#if hp.plan}
      <h3>Plan</h3>
      <ul>
        {#each hp.plan as item, i}
          <li><Editable value={item} onCommit={(v) => set(`plan.${i}`, v)} /></li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
