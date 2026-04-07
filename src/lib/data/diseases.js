// Disease-focused case library.
// Each disease has a patient record + orders grouped by difficulty (easy/medium/hard).
// Easy = clearly wrong orders. Medium = mix of correct/incorrect. Hard = graded spectrum.

export const DISEASES = [
  { id: 'hf',         label: 'Heart Failure',           icon: '\u2764',    desc: 'Acute decompensated HFrEF' },
  { id: 'cap',        label: 'Pneumonia (CAP)',         icon: '\u{1FAC1}', desc: 'Severe community-acquired pneumonia' },
  { id: 'uti',        label: 'UTI / Pyelonephritis',    icon: '\u{1F48A}', desc: 'Complicated pyelonephritis' },
  { id: 'copd',       label: 'COPD Exacerbation',       icon: '\u{1F32C}', desc: 'Coming soon' },
  { id: 'dka',        label: 'DKA',                     icon: '\u{1F4A7}', desc: 'Coming soon' },
  { id: 'afib',       label: 'Atrial Fibrillation',     icon: '\u{1F493}', desc: 'Coming soon' },
  { id: 'sepsis',     label: 'Sepsis',                  icon: '\u{1F525}', desc: 'Coming soon' },
  { id: 'aki',        label: 'Acute Kidney Injury',     icon: '\u{1FAC0}', desc: 'Coming soon' },
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
export const DISEASE_CASES = {
  hf:  { patients: HF_PATIENT,  orders: { easy: HF_EASY,  medium: HF_MEDIUM,  hard: HF_HARD  } },
  cap: { patients: CAP_PATIENT, orders: { easy: CAP_EASY, medium: CAP_MEDIUM, hard: CAP_HARD } },
  uti: { patients: UTI_PATIENT, orders: { easy: UTI_EASY, medium: UTI_MEDIUM, hard: UTI_HARD } }
};

export function getDiseaseCases(diseaseId, level) {
  const dc = DISEASE_CASES[diseaseId];
  if (!dc) return null;
  const orders = dc.orders[level] || dc.orders.medium || [];
  return { patients: dc.patients, orders };
}
