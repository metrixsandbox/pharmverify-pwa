<script>
  import { slide } from 'svelte/transition';
  let { tree } = $props();
  let expanded = $state(false);
</script>

{#if tree?.steps?.length}
  <div class="dt">
    <button type="button" class="dt-toggle" onclick={() => expanded = !expanded} aria-expanded={expanded}>
      <span class="dt-icon">&#x1F9E0;</span>
      <span class="dt-label">{tree.title || 'Clinical Reasoning'}</span>
      <span class="dt-chev" class:dt-chev-open={expanded}>&#x25BE;</span>
    </button>
    {#if expanded}
      <div class="dt-body" transition:slide={{ duration: 220 }}>
        <ol class="dt-steps">
          {#each tree.steps as step, i}
            <li class="dt-step">
              <div class="dt-step-num">{i + 1}</div>
              <div class="dt-step-content">
                <div class="dt-step-q">{step.q}</div>
                <div class="dt-step-a">
                  <span class="dt-step-check" class:dt-step-no={step.icon === 'x'} class:dt-step-warn={step.icon === 'warn'}>
                    {step.icon === 'x' ? '✗' : step.icon === 'warn' ? '!' : '→'}
                  </span>
                  <span>{step.a}</span>
                </div>
              </div>
            </li>
          {/each}
        </ol>
        {#if tree.conclusion}
          <div class="dt-conclusion">
            <span class="dt-conclusion-lbl">Conclusion</span>
            <span class="dt-conclusion-txt">{tree.conclusion}</span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/if}
