<script>
  import Editable from '../Editable.svelte';
  import { editMode, updatePatientPath } from '$lib/stores/app.js';
  let { labs, patientId } = $props();

  // Adult reference ranges [low, high] — used to auto-flag values on edit.
  const REF_RANGES = {
    Na: [135, 145], K: [3.5, 5.0], Cl: [98, 107], CO2: [22, 30],
    BUN: [7, 20], SCr: [0.6, 1.3], Glucose: [70, 110], Glu: [70, 110],
    Ca: [8.5, 10.5], Mg: [1.7, 2.2], Phos: [2.5, 4.5],
    AST: [10, 40], ALT: [7, 56], 'Alk Phos': [44, 147], AlkPhos: [44, 147],
    'T Bili': [0.1, 1.2], TBili: [0.1, 1.2], 'T.bili': [0.1, 1.2],
    Albumin: [3.5, 5.0], Alb: [3.5, 5.0],
    WBC: [4.5, 11.0], Hgb: [12, 17.5], Hct: [36, 50], Plt: [150, 400],
    PT: [11, 13.5], PTT: [25, 35], aPTT: [25, 35], INR: [0.8, 1.2],
    Troponin: [0, 0.04], BNP: [0, 100], 'NT-proBNP': [0, 125],
    pH: [7.35, 7.45], pCO2: [35, 45], pO2: [80, 100], HCO3: [22, 26],
    Lactate: [0.5, 2.0], Procalcitonin: [0, 0.5], CRP: [0, 10], ESR: [0, 20],
    eGFR: [60, 200], CrCl: [60, 200], A1c: [4, 5.6], BHB: [0, 0.6], AG: [4, 12]
  };

  function autoFlag(key, value) {
    const range = REF_RANGES[key];
    if (!range) return '';
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    if (num < range[0]) return 'L';
    if (num > range[1]) return 'H';
    return '';
  }

  function setLab(date, key, value, flag, autoCompute = false) {
    const finalFlag = autoCompute ? autoFlag(key, value) : flag;
    const next = finalFlag ? [value, finalFlag] : value;
    updatePatientPath(patientId, `labs.${date}.${key}`, next);
  }

  // Panel definitions: ordered list of tests that belong to each panel
  const PANELS = [
    { key: 'BMP', label: 'BMP', tests: ['Na', 'K', 'Cl', 'CO2', 'BUN', 'SCr', 'Glucose', 'Ca', 'Mg', 'Phos'] },
    { key: 'LFT', label: 'LFTs', tests: ['AST', 'ALT', 'Alk Phos', 'AlkPhos', 'T Bili', 'TBili', 'Albumin', 'Total Protein', 'TProtein'] },
    { key: 'CBC', label: 'CBC', tests: ['WBC', 'Hgb', 'Hct', 'Plt', 'RBC', 'MCV', 'Neutrophils', 'Lymphocytes'] },
    { key: 'Coags', label: 'Coags', tests: ['PT', 'PTT', 'aPTT', 'INR'] },
    { key: 'Cardiac', label: 'Cardiac', tests: ['Troponin', 'BNP', 'NT-proBNP', 'CK', 'CK-MB'] },
    { key: 'ABG', label: 'ABG / Gas', tests: ['pH', 'pCO2', 'pO2', 'HCO3', 'O2Sat', 'Lactate'] },
    { key: 'Infection', label: 'Infection', tests: ['Procalcitonin', 'ESR', 'CRP', 'Cultures'] },
    { key: 'Serology', label: 'Serology', tests: ['RPR', 'FTA-ABS', 'HIV', 'Hep B sAg', 'Hep C Ab'] },
    { key: 'UA', label: 'Urinalysis', tests: ['UA'] }
  ];

  let dates = $derived(Object.keys(labs || {}).sort().reverse());
  let selOverride = $state(null);
  let sel = $derived(selOverride && dates.includes(selOverride) ? selOverride : dates[0] || null);

  let panel = $derived(sel ? (labs[sel] || {}) : {});

  // Group results by panel
  let grouped = $derived.by(() => {
    const result = {};
    const usedKeys = new Set();
    for (const p of PANELS) {
      const items = [];
      for (const t of p.tests) {
        if (t in panel) {
          items.push([t, panel[t]]);
          usedKeys.add(t);
        }
      }
      if (items.length > 0) result[p.key] = { label: p.label, items };
    }
    // CSF panel: anything starting with CSF_
    const csfItems = Object.entries(panel).filter(([k]) => k.startsWith('CSF_'));
    if (csfItems.length > 0) {
      result.CSF = { label: 'CSF', items: csfItems };
      csfItems.forEach(([k]) => usedKeys.add(k));
    }
    // Other: anything not matched
    const other = Object.entries(panel).filter(([k]) => !usedKeys.has(k));
    if (other.length > 0) result.Other = { label: 'Other', items: other };
    return result;
  });

  let panelKeys = $derived(Object.keys(grouped));
  let selPanelOverride = $state(null);
  let selPanel = $derived(selPanelOverride && panelKeys.includes(selPanelOverride) ? selPanelOverride : panelKeys[0] || null);

  // Count abnormals per panel for badge display
  function abnormalCount(items) {
    return items.filter(([, v]) => Array.isArray(v) && (v[1] === 'H' || v[1] === 'L' || v[1] === 'C')).length;
  }
</script>

{#if dates.length === 0}
  <div class="cd"><p>No lab results available.</p></div>
{:else}
  <div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap">
    {#each dates as d}
      <button class="fb" class:act={d === sel} onclick={() => selOverride = d}>{d}</button>
    {/each}
  </div>
  <div class="lab-split">
    <div class="lab-panels">
      {#each panelKeys as k}
        {@const g = grouped[k]}
        {@const ac = abnormalCount(g.items)}
        <button class="lab-panel-btn" class:act={k === selPanel} onclick={() => selPanelOverride = k}>
          <span class="lab-panel-name">{g.label}</span>
          <span class="lab-panel-meta">
            <span class="lab-panel-cnt">{g.items.length}</span>
            {#if ac > 0}<span class="lab-panel-abn">{ac}</span>{/if}
          </span>
        </button>
      {/each}
    </div>
    <div class="lab-results">
      {#if selPanel && grouped[selPanel]}
        <div class="cd">
          <h2>{grouped[selPanel].label}</h2>
          <table class="dtbl">
            <thead><tr><th>Test</th><th>Result</th><th>Flag</th></tr></thead>
            <tbody>
              {#each grouped[selPanel].items as [name, val]}
                {@const isArr = Array.isArray(val)}
                {@const v = isArr ? val[0] : val}
                {@const f = isArr ? val[1] : ''}
                {@const abn = f === 'H' || f === 'L' || f === 'C'}
                <tr class:lab-abn={abn}>
                  <td style="font-weight:500">{name}</td>
                  <td class:fH={f === 'H'} class:fL={f === 'L'} style="font-family:var(--m)">
                    <Editable value={v} onCommit={(nv) => setLab(sel, name, nv, f, true)} />
                  </td>
                  <td class:fH={f === 'H'} class:fL={f === 'L'}>
                    {#if $editMode}
                      <Editable value={f} onCommit={(nf) => setLab(sel, name, v, nf)} placeholder="—" />
                    {:else}
                      {f || '\u2014'}
                    {/if}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
{/if}
