import { writable, derived } from 'svelte/store';
import { DEMO_PATIENTS, DEMO_ORDERS, getOrdersForDifficulty } from '$lib/data/demo.js';
import { getDiseaseCases } from '$lib/data/diseases.js';

const LS_CASES = 'pv-cases';

function loadCases() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LS_CASES);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.patients && parsed.orders) return parsed;
  } catch {}
  return null;
}

function saveCases(p, o) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(LS_CASES, JSON.stringify({ patients: p, orders: o }));
  } catch {}
}

const _saved = loadCases();
export const patients = writable(_saved ? _saved.patients : { ...DEMO_PATIENTS });
export const orders = writable(_saved ? _saved.orders : [...DEMO_ORDERS]);
export const view = writable('queue');
export const active = writable(null);
export const showUpload = writable(false);
export const difficulty = writable('default');
export const theme = writable(
  typeof localStorage !== 'undefined' ? (localStorage.getItem('pv-theme') || 'dark') : 'dark'
);
export const user = writable(
  typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('pv-user') || 'null') : null
);

export function createAccount(name, email) {
  const u = { name, email, createdAt: new Date().toISOString() };
  localStorage.setItem('pv-user', JSON.stringify(u));
  user.set(u);
}

export function logout() {
  localStorage.removeItem('pv-user');
  user.set(null);
}

export const patientCount = derived(patients, $patients => Object.keys($patients).length);
export const orderCount = derived(orders, $orders => $orders.length);

export function selectOrder(order) {
  active.set(order);
  view.set('chart');
}

export function goBack() {
  view.set('queue');
  active.set(null);
}

export function verifyOrder(orderId) {
  orders.update(list => {
    const remaining = list.filter(o => o.id !== orderId);
    if (remaining.length > 0) {
      active.set(remaining[0]);
    } else {
      view.set('queue');
      active.set(null);
    }
    return remaining;
  });
  snapshot();
}

function snapshot() {
  let p, o;
  patients.subscribe(v => p = v)();
  orders.subscribe(v => o = v)();
  saveCases(p, o);
}

export function importCases(parsed) {
  patients.update(p => ({ ...p, ...parsed.patients }));
  orders.update(o => [...o, ...parsed.orders]);
  snapshot();
}

export function clearAll() {
  patients.set({});
  orders.set([]);
  view.set('queue');
  active.set(null);
  if (typeof localStorage !== 'undefined') localStorage.removeItem(LS_CASES);
}

export function setDifficulty(level) {
  difficulty.set(level);
  const orderSet = level === 'default' ? DEMO_ORDERS : getOrdersForDifficulty(level);
  patients.set({ ...DEMO_PATIENTS });
  orders.set([...orderSet]);
  view.set('queue');
  active.set(null);
  if (typeof localStorage !== 'undefined') localStorage.removeItem(LS_CASES);
}

export function setDisease(diseaseId, level = 'medium') {
  const dc = getDiseaseCases(diseaseId, level);
  if (!dc) return;
  patients.set({ ...dc.patients });
  orders.set([...dc.orders]);
  view.set('queue');
  active.set(null);
  if (typeof localStorage !== 'undefined') localStorage.removeItem(LS_CASES);
}

export function resetDemo() {
  let currentDifficulty;
  difficulty.subscribe(v => currentDifficulty = v)();
  setDifficulty(currentDifficulty);
}
