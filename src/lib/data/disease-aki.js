export const AKI_PATIENT = {
  D_AKI: {
    name: 'WHITAKER, MARGARET R', mrn: '00728432', dob: '06/12/1953', age: '72F', weight: '65 kg', height: '160 cm',
    allergies: ['Penicillin (rash)'], room: '5N-512B', admitDate: '04/08/2026', attending: 'Patel, Anita, MD',
    dx: 'Acute kidney injury on CKD III (N17.9)', code: 'Full',
    hp: {
      cc: 'Decreased urine output, fatigue x 5 days',
      hpi: '72 y/o F with CKD Stage III (baseline SCr 1.3) presents with 5-day history of decreased urine output, progressive fatigue, and poor PO intake due to gastroenteritis-like illness. Taking ibuprofen 600 mg TID for osteoarthritis flare over past 2 weeks. No fever, no dysuria. SCr jumped from 1.3 to 3.2. Urine output <500 mL/day.',
      pmh: ['CKD Stage III (baseline SCr 1.3)', 'HTN', 'Osteoarthritis', 'HLD', 'Mild CHF'],
      meds: ['Lisinopril 20 mg PO daily', 'Ibuprofen 600 mg PO TID (OTC, recent)', 'Atorvastatin 40 mg PO daily', 'Amlodipine 5 mg PO daily', 'Calcium/Vit D 600/400 PO BID'],
      exam: { vitals: 'T 98.1 | HR 92 | BP 138/78 | RR 16 | SpO2 97% RA', cv: 'RRR, no m/r/g', pulm: 'CTAB', ext: 'Dry mucous membranes, trace LE edema, poor skin turgor', neuro: 'A&O x4, mildly fatigued' },
      assessment: 'Prerenal AKI on CKD III, multifactorial: volume depletion + NSAID use + continued ACE inhibitor. FENa < 1% confirms prerenal etiology.',
      plan: ['IV crystalloid resuscitation (NS)', 'Hold lisinopril until renal function improves', 'Discontinue ibuprofen, use acetaminophen instead', 'Daily BMP, strict I/O, daily weights', 'Renal dose adjust all medications', 'Renal consult if SCr worsens']
    },
    labs: {
      '04/08 0600': { Na: ['134', 'L'], K: ['5.4', 'H'], Cl: '102', CO2: ['19', 'L'], BUN: ['58', 'H'], SCr: ['3.2', 'H'], Glucose: '108', Ca: '8.9', Mg: '2.1', Phos: ['5.2', 'H'], WBC: '7.4', Hgb: ['10.8', 'L'], Plt: '245', FENa: '0.6', UrineNa: '15' },
      '04/07 1800': { Na: ['133', 'L'], K: ['5.2', 'H'], BUN: ['52', 'H'], SCr: ['2.9', 'H'] },
      '04/01 (baseline)': { Na: '138', K: '4.1', BUN: '28', SCr: '1.3' }
    },
    notes: [
      { dt: '04/08 0700', author: 'Patel, Anita, MD', type: 'Progress Note', text: 'S: Poor PO x 5d, decreased UOP, fatigue. Taking ibuprofen TID for OA.\nO: Dry mucous membranes, poor skin turgor. SCr 3.2 (baseline 1.3), BUN 58, K 5.4. FENa 0.6%.\nA/P: Prerenal AKI on CKD III, multifactorial. IVF, hold ACE, stop NSAID, monitor K closely.' }
    ],
    inpatientMeds: [
      { drug: 'NS', dose: '150 mL/hr', route: 'IV', freq: 'Continuous', sched: ['Cont'], status: 'Active' },
      { drug: 'Amlodipine', dose: '5 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Active' },
      { drug: 'Atorvastatin', dose: '40 mg', route: 'PO', freq: 'QHS', sched: ['2100'], status: 'Active' },
      { drug: 'Lisinopril', dose: '20 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Held (AKI)' }
    ],
    homeMeds: [
      { drug: 'Lisinopril 20mg', freq: 'Daily', status: 'HELD' },
      { drug: 'Ibuprofen 600mg', freq: 'TID', status: 'DISCONTINUED' },
      { drug: 'Atorvastatin 40mg', freq: 'Daily', status: 'Active' },
      { drug: 'Amlodipine 5mg', freq: 'Daily', status: 'Active' },
      { drug: 'Calcium/Vit D 600/400', freq: 'BID', status: 'Active' }
    ],
    imaging: [
      { type: 'Renal US', date: '04/08/2026 0800', orderedBy: 'Patel, Anita, MD', readBy: 'Park, David, MD (Radiology)', indication: 'AKI workup, r/o obstruction', findings: 'Kidneys: Right 10.2 cm, Left 10.0 cm. Normal echogenicity. No hydronephrosis. No masses. Cortical thinning consistent with CKD.\nBladder: Empty post-void.', impression: 'No hydronephrosis or obstruction. Findings consistent with known CKD.' }
    ],
    cardio: {
      ekg: { date: '04/08/2026 0620', readBy: 'Wilson, James, MD (Cardiology)', rhythm: 'Normal sinus rhythm', intervals: [
        { name: 'Heart Rate', value: '92 bpm', normal: '60-100 bpm', flag: '' },
        { name: 'PR Interval', value: '168 ms', normal: '120-200 ms', flag: '' },
        { name: 'QRS Duration', value: '92 ms', normal: '80-120 ms', flag: '' },
        { name: 'QT Interval', value: '380 ms', normal: '350-440 ms', flag: '' },
        { name: 'QTc (Bazett)', value: '470 ms', normal: '\u2264450 ms (F)', flag: 'H' },
        { name: 'P-Wave', value: 'Normal', normal: 'Upright in I, II, aVF', flag: '' },
        { name: 'Axis', value: 'Normal (+55\u00B0)', normal: '-30\u00B0 to +90\u00B0', flag: '' },
        { name: 'ST Segment', value: 'No acute changes', normal: 'Isoelectric', flag: '' },
        { name: 'T-Wave', value: 'Peaked T-waves II, III, V3-V4', normal: 'Upright in most leads', flag: 'H' }
      ], interpretation: 'NSR. Borderline prolonged QTc. Peaked T-waves consistent with hyperkalemia (K 5.4). No acute ischemic changes. Repeat EKG after K correction.' }
    }
  }
};

const GL = { name: 'KDIGO AKI Guideline', url: 'https://kdigo.org/guidelines/acute-kidney-injury/' };

export const AKI_EASY = [
  { id: 'AKI_E1', patientId: 'D_AKI', orderId: '103701001', isNew: true, priority: 'Routine', timePending: '2h 10m', drugName: 'ibuprofen 600 MG tablet', orderLine: '600 mg, Oral, TID', alerts: [], clinical: { dose: '600 mg', route: 'Oral', freq: 'TID', duration: '', rate: '', volume: '', priority: 'Routine', start: '04/08/2026 0900', stop: '' }, schedule: [{ date: '04/08', times: ['0900', '1400', '2100'] }], dispense: { from: 'SGA 5 NORTH', firstDose: 'SGA 5 NORTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/08/2026 0700', product: { name: 'IBUPROFEN 600 MG TABS', pkg: '100ct Bottle' },
    teaching: { correctAction: 'reject', explanation: 'NSAIDs are a major contributor to this patient\'s AKI. Ibuprofen causes afferent arteriolar vasoconstriction, reducing renal blood flow. Continuing it would worsen the AKI. Acetaminophen is the appropriate alternative for pain in AKI.',
      rejectReasons: [
        { id: 'r1', text: 'NSAIDs caused the AKI \u2014 continuation is contraindicated', correct: true },
        { id: 'r2', text: 'Further nephrotoxicity risk with ongoing NSAID use', correct: true },
        { id: 'r3', text: 'Acetaminophen is the preferred analgesic in AKI', correct: true },
        { id: 'r4', text: 'NSAIDs cause hyperkalemia', correct: false },
        { id: 'r5', text: 'Drug allergy', correct: false }
      ], guideline: GL }
  },
  { id: 'AKI_E2', patientId: 'D_AKI', orderId: '103701002', isNew: true, priority: 'Routine', timePending: '1h 45m', drugName: 'gentamicin 325 MG IVPB', orderLine: '325 mg (5 mg/kg), IVPB, Q24H', alerts: [], clinical: { dose: '325 mg', route: 'IVPB', freq: 'Every 24 hours', duration: '60 min', rate: '', volume: '100 mL NS', priority: 'Routine', start: '04/08/2026 1400', stop: '' }, schedule: [{ date: '04/08', times: ['1400'] }], dispense: { from: 'SGA 5 NORTH', firstDose: 'SGA 5 NORTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/08/2026 0730', product: { name: 'GENTAMICIN 40MG/ML INJ', pkg: '2 mL Vial' },
    teaching: { correctAction: 'reject', explanation: 'Gentamicin is an aminoglycoside, a direct nephrotoxin that would worsen AKI through tubular injury. Even if needed for infection, the dose requires renal adjustment based on CrCl. Standard 5 mg/kg dosing in AKI can lead to accumulation and further renal damage. No documented infection indication here.',
      rejectReasons: [
        { id: 'r1', text: 'Aminoglycosides are direct nephrotoxins \u2014 contraindicated in AKI when alternatives exist', correct: true },
        { id: 'r2', text: 'Dose not adjusted for renal function', correct: true },
        { id: 'r3', text: 'No documented infection requiring aminoglycoside', correct: true },
        { id: 'r4', text: 'Gentamicin is contraindicated in osteoarthritis', correct: false },
        { id: 'r5', text: 'Drug allergy', correct: false }
      ], guideline: GL }
  },
  { id: 'AKI_E3', patientId: 'D_AKI', orderId: '103701003', isNew: true, priority: 'Routine', timePending: '1h 20m', drugName: 'iohexol (Omnipaque 350) IV contrast', orderLine: '100 mL IV, once (for CT with contrast)', alerts: [], clinical: { dose: '100 mL', route: 'IV', freq: 'Once', duration: '', rate: '', volume: '100 mL', priority: 'Routine', start: '04/08/2026 1100', stop: '04/08/2026 1100' }, schedule: [{ date: '04/08', times: ['1100'] }], dispense: { from: 'Radiology', firstDose: 'Radiology', code: 'Unit Dose', triggered: true }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/08/2026 0800', product: { name: 'IOHEXOL 350MG/ML 100ML', pkg: '100 mL Vial' },
    teaching: { correctAction: 'reject', explanation: 'IV iodinated contrast in a patient with AKI (SCr 3.2, eGFR ~15) carries significant risk of contrast-induced nephropathy (CIN). Per KDIGO guidelines, contrast should be avoided when possible in patients with AKI or eGFR <30. If imaging is essential, consider MRI without gadolinium, ultrasound, or non-contrast CT. If contrast is unavoidable, IV fluids for prevention and nephrology consult are needed.',
      rejectReasons: [
        { id: 'r1', text: 'IV contrast risks contrast-induced nephropathy in AKI (SCr 3.2, eGFR ~15)', correct: true },
        { id: 'r2', text: 'KDIGO recommends avoiding contrast in AKI when possible', correct: true },
        { id: 'r3', text: 'Alternative imaging (MRI, US, non-contrast CT) should be considered first', correct: true },
        { id: 'r4', text: 'Iodine allergy is documented', correct: false },
        { id: 'r5', text: 'Contrast causes hyperkalemia directly', correct: false }
      ], guideline: GL }
  }
];

export const AKI_MEDIUM = [
  { id: 'AKI_M1', patientId: 'D_AKI', orderId: '103702001', isNew: true, priority: 'Stat', timePending: '30m', drugName: 'sodium chloride 0.9% infusion', orderLine: '250 mL/hr, IV, Continuous', alerts: [], clinical: { dose: '250 mL/hr', route: 'IV', freq: 'Continuous', duration: '', rate: '250 mL/hr', volume: '1000 mL', priority: 'Stat', start: '04/08/2026 0700', stop: '' }, schedule: [{ date: '04/08', times: ['0700-cont'] }], dispense: { from: 'SGA 5 NORTH', firstDose: 'Floor Stock', code: 'Floor Stock', triggered: false }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/08/2026 0655', product: { name: 'NaCl 0.9% 1000ML BAG', pkg: '1000 mL Bag' },
    teaching: { correctAction: 'verify', explanation: 'IV crystalloid resuscitation is the appropriate first-line treatment for prerenal AKI. KDIGO recommends isotonic crystalloids. 250 mL/hr is reasonable for moderate volume depletion with ongoing monitoring. Watch for fluid overload given mild CHF history.', guideline: GL }
  },
  { id: 'AKI_M2', patientId: 'D_AKI', orderId: '103702002', isNew: true, priority: 'Routine', timePending: '2h 00m', drugName: 'hold lisinopril 20 MG', orderLine: 'Hold until renal function improves', alerts: [], clinical: { dose: 'N/A (Hold)', route: 'PO', freq: 'Hold', duration: '', rate: '', volume: '', priority: 'Routine', start: '04/08/2026', stop: '' }, schedule: [{ date: '04/08', times: ['Hold'] }], dispense: { from: 'SGA 5 NORTH', firstDose: 'N/A', code: 'Hold Order', triggered: false }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/08/2026 0700', product: { name: 'LISINOPRIL 20 MG TABS', pkg: 'Hold order' },
    teaching: { correctAction: 'verify', explanation: 'ACE inhibitors should be held during acute kidney injury. They cause efferent arteriolar vasodilation, which can reduce glomerular filtration pressure and worsen AKI. Holding until SCr returns toward baseline is standard practice. Restart carefully once stable.', guideline: GL }
  },
  { id: 'AKI_M3', patientId: 'D_AKI', orderId: '103702003', isNew: true, priority: 'Routine', timePending: '1h 30m', drugName: 'vancomycin 1000 MG IVPB', orderLine: '1000 mg, IVPB, Q12H', alerts: [], clinical: { dose: '1000 mg', route: 'IVPB', freq: 'Every 12 hours', duration: '90 min', rate: '', volume: '250 mL NS', priority: 'Routine', start: '04/08/2026 0900', stop: '' }, schedule: [{ date: '04/08', times: ['0900', '2100'] }], dispense: { from: 'SGA 5 NORTH', firstDose: 'SGA 5 NORTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/08/2026 0740', product: { name: 'VANCOMYCIN 1GM/250ML IVPB', pkg: '250 mL Premix' },
    teaching: { correctAction: 'reject', explanation: 'Standard vancomycin Q12H dosing is inappropriate in severe AKI (SCr 3.2, CrCl ~15 mL/min). Vancomycin requires extended-interval dosing (Q24-48H or longer) based on renal function and trough monitoring. Additionally, no infection indication is documented. This order should be rejected for both the dosing interval and lack of indication.',
      rejectReasons: [
        { id: 'r1', text: 'Dosing interval inappropriate for severe AKI (needs Q24-48H or longer)', correct: true },
        { id: 'r2', text: 'No documented infection or indication for vancomycin', correct: true },
        { id: 'r3', text: 'Requires pharmacokinetic monitoring in AKI', correct: true },
        { id: 'r4', text: 'Vancomycin is contraindicated in any renal impairment', correct: false },
        { id: 'r5', text: 'Patient has a vancomycin allergy', correct: false }
      ], guideline: GL }
  }
];

export const AKI_HARD = [
  { id: 'AKI_H1', patientId: 'D_AKI', orderId: '103703001', isNew: true, priority: 'Routine', timePending: '1h 15m', drugName: 'sodium chloride 0.9% infusion', orderLine: '150 mL/hr, IV, Continuous (SCr improving from 3.2 to 2.4)', alerts: [], clinical: { dose: '150 mL/hr', route: 'IV', freq: 'Continuous', duration: '', rate: '150 mL/hr', volume: '1000 mL', priority: 'Routine', start: '04/09/2026 0600', stop: '' }, schedule: [{ date: '04/09', times: ['0600-cont'] }], dispense: { from: 'SGA 5 NORTH', firstDose: 'Floor Stock', code: 'Floor Stock', triggered: false }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/09/2026 0700', product: { name: 'NaCl 0.9% 1000ML BAG', pkg: '1000 mL Bag' },
    teaching: { correctAction: 'message', detailedFeedback: {
      verify: { grade: 'acceptable', message: '150 mL/hr is not dangerous, but renal function is improving (SCr 3.2\u21922.4) suggesting adequate resuscitation. Continued aggressive IVF in a patient with mild CHF history risks fluid overload. Reassessment of rate based on volume status would be prudent.' },
      reject: { grade: 'incorrect', message: 'IV fluids are not contraindicated \u2014 the question is rate optimization, not whether to give fluids.' },
      message: { grade: 'optimal', message: 'Excellent clinical judgment. With SCr improving (3.2\u21922.4) and the patient having mild CHF, messaging the prescriber to consider rate reduction (e.g., 75-100 mL/hr) or transition to maintenance fluids is appropriate. Demonstrates balanced attention to both renal recovery and fluid overload risk.' }
    }, explanation: 'With SCr improving, consider fluid rate reduction to prevent volume overload in this CHF patient.', guideline: GL }
  },
  { id: 'AKI_H2', patientId: 'D_AKI', orderId: '103703002', isNew: true, priority: 'Routine', timePending: '50m', drugName: 'acetaminophen 650 MG tablet', orderLine: '650 mg, Oral, Q6H PRN pain', alerts: [], clinical: { dose: '650 mg', route: 'Oral', freq: 'Q6H PRN', duration: '', rate: '', volume: '', priority: 'Routine', start: '04/08/2026 1000', stop: '' }, schedule: [{ date: '04/08', times: ['PRN'] }], dispense: { from: 'SGA 5 NORTH', firstDose: 'SGA 5 NORTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/08/2026 0810', product: { name: 'ACETAMINOPHEN 325 MG TABS', pkg: '100ct Bottle' },
    teaching: { correctAction: 'verify', detailedFeedback: {
      verify: { grade: 'optimal', message: 'Correct. Acetaminophen is the preferred analgesic in AKI. It has no significant renal toxicity (unlike NSAIDs), no direct effect on renal hemodynamics, and is appropriate for osteoarthritis pain. Max 3-4g/day in normal liver function. This order replaces the discontinued NSAID appropriately.' },
      reject: { grade: 'incorrect', message: 'Acetaminophen is safe in AKI and is the preferred analgesic. There is no reason to reject.' },
      message: { grade: 'acceptable', message: 'Acetaminophen is already the preferred choice. Messaging is unnecessary \u2014 the order is optimal.' }
    }, explanation: 'Acetaminophen is the preferred analgesic in AKI \u2014 no renal toxicity, replaces the discontinued NSAID.', guideline: GL }
  },
  { id: 'AKI_H3', patientId: 'D_AKI', orderId: '103703003', isNew: true, priority: 'Routine', timePending: '30m', drugName: 'restart lisinopril 10 MG tablet', orderLine: '10 mg, Oral, Daily (SCr now 1.5, near baseline)', alerts: [], clinical: { dose: '10 mg', route: 'Oral', freq: 'Daily', duration: '', rate: '', volume: '', priority: 'Routine', start: '04/10/2026 0900', stop: '' }, schedule: [{ date: '04/10', times: ['0900'] }], dispense: { from: 'SGA 5 NORTH', firstDose: 'SGA 5 NORTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Patel, Anita, MD', orderedDt: '04/10/2026 0730', product: { name: 'LISINOPRIL 10 MG TABS', pkg: '100ct Bottle' },
    teaching: { correctAction: 'message', detailedFeedback: {
      verify: { grade: 'acceptable', message: 'SCr at 1.5 is close to baseline (1.3) and restarting at a lower dose (10 mg vs home 20 mg) is reasonable. However, some clinicians wait until SCr is fully at baseline for 24-48 hours before restarting. The nuance is whether to restart now or wait.' },
      reject: { grade: 'incorrect', message: 'Lisinopril is appropriate long-term therapy for this patient with HTN and CHF. The question is timing, not whether to restart.' },
      message: { grade: 'optimal', message: 'Great clinical thinking. The restart decision is a judgment call: baseline SCr is 1.3, current is 1.5. Starting at a lower dose (10 mg vs 20 mg home dose) is prudent. Messaging to confirm the timing plan and monitoring strategy (BMP in 48-72h after restart) demonstrates thoughtful care transitions.' }
    }, explanation: 'ACE restart timing after AKI is nuanced. Lower dose and close monitoring are appropriate. Messaging to discuss timing is optimal.', guideline: GL }
  }
];
