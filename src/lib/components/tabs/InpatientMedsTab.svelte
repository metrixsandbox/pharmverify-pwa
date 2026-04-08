<script>
  import Editable from '../Editable.svelte';
  import { editMode, updatePatientPath, updatePatient, patients } from '$lib/stores/app.js';

  let { meds, patientId } = $props();

  let sorted = $derived([...(meds || [])].sort((a, b) => (a.drug || '').localeCompare(b.drug || '')));

  function set(idx, key, val) {
    const orig = ($patients[patientId]?.inpatientMeds || []).findIndex(m => m === sorted[idx]);
    if (orig >= 0) updatePatientPath(patientId, `inpatientMeds.${orig}.${key}`, val);
  }

  function addRow() {
    const cur = $patients[patientId]?.inpatientMeds || [];
    updatePatient(patientId, { inpatientMeds: [...cur, { drug: 'New medication', dose: '', route: 'IV', freq: 'Daily', sched: [], status: 'Active' }] });
  }

  function removeRow(idx) {
    const target = sorted[idx];
    const cur = $patients[patientId]?.inpatientMeds || [];
    updatePatient(patientId, { inpatientMeds: cur.filter(m => m !== target) });
  }
</script>

{#if (!meds || meds.length === 0) && !$editMode}
  <div class="cd"><p>No inpatient orders.</p></div>
{:else}
  <div class="cd">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h2>Active Inpatient Orders</h2>
      {#if $editMode}<button class="btn bv" onclick={addRow}>+ Add</button>{/if}
    </div>
    <table class="dtbl">
      <thead><tr><th>Medication</th><th>Dose</th><th>Route</th><th>Freq</th><th>Schedule</th><th>Status</th>{#if $editMode}<th></th>{/if}</tr></thead>
      <tbody>
        {#each sorted as m, i}
          <tr>
            <td style="font-weight:500"><Editable value={m.drug} onCommit={(v) => set(i, 'drug', v)} /></td>
            <td style="font-family:var(--m)"><Editable value={m.dose} onCommit={(v) => set(i, 'dose', v)} /></td>
            <td><Editable value={m.route} onCommit={(v) => set(i, 'route', v)} /></td>
            <td><Editable value={m.freq} onCommit={(v) => set(i, 'freq', v)} /></td>
            <td style="font-family:var(--m);font-size:13px"><Editable value={(m.sched || []).join(', ')} onCommit={(v) => set(i, 'sched', v.split(',').map(s => s.trim()).filter(Boolean))} /></td>
            <td>
              {#if $editMode}
                <Editable value={m.status} onCommit={(v) => set(i, 'status', v)} />
              {:else if m.status === 'Held'}
                <span class="sh">{m.status}</span>
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
