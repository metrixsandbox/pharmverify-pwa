<script>
  let { meds } = $props();
</script>

{#if !meds || meds.length === 0}
  <div class="cd"><p>No inpatient orders.</p></div>
{:else}
  <div class="cd">
    <h2>Active Inpatient Orders</h2>
    <table class="dtbl">
      <thead><tr><th>Medication</th><th>Dose</th><th>Route</th><th>Freq</th><th>Schedule</th><th>Status</th></tr></thead>
      <tbody>
        {#each meds as m}
          <tr>
            <td style="font-weight:500">{m.drug}</td>
            <td style="font-family:var(--m)">{m.dose}</td>
            <td>{m.route}</td>
            <td>{m.freq}</td>
            <td style="font-family:var(--m);font-size:13px">{(m.sched || []).join(', ')}</td>
            <td>
              {#if m.status === 'Held'}
                <span class="sh">{m.status}</span>
              {:else}
                <span class="sa">{m.status}</span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
