import { writable, derived } from 'svelte/store';

const CATEGORY_MAP = {
  P001: { key: 'hfref', label: 'Heart Failure (HFrEF)' },
  P002: { key: 'cap', label: 'Community-Acquired Pneumonia' },
  P003: { key: 'pyelo', label: 'Pyelonephritis / CKD' },
  P004: { key: 'syphilis', label: 'Syphilis / LASA Safety' }
};

function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const attempts = writable(load('pv-attempts'));
export const sessions = writable(load('pv-sessions'));

let currentSessionId = null;
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min

function ensureSession(difficulty) {
  const now = Date.now();
  const allAttempts = load('pv-attempts');
  const last = allAttempts.length > 0 ? allAttempts[allAttempts.length - 1] : null;

  if (!currentSessionId || !last || (now - last.timestamp > SESSION_TIMEOUT)) {
    currentSessionId = 'sess_' + now;
    sessions.update(s => {
      const next = [...s, { id: currentSessionId, startedAt: now, endedAt: now, difficulty, totalAttempts: 0, correctAttempts: 0, ordersCompleted: 0 }];
      save('pv-sessions', next);
      return next;
    });
  }
  return currentSessionId;
}

export function startNewSession(difficulty) {
  currentSessionId = 'sess_' + Date.now();
  sessions.update(s => {
    const next = [...s, { id: currentSessionId, startedAt: Date.now(), endedAt: Date.now(), difficulty, totalAttempts: 0, correctAttempts: 0, ordersCompleted: 0 }];
    save('pv-sessions', next);
    return next;
  });
}

export function recordAttempt({ orderId, orderDbId, patientId, drugName, difficulty, actionTaken, correctAction, isCorrect, grade, rejectReasonsScore, orderSnapshot, patientSnapshot }) {
  const now = Date.now();
  const sessionId = ensureSession(difficulty);
  const cat = CATEGORY_MAP[patientId] || { key: 'other', label: 'Other' };

  const attempt = {
    id: 'att_' + now + '_' + orderId,
    orderId, orderDbId, patientId, drugName,
    clinicalCategory: cat.key,
    categoryLabel: cat.label,
    difficulty,
    actionTaken, correctAction, isCorrect,
    grade: grade || null,
    rejectReasonsScore: rejectReasonsScore || null,
    timestamp: now,
    sessionId,
    orderSnapshot: orderSnapshot || null,
    patientSnapshot: patientSnapshot || null
  };

  attempts.update(a => {
    const next = [...a, attempt];
    // Cap at 10000 attempts
    if (next.length > 10000) next.splice(0, next.length - 10000);
    save('pv-attempts', next);
    return next;
  });

  sessions.update(s => {
    return s.map(sess => {
      if (sess.id !== sessionId) return sess;
      return {
        ...sess,
        endedAt: now,
        totalAttempts: sess.totalAttempts + 1,
        correctAttempts: sess.correctAttempts + (isCorrect ? 1 : 0),
        ordersCompleted: sess.ordersCompleted + (isCorrect ? 1 : 0)
      };
    });
  });
  sessions.update(s => { save('pv-sessions', s); return s; });
}

// Derived metrics
export const totalCompleted = derived(attempts, $a =>
  new Set($a.filter(a => a.isCorrect).map(a => a.orderId + '_' + a.sessionId)).size
);

export const overallAccuracy = derived(attempts, $a => {
  if ($a.length === 0) return 0;
  return Math.round(($a.filter(a => a.isCorrect).length / $a.length) * 100);
});

export const firstTryAccuracy = derived(attempts, $a => {
  const seen = new Map();
  for (const a of $a) {
    const key = a.sessionId + '_' + a.orderId;
    if (!seen.has(key)) seen.set(key, a.isCorrect);
  }
  if (seen.size === 0) return 0;
  const correct = [...seen.values()].filter(Boolean).length;
  return Math.round((correct / seen.size) * 100);
});

export const currentStreak = derived(attempts, $a => {
  // Group by session+order, take first attempt per order
  const firstAttempts = [];
  const seen = new Set();
  for (const a of $a) {
    const key = a.sessionId + '_' + a.orderId;
    if (!seen.has(key)) {
      seen.add(key);
      firstAttempts.push(a);
    }
  }
  let streak = 0;
  for (let i = firstAttempts.length - 1; i >= 0; i--) {
    if (firstAttempts[i].isCorrect) streak++;
    else break;
  }
  return streak;
});

export const sessionAccuracies = derived(sessions, $s =>
  $s.filter(s => s.totalAttempts > 0).map(s => ({
    id: s.id,
    date: new Date(s.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    accuracy: Math.round((s.correctAttempts / s.totalAttempts) * 100),
    total: s.totalAttempts,
    correct: s.correctAttempts,
    difficulty: s.difficulty
  }))
);

export const categoryPerformance = derived(attempts, $a => {
  const cats = {};
  for (const a of $a) {
    if (!cats[a.clinicalCategory]) {
      cats[a.clinicalCategory] = { key: a.clinicalCategory, label: a.categoryLabel, total: 0, correct: 0 };
    }
    cats[a.clinicalCategory].total++;
    if (a.isCorrect) cats[a.clinicalCategory].correct++;
  }
  return Object.values(cats).map(c => ({
    ...c,
    accuracy: c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0
  })).sort((a, b) => a.accuracy - b.accuracy);
});

export const difficultyBreakdown = derived(attempts, $a => {
  const diffs = {};
  for (const a of $a) {
    if (!diffs[a.difficulty]) diffs[a.difficulty] = { total: 0, correct: 0 };
    diffs[a.difficulty].total++;
    if (a.isCorrect) diffs[a.difficulty].correct++;
  }
  return Object.entries(diffs).map(([key, v]) => ({
    key,
    label: key === 'default' ? 'Tutorial' : key.charAt(0).toUpperCase() + key.slice(1),
    total: v.total,
    correct: v.correct,
    accuracy: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0
  }));
});

export const hardModeAvgGrade = derived(attempts, $a => {
  const gradeMap = { optimal: 4, acceptable: 3, suboptimal: 2, incorrect: 1 };
  const graded = $a.filter(a => a.grade);
  if (graded.length === 0) return null;
  const sum = graded.reduce((acc, a) => acc + (gradeMap[a.grade] || 0), 0);
  return (sum / graded.length).toFixed(1);
});

export const recentAttempts = derived(attempts, $a => $a.slice(-20).reverse());

export function clearMetrics() {
  attempts.set([]);
  sessions.set([]);
  localStorage.removeItem('pv-attempts');
  localStorage.removeItem('pv-sessions');
  currentSessionId = null;
}
