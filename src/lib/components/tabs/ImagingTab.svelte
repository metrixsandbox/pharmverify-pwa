<script>
  let { imaging } = $props();
</script>

{#if !imaging || imaging.length === 0}
  <div class="cd"><p>No imaging studies available.</p></div>
{:else}
  {#each imaging as study}
    <div class="cd" style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px">
        <div style="font-weight:600;color:var(--a);font-size:14px">{study.type}</div>
        <div style="font-size:14px;color:var(--t3)">{study.date}</div>
      </div>
      <div style="font-size:14px;color:var(--t3);margin-bottom:6px">Ordered by: {study.orderedBy} &bull; Read by: {study.readBy}</div>
      {#if study.indication}
        <div style="font-size:14px;color:var(--t3);margin-bottom:8px"><span style="font-weight:600">Indication:</span> {study.indication}</div>
      {/if}
      <div style="font-size:14px;font-weight:600;color:var(--t2);margin-bottom:4px">Findings:</div>
      <div class="pre" style="font-size:13.5px;margin-bottom:8px;white-space:pre-wrap">{study.findings}</div>
      <div style="padding:8px 10px;background:rgba(91,138,245,.06);border:1px solid rgba(91,138,245,.12);border-radius:6px">
        <span style="font-size:14px;font-weight:600;color:var(--t3);text-transform:uppercase;letter-spacing:.03em">Impression: </span>
        <span style="font-size:14px;color:var(--t1)">{study.impression}</span>
      </div>
    </div>
  {/each}
{/if}
