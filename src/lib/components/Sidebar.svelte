<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { view, orders, showUpload, theme, user, logout, editMode } from '$lib/stores/app.js';
  import { attempts } from '$lib/stores/metrics.js';
  import { goBack } from '$lib/stores/app.js';

  let toastMsg = $state(null);
  let toastTimer;
  function flashToast(msg) {
    toastMsg = msg;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastMsg = null; }, 2400);
  }

  function toggleTheme() {
    theme.update(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      localStorage.setItem('pv-theme', next);
      document.documentElement.classList.add('theme-fading');
      document.documentElement.setAttribute('data-theme', next);
      setTimeout(() => document.documentElement.classList.remove('theme-fading'), 500);
      return next;
    });
  }

  let initials = $derived($user ? $user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : '');
  let isPreceptor = $derived($user?.role === 'preceptor');

  let prevEdit = false;
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('edit-mode-on', $editMode);
    }
    if ($editMode !== prevEdit) {
      flashToast($editMode ? 'Edit mode ON — hover any field and click to edit' : 'Edit mode off');
      prevEdit = $editMode;
    }
  });
</script>

<div class="sb" data-tutorial="sidebar">
  <div class="sb-logo">Rx</div>
  <button class="sb-btn" class:act={$view === 'home'} onclick={() => view.set('home')}>
    &#x1F3E0;<span class="tip">Home</span>
  </button>
  <button class="sb-btn" class:act={$view === 'queue'} onclick={goBack}>
    &#x2630;<span class="tip">Work Queue</span>
    {#if $orders.length > 0}<span class="bdg">{$orders.length}</span>{/if}
  </button>
  {#if $view === 'chart'}
    <button class="sb-btn act">&#x1F4CB;<span class="tip">Chart</span></button>
  {/if}
  <button class="sb-btn" class:act={$view === 'metrics'} onclick={() => { view.set('metrics'); }}>
    &#x1F4CA;<span class="tip">Performance</span>
    {#if $attempts.length > 0}<span class="bdg" style="background:var(--pur)">{$attempts.length}</span>{/if}
  </button>
  <div style="flex:1"></div>
  <button class="sb-btn" onclick={toggleTheme}>
    {$theme === 'dark' ? '\u2600' : '\u{1F319}'}<span class="tip">{$theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
  </button>
  <button class="sb-btn" onclick={() => showUpload.set(true)}>
    &#x2B06;<span class="tip">Import Cases</span>
  </button>
  {#if isPreceptor}
    <button class="sb-btn sb-edit" class:act={$editMode} onclick={() => editMode.update(v => !v)}>
      &#x270E;<span class="tip">{$editMode ? 'Exit Edit Mode' : 'Edit Mode'}</span>
    </button>
  {/if}
  <div class="sb-user">
    <div class="sb-avatar">{initials}</div>
    <span class="tip" style="bottom:auto;top:auto;left:52px">{$user?.name}</span>
  </div>
  <button class="sb-btn sb-logout" onclick={logout}>
    &#x23FB;<span class="tip">Sign Out</span>
  </button>
</div>

{#if toastMsg}
  <div class="edit-toast-wrap">
    <div class="edit-toast" in:fly={{ y: 30, duration: 350, easing: quintOut }} out:fly={{ y: 30, duration: 280, easing: quintOut }}>
      <span class="et-ic">{$editMode ? '\u270E' : '\u2713'}</span>
      <span>{toastMsg}</span>
    </div>
  </div>
{/if}
