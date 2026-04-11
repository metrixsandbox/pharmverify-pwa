import { describe, it, expect } from 'vitest';
import { DEMO_PATIENTS, DEMO_ORDERS, EASY_ORDERS, MEDIUM_ORDERS, HARD_ORDERS, getOrdersForDifficulty } from './demo.js';

const VALID_ACTIONS = ['verify', 'reject', 'message'];
const VALID_GRADES = ['optimal', 'acceptable', 'suboptimal', 'incorrect'];
const ALL_ORDER_SETS = { DEMO_ORDERS, EASY_ORDERS, MEDIUM_ORDERS, HARD_ORDERS };

// ─── Patient Structure Integrity ───────────────────────────────────────────

describe('DEMO_PATIENTS structure', () => {
  const patientIds = Object.keys(DEMO_PATIENTS);

  it('contains at least one patient', () => {
    expect(patientIds.length).toBeGreaterThan(0);
  });

  it('all patient IDs follow the Pxxx pattern', () => {
    for (const pid of patientIds) {
      expect(pid).toMatch(/^P\d{3}$/);
    }
  });

  describe.each(patientIds)('patient %s', (pid) => {
    const p = DEMO_PATIENTS[pid];

    it('has required identification fields', () => {
      expect(p.name).toBeTruthy();
      expect(p.mrn).toBeTruthy();
      expect(p.age).toBeTruthy();
      expect(p.dob).toBeTruthy();
    });

    it('age field contains gender indicator (M or F)', () => {
      expect(p.age).toMatch(/\d+[MF]$/);
    });

    it('has weight with unit', () => {
      expect(p.weight).toMatch(/\d+\s*kg/);
    });

    it('has room, admitDate, attending, dx, code', () => {
      expect(p.room).toBeTruthy();
      expect(p.admitDate).toBeTruthy();
      expect(p.attending).toBeTruthy();
      expect(p.dx).toBeTruthy();
      expect(p.code).toBeTruthy();
    });

    it('has allergies array', () => {
      expect(Array.isArray(p.allergies)).toBe(true);
      expect(p.allergies.length).toBeGreaterThan(0);
    });

    // H&P structure
    it('has complete H&P section', () => {
      expect(p.hp).toBeDefined();
      expect(p.hp.cc).toBeTruthy();
      expect(p.hp.hpi).toBeTruthy();
      expect(Array.isArray(p.hp.pmh)).toBe(true);
      expect(Array.isArray(p.hp.meds)).toBe(true);
      expect(p.hp.exam).toBeDefined();
      expect(p.hp.assessment).toBeTruthy();
      expect(Array.isArray(p.hp.plan)).toBe(true);
    });

    it('H&P exam has required sections', () => {
      expect(p.hp.exam.vitals).toBeTruthy();
      expect(p.hp.exam.cv).toBeTruthy();
      expect(p.hp.exam.pulm).toBeTruthy();
    });

    // Labs structure
    it('has labs object with at least one datetime entry', () => {
      expect(typeof p.labs).toBe('object');
      expect(Object.keys(p.labs).length).toBeGreaterThan(0);
    });

    it('lab values are either strings or [value, flag] arrays', () => {
      for (const [dt, labs] of Object.entries(p.labs)) {
        for (const [key, val] of Object.entries(labs)) {
          if (Array.isArray(val)) {
            expect(val).toHaveLength(2);
            expect(typeof val[0]).toBe('string');
            expect(['H', 'L']).toContain(val[1]);
          } else {
            expect(typeof val).toBe('string');
          }
        }
      }
    });

    // Notes structure
    it('has notes array with required fields', () => {
      expect(Array.isArray(p.notes)).toBe(true);
      for (const note of p.notes) {
        expect(note.dt).toBeTruthy();
        expect(note.author).toBeTruthy();
        expect(note.type).toBeTruthy();
        expect(note.text).toBeTruthy();
      }
    });

    // Medication lists
    it('has inpatientMeds array with required fields', () => {
      expect(Array.isArray(p.inpatientMeds)).toBe(true);
      for (const med of p.inpatientMeds) {
        expect(med.drug).toBeTruthy();
        expect(med.dose).toBeTruthy();
        expect(med.route).toBeTruthy();
        expect(med.freq).toBeTruthy();
        expect(med.status).toBeTruthy();
        expect(Array.isArray(med.sched)).toBe(true);
      }
    });

    it('has homeMeds array with required fields', () => {
      expect(Array.isArray(p.homeMeds)).toBe(true);
      for (const med of p.homeMeds) {
        expect(med.drug).toBeTruthy();
        expect(med.freq).toBeTruthy();
        expect(med.status).toBeTruthy();
      }
    });

    // Imaging
    it('has imaging array with required fields', () => {
      expect(Array.isArray(p.imaging)).toBe(true);
      for (const img of p.imaging) {
        expect(img.type).toBeTruthy();
        expect(img.date).toBeTruthy();
        expect(img.findings).toBeTruthy();
        expect(img.impression).toBeTruthy();
      }
    });

    // Cardio
    it('has cardio section with EKG', () => {
      expect(p.cardio).toBeDefined();
      expect(p.cardio.ekg).toBeDefined();
      expect(p.cardio.ekg.rhythm).toBeTruthy();
      expect(Array.isArray(p.cardio.ekg.intervals)).toBe(true);
      expect(p.cardio.ekg.interpretation).toBeTruthy();
    });

    it('EKG intervals have name, value, normal, flag', () => {
      for (const interval of p.cardio.ekg.intervals) {
        expect(interval.name).toBeTruthy();
        expect(interval.value).toBeTruthy();
        expect(interval.normal).toBeTruthy();
        expect(typeof interval.flag).toBe('string');
      }
    });
  });
});

// ─── Unique IDs ────────────────────────────────────────────────────────────

describe('unique identifiers', () => {
  it('all patient MRNs are unique', () => {
    const mrns = Object.values(DEMO_PATIENTS).map(p => p.mrn);
    expect(new Set(mrns).size).toBe(mrns.length);
  });

  it('all patient IDs are unique', () => {
    const ids = Object.keys(DEMO_PATIENTS);
    expect(new Set(ids).size).toBe(ids.length);
  });

  describe.each(Object.entries(ALL_ORDER_SETS))('%s has unique order IDs', (name, orders) => {
    it('no duplicate order ids', () => {
      const ids = orders.map(o => o.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});

// ─── Order Structure Integrity ─────────────────────────────────────────────

describe.each(Object.entries(ALL_ORDER_SETS))('%s order integrity', (setName, orders) => {
  it('contains at least one order', () => {
    expect(orders.length).toBeGreaterThan(0);
  });

  describe.each(orders.map(o => [o.id, o]))('order %s', (id, order) => {
    it('has required identification fields', () => {
      expect(order.id).toBeTruthy();
      expect(order.patientId).toBeTruthy();
      expect(order.orderId).toBeTruthy();
      expect(order.drugName).toBeTruthy();
    });

    it('references a valid patient', () => {
      expect(DEMO_PATIENTS[order.patientId]).toBeDefined();
    });

    it('has clinical details', () => {
      expect(order.clinical).toBeDefined();
      expect(order.clinical.dose).toBeTruthy();
      expect(order.clinical.route).toBeTruthy();
      expect(order.clinical.freq).toBeTruthy();
    });

    it('has valid priority', () => {
      expect(['Routine', 'Stat', 'Urgent']).toContain(order.priority);
    });

    it('has isNew boolean', () => {
      expect(typeof order.isNew).toBe('boolean');
    });

    it('has alerts array', () => {
      expect(Array.isArray(order.alerts)).toBe(true);
    });

    it('has schedule array', () => {
      expect(Array.isArray(order.schedule)).toBe(true);
    });
  });
});

// ─── Teaching Data Integrity ───────────────────────────────────────────────

describe.each(Object.entries(ALL_ORDER_SETS))('%s teaching data', (setName, orders) => {
  const ordersWithTeaching = orders.filter(o => o.teaching);

  it('all orders have teaching data', () => {
    expect(ordersWithTeaching.length).toBe(orders.length);
  });

  describe.each(ordersWithTeaching.map(o => [o.id, o]))('order %s teaching', (id, order) => {
    const teaching = order.teaching;

    it('has a valid correctAction', () => {
      expect(VALID_ACTIONS).toContain(teaching.correctAction);
    });

    it('has an explanation string', () => {
      expect(typeof teaching.explanation).toBe('string');
      expect(teaching.explanation.length).toBeGreaterThan(10);
    });

    // Reject reasons validation
    if (teaching.correctAction === 'reject' || teaching.rejectReasons) {
      it('reject orders have rejectReasons array', () => {
        if (teaching.correctAction === 'reject') {
          expect(Array.isArray(teaching.rejectReasons)).toBe(true);
          expect(teaching.rejectReasons.length).toBeGreaterThan(0);
        }
      });
    }

    if (teaching.rejectReasons) {
      it('rejectReasons have unique IDs', () => {
        const ids = teaching.rejectReasons.map(r => r.id);
        expect(new Set(ids).size).toBe(ids.length);
      });

      it('rejectReasons have required fields', () => {
        for (const reason of teaching.rejectReasons) {
          expect(reason.id).toBeTruthy();
          expect(typeof reason.text).toBe('string');
          expect(reason.text.length).toBeGreaterThan(0);
          expect(typeof reason.correct).toBe('boolean');
        }
      });

      it('rejectReasons include at least one correct reason', () => {
        const correctCount = teaching.rejectReasons.filter(r => r.correct).length;
        expect(correctCount).toBeGreaterThan(0);
      });

      it('rejectReasons include at least one incorrect distractor', () => {
        const incorrectCount = teaching.rejectReasons.filter(r => !r.correct).length;
        expect(incorrectCount).toBeGreaterThan(0);
      });
    }

    // DetailedFeedback (hard mode) validation
    if (teaching.detailedFeedback) {
      it('detailedFeedback covers all three actions', () => {
        expect(teaching.detailedFeedback.verify).toBeDefined();
        expect(teaching.detailedFeedback.reject).toBeDefined();
        expect(teaching.detailedFeedback.message).toBeDefined();
      });

      it('detailedFeedback entries have valid grades', () => {
        for (const [action, fb] of Object.entries(teaching.detailedFeedback)) {
          expect(VALID_GRADES).toContain(fb.grade);
          expect(typeof fb.message).toBe('string');
          expect(fb.message.length).toBeGreaterThan(10);
        }
      });

      it('exactly one action is graded "optimal"', () => {
        const optimalCount = Object.values(teaching.detailedFeedback)
          .filter(fb => fb.grade === 'optimal').length;
        expect(optimalCount).toBe(1);
      });

      it('the optimal grade matches correctAction', () => {
        const optimalAction = Object.entries(teaching.detailedFeedback)
          .find(([, fb]) => fb.grade === 'optimal')[0];
        expect(optimalAction).toBe(teaching.correctAction);
      });
    }
  });
});

// ─── Difficulty Order Sets ─────────────────────────────────────────────────

describe('difficulty order sets', () => {
  it('EASY_ORDERS: all orders should be rejected', () => {
    for (const order of EASY_ORDERS) {
      expect(order.teaching.correctAction).toBe('reject');
    }
  });

  it('MEDIUM_ORDERS: has a mix of verify and reject', () => {
    const actions = MEDIUM_ORDERS.map(o => o.teaching.correctAction);
    expect(actions).toContain('verify');
    expect(actions).toContain('reject');
  });

  it('HARD_ORDERS: all have detailedFeedback (graded mode)', () => {
    for (const order of HARD_ORDERS) {
      expect(order.teaching.detailedFeedback).toBeDefined();
    }
  });

  it('HARD_ORDERS: has a mix of optimal actions', () => {
    const optimalActions = HARD_ORDERS.map(o => {
      const fb = o.teaching.detailedFeedback;
      return Object.entries(fb).find(([, v]) => v.grade === 'optimal')[0];
    });
    const unique = new Set(optimalActions);
    expect(unique.size).toBeGreaterThan(1);
  });
});

// ─── getOrdersForDifficulty ────────────────────────────────────────────────

describe('getOrdersForDifficulty', () => {
  it('returns DEMO_ORDERS for "default"', () => {
    expect(getOrdersForDifficulty('default')).toBe(DEMO_ORDERS);
  });

  it('returns EASY_ORDERS for "easy"', () => {
    expect(getOrdersForDifficulty('easy')).toBe(EASY_ORDERS);
  });

  it('returns MEDIUM_ORDERS for "medium"', () => {
    expect(getOrdersForDifficulty('medium')).toBe(MEDIUM_ORDERS);
  });

  it('returns HARD_ORDERS for "hard"', () => {
    expect(getOrdersForDifficulty('hard')).toBe(HARD_ORDERS);
  });

  it('returns DEMO_ORDERS for unknown difficulty', () => {
    expect(getOrdersForDifficulty('extreme')).toBe(DEMO_ORDERS);
  });
});

// ─── Cross-referencing orders ↔ patients ───────────────────────────────────

describe('cross-referencing', () => {
  describe.each(Object.entries(ALL_ORDER_SETS))('%s patient coverage', (setName, orders) => {
    it('every referenced patient exists in DEMO_PATIENTS', () => {
      const referenced = new Set(orders.map(o => o.patientId));
      for (const pid of referenced) {
        expect(DEMO_PATIENTS[pid]).toBeDefined();
      }
    });
  });

  it('every demo patient has at least one order in DEMO_ORDERS', () => {
    const patientsWithOrders = new Set(DEMO_ORDERS.map(o => o.patientId));
    for (const pid of Object.keys(DEMO_PATIENTS)) {
      expect(patientsWithOrders.has(pid)).toBe(true);
    }
  });
});
