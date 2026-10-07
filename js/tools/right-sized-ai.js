// tools/right-sized-ai.js — engine for the right-sized AI demo
import { setStage, resetPipeline, startContext, addContext, finishContext, addCard, clearOutput, wait } from '/js/tool-page.js';
import { SAMPLES, STAGE_CTX, PRICE } from '/js/tools/right-sized-ai-data.js';
import {
  toolCost, routeTools, routeSummary, answerConfidence, requestConfidence,
  volumeFromSlider, sliderFromVolume, fmtMoney, fmtCount, fmtMs,
} from '/js/tools/right-sized-ai-calc.js';

const DEFAULT_THRESHOLD = 0.8;
const TOOL_ORDER = ['rules', 'small', 'jev', 'chatbot'];
const TOOL_NAMES = { rules: 'Rules', small: 'Small model', jev: 'Jev', chatbot: 'Big chatbot' };
const LEAVES_BUILDING = { rules: false, small: false, jev: true, chatbot: true };
const TYPE_LABEL = { choice: 'Pick one', score: 'Scale', noul: 'Yes or no' };

let running = false;

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderJSON(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  if (obj === null) return '<span class="json-num">null</span>';
  if (typeof obj === 'number')  return `<span class="json-num">${obj}</span>`;
  if (typeof obj === 'string')  return `<span class="json-str">"${escapeHtml(obj)}"</span>`;
  if (typeof obj === 'boolean') return `<span class="json-num">${obj}</span>`;
  if (Array.isArray(obj)) {
    if (!obj.length) return '<span class="json-bracket">[]</span>';
    return `<span class="json-bracket">[</span>\n${obj.map(v => pad + '  ' + renderJSON(v, indent + 1)).join(',\n')}\n${pad}<span class="json-bracket">]</span>`;
  }
  const keys = Object.keys(obj);
  if (!keys.length) return '<span class="json-bracket">{}</span>';
  return `<span class="json-bracket">{</span>\n${keys.map(k => `${pad}  <span class="json-key">"${escapeHtml(k)}"</span>: ${renderJSON(obj[k], indent + 1)}`).join(',\n')}\n${pad}<span class="json-bracket">}</span>`;
}

/** The answer a tool gave to one question, in the same form as the sample's truth. */
function answerOf(s, tool, q) {
  if (tool === 'jev') {
    const a = s.jev.response.answers[q.id];
    if (a.type === 'choice') return a.choice;
    if (a.type === 'noul') return a.noul >= 0.5;
    const best = Object.entries(a.probabilities).reduce((m, e) => (e[1] > m[1] ? e : m));
    return a.legend[best[0]];
  }
  if (tool === 'chatbot') return s.chatbot.parsed[q.id];
  return s[tool].answers[q.id];
}

const showAnswer = (v) => (typeof v === 'boolean' ? (v ? 'Yes' : 'No') : v);

function markFor(s, q, v) {
  const truth = s.truth[q.id];
  if (truth === null) return '<span class="rs-mark rs-mark--unclear">No single answer</span>';
  return v === truth
    ? '<span class="rs-mark rs-mark--right">Right</span>'
    : '<span class="rs-mark rs-mark--wrong">Wrong</span>';
}

function confBadge(c) {
  const level = c >= 0.8 ? 'high' : c >= 0.65 ? 'med' : 'low';
  return `<span class="rs-conf rs-conf--${level}">${Math.round(c * 100)}% sure</span>`;
}

function rightCount(s, tool) {
  const scored = s.questions.filter((q) => s.truth[q.id] !== null);
  return { right: scored.filter((q) => answerOf(s, tool, q) === s.truth[q.id]).length, of: scored.length };
}

function answerRows(s, tool, withConf) {
  return s.questions.map((q) => {
    const v = answerOf(s, tool, q);
    const conf = withConf ? confBadge(answerConfidence(s, tool, q)) : '';
    return `<div class="rs-answer">
      <span class="rs-answer__q">${escapeHtml(q.label)}</span>
      <span class="rs-answer__a">${escapeHtml(showAnswer(v))}</span>
      <span class="rs-answer__meta">${conf}${markFor(s, q, v)}</span>
    </div>`;
  }).join('');
}

function costLabel(s, tool) {
  if (tool === 'rules') return '$0';
  if (tool === 'small') return 'no per-call fee';
  return `${fmtMoney(toolCost(s, tool, PRICE))} per call`;
}

function header(label, meta) {
  return `<div class="tool-result-header"><span class="tool-result-label">${label}</span><span class="tool-result-meta">${meta}</span></div>`;
}

function context(key) {
  const c = STAGE_CTX[key];
  addContext(c.title, c.text, c.isAI);
}

async function stageRead(s) {
  setStage('read', 'active');
  context('read');
  addCard(`<div class="tool-result-card">
    ${header('The Request', escapeHtml(s.channel))}
    <div class="rs-message" id="rs-message"></div>
    ${s.context ? `<p class="rs-context">${escapeHtml(s.context)}</p>` : ''}
    <p class="tool-section-label" style="margin-top: var(--space-4)">The small questions</p>
    <div class="rs-questions" id="rs-questions"></div>
  </div>`);
  const msgEl = document.getElementById('rs-message');
  for (const line of s.message.split('\n')) {
    const p = document.createElement('p');
    msgEl.appendChild(p);
    for (const word of line.split(' ')) {
      p.textContent += (p.textContent ? ' ' : '') + word;
      await wait(25);
    }
  }
  const qEl = document.getElementById('rs-questions');
  for (const q of s.questions) {
    qEl.insertAdjacentHTML('beforeend', `<span class="rs-q-chip"><span class="rs-q-chip__type">${TYPE_LABEL[q.type]}</span>${escapeHtml(q.label)}</span>`);
    await wait(200);
  }
  setStage('read', 'done');
  await wait(300);
}

async function stageRules(s) {
  setStage('rules', 'active');
  context('rules');
  await wait(500);
  const hits = s.rules.hits.map((h) =>
    `<p class="rs-hit">${h.keyword ? `<span class="rs-keyword">${escapeHtml(h.keyword)}</span>` : ''}${escapeHtml(h.rule)}</p>`).join('');
  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    ${header('Rules', `${fmtMs(s.rules.ms)} · ${costLabel(s, 'rules')}`)}
    <div class="rs-answers">${answerRows(s, 'rules', false)}</div>
    <div class="rs-hits">${hits}</div>
    <p class="rs-note">${escapeHtml(s.rules.note)}</p>
  </div>`);
  setStage('rules', 'done');
  await wait(300);
}

async function stageSmall(s) {
  setStage('small', 'active');
  context('small');
  await wait(900);
  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    ${header('Small model · about 3B parameters · your server', `${fmtMs(s.small.ms)} · ${costLabel(s, 'small')}`)}
    <div class="rs-answers">${answerRows(s, 'small', true)}</div>
    <p class="rs-note">${escapeHtml(s.small.note)}</p>
  </div>`);
  setStage('small', 'done');
  await wait(300);
}

async function stageJev(s) {
  setStage('jev', 'active');
  context('jev');
  await wait(700);
  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    ${header(`Jev · ${escapeHtml(s.jev.response.model)}`, `${fmtMs(s.jev.ms)} · ${costLabel(s, 'jev')}`)}
    <div class="rs-answers">${answerRows(s, 'jev', true)}</div>
    <details class="rs-json" open>
      <summary>The typed response your code receives</summary>
      <pre class="json-view">${renderJSON(s.jev.response)}</pre>
    </details>
    <p class="rs-note">${escapeHtml(s.jev.note)}</p>
  </div>`);
  setStage('jev', 'done');
  await wait(300);
}

async function stageChatbot(s) {
  setStage('chatbot', 'active');
  context('chatbot');
  await wait(600);
  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    ${header(escapeHtml(s.chatbot.model), `${fmtMs(s.chatbot.ms)} · ${costLabel(s, 'chatbot')}`)}
    <p class="rs-stream" id="rs-stream"></p>
    <div id="rs-parsed" style="display: none">
      <p class="rs-parse">Parsing the answer out of the paragraph…</p>
      <div class="rs-answers">${answerRows(s, 'chatbot', false)}</div>
      <p class="rs-note">${escapeHtml(s.chatbot.note)}</p>
    </div>
  </div>`);
  const streamEl = document.getElementById('rs-stream');
  const words = s.chatbot.text.split(' ');
  for (let i = 0; i < words.length; i++) {
    streamEl.textContent += (i ? ' ' : '') + words[i];
    await wait(30);
  }
  await wait(400);
  document.getElementById('rs-parsed').style.display = 'block';
  setStage('chatbot', 'done');
  await wait(300);
}

function renderRoute(s, volume, threshold) {
  const r = routeSummary(s, volume, threshold, PRICE);
  const conf = requestConfidence(s);
  document.getElementById('rs-vol-display').textContent = fmtCount(volume);
  document.getElementById('rs-thr-display').textContent = `${Math.round(threshold * 100)}%`;
  document.getElementById('rs-this').innerHTML = conf >= threshold
    ? `This request: <strong>handled automatically</strong>. The setup was ${Math.round(conf * 100)}% sure.`
    : `This request: <strong>sent to a person</strong>. The setup was only ${Math.round(conf * 100)}% sure.`;
  const ratio = r.rightSizedMonthly > 0 ? Math.round(r.chatbotMonthly / r.rightSizedMonthly) : null;
  document.getElementById('rs-stats').innerHTML = `
    <div class="tool-stat"><p class="tool-stat__value tool-stat__value--accent">${fmtCount(r.handled)}</p><p class="tool-stat__label">Handled automatically (${Math.round(r.autoShare * 100)}%)</p></div>
    <div class="tool-stat"><p class="tool-stat__value tool-stat__value--amber">${fmtCount(r.toPerson)}</p><p class="tool-stat__label">Sent to a person</p></div>
    <div class="tool-stat"><p class="tool-stat__value tool-stat__value--accent">${fmtMoney(r.rightSizedMonthly)}</p><p class="tool-stat__label">${r.rightSizedMonthly > 0 ? 'Right-sized, per month' : 'Right-sized, per month (you pay for the server)'}</p></div>
    <div class="tool-stat"><p class="tool-stat__value tool-stat__value--red">${fmtMoney(r.chatbotMonthly)}</p><p class="tool-stat__label">${ratio ? `All chatbot, per month (${fmtCount(ratio)}× more)` : 'All chatbot, per month'}</p></div>`;
}

async function stageRoute(s) {
  setStage('route', 'active');
  context('route');
  await wait(500);
  const used = routeTools(s);
  const rows = TOOL_ORDER.map((tool) => {
    const rc = rightCount(s, tool);
    const picked = used.includes(tool);
    return `<tr class="${picked ? 'rs-table__pick' : ''}">
      <td>${TOOL_NAMES[tool]}${picked ? ' <span class="rs-mark rs-mark--right">Used</span>' : ''}</td>
      <td>${rc.right} of ${rc.of}</td>
      <td>${fmtMs(s[tool].ms)}</td>
      <td>${costLabel(s, tool)}</td>
      <td>${LEAVES_BUILDING[tool] ? 'Yes' : 'No'}</td>
    </tr>`;
  }).join('');
  const unclear = Object.values(s.truth).includes(null);
  addCard(`<div class="tool-result-card tool-result-card--success" style="margin-top: var(--space-3)">
    ${header(escapeHtml(s.route.verdict.title), 'Recommended setup')}
    <p class="rs-verdict">${escapeHtml(s.route.verdict.text)}</p>
    <div class="rs-table-wrap"><table class="rs-table">
      <thead><tr><th>Tool</th><th>Right answers</th><th>Speed</th><th>Cost</th><th>Data leaves your building?</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    ${unclear ? '<p class="rs-note">One question here has no single right answer, so it is left out of the count.</p>' : ''}
  </div>
  <div class="card rs-controls" style="margin-top: var(--space-3)">
    <div class="vol-row">
      <p class="vol-row__label">Requests per month</p>
      <span class="vol-row__value"><span id="rs-vol-display"></span></span>
    </div>
    <input type="range" class="vol-slider" id="rs-vol" min="0" max="100" step="1" aria-label="Requests per month">
    <div class="vol-bounds"><span>1,000</span><span>1,000,000</span></div>
    <div class="vol-row" style="margin-top: var(--space-5)">
      <p class="vol-row__label">Send to a person below</p>
      <span class="vol-row__value"><span id="rs-thr-display"></span><span class="vol-row__unit">confidence</span></span>
    </div>
    <input type="range" class="vol-slider" id="rs-thr" min="50" max="95" step="5" aria-label="Confidence needed before a person checks the answer">
    <div class="vol-bounds"><span>50%</span><span>95%</span></div>
    <p class="rs-this" id="rs-this"></p>
    <div class="tool-stat-grid" id="rs-stats" style="margin-top: var(--space-4)"></div>
    <p class="pricing-note">Prices: Jev $0.042 per million input tokens with free output (TypeSafe's published rate, September 2026). Claude Sonnet 4.6 $3.00 per million input and $15.00 per million output tokens, the same rates as our Cost Simulator. Answers, speeds and the share sent to a person are illustrative.</p>
  </div>`);

  let volume = s.route.defaultVol;
  let threshold = DEFAULT_THRESHOLD;
  const volEl = document.getElementById('rs-vol');
  const thrEl = document.getElementById('rs-thr');
  volEl.value = sliderFromVolume(volume);
  thrEl.value = Math.round(threshold * 100);
  volEl.addEventListener('input', () => { volume = volumeFromSlider(Number(volEl.value)); renderRoute(s, volume, threshold); });
  thrEl.addEventListener('input', () => { threshold = Number(thrEl.value) / 100; renderRoute(s, volume, threshold); });
  renderRoute(s, volume, threshold);
  setStage('route', 'done');
}

async function runPipeline(key) {
  if (running) return;
  running = true;
  const s = SAMPLES[key];
  document.getElementById('pipeline').style.display = 'flex';
  startContext();
  clearOutput();
  resetPipeline();
  try {
    await stageRead(s);
    await stageRules(s);
    await stageSmall(s);
    await stageJev(s);
    await stageChatbot(s);
    await stageRoute(s);
  } finally {
    finishContext();
    running = false;
  }
}

export function mountRightSizedAI() {
  const btnsEl = document.getElementById('sample-btns');
  if (!btnsEl) return;
  Object.entries(SAMPLES).forEach(([key, s]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tool-sample-btn';
    btn.innerHTML = `<span class="tool-sample-btn__label">${s.label}</span><span class="tool-sample-btn__sub">${s.sub}</span>`;
    btn.addEventListener('click', () => {
      if (running) return;
      btnsEl.querySelectorAll('.tool-sample-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      runPipeline(key);
    });
    btnsEl.appendChild(btn);
  });
}
