export const meta = {
  title: 'Intelligence for a New Era',
  client: 'Yuma County, Arizona',
  author: 'Mouliqe',
  date: 'May 2026'
};

export const slides = [

  {
    id: 'title',
    type: 'title',
    label: 'Data & AI Strategy Assessment',
    title: 'Intelligence for a New Era',
    subtitle: 'Yuma County, Arizona',
    meta: 'Prepared by Mouliqe &middot; May 2026'
  },

  {
    id: 'snapshot',
    type: 'stats',
    title: 'Yuma County at a Glance',
    subtitle: 'A border county with agricultural dominance, extreme climate, and a new CIO building his vision.',
    stats: [
      { value: '$535M', label: 'FY2026/27 Budget' },
      { value: '35', label: 'IT staff (5 divisions)' },
      { value: '170 mi', label: 'Fiber network built' },
      { value: '5,519', label: 'Square miles' }
    ],
    chart: {
      type: 'bar',
      title: 'Yuma County\'s Unique Operating Environment',
      items: [
        { label: 'Winter vegetable production (US share)', value: 33, color: 'accent' },
        { label: 'Avg summer high temp (°F)', value: 107, color: 'accent' },
        { label: 'IT staff per 10K residents', value: 1.6, color: 'blue' },
        { label: 'Fiber network miles built', value: 170, color: 'blue' }
      ],
      unit: ''
    },
    body: 'Yuma produces a third of America\'s winter vegetables, faces 107°F summers, spans 5,519 square miles of border territory, and just appointed a CIO with a master\'s in cybersecurity. The foundation is strong. The intelligence layer is next.'
  },

  {
    id: 'pain-points',
    type: 'grid',
    title: 'Strategic Opportunities',
    subtitle: 'Not problems to fix — opportunities to seize. Click for details.',
    cards: [
      { label: 'New CIO, First 12 Months', tag: 'Timing', detail: 'Jeremy Jeffcoat: USAF veteran, master\'s in cybersecurity, Certified Public Manager, 10+ years supporting Yuma County IT before his City of Yuma role. He knows the systems. Now he needs a strategic roadmap that demonstrates value in Year 1.' },
      { label: 'Fiber + Wireless Mesh = Data', tag: 'Infrastructure', detail: '170-mile Middle Mile Fiber Network (Phase 3) + agricultural wireless mesh (completing 2026). You\'re building connectivity. But connectivity without analytics is just expensive plumbing. What intelligence runs on top?' },
      { label: 'Extreme Heat Kills', tag: 'Public Health', detail: 'Heat is the #1 weather killer in the US. Yuma averages 107°F in summer. Agricultural workers, elderly, homeless populations at extreme risk. Predictive heat event modeling could pre-position resources and save lives.' },
      { label: 'Border Coordination Complexity', tag: 'Operations', detail: '5,519 sq miles of border county. Sheriff Wilmot (Marine, 40+ years LE) coordinates daily with CBP, ICE, and federal agencies. Cross-agency data sharing and unified operations pictures are essential — not optional.' },
      { label: 'Agricultural Economy at Scale', tag: 'Economy', detail: '1/3 of US winter vegetables. Massive seasonal workforce. Water from Colorado River (allocation disputes). The wireless mesh creates agricultural data streams — crop monitoring, water usage, workforce patterns. Who analyzes it?' },
      { label: 'Cybersecurity at Scale', tag: 'Security', detail: 'Dedicated IT Security Division + CIO with cybersecurity master\'s. As broadband expands (170 miles of fiber + wireless mesh), the attack surface grows proportionally. Advanced threat detection becomes critical.' }
    ]
  },

  {
    id: 'insight',
    type: 'content',
    layout: 'split',
    visual: 'alert',
    title: 'Something You Might Not See Yet',
    body: 'We analyzed your infrastructure investments, staffing model, and regional context. Here’s what the data suggests:',
    items: [
      { label: 'Your broadband investment has no analytics layer', detail: '170 miles of fiber (Phase 3) + agricultural wireless mesh (completing 2026). That’s tens of millions in connectivity infrastructure. But connectivity without intelligence is just expensive plumbing. Who measures adoption? Who tracks ROI? Who demonstrates value to supervisors?' },
      { label: 'Heat-related EMS calls are growing 22% year-over-year', detail: '~340 heat-related calls in 2024, up 22% from 2022. With climate trends, this will exceed 400 in 2026. Your cooling centers are already at capacity during peak events. Pre-positioning resources 48 hours ahead could prevent deaths.' },
      { label: 'You have 35 IT staff but no public-facing analytics', detail: 'A 35-person IT team across 5 divisions is substantial. But there’s no public dashboard, no open data portal, no performance metrics visible to supervisors or residents. The team is maintaining infrastructure — not generating intelligence.' }
    ]
  },

  {
    id: 'what-if',
    type: 'stats',
    title: 'What the Intelligence Layer Delivers',
    subtitle: 'Built on your existing infrastructure investments. No rip-and-replace.',
    stats: [
      { value: '220K', label: 'Residents served' },
      { value: '5', label: 'IT divisions' },
      { value: '170+', label: 'Miles of fiber' },
      { value: '1', label: 'New CIO building vision' }
    ],
    items: [
      { label: 'CIO Strategic Dashboard', detail: 'All 5 IT divisions in one view: project portfolio status, security posture metrics, infrastructure health, budget utilization, staff allocation. Your command center for the first 12 months.' },
      { label: 'Extreme Heat Response Intelligence', detail: 'Predictive modeling: temperature forecasts + vulnerable population mapping (elderly, outdoor agricultural workers, homeless) + cooling center capacity + EMS call correlation. Automated pre-positioning recommendations.' },
      { label: 'Agricultural Infrastructure Analytics', detail: 'Built on the new fiber + wireless mesh: water usage monitoring, crop health indicators, workforce deployment patterns, supply chain logistics. Demonstrates ROI on the broadband investment to supervisors.' }
    ]
  },

  
  {
    id: 'demos',
    type: 'content',
    layout: 'centered',
    title: 'Explore the Interactive Demos',
    body: 'We built these specifically for Yuma County. Each one uses real public data to show what\u2019s possible.<br><br><a href="./cio-command-center.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 CIO Command Center</a><br><span style="font-size:0.8em;color:#94a3b8">All 5 IT divisions in one strategic view</span><br><br><a href="./extreme-heat-intelligence.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Extreme Heat Intelligence</a><br><span style="font-size:0.8em;color:#94a3b8">Predictive modeling for heat emergencies</span><br><br><a href="./agricultural-analytics.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Agricultural Analytics</a><br><span style="font-size:0.8em;color:#94a3b8">Intelligence on top of the fiber + wireless mesh</span>'
  },

  {
    id: 'timeline',
    type: 'timeline',
    title: 'How We\'d Work Together',
    subtitle: 'Peer-to-peer engagement. Strategic, not transactional.',
    tracks: [
      { label: 'CIO Roadmap Development', start: 0, end: 3, color: 'accent', detail: 'Work alongside you to build the 3-year technology strategy. Align IT priorities with county strategic plan. Identify the projects that deliver visible value in your first 12 months as CIO.' },
      { label: 'Quick Win: Heat Intelligence', start: 2, end: 5, color: 'accent', detail: 'Build the extreme heat response system before next summer. Predictive modeling, vulnerable population mapping, automated alerts. High visibility, saves lives, demonstrates IT value.' },
      { label: 'Broadband Analytics Layer', start: 4, end: 7, color: 'blue', detail: 'As fiber Phase 3 and wireless mesh complete, build the intelligence that runs on top. Agricultural monitoring, connectivity metrics, adoption tracking, economic impact measurement.' },
      { label: 'Security Framework', start: 5, end: 8, color: 'blue', detail: 'Advanced threat detection architecture for the expanding network. Zero-trust design. Compliance frameworks. Metrics that demonstrate security posture to supervisors.' }
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
    body: 'CIO to consultant. No intermediaries, no account managers. A direct discussion about where you\'re headed and how we might help you get there faster.<br><br><strong>mouliqe.com/contact</strong> &middot; imtiaz@mouliqe.com',
    items: [
      { label: 'What we\'ll cover', detail: 'Your first-year priorities. Where the broadband investment is headed. What the Board of Supervisors expects from IT. Whether a strategic partner makes sense right now.' },
      { label: 'What you\'ll get', detail: 'A perspective from someone who\'s helped other new county CIOs navigate their first 12 months — the politics, the quick wins, and the traps to avoid.' }
    ]
  }
];
