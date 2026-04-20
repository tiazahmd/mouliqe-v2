// tools/agent-workflow.js — multi-agent pattern simulator engine
import { setStage, resetPipeline, startContext, addContext, finishContext, addCard, clearOutput, wait } from '/js/tool-page.js';
import { PRESETS, STAGE_CONTEXT } from './agent-workflow-data.js';

let running = false;

// ── Helpers ──
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

function node(label, agent, id) {
  const pills = (agent.tools || []).map(t => `<span class="agent-tool-pill">${esc(t)}</span>`).join('');
  const div = document.createElement('div');
  div.className = 'agent-node';
  div.id = `agent-${id}`;
  div.innerHTML = `
    <span class="agent-node__check">&#10003;</span>
    <span class="agent-node__skip">—</span>
    <p class="agent-node__tag">${esc(label)}</p>
    <p class="agent-node__role">${esc(agent.role)}</p>
    <p class="agent-node__desc">${esc(agent.desc)}</p>
    ${pills ? `<div class="agent-tools">${pills}</div>` : ''}
    ${agent.tools ? `<div class="agent-log" id="agent-log-${id}"></div>` : ''}
  `;
  return div;
}

function flowArrow(id) {
  const div = document.createElement('div');
  div.className = 'flow-arrow';
  if (id) div.id = id;
  div.innerHTML = '<svg width="20" height="24" viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 0v18M4 14l6 6 6-6"/></svg>';
  return div;
}

function phaseLabel(text, color = 'blue') {
  const p = document.createElement('p');
  p.className = 'agent-phase-label';
  if (color !== 'blue') p.style.color = `var(--color-${color})`;
  p.textContent = text;
  return p;
}

async function animateLogs(id, logs) {
  const el = document.getElementById(`agent-log-${id}`);
  if (!el) return;
  for (const log of logs) {
    const line = document.createElement('div');
    line.className = 'agent-log__line';
    line.innerHTML = log.dir === 'out'
      ? `<span class="arrow-out">&#8594;</span>${esc(log.text)}`
      : `<span class="arrow-in">&#8592;</span>${esc(log.text)}`;
    el.appendChild(line);
    line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    await wait(400 + Math.random() * 300);
  }
}

function addResult(id, text) {
  const el = document.getElementById(`agent-log-${id}`);
  if (!el || !text) return;
  const r = document.createElement('div');
  r.className = 'agent-log__result';
  r.textContent = text;
  el.appendChild(r);
}

// ── Pattern runners ──
async function runFanOut(graph, data) {
  const planner = node('Planner', { role: 'Planner Agent', desc: data.planner, tools: [] }, 'planner');
  planner.classList.add('executing');
  graph.appendChild(planner);
  await wait(1200);

  const a1 = flowArrow(); a1.classList.add('active'); graph.appendChild(a1);

  const grid = document.createElement('div');
  grid.className = `agent-grid agent-grid--${Math.min(data.workers.length, 3)}`;
  data.workers.forEach((w, i) => grid.appendChild(node(`Worker ${i + 1}`, w, i)));
  graph.appendChild(grid);

  planner.classList.replace('executing', 'complete');
  a1.classList.replace('active', 'done');
  await wait(500);

  setStage('execute', 'active');
  for (let i = 0; i < data.workers.length; i++) {
    const el = document.getElementById(`agent-${i}`);
    el.classList.add('executing');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    await animateLogs(i, data.workers[i].logs);
    await wait(300);
    addResult(i, data.workers[i].result);
    el.classList.remove('executing');
    el.classList.add('complete');
    await wait(400);
  }
  setStage('execute', 'done');

  setStage('synthesize', 'active');
  const a2 = flowArrow(); a2.classList.add('active'); graph.appendChild(a2);

  const synth = node('Synthesizer', { role: 'Synthesizer Agent', desc: 'Collecting and merging outputs from all worker agents into a unified result.', tools: [] }, 'synth');
  synth.classList.add('executing');
  graph.appendChild(synth);
  const summary = document.createElement('div');
  summary.className = 'synth-summary';
  synth.appendChild(summary);
  await wait(1000);

  data.workers.forEach((w, i) => {
    const row = document.createElement('div');
    row.className = 'synth-summary__row';
    row.style.animationDelay = `${i * 0.15}s`;
    row.innerHTML = `<span class="synth-summary__check">&#10003;</span><span><strong>${esc(w.role)}:</strong> ${esc(w.result)}</span>`;
    summary.appendChild(row);
  });
  await wait(1200);
  synth.querySelector('.agent-node__desc').textContent = data.synthesis;
  synth.classList.replace('executing', 'complete');
  a2.classList.replace('active', 'done');
}

async function runRouter(graph, data) {
  const router = node('Router Agent', data.routerAgent, 'router');
  router.classList.add('executing');
  graph.appendChild(router);

  await animateLogs('router', data.routerAgent.logs);
  await wait(400);

  const decision = document.createElement('div');
  decision.className = 'router-decision';
  decision.innerHTML = `<span>&#8594;</span><span>${esc(data.routerAgent.decision)}</span>`;
  document.getElementById('agent-log-router').appendChild(decision);

  router.classList.replace('executing', 'complete');
  await wait(500);

  const a = flowArrow(); a.classList.add('active'); graph.appendChild(a);

  const grid = document.createElement('div');
  grid.className = `agent-grid agent-grid--${Math.min(data.specialists.length, 3)}`;
  data.specialists.forEach((s, i) => {
    const n = node(`Specialist ${i + 1}`, s, i);
    if (i !== data.activeSpecialist) n.classList.add('dimmed');
    grid.appendChild(n);
  });
  graph.appendChild(grid);
  a.classList.replace('active', 'done');
  await wait(600);

  setStage('execute', 'active');
  const idx = data.activeSpecialist;
  const el = document.getElementById(`agent-${idx}`);
  el.classList.add('executing');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  await animateLogs(idx, data.specialists[idx].logs);
  await wait(300);
  addResult(idx, data.specialists[idx].result);
  el.classList.replace('executing', 'complete');
  setStage('execute', 'done');

  setStage('synthesize', 'active');
  await wait(1000);
}

async function runMapReduce(graph, data) {
  graph.appendChild(phaseLabel('Map Phase — Parallel Data Collection'));

  const grid = document.createElement('div');
  grid.className = `agent-grid agent-grid--${Math.min(data.mappers.length, 3)}`;
  data.mappers.forEach((m, i) => grid.appendChild(node(`Mapper ${i + 1}`, m, i)));
  graph.appendChild(grid);
  await wait(500);

  setStage('execute', 'active');
  for (let i = 0; i < data.mappers.length; i++) {
    const el = document.getElementById(`agent-${i}`);
    el.classList.add('executing');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    await animateLogs(i, data.mappers[i].logs);
    await wait(200);
    addResult(i, data.mappers[i].result);
    el.classList.replace('executing', 'complete');
    await wait(300);
  }
  setStage('execute', 'done');

  setStage('synthesize', 'active');
  const a = flowArrow(); a.classList.add('active'); graph.appendChild(a);
  graph.appendChild(phaseLabel('Reduce Phase — Aggregate & Analyze'));

  const reducer = node('Reducer', data.reducer, 'reducer');
  reducer.classList.add('executing');
  graph.appendChild(reducer);
  reducer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  await animateLogs('reducer', data.reducer.logs);
  await wait(300);
  addResult('reducer', data.reducer.result);
  reducer.classList.replace('executing', 'complete');
  a.classList.replace('active', 'done');
}

async function runChain(graph, data) {
  setStage('execute', 'active');

  for (let i = 0; i < data.chainAgents.length; i++) {
    const agent = data.chainAgents[i];
    const n = node(`Step ${i + 1} of ${data.chainAgents.length}`, agent, i);
    graph.appendChild(n);

    n.classList.add('executing');
    n.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    await animateLogs(i, agent.logs);
    await wait(300);
    addResult(i, agent.result);
    n.classList.replace('executing', 'complete');

    if (agent.gate) {
      await wait(400);
      const gate = document.createElement('div');
      gate.className = 'checkpoint-gate';
      gate.innerHTML = `<div class="checkpoint-gate__line"></div><div class="checkpoint-gate__icon"><span class="checkpoint-gate__check">&#9744;</span>${esc(agent.gate.label)}</div><div class="checkpoint-gate__line"></div>`;
      graph.appendChild(gate);
      await wait(600);
      gate.classList.add('passed');
      gate.querySelector('.checkpoint-gate__icon').innerHTML = `<span class="checkpoint-gate__check">&#9745;</span>${esc(agent.gate.label)}`;

      const detail = document.createElement('p');
      detail.className = 'checkpoint-detail';
      detail.textContent = agent.gate.check;
      graph.appendChild(detail);
      await wait(400);
    }
  }
  setStage('execute', 'done');
  setStage('synthesize', 'active');
  await wait(1000);
}

async function runReAct(graph, data) {
  const agentNode = node('ReAct Agent', data.agent, 'react');
  // ReAct agent uses phase rows instead of agent-log
  agentNode.querySelector('.agent-log')?.remove();
  agentNode.classList.add('executing');
  graph.appendChild(agentNode);
  await wait(600);

  setStage('execute', 'active');

  for (let i = 0; i < data.iterations.length; i++) {
    const iter = data.iterations[i];
    const header = document.createElement('div');
    header.className = 'iteration-header';
    header.innerHTML = `<span class="iteration-header__num">Iteration ${i + 1}/${data.iterations.length}</span><span class="iteration-header__phase">${esc(iter.label)}</span>`;
    graph.appendChild(header);
    header.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const ICONS = { observe: '&#128065;', result: '&#8592;', think: '&#128161;', act: '&#9889;' };
    for (const ph of iter.phases) {
      const row = document.createElement('div');
      row.className = `iteration-phase iteration-phase--${ph.type}`;
      row.innerHTML = `<span class="iteration-phase__icon">${ICONS[ph.type]}</span><span class="iteration-phase__text">${esc(ph.text)}</span>`;
      graph.appendChild(row);
      row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      await wait(500 + Math.random() * 400);
    }

    if (i < data.iterations.length - 1) {
      const loop = document.createElement('div');
      loop.className = 'iteration-loop';
      loop.innerHTML = '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 0v12M3 9l4 4 4-4"/></svg><span class="iteration-loop__label">Next Cycle</span>';
      graph.appendChild(loop);
      await wait(300);
    }
  }
  agentNode.classList.replace('executing', 'complete');
  setStage('execute', 'done');
  setStage('synthesize', 'active');
  await wait(1000);
}

const RUNNERS = { 'fan-out': runFanOut, 'router': runRouter, 'map-reduce': runMapReduce, 'chain': runChain, 'react': runReAct };

// ── Main ──
async function runSimulation(presetKey) {
  if (running) return;
  running = true;
  const data = PRESETS[presetKey];

  // Reset
  resetPipeline();
  clearOutput();
  startContext();
  document.getElementById('pipeline').style.display = 'flex';
  const graph = document.getElementById('agent-graph');
  graph.innerHTML = '';

  // Stage 1: Analyze
  setStage('analyze', 'active');
  addContext(STAGE_CONTEXT.analyze.title, STAGE_CONTEXT.analyze.text, true);
  await wait(1600);

  addCard(`
    <div class="tool-result-card" style="margin-top: var(--space-3)">
      <div class="tool-result-header">
        <span class="tool-result-label">Task Analysis</span>
        <div style="display:flex;gap:var(--space-2);align-items:center">
          <span class="tool-score tool-score--medium">${esc(data.analysis.complexity)}</span>
          <span class="pattern-badge pattern-badge--${data.pattern.badge}">${esc(data.pattern.name)}</span>
        </div>
      </div>
      <p class="analysis-desc">${esc(data.pattern.desc)}</p>
      <div class="analysis-grid">
        <span class="analysis-grid__label">Capabilities</span><span class="analysis-grid__value">${esc(data.analysis.capabilities)}</span>
        <span class="analysis-grid__label">Agents</span><span class="analysis-grid__value">${esc(data.analysis.agentCount)}</span>
        <span class="analysis-grid__label">Reasoning</span><span class="analysis-grid__value">${esc(data.analysis.reasoning)}</span>
      </div>
    </div>`);
  setStage('analyze', 'done');

  // Stage 2: Plan
  setStage('plan', 'active');
  addContext(STAGE_CONTEXT.plan.title, STAGE_CONTEXT.plan.text, true);
  await wait(1400);
  setStage('plan', 'done');

  // Stages 3-4: pattern-specific execute + synthesize
  addContext(STAGE_CONTEXT.execute.title, STAGE_CONTEXT.execute.text);
  await RUNNERS[data.pattern.badge](graph, data);
  addContext(STAGE_CONTEXT.synthesize.title, data.synthesis, true);
  setStage('synthesize', 'done');

  // Stage 5: Deliver
  setStage('deliver', 'active');
  addContext(STAGE_CONTEXT.deliver.title, STAGE_CONTEXT.deliver.text);
  await wait(1000);

  const d = data.deliverable;
  const rows = d.items.map(i => `<div class="deliver-row"><span class="deliver-row__label">${esc(i.label)}</span><span class="deliver-row__value">${esc(i.value)}</span></div>`).join('');
  addCard(`
    <div class="tool-result-card tool-result-card--success" style="margin-top: var(--space-3)">
      <div class="tool-result-header">
        <span class="tool-result-label" style="color: var(--color-accent)">${esc(d.title)}</span>
        <span class="tool-score tool-score--high">Complete</span>
      </div>
      ${rows}
    </div>`);
  setStage('deliver', 'done');
  finishContext();
  running = false;
}

export function mountAgentWorkflow() {
  const row = document.getElementById('preset-btns');
  if (!row) return;
  Object.entries(PRESETS).forEach(([key, p]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'agent-preset-btn';
    btn.innerHTML = `<span class="agent-preset-btn__label">${esc(p.label)}</span><span class="agent-preset-btn__sub">${esc(p.sub)}</span>`;
    btn.addEventListener('click', () => {
      if (running) return;
      row.querySelectorAll('.agent-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      runSimulation(key);
    });
    row.appendChild(btn);
  });
}
