<script>
  import AccountCreation from './AccountCreation.svelte';
  import { theme } from '$lib/stores/app.js';

  let showSignup = $state(false);

  function setTheme(t) {
    theme.set(t);
    localStorage.setItem('pv-theme', t);
    document.documentElement.setAttribute('data-theme', t);
  }

  function scrollToHow() {
    document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

{#if showSignup}
  <AccountCreation />
{:else}
  <div class="lp">
    <header class="lp-nav">
      <div class="lp-brand"><span class="lp-logo">Rx</span> PharmVerify</div>
      <div class="lp-nav-r">
        <button class="lp-link" onclick={scrollToHow}>How it works</button>
        <button class="lp-theme" onclick={() => setTheme($theme === 'dark' ? 'light' : 'dark')}>{$theme === 'dark' ? 'Light' : 'Dark'}</button>
        <button class="lp-cta-sm" onclick={() => showSignup = true}>Sign in</button>
      </div>
    </header>

    <section class="lp-hero">
      <div class="lp-hero-l">
        <div class="lp-eyebrow">Inpatient pharmacy training</div>
        <h1 class="lp-h1">Train pharmacist judgment, <span class="lp-accent">one order at a time.</span></h1>
        <p class="lp-lede">Realistic inpatient orders inside an EHR-style workstation. No hints. Real feedback the moment you decide.</p>
        <div class="lp-cta-row">
          <button class="lp-cta" onclick={() => showSignup = true}>Start a case &rarr;</button>
          <button class="lp-cta-ghost" onclick={scrollToHow}>How it works</button>
        </div>
        <div class="lp-trust">
          <span>&#x2713; ISMP high-alert meds</span>
          <span>&#x2713; IDSA &amp; ACC/AHA guidelines</span>
          <span>&#x2713; Board-prep aligned</span>
        </div>
      </div>

      <!-- Mock EHR workstation -->
      <div class="lp-mock">
        <div class="lp-mock-bar">
          <span class="lp-dot lp-dot-r"></span>
          <span class="lp-dot lp-dot-y"></span>
          <span class="lp-dot lp-dot-g"></span>
          <span class="lp-mock-title">PharmVerify &mdash; Verification Queue</span>
        </div>
        <div class="lp-mock-body">
          <div class="lp-mock-side">
            <div class="lp-mock-sh">QUEUE</div>
            <div class="lp-mock-si act">Verify Order</div>
            <div class="lp-mock-si">H&amp;P</div>
            <div class="lp-mock-si">Labs <span class="lp-mock-bdg">3</span></div>
            <div class="lp-mock-si">Home Meds</div>
          </div>
          <div class="lp-mock-main">
            <div class="lp-mock-pt">
              <div class="lp-mock-name">MONROE, ELEANOR J <span class="lp-mock-meta">73F &middot; 4S-408B</span></div>
              <div class="lp-mock-dx">Acute decompensated HFrEF (EF 25%) &middot; CKD III</div>
            </div>
            <div class="lp-mock-order">
              <div class="lp-mock-drug">diltiazem 30 MG tablet</div>
              <div class="lp-mock-line">30 mg, Oral, QID &middot; First dose 0900</div>
              <div class="lp-mock-flags">
                <span class="lp-flag lp-flag-r">SCr 1.9 H</span>
                <span class="lp-flag lp-flag-r">K 5.4 H</span>
                <span class="lp-flag lp-flag-y">EF 25%</span>
              </div>
            </div>
            <div class="lp-mock-actions">
              <button class="lp-mock-btn lp-mock-v" disabled>Verify</button>
              <button class="lp-mock-btn lp-mock-r" disabled>Reject</button>
              <button class="lp-mock-btn lp-mock-m" disabled>Message MD</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="lp-how" id="how">
      <h2 class="lp-h2">How it works</h2>
      <div class="lp-steps">
        <div class="lp-step">
          <div class="lp-step-n">1</div>
          <div class="lp-step-t">Review the chart</div>
          <div class="lp-step-d">H&amp;P, labs with abnormal flags, home meds, inpatient meds, notes &mdash; just like a real EHR.</div>
        </div>
        <div class="lp-step">
          <div class="lp-step-n">2</div>
          <div class="lp-step-t">Decide</div>
          <div class="lp-step-d">Verify, reject with a reason, or message the prescriber. No hints, no priming.</div>
        </div>
        <div class="lp-step">
          <div class="lp-step-n">3</div>
          <div class="lp-step-t">Get graded feedback</div>
          <div class="lp-step-d">See the clinical rationale, the guideline, and what an optimal action would have been.</div>
        </div>
      </div>
    </section>

    <section class="lp-disease">
      <h2 class="lp-h2">Pick a disease, pick a difficulty</h2>
      <p class="lp-h2-sub">Cases organized by the conditions you'll actually verify on the floor.</p>
      <div class="lp-disease-grid">
        <div class="lp-dz"><span class="lp-dz-ic">{'\u2764'}</span><div>Heart Failure</div></div>
        <div class="lp-dz"><span class="lp-dz-ic">{'\u{1FAC1}'}</span><div>Pneumonia (CAP)</div></div>
        <div class="lp-dz"><span class="lp-dz-ic">{'\u{1F48A}'}</span><div>UTI / Pyelo</div></div>
        <div class="lp-dz dim"><span class="lp-dz-ic">{'\u{1F32C}'}</span><div>COPD <span class="lp-dz-soon">soon</span></div></div>
        <div class="lp-dz dim"><span class="lp-dz-ic">{'\u{1F4A7}'}</span><div>DKA <span class="lp-dz-soon">soon</span></div></div>
        <div class="lp-dz dim"><span class="lp-dz-ic">{'\u{1F525}'}</span><div>Sepsis <span class="lp-dz-soon">soon</span></div></div>
      </div>
    </section>

    <section class="lp-final">
      <h2 class="lp-h2">Ready to start?</h2>
      <button class="lp-cta" onclick={() => showSignup = true}>Create your account &rarr;</button>
      <p class="lp-foot">Your data is stored locally on this device only.</p>
    </section>
  </div>
{/if}
