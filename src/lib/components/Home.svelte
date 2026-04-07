<script>
  import { user, view, orders, setDisease, reviewOrder } from '$lib/stores/app.js';
  import { attempts, totalCompleted, overallAccuracy, currentStreak, recentAttempts } from '$lib/stores/metrics.js';
  import { DISEASES, DISEASE_CASES } from '$lib/data/diseases.js';

  const LEVELS = ['easy', 'medium', 'hard'];
  let pickedDisease = $state(null);

  function start(id, level) {
    setDisease(id, level);
    view.set('queue');
  }

  function resume() {
    view.set('queue');
  }

  let firstName = $derived($user?.name?.split(' ')[0] || 'there');
  let hasResume = $derived($orders.length > 0);
</script>

<div class="hm">
  <div class="hm-hd">
    <div>
      <div class="hm-hi">Welcome back, {firstName}</div>
      <div class="hm-sub">Pick a disease, or resume where you left off.</div>
    </div>
    {#if hasResume}
      <button class="hm-resume" onclick={resume}>
        <span class="hm-resume-l">Resume queue</span>
        <span class="hm-resume-s">{$orders.length} order{$orders.length === 1 ? '' : 's'} pending &rarr;</span>
      </button>
    {/if}
  </div>

  <div class="hm-stats">
    <div class="hm-stat">
      <div class="hm-stat-n">{$totalCompleted}</div>
      <div class="hm-stat-l">Cases completed</div>
    </div>
    <div class="hm-stat">
      <div class="hm-stat-n">{$overallAccuracy}<span class="hm-stat-u">%</span></div>
      <div class="hm-stat-l">Overall accuracy</div>
    </div>
    <div class="hm-stat">
      <div class="hm-stat-n">{$currentStreak}</div>
      <div class="hm-stat-l">Current streak</div>
    </div>
    <div class="hm-stat">
      <div class="hm-stat-n">{$attempts.length}</div>
      <div class="hm-stat-l">Total attempts</div>
    </div>
  </div>

  <div class="hm-sect-hd">
    <h2>Practice by disease</h2>
    <span class="hm-sect-sub">Choose a condition, then pick your difficulty.</span>
  </div>
  <div class="hm-grid">
    {#each DISEASES as d}
      {@const built = !!DISEASE_CASES[d.id]}
      <div class="hm-tile" class:dim={!built} class:open={pickedDisease === d.id}>
        <button class="hm-tile-main" disabled={!built} onclick={() => pickedDisease = pickedDisease === d.id ? null : d.id}>
          <div class="hm-tile-ic">{d.icon}</div>
          <div class="hm-tile-name">{d.label}</div>
          <div class="hm-tile-desc">{d.desc}</div>
          {#if !built}<div class="hm-tile-soon">Coming soon</div>{/if}
        </button>
        {#if built && pickedDisease === d.id}
          <div class="hm-tile-lvls">
            {#each LEVELS as l}
              <button class="hm-lvl hm-lvl-{l}" onclick={() => start(d.id, l)}>{l[0].toUpperCase() + l.slice(1)}</button>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if $recentAttempts.length > 0}
    <div class="hm-sect-hd">
      <h2>Recent activity</h2>
    </div>
    <div class="hm-recent">
      {#each $recentAttempts.slice(0, 6) as a}
        <button class="hm-rec" disabled={!a.orderSnapshot} title={a.orderSnapshot ? 'Review this order (will not affect stats)' : 'Review unavailable for older attempts'} onclick={() => reviewOrder(a.orderSnapshot, a.patientSnapshot)}>
          <span class="hm-rec-mark" class:ok={a.isCorrect} class:bad={!a.isCorrect}>{a.isCorrect ? '\u2713' : '\u2715'}</span>
          <span class="hm-rec-drug">{a.drugName}</span>
          <span class="hm-rec-act">{a.actionTaken}</span>
          <span class="hm-rec-cat">{a.categoryLabel}</span>
        </button>
      {/each}
    </div>
  {/if}

  <div class="hm-jump">
    <button class="btn bv" onclick={() => view.set('queue')}>Open verification queue &rarr;</button>
  </div>
</div>
