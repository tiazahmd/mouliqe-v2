/* ==========================================================================
   Greeley, CO — Proposal Presentation Slide Data (v2)
   4 workstreams, expanded ROI, chart data
   ========================================================================== */

export const meta = {
  title: 'AI Strategy & Data Infrastructure Assessment',
  client: 'City of Greeley, Colorado',
  author: 'Mouliqe Consulting',
  date: 'May 2026'
};

export const slides = [

  // ---- 1. Title ----
  {
    id: 'title',
    type: 'title',
    label: 'Stage 01 — Diagnosis',
    title: 'AI Strategy &amp; Data Infrastructure Assessment',
    subtitle: 'City of Greeley, Colorado',
    meta: 'Prepared by Mouliqe Consulting &middot; May 2026'
  },

  // ---- 2. The Opportunity ----
  {
    id: 'opportunity',
    type: 'content',
    layout: 'split',
    visual: 'disconnected-systems',
    title: 'The Opportunity',
    body: 'Greeley is at an inflection point. After a year of building an Innovation and High Performance department, investing in enterprise AI tools, and modernizing citizen-facing platforms, the city has made meaningful progress. But budget reductions and staffing constraints are creating pressure to demonstrate value quickly and do more with less.',
    items: [
      {
        label: 'The challenge is not technology',
        detail: 'Greeley already has capable tools in place. The challenge is that these investments are operating in isolation. There is no unified data layer connecting them, no dedicated ownership of integration, and no governance framework ensuring AI output reliability.'
      },
      {
        label: 'The workforce reality',
        detail: 'Greeley\'s departments span desk-based IT staff to field crews in public works and public safety with no on-site computer access. Any AI strategy that only serves the desk-bound half of the organization will fail to deliver broad-based enablement.'
      },
      {
        label: 'What Greeley needs',
        detail: 'Not another tool. A structured approach to connecting what already exists, validating what AI produces, and building the internal capacity to maintain and evolve these systems over time.'
      }
    ]
  },

  // ---- 3. What We Heard ----
  {
    id: 'what-we-heard',
    type: 'grid',
    title: 'What We Heard',
    subtitle: 'Key findings from our discovery conversation and follow-up. Click any card for detail.',
    cards: [
      { label: 'No Unified Data Layer', tag: 'Infrastructure', detail: 'All major systems operate independently. There is no centralized data warehouse, integration bus, or API orchestration layer connecting them. Cross-department data requests are manual and ad hoc.' },
      { label: 'No Data Engineering Capacity', tag: 'Staffing', detail: 'The city has no data engineers on staff. IT lacks a designated owner for API connections and AI integration work. Even when systems have APIs available, there is no one positioned to build and maintain the connections.' },
      { label: 'No Source of Truth Governance', tag: 'Governance', detail: 'Multiple systems contain overlapping or conflicting data. There is no formal framework defining which system is authoritative for which type of information, how conflicts are resolved, or how AI-connected data is kept current.' },
      { label: 'Citizen-Facing AI Accuracy Risk', tag: 'Risk', detail: 'The Copilot chatbot and the upcoming Zoom 311 virtual agent both surface information to residents. Without a validation layer and a defined process for keeping knowledge bases current, there is a risk of providing outdated or incorrect information at scale.' },
      { label: 'No Cross-Department Visibility', tag: 'Operations', detail: 'Leadership lacks a unified view of operational metrics across departments. When cross-department data is needed, it is assembled manually from individual systems — a time-consuming process that limits data-driven decision making.' },
      { label: 'Investment Story Gap', tag: 'Strategy', detail: 'The Innovation department has made real progress, but the tools to quantify and communicate that progress to leadership and budget decision-makers are not in place. During budget reductions, the ability to articulate ROI in concrete terms is essential.' }
    ]
  },

  // ---- 4. Current Technology Landscape ----
  {
    id: 'landscape',
    type: 'grid',
    title: 'Current Technology Landscape',
    subtitle: '16 systems confirmed across cloud and on-premise environments. Click any system for details.',
    cards: [
      { label: 'Microsoft Azure', tag: 'Cloud Infrastructure', detail: 'Primary cloud platform for the city\'s technology environment.' },
      { label: 'Oracle ERP', tag: 'Cloud', detail: 'Cloud-based enterprise resource planning system handling financials and core business processes.' },
      { label: 'Cityworks (Trimble)', tag: 'Asset Management', detail: 'Public works work orders, asset tracking, and maintenance scheduling. Processes several thousand work orders per month.' },
      { label: 'ArcGIS (Esri)', tag: 'GIS', detail: 'Geospatial data, mapping, and spatial analysis across departments.' },
      { label: 'Granicus OneView', tag: '311 Platform', detail: 'Citizen service request management via portal and mobile app.' },
      { label: 'Zoom Call Center', tag: '311 Voice', detail: 'Phone-based citizen services with AI-powered virtual agent routing. Currently rolling out.' },
      { label: 'GovAI', tag: 'Enterprise AI', detail: 'Enterprise-wide generative AI platform with ChatGPT backbone. ~200 active users. 4 knowledge base agents deployed.' },
      { label: 'Microsoft Copilot', tag: 'Website Chatbot', detail: 'Public-facing chatbot on city website. Team has expressed dissatisfaction with performance.' },
      { label: 'SharePoint', tag: 'Collaboration', detail: 'Document management, internal knowledge bases, and data source for GovAI agents.' },
      { label: 'Granicus SpeakUp', tag: 'Engagement', detail: 'Public surveys, feedback, and community engagement platform.' },
      { label: 'Granicus GovDelivery', tag: 'Communications', detail: 'Email newsletter communications to residents.' },
      { label: 'Granicus CivicClerk', tag: 'Meetings', detail: 'Council agendas, minutes, and public meeting records.' },
      { label: 'Questica OpenBook', tag: 'Budget', detail: 'Public-facing budget transparency dashboard.' },
      { label: 'Trakit (Central Square)', tag: 'Permitting', detail: 'Building permits, business licenses, and land use tracking.' },
      { label: 'BidNet Direct', tag: 'Procurement', detail: 'RFPs, bids, and vendor management through RMEPS.' },
      { label: 'Sitecore Content Hub', tag: 'Website CMS', detail: 'City website content management system.' }
    ]
  },

  // ---- 5. AI Adoption Today ----
  {
    id: 'ai-adoption',
    type: 'content',
    layout: 'split',
    visual: 'ai-adoption-stats',
    title: 'AI Adoption Today',
    subtitle: 'Greeley\'s AI adoption is further along than most cities in its population range. The city has moved past the pilot stage into operational deployment.',
    items: [
      { label: 'GovAI — 200 Active Users', detail: 'Enterprise-wide deployment on a ChatGPT backbone with government-specific data protections. Knowledge base agents built for HR benefits, PMO onboarding and project scoring, economic development, and real estate management (in development).' },
      { label: 'Microsoft Copilot — Website Chatbot', detail: 'Deployed on the public website but described as a lower-cost experiment rather than a strategic investment. Citizen-facing AI tools require higher accuracy standards and more rigorous validation than internal tools.' },
      { label: 'Police & Fire — Operational AI', detail: 'Greeley Police Department is actively using AI for report writing and narration. Fire Department has expressed interest in similar capabilities. These exist outside the GovAI platform and need governance framework coverage.' },
      { label: '311 Virtual Agent — Rolling Out', detail: 'Zoom-powered call center with AI virtual agent trained on website content. Key concern: if underlying content is outdated or inconsistent, the virtual agent will surface incorrect information to residents.' }
    ]
  },

  // ---- 6. The Core Problem ----
  {
    id: 'core-problem',
    type: 'content',
    layout: 'split',
    visual: 'system-silos',
    title: 'The Core Problem',
    body: 'Greeley has made real investments in technology. The problem is not a lack of tools — it is a lack of connective tissue between them. Systems operate in isolation. AI tools produce outputs that no one is systematically validating. And the people who need to justify continued investment do not have the data to tell the story.',
    items: [
      { label: 'Isolated systems, fragmented data', detail: '16 platforms with no centralized data layer connecting them. When leadership needs cross-department data, the process is manual and ad hoc.' },
      { label: 'No one owns integration', detail: 'No data engineers on staff. No designated owner for API connections and AI integration work. Systems with available APIs sit unconnected.' },
      { label: 'AI without governance', detail: 'Multiple AI tools deployed without a framework defining source of truth, data update cadence, accuracy monitoring, or conflict resolution between overlapping data sources.' },
      { label: 'No cross-department visibility', detail: 'Leadership cannot see operational metrics across departments in one place. Every cross-department question requires manual data assembly from multiple systems.' }
    ]
  },

  // ---- 7. Phase 1 Overview ----
  {
    id: 'phase1-overview',
    type: 'content',
    layout: 'split',
    visual: 'workstream-flow',
    title: 'Phase 1: Four Workstreams',
    subtitle: 'Phase 1 delivers four things simultaneously: a comprehensive assessment, a working AI tool, operational dashboards, and the governance framework leadership needs.',
    items: [
      { label: 'WS1 — Discovery & Assessment', detail: 'Weeks 1-3. Full systems inventory, data flow mapping, API audit, stakeholder interviews, data maturity assessment, AI policy review. Produces current state assessment and prioritized use case list.' },
      { label: 'WS2 — Work Order Prioritization Tool', detail: 'Weeks 3-6. AI-powered triage and prioritization system connected to Cityworks data. Human-in-the-loop design. Dual-layer accuracy validation. Interactive documentation for self-service maintenance.' },
      { label: 'WS3 — AI Monitoring & Reporting Dashboards', detail: 'Weeks 4-7. Three dashboards: cross-department reporting, 311/Copilot AI accuracy monitor, and GovAI knowledge base health. Built on data connections established in WS1.' },
      { label: 'WS4 — Governance & Business Case', detail: 'Weeks 5-8. AI governance framework with source of truth definitions and accuracy protocols. Executive business case for the City Manager\'s office with measured Phase 1 results and future roadmap.' }
    ]
  },

  // ---- 8. Workstream 1 ----
  {
    id: 'ws1-assessment',
    type: 'content',
    layout: 'split',
    visual: 'assessment-checklist',
    title: 'Workstream 1: Discovery & Assessment',
    subtitle: 'Weeks 1-3 — Establishing a comprehensive picture of where Greeley stands today.',
    items: [
      { label: 'Full Systems Inventory & Data Flow Mapping', detail: 'Complete catalog of all major platforms, databases, and tools across departments. Maps how data moves between systems and where it does not. Covers Azure, Oracle ERP, Cityworks, ArcGIS, GovAI, Granicus OneView, Trakit, SharePoint, and any additional systems identified.' },
      { label: 'API Availability Audit', detail: 'Assessment of which systems expose APIs, which are locked down, what connections already exist, and where integration opportunities are being left on the table.' },
      { label: 'Stakeholder Interviews', detail: 'Conversations with 3-4 department leads beyond the Innovation team — including IT, public works, and the 311 team — to validate pain points, surface additional use cases, and understand how data is actually used on the ground.' },
      { label: 'Data Maturity Assessment', detail: 'Evaluation of data quality, structure, ownership, and accessibility across departments. Identifies where data is clean and structured versus unstructured formats, spreadsheets, or manual records.' },
      { label: 'AI Policy & GovAI Deployment Review', detail: 'Review of Greeley\'s existing AI policy and current GovAI adoption: which agents have been built, which knowledge bases are connected, and where utilization gaps exist.' }
    ]
  },

  // ---- 9. Workstream 2 ----
  {
    id: 'ws2-tool',
    type: 'content',
    layout: 'split',
    visual: 'priority-queue',
    title: 'Workstream 2: Work Order Prioritization Tool',
    subtitle: 'Weeks 3-6 — The flagship working deliverable. Phase 1 does not end with a report.',
    items: [
      { label: 'AI-Powered Triage & Prioritization', detail: 'Ingests existing work order data from Cityworks and applies prioritization logic based on severity, location, resource availability, estimated cost, historical patterns, and citizen complaint volume. Outputs a ranked priority queue for supervisor review.' },
      { label: 'Human-in-the-Loop Design', detail: 'The system recommends priorities — it does not make autonomous decisions. AI performs the analysis and surfaces the recommendation; humans review and confirm. Aligns with Greeley\'s enablement-first approach and ensures decisions remain explainable and accountable.' },
      { label: 'Dual-Layer Accuracy Validation', detail: 'Every AI output passes through two validation layers: a deterministic layer that runs scripted checks against source data to verify factual accuracy, and a secondary AI validation layer that evaluates outputs for consistency, completeness, and logical coherence.' },
      { label: 'Interactive Documentation System', detail: 'A visual, guided interface that allows the public works team or IT staff to adjust prioritization weights, add new factors, update data connections, and maintain the system independently. Designed for non-technical users — not a technical manual.' },
      { label: 'Dependencies & Assumptions', detail: 'Delivery contingent on: (1) Cityworks API or data export access — validated during WS1, with manual export as fallback; (2) Structured work order data with at minimum category, location, date, and status fields; (3) Environment access by end of Week 2; (4) 1-2 public works staff available for UAT in Weeks 5-6. If WS1 reveals data access issues, Mouliqe will present alternative approaches for approval before proceeding.' }
    ]
  },

  // ---- 10. Workstream 3 ----
  {
    id: 'ws3-dashboards',
    type: 'content',
    layout: 'split',
    visual: 'dashboard-mockup',
    title: 'Workstream 3: AI Monitoring & Reporting Dashboards',
    subtitle: 'Weeks 4-7 — Three dashboards delivering immediate operational value across the organization, built on data connections from WS1.',
    items: [
      { label: '3A. Cross-Department Reporting Dashboard', detail: 'Unified operational metrics view pulling from systems cataloged in WS1. Replaces hours of manual data assembly across departments. Gives leadership a consistent, up-to-date view of performance without requiring someone to pull data from Oracle, Cityworks, Granicus, and other systems separately each time.' },
      { label: '3B. 311/Copilot AI Accuracy Monitor', detail: 'Periodically tests responses from the Zoom 311 virtual agent and Copilot chatbot against source-of-truth data. Flags discrepancies for review before they reach residents. Provides an automated early-warning system for the highest-visibility AI risk identified during discovery.' },
      { label: '3C. GovAI Knowledge Base Health Dashboard', detail: 'Monitors the 4 existing GovAI knowledge bases for stale information, conflicting entries, coverage gaps, and usage patterns. With 200 users relying on these agents daily, this gives the Innovation team a proactive tool for maintaining quality rather than waiting for users to report problems.' },
      { label: 'Dependencies', detail: 'All three dashboards depend on data access validated during WS1. Scope and depth calibrated based on what the assessment reveals. If a specific data source is not accessible within the timeline, the affected dashboard is delivered with available sources and documented for expansion.' }
    ]
  },

  // ---- 11. Workstream 4 ----
  {
    id: 'ws4-governance',
    type: 'content',
    layout: 'split',
    visual: 'governance-doc',
    title: 'Workstream 4: Governance & Business Case',
    subtitle: 'Weeks 5-8 — The two documents that make Phase 1 self-sustaining.',
    items: [
      { label: 'AI Governance Framework', detail: 'Source of truth definitions for each data type. Data update cadence and ownership assignments. Accuracy monitoring protocols — operationalized through the WS3 dashboards. Extension of Greeley\'s existing AI policy with operational specifics for data governance, validation standards, and maintenance procedures.' },
      { label: 'Executive Business Case', detail: 'Written for the City Manager\'s office and CIO, not the Innovation team. Current state summary, Phase 1 results with measured impact from all tools and dashboards, future opportunity roadmap with projected ROI, and a clear investment narrative. Answers: "How do we tell the story of where we are, where we want to be, and what it takes to get there?"' },
      { label: 'Knowledge Transfer & Handoff', detail: 'Walkthrough sessions with IT and Innovation teams on all deliverables. Q&A, documentation review, and 2 weeks of post-delivery support for bug fixes, adjustments, and questions.' }
    ]
  },

  // ---- 12. Timeline ----
  {
    id: 'timeline',
    type: 'timeline',
    title: 'Timeline',
    subtitle: '6-8 weeks from contract execution to final deliverable handoff. Workstreams overlap by design.',
    tracks: [
      { label: 'WS1: Assessment', start: 1, end: 3, color: 'accent' },
      { label: 'WS2: Work Order Tool', start: 3, end: 6, color: 'blue' },
      { label: 'WS3: Dashboards', start: 4, end: 7, color: 'amber' },
      { label: 'WS4: Governance & Case', start: 5, end: 8, color: 'accent' }
    ],
    items: [
      { label: 'Workstreams overlap intentionally', detail: 'The assessment informs tool and dashboard design. The governance framework is built alongside the working deliverables to reflect real implementation decisions. The dashboards leverage the same data connections established for the work order tool.' }
    ]
  },

  // ---- 13. Investment ----
  {
    id: 'investment',
    type: 'pricing',
    title: 'Investment',
    subtitle: 'Flat fee. All deliverables, meetings, revisions, and support included. No hourly charges, change-order fees, or infrastructure costs. Click any section to expand line items.',
    total: '$42,000',
    sections: [
      {
        label: 'WS1: Discovery & Assessment',
        subtotal: '$7,000',
        items: [
          { label: 'Systems Inventory & Data Flow Mapping', price: '$2,500' },
          { label: 'Stakeholder Interviews (3-4 departments)', price: '$2,000' },
          { label: 'Data & AI Readiness Assessment', price: '$2,500' }
        ]
      },
      {
        label: 'WS2: Work Order Prioritization Tool',
        subtotal: '$16,000',
        items: [
          { label: 'Tool Design & Architecture', price: '$3,000' },
          { label: 'AI Development & Integration', price: '$5,500' },
          { label: 'Dual-Layer Accuracy Validation', price: '$3,000' },
          { label: 'Interactive Documentation System', price: '$2,500' },
          { label: 'Deployment, Testing & UAT', price: '$2,000' }
        ]
      },
      {
        label: 'WS3: AI Monitoring & Reporting Dashboards',
        subtotal: '$9,000',
        items: [
          { label: 'Cross-Department Reporting Dashboard', price: '$3,000' },
          { label: '311/Copilot AI Accuracy Monitor', price: '$2,500' },
          { label: 'GovAI Knowledge Base Health Dashboard', price: '$2,000' },
          { label: 'Dashboard Deployment & Documentation', price: '$1,500' }
        ]
      },
      {
        label: 'WS4: Governance & Business Case',
        subtotal: '$10,000',
        items: [
          { label: 'AI Governance Framework', price: '$4,000' },
          { label: 'Executive Business Case Document', price: '$4,000' },
          { label: 'Knowledge Transfer & Handoff', price: '$1,000' },
          { label: 'Post-Delivery Support (2 weeks)', price: '$1,000' }
        ]
      }
    ],
    items: [
      { label: 'Payment milestones', detail: '30% ($12,600) at contract execution. 40% ($16,800) at completion of assessment and tool delivery to UAT. 30% ($12,600) at final delivery and handoff. Net 30 payment terms.' }
    ]
  },

  // ---- 14. ROI Projections ----
  {
    id: 'roi',
    type: 'stats',
    title: 'ROI Projections',
    subtitle: 'Conservative estimates based on discovery data and industry benchmarks. All figures to be baselined during WS1 and measured against actuals.',
    stats: [
      { value: '$73-93K', label: 'Projected annual value' },
      { value: '1.7-2.2x', label: 'Year 1 ROI' },
      { value: '$42K', label: 'One-time engagement cost' },
      { value: '4', label: 'Working tools delivered' }
    ],
    chart: {
      type: 'bar',
      title: 'Projected Annual Value by Category',
      items: [
        { label: 'Triage labor savings', value: 7, color: 'accent' },
        { label: 'Rework avoidance', value: 17.5, color: 'accent' },
        { label: 'Escalation avoidance', value: 15, color: 'accent' },
        { label: 'Reporting automation', value: 18, color: 'blue' },
        { label: '311 risk avoidance', value: 17.5, color: 'blue' },
        { label: 'GovAI productivity', value: 8, color: 'blue' }
      ],
      unit: '$K/yr'
    },
    items: [
      { label: 'Phase 1 pays for itself in Year 1', detail: 'The work order tool alone (triage savings + rework avoidance + escalation avoidance) is projected at $37-42K/yr — covering the engagement cost. The three dashboards add another $36-51K/yr. Total: $73-93K/yr against a one-time $42K investment.' },
      { label: 'Value compounds annually', detail: 'The $42K is a one-time cost. The tools and dashboards continue operating in Year 2 and beyond. The governance framework ensures they remain accurate and maintained. The executive business case provides the data to justify Phase 2 expansion.' }
    ]
  },

  // ---- 15. What Comes Next ----
  {
    id: 'whats-next',
    type: 'content',
    layout: 'split',
    visual: 'roadmap',
    title: 'What Comes Next',
    subtitle: 'Phase 1 is designed to stand on its own. These opportunities are expected to emerge from the assessment — presented as directional context, not committed scope.',
    items: [
      { label: 'Unified Data Infrastructure', detail: 'Connecting Oracle ERP, Cityworks, ArcGIS, Granicus OneView, Trakit, SharePoint, GovAI, and other systems into a centralized Azure-based data layer. The WS3 dashboards provide a working proof of concept — Phase 2 would formalize and scale these connections into permanent infrastructure.' },
      { label: 'Internal AI Agent Optimization', detail: 'Expanding and optimizing GovAI knowledge base agents. Connecting additional data sources, improving accuracy through structured knowledge management, deploying agents to departments that have not yet adopted them. The GovAI health dashboard from WS3 provides the monitoring foundation.' },
      { label: '311 Virtual Agent Expansion', detail: 'Expanding the WS3 accuracy monitor into a full validation and continuous improvement pipeline. Automated testing at scale, trend analysis, and structured knowledge base update processes.' },
      { label: 'Field Worker Data Capture', detail: 'A system allowing field crews to capture notes, observations, and work documentation through simple inputs (photos of handwritten notes) that are automatically extracted, structured, and made available for AI-powered querying and reporting.' },
      { label: 'Citizen-Facing AI Rollout Strategy', detail: 'Phased approach to expanding AI-powered services to residents. Dual-option deployment (AI and human channels simultaneously), community engagement, and measurement frameworks for adoption and satisfaction.' }
    ]
  },

  // ---- 16. Why Mouliqe ----
  {
    id: 'why-mouliqe',
    type: 'grid',
    title: 'Why Mouliqe',
    subtitle: 'Five commitments that define how we work. Click any card for detail.',
    cards: [
      { label: 'Build Within, Not On Top Of', tag: 'Approach', detail: 'We do not introduce new platforms. The engagement works entirely within Greeley\'s existing technology investments: Azure, Oracle, GovAI, and the tools already deployed. This eliminates infrastructure cost, vendor management overhead, and adoption friction.' },
      { label: 'Working Results, Not Just Reports', tag: 'Delivery', detail: 'Phase 1 ends with a deployed AI tool, three operational dashboards, a governance framework, and interactive documentation. During budget pressure, it is easier to justify spending on something already working than on a document describing what could be built.' },
      { label: 'Accuracy Validation Architecture', tag: 'Quality', detail: 'Every AI deployment includes dual-layer validation. The 311/Copilot accuracy monitor extends this to citizen-facing tools, providing ongoing automated validation that catches issues before they reach residents.' },
      { label: 'Interactive Documentation & Self-Sufficiency', tag: 'Sustainability', detail: 'Every system comes with an interactive documentation layer for non-technical users. When the engagement ends, the city\'s teams can maintain and evolve what was built without calling the consultant back. Capacity building, not recurring dependency.' },
      { label: 'Enablement-First Framing', tag: 'Philosophy', detail: 'AI is a tool for making people more capable, not a mechanism for reducing headcount. Every solution is evaluated against that standard. If a recommendation does not make an existing team member\'s job easier or more effective, it does not belong in the scope.' }
    ]
  },

  // ---- 17. Next Steps ----
  {
    id: 'next-steps',
    type: 'content',
    layout: 'hero',
    title: 'Next Steps',
    body: 'This presentation accompanies the full Diagnosis document, which contains the complete current state assessment, detailed workstream specifications, and appendices.',
    items: [
      { label: 'Review the full proposal document', detail: 'The Diagnosis document provides the comprehensive detail behind each section of this presentation — including the full systems inventory, detailed deliverable specifications, and the complete ROI analysis.' },
      { label: 'IT security & AI questionnaires', detail: 'Kylie will send the city\'s IT security and AI questionnaires to run in parallel with proposal review. Mouliqe will complete and return them promptly.' },
      { label: 'Questions & discussion', detail: 'We are available for follow-up questions, clarifications, or deeper dives into any section of the proposal. The goal is to make sure Greeley has everything needed to make an informed decision.' },
      { label: 'Contract execution & kickoff', detail: 'Upon approval, we execute the contract and begin Workstream 1 immediately. The 6-8 week clock starts at kickoff, with the first milestone (assessment completion) at Week 3.' }
    ]
  }

];
