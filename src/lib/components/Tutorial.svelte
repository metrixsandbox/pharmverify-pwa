<script>
  import { onMount } from 'svelte';

  let step = $state(0);
  let visible = $state(false);
  let spotStyle = $state('');
  let tipPos = $state('');

  const STEPS = [
    {
      title: 'Welcome to PharmVerify',
      body: 'This is an inpatient pharmacist order verification training tool. You\'ll review simulated medication orders and decide whether each one is safe to dispense — just like a real clinical pharmacist.',
      target: null
    },
    {
      title: 'Navigation Sidebar',
      body: 'This is your command center. Access the work queue, view your performance metrics, toggle dark/light mode, import additional cases, and sign out.',
      target: '[data-tutorial="sidebar"]'
    },
    {
      title: 'The Work Queue',
      body: 'Medication orders awaiting your review appear here. Each row shows the patient, drug, time pending, and priority. Click any order to open the full patient chart.',
      target: '[data-tutorial="queue"]'
    },
    {
      title: 'Difficulty Levels',
      body: 'Start with Tutorial to learn the basics. Easy mode hints at errors. Medium mixes correct and incorrect orders. Hard mode grades your clinical judgment on a spectrum from Optimal to Incorrect.',
      target: '[data-tutorial="difficulty"]'
    },
    {
      title: 'Verify vs. Reject — The Core Decision',
      body: null,
      target: null,
      custom: true
    },
    {
      title: 'You\'re Ready!',
      body: 'Click any order in the queue to begin. Review the full chart — H&P, labs, imaging, meds — before making your call. Good luck!',
      target: null
    }
  ];

  function positionSpotlight() {
    const s = STEPS[step];
    if (!s.target) {
      spotStyle = '';
      tipPos = '';
      return;
    }
    const el = document.querySelector(s.target);
    if (!el) { spotStyle = ''; tipPos = ''; return; }
    const r = el.getBoundingClientRect();
    const pad = 6;
    spotStyle = `left:${r.left - pad}px;top:${r.top - pad}px;width:${r.width + pad * 2}px;height:${r.height + pad * 2}px;`;
    // Tip card dimensions
    const cardW = 420;
    const cardH = 260;
    const margin = 16;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left, top;
    // Try right of target
    if (r.right + 20 + cardW + margin < vw) {
      left = r.right + 20;
      top = r.top;
    } else if (r.left - 20 - cardW > margin) {
      // Try left of target
      left = r.left - 20 - cardW;
      top = r.top;
    } else if (r.bottom + 20 + cardH + margin < vh) {
      // Try below
      left = r.left;
      top = r.bottom + 20;
    } else if (r.top - 20 - cardH > margin) {
      // Try above
      left = r.left;
      top = r.top - 20 - cardH;
    } else {
      // Fallback: center on screen
      left = (vw - cardW) / 2;
      top = (vh - cardH) / 2;
    }
    // Clamp to viewport
    left = Math.max(margin, Math.min(left, vw - cardW - margin));
    top = Math.max(margin, Math.min(top, vh - cardH - margin));
    tipPos = `left:${left}px;top:${top}px;`;
  }

  function next() {
    if (step < STEPS.length - 1) {
      step++;
      requestAnimationFrame(() => positionSpotlight());
    } else {
      finish();
    }
  }

  function finish() {
    visible = false;
    localStorage.setItem('pv-tutorial-done', '1');
  }

  onMount(() => {
    visible = true;
    positionSpotlight();
    const onResize = () => positionSpotlight();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  let current = $derived(STEPS[step]);
  let isLast = $derived(step === STEPS.length - 1);
  let progress = $derived(`${step + 1} / ${STEPS.length}`);
</script>

{#if visible}
  <div class="tut-overlay">
    <!-- Dim backdrop -->
    <div class="tut-backdrop"></div>

    <!-- Spotlight cutout -->
    {#if spotStyle}
      <div class="tut-spot" style={spotStyle}></div>
    {/if}

    <!-- Tip card -->
    {#if current.custom}
      <!-- Special verify vs reject step -->
      <div class="tut-card tut-center">
        <div class="tut-progress">{progress}</div>
        <h2 class="tut-title">{current.title}</h2>
        <p class="tut-body">Every order comes down to one question: <strong>Is this medication safe and appropriate for this patient?</strong></p>

        <div class="tut-decision">
          <div class="tut-dec-box tut-dec-verify">
            <div class="tut-dec-icon">&#x2713;</div>
            <div class="tut-dec-label">Verify</div>
            <p>The order is <strong>correct</strong> — right drug, right dose, right route, right frequency, no interactions or contraindications. Safe to dispense.</p>
          </div>
          <div class="tut-dec-vs">vs.</div>
          <div class="tut-dec-box tut-dec-reject">
            <div class="tut-dec-icon">&#x2715;</div>
            <div class="tut-dec-label">Reject</div>
            <p>Something is <strong>wrong</strong> — drug allergy, dangerous interaction, incorrect dose, contraindication, or clinical mismatch. Needs prescriber review.</p>
          </div>
        </div>

        <p class="tut-body" style="margin-top:12px;font-size:13px;color:var(--t3)">Always review the full chart before deciding: labs, vitals, allergies, imaging, and clinical notes. In real practice, catching one error can save a patient's life.</p>

        <div class="tut-actions">
          {#if step > 0}
            <button class="tut-btn tut-btn-back" onclick={() => { step--; requestAnimationFrame(() => positionSpotlight()); }}>Back</button>
          {/if}
          <button class="tut-btn tut-btn-next" onclick={next}>Next</button>
        </div>
      </div>
    {:else if !current.target}
      <!-- Centered card (no target) -->
      <div class="tut-card tut-center">
        <div class="tut-progress">{progress}</div>
        <h2 class="tut-title">{current.title}</h2>
        <p class="tut-body">{current.body}</p>
        <div class="tut-actions">
          {#if step > 0}
            <button class="tut-btn tut-btn-back" onclick={() => { step--; requestAnimationFrame(() => positionSpotlight()); }}>Back</button>
          {/if}
          <button class="tut-btn tut-btn-next" onclick={next}>{isLast ? 'Start Verifying' : 'Next'}</button>
        </div>
      </div>
    {:else}
      <!-- Positioned near target -->
      <div class="tut-card tut-positioned" style={tipPos}>
        <div class="tut-progress">{progress}</div>
        <h2 class="tut-title">{current.title}</h2>
        <p class="tut-body">{current.body}</p>
        <div class="tut-actions">
          {#if step > 0}
            <button class="tut-btn tut-btn-back" onclick={() => { step--; requestAnimationFrame(() => positionSpotlight()); }}>Back</button>
          {/if}
          <button class="tut-btn tut-btn-next" onclick={next}>Next</button>
        </div>
      </div>
    {/if}
  </div>
{/if}
