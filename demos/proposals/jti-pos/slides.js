/* ==========================================================================
   JTI — POS Shopper Behavior Analytics Platform
   Mouliqe × Parlance Consulting Services Ltd.
   Pre-Proposal Presentation — 10 slides, full 3-phase vision
   ========================================================================== */

export const meta = {
  title: 'POS Shopper Behavior Analytics Platform',
  client: 'Japan Tobacco International',
  author: 'Mouliqe × Parlance Consulting',
  date: 'May 2026'
};

export const slides = [

  // ---- 1. Title ----
  {
    id: 'title',
    type: 'title',
    label: 'Pre-Proposal',
    title: 'POS Shopper Behavior <br>Analytics Platform',
    subtitle: 'From pilot data collection to a proprietary placement optimization model — an end-to-end vision for transforming point-of-sale decisions across the entire retail network.',
    meta: 'Mouliqe &times; Parlance Consulting Services Ltd. &middot; May 2026'
  },

  // ---- 2. The Opportunity ----
  {
    id: 'opportunity',
    type: 'stats',
    title: 'The Opportunity',
    subtitle: 'E-commerce tracks every click, scroll, and hover. Physical retail tracks almost nothing. There is no heatmap, session recording, or conversion funnel for a shopper standing at a counter. Placement decisions are made on intuition, not evidence.',
    stats: [
      { value: '0%', label: 'POS behavior data captured' },
      { value: '100%', label: 'Placement decisions by intuition' },
      { value: '$5.3B', label: 'Global in-store analytics market' },
      { value: '21.8%', label: 'Market CAGR through 2030' }
    ],
    chart: {
      type: 'bar',
      title: 'Digital vs. Physical Retail Intelligence',
      items: [
        { label: 'Click tracking', value: 99, color: 'blue' },
        { label: 'Scroll heatmaps', value: 95, color: 'blue' },
        { label: 'Session recording', value: 90, color: 'blue' },
        { label: 'Conversion funnels', value: 88, color: 'blue' },
        { label: 'POS foot traffic', value: 8, color: 'accent' },
        { label: 'Shelf attention data', value: 2, color: 'accent' },
        { label: 'Gaze / eye tracking', value: 1, color: 'accent' }
      ],
      unit: '%'
    },
    items: [
      { label: 'The gap is the opportunity', detail: 'Modern computer vision and AI make it possible to capture the same depth of behavioral data in physical retail that digital platforms have had for decades — and then go further: build a predictive model that eliminates the need for cameras entirely.' }
    ]
  },

  // ---- 3. The Vision — 3-phase overview ----
  {
    id: 'vision',
    type: 'content',
    layout: 'split',
    visual: 'vision-roadmap',
    title: 'The Vision',
    subtitle: 'Three phases — from data collection to a scalable tool that optimizes placement across the entire retail network without cameras.',
    items: [
      {
        label: 'Phase 1 — The Pilot',
        detail: 'Install cameras at 50-100 retail locations. Capture rich shopper behavior data: foot traffic, dwell time, gaze direction, attention heatmaps, product interaction. Build the labeled dataset that maps store layouts to attention patterns. JTI-sponsored, Parlance-operated, Mouliqe-engineered.'
      },
      {
        label: 'Phase 2 — The Model',
        detail: 'Use pilot data to develop a proprietary algorithm that predicts optimal product placement based on store geometry, layout type, and customer interaction patterns. The model learns what the cameras observed — which positions maximize visual attention and engagement.'
      },
      {
        label: 'Phase 3 — The Product',
        detail: 'A standalone tool for field teams. Upload a photo of any retail location or POS area, answer a few questions about dimensions and layout, and the system outputs ideal placement recommendations. No cameras. No on-site hardware. No per-store installation. Placement optimization scaled across the entire retail network.'
      }
    ]
  },

  // ---- 4. What We Capture ----
  {
    id: 'what-we-capture',
    type: 'grid',
    title: 'What We Capture',
    subtitle: 'Phase 1 produces the richest POS behavioral dataset in the market. Every metric feeds the predictive model in Phase 2. Click any card for detail.',
    cards: [
      { label: 'Foot Traffic & Flow', tag: 'Movement', detail: 'Total visitor count, entry/exit patterns, peak hours, and movement paths. Understand how shoppers navigate the store before reaching the point of sale.' },
      { label: 'Dwell Time Analysis', tag: 'Attention', detail: 'Time spent in specific zones — counter, product displays, signage. One of the strongest predictors of purchase intent in physical retail.' },
      { label: 'Gaze Direction', tag: 'Gaze', detail: 'Head pose and gaze estimation — which shelf sections, product tiers, and signage capture visual attention. Produces heatmaps comparable to digital eye-tracking.' },
      { label: 'Product Interaction', tag: 'Engagement', detail: 'Pick-up, examination, and put-back detection. Measures the gap between visual attention and physical engagement — critical for conversion analysis.' },
      { label: 'Attention Heatmaps', tag: 'Analytics', detail: 'Aggregated visual attention rendered as spatial heatmaps overlaid on store layouts. Hot zones and dead zones across the retail environment.' },
      { label: 'Demographic Segments', tag: 'Segments', detail: 'Anonymous age-range and gender estimation for behavioral segmentation. No facial recognition or PII — aggregate statistical classification only.' },
      { label: 'Queue & Purchase', tag: 'Conversion', detail: 'Queue time, purchase patterns, POS interaction duration. Correlates wait time with browsing behavior and impulse engagement.' },
      { label: 'Temporal Patterns', tag: 'Trends', detail: 'Behavioral variation by time of day, day of week, and season. Identifies peak attention windows for placement optimization.' },
      { label: 'Layout-Attention Mapping', tag: 'Model Input', detail: 'The key Phase 2 input: correlating store geometry and product positions with measured attention data. This is what makes the predictive model possible.' }
    ]
  },

  // ---- 5. Phase 1: The Pilot ----
  {
    id: 'phase1',
    type: 'content',
    layout: 'split',
    visual: 'processing-pipeline',
    title: 'Phase 1: The Pilot',
    subtitle: 'Batch processing. No live streaming. No cloud dependency. No internet required at the retail site. Raw footage never leaves the store.',
    items: [
      {
        label: '01 — Capture',
        detail: 'Cameras record in-store activity. Footage stored locally. Camera placement optimized per store for maximum POS zone coverage.'
      },
      {
        label: '02 — Process',
        detail: 'Portable unit runs the full CV pipeline on-site — person detection, skeleton tracking, head pose, gaze inference, zone dwell analysis. Raw footage never leaves the store.'
      },
      {
        label: '03 — Extract',
        detail: 'Structured, anonymized data points — not video. Timestamps, attention scores, dwell durations, gaze coordinates, interaction events. All PII discarded during processing.'
      },
      {
        label: '04 — Analyze',
        detail: 'Data from all sites aggregated into central platform. Dashboards, heatmaps, trend reports, A/B comparisons. Plus: the labeled dataset that feeds Phase 2 model training.'
      }
    ]
  },

  // ---- 6. Phase 2: The Model ----
  {
    id: 'phase2',
    type: 'content',
    layout: 'split',
    visual: 'model-training',
    title: 'Phase 2: The Model',
    subtitle: 'The pilot data becomes the training set for a proprietary placement optimization algorithm.',
    items: [
      {
        label: 'What goes in',
        detail: 'Store geometry (dimensions, layout type, counter position, shelf configuration). Product and signage placement positions. Measured attention data from Phase 1 — where shoppers looked, how long they engaged, what they interacted with, what they ignored.'
      },
      {
        label: 'What the model learns',
        detail: 'The relationship between physical space and human attention. Which positions in a given layout type maximize visual engagement. How store geometry affects traffic flow and gaze patterns. Which placement strategies outperform across different store formats.'
      },
      {
        label: 'What comes out',
        detail: 'A predictive algorithm that takes store layout parameters as input and outputs optimal placement recommendations — without needing cameras, on-site hardware, or behavioral observation. The model encodes what the cameras learned.'
      },
      {
        label: 'Why it improves over time',
        detail: 'Every new store and every new layout format adds training data. The model gets more accurate and more generalizable with scale. As the retail network expands, the algorithm continuously improves — delivering better recommendations with each new location onboarded.'
      }
    ]
  },

  // ---- 7. Phase 3: The Product ----
  {
    id: 'phase3',
    type: 'content',
    layout: 'split',
    visual: 'product-flow',
    title: 'Phase 3: The Product',
    subtitle: 'No cameras. No installation. No on-site hardware. Placement optimization scaled to every retail location in the network.',
    items: [
      {
        label: 'Upload a photo',
        detail: 'A field representative takes a photo of the retail location or POS area. The system uses computer vision to analyze the spatial layout — identifying shelves, counter positions, display areas, and traffic entry points.'
      },
      {
        label: 'Answer a few questions',
        detail: 'Store square footage, layout type, product categories, traffic volume estimate, and any placement constraints. Simple form — no technical knowledge required. Designed for field reps and merchandisers.'
      },
      {
        label: 'Get placement recommendations',
        detail: 'The model outputs a visual placement map: where to position products, signage, and displays for maximum shopper attention. Recommendations are ranked by predicted impact and annotated with confidence scores.'
      },
      {
        label: 'Scales across the network',
        detail: 'The pilot covers 50-100 stores with cameras. The product covers every store without them. New locations are onboarded in minutes — a photo and a questionnaire — giving field teams data-driven placement guidance at every retail touchpoint in the network.'
      }
    ]
  },

  // ---- 8. The Partnership ----
  {
    id: 'partnership',
    type: 'content',
    layout: 'split',
    visual: 'partnership-model',
    title: 'Mouliqe &times; Parlance',
    subtitle: 'A strategic technology partnership. Two firms, one integrated delivery across all three phases.',
    items: [
      {
        label: 'Parlance Consulting Services Ltd.',
        detail: 'Market research and field operations. Client relationship, retailer recruitment, on-site logistics, camera installation, regulatory compliance, and research interpretation. Decades of consumer research methodology and direct retailer relationships across Bangladesh.'
      },
      {
        label: 'Mouliqe LLC',
        detail: 'AI architecture, computer vision platform, model development, and product engineering. Designs and builds the full technology stack — from the Phase 1 edge processing pipeline through the Phase 2 predictive model to the Phase 3 standalone product.'
      },
      {
        label: 'Integrated delivery',
        detail: 'Parlance defines what to measure and manages physical deployment. Mouliqe builds the tools, develops the model, and engineers the product. Research questions flow in as requirements. Data, analytics, and eventually a scalable product flow back.'
      },
      {
        label: 'Why this model',
        detail: 'Market research without technology is limited to surveys and manual observation. Technology without research expertise produces data without context. This partnership ensures every phase — from pilot to product — is grounded in both.'
      }
    ]
  },

  // ---- 9. Why Mouliqe ----
  {
    id: 'why-mouliqe',
    type: 'grid',
    title: 'Why Mouliqe',
    subtitle: 'An AI solutions and data architecture consultancy. AI is only as good as the architecture underneath it. Click any card for detail.',
    cards: [
      { label: 'This Is What We Do', tag: 'Core', detail: 'Mouliqe specializes in AI solutions and architecture, data engineering and infrastructure, and analytics and business intelligence. This project — computer vision, predictive modeling, edge-to-cloud pipelines, and a scalable product — sits at the intersection of all three.' },
      { label: 'Production, Not Prototypes', tag: 'Delivery', detail: 'Systems designed for production — not demos that break under real conditions. Built by someone who has designed pipelines and automation platforms across Fortune-level companies, reducing manual processing by 80-95%.' },
      { label: 'Foundation First', tag: 'Philosophy', detail: 'Mouliqe — Bangla for "fundamental." Data architecture before AI code. Schema before dashboards. The platform is built to evolve from pilot to product, not to be rebuilt at each phase.' },
      { label: 'Privacy by Architecture', tag: 'Design', detail: 'Raw video never enters the data pipeline. Anonymization at the edge. The central platform only receives structured, non-identifiable data points. This is how the system is designed, not a feature bolted on.' },
      { label: 'Model-First Thinking', tag: 'Strategy', detail: 'Phase 1 is not just data collection — it is training data acquisition. Every design decision in the pilot is made with Phase 2 model development in mind. The data schema, zone definitions, and labeling strategy are all optimized for downstream model training.' },
      { label: 'Honest About AI', tag: 'Approach', detail: 'Camera-based gaze estimation is directional intelligence, not lab-grade precision. Accuracy reported transparently, calibrated against ground-truth, and framed as research-grade behavioral signals.' }
    ]
  },

  // ---- 10. Next Steps ----
  {
    id: 'next-steps',
    type: 'content',
    layout: 'hero',
    title: 'Next Steps',
    body: 'This pre-proposal outlines the full vision — from pilot data collection through proprietary model development to a scalable product. The following steps move from concept to execution.',
    items: [
      {
        label: 'Define pilot parameters',
        detail: 'Number of retail sites, store types, geographic distribution, pilot duration, and specific research questions. These drive hardware specs, processing schedules, and — critically — the diversity of training data for Phase 2.'
      },
      {
        label: 'Technical blueprint',
        detail: 'Detailed architecture document covering the Phase 1 platform: hardware, software stack, data schema, processing pipeline, dashboard wireframes, and deployment plan.'
      },
      {
        label: 'Pilot site assessment',
        detail: 'On-site evaluation of representative locations for camera placement, power/storage requirements, and physical constraints. Joint Parlance (field) and Mouliqe (technical) assessment.'
      },
      {
        label: 'Full proposal with scope, timeline, and investment',
        detail: 'A comprehensive proposal covering all three phases — pilot execution, model development, and product roadmap — with detailed timelines, milestones, and investment breakdown.'
      }
    ]
  }

];
