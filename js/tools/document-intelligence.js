// tools/document-intelligence.js — engine for the document intelligence demo
import { setStage, resetPipeline, startContext, addContext, finishContext, addCard, clearOutput, wait } from '/js/tool-page.js';
import { SAMPLES } from '/js/tools/document-intelligence-data.js';

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
  return `<span class="json-bracket">{</span>\n${keys.map(k => `${pad}  <span class="json-key">"${k}"</span>: ${renderJSON(obj[k], indent + 1)}`).join(',\n')}\n${pad}<span class="json-bracket">}</span>`;
}

async function runPipeline(key) {
  if (running) return;
  running = true;
  const data = SAMPLES[key];

  document.getElementById('pipeline').style.display = 'flex';
  startContext();
  clearOutput();
  resetPipeline();

  // ── Parse — progressive line reveal ──
  setStage('parse', 'active');
  addContext('Parsing Document', 'Reading the document line by line, detecting section headers, paragraph breaks, and structural elements. Every downstream stage depends on clean parsing — this is where we turn a wall of text into something the AI can reason about.');

  addCard(`<div class="tool-result-card">
    <div class="tool-result-header">
      <span class="tool-result-label">Parsed Document</span>
      <span class="tool-result-meta">${data.lines.length} lines</span>
    </div>
    <div id="doc-view" class="doc-view"></div>
  </div>`);

  const docView = document.getElementById('doc-view');
  for (let i = 0; i < data.lines.length; i++) {
    const content = data.lines[i] || '\u00A0';
    docView.insertAdjacentHTML('beforeend', `<div class="doc-line">${escapeHtml(content)}</div>`);
    docView.scrollTop = docView.scrollHeight;
    await wait(40);
  }
  setStage('parse', 'done');
  await wait(300);

  // ── Classify ──
  setStage('classify', 'active');
  addContext('AI: Classifying Document', `An AI classifier analyzes the document's structure, vocabulary, and formatting patterns to determine what type of document this is. It doesn't just match keywords — it understands that an "Amount Due" field next to line items means invoice, not purchase order.`, true);
  await wait(1200);
  setStage('classify', 'done');

  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    <div class="tool-result-header">
      <span class="tool-result-label">Classification</span>
      <span class="conf-badge conf-badge--high">${(data.classification.confidence * 100).toFixed(0)}%</span>
    </div>
    <div class="class-grid">
      <div>
        <p class="class-grid__label">Type</p>
        <p class="class-grid__value">${data.classification.type}</p>
      </div>
      <div>
        <p class="class-grid__label">Subtype</p>
        <p class="class-grid__value">${data.classification.subtype}</p>
      </div>
      <div>
        <p class="class-grid__label">Intent</p>
        <p class="class-grid__value">${data.classification.intent}</p>
      </div>
    </div>
  </div>`);
  await wait(300);

  // ── Extract ──
  setStage('extract', 'active');
  addContext('AI: Extracting Entities', 'Named entity recognition scans every line for people, organizations, dates, monetary amounts, identifiers, and contractual clauses. Each entity gets a type label and confidence score. The AI understands context — "Net 30" is a payment term, not a number.', true);

  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    <div class="tool-result-header">
      <span class="tool-result-label">Extracted Entities</span>
      <span class="tool-result-meta" id="entity-count">0 / ${data.entities.length}</span>
    </div>
    <div id="entity-list" class="entity-list"></div>
  </div>`);

  for (let i = 0; i < data.entities.length; i++) {
    const e = data.entities[i];
    document.getElementById('entity-list').insertAdjacentHTML('beforeend',
      `<span class="entity-badge entity-badge--${e.type}">${escapeHtml(e.label)}: ${escapeHtml(e.text)}</span>`);
    document.getElementById('entity-count').textContent = `${i + 1} / ${data.entities.length}`;
    await wait(200);
  }
  setStage('extract', 'done');
  await wait(300);

  // ── Structure ──
  setStage('structure', 'active');
  addContext('Structuring into JSON', 'Mapping extracted entities into a typed JSON schema. Dates become ISO format, currencies become decimals, relationships between entities are preserved. This is the output your database or API can actually consume.');
  await wait(1000);
  setStage('structure', 'done');

  addCard(`<div class="tool-result-card" style="margin-top: var(--space-3)">
    <div class="tool-result-header">
      <span class="tool-result-label">Structured Output</span>
      <span class="tool-result-meta">JSON</span>
    </div>
    <pre class="json-view">${renderJSON(data.structured)}</pre>
  </div>`);
  await wait(300);

  // ── Summary — word-by-word stream ──
  setStage('summary', 'active');
  addContext('AI: Generating Executive Summary', 'The AI reads the full document and extracted entities to produce a concise summary a human can scan in 10 seconds. It prioritizes: who, what, how much, when, and any critical terms or conditions.', true);
  await wait(600);

  addCard(`<div class="tool-result-card tool-result-card--success" style="margin-top: var(--space-3)">
    <div class="tool-result-header"><span class="tool-result-label">Executive Summary</span></div>
    <p id="summary-text" style="font-size: var(--fs-sm); color: var(--color-fg-muted); line-height: var(--lh-loose); margin-top: var(--space-2)"></p>
  </div>`);

  const words = data.summary.split(' ');
  const sumEl = document.getElementById('summary-text');
  for (let i = 0; i < words.length; i++) {
    sumEl.textContent += (i > 0 ? ' ' : '') + words[i];
    await wait(35);
  }
  setStage('summary', 'done');
  finishContext();
  running = false;
}

export function mountDocumentIntelligence() {
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
