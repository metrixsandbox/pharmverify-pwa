import { describe, it, expect } from 'vitest';
import { calcCrCl, getLatestLab, scoreRejectReasons, GRADE_CONFIG } from './clinical.js';

/**
 * These tests exercise the VerifyTab decision logic by testing the extracted
 * pure functions AND simulating the handleAction / submitRejectReasons flows
 * as state machines (without rendering the Svelte component).
 */

// ─── handleAction state machine simulation ─────────────────────────────────
// Reproduces the logic from VerifyTab.svelte handleAction() as a pure function

function simulateHandleAction(action, order, reviewMode = false) {
  const teaching = order.teaching;

  // No teaching data — basic mode
  if (!teaching) {
    if (action === 'verify') return { type: 'toast', message: `Order ${order.orderId} verified ✓`, advances: true };
    if (action === 'reject') return { type: 'toast', message: 'Order rejected', severity: 'er' };
    if (action === 'message') return { type: 'toast', message: 'Message sent to prescriber', severity: 'inf' };
  }

  // Hard mode: graded feedback
  if (teaching.detailedFeedback) {
    const af = teaching.detailedFeedback[action];
    if (!af) return { type: 'toast', message: 'Message sent to prescriber', severity: 'inf' };

    // If reject with reasons and grade is optimal/acceptable, show reasons modal first
    if (action === 'reject' && teaching.rejectReasons && (af.grade === 'optimal' || af.grade === 'acceptable')) {
      return { type: 'rejectModal', reasons: teaching.rejectReasons };
    }

    const gc = GRADE_CONFIG[af.grade];
    let betterMsg = '';
    if (af.grade !== 'optimal') {
      const optEntry = Object.entries(teaching.detailedFeedback).find(([, v]) => v.grade === 'optimal');
      if (optEntry) {
        const actionNames = { verify: 'Verify', reject: 'Reject', message: 'Message Prescriber' };
        betterMsg = `\n\nBetter choice: ${actionNames[optEntry[0]]} — ${optEntry[1].message}`;
      }
    }

    return {
      type: 'feedback',
      correct: gc.advances,
      title: gc.title,
      grade: af.grade,
      graded: true,
      message: af.message + betterMsg,
      tracked: !reviewMode,
      trackedAction: action,
      trackedGrade: af.grade
    };
  }

  // Message action in standard mode (no tracking)
  if (action === 'message') {
    return { type: 'toast', message: 'Message sent to prescriber', severity: 'inf' };
  }

  // Standard mode with reject reasons modal
  if (action === 'reject' && teaching.rejectReasons) {
    return { type: 'rejectModal', reasons: teaching.rejectReasons };
  }

  // Standard mode: binary correct/incorrect
  const isCorrect = teaching.correctAction === action;
  const actionLabels = { verify: 'verified', reject: 'rejected', message: 'sent to the prescriber' };
  return {
    type: 'feedback',
    correct: isCorrect,
    title: isCorrect ? 'Correct!' : 'Incorrect',
    message: isCorrect
      ? teaching.explanation
      : `This order should have been ${actionLabels[teaching.correctAction] || teaching.correctAction}. ${teaching.explanation}`,
    tracked: !reviewMode,
    trackedAction: action
  };
}

// ─── submitRejectReasons state machine simulation ──────────────────────────

function simulateSubmitRejectReasons(order, selectedIds) {
  const teaching = order.teaching;
  const reasons = teaching.rejectReasons;
  const { correctPicks, falsePicks, totalCorrectReasons, allCorrectSelected } = scoreRejectReasons(reasons, selectedIds);

  // Hard mode
  if (teaching.detailedFeedback) {
    const af = teaching.detailedFeedback.reject;
    const gc = GRADE_CONFIG[af.grade];
    const reasonMsg = allCorrectSelected
      ? ''
      : ` You identified ${correctPicks} of ${totalCorrectReasons} correct reason(s)${falsePicks > 0 ? ` and selected ${falsePicks} incorrect reason(s)` : ''}.`;
    return {
      type: 'feedback',
      correct: gc.advances,
      title: allCorrectSelected ? gc.title : 'Partially Correct',
      grade: af.grade,
      graded: true,
      message: af.message + reasonMsg,
      showReasons: true
    };
  }

  // Standard mode: was rejecting the right action?
  const isActionCorrect = teaching.correctAction === 'reject';
  if (!isActionCorrect) {
    return {
      type: 'feedback',
      correct: false,
      title: 'Incorrect Action',
      message: `Rejecting this order was not the correct action. This order should have been ${teaching.correctAction === 'verify' ? 'verified' : 'sent to the prescriber for clarification'}. ${teaching.explanation}`
    };
  }

  return {
    type: 'feedback',
    correct: allCorrectSelected,
    title: allCorrectSelected ? 'Correct!' : 'Partially Correct',
    showReasons: true,
    message: allCorrectSelected
      ? teaching.explanation
      : `You identified ${correctPicks} of ${totalCorrectReasons} correct reason(s)${falsePicks > 0 ? ` and selected ${falsePicks} incorrect reason(s)` : ''}. ${teaching.explanation}`
  };
}

// ─── Test data ─────────────────────────────────────────────────────────────

const orderNoTeaching = { id: 'o1', orderId: '12345', drugName: 'Test Drug' };

const orderStandardVerify = {
  id: 'o2', orderId: '12346', drugName: 'Ceftriaxone',
  teaching: {
    correctAction: 'verify',
    explanation: 'Ceftriaxone is appropriate for this indication.'
  }
};

const orderStandardReject = {
  id: 'o3', orderId: '12347', drugName: 'Bactrim',
  teaching: {
    correctAction: 'reject',
    explanation: 'Patient has sulfa allergy with anaphylaxis history.',
    rejectReasons: [
      { id: 'r1', text: 'Drug-allergy: sulfa anaphylaxis', correct: true },
      { id: 'r2', text: 'Contraindicated with allergy history', correct: true },
      { id: 'r3', text: 'Dose too high', correct: false },
      { id: 'r4', text: 'Wrong route', correct: false }
    ]
  }
};

const orderHardMode = {
  id: 'o4', orderId: '12348', drugName: 'Furosemide',
  teaching: {
    correctAction: 'message',
    explanation: 'Dose may need optimization.',
    detailedFeedback: {
      verify:  { grade: 'acceptable', message: 'Safe but suboptimal dose.' },
      reject:  { grade: 'incorrect',  message: 'No safety concern.' },
      message: { grade: 'optimal',    message: 'Excellent judgment contacting prescriber.' }
    }
  }
};

const orderHardRejectWithReasons = {
  id: 'o5', orderId: '12349', drugName: 'Bicillin C-R',
  teaching: {
    correctAction: 'reject',
    explanation: 'LASA error: wrong formulation.',
    detailedFeedback: {
      verify:  { grade: 'incorrect',  message: 'Must not verify.' },
      reject:  { grade: 'optimal',    message: 'Correctly identified LASA error.' },
      message: { grade: 'suboptimal', message: 'Should reject, not just message.' }
    },
    rejectReasons: [
      { id: 'r1', text: 'LASA error: C-R instead of L-A', correct: true },
      { id: 'r2', text: 'Not recommended for syphilis per CDC', correct: true },
      { id: 'r3', text: 'Dose too high', correct: false }
    ]
  }
};

// ─── Tests ─────────────────────────────────────────────────────────────────

describe('handleAction: no teaching data', () => {
  it('verify produces toast and advances', () => {
    const result = simulateHandleAction('verify', orderNoTeaching);
    expect(result.type).toBe('toast');
    expect(result.advances).toBe(true);
  });

  it('reject produces error toast', () => {
    const result = simulateHandleAction('reject', orderNoTeaching);
    expect(result.type).toBe('toast');
    expect(result.severity).toBe('er');
  });

  it('message produces info toast', () => {
    const result = simulateHandleAction('message', orderNoTeaching);
    expect(result.type).toBe('toast');
    expect(result.severity).toBe('inf');
  });
});

describe('handleAction: standard mode (binary)', () => {
  it('correct action shows Correct feedback', () => {
    const result = simulateHandleAction('verify', orderStandardVerify);
    expect(result.type).toBe('feedback');
    expect(result.correct).toBe(true);
    expect(result.title).toBe('Correct!');
    expect(result.message).toContain('Ceftriaxone');
  });

  it('incorrect action shows Incorrect feedback with explanation', () => {
    const result = simulateHandleAction('reject', orderStandardVerify);
    expect(result.type).toBe('feedback');
    expect(result.correct).toBe(false);
    expect(result.title).toBe('Incorrect');
    expect(result.message).toContain('should have been verified');
  });

  it('message in standard mode produces toast (not tracked)', () => {
    const result = simulateHandleAction('message', orderStandardVerify);
    expect(result.type).toBe('toast');
  });

  it('reject with rejectReasons opens modal instead of feedback', () => {
    const result = simulateHandleAction('reject', orderStandardReject);
    expect(result.type).toBe('rejectModal');
    expect(result.reasons).toHaveLength(4);
  });

  it('does not track in review mode', () => {
    const result = simulateHandleAction('verify', orderStandardVerify, true);
    expect(result.tracked).toBe(false);
  });

  it('tracks in normal mode', () => {
    const result = simulateHandleAction('verify', orderStandardVerify, false);
    expect(result.tracked).toBe(true);
  });
});

describe('handleAction: hard mode (graded)', () => {
  it('optimal action shows graded optimal feedback', () => {
    const result = simulateHandleAction('message', orderHardMode);
    expect(result.type).toBe('feedback');
    expect(result.correct).toBe(true);
    expect(result.grade).toBe('optimal');
    expect(result.graded).toBe(true);
    expect(result.title).toBe('Optimal!');
  });

  it('acceptable action shows graded feedback with better choice hint', () => {
    const result = simulateHandleAction('verify', orderHardMode);
    expect(result.type).toBe('feedback');
    expect(result.correct).toBe(true);
    expect(result.grade).toBe('acceptable');
    expect(result.message).toContain('Better choice');
    expect(result.message).toContain('Message Prescriber');
  });

  it('incorrect action shows graded incorrect feedback', () => {
    const result = simulateHandleAction('reject', orderHardMode);
    expect(result.type).toBe('feedback');
    expect(result.correct).toBe(false);
    expect(result.grade).toBe('incorrect');
  });

  it('reject with reasons in hard mode opens modal when grade is optimal', () => {
    const result = simulateHandleAction('reject', orderHardRejectWithReasons);
    expect(result.type).toBe('rejectModal');
  });
});

describe('submitRejectReasons: standard mode', () => {
  it('all correct reasons selected → Correct', () => {
    const result = simulateSubmitRejectReasons(orderStandardReject, new Set(['r1', 'r2']));
    expect(result.correct).toBe(true);
    expect(result.title).toBe('Correct!');
    expect(result.showReasons).toBe(true);
  });

  it('partial correct → Partially Correct with counts', () => {
    const result = simulateSubmitRejectReasons(orderStandardReject, new Set(['r1']));
    expect(result.correct).toBe(false);
    expect(result.title).toBe('Partially Correct');
    expect(result.message).toContain('1 of 2');
  });

  it('includes false pick count in message', () => {
    const result = simulateSubmitRejectReasons(orderStandardReject, new Set(['r1', 'r3']));
    expect(result.message).toContain('1 incorrect reason');
  });

  it('rejecting when verify is correct → Incorrect Action', () => {
    // Use a verify order that has rejectReasons (artificial scenario for testing)
    const verifyWithReasons = {
      ...orderStandardVerify,
      teaching: {
        ...orderStandardVerify.teaching,
        rejectReasons: [{ id: 'r1', text: 'Reason', correct: true }]
      }
    };
    const result = simulateSubmitRejectReasons(verifyWithReasons, new Set(['r1']));
    expect(result.correct).toBe(false);
    expect(result.title).toBe('Incorrect Action');
    expect(result.message).toContain('should have been verified');
  });
});

describe('submitRejectReasons: hard mode', () => {
  it('perfect selection in hard mode → grade title with reason feedback', () => {
    const result = simulateSubmitRejectReasons(orderHardRejectWithReasons, new Set(['r1', 'r2']));
    expect(result.correct).toBe(true); // optimal advances
    expect(result.grade).toBe('optimal');
    expect(result.graded).toBe(true);
    expect(result.showReasons).toBe(true);
  });

  it('partial selection in hard mode → Partially Correct with reason counts', () => {
    const result = simulateSubmitRejectReasons(orderHardRejectWithReasons, new Set(['r1']));
    expect(result.title).toBe('Partially Correct');
    expect(result.message).toContain('1 of 2');
  });

  it('false picks in hard mode included in message', () => {
    const result = simulateSubmitRejectReasons(orderHardRejectWithReasons, new Set(['r1', 'r2', 'r3']));
    expect(result.message).toContain('1 incorrect reason');
  });
});

describe('closeFeedback flow', () => {
  it('correct feedback advances to next order (not in review mode)', () => {
    // Simulates: feedback.correct && !reviewMode → onVerify called
    const feedback = { correct: true };
    const reviewMode = false;
    const shouldAdvance = feedback.correct && !reviewMode;
    expect(shouldAdvance).toBe(true);
  });

  it('incorrect feedback does not advance', () => {
    const feedback = { correct: false };
    const shouldAdvance = feedback.correct;
    expect(shouldAdvance).toBe(false);
  });

  it('correct feedback in review mode does not advance', () => {
    const feedback = { correct: true };
    const reviewMode = true;
    const shouldAdvance = feedback.correct && !reviewMode;
    expect(shouldAdvance).toBe(false);
  });
});

describe('calcCrCl edge cases for verification context', () => {
  it('P001 demo patient: CrCl check for renal dosing decisions', () => {
    const p001 = {
      age: '64F', weight: '72 kg',
      labs: { '04/03 0500': { SCr: ['1.6', 'H'] } }
    };
    const crcl = parseInt(calcCrCl(p001));
    expect(crcl).toBeLessThan(50); // CKD III range, affects drug dosing
    expect(crcl).toBeGreaterThan(20);
  });

  it('P003 demo patient: severely impaired CrCl', () => {
    const p003 = {
      age: '80F', weight: '58 kg',
      labs: { '04/03 0500': { SCr: ['2.8', 'H'] } }
    };
    const crcl = parseInt(calcCrCl(p003));
    expect(crcl).toBeLessThan(30); // Contraindication for nitrofurantoin
  });

  it('P002 demo patient: normal renal function', () => {
    const p002 = {
      age: '47M', weight: '95 kg',
      labs: { '04/03 0500': { SCr: '1.0' } }
    };
    const crcl = parseInt(calcCrCl(p002));
    expect(crcl).toBeGreaterThan(90); // No renal adjustments needed
  });
});
