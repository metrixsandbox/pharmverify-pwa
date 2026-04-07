<script>
  let { cardio } = $props();

  const ekg = $derived(cardio?.ekg);
  const echo = $derived(cardio?.echo);
</script>

{#if !cardio}
  <div class="cd"><p>No cardiology data available.</p></div>
{:else}
  {#if ekg}
    <div class="cd" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
        <h3 style="margin:0">12-Lead EKG</h3>
        <div style="font-size:14px;color:var(--t3)">{ekg.date}</div>
      </div>
      <div style="font-size:14px;color:var(--t3);margin-bottom:10px">Interpreted by: {ekg.readBy}</div>
      <table class="dtbl" style="margin-bottom:12px">
        <thead><tr><th>Interval</th><th>Value</th><th>Normal</th><th>Flag</th></tr></thead>
        <tbody>
          {#each ekg.intervals as iv}
            {@const flag = iv.flag || ''}
            <tr>
              <td style="font-weight:500">{iv.name}</td>
              <td style="font-family:var(--m)" class:fH={flag === 'H'} class:fL={flag === 'L'}>{iv.value}</td>
              <td style="font-size:13px;color:var(--t3)">{iv.normal}</td>
              <td class:fH={flag === 'H'} class:fL={flag === 'L'}>{flag || '\u2014'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div style="font-size:13px;font-weight:600;color:var(--t2);margin-bottom:4px">Rhythm:</div>
      <div style="font-size:14px;color:var(--t1);margin-bottom:8px">{ekg.rhythm}</div>
      <div style="padding:8px 10px;background:rgba(91,138,245,.06);border:1px solid rgba(91,138,245,.12);border-radius:6px">
        <span style="font-size:14px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.03em">Interpretation: </span>
        <span style="font-size:14px;color:var(--t1)">{ekg.interpretation}</span>
      </div>
    </div>
  {/if}

  {#if echo}
    <div class="cd" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
        <h3 style="margin:0">Echocardiogram</h3>
        <div style="font-size:14px;color:var(--t3)">{echo.date}</div>
      </div>
      <div style="font-size:14px;color:var(--t3);margin-bottom:10px">Interpreted by: {echo.readBy}</div>
      <table class="dtbl" style="margin-bottom:12px">
        <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
        <tbody>
          {#each echo.findings as f}
            <tr>
              <td style="font-weight:500">{f.name}</td>
              <td style="font-family:var(--m);color:var(--t1)">{f.value}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div style="padding:8px 10px;background:rgba(91,138,245,.06);border:1px solid rgba(91,138,245,.12);border-radius:6px">
        <span style="font-size:14px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.03em">Impression: </span>
        <span style="font-size:14px;color:var(--t1)">{echo.impression}</span>
      </div>
    </div>
  {/if}
{/if}
