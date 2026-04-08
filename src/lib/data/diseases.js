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
  hf:     { patients: HF_PATIENT,   orders: { easy: HF_EASY,   medium: HF_MEDIUM,   hard: HF_HARD   } },
  cap:    { patients: CAP_PATIENT,  orders: { easy: CAP_EASY,  medium: CAP_MEDIUM,  hard: CAP_HARD  } },
  uti:    { patients: UTI_PATIENT,  orders: { easy: UTI_EASY,  medium: UTI_MEDIUM,  hard: UTI_HARD  } },
  afib:   { patients: AFIB_PATIENT, orders: { easy: AFIB_EASY, medium: AFIB_MEDIUM, hard: AFIB_HARD } },
  sepsis: { patients: SEP_PATIENT,  orders: { easy: SEP_EASY,  medium: SEP_MEDIUM,  hard: SEP_HARD  } }
};

export function getDiseaseCases(diseaseId, level) {
  const dc = DISEASE_CASES[diseaseId];
  if (!dc) return null;
  const orders = dc.orders[level] || dc.orders.medium || [];
  return { patients: dc.patients, orders };
}
