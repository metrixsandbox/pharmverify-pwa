export const COPD_PATIENT = {
  D_COPD: {
    name: 'HARRIS, GERALD W', mrn: '00523891', dob: '09/18/1958', age: '67M', weight: '82 kg', height: '175 cm',
    allergies: ['NKDA'], room: '3S-314A', admitDate: '04/06/2026', attending: 'Nguyen, David, MD',
    dx: 'Acute COPD exacerbation (J44.1)', code: 'Full',
    hp: {
      cc: 'Worsening dyspnea, increased sputum production x 3 days',
      hpi: '67 y/o M with moderate-severe COPD (FEV1 42% predicted) presents with 3-day history of worsening dyspnea, increased purulent sputum, and wheezing. Using rescue inhaler every 2 hours with minimal relief. Former 1.5 PPD x 35yr smoker, quit 5 years ago. Last exacerbation 4 months ago treated with prednisone burst and azithromycin outpatient.',
      pmh: ['COPD (GOLD Stage III, FEV1 42%)', 'HTN', 'T2DM (A1c 7.2)', 'Osteoporosis', 'Former smoker (52.5 pack-years)'],
      meds: ['Tiotropium 18 mcg INH daily', 'Fluticasone/salmeterol 250/50 INH BID', 'Albuterol MDI 2 puffs Q4H PRN', 'Lisinopril 20 mg PO daily', 'Metformin 500 mg PO BID', 'Alendronate 70 mg PO weekly', 'Calcium/Vit D 600/400 PO BID'],
      exam: { vitals: 'T 99.8 | HR 102 | BP 148/82 | RR 26 | SpO2 88% RA', cv: 'Tachycardic, regular, no m/r/g', pulm: 'Diffuse expiratory wheezing bilaterally, prolonged expiratory phase, decreased air entry at bases, accessory muscle use', ext: 'No edema, no cyanosis', neuro: 'A&O x4, anxious' },
      assessment: 'Acute exacerbation of COPD with increased purulent sputum suggesting infectious trigger. Moderate severity — hypoxic but no hypercapnic respiratory failure yet.',
      plan: ['Systemic corticosteroids: prednisone 40 mg PO daily x 5 days', 'Antibiotics: azithromycin 500 mg PO daily x 3 days (purulent sputum)', 'Nebulized ipratropium-albuterol Q4H + PRN', 'Supplemental O2 titrate to SpO2 88-92%', 'Continue home tiotropium', 'Hold ICS/LABA during acute phase, resume at discharge', 'ABG if worsening, monitor for hypercapnic failure']
    },
    labs: {
      '04/06 0600': { Na: '139', K: '4.0', Cl: '101', CO2: '30', BUN: '18', SCr: '1.0', Glucose: ['168', 'H'], WBC: ['12.4', 'H'], Hgb: '14.8', Plt: '245', Procalcitonin: '0.18' },
      '04/06 0615': { pH: '7.38', pCO2: ['48', 'H'], pO2: ['58', 'L'], HCO3: '28', SaO2: ['88', 'L'] }
    },
    notes: [
      { dt: '04/06 0730', author: 'Nguyen, David, MD', type: 'Progress Note', text: 'S: Worsening dyspnea x 3 days, increased purulent sputum, wheezing. Using rescue inhaler Q2H.\nO: SpO2 88% RA, diffuse wheezing, accessory muscle use. ABG: compensated respiratory acidosis. WBC 12.4, procal 0.18.\nA/P: Moderate AECOPD with probable infectious trigger. Prednisone 40mg x5d, azithromycin x3d, nebs Q4H, O2 to 88-92%.' }
    ],
    inpatientMeds: [
      { drug: 'Tiotropium', dose: '18 mcg', route: 'INH', freq: 'Daily', sched: ['0900'], status: 'Active' },
      { drug: 'Albuterol-Ipratropium neb', dose: '2.5/0.5 mg', route: 'INH', freq: 'Q4H', sched: ['0600', '1000', '1400', '1800', '2200'], status: 'Active' },
      { drug: 'Lisinopril', dose: '20 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Active' },
      { drug: 'O2 via NC', dose: '2-4 L/min', route: 'INH', freq: 'Continuous', sched: ['Cont'], status: 'Active' }
    ],
    homeMeds: [
      { drug: 'Tiotropium 18mcg', freq: 'Daily', status: 'Active' },
      { drug: 'Fluticasone/salmeterol 250/50', freq: 'BID', status: 'Active' },
      { drug: 'Albuterol MDI', freq: 'PRN', status: 'Active' },
      { drug: 'Lisinopril 20mg', freq: 'Daily', status: 'Active' },
      { drug: 'Metformin 500mg', freq: 'BID', status: 'Active' },
      { drug: 'Alendronate 70mg', freq: 'Weekly', status: 'Active' },
      { drug: 'Calcium/Vit D 600/400', freq: 'BID', status: 'Active' }
    ],
    imaging: [
      { type: 'CXR (PA & Lateral)', date: '04/06/2026 0630', orderedBy: 'Nguyen, David, MD', readBy: 'Park, David, MD (Radiology)', indication: 'AECOPD, r/o pneumonia', findings: 'Heart: Normal size.\nLungs: Hyperinflation with flattened diaphragms. No focal consolidation. No pleural effusion. Increased bronchovascular markings bilaterally.\nMediastinum: No widening.\nBones: Mild thoracic kyphosis, osteopenic changes.', impression: 'Hyperinflated lungs consistent with COPD. No pneumonia or effusion.' }
    ],
    cardio: {
      ekg: { date: '04/06/2026 0620', readBy: 'Wilson, James, MD (Cardiology)', rhythm: 'Sinus tachycardia', intervals: [
        { name: 'Heart Rate', value: '102 bpm', normal: '60-100 bpm', flag: 'H' },
        { name: 'PR Interval', value: '164 ms', normal: '120-200 ms', flag: '' },
        { name: 'QRS Duration', value: '88 ms', normal: '80-120 ms', flag: '' },
        { name: 'QT Interval', value: '348 ms', normal: '350-440 ms', flag: '' },
        { name: 'QTc (Bazett)', value: '453 ms', normal: '\u2264440 ms (M)', flag: 'H' },
        { name: 'P-Wave', value: 'Peaked P-waves in II, III (P-pulmonale)', normal: 'Upright in I, II, aVF', flag: 'H' },
        { name: 'Axis', value: 'Right axis deviation (+110\u00B0)', normal: '-30\u00B0 to +90\u00B0', flag: 'H' },
        { name: 'ST Segment', value: 'No acute ST changes', normal: 'Isoelectric', flag: '' },
        { name: 'T-Wave', value: 'Low voltage in limb leads', normal: 'Upright in most leads', flag: '' }
      ], interpretation: 'Sinus tachycardia. Right axis deviation and P-pulmonale consistent with chronic cor pulmonale from COPD. Low voltage. No acute ischemic changes.' }
    }
  }
};

const GL = { name: 'GOLD 2024 COPD Report', url: 'https://goldcopd.org/2024-gold-report/' };

export const COPD_EASY = [
  { id: 'COPD_E1', patientId: 'D_COPD', orderId: '103501001', isNew: true, priority: 'Routine', timePending: '2h 10m', drugName: 'gentamicin 350 MG IVPB', orderLine: '350 mg (5 mg/kg), IVPB, Q24H', alerts: [], clinical: { dose: '350 mg', route: 'IVPB', freq: 'Every 24 hours', duration: '60 min', rate: '', volume: '100 mL NS', priority: 'Routine', start: '04/06/2026 1400', stop: '' }, schedule: [{ date: '04/06', times: ['1400'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0800', product: { name: 'GENTAMICIN 40MG/ML INJ', pkg: '2 mL Vial' },
    teaching: { correctAction: 'reject', explanation: 'Aminoglycosides are NOT indicated for COPD exacerbations. GOLD guidelines recommend amoxicillin-clavulanate, macrolides, or tetracyclines for infectious AECOPD. Gentamicin provides unnecessary nephro/ototoxicity risk with no benefit here.',
      rejectReasons: [
        { id: 'r1', text: 'Aminoglycosides are not guideline-recommended for AECOPD', correct: true },
        { id: 'r2', text: 'Unnecessary nephrotoxicity and ototoxicity risk', correct: true },
        { id: 'r3', text: 'Patient has a gentamicin allergy', correct: false },
        { id: 'r4', text: 'Dose needs renal adjustment', correct: false }
      ], guideline: GL }
  },
  { id: 'COPD_E2', patientId: 'D_COPD', orderId: '103501002', isNew: true, priority: 'Routine', timePending: '1h 45m', drugName: 'diazepam 5 MG tablet', orderLine: '5 mg, Oral, TID', alerts: [], clinical: { dose: '5 mg', route: 'Oral', freq: '3 times daily', duration: '', rate: '', volume: '', priority: 'Routine', start: '04/06/2026 0900', stop: '' }, schedule: [{ date: '04/06', times: ['0900', '1400', '2100'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0810', product: { name: 'DIAZEPAM 5 MG TABS', pkg: '100ct Bottle' },
    teaching: { correctAction: 'reject', explanation: 'Benzodiazepines are contraindicated in COPD exacerbations due to respiratory depression risk. This patient already has borderline hypercapnia (pCO2 48) and hypoxia (SpO2 88%). Benzodiazepines can precipitate acute hypercapnic respiratory failure. GOLD guidelines explicitly advise avoiding benzodiazepines in AECOPD.',
      rejectReasons: [
        { id: 'r1', text: 'Benzodiazepines cause respiratory depression \u2014 dangerous in COPD with hypercapnia', correct: true },
        { id: 'r2', text: 'Patient already borderline hypercapnic (pCO2 48) \u2014 risk of respiratory failure', correct: true },
        { id: 'r3', text: 'GOLD guidelines advise against benzodiazepines in AECOPD', correct: true },
        { id: 'r4', text: 'Drug interaction with albuterol', correct: false },
        { id: 'r5', text: 'Dose exceeds maximum daily dose', correct: false }
      ], guideline: GL }
  },
  { id: 'COPD_E3', patientId: 'D_COPD', orderId: '103501003', isNew: true, priority: 'Stat', timePending: '55m', drugName: 'theophylline 400 MG IV infusion', orderLine: '400 mg loading dose, IV, Over 30 min', alerts: [], clinical: { dose: '400 mg', route: 'IV', freq: 'Once (load)', duration: '30 min', rate: '', volume: '250 mL D5W', priority: 'Stat', start: '04/06/2026 0900', stop: '04/06/2026 0930' }, schedule: [{ date: '04/06', times: ['0900'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0815', product: { name: 'THEOPHYLLINE 400MG/250ML D5W', pkg: '250 mL Premix' },
    teaching: { correctAction: 'reject', explanation: 'IV theophylline (aminophylline) is NOT recommended by GOLD guidelines for acute COPD exacerbations. The evidence shows no benefit over standard bronchodilators, and theophylline has a narrow therapeutic index with significant toxicity risk (arrhythmias, seizures, nausea). Therapeutic drug monitoring is required but the risk-benefit is unfavorable.',
      rejectReasons: [
        { id: 'r1', text: 'GOLD guidelines do not recommend methylxanthines for acute AECOPD', correct: true },
        { id: 'r2', text: 'Narrow therapeutic index with seizure and arrhythmia risk', correct: true },
        { id: 'r3', text: 'No proven benefit over standard bronchodilators for AECOPD', correct: true },
        { id: 'r4', text: 'Patient has a theophylline allergy', correct: false },
        { id: 'r5', text: 'IV formulation is not commercially available', correct: false }
      ], guideline: GL }
  }
];

export const COPD_MEDIUM = [
  { id: 'COPD_M1', patientId: 'D_COPD', orderId: '103502001', isNew: true, priority: 'Routine', timePending: '3h 00m', drugName: 'predniSONE 40 MG tablet', orderLine: '40 mg, Oral, Daily x 5 days', alerts: [], clinical: { dose: '40 mg', route: 'Oral', freq: 'Daily', duration: '5 days', rate: '', volume: '', priority: 'Routine', start: '04/06/2026 0900', stop: '04/10/2026' }, schedule: [{ date: '04/06', times: ['0900'] }, { date: '04/07', times: ['0900'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0800', product: { name: 'PREDNISONE 20 MG TABS', pkg: '100ct Bottle' },
    teaching: { correctAction: 'verify', explanation: 'Prednisone 40 mg PO daily for 5 days is the GOLD-recommended systemic corticosteroid regimen for AECOPD. The REDUCE trial showed 5 days is non-inferior to 14 days. This is a straightforward verification.', guideline: GL }
  },
  { id: 'COPD_M2', patientId: 'D_COPD', orderId: '103502002', isNew: true, priority: 'Routine', timePending: '2h 45m', drugName: 'azithromycin 500 MG tablet', orderLine: '500 mg, Oral, Daily x 3 days', alerts: [], clinical: { dose: '500 mg', route: 'Oral', freq: 'Daily', duration: '3 days', rate: '', volume: '', priority: 'Routine', start: '04/06/2026 0900', stop: '04/08/2026' }, schedule: [{ date: '04/06', times: ['0900'] }, { date: '04/07', times: ['0900'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0805', product: { name: 'AZITHROMYCIN 250 MG TABS', pkg: '30ct Bottle' },
    teaching: { correctAction: 'verify', explanation: 'Azithromycin is a GOLD-recommended antibiotic for AECOPD with purulent sputum (Anthonisen Type I exacerbation). Short-course therapy (3-5 days) is appropriate. Procalcitonin 0.18 supports a possible bacterial trigger without confirming it.', guideline: GL }
  },
  { id: 'COPD_M3', patientId: 'D_COPD', orderId: '103502003', isNew: true, priority: 'Routine', timePending: '2h 30m', drugName: 'ipratropium-albuterol 0.5-2.5 MG nebulizer', orderLine: '1 vial, INH, Q4H + PRN', alerts: [], clinical: { dose: '0.5/2.5 mg', route: 'Nebulizer', freq: 'Q4H + PRN', duration: '15 min', rate: '', volume: '3 mL', priority: 'Routine', start: '04/06/2026 1000', stop: '' }, schedule: [{ date: '04/06', times: ['1000', '1400', '1800', '2200'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0810', product: { name: 'IPRATROPIUM-ALBUTEROL 0.5-2.5MG/3ML NEB', pkg: '30ct Box' },
    teaching: { correctAction: 'verify', explanation: 'Combination short-acting bronchodilator (SABA + SAMA) nebulization is first-line treatment for AECOPD per GOLD guidelines. Q4H scheduled with PRN availability is appropriate for moderate exacerbation.', guideline: GL }
  },
  { id: 'COPD_M4', patientId: 'D_COPD', orderId: '103502004', isNew: true, priority: 'Routine', timePending: '1h 50m', drugName: 'fluticasone-salmeterol 500-50 MCG diskus', orderLine: '1 inhalation, INH, BID', alerts: [], clinical: { dose: '500/50 mcg', route: 'INH (Diskus)', freq: 'BID', duration: '', rate: '', volume: '', priority: 'Routine', start: '04/06/2026 0900', stop: '' }, schedule: [{ date: '04/06', times: ['0900', '2100'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0815', product: { name: 'FLUTICASONE-SALMETEROL 500/50 DISKUS', pkg: '60 dose Diskus' },
    teaching: { correctAction: 'reject', explanation: 'ICS/LABA combination inhalers should NOT be initiated or restarted during an acute COPD exacerbation. The patient is on systemic steroids and nebulized bronchodilators, which provide superior acute treatment. ICS/LABA is a maintenance therapy \u2014 it should be resumed at discharge after stabilization. Additionally, the Diskus requires adequate inspiratory flow, which may be compromised during acute exacerbation.',
      rejectReasons: [
        { id: 'r1', text: 'ICS/LABA is maintenance therapy \u2014 not appropriate during acute exacerbation', correct: true },
        { id: 'r2', text: 'Patient already on systemic steroids + nebulized bronchodilators (superior acute treatment)', correct: true },
        { id: 'r3', text: 'Diskus requires adequate inspiratory flow \u2014 compromised during exacerbation', correct: true },
        { id: 'r4', text: 'Fluticasone is contraindicated with prednisone', correct: false },
        { id: 'r5', text: 'Salmeterol causes bronchospasm', correct: false }
      ], guideline: GL }
  }
];

export const COPD_HARD = [
  { id: 'COPD_H1', patientId: 'D_COPD', orderId: '103503001', isNew: true, priority: 'Routine', timePending: '2h 30m', drugName: 'methylPREDNISolone 125 MG IVPB', orderLine: '125 mg, IVPB, Q6H', alerts: [], clinical: { dose: '125 mg', route: 'IVPB', freq: 'Every 6 hours', duration: '30 min', rate: '', volume: '50 mL NS', priority: 'Routine', start: '04/06/2026 0900', stop: '' }, schedule: [{ date: '04/06', times: ['0900', '1500', '2100'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0800', product: { name: 'METHYLPREDNISOLONE 125MG/50ML IVPB', pkg: '50 mL Premix' },
    teaching: { correctAction: 'message', detailedFeedback: {
      verify: { grade: 'acceptable', message: 'IV methylprednisolone is effective for AECOPD, but 125 mg Q6H (500 mg/day) is significantly higher than the GOLD-recommended prednisone 40 mg PO daily equivalent. The REDUCE trial showed no benefit from higher doses. While not unsafe short-term, the excess dose increases hyperglycemia, insomnia, and other steroid side effects.' },
      reject: { grade: 'incorrect', message: 'The medication class is appropriate \u2014 systemic steroids are indicated. The issue is dose optimization, not a safety concern requiring rejection.' },
      message: { grade: 'optimal', message: 'Excellent clinical judgment. Messaging the prescriber to recommend dose reduction to prednisone 40 mg PO equivalent (or methylprednisolone 32 mg IV daily) per GOLD guidelines and the REDUCE trial demonstrates proactive pharmaceutical care. The current dose is ~12x higher than recommended.' }
    }, explanation: 'Methylprednisolone 125 mg Q6H is dramatically higher than GOLD-recommended prednisone 40 mg/day. Evidence shows no benefit from higher doses. Recommend dose reduction.', guideline: GL }
  },
  { id: 'COPD_H2', patientId: 'D_COPD', orderId: '103503002', isNew: true, priority: 'Routine', timePending: '2h 00m', drugName: 'doxycycline 100 MG capsule', orderLine: '100 mg, Oral, BID', alerts: [], clinical: { dose: '100 mg', route: 'Oral', freq: 'BID', duration: '5 days', rate: '', volume: '', priority: 'Routine', start: '04/06/2026 0900', stop: '04/10/2026' }, schedule: [{ date: '04/06', times: ['0900', '2100'] }], dispense: { from: 'SGA 3 SOUTH', firstDose: 'SGA 3 SOUTH', code: 'Unit Dose', triggered: true }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0810', product: { name: 'DOXYCYCLINE 100 MG CAPS', pkg: '50ct Bottle' },
    teaching: { correctAction: 'verify', detailedFeedback: {
      verify: { grade: 'optimal', message: 'Correct. Doxycycline is a GOLD-recommended antibiotic for AECOPD with purulent sputum. It provides coverage for typical respiratory pathogens (H. influenzae, M. catarrhalis, S. pneumoniae). No renal adjustment needed. Good alternative to azithromycin, especially in patients with QTc concerns.' },
      reject: { grade: 'incorrect', message: 'Doxycycline is appropriate for AECOPD. There is no safety concern requiring rejection.' },
      message: { grade: 'acceptable', message: 'Doxycycline is already a GOLD-recommended option. Messaging is not wrong but unlikely to change the plan \u2014 this is already an appropriate choice.' }
    }, explanation: 'Doxycycline is GOLD-recommended for AECOPD with purulent sputum. Appropriate coverage, no renal adjustment needed.', guideline: GL }
  },
  { id: 'COPD_H3', patientId: 'D_COPD', orderId: '103503003', isNew: true, priority: 'Routine', timePending: '1h 30m', drugName: 'supplemental O2 via nasal cannula', orderLine: 'Titrate to SpO2 88-92%, 1-4 L/min', alerts: [], clinical: { dose: '1-4 L/min', route: 'Nasal Cannula', freq: 'Continuous', duration: '', rate: '1-4 L/min', volume: '', priority: 'Routine', start: '04/06/2026 0600', stop: '' }, schedule: [{ date: '04/06', times: ['Cont'] }], dispense: { from: 'Respiratory Therapy', firstDose: 'Respiratory Therapy', code: 'Floor Stock', triggered: false }, orderedBy: 'Nguyen, David, MD', orderedDt: '04/06/2026 0600', product: { name: 'O2 NASAL CANNULA', pkg: 'Disposable' },
    teaching: { correctAction: 'verify', detailedFeedback: {
      verify: { grade: 'optimal', message: 'Correct. The target SpO2 of 88-92% is specifically recommended by GOLD for COPD patients. Higher O2 targets (>92%) can suppress hypoxic ventilatory drive and worsen hypercapnia in COPD patients who are CO2 retainers. This patient\'s ABG shows pCO2 48 (borderline hypercapnia), making the 88-92% target critically important.' },
      reject: { grade: 'incorrect', message: 'The O2 target of 88-92% is correct for COPD. A higher target would actually be dangerous in this patient.' },
      message: { grade: 'acceptable', message: 'Messaging to confirm ABG monitoring frequency with the target is reasonable but the order itself is already optimal. The 88-92% target is exactly what GOLD recommends.' }
    }, explanation: 'O2 titrated to SpO2 88-92% is the GOLD-recommended target for COPD. Higher targets risk worsening hypercapnia.', guideline: GL }
  }
];
