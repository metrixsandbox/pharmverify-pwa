<script>
  import Editable from '../Editable.svelte';
  import { updatePatientPath } from '$lib/stores/app.js';
  let { cardio, patientId } = $props();

  const ekg = $derived(cardio?.ekg);
  const echo = $derived(cardio?.echo);

  function setEkg(path, value) { updatePatientPath(patientId, `cardio.ekg.${path}`, value); }
  function setEcho(path, value) { updatePatientPath(patientId, `cardio.echo.${path}`, value); }
</script>

{#if !cardio}
  <div class="cd"><p>No cardiology data available.</p></div>
{:else}
  {#if ekg}
    <div class="cd" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
        <h3 style="margin:0">12-Lead EKG</h3>
        <div style="font-size:14px;color:var(--t3)"><Editable value={ekg.date} onCommit={(v) => setEkg('date', v)} /></div>
      </div>
      <div style="font-size:14px;color:var(--t3);margin-bottom:10px">Interpreted by: <Editable value={ekg.readBy} onCommit={(v) => setEkg('readBy', v)} /></div>
      <table class="dtbl" style="margin-bottom:12px">
        <thead><tr><th>Interval</th><th>Value</th><th>Normal</th><th>Flag</th></tr></thead>
        <tbody>
          {#each ekg.intervals as iv, i}
            {@const flag = iv.flag || ''}
            <tr>
              <td style="font-weight:500"><Editable value={iv.name} onCommit={(v) => setEkg(`intervals.${i}.name`, v)} /></td>
              <td style="font-family:var(--m)" class:fH={flag === 'H'} class:fL={flag === 'L'}><Editable value={iv.value} onCommit={(v) => setEkg(`intervals.${i}.value`, v)} /></td>
              <td style="font-size:13px;color:var(--t3)"><Editable value={iv.normal} onCommit={(v) => setEkg(`intervals.${i}.normal`, v)} /></td>
              <td class:fH={flag === 'H'} class:fL={flag === 'L'}><Editable value={flag} onCommit={(v) => setEkg(`intervals.${i}.flag`, v)} /></td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div style="font-size:13px;font-weight:600;color:var(--t2);margin-bottom:4px">Rhythm:</div>
      <div style="font-size:14px;color:var(--t1);margin-bottom:8px"><Editable value={ekg.rhythm} onCommit={(v) => setEkg('rhythm', v)} /></div>
      <div style="padding:8px 10px;background:rgba(91,138,245,.06);border:1px solid rgba(91,138,245,.12);border-radius:6px">
        <span style="font-size:14px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.03em">Interpretation: </span>
        <span style="font-size:14px;color:var(--t1)"><Editable value={ekg.interpretation} onCommit={(v) => setEkg('interpretation', v)} multiline /></span>
      </div>
    </div>
  {/if}

  {#if echo}
    <div class="cd" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
        <h3 style="margin:0">Echocardiogram</h3>
        <div style="font-size:14px;color:var(--t3)"><Editable value={echo.date} onCommit={(v) => setEcho('date', v)} /></div>
      </div>
      <div style="font-size:14px;color:var(--t3);margin-bottom:10px">Interpreted by: <Editable value={echo.readBy} onCommit={(v) => setEcho('readBy', v)} /></div>
      <table class="dtbl" style="margin-bottom:12px">
        <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
        <tbody>
          {#each echo.findings as f, i}
            <tr>
              <td style="font-weight:500"><Editable value={f.name} onCommit={(v) => setEcho(`findings.${i}.name`, v)} /></td>
              <td style="font-family:var(--m);color:var(--t1)"><Editable value={f.value} onCommit={(v) => setEcho(`findings.${i}.value`, v)} /></td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div style="padding:8px 10px;background:rgba(91,138,245,.06);border:1px solid rgba(91,138,245,.12);border-radius:6px">
        <span style="font-size:14px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.03em">Impression: </span>
        <span style="font-size:14px;color:var(--t1)"><Editable value={echo.impression} onCommit={(v) => setEcho('impression', v)} multiline /></span>
      </div>
    </div>
  {/if}
{/if}
