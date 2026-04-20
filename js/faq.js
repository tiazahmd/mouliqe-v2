// faq.js — render FAQ items from data, wire tabs + search + accordion
const CATS = [
  { id: 'all',     label: 'All' },
  { id: 'ai',      label: 'AI & Strategy' },
  { id: 'data',    label: 'Data & Infrastructure' },
  { id: 'working', label: 'Working With Me' },
  { id: 'cost',    label: 'Cost & Timeline' },
];

const CAT_LABELS = {
  ai:      'AI & Strategy',
  data:    'Data & Infrastructure',
  working: 'Working With Me',
  cost:    'Cost & Timeline',
};

const FAQS = [
  { cat: 'ai',      q: 'Does my business actually need AI?',                                    a: 'Maybe. Maybe not. About half the businesses I talk to don\'t need AI — they need better data infrastructure, automation, or a well-designed workflow. AI is the right tool when you\'re dealing with unstructured data at scale, pattern recognition beyond human capacity, or natural language interaction. I\'ll tell you honestly which one applies to you. <a href="/blog/stop-building-ai-features">Read more about this &rarr;</a>' },
  { cat: 'ai',      q: 'What\'s the difference between AI and automation?',                     a: 'Automation follows rules you define — if X happens, do Y. AI handles ambiguity — it can classify, summarize, generate, and reason about things that don\'t fit neat rules. Many businesses need automation, not AI. Automation is cheaper, faster to build, and more predictable. I evaluate which one fits before recommending anything.' },
  { cat: 'ai',      q: 'Why do most AI projects fail?',                                         a: '70-85% of AI projects fail, and it\'s almost never the model\'s fault. The most common reasons: bad data underneath, no clear problem definition, skipping the architecture phase, or building for demos instead of production. The gap between a working POC and a reliable production system is where most teams get stuck. <a href="/blog/data-problem-not-ai-problem">More on this &rarr;</a>' },
  { cat: 'ai',      q: 'Can you help fix an AI system that\'s already built but not working?',  a: 'Yes — this is actually one of the most common engagements. Usually the issue is in the architecture layer: poor context management, missing guardrails, no output validation, or a data pipeline that\'s feeding garbage to the model. I audit what\'s there, identify the root cause, and fix it — often without replacing the model itself.' },
  { cat: 'ai',      q: 'What AI models and tools do you work with?',                            a: 'I\'m model-agnostic. I work with OpenAI (GPT-4o, o1), Anthropic (Claude), AWS Bedrock, open-source models, and various orchestration frameworks. The right model depends on your use case, budget, and data sensitivity — not on what\'s trending. Sometimes the answer is a smaller, cheaper model with better architecture around it.' },
  { cat: 'data',    q: 'What does \'data engineering\' actually mean for my business?',         a: 'It means building the plumbing that gets your data from where it lives (spreadsheets, databases, APIs, SaaS tools) to where it\'s useful (a warehouse, a dashboard, an AI system). If your team spends hours pulling reports, your numbers don\'t match across tools, or nobody trusts the data — that\'s a data engineering problem.' },
  { cat: 'data',    q: 'We have data everywhere — spreadsheets, Salesforce, internal tools. Can you consolidate it?', a: 'That\'s exactly what data engineering solves. I design pipelines that pull from your sources, clean and transform the data, and load it into a proper warehouse where everything is consistent and queryable. The goal is one source of truth that your whole team can trust.' },
  { cat: 'data',    q: 'Do I need a data warehouse before I can use AI?',                       a: 'Not always, but usually. AI is only as good as the data feeding it. If your data is scattered, inconsistent, or incomplete, the AI will reflect that — confidently giving you wrong answers. A solid data foundation isn\'t glamorous, but it\'s what separates AI that works from AI that\'s expensive and unreliable.' },
  { cat: 'working', q: 'What happens in a discovery call?',                                     a: 'It\'s a free 30-minute conversation on Google Meet. I ask about your business, your challenges, and what you\'re trying to achieve. You ask me anything. The goal is to understand whether I can genuinely help. If I can, I\'ll explain how. If I can\'t, I\'ll tell you that too. No prep needed, no pitch, no obligation. <a href="/contact">Book one here &rarr;</a>' },
  { cat: 'working', q: 'What\'s your process from start to finish?',                            a: 'Six stages: Discovery (free — understand your situation), Diagnosis (free — my recommendation), Blueprint (detailed technical architecture), Build (phased implementation with milestones), Refine (tune and validate in your environment), and Support (two months included). Discovery and Diagnosis are free. You only pay starting from Blueprint. <a href="/process">See the full process &rarr;</a>' },
  { cat: 'working', q: 'Do you work with businesses of all sizes?',                             a: 'Yes. I\'ve worked with Fortune companies and small businesses. The approach scales — a startup might need a focused 4-week engagement, while an enterprise might need a multi-phase architecture overhaul. The process is the same; the scope adapts.' },
  { cat: 'working', q: 'Will you tell me if I don\'t need your services?',                      a: 'Yes. I\'d rather lose the engagement than mislead someone. If your problem can be solved with a better spreadsheet, a Zapier workflow, or a tool you already have, I\'ll tell you. The fastest way to lose trust is to sell someone something they don\'t need.' },
  { cat: 'working', q: 'Do you build the solution yourself or manage a team?',                  a: 'I build it myself. I\'m a hands-on architect and developer, not a project manager who outsources the work. For larger engagements that need additional capacity, I\'ll be transparent about that upfront — but I\'m always the one designing the architecture and leading the build.' },
  { cat: 'cost',    q: 'How much does AI consulting cost?',                                     a: 'It depends entirely on scope. A focused automation project might be a few thousand dollars. A full AI system with data infrastructure could be significantly more. I don\'t publish pricing because every engagement is different — but I\'m transparent about cost from the Diagnosis stage, before any paid work begins. Discovery and Diagnosis are always free.' },
  { cat: 'cost',    q: 'How long does a typical project take?',                                 a: 'Small projects (automation, dashboards, data pipeline fixes): 2-6 weeks. Medium projects (AI application, warehouse build): 6-12 weeks. Large projects (full platform, multi-system integration): 3-6 months. I give you a realistic timeline during Diagnosis — not an optimistic one that slips later.' },
  { cat: 'cost',    q: 'What if the project scope changes mid-build?',                          a: 'It happens. The Build phase is milestone-driven specifically for this reason — each milestone is a checkpoint where we align on what\'s been built, what\'s next, and whether anything needs to shift. Scope changes are handled transparently, not buried in change orders.' },
  { cat: 'cost',    q: 'Is there a minimum engagement size?',                                   a: 'No formal minimum. Some engagements are a single Blueprint deliverable (the technical architecture plan). Others are multi-month builds. The discovery call helps us figure out what makes sense for your situation and budget.' },
];

const CHEVRON = `<svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`;

let activeCat = 'all';
let searchQuery = '';

function renderList() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = FAQS.map(f => `
    <div class="faq-item" data-cat="${f.cat}">
      <div class="faq-q">
        <span class="faq-cat-pill faq-cat-pill--${f.cat}">${CAT_LABELS[f.cat]}</span>
        <h3 class="faq-q__text">${f.q}</h3>
        ${CHEVRON}
      </div>
      <div class="faq-a"><div class="faq-a__inner">${f.a}</div></div>
    </div>
  `).join('');

  list.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      list.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

function renderTabs() {
  const el = document.getElementById('faq-tabs');
  if (!el) return;
  el.innerHTML = CATS.map(c => {
    const count = c.id === 'all' ? FAQS.length : FAQS.filter(f => f.cat === c.id).length;
    return `<button class="faq-tab${activeCat === c.id ? ' active' : ''}" data-cat="${c.id}">${c.label}<span class="faq-tab__count">${count}</span></button>`;
  }).join('');
  el.querySelectorAll('.faq-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCat = btn.dataset.cat;
      renderTabs();
      filterItems();
    });
  });
}

function filterItems() {
  const q = searchQuery.toLowerCase();
  let visible = 0;
  document.querySelectorAll('.faq-item').forEach(el => {
    const catMatch = activeCat === 'all' || el.dataset.cat === activeCat;
    const textMatch = !q || el.textContent.toLowerCase().includes(q);
    el.classList.toggle('faq-hidden', !(catMatch && textMatch));
    if (catMatch && textMatch) visible++;
  });
  document.getElementById('faq-empty')?.classList.toggle('faq-hidden', visible > 0);
}

export function mountFAQ() {
  renderList();
  renderTabs();
  document.getElementById('faq-search')?.addEventListener('input', e => {
    searchQuery = e.target.value;
    filterItems();
  });
}

export function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
    })),
  };
}
