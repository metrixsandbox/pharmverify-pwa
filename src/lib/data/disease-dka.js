export const DKA_PATIENT = {
  D_DKA: {
    name: 'CHEN, SARAH L', mrn: '00634218', dob: '07/22/1997', age: '28F', weight: '62 kg', height: '165 cm',
    allergies: ['NKDA'], room: 'ICU-12B', admitDate: '04/07/2026', attending: 'Martinez, Elena, MD',
    dx: 'Diabetic ketoacidosis (E13.10)', code: 'Full',
    hp: {
      cc: 'Nausea, vomiting, abdominal pain, confusion x 12 hours',
      hpi: '28 y/o F with T1DM on insulin pump presents with 12-hour history of nausea, vomiting, diffuse abdominal pain, and progressive confusion. Insulin pump malfunctioned 2 days ago; attempted correction with pen insulin but ran out of supplies yesterday. Reports polyuria, polydipsia, and ~6 lb weight loss over 2 days. BG at home >500.',
      pmh: ['T1DM (dx age 12, on insulin pump)', 'Depression (sertraline)', 'Migraine'],
      meds: ['Insulin lispro pump (basal 0.8 u/hr, bolus per carbs)', 'Sertraline 100 mg PO daily', 'Sumatriptan 50 mg PO PRN'],
      exam: { vitals: 'T 97.8 | HR 118 | BP 98/62 | RR 28 (Kussmaul) | SpO2 99% RA', cv: 'Tachycardic, regular, no m/r/g', pulm: 'Clear, deep rapid respirations (Kussmaul)', ext: 'Dry mucous membranes, poor skin turgor, no edema', neuro: 'Drowsy but arousable, A&O x3 (confused to date)' },
      assessment: 'Severe DKA (pH 7.18, AG 24, glucose 485) secondary to insulin pump malfunction. Moderate dehydration. Hypokalemia expected with insulin therapy despite initial K 5.6.',
      plan: ['IV insulin drip 0.14 u/kg/hr (no bolus)', 'NS 1L bolus then 250 mL/hr', 'K replacement when K < 5.3 (20 mEq/L in IVF)', 'BMP Q2H, POC glucose Q1H', 'Add D5 to IVF when glucose < 250', 'NPO until ketoacidosis resolving', 'Transition to SQ insulin when AG closes, tolerating PO']
    },
    labs: {
      '04/07 0600': { Na: ['131', 'L'], K: ['5.6', 'H'], Cl: '95', CO2: ['10', 'L'], BUN: ['28', 'H'], SCr: ['1.4', 'H'], Glucose: ['485', 'H'], AG: ['26', 'H'], Ca: ['8.8', 'L'], Phos: '3.2', Mg: '1.8', WBC: ['14.2', 'H'], Hgb: '13.8', Plt: '265', 'Beta-HB': ['5.8', 'H'], Lactate: '1.6' },
      '04/07 0610': { pH: ['7.18', 'L'], pCO2: ['22', 'L'], pO2: '105', HCO3: ['8', 'L'], SaO2: '99' }
    },
    notes: [
      { dt: '04/07 0700', author: 'Martinez, Elena, MD', type: 'Progress Note', text: 'S: Nausea, vomiting, abdominal pain, confusion. Insulin pump malfunction x 2 days.\nO: Kussmaul respirations, tachycardic, dehydrated. pH 7.18, AG 26, glucose 485, beta-HB 5.8. K 5.6 (total body depleted).\nA/P: Severe DKA from pump failure. IV insulin drip, aggressive IVF, K replacement when K < 5.3, BMP Q2H.' }
    ],
    inpatientMeds: [
      { drug: 'NS', dose: '250 mL/hr', route: 'IV', freq: 'Continuous', sched: ['Cont'], status: 'Active' },
      { drug: 'Sertraline', dose: '100 mg', route: 'PO', freq: 'Daily', sched: ['0900'], status: 'Hold (NPO)' }
    ],
    homeMeds: [
      { drug: 'Insulin lispro (pump)', freq: 'Continuous + bolus', status: 'NOT FUNCTIONING' },
      { drug: 'Sertraline 100mg', freq: 'Daily', status: 'Active' },
      { drug: 'Sumatriptan 50mg', freq: 'PRN', status: 'Active' }
    ],
    imaging: [
      { type: 'CXR (Portable AP)', date: '04/07/2026 0615', orderedBy: 'Martinez, Elena, MD', readBy: 'Torres, Maria, MD (Radiology)', indication: 'Tachycardia, Kussmaul respirations, r/o infection', findings: 'Heart: Normal size.\nLungs: Clear bilaterally. No consolidation, effusion, or pneumothorax.\nMediastinum: Unremarkable.', impression: 'No acute cardiopulmonary disease.' }
    ],
    cardio: {
      ekg: { date: '04/07/2026 0620', readBy: 'Wilson, James, MD (Cardiology)', rhythm: 'Sinus tachycardia', intervals: [
        { name: 'Heart Rate', value: '118 bpm', normal: '60-100 bpm', flag: 'H' },
        { name: 'PR Interval', value: '142 ms', normal: '120-200 ms', flag: '' },
        { name: 'QRS Duration', value: '90 ms', normal: '80-120 ms', flag: '' },
        { name: 'QT Interval', value: '320 ms', normal: '350-440 ms', flag: '' },
        { name: 'QTc (Bazett)', value: '448 ms', normal: '\u2264450 ms (F)', flag: '' },
        { name: 'P-Wave', value: 'Normal', normal: 'Upright in I, II, aVF', flag: '' },
        { name: 'Axis', value: 'Normal (+65\u00B0)', normal: '-30\u00B0 to +90\u00B0', flag: '' },
        { name: 'ST Segment', value: 'No acute changes', normal: 'Isoelectric', flag: '' },
        { name: 'T-Wave', value: 'Peaked T-waves V2-V4, II, III', normal: 'Upright in most leads', flag: 'H' }
      ], interpretation: 'Sinus tachycardia at 118 bpm. Peaked T-waves consistent with hyperkalemia (K 5.6). No acute ischemic changes.' }
    }
  }
};

const GL = { name: 'ADA Standards of Care \u2014 DKA Management', url: 'https://diabetesjournals.org/care/article/47/Supplement_1/S231/153955' };

export const DKA_EASY = [
  { id: 'DKA_E1', patientId: 'D_DKA', orderId: '103601001', isNew: true, priority: 'Stat', timePending: '25m', drugName: 'insulin glargine 20 UNITS injection', orderLine: '20 units, SQ, Once', alerts: [], clinical: { dose: '20 units', route: 'Subcutaneous', freq: 'Once', duration: '', rate: '', volume: '', priority: 'Stat', start: '04/07/2026 0700', stop: '' }, schedule: [{ date: '04/07', times: ['0700'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'ICU Pharmacy', code: 'Unit Dose', triggered: true }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0645', product: { name: 'INSULIN GLARGINE 100U/ML PEN', pkg: '3 mL Pen' },
    teaching: { correctAction: 'reject', explanation: 'Subcutaneous long-acting insulin is NOT appropriate for acute DKA management. DKA requires continuous IV regular insulin infusion for predictable, titratable effect. SQ insulin has unpredictable absorption in dehydrated patients and cannot be titrated rapidly enough. IV insulin drip is the ADA standard of care for DKA.',
      rejectReasons: [
        { id: 'r1', text: 'DKA requires IV insulin drip, not subcutaneous insulin', correct: true },
        { id: 'r2', text: 'SQ absorption is unpredictable in dehydration', correct: true },
        { id: 'r3', text: 'Long-acting insulin cannot be titrated for DKA management', correct: true },
        { id: 'r4', text: 'Dose is too high for this patient', correct: false },
        { id: 'r5', text: 'Glargine is contraindicated in type 1 diabetes', correct: false }
      ], guideline: GL,
      decisionTree: {
        title: 'Clinical Reasoning: Insulin Route in DKA',
        steps: [
          { q: 'What type of insulin is ordered?', a: 'Long-acting SQ insulin (glargine)', icon: 'warn' },
          { q: 'What does DKA management require?', a: 'Precise, titratable glucose control with IV regular insulin drip', icon: 'check' },
          { q: 'Is SQ absorption reliable here?', a: 'No — dehydration and poor perfusion make SQ absorption erratic', icon: 'x' },
          { q: 'Can glargine be titrated fast enough?', a: 'No — long-acting profile cannot be adjusted for rapidly changing needs', icon: 'x' }
        ],
        conclusion: 'REJECT. IV regular insulin drip is the ADA standard for acute DKA. SQ long-acting insulin is reserved for transition after anion gap closure.'
      } }
  },
  { id: 'DKA_E2', patientId: 'D_DKA', orderId: '103601002', isNew: true, priority: 'Stat', timePending: '20m', drugName: 'potassium chloride 40 MEQ IVPB', orderLine: '40 mEq, IVPB, Over 1 hour', alerts: [], clinical: { dose: '40 mEq', route: 'IVPB', freq: 'Once', duration: '1 hour', rate: '40 mEq/hr', volume: '100 mL', priority: 'Stat', start: '04/07/2026 0700', stop: '' }, schedule: [{ date: '04/07', times: ['0700'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'ICU Pharmacy', code: 'Unit Dose', triggered: true }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0650', product: { name: 'KCL 40MEQ/100ML IVPB', pkg: '100 mL Premix' },
    teaching: { correctAction: 'reject', explanation: 'Patient\'s K+ is 5.6 (hyperkalemic). Giving 40 mEq KCl now could cause fatal cardiac arrhythmias. Although total body potassium is depleted in DKA, the serum K+ must fall below 5.3 before replacement begins per ADA guidelines. K+ will drop rapidly once insulin is started. Additionally, 40 mEq/hr peripherally exceeds safe infusion rates (max 10-20 mEq/hr peripherally).',
      rejectReasons: [
        { id: 'r1', text: 'K+ is 5.6 \u2014 potassium replacement contraindicated until K < 5.3', correct: true },
        { id: 'r2', text: '40 mEq/hr exceeds maximum safe peripheral infusion rate', correct: true },
        { id: 'r3', text: 'Risk of fatal cardiac arrhythmias with KCl in hyperkalemia', correct: true },
        { id: 'r4', text: 'KCl is never used in DKA', correct: false },
        { id: 'r5', text: 'IV potassium requires central line access', correct: false }
      ], guideline: GL }
  },
  { id: 'DKA_E3', patientId: 'D_DKA', orderId: '103601003', isNew: true, priority: 'Stat', timePending: '15m', drugName: 'sodium bicarbonate 8.4% 50 MEQ IV push', orderLine: '50 mEq, IV Push, Once', alerts: [], clinical: { dose: '50 mEq', route: 'IV Push', freq: 'Once', duration: '', rate: '', volume: '50 mL', priority: 'Stat', start: '04/07/2026 0700', stop: '' }, schedule: [{ date: '04/07', times: ['0700'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'ICU Pharmacy', code: 'Unit Dose', triggered: true }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0655', product: { name: 'SODIUM BICARBONATE 8.4% 50ML SYRINGE', pkg: '50 mL Syringe' },
    teaching: { correctAction: 'reject', explanation: 'Sodium bicarbonate is NOT recommended for DKA when pH > 6.9 per ADA guidelines. This patient\'s pH is 7.18. Bicarbonate can worsen hypokalemia (shifts K intracellularly), cause paradoxical CNS acidosis, and delay ketone clearance. It is only considered when pH < 6.9 with hemodynamic instability.',
      rejectReasons: [
        { id: 'r1', text: 'ADA guidelines: bicarbonate not recommended when pH > 6.9 (patient pH 7.18)', correct: true },
        { id: 'r2', text: 'Bicarbonate worsens hypokalemia by shifting K+ intracellularly', correct: true },
        { id: 'r3', text: 'Can cause paradoxical CNS acidosis', correct: true },
        { id: 'r4', text: 'Bicarbonate is never used in any DKA', correct: false },
        { id: 'r5', text: 'Patient is allergic to bicarbonate', correct: false }
      ], guideline: GL }
  }
];

export const DKA_MEDIUM = [
  { id: 'DKA_M1', patientId: 'D_DKA', orderId: '103602001', isNew: true, priority: 'Stat', timePending: '30m', drugName: 'insulin regular IV infusion', orderLine: '0.14 units/kg/hr (8.7 units/hr), IV, Continuous', alerts: [], clinical: { dose: '0.14 units/kg/hr', route: 'IV Continuous', freq: 'Continuous', duration: '', rate: '8.7 units/hr', volume: '', priority: 'Stat', start: '04/07/2026 0700', stop: '' }, schedule: [{ date: '04/07', times: ['0700-cont'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'ICU Pharmacy', code: 'Unit Dose', triggered: true }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0645', product: { name: 'REGULAR INSULIN 100U/100ML NS', pkg: '100 mL Bag' },
    teaching: { correctAction: 'verify', explanation: 'IV regular insulin at 0.14 units/kg/hr (without bolus) is an ADA-recommended regimen for DKA. The alternative is 0.1 units/kg/hr with a 0.1 units/kg IV bolus. Both approaches are acceptable. Continuous IV infusion allows precise titration, which is essential in DKA management.', guideline: GL }
  },
  { id: 'DKA_M2', patientId: 'D_DKA', orderId: '103602002', isNew: true, priority: 'Stat', timePending: '28m', drugName: 'sodium chloride 0.9% 1000 ML IV', orderLine: '1000 mL bolus, then 250 mL/hr', alerts: [], clinical: { dose: '1000 mL bolus then 250 mL/hr', route: 'IV', freq: 'Continuous', duration: '', rate: '250 mL/hr (after bolus)', volume: '1000 mL', priority: 'Stat', start: '04/07/2026 0700', stop: '' }, schedule: [{ date: '04/07', times: ['0700-cont'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'Floor Stock', code: 'Floor Stock', triggered: false }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0648', product: { name: 'NaCl 0.9% 1000ML BAG', pkg: '1000 mL Bag' },
    teaching: { correctAction: 'verify', explanation: 'Aggressive IV fluid resuscitation is critical in DKA. ADA recommends NS 15-20 mL/kg/hr (or 1-1.5L) in the first hour, then 250-500 mL/hr adjusted for hydration status. This order follows ADA protocol. Volume resuscitation improves insulin sensitivity and renal glucose clearance.', guideline: GL,
      decisionTree: {
        title: 'Clinical Reasoning: Fluid Resuscitation in DKA',
        steps: [
          { q: 'Is the patient volume depleted?', a: 'Yes — dry mucous membranes, poor skin turgor, HR 118, BP 98/62', icon: 'check' },
          { q: 'What does ADA recommend initially?', a: '15–20 mL/kg (or 1–1.5 L) of isotonic crystalloid in the first hour', icon: 'check' },
          { q: 'Is this order within that range?', a: 'Yes — 1 L bolus then 250 mL/hr maintenance', icon: 'check' },
          { q: 'Any contraindication in this patient?', a: 'No — no overt CHF or significant cardiac comorbidity', icon: 'check' }
        ],
        conclusion: 'VERIFY. Order aligns with ADA DKA protocol. Monitor for volume overload and transition to D5-½NS when glucose < 250.'
      } }
  },
  { id: 'DKA_M3', patientId: 'D_DKA', orderId: '103602003', isNew: true, priority: 'Routine', timePending: '1h 15m', drugName: 'potassium chloride 20 MEQ in NS 1000 ML', orderLine: '20 mEq/L, IV, When K < 5.3', alerts: [], clinical: { dose: '20 mEq/L', route: 'IV (in maintenance IVF)', freq: 'Continuous', duration: '', rate: 'Per IVF rate', volume: '1000 mL', priority: 'Routine', start: '04/07/2026 (when K < 5.3)', stop: '' }, schedule: [{ date: '04/07', times: ['Per protocol'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'ICU Pharmacy', code: 'Unit Dose', triggered: false }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0650', product: { name: 'KCL 20MEQ/1000ML NS', pkg: '1000 mL Premix' },
    teaching: { correctAction: 'verify', explanation: 'Potassium replacement in DKA maintenance fluids is essential. Despite initial hyperkalemia (K 5.6), total body K is depleted. Insulin drives K intracellularly, causing rapid drops. ADA recommends adding 20-40 mEq KCl per liter of IVF when K falls below 5.3. Starting at 20 mEq/L is appropriate and safe.', guideline: GL }
  },
  { id: 'DKA_M4', patientId: 'D_DKA', orderId: '103602004', isNew: true, priority: 'Routine', timePending: '1h 00m', drugName: 'metFORMIN 1000 MG tablet', orderLine: '1000 mg, Oral, BID', alerts: [], clinical: { dose: '1000 mg', route: 'Oral', freq: 'BID', duration: '', rate: '', volume: '', priority: 'Routine', start: '04/07/2026 0900', stop: '' }, schedule: [{ date: '04/07', times: ['0900', '2100'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'ICU Pharmacy', code: 'Unit Dose', triggered: true }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0700', product: { name: 'METFORMIN HCL 1000 MG TABS', pkg: '100ct Bottle' },
    teaching: { correctAction: 'reject', explanation: 'Multiple problems: (1) Patient has Type 1 DM \u2014 metformin is not first-line for T1DM. (2) Metformin is contraindicated in DKA due to lactic acidosis risk. (3) SCr is elevated at 1.4 with volume depletion. (4) Patient is NPO. This order should be rejected on multiple grounds.',
      rejectReasons: [
        { id: 'r1', text: 'Metformin contraindicated in DKA \u2014 lactic acidosis risk', correct: true },
        { id: 'r2', text: 'Patient is T1DM \u2014 metformin not appropriate as primary therapy', correct: true },
        { id: 'r3', text: 'Patient is NPO \u2014 cannot take oral medications', correct: true },
        { id: 'r4', text: 'Metformin causes hypoglycemia', correct: false },
        { id: 'r5', text: 'Metformin interacts with insulin', correct: false }
      ], guideline: GL }
  }
];

export const DKA_HARD = [
  { id: 'DKA_H1', patientId: 'D_DKA', orderId: '103603001', isNew: true, priority: 'Stat', timePending: '25m', drugName: 'insulin regular IV infusion', orderLine: '0.1 units/kg/hr (6.2 units/hr), no bolus, IV, Continuous', alerts: [], clinical: { dose: '0.1 units/kg/hr', route: 'IV Continuous', freq: 'Continuous', duration: '', rate: '6.2 units/hr', volume: '', priority: 'Stat', start: '04/07/2026 0700', stop: '' }, schedule: [{ date: '04/07', times: ['0700-cont'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'ICU Pharmacy', code: 'Unit Dose', triggered: true }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0645', product: { name: 'REGULAR INSULIN 100U/100ML NS', pkg: '100 mL Bag' },
    teaching: { correctAction: 'verify', detailedFeedback: {
      verify: { grade: 'optimal', message: 'Correct. Both 0.1 units/kg/hr (no bolus) and 0.14 units/kg/hr are ADA-accepted regimens. The no-bolus approach at 0.1 u/kg/hr is supported by evidence showing equivalent outcomes with potentially fewer hypoglycemic events. If glucose doesn\'t drop by 50-70 mg/dL in the first hour, the rate should be doubled.' },
      reject: { grade: 'incorrect', message: 'This is an ADA-accepted insulin drip regimen for DKA. There is no reason to reject.' },
      message: { grade: 'acceptable', message: 'Confirming the protocol is reasonable but both 0.1 and 0.14 u/kg/hr are accepted by ADA. The order is already appropriate.' }
    }, explanation: 'Both 0.1 u/kg/hr (no bolus) and 0.14 u/kg/hr are ADA-accepted DKA insulin regimens.', guideline: GL }
  },
  { id: 'DKA_H2', patientId: 'D_DKA', orderId: '103603002', isNew: true, priority: 'Routine', timePending: '1h 30m', drugName: 'dextrose 5%-sodium chloride 0.45% infusion', orderLine: 'D5-1/2NS at 150 mL/hr (when glucose < 250)', alerts: [], clinical: { dose: '150 mL/hr', route: 'IV', freq: 'Continuous', duration: '', rate: '150 mL/hr', volume: '1000 mL', priority: 'Routine', start: '04/07/2026 (when glucose < 250)', stop: '' }, schedule: [{ date: '04/07', times: ['Per protocol'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'Floor Stock', code: 'Floor Stock', triggered: false }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0700', product: { name: 'D5-0.45% NaCl 1000ML', pkg: '1000 mL Bag' },
    teaching: { correctAction: 'verify', detailedFeedback: {
      verify: { grade: 'optimal', message: 'Correct. Adding dextrose to IVF when glucose approaches 200-250 mg/dL is a critical step in DKA management. This prevents hypoglycemia while allowing the insulin drip to continue until the anion gap closes. The switch to half-normal saline is also appropriate as the patient\'s sodium will rise as glucose falls. 150 mL/hr is a reasonable rate.' },
      reject: { grade: 'incorrect', message: 'Dextrose-containing fluids are essential when glucose drops below 250 in DKA. The insulin drip must continue to close the anion gap \u2014 dextrose prevents hypoglycemia during this process.' },
      message: { grade: 'acceptable', message: 'The protocol is standard DKA management. Messaging about the exact glucose threshold (200 vs 250) is reasonable but both are commonly used triggers.' }
    }, explanation: 'D5-1/2NS when glucose < 250 is standard DKA protocol. Prevents hypoglycemia while insulin continues to close the AG.', guideline: GL }
  },
  { id: 'DKA_H3', patientId: 'D_DKA', orderId: '103603003', isNew: true, priority: 'Routine', timePending: '1h 00m', drugName: 'potassium phosphate 15 MMOL IVPB', orderLine: '15 mmol, IVPB, Over 4 hours', alerts: [], clinical: { dose: '15 mmol', route: 'IVPB', freq: 'Once', duration: '4 hours', rate: '', volume: '250 mL NS', priority: 'Routine', start: '04/07/2026 1000', stop: '' }, schedule: [{ date: '04/07', times: ['1000'] }], dispense: { from: 'ICU Pharmacy', firstDose: 'ICU Pharmacy', code: 'Unit Dose', triggered: true }, orderedBy: 'Martinez, Elena, MD', orderedDt: '04/07/2026 0710', product: { name: 'K-PHOS 15MMOL/250ML NS IVPB', pkg: '250 mL Premix' },
    teaching: { correctAction: 'message', detailedFeedback: {
      verify: { grade: 'acceptable', message: 'Phosphate replacement is not harmful and some clinicians replace routinely. However, ADA guidelines state that routine phosphate replacement has not shown clinical benefit in DKA. The patient\'s phosphate is 3.2 (normal range 2.5-4.5). Replacement is generally reserved for phosphate < 1.0 mg/dL.' },
      reject: { grade: 'incorrect', message: 'Phosphate replacement is not contraindicated \u2014 the clinical question is whether it\'s necessary, not whether it\'s dangerous.' },
      message: { grade: 'optimal', message: 'Excellent clinical judgment. The patient\'s phosphate is 3.2 (normal). ADA guidelines do not recommend routine phosphate replacement in DKA unless < 1.0 mg/dL. Messaging the prescriber to confirm clinical rationale and suggest monitoring without replacement demonstrates evidence-based practice.' }
    }, explanation: 'Phosphate 3.2 is normal. ADA does not recommend routine phosphate replacement in DKA unless < 1.0. Message to clarify rationale.', guideline: GL }
  }
];
