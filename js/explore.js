// explore.js — Configurator compute logic + rendering
import { NODES, BADGE, PRIORITY, AI_ONLY_TOGGLES, INTEREST_MAP, NODE_META, BASE, PRESETS } from './explore-data.js';
import { DESC, SUMMARY, TOGGLE_DESC, TOGGLE_WARN, DRILLDOWN, TIMELINE } from './explore-copy.js';

const state = {
  challenge: null,
  maturity: null,
  success: null,
  toggles: { skipData: false, noGuardrails: false, singleAgent: false, noMonitoring: false, noCaching: false, skipTesting: false },
  activeNode: null,
};

let bookingApi = null;  // set by mountExplore — booking.js returns { setInterest }

function promoteLevel(l) {
  const order = ['default', 'future', 'secondary', 'active', 'critical'];
  const i = order.indexOf(l);
  return i < order.length - 1 ? order[i + 1] : l;
}

function computeLevels() {
  if (!state.challenge) return Object.fromEntries(NODES.map(n => [n, 'default']));
  let lv = { ...BASE[state.challenge] };

  if (state.maturity === 'scattered') {
    if (lv.sources   !== 'critical') lv.sources   = promoteLevel(lv.sources);
    if (lv.ingestion !== 'critical') lv.ingestion = promoteLevel(lv.ingestion);
  } else if (state.maturity === 'clean') {
    if (lv.sources   === 'active') lv.sources   = 'secondary';
    if (lv.ingestion === 'active') lv.ingestion = 'secondary';
  }

  if (state.success === 'save-time') {
    if (lv.output !== 'critical') lv.output = promoteLevel(lv.output);
  } else if (state.success === 'reliable-production') {
    if (lv.ai !== 'critical' && lv.ai !== 'future') lv.ai = promoteLevel(lv.ai);
  } else if (state.success === 'insights') {
    if (lv.warehouse !== 'critical') lv.warehouse = promoteLevel(lv.warehouse);
    if (lv.output    !== 'critical') lv.output    = promoteLevel(lv.output);
  }

  if (state.toggles.skipData) {
    lv.sources = 'warning'; lv.ingestion = 'warning'; lv.warehouse = 'warning';
    if (lv.ai     !== 'future') lv.ai     = 'at-risk';
    if (lv.output !== 'future') lv.output = 'at-risk';
  }
  if (state.toggles.noGuardrails && lv.ai !== 'future' && lv.ai !== 'warning') lv.ai = 'warning';
  if (state.toggles.noMonitoring) {
    if (lv.ingestion !== 'future' && lv.ingestion !== 'warning') lv.ingestion = 'at-risk';
    if (lv.warehouse !== 'future' && lv.warehouse !== 'warning') lv.warehouse = 'at-risk';
    if (lv.output    !== 'future' && lv.output    !== 'warning') lv.output    = 'at-risk';
  }
  if (state.toggles.noCaching) {
    if (lv.ai     !== 'future' && lv.ai     !== 'warning') lv.ai     = 'at-risk';
    if (lv.output !== 'future' && lv.output !== 'warning') lv.output = 'at-risk';
  }
  if (state.toggles.skipTesting) {
    if (lv.ingestion !== 'future' && lv.ingestion !== 'warning') lv.ingestion = 'at-risk';
    if (lv.warehouse !== 'future' && lv.warehouse !== 'warning') lv.warehouse = 'at-risk';
    if (lv.ai        !== 'future' && lv.ai        !== 'warning') lv.ai        = 'at-risk';
  }

  return lv;
}

function getDescriptions() {
  return Object.fromEntries(NODES.map(id => {
    let d = (DESC[id] && DESC[id][state.challenge]) || '';
    Object.keys(state.toggles).forEach(t => {
      if (state.toggles[t] && TOGGLE_DESC[t] && TOGGLE_DESC[t][id]) d = TOGGLE_DESC[t][id];
    });
    return [id, d];
  }));
}

function connLevel(a, b) {
  const min = Math.min(PRIORITY[a] ?? 0, PRIORITY[b] ?? 0);
  return Object.keys(PRIORITY).find(k => PRIORITY[k] === min) || 'default';
}

function buildPipeline() {
  const wrap = document.getElementById('pipeline');
  if (!wrap) return;
  const RARR = `<svg class="arr-right" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>`;
  const DARR = `<svg class="arr-down" width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`;
  let html = '';
  NODES.forEach((id, i) => {
    const m = NODE_META[id];
    html += `<div id="node-${id}" class="pipeline-node level-default" title="Click for details">
      <div class="node-icon">${m.icon}</div>
      <span class="node-badge badge-default">—</span>
      <h3 class="node-title">${m.label}</h3>
      <p class="node-examples">${m.examples}</p>
      <p class="node-desc"></p>
    </div>`;
    if (i < NODES.length - 1) {
      html += `<div class="pipe-connector conn-default" id="conn-${i}">${RARR}${DARR}</div>`;
    }
  });
  wrap.innerHTML = html;
}

function renderDrilldown(nodeId) {
  const panel = document.getElementById('node-drilldown');
  if (!panel) return;
  if (!nodeId || !state.challenge) { panel.style.display = 'none'; return; }
  const d = DRILLDOWN[nodeId];
  const m = NODE_META[nodeId];
  panel.innerHTML = `
    <div class="dd-head">
      <span class="dd-title">${m.label} — details</span>
      <button id="dd-close" class="dd-close">✕ close</button>
    </div>
    <div class="dd-row">
      <div class="dd-col"><p class="dd-label">Tech stack</p><p class="dd-text">${d.stack}</p></div>
      <div class="dd-col"><p class="dd-label">What breaks</p><p class="dd-text">${d.breaks}</p></div>
      <div class="dd-col"><p class="dd-label">Mouliqe handles</p><p class="dd-text">${d.mouliqe}</p></div>
      <div class="dd-col"><p class="dd-label">Client provides</p><p class="dd-text">${d.client}</p></div>
    </div>`;
  panel.style.display = 'block';
  document.getElementById('dd-close').addEventListener('click', e => {
    e.stopPropagation();
    state.activeNode = null;
    panel.style.display = 'none';
    document.querySelectorAll('.pipeline-node').forEach(n => n.classList.remove('node-active-dd'));
  });
}

function renderTimeline() {
  const block = document.getElementById('timeline-block');
  const disc  = document.getElementById('estimate-disclaimer');
  if (!block) return;
  if (!state.challenge || !state.maturity) { block.style.display = 'none'; if (disc) disc.style.display = 'none'; return; }
  const key = state.challenge + '-' + state.maturity;
  const t = TIMELINE[key];
  if (!t) { block.style.display = 'none'; if (disc) disc.style.display = 'none'; return; }

  const costClass = { Medium: 'cost-medium', High: 'cost-high', Complex: 'cost-complex' }[t.cost] || 'cost-medium';
  const phasesHtml = t.phases.map((p, i) =>
    `<div class="phase-item"><span class="phase-dot"></span><span>${p} <span class="text-fg-faint">(${t.weeks[i]})</span></span></div>`
  ).join('');

  block.innerHTML = `
    <div class="row row--wrap" style="justify-content: space-between; margin-bottom: var(--space-3)">
      <div class="row" style="gap: var(--space-3)">
        <span class="eyebrow--small" style="margin: 0">Timeline estimate</span>
        <span class="text-fg-strong" style="font-size: var(--fs-sm); font-weight: var(--fw-bold)">${t.total}</span>
      </div>
      <div class="row row--wrap" style="gap: var(--space-2)">
        <span class="cost-badge ${costClass}">${t.cost}</span>
        <span class="text-fg-subtle" style="font-size: var(--fs-xs)">${t.costReason}</span>
      </div>
    </div>
    ${phasesHtml}`;
  block.style.display = 'block';
  if (disc) disc.style.display = 'block';
}

function renderDiagram() {
  const lv = computeLevels();
  const desc = getDescriptions();

  NODES.forEach(id => {
    const node = document.getElementById('node-' + id);
    if (!node) return;
    node.className = 'pipeline-node level-' + lv[id] + (state.activeNode === id ? ' node-active-dd' : '');
    const badge = node.querySelector('.node-badge');
    badge.className = 'node-badge badge-' + lv[id];
    badge.textContent = BADGE[lv[id]] || '—';
    node.querySelector('.node-desc').textContent = desc[id] || '';
  });

  const pairs = [['sources','ingestion'],['ingestion','warehouse'],['warehouse','ai'],['ai','output']];
  pairs.forEach(([a, b], i) => {
    const c = document.getElementById('conn-' + i);
    if (c) c.className = 'pipe-connector conn-' + connLevel(lv[a], lv[b]);
  });

  const key = state.challenge + '-' + state.maturity;
  const sumEl = document.getElementById('arch-summary');
  if (state.challenge && state.maturity && SUMMARY[key]) {
    sumEl.innerHTML = `<span class="arch-summary__label">Recommended starting point</span><br><span style="display: block; margin-top: var(--space-2)">${SUMMARY[key]}</span>`;
    sumEl.style.display = 'block';
  }

  const aiIsFuture = lv.ai === 'future';
  AI_ONLY_TOGGLES.forEach(t => {
    const row = document.getElementById('tr-' + t);
    if (!row) return;
    if (aiIsFuture) {
      row.classList.add('t-disabled');
      const inp = row.querySelector('.toggle-input');
      if (inp && inp.checked) { inp.checked = false; state.toggles[t] = false; row.classList.remove('toggled'); }
    } else {
      row.classList.remove('t-disabled');
    }
  });

  const warns = Object.entries(state.toggles).filter(([, v]) => v).map(([k]) => TOGGLE_WARN[k]).filter(Boolean);
  const warnEl = document.getElementById('toggle-warning');
  if (warnEl) {
    if (warns.length) {
      warnEl.innerHTML = warns.map(w => '⚠ ' + w).join('<br><br>');
      warnEl.style.display = 'block';
    } else {
      warnEl.style.display = 'none';
    }
  }

  renderTimeline();
  renderDrilldown(state.activeNode);
  if (state.challenge && bookingApi) bookingApi.setInterest(INTEREST_MAP[state.challenge] || '');
}

function selectAnswer(q, v, tile) {
  state[q] = v;
  tile.closest('.q-tiles, .q-tiles--3').querySelectorAll('.q-tile').forEach(t => t.classList.remove('selected'));
  tile.classList.add('selected');

  if (q === 'challenge') {
    document.getElementById('q2-reveal').classList.add('visible');
    state.maturity = null; state.success = null;
    document.querySelectorAll('[data-q="maturity"], [data-q="success"]').forEach(t => t.classList.remove('selected'));
    document.getElementById('q3-reveal').classList.remove('visible');
    const arch = document.getElementById('architecture');
    arch.classList.remove('visible');
    setTimeout(() => { if (!arch.classList.contains('visible')) arch.style.display = 'none'; }, 500);
  } else if (q === 'maturity') {
    document.getElementById('q3-reveal').classList.add('visible');
    state.success = null;
    document.querySelectorAll('[data-q="success"]').forEach(t => t.classList.remove('selected'));
    if (document.getElementById('architecture').classList.contains('visible')) renderDiagram();
  } else if (q === 'success') {
    const arch = document.getElementById('architecture');
    arch.style.display = 'block';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      arch.classList.add('visible');
      document.getElementById('explore-actions').classList.add('visible');
    }));
    renderDiagram();
  }

  if (state.challenge && state.maturity && state.success) { renderDiagram(); updateURL(); }
}

function applyPreset(p) {
  state.challenge = p.c; state.maturity = p.m; state.success = p.s;
  state.toggles = { skipData: false, noGuardrails: false, singleAgent: false, noMonitoring: false, noCaching: false, skipTesting: false };
  state.activeNode = null;

  document.querySelectorAll('.q-tile').forEach(t => {
    const match = (t.dataset.q === 'challenge' && t.dataset.v === p.c) ||
                  (t.dataset.q === 'maturity'  && t.dataset.v === p.m) ||
                  (t.dataset.q === 'success'   && t.dataset.v === p.s);
    t.classList.toggle('selected', match);
  });
  document.querySelectorAll('.toggle-input').forEach(i => { i.checked = false; });
  document.querySelectorAll('.toggle-row').forEach(r => r.classList.remove('toggled', 't-disabled'));

  document.getElementById('q2-reveal').classList.add('visible');
  document.getElementById('q3-reveal').classList.add('visible');
  const panel = document.getElementById('node-drilldown');
  if (panel) panel.style.display = 'none';
  document.querySelectorAll('.pipeline-node').forEach(n => n.classList.remove('node-active-dd'));

  const arch = document.getElementById('architecture');
  arch.style.display = 'block';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    arch.classList.add('visible');
    document.getElementById('explore-actions').classList.add('visible');
  }));
  renderDiagram();
  updateURL();
  setTimeout(() => arch.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

function resetAll() {
  state.challenge = null; state.maturity = null; state.success = null;
  state.toggles = { skipData: false, noGuardrails: false, singleAgent: false, noMonitoring: false, noCaching: false, skipTesting: false };
  state.activeNode = null;

  document.querySelectorAll('.q-tile').forEach(t => t.classList.remove('selected'));
  document.querySelectorAll('.toggle-input').forEach(i => { i.checked = false; });
  document.querySelectorAll('.toggle-row').forEach(r => r.classList.remove('toggled', 't-disabled'));

  document.getElementById('q2-reveal').classList.remove('visible');
  document.getElementById('q3-reveal').classList.remove('visible');

  const arch = document.getElementById('architecture');
  arch.classList.remove('visible');
  document.getElementById('explore-actions').classList.remove('visible');
  setTimeout(() => { arch.style.display = 'none'; }, 500);

  ['toggle-warning', 'arch-summary', 'timeline-block', 'estimate-disclaimer', 'node-drilldown'].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display = 'none';
  });

  NODES.forEach(id => {
    const n = document.getElementById('node-' + id); if (!n) return;
    n.className = 'pipeline-node level-default';
    n.querySelector('.node-badge').className = 'node-badge badge-default';
    n.querySelector('.node-badge').textContent = '—';
    n.querySelector('.node-desc').textContent = '';
  });
  for (let i = 0; i < 4; i++) {
    const c = document.getElementById('conn-' + i); if (c) c.className = 'pipe-connector conn-default';
  }

  history.replaceState(null, '', window.location.pathname);
  document.getElementById('questions-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateURL() {
  if (!state.challenge) return;
  const params = new URLSearchParams();
  params.set('c', state.challenge);
  if (state.maturity) params.set('m', state.maturity);
  if (state.success)  params.set('s', state.success);
  const t = Object.entries(state.toggles).filter(([, v]) => v).map(([k]) => k).join(',');
  if (t) params.set('t', t);
  history.replaceState(null, '', '?' + params.toString());
}

function restoreFromURL() {
  const params = new URLSearchParams(window.location.search);
  const c = params.get('c'), m = params.get('m'), s = params.get('s'), t = params.get('t');
  if (!c) return;

  const validC = Object.keys(BASE);
  const validM = ['scattered', 'siloed', 'clean'];
  const validS = ['save-time', 'reliable-production', 'insights'];
  if (!validC.includes(c)) return;

  state.challenge = c;
  document.querySelector(`.q-tile[data-q="challenge"][data-v="${c}"]`)?.classList.add('selected');
  document.getElementById('q2-reveal').classList.add('visible');

  if (m && validM.includes(m)) {
    state.maturity = m;
    document.querySelector(`.q-tile[data-q="maturity"][data-v="${m}"]`)?.classList.add('selected');
    document.getElementById('q3-reveal').classList.add('visible');
  }
  if (s && validS.includes(s)) {
    state.success = s;
    document.querySelector(`.q-tile[data-q="success"][data-v="${s}"]`)?.classList.add('selected');
  }
  if (t) {
    t.split(',').forEach(key => {
      if (Object.prototype.hasOwnProperty.call(state.toggles, key)) {
        state.toggles[key] = true;
        const inp = document.querySelector(`.toggle-input[data-toggle="${key}"]`);
        if (inp) { inp.checked = true; inp.closest('.toggle-row').classList.add('toggled'); }
      }
    });
  }

  if (state.challenge && state.maturity && state.success) {
    const arch = document.getElementById('architecture');
    arch.style.display = 'block';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      arch.classList.add('visible');
      document.getElementById('explore-actions').classList.add('visible');
    }));
    renderDiagram();
  }
}

function initCopyLink() {
  const btn = document.getElementById('copy-link-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    updateURL();
    const url = window.location.href;
    const reset = () => setTimeout(() => { btn.textContent = 'Copy link'; }, 2000);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => { btn.textContent = 'Copied!'; reset(); });
    } else {
      btn.textContent = 'Copied!'; reset();
    }
  });
}

function buildPresets() {
  const row = document.getElementById('preset-row');
  if (!row) return;
  row.innerHTML = PRESETS.map((p, i) => `<button class="preset-pill" data-idx="${i}">${p.label}</button>`).join('');
  row.querySelectorAll('.preset-pill').forEach(btn => {
    btn.addEventListener('click', () => applyPreset(PRESETS[+btn.dataset.idx]));
  });
}

export function mountExplore(bookingHandle) {
  bookingApi = bookingHandle || null;
  buildPipeline();
  buildPresets();

  document.querySelectorAll('.q-tile').forEach(tile => {
    tile.addEventListener('click', () => selectAnswer(tile.dataset.q, tile.dataset.v, tile));
  });

  document.querySelectorAll('.toggle-input').forEach(inp => {
    inp.addEventListener('change', () => {
      state.toggles[inp.dataset.toggle] = inp.checked;
      inp.closest('.toggle-row').classList.toggle('toggled', inp.checked);
      renderDiagram();
      updateURL();
    });
  });

  document.getElementById('reset-btn')?.addEventListener('click', resetAll);

  document.getElementById('pipeline')?.addEventListener('click', e => {
    const node = e.target.closest('[id^="node-"]');
    if (!node || !state.challenge) return;
    const nodeId = node.id.replace('node-', '');
    if (state.activeNode === nodeId) {
      state.activeNode = null;
      document.getElementById('node-drilldown').style.display = 'none';
      document.querySelectorAll('.pipeline-node').forEach(n => n.classList.remove('node-active-dd'));
    } else {
      state.activeNode = nodeId;
      document.querySelectorAll('.pipeline-node').forEach(n => n.classList.remove('node-active-dd'));
      node.classList.add('node-active-dd');
      renderDrilldown(nodeId);
    }
  });

  initCopyLink();
  restoreFromURL();
}
