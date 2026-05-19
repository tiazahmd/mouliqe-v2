export const meta = {
  title: 'From Analog to Intelligence',
  client: 'Douglas County, Oregon',
  author: 'Mouliqe',
  date: 'May 2026'
};

export const slides = [

  {
    id: 'title',
    type: 'title',
    label: 'Data & AI Strategy Assessment',
    title: 'From Analog to Intelligence',
    subtitle: 'Douglas County, Oregon',
    meta: 'Prepared by Mouliqe &middot; May 2026'
  },

  {
    id: 'snapshot',
    type: 'stats',
    title: 'Douglas County at a Glance',
    subtitle: 'Oregon\'s largest county west of the Cascades — managing a radio modernization, drought emergency, and wildfire threat simultaneously.',
    stats: [
      { value: '5,071', label: 'Square miles' },
      { value: '$7.5M', label: 'Wildfire funding (May 2026)' },
      { value: '5', label: 'Justice programs (LPSCC)' },
      { value: 'VHF→UHF', label: 'Radio modernization' }
    ],
    chart: {
      type: 'bar',
      title: 'IT Department Scope (Unique Among Counties)',
      items: [
        { label: 'Computer/data systems', value: 100, color: 'accent' },
        { label: 'County telephone system', value: 100, color: 'accent' },
        { label: 'Public safety radio', value: 100, color: 'accent' },
        { label: 'Cross-dept analytics', value: 0, color: 'blue' },
        { label: 'Predictive capabilities', value: 0, color: 'blue' }
      ],
      unit: '% managed by IT'
    },
    body: 'Your IT department manages three critical infrastructure systems — data, voice, AND public safety radio. That\'s unusual. It means every modernization effort flows through one team. The radio transition creates an opportunity to build intelligence on ALL three.'
  },

  {
    id: 'pain-points',
    type: 'grid',
    title: 'Converging Challenges',
    subtitle: 'Three major initiatives happening simultaneously. Click for details.',
    cards: [
      { label: 'Radio: VHF Analog → UHF Digital', tag: 'Infrastructure', detail: 'Multi-million-dollar transition from legacy VHF analog to UHF digital for law enforcement. Digital radio generates data that analog never could — call patterns, coverage quality, response time correlation. Are you capturing this intelligence?' },
      { label: 'Drought Emergency (Apr 29, 2026)', tag: 'Crisis', detail: '10th Oregon county to declare drought in 2026. Low streamflows, poor soil moisture, reduced snowpack. Wildfire season starting early. You already publish stream gage readings — but is anyone modeling what they mean for fire risk?' },
      { label: '$7.5M Wildfire Funding Arriving', tag: 'Opportunity', detail: 'Oregon lawmakers announced May 2, 2026: $7.5M for community wildfire resilience including 2 projects in Douglas County. CWPP being updated. New money for preparedness technology.' },
      { label: '5 Justice Programs, Zero Unified Tracking', tag: 'Data Gap', detail: 'H.O.P.E. Drug Court, Mental Health Court, IMPACTS, RSAT, Second Chance Act — all under LPSCC. Each tracks outcomes separately. No unified view of what works, for whom, at what cost. Funding justification is harder than it needs to be.' },
      { label: 'O&C Timber Revenue Increasing', tag: 'Fiscal', detail: 'Federal legislation restoring 75% shared timber receipts (was cut after spotted owl protections). New revenue = new investment capacity. But where should it go? Data-driven prioritization needed.' },
      { label: '5,071 Square Miles of Coverage', tag: 'Geography', detail: 'Largest county west of the Cascades. From the Pacific Ocean at Winchester Bay to Mt. Thielsen in the Cascades. Radio coverage gaps, response time challenges, resource deployment across vast distances.' }
    ]
  },

  {
    id: 'insight',
    type: 'content',
    layout: 'split',
    visual: 'alert',
    title: 'Something You Might Not See Yet',
    body: 'We cross-referenced your radio transition, drought data, and justice programs. Here’s what emerges:',
    items: [
      { label: 'Your radio modernization creates data you’ve never had', detail: 'VHF analog generates zero metadata. UHF digital logs every transmission: who, when, where, signal quality, duration. Across 15+ agencies and ~2,400 daily transmissions, that’s a dataset that could transform how you understand public safety operations — if you capture it from day one.' },
      { label: 'Streamflow is 38% below the 30-year average', detail: 'You declared a drought emergency April 29. But the stream gage data shows this isn’t a sudden event — it’s been building since February. A predictive model using USGS data + SNOTEL + NWS forecasts could have flagged this 6-8 weeks earlier.' },
      { label: '5 justice programs, $520K in annual savings, zero unified reporting', detail: 'H.O.P.E., Mental Health Court, IMPACTS, RSAT, Second Chance Act — collectively avoiding ~10,240 jail days and saving ~$520K/year. But each program tracks outcomes separately. When state funding applications ask for combined impact data, you’re assembling it manually.' }
    ]
  },

  {
    id: 'what-if',
    type: 'stats',
    title: 'What the Digital Transition Enables',
    subtitle: 'The radio modernization isn\'t just an infrastructure upgrade. It\'s a data opportunity.',
    stats: [
      { value: '111K', label: 'Residents' },
      { value: '~$209M', label: 'County budget' },
      { value: '24/7', label: 'IT on-call coverage' },
      { value: '3', label: 'Critical systems managed' }
    ],
    items: [
      { label: 'Public Safety Radio Analytics', detail: 'The new UHF digital system generates data streams that VHF analog never could. Call volume patterns by time/location, coverage quality mapping across 5,071 sq miles, response time correlation with outcomes, cross-agency coordination metrics. This is NEW intelligence — available only because of the transition you\'re already making.' },
      { label: 'Drought & Wildfire Preparedness Dashboard', detail: 'You already publish stream gage readings. Add: soil moisture, snowpack levels, fire danger ratings, evacuation zone status, resource positioning. Real-time situational awareness that integrates with DC Citizen Alert System for automated notifications when thresholds are crossed.' },
      { label: 'Justice Program ROI Tracker', detail: 'All 5 LPSCC programs in one view: H.O.P.E. Drug Court, Mental Health Court, IMPACTS, RSAT, Second Chance Act. Participant flow, completion rates, recidivism, cost per successful outcome. The data that justifies continued state and federal funding.' }
    ]
  },

  
  {
    id: 'demos',
    type: 'content',
    layout: 'centered',
    title: 'Explore the Interactive Demos',
    body: 'We built these specifically for Douglas County. Each one uses real public data to show what\u2019s possible.<br><br><a href="./radio-analytics.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Radio Analytics</a><br><span style="font-size:0.8em;color:#94a3b8">New data streams from the VHF to UHF transition</span><br><br><a href="./wildfire-preparedness.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Wildfire Preparedness</a><br><span style="font-size:0.8em;color:#94a3b8">Real-time risk indicators and resource positioning</span><br><br><a href="./justice-program-roi.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Justice Program ROI</a><br><span style="font-size:0.8em;color:#94a3b8">Unified outcomes across 5 LPSCC programs</span>'
  },

  {
    id: 'timeline',
    type: 'timeline',
    title: 'How We\'d Work Together',
    subtitle: 'Aligned with your radio transition timeline. Building intelligence as the new system comes online.',
    tracks: [
      { label: 'Discovery & Radio Data Planning', start: 0, end: 2, color: 'accent', detail: 'Understand the UHF digital transition timeline. Identify what data streams become available. Plan the analytics layer before the system goes live — not after.' },
      { label: 'Wildfire Preparedness Dashboard', start: 1, end: 4, color: 'accent', detail: 'Build the unified preparedness view using existing data sources (stream gages, weather, fire danger). Integrate with DC Citizen Alert System. Ready before peak fire season.' },
      { label: 'Radio Analytics (post-transition)', start: 3, end: 6, color: 'blue', detail: 'As UHF digital comes online, capture and analyze the new data streams. Coverage quality mapping, response time analysis, cross-agency coordination metrics. Show ROI of the radio investment.' },
      { label: 'Justice Program Integration', start: 5, end: 8, color: 'blue', detail: 'Connect all 5 LPSCC programs into unified outcome tracking. Recidivism analysis, cost-per-outcome, program comparison. Data for state funding applications.' }
    ]
  },

  {
    id: 'why-mouliqe',
    type: 'content',
    layout: 'split',
    visual: 'checklist',
    title: 'Why Mouliqe',
    body: 'A decade of marketing analytics, data engineering at Fortune-level companies, and AI architecture — before the hype cycle. I help you find the real problem, design the right solution, and build it. Sometimes that means telling you not to spend money at all.',
    items: [
      { label: 'Honest assessment first', detail: 'I evaluate what you actually need — not what\u2019s trending. If AI isn\u2019t the answer, I\u2019ll tell you. If your data infrastructure needs fixing before anything else works, I\u2019ll tell you that too. The Diagnosis stage exists specifically to prevent wasted investment.' },
      { label: 'Production-grade, not proof-of-concept', detail: 'I\u2019ve built systems that reduced manual processing by 80-95% at scale. The gap between a demo and a production system is where most projects die. I build for production from day one — with proper guardrails, monitoring, and maintainability.' },
      { label: 'Three disciplines, one engagement', detail: 'AI architecture, data engineering, and analytics aren\u2019t separate problems — they\u2019re layers of the same problem. Most consultants specialize in one. I work across all three because that\u2019s what real solutions require.' }
    ]
  },

  {
    id: 'next-steps',
    type: 'content',
    layout: 'centered',
    title: 'One Conversation',
    body: '30 minutes about your radio modernization, your wildfire preparedness, and the data opportunities that emerge when analog becomes digital.<br><br><strong>mouliqe.com/contact</strong> &middot; imtiaz@mouliqe.com',
    items: [
      { label: 'What we\'ll cover', detail: 'Where the VHF→UHF transition stands. What data you\'re planning to capture. How the wildfire funding will be deployed. Whether analytics support makes sense.' },
      { label: 'What you\'ll get', detail: 'A perspective on how other counties have extracted intelligence from radio modernization projects — and what they wish they\'d planned for earlier.' }
    ]
  }
];
