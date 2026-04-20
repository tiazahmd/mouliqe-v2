// demo-gallery.js — renders all 11 tool cards grouped by AI vs Local
const DEMOS = [
  { href: '/tools/data-quality',           type: 'ai',    title: 'Data Quality Scanner',        desc: 'Upload a CSV or pick a sample dataset. AI detects inconsistent formats, outliers, nulls, and duplicates — then scores every column.',                           stages: ['Parse','Profile','Detect','Score','Report'],         aiStages: [2, 3] },
  { href: '/tools/rag-pipeline',           type: 'ai',    title: 'RAG Pipeline Explorer',       desc: 'Pick a document, ask a question, and watch every stage of a Retrieval-Augmented Generation pipeline — from chunking to answer generation.',                   stages: ['Chunk','Embed','Search','Retrieve','Generate'],      aiStages: [1, 3, 4] },
  { href: '/tools/agent-workflow',         type: 'ai',    title: 'Agent Workflow Simulator',    desc: 'Pick a business task and watch multi-agent AI systems use Fan-Out, Router, Map-Reduce, Chain, and ReAct patterns to execute work.',                          stages: ['Analyze','Plan','Execute','Synthesize','Deliver'],   aiStages: [0, 1, 2, 3] },
  { href: '/tools/supply-chain',           type: 'ai',    title: 'Supply Chain Intelligence',   desc: 'Watch 12 market, company, and geopolitical signals get processed by a hybrid AI + statistical engine to produce procurement, pricing, inventory, and risk recommendations.', stages: ['Ingest','Process','Correlate','Reason','Optimize','Recommend'], aiStages: [3, 5] },
  { href: '/tools/kpi-dashboard',          type: 'local', title: 'KPI Dashboard Builder',       desc: 'Upload a CSV or pick a sample. Column types are detected, metrics classified, and an interactive Chart.js dashboard is built automatically.',            stages: ['Parse','Profile','Classify','Charts','Render'],      aiStages: [] },
  { href: '/tools/etl-pipeline',           type: 'local', title: 'ETL Pipeline Simulator',      desc: 'Watch messy data get extracted, validated, cleaned, transformed, and loaded — with per-row change tracking and a final quality score.',                 stages: ['Extract','Validate','Clean','Transform','Load'],     aiStages: [] },
  { href: '/tools/cost-simulator',         type: 'local', title: 'AI Cost Simulator',           desc: 'Most teams overpay for AI by 80-97%. Pick a scenario, set your volume, and watch the cost collapse as RAG, caching, and routing are applied.',          stages: ['Profile','Baseline','Optimize','Compare','Recommend'], aiStages: [0, 2, 4] },
  { href: '/tools/document-intelligence',  type: 'ai',    title: 'Document Intelligence',       desc: 'Pick a document — invoice, contract, or medical report — and watch AI parse, classify, extract entities, structure into JSON, and summarize.',           stages: ['Parse','Classify','Extract','Structure','Summary'],  aiStages: [1, 2, 4] },
  { href: '/tools/prompt-security',        type: 'ai',    title: 'AI Security & Guardrails',    desc: 'Send a prompt through six security layers — validation, content filtering, PII detection, sanitization. Then toggle guardrails off to see what breaks.', stages: ['Input','Validate','Filter','Sanitize','PII Scan','Output'], aiStages: [2, 4] },
  { href: '/tools/data-migration',         type: 'ai',    title: 'Data Migration Planner',      desc: 'Pick a source and target system. Watch schemas get mapped, incompatibilities flagged, and a phased migration plan generated with risk assessments.',  stages: ['Connect','Map','Analyze','Plan','Validate','Report'],aiStages: [3] },
  { href: '/tools/anomaly-detection',      type: 'ai',    title: 'Anomaly Detection',           desc: 'Feed in time-series data and watch statistical baselines get computed, then AI models detect anomalies that simple threshold alerts miss entirely.',    stages: ['Ingest','Baseline','Detect','Classify','Alert','Report'], aiStages: [3] },
];

function renderCard(d) {
  const stages = d.stages.map((s, i) => {
    const isAI = d.aiStages.includes(i);
    return `<span class="demo-gallery-card__stage${isAI ? ' demo-gallery-card__stage--ai' : ''}">${s}</span>`;
  }).join('<span class="demo-gallery-card__sep">›</span>');

  return `<a href="${d.href}" class="card demo-gallery-card">
    <div class="demo-gallery-card__stages">${stages}</div>
    <div>
      <h3 class="demo-gallery-card__title">${d.title}</h3>
      <p class="demo-gallery-card__desc">${d.desc}</p>
    </div>
    <div class="demo-gallery-card__cta">
      <span class="demo-gallery-card__cta-text">Try it <span class="demo-gallery-card__cta-arrow">&rarr;</span></span>
    </div>
  </a>`;
}

export function mountDemoGallery() {
  const aiGrid    = document.getElementById('ai-demos');
  const localGrid = document.getElementById('local-demos');
  if (!aiGrid || !localGrid) return;

  const aiCards    = DEMOS.filter(d => d.type === 'ai').map(renderCard).join('');
  const localCards = DEMOS.filter(d => d.type === 'local').map(renderCard).join('');

  aiGrid.innerHTML    = aiCards;
  localGrid.innerHTML = localCards;
}
