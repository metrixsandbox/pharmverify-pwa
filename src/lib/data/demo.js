export const DEMO_PATIENTS = {
  P001: {
    name: "DOE, JANE M", mrn: "00234891", dob: "03/15/1962", age: "64F", weight: "72 kg", height: "165 cm",
    allergies: ["Penicillin (Rash)", "Sulfa (Anaphylaxis)"], room: "4S-412A", admitDate: "04/01/2026",
    attending: "Smith, Robert J, MD", dx: "Acute decompensated HFrEF (I50.21)", code: "Full",
    hp: { cc: "Progressive dyspnea on exertion and bilateral LE edema x 5 days", hpi: "64 y/o F with PMH of HFrEF (EF 30%), HTN, T2DM, CKD III presents with worsening DOE and bilateral LE edema over 5 days. Reports 8 lb weight gain. Endorses orthopnea (3-pillow) and PND. Denies CP, palpitations, fever. Ran out of furosemide ~1 week ago.", pmh: ["HFrEF (EF 30%)", "HTN", "T2DM", "CKD Stage III (Cr baseline ~1.4)", "Hyperlipidemia", "Atrial fibrillation"], meds: ["Entresto 24-26 mg PO BID", "Carvedilol 12.5 mg PO BID", "Furosemide 40 mg PO daily (NOT TAKING)", "Apixaban 5 mg PO BID", "Metformin 1000 mg PO BID", "Atorvastatin 40 mg PO daily", "Spironolactone 25 mg PO daily", "Empagliflozin 10 mg PO daily"], exam: { vitals: "T 98.4 | HR 88 | BP 142/86 | RR 22 | SpO2 93% RA", cv: "Irregular, S3, no m/r/g", pulm: "Bilateral basilar crackles", ext: "3+ pitting edema BLE", neuro: "A&O x4" }, assessment: "ADHF exacerbation likely 2/2 furosemide non-adherence and dietary indiscretion.", plan: ["IV furosemide 40mg BID, I&O, daily weights, 1.5L fluid restrict", "Hold Entresto until euvolemic", "Continue apixaban", "Hold metformin (AKI)", "BMP daily"] },
    labs: { "04/03 0500": { Na: "138", K: "4.1", BUN: ["32","H"], SCr: ["1.6","H"], Glucose: ["142","H"], Mg: "2.0", BNP: ["1840","H"], WBC: "7.2", Hgb: ["11.8","L"], Plt: "198" }, "04/02 0500": { Na: "136", K: "4.4", BUN: ["38","H"], SCr: ["1.8","H"], Glucose: ["168","H"], BNP: ["2450","H"], WBC: "8.1", Hgb: "12.0", Plt: "205" } },
    notes: [{ dt: "04/03 0800", author: "Smith, Robert J, MD", type: "Progress Note", text: "S: Improved breathing overnight. Good UOP.\nO: Wt 74.2kg (down 2.1). I/O -1800mL. Crackles improved. LE edema 2+.\nA/P: ADHF improving. Continue furosemide 40mg IV BID." }, { dt: "04/02 1430", author: "Saunders, Luke, PharmD", type: "Pharmacy Note", text: "Renal: SCr 1.6 (baseline 1.4), CrCl ~38. Metformin held.\nAnticoag: Apixaban 5mg BID appropriate.\nDiuresis: Net -1.2L first 12h. Adequate.\nEntresto held appropriately." }],
    inpatientMeds: [{ drug: "Furosemide", dose: "40 mg", route: "IV", freq: "Q12H", sched: ["0600","1800"], status: "Active" }, { drug: "Carvedilol", dose: "12.5 mg", route: "PO", freq: "BID", sched: ["0900","2100"], status: "Active" }, { drug: "Apixaban", dose: "5 mg", route: "PO", freq: "BID", sched: ["0900","2100"], status: "Active" }, { drug: "Atorvastatin", dose: "40 mg", route: "PO", freq: "QHS", sched: ["2100"], status: "Active" }, { drug: "Spironolactone", dose: "25 mg", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" }, { drug: "Empagliflozin", dose: "10 mg", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" }, { drug: "Entresto", dose: "24-26 mg", route: "PO", freq: "BID", sched: ["0900","2100"], status: "Held" }, { drug: "KCl", dose: "20 mEq", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" }],
    homeMeds: [{ drug: "Entresto 24-26mg", freq: "BID", status: "Active" }, { drug: "Carvedilol 12.5mg", freq: "BID", status: "Active" }, { drug: "Furosemide 40mg", freq: "Daily", status: "NOT TAKING" }, { drug: "Apixaban 5mg", freq: "BID", status: "Active" }, { drug: "Metformin 1000mg", freq: "BID", status: "Active" }, { drug: "Atorvastatin 40mg", freq: "Daily", status: "Active" }, { drug: "Spironolactone 25mg", freq: "Daily", status: "Active" }, { drug: "Empagliflozin 10mg", freq: "Daily", status: "Active" }],
    imaging: [
      { type: "CXR (PA & Lateral)", date: "04/02/2026 0630", orderedBy: "Smith, Robert J, MD", readBy: "Adams, Karen, MD (Radiology)", indication: "Dyspnea, HF exacerbation", findings: "Heart: Cardiomegaly with cardiothoracic ratio 0.62.\nLungs: Bilateral interstitial and alveolar opacities, predominantly basilar. Bilateral pleural effusions, small-to-moderate (R > L). Cephalization of pulmonary vasculature. Kerley B lines noted at lung periphery.\nMediastinum: Upper lobe pulmonary venous distension. No pneumothorax.\nBones: Degenerative changes thoracic spine. No acute fracture.", impression: "Acute decompensated heart failure with bilateral pleural effusions, pulmonary edema, and cardiomegaly. No focal consolidation to suggest pneumonia." },
      { type: "Echocardiogram (TTE)", date: "04/02/2026 1100", orderedBy: "Smith, Robert J, MD", readBy: "Gupta, Raj, MD (Cardiology)", indication: "ADHF, known HFrEF", findings: "LV severely dilated with global hypokinesis. Estimated LVEF 25-30%. Grade II (pseudonormal) diastolic dysfunction. LA moderately dilated. RV mildly dilated with mildly reduced systolic function (TAPSE 14 mm). Moderate mitral regurgitation (functional). Mild tricuspid regurgitation with estimated RVSP 48 mmHg. No pericardial effusion. IVC dilated (2.4 cm) with <50% inspiratory collapse.", impression: "Severely reduced LV systolic function (EF 25-30%), consistent with known HFrEF. Moderate functional MR. Elevated right-sided pressures. Volume overloaded." }
    ],
    cardio: {
      ekg: { date: "04/02/2026 0615", readBy: "Gupta, Raj, MD (Cardiology)", rhythm: "Atrial fibrillation with controlled ventricular response", intervals: [
        { name: "Heart Rate", value: "88 bpm", normal: "60-100 bpm", flag: "" },
        { name: "PR Interval", value: "N/A (AFib)", normal: "120-200 ms", flag: "" },
        { name: "QRS Duration", value: "98 ms", normal: "80-120 ms", flag: "" },
        { name: "QT Interval", value: "412 ms", normal: "350-440 ms", flag: "" },
        { name: "QTc (Bazett)", value: "498 ms", normal: "≤450 ms (F)", flag: "H" },
        { name: "P-Wave", value: "Absent (fibrillatory baseline)", normal: "Upright in I, II, aVF", flag: "" },
        { name: "Axis", value: "Left axis deviation (-35°)", normal: "-30° to +90°", flag: "H" },
        { name: "ST Segment", value: "Diffuse ST depression (lateral leads)", normal: "Isoelectric", flag: "H" },
        { name: "T-Wave", value: "T-wave inversions V5-V6, I, aVL", normal: "Upright in most leads", flag: "H" }
      ], interpretation: "Atrial fibrillation with controlled ventricular rate. Left axis deviation. Prolonged QTc (498 ms). ST-T wave changes consistent with LVH with strain pattern and/or digitalis effect. No acute ST elevation." },
      echo: { date: "04/02/2026 1100", readBy: "Gupta, Raj, MD (Cardiology)", findings: [
        { name: "LVEF", value: "25-30% (severely reduced)" },
        { name: "LV Size", value: "Severely dilated (LVEDD 6.8 cm)" },
        { name: "Wall Motion", value: "Global hypokinesis" },
        { name: "LA Size", value: "Moderately dilated (4.6 cm)" },
        { name: "RV Function", value: "Mildly reduced (TAPSE 14 mm)" },
        { name: "Mitral Valve", value: "Moderate MR (functional)" },
        { name: "Tricuspid Valve", value: "Mild TR, RVSP 48 mmHg" },
        { name: "Diastolic Function", value: "Grade II (pseudonormal)" },
        { name: "IVC", value: "Dilated 2.4 cm, <50% collapse" },
        { name: "Pericardium", value: "No effusion" }
      ], impression: "Severely reduced LV systolic function (EF 25-30%). Moderate functional MR. Elevated right-sided pressures consistent with volume overload." }
    },
  },
  P002: {
    name: "MARTINEZ, CARLOS R", mrn: "00198432", dob: "08/22/1978", age: "47M", weight: "95 kg", height: "178 cm",
    allergies: ["NKDA"], room: "3N-308B", admitDate: "04/02/2026",
    attending: "Patel, Anita, MD", dx: "Community-acquired pneumonia (J18.9)", code: "Full",
    hp: { cc: "Fever, productive cough, pleuritic chest pain x 3 days", hpi: "47 y/o M with 3 days of fever (Tmax 103.2), productive cough with yellow-green sputum, R-sided pleuritic CP. Former 1 PPD x 20yr smoker, quit 2 yrs ago.", pmh: ["COPD (moderate)", "HTN", "GERD"], meds: ["Tiotropium 18 mcg INH daily", "Lisinopril 20 mg PO daily", "Omeprazole 20 mg PO daily", "Albuterol PRN"], exam: { vitals: "T 101.8 | HR 102 | BP 118/72 | RR 24 | SpO2 91% 2L NC", cv: "Tachycardic, regular, no m/r/g", pulm: "Diminished BS RLL, crackles RML/RLL, egophony R base", ext: "No edema", neuro: "A&O x4" }, assessment: "CAP with RLL consolidation. CURB-65 = 1.", plan: ["Ceftriaxone 1g IV daily + azithromycin 500mg IV daily", "Blood cx x2, sputum cx, Legionella/pneumococcal Ag", "O2 to SpO2 >92%", "DVT ppx: enoxaparin 40mg SQ daily"] },
    labs: { "04/03 0500": { Na: "140", K: "3.8", BUN: "18", SCr: "1.0", Glucose: "112", WBC: ["15.8","H"], Hgb: "14.2", Plt: "312", Lactate: "1.4", Procalcitonin: ["2.8","H"] }, "04/02 1200": { Na: "139", K: "3.9", SCr: "0.9", WBC: ["18.2","H"], Lactate: ["2.1","H"], Procalcitonin: ["4.1","H"] } },
    notes: [{ dt: "04/03 0730", author: "Patel, Anita, MD", type: "Progress Note", text: "S: Somewhat better. Fever broke overnight.\nO: Tmax 99.8. WBC 15.8 (down). SpO2 94% 2L.\nA/P: CAP improving day 2. Continue abx. Plan PO transition if afebrile 24h." }],
    inpatientMeds: [{ drug: "Ceftriaxone", dose: "1 g", route: "IV", freq: "Daily", sched: ["1400"], status: "Active" }, { drug: "Azithromycin", dose: "500 mg", route: "IV", freq: "Daily", sched: ["1400"], status: "Active" }, { drug: "Enoxaparin", dose: "40 mg", route: "SQ", freq: "Daily", sched: ["2100"], status: "Active" }, { drug: "Tiotropium", dose: "18 mcg", route: "INH", freq: "Daily", sched: ["0900"], status: "Active" }, { drug: "Omeprazole", dose: "20 mg", route: "PO", freq: "Daily", sched: ["0800"], status: "Active" }],
    homeMeds: [{ drug: "Tiotropium 18mcg", freq: "Daily", status: "Active" }, { drug: "Lisinopril 20mg", freq: "Daily", status: "Active" }, { drug: "Omeprazole 20mg", freq: "Daily", status: "Active" }, { drug: "Albuterol", freq: "PRN", status: "Active" }],
    imaging: [
      { type: "CXR (PA & Lateral)", date: "04/02/2026 1245", orderedBy: "Patel, Anita, MD", readBy: "Torres, Maria, MD (Radiology)", indication: "Fever, cough, hypoxia — r/o pneumonia", findings: "Heart: Normal size and configuration.\nLungs: Dense consolidation right lower lobe with air bronchograms. Patchy opacity right middle lobe. Left lung clear. No pleural effusion.\nMediastinum: No widening. No pneumothorax.\nBones: No acute osseous abnormality.", impression: "Right lower lobe consolidation with air bronchograms and right middle lobe patchy opacity, consistent with community-acquired pneumonia. No pleural effusion or pneumothorax." }
    ],
    cardio: {
      ekg: { date: "04/02/2026 1230", readBy: "Wilson, James, MD (Cardiology)", rhythm: "Sinus tachycardia", intervals: [
        { name: "Heart Rate", value: "104 bpm", normal: "60-100 bpm", flag: "H" },
        { name: "PR Interval", value: "156 ms", normal: "120-200 ms", flag: "" },
        { name: "QRS Duration", value: "86 ms", normal: "80-120 ms", flag: "" },
        { name: "QT Interval", value: "332 ms", normal: "350-440 ms", flag: "" },
        { name: "QTc (Bazett)", value: "437 ms", normal: "≤440 ms (M)", flag: "" },
        { name: "P-Wave", value: "Normal morphology, upright in II", normal: "Upright in I, II, aVF", flag: "" },
        { name: "Axis", value: "Normal (+62°)", normal: "-30° to +90°", flag: "" },
        { name: "ST Segment", value: "No ST elevation or depression", normal: "Isoelectric", flag: "" },
        { name: "T-Wave", value: "Normal morphology all leads", normal: "Upright in most leads", flag: "" }
      ], interpretation: "Sinus tachycardia at 104 bpm, likely secondary to infection/fever. Otherwise normal ECG. No ischemic changes. Normal QTc." }
    },
  },
  P003: {
    name: "JOHNSON, MARIE L", mrn: "00312567", dob: "11/03/1945", age: "80F", weight: "58 kg", height: "157 cm",
    allergies: ["Vancomycin (Red Man Syndrome)", "Codeine (Nausea)"], room: "5S-518A", admitDate: "04/02/2026",
    attending: "Chen, William, MD", dx: "Acute pyelonephritis (N10)", code: "Full",
    hp: { cc: "Fever, dysuria, flank pain x 2 days", hpi: "80 y/o F with recurrent UTIs, T2DM, CKD IV presents with 2 days of dysuria, frequency, L flank pain. Fever to 102.1. Foul-smelling urine. Last UTI 2 months ago (nitrofurantoin).", pmh: ["Recurrent UTIs", "T2DM (A1c 7.8)", "CKD Stage IV (baseline Cr 2.2)", "Osteoporosis", "HTN", "Hypothyroidism"], meds: ["Glipizide 5 mg PO BID", "Amlodipine 5 mg PO daily", "Levothyroxine 75 mcg PO daily", "Ca/Vit D 600/400 PO BID", "Alendronate 70 mg PO weekly"], exam: { vitals: "T 102.4 | HR 96 | BP 108/62 | RR 20 | SpO2 96% RA", cv: "RRR, no m/r/g", pulm: "CTAB", ext: "No edema", neuro: "A&O x4, fatigued" }, assessment: "Acute pyelonephritis in elderly CKD IV patient. Renal-dose antibiotics.", plan: ["Ceftriaxone 1g IV daily", "Blood cx x2, urine cx", "NS 75 mL/hr (monitor volume)", "Hold glipizide", "Renal consult if Cr worsens"] },
    labs: { "04/03 0500": { Na: "141", K: ["5.2","H"], BUN: ["48","H"], SCr: ["2.8","H"], Glucose: "92", WBC: ["14.1","H"], Hgb: ["10.2","L"], Plt: "188", UA: "LE+++ Nit+ WBC>100" }, "04/02 1400": { Na: "140", K: ["5.4","H"], BUN: ["52","H"], SCr: ["3.1","H"], WBC: ["16.5","H"], Hgb: ["10.0","L"], Lactate: "1.8" } },
    notes: [{ dt: "04/03 0800", author: "Chen, William, MD", type: "Progress Note", text: "S: Better, less flank pain.\nO: Tmax 100.2 (improved). SCr 2.8 (from 3.1). K 5.2.\nA/P: Pyelo improving on ceftriaxone. Monitor K." }],
    inpatientMeds: [{ drug: "Ceftriaxone", dose: "1 g", route: "IV", freq: "Daily", sched: ["1400"], status: "Active" }, { drug: "NS", dose: "75 mL/hr", route: "IV", freq: "Continuous", sched: ["Cont"], status: "Active" }, { drug: "Amlodipine", dose: "5 mg", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" }, { drug: "Levothyroxine", dose: "75 mcg", route: "PO", freq: "Daily", sched: ["0600"], status: "Active" }],
    homeMeds: [{ drug: "Glipizide 5mg", freq: "BID", status: "Active" }, { drug: "Amlodipine 5mg", freq: "Daily", status: "Active" }, { drug: "Levothyroxine 75mcg", freq: "Daily", status: "Active" }, { drug: "Ca/Vit D", freq: "BID", status: "Active" }, { drug: "Alendronate 70mg", freq: "Weekly", status: "Active" }],
    imaging: [
      { type: "CT Abdomen/Pelvis with Contrast", date: "04/02/2026 1500", orderedBy: "Chen, William, MD", readBy: "Park, David, MD (Radiology)", indication: "Fever, flank pain, elevated WBC — r/o pyelonephritis vs abscess", findings: "Kidneys: Left kidney enlarged with perinephric fat stranding and thickening of Gerota's fascia. Multifocal wedge-shaped areas of decreased enhancement in the left renal parenchyma consistent with acute pyelonephritis. No renal abscess. No hydronephrosis. Right kidney appears normal with cortical thinning bilaterally consistent with CKD.\nUreters: No hydroureter. No ureteral calculi.\nBladder: Normal distension, no wall thickening.\nOther: Small amount of free pelvic fluid. No bowel obstruction. Atherosclerotic calcification of the aorta.", impression: "1. Acute left pyelonephritis with perinephric inflammation. No abscess formation. No obstructing calculus.\n2. Bilateral renal cortical thinning consistent with chronic kidney disease." },
      { type: "CXR (Portable AP)", date: "04/02/2026 1430", orderedBy: "Chen, William, MD", readBy: "Park, David, MD (Radiology)", indication: "Sepsis workup", findings: "Heart: Mildly enlarged. No pericardial effusion.\nLungs: Clear bilaterally. No consolidation, effusion, or pneumothorax.\nMediastinum: Unremarkable.\nBones: Severe osteopenia. Compression deformity T12 (chronic).", impression: "No acute cardiopulmonary disease. Severe osteopenia with chronic T12 compression fracture." }
    ],
    cardio: {
      ekg: { date: "04/02/2026 1445", readBy: "Wilson, James, MD (Cardiology)", rhythm: "Normal sinus rhythm", intervals: [
        { name: "Heart Rate", value: "96 bpm", normal: "60-100 bpm", flag: "" },
        { name: "PR Interval", value: "178 ms", normal: "120-200 ms", flag: "" },
        { name: "QRS Duration", value: "92 ms", normal: "80-120 ms", flag: "" },
        { name: "QT Interval", value: "368 ms", normal: "350-440 ms", flag: "" },
        { name: "QTc (Bazett)", value: "465 ms", normal: "≤450 ms (F)", flag: "H" },
        { name: "P-Wave", value: "Normal morphology", normal: "Upright in I, II, aVF", flag: "" },
        { name: "Axis", value: "Normal (+48°)", normal: "-30° to +90°", flag: "" },
        { name: "ST Segment", value: "No ST changes", normal: "Isoelectric", flag: "" },
        { name: "T-Wave", value: "Peaked T-waves in V2-V4, II, III, aVF", normal: "Upright in most leads", flag: "H" }
      ], interpretation: "Normal sinus rhythm. Borderline prolonged QTc (465 ms). Peaked T-waves in precordial and inferior leads, correlate with serum potassium (K+ 5.2). No acute ischemic changes. Recommend repeat EKG if K+ corrected." }
    },
  },
  P004: {
    name: "TAYLOR, MARCUS D", mrn: "00415823", dob: "06/12/1991", age: "34M", weight: "81 kg", height: "180 cm",
    allergies: ["NKDA"], room: "2N-215B", admitDate: "04/03/2026",
    attending: "Rivera, Sofia, MD", dx: "Secondary syphilis (A51.39)", code: "Full",
    hp: { cc: "Diffuse rash, malaise, low-grade fever x 10 days", hpi: "34 y/o M presents with 10-day history of diffuse maculopapular rash involving trunk, extremities, palms, and soles. Reports malaise, low-grade fevers, myalgias, and painless oral mucosal patches. Endorses new sexual partner 6 weeks ago. Denies penile discharge or painful urination. Noted a painless genital ulcer ~4 weeks ago that resolved spontaneously.", pmh: ["No significant PMH"], meds: ["None"], exam: { vitals: "T 100.1 | HR 78 | BP 124/76 | RR 16 | SpO2 99% RA", cv: "RRR, no m/r/g", pulm: "CTAB", ext: "Diffuse maculopapular rash on trunk, extremities, palms/soles; condylomata lata perianally; painless oral mucous patches", neuro: "A&O x4, no focal deficits" }, assessment: "Secondary syphilis confirmed by RPR 1:128, reactive FTA-ABS. No neurological involvement. CDC guidelines recommend Bicillin L-A (benzathine penicillin G) 2.4 million units IM x1 dose.", plan: ["Benzathine penicillin G (Bicillin L-A) 2.4 MU IM x1 per CDC guidelines", "RPR titer follow-up at 6 and 12 months", "HIV testing, hepatitis panel", "Partner notification and treatment", "Monitor for Jarisch-Herxheimer reaction post-treatment"] },
    labs: { "04/03 0800": { RPR: ["1:128", "H"], "FTA-ABS": ["Reactive", "H"], HIV: "Non-reactive", "Hep B sAg": "Negative", "Hep C Ab": "Negative", Na: "140", K: "4.2", BUN: "14", SCr: "0.9", WBC: "9.8", Hgb: "14.6", Plt: "245", ESR: ["42", "H"], CRP: ["2.8", "H"] }, "04/03 0600": { CSF_protein: "32", CSF_glucose: "62", CSF_WBC: "2", CSF_VDRL: "Non-reactive" } },
    notes: [{ dt: "04/03 1000", author: "Rivera, Sofia, MD", type: "Progress Note", text: "S: Diffuse rash x 10 days, malaise, low-grade fever. New sexual partner 6 wks ago. History of painless genital ulcer ~4 wks ago (resolved).\nO: Diffuse maculopapular rash including palms/soles. Condylomata lata. Oral mucous patches. RPR 1:128, FTA-ABS reactive. CSF VDRL non-reactive.\nA/P: Secondary syphilis. No neurosyphilis. Treat per CDC: Bicillin L-A 2.4 MU IM x1. Monitor for Jarisch-Herxheimer. RPR titer f/u 6 & 12 mo." }, { dt: "04/03 1030", author: "Nguyen, Thi, PharmD", type: "Pharmacy Note", text: "CRITICAL SAFETY CONCERN: Order entered for Bicillin C-R (benzathine/procaine penicillin combination). This is NOT appropriate for syphilis treatment.\n\nPer CDC STI Treatment Guidelines:\n- Secondary syphilis: Bicillin L-A (benzathine penicillin G) 2.4 million units IM x1\n- Bicillin C-R contains procaine penicillin G in addition to benzathine penicillin G\n- Bicillin C-R does NOT provide adequate sustained levels for syphilis treatment\n\nISMP has identified Bicillin C-R and Bicillin L-A as frequently confused LASA products.\nRecommendation: REJECT current order. Contact prescriber to clarify and reorder as Bicillin L-A 2.4 MU IM x1." }],
    inpatientMeds: [{ drug: "NS", dose: "75 mL/hr", route: "IV", freq: "Continuous", sched: ["Cont"], status: "Active" }, { drug: "Acetaminophen", dose: "650 mg", route: "PO", freq: "Q6H PRN", sched: ["PRN"], status: "Active" }],
    homeMeds: [],
    imaging: [
      { type: "CXR (PA & Lateral)", date: "04/03/2026 0900", orderedBy: "Rivera, Sofia, MD", readBy: "Adams, Karen, MD (Radiology)", indication: "Baseline, rule out pulmonary involvement", findings: "Heart: Normal size and configuration.\nLungs: Clear bilaterally. No consolidation, effusion, or pneumothorax.\nMediastinum: Unremarkable. No lymphadenopathy.\nBones: No acute osseous abnormality.", impression: "Normal chest radiograph. No evidence of pulmonary involvement." }
    ],
    cardio: {
      ekg: { date: "04/03/2026 0845", readBy: "Wilson, James, MD (Cardiology)", rhythm: "Normal sinus rhythm", intervals: [
        { name: "Heart Rate", value: "78 bpm", normal: "60-100 bpm", flag: "" },
        { name: "PR Interval", value: "148 ms", normal: "120-200 ms", flag: "" },
        { name: "QRS Duration", value: "88 ms", normal: "80-120 ms", flag: "" },
        { name: "QT Interval", value: "376 ms", normal: "350-440 ms", flag: "" },
        { name: "QTc (Bazett)", value: "429 ms", normal: "≤440 ms (M)", flag: "" },
        { name: "P-Wave", value: "Normal morphology, upright in II", normal: "Upright in I, II, aVF", flag: "" },
        { name: "Axis", value: "Normal (+58°)", normal: "-30° to +90°", flag: "" },
        { name: "ST Segment", value: "No ST elevation or depression", normal: "Isoelectric", flag: "" },
        { name: "T-Wave", value: "Normal morphology all leads", normal: "Upright in most leads", flag: "" }
      ], interpretation: "Normal sinus rhythm. Normal intervals. No ischemic changes. Normal ECG." }
    },
  },
};

export const DEMO_ORDERS = [
  { id: "ORD001", patientId: "P001", orderId: "102635955", isNew: true, priority: "Routine", timePending: "4h 12m", drugName: "sacubitril-valsartan (ENTRESTO) 24-26 MG tablet", orderLine: "1 tablet, Oral, BID, First dose 4/2/26 0000, Until D/C", alerts: [], clinical: { dose: "1 tablet", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0000", stop: "" }, schedule: [{ date: "4/2/2026", times: ["0000","0900","2100"] }, { date: "4/3/2026", times: ["0900","2100"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Lama, Alejandro T, MD", orderedDt: "4/1/2026 2355", product: { name: "SACUBITRIL-VALSARTAN 24-26 MG TABS", pkg: "60ct Bottle (0078-0659-20)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=000dc81d-ab91-450c-8eae-8eb74e72296f&name=ENTRESTO-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Entresto is appropriately held during acute decompensation. The order to hold is correct \u2014 verifying acknowledges the hold and ensures it stays on the MAR for resumption when the patient is euvolemic. The alerts are informational, not reasons to reject.", guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" } }
  },
  { id: "ORD002", patientId: "P001", orderId: "102635980", isNew: true, priority: "Routine", timePending: "2h 45m", drugName: "furosemide 40 MG injection", orderLine: "40 mg, IV Push, Q12H, First dose 4/2/26 0600, Until D/C", alerts: [], clinical: { dose: "40 mg", route: "IV Push", freq: "Every 12 hours", duration: "2 min", rate: "", volume: "4 mL", priority: "Routine", start: "4/2/2026 0600", stop: "" }, schedule: [{ date: "4/2/2026", times: ["0600","1800"] }, { date: "4/3/2026", times: ["0600","1800"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/2/2026 0545", product: { name: "FUROSEMIDE 10 MG/ML INJ 4ML", pkg: "4 mL Vial (0409-1273-12)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=1b9117d5-0dd9-4577-a1fd-bb0aaf7e68ec&name=furosemide-cart-a.jpg" },
    teaching: { correctAction: "verify", explanation: "Furosemide is a sulfonamide diuretic but has very low cross-reactivity with sulfa antibiotics. The patient's sulfa allergy (anaphylaxis) warrants documentation and monitoring, but furosemide is safe to administer. The DTA alert is appropriate to acknowledge, not a reason to reject. Dose of 40 mg IV Q12H is appropriate for ADHF.", guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" } }
  },
  { id: "ORD003", patientId: "P002", orderId: "102636100", isNew: true, priority: "Routine", timePending: "1h 30m", drugName: "ceftriaxone 1 GM IVPB", orderLine: "1 g, IVPB, Daily, First dose 4/2/26 1400", alerts: [], clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Routine", start: "4/2/2026 1400", stop: "" }, schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }], dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: true }, orderedBy: "Patel, Anita, MD", orderedDt: "4/2/2026 1330", product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Ceftriaxone 1g IV daily is guideline-concordant empiric therapy for community-acquired pneumonia (CAP) per ATS/IDSA guidelines, used in combination with a macrolide. No renal adjustment needed. Patient has NKDA. This is a straightforward verification.", guideline: { name: "ATS/IDSA CAP Guidelines 2019", url: "https://www.atsjournals.org/doi/10.1164/rccm.201908-1581ST" } }
  },
  { id: "ORD004", patientId: "P002", orderId: "102636105", isNew: true, priority: "Routine", timePending: "1h 30m", drugName: "azithromycin 500 MG IVPB", orderLine: "500 mg, IVPB, Daily, First dose 4/2/26 1400", alerts: [], clinical: { dose: "500 mg", route: "IVPB", freq: "Daily", duration: "60 min", rate: "", volume: "250 mL NS", priority: "Routine", start: "4/2/2026 1400", stop: "" }, schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }], dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: false }, orderedBy: "Patel, Anita, MD", orderedDt: "4/2/2026 1330", product: { name: "AZITHROMYCIN 500MG/NS 250ML IVPB", pkg: "250 mL Premix (0338-9549-03)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=a81212ef-76b6-4bd7-8706-3d2b05ee34f9&name=lbl636298251.jpg" },
    teaching: { correctAction: "verify", explanation: "Azithromycin 500 mg IV daily provides atypical coverage as part of CAP combination therapy with ceftriaxone. The QTc monitoring alert is informational \u2014 azithromycin has modest QTc prolongation risk. Appropriate to verify and ensure QTc is monitored.", guideline: { name: "ATS/IDSA CAP Guidelines 2019", url: "https://www.atsjournals.org/doi/10.1164/rccm.201908-1581ST" } }
  },
  { id: "ORD005", patientId: "P003", orderId: "102636200", isNew: true, priority: "Stat", timePending: "32m", drugName: "ceftriaxone 1 GM IVPB", orderLine: "1 g, IVPB, Daily, Stat, First dose 4/2/26 1400", alerts: [], clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Stat", start: "4/2/2026 1400", stop: "" }, schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Chen, William, MD", orderedDt: "4/2/2026 1400", product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Ceftriaxone does NOT require renal dose adjustment \u2014 it is primarily hepatically eliminated with ~40% biliary excretion. The renal dosing alert fires because of the patient's CKD IV (SCr 2.8), but no adjustment is needed. The K+ 5.2 alert is for monitoring, not a contraindication. Ceftriaxone 1g IV daily is appropriate for pyelonephritis.", guideline: { name: "IDSA Complicated UTI Guidelines", url: "https://academic.oup.com/cid/article/52/5/e103/388285" } }
  },
  { id: "ORD006", patientId: "P003", orderId: "102636210", isNew: true, priority: "Routine", timePending: "28m", drugName: "sodium chloride 0.9% infusion", orderLine: "75 mL/hr, IV, Continuous", alerts: [], clinical: { dose: "75 mL/hr", route: "IV", freq: "Continuous", duration: "", rate: "75 mL/hr", volume: "1000 mL", priority: "Routine", start: "4/2/2026 1400", stop: "" }, schedule: [{ date: "4/2/2026", times: ["1400-cont"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "Floor Stock", code: "Floor Stock", triggered: false }, orderedBy: "Chen, William, MD", orderedDt: "4/2/2026 1405", product: { name: "NaCl 0.9% 1000ML BAG", pkg: "1000 mL (0338-0049-04)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=259f8ef4-96ac-7213-e063-6394a90adb71&name=1000+ML+BAG+LABEL+2+Screen+Shot+2024-10-29+at+5.50.40+PM.jpg" },
    teaching: { correctAction: "verify", explanation: "Conservative IV fluid resuscitation at 75 mL/hr is appropriate for this patient with pyelonephritis and mild sepsis. The CKD IV volume status alert is a monitoring reminder, not a contraindication. Close I&O monitoring is warranted, but the rate is reasonable.", guideline: { name: "Surviving Sepsis Campaign 2021", url: "https://journals.lww.com/ccmjournal/fulltext/2021/11000/surviving_sepsis_campaign__international_clinical.21.aspx" } }
  },
  { id: "ORD007", patientId: "P004", orderId: "102636350", isNew: true, priority: "Stat", timePending: "15m", drugName: "penicillin G benzathine/procaine (BICILLIN C-R) 1.2 MU/DOSE IM syringe", orderLine: "2.4 million units, IM, Once, Stat", alerts: [], clinical: { dose: "2.4 million units", route: "IM", freq: "Once", duration: "", rate: "", volume: "4 mL (2 injection sites)", priority: "Stat", start: "4/3/2026 1100", stop: "4/3/2026 1100" }, schedule: [{ date: "4/3/2026", times: ["1100"] }], dispense: { from: "SGA 2 NORTH (2NAO)", firstDose: "SGA 2 NORTH (2NAO)", code: "Unit Dose", triggered: true }, orderedBy: "Rivera, Sofia, MD", orderedDt: "4/3/2026 1045", product: { name: "BICILLIN C-R 1.2MU/2ML SYRINGE", pkg: "2 mL Prefilled Syringe (60793-0620-10)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=ba7b9199-4710-4189-a85d-77ed75befe4d&name=bicillin-01.jpg" },
    teaching: {
      correctAction: "reject",
      explanation: "This order MUST be rejected. Bicillin C-R (benzathine/procaine penicillin combination) was ordered, but the patient has secondary syphilis. Per CDC STI Treatment Guidelines, the correct treatment is Bicillin L-A (benzathine penicillin G ONLY) 2.4 million units IM x1. Bicillin C-R does NOT provide adequate sustained bactericidal levels for treponema pallidum. ISMP has identified Bicillin C-R and Bicillin L-A as frequently confused LASA products \u2014 this is a classic and dangerous medication error.",
      rejectReasons: [
        { id: "r1", text: "LASA error: Bicillin C-R ordered instead of Bicillin L-A \u2014 wrong product for this indication", correct: true },
        { id: "r2", text: "Indication mismatch: Bicillin C-R is NOT recommended for syphilis treatment per CDC guidelines", correct: true },
        { id: "r3", text: "ISMP high-alert: Bicillin C-R/L-A are frequently confused look-alike/sound-alike products", correct: true },
        { id: "r4", text: "Dose too high for patient weight", correct: false },
        { id: "r5", text: "Route of administration is incorrect (should be IV, not IM)", correct: false },
        { id: "r6", text: "Drug-allergy interaction identified", correct: false }
      ],
      guideline: { name: "CDC STI Treatment Guidelines \u2014 Syphilis", url: "https://www.cdc.gov/sti-treatment/hcp/clinical-overview/syphilis.html" }
    }
  },
];

// === EASY MODE: Every order has an issue — student must find the error ===
export const EASY_ORDERS = [
  { id: "E001", patientId: "P001", orderId: "102637001", isNew: true, priority: "Routine", timePending: "3h 10m", drugName: "sulfamethoxazole-trimethoprim (BACTRIM DS) 800-160 MG tablet", orderLine: "1 tablet, Oral, BID, First dose 4/3/26 0900", alerts: [], clinical: { dose: "1 tablet", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "" }, schedule: [{ date: "4/3/2026", times: ["0900","2100"] }, { date: "4/4/2026", times: ["0900","2100"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/3/2026 0830", product: { name: "SMZ-TMP DS 800-160 MG TABS", pkg: "100ct Bottle (0093-0105-01)" },
    teaching: { correctAction: "reject", hint: "Review the patient's allergy list carefully.", explanation: "Patient has a documented SULFA ALLERGY with history of ANAPHYLAXIS. Sulfamethoxazole-trimethoprim (Bactrim) is a sulfonamide antibiotic and is absolutely contraindicated. This is a direct drug-allergy interaction that could be fatal.",
      rejectReasons: [
        { id: "r1", text: "Drug-allergy interaction: patient has documented sulfa allergy (anaphylaxis)", correct: true },
        { id: "r2", text: "Sulfonamide antibiotic contraindicated with sulfa anaphylaxis history", correct: true },
        { id: "r3", text: "Dose is too high for renal function", correct: false },
        { id: "r4", text: "Wrong route of administration", correct: false },
        { id: "r5", text: "Duplicate therapy with existing antibiotic", correct: false }
      ],
      guideline: { name: "AAAAI Drug Allergy Practice Parameter", url: "https://www.jacionline.org/article/S0091-6749(10)01258-0/fulltext" }
    }
  },
  { id: "E002", patientId: "P001", orderId: "102637002", isNew: true, priority: "Routine", timePending: "2h 50m", drugName: "metformin HCl 1000 MG tablet", orderLine: "1000 mg, Oral, BID, First dose 4/3/26 0900", alerts: [], clinical: { dose: "1000 mg", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "" }, schedule: [{ date: "4/3/2026", times: ["0900","2100"] }, { date: "4/4/2026", times: ["0900","2100"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/3/2026 0835", product: { name: "METFORMIN HCL 1000 MG TABS", pkg: "100ct Bottle (0093-7214-01)" },
    teaching: { correctAction: "reject", hint: "Check the patient's renal function and current clinical status.", explanation: "Metformin is contraindicated during acute kidney injury (SCr 1.6, rising from baseline 1.4, eGFR declining). The patient's treatment plan explicitly states 'Hold metformin (AKI).' Metformin accumulation in renal impairment can cause life-threatening lactic acidosis.",
      rejectReasons: [
        { id: "r1", text: "Contraindicated in acute kidney injury — risk of lactic acidosis", correct: true },
        { id: "r2", text: "Patient's treatment plan explicitly states to hold metformin", correct: true },
        { id: "r3", text: "SCr elevated above baseline with declining eGFR", correct: true },
        { id: "r4", text: "Drug-allergy interaction", correct: false },
        { id: "r5", text: "Dose exceeds maximum daily dose", correct: false }
      ],
      guideline: { name: "KDIGO AKI Guideline", url: "https://kdigo.org/guidelines/acute-kidney-injury/" }
    }
  },
  { id: "E003", patientId: "P002", orderId: "102637003", isNew: true, priority: "Routine", timePending: "1h 45m", drugName: "gentamicin 350 MG IVPB", orderLine: "350 mg, IVPB, Q24H, First dose 4/3/26 1400", alerts: [], clinical: { dose: "350 mg", route: "IVPB", freq: "Every 24 hours", duration: "60 min", rate: "", volume: "100 mL NS", priority: "Routine", start: "4/3/2026 1400", stop: "" }, schedule: [{ date: "4/3/2026", times: ["1400"] }, { date: "4/4/2026", times: ["1400"] }], dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: true }, orderedBy: "Patel, Anita, MD", orderedDt: "4/3/2026 1300", product: { name: "GENTAMICIN 40MG/ML INJ", pkg: "2 mL Vial (0409-1207-02)" },
    teaching: { correctAction: "reject", hint: "Is this the right antibiotic class for this diagnosis?", explanation: "Aminoglycosides (gentamicin) are NOT guideline-recommended empiric therapy for community-acquired pneumonia per ATS/IDSA guidelines. Standard CAP therapy is a beta-lactam (ceftriaxone) plus a macrolide (azithromycin) or a respiratory fluoroquinolone. Gentamicin has no role in CAP treatment and carries unnecessary nephro/ototoxicity risk.",
      rejectReasons: [
        { id: "r1", text: "Aminoglycosides are not guideline-recommended for CAP (ATS/IDSA)", correct: true },
        { id: "r2", text: "Unnecessary nephrotoxicity and ototoxicity risk", correct: true },
        { id: "r3", text: "Patient has a gentamicin allergy", correct: false },
        { id: "r4", text: "Dose is too low for extended-interval dosing", correct: false },
        { id: "r5", text: "Route should be IM, not IV", correct: false }
      ],
      guideline: { name: "ATS/IDSA CAP Guidelines 2019", url: "https://www.atsjournals.org/doi/10.1164/rccm.201908-1581ST" }
    }
  },
  { id: "E004", patientId: "P003", orderId: "102637004", isNew: true, priority: "Routine", timePending: "1h 20m", drugName: "potassium chloride 40 MEQ tablet ER", orderLine: "40 mEq, Oral, Daily, First dose 4/3/26 0900", alerts: [], clinical: { dose: "40 mEq", route: "Oral", freq: "Daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "" }, schedule: [{ date: "4/3/2026", times: ["0900"] }, { date: "4/4/2026", times: ["0900"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Chen, William, MD", orderedDt: "4/3/2026 0845", product: { name: "KCL ER 20 MEQ TABS", pkg: "100ct Bottle (0074-7099-13)" },
    teaching: { correctAction: "reject", hint: "Check the patient's most recent potassium level.", explanation: "Patient's K+ is already 5.2 mEq/L (HIGH) with CKD Stage IV. Supplementing potassium in a hyperkalemic patient is extremely dangerous and can cause fatal cardiac arrhythmias. Potassium should be held and the existing hyperkalemia should be managed.",
      rejectReasons: [
        { id: "r1", text: "Patient is already hyperkalemic (K+ 5.2) — supplementation is dangerous", correct: true },
        { id: "r2", text: "CKD IV impairs potassium excretion, increasing hyperkalemia risk", correct: true },
        { id: "r3", text: "Risk of fatal cardiac arrhythmias with potassium supplementation in hyperkalemia", correct: true },
        { id: "r4", text: "Dose exceeds maximum single dose", correct: false },
        { id: "r5", text: "Extended-release formulation is not available", correct: false }
      ],
      guideline: { name: "AHA Hyperkalemia Management", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000509" }
    }
  },
  { id: "E005", patientId: "P003", orderId: "102637005", isNew: true, priority: "Routine", timePending: "55m", drugName: "nitrofurantoin monohydrate (MACROBID) 100 MG capsule", orderLine: "100 mg, Oral, BID x 5 days", alerts: [], clinical: { dose: "100 mg", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "4/8/2026 2100" }, schedule: [{ date: "4/3/2026", times: ["0900","2100"] }, { date: "4/4/2026", times: ["0900","2100"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Chen, William, MD", orderedDt: "4/3/2026 0850", product: { name: "NITROFURANTOIN 100 MG CAPS", pkg: "100ct Bottle (0149-0710-01)" },
    teaching: { correctAction: "reject", hint: "Can this antibiotic be used with this level of renal function?", explanation: "Nitrofurantoin is CONTRAINDICATED when CrCl < 30 mL/min. This patient has CKD Stage IV (SCr 2.8, estimated CrCl ~15-18 mL/min). Nitrofurantoin cannot achieve adequate urinary drug concentrations at low GFR and also carries increased risk of peripheral neuropathy and pulmonary toxicity in severe renal impairment.",
      rejectReasons: [
        { id: "r1", text: "Contraindicated when CrCl < 30 mL/min — patient's estimated CrCl is ~15-18", correct: true },
        { id: "r2", text: "Inadequate urinary drug concentration at low GFR — will be ineffective", correct: true },
        { id: "r3", text: "Increased risk of peripheral neuropathy in severe renal impairment", correct: true },
        { id: "r4", text: "Drug-allergy interaction identified", correct: false },
        { id: "r5", text: "Nitrofurantoin is not effective against E. coli", correct: false }
      ],
      guideline: { name: "IDSA Complicated UTI Guidelines", url: "https://academic.oup.com/cid/article/52/5/e103/388285" }
    }
  },
  { id: "E006", patientId: "P001", orderId: "102637006", isNew: true, priority: "Routine", timePending: "40m", drugName: "levofloxacin 750 MG IVPB", orderLine: "750 mg, IVPB, Daily, First dose 4/3/26 1400", alerts: [], clinical: { dose: "750 mg", route: "IVPB", freq: "Daily", duration: "90 min", rate: "", volume: "150 mL D5W", priority: "Routine", start: "4/3/2026 1400", stop: "" }, schedule: [{ date: "4/3/2026", times: ["1400"] }, { date: "4/4/2026", times: ["1400"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/3/2026 1330", product: { name: "LEVOFLOXACIN 750MG/150ML IVPB", pkg: "150 mL Premix (0409-3480-64)" },
    teaching: { correctAction: "reject", hint: "Review the patient's EKG intervals and cardiac history.", explanation: "Patient has a QTc of 498 ms (prolonged) with atrial fibrillation. Levofloxacin (fluoroquinolone) carries significant QTc prolongation risk. The combination of existing QTc prolongation + AFib + fluoroquinolone significantly increases risk of torsades de pointes. This order should be rejected and an alternative antibiotic without QTc risk should be selected.",
      rejectReasons: [
        { id: "r1", text: "QTc prolongation risk: patient's QTc is already 498 ms (prolonged)", correct: true },
        { id: "r2", text: "Fluoroquinolones further prolong QTc — risk of torsades de pointes", correct: true },
        { id: "r3", text: "Patient has underlying atrial fibrillation increasing arrhythmia risk", correct: true },
        { id: "r4", text: "Dose needs renal adjustment for CKD", correct: false },
        { id: "r5", text: "Levofloxacin is not available as an IV formulation", correct: false }
      ],
      guideline: { name: "AHA Scientific Statement: Drug-Induced QT Prolongation", url: "https://www.ahajournals.org/doi/10.1161/CIR.0b013e3181bfa7f5" }
    }
  },
  { id: "E007", patientId: "P004", orderId: "102637007", isNew: true, priority: "Stat", timePending: "15m", drugName: "penicillin G benzathine/procaine (BICILLIN C-R) 1.2 MU/DOSE IM syringe", orderLine: "2.4 million units, IM, Once, Stat", alerts: [], clinical: { dose: "2.4 million units", route: "IM", freq: "Once", duration: "", rate: "", volume: "4 mL (2 injection sites)", priority: "Stat", start: "4/3/2026 1100", stop: "4/3/2026 1100" }, schedule: [{ date: "4/3/2026", times: ["1100"] }], dispense: { from: "SGA 2 NORTH (2NAO)", firstDose: "SGA 2 NORTH (2NAO)", code: "Unit Dose", triggered: true }, orderedBy: "Rivera, Sofia, MD", orderedDt: "4/3/2026 1045", product: { name: "BICILLIN C-R 1.2MU/2ML SYRINGE", pkg: "2 mL Prefilled Syringe (60793-0620-10)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=ba7b9199-4710-4189-a85d-77ed75befe4d&name=bicillin-01.jpg" },
    teaching: { correctAction: "reject", hint: "Look carefully at the exact product name — is it the right formulation?", explanation: "Bicillin C-R (benzathine/procaine penicillin combination) was ordered, but the patient has secondary syphilis. Per CDC guidelines, the correct treatment is Bicillin L-A (benzathine penicillin G ONLY). Bicillin C-R does NOT provide adequate sustained levels for syphilis. This is a classic LASA (look-alike/sound-alike) medication error.",
      rejectReasons: [
        { id: "r1", text: "LASA error: Bicillin C-R ordered instead of Bicillin L-A", correct: true },
        { id: "r2", text: "Bicillin C-R is NOT recommended for syphilis per CDC guidelines", correct: true },
        { id: "r3", text: "ISMP high-alert: frequently confused look-alike/sound-alike products", correct: true },
        { id: "r4", text: "Dose too high for patient weight", correct: false },
        { id: "r5", text: "Route should be IV, not IM", correct: false },
        { id: "r6", text: "Drug-allergy interaction identified", correct: false }
      ],
      guideline: { name: "CDC STI Treatment Guidelines — Syphilis", url: "https://www.cdc.gov/sti-treatment/hcp/clinical-overview/syphilis.html" }
    }
  },
];

// === MEDIUM MODE: Mix of correct and incorrect — more incorrect than correct ===
export const MEDIUM_ORDERS = [
  { id: "M001", patientId: "P001", orderId: "102638001", isNew: true, priority: "Routine", timePending: "4h 12m", drugName: "sacubitril-valsartan (ENTRESTO) 24-26 MG tablet", orderLine: "1 tablet, Oral, BID, First dose 4/2/26 0000, Until D/C", alerts: [], clinical: { dose: "1 tablet", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0000", stop: "" }, schedule: [{ date: "4/2/2026", times: ["0000","0900","2100"] }, { date: "4/3/2026", times: ["0900","2100"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Lama, Alejandro T, MD", orderedDt: "4/1/2026 2355", product: { name: "SACUBITRIL-VALSARTAN 24-26 MG TABS", pkg: "60ct Bottle (0078-0659-20)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=000dc81d-ab91-450c-8eae-8eb74e72296f&name=ENTRESTO-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Entresto is appropriately held during acute decompensation. Verifying acknowledges the hold and ensures it stays on the MAR for resumption when euvolemic.", guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" } }
  },
  { id: "M002", patientId: "P001", orderId: "102638002", isNew: true, priority: "Routine", timePending: "2h 45m", drugName: "furosemide 40 MG injection", orderLine: "40 mg, IV Push, Q12H, First dose 4/2/26 0600, Until D/C", alerts: [], clinical: { dose: "40 mg", route: "IV Push", freq: "Every 12 hours", duration: "2 min", rate: "", volume: "4 mL", priority: "Routine", start: "4/2/2026 0600", stop: "" }, schedule: [{ date: "4/2/2026", times: ["0600","1800"] }, { date: "4/3/2026", times: ["0600","1800"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/2/2026 0545", product: { name: "FUROSEMIDE 10 MG/ML INJ 4ML", pkg: "4 mL Vial (0409-1273-12)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=1b9117d5-0dd9-4577-a1fd-bb0aaf7e68ec&name=furosemide-cart-a.jpg" },
    teaching: { correctAction: "verify", explanation: "Furosemide is a sulfonamide diuretic but has very low cross-reactivity with sulfa antibiotics. Dose of 40 mg IV Q12H is appropriate for ADHF.", guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" } }
  },
  { id: "M003", patientId: "P001", orderId: "102638003", isNew: true, priority: "Routine", timePending: "2h 30m", drugName: "lisinopril 10 MG tablet", orderLine: "10 mg, Oral, Daily, First dose 4/3/26 0900", alerts: [], clinical: { dose: "10 mg", route: "Oral", freq: "Daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "" }, schedule: [{ date: "4/3/2026", times: ["0900"] }, { date: "4/4/2026", times: ["0900"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Lama, Alejandro T, MD", orderedDt: "4/3/2026 0830", product: { name: "LISINOPRIL 10 MG TABS", pkg: "100ct Bottle (0093-1040-01)" },
    teaching: { correctAction: "reject", explanation: "ACE inhibitor (lisinopril) ordered for a patient already on sacubitril/valsartan (Entresto), an ARNI. Concurrent ACE + ARNI is CONTRAINDICATED due to significantly increased risk of angioedema. A minimum 36-hour washout is required when switching between these agents. The Entresto is currently held but still on the MAR.",
      rejectReasons: [
        { id: "r1", text: "ACE inhibitor + ARNI (Entresto) is contraindicated — angioedema risk", correct: true },
        { id: "r2", text: "Requires 36-hour washout period between ACE inhibitor and ARNI", correct: true },
        { id: "r3", text: "Entresto is still on the MAR (held status) — dual RAAS blockade", correct: true },
        { id: "r4", text: "Lisinopril dose is too high", correct: false },
        { id: "r5", text: "ACE inhibitors are contraindicated in heart failure", correct: false }
      ],
      guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" }
    }
  },
  { id: "M004", patientId: "P002", orderId: "102638004", isNew: true, priority: "Routine", timePending: "1h 30m", drugName: "ceftriaxone 1 GM IVPB", orderLine: "1 g, IVPB, Daily, First dose 4/2/26 1400", alerts: [], clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Routine", start: "4/2/2026 1400", stop: "" }, schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }], dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: true }, orderedBy: "Patel, Anita, MD", orderedDt: "4/2/2026 1330", product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Ceftriaxone 1g IV daily is guideline-concordant empiric therapy for CAP per ATS/IDSA guidelines. No renal adjustment needed. Patient has NKDA.", guideline: { name: "ATS/IDSA CAP Guidelines 2019", url: "https://www.atsjournals.org/doi/10.1164/rccm.201908-1581ST" } }
  },
  { id: "M005", patientId: "P003", orderId: "102638005", isNew: true, priority: "Stat", timePending: "32m", drugName: "ceftriaxone 1 GM IVPB", orderLine: "1 g, IVPB, Daily, Stat, First dose 4/2/26 1400", alerts: [], clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Stat", start: "4/2/2026 1400", stop: "" }, schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Chen, William, MD", orderedDt: "4/2/2026 1400", product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Ceftriaxone does NOT require renal dose adjustment — it is primarily hepatically eliminated. Ceftriaxone 1g IV daily is appropriate for pyelonephritis.", guideline: { name: "IDSA Complicated UTI Guidelines", url: "https://academic.oup.com/cid/article/52/5/e103/388285" } }
  },
  { id: "M006", patientId: "P003", orderId: "102638006", isNew: true, priority: "Routine", timePending: "25m", drugName: "vancomycin 1000 MG IVPB", orderLine: "1000 mg, IVPB, Q12H, First dose 4/3/26 0900", alerts: [], clinical: { dose: "1000 mg", route: "IVPB", freq: "Every 12 hours", duration: "90 min", rate: "", volume: "250 mL NS", priority: "Routine", start: "4/3/2026 0900", stop: "" }, schedule: [{ date: "4/3/2026", times: ["0900","2100"] }, { date: "4/4/2026", times: ["0900","2100"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Chen, William, MD", orderedDt: "4/3/2026 0840", product: { name: "VANCOMYCIN 1GM/250ML IVPB", pkg: "250 mL Premix (0338-3550-48)" },
    teaching: { correctAction: "reject", explanation: "Patient has a documented vancomycin reaction (Red Man Syndrome) AND the dose needs renal adjustment for CKD IV (SCr 2.8, CrCl ~15-18). This order should be rejected: it requires premedication with diphenhydramine 25-50 mg, a reduced infusion rate (over 2 hours minimum), and a renally-adjusted dose before it can be safely administered. The order needs to be rewritten with these modifications.",
      rejectReasons: [
        { id: "r1", text: "Patient has documented vancomycin reaction (Red Man Syndrome) — needs premedication protocol", correct: true },
        { id: "r2", text: "Dose needs renal adjustment for CKD IV (SCr 2.8, CrCl ~15-18)", correct: true },
        { id: "r3", text: "Infusion rate needs to be extended to prevent recurrent RMS", correct: true },
        { id: "r4", text: "Vancomycin is absolutely contraindicated with any prior reaction", correct: false },
        { id: "r5", text: "Patient has a true IgE-mediated vancomycin allergy", correct: false }
      ],
      guideline: { name: "IDSA Complicated UTI Guidelines", url: "https://academic.oup.com/cid/article/52/5/e103/388285" }
    }
  },
  { id: "M007", patientId: "P003", orderId: "102638007", isNew: true, priority: "Routine", timePending: "20m", drugName: "calcium carbonate 1250 MG tablet", orderLine: "1250 mg, Oral, TID with meals", alerts: [], clinical: { dose: "1250 mg (500 mg elemental Ca)", route: "Oral", freq: "3 times daily with meals", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0800", stop: "" }, schedule: [{ date: "4/3/2026", times: ["0800","1200","1800"] }, { date: "4/4/2026", times: ["0800","1200","1800"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: false }, orderedBy: "Chen, William, MD", orderedDt: "4/3/2026 0845", product: { name: "CALCIUM CARBONATE 1250 MG TABS", pkg: "100ct Bottle (0904-5770-60)" },
    teaching: { correctAction: "reject", explanation: "Drug interaction: Calcium significantly reduces absorption of levothyroxine (patient takes levothyroxine 75 mcg at 0600). The 0800 calcium dose is only 2 hours after levothyroxine — must be separated by at least 4 hours. This order should be rejected so the prescriber can reorder with corrected timing (calcium no earlier than 1000).",
      rejectReasons: [
        { id: "r1", text: "Drug interaction: calcium reduces levothyroxine absorption — timing conflict at 0800", correct: true },
        { id: "r2", text: "Need at least 4-hour separation between levothyroxine and calcium", correct: true },
        { id: "r3", text: "Calcium carbonate is contraindicated in CKD", correct: false },
        { id: "r4", text: "Dose of elemental calcium exceeds daily maximum", correct: false },
        { id: "r5", text: "Patient has a calcium allergy", correct: false }
      ],
      guideline: { name: "ATA Hypothyroidism Guidelines", url: "https://www.liebertpub.com/doi/10.1089/thy.2014.0028" }
    }
  },
  { id: "M008", patientId: "P001", orderId: "102638008", isNew: true, priority: "Routine", timePending: "3h 00m", drugName: "spironolactone 25 MG tablet", orderLine: "25 mg, Oral, Daily, First dose 4/2/26 0900", alerts: [], clinical: { dose: "25 mg", route: "Oral", freq: "Daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0900", stop: "" }, schedule: [{ date: "4/2/2026", times: ["0900"] }, { date: "4/3/2026", times: ["0900"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/2/2026 0540", product: { name: "SPIRONOLACTONE 25 MG TABS", pkg: "100ct Bottle (0093-0442-01)" },
    teaching: { correctAction: "verify", explanation: "Spironolactone 25 mg daily is appropriate for HFrEF with mortality benefit per RALES trial. K+ is 4.1, which is within safe range. Renal function requires monitoring but is not a contraindication at this level.", guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" } }
  },
  { id: "M009", patientId: "P004", orderId: "102638009", isNew: true, priority: "Stat", timePending: "15m", drugName: "penicillin G benzathine/procaine (BICILLIN C-R) 1.2 MU/DOSE IM syringe", orderLine: "2.4 million units, IM, Once, Stat", alerts: [], clinical: { dose: "2.4 million units", route: "IM", freq: "Once", duration: "", rate: "", volume: "4 mL (2 injection sites)", priority: "Stat", start: "4/3/2026 1100", stop: "4/3/2026 1100" }, schedule: [{ date: "4/3/2026", times: ["1100"] }], dispense: { from: "SGA 2 NORTH (2NAO)", firstDose: "SGA 2 NORTH (2NAO)", code: "Unit Dose", triggered: true }, orderedBy: "Rivera, Sofia, MD", orderedDt: "4/3/2026 1045", product: { name: "BICILLIN C-R 1.2MU/2ML SYRINGE", pkg: "2 mL Prefilled Syringe (60793-0620-10)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=ba7b9199-4710-4189-a85d-77ed75befe4d&name=bicillin-01.jpg" },
    teaching: { correctAction: "reject", explanation: "Bicillin C-R (benzathine/procaine combination) was ordered instead of Bicillin L-A (benzathine only). For secondary syphilis, only Bicillin L-A provides adequate sustained levels per CDC guidelines. This is a dangerous LASA medication error.",
      rejectReasons: [
        { id: "r1", text: "LASA error: Bicillin C-R ordered instead of Bicillin L-A", correct: true },
        { id: "r2", text: "Bicillin C-R is NOT recommended for syphilis per CDC guidelines", correct: true },
        { id: "r3", text: "ISMP high-alert: frequently confused look-alike/sound-alike products", correct: true },
        { id: "r4", text: "Dose too high for patient weight", correct: false },
        { id: "r5", text: "Route should be IV, not IM", correct: false }
      ],
      guideline: { name: "CDC STI Treatment Guidelines — Syphilis", url: "https://www.cdc.gov/sti-treatment/hcp/clinical-overview/syphilis.html" }
    }
  },
];

// === HARD MODE: Spectrum of correctness — optimal vs acceptable vs suboptimal ===
export const HARD_ORDERS = [
  { id: "H001", patientId: "P001", orderId: "102639001", isNew: true, priority: "Routine", timePending: "2h 45m", drugName: "furosemide 40 MG injection", orderLine: "40 mg, IV Push, Q12H, First dose 4/2/26 0600, Until D/C", alerts: [], clinical: { dose: "40 mg", route: "IV Push", freq: "Every 12 hours", duration: "2 min", rate: "", volume: "4 mL", priority: "Routine", start: "4/2/2026 0600", stop: "" }, schedule: [{ date: "4/2/2026", times: ["0600","1800"] }, { date: "4/3/2026", times: ["0600","1800"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/2/2026 0545", product: { name: "FUROSEMIDE 10 MG/ML INJ 4ML", pkg: "4 mL Vial (0409-1273-12)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=1b9117d5-0dd9-4577-a1fd-bb0aaf7e68ec&name=furosemide-cart-a.jpg" },
    teaching: { correctAction: "message", detailedFeedback: {
      verify: { grade: "acceptable", message: "The dose is safe and within normal range. However, 40 mg IV matches the home PO dose 1:1. Since IV furosemide has ~2x bioavailability of PO, the effective dose is adequate but conservative. With significant volume overload (8 lb weight gain, 3+ edema, BNP 1840), many clinicians would start at 80 mg IV Q12H or use continuous infusion for more effective diuresis." },

      reject: { grade: "incorrect", message: "There is no safety concern requiring rejection. Furosemide 40 mg IV Q12H is a safe and appropriate order, even if the dose could be optimized." },
      message: { grade: "optimal", message: "Excellent clinical judgment. While the order is safe, messaging the prescriber about potential dose optimization (80 mg IV Q12H or continuous infusion) given the degree of volume overload (8 lb gain, BNP 1840, 3+ edema) demonstrates proactive pharmaceutical care. This is what distinguishes good from great pharmacy practice." }
    }, explanation: "Furosemide 40 mg IV Q12H is safe but may be suboptimal. The IV dose matches the home PO dose, but IV has ~2x bioavailability. Given severe volume overload, consider recommending dose escalation.", guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" } }
  },
  { id: "H002", patientId: "P002", orderId: "102639002", isNew: true, priority: "Routine", timePending: "1h 30m", drugName: "azithromycin 500 MG IVPB", orderLine: "500 mg, IVPB, Daily, Day 3", alerts: [], clinical: { dose: "500 mg", route: "IVPB", freq: "Daily", duration: "60 min", rate: "", volume: "250 mL NS", priority: "Routine", start: "4/4/2026 1400", stop: "" }, schedule: [{ date: "4/4/2026", times: ["1400"] }, { date: "4/5/2026", times: ["1400"] }], dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: false }, orderedBy: "Patel, Anita, MD", orderedDt: "4/4/2026 1200", product: { name: "AZITHROMYCIN 500MG/NS 250ML IVPB", pkg: "250 mL Premix (0338-9549-03)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=a81212ef-76b6-4bd7-8706-3d2b05ee34f9&name=lbl636298251.jpg" },
    teaching: { correctAction: "message", detailedFeedback: {
      verify: { grade: "acceptable", message: "IV azithromycin is still effective and not harmful. However, the patient has been afebrile for >24 hours, WBC is trending down, and SpO2 improved. IV-to-PO switch criteria are met (functioning GI tract, clinical improvement, tolerating PO). Continuing IV when PO is appropriate increases cost, infection risk from IV line, and length of stay." },

      reject: { grade: "incorrect", message: "There is no reason to reject this order. Azithromycin 500 mg daily is appropriate for CAP. The clinical question is about IV-to-PO conversion, not safety." },
      message: { grade: "optimal", message: "Outstanding antimicrobial stewardship. The patient meets IV-to-PO switch criteria: afebrile >24h, WBC trending down (15.8 from 18.2), SpO2 improving, tolerating PO. Recommending conversion to azithromycin 500 mg PO reduces cost, IV line infection risk, and supports earlier discharge planning." }
    }, explanation: "Patient meets IV-to-PO conversion criteria (afebrile >24h, improving WBC, tolerating PO). IV azithromycin is safe but PO conversion represents better antimicrobial stewardship.", guideline: { name: "ATS/IDSA CAP Guidelines 2019", url: "https://www.atsjournals.org/doi/10.1164/rccm.201908-1581ST" } }
  },
  { id: "H003", patientId: "P003", orderId: "102639003", isNew: true, priority: "Stat", timePending: "32m", drugName: "ceftriaxone 1 GM IVPB", orderLine: "1 g, IVPB, Daily, Stat, First dose 4/2/26 1400", alerts: [], clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Stat", start: "4/2/2026 1400", stop: "" }, schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Chen, William, MD", orderedDt: "4/2/2026 1400", product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", detailedFeedback: {
      verify: { grade: "optimal", message: "Excellent. Ceftriaxone 1g IV daily is the best choice for this patient. It does not require renal adjustment (primarily hepatic elimination), provides appropriate coverage for pyelonephritis, and avoids the risks that alternatives would pose: ciprofloxacin needs renal dosing and TMP-SMX would worsen hyperkalemia (K+ 5.2). The patient's CKD IV and elevated potassium make ceftriaxone the safest effective option." },

      reject: { grade: "incorrect", message: "Ceftriaxone does not require renal dose adjustment. It is primarily hepatically eliminated with ~40% biliary excretion. The patient's CKD IV does not necessitate a dose change." },
      message: { grade: "acceptable", message: "Messaging to confirm the antibiotic choice is reasonable but unnecessary. Ceftriaxone is already the optimal empiric choice here. Alternative options (ciprofloxacin, TMP-SMX) carry more risk in this patient with CKD IV and hyperkalemia." }
    }, explanation: "Ceftriaxone is the optimal choice — no renal adjustment needed, and alternatives (cipro, TMP-SMX) carry greater risk with CKD IV and hyperkalemia.", guideline: { name: "IDSA Complicated UTI Guidelines", url: "https://academic.oup.com/cid/article/52/5/e103/388285" } }
  },
  { id: "H004", patientId: "P001", orderId: "102639004", isNew: true, priority: "Routine", timePending: "3h 00m", drugName: "carvedilol 12.5 MG tablet", orderLine: "12.5 mg, Oral, BID", alerts: [], clinical: { dose: "12.5 mg", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0900", stop: "" }, schedule: [{ date: "4/2/2026", times: ["0900","2100"] }, { date: "4/3/2026", times: ["0900","2100"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/2/2026 0540", product: { name: "CARVEDILOL 12.5 MG TABS", pkg: "100ct Bottle (0093-7237-01)" },
    teaching: { correctAction: "verify", detailedFeedback: {
      verify: { grade: "optimal", message: "Correct. ACC/AHA guidelines recommend continuing beta-blockers at current dose during ADHF if the patient is hemodynamically stable. This patient has BP 142/86 and HR 88 — well-compensated. Discontinuing beta-blockers during decompensation is associated with worse outcomes. Continue at home dose." },

      reject: { grade: "incorrect", message: "There is no reason to reject this order. Carvedilol at home dose is appropriate for a hemodynamically stable HFrEF patient, even during acute decompensation." },
      message: { grade: "acceptable", message: "Confirming beta-blocker continuation is reasonable pharmaceutical care. The evidence supports continuation, but the clinical nuance makes this a fair question to raise with the team." }
    }, explanation: "Beta-blockers should be continued at home dose during ADHF when hemodynamically stable (BP 142/86, HR 88) per ACC/AHA guidelines. Evidence shows worse outcomes with discontinuation.", guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" } }
  },
  { id: "H005", patientId: "P001", orderId: "102639005", isNew: true, priority: "Routine", timePending: "2h 30m", drugName: "empagliflozin 10 MG tablet", orderLine: "10 mg, Oral, Daily", alerts: [], clinical: { dose: "10 mg", route: "Oral", freq: "Daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0900", stop: "" }, schedule: [{ date: "4/2/2026", times: ["0900"] }, { date: "4/3/2026", times: ["0900"] }], dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true }, orderedBy: "Smith, Robert J, MD", orderedDt: "4/2/2026 0542", product: { name: "EMPAGLIFLOZIN 10 MG TABS", pkg: "30ct Bottle (0597-0151-30)" },
    teaching: { correctAction: "message", detailedFeedback: {
      verify: { grade: "acceptable", message: "Emerging evidence (EMPA-KIDNEY, DAPA-CKD) supports continuing SGLT2 inhibitors through mild AKI as the initial eGFR dip is hemodynamic and reversible. However, this patient has active AKI (SCr 1.6, rising from baseline 1.4) during acute decompensation. Many institutions recommend holding during acute illness and restarting when stabilized." },

      reject: { grade: "incorrect", message: "Empagliflozin is not contraindicated here. The question is about timing during acute illness, not safety of the drug itself." },
      message: { grade: "optimal", message: "This is a genuine area of clinical equipoise. Messaging the prescriber to discuss whether to continue or temporarily hold empagliflozin during acute decompensation with AKI shows excellent clinical reasoning. The evidence is evolving, and a team-based decision is the best approach here." }
    }, explanation: "SGLT2 inhibitor during active AKI in ADHF — genuine clinical equipoise. Continuing has emerging evidence support, holding is reasonable caution. Best to discuss with the team.", guideline: { name: "2022 AHA/ACC/HFSA Heart Failure Guideline", url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063" } }
  },
  { id: "H006", patientId: "P002", orderId: "102639006", isNew: true, priority: "Routine", timePending: "1h 15m", drugName: "enoxaparin 40 MG injection", orderLine: "40 mg, SQ, Daily, First dose 4/2/26 2100", alerts: [], clinical: { dose: "40 mg", route: "Subcutaneous", freq: "Daily", duration: "", rate: "", volume: "0.4 mL", priority: "Routine", start: "4/2/2026 2100", stop: "" }, schedule: [{ date: "4/2/2026", times: ["2100"] }, { date: "4/3/2026", times: ["2100"] }], dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: true }, orderedBy: "Patel, Anita, MD", orderedDt: "4/2/2026 1335", product: { name: "ENOXAPARIN 40 MG/0.4ML INJ", pkg: "0.4 mL Prefilled Syringe (0075-0621-02)" },
    teaching: { correctAction: "verify", detailedFeedback: {
      verify: { grade: "optimal", message: "Correct. Enoxaparin 40 mg SQ daily is the standard VTE prophylaxis dose for hospitalized medical patients per ACCP guidelines. While the patient weighs 95 kg, weight-based dosing (0.5 mg/kg) is not routinely recommended for prophylaxis — it applies to treatment doses. Standard 40 mg is guideline-concordant." },

      reject: { grade: "incorrect", message: "There is no reason to reject this order. The dose is standard and appropriate for VTE prophylaxis." },
      message: { grade: "acceptable", message: "While some evidence supports weight-based prophylaxis in obese patients, standard 40 mg is guideline-concordant for prophylaxis. Messaging is not wrong but may not change the plan." }
    }, explanation: "Standard 40 mg VTE prophylaxis dose is guideline-concordant per ACCP. Weight-based dosing applies to treatment, not prophylaxis.", guideline: { name: "ACCP VTE Prevention Guidelines", url: "https://journal.chestnet.org/article/S0012-3692(12)60126-3/fulltext" } }
  },
  { id: "H007", patientId: "P003", orderId: "102639007", isNew: true, priority: "Routine", timePending: "28m", drugName: "sodium chloride 0.9% infusion", orderLine: "75 mL/hr, IV, Continuous", alerts: [], clinical: { dose: "75 mL/hr", route: "IV", freq: "Continuous", duration: "", rate: "75 mL/hr", volume: "1000 mL", priority: "Routine", start: "4/2/2026 1400", stop: "" }, schedule: [{ date: "4/2/2026", times: ["1400-cont"] }], dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "Floor Stock", code: "Floor Stock", triggered: false }, orderedBy: "Chen, William, MD", orderedDt: "4/2/2026 1405", product: { name: "NaCl 0.9% 1000ML BAG", pkg: "1000 mL (0338-0049-04)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=259f8ef4-96ac-7213-e063-6394a90adb71&name=1000+ML+BAG+LABEL+2+Screen+Shot+2024-10-29+at+5.50.40+PM.jpg" },
    teaching: { correctAction: "message", detailedFeedback: {
      verify: { grade: "acceptable", message: "75 mL/hr is not harmful and provides needed hydration for pyelonephritis. However, the patient's renal function is improving (SCr 2.8 from 3.1), suggesting adequate resuscitation. Continued fluid at this rate in a CKD IV patient risks volume overload. Reassessment of fluid rate is warranted." },

      reject: { grade: "incorrect", message: "IV normal saline is appropriate for pyelonephritis management. The question is about rate optimization, not whether fluids should be given." },
      message: { grade: "optimal", message: "Excellent clinical monitoring. With SCr improving (3.1→2.8), recommending rate reduction (e.g., 50 mL/hr or a defined total volume with reassessment) balances continued hydration needs against volume overload risk in CKD IV. This proactive monitoring is exemplary pharmaceutical care." }
    }, explanation: "Renal function improving (SCr 2.8 from 3.1) — fluid rate may need reduction in CKD IV patient. Messaging prescriber about rate reassessment is optimal.", guideline: { name: "IDSA Complicated UTI Guidelines", url: "https://academic.oup.com/cid/article/52/5/e103/388285" } }
  },
  { id: "H008", patientId: "P004", orderId: "102639008", isNew: true, priority: "Stat", timePending: "15m", drugName: "penicillin G benzathine/procaine (BICILLIN C-R) 1.2 MU/DOSE IM syringe", orderLine: "2.4 million units, IM, Once, Stat", alerts: [], clinical: { dose: "2.4 million units", route: "IM", freq: "Once", duration: "", rate: "", volume: "4 mL (2 injection sites)", priority: "Stat", start: "4/3/2026 1100", stop: "4/3/2026 1100" }, schedule: [{ date: "4/3/2026", times: ["1100"] }], dispense: { from: "SGA 2 NORTH (2NAO)", firstDose: "SGA 2 NORTH (2NAO)", code: "Unit Dose", triggered: true }, orderedBy: "Rivera, Sofia, MD", orderedDt: "4/3/2026 1045", product: { name: "BICILLIN C-R 1.2MU/2ML SYRINGE", pkg: "2 mL Prefilled Syringe (60793-0620-10)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=ba7b9199-4710-4189-a85d-77ed75befe4d&name=bicillin-01.jpg" },
    teaching: { correctAction: "reject", detailedFeedback: {
      verify: { grade: "incorrect", message: "This order MUST NOT be verified. Bicillin C-R (benzathine/procaine combination) was ordered for secondary syphilis. Only Bicillin L-A (benzathine penicillin G) provides adequate sustained levels per CDC guidelines. Verifying this order would result in treatment failure and continued infectivity." },

      reject: { grade: "optimal", message: "Correct — this is a critical LASA medication error. Bicillin C-R does NOT provide adequate sustained bactericidal levels for treponema pallidum. Rejecting and contacting the prescriber to reorder as Bicillin L-A 2.4 MU IM x1 is the only safe action." },
      message: { grade: "suboptimal", message: "While messaging the prescriber is a step in the right direction, this order should be actively rejected, not just flagged. The wrong product reaching the patient could result in treatment failure. Reject first, then message." }
    }, explanation: "Bicillin C-R vs L-A LASA error — even in hard mode, some errors are clear-cut. This must be rejected.",
      rejectReasons: [
        { id: "r1", text: "LASA error: Bicillin C-R ordered instead of Bicillin L-A", correct: true },
        { id: "r2", text: "Bicillin C-R is NOT recommended for syphilis per CDC guidelines", correct: true },
        { id: "r3", text: "ISMP high-alert: frequently confused look-alike/sound-alike products", correct: true },
        { id: "r4", text: "Dose too high for patient weight", correct: false },
        { id: "r5", text: "Route should be IV, not IM", correct: false }
      ],
      guideline: { name: "CDC STI Treatment Guidelines — Syphilis", url: "https://www.cdc.gov/sti-treatment/hcp/clinical-overview/syphilis.html" }
    }
  },
];

export function getOrdersForDifficulty(level) {
  switch (level) {
    case 'easy': return EASY_ORDERS;
    case 'medium': return MEDIUM_ORDERS;
    case 'hard': return HARD_ORDERS;
    default: return DEMO_ORDERS;
  }
}
