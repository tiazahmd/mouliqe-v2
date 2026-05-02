/* ==========================================================================
   JTI — POS Shopper Behavior Analytics Platform
   Mouliqe × Parlance Consulting Services Ltd.
   Proposal Presentation — 8 slides, visual-rich
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
    label: 'Technical Proposal',
    title: 'POS Shopper Behavior <br>Analytics Platform',
    subtitle: 'An AI-powered computer vision system for capturing, analyzing, and reporting in-store shopper behavior at the point of sale.',
    meta: 'Mouliqe &times; Parlance Consulting Services Ltd. &middot; May 2026'
  },

  // ---- 2. The Opportunity — stats type for visual impact ----
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
      { label: 'The gap is the opportunity', detail: 'Modern computer vision and AI make it possible to capture the same depth of behavioral data in a physical retail environment that digital platforms have had for decades — without requiring shoppers to wear devices, answer surveys, or change their behavior.' }
    ]
  },

  // ---- 3. What We Capture — grid with rich cards ----
  {
    id: 'what-we-capture',
    type: 'grid',
    title: 'What We Capture',
    subtitle: 'A full spectrum of shopper behavior metrics extracted from standard camera footage using computer vision and AI. Click any card for detail.',
    cards: [
      { label: 'Foot Traffic & Flow', tag: 'Movement', detail: 'Total visitor count, entry/exit patterns, peak hours, and movement paths through the retail space. Understand how shoppers navigate the store and which areas they visit before reaching the point of sale.' },
      { label: 'Dwell Time Analysis', tag: 'Attention', detail: 'How long shoppers spend in specific zones — at the counter, in front of product displays, near signage. Dwell time is one of the strongest predictors of purchase intent and brand engagement in physical retail.' },
      { label: 'Gaze Direction', tag: 'Gaze', detail: 'Head pose and gaze estimation to determine where shoppers are looking — which shelf sections, which product tiers, which signage placements capture visual attention. Produces attention heatmaps comparable to digital eye-tracking studies.' },
      { label: 'Product Interaction', tag: 'Engagement', detail: 'Detection of product pick-up, examination, and put-back events. Measures the gap between visual attention and physical engagement — a critical metric for understanding conversion at the shelf.' },
      { label: 'Attention Heatmaps', tag: 'Analytics', detail: 'Aggregated visual attention data rendered as spatial heatmaps overlaid on the store layout. Identifies hot zones (high attention) and dead zones (ignored areas) across the retail environment.' },
      { label: 'Demographic Segments', tag: 'Segments', detail: 'Anonymous age-range and gender estimation to segment behavioral patterns by demographic group. No facial recognition or personal identification — only aggregate statistical classification.' },
      { label: 'Queue & Purchase', tag: 'Conversion', detail: 'Time spent in queue, purchase completion patterns, and point-of-sale interaction duration. Correlates wait time with browsing behavior and impulse engagement at the counter.' },
      { label: 'Temporal Patterns', tag: 'Trends', detail: 'Behavioral variation by time of day, day of week, and seasonal trends. Identifies when specific shopper segments are most active and when attention to POS materials peaks or drops.' },
      { label: 'A/B Placement Testing', tag: 'Optimization', detail: 'Compare behavioral metrics across store groups with different product placements, signage positions, or display configurations. Statistically validate which arrangements drive the most attention and engagement.' }
    ]
  },

  // ---- 4. How It Works — split with SVG pipeline visual ----
  {
    id: 'how-it-works',
    type: 'content',
    layout: 'split',
    visual: 'processing-pipeline',
    title: 'How It Works',
    subtitle: 'Batch processing. No live streaming. No cloud dependency. No internet required at the retail site.',
    items: [
      {
        label: '01 — Capture',
        detail: 'Cameras record shopper activity during operating hours. Footage stored locally on-site. Camera placement optimized per store layout for maximum POS zone coverage.'
      },
      {
        label: '02 — Process',
        detail: 'Portable processing unit brought to site on schedule. Runs the full CV pipeline locally — person detection, skeleton tracking, head pose, gaze inference, zone dwell analysis. Raw footage never leaves the store.'
      },
      {
        label: '03 — Extract',
        detail: 'Pipeline outputs structured, anonymized data points — not video. Timestamps, zone attention scores, dwell durations, gaze heatmap coordinates, interaction events. All PII discarded during processing.'
      },
      {
        label: '04 — Analyze',
        detail: 'Data from all sites aggregated into central analytics platform. Dashboards, heatmaps, trend reports, A/B comparisons, and exportable raw data for custom analysis.'
      }
    ]
  },

  // ---- 5. The Platform — split with tech stack visual ----
  {
    id: 'platform',
    type: 'content',
    layout: 'split',
    visual: 'tech-stack',
    title: 'The Platform',
    subtitle: 'Three layers — edge processing, data pipeline, and analytics — designed to scale from 50 stores to nationwide deployment.',
    items: [
      {
        label: 'Edge Processing Engine',
        detail: 'Person detection and multi-object tracking. 3D skeleton reconstruction for body pose and head orientation. Gaze estimation from head pose — no wearables. Zone-based spatial analysis with configurable regions of interest per store.'
      },
      {
        label: 'Data Pipeline & Storage',
        detail: 'Full anonymization at the edge. Standardized schema across all sites. Batch upload from portable units to central warehouse. Scalable storage for historical trend analysis across the full pilot.'
      },
      {
        label: 'Analytics & Reporting',
        detail: 'Interactive dashboards with filtering by store, zone, time, and segment. Spatial attention heatmaps on store layouts. A/B comparison tools. Automated reports. API access for BI integration.'
      },
      {
        label: 'Per-Store Configuration',
        detail: 'Camera positions, zone definitions, region-of-interest boundaries — all adjustable without code changes. A kiosk and a large outlet use the same platform with different spatial configs.'
      }
    ]
  },

  // ---- 6. Partnership — split with partnership model visual ----
  {
    id: 'partnership',
    type: 'content',
    layout: 'split',
    visual: 'partnership-model',
    title: 'Mouliqe &times; Parlance',
    subtitle: 'A strategic technology partnership. Two firms, one integrated delivery.',
    items: [
      {
        label: 'Parlance Consulting Services Ltd.',
        detail: 'Market research and field operations. Client relationship, retailer recruitment, on-site logistics, camera installation, regulatory compliance, and research interpretation. Decades of consumer research methodology and direct retailer relationships across Bangladesh.'
      },
      {
        label: 'Mouliqe LLC',
        detail: 'AI architecture, computer vision platform, and analytics engine. Designs and builds the full technology stack — from edge processing pipeline to analytics dashboards. Production AI systems, data engineering infrastructure, and the architecture to turn raw footage into structured behavioral intelligence.'
      },
      {
        label: 'Integrated delivery',
        detail: 'Parlance defines what to measure and manages physical deployment. Mouliqe builds the tools that do the measuring. Research questions flow in as platform requirements. Structured data and analytics flow back as research outputs. The client receives one unified deliverable.'
      },
      {
        label: 'Why this model',
        detail: 'Market research without technology is limited to surveys and manual observation. Technology without research expertise produces data without context. This partnership ensures every capability is grounded in methodology, and every question is backed by a platform that can answer it at scale.'
      }
    ]
  },

  // ---- 7. Why Mouliqe — grid ----
  {
    id: 'why-mouliqe',
    type: 'grid',
    title: 'Why Mouliqe',
    subtitle: 'An AI solutions and data architecture consultancy. AI is only as good as the architecture underneath it. Click any card for detail.',
    cards: [
      { label: 'This Is What We Do', tag: 'Core', detail: 'Mouliqe specializes in AI solutions and architecture, data engineering and infrastructure, and analytics and business intelligence. This project sits at the intersection of all three — computer vision AI, edge-to-cloud data pipelines, and analytical dashboards. It is not adjacent to what we do. It is exactly what we do.' },
      { label: 'Production, Not Prototypes', tag: 'Delivery', detail: 'Systems designed for production — not demos that break under real conditions. The edge engine handles variable lighting, camera angles, and store layouts without manual tuning per site. Built by someone who has designed pipelines and automation platforms across Fortune-level companies, reducing manual processing by 80-95%.' },
      { label: 'Foundation First', tag: 'Philosophy', detail: 'Mouliqe — Bangla for "fundamental." Data architecture before AI code. Schema before dashboards. The platform is built to evolve, not to be rebuilt. Proper data engineering is fundamental to every business. Proper AI architecture is fundamental to every AI initiative.' },
      { label: 'Privacy by Architecture', tag: 'Design', detail: 'Privacy is an architectural decision, not a policy layer. Raw video never enters the data pipeline. Anonymization at the edge, during processing. The central platform only receives structured, non-identifiable data points.' },
      { label: 'Built to Transfer', tag: 'Sustainability', detail: 'Every system comes with interactive documentation for non-technical users. The goal is self-sufficiency — not recurring dependency. When the engagement ends, the platform is fully operational and maintainable.' },
      { label: 'Honest About AI', tag: 'Approach', detail: 'Camera-based gaze estimation is directional intelligence, not lab-grade precision. Honest expectations, validation layers, and outputs framed as research-grade behavioral signals. Accuracy reported transparently and calibrated against ground-truth during the pilot.' }
    ]
  },

  // ---- 8. Next Steps ----
  {
    id: 'next-steps',
    type: 'content',
    layout: 'hero',
    title: 'Next Steps',
    body: 'This presentation outlines the platform architecture and partnership model. The following steps move from concept to execution.',
    items: [
      {
        label: 'Define pilot parameters',
        detail: 'Number of retail sites, store types, geographic distribution, pilot duration, and specific research questions. These drive hardware specs, processing schedules, and analytics configuration.'
      },
      {
        label: 'Technical blueprint',
        detail: 'Detailed architecture document: hardware specifications, software stack, data schema, processing pipeline design, dashboard wireframes, and deployment plan.'
      },
      {
        label: 'Pilot site assessment',
        detail: 'On-site evaluation of representative locations for camera placement, power/storage requirements, and physical constraints. Joint Parlance (field) and Mouliqe (technical) assessment.'
      },
      {
        label: 'Scope, timeline, and investment',
        detail: 'With parameters and site assessment complete, a detailed scope of work with timeline, milestones, and investment breakdown — grounded in actual requirements, not estimates.'
      }
    ]
  }

];
