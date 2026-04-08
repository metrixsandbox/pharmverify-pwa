<script>
  import Editable from '../Editable.svelte';
  import { editMode, updatePatientPath, updatePatient, patients } from '$lib/stores/app.js';

  let { meds, patientId } = $props();

  let sorted = $derived([...(meds || [])].sort((a, b) => (a.drug || '').localeCompare(b.drug || '')));

  function set(idx, key, val) {
    // find original index in unsorted list
    const orig = ($patients[patientId]?.homeMeds || []).findIndex(m => m === sorted[idx]);
    if (orig >= 0) updatePatientPath(patientId, `homeMeds.${orig}.${key}`, val);
  }

  function addRow() {
    const cur = $patients[patientId]?.homeMeds || [];
    updatePatient(patientId, { homeMeds: [...cur, { drug: 'New medication', freq: 'Daily', status: 'Active' }] });
  }

  function removeRow(idx) {
    const target = sorted[idx];
    const cur = $patients[patientId]?.homeMeds || [];
    updatePatient(patientId, { homeMeds: cur.filter(m => m !== target) });
  }
</script>

{#if (!meds || meds.length === 0) && !$editMode}
  <div class="cd"><p>No home medications documented.</p></div>
{:else}
  <div class="cd">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h2>Home Medications</h2>
      {#if $editMode}<button class="btn bv" onclick={addRow}>+ Add</button>{/if}
    </div>
    <table class="dtbl">
      <thead><tr><th>Medication</th><th>Freq</th><th>Status</th>{#if $editMode}<th></th>{/if}</tr></thead>
      <tbody>
        {#each sorted as m, i}
          <tr>
            <td style="font-weight:500"><Editable value={m.drug} onCommit={(v) => set(i, 'drug', v)} /></td>
            <td><Editable value={m.freq} onCommit={(v) => set(i, 'freq', v)} /></td>
            <td>
              {#if $editMode}
                <Editable value={m.status} onCommit={(v) => set(i, 'status', v)} />
              {:else if m.status === 'NOT TAKING'}
                <span class="sn">{m.status}</span>
              {:else}
                <span class="sa">{m.status}</span>
              {/if}
            </td>
            {#if $editMode}<td><button class="btn" onclick={() => removeRow(i)}>&#x2715;</button></td>{/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
