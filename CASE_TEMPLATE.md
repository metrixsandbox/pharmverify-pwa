# PharmVerify Case Generation Template

Use this prompt when asking an LLM (or writing by hand) to generate new patient cases for PharmVerify. It produces cases that work with the feedback system **without giving the student any hints**.

## Rules for every case

1. **NO `hint` field** anywhere. Do not include teaching hints.
2. **NO `alerts`** — keep the array empty: `"alerts": []`. The EHR-style alert bar was removed because it gave away the answer.
3. **Every order must have a `teaching` object** so the student gets feedback after they act. Structure:
   - `correctAction`: `"verify"` | `"reject"` | `"message"`
   - `explanation`: a paragraph the student sees AFTER deciding — this is where you teach the clinical reasoning. It can be detailed; the student only sees it post-decision.
   - `rejectReasons`: **required on every order, even ones that should be verified**. This is the multiple-choice list shown if the student clicks Reject. Mix 2–3 correct reasons with 2–4 distractors.
4. **No answer-revealing language in chart fields** (H&P, notes, plan). Students must reason from labs, meds, allergies, notes, and home meds on their own. Do not write things like "do NOT change to daily" in the plan — that is a hint.
5. Labs should include abnormal flags (`["value", "H"]` or `"L"`) so the student can spot them in the labs tab. The tab auto-highlights abnormals.

## Schema (orders section only — patients section unchanged from existing prompt)

```json
{
  "id": "ORD301",
  "patientId": "P020",
  "orderId": "102640001",
  "isNew": true,
  "priority": "Routine",
  "timePending": "45m",
  "drugName": "generic (BRAND) STRENGTH FORM",
  "orderLine": "dose, route, freq, first dose info",
  "alerts": [],
  "clinical": {
    "dose": "value unit",
    "route": "Oral|IV Push|IVPB|SQ|IM",
    "freq": "e.g. Daily",
    "duration": "",
    "rate": "",
    "volume": "",
    "priority": "Routine|Stat",
    "start": "M/D/YYYY HHmm",
    "stop": ""
  },
  "schedule": [
    { "date": "M/D/YYYY", "times": ["0900"] }
  ],
  "dispense": {
    "from": "Cabinet name",
    "firstDose": "Cabinet name",
    "code": "Unit Dose",
    "triggered": true
  },
  "orderedBy": "Last, First, MD",
  "orderedDt": "M/D/YYYY HHmm",
  "product": {
    "name": "PRODUCT DESCRIPTION",
    "pkg": "Package (NDC)"
  },
  "teaching": {
    "correctAction": "reject",
    "explanation": "Full clinical rationale shown ONLY after the student decides. Explain what was wrong (or right), why it matters, and what the correct action would be. This is the teaching moment.",
    "rejectReasons": [
      { "id": "r1", "text": "Primary clinical reason the order is wrong",        "correct": true  },
      { "id": "r2", "text": "Secondary supporting reason",                        "correct": true  },
      { "id": "r3", "text": "Plausible but incorrect distractor",                 "correct": false },
      { "id": "r4", "text": "Plausible but incorrect distractor",                 "correct": false },
      { "id": "r5", "text": "Plausible but incorrect distractor",                 "correct": false }
    ]
  }
}
```

## Worked example — methotrexate weekly vs daily

```json
{
  "id": "ORD202",
  "patientId": "P021",
  "drugName": "methotrexate sodium 2.5 MG tablet",
  "orderLine": "15 mg (6 tablets), Oral, DAILY, First dose 4/4/26 0900, Until D/C",
  "alerts": [],
  "clinical": { "dose": "15 mg", "route": "Oral", "freq": "Daily", "priority": "Routine", "start": "4/4/2026 0900", "stop": "" },
  "schedule": [{ "date": "4/4/2026", "times": ["0900"] }],
  "dispense": { "from": "PHARMACY MAIN", "firstDose": "PHARMACY MAIN", "code": "Unit Dose", "triggered": true },
  "orderedBy": "Hassan, Fareed, MD",
  "orderedDt": "4/4/2026 0700",
  "product": { "name": "METHOTREXATE 2.5 MG TABS", "pkg": "36ct Bottle (0555-0572-02)" },
  "teaching": {
    "correctAction": "reject",
    "explanation": "Methotrexate for rheumatologic indications is dosed WEEKLY, not daily. This patient's home regimen (documented in Home Meds) is methotrexate 15 mg PO every Tuesday. Daily non-oncologic methotrexate at immunosuppressive doses causes fatal pancytopenia and mucositis within days. This is a repeatedly fatal ISMP high-alert error and the order must be rejected and clarified with the prescriber.",
    "rejectReasons": [
      { "id": "r1", "text": "Frequency error: non-oncologic methotrexate is dosed weekly, not daily", "correct": true },
      { "id": "r2", "text": "Home medication list confirms weekly dosing on Tuesdays",               "correct": true },
      { "id": "r3", "text": "Daily immunosuppressive methotrexate causes fatal pancytopenia",         "correct": true },
      { "id": "r4", "text": "Dose of 15 mg is too high for rheumatoid arthritis",                    "correct": false },
      { "id": "r5", "text": "Methotrexate is contraindicated in rheumatoid arthritis",               "correct": false },
      { "id": "r6", "text": "Oral route is not appropriate for methotrexate",                        "correct": false }
    ]
  }
}
```

## For "verify" orders

Still include `rejectReasons` — they become the student's choices if they incorrectly click Reject. Mark all options `correct: false` since the order should not be rejected, OR write distractors that feel plausible. The `explanation` should say why the order was appropriate.

## For "message" orders (clarification needed)

Use `correctAction: "message"` when the order isn't clearly wrong but requires prescriber clarification (e.g., missing duration, unclear indication). Explain in `explanation` what needs clarification.
