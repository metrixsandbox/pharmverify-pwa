<script>
  import { editMode } from '$lib/stores/app.js';
  import { tick } from 'svelte';

  let { value, onCommit, multiline = false, placeholder = '—', inputClass = '' } = $props();

  let editing = $state(false);
  let draft = $state('');
  let inputEl = $state();

  async function start() {
    if (!$editMode || editing) return;
    draft = value ?? '';
    editing = true;
    await tick();
    inputEl?.focus();
    if (inputEl?.select) inputEl.select();
  }

  function commit() {
    editing = false;
    if (draft !== value) onCommit?.(draft);
  }

  function cancel() {
    editing = false;
  }

  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); cancel(); }
    else if (e.key === 'Enter' && (!multiline || e.metaKey || e.ctrlKey)) { e.preventDefault(); commit(); }
  }
</script>

{#if editing}
  {#if multiline}
    <textarea
      bind:this={inputEl}
      bind:value={draft}
      class="ed-input ed-ta {inputClass}"
      onblur={commit}
      onkeydown={onKey}
    ></textarea>
  {:else}
    <input
      bind:this={inputEl}
      bind:value={draft}
      class="ed-input {inputClass}"
      onblur={commit}
      onkeydown={onKey}
    />
  {/if}
{:else}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span
    class="ed"
    class:ed-on={$editMode}
    onclick={start}
    title={$editMode ? 'Click to edit' : ''}
  >{value || (($editMode) ? placeholder : '')}</span>
{/if}
