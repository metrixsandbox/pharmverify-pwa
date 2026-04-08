<script>
  import Editable from '../Editable.svelte';
  import { editMode, updatePatient, updatePatientPath, patients } from '$lib/stores/app.js';

  let { notes, patientId } = $props();

  let showForm = $state(false);
  let text = $state('');

  function addNote() {
    if (!text.trim()) return;
    const now = new Date();
    const time = now.toTimeString().slice(0, 5).replace(':', '');
    const dt = `${String(now.getMonth() + 1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')} ${time}`;
    const newNote = { dt, author: 'Trainee, PharmD', type: 'Pharmacy Note', text };
    updatePatient(patientId, { notes: [newNote, ...(notes || [])] });
    text = '';
    showForm = false;
  }

  function removeNote(idx) {
    const cur = $patients[patientId]?.notes || [];
    updatePatient(patientId, { notes: cur.filter((_, i) => i !== idx) });
  }

  function set(idx, key, val) {
    updatePatientPath(patientId, `notes.${idx}.${key}`, val);
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
      <button class="btn bv" onclick={addNote}>Sign &amp; Submit</button>
      <button class="btn" onclick={() => showForm = false}>Cancel</button>
    </div>
  </div>
{/if}

{#if (!notes || notes.length === 0) && !$editMode}
  <div class="cd"><p>No notes available.</p></div>
{:else}
  {#each notes as n, i}
    <div class="cd">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;align-items:center">
        <span style="font-weight:600;font-size:14px"><Editable value={n.type} onCommit={(v) => set(i, 'type', v)} /></span>
        <span style="display:flex;gap:8px;align-items:center">
          <span style="font-size:13px;color:var(--t3);font-family:var(--m)"><Editable value={n.dt} onCommit={(v) => set(i, 'dt', v)} /></span>
          {#if $editMode}<button class="btn" onclick={() => removeNote(i)}>&#x2715;</button>{/if}
        </span>
      </div>
      <p style="font-size:13px;color:var(--t3);margin-bottom:6px"><Editable value={n.author} onCommit={(v) => set(i, 'author', v)} /></p>
      <div class="pre"><Editable value={n.text} onCommit={(v) => set(i, 'text', v)} multiline /></div>
    </div>
  {/each}
{/if}
