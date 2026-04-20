// tools/cost-simulator.js — engine for AI cost simulator (phase 1 + phase 2)
import { setStage, resetPipeline, startContext, addContext, finishContext, wait } from '/js/tool-page.js';
import { PRICE, SCENARIOS, STAGE_CTX } from '/js/tools/cost-simulator-data.js';

let currentScenario = null;
let running = false;
let phase = 0;

function costPerQuery(inputTok, outputTok, model) {
  const p = PRICE[model];
  return (inputTok * p.input + outputTok * p.output) / 1_000_000;
}
function monthlyCost(cpq, volPerDay, cacheHit = 0) {
  return cpq * volPerDay * (1 - cacheHit) * 30;
}
function computeMonthly(opt, vol) {
  const { inputTok, outputTok, model, cacheHit = 0, routeFrac = 0, miniModel } = opt;
  let cpq;
  if (miniModel && routeFrac > 0) {
    const mainCpq = costPerQuery(inputTok, outputTok, model);
    const miniCpq = costPerQuery(inputTok, outputTok, miniModel);
    cpq = (1 - routeFrac) * mainCpq + routeFrac * miniCpq;
  } else {
    cpq = costPerQuery(inputTok, outputTok, model);
  }
  return monthlyCost(cpq, vol, cacheHit);
}
function fmt$(n) {
  if (n >= 10000) return '$' + Math.round(n).toLocaleString();
  if (n >= 1000)  return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return '$' + n.toFixed(0);
}
function fmtTok(n) { return n >= 1000 ? Math.round(n / 1000) + 'K' : n.toString(); }

function renderArch(nodes) {
  const pipeline = document.getElementById('arch-pipeline');
  pipeline.innerHTML = '';
  nodes.forEach((n, i) => {
    if (i > 0) {
      const arr = document.createElement('span');
      arr.className = 'arch-pipeline__arrow';
      arr.textContent = '›';
      pipeline.appendChild(arr);
    }
    const pill = document.createElement('div');
    pill.className = `arch-pill arch-pill--${n.type}`;
    pill.innerHTML = `<span class="arch-pill__label">${n.label}</span>${n.sub ? `<span class="arch-pill__sub">${n.sub}</span>` : ''}`;
    pipeline.appendChild(pill);
  });
}

function animateCost(from, to, durationMs, onUpdate, onDone) {
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / durationMs, 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const val = from + (to - from) * ease;
    onUpdate(val);
    if (t < 1) requestAnimationFrame(step);
    else { onUpdate(to); if (onDone) onDone(); }
  }
  requestAnimationFrame(step);
}

async function runBaseline() {
  if (running || !currentScenario) return;
  running = true;
  phase = 0;
  const sc = SCENARIOS[currentScenario];
  const vol = parseInt(document.getElementById('vol-slider').value, 10);

  document.getElementById('opt-steps-list').innerHTML = '';
  document.getElementById('comparison').innerHTML = '';
  document.getElementById('comparison').style.display = 'none';
  document.getElementById('savings-card').innerHTML = '';
  document.getElementById('savings-card').style.display = 'none';
  document.getElementById('opt-steps').style.display = 'none';
  document.getElementById('phase2-cta').style.display = 'none';

  startContext();
  resetPipeline();

  document.getElementById('pipeline').style.display = 'flex';
  document.getElementById('sim-output').style.display = 'block';
  document.getElementById('cost-meter').style.display = 'block';
  document.getElementById('run-baseline-btn').disabled = true;

  // Profile
  setStage('profile', 'active');
  addContext(STAGE_CTX.profile.title, STAGE_CTX.profile.text, STAGE_CTX.profile.isAI);
  await wait(1800);
  setStage('profile', 'done');

  // Baseline
  setStage('baseline', 'active');
  addContext(STAGE_CTX.baseline.title, STAGE_CTX.baseline.text, STAGE_CTX.baseline.isAI);
  await wait(1200);

  const b = sc.baseline;
  const baseCpq = costPerQuery(b.inputTok, b.outputTok, b.model);
  const baseMonthly = monthlyCost(baseCpq, vol, 0);

  renderArch(b.arch);
  document.getElementById('cost-meter-label').textContent = 'Current Monthly Cost';
  document.getElementById('cost-meter-meta').innerHTML = `
    <p class="cost-meter__meta-primary cost-meter__meta-primary--bad">${b.desc}</p>
    <p class="cost-meter__meta-sub">${fmtTok(b.inputTok)} in + ${fmtTok(b.outputTok)} out tokens · ${b.model}</p>`;

  const costEl = document.getElementById('cost-number');
  costEl.className = 'cost-number cost-number--high';
  await new Promise(resolve => animateCost(0, baseMonthly, 2200, v => { costEl.textContent = fmt$(v); }, resolve));

  setStage('baseline', 'done');
  await wait(800);

  document.getElementById('run-opt-btn').disabled = false;
  document.getElementById('phase2-cta').style.display = 'block';
  document.getElementById('phase2-cta').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  running = false;
  phase = 1;
}

async function runOptimize() {
  if (running || phase !== 1 || !currentScenario) return;
  running = true;

  const sc = SCENARIOS[currentScenario];
  const vol = parseInt(document.getElementById('vol-slider').value, 10);
  const b = sc.baseline;
  const baseCpq = costPerQuery(b.inputTok, b.outputTok, b.model);
  const baseMonthly = monthlyCost(baseCpq, vol, 0);

  document.getElementById('run-opt-btn').disabled = true;
  document.getElementById('phase2-cta').style.display = 'none';

  setStage('optimize', 'active');
  addContext(STAGE_CTX.optimize.title, STAGE_CTX.optimize.text, STAGE_CTX.optimize.isAI);
  document.getElementById('opt-steps').style.display = 'block';
  await wait(1500);

  const costEl = document.getElementById('cost-number');
  let prevMonthly = baseMonthly;
  const stepResults = [];

  for (let i = 0; i < sc.optimizations.length; i++) {
    const opt = sc.optimizations[i];
    const newMonthly = computeMonthly(opt, vol);
    const savedFrac = (prevMonthly - newMonthly) / prevMonthly;
    const totalSavedFrac = (baseMonthly - newMonthly) / baseMonthly;

    renderArch(opt.arch);

    await new Promise(resolve => animateCost(prevMonthly, newMonthly, 1600, v => {
      costEl.textContent = fmt$(v);
      const ratio = v / baseMonthly;
      costEl.className = 'cost-number ' + (ratio > 0.5 ? 'cost-number--high' : ratio > 0.15 ? 'cost-number--med' : 'cost-number--low');
    }, resolve));

    document.getElementById('cost-meter-label').textContent = `After Step ${i + 1}: ${opt.name}`;
    document.getElementById('cost-meter-meta').innerHTML = `
      <p class="cost-meter__meta-primary cost-meter__meta-primary--good">${opt.pattern}</p>
      <p class="cost-meter__meta-sub">−${Math.round(savedFrac * 100)}% from previous · −${Math.round(totalSavedFrac * 100)}% from current setup</p>`;

    const card = document.createElement('div');
    card.className = 'opt-card';
    card.innerHTML = `
      <div class="opt-card__head">
        <span class="opt-card__title">Step ${i + 1}: ${opt.name}</span>
        <span class="savings-pill">−${Math.round(savedFrac * 100)}% from prev · −${Math.round(totalSavedFrac * 100)}% from baseline</span>
      </div>
      <p class="opt-card__desc">${opt.desc}</p>
      <div class="opt-card__stats">
        <div>
          <p class="opt-card__stat-label">Was</p>
          <p class="opt-card__stat-was">${fmt$(prevMonthly)}/mo</p>
        </div>
        <div class="opt-card__arrow">→</div>
        <div>
          <p class="opt-card__stat-label">Now</p>
          <p class="opt-card__stat-now">${fmt$(newMonthly)}/mo</p>
        </div>
        <div>
          <p class="opt-card__stat-label">Monthly savings</p>
          <p class="opt-card__stat-now">${fmt$(prevMonthly - newMonthly)}</p>
        </div>
      </div>`;
    document.getElementById('opt-steps-list').appendChild(card);
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    stepResults.push({ name: opt.name, pattern: opt.pattern, monthly: newMonthly, savedFromBase: totalSavedFrac });
    prevMonthly = newMonthly;
    await wait(800);
  }
  setStage('optimize', 'done');
  const finalMonthly = prevMonthly;

  // Compare
  setStage('compare', 'active');
  addContext(STAGE_CTX.compare.title, STAGE_CTX.compare.text, STAGE_CTX.compare.isAI);
  await wait(1200);

  const compDiv = document.getElementById('comparison');
  compDiv.style.display = 'block';
  compDiv.innerHTML = `
    <p class="tool-section-label">Full Breakdown</p>
    <div class="comp-box">
      <div class="comp-row comp-row--header">
        <div>Stage</div>
        <div style="text-align: right">Monthly Cost</div>
        <div style="text-align: right">vs Current Setup</div>
      </div>
      <div class="comp-row">
        <div class="comp-row__stage">Current setup (baseline)</div>
        <div class="comp-row__base">${fmt$(baseMonthly)}</div>
        <div class="comp-row__dash">—</div>
      </div>
      ${stepResults.map(r => `
        <div class="comp-row">
          <div class="comp-row__stage">${r.name}</div>
          <div class="comp-row__opt">${fmt$(r.monthly)}</div>
          <div class="comp-row__opt">−${Math.round(r.savedFromBase * 100)}%</div>
        </div>`).join('')}
    </div>`;
  compDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setStage('compare', 'done');

  // Recommend
  setStage('recommend', 'active');
  addContext(STAGE_CTX.recommend.title, STAGE_CTX.recommend.text, STAGE_CTX.recommend.isAI);
  await wait(1500);

  const totalSavedFrac = (baseMonthly - finalMonthly) / baseMonthly;
  const annualSavings = (baseMonthly - finalMonthly) * 12;

  const savingsDiv = document.getElementById('savings-card');
  savingsDiv.style.display = 'block';
  savingsDiv.innerHTML = `
    <div class="savings-card">
      <div class="savings-card__head">
        <div>
          <p class="tool-sidebar-card__label">Total Cost Reduction</p>
          <div class="savings-big">${Math.round(totalSavedFrac * 100)}%</div>
        </div>
        <div style="text-align: right">
          <p class="tool-sidebar-card__label">Annual Savings</p>
          <div class="savings-annual">${fmt$(annualSavings)}</div>
        </div>
      </div>
      <div class="savings-card__compare">
        <div class="savings-card__cell savings-card__cell--before">
          <p class="savings-card__cell-label">Current setup</p>
          <p class="savings-card__cell-value">${fmt$(baseMonthly)}<span class="savings-card__cell-per">/month</span></p>
        </div>
        <div class="savings-card__cell savings-card__cell--after">
          <p class="savings-card__cell-label">Optimised</p>
          <p class="savings-card__cell-value">${fmt$(finalMonthly)}<span class="savings-card__cell-per">/month</span></p>
        </div>
      </div>
      <p class="savings-card__summary">Same output quality. Same user experience. <strong>${Math.round(totalSavedFrac * 100)}% lower running cost</strong> — achieved through architectural decisions that any well-designed AI system should include from day one.</p>
      <p class="savings-card__disclaimer">This is a simplified model using a single scenario. Real-world savings vary based on query distribution, model choices, document characteristics, and existing infrastructure. An architecture review produces accurate projections for your specific situation.</p>
    </div>`;
  savingsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  setStage('recommend', 'done');
  finishContext();
  running = false;
  phase = 2;
}

export function mountCostSim() {
  const btnsEl = document.getElementById('sample-btns');
  if (btnsEl) {
    Object.entries(SCENARIOS).forEach(([key, s]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tool-sample-btn';
      btn.innerHTML = `<span class="tool-sample-btn__label">${s.label}</span><span class="tool-sample-btn__sub">${s.sub}</span>`;
      btn.addEventListener('click', () => {
        if (running) return;
        btnsEl.querySelectorAll('.tool-sample-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentScenario = key;
        const slider = document.getElementById('vol-slider');
        slider.value = s.defaultVol;
        document.getElementById('vol-display').textContent = s.defaultVol.toLocaleString();
        document.getElementById('vol-unit').textContent = s.unit;

        document.getElementById('slider-section').style.display = 'block';
        document.getElementById('run-baseline-btn').disabled = false;
        document.getElementById('run-opt-btn').disabled = false;
        phase = 0;

        // Reset downstream output
        document.getElementById('pipeline').style.display = 'none';
        document.getElementById('context-panel').style.display = 'none';
        document.getElementById('context-log').innerHTML = '';
        document.getElementById('sim-output').style.display = 'none';
        resetPipeline();
      });
      btnsEl.appendChild(btn);
    });
  }

  document.getElementById('vol-slider')?.addEventListener('input', function () {
    const val = parseInt(this.value, 10);
    document.getElementById('vol-display').textContent = val.toLocaleString();
  });

  document.getElementById('run-baseline-btn')?.addEventListener('click', runBaseline);
  document.getElementById('run-opt-btn')?.addEventListener('click', runOptimize);
}
