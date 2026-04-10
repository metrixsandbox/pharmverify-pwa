import { describe, it, expect } from 'vitest';
import { DISEASES, PHASES, DISEASE_CASES, getDiseaseCases } from './diseases.js';

const VALID_ACTIONS = ['verify', 'reject', 'message'];
const VALID_GRADES = ['optimal', 'acceptable', 'suboptimal', 'incorrect'];
const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'];

// ─── DISEASES & PHASES metadata ────────────────────────────────────────────

describe('DISEASES metadata', () => {
  it('contains at least 5 disease entries', () => {
    expect(DISEASES.length).toBeGreaterThanOrEqual(5);
  });

  it('all diseases have required fields', () => {
    for (const d of DISEASES) {
      expect(d.id).toBeTruthy();
      expect(d.label).toBeTruthy();
      expect(d.icon).toBeTruthy();
      expect(d.desc).toBeTruthy();
    }
  });

  it('all disease IDs are unique', () => {
    const ids = DISEASES.map(d => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('PHASES metadata', () => {
  it('contains admission, mid, and discharge phases', () => {
    const phaseIds = PHASES.map(p => p.id);
    expect(phaseIds).toContain('admission');
    expect(phaseIds).toContain('mid');
    expect(phaseIds).toContain('discharge');
  });

  it('all phases have required fields', () => {
    for (const p of PHASES) {
      expect(p.id).toBeTruthy();
      expect(p.label).toBeTruthy();
      expect(p.short).toBeTruthy();
      expect(p.desc).toBeTruthy();
    }
  });
});

// ─── DISEASE_CASES structure ───────────────────────────────────────────────

describe('DISEASE_CASES structure', () => {
  const implementedDiseases = Object.keys(DISEASE_CASES);

  it('has at least 3 implemented diseases', () => {
    expect(implementedDiseases.length).toBeGreaterThanOrEqual(3);
  });

  it('all implemented disease IDs match a DISEASES entry', () => {
    const validIds = DISEASES.map(d => d.id);
    for (const id of implementedDiseases) {
      expect(validIds).toContain(id);
    }
  });

  describe.each(implementedDiseases)('disease "%s"', (diseaseId) => {
    const disease = DISEASE_CASES[diseaseId];
    const phases = Object.keys(disease);

    it('has at least an admission phase', () => {
      expect(disease.admission).toBeDefined();
    });

    describe.each(phases)('phase "%s"', (phase) => {
      const phaseData = disease[phase];

      it('has patients object', () => {
        expect(phaseData.patients).toBeDefined();
        expect(typeof phaseData.patients).toBe('object');
        expect(Object.keys(phaseData.patients).length).toBeGreaterThan(0);
      });

      it('has orders object with easy, medium, hard arrays', () => {
        expect(phaseData.orders).toBeDefined();
        for (const level of DIFFICULTY_LEVELS) {
          expect(Array.isArray(phaseData.orders[level])).toBe(true);
          expect(phaseData.orders[level].length).toBeGreaterThan(0);
        }
      });

      // Validate patient structure
      describe('patients', () => {
        const patientIds = Object.keys(phaseData.patients);

        describe.each(patientIds)('patient %s', (pid) => {
          const p = phaseData.patients[pid];

          it('has required identification fields', () => {
            expect(p.name).toBeTruthy();
            expect(p.mrn).toBeTruthy();
            expect(p.age).toBeTruthy();
          });

          it('age field contains gender indicator', () => {
            expect(p.age).toMatch(/\d+[MF]$/);
          });

          it('has H&P section', () => {
            expect(p.hp).toBeDefined();
            expect(p.hp.cc).toBeTruthy();
            expect(p.hp.hpi).toBeTruthy();
          });

          it('has labs object', () => {
            expect(typeof p.labs).toBe('object');
          });

          it('lab values use correct format', () => {
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

          it('has medication lists as arrays', () => {
            expect(Array.isArray(p.inpatientMeds)).toBe(true);
            expect(Array.isArray(p.homeMeds)).toBe(true);
          });

          it('inpatientMeds have required fields', () => {
            for (const med of p.inpatientMeds) {
              expect(med.drug).toBeTruthy();
              expect(med.dose).toBeTruthy();
              expect(med.route).toBeTruthy();
              expect(med.freq).toBeTruthy();
              expect(med.status).toBeTruthy();
            }
          });
        });
      });

      // Validate order structure per difficulty
      describe.each(DIFFICULTY_LEVELS)('orders [%s]', (level) => {
        const orders = phaseData.orders[level];
        const patientIds = Object.keys(phaseData.patients);

        it('all orders have unique IDs', () => {
          const ids = orders.map(o => o.id);
          expect(new Set(ids).size).toBe(ids.length);
        });

        describe.each(orders.map(o => [o.id, o]))('order %s', (id, order) => {
          it('has required fields', () => {
            expect(order.id).toBeTruthy();
            expect(order.patientId).toBeTruthy();
            expect(order.drugName).toBeTruthy();
            expect(order.clinical).toBeDefined();
          });

          it('references a valid patient in this phase', () => {
            expect(patientIds).toContain(order.patientId);
          });

          it('has teaching data', () => {
            expect(order.teaching).toBeDefined();
          });

          it('teaching has valid correctAction', () => {
            expect(VALID_ACTIONS).toContain(order.teaching.correctAction);
          });

          it('teaching has explanation', () => {
            expect(typeof order.teaching.explanation).toBe('string');
            expect(order.teaching.explanation.length).toBeGreaterThan(10);
          });

          // Reject reasons validation
          if (order.teaching.rejectReasons) {
            it('rejectReasons have unique IDs', () => {
              const ids = order.teaching.rejectReasons.map(r => r.id);
              expect(new Set(ids).size).toBe(ids.length);
            });

            it('rejectReasons have required fields', () => {
              for (const r of order.teaching.rejectReasons) {
                expect(r.id).toBeTruthy();
                expect(typeof r.text).toBe('string');
                expect(typeof r.correct).toBe('boolean');
              }
            });

            if (order.teaching.correctAction === 'reject') {
              it('reject-action orders have at least one correct and one incorrect reason', () => {
                expect(order.teaching.rejectReasons.some(r => r.correct)).toBe(true);
                expect(order.teaching.rejectReasons.some(r => !r.correct)).toBe(true);
              });
            }
          }

          // DetailedFeedback validation (hard mode)
          if (order.teaching.detailedFeedback) {
            it('detailedFeedback covers verify, reject, message', () => {
              expect(order.teaching.detailedFeedback.verify).toBeDefined();
              expect(order.teaching.detailedFeedback.reject).toBeDefined();
              expect(order.teaching.detailedFeedback.message).toBeDefined();
            });

            it('detailedFeedback entries have valid grades and messages', () => {
              for (const [, fb] of Object.entries(order.teaching.detailedFeedback)) {
                expect(VALID_GRADES).toContain(fb.grade);
                expect(typeof fb.message).toBe('string');
                expect(fb.message.length).toBeGreaterThan(0);
              }
            });

            it('exactly one action is graded "optimal"', () => {
              const optimalCount = Object.values(order.teaching.detailedFeedback)
                .filter(fb => fb.grade === 'optimal').length;
              expect(optimalCount).toBe(1);
            });

            it('optimal grade matches correctAction', () => {
              const optimalAction = Object.entries(order.teaching.detailedFeedback)
                .find(([, fb]) => fb.grade === 'optimal')[0];
              expect(optimalAction).toBe(order.teaching.correctAction);
            });
          }
        });
      });

      // Easy mode: all should be reject
      it('easy orders are all "reject"', () => {
        for (const order of phaseData.orders.easy) {
          expect(order.teaching.correctAction).toBe('reject');
        }
      });

      // Hard mode: all should have detailedFeedback
      it('hard orders all have detailedFeedback', () => {
        for (const order of phaseData.orders.hard) {
          expect(order.teaching.detailedFeedback).toBeDefined();
        }
      });
    });
  });
});

// ─── getDiseaseCases function ──────────────────────────────────────────────

describe('getDiseaseCases', () => {
  it('returns null for non-existent disease', () => {
    expect(getDiseaseCases('nonexistent', 'medium')).toBeNull();
  });

  it('returns data for valid disease + level', () => {
    const result = getDiseaseCases('hf', 'medium');
    expect(result).not.toBeNull();
    expect(result.patients).toBeDefined();
    expect(Array.isArray(result.orders)).toBe(true);
    expect(result.orders.length).toBeGreaterThan(0);
  });

  it('returns correct difficulty orders', () => {
    const easy = getDiseaseCases('hf', 'easy');
    const hard = getDiseaseCases('hf', 'hard');
    // Easy orders should all be reject
    for (const o of easy.orders) {
      expect(o.teaching.correctAction).toBe('reject');
    }
    // Hard orders should have detailedFeedback
    for (const o of hard.orders) {
      expect(o.teaching.detailedFeedback).toBeDefined();
    }
  });

  it('falls back to admission phase when phase not found', () => {
    const result = getDiseaseCases('cap', 'medium', 'discharge');
    // CAP only has admission, should fall back
    expect(result).not.toBeNull();
    expect(result.orders.length).toBeGreaterThan(0);
  });

  it('falls back to medium when difficulty not found', () => {
    const result = getDiseaseCases('hf', 'nonexistent');
    expect(result).not.toBeNull();
    expect(result.orders.length).toBeGreaterThan(0);
  });

  it('returns different phases for heart failure', () => {
    const admission = getDiseaseCases('hf', 'medium', 'admission');
    const mid = getDiseaseCases('hf', 'medium', 'mid');
    const discharge = getDiseaseCases('hf', 'medium', 'discharge');
    expect(admission).not.toBeNull();
    expect(mid).not.toBeNull();
    expect(discharge).not.toBeNull();
    // Different phases should have different patients (or at least different orders)
    expect(admission.orders).not.toEqual(mid.orders);
    expect(mid.orders).not.toEqual(discharge.orders);
  });

  // Validate all implemented disease/level/phase combos return valid data
  describe.each(Object.keys(DISEASE_CASES))('disease "%s" all combos', (diseaseId) => {
    const disease = DISEASE_CASES[diseaseId];
    const phases = Object.keys(disease);

    describe.each(phases)('phase "%s"', (phase) => {
      describe.each(DIFFICULTY_LEVELS)('level "%s"', (level) => {
        it('getDiseaseCases returns valid data', () => {
          const result = getDiseaseCases(diseaseId, level, phase);
          expect(result).not.toBeNull();
          expect(Object.keys(result.patients).length).toBeGreaterThan(0);
          expect(result.orders.length).toBeGreaterThan(0);
        });

        it('all returned orders reference valid patients', () => {
          const result = getDiseaseCases(diseaseId, level, phase);
          const patientIds = Object.keys(result.patients);
          for (const order of result.orders) {
            expect(patientIds).toContain(order.patientId);
          }
        });
      });
    });
  });
});

// ─── Cross-cutting data quality ────────────────────────────────────────────

describe('cross-cutting data quality', () => {
  it('no order IDs collide across demo.js and diseases.js', () => {
    // Import all demo order IDs
    const { DEMO_ORDERS, EASY_ORDERS, MEDIUM_ORDERS, HARD_ORDERS } = require('./demo.js');
    const demoIds = new Set([
      ...DEMO_ORDERS.map(o => o.id),
      ...EASY_ORDERS.map(o => o.id),
      ...MEDIUM_ORDERS.map(o => o.id),
      ...HARD_ORDERS.map(o => o.id)
    ]);

    // Collect all disease order IDs
    for (const [, disease] of Object.entries(DISEASE_CASES)) {
      for (const [, phase] of Object.entries(disease)) {
        for (const level of DIFFICULTY_LEVELS) {
          for (const order of phase.orders[level]) {
            expect(demoIds.has(order.id)).toBe(false);
          }
        }
      }
    }
  });

  it('no patient IDs collide between demo and disease patients', () => {
    const { DEMO_PATIENTS } = require('./demo.js');
    const demoPatientIds = new Set(Object.keys(DEMO_PATIENTS));

    for (const [, disease] of Object.entries(DISEASE_CASES)) {
      for (const [, phase] of Object.entries(disease)) {
        for (const pid of Object.keys(phase.patients)) {
          expect(demoPatientIds.has(pid)).toBe(false);
        }
      }
    }
  });
});
