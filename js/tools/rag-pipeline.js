// tools/rag-pipeline.js — engine for the RAG pipeline demo
import { setStage, resetPipeline, startContext, addContext, finishContext, wait } from '/js/tool-page.js';
import { DOCS, RESULTS, STAGE_CONTEXT } from '/js/tools/rag-pipeline-data.js';

const STAGES = ['chunk', 'embed', 'search', 'retrieve', 'generate'];
let running = false;
let currentDoc = null;
let currentText = '';
let chunks = [];

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function chunkText(text, chunkSize = 200, overlap = 50) {
  const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
  const result = [];
  let current = '', currentStart = 0, charPos = 0;
  for (const s of sentences) {
    if (current.length + s.length > chunkSize && current.length > 0) {
      result.push({ text: current.trim(), start: currentStart, end: charPos });
      const overlapText = current.slice(-overlap);
      current = overlapText + s;
      currentStart = charPos - overlapText.length;
    } else {
      current += s;
    }
    charPos += s.length;
  }
  if (current.trim().length > 0) result.push({ text: current.trim(), start: currentStart, end: charPos });
  return result;
}

function fakeVector(seed) {
  const v = [];
  let x = Math.sin(seed * 127.1) * 43758.5453;
  for (let i = 0; i < 8; i++) {
    x = Math.sin(x * 12.9898 + i * 78.233) * 43758.5453;
    v.push(parseFloat((x - Math.floor(x) - 0.5).toFixed(3)));
  }
  return v;
}

function generateScores(numChunks, topChunkIndices) {
  const scores = [];
  for (let i = 0; i < numChunks; i++) {
    if (topChunkIndices.includes(i)) {
      scores.push(parseFloat((0.72 + Math.random() * 0.22).toFixed(3)));
    } else {
      const r = Math.random();
      if (r < 0.3) scores.push(parseFloat((0.4 + Math.random() * 0.25).toFixed(3)));
      else scores.push(parseFloat((0.05 + Math.random() * 0.3).toFixed(3)));
    }
  }
  return scores;
}

function findBestResult(docKey, question) {
  if (!RESULTS[docKey]) return null;
  const q = question.toLowerCase();
  let best = null, bestScore = -1;
  RESULTS[docKey].forEach(r => {
    const rWords = r.question.toLowerCase().split(/\s+/);
    const qWords = q.split(/\s+/);
    let score = 0;
    qWords.forEach(w => { if (w.length > 3 && rWords.some(rw => rw.includes(w) || w.includes(rw))) score++; });
    if (score > bestScore) { bestScore = score; best = r; }
  });
  return best;
}

function renderChunks(chunkList) {
  const el = document.getElementById('chunk-viz');
  el.style.display = 'block';
  const body = chunkList.map((chunk, i) => {
    let overlapStart = -1;
    if (i < chunkList.length - 1) {
      const next = chunkList[i + 1];
      if (next.start < chunk.end) overlapStart = next.start - chunk.start;
    }
    let displayText = escapeHtml(chunk.text);
    if (overlapStart > 0 && overlapStart < chunk.text.length) {
      const before = escapeHtml(chunk.text.slice(0, overlapStart));
      const over = escapeHtml(chunk.text.slice(overlapStart));
      displayText = before + `<span class="rag-overlap">${over}</span>`;
    }
    return `<div class="rag-chunk">
      <div class="rag-chunk__head">
        <span class="rag-chunk__label">Chunk ${i + 1}</span>
        <span class="rag-chunk__meta">${chunk.text.length} chars</span>
      </div>
      <p class="rag-chunk__text">${displayText}</p>
      ${overlapStart > 0 ? `<div class="rag-overlap-note"><div class="rag-overlap-note__dash"></div><span>Overlap region with Chunk ${i + 2}</span></div>` : ''}
    </div>`;
  }).join('');

  el.innerHTML = `<div class="tool-result-card">
    <div class="tool-result-header">
      <span class="tool-result-label">Document Chunks</span>
      <span class="tool-result-meta">${chunkList.length} chunks created</span>
    </div>
    <div class="rag-chunk-list">${body}</div>
  </div>`;
}

function renderEmbeddings(chunkList) {
  const el = document.getElementById('embed-viz');
  el.style.display = 'block';
  const body = chunkList.map((chunk, i) => {
    const vec = fakeVector(i + 1);
    const vecStr = `[${vec.slice(0, 4).join(', ')}, ...]`;
    const preview = chunk.text.slice(0, 60) + (chunk.text.length > 60 ? '...' : '');
    return `<div class="rag-chunk">
      <div class="rag-embed-row">
        <span class="rag-chunk__label" style="min-width: 3.5rem">Chunk ${i + 1}</span>
        <span class="rag-embed-row__preview">${escapeHtml(preview)}</span>
        <code class="rag-embed-row__vec">${vecStr}</code>
      </div>
    </div>`;
  }).join('');
  el.innerHTML = `<div class="tool-result-card">
    <div class="tool-result-header">
      <span class="tool-result-label">Chunk Embeddings</span>
      <span class="tool-result-meta">768-dim vectors (truncated)</span>
    </div>
    <div class="rag-chunk-list">${body}</div>
  </div>`;
}

function renderSearch(chunkList, scores, question) {
  const el = document.getElementById('search-viz');
  el.style.display = 'block';

  const indexed = scores.map((s, i) => ({ score: s, idx: i })).sort((a, b) => b.score - a.score);
  const queryVec = fakeVector(42);
  const queryVecStr = `[${queryVec.slice(0, 4).join(', ')}, ...]`;

  const rows = indexed.map(({ score, idx }) => {
    const chunk = chunkList[idx];
    const preview = chunk.text.slice(0, 80) + (chunk.text.length > 80 ? '...' : '');
    const tier = score > 0.7 ? 'high' : score >= 0.4 ? 'medium' : 'low';
    const scoreClass = tier === 'high' ? 'tool-score--high' : tier === 'medium' ? 'tool-score--medium' : 'tool-score--low';
    return `<div class="rag-search-row rag-search-row--${tier}">
      <div class="rag-search-row__head">
        <span class="rag-chunk__label" style="flex-shrink: 0">Chunk ${idx + 1}</span>
        <div class="rag-search-row__bar"><div class="rag-search-row__bar-fill" style="width: ${score * 100}%"></div></div>
        <span class="tool-score ${scoreClass}" style="flex-shrink: 0">${score.toFixed(3)}</span>
      </div>
      <p class="rag-search-row__preview">${escapeHtml(preview)}</p>
    </div>`;
  }).join('');

  el.innerHTML = `<div class="tool-result-card">
    <div class="tool-result-header"><span class="tool-result-label">Similarity Search</span></div>
    <div class="rag-query-row">
      <div class="rag-query-row__inner">
        <span class="rag-query-row__label">Query</span>
        <span class="rag-query-row__text">"${escapeHtml(question)}"</span>
        <code class="rag-query-row__vec">${queryVecStr}</code>
      </div>
    </div>
    <div class="rag-chunk-list">${rows}</div>
  </div>`;
}

function renderRetrieve(chunkList, scores, topIndices) {
  const el = document.getElementById('retrieve-viz');
  el.style.display = 'block';

  const items = chunkList.map((chunk, i) => {
    const isRetrieved = topIndices.includes(i);
    const score = scores[i];
    if (isRetrieved) {
      return `<div class="rag-chunk rag-chunk--retrieved">
        <div class="rag-chunk__head">
          <div style="display: flex; align-items: center; gap: var(--space-2)">
            <span class="rag-chunk__label">Chunk ${i + 1}</span>
            <span class="retrieved-badge">Retrieved</span>
          </div>
          <span class="tool-score tool-score--high">${score.toFixed(3)}</span>
        </div>
        <p class="rag-chunk__text">${escapeHtml(chunk.text)}</p>
      </div>`;
    }
    return `<div class="rag-chunk rag-chunk--not-retrieved">
      <div class="rag-chunk__head">
        <span class="rag-chunk__label" style="color: var(--color-fg-faint)">Chunk ${i + 1}</span>
        <span class="rag-chunk__meta">${score.toFixed(3)}</span>
      </div>
    </div>`;
  }).join('');

  el.innerHTML = `<div class="tool-result-card">
    <div class="tool-result-header">
      <span class="tool-result-label">Retrieved Context</span>
      <span class="tool-result-meta" style="color: var(--color-accent)">Retrieved ${topIndices.length} of ${chunkList.length} chunks</span>
    </div>
    <div class="rag-chunk-list">${items}</div>
  </div>`;
}

async function renderGenerate(answer, topIndices) {
  const el = document.getElementById('generate-viz');
  el.style.display = 'block';
  el.innerHTML = `<div class="rag-answer">
    <p class="rag-answer__label">Generated Answer</p>
    <p class="rag-answer__text" id="answer-text"></p>
    <p class="rag-answer__sources">Grounded in: ${topIndices.map(i => `Chunk ${i + 1}`).join(', ')}</p>
  </div>`;

  const words = answer.split(' ');
  const textEl = document.getElementById('answer-text');
  for (let i = 0; i < words.length; i++) {
    textEl.textContent += (i > 0 ? ' ' : '') + words[i];
    await wait(28);
  }
}

async function runPipeline(question) {
  if (running) return;
  running = true;

  document.getElementById('pipeline').style.display = 'flex';
  document.getElementById('rag-output').style.display = 'block';
  ['chunk-viz', 'embed-viz', 'search-viz', 'retrieve-viz', 'generate-viz'].forEach(id => {
    const e = document.getElementById(id);
    if (e) { e.style.display = 'none'; e.innerHTML = ''; }
  });
  startContext();
  resetPipeline();

  // ── Chunk ──
  setStage('chunk', 'active');
  addContext(STAGE_CONTEXT.chunk.title, STAGE_CONTEXT.chunk.text, STAGE_CONTEXT.chunk.isAI);
  await wait(1500);
  chunks = chunkText(currentText);
  renderChunks(chunks);
  setStage('chunk', 'done');
  await wait(500);

  // ── Embed ──
  setStage('embed', 'active');
  addContext(STAGE_CONTEXT.embed.title, STAGE_CONTEXT.embed.text, STAGE_CONTEXT.embed.isAI);
  await wait(1800);
  renderEmbeddings(chunks);
  setStage('embed', 'done');
  await wait(500);

  // Find result (pre-built or fallback)
  const result = findBestResult(currentDoc, question) || { topChunks: [0, 1], answer: 'Based on the document content, here is a relevant answer drawn from the retrieved chunks.' };
  const scores = generateScores(chunks.length, result.topChunks);

  // ── Search ──
  setStage('search', 'active');
  addContext(STAGE_CONTEXT.search.title, STAGE_CONTEXT.search.text, STAGE_CONTEXT.search.isAI);
  await wait(1800);
  renderSearch(chunks, scores, question);
  setStage('search', 'done');
  await wait(500);

  // ── Retrieve ──
  setStage('retrieve', 'active');
  addContext(STAGE_CONTEXT.retrieve.title, STAGE_CONTEXT.retrieve.text, STAGE_CONTEXT.retrieve.isAI);
  await wait(2000);
  renderRetrieve(chunks, scores, result.topChunks);
  setStage('retrieve', 'done');
  await wait(500);

  // ── Generate ──
  setStage('generate', 'active');
  addContext(STAGE_CONTEXT.generate.title, STAGE_CONTEXT.generate.text, STAGE_CONTEXT.generate.isAI);
  await wait(800);
  await renderGenerate(result.answer, result.topChunks);
  setStage('generate', 'done');

  finishContext();
  running = false;
}

function updateRunBtn() {
  const input = document.getElementById('question-input');
  const btn = document.getElementById('run-btn');
  btn.disabled = !(currentDoc && input.value.trim());
}

export function mountRag() {
  const btnsEl = document.getElementById('sample-btns');
  if (btnsEl) {
    Object.entries(DOCS).forEach(([key, doc]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tool-sample-btn';
      btn.dataset.sample = key;
      btn.innerHTML = `<span class="tool-sample-btn__label">${doc.title}</span><span class="tool-sample-btn__sub">${doc.sub}</span>`;
      btn.addEventListener('click', () => {
        btnsEl.querySelectorAll('.tool-sample-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDoc = key;
        currentText = doc.text;

        const qContainer = document.getElementById('sample-questions');
        const chips = document.getElementById('question-chips');
        qContainer.style.display = 'block';
        chips.innerHTML = doc.questions.map(q => `<button type="button" class="q-chip">${escapeHtml(q)}</button>`).join('');
        document.getElementById('question-input').value = doc.questions[0];
        updateRunBtn();
      });
      btnsEl.appendChild(btn);
    });
  }

  const chips = document.getElementById('question-chips');
  if (chips) {
    chips.addEventListener('click', (e) => {
      const chip = e.target.closest('.q-chip');
      if (!chip) return;
      document.getElementById('question-input').value = chip.textContent;
      updateRunBtn();
    });
  }

  const input = document.getElementById('question-input');
  input?.addEventListener('input', updateRunBtn);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !document.getElementById('run-btn').disabled) {
      runPipeline(input.value.trim());
    }
  });

  document.getElementById('run-btn')?.addEventListener('click', () => {
    const q = document.getElementById('question-input').value.trim();
    if (q) runPipeline(q);
  });
}
