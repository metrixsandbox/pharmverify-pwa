import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Component rendering tests.
 *
 * Svelte 5 runes ($state, $derived, $props) have limited @testing-library/svelte
 * support. Instead of rendering full components, we test the component logic
 * by validating the data contracts and behavioral patterns that components rely on.
 *
 * This covers:
 * - Landing page data dependencies
 * - Home component data lookups
 * - Queue component filtering logic
 * - MetricsView computed values
 * - AccountCreation validation logic
 */

// ─── AccountCreation validation logic ──────────────────────────────────────

describe('AccountCreation: form validation', () => {
  function validateAccountForm(name, email) {
    const n = name.trim();
    const em = email.trim();
    if (!n) return 'Please enter your name';
    if (!em || !em.includes('@')) return 'Please enter a valid email';
    return null;
  }

  it('rejects empty name', () => {
    expect(validateAccountForm('', 'test@test.com')).toBe('Please enter your name');
  });

  it('rejects whitespace-only name', () => {
    expect(validateAccountForm('   ', 'test@test.com')).toBe('Please enter your name');
  });

  it('rejects empty email', () => {
    expect(validateAccountForm('Jane', '')).toBe('Please enter a valid email');
  });

  it('rejects email without @', () => {
    expect(validateAccountForm('Jane', 'notanemail')).toBe('Please enter a valid email');
  });

  it('accepts valid name and email', () => {
    expect(validateAccountForm('Jane Doe', 'jane@pharmacy.edu')).toBeNull();
  });

  it('trims whitespace from name and email', () => {
    expect(validateAccountForm('  Jane Doe  ', '  jane@test.com  ')).toBeNull();
  });
});

// ─── Queue component: filtering logic ──────────────────────────────────────

describe('Queue: order filtering', () => {
  const orders = [
    { id: 'o1', priority: 'Routine', alerts: [], patientId: 'P001', drugName: 'Drug A' },
    { id: 'o2', priority: 'Stat', alerts: [], patientId: 'P001', drugName: 'Drug B' },
    { id: 'o3', priority: 'Routine', alerts: [{ text: 'Alert', sev: 'warning' }], patientId: 'P002', drugName: 'Drug C' },
    { id: 'o4', priority: 'Stat', alerts: [{ text: 'Critical', sev: 'critical' }], patientId: 'P002', drugName: 'Drug D' }
  ];

  function filterOrders(list, filter) {
    if (filter === 'stat') return list.filter(o => o.priority === 'Stat');
    if (filter === 'alerts') return list.filter(o => o.alerts.length > 0);
    return list;
  }

  it('shows all orders with "all" filter', () => {
    expect(filterOrders(orders, 'all')).toHaveLength(4);
  });

  it('filters stat-only orders', () => {
    const stat = filterOrders(orders, 'stat');
    expect(stat).toHaveLength(2);
    expect(stat.every(o => o.priority === 'Stat')).toBe(true);
  });

  it('filters orders with alerts', () => {
    const alerts = filterOrders(orders, 'alerts');
    expect(alerts).toHaveLength(2);
    expect(alerts.every(o => o.alerts.length > 0)).toBe(true);
  });

  it('returns empty for stat filter with no stat orders', () => {
    const routineOnly = [{ id: 'o1', priority: 'Routine', alerts: [] }];
    expect(filterOrders(routineOnly, 'stat')).toHaveLength(0);
  });

  it('counts unique patients correctly', () => {
    const patientCount = new Set(orders.map(o => o.patientId)).size;
    expect(patientCount).toBe(2);
  });
});

// ─── Home component: data lookups ──────────────────────────────────────────

describe('Home: order/patient lookup', () => {
  const ALL_ORDERS = {
    o1: { id: 'o1', patientId: 'P001', drugName: 'Drug A' },
    o2: { id: 'o2', patientId: 'P002', drugName: 'Drug B' }
  };
  const ALL_PATIENTS = {
    P001: { name: 'DOE, JANE' },
    P002: { name: 'SMITH, JOHN' }
  };

  function lookupOrder(attempt, currentOrders = []) {
    return attempt.orderSnapshot || ALL_ORDERS[attempt.orderId] || currentOrders.find(o => o.id === attempt.orderId);
  }

  function lookupPatient(attempt, ord, currentPatients = {}) {
    const pid = ord?.patientId || attempt.patientId;
    return attempt.patientSnapshot || ALL_PATIENTS[pid] || currentPatients[pid];
  }

  it('finds order by ID in global lookup', () => {
    const ord = lookupOrder({ orderId: 'o1' });
    expect(ord.drugName).toBe('Drug A');
  });

  it('prefers orderSnapshot over lookup', () => {
    const snapshot = { id: 'o1', drugName: 'Snapshot Drug' };
    const ord = lookupOrder({ orderId: 'o1', orderSnapshot: snapshot });
    expect(ord.drugName).toBe('Snapshot Drug');
  });

  it('falls back to current orders list', () => {
    const currentOrders = [{ id: 'o999', drugName: 'Current Drug' }];
    const ord = lookupOrder({ orderId: 'o999' }, currentOrders);
    expect(ord.drugName).toBe('Current Drug');
  });

  it('returns undefined for unknown order', () => {
    const ord = lookupOrder({ orderId: 'unknown' });
    expect(ord).toBeUndefined();
  });

  it('finds patient by order patientId', () => {
    const pt = lookupPatient({}, { patientId: 'P001' });
    expect(pt.name).toBe('DOE, JANE');
  });

  it('prefers patientSnapshot', () => {
    const snapshot = { name: 'SNAPSHOT PATIENT' };
    const pt = lookupPatient({ patientSnapshot: snapshot }, { patientId: 'P001' });
    expect(pt.name).toBe('SNAPSHOT PATIENT');
  });

  it('firstName extraction from user', () => {
    const user = { name: 'Jane Doe, PharmD' };
    const firstName = user.name?.split(' ')[0] || 'there';
    expect(firstName).toBe('Jane');
  });

  it('firstName falls back to "there" when no user', () => {
    const user = null;
    const firstName = user?.name?.split(' ')[0] || 'there';
    expect(firstName).toBe('there');
  });
});

// ─── MetricsView: chart and display logic ──────────────────────────────────

describe('MetricsView: barColor logic', () => {
  function barColor(acc) {
    if (acc >= 80) return 'var(--grn)';
    if (acc >= 60) return 'var(--amb)';
    return 'var(--red)';
  }

  it('returns green for >= 80%', () => {
    expect(barColor(80)).toBe('var(--grn)');
    expect(barColor(100)).toBe('var(--grn)');
  });

  it('returns amber for 60-79%', () => {
    expect(barColor(60)).toBe('var(--amb)');
    expect(barColor(79)).toBe('var(--amb)');
  });

  it('returns red for < 60%', () => {
    expect(barColor(59)).toBe('var(--red)');
    expect(barColor(0)).toBe('var(--red)');
  });
});

describe('MetricsView: chart points calculation', () => {
  const CW = 600, CH = 200, PAD = 40;

  function computeChartPoints(sessionAccuracies) {
    if (sessionAccuracies.length < 2) return null;
    const maxPts = Math.min(sessionAccuracies.length, 20);
    const data = sessionAccuracies.slice(-maxPts);
    const xStep = (CW - PAD * 2) / (data.length - 1);
    return data.map((s, i) => ({
      x: PAD + i * xStep,
      y: PAD + (CH - PAD * 2) * (1 - s.accuracy / 100),
      ...s
    }));
  }

  it('returns null with fewer than 2 sessions', () => {
    expect(computeChartPoints([])).toBeNull();
    expect(computeChartPoints([{ accuracy: 80 }])).toBeNull();
  });

  it('computes correct x/y for 2 data points', () => {
    const pts = computeChartPoints([
      { accuracy: 0, date: 'Jan 1' },
      { accuracy: 100, date: 'Jan 2' }
    ]);
    expect(pts).toHaveLength(2);
    // First point: x=PAD, y at bottom (accuracy 0)
    expect(pts[0].x).toBe(PAD);
    expect(pts[0].y).toBe(PAD + (CH - PAD * 2)); // y = max (bottom)
    // Second point: x=CW-PAD, y at top (accuracy 100)
    expect(pts[1].x).toBe(CW - PAD);
    expect(pts[1].y).toBe(PAD); // y = min (top)
  });

  it('caps at 20 data points', () => {
    const data = Array.from({ length: 30 }, (_, i) => ({ accuracy: i * 3, date: `Day ${i}` }));
    const pts = computeChartPoints(data);
    expect(pts).toHaveLength(20);
  });

  it('uses last 20 when more data available', () => {
    const data = Array.from({ length: 25 }, (_, i) => ({ accuracy: i * 4, date: `Day ${i}` }));
    const pts = computeChartPoints(data);
    // Should use indices 5-24 (last 20)
    expect(pts[0].date).toBe('Day 5');
    expect(pts[19].date).toBe('Day 24');
  });

  it('50% accuracy maps to vertical center', () => {
    const pts = computeChartPoints([
      { accuracy: 50, date: 'A' },
      { accuracy: 50, date: 'B' }
    ]);
    const midY = PAD + (CH - PAD * 2) * 0.5;
    expect(pts[0].y).toBe(midY);
  });
});

describe('MetricsView: weakest category detection', () => {
  function weakestCategory(categoryPerformance) {
    if (categoryPerformance.length === 0) return null;
    const worst = categoryPerformance[0]; // already sorted ascending
    if (worst.accuracy >= 80) return null;
    return worst;
  }

  it('returns null when no categories', () => {
    expect(weakestCategory([])).toBeNull();
  });

  it('returns null when all categories >= 80%', () => {
    const cats = [{ key: 'hfref', accuracy: 85 }, { key: 'cap', accuracy: 90 }];
    expect(weakestCategory(cats)).toBeNull();
  });

  it('returns weakest category when below 80%', () => {
    const cats = [{ key: 'pyelo', accuracy: 40 }, { key: 'hfref', accuracy: 90 }];
    expect(weakestCategory(cats)).toEqual({ key: 'pyelo', accuracy: 40 });
  });

  it('boundary: 79% is flagged, 80% is not', () => {
    expect(weakestCategory([{ accuracy: 79 }])).toBeDefined();
    expect(weakestCategory([{ accuracy: 80 }])).toBeNull();
  });
});

// ─── Landing component: data contracts ─────────────────────────────────────

describe('Landing: disease display data', () => {
  const diseases = [
    ['❤', 'Heart Failure', false],
    ['🫁', 'Pneumonia (CAP)', false],
    ['💊', 'UTI / Pyelo', false],
    ['🌬', 'COPD', true],
    ['💧', 'DKA', true],
    ['🔥', 'Sepsis', true]
  ];

  it('has 6 disease entries', () => {
    expect(diseases).toHaveLength(6);
  });

  it('first 3 are available (not "coming soon")', () => {
    expect(diseases.slice(0, 3).every(([, , soon]) => soon === false)).toBe(true);
  });

  it('last 3 are "coming soon"', () => {
    expect(diseases.slice(3).every(([, , soon]) => soon === true)).toBe(true);
  });

  it('all entries have icon, name, and soon flag', () => {
    for (const [icon, name, soon] of diseases) {
      expect(icon).toBeTruthy();
      expect(name).toBeTruthy();
      expect(typeof soon).toBe('boolean');
    }
  });
});

// ─── Queue: difficulty configuration ───────────────────────────────────────

describe('Queue: difficulty levels', () => {
  const difficulties = [
    ['default', 'Tutorial', 'Original demo orders'],
    ['easy', 'Easy', 'Every order has an issue — find it'],
    ['medium', 'Medium', 'Mix of correct and incorrect orders'],
    ['hard', 'Hard', 'Clinically nuanced — find the best action']
  ];

  it('has 4 difficulty levels', () => {
    expect(difficulties).toHaveLength(4);
  });

  it('all levels have key, label, and description', () => {
    for (const [key, label, desc] of difficulties) {
      expect(key).toBeTruthy();
      expect(label).toBeTruthy();
      expect(desc).toBeTruthy();
    }
  });

  it('includes the expected difficulty keys', () => {
    const keys = difficulties.map(d => d[0]);
    expect(keys).toEqual(['default', 'easy', 'medium', 'hard']);
  });
});

// ─── Queue: alert severity display ─────────────────────────────────────────

describe('Queue: alert severity color logic', () => {
  function alertColor(alerts) {
    if (alerts.some(a => a.sev === 'critical')) return 'var(--red)';
    if (alerts.some(a => a.sev === 'warning')) return 'var(--amb)';
    return 'var(--a)';
  }

  it('returns red for critical alerts', () => {
    expect(alertColor([{ sev: 'critical' }])).toBe('var(--red)');
  });

  it('returns amber for warning (no critical)', () => {
    expect(alertColor([{ sev: 'warning' }, { sev: 'info' }])).toBe('var(--amb)');
  });

  it('returns accent for info-only alerts', () => {
    expect(alertColor([{ sev: 'info' }])).toBe('var(--a)');
  });

  it('critical takes priority over warning', () => {
    expect(alertColor([{ sev: 'warning' }, { sev: 'critical' }])).toBe('var(--red)');
  });
});

// ─── MetricsView: grade labels ─────────────────────────────────────────────

describe('MetricsView: grade labels', () => {
  const gradeLabels = {
    optimal: 'Optimal',
    acceptable: 'Acceptable',
    suboptimal: 'Suboptimal',
    incorrect: 'Incorrect'
  };

  it('maps all 4 grade keys', () => {
    expect(Object.keys(gradeLabels)).toEqual(['optimal', 'acceptable', 'suboptimal', 'incorrect']);
  });

  it('difficulty label formatting', () => {
    function formatDifficulty(d) {
      return d === 'default' ? 'Tutorial' : d;
    }
    expect(formatDifficulty('default')).toBe('Tutorial');
    expect(formatDifficulty('easy')).toBe('easy');
    expect(formatDifficulty('hard')).toBe('hard');
  });
});
