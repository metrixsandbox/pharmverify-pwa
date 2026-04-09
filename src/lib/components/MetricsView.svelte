<script>
  import { totalCompleted, overallAccuracy, firstTryAccuracy, currentStreak, sessionAccuracies, categoryPerformance, difficultyBreakdown, hardModeAvgGrade, recentAttempts, clearMetrics, attempts } from '$lib/stores/metrics.js';
  import { orders, patients, reviewOrder } from '$lib/stores/app.js';
  import { DEMO_ORDERS, DEMO_PATIENTS, getOrdersForDifficulty } from '$lib/data/demo.js';
  import { DISEASE_CASES } from '$lib/data/diseases.js';

  const ALL_ORDERS = {};
  const ALL_PATIENTS = { ...DEMO_PATIENTS };
  for (const o of DEMO_ORDERS) ALL_ORDERS[o.id] = o;
  for (const l of ['easy','medium','hard']) {
    for (const o of getOrdersForDifficulty(l) || []) ALL_ORDERS[o.id] = o;
  }
  for (const disease of Object.values(DISEASE_CASES)) {
    for (const phase of Object.values(disease)) {
      Object.assign(ALL_PATIENTS, phase.patients);
      for (const lvl of Object.values(phase.orders)) {
        for (const o of lvl) ALL_ORDERS[o.id] = o;
      }
    }
  }
  function lookupOrder(a) {
    return a.orderSnapshot || ALL_ORDERS[a.orderId] || $orders.find(o => o.id === a.orderId);
  }
  function lookupPatient(a, ord) {
    const pid = ord?.patientId || a.patientId;
    return a.patientSnapshot || ALL_PATIENTS[pid] || $patients[pid];
  }

  const gradeLabels = { optimal: 'Optimal', acceptable: 'Acceptable', suboptimal: 'Suboptimal', incorrect: 'Incorrect' };

  function barColor(acc) {
    if (acc >= 80) return 'var(--grn)';
    if (acc >= 60) return 'var(--amb)';
    return 'var(--red)';
  }

  let showConfirm = $state(false);

  function doReset() {
    clearMetrics();
    showConfirm = false;
  }

  // SVG chart dimensions
  const CW = 600, CH = 200, PAD = 40;

  let chartPoints = $derived(() => {
    const sa = $sessionAccuracies;
    if (sa.length < 2) return null;
    const maxPts = Math.min(sa.length, 20);
    const data = sa.slice(-maxPts);
    const xStep = (CW - PAD * 2) / (data.length - 1);
    return data.map((s, i) => ({
      x: PAD + i * xStep,
      y: PAD + (CH - PAD * 2) * (1 - s.accuracy / 100),
      ...s
    }));
  });

  let weakestCategory = $derived(() => {
    const cats = $categoryPerformance;
    if (cats.length === 0) return null;
    const worst = cats[0];
    if (worst.accuracy >= 80) return null;
    return worst;
  });
</script>

<div class="mx-wrap">
  <div class="mx-hdr">
    <h1>Performance Dashboard</h1>
    <div style="display:flex;gap:8px;align-items:center">
      {#if $attempts.length > 0}
        {#if showConfirm}
          <span style="font-size:13px;color:var(--red)">Clear all data?</span>
          <button class="btn br" onclick={doReset}>Yes, Clear</button>
          <button class="btn" onclick={() => showConfirm = false}>Cancel</button>
        {:else}
          <button class="fb fb-clr" onclick={() => showConfirm = true}>Reset Metrics</button>
        {/if}
      {/if}
    </div>
  </div>

  {#if $attempts.length === 0}
    <div class="mx-empty">
      <div style="font-size:48px;opacity:.4">&#x1F4CA;</div>
      <div style="font-size:18px;font-weight:600;color:var(--t2)">No Data Yet</div>
      <p style="font-size:14px;color:var(--t3);max-width:360px;text-align:center">Complete some orders in the verification queue to start tracking your performance.</p>
    </div>
  {:else}
    <!-- Stat Cards -->
    <div class="mx-stats">
      <div class="mx-stat">
        <div class="mx-stat-val">{$totalCompleted}</div>
        <div class="mx-stat-lbl">Orders Completed</div>
      </div>
      <div class="mx-stat">
        <div class="mx-stat-val" style="color:{barColor($overallAccuracy)}">{$overallAccuracy}%</div>
        <div class="mx-stat-lbl">Overall Accuracy</div>
      </div>
      <div class="mx-stat">
        <div class="mx-stat-val" style="color:{barColor($firstTryAccuracy)}">{$firstTryAccuracy}%</div>
        <div class="mx-stat-lbl">First-Try Accuracy</div>
      </div>
      <div class="mx-stat">
        <div class="mx-stat-val" style="color:var(--a)">{$currentStreak}</div>
        <div class="mx-stat-lbl">Current Streak</div>
      </div>
      {#if $hardModeAvgGrade}
        <div class="mx-stat">
          <div class="mx-stat-val" style="color:var(--pur)">{$hardModeAvgGrade}</div>
          <div class="mx-stat-lbl">Hard Avg Grade (4=Best)</div>
        </div>
      {/if}
    </div>

    <!-- Accuracy Over Time -->
    {#if $sessionAccuracies.length >= 2}
      <div class="mx-card">
        <h2>Accuracy Over Time</h2>
        <div class="mx-chart-wrap">
          <svg viewBox="0 0 {CW} {CH}" class="mx-chart">
            <!-- Grid lines -->
            {#each [0, 25, 50, 75, 100] as pct}
              {@const y = PAD + (CH - PAD * 2) * (1 - pct / 100)}
              <line x1={PAD} y1={y} x2={CW - PAD} y2={y} stroke="var(--gbo)" stroke-dasharray="4,4" />
              <text x={PAD - 8} y={y + 4} text-anchor="end" fill="var(--t3)" font-size="11">{pct}%</text>
            {/each}
            <!-- Line -->
            {#if chartPoints()}
            {@const pts = chartPoints()}
              <polyline fill="none" stroke="var(--a)" stroke-width="2.5" stroke-linejoin="round"
                points={pts.map(p => `${p.x},${p.y}`).join(' ')} />
              <!-- Dots -->
              {#each pts as p}
                <circle cx={p.x} cy={p.y} r="4" fill="var(--a)" stroke="var(--bg)" stroke-width="2" />
              {/each}
              <!-- Labels -->
              {#each pts as p, i}
                {#if i === 0 || i === pts.length - 1 || pts.length <= 8}
                  <text x={p.x} y={CH - 8} text-anchor="middle" fill="var(--t3)" font-size="10">{p.date}</text>
                {/if}
              {/each}
            {/if}
          </svg>
        </div>
      </div>
    {/if}

    <div class="mx-row">
      <!-- Topic Performance -->
      <div class="mx-card mx-flex1">
        <h2>Performance by Topic</h2>
        {#if $categoryPerformance.length === 0}
          <p style="color:var(--t3)">No topic data yet.</p>
        {:else}
          <div class="mx-topics">
            {#each $categoryPerformance as cat}
              <div class="mx-topic">
                <div class="mx-topic-hdr">
                  <span class="mx-topic-name">{cat.label}</span>
                  <span class="mx-topic-pct" style="color:{barColor(cat.accuracy)}">{cat.accuracy}%</span>
                  <span class="mx-topic-cnt">({cat.correct}/{cat.total})</span>
                </div>
                <div class="mx-bar-bg">
                  <div class="mx-bar-fill" style="width:{cat.accuracy}%;background:{barColor(cat.accuracy)}"></div>
                </div>
              </div>
            {/each}
          </div>
          {@const weak = weakestCategory()}
          {#if weak}
            <div class="mx-review-tip">
              &#x1F4DD; <strong>Area to review:</strong> {weak.label} ({weak.accuracy}% accuracy). Focus on orders in this category to improve.
            </div>
          {/if}
        {/if}
      </div>

      <!-- Difficulty Breakdown -->
      <div class="mx-card mx-flex1">
        <h2>By Difficulty</h2>
        {#if $difficultyBreakdown.length === 0}
          <p style="color:var(--t3)">No data yet.</p>
        {:else}
          <div class="mx-diff-grid">
            {#each $difficultyBreakdown as d}
              <div class="mx-diff-item">
                <div class="mx-diff-label">{d.label}</div>
                <div class="mx-diff-acc" style="color:{barColor(d.accuracy)}">{d.accuracy}%</div>
                <div class="mx-diff-cnt">{d.correct}/{d.total} correct</div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="mx-card">
      <h2>Recent Activity</h2>
      <div class="mx-activity">
        {#each $recentAttempts as a}
          {@const ord = lookupOrder(a)}
          {@const pt = lookupPatient(a, ord)}
          <button type="button" class="mx-act-row mx-act-btn" disabled={!ord} title={ord ? 'Review this order (will not affect stats)' : 'Order no longer available'} onclick={() => reviewOrder(ord, pt)}>
            <span class="mx-act-icon" style="color:{a.isCorrect ? 'var(--grn)' : 'var(--red)'}">{a.isCorrect ? '\u2713' : '\u2717'}</span>
            <span class="mx-act-drug">{a.drugName.split(' ').slice(0, 4).join(' ')}</span>
            <span class="mx-act-action">{a.actionTaken}</span>
            {#if a.grade}
              <span class="mx-act-grade mx-grade-{a.grade}">{gradeLabels[a.grade]}</span>
            {/if}
            <span class="mx-act-diff">{a.difficulty === 'default' ? 'Tutorial' : a.difficulty}</span>
            <span class="mx-act-time">{new Date(a.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
