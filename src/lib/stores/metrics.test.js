import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

// Reset modules before each test so stores start fresh
let attempts, sessions, recordAttempt, startNewSession, clearMetrics;
let totalCompleted, overallAccuracy, firstTryAccuracy, currentStreak;
let categoryPerformance, difficultyBreakdown, hardModeAvgGrade, recentAttempts;

beforeEach(async () => {
  localStorage.clear();
  // Re-import to get fresh store instances
  vi.resetModules();
  const mod = await import('./metrics.js');
  attempts = mod.attempts;
  sessions = mod.sessions;
  recordAttempt = mod.recordAttempt;
  startNewSession = mod.startNewSession;
  clearMetrics = mod.clearMetrics;
  totalCompleted = mod.totalCompleted;
  overallAccuracy = mod.overallAccuracy;
  firstTryAccuracy = mod.firstTryAccuracy;
  currentStreak = mod.currentStreak;
  categoryPerformance = mod.categoryPerformance;
  difficultyBreakdown = mod.difficultyBreakdown;
  hardModeAvgGrade = mod.hardModeAvgGrade;
  recentAttempts = mod.recentAttempts;
});

function makeAttempt(overrides = {}) {
  return {
    orderId: 'o1',
    orderDbId: '100000001',
    patientId: 'P001',
    drugName: 'Furosemide',
    difficulty: 'default',
    actionTaken: 'verify',
    correctAction: 'verify',
    isCorrect: true,
    grade: null,
    rejectReasonsScore: null,
    orderSnapshot: null,
    patientSnapshot: null,
    ...overrides
  };
}

describe('recordAttempt', () => {
  it('records an attempt and persists to localStorage', () => {
    recordAttempt(makeAttempt());
    const stored = JSON.parse(localStorage.getItem('pv-attempts'));
    expect(stored).toHaveLength(1);
    expect(stored[0].drugName).toBe('Furosemide');
    expect(stored[0].clinicalCategory).toBe('hfref');
    expect(stored[0].categoryLabel).toBe('Heart Failure (HFrEF)');
  });

  it('creates a session on first attempt', () => {
    recordAttempt(makeAttempt());
    const stored = JSON.parse(localStorage.getItem('pv-sessions'));
    expect(stored).toHaveLength(1);
    expect(stored[0].totalAttempts).toBe(1);
    expect(stored[0].correctAttempts).toBe(1);
  });

  it('increments session counters on subsequent attempts', () => {
    recordAttempt(makeAttempt());
    recordAttempt(makeAttempt({ orderId: 'o2', isCorrect: false }));
    const stored = JSON.parse(localStorage.getItem('pv-sessions'));
    expect(stored[0].totalAttempts).toBe(2);
    expect(stored[0].correctAttempts).toBe(1);
  });

  it('maps unknown patientId to "other" category', () => {
    recordAttempt(makeAttempt({ patientId: 'P999' }));
    const stored = JSON.parse(localStorage.getItem('pv-attempts'));
    expect(stored[0].clinicalCategory).toBe('other');
    expect(stored[0].categoryLabel).toBe('Other');
  });

  it('maps P002 to CAP category', () => {
    recordAttempt(makeAttempt({ patientId: 'P002' }));
    const stored = JSON.parse(localStorage.getItem('pv-attempts'));
    expect(stored[0].clinicalCategory).toBe('cap');
  });
});

describe('clearMetrics', () => {
  it('clears all attempts and sessions', () => {
    recordAttempt(makeAttempt());
    clearMetrics();
    expect(get(attempts)).toEqual([]);
    expect(get(sessions)).toEqual([]);
    expect(localStorage.getItem('pv-attempts')).toBeNull();
    expect(localStorage.getItem('pv-sessions')).toBeNull();
  });
});

describe('derived: overallAccuracy', () => {
  it('returns 0 with no attempts', () => {
    expect(get(overallAccuracy)).toBe(0);
  });

  it('calculates correct percentage', () => {
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o2', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o3', isCorrect: false }));
    expect(get(overallAccuracy)).toBe(67); // 2/3 = 66.67 → 67
  });

  it('returns 100 when all correct', () => {
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o2', isCorrect: true }));
    expect(get(overallAccuracy)).toBe(100);
  });
});

describe('derived: firstTryAccuracy', () => {
  it('returns 0 with no attempts', () => {
    expect(get(firstTryAccuracy)).toBe(0);
  });

  it('only counts first attempt per order per session', () => {
    // First attempt wrong, second attempt right — only the first counts
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: false }));
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: true }));
    expect(get(firstTryAccuracy)).toBe(0); // first try was wrong
  });

  it('counts separate orders independently', () => {
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o2', isCorrect: false }));
    expect(get(firstTryAccuracy)).toBe(50);
  });
});

describe('derived: currentStreak', () => {
  it('returns 0 with no attempts', () => {
    expect(get(currentStreak)).toBe(0);
  });

  it('counts consecutive correct first-attempts from the end', () => {
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: false }));
    recordAttempt(makeAttempt({ orderId: 'o2', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o3', isCorrect: true }));
    expect(get(currentStreak)).toBe(2);
  });

  it('resets streak on incorrect answer', () => {
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o2', isCorrect: false }));
    expect(get(currentStreak)).toBe(0);
  });
});

describe('derived: categoryPerformance', () => {
  it('groups attempts by clinical category', () => {
    recordAttempt(makeAttempt({ patientId: 'P001', orderId: 'o1', isCorrect: true }));
    recordAttempt(makeAttempt({ patientId: 'P001', orderId: 'o2', isCorrect: false }));
    recordAttempt(makeAttempt({ patientId: 'P002', orderId: 'o3', isCorrect: true }));
    const perf = get(categoryPerformance);
    expect(perf).toHaveLength(2);
    const hfref = perf.find(c => c.key === 'hfref');
    const cap = perf.find(c => c.key === 'cap');
    expect(hfref.total).toBe(2);
    expect(hfref.correct).toBe(1);
    expect(hfref.accuracy).toBe(50);
    expect(cap.total).toBe(1);
    expect(cap.accuracy).toBe(100);
  });

  it('sorts by accuracy ascending (worst first)', () => {
    recordAttempt(makeAttempt({ patientId: 'P001', orderId: 'o1', isCorrect: true }));
    recordAttempt(makeAttempt({ patientId: 'P002', orderId: 'o2', isCorrect: false }));
    const perf = get(categoryPerformance);
    expect(perf[0].accuracy).toBeLessThanOrEqual(perf[perf.length - 1].accuracy);
  });
});

describe('derived: difficultyBreakdown', () => {
  it('groups attempts by difficulty level', () => {
    recordAttempt(makeAttempt({ orderId: 'o1', difficulty: 'easy', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o2', difficulty: 'easy', isCorrect: false }));
    recordAttempt(makeAttempt({ orderId: 'o3', difficulty: 'hard', isCorrect: true }));
    const bd = get(difficultyBreakdown);
    const easy = bd.find(d => d.key === 'easy');
    const hard = bd.find(d => d.key === 'hard');
    expect(easy.total).toBe(2);
    expect(easy.accuracy).toBe(50);
    expect(hard.total).toBe(1);
    expect(hard.accuracy).toBe(100);
  });

  it('labels "default" as "Tutorial"', () => {
    recordAttempt(makeAttempt({ difficulty: 'default' }));
    const bd = get(difficultyBreakdown);
    expect(bd[0].label).toBe('Tutorial');
  });

  it('capitalizes other difficulty labels', () => {
    recordAttempt(makeAttempt({ difficulty: 'medium' }));
    const bd = get(difficultyBreakdown);
    expect(bd[0].label).toBe('Medium');
  });
});

describe('derived: hardModeAvgGrade', () => {
  it('returns null with no graded attempts', () => {
    recordAttempt(makeAttempt({ grade: null }));
    expect(get(hardModeAvgGrade)).toBeNull();
  });

  it('calculates average grade score', () => {
    // optimal=4, acceptable=3 → avg=3.5
    recordAttempt(makeAttempt({ orderId: 'o1', grade: 'optimal' }));
    recordAttempt(makeAttempt({ orderId: 'o2', grade: 'acceptable' }));
    expect(get(hardModeAvgGrade)).toBe('3.5');
  });

  it('handles all grade levels', () => {
    // optimal=4, acceptable=3, suboptimal=2, incorrect=1 → avg=2.5
    recordAttempt(makeAttempt({ orderId: 'o1', grade: 'optimal' }));
    recordAttempt(makeAttempt({ orderId: 'o2', grade: 'acceptable' }));
    recordAttempt(makeAttempt({ orderId: 'o3', grade: 'suboptimal' }));
    recordAttempt(makeAttempt({ orderId: 'o4', grade: 'incorrect' }));
    expect(get(hardModeAvgGrade)).toBe('2.5');
  });
});

describe('derived: recentAttempts', () => {
  it('returns last 20 attempts in reverse order', () => {
    for (let i = 0; i < 25; i++) {
      recordAttempt(makeAttempt({ orderId: `o${i}` }));
    }
    const recent = get(recentAttempts);
    expect(recent).toHaveLength(20);
    expect(recent[0].orderId).toBe('o24');
    expect(recent[19].orderId).toBe('o5');
  });
});

describe('derived: totalCompleted', () => {
  it('counts unique correct order+session combos', () => {
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o1', isCorrect: true })); // duplicate
    recordAttempt(makeAttempt({ orderId: 'o2', isCorrect: true }));
    recordAttempt(makeAttempt({ orderId: 'o3', isCorrect: false }));
    expect(get(totalCompleted)).toBe(2); // o1 (deduped) + o2
  });
});

describe('startNewSession', () => {
  it('creates a new session entry', () => {
    startNewSession('medium');
    const stored = JSON.parse(localStorage.getItem('pv-sessions'));
    expect(stored).toHaveLength(1);
    expect(stored[0].difficulty).toBe('medium');
    expect(stored[0].totalAttempts).toBe(0);
  });
});
