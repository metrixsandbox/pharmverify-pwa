/**
 * Extract the latest lab value for a given key from a patient's labs object.
 * Labs are keyed by datetime strings; we take the first entry.
 */
export function getLatestLab(patientLabs, key) {
  const labs = Object.values(patientLabs || {});
  if (!labs[0] || !labs[0][key]) return '\u2014';
  return Array.isArray(labs[0][key]) ? labs[0][key][0] : labs[0][key];
}

/**
 * Calculate estimated creatinine clearance using the Cockcroft-Gault equation.
 * CrCl = ((140 - age) * weight) / (72 * SCr) * (0.85 if female)
 */
export function calcCrCl(patient) {
  const scr = parseFloat(getLatestLab(patient.labs, 'SCr'));
  const age = parseInt(patient.age);
  const wt = parseFloat(patient.weight);
  const female = (patient.age || '').includes('F');
  if (!scr || !age || !wt) return '\u2014';
  return Math.round(((140 - age) * wt) / (72 * scr) * (female ? 0.85 : 1)) + ' mL/min';
}

/**
 * Grade configuration for hard-mode feedback.
 */
export const GRADE_CONFIG = {
  optimal:    { title: 'Optimal!', icon: '\u2605', advances: true, css: 'fb-optimal' },
  acceptable: { title: 'Acceptable', icon: '\u2713', advances: true, css: 'fb-acceptable' },
  suboptimal: { title: 'Not Ideal', icon: '\u26A0', advances: false, css: 'fb-suboptimal' },
  incorrect:  { title: 'Incorrect', icon: '\u2717', advances: false, css: 'fb-incorrect' }
};

/**
 * Score reject reason selections.
 * Returns { correctPicks, falsePicks, totalCorrectReasons, allCorrectSelected }
 */
export function scoreRejectReasons(reasons, selectedIds) {
  const correctIds = new Set(reasons.filter(r => r.correct).map(r => r.id));
  let correctPicks = 0;
  let falsePicks = 0;

  for (const id of selectedIds) {
    if (correctIds.has(id)) correctPicks++;
    else falsePicks++;
  }

  return {
    correctPicks,
    falsePicks,
    totalCorrectReasons: correctIds.size,
    allCorrectSelected: correctPicks === correctIds.size && falsePicks === 0
  };
}
