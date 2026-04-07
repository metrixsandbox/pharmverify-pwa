<script>
  import { active, patients, goBack, verifyOrder, reviewMode } from '$lib/stores/app.js';
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
        <div class="nm">{patient.name}</div>
        <div class="det">
          <span><span class="l">MRN</span>{patient.mrn}</span>
          <span><span class="l">Age</span>{patient.age}</span>
          <span><span class="l">Wt</span>{patient.weight}</span>
          <span><span class="l">Room</span>{patient.room}</span>
          <span><span class="l">Admit</span>{patient.admitDate}</span>
          <span><span class="l">Attending</span>{patient.attending}</span>
        </div>
      </div>
      <div class="cbr">
        {#each patient.allergies || [] as a}
          <span class="ag">&#x26A0; {a}</span>
        {/each}
        <span class="ctg">{patient.code || 'Full'}</span>
      </div>
    </div>
    <div class="cts">
      {#each TABS as t}
        <div class="ctab" class:act={tab === t} onclick={() => tab = t}>{t}</div>
      {/each}
    </div>
    <div class="cbd">
      {#if tab === 'Verify Order'}
        <VerifyTab {order} {patient} {toast} onVerify={handleVerify} />
      {:else if tab === 'H&P'}
        <HpTab hp={patient.hp} />
      {:else if tab === 'Progress Notes'}
        <NotesTab notes={patient.notes || []} />
      {:else if tab === 'Labs'}
        <LabsTab labs={patient.labs || {}} />
      {:else if tab === 'Imaging'}
        <ImagingTab imaging={patient.imaging || []} />
      {:else if tab === 'Cardio'}
        <CardioTab cardio={patient.cardio} />
      {:else if tab === 'Home Meds'}
        <HomeMedsTab meds={[...(patient.homeMeds || [])].sort((a, b) => (a.drug || '').localeCompare(b.drug || ''))} />
      {:else if tab === 'Inpatient Meds'}
        <InpatientMedsTab meds={[...(patient.inpatientMeds || [])].sort((a, b) => (a.drug || '').localeCompare(b.drug || ''))} />
      {/if}
    </div>
    {#each toasts as t (t.id)}
      <Toast message={t.message} type={t.type} />
    {/each}
  </div>
{/if}
