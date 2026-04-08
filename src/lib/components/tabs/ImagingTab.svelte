<script>
  import Editable from '../Editable.svelte';
  import { updatePatientPath } from '$lib/stores/app.js';
  let { imaging, patientId } = $props();
  function set(i, key, value) {
    updatePatientPath(patientId, `imaging.${i}.${key}`, value);
  }
</script>

{#if !imaging || imaging.length === 0}
  <div class="cd"><p>No imaging studies available.</p></div>
{:else}
  {#each imaging as study, i}
    <div class="cd" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
        <div style="font-weight:600;color:var(--a);font-size:14px"><Editable value={study.type} onCommit={(v) => set(i, 'type', v)} /></div>
        <div style="font-size:14px;color:var(--t3)"><Editable value={study.date} onCommit={(v) => set(i, 'date', v)} /></div>
      </div>
      <div style="font-size:14px;color:var(--t3);margin-bottom:6px">Ordered by: <Editable value={study.orderedBy} onCommit={(v) => set(i, 'orderedBy', v)} /> &bull; Read by: <Editable value={study.readBy} onCommit={(v) => set(i, 'readBy', v)} /></div>
      <div style="font-size:14px;color:var(--t3);margin-bottom:8px"><span style="font-weight:600">Indication:</span> <Editable value={study.indication ?? ''} onCommit={(v) => set(i, 'indication', v)} /></div>
      <div style="font-size:14px;font-weight:600;color:var(--t2);margin-bottom:4px">Findings:</div>
      <div class="pre" style="font-size:13.5px;margin-bottom:8px;white-space:pre-wrap"><Editable value={study.findings} onCommit={(v) => set(i, 'findings', v)} multiline /></div>
      <div style="padding:8px 10px;background:rgba(91,138,245,.06);border:1px solid rgba(91,138,245,.12);border-radius:6px">
        <span style="font-size:14px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.03em">Impression: </span>
        <span style="font-size:14px;color:var(--t1)"><Editable value={study.impression} onCommit={(v) => set(i, 'impression', v)} multiline /></span>
      </div>
    </div>
  {/each}
{/if}
