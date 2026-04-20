// tools/data-quality.js — engine for the data quality scanner
import { setStage, resetPipeline, startContext, addContext, finishContext, wait } from '/js/tool-page.js';
import { SAMPLES, SAMPLE_RESULTS, STAGE_CONTEXT } from '/js/tools/data-quality-data.js';

const STAGES = ['parse', 'profile', 'detect', 'score', 'report'];
let running = false;

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = lines.slice(1).filter(l => l.trim()).map(line => {
    const vals = [];
    let current = '', inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) { vals.push(current.trim()); current = ''; }
      else current += ch;
    }
    vals.push(current.trim());
    return vals;
  });
  return { headers, rows };
}

// Simple quality analyzer for uploaded CSVs
function analyzeCSV(headers, rows) {
  const columns = headers.map((name, colIdx) => {
    const values = rows.map(r => r[colIdx] || '');
    const nonEmpty = values.filter(v => v !== '');
    const nullCount = values.length - nonEmpty.length;
    const unique = new Set(nonEmpty);
    const issues = [];
    let type = 'Text';
    let score = 100;

    const numericVals = nonEmpty.map(Number).filter(v => !isNaN(v));
    const isNumeric = nonEmpty.length > 0 && numericVals.length > nonEmpty.length * 0.8;
    const isDate    = nonEmpty.length > 0 && nonEmpty.filter(v => /^\d{4}-\d{2}-\d{2}/.test(v) || /^\d{2}\/\d{2}\/\d{4}/.test(v)).length > nonEmpty.length * 0.5;
    const isEmail   = nonEmpty.length > 0 && nonEmpty.filter(v => /@/.test(v)).length > nonEmpty.length * 0.5;
    const isId      = /id$/i.test(name) || /^id/i.test(name);

    if (isId) type = 'ID';
    else if (isEmail) type = 'Email';
    else if (isDate) type = 'Date';
    else if (isNumeric) type = 'Number';
    else if (unique.size <= Math.max(5, nonEmpty.length * 0.3)) type = 'Category';

    if (nullCount > 0) {
      const pct = ((nullCount / values.length) * 100).toFixed(0);
      issues.push({ severity: nullCount > 2 ? 'high' : 'medium', row: values.indexOf('') + 1, desc: `${nullCount} null values (${pct}% of column)`, fix: 'Add NOT NULL constraint or provide default values' });
      score -= nullCount * 5;
    }

    if (type === 'ID' && unique.size < nonEmpty.length) {
      const dupCount = nonEmpty.length - unique.size;
      issues.push({ severity: 'high', row: '-', desc: `${dupCount} duplicate values in ID column`, fix: 'Enforce UNIQUE constraint; investigate source of duplicates' });
      score -= dupCount * 10;
    }

    if (isNumeric && numericVals.length > 3) {
      const mean = numericVals.reduce((a, b) => a + b, 0) / numericVals.length;
      const std  = Math.sqrt(numericVals.reduce((s, v) => s + (v - mean) ** 2, 0) / numericVals.length);
      const outliers = numericVals.filter(v => Math.abs(v - mean) > 2.5 * std);
      if (outliers.length > 0) {
        issues.push({ severity: 'medium', row: '-', desc: `${outliers.length} statistical outlier(s) detected (>2.5 std dev)`, fix: 'Review outlier values; add validation range checks' });
        score -= outliers.length * 5;
      }
      const negatives = numericVals.filter(v => v < 0);
      if (negatives.length > 0 && !/refund|credit|loss|change|delta/i.test(name)) {
        issues.push({ severity: 'medium', row: '-', desc: `${negatives.length} negative value(s) — may be unexpected`, fix: 'Add CHECK constraint if negatives are invalid for this field' });
        score -= negatives.length * 3;
      }
    }

    score = Math.max(0, Math.min(100, score));
    return { name, type, score, issues };
  });

  const avgScore = Math.round(columns.reduce((s, c) => s + c.score, 0) / columns.length);
  return { overallScore: avgScore, columns };
}

function scoreTier(s) { return s > 80 ? 'good' : s >= 60 ? 'warn' : 'poor'; }
function scoreLabel(s) { return s > 80 ? 'Good' : s >= 60 ? 'Needs Attention' : 'Poor'; }
function scoreBadgeClass(s) { return s > 80 ? 'tool-score--high' : s >= 60 ? 'tool-score--medium' : 'tool-score--low'; }

function renderOverall(results) {
  const s = results.overallScore;
  const tier = scoreTier(s);
  const totalIssues = results.columns.reduce((sum, c) => sum + c.issues.length, 0);
  document.getElementById('overall-score').innerHTML = `
    <div class="dq-score-card dq-score-card--${tier}">
      <p class="dq-score-card__eyebrow">Overall Data Quality Score</p>
      <p class="dq-score-card__value">${s}</p>
      <p class="dq-score-card__label">${scoreLabel(s)}</p>
      <p class="dq-score-card__meta">${totalIssues} issue${totalIssues !== 1 ? 's' : ''} found across ${results.columns.length} columns</p>
    </div>`;
}

function renderBreakdown(results) {
  const tiles = results.columns.map(col => {
    const tier = scoreTier(col.score);
    return `<div class="dq-col-tile dq-col-tile--${tier}">
      <div class="dq-col-tile__head">
        <span class="dq-col-tile__name">${escapeHtml(col.name)}</span>
        <span class="tool-score ${scoreBadgeClass(col.score)}">${col.score}</span>
      </div>
      <div class="dq-col-tile__meta">
        <span>${escapeHtml(col.type)}</span>
        ${col.issues.length > 0 ? `<span>${col.issues.length} issue${col.issues.length !== 1 ? 's' : ''}</span>` : '<span style="color: var(--color-accent)">No issues</span>'}
      </div>
      ${col.issues.length > 0 ? `<div class="dq-col-tile__badges">${col.issues.map(i => `<span class="severity-badge severity-badge--${i.severity}">${i.severity}</span>`).join('')}</div>` : ''}
    </div>`;
  }).join('');

  document.getElementById('column-breakdown').innerHTML = `
    <div class="tool-result-card">
      <div class="tool-result-header"><span class="tool-result-label">Column-by-Column Breakdown</span></div>
      <div class="dq-col-grid">${tiles}</div>
    </div>`;
}

function renderIssues(results) {
  const allIssues = [];
  results.columns.forEach(col => col.issues.forEach(iss => allIssues.push({ column: col.name, ...iss })));
  const section = document.getElementById('issue-list-section');
  if (!allIssues.length) { section.innerHTML = ''; return; }

  section.innerHTML = `
    <div class="tool-result-card">
      <div class="dq-issue-toggle" id="issue-toggle">
        <span class="tool-result-label">Issue Details (${allIssues.length})</span>
        <span class="dq-issue-chevron" id="issue-chevron">&#9662;</span>
      </div>
      <div class="dq-issue-list" id="issue-details" style="margin-top: var(--space-2)">
        ${allIssues.map(iss => `
          <div class="dq-issue-item">
            <div class="dq-issue-item__head">
              <span class="severity-badge severity-badge--${iss.severity}">${iss.severity}</span>
              <span class="dq-issue-item__col">${escapeHtml(iss.column)}</span>
              ${iss.row !== '-' ? `<span class="dq-issue-item__row">Row ${iss.row}</span>` : ''}
            </div>
            <p class="dq-issue-item__desc">${escapeHtml(iss.desc)}</p>
            <p class="dq-issue-item__fix"><strong>Fix:</strong> ${escapeHtml(iss.fix)}</p>
          </div>`).join('')}
      </div>
    </div>`;

  document.getElementById('issue-toggle').addEventListener('click', () => {
    const list = document.getElementById('issue-details');
    const chev = document.getElementById('issue-chevron');
    list.classList.toggle('open');
    chev.style.transform = list.classList.contains('open') ? 'rotate(180deg)' : '';
  });
}

function renderDataPreview(results, headers, rows) {
  const wrap = document.getElementById('data-table-wrap');
  const preview = document.getElementById('data-preview');
  document.getElementById('row-count').textContent = `${rows.length} rows × ${headers.length} columns`;

  const flagged = {};
  results.columns.forEach((col, colIdx) => {
    col.issues.forEach(iss => {
      if (typeof iss.row === 'number') flagged[`${iss.row - 1}-${colIdx}`] = iss;
    });
  });

  const displayRows = rows.slice(0, 10);
  let html = '<table class="dq-preview-table"><thead><tr><th>#</th>';
  headers.forEach(h => { html += `<th>${escapeHtml(h)}</th>`; });
  html += '</tr></thead><tbody>';

  displayRows.forEach((r, ri) => {
    html += `<tr><td>${ri + 1}</td>`;
    r.forEach((v, ci) => {
      const key = `${ri}-${ci}`;
      const issue = flagged[key];
      const cls = issue ? `flagged-${issue.severity === 'high' ? 'high' : 'warn'}` : '';
      const val = v === '' ? '<span class="null-val">null</span>' : escapeHtml(v);
      const badge = issue
        ? ` <span class="cell-badge cell-badge--${issue.severity === 'high' ? 'error' : 'warn'}">${issue.severity === 'high' ? 'issue' : 'warn'}</span>`
        : '';
      html += `<td class="${cls}">${val}${badge}</td>`;
    });
    html += '</tr>';
  });

  if (rows.length > 10) {
    html += `<tr><td colspan="${headers.length + 1}" class="dq-preview-table__more">... ${rows.length - 10} more rows</td></tr>`;
  }
  html += '</tbody></table>';
  wrap.innerHTML = html;
  preview.style.display = 'block';
}

async function runPipeline(sampleKey, headers, rows) {
  if (running) return;
  running = true;

  document.getElementById('pipeline').style.display = 'flex';
  document.getElementById('results-output').style.display = 'none';
  startContext();
  resetPipeline();

  const timings = { parse: 1800, profile: 2200, detect: 2500, score: 1800, report: 1500 };
  for (let i = 0; i < STAGES.length; i++) {
    const s = STAGES[i];
    setStage(s, 'active');
    addContext(STAGE_CONTEXT[s].title, STAGE_CONTEXT[s].text, STAGE_CONTEXT[s].isAI);
    await wait(timings[s]);
    if (i > 0) setStage(STAGES[i - 1], 'done');
  }
  setStage('report', 'done');

  const results = sampleKey && SAMPLE_RESULTS[sampleKey] ? SAMPLE_RESULTS[sampleKey] : analyzeCSV(headers, rows);
  renderOverall(results);
  renderBreakdown(results);
  renderIssues(results);
  renderDataPreview(results, headers, rows);
  document.getElementById('results-output').style.display = 'block';

  finishContext();
  running = false;
}

export function mountDataQuality() {
  const btnsEl = document.getElementById('sample-btns');
  if (btnsEl) {
    Object.entries(SAMPLES).forEach(([key, s]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tool-sample-btn';
      btn.innerHTML = `<span class="tool-sample-btn__label">${s.label}</span><span class="tool-sample-btn__sub">${s.sub}</span>`;
      btn.addEventListener('click', () => {
        btnsEl.querySelectorAll('.tool-sample-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('file-name').textContent = '';
        runPipeline(key, s.headers, s.rows);
      });
      btnsEl.appendChild(btn);
    });
  }

  const upload = document.getElementById('csv-upload');
  if (upload) {
    upload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 1024 * 1024) {
        document.getElementById('file-name').textContent = 'File too large. Please upload a CSV under 1 MB.';
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const { headers, rows } = parseCSV(ev.target.result);
          document.getElementById('file-name').textContent = `${file.name} · ${rows.length} rows × ${headers.length} columns`;
          document.querySelectorAll('.tool-sample-btn').forEach(b => b.classList.remove('active'));
          runPipeline(null, headers, rows);
        } catch (_) {
          document.getElementById('file-name').textContent = 'Could not parse CSV. Please check file format.';
        }
      };
      reader.readAsText(file);
    });
  }
}
