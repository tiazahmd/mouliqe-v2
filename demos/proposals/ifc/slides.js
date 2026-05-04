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
    subtitle: 'Automated research and pitch deck generation for IFC sell-side advisory engagements — from company name to presentation-ready pitch deck.',
    meta: 'Mouliqe LLC &middot; May 2026'
  },

  {
    id: 'problem',
    type: 'stats',
    title: 'The Problem',
    subtitle: 'Every sell-side advisory engagement begins with a pitch deck. Building one requires deep research across company financials, industry dynamics, country macro, and IFC track record — then structuring it into a presentation-ready deck. The research is thorough but repetitive. The assembly is manual. The time cost is significant.',
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
        detail: 'This is not a replacement for analyst judgment. It is a first draft generator. The engine handles the research grunt work and initial assembly. The analyst reviews, edits, adds proprietary context, and makes the final call on what goes to the client. No proprietary IFC information is uploaded or shared at any point.'
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
        detail: 'A structured pitch deck covering all standard sections. Each slide includes sourced data points, financial figures where available, and IFC content. The output is a starting point — designed for analyst review and refinement, not final delivery.'
      },
      {
        label: 'Built for iteration',
        detail: 'The demo represents the core pipeline. Production enhancements — branded IFC templates, multi-engagement-type support, verification layer, and analyst feedback loops — are on the roadmap.'
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
    subtitle: 'A structured pitch deck tailored to the company, sector, and engagement type. Designed to save 90% of the manual work — the analyst reviews and refines, not builds from scratch. Click any card for detail.',
    cards: [
      { label: 'Cover & Disclaimer', tag: 'Standard', detail: 'Company name, country, sector, engagement type, IFC branding, and standard IFC disclaimer. Template-driven — no research required.' },
      { label: 'Executive Summary', tag: 'Generated', detail: 'Key messages synthesized from the full deck: our understanding of the client, how IFC can support, IFC track record, and next steps. Created last — after all other sections are populated.' },
      { label: 'Why IFC', tag: 'IFC Content', detail: 'Who IFC is, World Bank Group overview, unique capabilities, global reach. Mostly standard IFC slides that slot in directly — provided by the team.' },
      { label: 'IFC Track Record', tag: 'Researched', detail: 'IFC experience in the relevant sector and region. Select tombstones of past transactions — project name, country, year, one-liner. Sourced from IFC disclosure pages and public project data.' },
      { label: 'Our Understanding of Client', tag: 'Researched', detail: 'Who the client is, what they do, where they operate, their pipeline of projects. The core research-driven section — built from web search, client website, and any uploaded documents.' },
      { label: 'Investment Highlights', tag: 'Generated', detail: 'Four to six bullet points on why investors should be interested in this company. Generated from research — looks specific but follows a repeatable pattern across engagements.' },
      { label: 'Transaction Structure', tag: 'Template', detail: 'Current investors on the left, space for new investors on the right. Standard layout with a few variations — the tool picks one and the analyst adjusts.' },
      { label: 'Indicative Investors', tag: 'Researched', detail: 'Key players who invest in this sector, organized by category. Names, country, AUM, and a two-line description. Sourced from public data — presented without identifying specific targets.' },
      { label: 'Scope of Work & Timeline', tag: 'IFC Content', detail: 'Standard sell-side advisory process: preparation, outreach, due diligence, negotiation, closing. Boilerplate slides provided by the team. Fee structure left blank for the deal team.' },
      { label: 'Next Steps & Deal Team', tag: 'Standard', detail: 'Standard next steps to advance the mandate. Deal team profiles in the annex — names and bios provided by the team, formatted by the engine.' }
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
        detail: 'Branded IFC PPTX templates — provide a few existing decks to emulate and the engine matches that look and feel. Research verification agent (cross-references sources, flags contradictions), support for additional engagement types, and analyst feedback loops for continuous prompt improvement.'
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
        label: 'Refine with analyst feedback',
        detail: 'The fastest path to production quality is iteration. Analysts run the tool, flag what needs improvement, and the prompts and pipeline are refined. Each round of feedback makes the output closer to what a senior analyst would produce.'
      },
      {
        label: 'Production deployment',
        detail: 'Branded IFC templates, verification layer, multi-engagement-type support, and analyst workflow integration. Scoped and ready to build.'
      }
    ]
  }

];
