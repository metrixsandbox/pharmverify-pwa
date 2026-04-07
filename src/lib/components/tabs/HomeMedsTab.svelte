<script>
  let { meds } = $props();
</script>

{#if !meds || meds.length === 0}
  <div class="cd"><p>No home medications documented.</p></div>
{:else}
  <div class="cd">
    <h2>Home Medications</h2>
    <table class="dtbl">
      <thead><tr><th>Medication</th><th>Freq</th><th>Status</th></tr></thead>
      <tbody>
        {#each meds as m}
          <tr>
            <td style="font-weight:500">{m.drug}</td>
            <td>{m.freq}</td>
            <td>
              {#if m.status === 'NOT TAKING'}
                <span class="sn">{m.status}</span>
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
