import { describe, it, expect } from 'vitest';
import { getLatestLab, calcCrCl, GRADE_CONFIG, scoreRejectReasons } from './clinical.js';

describe('getLatestLab', () => {
  it('returns dash when labs is null/undefined', () => {
    expect(getLatestLab(null, 'SCr')).toBe('\u2014');
    expect(getLatestLab(undefined, 'SCr')).toBe('\u2014');
  });

  it('returns dash when labs is empty', () => {
    expect(getLatestLab({}, 'SCr')).toBe('\u2014');
  });

  it('returns dash when key not found', () => {
    expect(getLatestLab({ '04/03 0500': { Na: '138' } }, 'SCr')).toBe('\u2014');
  });

  it('returns scalar lab value', () => {
    const labs = { '04/03 0500': { SCr: '1.6' } };
    expect(getLatestLab(labs, 'SCr')).toBe('1.6');
  });

  it('returns first element of array lab value (value with flag)', () => {
    const labs = { '04/03 0500': { SCr: ['1.6', 'H'] } };
    expect(getLatestLab(labs, 'SCr')).toBe('1.6');
  });

  it('returns from first datetime entry', () => {
    const labs = {
      '04/03 0500': { SCr: '1.6' },
      '04/02 0500': { SCr: '1.8' }
    };
    expect(getLatestLab(labs, 'SCr')).toBe('1.6');
  });
});

describe('calcCrCl', () => {
  it('calculates CrCl for a female patient', () => {
    // CrCl = ((140 - 64) * 72) / (72 * 1.6) * 0.85
    // = (76 * 72) / (115.2) * 0.85
    // = 5472 / 115.2 * 0.85
    // = 47.5 * 0.85 = 40.375 → 40 mL/min
    const patient = {
      age: '64F', weight: '72 kg',
      labs: { '04/03 0500': { SCr: ['1.6', 'H'] } }
    };
    expect(calcCrCl(patient)).toBe('40 mL/min');
  });

  it('calculates CrCl for a male patient', () => {
    // CrCl = ((140 - 47) * 95) / (72 * 1.0)
    // = (93 * 95) / 72
    // = 8835 / 72 = 122.7 → 123 mL/min
    const patient = {
      age: '47M', weight: '95 kg',
      labs: { '04/03 0500': { SCr: '1.0' } }
    };
    expect(calcCrCl(patient)).toBe('123 mL/min');
  });

  it('returns dash when SCr is missing', () => {
    const patient = { age: '64F', weight: '72 kg', labs: {} };
    expect(calcCrCl(patient)).toBe('\u2014');
  });

  it('returns dash when weight is missing', () => {
    const patient = {
      age: '64F',
      labs: { '04/03 0500': { SCr: '1.6' } }
    };
    expect(calcCrCl(patient)).toBe('\u2014');
  });

  it('returns dash when age is missing', () => {
    const patient = {
      weight: '72 kg',
      labs: { '04/03 0500': { SCr: '1.6' } }
    };
    expect(calcCrCl(patient)).toBe('\u2014');
  });

  it('handles elderly patient with high SCr', () => {
    // CrCl = ((140 - 80) * 60) / (72 * 2.5) * 0.85
    // = (60 * 60) / 180 * 0.85
    // = 3600 / 180 * 0.85
    // = 20 * 0.85 = 17 → 17 mL/min
    const patient = {
      age: '80F', weight: '60 kg',
      labs: { '04/03 0500': { SCr: '2.5' } }
    };
    expect(calcCrCl(patient)).toBe('17 mL/min');
  });
});

describe('GRADE_CONFIG', () => {
  it('optimal and acceptable advance the order', () => {
    expect(GRADE_CONFIG.optimal.advances).toBe(true);
    expect(GRADE_CONFIG.acceptable.advances).toBe(true);
  });

  it('suboptimal and incorrect do not advance', () => {
    expect(GRADE_CONFIG.suboptimal.advances).toBe(false);
    expect(GRADE_CONFIG.incorrect.advances).toBe(false);
  });

  it('has all four grade levels', () => {
    expect(Object.keys(GRADE_CONFIG)).toEqual(['optimal', 'acceptable', 'suboptimal', 'incorrect']);
  });
});

describe('scoreRejectReasons', () => {
  const reasons = [
    { id: 'r1', text: 'Wrong dose', correct: true },
    { id: 'r2', text: 'Drug interaction', correct: true },
    { id: 'r3', text: 'Allergy', correct: false },
    { id: 'r4', text: 'Wrong route', correct: false }
  ];

  it('scores perfect selection', () => {
    const result = scoreRejectReasons(reasons, new Set(['r1', 'r2']));
    expect(result.correctPicks).toBe(2);
    expect(result.falsePicks).toBe(0);
    expect(result.totalCorrectReasons).toBe(2);
    expect(result.allCorrectSelected).toBe(true);
  });

  it('detects missed correct reason', () => {
    const result = scoreRejectReasons(reasons, new Set(['r1']));
    expect(result.correctPicks).toBe(1);
    expect(result.falsePicks).toBe(0);
    expect(result.totalCorrectReasons).toBe(2);
    expect(result.allCorrectSelected).toBe(false);
  });

  it('detects incorrect selection', () => {
    const result = scoreRejectReasons(reasons, new Set(['r1', 'r2', 'r3']));
    expect(result.correctPicks).toBe(2);
    expect(result.falsePicks).toBe(1);
    expect(result.allCorrectSelected).toBe(false);
  });

  it('handles all wrong selections', () => {
    const result = scoreRejectReasons(reasons, new Set(['r3', 'r4']));
    expect(result.correctPicks).toBe(0);
    expect(result.falsePicks).toBe(2);
    expect(result.allCorrectSelected).toBe(false);
  });

  it('handles empty selection', () => {
    const result = scoreRejectReasons(reasons, new Set());
    expect(result.correctPicks).toBe(0);
    expect(result.falsePicks).toBe(0);
    expect(result.allCorrectSelected).toBe(false);
  });

  it('handles no correct reasons in the options', () => {
    const allWrong = [
      { id: 'r1', text: 'Not a reason', correct: false },
      { id: 'r2', text: 'Also not', correct: false }
    ];
    const result = scoreRejectReasons(allWrong, new Set());
    expect(result.totalCorrectReasons).toBe(0);
    expect(result.allCorrectSelected).toBe(true); // 0 of 0 correct, 0 false
  });
});
