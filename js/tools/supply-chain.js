// tools/supply-chain.js — hybrid AI+statistical supply chain intelligence demo
import { setStage, resetPipeline, startContext, addContext, finishContext, addCard, clearOutput, wait } from '/js/tool-page.js';
import { DATA, STAGE_CTX } from '/js/tools/supply-chain-data.js';

let running = false;

function renderSignals() {
  const mc = DATA.market.map(s => `
    <div class="signal-card">
      <div class="signal-card__head">
        <span class="signal-name">${s.name}</span>
        <span class="signal-tag signal-tag--market">Market</span>
      </div>
      <div style="display: flex; align-items: baseline; gap: var(--space-2)">
        <span class="signal-value">${s.value}</span>
        <span class="signal-delta signal-delta--${s.dir}">${s.delta}<span class="signal-delta__period">${s.period}</span></span>
      </div>
    </div>`).join('');

  const cc = DATA.company.map(s => `
    <div class="signal-card${s.alert ? ' alert' : ''}">
      <div class="signal-card__head">
        <span class="signal-name">${s.name}</span>
        <span class="signal-tag signal-tag--company">Internal</span>
      </div>
      <div style="display: flex; align-items: baseline; gap: var(--space-2)">
        <span class="signal-value">${s.value}</span>
        ${s.delta ? `<span class="signal-delta signal-delta--${s.dir}">${s.delta}</span>` : ''}
      </div>
    </div>`).join('');

  document.getElementById('signals-section').innerHTML = `
    <div class="tool-result-card">
      <div class="tool-result-header">
        <span class="tool-result-label">Market Signals</span>
        <span class="tool-result-meta">${DATA.market.length} signals</span>
      </div>
      <div class="signal-grid">${mc}</div>
    </div>
    <div class="tool-result-card" style="margin-top: var(--space-3)">
      <div class="tool-result-header">
        <span class="tool-result-label">Company Signals</span>
        <span class="tool-result-meta">${DATA.company.length} signals</span>
      </div>
      <div class="signal-grid">${cc}</div>
    </div>`;
}

function renderNews() {
  const items = DATA.news.map(n => `
    <div class="news-item">
      <div class="news-severity news-severity--${n.severity}"></div>
      <div class="news-item__body">
        <p class="news-item__headline">${n.headline}</p>
        <div class="news-item__meta">
          <span class="news-item__source">${n.source}</span>
          ${n.commodities.map(c => `<span class="news-item__commodity">${c}</span>`).join('')}
          <span class="news-item__horizon">${n.horizon}</span>
        </div>
      </div>
    </div>`).join('');

  document.getElementById('news-section').innerHTML = `
    <div class="tool-result-card">
      <div class="tool-result-header">
        <span class="tool-result-label">News &amp; Policy Signals</span>
        <span class="tool-badge tool-badge--ai">AI Classified</span>
      </div>
      <div style="margin-top: var(--space-2)">${items}</div>
    </div>`;
}

function renderCorrelations() {
  const rows = DATA.correlations.map(c => `
    <div class="corr-row">
      <div class="corr-row__signals">${c.signals.join(' — ')}</div>
      <div class="corr-row__bar-wrap">
        <div class="corr-row__bar"><div class="corr-row__fill corr-row__fill--${c.type}" style="width: ${c.strength * 100}%"></div></div>
        <span class="corr-row__strength">${c.strength.toFixed(2)}</span>
      </div>
      <span class="corr-row__type corr-row__type--${c.type}">${c.type}</span>
    </div>`).join('');

  const notes = DATA.correlations.map(c => `
    <p class="corr-note"><strong>${c.signals.join(' + ')}:</strong> ${c.note}</p>`).join('');

  document.getElementById('correlation-section').innerHTML = `
    <div class="tool-result-card">
      <div class="tool-result-header">
        <span class="tool-result-label">Cross-Signal Correlations</span>
        <span class="tool-badge tool-badge--warning">Statistical</span>
      </div>
      ${rows}
      <div style="margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border)">${notes}</div>
    </div>`;
}

function renderReasoning() {
  const items = DATA.causalLinks.map((l, i) => `
    <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-2); animation: fadeInUp 0.3s ease-out forwards; animation-delay: ${i * 0.1}s; opacity: 0; animation-fill-mode: forwards">
      <span style="color: var(--color-purple); font-size: var(--fs-xs); margin-top: 0.15rem; flex-shrink: 0">${i + 1}.</span>
      <p style="font-size: var(--fs-xs); color: var(--color-fg-muted); line-height: var(--lh-base); margin: 0">${l}</p>
    </div>`).join('');

  document.getElementById('reasoning-section').innerHTML = `
    <div class="tool-result-card">
      <div class="tool-result-header">
        <span class="tool-result-label">Causal Analysis</span>
        <span class="tool-badge tool-badge--ai">AI Reasoning</span>
      </div>
      <div style="margin-top: var(--space-2)">${items}</div>
    </div>`;
}

function renderOptimization() {
  const o = DATA.optimization;
  const constraints = o.constraints.map(c => `
    <span style="font-size: var(--fs-xs); color: var(--color-fg-subtle); background: var(--color-bg-raised); border: 1px solid var(--color-border); padding: 0.2rem var(--space-2); border-radius: var(--radius-sm); line-height: 1">${c}</span>`).join('');

  const labels = { totalCost: 'Total Cost', savings: 'Savings', coverTarget: 'Cover Target', riskScore: 'Risk Score' };
  const stats = Object.entries(o.result).map(([k, v]) => `
    <div class="tool-stat" style="border-radius: var(--radius); background: var(--color-bg-raised); border: 1px solid var(--color-border)">
      <p class="tool-stat__value">${v}</p>
      <p class="tool-stat__label">${labels[k]}</p>
    </div>`).join('');

  document.getElementById('optimization-section').innerHTML = `
    <div class="tool-result-card">
      <div class="tool-result-header">
        <span class="tool-result-label">Optimization Result</span>
        <span class="tool-badge tool-badge--warning">Deterministic</span>
      </div>
      <p style="font-size: var(--fs-sm); color: var(--color-fg-muted); line-height: var(--lh-base); margin: var(--space-2) 0 var(--space-3)">${o.objective}</p>
      <div style="display: flex; flex-wrap: wrap; gap: var(--space-1); margin-bottom: var(--space-4)">${constraints}</div>
      <div class="tool-stat-grid">${stats}</div>
    </div>`;
}

async function renderRecommendations() {
  const el = document.getElementById('recommendations-section');
  el.innerHTML = `<p class="tool-section-label" style="margin-top: var(--space-3)">Recommendations</p>`;
  for (const r of DATA.recommendations) {
    const card = document.createElement('div');
    card.className = `rec-card rec-card--${r.type}`;
    card.innerHTML = `
      <div class="rec-card__head">
        <div class="rec-card__left">
          <span class="rec-card__type">${r.type}</span>
          <span class="conf-badge conf-badge--${r.confidence === 'high' ? 'high' : 'med'}">${r.confidence} confidence</span>
        </div>
        <span class="rec-card__urgency">${r.urgency}</span>
      </div>
      <p class="rec-card__title">${r.title}</p>
      <p class="rec-card__body">${r.body}</p>`;
    el.appendChild(card);
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    await wait(400);
  }
}

async function runSimulation() {
  if (running) return;
  running = true;
  const btn = document.getElementById('run-btn');
  btn.disabled = true;

  document.getElementById('pipeline').style.display = 'flex';
  startContext();
  clearOutput();
  resetPipeline();

  // Build output sub-sections
  const output = document.getElementById('sim-output');
  output.style.display = 'block';
  output.innerHTML = `
    <div id="signals-section"></div>
    <div id="news-section" style="margin-top: var(--space-3)"></div>
    <div id="correlation-section" style="margin-top: var(--space-3)"></div>
    <div id="reasoning-section" style="margin-top: var(--space-3)"></div>
    <div id="optimization-section" style="margin-top: var(--space-3)"></div>
    <div id="recommendations-section" style="margin-top: var(--space-3)"></div>`;

  const stages = ['ingest', 'process', 'correlate', 'reason', 'optimize', 'recommend'];
  const renderers = { ingest: renderSignals, process: renderNews, correlate: renderCorrelations, reason: renderReasoning, optimize: renderOptimization, recommend: renderRecommendations };
  const delays = { ingest: 2000, process: 2200, correlate: 2500, reason: 2000, optimize: 2200, recommend: 1000 };

  for (let i = 0; i < stages.length; i++) {
    const s = stages[i];
    setStage(s, 'active');
    addContext(STAGE_CTX[s].title, STAGE_CTX[s].text, STAGE_CTX[s].isAI);
    await wait(delays[s]);
    const out = renderers[s]();
    if (out && out.then) await out;
    if (i > 0) setStage(stages[i - 1], 'done');
  }
  setStage('recommend', 'done');
  finishContext();

  btn.disabled = false;
  running = false;
}

export function mountSupplyChain() {
  document.getElementById('run-btn')?.addEventListener('click', runSimulation);
}
