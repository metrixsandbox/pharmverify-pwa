export const CASE_TEMPLATE = {
  _instructions: "Generate one or more patient cases in this exact JSON format. Each case has a patient object and an array of orders. Wrap the entire output in the top-level structure shown. All fields are required unless marked optional.",
  patients: {
    PATIENT_ID: {
      name: "LAST, FIRST M", mrn: "8-digit string", dob: "MM/DD/YYYY", age: "e.g. 64F or 47M",
      weight: "e.g. 72 kg", height: "e.g. 165 cm",
      allergies: ["Allergy1 (Reaction)", "Allergy2 (Reaction)"],
      room: "e.g. 4S-412A", admitDate: "MM/DD/YYYY",
      attending: "Last, First, MD", dx: "Primary diagnosis (ICD-10)",
      code: "Full|DNR|DNI|CMO",
      hp: {
        cc: "Chief complaint",
        hpi: "Full HPI paragraph",
        pmh: ["Condition 1", "Condition 2"],
        meds: ["Drug dose route freq", "Drug dose route freq"],
        exam: {
          vitals: "T value | HR value | BP value | RR value | SpO2 value",
          cv: "Cardiovascular exam", pulm: "Pulmonary exam",
          ext: "Extremities", neuro: "Neuro exam"
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
        { drug: "Name", dose: "value unit", route: "PO|IV|SQ|INH|etc", freq: "BID|Daily|Q12H|etc", sched: ["0900","2100"], status: "Active|Held" }
      ],
      homeMeds: [
        { drug: "Name dose", freq: "BID|Daily|etc", status: "Active|NOT TAKING" }
      ]
    }
  },
  orders: [
    {
      id: "unique string", patientId: "matches key in patients", orderId: "numeric string",
      isNew: true, priority: "Routine|Stat|Now|Urgent", timePending: "e.g. 2h 30m",
      drugName: "generic (BRAND) STRENGTH FORM", orderLine: "dose, route, freq, first dose info",
      alerts: [
        { text: "Alert message", sev: "critical|warning|info" }
      ],
      clinical: {
        dose: "value unit", route: "Oral|IV Push|IVPB|SQ|etc",
        freq: "e.g. Every 12 hours", duration: "optional e.g. 30 min",
        rate: "optional e.g. 125 mL/hr", volume: "optional e.g. 50 mL NS",
        priority: "Routine|Stat", start: "M/D/YYYY HHmm", stop: "optional or empty"
      },
      schedule: [
        { date: "M/D/YYYY", times: ["0900","2100"] }
      ],
      dispense: {
        from: "Cabinet name", firstDose: "Cabinet name",
        code: "Unit Dose|Floor Stock", triggered: true
      },
      orderedBy: "Last, First, MD", orderedDt: "M/D/YYYY HHmm",
      product: { name: "PRODUCT DESCRIPTION", pkg: "Package (NDC)" }
    }
  ]
};

export const OPUS_PROMPT = `You are generating patient case scenarios for an inpatient pharmacist order verification training tool. Output ONLY valid JSON (no markdown, no backticks, no commentary) matching this exact schema:

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
- Patient IDs should be P-prefixed (P001, P002, etc.) \u2014 if adding to existing cases, use higher numbers
- Order IDs should be ORD-prefixed (ORD101, ORD102, etc.)

Generate the requested number of patient cases now.`;
