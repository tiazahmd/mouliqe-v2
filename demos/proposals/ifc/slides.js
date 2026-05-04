/* ==========================================================================
   IFC — AI-Powered pitch deck Engine
   Mouliqe Pre-Proposal Presentation — 10 slides
   ========================================================================== */

export const meta = {
  title: 'AI-Powered pitch deck Engine',
  client: 'International Finance Corporation',
  author: 'Mouliqe',
  date: 'May 2026'
};

export const slides = [

  {
    id: 'title',
    type: 'title',
    label: 'Pre-Proposal',
    title: 'AI-Powered Pitch <br>Deck Engine',
    subtitle: 'Automated research and pitch deck generation for IFC buy-side advisory engagements — from company name to presentation-ready pitch deck.',
    meta: 'Mouliqe LLC &middot; May 2026'
  },

  {
    id: 'problem',
    type: 'stats',
    title: 'The Problem',
    subtitle: 'Every buy-side advisory engagement begins with a pitch deck. Building one requires deep research across company financials, industry dynamics, country macro, and IFC track record — then structuring it into a presentation-ready deck. The research is thorough but repetitive. The assembly is manual. The time cost is significant.',
    stats: [
      { value: '8-12', label: 'Hours per pitch deck' },
      { value: '5+', label: 'Research domains per deck' },
      { value: '12', label: 'Slides per standard deck' },
      { value: '80%', label: 'Repeatable research patterns' }
    ],
    items: [
      { label: 'The bottleneck is not analyst skill — it is analyst time', detail: 'Senior analysts spend hours on research and assembly that follows a consistent, repeatable pattern. Every pitch deck covers the same domains: company profile, financials, industry landscape, country macro, and IFC capabilities. The structure is standardized. The research methodology is well-defined. The quality bar is high but the process is predictable. This is exactly the kind of work that AI handles well — structured, research-intensive, pattern-driven.' }
    ]
  },

  {
    id: 'current-vs-automated',
    type: 'content',
    layout: 'split',
    visual: 'process-comparison',
    title: 'Current Process vs. Automated',
    subtitle: 'The same research methodology. The same quality standards. A fraction of the time.',
    items: [
      {
        label: 'Today: 8-12 hours per deck',
        detail: 'Analyst manually searches company websites, Bloomberg, IFC databases, World Bank data, sector reports. Copies data into slide templates. Cross-references sources. Formats charts and tables. Reviews for consistency. Repeats for every new engagement.'
      },
      {
        label: 'With the engine: under 15 minutes',
        detail: 'Analyst enters company name, country, and sector. The engine runs deep research across public sources, evaluates quality, retries if gaps are found, and generates a complete pitch deck. Analyst reviews, refines, and presents.'
      },
      {
        label: 'The analyst stays in control',
        detail: 'This is not a replacement for analyst judgment. It is a first draft generator. The engine handles the research grunt work and initial assembly. The analyst reviews, edits, adds proprietary context, and makes the final call on what goes to the client.'
      }
    ]
  },

  {
    id: 'how-it-works',
    type: 'content',
    layout: 'split',
    visual: 'pipeline-diagram',
    title: 'How It Works',
    subtitle: 'A three-phase AI pipeline that mirrors the analyst research process — research, evaluate, assemble.',
    items: [
      {
        label: 'Phase 1 — Deep Research',
        detail: 'The engine builds a targeted research brief from the analyst\'s input, then executes deep web research across company profile, financials, industry dynamics, country macro, and IFC track record. Sources include company IR pages, financial databases, World Bank data, IFC.org, and sector reports.'
      },
      {
        label: 'Phase 2 — Quality Evaluation',
        detail: 'Research results are evaluated against IFC standards: Are sources credible? Is financial data current? Are there enough data points per section? If gaps are found, the engine automatically rewrites the research brief and retries — up to three attempts — until quality thresholds are met.'
      },
      {
        label: 'Phase 3 — Deck Generation',
        detail: 'Verified research is structured into a complete pitch deck following IFC\'s standard format — cover, disclaimer, executive summary, company overview, financials, industry, macro, IFC capabilities, proposed engagement, and additional sections as needed.'
      }
    ]
  },

  {
    id: 'live-demo',
    type: 'content',
    layout: 'split',
    visual: 'demo-screenshot',
    title: 'Working Demo',
    subtitle: 'A functional prototype is live and generating pitch decks today.',
    body: '<a href="https://ifc-demo-frontend-v73g.vercel.app/" target="_blank" style="color:var(--p-accent);text-decoration:underline;font-weight:600">Launch the demo &rarr;</a>',
    items: [
      {
        label: 'What it does today',
        detail: 'Enter a company name, country, and sector. Optionally upload supporting documents (PDF, DOCX). The engine researches, evaluates, and generates a downloadable PPTX deck — end to end, in real time, with progress streaming.'
      },
      {
        label: 'What it produces',
        detail: 'A structured pitch deck covering all standard sections. Each slide includes sourced data points, financial figures where available, and IFC boilerplate content. The output is a starting point — designed for analyst review and refinement, not final delivery.'
      },
      {
        label: 'Built for iteration',
        detail: 'The demo represents the core pipeline. Production enhancements — branded IFC templates, multi-engagement-type support, verification layer, and analyst feedback loops — are on the roadmap and ready to build once the engagement model is defined.'
      }
    ]
  },

  {
    id: 'security',
    type: 'content',
    layout: 'split',
    visual: 'security-architecture',
    title: 'Data Privacy &amp; Security',
    subtitle: 'Zero proprietary data required. The engine operates entirely outside IFC\'s security perimeter — by design.',
    items: [
      {
        label: 'No IFC systems integration',
        detail: 'The engine is a standalone web application. It does not connect to, access, or require any IFC internal systems, databases, or infrastructure. No SSO. No VPN. No network access. It runs like any external research tool an analyst might use.'
      },
      {
        label: 'No proprietary data as input',
        detail: 'The only inputs are public information: company name, country, and sector. Optional file uploads are for public reports — Fitch ratings, Economist articles, sector analyses. No IFC internal documents, deal data, or classified information enters the system.'
      },
      {
        label: 'All research from public sources',
        detail: 'The research engine searches the open web — company websites, financial databases, World Bank publications, IFC.org public pages, news outlets, and sector reports. The same sources an analyst would use in a browser.'
      },
      {
        label: 'No data retention',
        detail: 'Research sessions are ephemeral. No company data, research results, or generated decks are stored on the platform after the session ends. The analyst downloads the output and the session is gone.'
      }
    ]
  },

  {
    id: 'output',
    type: 'grid',
    title: 'What It Produces',
    subtitle: 'A structured pitch deck tailored to the company, sector, and engagement type. The number of slides and depth of each section adapts to the research output and requirements. Click any card for detail.',
    cards: [
      { label: 'Cover Slide', tag: 'Standard', detail: 'Company name, country, sector, engagement type, and IFC branding. Formatted to IFC template standards.' },
      { label: 'Disclaimer', tag: 'Boilerplate', detail: 'Standard IFC/WBG disclaimer text. Pre-loaded boilerplate — not researched, not generated. Verbatim from IFC templates.' },
      { label: 'Executive Summary', tag: 'Research', detail: 'Synthesis of who the company is, what they need, why IFC is a fit, and the proposed engagement structure. The hardest slide to write — and the most valuable to automate.' },
      { label: 'Company Overview', tag: 'Research', detail: 'History, ownership structure, leadership, operations, geographic footprint, and scale. Sourced from company IR pages, annual reports, and financial databases.' },
      { label: 'Financial Highlights', tag: 'Research', detail: 'Revenue, EBITDA, total assets, debt structure — recent years where available. Charts and data callouts. Depth depends on public data availability for the target company.' },
      { label: 'Industry & Market', tag: 'Research', detail: 'Market size, growth trajectory, competitive landscape, regulatory environment, and key trends. Sector-specific analysis sourced from industry reports and market data.' },
      { label: 'Country & Macro', tag: 'Research', detail: 'GDP, investment climate, political stability, FX dynamics, and regulatory framework. Sourced from World Bank, IMF, and country-specific economic databases.' },
      { label: 'IFC Capabilities', tag: 'Boilerplate', detail: 'WBG overview, IFC global reach stats, sector-specific track record, and selected past transactions. Mix of boilerplate and targeted research.' },
      { label: 'Proposed Engagement', tag: 'Generated', detail: 'Scope of work, deliverables, and engagement structure tailored to the specific company and sector. Generated from research findings and engagement type selection.' },
      { label: 'Additional Sections', tag: 'Adaptive', detail: 'The engine adds or removes sections based on research depth and engagement requirements. ESG considerations, case studies, risk analysis, or team bios may be included depending on what the research surfaces and what the engagement type demands.' }
    ]
  },

  {
    id: 'roadmap',
    type: 'timeline',
    title: 'Roadmap',
    subtitle: 'The working demo is Phase 1. Production-ready enhancements are scoped and ready to build.',
    tracks: [
      { label: 'Core Pipeline', start: 1, end: 2, color: 'accent' },
      { label: 'Branded Templates', start: 2, end: 4, color: 'blue' },
      { label: 'Verification Layer', start: 3, end: 5, color: 'amber' },
      { label: 'Multi-Engagement', start: 4, end: 6, color: 'blue' },
      { label: 'Analyst Feedback', start: 5, end: 7, color: 'accent' },
      { label: 'Production Deploy', start: 7, end: 8, color: 'accent' }
    ],
    items: [
      {
        label: 'Phase 1 — Core Pipeline (complete)',
        detail: 'Deep research, quality evaluation with retry logic, and full deck generation. Working demo deployed and generating decks today.'
      },
      {
        label: 'Phase 2 — Production Enhancements',
        detail: 'Branded IFC PPTX templates (pixel-perfect to IFC standards), research verification agent (cross-references sources, flags contradictions), support for capital raise, sell-side, and pre-IPO engagement types, and analyst feedback loops for continuous prompt improvement.'
      },
      {
        label: 'Phase 3 — Scale',
        detail: 'Multi-user support, usage analytics, prompt library for different engagement types, and integration with analyst workflows. Built to handle the full advisory team\'s volume.'
      }
    ]
  },

  {
    id: 'why-mouliqe',
    type: 'grid',
    title: 'Why Mouliqe',
    subtitle: 'An AI solutions and data architecture consultancy. This is what we build. Click any card for detail.',
    cards: [
      { label: 'Purpose-Built for IFC', tag: 'Core', detail: 'This is not a generic AI deck generator repurposed for finance. The engine is built from the ground up for IFC advisory workflows — the research domains, slide structure, quality standards, and institutional voice are all IFC-specific.' },
      { label: 'AI Architecture Expertise', tag: 'Delivery', detail: 'Mouliqe specializes in AI solutions architecture, data engineering, and analytics platforms. The IFC engine uses a multi-model AI pipeline (Claude for orchestration, Perplexity for deep research, Gamma for rendering) — the kind of system design that requires deep AI engineering experience.' },
      { label: 'Production, Not Prototypes', tag: 'Quality', detail: 'Systems designed for production use — not demos that break under real conditions. Built by someone who has designed automation platforms across Fortune-level companies, reducing manual processing by 80-95%.' },
      { label: 'Security by Design', tag: 'Architecture', detail: 'The zero-proprietary-data architecture is not a workaround — it is a deliberate design choice. The engine was built to operate outside the security perimeter from day one, eliminating the need for IT security review or systems integration.' },
      { label: 'Iterative Development', tag: 'Approach', detail: 'Working demo first, then iterate based on analyst feedback. No 6-month build cycle before anyone sees a result. The core pipeline is live. Enhancements are scoped. The roadmap is driven by what analysts actually need.' },
      { label: 'Domain Understanding', tag: 'Context', detail: 'Built in close collaboration with an IFC analyst who defined the research methodology, quality standards, and deck structure. The prompts mirror how a human expert works — not generic AI instructions.' }
    ]
  },

  {
    id: 'next-steps',
    type: 'content',
    layout: 'hero',
    title: 'Next Steps',
    body: 'The core engine is built and generating pitch decks. The following steps move from demo to production tool.',
    items: [
      {
        label: 'Try the demo',
        detail: 'Run the engine on a real company. See what it produces. Evaluate the research quality, slide structure, and content against your standards. Identify gaps and areas for improvement.'
      },
      {
        label: 'Define the engagement model',
        detail: 'How should this tool be delivered? Options include a dedicated build-out for the advisory team, a subscription model, or a hybrid approach. The technical architecture supports all three.'
      },
      {
        label: 'Refine with analyst feedback',
        detail: 'The fastest path to production quality is iteration. Analysts run the tool, flag what needs improvement, and the prompts and pipeline are refined. Each round of feedback makes the output closer to what a senior analyst would produce.'
      },
      {
        label: 'Production deployment',
        detail: 'Branded IFC templates, verification layer, multi-engagement-type support, and analyst workflow integration. Scoped and ready to build once the engagement model is defined.'
      }
    ]
  }

];
