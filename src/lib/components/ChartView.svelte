<script>
  import { active, patients, goBack, verifyOrder, reviewMode, updatePatient, editMode } from '$lib/stores/app.js';
  import Editable from './Editable.svelte';

  // Top 10 common drug allergy reactions for the dropdown
  const REACTIONS = [
    'Rash',
    'Hives (urticaria)',
    'Itching (pruritus)',
    'Angioedema (lip/tongue swelling)',
    'Anaphylaxis',
    'Shortness of breath / bronchospasm',
    'Nausea / vomiting',
    'Diarrhea',
    'Stevens-Johnson syndrome (SJS)',
    'Tendon rupture'
  ];
  const SEVERITIES = ['Mild', 'Moderate', 'Severe', 'Life-threatening'];

  function normalizeAllergy(a) {
    if (!a) return { agent: '', severity: 'Moderate', reaction: '' };
    if (typeof a === 'string') return { agent: a, severity: 'Moderate', reaction: '' };
    return { agent: a.agent || '', severity: a.severity || 'Moderate', reaction: a.reaction || '' };
  }

  function updateAllergy(idx, patch) {
    const cur = ($patients[$active.patientId]?.allergies || []).map(normalizeAllergy);
    cur[idx] = { ...cur[idx], ...patch };
    updatePatient($active.patientId, { allergies: cur });
  }
  function addAllergy() {
    const cur = ($patients[$active.patientId]?.allergies || []).map(normalizeAllergy);
    updatePatient($active.patientId, { allergies: [...cur, { agent: 'New allergen', severity: 'Moderate', reaction: 'Rash' }] });
  }
  function removeAllergy(idx) {
    const cur = ($patients[$active.patientId]?.allergies || []).map(normalizeAllergy).filter((_, i) => i !== idx);
    updatePatient($active.patientId, { allergies: cur });
  }

  function allergyLabel(a) {
    const n = normalizeAllergy(a);
    if (!n.agent) return '';
    if (n.reaction) return `${n.agent} — ${n.reaction}`;
    return n.agent;
  }
  import VerifyTab from './tabs/VerifyTab.svelte';
  import HpTab from './tabs/HpTab.svelte';
  import NotesTab from './tabs/NotesTab.svelte';
  import LabsTab from './tabs/LabsTab.svelte';
  import HomeMedsTab from './tabs/HomeMedsTab.svelte';
  import InpatientMedsTab from './tabs/InpatientMedsTab.svelte';
  import ImagingTab from './tabs/ImagingTab.svelte';
  import CardioTab from './tabs/CardioTab.svelte';
  import Toast from './Toast.svelte';

  const TABS = ['Verify Order', 'H&P', 'Progress Notes', 'Labs', 'Imaging', 'Cardio', 'Home Meds', 'Inpatient Meds'];
  let tab = $state('Verify Order');
  let toasts = $state([]);

  let order = $derived($active);
  let patient = $derived($active ? $patients[$active.patientId] : null);

  function toast(message, type = 'ok') {
    const id = Date.now();
    toasts = [...toasts, { id, message, type }];
    setTimeout(() => { toasts = toasts.filter(t => t.id !== id); }, 3000);
  }

  function handleVerify() {
    if (order) {
      toast(`Order ${order.orderId} verified \u2713`);
      setTimeout(() => verifyOrder(order.id), 600);
    }
  }
</script>

{#if order && patient}
  <div class="ch">
    {#if $reviewMode}
      <div class="rev-banner">&#x1F441; Review mode &mdash; this attempt will not affect your stats</div>
    {/if}
    <div class="cban">
      <button class="bk" onclick={goBack}>&larr;</button>
      <div>
        <div class="nm"><Editable value={patient.name} onCommit={(v) => updatePatient(patient.id || $active.patientId, { name: v })} /></div>
        <div class="det">
          <span><span class="l">MRN</span><Editable value={patient.mrn} onCommit={(v) => updatePatient($active.patientId, { mrn: v })} /></span>
          <span><span class="l">Age</span><Editable value={patient.age} onCommit={(v) => updatePatient($active.patientId, { age: v })} /></span>
          <span><span class="l">Wt</span><Editable value={patient.weight} onCommit={(v) => updatePatient($active.patientId, { weight: v })} /></span>
          <span><span class="l">Room</span><Editable value={patient.room} onCommit={(v) => updatePatient($active.patientId, { room: v })} /></span>
          <span><span class="l">Admit</span><Editable value={patient.admitDate} onCommit={(v) => updatePatient($active.patientId, { admitDate: v })} /></span>
          <span><span class="l">Attending</span><Editable value={patient.attending} onCommit={(v) => updatePatient($active.patientId, { attending: v })} /></span>
        </div>
      </div>
      <div class="cbr">
        {#if !$editMode}
          {#each patient.allergies || [] as a}
            <span class="ag">&#x26A0; {allergyLabel(a) || a}</span>
          {/each}
        {/if}
        <span class="ctg">{patient.code || 'Full'}</span>
      </div>
    </div>

    {#if $editMode}
      <div class="alg-edit-bar">
        <div class="alg-edit-hd">
          <span class="alg-edit-ttl">&#x26A0; Allergies</span>
          <button type="button" class="btn bv" onclick={addAllergy}>+ Add allergy</button>
        </div>
        {#if (patient.allergies || []).length === 0}
          <div class="alg-edit-empty">No allergies recorded. Click "+ Add allergy" to add one.</div>
        {:else}
          <div class="alg-edit-rows">
            {#each (patient.allergies || []).map(normalizeAllergy) as a, i}
              <div class="alg-edit-row">
                <label class="alg-fld">
                  <span class="alg-lbl">Agent</span>
                  <input type="text" value={a.agent} oninput={(e) => updateAllergy(i, { agent: e.currentTarget.value })} placeholder="Drug name" />
                </label>
                <label class="alg-fld">
                  <span class="alg-lbl">Severity</span>
                  <select value={a.severity} onchange={(e) => updateAllergy(i, { severity: e.currentTarget.value })}>
                    {#each SEVERITIES as s}<option value={s}>{s}</option>{/each}
                  </select>
                </label>
                <label class="alg-fld">
                  <span class="alg-lbl">Reaction</span>
                  <select value={a.reaction} onchange={(e) => updateAllergy(i, { reaction: e.currentTarget.value })}>
                    <option value="">— select —</option>
                    {#each REACTIONS as r}<option value={r}>{r}</option>{/each}
                    {#if a.reaction && !REACTIONS.includes(a.reaction)}<option value={a.reaction}>{a.reaction}</option>{/if}
                  </select>
                </label>
                <button type="button" class="alg-rm" title="Remove allergy" onclick={() => removeAllergy(i)}>&#x2715;</button>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    <div class="cts">
      {#each TABS as t}
        <div class="ctab" class:act={tab === t} onclick={() => tab = t}>{t}</div>
      {/each}
    </div>
    <div class="cbd">
      {#if tab === 'Verify Order'}
        <VerifyTab {order} {patient} {toast} onVerify={handleVerify} />
      {:else if tab === 'H&P'}
        <HpTab hp={patient.hp} patientId={$active.patientId} />
      {:else if tab === 'Progress Notes'}
        <NotesTab notes={patient.notes || []} patientId={$active.patientId} />
      {:else if tab === 'Labs'}
        <LabsTab labs={patient.labs || {}} patientId={$active.patientId} />
      {:else if tab === 'Imaging'}
        <ImagingTab imaging={patient.imaging || []} patientId={$active.patientId} />
      {:else if tab === 'Cardio'}
        <CardioTab cardio={patient.cardio} patientId={$active.patientId} />
      {:else if tab === 'Home Meds'}
        <HomeMedsTab meds={patient.homeMeds || []} patientId={$active.patientId} />
      {:else if tab === 'Inpatient Meds'}
        <InpatientMedsTab meds={patient.inpatientMeds || []} patientId={$active.patientId} />
      {/if}
    </div>
    {#each toasts as t (t.id)}
      <Toast message={t.message} type={t.type} />
    {/each}
  </div>
{/if}
