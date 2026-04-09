import { a2 as attr_class, a3 as store_get, e as escape_html, a4 as unsubscribe_stores, a1 as derived$1, a5 as ensure_array_like, a6 as attr, a7 as stringify, a8 as attr_style, a9 as head } from "../../chunks/renderer.js";
import { w as writable, d as derived } from "../../chunks/index.js";
const DEMO_PATIENTS = {
  P001: {
    name: "DOE, JANE M",
    mrn: "00234891",
    dob: "03/15/1962",
    age: "64F",
    weight: "72 kg",
    height: "165 cm",
    allergies: ["Penicillin (Rash)", "Sulfa (Anaphylaxis)"],
    room: "4S-412A",
    admitDate: "04/01/2026",
    attending: "Smith, Robert J, MD",
    dx: "Acute decompensated HFrEF (I50.21)",
    code: "Full",
    hp: { cc: "Progressive dyspnea on exertion and bilateral LE edema x 5 days", hpi: "64 y/o F with PMH of HFrEF (EF 30%), HTN, T2DM, CKD III presents with worsening DOE and bilateral LE edema over 5 days. Reports 8 lb weight gain. Endorses orthopnea (3-pillow) and PND. Denies CP, palpitations, fever. Ran out of furosemide ~1 week ago.", pmh: ["HFrEF (EF 30%)", "HTN", "T2DM", "CKD Stage III (Cr baseline ~1.4)", "Hyperlipidemia", "Atrial fibrillation"], meds: ["Entresto 24-26 mg PO BID", "Carvedilol 12.5 mg PO BID", "Furosemide 40 mg PO daily (NOT TAKING)", "Apixaban 5 mg PO BID", "Metformin 1000 mg PO BID", "Atorvastatin 40 mg PO daily", "Spironolactone 25 mg PO daily", "Empagliflozin 10 mg PO daily"], exam: { vitals: "T 98.4 | HR 88 | BP 142/86 | RR 22 | SpO2 93% RA", cv: "Irregular, S3, no m/r/g", pulm: "Bilateral basilar crackles", ext: "3+ pitting edema BLE", neuro: "A&O x4" }, assessment: "ADHF exacerbation likely 2/2 furosemide non-adherence and dietary indiscretion.", plan: ["IV furosemide 40mg BID, I&O, daily weights, 1.5L fluid restrict", "Hold Entresto until euvolemic", "Continue apixaban", "Hold metformin (AKI)", "BMP daily"] },
    labs: { "04/03 0500": { Na: "138", K: "4.1", BUN: ["32", "H"], SCr: ["1.6", "H"], Glucose: ["142", "H"], Mg: "2.0", BNP: ["1840", "H"], WBC: "7.2", Hgb: ["11.8", "L"], Plt: "198" }, "04/02 0500": { Na: "136", K: "4.4", BUN: ["38", "H"], SCr: ["1.8", "H"], Glucose: ["168", "H"], BNP: ["2450", "H"], WBC: "8.1", Hgb: "12.0", Plt: "205" } },
    notes: [{ dt: "04/03 0800", author: "Smith, Robert J, MD", type: "Progress Note", text: "S: Improved breathing overnight. Good UOP.\nO: Wt 74.2kg (down 2.1). I/O -1800mL. Crackles improved. LE edema 2+.\nA/P: ADHF improving. Continue furosemide 40mg IV BID." }, { dt: "04/02 1430", author: "Saunders, Luke, PharmD", type: "Pharmacy Note", text: "Renal: SCr 1.6 (baseline 1.4), CrCl ~38. Metformin held.\nAnticoag: Apixaban 5mg BID appropriate.\nDiuresis: Net -1.2L first 12h. Adequate.\nEntresto held appropriately." }],
    inpatientMeds: [{ drug: "Furosemide", dose: "40 mg", route: "IV", freq: "Q12H", sched: ["0600", "1800"], status: "Active" }, { drug: "Carvedilol", dose: "12.5 mg", route: "PO", freq: "BID", sched: ["0900", "2100"], status: "Active" }, { drug: "Apixaban", dose: "5 mg", route: "PO", freq: "BID", sched: ["0900", "2100"], status: "Active" }, { drug: "Atorvastatin", dose: "40 mg", route: "PO", freq: "QHS", sched: ["2100"], status: "Active" }, { drug: "Spironolactone", dose: "25 mg", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" }, { drug: "Empagliflozin", dose: "10 mg", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" }, { drug: "Entresto", dose: "24-26 mg", route: "PO", freq: "BID", sched: ["0900", "2100"], status: "Held" }, { drug: "KCl", dose: "20 mEq", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" }],
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
    }
  },
  P002: {
    name: "MARTINEZ, CARLOS R",
    mrn: "00198432",
    dob: "08/22/1978",
    age: "47M",
    weight: "95 kg",
    height: "178 cm",
    allergies: ["NKDA"],
    room: "3N-308B",
    admitDate: "04/02/2026",
    attending: "Patel, Anita, MD",
    dx: "Community-acquired pneumonia (J18.9)",
    code: "Full",
    hp: { cc: "Fever, productive cough, pleuritic chest pain x 3 days", hpi: "47 y/o M with 3 days of fever (Tmax 103.2), productive cough with yellow-green sputum, R-sided pleuritic CP. Former 1 PPD x 20yr smoker, quit 2 yrs ago.", pmh: ["COPD (moderate)", "HTN", "GERD"], meds: ["Tiotropium 18 mcg INH daily", "Lisinopril 20 mg PO daily", "Omeprazole 20 mg PO daily", "Albuterol PRN"], exam: { vitals: "T 101.8 | HR 102 | BP 118/72 | RR 24 | SpO2 91% 2L NC", cv: "Tachycardic, regular, no m/r/g", pulm: "Diminished BS RLL, crackles RML/RLL, egophony R base", ext: "No edema", neuro: "A&O x4" }, assessment: "CAP with RLL consolidation. CURB-65 = 1.", plan: ["Ceftriaxone 1g IV daily + azithromycin 500mg IV daily", "Blood cx x2, sputum cx, Legionella/pneumococcal Ag", "O2 to SpO2 >92%", "DVT ppx: enoxaparin 40mg SQ daily"] },
    labs: { "04/03 0500": { Na: "140", K: "3.8", BUN: "18", SCr: "1.0", Glucose: "112", WBC: ["15.8", "H"], Hgb: "14.2", Plt: "312", Lactate: "1.4", Procalcitonin: ["2.8", "H"] }, "04/02 1200": { Na: "139", K: "3.9", SCr: "0.9", WBC: ["18.2", "H"], Lactate: ["2.1", "H"], Procalcitonin: ["4.1", "H"] } },
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
    }
  },
  P003: {
    name: "JOHNSON, MARIE L",
    mrn: "00312567",
    dob: "11/03/1945",
    age: "80F",
    weight: "58 kg",
    height: "157 cm",
    allergies: ["Vancomycin (Red Man Syndrome)", "Codeine (Nausea)"],
    room: "5S-518A",
    admitDate: "04/02/2026",
    attending: "Chen, William, MD",
    dx: "Acute pyelonephritis (N10)",
    code: "Full",
    hp: { cc: "Fever, dysuria, flank pain x 2 days", hpi: "80 y/o F with recurrent UTIs, T2DM, CKD IV presents with 2 days of dysuria, frequency, L flank pain. Fever to 102.1. Foul-smelling urine. Last UTI 2 months ago (nitrofurantoin).", pmh: ["Recurrent UTIs", "T2DM (A1c 7.8)", "CKD Stage IV (baseline Cr 2.2)", "Osteoporosis", "HTN", "Hypothyroidism"], meds: ["Glipizide 5 mg PO BID", "Amlodipine 5 mg PO daily", "Levothyroxine 75 mcg PO daily", "Ca/Vit D 600/400 PO BID", "Alendronate 70 mg PO weekly"], exam: { vitals: "T 102.4 | HR 96 | BP 108/62 | RR 20 | SpO2 96% RA", cv: "RRR, no m/r/g", pulm: "CTAB", ext: "No edema", neuro: "A&O x4, fatigued" }, assessment: "Acute pyelonephritis in elderly CKD IV patient. Renal-dose antibiotics.", plan: ["Ceftriaxone 1g IV daily", "Blood cx x2, urine cx", "NS 75 mL/hr (monitor volume)", "Hold glipizide", "Renal consult if Cr worsens"] },
    labs: { "04/03 0500": { Na: "141", K: ["5.2", "H"], BUN: ["48", "H"], SCr: ["2.8", "H"], Glucose: "92", WBC: ["14.1", "H"], Hgb: ["10.2", "L"], Plt: "188", UA: "LE+++ Nit+ WBC>100" }, "04/02 1400": { Na: "140", K: ["5.4", "H"], BUN: ["52", "H"], SCr: ["3.1", "H"], WBC: ["16.5", "H"], Hgb: ["10.0", "L"], Lactate: "1.8" } },
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
    }
  },
  P004: {
    name: "TAYLOR, MARCUS D",
    mrn: "00415823",
    dob: "06/12/1991",
    age: "34M",
    weight: "81 kg",
    height: "180 cm",
    allergies: ["NKDA"],
    room: "2N-215B",
    admitDate: "04/03/2026",
    attending: "Rivera, Sofia, MD",
    dx: "Secondary syphilis (A51.39)",
    code: "Full",
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
    }
  }
};
const DEMO_ORDERS = [
  {
    id: "ORD001",
    patientId: "P001",
    orderId: "102635955",
    isNew: true,
    priority: "Routine",
    timePending: "4h 12m",
    drugName: "sacubitril-valsartan (ENTRESTO) 24-26 MG tablet",
    orderLine: "1 tablet, Oral, BID, First dose 4/2/26 0000, Until D/C",
    alerts: [],
    clinical: { dose: "1 tablet", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0000", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["0000", "0900", "2100"] }, { date: "4/3/2026", times: ["0900", "2100"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Lama, Alejandro T, MD",
    orderedDt: "4/1/2026 2355",
    product: { name: "SACUBITRIL-VALSARTAN 24-26 MG TABS", pkg: "60ct Bottle (0078-0659-20)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=000dc81d-ab91-450c-8eae-8eb74e72296f&name=ENTRESTO-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Entresto is appropriately held during acute decompensation. The order to hold is correct — verifying acknowledges the hold and ensures it stays on the MAR for resumption when the patient is euvolemic. The alerts are informational, not reasons to reject." }
  },
  {
    id: "ORD002",
    patientId: "P001",
    orderId: "102635980",
    isNew: true,
    priority: "Routine",
    timePending: "2h 45m",
    drugName: "furosemide 40 MG injection",
    orderLine: "40 mg, IV Push, Q12H, First dose 4/2/26 0600, Until D/C",
    alerts: [],
    clinical: { dose: "40 mg", route: "IV Push", freq: "Every 12 hours", duration: "2 min", rate: "", volume: "4 mL", priority: "Routine", start: "4/2/2026 0600", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["0600", "1800"] }, { date: "4/3/2026", times: ["0600", "1800"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/2/2026 0545",
    product: { name: "FUROSEMIDE 10 MG/ML INJ 4ML", pkg: "4 mL Vial (0409-1273-12)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=1b9117d5-0dd9-4577-a1fd-bb0aaf7e68ec&name=furosemide-cart-a.jpg" },
    teaching: { correctAction: "verify", explanation: "Furosemide is a sulfonamide diuretic but has very low cross-reactivity with sulfa antibiotics. The patient's sulfa allergy (anaphylaxis) warrants documentation and monitoring, but furosemide is safe to administer. The DTA alert is appropriate to acknowledge, not a reason to reject. Dose of 40 mg IV Q12H is appropriate for ADHF." }
  },
  {
    id: "ORD003",
    patientId: "P002",
    orderId: "102636100",
    isNew: true,
    priority: "Routine",
    timePending: "1h 30m",
    drugName: "ceftriaxone 1 GM IVPB",
    orderLine: "1 g, IVPB, Daily, First dose 4/2/26 1400",
    alerts: [],
    clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Routine", start: "4/2/2026 1400", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }],
    dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Patel, Anita, MD",
    orderedDt: "4/2/2026 1330",
    product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Ceftriaxone 1g IV daily is guideline-concordant empiric therapy for community-acquired pneumonia (CAP) per ATS/IDSA guidelines, used in combination with a macrolide. No renal adjustment needed. Patient has NKDA. This is a straightforward verification." }
  },
  {
    id: "ORD004",
    patientId: "P002",
    orderId: "102636105",
    isNew: true,
    priority: "Routine",
    timePending: "1h 30m",
    drugName: "azithromycin 500 MG IVPB",
    orderLine: "500 mg, IVPB, Daily, First dose 4/2/26 1400",
    alerts: [],
    clinical: { dose: "500 mg", route: "IVPB", freq: "Daily", duration: "60 min", rate: "", volume: "250 mL NS", priority: "Routine", start: "4/2/2026 1400", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }],
    dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: false },
    orderedBy: "Patel, Anita, MD",
    orderedDt: "4/2/2026 1330",
    product: { name: "AZITHROMYCIN 500MG/NS 250ML IVPB", pkg: "250 mL Premix (0338-9549-03)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=a81212ef-76b6-4bd7-8706-3d2b05ee34f9&name=lbl636298251.jpg" },
    teaching: { correctAction: "verify", explanation: "Azithromycin 500 mg IV daily provides atypical coverage as part of CAP combination therapy with ceftriaxone. The QTc monitoring alert is informational — azithromycin has modest QTc prolongation risk. Appropriate to verify and ensure QTc is monitored." }
  },
  {
    id: "ORD005",
    patientId: "P003",
    orderId: "102636200",
    isNew: true,
    priority: "Stat",
    timePending: "32m",
    drugName: "ceftriaxone 1 GM IVPB",
    orderLine: "1 g, IVPB, Daily, Stat, First dose 4/2/26 1400",
    alerts: [],
    clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Stat", start: "4/2/2026 1400", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/2/2026 1400",
    product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Ceftriaxone does NOT require renal dose adjustment — it is primarily hepatically eliminated with ~40% biliary excretion. The renal dosing alert fires because of the patient's CKD IV (SCr 2.8), but no adjustment is needed. The K+ 5.2 alert is for monitoring, not a contraindication. Ceftriaxone 1g IV daily is appropriate for pyelonephritis." }
  },
  {
    id: "ORD006",
    patientId: "P003",
    orderId: "102636210",
    isNew: true,
    priority: "Routine",
    timePending: "28m",
    drugName: "sodium chloride 0.9% infusion",
    orderLine: "75 mL/hr, IV, Continuous",
    alerts: [],
    clinical: { dose: "75 mL/hr", route: "IV", freq: "Continuous", duration: "", rate: "75 mL/hr", volume: "1000 mL", priority: "Routine", start: "4/2/2026 1400", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["1400-cont"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "Floor Stock", code: "Floor Stock", triggered: false },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/2/2026 1405",
    product: { name: "NaCl 0.9% 1000ML BAG", pkg: "1000 mL (0338-0049-04)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=259f8ef4-96ac-7213-e063-6394a90adb71&name=1000+ML+BAG+LABEL+2+Screen+Shot+2024-10-29+at+5.50.40+PM.jpg" },
    teaching: { correctAction: "verify", explanation: "Conservative IV fluid resuscitation at 75 mL/hr is appropriate for this patient with pyelonephritis and mild sepsis. The CKD IV volume status alert is a monitoring reminder, not a contraindication. Close I&O monitoring is warranted, but the rate is reasonable." }
  },
  {
    id: "ORD007",
    patientId: "P004",
    orderId: "102636350",
    isNew: true,
    priority: "Stat",
    timePending: "15m",
    drugName: "penicillin G benzathine/procaine (BICILLIN C-R) 1.2 MU/DOSE IM syringe",
    orderLine: "2.4 million units, IM, Once, Stat",
    alerts: [],
    clinical: { dose: "2.4 million units", route: "IM", freq: "Once", duration: "", rate: "", volume: "4 mL (2 injection sites)", priority: "Stat", start: "4/3/2026 1100", stop: "4/3/2026 1100" },
    schedule: [{ date: "4/3/2026", times: ["1100"] }],
    dispense: { from: "SGA 2 NORTH (2NAO)", firstDose: "SGA 2 NORTH (2NAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Rivera, Sofia, MD",
    orderedDt: "4/3/2026 1045",
    product: { name: "BICILLIN C-R 1.2MU/2ML SYRINGE", pkg: "2 mL Prefilled Syringe (60793-0620-10)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=ba7b9199-4710-4189-a85d-77ed75befe4d&name=bicillin-01.jpg" },
    teaching: {
      correctAction: "reject",
      explanation: "This order MUST be rejected. Bicillin C-R (benzathine/procaine penicillin combination) was ordered, but the patient has secondary syphilis. Per CDC STI Treatment Guidelines, the correct treatment is Bicillin L-A (benzathine penicillin G ONLY) 2.4 million units IM x1. Bicillin C-R does NOT provide adequate sustained bactericidal levels for treponema pallidum. ISMP has identified Bicillin C-R and Bicillin L-A as frequently confused LASA products — this is a classic and dangerous medication error.",
      rejectReasons: [
        { id: "r1", text: "LASA error: Bicillin C-R ordered instead of Bicillin L-A — wrong product for this indication", correct: true },
        { id: "r2", text: "Indication mismatch: Bicillin C-R is NOT recommended for syphilis treatment per CDC guidelines", correct: true },
        { id: "r3", text: "ISMP high-alert: Bicillin C-R/L-A are frequently confused look-alike/sound-alike products", correct: true },
        { id: "r4", text: "Dose too high for patient weight", correct: false },
        { id: "r5", text: "Route of administration is incorrect (should be IV, not IM)", correct: false },
        { id: "r6", text: "Drug-allergy interaction identified", correct: false }
      ]
    }
  }
];
const EASY_ORDERS = [
  {
    id: "E001",
    patientId: "P001",
    orderId: "102637001",
    isNew: true,
    priority: "Routine",
    timePending: "3h 10m",
    drugName: "sulfamethoxazole-trimethoprim (BACTRIM DS) 800-160 MG tablet",
    orderLine: "1 tablet, Oral, BID, First dose 4/3/26 0900",
    alerts: [],
    clinical: { dose: "1 tablet", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "" },
    schedule: [{ date: "4/3/2026", times: ["0900", "2100"] }, { date: "4/4/2026", times: ["0900", "2100"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/3/2026 0830",
    product: { name: "SMZ-TMP DS 800-160 MG TABS", pkg: "100ct Bottle (0093-0105-01)" },
    teaching: {
      correctAction: "reject",
      hint: "Review the patient's allergy list carefully.",
      explanation: "Patient has a documented SULFA ALLERGY with history of ANAPHYLAXIS. Sulfamethoxazole-trimethoprim (Bactrim) is a sulfonamide antibiotic and is absolutely contraindicated. This is a direct drug-allergy interaction that could be fatal.",
      rejectReasons: [
        { id: "r1", text: "Drug-allergy interaction: patient has documented sulfa allergy (anaphylaxis)", correct: true },
        { id: "r2", text: "Sulfonamide antibiotic contraindicated with sulfa anaphylaxis history", correct: true },
        { id: "r3", text: "Dose is too high for renal function", correct: false },
        { id: "r4", text: "Wrong route of administration", correct: false },
        { id: "r5", text: "Duplicate therapy with existing antibiotic", correct: false }
      ]
    }
  },
  {
    id: "E002",
    patientId: "P001",
    orderId: "102637002",
    isNew: true,
    priority: "Routine",
    timePending: "2h 50m",
    drugName: "metformin HCl 1000 MG tablet",
    orderLine: "1000 mg, Oral, BID, First dose 4/3/26 0900",
    alerts: [],
    clinical: { dose: "1000 mg", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "" },
    schedule: [{ date: "4/3/2026", times: ["0900", "2100"] }, { date: "4/4/2026", times: ["0900", "2100"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/3/2026 0835",
    product: { name: "METFORMIN HCL 1000 MG TABS", pkg: "100ct Bottle (0093-7214-01)" },
    teaching: {
      correctAction: "reject",
      hint: "Check the patient's renal function and current clinical status.",
      explanation: "Metformin is contraindicated during acute kidney injury (SCr 1.6, rising from baseline 1.4, eGFR declining). The patient's treatment plan explicitly states 'Hold metformin (AKI).' Metformin accumulation in renal impairment can cause life-threatening lactic acidosis.",
      rejectReasons: [
        { id: "r1", text: "Contraindicated in acute kidney injury — risk of lactic acidosis", correct: true },
        { id: "r2", text: "Patient's treatment plan explicitly states to hold metformin", correct: true },
        { id: "r3", text: "SCr elevated above baseline with declining eGFR", correct: true },
        { id: "r4", text: "Drug-allergy interaction", correct: false },
        { id: "r5", text: "Dose exceeds maximum daily dose", correct: false }
      ]
    }
  },
  {
    id: "E003",
    patientId: "P002",
    orderId: "102637003",
    isNew: true,
    priority: "Routine",
    timePending: "1h 45m",
    drugName: "gentamicin 350 MG IVPB",
    orderLine: "350 mg, IVPB, Q24H, First dose 4/3/26 1400",
    alerts: [],
    clinical: { dose: "350 mg", route: "IVPB", freq: "Every 24 hours", duration: "60 min", rate: "", volume: "100 mL NS", priority: "Routine", start: "4/3/2026 1400", stop: "" },
    schedule: [{ date: "4/3/2026", times: ["1400"] }, { date: "4/4/2026", times: ["1400"] }],
    dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Patel, Anita, MD",
    orderedDt: "4/3/2026 1300",
    product: { name: "GENTAMICIN 40MG/ML INJ", pkg: "2 mL Vial (0409-1207-02)" },
    teaching: {
      correctAction: "reject",
      hint: "Is this the right antibiotic class for this diagnosis?",
      explanation: "Aminoglycosides (gentamicin) are NOT guideline-recommended empiric therapy for community-acquired pneumonia per ATS/IDSA guidelines. Standard CAP therapy is a beta-lactam (ceftriaxone) plus a macrolide (azithromycin) or a respiratory fluoroquinolone. Gentamicin has no role in CAP treatment and carries unnecessary nephro/ototoxicity risk.",
      rejectReasons: [
        { id: "r1", text: "Aminoglycosides are not guideline-recommended for CAP (ATS/IDSA)", correct: true },
        { id: "r2", text: "Unnecessary nephrotoxicity and ototoxicity risk", correct: true },
        { id: "r3", text: "Patient has a gentamicin allergy", correct: false },
        { id: "r4", text: "Dose is too low for extended-interval dosing", correct: false },
        { id: "r5", text: "Route should be IM, not IV", correct: false }
      ]
    }
  },
  {
    id: "E004",
    patientId: "P003",
    orderId: "102637004",
    isNew: true,
    priority: "Routine",
    timePending: "1h 20m",
    drugName: "potassium chloride 40 MEQ tablet ER",
    orderLine: "40 mEq, Oral, Daily, First dose 4/3/26 0900",
    alerts: [],
    clinical: { dose: "40 mEq", route: "Oral", freq: "Daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "" },
    schedule: [{ date: "4/3/2026", times: ["0900"] }, { date: "4/4/2026", times: ["0900"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/3/2026 0845",
    product: { name: "KCL ER 20 MEQ TABS", pkg: "100ct Bottle (0074-7099-13)" },
    teaching: {
      correctAction: "reject",
      hint: "Check the patient's most recent potassium level.",
      explanation: "Patient's K+ is already 5.2 mEq/L (HIGH) with CKD Stage IV. Supplementing potassium in a hyperkalemic patient is extremely dangerous and can cause fatal cardiac arrhythmias. Potassium should be held and the existing hyperkalemia should be managed.",
      rejectReasons: [
        { id: "r1", text: "Patient is already hyperkalemic (K+ 5.2) — supplementation is dangerous", correct: true },
        { id: "r2", text: "CKD IV impairs potassium excretion, increasing hyperkalemia risk", correct: true },
        { id: "r3", text: "Risk of fatal cardiac arrhythmias with potassium supplementation in hyperkalemia", correct: true },
        { id: "r4", text: "Dose exceeds maximum single dose", correct: false },
        { id: "r5", text: "Extended-release formulation is not available", correct: false }
      ]
    }
  },
  {
    id: "E005",
    patientId: "P003",
    orderId: "102637005",
    isNew: true,
    priority: "Routine",
    timePending: "55m",
    drugName: "nitrofurantoin monohydrate (MACROBID) 100 MG capsule",
    orderLine: "100 mg, Oral, BID x 5 days",
    alerts: [],
    clinical: { dose: "100 mg", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "4/8/2026 2100" },
    schedule: [{ date: "4/3/2026", times: ["0900", "2100"] }, { date: "4/4/2026", times: ["0900", "2100"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/3/2026 0850",
    product: { name: "NITROFURANTOIN 100 MG CAPS", pkg: "100ct Bottle (0149-0710-01)" },
    teaching: {
      correctAction: "reject",
      hint: "Can this antibiotic be used with this level of renal function?",
      explanation: "Nitrofurantoin is CONTRAINDICATED when CrCl < 30 mL/min. This patient has CKD Stage IV (SCr 2.8, estimated CrCl ~15-18 mL/min). Nitrofurantoin cannot achieve adequate urinary drug concentrations at low GFR and also carries increased risk of peripheral neuropathy and pulmonary toxicity in severe renal impairment.",
      rejectReasons: [
        { id: "r1", text: "Contraindicated when CrCl < 30 mL/min — patient's estimated CrCl is ~15-18", correct: true },
        { id: "r2", text: "Inadequate urinary drug concentration at low GFR — will be ineffective", correct: true },
        { id: "r3", text: "Increased risk of peripheral neuropathy in severe renal impairment", correct: true },
        { id: "r4", text: "Drug-allergy interaction identified", correct: false },
        { id: "r5", text: "Nitrofurantoin is not effective against E. coli", correct: false }
      ]
    }
  },
  {
    id: "E006",
    patientId: "P001",
    orderId: "102637006",
    isNew: true,
    priority: "Routine",
    timePending: "40m",
    drugName: "levofloxacin 750 MG IVPB",
    orderLine: "750 mg, IVPB, Daily, First dose 4/3/26 1400",
    alerts: [],
    clinical: { dose: "750 mg", route: "IVPB", freq: "Daily", duration: "90 min", rate: "", volume: "150 mL D5W", priority: "Routine", start: "4/3/2026 1400", stop: "" },
    schedule: [{ date: "4/3/2026", times: ["1400"] }, { date: "4/4/2026", times: ["1400"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/3/2026 1330",
    product: { name: "LEVOFLOXACIN 750MG/150ML IVPB", pkg: "150 mL Premix (0409-3480-64)" },
    teaching: {
      correctAction: "reject",
      hint: "Review the patient's EKG intervals and cardiac history.",
      explanation: "Patient has a QTc of 498 ms (prolonged) with atrial fibrillation. Levofloxacin (fluoroquinolone) carries significant QTc prolongation risk. The combination of existing QTc prolongation + AFib + fluoroquinolone significantly increases risk of torsades de pointes. This order should be rejected and an alternative antibiotic without QTc risk should be selected.",
      rejectReasons: [
        { id: "r1", text: "QTc prolongation risk: patient's QTc is already 498 ms (prolonged)", correct: true },
        { id: "r2", text: "Fluoroquinolones further prolong QTc — risk of torsades de pointes", correct: true },
        { id: "r3", text: "Patient has underlying atrial fibrillation increasing arrhythmia risk", correct: true },
        { id: "r4", text: "Dose needs renal adjustment for CKD", correct: false },
        { id: "r5", text: "Levofloxacin is not available as an IV formulation", correct: false }
      ]
    }
  },
  {
    id: "E007",
    patientId: "P004",
    orderId: "102637007",
    isNew: true,
    priority: "Stat",
    timePending: "15m",
    drugName: "penicillin G benzathine/procaine (BICILLIN C-R) 1.2 MU/DOSE IM syringe",
    orderLine: "2.4 million units, IM, Once, Stat",
    alerts: [],
    clinical: { dose: "2.4 million units", route: "IM", freq: "Once", duration: "", rate: "", volume: "4 mL (2 injection sites)", priority: "Stat", start: "4/3/2026 1100", stop: "4/3/2026 1100" },
    schedule: [{ date: "4/3/2026", times: ["1100"] }],
    dispense: { from: "SGA 2 NORTH (2NAO)", firstDose: "SGA 2 NORTH (2NAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Rivera, Sofia, MD",
    orderedDt: "4/3/2026 1045",
    product: { name: "BICILLIN C-R 1.2MU/2ML SYRINGE", pkg: "2 mL Prefilled Syringe (60793-0620-10)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=ba7b9199-4710-4189-a85d-77ed75befe4d&name=bicillin-01.jpg" },
    teaching: {
      correctAction: "reject",
      hint: "Look carefully at the exact product name — is it the right formulation?",
      explanation: "Bicillin C-R (benzathine/procaine penicillin combination) was ordered, but the patient has secondary syphilis. Per CDC guidelines, the correct treatment is Bicillin L-A (benzathine penicillin G ONLY). Bicillin C-R does NOT provide adequate sustained levels for syphilis. This is a classic LASA (look-alike/sound-alike) medication error.",
      rejectReasons: [
        { id: "r1", text: "LASA error: Bicillin C-R ordered instead of Bicillin L-A", correct: true },
        { id: "r2", text: "Bicillin C-R is NOT recommended for syphilis per CDC guidelines", correct: true },
        { id: "r3", text: "ISMP high-alert: frequently confused look-alike/sound-alike products", correct: true },
        { id: "r4", text: "Dose too high for patient weight", correct: false },
        { id: "r5", text: "Route should be IV, not IM", correct: false },
        { id: "r6", text: "Drug-allergy interaction identified", correct: false }
      ]
    }
  }
];
const MEDIUM_ORDERS = [
  {
    id: "M001",
    patientId: "P001",
    orderId: "102638001",
    isNew: true,
    priority: "Routine",
    timePending: "4h 12m",
    drugName: "sacubitril-valsartan (ENTRESTO) 24-26 MG tablet",
    orderLine: "1 tablet, Oral, BID, First dose 4/2/26 0000, Until D/C",
    alerts: [],
    clinical: { dose: "1 tablet", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0000", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["0000", "0900", "2100"] }, { date: "4/3/2026", times: ["0900", "2100"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Lama, Alejandro T, MD",
    orderedDt: "4/1/2026 2355",
    product: { name: "SACUBITRIL-VALSARTAN 24-26 MG TABS", pkg: "60ct Bottle (0078-0659-20)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=000dc81d-ab91-450c-8eae-8eb74e72296f&name=ENTRESTO-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Entresto is appropriately held during acute decompensation. Verifying acknowledges the hold and ensures it stays on the MAR for resumption when euvolemic." }
  },
  {
    id: "M002",
    patientId: "P001",
    orderId: "102638002",
    isNew: true,
    priority: "Routine",
    timePending: "2h 45m",
    drugName: "furosemide 40 MG injection",
    orderLine: "40 mg, IV Push, Q12H, First dose 4/2/26 0600, Until D/C",
    alerts: [],
    clinical: { dose: "40 mg", route: "IV Push", freq: "Every 12 hours", duration: "2 min", rate: "", volume: "4 mL", priority: "Routine", start: "4/2/2026 0600", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["0600", "1800"] }, { date: "4/3/2026", times: ["0600", "1800"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/2/2026 0545",
    product: { name: "FUROSEMIDE 10 MG/ML INJ 4ML", pkg: "4 mL Vial (0409-1273-12)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=1b9117d5-0dd9-4577-a1fd-bb0aaf7e68ec&name=furosemide-cart-a.jpg" },
    teaching: { correctAction: "verify", explanation: "Furosemide is a sulfonamide diuretic but has very low cross-reactivity with sulfa antibiotics. Dose of 40 mg IV Q12H is appropriate for ADHF." }
  },
  {
    id: "M003",
    patientId: "P001",
    orderId: "102638003",
    isNew: true,
    priority: "Routine",
    timePending: "2h 30m",
    drugName: "lisinopril 10 MG tablet",
    orderLine: "10 mg, Oral, Daily, First dose 4/3/26 0900",
    alerts: [],
    clinical: { dose: "10 mg", route: "Oral", freq: "Daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0900", stop: "" },
    schedule: [{ date: "4/3/2026", times: ["0900"] }, { date: "4/4/2026", times: ["0900"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Lama, Alejandro T, MD",
    orderedDt: "4/3/2026 0830",
    product: { name: "LISINOPRIL 10 MG TABS", pkg: "100ct Bottle (0093-1040-01)" },
    teaching: {
      correctAction: "reject",
      explanation: "ACE inhibitor (lisinopril) ordered for a patient already on sacubitril/valsartan (Entresto), an ARNI. Concurrent ACE + ARNI is CONTRAINDICATED due to significantly increased risk of angioedema. A minimum 36-hour washout is required when switching between these agents. The Entresto is currently held but still on the MAR.",
      rejectReasons: [
        { id: "r1", text: "ACE inhibitor + ARNI (Entresto) is contraindicated — angioedema risk", correct: true },
        { id: "r2", text: "Requires 36-hour washout period between ACE inhibitor and ARNI", correct: true },
        { id: "r3", text: "Entresto is still on the MAR (held status) — dual RAAS blockade", correct: true },
        { id: "r4", text: "Lisinopril dose is too high", correct: false },
        { id: "r5", text: "ACE inhibitors are contraindicated in heart failure", correct: false }
      ]
    }
  },
  {
    id: "M004",
    patientId: "P002",
    orderId: "102638004",
    isNew: true,
    priority: "Routine",
    timePending: "1h 30m",
    drugName: "ceftriaxone 1 GM IVPB",
    orderLine: "1 g, IVPB, Daily, First dose 4/2/26 1400",
    alerts: [],
    clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Routine", start: "4/2/2026 1400", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }],
    dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Patel, Anita, MD",
    orderedDt: "4/2/2026 1330",
    product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Ceftriaxone 1g IV daily is guideline-concordant empiric therapy for CAP per ATS/IDSA guidelines. No renal adjustment needed. Patient has NKDA." }
  },
  {
    id: "M005",
    patientId: "P003",
    orderId: "102638005",
    isNew: true,
    priority: "Stat",
    timePending: "32m",
    drugName: "ceftriaxone 1 GM IVPB",
    orderLine: "1 g, IVPB, Daily, Stat, First dose 4/2/26 1400",
    alerts: [],
    clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Stat", start: "4/2/2026 1400", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/2/2026 1400",
    product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", explanation: "Ceftriaxone does NOT require renal dose adjustment — it is primarily hepatically eliminated. Ceftriaxone 1g IV daily is appropriate for pyelonephritis." }
  },
  {
    id: "M006",
    patientId: "P003",
    orderId: "102638006",
    isNew: true,
    priority: "Routine",
    timePending: "25m",
    drugName: "vancomycin 1000 MG IVPB",
    orderLine: "1000 mg, IVPB, Q12H, First dose 4/3/26 0900",
    alerts: [],
    clinical: { dose: "1000 mg", route: "IVPB", freq: "Every 12 hours", duration: "90 min", rate: "", volume: "250 mL NS", priority: "Routine", start: "4/3/2026 0900", stop: "" },
    schedule: [{ date: "4/3/2026", times: ["0900", "2100"] }, { date: "4/4/2026", times: ["0900", "2100"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/3/2026 0840",
    product: { name: "VANCOMYCIN 1GM/250ML IVPB", pkg: "250 mL Premix (0338-3550-48)" },
    teaching: {
      correctAction: "reject",
      explanation: "Patient has a documented vancomycin reaction (Red Man Syndrome) AND the dose needs renal adjustment for CKD IV (SCr 2.8, CrCl ~15-18). This order should be rejected: it requires premedication with diphenhydramine 25-50 mg, a reduced infusion rate (over 2 hours minimum), and a renally-adjusted dose before it can be safely administered. The order needs to be rewritten with these modifications.",
      rejectReasons: [
        { id: "r1", text: "Patient has documented vancomycin reaction (Red Man Syndrome) — needs premedication protocol", correct: true },
        { id: "r2", text: "Dose needs renal adjustment for CKD IV (SCr 2.8, CrCl ~15-18)", correct: true },
        { id: "r3", text: "Infusion rate needs to be extended to prevent recurrent RMS", correct: true },
        { id: "r4", text: "Vancomycin is absolutely contraindicated with any prior reaction", correct: false },
        { id: "r5", text: "Patient has a true IgE-mediated vancomycin allergy", correct: false }
      ]
    }
  },
  {
    id: "M007",
    patientId: "P003",
    orderId: "102638007",
    isNew: true,
    priority: "Routine",
    timePending: "20m",
    drugName: "calcium carbonate 1250 MG tablet",
    orderLine: "1250 mg, Oral, TID with meals",
    alerts: [],
    clinical: { dose: "1250 mg (500 mg elemental Ca)", route: "Oral", freq: "3 times daily with meals", duration: "", rate: "", volume: "", priority: "Routine", start: "4/3/2026 0800", stop: "" },
    schedule: [{ date: "4/3/2026", times: ["0800", "1200", "1800"] }, { date: "4/4/2026", times: ["0800", "1200", "1800"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: false },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/3/2026 0845",
    product: { name: "CALCIUM CARBONATE 1250 MG TABS", pkg: "100ct Bottle (0904-5770-60)" },
    teaching: {
      correctAction: "reject",
      explanation: "Drug interaction: Calcium significantly reduces absorption of levothyroxine (patient takes levothyroxine 75 mcg at 0600). The 0800 calcium dose is only 2 hours after levothyroxine — must be separated by at least 4 hours. This order should be rejected so the prescriber can reorder with corrected timing (calcium no earlier than 1000).",
      rejectReasons: [
        { id: "r1", text: "Drug interaction: calcium reduces levothyroxine absorption — timing conflict at 0800", correct: true },
        { id: "r2", text: "Need at least 4-hour separation between levothyroxine and calcium", correct: true },
        { id: "r3", text: "Calcium carbonate is contraindicated in CKD", correct: false },
        { id: "r4", text: "Dose of elemental calcium exceeds daily maximum", correct: false },
        { id: "r5", text: "Patient has a calcium allergy", correct: false }
      ]
    }
  },
  {
    id: "M008",
    patientId: "P001",
    orderId: "102638008",
    isNew: true,
    priority: "Routine",
    timePending: "3h 00m",
    drugName: "spironolactone 25 MG tablet",
    orderLine: "25 mg, Oral, Daily, First dose 4/2/26 0900",
    alerts: [],
    clinical: { dose: "25 mg", route: "Oral", freq: "Daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0900", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["0900"] }, { date: "4/3/2026", times: ["0900"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/2/2026 0540",
    product: { name: "SPIRONOLACTONE 25 MG TABS", pkg: "100ct Bottle (0093-0442-01)" },
    teaching: { correctAction: "verify", explanation: "Spironolactone 25 mg daily is appropriate for HFrEF with mortality benefit per RALES trial. K+ is 4.1, which is within safe range. Renal function requires monitoring but is not a contraindication at this level." }
  },
  {
    id: "M009",
    patientId: "P004",
    orderId: "102638009",
    isNew: true,
    priority: "Stat",
    timePending: "15m",
    drugName: "penicillin G benzathine/procaine (BICILLIN C-R) 1.2 MU/DOSE IM syringe",
    orderLine: "2.4 million units, IM, Once, Stat",
    alerts: [],
    clinical: { dose: "2.4 million units", route: "IM", freq: "Once", duration: "", rate: "", volume: "4 mL (2 injection sites)", priority: "Stat", start: "4/3/2026 1100", stop: "4/3/2026 1100" },
    schedule: [{ date: "4/3/2026", times: ["1100"] }],
    dispense: { from: "SGA 2 NORTH (2NAO)", firstDose: "SGA 2 NORTH (2NAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Rivera, Sofia, MD",
    orderedDt: "4/3/2026 1045",
    product: { name: "BICILLIN C-R 1.2MU/2ML SYRINGE", pkg: "2 mL Prefilled Syringe (60793-0620-10)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=ba7b9199-4710-4189-a85d-77ed75befe4d&name=bicillin-01.jpg" },
    teaching: {
      correctAction: "reject",
      explanation: "Bicillin C-R (benzathine/procaine combination) was ordered instead of Bicillin L-A (benzathine only). For secondary syphilis, only Bicillin L-A provides adequate sustained levels per CDC guidelines. This is a dangerous LASA medication error.",
      rejectReasons: [
        { id: "r1", text: "LASA error: Bicillin C-R ordered instead of Bicillin L-A", correct: true },
        { id: "r2", text: "Bicillin C-R is NOT recommended for syphilis per CDC guidelines", correct: true },
        { id: "r3", text: "ISMP high-alert: frequently confused look-alike/sound-alike products", correct: true },
        { id: "r4", text: "Dose too high for patient weight", correct: false },
        { id: "r5", text: "Route should be IV, not IM", correct: false }
      ]
    }
  }
];
const HARD_ORDERS = [
  {
    id: "H001",
    patientId: "P001",
    orderId: "102639001",
    isNew: true,
    priority: "Routine",
    timePending: "2h 45m",
    drugName: "furosemide 40 MG injection",
    orderLine: "40 mg, IV Push, Q12H, First dose 4/2/26 0600, Until D/C",
    alerts: [],
    clinical: { dose: "40 mg", route: "IV Push", freq: "Every 12 hours", duration: "2 min", rate: "", volume: "4 mL", priority: "Routine", start: "4/2/2026 0600", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["0600", "1800"] }, { date: "4/3/2026", times: ["0600", "1800"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/2/2026 0545",
    product: { name: "FUROSEMIDE 10 MG/ML INJ 4ML", pkg: "4 mL Vial (0409-1273-12)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=1b9117d5-0dd9-4577-a1fd-bb0aaf7e68ec&name=furosemide-cart-a.jpg" },
    teaching: { correctAction: "message", detailedFeedback: {
      verify: { grade: "acceptable", message: "The dose is safe and within normal range. However, 40 mg IV matches the home PO dose 1:1. Since IV furosemide has ~2x bioavailability of PO, the effective dose is adequate but conservative. With significant volume overload (8 lb weight gain, 3+ edema, BNP 1840), many clinicians would start at 80 mg IV Q12H or use continuous infusion for more effective diuresis." },
      reject: { grade: "incorrect", message: "There is no safety concern requiring rejection. Furosemide 40 mg IV Q12H is a safe and appropriate order, even if the dose could be optimized." },
      message: { grade: "optimal", message: "Excellent clinical judgment. While the order is safe, messaging the prescriber about potential dose optimization (80 mg IV Q12H or continuous infusion) given the degree of volume overload (8 lb gain, BNP 1840, 3+ edema) demonstrates proactive pharmaceutical care. This is what distinguishes good from great pharmacy practice." }
    }, explanation: "Furosemide 40 mg IV Q12H is safe but may be suboptimal. The IV dose matches the home PO dose, but IV has ~2x bioavailability. Given severe volume overload, consider recommending dose escalation." }
  },
  {
    id: "H002",
    patientId: "P002",
    orderId: "102639002",
    isNew: true,
    priority: "Routine",
    timePending: "1h 30m",
    drugName: "azithromycin 500 MG IVPB",
    orderLine: "500 mg, IVPB, Daily, Day 3",
    alerts: [],
    clinical: { dose: "500 mg", route: "IVPB", freq: "Daily", duration: "60 min", rate: "", volume: "250 mL NS", priority: "Routine", start: "4/4/2026 1400", stop: "" },
    schedule: [{ date: "4/4/2026", times: ["1400"] }, { date: "4/5/2026", times: ["1400"] }],
    dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: false },
    orderedBy: "Patel, Anita, MD",
    orderedDt: "4/4/2026 1200",
    product: { name: "AZITHROMYCIN 500MG/NS 250ML IVPB", pkg: "250 mL Premix (0338-9549-03)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=a81212ef-76b6-4bd7-8706-3d2b05ee34f9&name=lbl636298251.jpg" },
    teaching: { correctAction: "message", detailedFeedback: {
      verify: { grade: "acceptable", message: "IV azithromycin is still effective and not harmful. However, the patient has been afebrile for >24 hours, WBC is trending down, and SpO2 improved. IV-to-PO switch criteria are met (functioning GI tract, clinical improvement, tolerating PO). Continuing IV when PO is appropriate increases cost, infection risk from IV line, and length of stay." },
      reject: { grade: "incorrect", message: "There is no reason to reject this order. Azithromycin 500 mg daily is appropriate for CAP. The clinical question is about IV-to-PO conversion, not safety." },
      message: { grade: "optimal", message: "Outstanding antimicrobial stewardship. The patient meets IV-to-PO switch criteria: afebrile >24h, WBC trending down (15.8 from 18.2), SpO2 improving, tolerating PO. Recommending conversion to azithromycin 500 mg PO reduces cost, IV line infection risk, and supports earlier discharge planning." }
    }, explanation: "Patient meets IV-to-PO conversion criteria (afebrile >24h, improving WBC, tolerating PO). IV azithromycin is safe but PO conversion represents better antimicrobial stewardship." }
  },
  {
    id: "H003",
    patientId: "P003",
    orderId: "102639003",
    isNew: true,
    priority: "Stat",
    timePending: "32m",
    drugName: "ceftriaxone 1 GM IVPB",
    orderLine: "1 g, IVPB, Daily, Stat, First dose 4/2/26 1400",
    alerts: [],
    clinical: { dose: "1 g", route: "IVPB", freq: "Daily", duration: "30 min", rate: "", volume: "50 mL NS", priority: "Stat", start: "4/2/2026 1400", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["1400"] }, { date: "4/3/2026", times: ["1400"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "SGA 5 SOUTH (5SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/2/2026 1400",
    product: { name: "CEFTRIAXONE 1GM/NS 50ML IVPB", pkg: "50 mL Premix (0338-3579-41)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=128bb292-d174-4769-b3e6-9f16617f31e3&name=ceftriax-add-v-hos-01.jpg" },
    teaching: { correctAction: "verify", detailedFeedback: {
      verify: { grade: "optimal", message: "Excellent. Ceftriaxone 1g IV daily is the best choice for this patient. It does not require renal adjustment (primarily hepatic elimination), provides appropriate coverage for pyelonephritis, and avoids the risks that alternatives would pose: ciprofloxacin needs renal dosing and TMP-SMX would worsen hyperkalemia (K+ 5.2). The patient's CKD IV and elevated potassium make ceftriaxone the safest effective option." },
      reject: { grade: "incorrect", message: "Ceftriaxone does not require renal dose adjustment. It is primarily hepatically eliminated with ~40% biliary excretion. The patient's CKD IV does not necessitate a dose change." },
      message: { grade: "acceptable", message: "Messaging to confirm the antibiotic choice is reasonable but unnecessary. Ceftriaxone is already the optimal empiric choice here. Alternative options (ciprofloxacin, TMP-SMX) carry more risk in this patient with CKD IV and hyperkalemia." }
    }, explanation: "Ceftriaxone is the optimal choice — no renal adjustment needed, and alternatives (cipro, TMP-SMX) carry greater risk with CKD IV and hyperkalemia." }
  },
  {
    id: "H004",
    patientId: "P001",
    orderId: "102639004",
    isNew: true,
    priority: "Routine",
    timePending: "3h 00m",
    drugName: "carvedilol 12.5 MG tablet",
    orderLine: "12.5 mg, Oral, BID",
    alerts: [],
    clinical: { dose: "12.5 mg", route: "Oral", freq: "2 times daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0900", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["0900", "2100"] }, { date: "4/3/2026", times: ["0900", "2100"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/2/2026 0540",
    product: { name: "CARVEDILOL 12.5 MG TABS", pkg: "100ct Bottle (0093-7237-01)" },
    teaching: { correctAction: "verify", detailedFeedback: {
      verify: { grade: "optimal", message: "Correct. ACC/AHA guidelines recommend continuing beta-blockers at current dose during ADHF if the patient is hemodynamically stable. This patient has BP 142/86 and HR 88 — well-compensated. Discontinuing beta-blockers during decompensation is associated with worse outcomes. Continue at home dose." },
      reject: { grade: "incorrect", message: "There is no reason to reject this order. Carvedilol at home dose is appropriate for a hemodynamically stable HFrEF patient, even during acute decompensation." },
      message: { grade: "acceptable", message: "Confirming beta-blocker continuation is reasonable pharmaceutical care. The evidence supports continuation, but the clinical nuance makes this a fair question to raise with the team." }
    }, explanation: "Beta-blockers should be continued at home dose during ADHF when hemodynamically stable (BP 142/86, HR 88) per ACC/AHA guidelines. Evidence shows worse outcomes with discontinuation." }
  },
  {
    id: "H005",
    patientId: "P001",
    orderId: "102639005",
    isNew: true,
    priority: "Routine",
    timePending: "2h 30m",
    drugName: "empagliflozin 10 MG tablet",
    orderLine: "10 mg, Oral, Daily",
    alerts: [],
    clinical: { dose: "10 mg", route: "Oral", freq: "Daily", duration: "", rate: "", volume: "", priority: "Routine", start: "4/2/2026 0900", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["0900"] }, { date: "4/3/2026", times: ["0900"] }],
    dispense: { from: "SGA 4 SOUTH (4SAO)", firstDose: "SGA 4 SOUTH (4SAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Smith, Robert J, MD",
    orderedDt: "4/2/2026 0542",
    product: { name: "EMPAGLIFLOZIN 10 MG TABS", pkg: "30ct Bottle (0597-0151-30)" },
    teaching: { correctAction: "message", detailedFeedback: {
      verify: { grade: "acceptable", message: "Emerging evidence (EMPA-KIDNEY, DAPA-CKD) supports continuing SGLT2 inhibitors through mild AKI as the initial eGFR dip is hemodynamic and reversible. However, this patient has active AKI (SCr 1.6, rising from baseline 1.4) during acute decompensation. Many institutions recommend holding during acute illness and restarting when stabilized." },
      reject: { grade: "incorrect", message: "Empagliflozin is not contraindicated here. The question is about timing during acute illness, not safety of the drug itself." },
      message: { grade: "optimal", message: "This is a genuine area of clinical equipoise. Messaging the prescriber to discuss whether to continue or temporarily hold empagliflozin during acute decompensation with AKI shows excellent clinical reasoning. The evidence is evolving, and a team-based decision is the best approach here." }
    }, explanation: "SGLT2 inhibitor during active AKI in ADHF — genuine clinical equipoise. Continuing has emerging evidence support, holding is reasonable caution. Best to discuss with the team." }
  },
  {
    id: "H006",
    patientId: "P002",
    orderId: "102639006",
    isNew: true,
    priority: "Routine",
    timePending: "1h 15m",
    drugName: "enoxaparin 40 MG injection",
    orderLine: "40 mg, SQ, Daily, First dose 4/2/26 2100",
    alerts: [],
    clinical: { dose: "40 mg", route: "Subcutaneous", freq: "Daily", duration: "", rate: "", volume: "0.4 mL", priority: "Routine", start: "4/2/2026 2100", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["2100"] }, { date: "4/3/2026", times: ["2100"] }],
    dispense: { from: "SGA 3 NORTH (3NAO)", firstDose: "SGA 3 NORTH (3NAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Patel, Anita, MD",
    orderedDt: "4/2/2026 1335",
    product: { name: "ENOXAPARIN 40 MG/0.4ML INJ", pkg: "0.4 mL Prefilled Syringe (0075-0621-02)" },
    teaching: { correctAction: "verify", detailedFeedback: {
      verify: { grade: "optimal", message: "Correct. Enoxaparin 40 mg SQ daily is the standard VTE prophylaxis dose for hospitalized medical patients per ACCP guidelines. While the patient weighs 95 kg, weight-based dosing (0.5 mg/kg) is not routinely recommended for prophylaxis — it applies to treatment doses. Standard 40 mg is guideline-concordant." },
      reject: { grade: "incorrect", message: "There is no reason to reject this order. The dose is standard and appropriate for VTE prophylaxis." },
      message: { grade: "acceptable", message: "While some evidence supports weight-based prophylaxis in obese patients, standard 40 mg is guideline-concordant for prophylaxis. Messaging is not wrong but may not change the plan." }
    }, explanation: "Standard 40 mg VTE prophylaxis dose is guideline-concordant per ACCP. Weight-based dosing applies to treatment, not prophylaxis." }
  },
  {
    id: "H007",
    patientId: "P003",
    orderId: "102639007",
    isNew: true,
    priority: "Routine",
    timePending: "28m",
    drugName: "sodium chloride 0.9% infusion",
    orderLine: "75 mL/hr, IV, Continuous",
    alerts: [],
    clinical: { dose: "75 mL/hr", route: "IV", freq: "Continuous", duration: "", rate: "75 mL/hr", volume: "1000 mL", priority: "Routine", start: "4/2/2026 1400", stop: "" },
    schedule: [{ date: "4/2/2026", times: ["1400-cont"] }],
    dispense: { from: "SGA 5 SOUTH (5SAO)", firstDose: "Floor Stock", code: "Floor Stock", triggered: false },
    orderedBy: "Chen, William, MD",
    orderedDt: "4/2/2026 1405",
    product: { name: "NaCl 0.9% 1000ML BAG", pkg: "1000 mL (0338-0049-04)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=259f8ef4-96ac-7213-e063-6394a90adb71&name=1000+ML+BAG+LABEL+2+Screen+Shot+2024-10-29+at+5.50.40+PM.jpg" },
    teaching: { correctAction: "message", detailedFeedback: {
      verify: { grade: "acceptable", message: "75 mL/hr is not harmful and provides needed hydration for pyelonephritis. However, the patient's renal function is improving (SCr 2.8 from 3.1), suggesting adequate resuscitation. Continued fluid at this rate in a CKD IV patient risks volume overload. Reassessment of fluid rate is warranted." },
      reject: { grade: "incorrect", message: "IV normal saline is appropriate for pyelonephritis management. The question is about rate optimization, not whether fluids should be given." },
      message: { grade: "optimal", message: "Excellent clinical monitoring. With SCr improving (3.1→2.8), recommending rate reduction (e.g., 50 mL/hr or a defined total volume with reassessment) balances continued hydration needs against volume overload risk in CKD IV. This proactive monitoring is exemplary pharmaceutical care." }
    }, explanation: "Renal function improving (SCr 2.8 from 3.1) — fluid rate may need reduction in CKD IV patient. Messaging prescriber about rate reassessment is optimal." }
  },
  {
    id: "H008",
    patientId: "P004",
    orderId: "102639008",
    isNew: true,
    priority: "Stat",
    timePending: "15m",
    drugName: "penicillin G benzathine/procaine (BICILLIN C-R) 1.2 MU/DOSE IM syringe",
    orderLine: "2.4 million units, IM, Once, Stat",
    alerts: [],
    clinical: { dose: "2.4 million units", route: "IM", freq: "Once", duration: "", rate: "", volume: "4 mL (2 injection sites)", priority: "Stat", start: "4/3/2026 1100", stop: "4/3/2026 1100" },
    schedule: [{ date: "4/3/2026", times: ["1100"] }],
    dispense: { from: "SGA 2 NORTH (2NAO)", firstDose: "SGA 2 NORTH (2NAO)", code: "Unit Dose", triggered: true },
    orderedBy: "Rivera, Sofia, MD",
    orderedDt: "4/3/2026 1045",
    product: { name: "BICILLIN C-R 1.2MU/2ML SYRINGE", pkg: "2 mL Prefilled Syringe (60793-0620-10)", imageUrl: "https://dailymed.nlm.nih.gov/dailymed/image.cfm?setid=ba7b9199-4710-4189-a85d-77ed75befe4d&name=bicillin-01.jpg" },
    teaching: {
      correctAction: "reject",
      detailedFeedback: {
        verify: { grade: "incorrect", message: "This order MUST NOT be verified. Bicillin C-R (benzathine/procaine combination) was ordered for secondary syphilis. Only Bicillin L-A (benzathine penicillin G) provides adequate sustained levels per CDC guidelines. Verifying this order would result in treatment failure and continued infectivity." },
        reject: { grade: "optimal", message: "Correct — this is a critical LASA medication error. Bicillin C-R does NOT provide adequate sustained bactericidal levels for treponema pallidum. Rejecting and contacting the prescriber to reorder as Bicillin L-A 2.4 MU IM x1 is the only safe action." },
        message: { grade: "suboptimal", message: "While messaging the prescriber is a step in the right direction, this order should be actively rejected, not just flagged. The wrong product reaching the patient could result in treatment failure. Reject first, then message." }
      },
      explanation: "Bicillin C-R vs L-A LASA error — even in hard mode, some errors are clear-cut. This must be rejected.",
      rejectReasons: [
        { id: "r1", text: "LASA error: Bicillin C-R ordered instead of Bicillin L-A", correct: true },
        { id: "r2", text: "Bicillin C-R is NOT recommended for syphilis per CDC guidelines", correct: true },
        { id: "r3", text: "ISMP high-alert: frequently confused look-alike/sound-alike products", correct: true },
        { id: "r4", text: "Dose too high for patient weight", correct: false },
        { id: "r5", text: "Route should be IV, not IM", correct: false }
      ]
    }
  }
];
function getOrdersForDifficulty(level) {
  switch (level) {
    case "easy":
      return EASY_ORDERS;
    case "medium":
      return MEDIUM_ORDERS;
    case "hard":
      return HARD_ORDERS;
    default:
      return DEMO_ORDERS;
  }
}
const DISEASES = [
  { id: "hf", label: "Heart Failure", icon: "❤", desc: "Acute decompensated HFrEF" },
  { id: "cap", label: "Pneumonia (CAP)", icon: "🫁", desc: "Severe community-acquired pneumonia" },
  { id: "uti", label: "UTI / Pyelonephritis", icon: "💊", desc: "Complicated pyelonephritis" },
  { id: "copd", label: "COPD Exacerbation", icon: "🌬", desc: "Coming soon" },
  { id: "dka", label: "DKA", icon: "💧", desc: "Coming soon" },
  { id: "afib", label: "Atrial Fibrillation", icon: "💓", desc: "Coming soon" },
  { id: "sepsis", label: "Sepsis", icon: "🔥", desc: "Coming soon" },
  { id: "aki", label: "Acute Kidney Injury", icon: "🫀", desc: "Coming soon" },
  { id: "vte", label: "DVT / PE", icon: "🩸", desc: "Coming soon" },
  { id: "cellulitis", label: "Cellulitis / SSTI", icon: "🦠", desc: "Coming soon" }
];
const HF_PATIENT = {
  D_HF: {
    name: "MONROE, ELEANOR J",
    mrn: "01102045",
    dob: "03/14/1952",
    age: "73F",
    weight: "78 kg",
    height: "162 cm",
    allergies: ["Sulfa (rash)"],
    room: "4S-408B",
    admitDate: "04/05/2026",
    attending: "Chen, William, MD",
    dx: "Acute decompensated HFrEF (I50.23), CKD Stage III",
    code: "Full",
    hp: {
      cc: "Worsening dyspnea and leg swelling x 5 days",
      hpi: "73 y/o F with HFrEF (EF 25%, ischemic cardiomyopathy), CKD Stage III, and T2DM presents with 5 days of progressive dyspnea, orthopnea (now sleeps in recliner), bilateral lower extremity edema, and 8-pound weight gain. Reports dietary indiscretion at a recent family event. Home GDMT includes carvedilol, sacubitril/valsartan, spironolactone, empagliflozin, and furosemide.",
      pmh: ["HFrEF (EF 25%, ischemic)", "CAD s/p CABG 2019", "CKD Stage III (baseline SCr 1.4)", "T2DM", "HTN", "Hyperlipidemia"],
      meds: ["Carvedilol 12.5 mg PO BID", "Sacubitril/valsartan 49/51 mg PO BID", "Spironolactone 25 mg PO daily", "Empagliflozin 10 mg PO daily", "Furosemide 40 mg PO daily", "Atorvastatin 40 mg PO QHS", "Metformin 500 mg PO BID"],
      exam: {
        vitals: "T 98.2 | HR 88 | BP 142/86 | RR 22 | SpO2 92% RA",
        cv: "RRR, S3 gallop, JVD to angle of jaw at 45 degrees",
        pulm: "Bibasilar crackles to mid-lung fields",
        ext: "3+ pitting edema bilateral LE to knees",
        neuro: "A&O x4"
      },
      assessment: "Acute decompensated HFrEF with volume overload. Cardiorenal physiology with bump in SCr.",
      plan: [
        "1. ADHF: IV loop diuresis, strict I/O, daily weights.",
        "2. Monitor renal function and electrolytes closely (BMP q day).",
        "3. Review home GDMT for continuation vs. hold decisions.",
        "4. Telemetry monitoring.",
        "5. Sodium restriction 2 g/day, fluid restriction 1.5 L/day."
      ]
    },
    labs: {
      "04/05 0600": { Na: ["132", "L"], K: "4.0", Cl: "98", CO2: "26", BUN: ["38", "H"], SCr: ["1.7", "H"], Glucose: ["156", "H"], Mg: "2.0", "BNP": ["2240", "H"], Troponin: "<0.01", WBC: "7.8", Hgb: ["11.2", "L"], Plt: "210" },
      "04/04 1800": { Na: ["131", "L"], K: "4.2", BUN: ["36", "H"], SCr: ["1.6", "H"], "BNP": ["2080", "H"], Troponin: "<0.01" }
    },
    notes: [
      { dt: "04/05 0700", author: "Chen, William, MD", type: "Progress Note", text: "S: Dyspneic, orthopneic. Cannot lie flat.\nO: JVD, bibasilar crackles, 3+ LE edema. BNP 2240. SCr bumped 1.4 -> 1.7.\nA/P: ADHF with volume overload and cardiorenal. Plan IV loop diuresis. Will review home GDMT." }
    ],
    inpatientMeds: [
      { drug: "Atorvastatin", dose: "40 mg", route: "PO", freq: "QHS", sched: ["2100"], status: "Active" },
      { drug: "Carvedilol", dose: "12.5 mg", route: "PO", freq: "BID", sched: ["0900", "2100"], status: "Active" }
    ],
    homeMeds: [
      { drug: "Atorvastatin 40 mg", freq: "QHS", status: "Active" },
      { drug: "Carvedilol 12.5 mg", freq: "BID", status: "Active" },
      { drug: "Empagliflozin 10 mg", freq: "Daily", status: "Active" },
      { drug: "Furosemide 40 mg", freq: "Daily", status: "Active" },
      { drug: "Metformin 500 mg", freq: "BID", status: "Active" },
      { drug: "Sacubitril/valsartan 49/51 mg", freq: "BID", status: "Active" },
      { drug: "Spironolactone 25 mg", freq: "Daily", status: "Active" }
    ]
  }
};
function mk(id, patientId, drugName, orderLine, dose, route, freq, teaching, extra = {}) {
  return {
    id,
    patientId,
    orderId: String(9e5 + Math.floor(Math.random() * 99999)),
    isNew: true,
    priority: extra.priority || "Routine",
    timePending: extra.timePending || "1h 15m",
    drugName,
    orderLine,
    alerts: [],
    clinical: { dose, route, freq, duration: "", rate: "", volume: extra.volume || "", priority: extra.priority || "Routine", start: "4/5/2026 0900", stop: "" },
    schedule: [{ date: "4/5/2026", times: extra.times || ["0900"] }],
    dispense: { from: "PHARMACY MAIN", firstDose: "PHARMACY MAIN", code: "Unit Dose", triggered: true },
    orderedBy: extra.orderedBy || "Chen, William, MD",
    orderedDt: "4/5/2026 0800",
    product: { name: drugName.toUpperCase(), pkg: extra.pkg || "" },
    teaching
  };
}
const HF_EASY = [
  mk(
    "HF_E1",
    "D_HF",
    "diltiazem 25 MG injection",
    "25 mg, IV Push, Once",
    "25 mg",
    "IV Push",
    "Once",
    {
      correctAction: "reject",
      explanation: "Diltiazem is a non-dihydropyridine calcium channel blocker with potent negative inotropic effects and is CONTRAINDICATED in HFrEF (EF 25%). IV diltiazem in a patient with decompensated systolic heart failure can precipitate cardiogenic shock. The patient is not in rapid atrial fibrillation — there is no indication for rate control, and even if there were, diltiazem is the wrong choice in HFrEF.",
      rejectReasons: [
        { id: "r1", text: "Non-DHP calcium channel blocker contraindicated in HFrEF (EF 25%)", correct: true },
        { id: "r2", text: "Negative inotrope — risk of precipitating cardiogenic shock", correct: true },
        { id: "r3", text: "Patient has no documented rapid atrial fibrillation or tachyarrhythmia", correct: true },
        { id: "r4", text: "Patient has a sulfa allergy", correct: false },
        { id: "r5", text: "Dose is too high for renal function", correct: false },
        { id: "r6", text: "Diltiazem is only available orally", correct: false }
      ]
    }
  ),
  mk(
    "HF_E2",
    "D_HF",
    "ibuprofen 600 MG tablet",
    "600 mg, Oral, Q6H PRN pain",
    "600 mg",
    "Oral",
    "Q6H PRN",
    {
      correctAction: "reject",
      explanation: "NSAIDs are contraindicated in acute decompensated heart failure. They cause sodium and water retention, blunt the effect of loop diuretics, worsen renal perfusion, and can precipitate further decompensation. This patient already has cardiorenal physiology with SCr rising from 1.4 to 1.7. NSAIDs in this setting are a classic avoidable medication error.",
      rejectReasons: [
        { id: "r1", text: "NSAIDs cause sodium/water retention — worsen HF volume overload", correct: true },
        { id: "r2", text: "NSAIDs blunt loop diuretic effect", correct: true },
        { id: "r3", text: "NSAIDs worsen renal perfusion in cardiorenal physiology", correct: true },
        { id: "r4", text: "Patient has a documented NSAID allergy", correct: false },
        { id: "r5", text: "Dose is above maximum daily dose", correct: false },
        { id: "r6", text: "Ibuprofen is not indicated for any pain syndrome", correct: false }
      ]
    },
    { timePending: "45m" }
  )
];
const HF_MEDIUM = [
  mk(
    "HF_M1",
    "D_HF",
    "furosemide 80 MG injection",
    "80 mg, IV Push, Q12H, First dose 4/5/26 0900",
    "80 mg",
    "IV Push",
    "Every 12 hours",
    {
      correctAction: "verify",
      explanation: "IV furosemide 80 mg Q12H is appropriate initial diuresis for this acutely decompensated patient. Per ADHF guidelines, IV loop dose should be at least 2.5x the home oral dose (40 mg PO → ~80 mg IV accounting for reduced bioavailability). The patient has clear volume overload (8 lb weight gain, 3+ edema, BNP 2240). Monitor electrolytes and renal function.",
      rejectReasons: [
        { id: "r1", text: "Dose is too high for patient", correct: false },
        { id: "r2", text: "IV route inappropriate in this setting", correct: false },
        { id: "r3", text: "Patient has an allergy to furosemide", correct: false },
        { id: "r4", text: "Furosemide contraindicated in CKD III", correct: false },
        { id: "r5", text: "BID dosing frequency is too aggressive", correct: false }
      ]
    },
    { timePending: "35m", priority: "Stat" }
  ),
  mk(
    "HF_M2",
    "D_HF",
    "potassium chloride (KLOR-CON) 20 MEQ tablet ER",
    "20 mEq, Oral, BID, First dose 4/5/26 0900",
    "20 mEq",
    "Oral",
    "BID",
    {
      correctAction: "reject",
      explanation: "Empiric potassium supplementation is not appropriate here. Current K+ is 4.0 mEq/L — normal. The patient is on spironolactone (potassium-sparing) and sacubitril/valsartan (raises potassium via RAAS inhibition). Adding scheduled KCl without evidence of hypokalemia risks iatrogenic hyperkalemia, especially with the ongoing AKI. Potassium should be replaced based on lab values, not prophylactically in this patient.",
      rejectReasons: [
        { id: "r1", text: "Current K+ is 4.0 — normal, no indication for supplementation", correct: true },
        { id: "r2", text: "Patient on spironolactone and ARNI — high risk for hyperkalemia", correct: true },
        { id: "r3", text: "Active AKI further increases hyperkalemia risk", correct: true },
        { id: "r4", text: "Patient has a potassium allergy", correct: false },
        { id: "r5", text: "KCl should only be given IV", correct: false },
        { id: "r6", text: "Dose exceeds maximum single dose", correct: false }
      ]
    }
  ),
  mk(
    "HF_M3",
    "D_HF",
    "metoprolol tartrate 50 MG tablet",
    "50 mg, Oral, BID, First dose 4/5/26 0900",
    "50 mg",
    "Oral",
    "BID",
    {
      correctAction: "reject",
      explanation: "The patient is established on carvedilol 12.5 mg PO BID at home — an evidence-based beta-blocker for HFrEF. Switching to metoprolol tartrate is problematic for two reasons: (1) tartrate is short-acting and not GDMT-grade for HFrEF (succinate is the guideline-recommended form), and (2) an unnecessary intra-hospital beta-blocker swap risks dosing errors and loss of chronic therapy benefit. The home carvedilol should be continued unless there is a specific contraindication.",
      rejectReasons: [
        { id: "r1", text: "Patient already on carvedilol — duplicate beta-blocker therapy", correct: true },
        { id: "r2", text: "Metoprolol tartrate is not GDMT for HFrEF (succinate is)", correct: true },
        { id: "r3", text: "Unnecessary therapeutic switch from established home regimen", correct: true },
        { id: "r4", text: "Metoprolol is contraindicated in all HF patients", correct: false },
        { id: "r5", text: "Patient has a beta-blocker allergy", correct: false },
        { id: "r6", text: "Dose is too low to be effective", correct: false }
      ]
    }
  )
];
const HF_HARD = [
  {
    ...mk(
      "HF_H1",
      "D_HF",
      "carvedilol 12.5 MG tablet",
      "12.5 mg, Oral, BID (continue home dose)",
      "12.5 mg",
      "Oral",
      "BID",
      null,
      { times: ["0900", "2100"] }
    ),
    teaching: {
      correctAction: "verify",
      detailedFeedback: {
        verify: { grade: "optimal", message: "Correct. ACC/AHA guidelines recommend continuing beta-blockers at home dose during ADHF when the patient is hemodynamically stable. This patient has BP 142/86 and HR 88 — well-compensated. Discontinuation during decompensation is associated with worse outcomes and longer length of stay." },
        reject: { grade: "incorrect", message: "Beta-blockers should be continued, not held, in hemodynamically stable ADHF. Holding carvedilol here would worsen outcomes." },
        message: { grade: "acceptable", message: "Confirming beta-blocker continuation is reasonable pharmaceutical care, but evidence clearly supports continuing at the home dose in this stable patient." }
      },
      explanation: "Continue beta-blockers at home dose in stable ADHF per ACC/AHA — better outcomes than holding.",
      rejectReasons: [
        { id: "r1", text: "Beta-blockers should be held during all HF exacerbations", correct: false },
        { id: "r2", text: "Carvedilol is contraindicated in CKD III", correct: false },
        { id: "r3", text: "Dose is too high", correct: false },
        { id: "r4", text: "Patient has a beta-blocker allergy", correct: false }
      ]
    }
  },
  {
    ...mk(
      "HF_H2",
      "D_HF",
      "sacubitril/valsartan (ENTRESTO) 49/51 MG tablet",
      "49/51 mg, Oral, BID (continue home dose)",
      "49/51 mg",
      "Oral",
      "BID",
      null,
      { times: ["0900", "2100"] }
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "acceptable", message: "ARNI continuation in stable ADHF is generally supported. However, this patient has active cardiorenal with SCr bumped from 1.4 to 1.7 and hyponatremia (Na 132). Many clinicians would hold or dose-reduce ARNI during active AKI and volume optimization, then resume once renal function stabilizes." },
        reject: { grade: "suboptimal", message: "Rejecting outright is too aggressive. ARNI is cornerstone GDMT and should not be discontinued reflexively. A clarification with the team about temporarily holding during active AKI would be more appropriate." },
        message: { grade: "optimal", message: "Best answer. Messaging the team to discuss holding ARNI temporarily during active cardiorenal worsening demonstrates good judgment. Once diuresis is established and renal function stabilizes, resume at home dose." }
      },
      explanation: "ARNI during active AKI in ADHF is nuanced — messaging for team discussion is the best move.",
      rejectReasons: [
        { id: "r1", text: "ARNI is contraindicated in HFrEF", correct: false },
        { id: "r2", text: "Dose is too high", correct: false },
        { id: "r3", text: "Patient has an ARB allergy", correct: false },
        { id: "r4", text: "Should never be combined with diuretics", correct: false }
      ]
    }
  },
  {
    ...mk(
      "HF_H3",
      "D_HF",
      "spironolactone 25 MG tablet",
      "25 mg, Oral, Daily (continue home dose)",
      "25 mg",
      "Oral",
      "Daily",
      null
    ),
    teaching: {
      correctAction: "verify",
      detailedFeedback: {
        verify: { grade: "optimal", message: "Correct. MRAs like spironolactone are cornerstone GDMT for HFrEF and should be continued. Current K+ is 4.0 (normal) and SCr is elevated but not prohibitive. The risk threshold for holding MRA is K+ >5.0 or SCr >2.5 in most protocols. Monitor K+ and SCr daily with active diuresis." },
        reject: { grade: "incorrect", message: "Spironolactone should not be rejected. K+ is 4.0 and SCr is 1.7 — both within thresholds for MRA continuation. Holding MRA reflexively in ADHF worsens long-term outcomes." },
        message: { grade: "acceptable", message: "Confirming continuation with the team is reasonable but not strictly necessary. K+ and SCr are both within acceptable limits for continued MRA therapy." }
      },
      explanation: "Continue MRA — K+ 4.0 and SCr 1.7 are within safe thresholds. Monitor closely during diuresis.",
      rejectReasons: [
        { id: "r1", text: "Spironolactone must be held with any SCr elevation", correct: false },
        { id: "r2", text: "Patient has a spironolactone allergy", correct: false },
        { id: "r3", text: "Dose is too high for HFrEF", correct: false },
        { id: "r4", text: "Duplicate therapy with another diuretic", correct: false }
      ]
    }
  }
];
const CAP_PATIENT = {
  D_CAP: {
    name: "FITZGERALD, HAROLD R",
    mrn: "01203811",
    dob: "11/02/1956",
    age: "69M",
    weight: "82 kg",
    height: "178 cm",
    allergies: ["Penicillin (mild rash, remote)"],
    room: "MICU-7",
    admitDate: "04/05/2026",
    attending: "Patel, Anita, MD",
    dx: "Severe community-acquired pneumonia (J18.9), Septic shock (R65.21)",
    code: "Full",
    hp: {
      cc: "Fever, productive cough, and worsening shortness of breath x 4 days",
      hpi: "69 y/o M with COPD and HTN presents with 4 days of fever, productive cough with rust-colored sputum, progressive dyspnea, and confusion per family. In ED found hypotensive (BP 84/52), tachycardic (HR 118), tachypneic (RR 30), hypoxic (SpO2 86% RA), and febrile (T 39.1). CXR shows dense right lower lobe consolidation. Started on broad-spectrum empiric therapy and IV fluids. Requires ICU admission for septic shock from severe CAP.",
      pmh: ["COPD (GOLD stage III, 2 exacerbations in past year)", "HTN", "Former smoker (40 pack-years, quit 2020)", "Hyperlipidemia"],
      meds: ["Tiotropium 18 mcg INH daily", "Fluticasone/salmeterol 250/50 INH BID", "Albuterol INH PRN", "Lisinopril 20 mg PO daily", "Atorvastatin 40 mg PO QHS"],
      exam: {
        vitals: "T 38.8 | HR 112 | BP 96/58 | RR 26 | SpO2 90% 4L NC",
        cv: "Tachycardic, regular",
        pulm: "Right basilar crackles and bronchial breath sounds, prolonged expiratory phase",
        ext: "Cool extremities, delayed cap refill",
        neuro: "Alert but oriented to person only"
      },
      assessment: "Severe CAP with septic shock. Meets ATS/IDSA criteria for severe CAP (confusion, BUN >20, RR >30, BP <90, multilobar infiltrate pending CT). Requires ICU-level empiric therapy.",
      plan: [
        "1. Severe CAP with septic shock: Empiric antibiotics per ATS/IDSA, blood cultures x2, sputum culture, urine legionella/pneumococcal antigens.",
        "2. IV fluid resuscitation, norepinephrine if MAP <65 after bolus.",
        "3. Continue COPD inhalers.",
        "4. Supplemental O2 to SpO2 >92%.",
        "5. VTE prophylaxis when stable.",
        "6. Lactate trending."
      ]
    },
    labs: {
      "04/05 0400": { Na: "135", K: "4.5", BUN: ["32", "H"], SCr: ["1.3", "H"], Glucose: ["168", "H"], WBC: ["22.4", "H"], Hgb: "13.6", Plt: "188", Lactate: ["3.8", "H"], Procalcitonin: ["8.4", "H"], "CRP": ["18.2", "H"] },
      "04/04 2200": { WBC: ["24.1", "H"], Lactate: ["4.2", "H"], BUN: ["34", "H"], SCr: ["1.4", "H"] }
    },
    notes: [
      { dt: "04/05 0600", author: "Patel, Anita, MD", type: "Progress Note", text: "S: Patient confused, family reports 4 days of worsening cough and fever.\nO: T 38.8, HR 112, BP 96/58 (post-fluids), SpO2 90% 4L. WBC 22.4, lactate 3.8. CXR: dense RLL consolidation.\nA/P: Severe CAP / septic shock. ICU admission. Empiric broad-spectrum coverage pending cultures. Fluids + pressors as needed." }
    ],
    inpatientMeds: [
      { drug: "Albuterol", dose: "2.5 mg", route: "INH", freq: "Q4H PRN", sched: ["PRN"], status: "Active" },
      { drug: "Fluticasone/salmeterol", dose: "250/50 mcg", route: "INH", freq: "BID", sched: ["0800", "2000"], status: "Active" },
      { drug: "Norepinephrine", dose: "Titrate to MAP >65", route: "IV", freq: "Continuous", sched: ["Cont"], status: "Active" },
      { drug: "Tiotropium", dose: "18 mcg", route: "INH", freq: "Daily", sched: ["0900"], status: "Active" }
    ],
    homeMeds: [
      { drug: "Albuterol INH", freq: "PRN", status: "Active" },
      { drug: "Atorvastatin 40 mg", freq: "QHS", status: "Active" },
      { drug: "Fluticasone/salmeterol 250/50", freq: "BID", status: "Active" },
      { drug: "Lisinopril 20 mg", freq: "Daily", status: "Active" },
      { drug: "Tiotropium 18 mcg", freq: "Daily", status: "Active" }
    ]
  }
};
const CAP_EASY = [
  mk(
    "CAP_E1",
    "D_CAP",
    "azithromycin 500 MG IVPB",
    "500 mg, IVPB, Daily (monotherapy)",
    "500 mg",
    "IVPB",
    "Daily",
    {
      correctAction: "reject",
      explanation: "Azithromycin monotherapy is inadequate for severe CAP. ATS/IDSA guidelines require a beta-lactam PLUS a macrolide (or a respiratory fluoroquinolone) for severe CAP. Macrolide monotherapy has high resistance rates among S. pneumoniae and would leave this septic patient undertreated. This patient needs combination therapy immediately.",
      rejectReasons: [
        { id: "r1", text: "Macrolide monotherapy is inadequate empiric therapy for severe CAP", correct: true },
        { id: "r2", text: "Pneumococcal macrolide resistance is high", correct: true },
        { id: "r3", text: "ATS/IDSA requires beta-lactam + macrolide for severe CAP", correct: true },
        { id: "r4", text: "Patient has a macrolide allergy", correct: false },
        { id: "r5", text: "Dose is too low", correct: false },
        { id: "r6", text: "IV azithromycin is not available", correct: false }
      ]
    },
    { priority: "Stat", timePending: "20m" }
  ),
  mk(
    "CAP_E2",
    "D_CAP",
    "ampicillin 1 GM IVPB",
    "1 g, IVPB, Q6H",
    "1 g",
    "IVPB",
    "Q6H",
    {
      correctAction: "reject",
      explanation: "Ampicillin monotherapy does NOT provide adequate empiric coverage for severe CAP. It lacks coverage for atypical pathogens (Legionella, Mycoplasma, Chlamydia) and has poor activity against beta-lactamase producing organisms such as H. influenzae. This patient is in septic shock and requires guideline-based empiric coverage with an appropriate beta-lactam (ceftriaxone, ampicillin/sulbactam, or similar) PLUS a macrolide or respiratory fluoroquinolone.",
      rejectReasons: [
        { id: "r1", text: "Ampicillin alone lacks atypical coverage required for CAP", correct: true },
        { id: "r2", text: "Inadequate for beta-lactamase producing respiratory pathogens", correct: true },
        { id: "r3", text: "Severe CAP requires combination therapy, not monotherapy", correct: true },
        { id: "r4", text: "Patient has a penicillin anaphylaxis history", correct: false },
        { id: "r5", text: "Ampicillin has no activity against S. pneumoniae", correct: false },
        { id: "r6", text: "Dose is too high", correct: false }
      ]
    },
    { timePending: "35m" }
  )
];
const CAP_MEDIUM = [
  mk(
    "CAP_M1",
    "D_CAP",
    "ceftriaxone 2 GM IVPB",
    "2 g, IVPB, Daily",
    "2 g",
    "IVPB",
    "Daily",
    {
      correctAction: "verify",
      explanation: "Ceftriaxone 2 g IV daily is the guideline-recommended dose for severe CAP. The 1 g dose (sometimes used for uncomplicated infections) is inadequate for severe CAP. The patient has a remote mild rash to penicillin (not anaphylaxis) — cephalosporin cross-reactivity is <1% for third-generation agents and ceftriaxone is safe to use. Combined with a macrolide, this is the standard ATS/IDSA regimen.",
      rejectReasons: [
        { id: "r1", text: "Dose is too low — should be 1 g", correct: false },
        { id: "r2", text: "Ceftriaxone contraindicated with any penicillin allergy", correct: false },
        { id: "r3", text: "Patient has a cephalosporin allergy", correct: false },
        { id: "r4", text: "Wrong route of administration", correct: false },
        { id: "r5", text: "Ceftriaxone has no atypical coverage and cannot be used", correct: false }
      ]
    },
    { priority: "Stat", timePending: "15m" }
  ),
  mk(
    "CAP_M2",
    "D_CAP",
    "azithromycin 500 MG IVPB",
    "500 mg, IVPB, Daily",
    "500 mg",
    "IVPB",
    "Daily",
    {
      correctAction: "verify",
      explanation: "Azithromycin 500 mg IV daily is the correct second component of empiric severe CAP therapy, providing atypical coverage (Legionella, Mycoplasma, Chlamydia). Combined with ceftriaxone, this is the ATS/IDSA-recommended beta-lactam + macrolide regimen. Monitor QTc given the baseline risk of macrolide-induced QTc prolongation.",
      rejectReasons: [
        { id: "r1", text: "Azithromycin is never used for CAP", correct: false },
        { id: "r2", text: "Dose is too high", correct: false },
        { id: "r3", text: "Duplicates coverage with ceftriaxone", correct: false },
        { id: "r4", text: "Patient has a macrolide allergy", correct: false },
        { id: "r5", text: "IV form not appropriate, must be PO", correct: false }
      ]
    },
    { timePending: "15m" }
  ),
  mk(
    "CAP_M3",
    "D_CAP",
    "moxifloxacin 400 MG IVPB",
    "400 mg, IVPB, Daily",
    "400 mg",
    "IVPB",
    "Daily",
    {
      correctAction: "reject",
      explanation: "Adding moxifloxacin on top of ceftriaxone + azithromycin represents duplicate atypical coverage and unnecessary fluoroquinolone exposure. Respiratory fluoroquinolones are acceptable as monotherapy for severe CAP (alternative to beta-lactam + macrolide), but should NOT be stacked on top of a complete combination regimen. This adds QTc prolongation risk, C. difficile risk, tendon rupture risk, and cost without benefit.",
      rejectReasons: [
        { id: "r1", text: "Duplicate atypical coverage with azithromycin already prescribed", correct: true },
        { id: "r2", text: "Unnecessary fluoroquinolone exposure and toxicity risk", correct: true },
        { id: "r3", text: "Additive QTc prolongation with azithromycin", correct: true },
        { id: "r4", text: "Moxifloxacin has no respiratory indication", correct: false },
        { id: "r5", text: "Dose is too low", correct: false },
        { id: "r6", text: "Patient has a fluoroquinolone allergy", correct: false }
      ]
    }
  )
];
const CAP_HARD = [
  {
    ...mk(
      "CAP_H1",
      "D_CAP",
      "methylprednisolone 40 MG injection",
      "40 mg, IV Push, Q12H",
      "40 mg",
      "IV Push",
      "Q12H",
      null
    ),
    teaching: {
      correctAction: "verify",
      detailedFeedback: {
        verify: { grade: "optimal", message: "Excellent. Recent evidence (CAPE COD trial, NEJM 2023) supports adjunctive hydrocortisone or methylprednisolone in severe CAP with septic shock — mortality benefit and reduced vasopressor duration. This patient meets criteria (severe CAP, shock requiring pressors, no contraindications). The dose is appropriate." },
        reject: { grade: "suboptimal", message: "Rejecting is defensible based on older evidence, but recent trials (CAPE COD 2023) show mortality benefit in severe CAP with shock. The order is supported by current evidence." },
        message: { grade: "acceptable", message: "Messaging to confirm indication is reasonable given the relative novelty of the evidence, but modern guidelines and CAPE COD data support verification." }
      },
      explanation: "Adjunctive steroids in severe CAP with septic shock have mortality benefit per CAPE COD (2023).",
      rejectReasons: [
        { id: "r1", text: "Steroids are contraindicated in sepsis", correct: false },
        { id: "r2", text: "Dose is too high", correct: false },
        { id: "r3", text: "Patient has a steroid allergy", correct: false },
        { id: "r4", text: "Steroids have no role in pneumonia", correct: false }
      ]
    }
  },
  {
    ...mk(
      "CAP_H2",
      "D_CAP",
      "vancomycin 1750 MG IVPB",
      "1750 mg (25 mg/kg), IVPB, Load then per levels",
      "1750 mg",
      "IVPB",
      "Loading dose",
      null
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "acceptable", message: "Empiric MRSA coverage in severe CAP is defensible but not routine. IDSA recommends adding MRSA coverage only if specific risk factors are present: prior MRSA colonization, cavitary lesions, post-influenza, or necrotizing pneumonia. This patient has none documented — adding vancomycin reflexively exposes him to nephrotoxicity and is usually unnecessary." },
        reject: { grade: "suboptimal", message: "Rejecting outright may be premature — there may be MRSA risk factors not captured in the chart that the team is aware of. Messaging for clarification is safer than outright rejection." },
        message: { grade: "optimal", message: "Best answer. MRSA coverage in CAP should be based on specific risk factors. Messaging the team to clarify whether MRSA risk factors exist (prior colonization, cavitation, post-influenza) demonstrates thoughtful stewardship without over-rejecting." }
      },
      explanation: "Empiric MRSA coverage in CAP should be based on risk factors (prior colonization, cavitation, post-flu) — clarify with team.",
      rejectReasons: [
        { id: "r1", text: "Vancomycin is contraindicated in CAP", correct: false },
        { id: "r2", text: "Loading dose is incorrect for weight", correct: false },
        { id: "r3", text: "Patient has a vancomycin allergy", correct: false },
        { id: "r4", text: "Vancomycin has no MRSA activity", correct: false }
      ]
    }
  },
  {
    ...mk(
      "CAP_H3",
      "D_CAP",
      "levofloxacin 750 MG IVPB",
      "750 mg, IVPB, Daily (switch from beta-lactam + macrolide)",
      "750 mg",
      "IVPB",
      "Daily",
      null
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "suboptimal", message: "Switching a stable patient from combination therapy to a respiratory fluoroquinolone is not ideal. While monotherapy with levofloxacin is an acceptable ALTERNATIVE for severe CAP, de-escalating to it mid-treatment exposes the patient to unnecessary fluoroquinolone toxicity (QTc, tendon, C. diff, aortic aneurysm) when combination therapy is working." },
        reject: { grade: "acceptable", message: "Rejecting this switch is defensible — the current regimen (ceftriaxone + azithromycin) is working. However, a clarifying message to the team about the rationale would be the most collegial approach." },
        message: { grade: "optimal", message: "Best answer. The team may have a specific reason (allergy concern, culture data, QTc concerns) for switching. Messaging to understand rationale and advocate for continuing combination therapy if no clear reason exists is the most appropriate action." }
      },
      explanation: "Switching stable CAP patients to fluoroquinolone monotherapy mid-treatment is usually unnecessary — clarify rationale.",
      rejectReasons: [
        { id: "r1", text: "Levofloxacin has no CAP activity", correct: false },
        { id: "r2", text: "Dose is too high", correct: false },
        { id: "r3", text: "Patient has a fluoroquinolone allergy", correct: false },
        { id: "r4", text: "Fluoroquinolones are never used in severe CAP", correct: false }
      ]
    }
  }
];
const UTI_PATIENT = {
  D_UTI: {
    name: "ALVAREZ, PATRICIA M",
    mrn: "01305927",
    dob: "06/22/1968",
    age: "57F",
    weight: "68 kg",
    height: "165 cm",
    allergies: ["Sulfa (Stevens-Johnson syndrome)", "Penicillin (hives)"],
    room: "5N-512A",
    admitDate: "04/05/2026",
    attending: "Okafor, Chioma, MD",
    dx: "Acute pyelonephritis (N10), CKD Stage II",
    code: "Full",
    hp: {
      cc: "Right flank pain, fever, and dysuria x 3 days",
      hpi: "57 y/o F with CKD Stage II and diabetes presents with 3 days of progressively worsening right flank pain, fevers to 102.5, chills, dysuria, and urinary frequency. No prior history of pyelonephritis or nephrolithiasis. Denies vaginal discharge. Reports good PO intake but nauseous. In ED found febrile, mildly hypotensive, tachycardic. UA with pyuria and bacteriuria. Admitted for IV antibiotics.",
      pmh: ["T2DM (A1c 7.8)", "CKD Stage II (baseline SCr 1.1)", "HTN", "Hypothyroidism"],
      meds: ["Metformin 1000 mg PO BID", "Losartan 50 mg PO daily", "Levothyroxine 75 mcg PO daily", "Atorvastatin 20 mg PO daily"],
      exam: {
        vitals: "T 38.9 | HR 104 | BP 108/68 | RR 18 | SpO2 98% RA",
        cv: "Tachycardic, regular",
        pulm: "CTAB",
        ext: "Warm, well perfused",
        neuro: "A&O x4. Right CVA tenderness prominent."
      },
      assessment: "Acute pyelonephritis in patient with multiple severe antibiotic allergies (sulfa SJS, penicillin hives). Requires IV antibiotic therapy.",
      plan: [
        "1. Pyelonephritis: IV antibiotics, blood cultures x2, urine culture.",
        "2. IV fluids.",
        "3. Hold metformin while hospitalized.",
        "4. Continue losartan if BP tolerates.",
        "5. Monitor SCr daily."
      ]
    },
    labs: {
      "04/05 0500": { Na: "138", K: "3.9", BUN: ["24", "H"], SCr: ["1.3", "H"], Glucose: ["182", "H"], WBC: ["18.2", "H"], Hgb: "12.4", Plt: "265", Lactate: ["2.2", "H"], "CRP": ["9.8", "H"], UA: "LE+++ Nit+ WBC>100 Bact++" },
      "04/04 2000": { WBC: ["19.8", "H"], BUN: ["22", "H"], SCr: ["1.2", "H"], Lactate: ["2.6", "H"] }
    },
    notes: [
      { dt: "04/05 0700", author: "Okafor, Chioma, MD", type: "Progress Note", text: "S: Right flank pain, fevers, dysuria.\nO: T 38.9, HR 104, BP 108/68. WBC 18.2. UA markedly positive. Right CVA tenderness.\nA/P: Acute pyelo. Note multiple severe antibiotic allergies (sulfa SJS, penicillin hives). IV antibiotics, fluids. Pending culture data." }
    ],
    inpatientMeds: [
      { drug: "Acetaminophen", dose: "650 mg", route: "PO", freq: "Q6H PRN", sched: ["PRN"], status: "Active" },
      { drug: "Levothyroxine", dose: "75 mcg", route: "PO", freq: "Daily", sched: ["0600"], status: "Active" },
      { drug: "Losartan", dose: "50 mg", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" }
    ],
    homeMeds: [
      { drug: "Atorvastatin 20 mg", freq: "Daily", status: "Active" },
      { drug: "Levothyroxine 75 mcg", freq: "Daily", status: "Active" },
      { drug: "Losartan 50 mg", freq: "Daily", status: "Active" },
      { drug: "Metformin 1000 mg", freq: "BID", status: "Active" }
    ]
  }
};
const UTI_EASY = [
  mk(
    "UTI_E1",
    "D_UTI",
    "sulfamethoxazole-trimethoprim (BACTRIM DS) 800-160 MG tablet",
    "1 tablet, Oral, BID",
    "1 tablet",
    "Oral",
    "BID",
    {
      correctAction: "reject",
      explanation: "ABSOLUTELY CONTRAINDICATED. The patient has documented sulfa allergy with history of Stevens-Johnson syndrome — one of the most severe cutaneous adverse reactions, with significant mortality. Sulfamethoxazole is a sulfonamide. Re-exposure could precipitate fatal SJS/TEN. This is an unambiguous reject and should trigger a pharmacy intervention.",
      rejectReasons: [
        { id: "r1", text: "Documented sulfa allergy with history of Stevens-Johnson syndrome", correct: true },
        { id: "r2", text: "Risk of fatal SJS/TEN recurrence with re-exposure", correct: true },
        { id: "r3", text: "Sulfamethoxazole is a sulfonamide — directly contraindicated", correct: true },
        { id: "r4", text: "Bactrim is not effective for pyelonephritis", correct: false },
        { id: "r5", text: "Dose is too low", correct: false },
        { id: "r6", text: "Wrong route of administration", correct: false }
      ]
    },
    { priority: "Stat", timePending: "30m" }
  ),
  mk(
    "UTI_E2",
    "D_UTI",
    "nitrofurantoin monohydrate (MACROBID) 100 MG capsule",
    "100 mg, Oral, BID x 7 days",
    "100 mg",
    "Oral",
    "BID",
    {
      correctAction: "reject",
      explanation: "Nitrofurantoin is indicated ONLY for uncomplicated lower UTI (cystitis) — it does NOT achieve adequate tissue concentrations in the renal parenchyma and must NEVER be used to treat pyelonephritis. Using nitrofurantoin here would result in clinical failure. This is a classic teaching point and frequently missed.",
      rejectReasons: [
        { id: "r1", text: "Nitrofurantoin does not achieve adequate renal tissue concentrations", correct: true },
        { id: "r2", text: "Contraindicated for pyelonephritis — will result in treatment failure", correct: true },
        { id: "r3", text: "Appropriate only for uncomplicated cystitis, not upper tract infections", correct: true },
        { id: "r4", text: "Patient has a nitrofurantoin allergy", correct: false },
        { id: "r5", text: "Dose is too low for UTI treatment", correct: false },
        { id: "r6", text: "Nitrofurantoin has no activity against E. coli", correct: false }
      ]
    },
    { timePending: "1h 15m" }
  )
];
const UTI_MEDIUM = [
  mk(
    "UTI_M1",
    "D_UTI",
    "ceftriaxone 1 GM IVPB",
    "1 g, IVPB, Daily",
    "1 g",
    "IVPB",
    "Daily",
    {
      correctAction: "verify",
      explanation: 'Ceftriaxone 1 g IV daily is appropriate empiric therapy for pyelonephritis. Although the patient has a "penicillin — hives" allergy, third-generation cephalosporins have very low cross-reactivity with penicillins (<1-2%) and hives alone (non-anaphylactic) is not an absolute contraindication. Ceftriaxone is standard-of-care for pyelonephritis, does not require renal dose adjustment, and is an excellent choice here.',
      rejectReasons: [
        { id: "r1", text: "Penicillin allergy with hives is an absolute contraindication to cephalosporins", correct: false },
        { id: "r2", text: "Dose is too low for pyelonephritis", correct: false },
        { id: "r3", text: "Requires renal adjustment in CKD II", correct: false },
        { id: "r4", text: "Not active against typical urinary pathogens", correct: false },
        { id: "r5", text: "Should be oral, not IV", correct: false }
      ]
    },
    { priority: "Stat", timePending: "25m" }
  ),
  mk(
    "UTI_M2",
    "D_UTI",
    "gentamicin 400 MG IVPB",
    "400 mg (5.9 mg/kg), IVPB, Daily (extended-interval)",
    "400 mg",
    "IVPB",
    "Daily",
    {
      correctAction: "reject",
      explanation: "Gentamicin monotherapy for pyelonephritis is problematic. Aminoglycosides are nephrotoxic, and this patient already has CKD Stage II and an acute bump in SCr (1.1 → 1.3). Using a nephrotoxic agent empirically — especially when safer beta-lactam options exist — is hard to justify. Aminoglycosides may be used as adjunctive therapy in specific scenarios, but should not be the empiric monotherapy choice for routine pyelonephritis.",
      rejectReasons: [
        { id: "r1", text: "Aminoglycoside nephrotoxicity in a patient with CKD and rising SCr", correct: true },
        { id: "r2", text: "Safer beta-lactam alternatives (ceftriaxone) are available", correct: true },
        { id: "r3", text: "Not first-line empiric therapy for routine pyelonephritis", correct: true },
        { id: "r4", text: "Patient has an aminoglycoside allergy", correct: false },
        { id: "r5", text: "Dose exceeds maximum allowed", correct: false },
        { id: "r6", text: "Extended-interval dosing is inappropriate in UTI", correct: false }
      ]
    }
  ),
  mk(
    "UTI_M3",
    "D_UTI",
    "ciprofloxacin 500 MG tablet",
    "500 mg, Oral, BID",
    "500 mg",
    "Oral",
    "BID",
    {
      correctAction: "reject",
      explanation: "Oral ciprofloxacin is inappropriate for initial empiric therapy of hospitalized pyelonephritis for several reasons: (1) Patient has septic physiology (tachycardia, elevated lactate, hypotension in ED) — IV therapy is preferred initially. (2) E. coli fluoroquinolone resistance exceeds 20% in many US regions, so ciprofloxacin should not be used empirically for severe UTI without local susceptibility data. (3) FDA boxed warnings on fluoroquinolones recommend avoidance when alternatives are available. IV ceftriaxone is a better empiric choice.",
      rejectReasons: [
        { id: "r1", text: "Hospitalized pyelo with septic features — IV therapy preferred over PO initially", correct: true },
        { id: "r2", text: "E. coli fluoroquinolone resistance >20% in most regions — empiric coverage unreliable", correct: true },
        { id: "r3", text: "FDA boxed warnings recommend avoiding fluoroquinolones when alternatives exist", correct: true },
        { id: "r4", text: "Ciprofloxacin is contraindicated in all UTIs", correct: false },
        { id: "r5", text: "Dose is too high", correct: false },
        { id: "r6", text: "Patient has a ciprofloxacin allergy", correct: false }
      ]
    }
  )
];
const UTI_HARD = [
  {
    ...mk(
      "UTI_H1",
      "D_UTI",
      "ertapenem 1 GM IVPB",
      "1 g, IVPB, Daily",
      "1 g",
      "IVPB",
      "Daily",
      null
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "suboptimal", message: "Ertapenem is effective but is broad-spectrum reserved for ESBL-producing organisms and other resistant pathogens. Using a carbapenem empirically for routine community-acquired pyelonephritis without ESBL risk factors contributes to carbapenem resistance. Save carbapenems for cases with documented or suspected ESBL." },
        reject: { grade: "acceptable", message: "Rejecting is reasonable stewardship-wise — ceftriaxone is preferred for routine community pyelo. However, clarifying with the team is more collegial if they may have ESBL risk information not in the chart." },
        message: { grade: "optimal", message: "Best answer. Message the team to ask about ESBL risk factors (prior ESBL isolation, recent healthcare exposure, nursing home residence, recent broad-spectrum antibiotics). If none exist, recommend narrowing to ceftriaxone for routine community pyelo." }
      },
      explanation: "Carbapenems should be reserved for ESBL — ask about risk factors before accepting empirically.",
      rejectReasons: [
        { id: "r1", text: "Ertapenem is not active against urinary pathogens", correct: false },
        { id: "r2", text: "Dose is too low", correct: false },
        { id: "r3", text: "Patient has a carbapenem allergy", correct: false },
        { id: "r4", text: "Ertapenem requires renal adjustment at baseline", correct: false }
      ]
    }
  },
  {
    ...mk(
      "UTI_H2",
      "D_UTI",
      "aztreonam 1 GM IVPB",
      "1 g, IVPB, Q8H",
      "1 g",
      "IVPB",
      "Q8H",
      null
    ),
    teaching: {
      correctAction: "verify",
      detailedFeedback: {
        verify: { grade: "optimal", message: "Excellent choice given the allergy profile. Aztreonam is a monobactam with gram-negative coverage and NO cross-reactivity with penicillins or most cephalosporins (except ceftazidime, which shares a side chain). It is a reasonable option for patients with severe beta-lactam allergies who need gram-negative coverage for pyelonephritis." },
        reject: { grade: "incorrect", message: "Aztreonam is an appropriate gram-negative agent without cross-reactivity to penicillins. Rejection is not warranted." },
        message: { grade: "acceptable", message: "Confirming the indication is reasonable, but aztreonam is a well-recognized choice in this allergy context." }
      },
      explanation: "Aztreonam has no cross-reactivity with penicillins — good choice for severe PCN allergy + gram-negative infections.",
      rejectReasons: [
        { id: "r1", text: "Aztreonam cross-reacts with penicillin allergy", correct: false },
        { id: "r2", text: "Aztreonam has no gram-negative activity", correct: false },
        { id: "r3", text: "Dose is too low", correct: false },
        { id: "r4", text: "Aztreonam is contraindicated in CKD", correct: false }
      ]
    }
  },
  {
    ...mk(
      "UTI_H3",
      "D_UTI",
      "cefepime 2 GM IVPB",
      "2 g, IVPB, Q12H",
      "2 g",
      "IVPB",
      "Q12H",
      null
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "suboptimal", message: "Cefepime is effective but has broader pseudomonal coverage than needed for routine community-acquired pyelonephritis. Empirically covering Pseudomonas here is unnecessary unless the patient has specific risk factors (recent hospitalization, prior Pseudomonas isolation, structural urinary abnormalities). Ceftriaxone is preferred as a narrower-spectrum choice." },
        reject: { grade: "acceptable", message: "Rejecting is reasonable — ceftriaxone is the standard-of-care for community pyelo. However, clarifying with the team before rejecting would be more collegial in case Pseudomonas risk factors exist that are not in the chart." },
        message: { grade: "optimal", message: "Best answer. Ask the team whether Pseudomonas risk factors exist (prior isolation, hospitalization, indwelling catheter, structural GU abnormality). If none, recommend narrowing to ceftriaxone." }
      },
      explanation: "Cefepime is broader than needed for routine community pyelo — confirm Pseudomonas risk before accepting.",
      rejectReasons: [
        { id: "r1", text: "Cefepime has no gram-negative activity", correct: false },
        { id: "r2", text: "Dose is too low", correct: false },
        { id: "r3", text: "Patient has a cefepime allergy", correct: false },
        { id: "r4", text: "Cefepime is never used for UTI", correct: false }
      ]
    }
  }
];
const AFIB_PATIENT = {
  D_AFIB: {
    name: "KOWALSKI, MARGARET T",
    mrn: "01304522",
    dob: "06/21/1948",
    age: "77F",
    weight: "68 kg",
    height: "158 cm",
    allergies: ["NKDA"],
    room: "5W-512A",
    admitDate: "04/05/2026",
    attending: "Reyes, Daniel, MD",
    dx: "New-onset atrial fibrillation with rapid ventricular response (I48.91), HTN, T2DM",
    code: "Full",
    hp: {
      cc: "Palpitations and lightheadedness x 2 days",
      hpi: "77 y/o F with HTN, T2DM, and prior TIA (2022) presents with 2 days of palpitations, fatigue, and mild lightheadedness. No chest pain or syncope. In ED found in atrial fibrillation with RVR (HR 132), BP 128/78. Troponin negative x2. TSH normal. Echo shows preserved EF 55%, mild LA enlargement, no thrombus. CHA2DS2-VASc = 5 (age, HTN, DM, prior TIA, female). HAS-BLED = 2. Admitted for rate control and anticoagulation initiation.",
      pmh: ["HTN", "T2DM (A1c 7.2)", "TIA 2022 (no residual deficits)", "Osteoarthritis", "Hyperlipidemia"],
      meds: ["Amlodipine 10 mg PO daily", "Metformin 1000 mg PO BID", "Atorvastatin 40 mg PO QHS", "Aspirin 81 mg PO daily", "Acetaminophen PRN"],
      exam: {
        vitals: "T 98.0 | HR 128 irregular | BP 124/76 | RR 18 | SpO2 97% RA",
        cv: "Irregularly irregular, no murmurs, no JVD",
        pulm: "Clear bilaterally",
        ext: "No edema, warm, well-perfused",
        neuro: "A&O x4, no focal deficits"
      },
      assessment: "New-onset AFib with RVR. Hemodynamically stable. High stroke risk (CHA2DS2-VASc 5). Needs rate control and long-term anticoagulation.",
      plan: [
        "1. AFib RVR: Rate control with IV then PO beta-blocker or non-DHP CCB.",
        "2. Anticoagulation: DOAC preferred given high stroke risk.",
        "3. Continue home antihypertensives and statin.",
        "4. Discontinue aspirin once DOAC initiated (no concurrent CAD indication).",
        "5. Telemetry monitoring."
      ]
    },
    labs: {
      "04/05 0500": { Na: "139", K: "4.2", Cl: "102", CO2: "25", BUN: "18", SCr: "0.9", Glucose: ["142", "H"], Ca: "9.4", Mg: "2.0", WBC: "7.8", Hgb: "12.9", Hct: "38.2", Plt: "236", INR: "1.0", PTT: "29", Troponin: "<0.01", TSH: "2.1" }
    },
    notes: [
      { dt: "04/05 0700", author: "Reyes, Daniel, MD", type: "H&P", text: "A: New AFib RVR, hemodynamically stable, high stroke risk.\nP: Rate control, initiate anticoagulation per CHA2DS2-VASc, monitor telemetry." }
    ],
    inpatientMeds: [
      { drug: "Amlodipine", dose: "10 mg", route: "PO", freq: "Daily", sched: ["0900"], status: "Active" },
      { drug: "Atorvastatin", dose: "40 mg", route: "PO", freq: "QHS", sched: ["2100"], status: "Active" },
      { drug: "Metformin", dose: "1000 mg", route: "PO", freq: "BID", sched: ["0800", "2000"], status: "Active" }
    ],
    homeMeds: [
      { drug: "Amlodipine 10 mg", freq: "Daily", status: "Active" },
      { drug: "Aspirin 81 mg", freq: "Daily", status: "Active" },
      { drug: "Atorvastatin 40 mg", freq: "QHS", status: "Active" },
      { drug: "Metformin 1000 mg", freq: "BID", status: "Active" }
    ]
  }
};
const AFIB_EASY = [
  mk(
    "AFIB_E1",
    "D_AFIB",
    "dofetilide (TIKOSYN) 500 MCG capsule",
    "500 mcg, Oral, BID, First dose 4/5/26 0900",
    "500 mcg",
    "Oral",
    "BID",
    {
      correctAction: "reject",
      explanation: "Dofetilide has strict initiation requirements: MUST be started in a facility with continuous ECG monitoring for a minimum of 3 days, with QTc measured 2-3 hours after each dose, and dose adjusted for CrCl. It is NEVER ordered as a first dose without baseline QTc, and it cannot be initiated outside the mandatory Tikosyn REMS program. Ordering dofetilide as a simple admission order is a serious safety error — torsades de pointes risk is significant.",
      rejectReasons: [
        { id: "r1", text: "Dofetilide requires mandatory inpatient initiation with continuous ECG monitoring", correct: true },
        { id: "r2", text: "No baseline QTc documented before initiation", correct: true },
        { id: "r3", text: "Dose not adjusted for CrCl per Tikosyn REMS protocol", correct: true },
        { id: "r4", text: "Dofetilide is contraindicated in all AFib patients", correct: false },
        { id: "r5", text: "Dose is too low for rate control", correct: false },
        { id: "r6", text: "Dofetilide is only available IV", correct: false }
      ]
    },
    { priority: "Stat", timePending: "15m" }
  ),
  mk(
    "AFIB_E2",
    "D_AFIB",
    "aspirin 325 MG tablet",
    "325 mg, Oral, Daily (stroke prevention)",
    "325 mg",
    "Oral",
    "Daily",
    {
      correctAction: "reject",
      explanation: "Aspirin monotherapy is NOT recommended for stroke prevention in AFib. The 2023 ACC/AHA/HRS AFib guidelines explicitly removed aspirin as an acceptable option for stroke prevention in AFib because it provides minimal stroke protection while still carrying bleeding risk. With CHA2DS2-VASc of 5, this patient requires full oral anticoagulation (DOAC preferred). Aspirin also does not add benefit once a DOAC is started and should be discontinued unless there is a separate CAD indication.",
      rejectReasons: [
        { id: "r1", text: "Aspirin is not recommended for stroke prevention in AFib (2023 guidelines)", correct: true },
        { id: "r2", text: "CHA2DS2-VASc of 5 requires full oral anticoagulation, not antiplatelet", correct: true },
        { id: "r3", text: "No concurrent indication for aspirin (no CAD/stents)", correct: true },
        { id: "r4", text: "Patient has an aspirin allergy", correct: false },
        { id: "r5", text: "Dose is too high for cardioprotection", correct: false },
        { id: "r6", text: "Aspirin is contraindicated in HTN", correct: false }
      ]
    }
  )
];
const AFIB_MEDIUM = [
  mk(
    "AFIB_M1",
    "D_AFIB",
    "metoprolol tartrate 5 MG injection",
    "5 mg, IV Push, Q5min x3 PRN HR >110",
    "5 mg",
    "IV Push",
    "Q5min x3 PRN",
    {
      correctAction: "verify",
      explanation: "IV metoprolol 5 mg x3 doses is a standard and appropriate acute rate-control regimen for AFib with RVR in a hemodynamically stable patient. Per ACC/AHA guidelines, beta-blockers (or non-DHP CCBs) are first-line for rate control. Patient has EF 55% (preserved), HR 128, BP 124/76 — no contraindications. Monitor HR and BP between doses.",
      rejectReasons: [
        { id: "r1", text: "Metoprolol contraindicated in AFib", correct: false },
        { id: "r2", text: "Patient is hemodynamically unstable", correct: false },
        { id: "r3", text: "Dose is too high", correct: false },
        { id: "r4", text: "Patient has a beta-blocker allergy", correct: false },
        { id: "r5", text: "Should only use non-DHP CCB for rate control", correct: false }
      ]
    },
    { priority: "Stat", timePending: "30m" }
  ),
  mk(
    "AFIB_M2",
    "D_AFIB",
    "apixaban (ELIQUIS) 5 MG tablet",
    "5 mg, Oral, BID, First dose 4/5/26 0900",
    "5 mg",
    "Oral",
    "BID",
    {
      correctAction: "verify",
      explanation: "Apixaban 5 mg BID is correct for this patient. Dose reduction to 2.5 mg BID would only apply if the patient met ≥2 of: age ≥80, weight ≤60 kg, or SCr ≥1.5. This patient meets only 1 (age 77 is below 80, weight 68 kg, SCr 0.9). DOAC is preferred over warfarin in non-valvular AFib. CHA2DS2-VASc of 5 clearly warrants anticoagulation.",
      rejectReasons: [
        { id: "r1", text: "Dose should be reduced to 2.5 mg BID", correct: false },
        { id: "r2", text: "Warfarin is preferred over DOAC", correct: false },
        { id: "r3", text: "Patient does not need anticoagulation", correct: false },
        { id: "r4", text: "Patient has an apixaban allergy", correct: false },
        { id: "r5", text: "Apixaban contraindicated with metoprolol", correct: false }
      ]
    }
  ),
  mk(
    "AFIB_M3",
    "D_AFIB",
    "digoxin 0.5 MG injection",
    "0.5 mg, IV Push, Once (loading dose)",
    "0.5 mg",
    "IV Push",
    "Once",
    {
      correctAction: "reject",
      explanation: "Digoxin is NOT first-line for rate control in AFib. Per ACC/AHA, digoxin should be reserved for patients with HFrEF or those who cannot tolerate beta-blockers or non-DHP CCBs. This patient has preserved EF (55%) and no contraindication to beta-blockers. Digoxin has a narrow therapeutic window, delayed onset, and is associated with increased mortality when used as first-line in AFib without HF. The patient is already on metoprolol which should be optimized first.",
      rejectReasons: [
        { id: "r1", text: "Digoxin is not first-line rate control (reserve for HFrEF or BB/CCB intolerance)", correct: true },
        { id: "r2", text: "Patient has preserved EF — no HFrEF indication", correct: true },
        { id: "r3", text: "Patient already on beta-blocker which should be optimized first", correct: true },
        { id: "r4", text: "Digoxin is contraindicated in all AFib", correct: false },
        { id: "r5", text: "Dose is below the loading dose range", correct: false },
        { id: "r6", text: "Patient has a digoxin allergy", correct: false }
      ]
    }
  )
];
const AFIB_HARD = [
  {
    ...mk(
      "AFIB_H1",
      "D_AFIB",
      "amiodarone 150 MG injection",
      "150 mg IV bolus then 1 mg/min x6h then 0.5 mg/min",
      "150 mg",
      "IV",
      "Bolus then infusion",
      null,
      { priority: "Stat" }
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "suboptimal", message: "Amiodarone is acceptable for rhythm control in AFib but is not first-line for rate control in a stable patient. This patient is hemodynamically stable (BP 124/76) and should first receive adequate trial of beta-blocker or non-DHP CCB. Amiodarone carries significant long-term toxicities (thyroid, pulmonary, hepatic) and should be reserved for refractory cases or when rhythm control is the chosen strategy." },
        reject: { grade: "suboptimal", message: "Rejecting outright is too aggressive. Amiodarone has a clear role in AFib — just not as first-line rate control in a stable patient. A clarification is more appropriate than rejection." },
        message: { grade: "optimal", message: "Best answer. Clarify with the team whether the goal is rate control (try BB/CCB first) or rhythm control (discuss cardioversion and the rationale for amiodarone given its toxicity profile). Also need anticoagulation duration planning before/after any cardioversion." }
      },
      explanation: "Amiodarone is nuanced in new-onset stable AFib — clarify rate vs rhythm strategy.",
      rejectReasons: [
        { id: "r1", text: "Amiodarone is contraindicated in AFib", correct: false },
        { id: "r2", text: "Dose is too high", correct: false },
        { id: "r3", text: "Patient has amiodarone allergy", correct: false }
      ]
    }
  },
  {
    ...mk(
      "AFIB_H2",
      "D_AFIB",
      "warfarin 5 MG tablet",
      "5 mg, Oral, Daily, First dose 4/5/26 2000",
      "5 mg",
      "Oral",
      "Daily",
      null,
      { times: ["2000"] }
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "acceptable", message: "Warfarin is a valid anticoagulation choice for non-valvular AFib, but current guidelines prefer DOACs over warfarin unless there is a specific contraindication (mechanical valve, moderate-to-severe mitral stenosis, ESRD on some protocols). This patient has normal SCr (0.9) and no valvular disease — a DOAC would be preferred first-line." },
        reject: { grade: "suboptimal", message: "Warfarin is not wrong, just not preferred. Rejecting outright misses the opportunity to discuss the DOAC-first strategy." },
        message: { grade: "optimal", message: "Best answer. Clarify whether the team specifically prefers warfarin (e.g., cost, patient preference, prior failure of DOAC) or whether a DOAC such as apixaban would be appropriate given current guideline preferences." }
      },
      explanation: "DOACs are preferred over warfarin in non-valvular AFib — clarify team rationale.",
      rejectReasons: [
        { id: "r1", text: "Warfarin is never used in AFib anymore", correct: false },
        { id: "r2", text: "Dose is too high", correct: false },
        { id: "r3", text: "Patient has warfarin allergy", correct: false }
      ]
    }
  },
  {
    ...mk(
      "AFIB_H3",
      "D_AFIB",
      "diltiazem 20 MG injection",
      "20 mg, IV Push, Once (0.25 mg/kg)",
      "20 mg",
      "IV Push",
      "Once",
      null,
      { priority: "Stat" }
    ),
    teaching: {
      correctAction: "verify",
      detailedFeedback: {
        verify: { grade: "optimal", message: "Correct. IV diltiazem 0.25 mg/kg (~17-20 mg for 68 kg) is a standard and guideline-supported alternative for acute AFib rate control in a hemodynamically stable patient with preserved EF. Patient has EF 55% (no HFrEF contraindication) and BP 124/76 (adequate). Non-DHP CCBs are equivalent to beta-blockers as first-line rate control in HFpEF or normal EF." },
        reject: { grade: "suboptimal", message: "Diltiazem is only contraindicated in HFrEF. This patient has preserved EF (55%) — diltiazem is an appropriate first-line rate control agent here. Rejecting would delay symptom relief." },
        message: { grade: "acceptable", message: "Diltiazem is clearly appropriate given preserved EF. Messaging for clarification is unnecessary but not harmful." }
      },
      explanation: "Non-DHP CCBs are fine for rate control in AFib with preserved EF. They are only contraindicated in HFrEF.",
      rejectReasons: [
        { id: "r1", text: "Diltiazem is contraindicated in all AFib", correct: false },
        { id: "r2", text: "Patient has HFrEF", correct: false },
        { id: "r3", text: "Dose is too high", correct: false },
        { id: "r4", text: "Should not combine with metoprolol", correct: false }
      ]
    }
  }
];
const SEP_PATIENT = {
  D_SEP: {
    name: "WASHINGTON, ANDRE L",
    mrn: "01405733",
    dob: "08/14/1963",
    age: "62M",
    weight: "94 kg",
    height: "180 cm",
    allergies: ["Vancomycin (red man — infusion reaction, not true allergy)"],
    room: "MICU-3",
    admitDate: "04/05/2026",
    attending: "Nakamura, Lisa, MD",
    dx: "Septic shock from intra-abdominal source (R65.21), T2DM, CKD Stage II",
    code: "Full",
    hp: {
      cc: "Fever, abdominal pain, and confusion x 1 day",
      hpi: "62 y/o M with T2DM (A1c 9.1) and CKD Stage II (baseline SCr 1.3) presents with fever to 39.4, diffuse abdominal pain, and new confusion. In ED found hypotensive (BP 78/44), tachycardic (HR 128), tachypneic (RR 28), febrile (T 39.3), and with mottled extremities. Lactate 4.8. CT abdomen shows sigmoid diverticulitis with free air and 4 cm abscess. Started on IVF resuscitation, empiric broad-spectrum antibiotics, and norepinephrine for MAP <65. Surgery consulted for source control.",
      pmh: ["T2DM (A1c 9.1)", "CKD Stage II (baseline SCr 1.3)", "HTN", "Diverticulosis", "Former smoker"],
      meds: ["Metformin 1000 mg PO BID", "Lisinopril 20 mg PO daily", "Insulin glargine 24 units SQ QHS", "Atorvastatin 20 mg PO QHS"],
      exam: {
        vitals: "T 39.3 | HR 124 | BP 88/52 (on norepi) | RR 26 | SpO2 94% 4L",
        cv: "Tachycardic, regular, no murmurs",
        pulm: "Clear bilaterally",
        abd: "Diffusely tender, guarding, decreased bowel sounds",
        ext: "Cool, mottled, delayed cap refill",
        neuro: "Confused, oriented to self only"
      },
      assessment: "Septic shock from perforated diverticulitis with abscess. Requires broad-spectrum empiric antibiotics covering gram-negatives, anaerobes, and enterococci. Source control pending surgery. Acute on chronic kidney injury.",
      plan: [
        "1. Septic shock: Hour-1 bundle — lactate, cultures, broad-spectrum antibiotics, IVF 30 mL/kg, vasopressors to MAP >65.",
        "2. Source control: Surgery for perforation / abscess drainage.",
        "3. Hold metformin and lisinopril due to AKI.",
        "4. Stress-dose steroids if refractory shock.",
        "5. VTE prophylaxis when hemodynamically stable.",
        "6. Tight glucose control with IV insulin."
      ]
    },
    labs: {
      "04/05 0500": { Na: "138", K: ["5.2", "H"], Cl: "104", CO2: ["18", "L"], BUN: ["42", "H"], SCr: ["2.4", "H"], Glucose: ["312", "H"], Ca: "8.6", Mg: "1.8", Phos: ["4.8", "H"], WBC: ["24.8", "H"], Hgb: "12.1", Hct: "36.0", Plt: ["112", "L"], PT: "14.2", INR: "1.3", Lactate: ["4.8", "H"], Procalcitonin: ["12.4", "H"], "CRP": ["22.6", "H"] },
      "04/04 2300": { WBC: ["26.4", "H"], Lactate: ["5.2", "H"], SCr: ["2.6", "H"], K: ["5.4", "H"] }
    },
    notes: [
      { dt: "04/05 0545", author: "Nakamura, Lisa, MD", type: "ICU Admission Note", text: "A: Septic shock from perforated sigmoid diverticulitis. Acute on chronic kidney injury.\nP: Hour-1 sepsis bundle, surgical source control, pressors to MAP >65, hold nephrotoxins, tight glucose control." }
    ],
    imaging: [
      { dt: "04/05 0400", type: "CT Abdomen/Pelvis w/ contrast", findings: "Sigmoid diverticulitis with pericolonic free air and 4 cm rim-enhancing fluid collection consistent with abscess. No large-volume free fluid." }
    ],
    inpatientMeds: [
      { drug: "Insulin infusion", dose: "Titrate to glucose 140-180", route: "IV", freq: "Continuous", sched: ["Cont"], status: "Active" },
      { drug: "Norepinephrine", dose: "Titrate to MAP >65", route: "IV", freq: "Continuous", sched: ["Cont"], status: "Active" }
    ],
    homeMeds: [
      { drug: "Atorvastatin 20 mg", freq: "QHS", status: "Active" },
      { drug: "Insulin glargine 24 units", freq: "QHS", status: "Active" },
      { drug: "Lisinopril 20 mg", freq: "Daily", status: "HELD (AKI)" },
      { drug: "Metformin 1000 mg", freq: "BID", status: "HELD (AKI)" }
    ]
  }
};
const SEP_EASY = [
  mk(
    "SEP_E1",
    "D_SEP",
    "gentamicin 560 MG injection",
    "560 mg (6 mg/kg), IV, Once, First dose 4/5/26 0900",
    "560 mg",
    "IV",
    "Once",
    {
      correctAction: "reject",
      explanation: "Aminoglycoside monotherapy is inappropriate for septic shock from an intra-abdominal source. Gentamicin lacks anaerobic coverage (needed for GI perforation) and lacks enterococcal coverage. Additionally, this patient has acute kidney injury (SCr rising from 1.3 → 2.4) and aminoglycosides are directly nephrotoxic — starting gentamicin in active AKI is a serious error. Empiric intra-abdominal sepsis coverage should include piperacillin-tazobactam OR carbapenem OR ceftriaxone + metronidazole.",
      rejectReasons: [
        { id: "r1", text: "Nephrotoxic agent in active AKI", correct: true },
        { id: "r2", text: "No anaerobic coverage for intra-abdominal source", correct: true },
        { id: "r3", text: "Not appropriate as empiric monotherapy", correct: true },
        { id: "r4", text: "Patient has a gentamicin allergy", correct: false },
        { id: "r5", text: "Dose is too low", correct: false },
        { id: "r6", text: "Gentamicin only available PO", correct: false }
      ]
    },
    { priority: "Stat", timePending: "10m" }
  ),
  mk(
    "SEP_E2",
    "D_SEP",
    "metformin 1000 MG tablet",
    "1000 mg, Oral, BID (continue home dose)",
    "1000 mg",
    "Oral",
    "BID",
    {
      correctAction: "reject",
      explanation: "Metformin is CONTRAINDICATED in this patient. They are in septic shock with acute kidney injury (SCr 2.4, up from baseline 1.3), hypotension, and elevated lactate (4.8). Metformin should be held when eGFR <30 mL/min, in any acute illness with tissue hypoperfusion, or whenever there is risk of lactic acidosis. Continuing metformin in septic shock is a classic and dangerous error — risk of fatal metformin-associated lactic acidosis.",
      rejectReasons: [
        { id: "r1", text: "Contraindicated in AKI / unstable renal function", correct: true },
        { id: "r2", text: "Risk of metformin-associated lactic acidosis in shock", correct: true },
        { id: "r3", text: "Patient already has elevated lactate (4.8)", correct: true },
        { id: "r4", text: "Should be continued because A1c is high", correct: false },
        { id: "r5", text: "Dose is too high", correct: false },
        { id: "r6", text: "Patient has a metformin allergy", correct: false }
      ]
    }
  )
];
const SEP_MEDIUM = [
  mk(
    "SEP_M1",
    "D_SEP",
    "piperacillin-tazobactam (ZOSYN) 4.5 G IVPB",
    "4.5 g, IVPB, Q8H (extended infusion over 4h), First dose Stat",
    "4.5 g",
    "IVPB",
    "Q8H",
    {
      correctAction: "verify",
      explanation: "Piperacillin-tazobactam 4.5 g IV Q8H as extended infusion is an excellent empiric choice for intra-abdominal sepsis. It provides broad gram-negative, gram-positive, and anaerobic coverage including Pseudomonas and Enterococcus. Extended infusion improves time-above-MIC and is preferred in severe infections. No dose reduction needed initially in sepsis with AKI — adequate drug concentrations are critical in the first 48 hours; renal dose adjustment can occur after stabilization.",
      rejectReasons: [
        { id: "r1", text: "Dose should be reduced for AKI immediately", correct: false },
        { id: "r2", text: "Lacks anaerobic coverage", correct: false },
        { id: "r3", text: "Extended infusion is never recommended", correct: false },
        { id: "r4", text: "Patient has a beta-lactam allergy", correct: false },
        { id: "r5", text: "Should use ceftriaxone monotherapy instead", correct: false }
      ]
    },
    { priority: "Stat", timePending: "8m" }
  ),
  mk(
    "SEP_M2",
    "D_SEP",
    "vancomycin 1750 MG IVPB",
    "1750 mg (18.6 mg/kg), IVPB, loading dose over 90 min",
    "1750 mg",
    "IVPB",
    "Once (load)",
    {
      correctAction: "message",
      explanation: 'Vancomycin loading dose is reasonable (~20 mg/kg actual body weight) but this patient has a documented vancomycin "allergy" of red man syndrome. Red man syndrome is an infusion-rate-related histamine reaction, NOT a true hypersensitivity, and is not a contraindication to vancomycin. However, this needs to be clarified in the chart, and the order should specify a slower infusion rate (over at least 2 hours, often longer). Pharmacists should message to: (1) confirm the red man history is not true allergy, (2) extend infusion time, and (3) consider pre-medication if history is severe. Also need pharmacokinetic dosing consult for subsequent doses in AKI.',
      rejectReasons: [
        { id: "r1", text: "True vancomycin allergy — must reject", correct: false },
        { id: "r2", text: "Dose is too high", correct: false },
        { id: "r3", text: "Not indicated for intra-abdominal sepsis at all", correct: false },
        { id: "r4", text: "Should not be used in AKI", correct: false },
        { id: "r5", text: "Loading doses are never recommended", correct: false }
      ]
    },
    { priority: "Stat" }
  ),
  mk(
    "SEP_M3",
    "D_SEP",
    "hydrocortisone 50 MG injection",
    "50 mg, IV Push, Q6H (stress dose for refractory shock)",
    "50 mg",
    "IV Push",
    "Q6H",
    {
      correctAction: "verify",
      explanation: "Hydrocortisone 200 mg/day (50 mg IV Q6H) is appropriate for septic shock that remains hypotensive despite adequate fluid resuscitation and vasopressor therapy. Per Surviving Sepsis Campaign guidelines, IV hydrocortisone is recommended in adults with septic shock requiring ongoing vasopressor support. This patient remains on norepinephrine with BP 88/52 — meets criteria. Stress-dose steroids reduce shock duration and may improve mortality in refractory cases.",
      rejectReasons: [
        { id: "r1", text: "Steroids contraindicated in all sepsis", correct: false },
        { id: "r2", text: "Dose should be IV methylprednisolone instead", correct: false },
        { id: "r3", text: "Patient not refractory enough yet", correct: false },
        { id: "r4", text: "Patient has a steroid allergy", correct: false },
        { id: "r5", text: "Will worsen glucose control — should not be given", correct: false }
      ]
    }
  )
];
const SEP_HARD = [
  {
    ...mk(
      "SEP_H1",
      "D_SEP",
      "meropenem 1 G IVPB",
      "1 g, IVPB, Q8H, First dose Stat",
      "1 g",
      "IVPB",
      "Q8H",
      null,
      { priority: "Stat" }
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "acceptable", message: "Meropenem is an acceptable empiric choice for intra-abdominal sepsis — broad gram-negative, gram-positive, and anaerobic coverage including ESBL producers. However, patient is already starting on piperacillin-tazobactam (excellent empiric choice), so adding meropenem would be duplicative coverage unless there is a specific reason (prior ESBL, recent broad-spectrum exposure)." },
        reject: { grade: "suboptimal", message: "Meropenem is not wrong for intra-abdominal sepsis — it is a valid empiric option. Rejecting outright without clarifying rationale misses the chance to optimize stewardship." },
        message: { grade: "optimal", message: "Best answer. Clarify with the team: why meropenem when piperacillin-tazobactam is already started? Valid reasons could be prior ESBL history, recent broad-spectrum exposure, or healthcare-associated risk factors. Otherwise, de-escalate or choose one agent to avoid redundant antipseudomonal coverage." }
      },
      explanation: "Carbapenem duplicates piperacillin-tazobactam coverage — clarify rationale for stewardship.",
      rejectReasons: [
        { id: "r1", text: "Meropenem is contraindicated in sepsis", correct: false },
        { id: "r2", text: "Dose is too high", correct: false },
        { id: "r3", text: "No anaerobic coverage", correct: false },
        { id: "r4", text: "Patient has a meropenem allergy", correct: false }
      ]
    }
  },
  {
    ...mk(
      "SEP_H2",
      "D_SEP",
      "normal saline 0.9% 1000 ML IVPB",
      "1 L, IV bolus, over 30 min",
      "1 L",
      "IV",
      "Bolus",
      null,
      { priority: "Stat" }
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "suboptimal", message: "0.9% saline is acceptable but no longer the preferred crystalloid in sepsis. Surviving Sepsis Campaign and SMART/SALT-ED trials support balanced crystalloids (Lactated Ringers, Plasma-Lyte) over normal saline to reduce hyperchloremic acidosis and AKI. This patient already has AKI and metabolic acidosis — large-volume NS would likely worsen both." },
        reject: { grade: "suboptimal", message: "Rejecting the fluid outright is not appropriate — the patient needs volume resuscitation. Better to clarify the choice of crystalloid." },
        message: { grade: "optimal", message: "Best answer. Recommend switching to a balanced crystalloid (LR or Plasma-Lyte) given existing hyperchloremic metabolic acidosis and AKI. Volume resuscitation is clearly needed — just not with chloride-rich saline." }
      },
      explanation: "Balanced crystalloids are preferred over normal saline in sepsis with AKI and acidosis.",
      rejectReasons: [
        { id: "r1", text: "Patient should not receive any IV fluids", correct: false },
        { id: "r2", text: "NS is contraindicated in all sepsis", correct: false },
        { id: "r3", text: "Rate is too slow", correct: false },
        { id: "r4", text: "Patient has a saline allergy", correct: false }
      ]
    }
  },
  {
    ...mk(
      "SEP_H3",
      "D_SEP",
      "enoxaparin (LOVENOX) 40 MG injection",
      "40 mg, SQ, Daily (VTE prophylaxis)",
      "40 mg",
      "SQ",
      "Daily",
      null
    ),
    teaching: {
      correctAction: "message",
      detailedFeedback: {
        verify: { grade: "suboptimal", message: "Enoxaparin 40 mg SQ daily is the standard VTE prophylaxis dose, but two issues: (1) patient has active septic shock with platelets 112 and coagulopathy (INR 1.3), timing of pharmacologic VTE prophylaxis during active shock is nuanced — mechanical prophylaxis may be preferred until stable; and (2) enoxaparin requires renal dose adjustment to 30 mg SQ daily when CrCl <30 mL/min, and this patient has AKI with SCr 2.4 and likely low CrCl." },
        reject: { grade: "acceptable", message: "Rejecting is reasonable given the AKI — dose needs adjustment and patient is not yet hemodynamically stable. However, clarifying with the team is the preferred move so mechanical prophylaxis can be initiated in the interim." },
        message: { grade: "optimal", message: "Best answer. Recommend: (1) hold pharmacologic prophylaxis until hemodynamically stable and platelets trending up, (2) use mechanical prophylaxis (SCDs) now, (3) when ready to start enoxaparin, dose adjust based on CrCl — likely 30 mg SQ daily given AKI. Consider switching to unfractionated heparin if renal function is unstable." }
      },
      explanation: "VTE prophylaxis in septic shock with AKI needs timing and dose adjustment consideration.",
      rejectReasons: [
        { id: "r1", text: "VTE prophylaxis is not indicated in sepsis", correct: false },
        { id: "r2", text: "Enoxaparin is contraindicated in all AKI", correct: false },
        { id: "r3", text: "Dose is too low", correct: false },
        { id: "r4", text: "Patient has a heparin allergy", correct: false }
      ]
    }
  }
];
const DISEASE_CASES = {
  hf: { patients: HF_PATIENT, orders: { easy: HF_EASY, medium: HF_MEDIUM, hard: HF_HARD } },
  cap: { patients: CAP_PATIENT, orders: { easy: CAP_EASY, medium: CAP_MEDIUM, hard: CAP_HARD } },
  uti: { patients: UTI_PATIENT, orders: { easy: UTI_EASY, medium: UTI_MEDIUM, hard: UTI_HARD } },
  afib: { patients: AFIB_PATIENT, orders: { easy: AFIB_EASY, medium: AFIB_MEDIUM, hard: AFIB_HARD } },
  sepsis: { patients: SEP_PATIENT, orders: { easy: SEP_EASY, medium: SEP_MEDIUM, hard: SEP_HARD } }
};
const LS_CASES = "pv-cases";
function loadCases() {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_CASES);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.patients && parsed.orders) return parsed;
  } catch {
  }
  return null;
}
function saveCases(p, o) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(LS_CASES, JSON.stringify({ patients: p, orders: o }));
  } catch {
  }
}
const _saved = loadCases();
const patients = writable(_saved ? _saved.patients : { ...DEMO_PATIENTS });
const orders = writable(_saved ? _saved.orders : [...DEMO_ORDERS]);
const view = writable("home");
const active = writable(null);
const reviewMode = writable(false);
const showUpload = writable(false);
const editMode = writable(false);
function updatePatient(patientId, patch) {
  patients.update((p) => {
    const cur = p[patientId];
    if (!cur) return p;
    return { ...p, [patientId]: { ...cur, ...patch } };
  });
  snapshot();
}
function updateOrder(orderId, patch) {
  let updated = null;
  orders.update((list) => list.map((o) => {
    if (o.id !== orderId) return o;
    updated = { ...o, ...patch };
    return updated;
  }));
  active.update((a) => a && a.id === orderId && updated ? updated : a);
  snapshot();
}
function updateOrderPath(orderId, path, value) {
  let updated = null;
  orders.update((list) => list.map((o) => {
    if (o.id !== orderId) return o;
    const next = structuredClone(o);
    const keys = path.split(".");
    let obj = next;
    for (let i = 0; i < keys.length - 1; i++) {
      if (obj[keys[i]] == null) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    updated = next;
    return next;
  }));
  active.update((a) => a && a.id === orderId && updated ? updated : a);
  snapshot();
}
const difficulty = writable("default");
const theme = writable(
  typeof localStorage !== "undefined" ? localStorage.getItem("pv-theme") || "dark" : "dark"
);
const user = writable(
  typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem("pv-user") || "null") : null
);
const patientCount = derived(patients, ($patients) => Object.keys($patients).length);
const orderCount = derived(orders, ($orders) => $orders.length);
function snapshot() {
  let p, o;
  patients.subscribe((v) => p = v)();
  orders.subscribe((v) => o = v)();
  saveCases(p, o);
}
function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}
const attempts = writable(load("pv-attempts"));
const sessions = writable(load("pv-sessions"));
const totalCompleted = derived(
  attempts,
  ($a) => new Set($a.filter((a) => a.isCorrect).map((a) => a.orderId + "_" + a.sessionId)).size
);
const overallAccuracy = derived(attempts, ($a) => {
  if ($a.length === 0) return 0;
  return Math.round($a.filter((a) => a.isCorrect).length / $a.length * 100);
});
const firstTryAccuracy = derived(attempts, ($a) => {
  const seen = /* @__PURE__ */ new Map();
  for (const a of $a) {
    const key = a.sessionId + "_" + a.orderId;
    if (!seen.has(key)) seen.set(key, a.isCorrect);
  }
  if (seen.size === 0) return 0;
  const correct = [...seen.values()].filter(Boolean).length;
  return Math.round(correct / seen.size * 100);
});
const currentStreak = derived(attempts, ($a) => {
  const firstAttempts = [];
  const seen = /* @__PURE__ */ new Set();
  for (const a of $a) {
    const key = a.sessionId + "_" + a.orderId;
    if (!seen.has(key)) {
      seen.add(key);
      firstAttempts.push(a);
    }
  }
  let streak = 0;
  for (let i = firstAttempts.length - 1; i >= 0; i--) {
    if (firstAttempts[i].isCorrect) streak++;
    else break;
  }
  return streak;
});
const sessionAccuracies = derived(
  sessions,
  ($s) => $s.filter((s) => s.totalAttempts > 0).map((s) => ({
    id: s.id,
    date: new Date(s.startedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    accuracy: Math.round(s.correctAttempts / s.totalAttempts * 100),
    total: s.totalAttempts,
    correct: s.correctAttempts,
    difficulty: s.difficulty
  }))
);
const categoryPerformance = derived(attempts, ($a) => {
  const cats = {};
  for (const a of $a) {
    if (!cats[a.clinicalCategory]) {
      cats[a.clinicalCategory] = { key: a.clinicalCategory, label: a.categoryLabel, total: 0, correct: 0 };
    }
    cats[a.clinicalCategory].total++;
    if (a.isCorrect) cats[a.clinicalCategory].correct++;
  }
  return Object.values(cats).map((c) => ({
    ...c,
    accuracy: c.total > 0 ? Math.round(c.correct / c.total * 100) : 0
  })).sort((a, b) => a.accuracy - b.accuracy);
});
const difficultyBreakdown = derived(attempts, ($a) => {
  const diffs = {};
  for (const a of $a) {
    if (!diffs[a.difficulty]) diffs[a.difficulty] = { total: 0, correct: 0 };
    diffs[a.difficulty].total++;
    if (a.isCorrect) diffs[a.difficulty].correct++;
  }
  return Object.entries(diffs).map(([key, v]) => ({
    key,
    label: key === "default" ? "Tutorial" : key.charAt(0).toUpperCase() + key.slice(1),
    total: v.total,
    correct: v.correct,
    accuracy: v.total > 0 ? Math.round(v.correct / v.total * 100) : 0
  }));
});
const hardModeAvgGrade = derived(attempts, ($a) => {
  const gradeMap = { optimal: 4, acceptable: 3, suboptimal: 2, incorrect: 1 };
  const graded = $a.filter((a) => a.grade);
  if (graded.length === 0) return null;
  const sum = graded.reduce((acc, a) => acc + (gradeMap[a.grade] || 0), 0);
  return (sum / graded.length).toFixed(1);
});
const recentAttempts = derived(attempts, ($a) => $a.slice(-20).reverse());
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let initials = derived$1(() => store_get($$store_subs ??= {}, "$user", user) ? store_get($$store_subs ??= {}, "$user", user).name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "");
    let isPreceptor = derived$1(() => store_get($$store_subs ??= {}, "$user", user)?.role === "preceptor");
    $$renderer2.push(`<div class="sb" data-tutorial="sidebar"><div class="sb-logo">Rx</div> <button${attr_class("sb-btn", void 0, {
      "act": store_get($$store_subs ??= {}, "$view", view) === "home"
    })}>🏠<span class="tip">Home</span></button> <button${attr_class("sb-btn", void 0, {
      "act": store_get($$store_subs ??= {}, "$view", view) === "queue"
    })}>☰<span class="tip">Work Queue</span> `);
    if (store_get($$store_subs ??= {}, "$orders", orders).length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="bdg">${escape_html(store_get($$store_subs ??= {}, "$orders", orders).length)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></button> `);
    if (store_get($$store_subs ??= {}, "$view", view) === "chart") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="sb-btn act">📋<span class="tip">Chart</span></button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button${attr_class("sb-btn", void 0, {
      "act": store_get($$store_subs ??= {}, "$view", view) === "metrics"
    })}>📊<span class="tip">Performance</span> `);
    if (store_get($$store_subs ??= {}, "$attempts", attempts).length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="bdg" style="background:var(--pur)">${escape_html(store_get($$store_subs ??= {}, "$attempts", attempts).length)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></button> <div style="flex:1"></div> <button class="sb-btn">${escape_html(store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? "☀" : "🌙")}<span class="tip">${escape_html(store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? "Light Mode" : "Dark Mode")}</span></button> <button class="sb-btn">⬆<span class="tip">Import Cases</span></button> `);
    if (isPreceptor()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button${attr_class("sb-btn sb-edit", void 0, {
        "act": store_get($$store_subs ??= {}, "$editMode", editMode)
      })}>✎<span class="tip">${escape_html(store_get($$store_subs ??= {}, "$editMode", editMode) ? "Exit Edit Mode" : "Edit Mode")}</span></button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="sb-user"><div class="sb-avatar">${escape_html(initials())}</div> <span class="tip" style="bottom:auto;top:auto;left:52px">${escape_html(store_get($$store_subs ??= {}, "$user", user)?.name)}</span></div> <button class="sb-btn sb-logout">⏻<span class="tip">Sign Out</span></button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Home($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const ALL_ORDERS = {};
    const ALL_PATIENTS = { ...DEMO_PATIENTS };
    for (const o of DEMO_ORDERS) ALL_ORDERS[o.id] = o;
    for (const l of ["easy", "medium", "hard"]) {
      for (const o of getOrdersForDifficulty(l) || []) ALL_ORDERS[o.id] = o;
    }
    for (const dc of Object.values(DISEASE_CASES)) {
      Object.assign(ALL_PATIENTS, dc.patients);
      for (const lvl of Object.values(dc.orders)) {
        for (const o of lvl) ALL_ORDERS[o.id] = o;
      }
    }
    function lookupOrder(a) {
      return a.orderSnapshot || ALL_ORDERS[a.orderId] || store_get($$store_subs ??= {}, "$orders", orders).find((o) => o.id === a.orderId);
    }
    function lookupPatient(a, ord) {
      const pid = ord?.patientId || a.patientId;
      return a.patientSnapshot || ALL_PATIENTS[pid] || store_get($$store_subs ??= {}, "$patients", patients)[pid];
    }
    const LEVELS = ["easy", "medium", "hard"];
    let pickedDisease = null;
    let firstName = derived$1(() => store_get($$store_subs ??= {}, "$user", user)?.name?.split(" ")[0] || "there");
    let hasResume = derived$1(() => store_get($$store_subs ??= {}, "$orders", orders).length > 0);
    $$renderer2.push(`<div class="hm"><div class="hm-hd"><div><div class="hm-hi">Welcome back, ${escape_html(firstName())}</div> <div class="hm-sub">Pick a disease, or resume where you left off.</div></div> `);
    if (hasResume()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="hm-resume"><span class="hm-resume-l">Resume queue</span> <span class="hm-resume-s">${escape_html(store_get($$store_subs ??= {}, "$orders", orders).length)} order${escape_html(store_get($$store_subs ??= {}, "$orders", orders).length === 1 ? "" : "s")} pending →</span></button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="hm-stats"><div class="hm-stat"><div class="hm-stat-n">${escape_html(store_get($$store_subs ??= {}, "$totalCompleted", totalCompleted))}</div> <div class="hm-stat-l">Cases completed</div></div> <div class="hm-stat"><div class="hm-stat-n">${escape_html(store_get($$store_subs ??= {}, "$overallAccuracy", overallAccuracy))}<span class="hm-stat-u">%</span></div> <div class="hm-stat-l">Overall accuracy</div></div> <div class="hm-stat"><div class="hm-stat-n">${escape_html(store_get($$store_subs ??= {}, "$currentStreak", currentStreak))}</div> <div class="hm-stat-l">Current streak</div></div> <div class="hm-stat"><div class="hm-stat-n">${escape_html(store_get($$store_subs ??= {}, "$attempts", attempts).length)}</div> <div class="hm-stat-l">Total attempts</div></div></div> <div class="hm-sect-hd"><h2>Practice by disease</h2> <span class="hm-sect-sub">Choose a condition, then pick your difficulty.</span></div> <div class="hm-grid"><!--[-->`);
    const each_array = ensure_array_like(DISEASES);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let d = each_array[i];
      const built = !!DISEASE_CASES[d.id];
      $$renderer2.push(`<div${attr_class("hm-tile", void 0, { "dim": !built, "open": pickedDisease === d.id })}><button class="hm-tile-main"${attr("disabled", !built, true)}><div class="hm-tile-ic">${escape_html(d.icon)}</div> <div class="hm-tile-name">${escape_html(d.label)}</div> <div class="hm-tile-desc">${escape_html(d.desc)}</div> `);
      if (!built) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="hm-tile-soon">Coming soon</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></button> `);
      if (built && pickedDisease === d.id) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="hm-tile-lvls"><!--[-->`);
        const each_array_1 = ensure_array_like(LEVELS);
        for (let li = 0, $$length2 = each_array_1.length; li < $$length2; li++) {
          let l = each_array_1[li];
          $$renderer2.push(`<button${attr_class(`hm-lvl hm-lvl-${stringify(l)}`)}>${escape_html(l[0].toUpperCase() + l.slice(1))}</button>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (store_get($$store_subs ??= {}, "$recentAttempts", recentAttempts).length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="hm-sect-hd"><h2>Recent activity</h2></div> <div class="hm-recent"><!--[-->`);
      const each_array_2 = ensure_array_like(store_get($$store_subs ??= {}, "$recentAttempts", recentAttempts).slice(0, 6));
      for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
        let a = each_array_2[i];
        const ord = lookupOrder(a);
        lookupPatient(a, ord);
        $$renderer2.push(`<button class="hm-rec"${attr("disabled", !ord, true)}${attr("title", ord ? "Review this order (will not affect stats)" : "Order no longer available")}><span${attr_class("hm-rec-mark", void 0, { "ok": a.isCorrect, "bad": !a.isCorrect })}>${escape_html(a.isCorrect ? "✓" : "✕")}</span> <span class="hm-rec-drug">${escape_html(a.drugName)}</span> <span class="hm-rec-act">${escape_html(a.actionTaken)}</span> <span class="hm-rec-cat">${escape_html(a.categoryLabel)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="hm-jump"><button class="btn bv">Open verification queue →</button></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Queue($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let filter = "all";
    let selectedDisease = null;
    let filtered = derived$1(() => store_get($$store_subs ??= {}, "$orders", orders));
    let patientCount2 = derived$1(() => new Set(store_get($$store_subs ??= {}, "$orders", orders).map((o) => o.patientId)).size);
    const filters = [["all", "All"], ["stat", "Stat"], ["alerts", "Alerts"]];
    const difficulties = [
      ["default", "Tutorial", "Original demo orders"],
      ["easy", "Easy", "Every order has an issue — find it"],
      ["medium", "Medium", "Mix of correct and incorrect orders"],
      [
        "hard",
        "Hard",
        "Clinically nuanced — find the best action"
      ]
    ];
    $$renderer2.push(`<div style="display:flex;flex-direction:column;height:100%"><div class="qhdr"><h1>Verification Queue <span class="ct">${escape_html(store_get($$store_subs ??= {}, "$orders", orders).length)} orders · ${escape_html(patientCount2())} patients</span></h1> <div class="qflt"><!--[-->`);
    const each_array = ensure_array_like(filters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let [k, l] = each_array[$$index];
      $$renderer2.push(`<button${attr_class("fb", void 0, { "act": filter === k })}>${escape_html(l)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="qact"><button class="fb fb-up">⬆ Import Cases</button> <button class="fb">↺ Reset</button> `);
    if (store_get($$store_subs ??= {}, "$orders", orders).length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="fb fb-clr">✕ Clear All</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> <div class="dz-bar"><span class="diff-label">Disease:</span> <!--[-->`);
    const each_array_1 = ensure_array_like(DISEASES);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let d = each_array_1[$$index_1];
      const built = !!DISEASE_CASES[d.id];
      $$renderer2.push(`<button${attr_class("dz-btn", void 0, { "act": selectedDisease === d.id })}${attr("disabled", !built, true)}${attr("title", built ? d.desc : "Coming soon")}><span class="dz-ic">${escape_html(d.icon)}</span>${escape_html(d.label)}`);
      if (!built) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="dz-soon">soon</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="diff-bar" data-tutorial="difficulty"><span class="diff-label">Difficulty:</span> <!--[-->`);
    const each_array_3 = ensure_array_like(difficulties);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let [key, label, desc] = each_array_3[$$index_3];
      $$renderer2.push(`<button${attr_class(`diff-btn diff-${stringify(key)}`, void 0, {
        "act": store_get($$store_subs ??= {}, "$difficulty", difficulty) === key
      })}>${escape_html(label)}</button>`);
    }
    $$renderer2.push(`<!--]--> <span class="diff-desc">${escape_html(difficulties.find((d) => d[0] === store_get($$store_subs ??= {}, "$difficulty", difficulty))?.[2] || "")}</span></div> <div class="qrhdr"><span>Patient</span><span>Medication</span><span>Pending</span><span>Priority</span><span>Alerts</span></div> <div class="ql" data-tutorial="queue">`);
    if (filtered().length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty"><div class="big">${escape_html(store_get($$store_subs ??= {}, "$orders", orders).length === 0 ? "📂" : "✓")}</div> <div${attr_style(`font-size:16px;font-weight:600;color:${stringify(store_get($$store_subs ??= {}, "$orders", orders).length === 0 ? "var(--t2)" : "var(--grn)")}`)}>${escape_html(store_get($$store_subs ??= {}, "$orders", orders).length === 0 ? "No Cases Loaded" : "No Matching Orders")}</div> <div>${escape_html(store_get($$store_subs ??= {}, "$orders", orders).length === 0 ? "Import a case file or reset to demo data" : "Try a different filter")}</div> `);
      if (store_get($$store_subs ??= {}, "$orders", orders).length === 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div style="display:flex;gap:8px;margin-top:8px"><button class="btn bv">⬆ Import Cases</button> <button class="btn">↺ Load Demo</button></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_4 = ensure_array_like(filtered());
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let o = each_array_4[$$index_4];
        const pt = store_get($$store_subs ??= {}, "$patients", patients)[o.patientId];
        if (pt) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="qr"><div><div class="pt">${escape_html(pt.name)} <span style="font-weight:400;font-size:13px;color:var(--t3)">${escape_html(pt.room)}</span></div> <div class="dx">${escape_html(pt.dx)}</div></div> <div><div class="dr">${escape_html(o.drugName.split(" ").slice(0, 4).join(" "))}`);
          if (o.isNew) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<span class="nb">New</span>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="dl">${escape_html(o.clinical?.dose)}, ${escape_html(o.clinical?.route)}, ${escape_html(o.clinical?.freq)}</div></div> <div class="tm">${escape_html(o.timePending)}</div> <div><span${attr_class(`pri pri-${stringify((o.priority || "R")[0])}`)}>${escape_html(o.priority)}</span></div> <div class="alc">`);
          if (o.alerts.length > 0) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<span${attr_style(`color:${stringify(o.alerts.some((a) => a.sev === "critical") ? "var(--red)" : o.alerts.some((a) => a.sev === "warning") ? "var(--amb)" : "var(--a)")}`)}>${escape_html(o.alerts.length)}</span>`);
          } else {
            $$renderer2.push("<!--[-1-->");
            $$renderer2.push(`—`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Editable($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let {
      value,
      onCommit,
      multiline = false,
      placeholder = "—",
      inputClass = ""
    } = $$props;
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<span${attr_class("ed", void 0, {
        "ed-on": store_get($$store_subs ??= {}, "$editMode", editMode)
      })}${attr("title", store_get($$store_subs ??= {}, "$editMode", editMode) ? "Click to edit" : "")}>${escape_html(value || (store_get($$store_subs ??= {}, "$editMode", editMode) ? placeholder : ""))}</span>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function VerifyTab($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { order, patient } = $$props;
    const SEV = {
      critical: {
        bg: "rgba(248,113,113,0.1)",
        bd: "rgba(248,113,113,0.25)",
        c: "#f87171",
        d: "🔴"
      },
      warning: {
        bg: "rgba(251,191,36,0.1)",
        bd: "rgba(251,191,36,0.2)",
        c: "#fbbf24",
        d: "🟡"
      },
      info: {
        bg: "rgba(91,138,245,0.08)",
        bd: "rgba(91,138,245,0.15)",
        c: "#5b8af5",
        d: "🔵"
      }
    };
    let vt = "clinical";
    JSON.parse(JSON.stringify(order.schedule || []));
    function getLatestLab(key) {
      const labs = Object.values(patient.labs || {});
      if (!labs[0] || !labs[0][key]) return "—";
      return Array.isArray(labs[0][key]) ? labs[0][key][0] : labs[0][key];
    }
    function calcCrCl() {
      const scr = parseFloat(getLatestLab("SCr"));
      const age = parseInt(patient.age);
      const wt = parseFloat(patient.weight);
      const female = (patient.age || "").includes("F");
      if (!scr || !age || !wt) return "—";
      return Math.round((140 - age) * wt / (72 * scr) * (female ? 0.85 : 1)) + " mL/min";
    }
    const clinicalFields = derived$1(() => [
      ["Order Dose", "dose", order.clinical?.dose],
      ["Route", "route", order.clinical?.route],
      ["Frequency", "freq", order.clinical?.freq],
      ["Admin Duration", "duration", order.clinical?.duration || ""],
      ["Rate", "rate", order.clinical?.rate || ""],
      ["Volume", "volume", order.clinical?.volume || ""],
      ["Priority", "priority", order.clinical?.priority],
      ["Start", "start", order.clinical?.start],
      ["Stop", "stop", order.clinical?.stop || ""]
    ]);
    const quickRef = derived$1(() => [
      ["SCr", getLatestLab("SCr")],
      ["K+", getLatestLab("K")],
      ["BUN", getLatestLab("BUN")],
      ["WBC", getLatestLab("WBC")],
      ["Weight", patient.weight]
    ]);
    const dispenseRows = derived$1(() => order.dispense ? [
      ["Dispense From", order.dispense.from],
      ["First Doses", order.dispense.firstDose],
      ["Code", order.dispense.code],
      ["Triggered", order.dispense.triggered ? "✓ Yes" : "No"]
    ] : []);
    $$renderer2.push(`<div class="vp"><div class="vpm"><div class="oh"><div class="od">`);
    Editable($$renderer2, {
      value: order.drugName,
      onCommit: (v) => updateOrder(order.id, { drugName: v })
    });
    $$renderer2.push(`<!---->`);
    if (order.isNew) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="nb">New</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="ol">`);
    Editable($$renderer2, {
      value: order.orderLine,
      onCommit: (v) => updateOrder(order.id, { orderLine: v }),
      multiline: true
    });
    $$renderer2.push(`<!----></div> <div class="oid">Order: `);
    Editable($$renderer2, {
      value: order.orderId,
      onCommit: (v) => updateOrder(order.id, { orderId: v })
    });
    $$renderer2.push(`<!----></div> <!--[-->`);
    const each_array = ensure_array_like(order.alerts || []);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let a = each_array[$$index];
      const s = SEV[a.sev] || SEV.info;
      $$renderer2.push(`<div class="ar"${attr_style(`background:${stringify(s.bg)};color:${stringify(s.c)};border:1px solid ${stringify(s.bd)}`)}>${escape_html(s.d)} ${escape_html(a.text)}</div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="vts"><!--[-->`);
    const each_array_1 = ensure_array_like(["clinical", "schedule", "product"]);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let t = each_array_1[$$index_1];
      $$renderer2.push(`<div${attr_class("vt", void 0, { "act": vt === t })}>${escape_html(t === "clinical" ? "Clinical Details" : t === "schedule" ? "Scheduled Times" : "Product Info")}</div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (order.clinical) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="cd" style="margin-bottom:0"><div class="cg"><!--[-->`);
      const each_array_2 = ensure_array_like(clinicalFields());
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let [label, key, value] = each_array_2[$$index_2];
        $$renderer2.push(`<div class="fg"><label>${escape_html(label)}</label><div class="fv">`);
        Editable($$renderer2, {
          value,
          onCommit: (v) => updateOrderPath(order.id, `clinical.${key}`, v)
        });
        $$renderer2.push(`<!----></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="va"><button class="btn bv">✓ Verify</button> <button class="btn br">✕ Reject</button> <button class="btn">💬 Message</button></div></div> <div class="vps"><div class="dp" style="margin-bottom:14px"><h3>Dispense Details</h3> <!--[-->`);
    const each_array_5 = ensure_array_like(dispenseRows());
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let [label, value] = each_array_5[$$index_5];
      $$renderer2.push(`<div class="drow"><span class="dll">${escape_html(label)}</span><span class="dvv">${escape_html(value || "—")}</span></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="dp" style="margin-bottom:14px"><h3>Order Details</h3> <div class="drow"><span class="dll">Ordered By</span><span class="dvv" style="color:var(--a)">`);
    Editable($$renderer2, {
      value: order.orderedBy,
      onCommit: (v) => updateOrder(order.id, { orderedBy: v })
    });
    $$renderer2.push(`<!----></span></div> <div class="drow"><span class="dll">Date/Time</span><span class="dvv">`);
    Editable($$renderer2, {
      value: order.orderedDt,
      onCommit: (v) => updateOrder(order.id, { orderedDt: v })
    });
    $$renderer2.push(`<!----></span></div></div> `);
    if (store_get($$store_subs ??= {}, "$editMode", editMode)) {
      $$renderer2.push("<!--[0-->");
      const t = order.teaching || {};
      const reasons = t.rejectReasons || [];
      $$renderer2.push(`<div class="dp tch-edit" style="margin-bottom:14px"><h3>✎ Teaching (preceptor)</h3> <div class="drow"><span class="dll">Correct action</span></div> <div style="display:flex;gap:6px;margin:4px 0 10px"><!--[-->`);
      const each_array_6 = ensure_array_like(["verify", "reject", "message"]);
      for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
        let a = each_array_6[$$index_6];
        $$renderer2.push(`<button type="button"${attr_class("fb", void 0, { "act": t.correctAction === a })}>${escape_html(a[0].toUpperCase() + a.slice(1))}</button>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="drow" style="margin-top:8px"><span class="dll">Explanation</span></div> <div style="margin-top:4px">`);
      Editable($$renderer2, {
        value: t.explanation || "",
        multiline: true,
        onCommit: (v) => updateOrderPath(order.id, "teaching.explanation", v)
      });
      $$renderer2.push(`<!----></div> <div class="drow" style="margin-top:14px;align-items:center"><span class="dll">Reject reasons</span> <button type="button" class="fb">+ Add</button></div> <div style="display:flex;flex-direction:column;gap:6px;margin-top:6px"><!--[-->`);
      const each_array_7 = ensure_array_like(reasons);
      for (let i = 0, $$length = each_array_7.length; i < $$length; i++) {
        let r = each_array_7[i];
        $$renderer2.push(`<div class="tch-reason"><button type="button"${attr_class("tch-toggle", void 0, { "on": r.correct })}${attr("title", r.correct ? "Correct reason — click to mark incorrect" : "Incorrect reason — click to mark correct")}>${escape_html(r.correct ? "✓" : "✕")}</button> <div style="flex:1;font-size:12px">`);
        Editable($$renderer2, {
          value: r.text,
          multiline: true,
          onCommit: (v) => updateOrderPath(order.id, `teaching.rejectReasons.${i}.text`, v)
        });
        $$renderer2.push(`<!----></div> <button type="button" class="fb" title="Remove">✕</button></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (reasons.length === 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div style="font-size:12px;color:var(--t3)">No reject reasons. Click + Add to create one.</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="dp"><h3>Quick Reference</h3> <!--[-->`);
    const each_array_8 = ensure_array_like(quickRef());
    for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
      let [label, value] = each_array_8[$$index_8];
      $$renderer2.push(`<div class="drow"><span class="dll">${escape_html(label)}</span><span class="dvv" style="font-family:var(--m)">${escape_html(value)}</span></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="drow"><span class="dll">CrCl (est)</span><span class="dvv" style="font-family:var(--m)">${escape_html(calcCrCl())}</span></div> <div style="height:1px;background:var(--gbo);margin:6px 0"></div> <div class="drow"><span class="dll">Allergies</span><span class="dvv" style="color:var(--red);font-size:12px">${escape_html((patient.allergies || ["NKDA"]).join(", "))}</span></div></div></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Toast($$renderer, $$props) {
  let { message, type = "ok" } = $$props;
  $$renderer.push(`<div${attr_class("tst", void 0, {
    "tok": type === "ok",
    "ter": type === "er",
    "tinf": type === "inf"
  })}>${escape_html(message)}</div>`);
}
function ChartView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const REACTIONS = [
      "Rash",
      "Hives (urticaria)",
      "Itching (pruritus)",
      "Angioedema (lip/tongue swelling)",
      "Anaphylaxis",
      "Shortness of breath / bronchospasm",
      "Nausea / vomiting",
      "Diarrhea",
      "Stevens-Johnson syndrome (SJS)",
      "Tendon rupture"
    ];
    const SEVERITIES = ["Mild", "Moderate", "Severe", "Life-threatening"];
    function normalizeAllergy(a) {
      if (!a) return { agent: "", severity: "Moderate", reaction: "" };
      if (typeof a === "string") return { agent: a, severity: "Moderate", reaction: "" };
      return {
        agent: a.agent || "",
        severity: a.severity || "Moderate",
        reaction: a.reaction || ""
      };
    }
    function updateAllergy(idx, patch) {
      const cur = (store_get($$store_subs ??= {}, "$patients", patients)[store_get($$store_subs ??= {}, "$active", active).patientId]?.allergies || []).map(normalizeAllergy);
      cur[idx] = { ...cur[idx], ...patch };
      updatePatient(store_get($$store_subs ??= {}, "$active", active).patientId, { allergies: cur });
    }
    function allergyLabel(a) {
      const n = normalizeAllergy(a);
      if (!n.agent) return "";
      if (n.reaction) return `${n.agent} — ${n.reaction}`;
      return n.agent;
    }
    const TABS = [
      "Verify Order",
      "H&P",
      "Progress Notes",
      "Labs",
      "Imaging",
      "Cardio",
      "Home Meds",
      "Inpatient Meds"
    ];
    let tab = "Verify Order";
    let toasts = [];
    let order = derived$1(() => store_get($$store_subs ??= {}, "$active", active));
    let patient = derived$1(() => store_get($$store_subs ??= {}, "$active", active) ? store_get($$store_subs ??= {}, "$patients", patients)[store_get($$store_subs ??= {}, "$active", active).patientId] : null);
    if (order() && patient()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="ch">`);
      if (store_get($$store_subs ??= {}, "$reviewMode", reviewMode)) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="rev-banner">👁 Review mode — this attempt will not affect your stats</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="cban"><button class="bk">←</button> <div><div class="nm">`);
      Editable($$renderer2, {
        value: patient().name,
        onCommit: (v) => updatePatient(patient().id || store_get($$store_subs ??= {}, "$active", active).patientId, { name: v })
      });
      $$renderer2.push(`<!----></div> <div class="det"><span><span class="l">MRN</span>`);
      Editable($$renderer2, {
        value: patient().mrn,
        onCommit: (v) => updatePatient(store_get($$store_subs ??= {}, "$active", active).patientId, { mrn: v })
      });
      $$renderer2.push(`<!----></span> <span><span class="l">Age</span>`);
      Editable($$renderer2, {
        value: patient().age,
        onCommit: (v) => updatePatient(store_get($$store_subs ??= {}, "$active", active).patientId, { age: v })
      });
      $$renderer2.push(`<!----></span> <span><span class="l">Wt</span>`);
      Editable($$renderer2, {
        value: patient().weight,
        onCommit: (v) => updatePatient(store_get($$store_subs ??= {}, "$active", active).patientId, { weight: v })
      });
      $$renderer2.push(`<!----></span> <span><span class="l">Room</span>`);
      Editable($$renderer2, {
        value: patient().room,
        onCommit: (v) => updatePatient(store_get($$store_subs ??= {}, "$active", active).patientId, { room: v })
      });
      $$renderer2.push(`<!----></span> <span><span class="l">Admit</span>`);
      Editable($$renderer2, {
        value: patient().admitDate,
        onCommit: (v) => updatePatient(store_get($$store_subs ??= {}, "$active", active).patientId, { admitDate: v })
      });
      $$renderer2.push(`<!----></span> <span><span class="l">Attending</span>`);
      Editable($$renderer2, {
        value: patient().attending,
        onCommit: (v) => updatePatient(store_get($$store_subs ??= {}, "$active", active).patientId, { attending: v })
      });
      $$renderer2.push(`<!----></span></div></div> <div class="cbr">`);
      if (!store_get($$store_subs ??= {}, "$editMode", editMode)) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<!--[-->`);
        const each_array = ensure_array_like(patient().allergies || []);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let a = each_array[$$index];
          $$renderer2.push(`<span class="ag">⚠ ${escape_html(allergyLabel(a) || a)}</span>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <span class="ctg">${escape_html(patient().code || "Full")}</span></div></div> `);
      if (store_get($$store_subs ??= {}, "$editMode", editMode)) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="alg-edit-bar"><div class="alg-edit-hd"><span class="alg-edit-ttl">⚠ Allergies</span> <button type="button" class="btn bv">+ Add allergy</button></div> `);
        if ((patient().allergies || []).length === 0) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="alg-edit-empty">No allergies recorded. Click "+ Add allergy" to add one.</div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<div class="alg-edit-rows"><!--[-->`);
          const each_array_1 = ensure_array_like((patient().allergies || []).map(normalizeAllergy));
          for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
            let a = each_array_1[i];
            $$renderer2.push(`<div class="alg-edit-row"><label class="alg-fld"><span class="alg-lbl">Agent</span> <input type="text"${attr("value", a.agent)} placeholder="Drug name"/></label> <label class="alg-fld"><span class="alg-lbl">Severity</span> `);
            $$renderer2.select(
              {
                value: a.severity,
                onchange: (e) => updateAllergy(i, { severity: e.currentTarget.value })
              },
              ($$renderer3) => {
                $$renderer3.push(`<!--[-->`);
                const each_array_2 = ensure_array_like(SEVERITIES);
                for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
                  let s = each_array_2[$$index_1];
                  $$renderer3.option({ value: s }, ($$renderer4) => {
                    $$renderer4.push(`${escape_html(s)}`);
                  });
                }
                $$renderer3.push(`<!--]-->`);
              }
            );
            $$renderer2.push(`</label> <label class="alg-fld"><span class="alg-lbl">Reaction</span> `);
            $$renderer2.select(
              {
                value: a.reaction,
                onchange: (e) => updateAllergy(i, { reaction: e.currentTarget.value })
              },
              ($$renderer3) => {
                $$renderer3.option({ value: "" }, ($$renderer4) => {
                  $$renderer4.push(`— select —`);
                });
                $$renderer3.push(`<!--[-->`);
                const each_array_3 = ensure_array_like(REACTIONS);
                for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
                  let r = each_array_3[$$index_2];
                  $$renderer3.option({ value: r }, ($$renderer4) => {
                    $$renderer4.push(`${escape_html(r)}`);
                  });
                }
                $$renderer3.push(`<!--]-->`);
                if (a.reaction && !REACTIONS.includes(a.reaction)) {
                  $$renderer3.push("<!--[0-->");
                  $$renderer3.option({ value: a.reaction }, ($$renderer4) => {
                    $$renderer4.push(`${escape_html(a.reaction)}`);
                  });
                } else {
                  $$renderer3.push("<!--[-1-->");
                }
                $$renderer3.push(`<!--]-->`);
              }
            );
            $$renderer2.push(`</label> <button type="button" class="alg-rm" title="Remove allergy">✕</button></div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="cts"><!--[-->`);
      const each_array_4 = ensure_array_like(TABS);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let t = each_array_4[$$index_4];
        $$renderer2.push(`<div${attr_class("ctab", void 0, { "act": tab === t })}>${escape_html(t)}</div>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="cbd">`);
      {
        $$renderer2.push("<!--[0-->");
        VerifyTab($$renderer2, {
          order: order(),
          patient: patient()
        });
      }
      $$renderer2.push(`<!--]--></div> <!--[-->`);
      const each_array_5 = ensure_array_like(toasts);
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let t = each_array_5[$$index_5];
        Toast($$renderer2, { message: t.message, type: t.type });
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
const CASE_TEMPLATE = {
  _instructions: "Generate one or more patient cases in this exact JSON format. Each case has a patient object and an array of orders. Wrap the entire output in the top-level structure shown. All fields are required unless marked optional.",
  patients: {
    PATIENT_ID: {
      name: "LAST, FIRST M",
      mrn: "8-digit string",
      dob: "MM/DD/YYYY",
      age: "e.g. 64F or 47M",
      weight: "e.g. 72 kg",
      height: "e.g. 165 cm",
      allergies: ["Allergy1 (Reaction)", "Allergy2 (Reaction)"],
      room: "e.g. 4S-412A",
      admitDate: "MM/DD/YYYY",
      attending: "Last, First, MD",
      dx: "Primary diagnosis (ICD-10)",
      code: "Full|DNR|DNI|CMO",
      hp: {
        cc: "Chief complaint",
        hpi: "Full HPI paragraph",
        pmh: ["Condition 1", "Condition 2"],
        meds: ["Drug dose route freq", "Drug dose route freq"],
        exam: {
          vitals: "T value | HR value | BP value | RR value | SpO2 value",
          cv: "Cardiovascular exam",
          pulm: "Pulmonary exam",
          ext: "Extremities",
          neuro: "Neuro exam"
        },
        assessment: "Assessment paragraph",
        plan: ["Plan item 1", "Plan item 2"]
      },
      labs: {
        "MM/DD HHmm": {
          "TestName": "normal value as string",
          "TestName2": ["abnormal value", "H or L"]
        }
      },
      notes: [
        { dt: "MM/DD HHmm", author: "Name, Credentials", type: "Progress Note|Pharmacy Note|Nursing Note", text: "Note content with \\n for newlines" }
      ],
      inpatientMeds: [
        { drug: "Name", dose: "value unit", route: "PO|IV|SQ|INH|etc", freq: "BID|Daily|Q12H|etc", sched: ["0900", "2100"], status: "Active|Held" }
      ],
      homeMeds: [
        { drug: "Name dose", freq: "BID|Daily|etc", status: "Active|NOT TAKING" }
      ]
    }
  },
  orders: [
    {
      id: "unique string",
      patientId: "matches key in patients",
      orderId: "numeric string",
      isNew: true,
      priority: "Routine|Stat|Now|Urgent",
      timePending: "e.g. 2h 30m",
      drugName: "generic (BRAND) STRENGTH FORM",
      orderLine: "dose, route, freq, first dose info",
      alerts: [
        { text: "Alert message", sev: "critical|warning|info" }
      ],
      clinical: {
        dose: "value unit",
        route: "Oral|IV Push|IVPB|SQ|etc",
        freq: "e.g. Every 12 hours",
        duration: "optional e.g. 30 min",
        rate: "optional e.g. 125 mL/hr",
        volume: "optional e.g. 50 mL NS",
        priority: "Routine|Stat",
        start: "M/D/YYYY HHmm",
        stop: "optional or empty"
      },
      schedule: [
        { date: "M/D/YYYY", times: ["0900", "2100"] }
      ],
      dispense: {
        from: "Cabinet name",
        firstDose: "Cabinet name",
        code: "Unit Dose|Floor Stock",
        triggered: true
      },
      orderedBy: "Last, First, MD",
      orderedDt: "M/D/YYYY HHmm",
      product: { name: "PRODUCT DESCRIPTION", pkg: "Package (NDC)" }
    }
  ]
};
`You are generating patient case scenarios for an inpatient pharmacist order verification training tool. Output ONLY valid JSON (no markdown, no backticks, no commentary) matching this exact schema:

${JSON.stringify(CASE_TEMPLATE, null, 2)}

Guidelines:
- Generate realistic, clinically accurate inpatient cases
- Include appropriate drug-allergy alerts, renal dosing alerts, drug interactions
- Labs should include at least 2 collection times with trending values
- Include at least 1 progress note and relevant H&P
- Inpatient meds should reflect what's ordered in the case
- Home meds should be the patient's outpatient medication list
- Orders should include realistic scheduled times, dispense details, NDC-like package info
- Each case should present 2-4 orders to verify per patient
- Make cases clinically interesting with teaching points (renal dosing, drug interactions, allergy cross-reactivity, indication verification, dose optimization)
- Patient IDs should be P-prefixed (P001, P002, etc.) — if adding to existing cases, use higher numbers
- Order IDs should be ORD-prefixed (ORD101, ORD102, etc.)

Generate the requested number of patient cases now.`;
function UploadModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let dragging = false;
    $$renderer2.push(`<div class="tmo"><div class="tmb" style="width:480px"><h3>Import Patient Cases</h3> <p>Upload a JSON file generated by Claude Opus with patient scenarios. Cases will be added to your existing queue (${escape_html(store_get($$store_subs ??= {}, "$patientCount", patientCount))} patients, ${escape_html(store_get($$store_subs ??= {}, "$orderCount", orderCount))} orders).</p>  <div${attr_class("upzone", void 0, { "drag": dragging })}><div class="icon">${escape_html("📄")}</div> <div style="font-size:13px;font-weight:500">Drop JSON file here or click to browse</div> <div style="font-size:13px;color:var(--t3);margin-top:4px">.json or .txt files accepted</div></div> <input type="file" accept=".json,.txt" style="display:none"/> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div style="display:flex;gap:6px;margin-bottom:14px"><button class="fb fb-tpl" style="flex:1">📝 Opus Prompt Template</button> <button class="fb fb-tpl" style="flex:1">📋 Sample JSON</button></div> <div class="tma"><button class="btn">Cancel</button> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Landing($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="lp"><header class="lp-nav"><div class="lp-brand"><span class="lp-logo">Rx</span> PharmVerify</div> <div class="lp-nav-r"><button class="lp-link">How it works</button> <button class="lp-theme">${escape_html(store_get($$store_subs ??= {}, "$theme", theme) === "dark" ? "Light" : "Dark")}</button> <button class="lp-cta-sm">Sign in</button></div></header> <section class="lp-hero"><div class="lp-hero-l"><div class="lp-eyebrow">Inpatient pharmacy training</div> <h1 class="lp-h1">Train pharmacist judgment, <span class="lp-accent">one order at a time.</span></h1> <p class="lp-lede">Realistic inpatient orders inside an EHR-style workstation. No hints. Real feedback the moment you decide.</p> <div class="lp-cta-row"><button class="lp-cta">Start a case →</button> <button class="lp-cta-ghost">How it works</button></div> <div class="lp-trust"><span>✓ ISMP high-alert meds</span> <span>✓ IDSA &amp; ACC/AHA guidelines</span> <span>✓ Board-prep aligned</span></div></div> <div class="lp-mock"><div class="lp-mock-bar"><span class="lp-dot lp-dot-r"></span> <span class="lp-dot lp-dot-y"></span> <span class="lp-dot lp-dot-g"></span> <span class="lp-mock-title">PharmVerify — Verification Queue</span></div> <div class="lp-mock-body"><div class="lp-mock-side"><div class="lp-mock-sh">QUEUE</div> <div class="lp-mock-si act">Verify Order</div> <div class="lp-mock-si">H&amp;P</div> <div class="lp-mock-si">Labs <span class="lp-mock-bdg">3</span></div> <div class="lp-mock-si">Home Meds</div></div> <div class="lp-mock-main"><div class="lp-mock-pt"><div class="lp-mock-name">MONROE, ELEANOR J <span class="lp-mock-meta">73F · 4S-408B</span></div> <div class="lp-mock-dx">Acute decompensated HFrEF (EF 25%) · CKD III</div></div> <div class="lp-mock-order"><div class="lp-mock-drug">diltiazem 30 MG tablet</div> <div class="lp-mock-line">30 mg, Oral, QID · First dose 0900</div> <div class="lp-mock-flags"><span class="lp-flag lp-flag-r">SCr 1.9 H</span> <span class="lp-flag lp-flag-r">K 5.4 H</span> <span class="lp-flag lp-flag-y">EF 25%</span></div></div> <div class="lp-mock-actions"><button class="lp-mock-btn lp-mock-v" disabled="">Verify</button> <button class="lp-mock-btn lp-mock-r" disabled="">Reject</button> <button class="lp-mock-btn lp-mock-m" disabled="">Message MD</button></div></div></div></div></section> <section class="lp-shots"><h2 class="lp-h2">A look inside</h2> <div class="lp-shot-grid"><figure class="lp-shot reveal-d1"><img src="/home.png" alt="Home dashboard with disease practice tiles and stats" loading="lazy"/> <figcaption>Home dashboard — pick a disease, track your stats</figcaption></figure> <figure class="lp-shot reveal-d2"><img src="/verify.png" alt="Order verification screen inside the EHR-style workstation" loading="lazy"/> <figcaption>Verify, reject, or message — with the full chart at hand</figcaption></figure> <figure class="lp-shot reveal-d3"><img src="/hp.png" alt="Patient H and P chart view with vitals and exam" loading="lazy"/> <figcaption>Real chart context — H&amp;P, vitals, PMH, home meds</figcaption></figure> <figure class="lp-shot reveal-d4"><img src="/edit-mode.png" alt="Preceptor edit mode with editable allergies and labs" loading="lazy"/> <figcaption>Preceptor edit mode — tweak any field, build cases live</figcaption></figure></div></section> <section class="lp-how" id="how"><h2 class="lp-h2">How it works</h2> <div class="lp-steps"><div class="lp-step reveal-d1"><div class="lp-step-n">1</div> <div class="lp-step-t">Review the chart</div> <div class="lp-step-d">H&amp;P, labs with abnormal flags, home meds, inpatient meds, notes — just like a real EHR.</div></div> <div class="lp-step reveal-d2"><div class="lp-step-n">2</div> <div class="lp-step-t">Decide</div> <div class="lp-step-d">Verify, reject with a reason, or message the prescriber. No hints, no priming.</div></div> <div class="lp-step reveal-d3"><div class="lp-step-n">3</div> <div class="lp-step-t">Get graded feedback</div> <div class="lp-step-d">See the clinical rationale, the guideline, and what an optimal action would have been.</div></div></div></section> <section class="lp-disease"><h2 class="lp-h2">Pick a disease, pick a difficulty</h2> <p class="lp-h2-sub reveal-d1">Cases organized by the conditions you'll actually verify on the floor.</p> <div class="lp-disease-grid"><!--[-->`);
      const each_array = ensure_array_like([
        ["❤", "Heart Failure", false],
        ["🫁", "Pneumonia (CAP)", false],
        ["💊", "UTI / Pyelo", false],
        ["🌬", "COPD", true],
        ["💧", "DKA", true],
        ["🔥", "Sepsis", true]
      ]);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let [ic, name, soon] = each_array[i];
        $$renderer2.push(`<div${attr_class(`lp-dz reveal-zoom reveal-d${stringify(i % 5 + 1)}`, void 0, { "dim": soon })}><span class="lp-dz-ic">${escape_html(ic)}</span><div>${escape_html(name)}`);
        if (soon) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="lp-dz-soon">soon</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div></section> <section class="lp-final"><h2 class="lp-h2">Ready to start?</h2> <button class="lp-cta reveal-d1">Create your account →</button> <p class="lp-foot reveal-d2">Your data is stored locally on this device only.</p></section></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function MetricsView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const gradeLabels = {
      optimal: "Optimal",
      acceptable: "Acceptable",
      suboptimal: "Suboptimal",
      incorrect: "Incorrect"
    };
    function barColor(acc) {
      if (acc >= 80) return "var(--grn)";
      if (acc >= 60) return "var(--amb)";
      return "var(--red)";
    }
    const CW = 600;
    const CH = 200;
    const PAD = 40;
    let chartPoints = derived$1(() => () => {
      const sa = store_get($$store_subs ??= {}, "$sessionAccuracies", sessionAccuracies);
      if (sa.length < 2) return null;
      const maxPts = Math.min(sa.length, 20);
      const data = sa.slice(-maxPts);
      const xStep = (CW - PAD * 2) / (data.length - 1);
      return data.map((s, i) => ({
        x: PAD + i * xStep,
        y: PAD + (CH - PAD * 2) * (1 - s.accuracy / 100),
        ...s
      }));
    });
    let weakestCategory = derived$1(() => () => {
      const cats = store_get($$store_subs ??= {}, "$categoryPerformance", categoryPerformance);
      if (cats.length === 0) return null;
      const worst = cats[0];
      if (worst.accuracy >= 80) return null;
      return worst;
    });
    $$renderer2.push(`<div class="mx-wrap"><div class="mx-hdr"><h1>Performance Dashboard</h1> <div style="display:flex;gap:8px;align-items:center">`);
    if (store_get($$store_subs ??= {}, "$attempts", attempts).length > 0) {
      $$renderer2.push("<!--[0-->");
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<button class="fb fb-clr">Reset Metrics</button>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (store_get($$store_subs ??= {}, "$attempts", attempts).length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mx-empty"><div style="font-size:48px;opacity:.4">📊</div> <div style="font-size:18px;font-weight:600;color:var(--t2)">No Data Yet</div> <p style="font-size:14px;color:var(--t3);max-width:360px;text-align:center">Complete some orders in the verification queue to start tracking your performance.</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="mx-stats"><div class="mx-stat"><div class="mx-stat-val">${escape_html(store_get($$store_subs ??= {}, "$totalCompleted", totalCompleted))}</div> <div class="mx-stat-lbl">Orders Completed</div></div> <div class="mx-stat"><div class="mx-stat-val"${attr_style(`color:${stringify(barColor(store_get($$store_subs ??= {}, "$overallAccuracy", overallAccuracy)))}`)}>${escape_html(store_get($$store_subs ??= {}, "$overallAccuracy", overallAccuracy))}%</div> <div class="mx-stat-lbl">Overall Accuracy</div></div> <div class="mx-stat"><div class="mx-stat-val"${attr_style(`color:${stringify(barColor(store_get($$store_subs ??= {}, "$firstTryAccuracy", firstTryAccuracy)))}`)}>${escape_html(store_get($$store_subs ??= {}, "$firstTryAccuracy", firstTryAccuracy))}%</div> <div class="mx-stat-lbl">First-Try Accuracy</div></div> <div class="mx-stat"><div class="mx-stat-val" style="color:var(--a)">${escape_html(store_get($$store_subs ??= {}, "$currentStreak", currentStreak))}</div> <div class="mx-stat-lbl">Current Streak</div></div> `);
      if (store_get($$store_subs ??= {}, "$hardModeAvgGrade", hardModeAvgGrade)) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="mx-stat"><div class="mx-stat-val" style="color:var(--pur)">${escape_html(store_get($$store_subs ??= {}, "$hardModeAvgGrade", hardModeAvgGrade))}</div> <div class="mx-stat-lbl">Hard Avg Grade (4=Best)</div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (store_get($$store_subs ??= {}, "$sessionAccuracies", sessionAccuracies).length >= 2) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="mx-card"><h2>Accuracy Over Time</h2> <div class="mx-chart-wrap"><svg${attr("viewBox", `0 0 ${stringify(CW)} ${stringify(CH)}`)} class="mx-chart"><!--[-->`);
        const each_array = ensure_array_like([0, 25, 50, 75, 100]);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let pct = each_array[$$index];
          const y = PAD + (CH - PAD * 2) * (1 - pct / 100);
          $$renderer2.push(`<line${attr("x1", PAD)}${attr("y1", y)}${attr("x2", CW - PAD)}${attr("y2", y)} stroke="var(--gbo)" stroke-dasharray="4,4"></line><text${attr("x", PAD - 8)}${attr("y", y + 4)} text-anchor="end" fill="var(--t3)" font-size="11">${escape_html(pct)}%</text>`);
        }
        $$renderer2.push(`<!--]-->`);
        if (chartPoints()()) {
          $$renderer2.push("<!--[0-->");
          const pts = chartPoints()();
          $$renderer2.push(`<polyline fill="none" stroke="var(--a)" stroke-width="2.5" stroke-linejoin="round"${attr("points", pts.map((p) => `${p.x},${p.y}`).join(" "))}></polyline><!--[-->`);
          const each_array_1 = ensure_array_like(pts);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let p = each_array_1[$$index_1];
            $$renderer2.push(`<circle${attr("cx", p.x)}${attr("cy", p.y)} r="4" fill="var(--a)" stroke="var(--bg)" stroke-width="2"></circle>`);
          }
          $$renderer2.push(`<!--]--><!--[-->`);
          const each_array_2 = ensure_array_like(pts);
          for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
            let p = each_array_2[i];
            if (i === 0 || i === pts.length - 1 || pts.length <= 8) {
              $$renderer2.push("<!--[0-->");
              $$renderer2.push(`<text${attr("x", p.x)}${attr("y", CH - 8)} text-anchor="middle" fill="var(--t3)" font-size="10">${escape_html(p.date)}</text>`);
            } else {
              $$renderer2.push("<!--[-1-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></svg></div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="mx-row"><div class="mx-card mx-flex1"><h2>Performance by Topic</h2> `);
      if (store_get($$store_subs ??= {}, "$categoryPerformance", categoryPerformance).length === 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p style="color:var(--t3)">No topic data yet.</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        const weak = weakestCategory()();
        $$renderer2.push(`<div class="mx-topics"><!--[-->`);
        const each_array_3 = ensure_array_like(store_get($$store_subs ??= {}, "$categoryPerformance", categoryPerformance));
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let cat = each_array_3[$$index_3];
          $$renderer2.push(`<div class="mx-topic"><div class="mx-topic-hdr"><span class="mx-topic-name">${escape_html(cat.label)}</span> <span class="mx-topic-pct"${attr_style(`color:${stringify(barColor(cat.accuracy))}`)}>${escape_html(cat.accuracy)}%</span> <span class="mx-topic-cnt">(${escape_html(cat.correct)}/${escape_html(cat.total)})</span></div> <div class="mx-bar-bg"><div class="mx-bar-fill"${attr_style(`width:${stringify(cat.accuracy)}%;background:${stringify(barColor(cat.accuracy))}`)}></div></div></div>`);
        }
        $$renderer2.push(`<!--]--></div> `);
        if (weak) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="mx-review-tip">📝 <strong>Area to review:</strong> ${escape_html(weak.label)} (${escape_html(weak.accuracy)}% accuracy). Focus on orders in this category to improve.</div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="mx-card mx-flex1"><h2>By Difficulty</h2> `);
      if (store_get($$store_subs ??= {}, "$difficultyBreakdown", difficultyBreakdown).length === 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p style="color:var(--t3)">No data yet.</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="mx-diff-grid"><!--[-->`);
        const each_array_4 = ensure_array_like(store_get($$store_subs ??= {}, "$difficultyBreakdown", difficultyBreakdown));
        for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
          let d = each_array_4[$$index_4];
          $$renderer2.push(`<div class="mx-diff-item"><div class="mx-diff-label">${escape_html(d.label)}</div> <div class="mx-diff-acc"${attr_style(`color:${stringify(barColor(d.accuracy))}`)}>${escape_html(d.accuracy)}%</div> <div class="mx-diff-cnt">${escape_html(d.correct)}/${escape_html(d.total)} correct</div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div></div> <div class="mx-card"><h2>Recent Activity</h2> <div class="mx-activity"><!--[-->`);
      const each_array_5 = ensure_array_like(store_get($$store_subs ??= {}, "$recentAttempts", recentAttempts));
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let a = each_array_5[$$index_5];
        $$renderer2.push(`<div class="mx-act-row"><span class="mx-act-icon"${attr_style(`color:${stringify(a.isCorrect ? "var(--grn)" : "var(--red)")}`)}>${escape_html(a.isCorrect ? "✓" : "✗")}</span> <span class="mx-act-drug">${escape_html(a.drugName.split(" ").slice(0, 4).join(" "))}</span> <span class="mx-act-action">${escape_html(a.actionTaken)}</span> `);
        if (a.grade) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span${attr_class(`mx-act-grade mx-grade-${stringify(a.grade)}`)}>${escape_html(gradeLabels[a.grade])}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <span class="mx-act-diff">${escape_html(a.difficulty === "default" ? "Tutorial" : a.difficulty)}</span> <span class="mx-act-time">${escape_html(new Date(a.timestamp).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }))}</span></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>PharmVerify</title>`);
      });
    });
    if (store_get($$store_subs ??= {}, "$user", user)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="app">`);
      Sidebar($$renderer2);
      $$renderer2.push(`<!----> <div class="main">`);
      if (store_get($$store_subs ??= {}, "$view", view) === "home") {
        $$renderer2.push("<!--[0-->");
        Home($$renderer2);
      } else if (store_get($$store_subs ??= {}, "$view", view) === "queue") {
        $$renderer2.push("<!--[1-->");
        Queue($$renderer2);
      } else if (store_get($$store_subs ??= {}, "$view", view) === "chart") {
        $$renderer2.push("<!--[2-->");
        ChartView($$renderer2);
      } else if (store_get($$store_subs ??= {}, "$view", view) === "metrics") {
        $$renderer2.push("<!--[3-->");
        MetricsView($$renderer2);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div> `);
      if (store_get($$store_subs ??= {}, "$showUpload", showUpload)) {
        $$renderer2.push("<!--[0-->");
        UploadModal($$renderer2);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      Landing($$renderer2);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
