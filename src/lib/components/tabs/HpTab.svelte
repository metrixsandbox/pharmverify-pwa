<script>
  let { hp } = $props();
</script>

{#if !hp}
  <div class="cd"><p>No H&P available for this patient.</p></div>
{:else}
  {#if hp.exam?.vitals}
    <div class="vi">
      {#each hp.exam.vitals.split('|') as v}
        {@const parts = v.trim().split(' ')}
        <div class="vit">
          <span class="vl">{parts[0]}</span>
          <span class="vv">{parts.slice(1).join(' ')}</span>
        </div>
      {/each}
    </div>
  {/if}
  <div class="g2">
    <div class="cd">
      <h3>Chief Complaint</h3>
      <p>{hp.cc}</p>
      <h3>HPI</h3>
      <p>{hp.hpi}</p>
    </div>
    <div class="cd">
      <h3>PMH</h3>
      <ul>{#each hp.pmh || [] as item}<li>{item}</li>{/each}</ul>
      <h3>Home Meds</h3>
      <ul>{#each hp.meds || [] as item}<li>{item}</li>{/each}</ul>
    </div>
  </div>
  {#if hp.exam}
    <div class="cd">
      <h3>Physical Exam</h3>
      <div class="peg">
        {#each Object.entries(hp.exam).filter(([k]) => k !== 'vitals') as [k, v]}
          <div class="pei">
            <div class="pl">{k}</div>
            <div class="pv">{v}</div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  <div class="cd">
    <h3>Assessment</h3>
    <p>{hp.assessment}</p>
    {#if hp.plan}
      <h3>Plan</h3>
      <ul>{#each hp.plan as item}<li>{item}</li>{/each}</ul>
    {/if}
  </div>
{/if}
