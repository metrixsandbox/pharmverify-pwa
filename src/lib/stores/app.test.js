import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

let patients, orders, view, active, reviewMode, editMode, difficulty;
let updatePatient, updatePatientPath, updateOrder, updateOrderPath;
let selectOrder, reviewOrder, goBack, goHome, verifyOrder;
let importCases, clearAll, setDifficulty, createAccount, logout, user;
let patientCount, orderCount;

beforeEach(async () => {
  localStorage.clear();
  vi.resetModules();
  const mod = await import('./app.js');
  patients = mod.patients;
  orders = mod.orders;
  view = mod.view;
  active = mod.active;
  reviewMode = mod.reviewMode;
  editMode = mod.editMode;
  difficulty = mod.difficulty;
  updatePatient = mod.updatePatient;
  updatePatientPath = mod.updatePatientPath;
  updateOrder = mod.updateOrder;
  updateOrderPath = mod.updateOrderPath;
  selectOrder = mod.selectOrder;
  reviewOrder = mod.reviewOrder;
  goBack = mod.goBack;
  goHome = mod.goHome;
  verifyOrder = mod.verifyOrder;
  importCases = mod.importCases;
  clearAll = mod.clearAll;
  setDifficulty = mod.setDifficulty;
  createAccount = mod.createAccount;
  logout = mod.logout;
  user = mod.user;
  patientCount = mod.patientCount;
  orderCount = mod.orderCount;
});

describe('initial state', () => {
  it('loads demo patients by default', () => {
    expect(Object.keys(get(patients)).length).toBeGreaterThan(0);
  });

  it('loads demo orders by default', () => {
    expect(get(orders).length).toBeGreaterThan(0);
  });

  it('starts on home view', () => {
    expect(get(view)).toBe('home');
  });

  it('has no active order initially', () => {
    expect(get(active)).toBeNull();
  });

  it('has review mode off', () => {
    expect(get(reviewMode)).toBe(false);
  });
});

describe('updatePatient', () => {
  it('patches a patient record', () => {
    const pid = Object.keys(get(patients))[0];
    updatePatient(pid, { name: 'UPDATED NAME' });
    expect(get(patients)[pid].name).toBe('UPDATED NAME');
  });

  it('does nothing for nonexistent patient', () => {
    const before = get(patients);
    updatePatient('NONEXISTENT', { name: 'test' });
    expect(get(patients)).toEqual(before);
  });

  it('persists to localStorage', () => {
    const pid = Object.keys(get(patients))[0];
    updatePatient(pid, { name: 'PERSISTED' });
    const stored = JSON.parse(localStorage.getItem('pv-cases'));
    expect(stored.patients[pid].name).toBe('PERSISTED');
  });
});

describe('updatePatientPath', () => {
  it('updates nested path using dot notation', () => {
    const pid = Object.keys(get(patients))[0];
    updatePatientPath(pid, 'hp.cc', 'Updated chief complaint');
    expect(get(patients)[pid].hp.cc).toBe('Updated chief complaint');
  });

  it('creates intermediate objects if needed', () => {
    const pid = Object.keys(get(patients))[0];
    updatePatientPath(pid, 'custom.nested.value', 42);
    expect(get(patients)[pid].custom.nested.value).toBe(42);
  });
});

describe('updateOrder', () => {
  it('patches an order by id', () => {
    const oid = get(orders)[0].id;
    updateOrder(oid, { drugName: 'NEW DRUG' });
    expect(get(orders).find(o => o.id === oid).drugName).toBe('NEW DRUG');
  });

  it('updates active order if it matches', () => {
    const order = get(orders)[0];
    active.set(order);
    updateOrder(order.id, { drugName: 'CHANGED' });
    expect(get(active).drugName).toBe('CHANGED');
  });
});

describe('updateOrderPath', () => {
  it('updates nested order field with dot notation', () => {
    const oid = get(orders)[0].id;
    updateOrderPath(oid, 'clinical.dose', '100 mg');
    expect(get(orders).find(o => o.id === oid).clinical.dose).toBe('100 mg');
  });
});

describe('selectOrder', () => {
  it('sets active order and switches to chart view', () => {
    const order = get(orders)[0];
    selectOrder(order);
    expect(get(active)).toEqual(order);
    expect(get(view)).toBe('chart');
    expect(get(reviewMode)).toBe(false);
  });
});

describe('reviewOrder', () => {
  it('sets review mode and active order', () => {
    const order = get(orders)[0];
    reviewOrder(order);
    expect(get(active)).toEqual(order);
    expect(get(view)).toBe('chart');
    expect(get(reviewMode)).toBe(true);
  });
});

describe('goBack', () => {
  it('returns to queue from chart view', () => {
    const order = get(orders)[0];
    selectOrder(order);
    goBack();
    expect(get(view)).toBe('queue');
    expect(get(active)).toBeNull();
  });

  it('returns to home from review mode', () => {
    const order = get(orders)[0];
    reviewOrder(order);
    goBack();
    expect(get(view)).toBe('home');
    expect(get(active)).toBeNull();
    expect(get(reviewMode)).toBe(false);
  });
});

describe('goHome', () => {
  it('resets to home view', () => {
    view.set('chart');
    active.set({ id: 'test' });
    goHome();
    expect(get(view)).toBe('home');
    expect(get(active)).toBeNull();
  });
});

describe('verifyOrder', () => {
  it('removes the order from the list', () => {
    const orderList = get(orders);
    const oid = orderList[0].id;
    const countBefore = orderList.length;
    verifyOrder(oid);
    expect(get(orders).length).toBe(countBefore - 1);
    expect(get(orders).find(o => o.id === oid)).toBeUndefined();
  });

  it('advances to next order if orders remain', () => {
    const orderList = get(orders);
    if (orderList.length > 1) {
      verifyOrder(orderList[0].id);
      expect(get(active)).toBeDefined();
    }
  });

  it('returns to queue when last order verified', () => {
    const orderList = get(orders);
    for (const o of orderList) {
      verifyOrder(o.id);
    }
    expect(get(view)).toBe('queue');
    expect(get(active)).toBeNull();
  });
});

describe('importCases', () => {
  it('merges new patients and orders into existing', () => {
    const patientsBefore = Object.keys(get(patients)).length;
    const ordersBefore = get(orders).length;
    importCases({
      patients: { NEW1: { name: 'New Patient', mrn: '999' } },
      orders: [{ id: 'new_o1', patientId: 'NEW1', drugName: 'NewDrug' }]
    });
    expect(Object.keys(get(patients)).length).toBe(patientsBefore + 1);
    expect(get(orders).length).toBe(ordersBefore + 1);
  });
});

describe('clearAll', () => {
  it('empties patients and orders', () => {
    clearAll();
    expect(Object.keys(get(patients)).length).toBe(0);
    expect(get(orders).length).toBe(0);
    expect(get(view)).toBe('queue');
  });

  it('removes from localStorage', () => {
    clearAll();
    expect(localStorage.getItem('pv-cases')).toBeNull();
  });
});

describe('setDifficulty', () => {
  it('resets to demo patients with chosen difficulty', () => {
    clearAll();
    setDifficulty('default');
    expect(Object.keys(get(patients)).length).toBeGreaterThan(0);
    expect(get(difficulty)).toBe('default');
    expect(get(view)).toBe('queue');
  });
});

describe('derived stores', () => {
  it('patientCount reflects number of patients', () => {
    expect(get(patientCount)).toBe(Object.keys(get(patients)).length);
  });

  it('orderCount reflects number of orders', () => {
    expect(get(orderCount)).toBe(get(orders).length);
  });
});

describe('account management', () => {
  it('creates user account', () => {
    createAccount('Test User', 'test@example.com', 'student');
    expect(get(user)).toEqual({
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
      createdAt: expect.any(String)
    });
    expect(localStorage.getItem('pv-user')).toBeTruthy();
  });

  it('logs out user', () => {
    createAccount('Test User', 'test@example.com');
    logout();
    expect(get(user)).toBeNull();
    expect(localStorage.getItem('pv-user')).toBeNull();
  });
});
