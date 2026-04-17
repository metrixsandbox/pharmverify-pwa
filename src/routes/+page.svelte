<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { view, showUpload, theme, user } from '$lib/stores/app.js';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Home from '$lib/components/Home.svelte';
  import Queue from '$lib/components/Queue.svelte';
  import ChartView from '$lib/components/ChartView.svelte';
  import UploadModal from '$lib/components/UploadModal.svelte';
  import Landing from '$lib/components/Landing.svelte';
  import MetricsView from '$lib/components/MetricsView.svelte';
  import ClassManager from '$lib/components/ClassManager.svelte';
  import Tutorial from '$lib/components/Tutorial.svelte';

  let showTutorial = $state(false);

  onMount(() => {
    const saved = localStorage.getItem('pv-theme') || 'dark';
    theme.set(saved);
    document.documentElement.setAttribute('data-theme', saved);
  });

  // Watch for user login — show tutorial if they haven't seen it
  $effect(() => {
    if ($user && !localStorage.getItem('pv-tutorial-done')) {
      // Small delay so the DOM renders first
      setTimeout(() => { showTutorial = true; }, 300);
    }
  });
</script>

<svelte:head>
  <title>PharmVerify</title>
</svelte:head>

{#if $user}
  <div class="app">
    <Sidebar />
    <div class="main">
      {#if $view === 'home'}
        <Home />
      {:else if $view === 'queue'}
        <Queue />
      {:else if $view === 'chart'}
        <ChartView />
      {:else if $view === 'metrics'}
        <MetricsView />
      {:else if $view === 'class'}
        <ClassManager />
      {/if}
    </div>
  </div>
  {#if $showUpload}
    <UploadModal />
  {/if}
  {#if showTutorial}
    <Tutorial />
  {/if}
{:else}
  <Landing />
{/if}
