<script>
  let { notes: initialNotes } = $props();

  let notes = $state([...initialNotes]);
  let showForm = $state(false);
  let text = $state('');

  function addNote() {
    if (!text.trim()) return;
    const now = new Date();
    const time = now.toTimeString().slice(0, 5).replace(':', '');
    notes = [
      { dt: `04/03 ${time}`, author: 'Trainee, PharmD', type: 'Pharmacy Note', text },
      ...notes
    ];
    text = '';
    showForm = false;
  }
</script>

<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
  <h2 style="font-size:15px;font-weight:600">Progress Notes</h2>
  <button class="btn bv" onclick={() => showForm = !showForm}>{showForm ? 'Cancel' : '+ Add Note'}</button>
</div>

{#if showForm}
  <div class="cd">
    <textarea class="ned" placeholder="Enter your clinical pharmacy note..." bind:value={text}></textarea>
    <div style="margin-top:10px;display:flex;gap:6px">
      <button class="btn bv" onclick={addNote}>Sign & Submit</button>
      <button class="btn" onclick={() => showForm = false}>Cancel</button>
    </div>
  </div>
{/if}

{#if notes.length === 0}
  <div class="cd"><p>No notes available.</p></div>
{:else}
  {#each notes as n}
    <div class="cd">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-weight:600;font-size:14px">{n.type}</span>
        <span style="font-size:13px;color:var(--t3);font-family:var(--m)">{n.dt}</span>
      </div>
      <p style="font-size:13px;color:var(--t3);margin-bottom:6px">{n.author}</p>
      <div class="pre">{n.text}</div>
    </div>
  {/each}
{/if}
