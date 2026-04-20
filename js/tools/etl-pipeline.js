// tools/etl-pipeline.js — engine for the ETL pipeline simulator
import { setStage, resetPipeline, startContext, addContext, finishContext, wait } from '/js/tool-page.js';
import { SCENARIOS, STAGE_CONTEXT } from '/js/tools/etl-pipeline-data.js';

const STAGES = ['extract', 'validate', 'clean', 'transform', 'load'];
let running = false;

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function sourceModifier(sourceName) {
  return sourceName.toLowerCase().replace(/\s.*$/, '');
}

function renderTable(headers, rows, options = {}) {
  const { issues, removedRows, transforms, newRows } = options;
  const issueMap = {};
  if (issues) issues.forEach(iss => { issueMap[`${iss.row}-${iss.col}`] = iss; });
  const transformMap = {};
  if (transforms) transforms.forEach(t => { transformMap[`${t.row}-${t.col}`] = t; });

  let html = '<table class="etl-table"><thead><tr>';
  headers.forEach(h => { html += `<th>${escapeHtml(h)}</th>`; });
  html += '</tr></thead><tbody>';

  rows.forEach((row, ri) => {
    const isRemoved = removedRows && removedRows.includes(ri);
    let rowClass = '';
    if (isRemoved)                                          rowClass = 'row-removed';
    else if (newRows)                                       rowClass = 'row-new';
    else if (issues && issues.some(iss => iss.row === ri))  rowClass = 'row-flagged';

    html += `<tr class="${rowClass}" style="animation-delay:${ri * 0.03}s">`;
    row.forEach((val, ci) => {
      const colName = headers[ci];
      const issueKey = `${ri}-${colName}`;
      const issue = issueMap[issueKey];
      const transform = transformMap[issueKey];

      let cellContent = escapeHtml(val);
      if (colName === 'Source' && val) {
        const mod = sourceModifier(val);
        cellContent = `<span class="source-tag source-tag--${mod}">${escapeHtml(val)}</span>`;
      }

      let badge = '';
      let isFixed = false;
      if (issue) {
        const badgeType = issue.type === 'error' ? 'error' : 'warn';
        badge = `<span class="cell-badge cell-badge--${badgeType}">${escapeHtml(issue.badge)}</span>`;
      }
      if (transform) {
        cellContent = `<span class="cell-highlight">${escapeHtml(transform.to)}</span>`;
        badge = `<span class="cell-badge cell-badge--fixed">${escapeHtml(transform.badge)}</span>`;
        isFixed = true;
      }

      const sep = isFixed || badge ? ' ' : '';
      html += `<td>${cellContent}${sep}${badge}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody></table>';
  return html;
}

function showTable(title, stats, html) {
  document.getElementById('preview-title').textContent = title;
  document.getElementById('preview-stats').textContent = stats;
  document.getElementById('table-wrap').innerHTML = html;
  document.getElementById('data-preview').style.display = 'block';
}

async function runPipeline(scenarioKey) {
  if (running) return;
  running = true;

  const scenario = SCENARIOS[scenarioKey];
  document.getElementById('pipeline').style.display = 'flex';
  document.getElementById('data-preview').style.display = 'none';
  document.getElementById('quality-card').style.display = 'none';
  document.getElementById('etl-stats').innerHTML = '';
  startContext();
  resetPipeline();

  // ── EXTRACT ──
  setStage('extract', 'active');
  addContext(STAGE_CONTEXT.extract.title, STAGE_CONTEXT.extract.textFn(scenario));
  await wait(2000);
  showTable('Extracted Data', `${scenario.raw.length} rows × ${scenario.headers.length} columns`,
    renderTable(scenario.headers, scenario.raw));
  setStage('extract', 'done');
  await wait(1000);

  // ── VALIDATE ──
  setStage('validate', 'active');
  addContext(STAGE_CONTEXT.validate.title, STAGE_CONTEXT.validate.textFn(scenario));
  await wait(1200);
  showTable('Validation Results', `${scenario.validate.issues.length} issues found`,
    renderTable(scenario.headers, scenario.raw, { issues: scenario.validate.issues }));
  const warnings = scenario.validate.issues.filter(i => i.type === 'warn').length;
  const errors   = scenario.validate.issues.filter(i => i.type === 'error').length;
  document.getElementById('etl-stats').innerHTML = `
    <span class="etl-stat"><strong style="color: var(--color-amber)">${warnings}</strong> warnings</span>
    <span class="etl-stat"><strong style="color: var(--color-red)">${errors}</strong> errors</span>`;
  setStage('validate', 'done');
  await wait(2200);

  // ── CLEAN ──
  setStage('clean', 'active');
  addContext(STAGE_CONTEXT.clean.title, STAGE_CONTEXT.clean.textFn(scenario));
  await wait(1200);
  const keptRows = scenario.raw.length - scenario.clean.removedRows.length;
  showTable('Cleaned Data',
    `${scenario.clean.removedRows.length} removed, ${scenario.clean.transforms.length} fixed`,
    renderTable(scenario.headers, scenario.raw, {
      removedRows: scenario.clean.removedRows,
      transforms: scenario.clean.transforms,
    }));
  document.getElementById('etl-stats').innerHTML = `
    <span class="etl-stat"><strong style="color: var(--color-red)">${scenario.clean.removedRows.length}</strong> rows removed</span>
    <span class="etl-stat"><strong style="color: var(--color-accent)">${scenario.clean.transforms.length}</strong> values fixed</span>
    <span class="etl-stat"><strong>${keptRows}</strong> rows remaining</span>`;
  setStage('clean', 'done');
  await wait(2200);

  // ── TRANSFORM ──
  setStage('transform', 'active');
  addContext(STAGE_CONTEXT.transform.title, STAGE_CONTEXT.transform.textFn(scenario));
  await wait(1500);
  showTable('Transformed Data',
    `${scenario.transform.rows.length} rows × ${scenario.transform.headers.length} columns`,
    renderTable(scenario.transform.headers, scenario.transform.rows, { newRows: true }));
  document.getElementById('etl-stats').innerHTML = `
    <span class="etl-stat"><strong>${scenario.transform.rows.length}</strong> final rows</span>
    <span class="etl-stat"><strong>${scenario.transform.headers.length}</strong> columns</span>`;
  setStage('transform', 'done');
  await wait(2000);

  // ── LOAD ──
  setStage('load', 'active');
  addContext(STAGE_CONTEXT.load.title, STAGE_CONTEXT.load.textFn(scenario));
  await wait(1500);

  document.getElementById('final-score').textContent  = scenario.load.score + '%';
  document.getElementById('final-rows').textContent   = scenario.load.rows;
  document.getElementById('final-issues').textContent = scenario.load.issues;
  document.getElementById('quality-card').style.display = 'block';

  setStage('load', 'done');
  finishContext();
  running = false;
}

export function mountEtl() {
  const btnsEl = document.getElementById('sample-btns');
  if (!btnsEl) return;
  Object.entries(SCENARIOS).forEach(([key, s]) => {
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
