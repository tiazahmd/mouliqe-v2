// tools/data-migration.js — engine for the migration planner demo
import { setStage, resetPipeline, startContext, addContext, finishContext, addCard, clearOutput, wait } from '/js/tool-page.js';
import { SAMPLES } from '/js/tools/data-migration-data.js';

let running = false;

async function runPipeline(key) {
  if (running) return;
  running = true;
  const data = SAMPLES[key];

  document.getElementById('pipeline').style.display = 'flex';
  startContext();
  clearOutput();
  resetPipeline();

  // ── Connect ──
  setStage('connect', 'active');
  addContext('Connecting to Source & Target', `Establishing connections to ${data.source} and ${data.target}. Discovering available tables, reading schema metadata, and verifying access permissions.`);

  addCard(`<div class="tool-result-card">
    <div class="tool-result-header">
      <span class="tool-result-label">Discovering Tables</span>
      <span class="tool-result-meta" id="table-count">0 / ${data.tables.length}</span>
    </div>
    <div id="table-list" style="margin-top: var(--space-2)"></div>
  </div>`);

  for (let i = 0; i < data.tables.length; i++) {
    const t = data.tables[i];
    document.getElementById('table-list').insertAdjacentHTML('beforeend', `
      <div class="table-row">
        <div class="table-row__dot table-row__dot--${t.status}"></div>
        <span class="table-row__name">${t.source}</span>
        <svg class="table-row__arrow table-row__arrow--${t.status}" width="14" height="8" fill="none" stroke="currentColor" viewBox="0 0 20 10" stroke-width="1.5"><path d="M2 5h14M12 2l4 3-4 3"/></svg>
        <span class="table-row__name">${t.target}</span>
        <span class="table-row__rows">${t.rows} rows</span>
        <span class="compat-badge compat-badge--${t.status}">${t.status}</span>
      </div>`);
    document.getElementById('table-count').textContent = `${i + 1} / ${data.tables.length}`;
    await wait(300);
  }
  setStage('connect', 'done');
  await wait(300);

  // ── Map ──
  setStage('map', 'active');
  addContext('Mapping Column Schemas', `Matching columns from ${data.source} to ${data.target} by name, type, and semantic meaning. Each column gets a compatibility rating — direct map, transform required, or risk flag.`);

  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    <div class="tool-result-header">
      <span class="tool-result-label">Schema Mapping</span>
      <span class="tool-result-meta" id="map-count">0 / ${data.mappings.length}</span>
    </div>
    <div id="map-list" style="margin-top: var(--space-2)"></div>
  </div>`);

  for (let i = 0; i < data.mappings.length; i++) {
    const m = data.mappings[i];
    document.getElementById('map-list').insertAdjacentHTML('beforeend', `
      <div class="mapping-row">
        <div class="mapping-row__main">
          <span class="mapping-row__col">${m.src}</span>
          <span class="compat-badge compat-badge--${m.compat}">${m.compat}</span>
          <span class="mapping-row__col">${m.tgt}</span>
        </div>
        <p class="mapping-row__note">${m.note}</p>
      </div>`);
    document.getElementById('map-count').textContent = `${i + 1} / ${data.mappings.length}`;
    await wait(350);
  }
  setStage('map', 'done');
  await wait(300);

  // ── Analyze ──
  setStage('analyze', 'active');
  const risks = data.mappings.filter(m => m.compat === 'risk');
  const transforms = data.mappings.filter(m => m.compat === 'transform');
  const okCount = data.mappings.filter(m => m.compat === 'ok').length;
  addContext('Analyzing Compatibility & Risks', `Found ${okCount} direct maps, ${transforms.length} columns needing type conversion, and ${risks.length} high-risk items requiring manual attention. Risk items are columns where automated migration could lose data or break downstream systems.`);

  if (risks.length + transforms.length > 0) {
    addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
      <div class="tool-result-header"><span class="tool-result-label">Compatibility Analysis</span></div>
      <div class="compat-summary">
        <div class="compat-summary__cell compat-summary__cell--ok">
          <p class="compat-summary__value">${okCount}</p>
          <p class="compat-summary__label">Direct Map</p>
        </div>
        <div class="compat-summary__cell compat-summary__cell--transform">
          <p class="compat-summary__value">${transforms.length}</p>
          <p class="compat-summary__label">Transform</p>
        </div>
        <div class="compat-summary__cell compat-summary__cell--risk">
          <p class="compat-summary__value">${risks.length}</p>
          <p class="compat-summary__label">Risk</p>
        </div>
      </div>
      <div id="flag-list"></div>
    </div>`);

    for (const m of [...risks, ...transforms]) {
      document.getElementById('flag-list').insertAdjacentHTML('beforeend', `
        <div class="table-row">
          <span class="compat-badge compat-badge--${m.compat}">${m.compat}</span>
          <div style="flex: 1; min-width: 0">
            <p class="table-row__name" style="font-weight: var(--fw-medium); margin: 0">${m.src.split('(')[0].trim()}</p>
            <p class="mapping-row__note" style="margin: 0.1rem 0 0">${m.note}</p>
          </div>
        </div>`);
      await wait(250);
    }
  }
  await wait(300);
  setStage('analyze', 'done');
  await wait(300);

  // ── Plan (AI) ──
  setStage('plan', 'active');
  addContext('AI: Generating Migration Plan', 'The AI planner analyzes table dependencies, data volumes, and risk levels to generate an optimal phased migration. It orders phases so dimension tables land before fact tables, low-risk items go first, and high-risk items get isolated phases with rollback points.', true);
  await wait(800);

  addCard(`<div style="margin-top: var(--space-3)" id="plan-area">
    <div class="tool-result-header" style="margin-bottom: var(--space-2)">
      <span class="tool-result-label">Migration Plan</span>
      <span class="tool-result-meta">${data.phases.length} phases</span>
    </div>
  </div>`);

  for (let i = 0; i < data.phases.length; i++) {
    const p = data.phases[i];
    const riskClass = p.risk === 'low' ? 'low' : p.risk === 'med' ? 'med' : 'high';
    const badgeMod = p.risk === 'low' ? 'ok' : p.risk === 'med' ? 'transform' : 'risk';
    document.getElementById('plan-area').insertAdjacentHTML('beforeend', `
      <div class="phase-card phase-card--${riskClass}">
        <div class="phase-card__head">
          <span class="phase-card__title">Phase ${i + 1}: ${p.name}</span>
          <div style="display: flex; gap: var(--space-2); align-items: center">
            <span class="phase-card__weeks">Weeks ${p.weeks}</span>
            <span class="compat-badge compat-badge--${badgeMod}">${p.risk} risk</span>
          </div>
        </div>
        ${p.tasks.map(t => `<p class="phase-card__task">${t}</p>`).join('')}
      </div>`);
    await wait(500);
  }
  setStage('plan', 'done');
  await wait(300);

  // ── Validate ──
  setStage('validate', 'active');
  addContext('Defining Validation Rules', 'Setting up integrity checks: row count reconciliation between source and target, checksum validation on key columns, referential integrity verification, and aggregate value comparisons to catch silent data loss.');
  await wait(1000);
  setStage('validate', 'done');
  await wait(300);

  // ── Report ──
  setStage('report', 'active');
  addContext('Compiling Migration Report', 'Assembling the final report with total data volume, table count, estimated timeline, and risk summary. This is the document you hand to stakeholders before starting the actual migration.');
  await wait(800);

  const s = data.summary;
  addCard(`<div class="tool-result-card tool-result-card--success" style="margin-top: var(--space-3)">
    <div class="tool-result-header"><span class="tool-result-label">Migration Summary</span></div>
    <div class="tool-stat-grid tool-stat-grid--3">
      <div class="tool-stat"><p class="tool-stat__value tool-stat__value--accent">${s.totalRows}</p><p class="tool-stat__label">Total Rows</p></div>
      <div class="tool-stat"><p class="tool-stat__value">${s.tables}</p><p class="tool-stat__label">Tables</p></div>
      <div class="tool-stat"><p class="tool-stat__value tool-stat__value--amber">${s.estimatedWeeks}</p><p class="tool-stat__label">Est. Weeks</p></div>
    </div>
    <div style="display: flex; gap: var(--space-2); margin-top: var(--space-3); justify-content: center; flex-wrap: wrap">
      <span class="compat-badge compat-badge--transform">${s.transforms} transforms</span>
      <span class="compat-badge compat-badge--risk">${s.risks} risks</span>
    </div>
  </div>`);

  setStage('report', 'done');
  finishContext();
  running = false;
}

export function mountDataMigration() {
  const btnsEl = document.getElementById('sample-btns');
  if (!btnsEl) return;
  Object.entries(SAMPLES).forEach(([key, s]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-sample-btn';
    btn.innerHTML = `<span class="tool-sample-btn__label">${s.label}</span><span class="tool-sample-btn__sub">${s.sub}</span>`;
    btn.addEventListener('click', () => {
      btnsEl.querySelectorAll('.tool-sample-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      runPipeline(key);
    });
    btnsEl.appendChild(btn);
  });
}
