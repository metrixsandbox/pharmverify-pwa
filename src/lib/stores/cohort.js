import { writable, derived } from 'svelte/store';

const LS_COHORT = 'pv-cohort';
const LS_ROSTER = 'pv-roster';

function loadJSON(key, fallback) {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch { return fallback; }
}

function saveJSON(key, data) {
  if (typeof localStorage === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

export const cohort = writable(loadJSON(LS_COHORT, null));
export const roster = writable(loadJSON(LS_ROSTER, []));

export function createClass(name, preceptorName) {
  const code = generateCode();
  const cls = { id: 'cls_' + Date.now(), name, code, createdBy: preceptorName, createdAt: new Date().toISOString() };
  cohort.set(cls);
  roster.set([]);
  saveJSON(LS_COHORT, cls);
  saveJSON(LS_ROSTER, []);
  return cls;
}

export function deleteClass() {
  cohort.set(null);
  roster.set([]);
  localStorage.removeItem(LS_COHORT);
  localStorage.removeItem(LS_ROSTER);
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export function importStudentData(jsonStr) {
  const data = JSON.parse(jsonStr);
  if (!data.student || !data.metrics || !data.class) {
    throw new Error('Invalid export file. Expected student, metrics, and class fields.');
  }

  const entry = {
    id: 'stu_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    student: data.student,
    classCode: data.class.code,
    className: data.class.name,
    importedAt: new Date().toISOString(),
    exportedAt: data.exportedAt,
    attempts: data.metrics.attempts || [],
    sessions: data.metrics.sessions || []
  };

  roster.update(r => {
    const existing = r.findIndex(s =>
      s.student.email === entry.student.email
    );
    let next;
    if (existing >= 0) {
      next = [...r];
      next[existing] = entry;
    } else {
      next = [...r, entry];
    }
    saveJSON(LS_ROSTER, next);
    return next;
  });

  return entry;
}

export function removeStudent(studentId) {
  roster.update(r => {
    const next = r.filter(s => s.id !== studentId);
    saveJSON(LS_ROSTER, next);
    return next;
  });
}

export function exportStudentData(user, attempts, sessions, cls) {
  const data = {
    student: { name: user.name, email: user.email, role: user.role },
    class: cls ? { code: cls.code, name: cls.name } : { code: 'NONE', name: 'Unaffiliated' },
    metrics: { attempts, sessions },
    exportedAt: new Date().toISOString(),
    version: 1
  };
  return JSON.stringify(data, null, 2);
}

export const rosterCount = derived(roster, $r => $r.length);

export const classStats = derived(roster, $r => {
  if ($r.length === 0) return null;

  let totalAttempts = 0;
  let totalCorrect = 0;
  const studentSummaries = [];
  const categoryTotals = {};

  for (const student of $r) {
    const atts = student.attempts || [];
    const correct = atts.filter(a => a.isCorrect).length;
    totalAttempts += atts.length;
    totalCorrect += correct;

    studentSummaries.push({
      id: student.id,
      name: student.student.name,
      email: student.student.email,
      totalAttempts: atts.length,
      correct,
      accuracy: atts.length > 0 ? Math.round((correct / atts.length) * 100) : 0,
      lastActive: atts.length > 0 ? atts[atts.length - 1].timestamp : null,
      importedAt: student.importedAt
    });

    for (const a of atts) {
      const cat = a.clinicalCategory || 'other';
      if (!categoryTotals[cat]) categoryTotals[cat] = { label: a.categoryLabel || cat, total: 0, correct: 0 };
      categoryTotals[cat].total++;
      if (a.isCorrect) categoryTotals[cat].correct++;
    }
  }

  const categoryBreakdown = Object.values(categoryTotals).map(c => ({
    ...c,
    accuracy: c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0
  })).sort((a, b) => a.accuracy - b.accuracy);

  return {
    studentCount: $r.length,
    totalAttempts,
    totalCorrect,
    classAccuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
    students: studentSummaries.sort((a, b) => a.accuracy - b.accuracy),
    categoryBreakdown
  };
});
