/* ==========================================================================
   bKash — POS Customer Behavior Analytics Platform
   Mouliqe × Parlance Consulting Services Ltd.
   Pre-Proposal Presentation — 10 slides
   ========================================================================== */

export const meta = {
  title: 'POS Customer Behavior Analytics Platform',
  client: 'bKash Limited',
  author: 'Mouliqe × Parlance Consulting',
  date: 'May 2026'
};

export const slides = [

  {
    id: 'title',
    type: 'title',
    label: 'Pre-Proposal',
    title: 'POS Customer Behavior <br>Analytics Platform',
    subtitle: 'From pilot data collection to a proprietary placement optimization model — an end-to-end vision for maximizing digital payment adoption across the merchant and agent network.',
    meta: 'Mouliqe &times; Parlance Consulting Services Ltd. &middot; May 2026'
  },

  {
    id: 'opportunity',
    type: 'stats',
    title: 'The Opportunity',
    subtitle: 'bKash has 82 million customers and over 1 million merchants — but the majority of transactions remain cash-based. The gap between network reach and payment adoption is the single largest growth lever. Understanding what happens at the physical point of interaction is the key to closing it.',
    stats: [
      { value: '82M+', label: 'Verified customers' },
      { value: '1M+', label: 'Merchants nationwide' },
      { value: '360K+', label: 'Agent points' },
      { value: '?', label: 'QR payment conversion rate' }
    ],
    chart: {
      type: 'bar',
      title: 'Digital Payment Adoption Barriers at Physical POS',
      items: [
        { label: 'QR code not visible', value: 85, color: 'accent' },
        { label: 'Signage poorly placed', value: 78, color: 'accent' },
        { label: 'Customer defaults to cash', value: 92, color: 'blue' },
        { label: 'No prompt from merchant', value: 70, color: 'blue' },
        { label: 'Layout discourages scan', value: 65, color: 'amber' },
        { label: 'Queue blocks QR display', value: 55, color: 'amber' }
      ],
      unit: '%'
    },
    items: [
      { label: 'The blind spot', detail: 'bKash knows transaction volumes per merchant. It does not know why some locations convert and others do not. The answer is in the physical environment — where the QR code sits, whether customers see the signage, how the layout shapes behavior. That data does not exist today.' }
    ]
  },

  {
    id: 'vision',
    type: 'content',
    layout: 'split',
    visual: 'vision-roadmap',
    title: 'The Vision',
    subtitle: 'Three phases — from behavioral data collection to a scalable tool that optimizes every merchant and agent location in the network without cameras.',
    items: [
      {
        label: 'Phase 1 — The Pilot',
        detail: 'Install cameras at 50-100 merchant and agent locations across diverse formats. Capture customer behavior data: foot traffic, dwell time, gaze direction, QR code visibility, signage attention, queue dynamics. Build the labeled dataset that maps physical layouts to payment behavior patterns.'
      },
      {
        label: 'Phase 2 — The Model',
        detail: 'Use pilot data to develop a proprietary algorithm that predicts optimal QR code, signage, and branding placement based on location geometry, layout type, and customer interaction patterns. The model learns what the cameras observed — which configurations drive the highest digital payment engagement.'
      },
      {
        label: 'Phase 3 — The Tool',
        detail: 'A standalone tool for field teams. Upload a photo of any merchant or agent location, answer a few questions about dimensions and layout, and the system outputs ideal placement recommendations for QR codes, signage, and promotional materials. No cameras. Scales to every location in the 1M+ merchant network.'
      }
    ]
  },

  {
    id: 'what-we-capture',
    type: 'grid',
    title: 'What We Capture',
    subtitle: 'Phase 1 produces the richest behavioral dataset on customer interaction at bKash merchant and agent points. Every metric feeds the predictive model in Phase 2. Click any card for detail.',
    cards: [
      { label: 'Foot Traffic & Flow', tag: 'Movement', detail: 'Customer count, entry patterns, peak hours, and movement paths. How customers approach the counter and which areas they pass through before transacting.' },
      { label: 'QR Code Visibility', tag: 'Critical', detail: 'Whether customers visually engage with the bKash QR code before, during, or after the transaction. Measures the gap between QR presence and QR attention — the core conversion metric.' },
      { label: 'Signage & Branding Attention', tag: 'Gaze', detail: 'Head pose and gaze estimation on bKash signage, promotional materials, and branding elements. Which placements capture attention and which are invisible to customers.' },
      { label: 'Dwell Time Analysis', tag: 'Attention', detail: 'Time spent at the counter, in queue, and near promotional displays. Longer dwell creates more opportunity for signage to influence payment method choice.' },
      { label: 'Queue Behavior', tag: 'Dynamics', detail: 'Queue formation patterns, wait times, and what customers look at while waiting. Queue time is an untapped window for influencing payment behavior through strategic signage placement.' },
      { label: 'Transaction Point Interaction', tag: 'Engagement', detail: 'How customers interact at the payment counter — phone usage patterns, cash handling vs. phone scanning behavior, merchant-customer exchange dynamics.' },
      { label: 'Demographic Segments', tag: 'Segments', detail: 'Anonymous age-range and gender estimation for behavioral segmentation. No facial recognition — aggregate statistical classification to understand which segments are more receptive to digital payment prompts.' },
      { label: 'Temporal Patterns', tag: 'Trends', detail: 'Behavioral variation by time of day, day of week, and season. Identifies peak windows when customers are most receptive to digital payment adoption.' },
      { label: 'Layout-Conversion Mapping', tag: 'Model Input', detail: 'The key Phase 2 input: correlating physical layout, QR placement, and signage positions with measured customer attention and payment behavior. This is what makes the predictive model possible.' }
    ]
  },

  {
    id: 'phase1',
    type: 'content',
    layout: 'split',
    visual: 'processing-pipeline',
    title: 'Phase 1: The Pilot',
    subtitle: 'Batch processing. No live streaming. No cloud dependency. No internet required at the location. Raw footage never leaves the site.',
    items: [
      {
        label: '01 — Capture',
        detail: 'Cameras record customer activity at merchant counters and agent points. Footage stored locally. Camera placement optimized per location for maximum coverage of QR display zones, signage areas, and transaction points.'
      },
      {
        label: '02 — Process',
        detail: 'Portable unit runs the full CV pipeline on-site — person detection, skeleton tracking, head pose, gaze inference, zone dwell analysis, queue dynamics. Raw footage never leaves the location.'
      },
      {
        label: '03 — Extract',
        detail: 'Structured, anonymized data points — not video. Timestamps, QR attention scores, signage dwell durations, gaze coordinates, queue metrics, transaction point interaction events. All PII discarded during processing.'
      },
      {
        label: '04 — Analyze',
        detail: 'Data from all sites aggregated into central platform. Dashboards, attention heatmaps, conversion correlation reports. Plus: the labeled dataset that feeds Phase 2 model training — mapping layouts to payment behavior.'
      }
    ]
  },

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
        detail: 'Location geometry (dimensions, layout type, counter position, queue area). QR code and signage placement positions. Measured attention data from Phase 1 — where customers looked, whether they noticed the QR code, how long they engaged with signage, what they ignored.'
      },
      {
        label: 'What the model learns',
        detail: 'The relationship between physical environment and digital payment behavior. Which QR positions maximize scan probability. How signage placement affects payment method choice. Which layout configurations create natural attention toward bKash branding. Where queue-time signage drives the highest conversion.'
      },
      {
        label: 'What comes out',
        detail: 'A predictive algorithm that takes location layout parameters as input and outputs optimal placement recommendations for QR codes, signage, and promotional materials — without needing cameras or on-site observation.'
      },
      {
        label: 'Why it improves over time',
        detail: 'Every new location and every new layout format adds training data. The model becomes more accurate as the network expands — delivering better recommendations with each new merchant or agent point onboarded.'
      }
    ]
  },

  {
    id: 'phase3',
    type: 'content',
    layout: 'split',
    visual: 'product-flow',
    title: 'Phase 3: The Tool',
    subtitle: 'No cameras. No installation. No on-site hardware. Placement optimization scaled to every location in the network.',
    items: [
      {
        label: 'Upload a photo',
        detail: 'A field representative takes a photo of the merchant or agent location. The system analyzes the spatial layout — identifying counter positions, display areas, queue zones, and existing signage locations.'
      },
      {
        label: 'Answer a few questions',
        detail: 'Location square footage, layout type, average daily footfall, transaction volume, and any placement constraints. Simple form designed for field reps — no technical knowledge required.'
      },
      {
        label: 'Get placement recommendations',
        detail: 'The model outputs a visual placement map: where to position QR codes, signage, and promotional materials for maximum customer attention and digital payment conversion. Recommendations ranked by predicted impact with confidence scores.'
      },
      {
        label: 'Scales across the network',
        detail: 'The pilot covers 50-100 locations with cameras. The tool covers every location without them. With 1 million+ merchants and 360,000+ agents, the ability to optimize placement at scale — without per-location camera installation — transforms how bKash drives adoption across the entire network.'
      }
    ]
  },

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
        detail: 'Market research and field operations. Client relationship, location recruitment, on-site logistics, camera installation, regulatory compliance, and research interpretation. Decades of consumer research methodology and direct relationships across Bangladesh.'
      },
      {
        label: 'Mouliqe LLC',
        detail: 'AI architecture, computer vision platform, model development, and product engineering. Designs and builds the full technology stack — from the Phase 1 edge processing pipeline through the Phase 2 predictive model to the Phase 3 standalone tool.'
      },
      {
        label: 'Integrated delivery',
        detail: 'Parlance defines what to measure and manages physical deployment. Mouliqe builds the tools, develops the model, and engineers the product. Research questions flow in as requirements. Data, analytics, and a scalable optimization tool flow back.'
      },
      {
        label: 'Why this model',
        detail: 'Market research without technology is limited to surveys and manual observation. Technology without research expertise produces data without context. This partnership ensures every phase — from pilot to product — is grounded in both.'
      }
    ]
  },

  {
    id: 'why-mouliqe',
    type: 'grid',
    title: 'Why Mouliqe',
    subtitle: 'An AI solutions and data architecture consultancy. AI is only as good as the architecture underneath it. Click any card for detail.',
    cards: [
      { label: 'This Is What We Do', tag: 'Core', detail: 'Mouliqe specializes in AI solutions and architecture, data engineering and infrastructure, and analytics and business intelligence. This project — computer vision, predictive modeling, edge-to-cloud pipelines, and a scalable tool — sits at the intersection of all three.' },
      { label: 'Production, Not Prototypes', tag: 'Delivery', detail: 'Systems designed for production — not demos that break under real conditions. Built by someone who has designed pipelines and automation platforms across Fortune-level companies, reducing manual processing by 80-95%.' },
      { label: 'Foundation First', tag: 'Philosophy', detail: 'Mouliqe — Bangla for "fundamental." Data architecture before AI code. Schema before dashboards. The platform is built to evolve from pilot to product, not to be rebuilt at each phase.' },
      { label: 'Privacy by Architecture', tag: 'Design', detail: 'Raw video never enters the data pipeline. Anonymization at the edge. The central platform only receives structured, non-identifiable data points. This is how the system is designed, not a feature bolted on.' },
      { label: 'Model-First Thinking', tag: 'Strategy', detail: 'Phase 1 is not just data collection — it is training data acquisition. Every design decision in the pilot is made with Phase 2 model development in mind. The data schema, zone definitions, and labeling strategy are all optimized for downstream model training.' },
      { label: 'Honest About AI', tag: 'Approach', detail: 'Camera-based gaze estimation is directional intelligence, not lab-grade precision. Accuracy reported transparently, calibrated against ground-truth, and framed as research-grade behavioral signals.' }
    ]
  },

  {
    id: 'next-steps',
    type: 'content',
    layout: 'hero',
    title: 'Next Steps',
    body: 'This pre-proposal outlines the full vision — from pilot data collection through proprietary model development to a scalable optimization tool. The following steps move from concept to execution.',
    items: [
      {
        label: 'Define pilot parameters',
        detail: 'Number of locations, mix of merchant vs. agent points, geographic distribution, pilot duration, and specific research questions. These drive hardware specs, processing schedules, and the diversity of training data for Phase 2.'
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
        detail: 'A comprehensive proposal covering all three phases — pilot execution, model development, and tool roadmap — with detailed timelines, milestones, and investment breakdown.'
      }
    ]
  }

];
