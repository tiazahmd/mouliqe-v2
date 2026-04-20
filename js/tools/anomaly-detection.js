// tools/anomaly-detection.js — pipeline logic for the anomaly detection demo
import { setStage, resetPipeline, startContext, addContext, finishContext, addCard, clearOutput, wait, cssVar } from '/js/tool-page.js';

const LABELS = Array.from({ length: 30 }, (_, i) => `Mar ${i + 1}`);

const SAMPLES = {
  revenue: {
    label: 'Daily Revenue', sub: '$, 30-day window', unit: '$',
    values: [42100,43800,41200,44500,43100,42800,45200,44100,43600,42900,44800,43200,45100,44600,43900,12400,44200,45800,43700,44100,42600,45300,44700,43800,44200,78900,43100,44500,43200,44800],
    anomalies: [
      { idx: 15, severity: 'critical', method: 'Z-Score + AI', label: 'Revenue cliff', desc: 'Revenue dropped 72% ($44.6K → $12.4K). Not a weekend or holiday. Likely payment processing failure or data pipeline break.', threshold: 'Would miss — value is above $0', ai: 'Detected — contextual drop vs. 14-day trend' },
      { idx: 25, severity: 'warning',  method: 'AI Pattern',  label: 'Unusual spike',   desc: 'Revenue 79% above 7-day average ($44.1K → $78.9K). Could be legitimate (large deal closing) or double-counting.',   threshold: 'Would miss — no upper threshold set', ai: 'Flagged — outside expected variance band' },
    ],
    stats: { mean: 43247, stddev: 9841, min: 12400, max: 78900 },
  },
  traffic: {
    label: 'Website Traffic', sub: 'Sessions, 30-day window', unit: '',
    values: [8200,8400,8100,8600,8300,3200,3100,8500,8700,8200,8800,8400,3300,3000,8600,8900,8100,8700,8500,2800,2900,8400,8800,8200,8600,8300,8100,8700,8500,8200],
    anomalies: [
      { idx: 5,  severity: 'info',    method: 'IQR',        label: 'Weekend dip',         desc: 'Traffic dropped 62% — consistent with Saturday pattern. This is expected seasonality, not an anomaly.',                                      threshold: 'Would alert — below threshold',        ai: 'Correctly ignored — matches weekly cycle' },
      { idx: 19, severity: 'warning', method: 'AI Pattern', label: 'Deeper weekday dip',  desc: 'Traffic 67% below weekday average on a Tuesday. Not a holiday. Possible SEO penalty, CDN outage, or tracking code failure.',             threshold: 'Would miss — lumped with weekend dips', ai: 'Detected — weekday context separates this from weekend pattern' },
    ],
    stats: { mean: 7117, stddev: 2284, min: 2800, max: 8900 },
  },
  sensor: {
    label: 'IoT Sensor Temp', sub: 'Celsius, 30-day window', unit: '°C',
    values: [22.1,22.3,22.0,22.4,22.2,22.1,22.5,22.3,22.2,22.0,22.4,22.1,22.3,22.2,22.5,22.1,22.3,22.8,23.1,23.4,23.8,24.2,24.5,22.3,22.1,22.4,22.2,22.0,22.3,22.1],
    anomalies: [
      { idx: 17, severity: 'warning',  method: 'AI Pattern',   label: 'Gradual drift start', desc: 'Temperature began rising 0.3°C/day — within normal range individually, but the trend indicates sensor drift or HVAC degradation. Simple thresholds see each reading as "normal."', threshold: 'Would miss — each value is within range', ai: 'Detected — identified upward trend over 6 consecutive readings' },
      { idx: 22, severity: 'critical', method: 'Z-Score + AI', label: 'Peak deviation',      desc: 'Temperature reached 24.5°C — 2.3°C above baseline mean. Combined with the 6-day upward trend, this confirms equipment issue, not a one-off spike.',                           threshold: 'Would catch — above static threshold',   ai: 'Caught earlier — flagged the trend 5 days before threshold breach' },
    ],
    stats: { mean: 22.6, stddev: 0.68, min: 22.0, max: 24.5 },
  },
};

let running = false;
let chart = null;

async function runPipeline(key) {
  if (running) return;
  running = true;
  const data = SAMPLES[key];

  document.getElementById('pipeline').style.display = 'flex';
  startContext();
  clearOutput();
  resetPipeline();
  if (chart) { chart.destroy(); chart = null; }

  const anomalyIdxs = data.anomalies.map(a => a.idx);

  // ── Ingest ──
  setStage('ingest', 'active');
  addContext('Ingesting Time-Series Data', `Loading ${data.values.length} data points from the ${data.label.toLowerCase()} stream. Each reading is timestamped and validated for completeness.`);

  addCard(`<div class="tool-result-card"><div style="position:relative;height:200px"><canvas id="ts-chart"></canvas></div></div>`);

  const gridColor = 'rgba(127,127,127,0.08)';
  const axisColor = cssVar('--color-fg-faint') || 'rgba(127,127,127,0.4)';
  const lineMuted = 'rgba(127,127,127,0.25)';
  const lineGreen = cssVar('--color-accent');
  const lineFill  = cssVar('--color-accent-ghost');

  chart = new Chart(document.getElementById('ts-chart'), {
    type: 'line',
    data: { labels: LABELS, datasets: [{ data: data.values, borderColor: lineMuted, borderWidth: 1.5, pointRadius: 0, fill: false, tension: 0.3 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: { duration: 800 },
      layout: { padding: { top: 12, bottom: 4 } },
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: axisColor, font: { size: 9 } }, grid: { color: gridColor } },
        y: {
          ticks: { color: axisColor, font: { size: 9 } },
          grid: { color: gridColor },
          grace: '10%',
        },
      },
    },
  });
  await wait(800);

  chart.data.datasets[0].borderColor = lineGreen;
  chart.data.datasets[0].fill = { target: 'origin', above: lineFill };
  chart.update();
  setStage('ingest', 'done');
  await wait(400);

  // ── Baseline ──
  setStage('baseline', 'active');
  addContext('Computing Statistical Baseline', `Calculating mean, standard deviation, and interquartile range across the full window. This establishes what "normal" looks like. Mean: ${data.stats.mean}${data.unit}, StdDev: ${data.stats.stddev}.`);
  await wait(1000);
  setStage('baseline', 'done');

  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    <div class="tool-result-header"><span class="tool-result-label">Statistical Baseline</span></div>
    <div class="tool-stat-grid">
      <div class="tool-stat"><p class="tool-stat__value">${data.stats.mean}</p><p class="tool-stat__label">Mean</p></div>
      <div class="tool-stat"><p class="tool-stat__value">${data.stats.stddev}</p><p class="tool-stat__label">Std Dev</p></div>
      <div class="tool-stat"><p class="tool-stat__value tool-stat__value--success">${data.stats.min}</p><p class="tool-stat__label">Min</p></div>
      <div class="tool-stat"><p class="tool-stat__value tool-stat__value--danger">${data.stats.max}</p><p class="tool-stat__label">Max</p></div>
    </div>
  </div>`);
  await wait(400);

  // ── Detect ──
  setStage('detect', 'active');
  addContext('Running Statistical Detection', 'Applying Z-Score analysis (flags values >2 standard deviations from mean) and IQR outlier detection. These are fast, deterministic checks — they catch obvious spikes but miss subtle patterns.');
  await wait(1200);

  const anomalyColor = cssVar('--color-red');
  const pointColors = data.values.map((_, i) => anomalyIdxs.includes(i) ? anomalyColor : lineGreen);
  const pointRadii  = data.values.map((_, i) => anomalyIdxs.includes(i) ? 6 : 0);
  chart.data.datasets[0].pointBackgroundColor = pointColors;
  chart.data.datasets[0].pointRadius = pointRadii;
  chart.data.datasets[0].pointHoverRadius = 8;
  chart.update();
  setStage('detect', 'done');
  await wait(400);

  // ── Classify (AI) ──
  setStage('classify', 'active');
  addContext('AI: Contextual Pattern Analysis', 'The AI classifier goes beyond simple thresholds. It analyzes each candidate in context — day-of-week patterns, recent trends, seasonal cycles. A drop on Saturday might be normal; the same drop on Tuesday is a problem.', true);
  await wait(1400);
  setStage('classify', 'done');
  await wait(300);

  // ── Alert ──
  setStage('alert', 'active');
  addContext('Generating Alerts', 'Building alert cards for each confirmed anomaly with severity, detection method, explanation, and a side-by-side comparison of threshold vs. AI detection.');

  addCard(`<div style="margin-top: var(--space-3)" id="alert-area">
    <div class="tool-result-header" style="margin-bottom: var(--space-2)">
      <span class="tool-result-label">Anomaly Alerts</span>
      <span class="tool-result-meta">${data.anomalies.length} detected</span>
    </div>
  </div>`);

  for (const a of data.anomalies) {
    document.getElementById('alert-area').insertAdjacentHTML('beforeend', `
      <div class="tool-alert tool-alert--${a.severity}">
        <div class="tool-alert__head">
          <span class="tool-badge tool-badge--${a.severity}">${a.severity}</span>
          <span class="tool-badge tool-badge--ai">${a.method}</span>
          <span class="tool-alert__meta">${LABELS[a.idx]} — ${data.unit}${data.values[a.idx]}</span>
        </div>
        <p class="tool-alert__title">${a.label}</p>
        <p class="tool-alert__text">${a.desc}</p>
        <div class="tool-compare">
          <div class="tool-compare__panel tool-compare__panel--danger">
            <p class="tool-compare__label">Simple Threshold</p>
            <p class="tool-compare__text">${a.threshold}</p>
          </div>
          <div class="tool-compare__panel tool-compare__panel--success">
            <p class="tool-compare__label">AI Detection</p>
            <p class="tool-compare__text">${a.ai}</p>
          </div>
        </div>
      </div>`);
    await wait(600);
  }
  setStage('alert', 'done');
  await wait(300);

  // ── Report ──
  setStage('report', 'active');
  const critical = data.anomalies.filter(a => a.severity === 'critical').length;
  const warnings = data.anomalies.filter(a => a.severity === 'warning').length;
  const aiOnly   = data.anomalies.filter(a => a.method.includes('AI')).length;
  addContext('Compiling Detection Report', `${data.anomalies.length} anomalies across ${data.values.length} data points. ${aiOnly} caught only by AI — simple thresholds would have missed them entirely.`);
  await wait(800);

  addCard(`<div class="tool-result-card tool-result-card--success" style="margin-top: var(--space-3)">
    <div class="tool-result-header"><span class="tool-result-label">Detection Summary</span></div>
    <div class="tool-stat-grid">
      <div class="tool-stat"><p class="tool-stat__value">${data.values.length}</p><p class="tool-stat__label">Data Points</p></div>
      <div class="tool-stat"><p class="tool-stat__value tool-stat__value--red">${critical}</p><p class="tool-stat__label">Critical</p></div>
      <div class="tool-stat"><p class="tool-stat__value tool-stat__value--amber">${warnings}</p><p class="tool-stat__label">Warnings</p></div>
      <div class="tool-stat"><p class="tool-stat__value tool-stat__value--purple">${aiOnly}</p><p class="tool-stat__label">AI-Only Catches</p></div>
    </div>
  </div>`);

  setStage('report', 'done');
  finishContext();
  if (sidebar) {
    sidebar.style.display = '';
    sidebar.classList.add('tool-side--revealed');
  }
  running = false;
}

export function mountAnomalyDetection() {
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
