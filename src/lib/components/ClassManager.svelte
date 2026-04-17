<script>
  import { user } from '$lib/stores/app.js';
  import { cohort, roster, classStats, rosterCount, createClass, deleteClass, importStudentData, removeStudent } from '$lib/stores/cohort.js';

  let className = $state('');
  let createError = $state('');
  let importError = $state('');
  let importSuccess = $state('');
  let showDeleteConfirm = $state(false);
  let fileInput;

  function handleCreate(e) {
    e.preventDefault();
    const name = className.trim();
    if (!name) { createError = 'Please enter a class name'; return; }
    createError = '';
    createClass(name, $user.name);
    className = '';
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    importError = '';
    importSuccess = '';

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const entry = importStudentData(reader.result);
        importSuccess = `Imported data for ${entry.student.name}`;
        setTimeout(() => importSuccess = '', 3000);
      } catch (err) {
        importError = err.message;
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleDelete() {
    deleteClass();
    showDeleteConfirm = false;
  }

  function barColor(acc) {
    if (acc >= 80) return 'var(--grn)';
    if (acc >= 60) return 'var(--amb)';
    return 'var(--red)';
  }

  function formatDate(ts) {
    if (!ts) return '—';
    return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }
</script>

<div class="cm-wrap">
  {#if !$cohort}
    <!-- No class created yet -->
    <div class="cm-empty">
      <div style="font-size:48px;opacity:.4">&#x1F3EB;</div>
      <h1 class="cm-title">Class Management</h1>
      <p class="cm-desc">Create a class to track student performance. Students export their data and you import it here to see aggregated results.</p>

      <form class="cm-create-form" onsubmit={handleCreate}>
        <div class="cm-field">
          <label for="className">Class Name</label>
          <input id="className" type="text" bind:value={className} placeholder="PHRM 620 — Spring 2026" />
        </div>
        {#if createError}
          <div class="cm-error">{createError}</div>
        {/if}
        <button type="submit" class="btn bv cm-btn">Create Class</button>
      </form>

      <div class="cm-how">
        <h3>How it works</h3>
        <div class="cm-steps">
          <div class="cm-step"><span class="cm-step-n">1</span><span>You create a class and get a 6-character code</span></div>
          <div class="cm-step"><span class="cm-step-n">2</span><span>Share the code with students — they enter it when signing up</span></div>
          <div class="cm-step"><span class="cm-step-n">3</span><span>Students practice and export their data from the Performance page</span></div>
          <div class="cm-step"><span class="cm-step-n">4</span><span>You import their files here to see class-wide performance</span></div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Class exists -->
    <div class="cm-header">
      <div>
        <h1 class="cm-title">{$cohort.name}</h1>
        <div class="cm-meta">
          <span class="cm-code-label">Class Code:</span>
          <span class="cm-code">{$cohort.code}</span>
          <span class="cm-meta-sep">·</span>
          <span>{$rosterCount} student{$rosterCount === 1 ? '' : 's'}</span>
        </div>
      </div>
      <div class="cm-actions">
        <label class="btn bv cm-import-btn">
          &#x2B06; Import Student Data
          <input type="file" accept=".json" style="display:none" onchange={handleFileSelect} bind:this={fileInput} />
        </label>
        {#if showDeleteConfirm}
          <span class="cm-del-confirm">Delete class and all data?</span>
          <button class="btn br" onclick={handleDelete}>Yes, Delete</button>
          <button class="btn" onclick={() => showDeleteConfirm = false}>Cancel</button>
        {:else}
          <button class="fb fb-clr" onclick={() => showDeleteConfirm = true}>Delete Class</button>
        {/if}
      </div>
    </div>

    {#if importError}
      <div class="cm-error" style="margin-bottom:16px">{importError}</div>
    {/if}
    {#if importSuccess}
      <div class="cm-success">{importSuccess}</div>
    {/if}

    {#if $classStats}
      <!-- Class Overview Stats -->
      <div class="cm-stats">
        <div class="cm-stat">
          <div class="cm-stat-val">{$classStats.studentCount}</div>
          <div class="cm-stat-lbl">Students</div>
        </div>
        <div class="cm-stat">
          <div class="cm-stat-val">{$classStats.totalAttempts}</div>
          <div class="cm-stat-lbl">Total Attempts</div>
        </div>
        <div class="cm-stat">
          <div class="cm-stat-val" style="color:{barColor($classStats.classAccuracy)}">{$classStats.classAccuracy}%</div>
          <div class="cm-stat-lbl">Class Accuracy</div>
        </div>
      </div>

      <!-- Category Breakdown -->
      {#if $classStats.categoryBreakdown.length > 0}
        <div class="cm-card">
          <h2>Performance by Topic</h2>
          <div class="cm-topics">
            {#each $classStats.categoryBreakdown as cat}
              <div class="cm-topic">
                <div class="cm-topic-hdr">
                  <span class="cm-topic-name">{cat.label}</span>
                  <span class="cm-topic-pct" style="color:{barColor(cat.accuracy)}">{cat.accuracy}%</span>
                  <span class="cm-topic-cnt">({cat.correct}/{cat.total})</span>
                </div>
                <div class="cm-bar-bg">
                  <div class="cm-bar-fill" style="width:{cat.accuracy}%;background:{barColor(cat.accuracy)}"></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Student Roster -->
      <div class="cm-card">
        <h2>Student Roster</h2>
        <div class="cm-roster">
          <div class="cm-roster-hdr">
            <span>Student</span>
            <span>Attempts</span>
            <span>Accuracy</span>
            <span>Last Active</span>
            <span></span>
          </div>
          {#each $classStats.students as stu}
            <div class="cm-roster-row">
              <div class="cm-stu-info">
                <span class="cm-stu-name">{stu.name}</span>
                <span class="cm-stu-email">{stu.email}</span>
              </div>
              <span class="cm-stu-att">{stu.totalAttempts}</span>
              <span class="cm-stu-acc" style="color:{barColor(stu.accuracy)}">{stu.accuracy}%</span>
              <span class="cm-stu-date">{formatDate(stu.lastActive)}</span>
              <button class="fb fb-clr cm-stu-rm" onclick={() => removeStudent(stu.id)} title="Remove student">&#x2715;</button>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="cm-empty-roster">
        <div style="font-size:36px;opacity:.4">&#x1F4E5;</div>
        <p>No student data imported yet.</p>
        <p class="cm-hint">Share code <strong>{$cohort.code}</strong> with students. When they export their data, import the files here.</p>
      </div>
    {/if}
  {/if}
</div>
