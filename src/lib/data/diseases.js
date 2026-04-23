// Disease-focused case library.
// Each disease has a patient record + orders grouped by difficulty (easy/medium/hard).
// Easy = clearly wrong orders. Medium = mix of correct/incorrect. Hard = graded spectrum.

import { COPD_PATIENT, COPD_EASY, COPD_MEDIUM, COPD_HARD } from './disease-copd.js';
import { DKA_PATIENT, DKA_EASY, DKA_MEDIUM, DKA_HARD } from './disease-dka.js';
import { AKI_PATIENT, AKI_EASY, AKI_MEDIUM, AKI_HARD } from './disease-aki.js';

export const PHASES = [
  { id: 'admission', label: 'Admission (Day 1)',       short: 'Day 1',   desc: 'Initial workup, empiric therapy, GDMT decisions' },
  { id: 'mid',       label: 'Reassessment (Day 3\u20134)', short: 'Day 3\u20134', desc: 'Therapy response, dose adjustments, transitions' },
  { id: 'discharge', label: 'Discharge (Day 5\u20137)',    short: 'Day 5\u20137', desc: 'Oral conversion, med rec, discharge planning' }
];

export const DISEASES = [
  { id: 'hf',         label: 'Heart Failure',           icon: '\u2764',    desc: 'Acute decompensated HFrEF',
    phases: ['admission', 'mid', 'discharge'] },
  { id: 'cap',        label: 'Pneumonia (CAP)',         icon: '\u{1FAC1}', desc: 'Severe community-acquired pneumonia',
    phases: ['admission'] },
  { id: 'uti',        label: 'UTI / Pyelonephritis',    icon: '\u{1F48A}', desc: 'Complicated pyelonephritis',
    phases: ['admission'] },
  { id: 'copd',       label: 'COPD Exacerbation',       icon: '\u{1F32C}', desc: 'Acute exacerbation of COPD',
    phases: ['admission'] },
  { id: 'dka',        label: 'DKA',                     icon: '\u{1F4A7}', desc: 'Diabetic ketoacidosis in T1DM',
    phases: ['admission'] },
  { id: 'afib',       label: 'Atrial Fibrillation',     icon: '\u{1F493}', desc: 'Coming soon',
    phases: ['admission'] },
  { id: 'sepsis',     label: 'Sepsis',                  icon: '\u{1F525}', desc: 'Coming soon',
    phases: ['admission'] },
  { id: 'aki',        label: 'Acute Kidney Injury',     icon: '\u{1FAC0}', desc: 'Prerenal AKI on CKD III',
    phases: ['admission'] },
  { id: 'vte',        label: 'DVT / PE',                icon: '\u{1FA78}', desc: 'Coming soon' },
  { id: 'cellulitis', label: 'Cellulitis / SSTI',       icon: '\u{1F9A0}', desc: 'Coming soon' }
];

// ============================================================================
// HEART FAILURE — Patient D_HF
// ============================================================================
const HF_PATIENT = {
  D_HF: {
    name: 'MONROE, ELEANOR J',
    mrn: '01102045',
    dob: '03/14/1952',
    age: '73F',
    weight: '78 kg',
    height: '162 cm',
    allergies: ['Sulfa (rash)'],
    room: '4S-408B',
    admitDate: '04/05/2026',
    attending: 'Chen, William, MD',
    dx: 'Acute decompensated HFrEF (I50.23), CKD Stage III',
    code: 'Full',
    hp: {
      cc: 'Worsening dyspnea and leg swelling x 5 days',
      hpi: '73 y/o F with HFrEF (EF 25%, ischemic cardiomyopathy), CKD Stage III, and T2DM presents with 5 days of progressive dyspnea, orthopnea (now sleeps in recliner), bilateral lower extremity edema, and 8-pound weight gain. Reports dietary indiscretion at a recent family event. Home GDMT includes carvedilol, sacubitril/valsartan, spironolactone, empagliflozin, and furosemide.',
      pmh: ['HFrEF (EF 25%, ischemic)', 'CAD s/p CABG 2019', 'CKD Stage III (baseline SCr 1.4)', 'T2DM', 'HTN', 'Hyperlipidemia'],
      meds: ['Carvedilol 12.5 mg PO BID', 'Sacubitril/valsartan 49/51 mg PO BID', 'Spironolactone 25 mg PO daily', 'Empagliflozin 10 mg PO daily', 'Furosemide 40 mg PO daily', 'Atorvastatin 40 mg PO QHS', 'Metformin 500 mg PO BID'],
      exam: {
        vitals: 'T 98.2 | HR 88 | BP 142/86 | RR 22 | SpO2 92% RA',
        cv: 'RRR, S3 gallop, JVD to angle of jaw at 45 degrees',
        pulm: 'Bibasilar crackles to mid-lung fields',
        ext: '3+ pitting edema bilateral LE to knees',
        neuro: 'A&O x4'
      },
      assessment: 'Acute decompensated HFrEF with volume overload. Cardiorenal physiology with bump in SCr.',
      plan: [
        '1. ADHF: IV loop diuresis, strict I/O, daily weights.',
        '2. Monitor renal function and electrolytes closely (BMP q day).',
        '3. Review home GDMT for continuation vs. hold decisions.',
        '4. Telemetry monitoring.',
        '5. Sodium restriction 2 g/day, fluid restriction 1.5 L/day.'
      ]
    },
    labs: {
      '04/05 0600': { Na: ['132','L'], K: '4.0', Cl: '98', CO2: '26', BUN: ['38','H'], SCr: ['1.7','H'], Glucose: ['156','H'], Mg: '2.0', 'BNP': ['2240','H'], Troponin: '<0.01', WBC: '7.8', Hgb: ['11.2','L'], Plt: '210' },
      '04/04 1800': { Na: ['131','L'], K: '4.2', BUN: ['36','H'], SCr: ['1.6','H'], 'BNP': ['2080','H'], Troponin: '<0.01' }
    },
    notes: [
      { dt: '04/05 0700', author: 'Chen, William, MD', type: 'Progress Note', text: 'S: Dyspneic, orthopneic. Cannot lie flat.\nO: JVD, bibasilar crackles, 3+ LE edema. BNP 2240. SCr bumped 1.4 -> 1.7.\nA/P: ADHF with volume overload and cardiorenal. Plan IV loop diuresis. Will review home GDMT.' }
    ],
    inpatientMeds: [
      { drug: 'Atorvastatin', dose: '40 mg', route: 'PO', freq: 'QHS', sched: ['2100'], status: 'Active' },
      { drug: 'Carvedilol', dose: '12.5 mg', route: 'PO', freq: 'BID', sched: ['0900','2100'], status: 'Active' }
    ],
    homeMeds: [
      { drug: 'Atorvastatin 40 mg', freq: 'QHS', status: 'Active' },
      { drug: 'Carvedilol 12.5 mg', freq: 'BID', status: 'Active' },
      { drug: 'Empagliflozin 10 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Furosemide 40 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Metformin 500 mg', freq: 'BID', status: 'Active' },
      { drug: 'Sacubitril/valsartan 49/51 mg', freq: 'BID', status: 'Active' },
      { drug: 'Spironolactone 25 mg', freq: 'Daily', status: 'Active' }
    ]
  }
};

// Shared order scaffolding helper — keeps cases terse but schema-complete.
function mk(id, patientId, drugName, orderLine, dose, route, freq, teaching, extra = {}) {
  return {
    id, patientId, orderId: String(900000 + Math.floor(Math.random() * 99999)), isNew: true,
    priority: extra.priority || 'Routine', timePending: extra.timePending || '1h 15m',
    drugName, orderLine, alerts: [],
    clinical: { dose, route, freq, duration: '', rate: '', volume: extra.volume || '', priority: extra.priority || 'Routine', start: '4/5/2026 0900', stop: '' },
    schedule: [{ date: '4/5/2026', times: extra.times || ['0900'] }],
    dispense: { from: 'PHARMACY MAIN', firstDose: 'PHARMACY MAIN', code: 'Unit Dose', triggered: true },
    orderedBy: extra.orderedBy || 'Chen, William, MD', orderedDt: '4/5/2026 0800',
    product: { name: drugName.toUpperCase(), pkg: extra.pkg || '' },
    teaching
  };
}

const HF_EASY = [
  mk('HF_E1', 'D_HF',
    'diltiazem 25 MG injection',
    '25 mg, IV Push, Once',
    '25 mg', 'IV Push', 'Once',
    {
      correctAction: 'reject',
      explanation: 'Diltiazem is a non-dihydropyridine calcium channel blocker with potent negative inotropic effects and is CONTRAINDICATED in HFrEF (EF 25%). IV diltiazem in a patient with decompensated systolic heart failure can precipitate cardiogenic shock. The patient is not in rapid atrial fibrillation — there is no indication for rate control, and even if there were, diltiazem is the wrong choice in HFrEF.',
      rejectReasons: [
        { id: 'r1', text: 'Non-DHP calcium channel blocker contraindicated in HFrEF (EF 25%)', correct: true },
        { id: 'r2', text: 'Negative inotrope — risk of precipitating cardiogenic shock', correct: true },
        { id: 'r3', text: 'Patient has no documented rapid atrial fibrillation or tachyarrhythmia', correct: true },
        { id: 'r4', text: 'Patient has a sulfa allergy', correct: false },
        { id: 'r5', text: 'Dose is too high for renal function', correct: false },
        { id: 'r6', text: 'Diltiazem is only available orally', correct: false }
      ]
    }
  ),
  mk('HF_E2', 'D_HF',
    'ibuprofen 600 MG tablet',
    '600 mg, Oral, Q6H PRN pain',
    '600 mg', 'Oral', 'Q6H PRN',
    {
      correctAction: 'reject',
      explanation: 'NSAIDs are contraindicated in acute decompensated heart failure. They cause sodium and water retention, blunt the effect of loop diuretics, worsen renal perfusion, and can precipitate further decompensation. This patient already has cardiorenal physiology with SCr rising from 1.4 to 1.7. NSAIDs in this setting are a classic avoidable medication error.',
      rejectReasons: [
        { id: 'r1', text: 'NSAIDs cause sodium/water retention — worsen HF volume overload', correct: true },
        { id: 'r2', text: 'NSAIDs blunt loop diuretic effect', correct: true },
        { id: 'r3', text: 'NSAIDs worsen renal perfusion in cardiorenal physiology', correct: true },
        { id: 'r4', text: 'Patient has a documented NSAID allergy', correct: false },
        { id: 'r5', text: 'Dose is above maximum daily dose', correct: false },
        { id: 'r6', text: 'Ibuprofen is not indicated for any pain syndrome', correct: false }
      ]
    },
    { timePending: '45m' }
  )
];

const HF_MEDIUM = [
  mk('HF_M1', 'D_HF',
    'furosemide 80 MG injection',
    '80 mg, IV Push, Q12H, First dose 4/5/26 0900',
    '80 mg', 'IV Push', 'Every 12 hours',
    {
      correctAction: 'verify',
      explanation: 'IV furosemide 80 mg Q12H is appropriate initial diuresis for this acutely decompensated patient. Per ADHF guidelines, IV loop dose should be at least 2.5x the home oral dose (40 mg PO → ~80 mg IV accounting for reduced bioavailability). The patient has clear volume overload (8 lb weight gain, 3+ edema, BNP 2240). Monitor electrolytes and renal function.',
      rejectReasons: [
        { id: 'r1', text: 'Dose is too high for patient', correct: false },
        { id: 'r2', text: 'IV route inappropriate in this setting', correct: false },
        { id: 'r3', text: 'Patient has an allergy to furosemide', correct: false },
        { id: 'r4', text: 'Furosemide contraindicated in CKD III', correct: false },
        { id: 'r5', text: 'BID dosing frequency is too aggressive', correct: false }
      ]
    },
    { timePending: '35m', priority: 'Stat' }
  ),
  mk('HF_M2', 'D_HF',
    'potassium chloride (KLOR-CON) 20 MEQ tablet ER',
    '20 mEq, Oral, BID, First dose 4/5/26 0900',
    '20 mEq', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'Empiric potassium supplementation is not appropriate here. Current K+ is 4.0 mEq/L — normal. The patient is on spironolactone (potassium-sparing) and sacubitril/valsartan (raises potassium via RAAS inhibition). Adding scheduled KCl without evidence of hypokalemia risks iatrogenic hyperkalemia, especially with the ongoing AKI. Potassium should be replaced based on lab values, not prophylactically in this patient.',
      rejectReasons: [
        { id: 'r1', text: 'Current K+ is 4.0 — normal, no indication for supplementation', correct: true },
        { id: 'r2', text: 'Patient on spironolactone and ARNI — high risk for hyperkalemia', correct: true },
        { id: 'r3', text: 'Active AKI further increases hyperkalemia risk', correct: true },
        { id: 'r4', text: 'Patient has a potassium allergy', correct: false },
        { id: 'r5', text: 'KCl should only be given IV', correct: false },
        { id: 'r6', text: 'Dose exceeds maximum single dose', correct: false }
      ]
    }
  ),
  mk('HF_M3', 'D_HF',
    'metoprolol tartrate 50 MG tablet',
    '50 mg, Oral, BID, First dose 4/5/26 0900',
    '50 mg', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'The patient is established on carvedilol 12.5 mg PO BID at home — an evidence-based beta-blocker for HFrEF. Switching to metoprolol tartrate is problematic for two reasons: (1) tartrate is short-acting and not GDMT-grade for HFrEF (succinate is the guideline-recommended form), and (2) an unnecessary intra-hospital beta-blocker swap risks dosing errors and loss of chronic therapy benefit. The home carvedilol should be continued unless there is a specific contraindication.',
      rejectReasons: [
        { id: 'r1', text: 'Patient already on carvedilol — duplicate beta-blocker therapy', correct: true },
        { id: 'r2', text: 'Metoprolol tartrate is not GDMT for HFrEF (succinate is)', correct: true },
        { id: 'r3', text: 'Unnecessary therapeutic switch from established home regimen', correct: true },
        { id: 'r4', text: 'Metoprolol is contraindicated in all HF patients', correct: false },
        { id: 'r5', text: 'Patient has a beta-blocker allergy', correct: false },
        { id: 'r6', text: 'Dose is too low to be effective', correct: false }
      ]
    }
  )
];

const HF_HARD = [
  {
    ...mk('HF_H1', 'D_HF',
      'carvedilol 12.5 MG tablet',
      '12.5 mg, Oral, BID (continue home dose)',
      '12.5 mg', 'Oral', 'BID',
      null,
      { times: ['0900','2100'] }
    ),
    teaching: {
      correctAction: 'verify',
      detailedFeedback: {
        verify: { grade: 'optimal', message: 'Correct. ACC/AHA guidelines recommend continuing beta-blockers at home dose during ADHF when the patient is hemodynamically stable. This patient has BP 142/86 and HR 88 — well-compensated. Discontinuation during decompensation is associated with worse outcomes and longer length of stay.' },
        reject: { grade: 'incorrect', message: 'Beta-blockers should be continued, not held, in hemodynamically stable ADHF. Holding carvedilol here would worsen outcomes.' },
        message: { grade: 'acceptable', message: 'Confirming beta-blocker continuation is reasonable pharmaceutical care, but evidence clearly supports continuing at the home dose in this stable patient.' }
      },
      explanation: 'Continue beta-blockers at home dose in stable ADHF per ACC/AHA — better outcomes than holding.',
      rejectReasons: [
        { id: 'r1', text: 'Beta-blockers should be held during all HF exacerbations', correct: false },
        { id: 'r2', text: 'Carvedilol is contraindicated in CKD III', correct: false },
        { id: 'r3', text: 'Dose is too high', correct: false },
        { id: 'r4', text: 'Patient has a beta-blocker allergy', correct: false }
      ]
    }
  },
  {
    ...mk('HF_H2', 'D_HF',
      'sacubitril/valsartan (ENTRESTO) 49/51 MG tablet',
      '49/51 mg, Oral, BID (continue home dose)',
      '49/51 mg', 'Oral', 'BID',
      null,
      { times: ['0900','2100'] }
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'acceptable', message: 'ARNI continuation in stable ADHF is generally supported. However, this patient has active cardiorenal with SCr bumped from 1.4 to 1.7 and hyponatremia (Na 132). Many clinicians would hold or dose-reduce ARNI during active AKI and volume optimization, then resume once renal function stabilizes.' },
        reject: { grade: 'suboptimal', message: 'Rejecting outright is too aggressive. ARNI is cornerstone GDMT and should not be discontinued reflexively. A clarification with the team about temporarily holding during active AKI would be more appropriate.' },
        message: { grade: 'optimal', message: 'Best answer. Messaging the team to discuss holding ARNI temporarily during active cardiorenal worsening demonstrates good judgment. Once diuresis is established and renal function stabilizes, resume at home dose.' }
      },
      explanation: 'ARNI during active AKI in ADHF is nuanced — messaging for team discussion is the best move.',
      rejectReasons: [
        { id: 'r1', text: 'ARNI is contraindicated in HFrEF', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'Patient has an ARB allergy', correct: false },
        { id: 'r4', text: 'Should never be combined with diuretics', correct: false }
      ]
    }
  },
  {
    ...mk('HF_H3', 'D_HF',
      'spironolactone 25 MG tablet',
      '25 mg, Oral, Daily (continue home dose)',
      '25 mg', 'Oral', 'Daily',
      null
    ),
    teaching: {
      correctAction: 'verify',
      detailedFeedback: {
        verify: { grade: 'optimal', message: 'Correct. MRAs like spironolactone are cornerstone GDMT for HFrEF and should be continued. Current K+ is 4.0 (normal) and SCr is elevated but not prohibitive. The risk threshold for holding MRA is K+ >5.0 or SCr >2.5 in most protocols. Monitor K+ and SCr daily with active diuresis.' },
        reject: { grade: 'incorrect', message: 'Spironolactone should not be rejected. K+ is 4.0 and SCr is 1.7 — both within thresholds for MRA continuation. Holding MRA reflexively in ADHF worsens long-term outcomes.' },
        message: { grade: 'acceptable', message: 'Confirming continuation with the team is reasonable but not strictly necessary. K+ and SCr are both within acceptable limits for continued MRA therapy.' }
      },
      explanation: 'Continue MRA — K+ 4.0 and SCr 1.7 are within safe thresholds. Monitor closely during diuresis.',
      rejectReasons: [
        { id: 'r1', text: 'Spironolactone must be held with any SCr elevation', correct: false },
        { id: 'r2', text: 'Patient has a spironolactone allergy', correct: false },
        { id: 'r3', text: 'Dose is too high for HFrEF', correct: false },
        { id: 'r4', text: 'Duplicate therapy with another diuretic', correct: false }
      ]
    }
  }
];

// ============================================================================
// HEART FAILURE — Day 3-4 Reassessment
// ============================================================================
const HF_MID_PATIENT = {
  D_HF_MID: {
    name: 'MONROE, ELEANOR J',
    mrn: '01102045',
    dob: '03/14/1952',
    age: '73F',
    weight: '74 kg',
    height: '162 cm',
    allergies: ['Sulfa (rash)'],
    room: '4S-408B',
    admitDate: '04/05/2026',
    attending: 'Chen, William, MD',
    dx: 'Acute decompensated HFrEF (I50.23), CKD Stage III',
    code: 'Full',
    hp: {
      cc: 'Worsening dyspnea and leg swelling x 5 days',
      hpi: '73 y/o F with HFrEF (EF 25%, ischemic cardiomyopathy), CKD Stage III, and T2DM admitted 04/05 for ADHF with volume overload. Now hospital day 3. Responding to IV diuresis — net negative 4.2 L over 48 hrs. Weight down from 78 kg to 74 kg. Orthopnea improved, now sleeping at 2 pillows. Edema improving. SCr peaked at 1.9 on day 2, now trending down to 1.6. Team considering transition from IV to oral diuretics and GDMT optimization.',
      pmh: ['HFrEF (EF 25%, ischemic)', 'CAD s/p CABG 2019', 'CKD Stage III (baseline SCr 1.4)', 'T2DM', 'HTN', 'Hyperlipidemia'],
      meds: ['Carvedilol 12.5 mg PO BID', 'Sacubitril/valsartan 49/51 mg PO BID', 'Spironolactone 25 mg PO daily', 'Empagliflozin 10 mg PO daily', 'Furosemide 40 mg PO daily', 'Atorvastatin 40 mg PO QHS', 'Metformin 500 mg PO BID'],
      exam: {
        vitals: 'T 98.4 | HR 76 | BP 118/72 | RR 18 | SpO2 96% RA',
        cv: 'RRR, S3 resolved, JVD 8 cm',
        pulm: 'Scattered bibasilar crackles, improved from admission',
        ext: '1+ pitting edema bilateral ankles (down from 3+)',
        neuro: 'A&O x4'
      },
      assessment: 'ADHF with improving volume status on IV diuresis. Cardiorenal now improving (SCr trending down). Ready for diuretic transition and GDMT review.',
      plan: [
        '1. IV-to-PO diuretic transition — trial oral furosemide at higher than home dose.',
        '2. Resume/optimize GDMT: consider ARNI restart, continue beta-blocker and MRA.',
        '3. Hold metformin until SCr < 1.5.',
        '4. Daily weights, strict I/O, BMP in AM.',
        '5. Dietary/pharmacy education before discharge.'
      ]
    },
    labs: {
      '04/07 0600': { Na: '136', K: '3.6', Cl: '100', CO2: '24', BUN: ['32','H'], SCr: ['1.6','H'], Glucose: ['142','H'], Mg: '1.8', 'BNP': ['980','H'], WBC: '6.2', Hgb: ['10.8','L'], Plt: '218' },
      '04/06 0600': { Na: '134', K: '3.4', Cl: '99', CO2: '23', BUN: ['36','H'], SCr: ['1.9','H'], Glucose: ['148','H'], Mg: '1.7', 'BNP': ['1440','H'] },
      '04/05 0600': { Na: ['132','L'], K: '4.0', Cl: '98', CO2: '26', BUN: ['38','H'], SCr: ['1.7','H'], Glucose: ['156','H'], Mg: '2.0', 'BNP': ['2240','H'], Troponin: '<0.01', WBC: '7.8', Hgb: ['11.2','L'], Plt: '210' }
    },
    notes: [
      { dt: '04/07 0700', author: 'Chen, William, MD', type: 'Progress Note', text: 'S: Feels much better. Sleeping in bed flat last night. Urine output excellent.\nO: Wt 74 kg (down 4 kg). JVD improved. Crackles resolving. LE edema 1+. BNP 980 (from 2240). SCr trending down 1.9 → 1.6.\nA/P: Responding well to IV diuresis. Plan IV-to-PO transition today — furosemide 80 mg PO BID. Resume ARNI if tolerated. Continue carvedilol and spironolactone. Recheck BMP in AM.' },
      { dt: '04/06 0700', author: 'Chen, William, MD', type: 'Progress Note', text: 'S: Mild improvement in dyspnea. Still orthopneic.\nO: Wt 76 kg. Net -2.1L overnight. SCr bumped to 1.9 — cardiorenal. K+ 3.4.\nA/P: Continue IV furosemide. Add potassium repletion PRN. Hold ARNI until SCr improves. Monitor.' },
      { dt: '04/05 0700', author: 'Chen, William, MD', type: 'Progress Note', text: 'S: Dyspneic, orthopneic. Cannot lie flat.\nO: JVD, bibasilar crackles, 3+ LE edema. BNP 2240. SCr bumped 1.4 -> 1.7.\nA/P: ADHF with volume overload and cardiorenal. Plan IV loop diuresis. Will review home GDMT.' }
    ],
    inpatientMeds: [
      { drug: 'Furosemide', dose: '80 mg', route: 'IV', freq: 'Q12H', sched: ['0900','2100'], status: 'Active' },
      { drug: 'Carvedilol', dose: '12.5 mg', route: 'PO', freq: 'BID', sched: ['0900','2100'], status: 'Active' },
      { drug: 'Spironolactone', dose: '25 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Active' },
      { drug: 'Atorvastatin', dose: '40 mg', route: 'PO', freq: 'QHS', sched: ['2100'], status: 'Active' },
      { drug: 'Empagliflozin', dose: '10 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Active' },
      { drug: 'Potassium chloride', dose: '40 mEq', route: 'PO', freq: 'PRN K<3.5', sched: [], status: 'Active' }
    ],
    homeMeds: [
      { drug: 'Atorvastatin 40 mg', freq: 'QHS', status: 'Active' },
      { drug: 'Carvedilol 12.5 mg', freq: 'BID', status: 'Active' },
      { drug: 'Empagliflozin 10 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Furosemide 40 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Metformin 500 mg', freq: 'BID', status: 'Active' },
      { drug: 'Sacubitril/valsartan 49/51 mg', freq: 'BID', status: 'Active' },
      { drug: 'Spironolactone 25 mg', freq: 'Daily', status: 'Active' }
    ],
    imaging: [
      { type: 'Chest X-ray (PA/Lateral)', date: '04/05/2026', orderedBy: 'Chen, William, MD', readBy: 'Torres, L, MD', indication: 'Dyspnea, HF exacerbation', findings: 'Cardiomegaly. Bilateral pleural effusions, small. Cephalization of pulmonary vasculature. No consolidation.', impression: 'Findings consistent with acute decompensated heart failure.' },
      { type: 'Chest X-ray (Portable)', date: '04/07/2026', orderedBy: 'Chen, William, MD', readBy: 'Torres, L, MD', indication: 'Interval change', findings: 'Heart size unchanged. Pleural effusions smaller bilaterally. Improved pulmonary vascular congestion.', impression: 'Interval improvement in pulmonary edema.' }
    ],
    cardio: {
      ekg: { date: '04/05/2026', readBy: 'Kim, R, MD', rhythm: 'Normal sinus rhythm', interpretation: 'NSR at 88 bpm. Left ventricular hypertrophy by voltage criteria. No acute ST-T wave changes.', intervals: [
        { name: 'HR', value: '88 bpm', normal: '60-100', flag: '' },
        { name: 'PR', value: '182 ms', normal: '120-200', flag: '' },
        { name: 'QRS', value: '98 ms', normal: '60-110', flag: '' },
        { name: 'QTc', value: '448 ms', normal: '350-460', flag: '' }
      ]},
      echo: { date: '04/05/2026', readBy: 'Kim, R, MD', impression: 'Severely reduced LVEF 25%. LV dilation. Moderate mitral regurgitation. Estimated RVSP 48 mmHg.', findings: [
        { name: 'LVEF', value: '25%' },
        { name: 'LVIDd', value: '6.2 cm (dilated)' },
        { name: 'LA', value: '4.8 cm (dilated)' },
        { name: 'MR', value: 'Moderate' },
        { name: 'RVSP', value: '48 mmHg' },
        { name: 'RV function', value: 'Mildly reduced' }
      ]}
    }
  }
};

const HF_MID_EASY = [
  mk('HF_ME1', 'D_HF_MID',
    'metformin 500 MG tablet',
    '500 mg, Oral, BID, Resume home med',
    '500 mg', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'Metformin should be held when SCr is elevated above baseline and actively fluctuating. Current SCr is 1.6 (peaked at 1.9, baseline 1.4). There is ongoing risk of lactic acidosis in the setting of renal impairment and heart failure with recent cardiorenal syndrome. Per guidelines, metformin should not be restarted until renal function is stable and eGFR >30.',
      rejectReasons: [
        { id: 'r1', text: 'SCr still elevated above baseline (1.6 vs 1.4) with recent peak at 1.9', correct: true },
        { id: 'r2', text: 'Risk of lactic acidosis in setting of cardiorenal syndrome', correct: true },
        { id: 'r3', text: 'Should wait until renal function stabilizes before restarting', correct: true },
        { id: 'r4', text: 'Metformin is contraindicated in all heart failure', correct: false },
        { id: 'r5', text: 'Patient has a metformin allergy', correct: false },
        { id: 'r6', text: 'Dose is too high', correct: false }
      ]
    }
  ),
  mk('HF_ME2', 'D_HF_MID',
    'digoxin 0.25 MG tablet',
    '0.25 mg, Oral, Daily',
    '0.25 mg', 'Oral', 'Daily',
    {
      correctAction: 'reject',
      explanation: 'Digoxin 0.25 mg daily is too high a starting dose for a 73-year-old woman with CKD (SCr 1.6). Digoxin is renally cleared and levels are influenced by weight, age, and renal function. Target digoxin levels in HFrEF are 0.5-0.9 ng/mL. In this patient, 0.125 mg daily or even 0.125 mg every other day would be more appropriate. Starting at 0.25 mg risks toxicity.',
      rejectReasons: [
        { id: 'r1', text: 'Dose too high for age 73, CKD, weight 74 kg', correct: true },
        { id: 'r2', text: 'Risk of digoxin toxicity — renally cleared drug with impaired function', correct: true },
        { id: 'r3', text: 'Should start at 0.125 mg daily or QOD in this patient', correct: true },
        { id: 'r4', text: 'Digoxin is contraindicated in HFrEF', correct: false },
        { id: 'r5', text: 'Oral digoxin is not available', correct: false },
        { id: 'r6', text: 'Patient has a digoxin allergy', correct: false }
      ]
    }
  )
];

const HF_MID_MEDIUM = [
  mk('HF_MM1', 'D_HF_MID',
    'furosemide 80 MG tablet',
    '80 mg, Oral, BID — IV-to-PO transition',
    '80 mg', 'Oral', 'BID',
    {
      correctAction: 'verify',
      explanation: 'Transitioning from IV furosemide 80 mg Q12H to oral furosemide 80 mg BID is appropriate at this stage. The patient has responded well to IV diuresis (net -4.2L, weight down 4 kg, BNP trending down). Oral bioavailability of furosemide is ~50%, so an equivalent oral dose would technically be higher, but starting at 80 mg PO BID (same as the IV dose) is standard practice since oral absorption improves as gut edema resolves. Monitor weight and I/O closely.',
      rejectReasons: [
        { id: 'r1', text: 'PO bioavailability is too low — patient needs to stay on IV', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'Patient has a loop diuretic allergy', correct: false },
        { id: 'r4', text: 'BID dosing is too frequent', correct: false }
      ]
    }
  ),
  mk('HF_MM2', 'D_HF_MID',
    'sacubitril/valsartan (ENTRESTO) 49/51 MG tablet',
    '49/51 mg, Oral, BID — Resume home dose',
    '49/51 mg', 'Oral', 'BID',
    {
      correctAction: 'verify',
      explanation: 'Resuming ARNI at the home dose is now appropriate. SCr has improved from peak of 1.9 to 1.6 and is trending toward baseline. The patient is hemodynamically stable (BP 118/72). ARNI was held during acute cardiorenal worsening but should be restarted as soon as renal function stabilizes. Continued holding delays GDMT optimization and worsens long-term outcomes.',
      rejectReasons: [
        { id: 'r1', text: 'SCr is still too elevated to restart ARNI', correct: false },
        { id: 'r2', text: 'ARNI is contraindicated with spironolactone', correct: false },
        { id: 'r3', text: 'Blood pressure is too low', correct: false },
        { id: 'r4', text: 'Should only be restarted after discharge', correct: false }
      ]
    }
  ),
  mk('HF_MM3', 'D_HF_MID',
    'potassium chloride 40 MEQ IV infusion',
    '40 mEq, IV, x1 dose — K+ 3.6',
    '40 mEq', 'IV', 'Once',
    {
      correctAction: 'message',
      explanation: 'K+ is 3.6 — below 4.0 but not critically low. In an HF patient on spironolactone with improving renal function, aggressive IV potassium repletion may not be necessary. Oral repletion (20-40 mEq PO) is preferred when K+ >3.0 and the patient is tolerating PO. IV potassium is painful, carries more risk, and is generally reserved for K+ <3.0 or symptomatic hypokalemia. Message the team to clarify the urgency and suggest PO route.',
      rejectReasons: [
        { id: 'r1', text: 'K+ 3.6 does not require IV repletion — PO preferred', correct: true },
        { id: 'r2', text: 'Patient on spironolactone — K+ will likely self-correct as ARNI resumed', correct: true },
        { id: 'r3', text: 'IV potassium has higher risk (phlebitis, cardiac effects) than necessary here', correct: true },
        { id: 'r4', text: 'Potassium is normal at 3.6', correct: false },
        { id: 'r5', text: 'Patient has a potassium allergy', correct: false }
      ]
    },
    { priority: 'Stat' }
  )
];

const HF_MID_HARD = [
  {
    ...mk('HF_MH1', 'D_HF_MID',
      'carvedilol 25 MG tablet',
      '25 mg, Oral, BID — Uptitrate from 12.5 mg',
      '25 mg', 'Oral', 'BID',
      null, { times: ['0900','2100'] }
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: 'Uptitrating beta-blocker during an acute HF hospitalization is generally not recommended. While the patient is improving, she is still in the acute phase with recent cardiorenal syndrome. Beta-blocker uptitration should occur in the outpatient setting after euvolemia is achieved and stable for 1-2 weeks. Verifying this risks hemodynamic decompensation.' },
        reject: { grade: 'acceptable', message: 'Rejecting is defensible — inpatient beta-blocker uptitration during ADHF carries risk. However, the ideal response is to message the team to discuss timing, since uptitration itself is a good long-term goal.' },
        message: { grade: 'optimal', message: 'Best answer. The goal of reaching target-dose carvedilol is correct, but timing matters. Messaging to recommend deferring uptitration to the outpatient setting (2-4 weeks post-discharge) demonstrates excellent clinical judgment.' }
      },
      explanation: 'Beta-blocker uptitration should wait for euvolemia and clinical stability — defer to outpatient.',
      rejectReasons: [
        { id: 'r1', text: 'Inpatient uptitration during acute decompensation increases risk', correct: true },
        { id: 'r2', text: 'Patient still recovering from cardiorenal syndrome', correct: true },
        { id: 'r3', text: 'Carvedilol 25 mg is above maximum dose', correct: false },
        { id: 'r4', text: 'Patient has a beta-blocker allergy', correct: false }
      ]
    }
  },
  {
    ...mk('HF_MH2', 'D_HF_MID',
      'hydralazine 25 MG tablet',
      '25 mg, Oral, TID — Add for BP management',
      '25 mg', 'Oral', 'TID',
      null
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: 'Hydralazine/isosorbide dinitrate (H-ISDN) has a role in HFrEF — specifically in Black patients or those who cannot tolerate ACEI/ARB/ARNI. However, this patient is already on sacubitril/valsartan. Adding hydralazine alone (without ISDN) for BP that is already well-controlled (118/72) has no guideline basis. Ordering hydralazine monotherapy when BP is at goal is not appropriate.' },
        reject: { grade: 'acceptable', message: 'Rejecting is defensible. Hydralazine alone is not GDMT for HFrEF, the patient is on ARNI, and BP is at goal. However, messaging to clarify the indication is the most collaborative approach.' },
        message: { grade: 'optimal', message: 'Best answer. The clinical question is: what is the indication? If for BP, it is already controlled. If for GDMT, H-ISDN requires both components and is only added when ACEI/ARB/ARNI cannot be used. Messaging clarifies the rationale before acting.' }
      },
      explanation: 'Hydralazine alone is not GDMT — BP is at goal and patient is on ARNI. Clarify indication.',
      rejectReasons: [
        { id: 'r1', text: 'BP is already well-controlled at 118/72', correct: true },
        { id: 'r2', text: 'Hydralazine alone (without ISDN) is not guideline-directed for HFrEF', correct: true },
        { id: 'r3', text: 'Patient already on ARNI — duplicate vasodilation without indication', correct: true },
        { id: 'r4', text: 'Hydralazine is contraindicated in HF', correct: false }
      ]
    }
  }
];

// ============================================================================
// HEART FAILURE — Discharge (Day 5-7)
// ============================================================================
const HF_DC_PATIENT = {
  D_HF_DC: {
    name: 'MONROE, ELEANOR J',
    mrn: '01102045',
    dob: '03/14/1952',
    age: '73F',
    weight: '71 kg',
    height: '162 cm',
    allergies: ['Sulfa (rash)'],
    room: '4S-408B',
    admitDate: '04/05/2026',
    attending: 'Chen, William, MD',
    dx: 'Acute decompensated HFrEF (I50.23), CKD Stage III — discharge planning',
    code: 'Full',
    hp: {
      cc: 'Worsening dyspnea and leg swelling x 5 days (resolved)',
      hpi: '73 y/o F with HFrEF admitted 04/05 for ADHF. Now hospital day 6. Achieved dry weight (~71 kg, down 7 kg from admission). Transitioned to oral diuretics on day 4 — weight stable x2 days on PO furosemide 80 mg BID. SCr returned to baseline 1.4. GDMT restarted and optimized. Team planning discharge tomorrow with close cardiology follow-up in 7 days.',
      pmh: ['HFrEF (EF 25%, ischemic)', 'CAD s/p CABG 2019', 'CKD Stage III (baseline SCr 1.4)', 'T2DM', 'HTN', 'Hyperlipidemia'],
      meds: ['Carvedilol 12.5 mg PO BID', 'Sacubitril/valsartan 49/51 mg PO BID', 'Spironolactone 25 mg PO daily', 'Empagliflozin 10 mg PO daily', 'Furosemide 40 mg PO daily', 'Atorvastatin 40 mg PO QHS', 'Metformin 500 mg PO BID'],
      exam: {
        vitals: 'T 98.2 | HR 72 | BP 112/68 | RR 16 | SpO2 97% RA',
        cv: 'RRR, no S3, JVP 6 cm',
        pulm: 'Clear bilaterally',
        ext: 'Trace pedal edema',
        neuro: 'A&O x4'
      },
      assessment: 'ADHF resolved. Euvolemic on oral diuretics. GDMT optimized. Ready for discharge with close follow-up.',
      plan: [
        '1. Discharge tomorrow. Furosemide 80 mg PO BID (up from home 40 mg daily).',
        '2. Resume all home GDMT. Resume metformin (SCr back to baseline).',
        '3. Daily weights at home — call if gain >3 lbs in 1 day or >5 lbs in 1 week.',
        '4. Sodium restriction 2g, fluid restriction 1.5L.',
        '5. Cardiology follow-up in 7 days. PCP in 14 days.',
        '6. Pharmacy medication reconciliation and education.'
      ]
    },
    labs: {
      '04/10 0600': { Na: '138', K: '4.2', Cl: '102', CO2: '26', BUN: '22', SCr: '1.4', Glucose: ['138','H'], Mg: '2.1', 'BNP': ['420','H'], WBC: '5.8', Hgb: ['10.5','L'], Plt: '225' },
      '04/09 0600': { Na: '137', K: '4.0', Cl: '101', CO2: '25', BUN: '24', SCr: '1.4', Glucose: ['145','H'], Mg: '2.0', 'BNP': ['580','H'] },
      '04/07 0600': { Na: '136', K: '3.6', Cl: '100', CO2: '24', BUN: ['32','H'], SCr: ['1.6','H'], Glucose: ['142','H'], Mg: '1.8', 'BNP': ['980','H'] }
    },
    notes: [
      { dt: '04/10 0800', author: 'Chen, William, MD', type: 'Progress Note', text: 'S: Feels well. No dyspnea at rest or exertion on unit. Sleeping flat.\nO: Wt 71 kg (stable x2 days). Euvolemic exam. SCr 1.4 (baseline). BNP 420 (from 2240). Labs stable.\nA/P: Euvolemic on PO furosemide 80 BID. Discharge tomorrow. Finalize med rec. Pharmacy education today.' },
      { dt: '04/09 0700', author: 'Chen, William, MD', type: 'Progress Note', text: 'S: Continued improvement.\nO: Wt 71 kg. SCr stable 1.4. Tolerating PO diuretics well.\nA/P: On track for discharge. Restart metformin today. Adjust discharge diuretic dosing.' },
      { dt: '04/07 0700', author: 'Chen, William, MD', type: 'Progress Note', text: 'S: Feels much better. Sleeping in bed flat last night.\nO: Wt 74 kg. BNP 980. SCr 1.6 trending down.\nA/P: Responding. Plan IV-to-PO transition today.' }
    ],
    inpatientMeds: [
      { drug: 'Furosemide', dose: '80 mg', route: 'PO', freq: 'BID', sched: ['0900','2100'], status: 'Active' },
      { drug: 'Carvedilol', dose: '12.5 mg', route: 'PO', freq: 'BID', sched: ['0900','2100'], status: 'Active' },
      { drug: 'Sacubitril/valsartan', dose: '49/51 mg', route: 'PO', freq: 'BID', sched: ['0900','2100'], status: 'Active' },
      { drug: 'Spironolactone', dose: '25 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Active' },
      { drug: 'Empagliflozin', dose: '10 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Active' },
      { drug: 'Atorvastatin', dose: '40 mg', route: 'PO', freq: 'QHS', sched: ['2100'], status: 'Active' },
      { drug: 'Metformin', dose: '500 mg', route: 'PO', freq: 'BID', sched: ['0900','2100'], status: 'Active' }
    ],
    homeMeds: [
      { drug: 'Atorvastatin 40 mg', freq: 'QHS', status: 'Active' },
      { drug: 'Carvedilol 12.5 mg', freq: 'BID', status: 'Active' },
      { drug: 'Empagliflozin 10 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Furosemide 40 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Metformin 500 mg', freq: 'BID', status: 'Active' },
      { drug: 'Sacubitril/valsartan 49/51 mg', freq: 'BID', status: 'Active' },
      { drug: 'Spironolactone 25 mg', freq: 'Daily', status: 'Active' }
    ]
  }
};

const HF_DC_EASY = [
  mk('HF_DE1', 'D_HF_DC',
    'furosemide 40 MG tablet',
    '40 mg, Oral, Daily — Discharge (resume home dose)',
    '40 mg', 'Oral', 'Daily',
    {
      correctAction: 'reject',
      explanation: 'Sending the patient home on her pre-admission furosemide dose (40 mg daily) is a common discharge error. She was admitted for decompensation ON that dose — it was clearly insufficient. The inpatient team stabilized her on 80 mg BID. Discharge diuretic dose should be at least the effective inpatient oral dose. Sending home at the old dose virtually guarantees readmission.',
      rejectReasons: [
        { id: 'r1', text: 'Patient decompensated on this dose — it was insufficient', correct: true },
        { id: 'r2', text: 'Discharge dose should reflect the effective inpatient oral dose (80 mg BID)', correct: true },
        { id: 'r3', text: 'High risk for 30-day HF readmission at sub-therapeutic diuretic dose', correct: true },
        { id: 'r4', text: 'Furosemide is no longer indicated', correct: false },
        { id: 'r5', text: 'Patient has a loop diuretic allergy', correct: false },
        { id: 'r6', text: 'Daily dosing is never appropriate for furosemide', correct: false }
      ]
    }
  ),
  mk('HF_DE2', 'D_HF_DC',
    'amlodipine 5 MG tablet',
    '5 mg, Oral, Daily — Add for BP',
    '5 mg', 'Oral', 'Daily',
    {
      correctAction: 'reject',
      explanation: 'Amlodipine (DHP CCB) is not part of GDMT for HFrEF and is generally avoided. While DHP CCBs are not as harmful as non-DHPs (diltiazem/verapamil) in HFrEF, they are not recommended and may worsen outcomes when added without clear indication. This patient\'s BP is well controlled at 112/68 on GDMT. Adding amlodipine at discharge for a patient whose BP is already at goal on ARNI + beta-blocker is inappropriate.',
      rejectReasons: [
        { id: 'r1', text: 'BP already at goal (112/68) on current GDMT', correct: true },
        { id: 'r2', text: 'Amlodipine is not guideline-directed therapy for HFrEF', correct: true },
        { id: 'r3', text: 'Adding unnecessary antihypertensive risks hypotension', correct: true },
        { id: 'r4', text: 'Amlodipine is contraindicated in all heart failure', correct: false },
        { id: 'r5', text: 'Patient has a CCB allergy', correct: false }
      ]
    }
  )
];

const HF_DC_MEDIUM = [
  mk('HF_DM1', 'D_HF_DC',
    'furosemide 80 MG tablet',
    '80 mg, Oral, BID — Discharge prescription',
    '80 mg', 'Oral', 'BID',
    {
      correctAction: 'verify',
      explanation: 'Discharging on furosemide 80 mg PO BID is appropriate. This matches the effective inpatient oral dose that achieved euvolemia. Patient weight has been stable at dry weight for 2 days on this regimen. Outpatient dose titration down can occur at the 7-day cardiology follow-up after confirming continued stability.',
      rejectReasons: [
        { id: 'r1', text: 'Dose is too high for outpatient use', correct: false },
        { id: 'r2', text: 'Should go back to home dose at discharge', correct: false },
        { id: 'r3', text: 'BID dosing is unnecessary', correct: false }
      ]
    }
  ),
  mk('HF_DM2', 'D_HF_DC',
    'metformin 1000 MG tablet',
    '1000 mg, Oral, BID — Discharge (uptitrate from home 500 mg)',
    '1000 mg', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'While restarting metformin is appropriate now (SCr 1.4, at baseline), uptitrating from 500 mg BID to 1000 mg BID at discharge is not. Dose changes to chronic medications should not be made at hospital discharge — this is a high-risk transition point. The patient just recovered from cardiorenal syndrome. Resume home dose and let the outpatient provider uptitrate in a controlled setting.',
      rejectReasons: [
        { id: 'r1', text: 'Should restart at home dose, not uptitrate at discharge', correct: true },
        { id: 'r2', text: 'Discharge is a high-risk transition — minimize medication changes', correct: true },
        { id: 'r3', text: 'Recent cardiorenal syndrome warrants conservative approach', correct: true },
        { id: 'r4', text: 'Metformin is permanently contraindicated after AKI', correct: false },
        { id: 'r5', text: '1000 mg exceeds maximum dose', correct: false }
      ]
    }
  ),
  mk('HF_DM3', 'D_HF_DC',
    'enoxaparin 40 MG injection',
    '40 mg, Subcut, Daily — VTE prophylaxis (continue through discharge)',
    '40 mg', 'Subcut', 'Daily',
    {
      correctAction: 'reject',
      explanation: 'VTE prophylaxis with enoxaparin was appropriate during the inpatient stay while the patient was volume-overloaded and less mobile. However, continuing injectable anticoagulation through discharge is not indicated. The patient is now ambulatory, euvolemic, and ready for discharge. Extended-duration VTE prophylaxis post-discharge is only indicated in specific populations (e.g., post-surgical, active malignancy) per CHEST guidelines. Discontinue at discharge.',
      rejectReasons: [
        { id: 'r1', text: 'VTE prophylaxis should stop at discharge — patient is now ambulatory', correct: true },
        { id: 'r2', text: 'No indication for extended-duration VTE prophylaxis in this patient', correct: true },
        { id: 'r3', text: 'Injectable anticoagulant unnecessary in ambulatory outpatient', correct: true },
        { id: 'r4', text: 'Dose is wrong for the patient weight', correct: false },
        { id: 'r5', text: 'Patient has a heparin allergy', correct: false }
      ]
    }
  )
];

const HF_DC_HARD = [
  {
    ...mk('HF_DH1', 'D_HF_DC',
      'metolazone 2.5 MG tablet',
      '2.5 mg, Oral, PRN weight gain >3 lbs — Discharge',
      '2.5 mg', 'Oral', 'PRN',
      null
    ),
    teaching: {
      correctAction: 'verify',
      detailedFeedback: {
        verify: { grade: 'optimal', message: 'Correct. Prescribing metolazone 2.5 mg PRN for breakthrough fluid retention (weight gain >3 lbs) is excellent anticipatory prescribing for a patient with recurrent ADHF admissions. Thiazide augmentation of loop diuretics is a well-established rescue strategy. Having it available at home empowers the patient to act early before decompensation requires hospitalization.' },
        reject: { grade: 'incorrect', message: 'Rejecting this order removes a valuable safety net. PRN metolazone with clear parameters is guideline-concordant HF management and helps prevent readmission.' },
        message: { grade: 'acceptable', message: 'Confirming the plan is reasonable, but the order is well-constructed with appropriate PRN parameters. This is a validated approach to HF readmission prevention.' }
      },
      explanation: 'PRN metolazone at discharge is excellent anticipatory prescribing for HF readmission prevention.',
      rejectReasons: [
        { id: 'r1', text: 'Patient has a sulfa allergy — metolazone is a thiazide-like diuretic', correct: true },
        { id: 'r2', text: 'Metolazone has no role in outpatient HF', correct: false },
        { id: 'r3', text: 'PRN dosing is inappropriate for diuretics', correct: false },
        { id: 'r4', text: 'Duplicate therapy with furosemide', correct: false }
      ]
    }
  },
  {
    ...mk('HF_DH2', 'D_HF_DC',
      'sacubitril/valsartan (ENTRESTO) 97/103 MG tablet',
      '97/103 mg, Oral, BID — Uptitrate at discharge',
      '97/103 mg', 'Oral', 'BID',
      null
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: 'While reaching target-dose ARNI is the goal, uptitrating at hospital discharge is risky. The patient just recovered from ADHF with cardiorenal syndrome. BP is 112/68 — there may not be enough headroom for a dose increase. Target-dose ARNI uptitration is better done at the 7-day cardiology follow-up after confirming stable BP and renal function at home.' },
        reject: { grade: 'acceptable', message: 'Rejecting the uptitration is defensible given the recent hospitalization and current BP. However, messaging to discuss timing shows better collaborative practice.' },
        message: { grade: 'optimal', message: 'Best answer. The goal (target-dose ARNI) is correct, but the timing (hospital discharge) is wrong. Messaging to recommend uptitration at the 7-day cardiology visit allows BP and renal function monitoring in the outpatient setting — much safer.' }
      },
      explanation: 'ARNI uptitration at discharge is premature — defer to first outpatient follow-up visit.',
      rejectReasons: [
        { id: 'r1', text: 'Uptitrating at discharge is high-risk — recent cardiorenal syndrome', correct: true },
        { id: 'r2', text: 'BP 112/68 may not tolerate higher dose', correct: true },
        { id: 'r3', text: 'ARNI dose increases should be monitored in clinic', correct: true },
        { id: 'r4', text: 'ARNI is contraindicated at this dose', correct: false }
      ]
    }
  }
];

// ============================================================================
// PNEUMONIA (CAP) — Patient D_CAP
// ============================================================================
const CAP_PATIENT = {
  D_CAP: {
    name: 'FITZGERALD, HAROLD R',
    mrn: '01203811',
    dob: '11/02/1956',
    age: '69M',
    weight: '82 kg',
    height: '178 cm',
    allergies: ['Penicillin (mild rash, remote)'],
    room: 'MICU-7',
    admitDate: '04/05/2026',
    attending: 'Patel, Anita, MD',
    dx: 'Severe community-acquired pneumonia (J18.9), Septic shock (R65.21)',
    code: 'Full',
    hp: {
      cc: 'Fever, productive cough, and worsening shortness of breath x 4 days',
      hpi: '69 y/o M with COPD and HTN presents with 4 days of fever, productive cough with rust-colored sputum, progressive dyspnea, and confusion per family. In ED found hypotensive (BP 84/52), tachycardic (HR 118), tachypneic (RR 30), hypoxic (SpO2 86% RA), and febrile (T 39.1). CXR shows dense right lower lobe consolidation. Started on broad-spectrum empiric therapy and IV fluids. Requires ICU admission for septic shock from severe CAP.',
      pmh: ['COPD (GOLD stage III, 2 exacerbations in past year)', 'HTN', 'Former smoker (40 pack-years, quit 2020)', 'Hyperlipidemia'],
      meds: ['Tiotropium 18 mcg INH daily', 'Fluticasone/salmeterol 250/50 INH BID', 'Albuterol INH PRN', 'Lisinopril 20 mg PO daily', 'Atorvastatin 40 mg PO QHS'],
      exam: {
        vitals: 'T 38.8 | HR 112 | BP 96/58 | RR 26 | SpO2 90% 4L NC',
        cv: 'Tachycardic, regular',
        pulm: 'Right basilar crackles and bronchial breath sounds, prolonged expiratory phase',
        ext: 'Cool extremities, delayed cap refill',
        neuro: 'Alert but oriented to person only'
      },
      assessment: 'Severe CAP with septic shock. Meets ATS/IDSA criteria for severe CAP (confusion, BUN >20, RR >30, BP <90, multilobar infiltrate pending CT). Requires ICU-level empiric therapy.',
      plan: [
        '1. Severe CAP with septic shock: Empiric antibiotics per ATS/IDSA, blood cultures x2, sputum culture, urine legionella/pneumococcal antigens.',
        '2. IV fluid resuscitation, norepinephrine if MAP <65 after bolus.',
        '3. Continue COPD inhalers.',
        '4. Supplemental O2 to SpO2 >92%.',
        '5. VTE prophylaxis when stable.',
        '6. Lactate trending.'
      ]
    },
    labs: {
      '04/05 0400': { Na: '135', K: '4.5', BUN: ['32','H'], SCr: ['1.3','H'], Glucose: ['168','H'], WBC: ['22.4','H'], Hgb: '13.6', Plt: '188', Lactate: ['3.8','H'], Procalcitonin: ['8.4','H'], 'CRP': ['18.2','H'] },
      '04/04 2200': { WBC: ['24.1','H'], Lactate: ['4.2','H'], BUN: ['34','H'], SCr: ['1.4','H'] }
    },
    notes: [
      { dt: '04/05 0600', author: 'Patel, Anita, MD', type: 'Progress Note', text: 'S: Patient confused, family reports 4 days of worsening cough and fever.\nO: T 38.8, HR 112, BP 96/58 (post-fluids), SpO2 90% 4L. WBC 22.4, lactate 3.8. CXR: dense RLL consolidation.\nA/P: Severe CAP / septic shock. ICU admission. Empiric broad-spectrum coverage pending cultures. Fluids + pressors as needed.' }
    ],
    inpatientMeds: [
      { drug: 'Albuterol', dose: '2.5 mg', route: 'INH', freq: 'Q4H PRN', sched: ['PRN'], status: 'Active' },
      { drug: 'Fluticasone/salmeterol', dose: '250/50 mcg', route: 'INH', freq: 'BID', sched: ['0800','2000'], status: 'Active' },
      { drug: 'Norepinephrine', dose: 'Titrate to MAP >65', route: 'IV', freq: 'Continuous', sched: ['Cont'], status: 'Active' },
      { drug: 'Tiotropium', dose: '18 mcg', route: 'INH', freq: 'Daily', sched: ['0900'], status: 'Active' }
    ],
    homeMeds: [
      { drug: 'Albuterol INH', freq: 'PRN', status: 'Active' },
      { drug: 'Atorvastatin 40 mg', freq: 'QHS', status: 'Active' },
      { drug: 'Fluticasone/salmeterol 250/50', freq: 'BID', status: 'Active' },
      { drug: 'Lisinopril 20 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Tiotropium 18 mcg', freq: 'Daily', status: 'Active' }
    ]
  }
};

const CAP_EASY = [
  mk('CAP_E1', 'D_CAP',
    'azithromycin 500 MG IVPB',
    '500 mg, IVPB, Daily (monotherapy)',
    '500 mg', 'IVPB', 'Daily',
    {
      correctAction: 'reject',
      explanation: 'Azithromycin monotherapy is inadequate for severe CAP. ATS/IDSA guidelines require a beta-lactam PLUS a macrolide (or a respiratory fluoroquinolone) for severe CAP. Macrolide monotherapy has high resistance rates among S. pneumoniae and would leave this septic patient undertreated. This patient needs combination therapy immediately.',
      rejectReasons: [
        { id: 'r1', text: 'Macrolide monotherapy is inadequate empiric therapy for severe CAP', correct: true },
        { id: 'r2', text: 'Pneumococcal macrolide resistance is high', correct: true },
        { id: 'r3', text: 'ATS/IDSA requires beta-lactam + macrolide for severe CAP', correct: true },
        { id: 'r4', text: 'Patient has a macrolide allergy', correct: false },
        { id: 'r5', text: 'Dose is too low', correct: false },
        { id: 'r6', text: 'IV azithromycin is not available', correct: false }
      ]
    },
    { priority: 'Stat', timePending: '20m' }
  ),
  mk('CAP_E2', 'D_CAP',
    'ampicillin 1 GM IVPB',
    '1 g, IVPB, Q6H',
    '1 g', 'IVPB', 'Q6H',
    {
      correctAction: 'reject',
      explanation: 'Ampicillin monotherapy does NOT provide adequate empiric coverage for severe CAP. It lacks coverage for atypical pathogens (Legionella, Mycoplasma, Chlamydia) and has poor activity against beta-lactamase producing organisms such as H. influenzae. This patient is in septic shock and requires guideline-based empiric coverage with an appropriate beta-lactam (ceftriaxone, ampicillin/sulbactam, or similar) PLUS a macrolide or respiratory fluoroquinolone.',
      rejectReasons: [
        { id: 'r1', text: 'Ampicillin alone lacks atypical coverage required for CAP', correct: true },
        { id: 'r2', text: 'Inadequate for beta-lactamase producing respiratory pathogens', correct: true },
        { id: 'r3', text: 'Severe CAP requires combination therapy, not monotherapy', correct: true },
        { id: 'r4', text: 'Patient has a penicillin anaphylaxis history', correct: false },
        { id: 'r5', text: 'Ampicillin has no activity against S. pneumoniae', correct: false },
        { id: 'r6', text: 'Dose is too high', correct: false }
      ]
    },
    { timePending: '35m' }
  )
];

const CAP_MEDIUM = [
  mk('CAP_M1', 'D_CAP',
    'ceftriaxone 2 GM IVPB',
    '2 g, IVPB, Daily',
    '2 g', 'IVPB', 'Daily',
    {
      correctAction: 'verify',
      explanation: 'Ceftriaxone 2 g IV daily is the guideline-recommended dose for severe CAP. The 1 g dose (sometimes used for uncomplicated infections) is inadequate for severe CAP. The patient has a remote mild rash to penicillin (not anaphylaxis) — cephalosporin cross-reactivity is <1% for third-generation agents and ceftriaxone is safe to use. Combined with a macrolide, this is the standard ATS/IDSA regimen.',
      rejectReasons: [
        { id: 'r1', text: 'Dose is too low — should be 1 g', correct: false },
        { id: 'r2', text: 'Ceftriaxone contraindicated with any penicillin allergy', correct: false },
        { id: 'r3', text: 'Patient has a cephalosporin allergy', correct: false },
        { id: 'r4', text: 'Wrong route of administration', correct: false },
        { id: 'r5', text: 'Ceftriaxone has no atypical coverage and cannot be used', correct: false }
      ]
    },
    { priority: 'Stat', timePending: '15m' }
  ),
  mk('CAP_M2', 'D_CAP',
    'azithromycin 500 MG IVPB',
    '500 mg, IVPB, Daily',
    '500 mg', 'IVPB', 'Daily',
    {
      correctAction: 'verify',
      explanation: 'Azithromycin 500 mg IV daily is the correct second component of empiric severe CAP therapy, providing atypical coverage (Legionella, Mycoplasma, Chlamydia). Combined with ceftriaxone, this is the ATS/IDSA-recommended beta-lactam + macrolide regimen. Monitor QTc given the baseline risk of macrolide-induced QTc prolongation.',
      rejectReasons: [
        { id: 'r1', text: 'Azithromycin is never used for CAP', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'Duplicates coverage with ceftriaxone', correct: false },
        { id: 'r4', text: 'Patient has a macrolide allergy', correct: false },
        { id: 'r5', text: 'IV form not appropriate, must be PO', correct: false }
      ]
    },
    { timePending: '15m' }
  ),
  mk('CAP_M3', 'D_CAP',
    'moxifloxacin 400 MG IVPB',
    '400 mg, IVPB, Daily',
    '400 mg', 'IVPB', 'Daily',
    {
      correctAction: 'reject',
      explanation: 'Adding moxifloxacin on top of ceftriaxone + azithromycin represents duplicate atypical coverage and unnecessary fluoroquinolone exposure. Respiratory fluoroquinolones are acceptable as monotherapy for severe CAP (alternative to beta-lactam + macrolide), but should NOT be stacked on top of a complete combination regimen. This adds QTc prolongation risk, C. difficile risk, tendon rupture risk, and cost without benefit.',
      rejectReasons: [
        { id: 'r1', text: 'Duplicate atypical coverage with azithromycin already prescribed', correct: true },
        { id: 'r2', text: 'Unnecessary fluoroquinolone exposure and toxicity risk', correct: true },
        { id: 'r3', text: 'Additive QTc prolongation with azithromycin', correct: true },
        { id: 'r4', text: 'Moxifloxacin has no respiratory indication', correct: false },
        { id: 'r5', text: 'Dose is too low', correct: false },
        { id: 'r6', text: 'Patient has a fluoroquinolone allergy', correct: false }
      ]
    }
  )
];

const CAP_HARD = [
  {
    ...mk('CAP_H1', 'D_CAP',
      'methylprednisolone 40 MG injection',
      '40 mg, IV Push, Q12H',
      '40 mg', 'IV Push', 'Q12H',
      null
    ),
    teaching: {
      correctAction: 'verify',
      detailedFeedback: {
        verify: { grade: 'optimal', message: 'Excellent. Recent evidence (CAPE COD trial, NEJM 2023) supports adjunctive hydrocortisone or methylprednisolone in severe CAP with septic shock — mortality benefit and reduced vasopressor duration. This patient meets criteria (severe CAP, shock requiring pressors, no contraindications). The dose is appropriate.' },
        reject: { grade: 'suboptimal', message: 'Rejecting is defensible based on older evidence, but recent trials (CAPE COD 2023) show mortality benefit in severe CAP with shock. The order is supported by current evidence.' },
        message: { grade: 'acceptable', message: 'Messaging to confirm indication is reasonable given the relative novelty of the evidence, but modern guidelines and CAPE COD data support verification.' }
      },
      explanation: 'Adjunctive steroids in severe CAP with septic shock have mortality benefit per CAPE COD (2023).',
      rejectReasons: [
        { id: 'r1', text: 'Steroids are contraindicated in sepsis', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'Patient has a steroid allergy', correct: false },
        { id: 'r4', text: 'Steroids have no role in pneumonia', correct: false }
      ]
    }
  },
  {
    ...mk('CAP_H2', 'D_CAP',
      'vancomycin 1750 MG IVPB',
      '1750 mg (25 mg/kg), IVPB, Load then per levels',
      '1750 mg', 'IVPB', 'Loading dose',
      null
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'acceptable', message: 'Empiric MRSA coverage in severe CAP is defensible but not routine. IDSA recommends adding MRSA coverage only if specific risk factors are present: prior MRSA colonization, cavitary lesions, post-influenza, or necrotizing pneumonia. This patient has none documented — adding vancomycin reflexively exposes him to nephrotoxicity and is usually unnecessary.' },
        reject: { grade: 'suboptimal', message: 'Rejecting outright may be premature — there may be MRSA risk factors not captured in the chart that the team is aware of. Messaging for clarification is safer than outright rejection.' },
        message: { grade: 'optimal', message: 'Best answer. MRSA coverage in CAP should be based on specific risk factors. Messaging the team to clarify whether MRSA risk factors exist (prior colonization, cavitation, post-influenza) demonstrates thoughtful stewardship without over-rejecting.' }
      },
      explanation: 'Empiric MRSA coverage in CAP should be based on risk factors (prior colonization, cavitation, post-flu) — clarify with team.',
      rejectReasons: [
        { id: 'r1', text: 'Vancomycin is contraindicated in CAP', correct: false },
        { id: 'r2', text: 'Loading dose is incorrect for weight', correct: false },
        { id: 'r3', text: 'Patient has a vancomycin allergy', correct: false },
        { id: 'r4', text: 'Vancomycin has no MRSA activity', correct: false }
      ]
    }
  },
  {
    ...mk('CAP_H3', 'D_CAP',
      'levofloxacin 750 MG IVPB',
      '750 mg, IVPB, Daily (switch from beta-lactam + macrolide)',
      '750 mg', 'IVPB', 'Daily',
      null
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: 'Switching a stable patient from combination therapy to a respiratory fluoroquinolone is not ideal. While monotherapy with levofloxacin is an acceptable ALTERNATIVE for severe CAP, de-escalating to it mid-treatment exposes the patient to unnecessary fluoroquinolone toxicity (QTc, tendon, C. diff, aortic aneurysm) when combination therapy is working.' },
        reject: { grade: 'acceptable', message: 'Rejecting this switch is defensible — the current regimen (ceftriaxone + azithromycin) is working. However, a clarifying message to the team about the rationale would be the most collegial approach.' },
        message: { grade: 'optimal', message: 'Best answer. The team may have a specific reason (allergy concern, culture data, QTc concerns) for switching. Messaging to understand rationale and advocate for continuing combination therapy if no clear reason exists is the most appropriate action.' }
      },
      explanation: 'Switching stable CAP patients to fluoroquinolone monotherapy mid-treatment is usually unnecessary — clarify rationale.',
      rejectReasons: [
        { id: 'r1', text: 'Levofloxacin has no CAP activity', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'Patient has a fluoroquinolone allergy', correct: false },
        { id: 'r4', text: 'Fluoroquinolones are never used in severe CAP', correct: false }
      ]
    }
  }
];

// ============================================================================
// UTI / PYELONEPHRITIS — Patient D_UTI
// ============================================================================
const UTI_PATIENT = {
  D_UTI: {
    name: 'ALVAREZ, PATRICIA M',
    mrn: '01305927',
    dob: '06/22/1968',
    age: '57F',
    weight: '68 kg',
    height: '165 cm',
    allergies: ['Sulfa (Stevens-Johnson syndrome)', 'Penicillin (hives)'],
    room: '5N-512A',
    admitDate: '04/05/2026',
    attending: 'Okafor, Chioma, MD',
    dx: 'Acute pyelonephritis (N10), CKD Stage II',
    code: 'Full',
    hp: {
      cc: 'Right flank pain, fever, and dysuria x 3 days',
      hpi: '57 y/o F with CKD Stage II and diabetes presents with 3 days of progressively worsening right flank pain, fevers to 102.5, chills, dysuria, and urinary frequency. No prior history of pyelonephritis or nephrolithiasis. Denies vaginal discharge. Reports good PO intake but nauseous. In ED found febrile, mildly hypotensive, tachycardic. UA with pyuria and bacteriuria. Admitted for IV antibiotics.',
      pmh: ['T2DM (A1c 7.8)', 'CKD Stage II (baseline SCr 1.1)', 'HTN', 'Hypothyroidism'],
      meds: ['Metformin 1000 mg PO BID', 'Losartan 50 mg PO daily', 'Levothyroxine 75 mcg PO daily', 'Atorvastatin 20 mg PO daily'],
      exam: {
        vitals: 'T 38.9 | HR 104 | BP 108/68 | RR 18 | SpO2 98% RA',
        cv: 'Tachycardic, regular',
        pulm: 'CTAB',
        ext: 'Warm, well perfused',
        neuro: 'A&O x4. Right CVA tenderness prominent.'
      },
      assessment: 'Acute pyelonephritis in patient with multiple severe antibiotic allergies (sulfa SJS, penicillin hives). Requires IV antibiotic therapy.',
      plan: [
        '1. Pyelonephritis: IV antibiotics, blood cultures x2, urine culture.',
        '2. IV fluids.',
        '3. Hold metformin while hospitalized.',
        '4. Continue losartan if BP tolerates.',
        '5. Monitor SCr daily.'
      ]
    },
    labs: {
      '04/05 0500': { Na: '138', K: '3.9', BUN: ['24','H'], SCr: ['1.3','H'], Glucose: ['182','H'], WBC: ['18.2','H'], Hgb: '12.4', Plt: '265', Lactate: ['2.2','H'], 'CRP': ['9.8','H'], UA: 'LE+++ Nit+ WBC>100 Bact++' },
      '04/04 2000': { WBC: ['19.8','H'], BUN: ['22','H'], SCr: ['1.2','H'], Lactate: ['2.6','H'] }
    },
    notes: [
      { dt: '04/05 0700', author: 'Okafor, Chioma, MD', type: 'Progress Note', text: 'S: Right flank pain, fevers, dysuria.\nO: T 38.9, HR 104, BP 108/68. WBC 18.2. UA markedly positive. Right CVA tenderness.\nA/P: Acute pyelo. Note multiple severe antibiotic allergies (sulfa SJS, penicillin hives). IV antibiotics, fluids. Pending culture data.' }
    ],
    inpatientMeds: [
      { drug: 'Acetaminophen', dose: '650 mg', route: 'PO', freq: 'Q6H PRN', sched: ['PRN'], status: 'Active' },
      { drug: 'Levothyroxine', dose: '75 mcg', route: 'PO', freq: 'Daily', sched: ['0600'], status: 'Active' },
      { drug: 'Losartan', dose: '50 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Active' }
    ],
    homeMeds: [
      { drug: 'Atorvastatin 20 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Levothyroxine 75 mcg', freq: 'Daily', status: 'Active' },
      { drug: 'Losartan 50 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Metformin 1000 mg', freq: 'BID', status: 'Active' }
    ]
  }
};

const UTI_EASY = [
  mk('UTI_E1', 'D_UTI',
    'sulfamethoxazole-trimethoprim (BACTRIM DS) 800-160 MG tablet',
    '1 tablet, Oral, BID',
    '1 tablet', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'ABSOLUTELY CONTRAINDICATED. The patient has documented sulfa allergy with history of Stevens-Johnson syndrome — one of the most severe cutaneous adverse reactions, with significant mortality. Sulfamethoxazole is a sulfonamide. Re-exposure could precipitate fatal SJS/TEN. This is an unambiguous reject and should trigger a pharmacy intervention.',
      rejectReasons: [
        { id: 'r1', text: 'Documented sulfa allergy with history of Stevens-Johnson syndrome', correct: true },
        { id: 'r2', text: 'Risk of fatal SJS/TEN recurrence with re-exposure', correct: true },
        { id: 'r3', text: 'Sulfamethoxazole is a sulfonamide — directly contraindicated', correct: true },
        { id: 'r4', text: 'Bactrim is not effective for pyelonephritis', correct: false },
        { id: 'r5', text: 'Dose is too low', correct: false },
        { id: 'r6', text: 'Wrong route of administration', correct: false }
      ]
    },
    { priority: 'Stat', timePending: '30m' }
  ),
  mk('UTI_E2', 'D_UTI',
    'nitrofurantoin monohydrate (MACROBID) 100 MG capsule',
    '100 mg, Oral, BID x 7 days',
    '100 mg', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'Nitrofurantoin is indicated ONLY for uncomplicated lower UTI (cystitis) — it does NOT achieve adequate tissue concentrations in the renal parenchyma and must NEVER be used to treat pyelonephritis. Using nitrofurantoin here would result in clinical failure. This is a classic teaching point and frequently missed.',
      rejectReasons: [
        { id: 'r1', text: 'Nitrofurantoin does not achieve adequate renal tissue concentrations', correct: true },
        { id: 'r2', text: 'Contraindicated for pyelonephritis — will result in treatment failure', correct: true },
        { id: 'r3', text: 'Appropriate only for uncomplicated cystitis, not upper tract infections', correct: true },
        { id: 'r4', text: 'Patient has a nitrofurantoin allergy', correct: false },
        { id: 'r5', text: 'Dose is too low for UTI treatment', correct: false },
        { id: 'r6', text: 'Nitrofurantoin has no activity against E. coli', correct: false }
      ]
    },
    { timePending: '1h 15m' }
  )
];

const UTI_MEDIUM = [
  mk('UTI_M1', 'D_UTI',
    'ceftriaxone 1 GM IVPB',
    '1 g, IVPB, Daily',
    '1 g', 'IVPB', 'Daily',
    {
      correctAction: 'verify',
      explanation: 'Ceftriaxone 1 g IV daily is appropriate empiric therapy for pyelonephritis. Although the patient has a "penicillin — hives" allergy, third-generation cephalosporins have very low cross-reactivity with penicillins (<1-2%) and hives alone (non-anaphylactic) is not an absolute contraindication. Ceftriaxone is standard-of-care for pyelonephritis, does not require renal dose adjustment, and is an excellent choice here.',
      rejectReasons: [
        { id: 'r1', text: 'Penicillin allergy with hives is an absolute contraindication to cephalosporins', correct: false },
        { id: 'r2', text: 'Dose is too low for pyelonephritis', correct: false },
        { id: 'r3', text: 'Requires renal adjustment in CKD II', correct: false },
        { id: 'r4', text: 'Not active against typical urinary pathogens', correct: false },
        { id: 'r5', text: 'Should be oral, not IV', correct: false }
      ]
    },
    { priority: 'Stat', timePending: '25m' }
  ),
  mk('UTI_M2', 'D_UTI',
    'gentamicin 400 MG IVPB',
    '400 mg (5.9 mg/kg), IVPB, Daily (extended-interval)',
    '400 mg', 'IVPB', 'Daily',
    {
      correctAction: 'reject',
      explanation: 'Gentamicin monotherapy for pyelonephritis is problematic. Aminoglycosides are nephrotoxic, and this patient already has CKD Stage II and an acute bump in SCr (1.1 → 1.3). Using a nephrotoxic agent empirically — especially when safer beta-lactam options exist — is hard to justify. Aminoglycosides may be used as adjunctive therapy in specific scenarios, but should not be the empiric monotherapy choice for routine pyelonephritis.',
      rejectReasons: [
        { id: 'r1', text: 'Aminoglycoside nephrotoxicity in a patient with CKD and rising SCr', correct: true },
        { id: 'r2', text: 'Safer beta-lactam alternatives (ceftriaxone) are available', correct: true },
        { id: 'r3', text: 'Not first-line empiric therapy for routine pyelonephritis', correct: true },
        { id: 'r4', text: 'Patient has an aminoglycoside allergy', correct: false },
        { id: 'r5', text: 'Dose exceeds maximum allowed', correct: false },
        { id: 'r6', text: 'Extended-interval dosing is inappropriate in UTI', correct: false }
      ]
    }
  ),
  mk('UTI_M3', 'D_UTI',
    'ciprofloxacin 500 MG tablet',
    '500 mg, Oral, BID',
    '500 mg', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'Oral ciprofloxacin is inappropriate for initial empiric therapy of hospitalized pyelonephritis for several reasons: (1) Patient has septic physiology (tachycardia, elevated lactate, hypotension in ED) — IV therapy is preferred initially. (2) E. coli fluoroquinolone resistance exceeds 20% in many US regions, so ciprofloxacin should not be used empirically for severe UTI without local susceptibility data. (3) FDA boxed warnings on fluoroquinolones recommend avoidance when alternatives are available. IV ceftriaxone is a better empiric choice.',
      rejectReasons: [
        { id: 'r1', text: 'Hospitalized pyelo with septic features — IV therapy preferred over PO initially', correct: true },
        { id: 'r2', text: 'E. coli fluoroquinolone resistance >20% in most regions — empiric coverage unreliable', correct: true },
        { id: 'r3', text: 'FDA boxed warnings recommend avoiding fluoroquinolones when alternatives exist', correct: true },
        { id: 'r4', text: 'Ciprofloxacin is contraindicated in all UTIs', correct: false },
        { id: 'r5', text: 'Dose is too high', correct: false },
        { id: 'r6', text: 'Patient has a ciprofloxacin allergy', correct: false }
      ]
    }
  )
];

const UTI_HARD = [
  {
    ...mk('UTI_H1', 'D_UTI',
      'ertapenem 1 GM IVPB',
      '1 g, IVPB, Daily',
      '1 g', 'IVPB', 'Daily',
      null
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: 'Ertapenem is effective but is broad-spectrum reserved for ESBL-producing organisms and other resistant pathogens. Using a carbapenem empirically for routine community-acquired pyelonephritis without ESBL risk factors contributes to carbapenem resistance. Save carbapenems for cases with documented or suspected ESBL.' },
        reject: { grade: 'acceptable', message: 'Rejecting is reasonable stewardship-wise — ceftriaxone is preferred for routine community pyelo. However, clarifying with the team is more collegial if they may have ESBL risk information not in the chart.' },
        message: { grade: 'optimal', message: 'Best answer. Message the team to ask about ESBL risk factors (prior ESBL isolation, recent healthcare exposure, nursing home residence, recent broad-spectrum antibiotics). If none exist, recommend narrowing to ceftriaxone for routine community pyelo.' }
      },
      explanation: 'Carbapenems should be reserved for ESBL — ask about risk factors before accepting empirically.',
      rejectReasons: [
        { id: 'r1', text: 'Ertapenem is not active against urinary pathogens', correct: false },
        { id: 'r2', text: 'Dose is too low', correct: false },
        { id: 'r3', text: 'Patient has a carbapenem allergy', correct: false },
        { id: 'r4', text: 'Ertapenem requires renal adjustment at baseline', correct: false }
      ]
    }
  },
  {
    ...mk('UTI_H2', 'D_UTI',
      'aztreonam 1 GM IVPB',
      '1 g, IVPB, Q8H',
      '1 g', 'IVPB', 'Q8H',
      null
    ),
    teaching: {
      correctAction: 'verify',
      detailedFeedback: {
        verify: { grade: 'optimal', message: 'Excellent choice given the allergy profile. Aztreonam is a monobactam with gram-negative coverage and NO cross-reactivity with penicillins or most cephalosporins (except ceftazidime, which shares a side chain). It is a reasonable option for patients with severe beta-lactam allergies who need gram-negative coverage for pyelonephritis.' },
        reject: { grade: 'incorrect', message: 'Aztreonam is an appropriate gram-negative agent without cross-reactivity to penicillins. Rejection is not warranted.' },
        message: { grade: 'acceptable', message: 'Confirming the indication is reasonable, but aztreonam is a well-recognized choice in this allergy context.' }
      },
      explanation: 'Aztreonam has no cross-reactivity with penicillins — good choice for severe PCN allergy + gram-negative infections.',
      rejectReasons: [
        { id: 'r1', text: 'Aztreonam cross-reacts with penicillin allergy', correct: false },
        { id: 'r2', text: 'Aztreonam has no gram-negative activity', correct: false },
        { id: 'r3', text: 'Dose is too low', correct: false },
        { id: 'r4', text: 'Aztreonam is contraindicated in CKD', correct: false }
      ]
    }
  },
  {
    ...mk('UTI_H3', 'D_UTI',
      'cefepime 2 GM IVPB',
      '2 g, IVPB, Q12H',
      '2 g', 'IVPB', 'Q12H',
      null
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: 'Cefepime is effective but has broader pseudomonal coverage than needed for routine community-acquired pyelonephritis. Empirically covering Pseudomonas here is unnecessary unless the patient has specific risk factors (recent hospitalization, prior Pseudomonas isolation, structural urinary abnormalities). Ceftriaxone is preferred as a narrower-spectrum choice.' },
        reject: { grade: 'acceptable', message: 'Rejecting is reasonable — ceftriaxone is the standard-of-care for community pyelo. However, clarifying with the team before rejecting would be more collegial in case Pseudomonas risk factors exist that are not in the chart.' },
        message: { grade: 'optimal', message: 'Best answer. Ask the team whether Pseudomonas risk factors exist (prior isolation, hospitalization, indwelling catheter, structural GU abnormality). If none, recommend narrowing to ceftriaxone.' }
      },
      explanation: 'Cefepime is broader than needed for routine community pyelo — confirm Pseudomonas risk before accepting.',
      rejectReasons: [
        { id: 'r1', text: 'Cefepime has no gram-negative activity', correct: false },
        { id: 'r2', text: 'Dose is too low', correct: false },
        { id: 'r3', text: 'Patient has a cefepime allergy', correct: false },
        { id: 'r4', text: 'Cefepime is never used for UTI', correct: false }
      ]
    }
  }
];

// ============================================================================
// Export: Disease → { patient, orders: { easy, medium, hard } }
// ============================================================================
// ============================================================================
// ATRIAL FIBRILLATION — Patient D_AFIB
// ============================================================================
const AFIB_PATIENT = {
  D_AFIB: {
    name: 'KOWALSKI, MARGARET T',
    mrn: '01304522',
    dob: '06/21/1948',
    age: '77F',
    weight: '68 kg',
    height: '158 cm',
    allergies: ['NKDA'],
    room: '5W-512A',
    admitDate: '04/05/2026',
    attending: 'Reyes, Daniel, MD',
    dx: 'New-onset atrial fibrillation with rapid ventricular response (I48.91), HTN, T2DM',
    code: 'Full',
    hp: {
      cc: 'Palpitations and lightheadedness x 2 days',
      hpi: '77 y/o F with HTN, T2DM, and prior TIA (2022) presents with 2 days of palpitations, fatigue, and mild lightheadedness. No chest pain or syncope. In ED found in atrial fibrillation with RVR (HR 132), BP 128/78. Troponin negative x2. TSH normal. Echo shows preserved EF 55%, mild LA enlargement, no thrombus. CHA2DS2-VASc = 5 (age, HTN, DM, prior TIA, female). HAS-BLED = 2. Admitted for rate control and anticoagulation initiation.',
      pmh: ['HTN', 'T2DM (A1c 7.2)', 'TIA 2022 (no residual deficits)', 'Osteoarthritis', 'Hyperlipidemia'],
      meds: ['Amlodipine 10 mg PO daily', 'Metformin 1000 mg PO BID', 'Atorvastatin 40 mg PO QHS', 'Aspirin 81 mg PO daily', 'Acetaminophen PRN'],
      exam: {
        vitals: 'T 98.0 | HR 128 irregular | BP 124/76 | RR 18 | SpO2 97% RA',
        cv: 'Irregularly irregular, no murmurs, no JVD',
        pulm: 'Clear bilaterally',
        ext: 'No edema, warm, well-perfused',
        neuro: 'A&O x4, no focal deficits'
      },
      assessment: 'New-onset AFib with RVR. Hemodynamically stable. High stroke risk (CHA2DS2-VASc 5). Needs rate control and long-term anticoagulation.',
      plan: [
        '1. AFib RVR: Rate control with IV then PO beta-blocker or non-DHP CCB.',
        '2. Anticoagulation: DOAC preferred given high stroke risk.',
        '3. Continue home antihypertensives and statin.',
        '4. Discontinue aspirin once DOAC initiated (no concurrent CAD indication).',
        '5. Telemetry monitoring.'
      ]
    },
    labs: {
      '04/05 0500': { Na: '139', K: '4.2', Cl: '102', CO2: '25', BUN: '18', SCr: '0.9', Glucose: ['142','H'], Ca: '9.4', Mg: '2.0', WBC: '7.8', Hgb: '12.9', Hct: '38.2', Plt: '236', INR: '1.0', PTT: '29', Troponin: '<0.01', TSH: '2.1' }
    },
    notes: [
      { dt: '04/05 0700', author: 'Reyes, Daniel, MD', type: 'H&P', text: 'A: New AFib RVR, hemodynamically stable, high stroke risk.\nP: Rate control, initiate anticoagulation per CHA2DS2-VASc, monitor telemetry.' }
    ],
    inpatientMeds: [
      { drug: 'Amlodipine', dose: '10 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Active' },
      { drug: 'Atorvastatin', dose: '40 mg', route: 'PO', freq: 'QHS', sched: ['2100'], status: 'Active' },
      { drug: 'Metformin', dose: '1000 mg', route: 'PO', freq: 'BID', sched: ['0800','2000'], status: 'Active' }
    ],
    homeMeds: [
      { drug: 'Amlodipine 10 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Aspirin 81 mg', freq: 'Daily', status: 'Active' },
      { drug: 'Atorvastatin 40 mg', freq: 'QHS', status: 'Active' },
      { drug: 'Metformin 1000 mg', freq: 'BID', status: 'Active' }
    ]
  }
};

const AFIB_EASY = [
  mk('AFIB_E1', 'D_AFIB',
    'dofetilide (TIKOSYN) 500 MCG capsule',
    '500 mcg, Oral, BID, First dose 4/5/26 0900',
    '500 mcg', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'Dofetilide has strict initiation requirements: MUST be started in a facility with continuous ECG monitoring for a minimum of 3 days, with QTc measured 2-3 hours after each dose, and dose adjusted for CrCl. It is NEVER ordered as a first dose without baseline QTc, and it cannot be initiated outside the mandatory Tikosyn REMS program. Ordering dofetilide as a simple admission order is a serious safety error — torsades de pointes risk is significant.',
      rejectReasons: [
        { id: 'r1', text: 'Dofetilide requires mandatory inpatient initiation with continuous ECG monitoring', correct: true },
        { id: 'r2', text: 'No baseline QTc documented before initiation', correct: true },
        { id: 'r3', text: 'Dose not adjusted for CrCl per Tikosyn REMS protocol', correct: true },
        { id: 'r4', text: 'Dofetilide is contraindicated in all AFib patients', correct: false },
        { id: 'r5', text: 'Dose is too low for rate control', correct: false },
        { id: 'r6', text: 'Dofetilide is only available IV', correct: false }
      ]
    },
    { priority: 'Stat', timePending: '15m' }
  ),
  mk('AFIB_E2', 'D_AFIB',
    'aspirin 325 MG tablet',
    '325 mg, Oral, Daily (stroke prevention)',
    '325 mg', 'Oral', 'Daily',
    {
      correctAction: 'reject',
      explanation: 'Aspirin monotherapy is NOT recommended for stroke prevention in AFib. The 2023 ACC/AHA/HRS AFib guidelines explicitly removed aspirin as an acceptable option for stroke prevention in AFib because it provides minimal stroke protection while still carrying bleeding risk. With CHA2DS2-VASc of 5, this patient requires full oral anticoagulation (DOAC preferred). Aspirin also does not add benefit once a DOAC is started and should be discontinued unless there is a separate CAD indication.',
      rejectReasons: [
        { id: 'r1', text: 'Aspirin is not recommended for stroke prevention in AFib (2023 guidelines)', correct: true },
        { id: 'r2', text: 'CHA2DS2-VASc of 5 requires full oral anticoagulation, not antiplatelet', correct: true },
        { id: 'r3', text: 'No concurrent indication for aspirin (no CAD/stents)', correct: true },
        { id: 'r4', text: 'Patient has an aspirin allergy', correct: false },
        { id: 'r5', text: 'Dose is too high for cardioprotection', correct: false },
        { id: 'r6', text: 'Aspirin is contraindicated in HTN', correct: false }
      ]
    }
  )
];

const AFIB_MEDIUM = [
  mk('AFIB_M1', 'D_AFIB',
    'metoprolol tartrate 5 MG injection',
    '5 mg, IV Push, Q5min x3 PRN HR >110',
    '5 mg', 'IV Push', 'Q5min x3 PRN',
    {
      correctAction: 'verify',
      explanation: 'IV metoprolol 5 mg x3 doses is a standard and appropriate acute rate-control regimen for AFib with RVR in a hemodynamically stable patient. Per ACC/AHA guidelines, beta-blockers (or non-DHP CCBs) are first-line for rate control. Patient has EF 55% (preserved), HR 128, BP 124/76 — no contraindications. Monitor HR and BP between doses.',
      rejectReasons: [
        { id: 'r1', text: 'Metoprolol contraindicated in AFib', correct: false },
        { id: 'r2', text: 'Patient is hemodynamically unstable', correct: false },
        { id: 'r3', text: 'Dose is too high', correct: false },
        { id: 'r4', text: 'Patient has a beta-blocker allergy', correct: false },
        { id: 'r5', text: 'Should only use non-DHP CCB for rate control', correct: false }
      ]
    },
    { priority: 'Stat', timePending: '30m' }
  ),
  mk('AFIB_M2', 'D_AFIB',
    'apixaban (ELIQUIS) 5 MG tablet',
    '5 mg, Oral, BID, First dose 4/5/26 0900',
    '5 mg', 'Oral', 'BID',
    {
      correctAction: 'verify',
      explanation: 'Apixaban 5 mg BID is correct for this patient. Dose reduction to 2.5 mg BID would only apply if the patient met ≥2 of: age ≥80, weight ≤60 kg, or SCr ≥1.5. This patient meets only 1 (age 77 is below 80, weight 68 kg, SCr 0.9). DOAC is preferred over warfarin in non-valvular AFib. CHA2DS2-VASc of 5 clearly warrants anticoagulation.',
      rejectReasons: [
        { id: 'r1', text: 'Dose should be reduced to 2.5 mg BID', correct: false },
        { id: 'r2', text: 'Warfarin is preferred over DOAC', correct: false },
        { id: 'r3', text: 'Patient does not need anticoagulation', correct: false },
        { id: 'r4', text: 'Patient has an apixaban allergy', correct: false },
        { id: 'r5', text: 'Apixaban contraindicated with metoprolol', correct: false }
      ]
    }
  ),
  mk('AFIB_M3', 'D_AFIB',
    'digoxin 0.5 MG injection',
    '0.5 mg, IV Push, Once (loading dose)',
    '0.5 mg', 'IV Push', 'Once',
    {
      correctAction: 'reject',
      explanation: 'Digoxin is NOT first-line for rate control in AFib. Per ACC/AHA, digoxin should be reserved for patients with HFrEF or those who cannot tolerate beta-blockers or non-DHP CCBs. This patient has preserved EF (55%) and no contraindication to beta-blockers. Digoxin has a narrow therapeutic window, delayed onset, and is associated with increased mortality when used as first-line in AFib without HF. The patient is already on metoprolol which should be optimized first.',
      rejectReasons: [
        { id: 'r1', text: 'Digoxin is not first-line rate control (reserve for HFrEF or BB/CCB intolerance)', correct: true },
        { id: 'r2', text: 'Patient has preserved EF — no HFrEF indication', correct: true },
        { id: 'r3', text: 'Patient already on beta-blocker which should be optimized first', correct: true },
        { id: 'r4', text: 'Digoxin is contraindicated in all AFib', correct: false },
        { id: 'r5', text: 'Dose is below the loading dose range', correct: false },
        { id: 'r6', text: 'Patient has a digoxin allergy', correct: false }
      ]
    }
  )
];

const AFIB_HARD = [
  {
    ...mk('AFIB_H1', 'D_AFIB',
      'amiodarone 150 MG injection',
      '150 mg IV bolus then 1 mg/min x6h then 0.5 mg/min',
      '150 mg', 'IV', 'Bolus then infusion',
      null,
      { priority: 'Stat' }
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: 'Amiodarone is acceptable for rhythm control in AFib but is not first-line for rate control in a stable patient. This patient is hemodynamically stable (BP 124/76) and should first receive adequate trial of beta-blocker or non-DHP CCB. Amiodarone carries significant long-term toxicities (thyroid, pulmonary, hepatic) and should be reserved for refractory cases or when rhythm control is the chosen strategy.' },
        reject: { grade: 'suboptimal', message: 'Rejecting outright is too aggressive. Amiodarone has a clear role in AFib — just not as first-line rate control in a stable patient. A clarification is more appropriate than rejection.' },
        message: { grade: 'optimal', message: 'Best answer. Clarify with the team whether the goal is rate control (try BB/CCB first) or rhythm control (discuss cardioversion and the rationale for amiodarone given its toxicity profile). Also need anticoagulation duration planning before/after any cardioversion.' }
      },
      explanation: 'Amiodarone is nuanced in new-onset stable AFib — clarify rate vs rhythm strategy.',
      rejectReasons: [
        { id: 'r1', text: 'Amiodarone is contraindicated in AFib', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'Patient has amiodarone allergy', correct: false }
      ]
    }
  },
  {
    ...mk('AFIB_H2', 'D_AFIB',
      'warfarin 5 MG tablet',
      '5 mg, Oral, Daily, First dose 4/5/26 2000',
      '5 mg', 'Oral', 'Daily',
      null,
      { times: ['2000'] }
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'acceptable', message: 'Warfarin is a valid anticoagulation choice for non-valvular AFib, but current guidelines prefer DOACs over warfarin unless there is a specific contraindication (mechanical valve, moderate-to-severe mitral stenosis, ESRD on some protocols). This patient has normal SCr (0.9) and no valvular disease — a DOAC would be preferred first-line.' },
        reject: { grade: 'suboptimal', message: 'Warfarin is not wrong, just not preferred. Rejecting outright misses the opportunity to discuss the DOAC-first strategy.' },
        message: { grade: 'optimal', message: 'Best answer. Clarify whether the team specifically prefers warfarin (e.g., cost, patient preference, prior failure of DOAC) or whether a DOAC such as apixaban would be appropriate given current guideline preferences.' }
      },
      explanation: 'DOACs are preferred over warfarin in non-valvular AFib — clarify team rationale.',
      rejectReasons: [
        { id: 'r1', text: 'Warfarin is never used in AFib anymore', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'Patient has warfarin allergy', correct: false }
      ]
    }
  },
  {
    ...mk('AFIB_H3', 'D_AFIB',
      'diltiazem 20 MG injection',
      '20 mg, IV Push, Once (0.25 mg/kg)',
      '20 mg', 'IV Push', 'Once',
      null,
      { priority: 'Stat' }
    ),
    teaching: {
      correctAction: 'verify',
      detailedFeedback: {
        verify: { grade: 'optimal', message: 'Correct. IV diltiazem 0.25 mg/kg (~17-20 mg for 68 kg) is a standard and guideline-supported alternative for acute AFib rate control in a hemodynamically stable patient with preserved EF. Patient has EF 55% (no HFrEF contraindication) and BP 124/76 (adequate). Non-DHP CCBs are equivalent to beta-blockers as first-line rate control in HFpEF or normal EF.' },
        reject: { grade: 'suboptimal', message: 'Diltiazem is only contraindicated in HFrEF. This patient has preserved EF (55%) — diltiazem is an appropriate first-line rate control agent here. Rejecting would delay symptom relief.' },
        message: { grade: 'acceptable', message: 'Diltiazem is clearly appropriate given preserved EF. Messaging for clarification is unnecessary but not harmful.' }
      },
      explanation: 'Non-DHP CCBs are fine for rate control in AFib with preserved EF. They are only contraindicated in HFrEF.',
      rejectReasons: [
        { id: 'r1', text: 'Diltiazem is contraindicated in all AFib', correct: false },
        { id: 'r2', text: 'Patient has HFrEF', correct: false },
        { id: 'r3', text: 'Dose is too high', correct: false },
        { id: 'r4', text: 'Should not combine with metoprolol', correct: false }
      ]
    }
  }
];

// ============================================================================
// SEPSIS — Patient D_SEP
// ============================================================================
const SEP_PATIENT = {
  D_SEP: {
    name: 'WASHINGTON, ANDRE L',
    mrn: '01405733',
    dob: '08/14/1963',
    age: '62M',
    weight: '94 kg',
    height: '180 cm',
    allergies: ['Vancomycin (red man — infusion reaction, not true allergy)'],
    room: 'MICU-3',
    admitDate: '04/05/2026',
    attending: 'Nakamura, Lisa, MD',
    dx: 'Septic shock from intra-abdominal source (R65.21), T2DM, CKD Stage II',
    code: 'Full',
    hp: {
      cc: 'Fever, abdominal pain, and confusion x 1 day',
      hpi: '62 y/o M with T2DM (A1c 9.1) and CKD Stage II (baseline SCr 1.3) presents with fever to 39.4, diffuse abdominal pain, and new confusion. In ED found hypotensive (BP 78/44), tachycardic (HR 128), tachypneic (RR 28), febrile (T 39.3), and with mottled extremities. Lactate 4.8. CT abdomen shows sigmoid diverticulitis with free air and 4 cm abscess. Started on IVF resuscitation, empiric broad-spectrum antibiotics, and norepinephrine for MAP <65. Surgery consulted for source control.',
      pmh: ['T2DM (A1c 9.1)', 'CKD Stage II (baseline SCr 1.3)', 'HTN', 'Diverticulosis', 'Former smoker'],
      meds: ['Metformin 1000 mg PO BID', 'Lisinopril 20 mg PO daily', 'Insulin glargine 24 units SQ QHS', 'Atorvastatin 20 mg PO QHS'],
      exam: {
        vitals: 'T 39.3 | HR 124 | BP 88/52 (on norepi) | RR 26 | SpO2 94% 4L',
        cv: 'Tachycardic, regular, no murmurs',
        pulm: 'Clear bilaterally',
        abd: 'Diffusely tender, guarding, decreased bowel sounds',
        ext: 'Cool, mottled, delayed cap refill',
        neuro: 'Confused, oriented to self only'
      },
      assessment: 'Septic shock from perforated diverticulitis with abscess. Requires broad-spectrum empiric antibiotics covering gram-negatives, anaerobes, and enterococci. Source control pending surgery. Acute on chronic kidney injury.',
      plan: [
        '1. Septic shock: Hour-1 bundle — lactate, cultures, broad-spectrum antibiotics, IVF 30 mL/kg, vasopressors to MAP >65.',
        '2. Source control: Surgery for perforation / abscess drainage.',
        '3. Hold metformin and lisinopril due to AKI.',
        '4. Stress-dose steroids if refractory shock.',
        '5. VTE prophylaxis when hemodynamically stable.',
        '6. Tight glucose control with IV insulin.'
      ]
    },
    labs: {
      '04/05 0500': { Na: '138', K: ['5.2','H'], Cl: '104', CO2: ['18','L'], BUN: ['42','H'], SCr: ['2.4','H'], Glucose: ['312','H'], Ca: '8.6', Mg: '1.8', Phos: ['4.8','H'], WBC: ['24.8','H'], Hgb: '12.1', Hct: '36.0', Plt: ['112','L'], PT: '14.2', INR: '1.3', Lactate: ['4.8','H'], Procalcitonin: ['12.4','H'], 'CRP': ['22.6','H'] },
      '04/04 2300': { WBC: ['26.4','H'], Lactate: ['5.2','H'], SCr: ['2.6','H'], K: ['5.4','H'] }
    },
    notes: [
      { dt: '04/05 0545', author: 'Nakamura, Lisa, MD', type: 'ICU Admission Note', text: 'A: Septic shock from perforated sigmoid diverticulitis. Acute on chronic kidney injury.\nP: Hour-1 sepsis bundle, surgical source control, pressors to MAP >65, hold nephrotoxins, tight glucose control.' }
    ],
    imaging: [
      { dt: '04/05 0400', type: 'CT Abdomen/Pelvis w/ contrast', findings: 'Sigmoid diverticulitis with pericolonic free air and 4 cm rim-enhancing fluid collection consistent with abscess. No large-volume free fluid.' }
    ],
    inpatientMeds: [
      { drug: 'Insulin infusion', dose: 'Titrate to glucose 140-180', route: 'IV', freq: 'Continuous', sched: ['Cont'], status: 'Active' },
      { drug: 'Norepinephrine', dose: 'Titrate to MAP >65', route: 'IV', freq: 'Continuous', sched: ['Cont'], status: 'Active' }
    ],
    homeMeds: [
      { drug: 'Atorvastatin 20 mg', freq: 'QHS', status: 'Active' },
      { drug: 'Insulin glargine 24 units', freq: 'QHS', status: 'Active' },
      { drug: 'Lisinopril 20 mg', freq: 'Daily', status: 'HELD (AKI)' },
      { drug: 'Metformin 1000 mg', freq: 'BID', status: 'HELD (AKI)' }
    ]
  }
};

const SEP_EASY = [
  mk('SEP_E1', 'D_SEP',
    'gentamicin 560 MG injection',
    '560 mg (6 mg/kg), IV, Once, First dose 4/5/26 0900',
    '560 mg', 'IV', 'Once',
    {
      correctAction: 'reject',
      explanation: 'Aminoglycoside monotherapy is inappropriate for septic shock from an intra-abdominal source. Gentamicin lacks anaerobic coverage (needed for GI perforation) and lacks enterococcal coverage. Additionally, this patient has acute kidney injury (SCr rising from 1.3 → 2.4) and aminoglycosides are directly nephrotoxic — starting gentamicin in active AKI is a serious error. Empiric intra-abdominal sepsis coverage should include piperacillin-tazobactam OR carbapenem OR ceftriaxone + metronidazole.',
      rejectReasons: [
        { id: 'r1', text: 'Nephrotoxic agent in active AKI', correct: true },
        { id: 'r2', text: 'No anaerobic coverage for intra-abdominal source', correct: true },
        { id: 'r3', text: 'Not appropriate as empiric monotherapy', correct: true },
        { id: 'r4', text: 'Patient has a gentamicin allergy', correct: false },
        { id: 'r5', text: 'Dose is too low', correct: false },
        { id: 'r6', text: 'Gentamicin only available PO', correct: false }
      ]
    },
    { priority: 'Stat', timePending: '10m' }
  ),
  mk('SEP_E2', 'D_SEP',
    'metformin 1000 MG tablet',
    '1000 mg, Oral, BID (continue home dose)',
    '1000 mg', 'Oral', 'BID',
    {
      correctAction: 'reject',
      explanation: 'Metformin is CONTRAINDICATED in this patient. They are in septic shock with acute kidney injury (SCr 2.4, up from baseline 1.3), hypotension, and elevated lactate (4.8). Metformin should be held when eGFR <30 mL/min, in any acute illness with tissue hypoperfusion, or whenever there is risk of lactic acidosis. Continuing metformin in septic shock is a classic and dangerous error — risk of fatal metformin-associated lactic acidosis.',
      rejectReasons: [
        { id: 'r1', text: 'Contraindicated in AKI / unstable renal function', correct: true },
        { id: 'r2', text: 'Risk of metformin-associated lactic acidosis in shock', correct: true },
        { id: 'r3', text: 'Patient already has elevated lactate (4.8)', correct: true },
        { id: 'r4', text: 'Should be continued because A1c is high', correct: false },
        { id: 'r5', text: 'Dose is too high', correct: false },
        { id: 'r6', text: 'Patient has a metformin allergy', correct: false }
      ]
    }
  )
];

const SEP_MEDIUM = [
  mk('SEP_M1', 'D_SEP',
    'piperacillin-tazobactam (ZOSYN) 4.5 G IVPB',
    '4.5 g, IVPB, Q8H (extended infusion over 4h), First dose Stat',
    '4.5 g', 'IVPB', 'Q8H',
    {
      correctAction: 'verify',
      explanation: 'Piperacillin-tazobactam 4.5 g IV Q8H as extended infusion is an excellent empiric choice for intra-abdominal sepsis. It provides broad gram-negative, gram-positive, and anaerobic coverage including Pseudomonas and Enterococcus. Extended infusion improves time-above-MIC and is preferred in severe infections. No dose reduction needed initially in sepsis with AKI — adequate drug concentrations are critical in the first 48 hours; renal dose adjustment can occur after stabilization.',
      rejectReasons: [
        { id: 'r1', text: 'Dose should be reduced for AKI immediately', correct: false },
        { id: 'r2', text: 'Lacks anaerobic coverage', correct: false },
        { id: 'r3', text: 'Extended infusion is never recommended', correct: false },
        { id: 'r4', text: 'Patient has a beta-lactam allergy', correct: false },
        { id: 'r5', text: 'Should use ceftriaxone monotherapy instead', correct: false }
      ]
    },
    { priority: 'Stat', timePending: '8m' }
  ),
  mk('SEP_M2', 'D_SEP',
    'vancomycin 1750 MG IVPB',
    '1750 mg (18.6 mg/kg), IVPB, loading dose over 90 min',
    '1750 mg', 'IVPB', 'Once (load)',
    {
      correctAction: 'message',
      explanation: 'Vancomycin loading dose is reasonable (~20 mg/kg actual body weight) but this patient has a documented vancomycin "allergy" of red man syndrome. Red man syndrome is an infusion-rate-related histamine reaction, NOT a true hypersensitivity, and is not a contraindication to vancomycin. However, this needs to be clarified in the chart, and the order should specify a slower infusion rate (over at least 2 hours, often longer). Pharmacists should message to: (1) confirm the red man history is not true allergy, (2) extend infusion time, and (3) consider pre-medication if history is severe. Also need pharmacokinetic dosing consult for subsequent doses in AKI.',
      rejectReasons: [
        { id: 'r1', text: 'True vancomycin allergy — must reject', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'Not indicated for intra-abdominal sepsis at all', correct: false },
        { id: 'r4', text: 'Should not be used in AKI', correct: false },
        { id: 'r5', text: 'Loading doses are never recommended', correct: false }
      ]
    },
    { priority: 'Stat' }
  ),
  mk('SEP_M3', 'D_SEP',
    'hydrocortisone 50 MG injection',
    '50 mg, IV Push, Q6H (stress dose for refractory shock)',
    '50 mg', 'IV Push', 'Q6H',
    {
      correctAction: 'verify',
      explanation: 'Hydrocortisone 200 mg/day (50 mg IV Q6H) is appropriate for septic shock that remains hypotensive despite adequate fluid resuscitation and vasopressor therapy. Per Surviving Sepsis Campaign guidelines, IV hydrocortisone is recommended in adults with septic shock requiring ongoing vasopressor support. This patient remains on norepinephrine with BP 88/52 — meets criteria. Stress-dose steroids reduce shock duration and may improve mortality in refractory cases.',
      rejectReasons: [
        { id: 'r1', text: 'Steroids contraindicated in all sepsis', correct: false },
        { id: 'r2', text: 'Dose should be IV methylprednisolone instead', correct: false },
        { id: 'r3', text: 'Patient not refractory enough yet', correct: false },
        { id: 'r4', text: 'Patient has a steroid allergy', correct: false },
        { id: 'r5', text: 'Will worsen glucose control — should not be given', correct: false }
      ]
    }
  )
];

const SEP_HARD = [
  {
    ...mk('SEP_H1', 'D_SEP',
      'meropenem 1 G IVPB',
      '1 g, IVPB, Q8H, First dose Stat',
      '1 g', 'IVPB', 'Q8H',
      null,
      { priority: 'Stat' }
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'acceptable', message: 'Meropenem is an acceptable empiric choice for intra-abdominal sepsis — broad gram-negative, gram-positive, and anaerobic coverage including ESBL producers. However, patient is already starting on piperacillin-tazobactam (excellent empiric choice), so adding meropenem would be duplicative coverage unless there is a specific reason (prior ESBL, recent broad-spectrum exposure).' },
        reject: { grade: 'suboptimal', message: 'Meropenem is not wrong for intra-abdominal sepsis — it is a valid empiric option. Rejecting outright without clarifying rationale misses the chance to optimize stewardship.' },
        message: { grade: 'optimal', message: 'Best answer. Clarify with the team: why meropenem when piperacillin-tazobactam is already started? Valid reasons could be prior ESBL history, recent broad-spectrum exposure, or healthcare-associated risk factors. Otherwise, de-escalate or choose one agent to avoid redundant antipseudomonal coverage.' }
      },
      explanation: 'Carbapenem duplicates piperacillin-tazobactam coverage — clarify rationale for stewardship.',
      rejectReasons: [
        { id: 'r1', text: 'Meropenem is contraindicated in sepsis', correct: false },
        { id: 'r2', text: 'Dose is too high', correct: false },
        { id: 'r3', text: 'No anaerobic coverage', correct: false },
        { id: 'r4', text: 'Patient has a meropenem allergy', correct: false }
      ]
    }
  },
  {
    ...mk('SEP_H2', 'D_SEP',
      'normal saline 0.9% 1000 ML IVPB',
      '1 L, IV bolus, over 30 min',
      '1 L', 'IV', 'Bolus',
      null,
      { priority: 'Stat' }
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: '0.9% saline is acceptable but no longer the preferred crystalloid in sepsis. Surviving Sepsis Campaign and SMART/SALT-ED trials support balanced crystalloids (Lactated Ringers, Plasma-Lyte) over normal saline to reduce hyperchloremic acidosis and AKI. This patient already has AKI and metabolic acidosis — large-volume NS would likely worsen both.' },
        reject: { grade: 'suboptimal', message: 'Rejecting the fluid outright is not appropriate — the patient needs volume resuscitation. Better to clarify the choice of crystalloid.' },
        message: { grade: 'optimal', message: 'Best answer. Recommend switching to a balanced crystalloid (LR or Plasma-Lyte) given existing hyperchloremic metabolic acidosis and AKI. Volume resuscitation is clearly needed — just not with chloride-rich saline.' }
      },
      explanation: 'Balanced crystalloids are preferred over normal saline in sepsis with AKI and acidosis.',
      rejectReasons: [
        { id: 'r1', text: 'Patient should not receive any IV fluids', correct: false },
        { id: 'r2', text: 'NS is contraindicated in all sepsis', correct: false },
        { id: 'r3', text: 'Rate is too slow', correct: false },
        { id: 'r4', text: 'Patient has a saline allergy', correct: false }
      ]
    }
  },
  {
    ...mk('SEP_H3', 'D_SEP',
      'enoxaparin (LOVENOX) 40 MG injection',
      '40 mg, SQ, Daily (VTE prophylaxis)',
      '40 mg', 'SQ', 'Daily',
      null
    ),
    teaching: {
      correctAction: 'message',
      detailedFeedback: {
        verify: { grade: 'suboptimal', message: 'Enoxaparin 40 mg SQ daily is the standard VTE prophylaxis dose, but two issues: (1) patient has active septic shock with platelets 112 and coagulopathy (INR 1.3), timing of pharmacologic VTE prophylaxis during active shock is nuanced — mechanical prophylaxis may be preferred until stable; and (2) enoxaparin requires renal dose adjustment to 30 mg SQ daily when CrCl <30 mL/min, and this patient has AKI with SCr 2.4 and likely low CrCl.' },
        reject: { grade: 'acceptable', message: 'Rejecting is reasonable given the AKI — dose needs adjustment and patient is not yet hemodynamically stable. However, clarifying with the team is the preferred move so mechanical prophylaxis can be initiated in the interim.' },
        message: { grade: 'optimal', message: 'Best answer. Recommend: (1) hold pharmacologic prophylaxis until hemodynamically stable and platelets trending up, (2) use mechanical prophylaxis (SCDs) now, (3) when ready to start enoxaparin, dose adjust based on CrCl — likely 30 mg SQ daily given AKI. Consider switching to unfractionated heparin if renal function is unstable.' }
      },
      explanation: 'VTE prophylaxis in septic shock with AKI needs timing and dose adjustment consideration.',
      rejectReasons: [
        { id: 'r1', text: 'VTE prophylaxis is not indicated in sepsis', correct: false },
        { id: 'r2', text: 'Enoxaparin is contraindicated in all AKI', correct: false },
        { id: 'r3', text: 'Dose is too low', correct: false },
        { id: 'r4', text: 'Patient has a heparin allergy', correct: false }
      ]
    }
  }
];

export const DISEASE_CASES = {
  hf: {
    admission: { patients: HF_PATIENT,     orders: { easy: HF_EASY,     medium: HF_MEDIUM,     hard: HF_HARD     } },
    mid:       { patients: HF_MID_PATIENT,  orders: { easy: HF_MID_EASY, medium: HF_MID_MEDIUM, hard: HF_MID_HARD } },
    discharge: { patients: HF_DC_PATIENT,   orders: { easy: HF_DC_EASY,  medium: HF_DC_MEDIUM,  hard: HF_DC_HARD  } }
  },
  cap:    { admission: { patients: CAP_PATIENT,  orders: { easy: CAP_EASY,  medium: CAP_MEDIUM,  hard: CAP_HARD  } } },
  uti:    { admission: { patients: UTI_PATIENT,  orders: { easy: UTI_EASY,  medium: UTI_MEDIUM,  hard: UTI_HARD  } } },
  afib:   { admission: { patients: AFIB_PATIENT, orders: { easy: AFIB_EASY, medium: AFIB_MEDIUM, hard: AFIB_HARD } } },
  sepsis: { admission: { patients: SEP_PATIENT,  orders: { easy: SEP_EASY,  medium: SEP_MEDIUM,  hard: SEP_HARD  } } },
  copd:   { admission: { patients: COPD_PATIENT, orders: { easy: COPD_EASY, medium: COPD_MEDIUM, hard: COPD_HARD } } },
  dka:    { admission: { patients: DKA_PATIENT,  orders: { easy: DKA_EASY,  medium: DKA_MEDIUM,  hard: DKA_HARD  } } },
  aki:    { admission: { patients: AKI_PATIENT,  orders: { easy: AKI_EASY,  medium: AKI_MEDIUM,  hard: AKI_HARD  } } }
};

export function getDiseaseCases(diseaseId, level, phase = 'admission') {
  const disease = DISEASE_CASES[diseaseId];
  if (!disease) return null;
  const dc = disease[phase] || disease.admission;
  if (!dc) return null;
  const orders = dc.orders[level] || dc.orders.medium || [];
  return { patients: dc.patients, orders };
}
