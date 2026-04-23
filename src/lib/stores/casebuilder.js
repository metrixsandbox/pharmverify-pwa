import { writable, derived } from 'svelte/store';

const LS_KEY = 'pv-custom-cases';

function load() {
  if (typeof localStorage === 'undefined') return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

function save(cases) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LS_KEY, JSON.stringify(cases));
  }
}

export const customCases = writable(load());

export const customCaseCount = derived(customCases, $c => $c.length);

function genId() {
  return 'CC_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function genOrderId() {
  return 'CO_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function blankPatient() {
  return {
    name: '', mrn: '', dob: '', age: '', weight: '', height: '',
    allergies: [], room: '', admitDate: '', attending: '',
    dx: '', code: 'Full',
    hp: {
      cc: '', hpi: '', pmh: [], meds: [],
      exam: { vitals: '', cv: '', pulm: '', ext: '', neuro: '' },
      assessment: '', plan: []
    },
    labs: {},
    notes: [],
    inpatientMeds: [],
    homeMeds: []
  };
}

export function blankOrder(patientId) {
  return {
    id: genOrderId(), patientId, orderId: '', isNew: true,
    priority: 'Routine', timePending: '1h 00m',
    drugName: '', orderLine: '', alerts: [],
    clinical: { dose: '', route: 'Oral', freq: '', duration: '', rate: '', volume: '', priority: 'Routine', start: '', stop: '' },
    schedule: [], dispense: { from: '', firstDose: '', code: 'Unit Dose', triggered: true },
    orderedBy: '', orderedDt: '',
    product: { name: '', pkg: '' },
    teaching: {
      correctAction: 'verify', explanation: '',
      rejectReasons: [],
      guideline: null,
      decisionTree: null
    }
  };
}

export function createCase(patientData, orders) {
  const caseId = genId();
  const patientId = 'P_' + caseId;
  const patient = { ...patientData };
  const caseOrders = orders.map(o => ({ ...o, id: genOrderId(), patientId }));

  const newCase = {
    id: caseId,
    patientId,
    patient,
    orders: caseOrders,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  customCases.update(cases => {
    const next = [...cases, newCase];
    save(next);
    return next;
  });

  return newCase;
}

export function updateCase(caseId, patientData, orders) {
  customCases.update(cases => {
    const next = cases.map(c => {
      if (c.id !== caseId) return c;
      return {
        ...c,
        patient: { ...patientData },
        orders: orders.map(o => ({ ...o, patientId: c.patientId })),
        updatedAt: Date.now()
      };
    });
    save(next);
    return next;
  });
}

export function deleteCase(caseId) {
  customCases.update(cases => {
    const next = cases.filter(c => c.id !== caseId);
    save(next);
    return next;
  });
}

export function duplicateCase(caseId) {
  customCases.update(cases => {
    const source = cases.find(c => c.id === caseId);
    if (!source) return cases;
    const newId = genId();
    const patientId = 'P_' + newId;
    const copy = {
      id: newId,
      patientId,
      patient: { ...structuredClone(source.patient), name: source.patient.name + ' (copy)' },
      orders: source.orders.map(o => ({ ...structuredClone(o), id: genOrderId(), patientId })),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const next = [...cases, copy];
    save(next);
    return next;
  });
}

export function exportCases(caseIds) {
  let all;
  customCases.subscribe(v => all = v)();
  const toExport = caseIds ? all.filter(c => caseIds.includes(c.id)) : all;
  return JSON.stringify(toExport, null, 2);
}

export function importCases(jsonStr) {
  try {
    const parsed = JSON.parse(jsonStr);
    const arr = Array.isArray(parsed) ? parsed : [parsed];
    const valid = arr.filter(c => c.patient && c.orders);
    if (valid.length === 0) return 0;

    customCases.update(cases => {
      const existingIds = new Set(cases.map(c => c.id));
      const newCases = valid
        .filter(c => !existingIds.has(c.id))
        .map(c => ({ ...c, id: c.id || genId(), patientId: c.patientId || 'P_' + genId() }));
      const next = [...cases, ...newCases];
      save(next);
      return next;
    });
    return valid.length;
  } catch { return 0; }
}
