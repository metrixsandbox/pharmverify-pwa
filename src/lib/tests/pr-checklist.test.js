import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DISEASE_CASES, DISEASES, getDiseaseCases } from '../data/diseases.js';
import { DEMO_ORDERS, EASY_ORDERS, MEDIUM_ORDERS, HARD_ORDERS } from '../data/demo.js';

const ALL_DISEASE_ORDERS = [];
const ALL_DEMO_ORDERS = [...DEMO_ORDERS, ...EASY_ORDERS, ...MEDIUM_ORDERS, ...HARD_ORDERS];

for (const [, disease] of Object.entries(DISEASE_CASES)) {
  for (const [, phase] of Object.entries(disease)) {
    for (const [, orders] of Object.entries(phase.orders)) {
      ALL_DISEASE_ORDERS.push(...orders);
    }
  }
}

const ALL_ORDERS = [...ALL_DEMO_ORDERS, ...ALL_DISEASE_ORDERS];

// ─── 1. Verify guideline links open correct external URLs ───────────────────

describe('guideline links have valid URLs', () => {
  const ordersWithGuidelines = ALL_ORDERS.filter(o => o.teaching?.guideline);

  it('at least 20 orders have guideline links', () => {
    expect(ordersWithGuidelines.length).toBeGreaterThanOrEqual(20);
  });

  it('all guideline objects have name and url fields', () => {
    for (const o of ordersWithGuidelines) {
      const g = o.teaching.guideline;
      expect(g.name, `order ${o.id} guideline missing name`).toBeTruthy();
      expect(g.url, `order ${o.id} guideline missing url`).toBeTruthy();
    }
  });

  it('all guideline URLs start with https://', () => {
    for (const o of ordersWithGuidelines) {
      expect(o.teaching.guideline.url, `order ${o.id}`)
        .toMatch(/^https:\/\//);
    }
  });

  it('all guideline URLs are valid URL format', () => {
    for (const o of ordersWithGuidelines) {
      expect(() => new URL(o.teaching.guideline.url)).not.toThrow();
    }
  });

  it('guideline names are descriptive (> 10 chars)', () => {
    for (const o of ordersWithGuidelines) {
      expect(o.teaching.guideline.name.length, `order ${o.id}`)
        .toBeGreaterThan(10);
    }
  });

  it('AKI orders reference KDIGO guideline', () => {
    const akiOrders = ALL_DISEASE_ORDERS.filter(o => o.id.startsWith('AKI_'));
    const withGuidelines = akiOrders.filter(o => o.teaching?.guideline);
    expect(withGuidelines.length).toBeGreaterThan(0);
    for (const o of withGuidelines) {
      expect(o.teaching.guideline.name).toMatch(/KDIGO/i);
    }
  });

  it('DKA orders reference ADA guideline', () => {
    const dkaOrders = ALL_DISEASE_ORDERS.filter(o => o.id.startsWith('DKA_'));
    const withGuidelines = dkaOrders.filter(o => o.teaching?.guideline);
    expect(withGuidelines.length).toBeGreaterThan(0);
    for (const o of withGuidelines) {
      expect(o.teaching.guideline.name).toMatch(/ADA/i);
    }
  });

  it('COPD orders reference GOLD guideline', () => {
    const copdOrders = ALL_DISEASE_ORDERS.filter(o => o.id.startsWith('COPD_'));
    const withGuidelines = copdOrders.filter(o => o.teaching?.guideline);
    expect(withGuidelines.length).toBeGreaterThan(0);
    for (const o of withGuidelines) {
      expect(o.teaching.guideline.name).toMatch(/GOLD/i);
    }
  });
});

// ─── 2. Mobile layout CSS breakpoint verification ───────────────────────────

describe('mobile layout CSS', () => {
  let css;

  beforeEach(async () => {
    const fs = await import('fs');
    css = fs.readFileSync('src/app.css', 'utf-8');
  });

  it('has a 768px media query breakpoint', () => {
    expect(css).toContain('@media(max-width:768px)');
  });

  it('mobile styles include sidebar bottom nav', () => {
    expect(css).toMatch(/\.sb\s*\{[^}]*bottom/);
  });

  it('mobile styles include responsive grid adjustments', () => {
    expect(css).toMatch(/grid-template-columns.*1fr/);
  });

  it('has case builder styles', () => {
    expect(css).toContain('.cb-wrap');
    expect(css).toContain('.cb-card');
    expect(css).toContain('.cb-grid');
  });

  it('has decision tree styles', () => {
    expect(css).toContain('.dt-toggle');
    expect(css).toContain('.dt-steps');
    expect(css).toContain('.dt-conclusion');
  });
});

// ─── 3. Class creation and student data import/export ───────────────────────

describe('cohort store', () => {
  let createClass, importStudentData, exportStudentData, classStats, cohort;

  beforeEach(async () => {
    localStorage.clear();
    vi.resetModules();
    const mod = await import('../stores/cohort.js');
    createClass = mod.createClass;
    importStudentData = mod.importStudentData;
    exportStudentData = mod.exportStudentData;
    classStats = mod.classStats;
    cohort = mod.cohort;
  });

  it('createClass generates a class with a 6-char code', () => {
    const cls = createClass('Pharm 101', 'Dr. Smith');
    expect(cls).toBeDefined();
    expect(cls.name).toBe('Pharm 101');
    expect(cls.createdBy).toBe('Dr. Smith');
    expect(cls.code).toHaveLength(6);
  });

  it('createClass persists to localStorage', () => {
    createClass('Test Class', 'Prof');
    const saved = JSON.parse(localStorage.getItem('pv-cohort'));
    expect(saved).toBeDefined();
    expect(saved.name).toBe('Test Class');
  });

  it('importStudentData adds students and deduplicates by email', () => {
    createClass('Test', 'Prof');

    const data1 = JSON.stringify({
      student: { name: 'Alice', email: 'alice@test.com' },
      metrics: { attempts: [{ orderId: 'o1', isCorrect: true, timestamp: Date.now() }], sessions: [] },
      class: { code: 'ABC123', name: 'Test' }
    });
    importStudentData(data1);

    const data2 = JSON.stringify({
      student: { name: 'Alice Updated', email: 'alice@test.com' },
      metrics: { attempts: [{ orderId: 'o2', isCorrect: false, timestamp: Date.now() }], sessions: [] },
      class: { code: 'ABC123', name: 'Test' }
    });
    importStudentData(data2);

    const saved = JSON.parse(localStorage.getItem('pv-roster'));
    expect(saved).toHaveLength(1);
    expect(saved[0].student.name).toBe('Alice Updated');
  });

  it('exportStudentData creates valid JSON with user info', () => {
    const user = { name: 'Bob', email: 'bob@test.com', role: 'student' };
    const attempts = [{ orderId: 'o1', isCorrect: true, clinicalCategory: 'hfref' }];
    const sessions = [{ id: 's1', totalAttempts: 1, correctAttempts: 1 }];

    const json = exportStudentData(user, attempts, sessions, null);
    const parsed = JSON.parse(json);

    expect(parsed.student.name).toBe('Bob');
    expect(parsed.student.email).toBe('bob@test.com');
    expect(parsed.metrics.attempts).toHaveLength(1);
    expect(parsed.metrics.sessions).toHaveLength(1);
    expect(parsed.exportedAt).toBeTruthy();
  });
});

// ─── 4. Decision tree structure validation ──────────────────────────────────

describe('decision tree data', () => {
  const ordersWithTrees = ALL_ORDERS.filter(o => o.teaching?.decisionTree);

  it('at least 3 orders have decision trees', () => {
    expect(ordersWithTrees.length).toBeGreaterThanOrEqual(3);
  });

  it('all decision trees have title', () => {
    for (const o of ordersWithTrees) {
      expect(o.teaching.decisionTree.title, `order ${o.id}`).toBeTruthy();
    }
  });

  it('all decision trees have at least 2 steps', () => {
    for (const o of ordersWithTrees) {
      expect(o.teaching.decisionTree.steps.length, `order ${o.id}`)
        .toBeGreaterThanOrEqual(2);
    }
  });

  it('all steps have question and answer fields', () => {
    for (const o of ordersWithTrees) {
      for (const step of o.teaching.decisionTree.steps) {
        expect(step.q, `order ${o.id} step`).toBeTruthy();
        expect(step.a, `order ${o.id} step`).toBeTruthy();
      }
    }
  });

  it('all steps have valid icon type', () => {
    const validIcons = ['check', 'x', 'warn', undefined];
    for (const o of ordersWithTrees) {
      for (const step of o.teaching.decisionTree.steps) {
        expect(validIcons, `order ${o.id}`).toContain(step.icon);
      }
    }
  });

  it('all decision trees have a conclusion', () => {
    for (const o of ordersWithTrees) {
      expect(o.teaching.decisionTree.conclusion, `order ${o.id}`).toBeTruthy();
    }
  });

  it('trees span multiple diseases', () => {
    const diseaseIds = new Set(ordersWithTrees.map(o => o.id.split('_')[0]));
    expect(diseaseIds.size).toBeGreaterThanOrEqual(2);
  });
});

// ─── 5. All 3 new disease states load correctly in queue ────────────────────

describe('new disease states load correctly', () => {
  const newDiseases = ['copd', 'dka', 'aki'];

  it('all 3 new diseases exist in DISEASE_CASES', () => {
    for (const id of newDiseases) {
      expect(DISEASE_CASES[id], `${id} not in DISEASE_CASES`).toBeDefined();
    }
  });

  it('all 3 new diseases have non-"Coming soon" descriptions in DISEASES metadata', () => {
    for (const id of newDiseases) {
      const meta = DISEASES.find(d => d.id === id);
      expect(meta, `${id} not in DISEASES`).toBeDefined();
      expect(meta.desc).not.toBe('Coming soon');
    }
  });

  it('all 3 have phases defined in DISEASES metadata', () => {
    for (const id of newDiseases) {
      const meta = DISEASES.find(d => d.id === id);
      expect(meta.phases).toBeDefined();
      expect(meta.phases).toContain('admission');
    }
  });

  describe.each(newDiseases)('disease "%s"', (diseaseId) => {
    it('has admission phase with patients', () => {
      const dc = DISEASE_CASES[diseaseId];
      expect(dc.admission).toBeDefined();
      expect(Object.keys(dc.admission.patients).length).toBeGreaterThan(0);
    });

    it('has easy, medium, and hard orders', () => {
      const dc = DISEASE_CASES[diseaseId];
      expect(dc.admission.orders.easy.length).toBeGreaterThanOrEqual(3);
      expect(dc.admission.orders.medium.length).toBeGreaterThanOrEqual(3);
      expect(dc.admission.orders.hard.length).toBeGreaterThanOrEqual(3);
    });

    it('getDiseaseCases returns valid data for all difficulty levels', () => {
      for (const level of ['easy', 'medium', 'hard']) {
        const result = getDiseaseCases(diseaseId, level);
        expect(result, `${diseaseId}/${level}`).not.toBeNull();
        expect(result.patients).toBeDefined();
        expect(result.orders.length).toBeGreaterThan(0);
      }
    });

    it('all orders reference valid patients', () => {
      const dc = DISEASE_CASES[diseaseId];
      const patientIds = Object.keys(dc.admission.patients);
      for (const level of ['easy', 'medium', 'hard']) {
        for (const o of dc.admission.orders[level]) {
          expect(patientIds).toContain(o.patientId);
        }
      }
    });

    it('patient has complete clinical data', () => {
      const dc = DISEASE_CASES[diseaseId];
      const pid = Object.keys(dc.admission.patients)[0];
      const p = dc.admission.patients[pid];
      expect(p.name).toBeTruthy();
      expect(p.age).toMatch(/\d+[MF]$/);
      expect(p.hp.cc).toBeTruthy();
      expect(p.hp.hpi).toBeTruthy();
      expect(p.hp.assessment).toBeTruthy();
      expect(Object.keys(p.labs).length).toBeGreaterThan(0);
      expect(p.inpatientMeds.length).toBeGreaterThan(0);
    });

    it('easy orders are all "reject"', () => {
      const dc = DISEASE_CASES[diseaseId];
      for (const o of dc.admission.orders.easy) {
        expect(o.teaching.correctAction).toBe('reject');
      }
    });

    it('hard orders all have detailedFeedback', () => {
      const dc = DISEASE_CASES[diseaseId];
      for (const o of dc.admission.orders.hard) {
        expect(o.teaching.detailedFeedback).toBeDefined();
      }
    });

    it('all orders have guideline references', () => {
      const dc = DISEASE_CASES[diseaseId];
      for (const level of ['easy', 'medium', 'hard']) {
        for (const o of dc.admission.orders[level]) {
          expect(o.teaching.guideline, `${o.id} missing guideline`).toBeDefined();
          expect(o.teaching.guideline.url).toMatch(/^https:\/\//);
        }
      }
    });
  });
});
