// tool-page.js — shared helpers for tool demo pages
// Pipeline stage control, context log entries, dynamic result card injection.

/** Advance pipeline stages. Pass state: 'active' | 'done'. */
export function setStage(name, state) {
  const stages = document.querySelectorAll('.tool-stage');
  const connectors = document.querySelectorAll('.tool-stage__connector');
  let idx = -1;
  stages.forEach((s, i) => {
    if (s.dataset.stage === name) {
      s.className = `tool-stage ${state}`;
      if (s.hasAttribute('data-ai')) s.setAttribute('data-ai', '');
      idx = i;
    }
  });
  if (state === 'active' && idx > 0) {
    const connector = connectors[idx - 1];
    const isAI = stages[idx].hasAttribute('data-ai');
    connector.className = 'tool-stage__connector ' + (isAI ? 'active-ai' : 'active');
  }
  if (state === 'done' && idx > 0) {
    connectors[idx - 1].className = 'tool-stage__connector done';
  }
}

/** Reset all pipeline stages to pending. */
export function resetPipeline() {
  document.querySelectorAll('.tool-stage').forEach(s => {
    // keep data-ai attribute, reset class
    const isAI = s.hasAttribute('data-ai');
    s.className = 'tool-stage pending';
    if (isAI) s.setAttribute('data-ai', '');
  });
  document.querySelectorAll('.tool-stage__connector').forEach(c => {
    c.className = 'tool-stage__connector';
  });
}

/** Add a context log entry. If isAI=true, styles the dot/title in purple. */
export function addContext(title, text, isAI = false) {
  const log = document.getElementById('context-log');
  const panel = document.getElementById('context-panel');
  if (!log || !panel) return;

  // Mark previous entry as done
  const prev = log.querySelector('.tool-context__entry:not(.done)');
  if (prev) prev.classList.add('done');

  const entry = document.createElement('div');
  entry.className = 'tool-context__entry' + (isAI ? ' tool-context__entry--ai' : '');
  entry.innerHTML = `
    <div class="tool-context__dot"></div>
    <div class="tool-context__body">
      <p class="tool-context__title">${title}</p>
      <p class="tool-context__text">${text}</p>
    </div>`;
  log.appendChild(entry);
  panel.scrollTop = panel.scrollHeight;
}

/** Mark all context entries as complete (called at pipeline end). */
export function finishContext() {
  const log = document.getElementById('context-log');
  const panel = document.getElementById('context-panel');
  if (!log || !panel) return;
  log.querySelectorAll('.tool-context__entry').forEach(e => e.classList.add('done'));
  panel.classList.remove('pulsing');
}

/** Clear the context log and show the panel in pulsing state. */
export function startContext() {
  const log = document.getElementById('context-log');
  const panel = document.getElementById('context-panel');
  if (!log || !panel) return;
  log.innerHTML = '';
  panel.style.display = 'block';
  panel.classList.add('pulsing');
}

/** Append raw HTML into #sim-output. */
export function addCard(html) {
  const out = document.getElementById('sim-output');
  if (!out) return;
  out.style.display = 'block';
  out.insertAdjacentHTML('beforeend', html);
}

/** Clear #sim-output. */
export function clearOutput() {
  const out = document.getElementById('sim-output');
  if (out) out.innerHTML = '';
}

/** Promise-based delay. */
export const wait = (ms) => new Promise(r => setTimeout(r, ms));

/** Read a CSS custom property from :root as a resolved value (for Chart.js etc). */
export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
