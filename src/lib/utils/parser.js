export function parseCaseFile(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  const data = JSON.parse(cleaned);

  if (!data.patients || typeof data.patients !== "object") throw new Error("Missing 'patients' object");
  if (!data.orders || !Array.isArray(data.orders)) throw new Error("Missing 'orders' array");

  // Accept patients as either an object keyed by patientId, or an array of objects with a patientId field.
  if (Array.isArray(data.patients)) {
    const obj = {};
    for (let i = 0; i < data.patients.length; i++) {
      const p = data.patients[i];
      const pid = p.patientId || p.id;
      if (!pid) throw new Error(`Patient at index ${i} missing patientId`);
      obj[pid] = p;
    }
    data.patients = obj;
  }

  const patientIds = Object.keys(data.patients);
  if (patientIds.length === 0) throw new Error("No patients found");

  const errors = [];
  for (const pid of patientIds) {
    const p = data.patients[pid];
    if (!p.name) errors.push(`${pid}: missing name`);
    if (!p.mrn) errors.push(`${pid}: missing mrn`);
    if (!p.age) errors.push(`${pid}: missing age`);
    if (!p.allergies) p.allergies = ["NKDA"];
    if (!p.hp) errors.push(`${pid}: missing hp (history & physical)`);
    if (!p.labs) p.labs = {};
    if (!p.notes) p.notes = [];
    if (!p.inpatientMeds) p.inpatientMeds = [];
    if (!p.homeMeds) p.homeMeds = [];
    if (!p.code) p.code = "Full";
    if (!p.dx) p.dx = p.diseaseState || (Array.isArray(p.pmh) ? p.pmh[0] : "") || "";
    if (!p.room) p.room = p.location || "";
    if (!p.admitDate) p.admitDate = p.admitDt || "";
  }

  for (let i = 0; i < data.orders.length; i++) {
    const o = data.orders[i];
    if (!o.id) errors.push(`Order ${i}: missing id`);
    if (!o.patientId) errors.push(`Order ${i}: missing patientId`);
    if (!data.patients[o.patientId]) errors.push(`Order ${i}: patientId '${o.patientId}' not found in patients`);
    if (!o.drugName) errors.push(`Order ${i}: missing drugName`);
    if (!o.clinical) errors.push(`Order ${i}: missing clinical details`);
    if (!o.alerts) o.alerts = [];
    if (!o.schedule) o.schedule = [];
    if (!o.dispense) o.dispense = { from: "Default Cabinet", firstDose: "Default Cabinet", code: "Unit Dose", triggered: false };
    if (!o.product) o.product = { name: o.drugName || "Product", pkg: "N/A" };
    if (!o.isNew && o.isNew !== false) o.isNew = true;
    if (!o.priority) o.priority = "Routine";
    if (!o.timePending) o.timePending = "New";
    if (!o.orderId) o.orderId = String(100000000 + Math.floor(Math.random() * 900000));
  }

  if (errors.length > 0) throw new Error("Validation errors:\n" + errors.join("\n"));

  delete data._instructions;

  return { patients: data.patients, orders: data.orders, patientCount: patientIds.length, orderCount: data.orders.length };
}
