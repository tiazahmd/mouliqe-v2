// demo-carousel.js — homepage tool showcase carousel
const DEMOS = [
  { href: '/tools/data-quality', label: 'Data Quality', kind: 'ai', badge: 'AI-Powered', title: 'Data Quality Scanner', desc: 'Upload any CSV and watch an AI coordinator dispatch specialist detector agents — null checks, outlier detection, duplicate IDs, format validation — then score every column in seconds.', features: ['Null & duplicate detection','Statistical outlier analysis','Per-column quality scores','Fix suggestions per issue'], stages: ['Parse','Profile','Detect','Score','Report'], aiStages: [2,3] },
  { href: '/tools/rag-pipeline', label: 'RAG Pipeline', kind: 'ai', badge: 'AI-Powered', title: 'RAG Pipeline Explorer', desc: 'See exactly how a question becomes an answer: chunking, semantic embedding, vector similarity search, AI re-ranking, and grounded answer generation — all visualised step by step.', features: ['Chunk + overlap visualisation','Fake vector embeddings','Cosine similarity scores','Word-by-word answer streaming'], stages: ['Chunk','Embed','Search','Retrieve','Generate'], aiStages: [1,3,4] },
  { href: '/tools/agent-workflow', label: 'Agent Workflow', kind: 'ai', badge: 'AI-Powered', title: 'Agent Workflow Simulator', desc: 'Five business tasks, five different agentic architectures. Watch Fan-Out, Router, Map-Reduce, Sequential Chain, and ReAct Loop patterns execute in real time with live tool call logs.', features: ['5 architecture patterns','Live agent tool call logs','Pattern badges + descriptions','Validation gates & loop cycles'], stages: ['Analyze','Plan','Execute','Synthesize','Deliver'], aiStages: [0,1,2,3] },
  { href: '/tools/kpi-dashboard', label: 'KPI Dashboard', kind: 'local', badge: 'Runs Locally', title: 'KPI Dashboard Builder', desc: 'Drop in a CSV or pick a sample dataset and watch the pipeline classify columns, select the right chart types, and render an interactive dashboard — entirely in your browser.', features: ['Auto chart-type selection','SaaS, e-commerce & marketing samples','CSV upload (runs locally)','Bar, line & doughnut charts'], stages: ['Parse','Profile','Classify','Select Charts','Render'], aiStages: [] },
  { href: '/tools/etl-pipeline', label: 'ETL Pipeline', kind: 'local', badge: 'Runs Locally', title: 'ETL Pipeline Simulator', desc: 'Watch a live data table transform stage by stage: extraction from multiple sources, validation flagging, cleaning, transformation, and load — with per-row change tracking.', features: ['3 real-world ETL scenarios','Live row-level change tracking','Flagged / fixed / removed badges','Final quality score card'], stages: ['Extract','Validate','Clean','Transform','Load'], aiStages: [] },
  { href: '/tools/cost-simulator', label: 'Cost Simulator', kind: 'local', badge: 'Runs Locally', title: 'AI Cost Simulator', desc: 'Most companies are overpaying for AI by 80–97%. Pick a scenario, set your query volume, and watch the monthly cost collapse as RAG, caching, and model routing are applied — one decision at a time.', features: ['3 real-world cost scenarios','Live cost counter (climbs, then drops)','Real model pricing (GPT-4o, Haiku, etc.)','Annual savings calculation'], stages: ['Profile','Baseline','Optimize','Compare','Recommend'], aiStages: [0,2,4] },
  { href: '/tools/supply-chain', label: 'Supply Chain', kind: 'ai', badge: 'AI + Statistical', title: 'Supply Chain Intelligence Engine', desc: 'Watch 12 market, company, and geopolitical signals get processed by a hybrid engine — deterministic models handle the math, AI handles the reasoning — to produce actionable procurement, pricing, and risk recommendations.', features: ['12 signals across 4 domains','Hybrid AI + statistical processing','Constrained optimization model','Actionable recommendations with confidence'], stages: ['Ingest','Process','Correlate','Reason','Optimize','Recommend'], aiStages: [3,5] },
  { href: '/tools/document-intelligence', label: 'Doc Intelligence', kind: 'ai', badge: 'AI-Powered', title: 'Document Intelligence Pipeline', desc: 'Pick a document — invoice, contract, or medical report — and watch AI parse it, classify the content, extract every entity, structure the data into JSON, and generate an executive summary.', features: ['3 document types','Named entity extraction','Structured JSON output','AI-generated executive summary'], stages: ['Parse','Classify','Extract','Structure','Summary'], aiStages: [1,2,4] },
  { href: '/tools/prompt-security', label: 'Prompt Security', kind: 'ai', badge: 'AI-Powered', title: 'AI Security & Guardrails', desc: "Send a prompt through six security layers — validation, content filtering, PII detection, and output sanitization. Then toggle guardrails off to see what happens when there's no protection.", features: ['4 attack scenarios','Toggle guardrails on/off','PII detection and redaction','Side-by-side safe vs. unsafe output'], stages: ['Input','Validate','Filter','Sanitize','PII Scan','Output'], aiStages: [2,4] },
  { href: '/tools/data-migration', label: 'Data Migration', kind: 'ai', badge: 'AI-Powered', title: 'Data Migration Planner', desc: 'Pick a source and target system — Salesforce to Snowflake, legacy SQL to BigQuery, or spreadsheets to Postgres. Watch schemas get mapped, risks flagged, and a phased plan generated.', features: ['3 migration scenarios','Column-level schema mapping','Risk and compatibility flags','Phased plan with effort estimates'], stages: ['Connect','Map','Analyze','Plan','Validate','Report'], aiStages: [3] },
  { href: '/tools/anomaly-detection', label: 'Anomaly Detection', kind: 'ai', badge: 'AI-Powered', title: 'Anomaly Detection Dashboard', desc: 'Feed in time-series data — revenue, traffic, or sensor readings — and watch statistical baselines get computed, then AI models catch anomalies that simple thresholds miss entirely.', features: ['3 time-series datasets','Z-Score + IQR + AI detection','Chart.js visualization','Threshold vs. AI comparison per alert'], stages: ['Ingest','Baseline','Detect','Classify','Alert','Report'], aiStages: [3] },
];

const DURATION = 5000;
const TICK = 80;
let current = 0;
let progress = 0;
let progressTimer = null;

function renderCard(idx, direction = 1) {
  const d = DEMOS[idx];
  const card = document.getElementById('demo-card');
  const tryLink = document.getElementById('demo-try-link');
  if (!card) return;
  if (tryLink) tryLink.href = d.href;

  card.style.opacity = '0';
  card.style.transform = direction === 1 ? 'translateX(12px)' : 'translateX(-12px)';

  setTimeout(() => {
    const stageHtml = d.stages.map((s, i) => {
      const isAI = d.aiStages.includes(i);
      return `<span class="demo-stage-pill${isAI ? ' demo-stage-pill--ai' : ''}">${s}</span>`;
    }).join('<span class="demo-stage-sep">›</span>');

    const bullets = d.features.map(f => `<p>${f}</p>`).join('');

    card.innerHTML = `
      <div class="demo-card__head">
        <div>
          <span class="demo-card__badge demo-card__badge--${d.kind}">${d.badge}</span>
          <h3 class="demo-card__title">${d.title}</h3>
        </div>
        <div class="demo-stage-pills">${stageHtml}</div>
      </div>
      <p class="demo-card__desc">${d.desc}</p>
      <div class="demo-card__features">${bullets}</div>`;

    card.style.transform = 'translateX(0)';
    card.style.opacity = '1';
  }, 180);

  document.querySelectorAll('.demo-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.demo-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === idx);
  });
}

function goTo(idx, direction) {
  current = (idx + DEMOS.length) % DEMOS.length;
  renderCard(current, direction);
  resetProgress();
}

function updateBar() {
  const bar = document.getElementById('demo-progress-bar');
  if (bar) bar.style.width = progress + '%';
}

function resetProgress() {
  clearInterval(progressTimer);
  progress = 0;
  updateBar();
  progressTimer = setInterval(() => {
    progress += (TICK / DURATION) * 100;
    if (progress >= 100) {
      progress = 0;
      goTo(current + 1, 1);
      return;
    }
    updateBar();
  }, TICK);
}

export function mountDemoCarousel() {
  const tabsEl = document.getElementById('demo-tabs');
  const dotsEl = document.getElementById('demo-dots');
  if (!tabsEl || !dotsEl) return;

  DEMOS.forEach((d, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'demo-tab';
    btn.textContent = d.label;
    btn.addEventListener('click', () => goTo(i, i > current ? 1 : -1));
    tabsEl.appendChild(btn);

    const dot = document.createElement('div');
    dot.className = 'demo-dot';
    dot.addEventListener('click', () => goTo(i, i > current ? 1 : -1));
    dotsEl.appendChild(dot);
  });

  const wrap = document.getElementById('demo-card-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', () => clearInterval(progressTimer));
    wrap.addEventListener('mouseleave', resetProgress);
  }

  renderCard(0, 1);
  resetProgress();
}
