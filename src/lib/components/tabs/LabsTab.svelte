<script>
  let { labs } = $props();

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
                  <td class:fH={f === 'H'} class:fL={f === 'L'} style="font-family:var(--m)">{v}</td>
                  <td class:fH={f === 'H'} class:fL={f === 'L'}>{f || '\u2014'}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
{/if}
