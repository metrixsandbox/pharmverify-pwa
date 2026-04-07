<script>
  import { createAccount, theme } from '$lib/stores/app.js';

  let name = $state('');
  let email = $state('');
  let error = $state('');

  function submit(e) {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    if (!n) { error = 'Please enter your name'; return; }
    if (!em || !em.includes('@')) { error = 'Please enter a valid email'; return; }
    error = '';
    createAccount(n, em);
  }

  function setTheme(t) {
    theme.set(t);
    localStorage.setItem('pv-theme', t);
    document.documentElement.setAttribute('data-theme', t);
  }
</script>

<div class="ac-wrap">
  <div class="ac-card">
    <div class="ac-logo">Rx</div>
    <h1 class="ac-title">PharmVerify</h1>
    <p class="ac-sub">Inpatient Pharmacist Order Verification Training</p>

    <form onsubmit={submit}>
      <div class="ac-field">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Full Name</label>
        <input type="text" bind:value={name} placeholder="Jane Doe, PharmD" />
      </div>
      <div class="ac-field">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>Email</label>
        <input type="email" bind:value={email} placeholder="jdoe@pharmacy.edu" />
      </div>
      {#if error}
        <div class="ac-error">{error}</div>
      {/if}
      <button type="submit" class="btn bv ac-submit">Get Started</button>
    </form>

    <div class="ac-theme">
      <button class="ac-theme-btn" class:act={$theme === 'dark'} onclick={() => setTheme('dark')}>Dark</button>
      <button class="ac-theme-btn" class:act={$theme === 'light'} onclick={() => setTheme('light')}>Light</button>
    </div>

    <p class="ac-footer">Your data is stored locally on this device only.</p>
  </div>
</div>
