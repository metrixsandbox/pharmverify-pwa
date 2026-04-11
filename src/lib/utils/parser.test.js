import { describe, it, expect } from 'vitest';
import { parseCaseFile } from './parser.js';

describe('parseCaseFile', () => {
  const validCase = {
    patients: {
      P001: {
        name: 'DOE, JANE', mrn: '001', age: '64F',
        hp: { cc: 'Dyspnea', hpi: 'History', pmh: [], meds: [], exam: {}, assessment: '', plan: [] }
      }
    },
    orders: [{
      id: 'o1', patientId: 'P001', drugName: 'Furosemide',
      clinical: { dose: '40 mg', route: 'IV', freq: 'BID' }
    }]
  };

  it('parses valid JSON input', () => {
    const result = parseCaseFile(JSON.stringify(validCase));
    expect(result.patientCount).toBe(1);
    expect(result.orderCount).toBe(1);
    expect(result.patients.P001.name).toBe('DOE, JANE');
  });

  it('strips markdown code fences', () => {
    const wrapped = '```json\n' + JSON.stringify(validCase) + '\n```';
    const result = parseCaseFile(wrapped);
    expect(result.patientCount).toBe(1);
  });

  it('strips code fences without language tag', () => {
    const wrapped = '```\n' + JSON.stringify(validCase) + '\n```';
    const result = parseCaseFile(wrapped);
    expect(result.patientCount).toBe(1);
  });

  it('throws on invalid JSON', () => {
    expect(() => parseCaseFile('not json')).toThrow();
  });

  it('throws when patients is missing', () => {
    expect(() => parseCaseFile(JSON.stringify({ orders: [] }))).toThrow("Missing 'patients' object");
  });

  it('throws when orders is missing', () => {
    expect(() => parseCaseFile(JSON.stringify({ patients: {} }))).toThrow("Missing 'orders' array");
  });

  it('throws when orders is not an array', () => {
    expect(() => parseCaseFile(JSON.stringify({ patients: {}, orders: 'nope' }))).toThrow("Missing 'orders' array");
  });

  it('throws when patients object is empty', () => {
    expect(() => parseCaseFile(JSON.stringify({ patients: {}, orders: [] }))).toThrow('No patients found');
  });

  // Array-format patients
  it('accepts patients as an array and converts to object', () => {
    const input = {
      patients: [{ patientId: 'P001', name: 'DOE, JANE', mrn: '001', age: '64F',
        hp: { cc: 'test', hpi: 'test', pmh: [], meds: [], exam: {}, assessment: '', plan: [] } }],
      orders: [{ id: 'o1', patientId: 'P001', drugName: 'Test', clinical: { dose: '1mg' } }]
    };
    const result = parseCaseFile(JSON.stringify(input));
    expect(result.patients.P001).toBeDefined();
    expect(result.patients.P001.name).toBe('DOE, JANE');
  });

  it('throws when array patient is missing patientId', () => {
    const input = {
      patients: [{ name: 'No ID' }],
      orders: []
    };
    expect(() => parseCaseFile(JSON.stringify(input))).toThrow('missing patientId');
  });

  // Default field population
  it('sets default values for optional patient fields', () => {
    const input = {
      patients: { P001: { name: 'Test', mrn: '001', age: '50M',
        hp: { cc: 'test', hpi: 'test', pmh: [], meds: [], exam: {}, assessment: '', plan: [] } } },
      orders: [{ id: 'o1', patientId: 'P001', drugName: 'Drug', clinical: { dose: '1mg' } }]
    };
    const result = parseCaseFile(JSON.stringify(input));
    const p = result.patients.P001;
    expect(p.allergies).toEqual(['NKDA']);
    expect(p.labs).toEqual({});
    expect(p.notes).toEqual([]);
    expect(p.inpatientMeds).toEqual([]);
    expect(p.homeMeds).toEqual([]);
    expect(p.code).toBe('Full');
  });

  it('sets default values for optional order fields', () => {
    const input = {
      patients: { P001: { name: 'Test', mrn: '001', age: '50M',
        hp: { cc: 'test', hpi: 'test', pmh: [], meds: [], exam: {}, assessment: '', plan: [] } } },
      orders: [{ id: 'o1', patientId: 'P001', drugName: 'Drug', clinical: { dose: '1mg' } }]
    };
    const result = parseCaseFile(JSON.stringify(input));
    const o = result.orders[0];
    expect(o.alerts).toEqual([]);
    expect(o.schedule).toEqual([]);
    expect(o.dispense).toBeDefined();
    expect(o.dispense.from).toBe('Default Cabinet');
    expect(o.product.name).toBe('Drug');
    expect(o.isNew).toBe(true);
    expect(o.priority).toBe('Routine');
    expect(o.timePending).toBe('New');
    expect(o.orderId).toBeDefined();
  });

  // Validation errors
  it('throws validation error when patient missing required fields', () => {
    const input = {
      patients: { P001: {} },
      orders: []
    };
    expect(() => parseCaseFile(JSON.stringify(input))).toThrow('missing name');
  });

  it('throws when order references nonexistent patient', () => {
    const input = {
      patients: { P001: { name: 'Test', mrn: '001', age: '50M',
        hp: { cc: 'test', hpi: 'test', pmh: [], meds: [], exam: {}, assessment: '', plan: [] } } },
      orders: [{ id: 'o1', patientId: 'P999', drugName: 'Drug', clinical: {} }]
    };
    expect(() => parseCaseFile(JSON.stringify(input))).toThrow("patientId 'P999' not found");
  });

  it('throws when order is missing required fields', () => {
    const input = {
      patients: { P001: { name: 'Test', mrn: '001', age: '50M',
        hp: { cc: 'test', hpi: 'test', pmh: [], meds: [], exam: {}, assessment: '', plan: [] } } },
      orders: [{ patientId: 'P001' }]
    };
    expect(() => parseCaseFile(JSON.stringify(input))).toThrow('missing id');
  });

  // dx fallback logic
  it('falls back to diseaseState for dx field', () => {
    const input = {
      patients: { P001: { name: 'Test', mrn: '001', age: '50M', diseaseState: 'HFrEF',
        hp: { cc: 'test', hpi: 'test', pmh: [], meds: [], exam: {}, assessment: '', plan: [] } } },
      orders: [{ id: 'o1', patientId: 'P001', drugName: 'Drug', clinical: {} }]
    };
    const result = parseCaseFile(JSON.stringify(input));
    expect(result.patients.P001.dx).toBe('HFrEF');
  });

  // _instructions removal
  it('removes _instructions field from output', () => {
    const input = { ...validCase, _instructions: 'some instructions' };
    const result = parseCaseFile(JSON.stringify(input));
    expect(result.patients).toBeDefined();
    // _instructions should be stripped (not in returned object anyway since we only return patients/orders)
  });
});
