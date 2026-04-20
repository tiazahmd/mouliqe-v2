// tools/kpi-dashboard.js — KPI dashboard rendering + pipeline runner
import { setStage, resetPipeline, startContext, addContext, finishContext, wait, cssVar } from '/js/tool-page.js';
import { SAMPLES, STAGE_CTX } from '/js/tools/kpi-dashboard-data.js';
import { parseCSV, profileColumns, classifyMetrics, formatValue, generateReportData } from '/js/tools/kpi-dashboard-analysis.js';

const STAGES = ['parse', 'profile', 'classify', 'visualize', 'render'];
let charts = [];

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function trendArrow(pct) {
  if (pct > 0) return `<span class="kpi-trend--up" style="font-size: var(--fs-xxs)">▲ ${Math.abs(pct).toFixed(1)}%</span>`;
  if (pct < 0) return `<span class="kpi-trend--down" style="font-size: var(--fs-xxs)">▼ ${Math.abs(pct).toFixed(1)}%</span>`;
  return `<span class="kpi-trend--flat" style="font-size: var(--fs-xxs)">— 0%</span>`;
}

function renderKpiCards(kpis, headers, rows) {
  const container = document.getElementById('kpi-cards');
  const top = kpis.slice(0, 4);
  container.innerHTML = top.map((k, ki) => {
    const change = k.previous !== null ? ((k.latest - k.previous) / Math.abs(k.previous || 1)) * 100 : 0;
    return `<div class="kpi-card">
      <p class="kpi-card__label">${escapeHtml(k.name)}</p>
      <p class="kpi-card__value">${formatValue(k.latest, k.format)}</p>
      ${trendArrow(change)}
      <div class="kpi-card__spark"><canvas id="spark-${ki}"></canvas></div>
    </div>`;
  }).join('');

  const accent = cssVar('--color-accent') || '#4ade80';
  const red = cssVar('--color-red') || '#f87171';

  top.forEach((k, ki) => {
    const colIdx = headers.indexOf(k.name);
    if (colIdx < 0) return;
    const data = rows.map(r => Number(r[colIdx]));
    const color = k.trend >= 0 ? accent : red;
    const c = new Chart(document.getElementById(`spark-${ki}`).getContext('2d'), {
      type: 'line',
      data: { labels: data.map(() => ''), datasets: [{ data, borderColor: color, backgroundColor: color + '1a', fill: true, tension: 0.4, borderWidth: 1.5, pointRadius: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } },
    });
    charts.push(c);
  });
}

function chartThemeColors() {
  return {
    accent:  cssVar('--color-accent') || '#4ade80',
    red:     cssVar('--color-red')    || '#f87171',
    blue:    cssVar('--color-blue')   || '#60a5fa',
    amber:   cssVar('--color-amber')  || '#fbbf24',
    purple:  cssVar('--color-purple') || '#c084fc',
    grid:    'rgba(127,127,127,0.08)',
    tick:    cssVar('--color-fg-faint') || 'rgba(127,127,127,0.4)',
    fg:      cssVar('--color-fg') || 'rgba(127,127,127,0.7)',
  };
}

function renderCharts(chartConfigs, dateCol, headers, rows) {
  const container = document.getElementById('chart-area');
  container.innerHTML = '';
  charts.forEach(c => c.destroy());
  charts = [];

  const labels = dateCol ? rows.map(r => r[headers.indexOf(dateCol)]) : rows.map((_, i) => i + 1);
  const t = chartThemeColors();
  const palette = [t.accent, t.red, t.blue, t.amber, t.purple];
  const fontFamily = 'Oxanium';

  const gauges = chartConfigs.filter(c => c.type === 'gauge');
  const doughnuts = chartConfigs.filter(c => c.type === 'doughnut');
  const timeSeries = chartConfigs.filter(c => c.type !== 'gauge' && c.type !== 'doughnut');

  // Time-series charts
  timeSeries.forEach((cfg, ci) => {
    const wrap = document.createElement('div');
    wrap.className = 'tool-result-card';
    wrap.innerHTML = `<div class="tool-result-header"><span class="tool-result-label">${escapeHtml(cfg.label)}</span></div>
      <div class="kpi-chart"><canvas id="chart-ts-${ci}"></canvas></div>`;
    container.appendChild(wrap);

    const datasets = cfg.metrics.map((m, mi) => ({
      label: m.metric || m.label,
      data: rows.map(r => Number(r[headers.indexOf(m.metric)])),
      borderColor: palette[mi % palette.length],
      backgroundColor: cfg.type === 'bar' ? palette[mi % palette.length] + '40' : (mi === 0 && m.fill !== false ? palette[mi % palette.length] + '15' : 'transparent'),
      fill: cfg.type !== 'bar' && mi === 0 && m.fill !== false,
      tension: 0.35, borderWidth: cfg.type === 'bar' ? 0 : 1.5, pointRadius: cfg.type === 'bar' ? 0 : 2, pointHoverRadius: 4,
      borderRadius: cfg.type === 'bar' ? 4 : 0,
    }));

    charts.push(new Chart(document.getElementById(`chart-ts-${ci}`).getContext('2d'), {
      type: cfg.type, data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false, resizeDelay: 100,
        interaction: { intersect: false, mode: 'index' },
        plugins: { legend: { display: datasets.length > 1, labels: { color: t.tick, font: { size: 10, family: fontFamily }, boxWidth: 8, padding: 12 } } },
        scales: {
          x: { grid: { color: t.grid }, ticks: { color: t.tick, font: { size: 9, family: fontFamily }, maxRotation: 0 } },
          y: { grid: { color: t.grid }, ticks: { color: t.tick, font: { size: 9, family: fontFamily } } },
        },
      },
    }));
  });

  // Doughnuts + gauges in 2-col row
  if (doughnuts.length || gauges.length) {
    const row = document.createElement('div');
    row.className = 'kpi-chart-pair';
    container.appendChild(row);

    doughnuts.forEach((cfg, di) => {
      const wrap = document.createElement('div');
      wrap.className = 'tool-result-card';
      wrap.innerHTML = `<div class="tool-result-header"><span class="tool-result-label">${escapeHtml(cfg.label)}</span></div>
        <div class="kpi-chart kpi-chart--short"><canvas id="chart-dn-${di}"></canvas></div>`;
      row.appendChild(wrap);

      const vals = cfg.metrics.map(m => {
        const ci2 = headers.indexOf(m.metric);
        return ci2 >= 0 ? Number(rows[rows.length - 1][ci2]) : 0;
      });

      charts.push(new Chart(document.getElementById(`chart-dn-${di}`).getContext('2d'), {
        type: 'doughnut',
        data: { labels: cfg.metrics.map(m => m.metric), datasets: [{ data: vals, backgroundColor: [palette[0] + '80', palette[1] + '80'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'bottom', labels: { color: t.tick, font: { size: 10, family: fontFamily }, boxWidth: 8, padding: 16 } } } },
      }));
    });

    gauges.forEach((cfg, gi) => {
      const wrap = document.createElement('div');
      wrap.className = 'tool-result-card';
      wrap.innerHTML = `<div class="tool-result-header"><span class="tool-result-label">${escapeHtml(cfg.label)}</span></div>
        <div class="kpi-chart kpi-chart--short"><canvas id="chart-ga-${gi}"></canvas></div>`;
      row.appendChild(wrap);

      const val = cfg.value;
      const max = cfg.max || 100;
      const remainder = Math.max(0, max - val);
      const color = val > max * 0.7 ? t.red : val > max * 0.4 ? t.amber : t.accent;

      charts.push(new Chart(document.getElementById(`chart-ga-${gi}`).getContext('2d'), {
        type: 'doughnut',
        data: { labels: [cfg.metric, ''], datasets: [{ data: [val, remainder], backgroundColor: [color + '80', t.grid], borderWidth: 0 }] },
        options: {
          responsive: true, maintainAspectRatio: false, rotation: -90, circumference: 180, cutout: '75%',
          plugins: { legend: { display: false }, tooltip: { filter: (item) => item.dataIndex === 0 } },
        },
        plugins: [{
          id: 'gaugeText',
          afterDraw(chart) {
            const { ctx, chartArea: { left, right, bottom } } = chart;
            const cx = (left + right) / 2, cy = bottom - 10;
            ctx.save();
            ctx.textAlign = 'center';
            ctx.fillStyle = t.fg;
            ctx.font = `700 1.1rem ${fontFamily}`;
            ctx.fillText(formatValue(val, cfg.metric.match(/rate|ctr/i) ? 'percentage' : 'number'), cx, cy - 8);
            ctx.fillStyle = t.tick;
            ctx.font = `500 0.6rem ${fontFamily}`;
            ctx.fillText(cfg.metric, cx, cy + 10);
            ctx.restore();
          },
        }],
      }));
    });
  }
}

function renderProfileCards(profiles) {
  const el = document.getElementById('profile-output');
  el.innerHTML = `<p class="tool-section-label" style="color: var(--color-amber); margin-bottom: var(--space-2)">Column Profiles</p>
    <div class="kpi-profile-grid">${profiles.map(p => {
      const stats = p.type === 'number' || p.type === 'percentage'
        ? `min ${p.min?.toLocaleString()} / max ${p.max?.toLocaleString()}`
        : `${p.unique} unique values`;
      return `<div class="kpi-profile-tile kpi-profile-tile--${p.type}">
        <p class="kpi-profile-tile__name">${escapeHtml(p.name)}</p>
        <span class="kpi-profile-tile__type">${p.type}</span>
        <p class="kpi-profile-tile__stats">${stats}</p>
      </div>`;
    }).join('')}</div>`;
  el.style.display = 'block';
}

function renderInsights(kpis) {
  const row = document.getElementById('insights-row');
  const insights = [];
  kpis.forEach(k => {
    if (k.trend > 50) insights.push({ text: `${k.name} grew ${k.trend.toFixed(0)}% over the period`, type: 'positive' });
    else if (k.trend < -20) insights.push({ text: `${k.name} declined ${Math.abs(k.trend).toFixed(0)}% — needs attention`, type: 'negative' });
    if (k.isRate && k.latest > k.mean * 1.15) insights.push({ text: `${k.name} is above average at ${formatValue(k.latest, k.format)}`, type: 'positive' });
    if (k.isRate && k.name.match(/churn/i) && k.trend > 10) insights.push({ text: `${k.name} trending upward — investigate retention`, type: 'warning' });
  });
  if (!insights.length) { row.style.display = 'none'; return; }
  row.style.display = 'block';
  row.innerHTML = `<p class="tool-section-label">Key Insights</p>
    <div class="kpi-insights-grid">${insights.slice(0, 6).map(ins =>
      `<div class="kpi-insight kpi-insight--${ins.type}">
        <span class="kpi-insight__dot"></span>
        <span class="kpi-insight__text">${escapeHtml(ins.text)}</span>
      </div>`).join('')}</div>`;
}

function renderFunnel(funnelMetrics, headers, rows) {
  const area = document.getElementById('funnel-area');
  if (!funnelMetrics || funnelMetrics.length < 3) { area.style.display = 'none'; return; }
  area.style.display = 'block';
  const lastRow = rows[rows.length - 1];
  const items = funnelMetrics.map(m => ({ name: m.name, value: Number(lastRow[headers.indexOf(m.name)]) }));
  const maxVal = items[0].value;
  const t = chartThemeColors();
  const colors = [t.blue, t.purple, t.amber, t.accent];

  area.innerHTML = `<div class="tool-result-card">
    <div class="tool-result-header"><span class="tool-result-label">Conversion Funnel (Latest Month)</span></div>
    <div class="kpi-funnel-list">${items.map((it, i) => {
      const pct = maxVal > 0 ? (it.value / maxVal * 100) : 0;
      const convRate = i > 0 ? (it.value / items[i - 1].value * 100).toFixed(1) : null;
      const c = colors[i % colors.length];
      return `<div class="kpi-funnel-row">
        <div class="kpi-funnel-row__head">
          <span class="kpi-funnel-row__name">${escapeHtml(it.name)}</span>
          <span class="kpi-funnel-row__value">${it.value.toLocaleString()}${convRate ? ` <span class="kpi-funnel-row__rate" style="color:${c}">(${convRate}% from prev)</span>` : ''}</span>
        </div>
        <div class="kpi-funnel-row__bar">
          <div class="kpi-funnel-row__fill" style="width: ${pct}%; background: ${c}30; border-right-color: ${c};"></div>
        </div>
      </div>`;
    }).join('')}</div>
  </div>`;
}

function renderDataPreview(headers, rows) {
  const wrap = document.getElementById('data-table-wrap');
  const preview = document.getElementById('data-preview');
  document.getElementById('row-count').textContent = `${rows.length} rows × ${headers.length} columns`;

  const displayRows = rows.slice(0, 5);
  let html = '<table class="kpi-preview-table"><thead><tr>';
  headers.forEach(h => { html += `<th>${escapeHtml(h)}</th>`; });
  html += '</tr></thead><tbody>';
  displayRows.forEach(r => {
    html += '<tr>' + r.map(v => `<td>${escapeHtml(v)}</td>`).join('') + '</tr>';
  });
  if (rows.length > 5) {
    html += `<tr><td class="kpi-preview-table__more" colspan="${headers.length}">... ${rows.length - 5} more rows</td></tr>`;
  }
  html += '</tbody></table>';
  wrap.innerHTML = html;
  preview.style.display = 'block';
}

function renderDemoReport(kpis, headers, rows) {
  const el = document.getElementById('demo-report');
  const sections = generateReportData(kpis, headers, rows);
  if (!sections.length) { el.style.display = 'none'; return; }

  el.innerHTML = `<div class="kpi-report">
    <p class="kpi-report__title">Auto-Generated Analysis Report</p>
    <p class="kpi-report__subtitle">Key findings, risks, and opportunities drawn from your data — plus recommended next steps.</p>
    ${sections.map(s => `
      <div class="kpi-report-section">
        <div class="kpi-report-section__head">
          <span class="kpi-report-section__title kpi-report-section__title--${s.type}">${escapeHtml(s.title)}</span>
        </div>
        <p class="kpi-report-section__desc">${escapeHtml(s.desc || '')}</p>
        ${s.items.map(item => {
          if (s.type === 'exec') {
            const mod = item.positive ? 'exec-up' : 'exec-down';
            return `<div class="kpi-report-item kpi-report-item--${mod}">${escapeHtml(item.text)}</div>`;
          }
          return `<div class="kpi-report-item kpi-report-item--${s.type}">${escapeHtml(item)}</div>`;
        }).join('')}
      </div>`).join('')}
  </div>`;
  el.style.display = 'block';
}

async function runPipeline(headers, rows) {
  document.getElementById('pipeline').style.display = 'flex';
  document.getElementById('dashboard-output').style.display = 'none';
  document.getElementById('profile-output').style.display = 'none';
  document.getElementById('insights-row').style.display = 'none';
  document.getElementById('funnel-area').style.display = 'none';
  document.getElementById('data-preview').style.display = 'none';
  document.getElementById('demo-report').style.display = 'none';
  document.getElementById('kpi-cards').innerHTML = '';
  document.getElementById('chart-area').innerHTML = '';
  charts.forEach(c => c.destroy());
  charts = [];

  startContext();
  resetPipeline();

  // Parse
  setStage('parse', 'active');
  addContext(STAGE_CTX.parse.title, STAGE_CTX.parse.text);
  await wait(1500);
  setStage('parse', 'done');

  // Profile
  setStage('profile', 'active');
  addContext(STAGE_CTX.profile.title, STAGE_CTX.profile.text);
  await wait(1500);
  const profiles = profileColumns(headers, rows);
  document.getElementById('dashboard-output').style.display = 'block';
  renderProfileCards(profiles);
  setStage('profile', 'done');
  await wait(500);

  // Classify
  setStage('classify', 'active');
  addContext(STAGE_CTX.classify.title, STAGE_CTX.classify.text);
  await wait(1500);
  const { kpis, chartConfigs, dateCol, funnelMetrics } = classifyMetrics(profiles);
  setStage('classify', 'done');

  // Visualize
  setStage('visualize', 'active');
  addContext(STAGE_CTX.visualize.title, STAGE_CTX.visualize.text);
  await wait(1500);
  setStage('visualize', 'done');

  // Render
  setStage('render', 'active');
  addContext(STAGE_CTX.render.title, STAGE_CTX.render.text);
  await wait(800);
  renderKpiCards(kpis, headers, rows);
  renderInsights(kpis);
  renderCharts(chartConfigs, dateCol, headers, rows);
  renderFunnel(funnelMetrics, headers, rows);
  renderDataPreview(headers, rows);
  renderDemoReport(kpis, headers, rows);
  setStage('render', 'done');

  finishContext();
}

export function mountKpiDashboard() {
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
        runPipeline(s.headers, s.rows);
      });
      btnsEl.appendChild(btn);
    });
  }

  const upload = document.getElementById('csv-upload');
  upload?.addEventListener('change', (e) => {
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
        runPipeline(headers, rows);
      } catch (_) {
        document.getElementById('file-name').textContent = 'Could not parse CSV. Please check file format.';
      }
    };
    reader.readAsText(file);
  });
}
