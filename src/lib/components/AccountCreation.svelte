<script>
  import { createAccount, theme } from '$lib/stores/app.js';

  let name = $state('');
  let email = $state('');
  let role = $state('student');
  let error = $state('');

  function submit(e) {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    if (!n) { error = 'Please enter your name'; return; }
    if (!em || !em.includes('@')) { error = 'Please enter a valid email'; return; }
    error = '';
    createAccount(n, em, role);
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
      <div class="ac-field">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label>I am a...</label>
        <div class="ac-roles">
          <button type="button" class="ac-role" class:act={role === 'student'} onclick={() => role = 'student'}>
            <div class="ac-role-t">Student / Resident</div>
            <div class="ac-role-d">Practice cases, track progress, prep for boards</div>
          </button>
          <button type="button" class="ac-role" class:act={role === 'preceptor'} onclick={() => role = 'preceptor'}>
            <div class="ac-role-t">Preceptor / Professor</div>
            <div class="ac-role-d">Use as a teaching tool with learners</div>
          </button>
        </div>
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
