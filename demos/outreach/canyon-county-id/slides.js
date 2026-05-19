export const meta = {
  title: 'Closing the Growth-Data Gap',
  client: 'Canyon County, Idaho',
  author: 'Mouliqe',
  date: 'May 2026'
};

export const slides = [

  {
    id: 'title',
    type: 'title',
    label: 'Data & AI Strategy Assessment',
    title: 'Closing the Growth&#8209;Data Gap',
    subtitle: 'Canyon County, Idaho',
    meta: 'Prepared by Mouliqe &middot; May 2026'
  },

  {
    id: 'snapshot',
    type: 'stats',
    title: 'Canyon County at a Glance',
    subtitle: 'Idaho\'s fastest-growing county is outpacing its own infrastructure.',
    stats: [
      { value: '275,028', label: 'Residents (July 2025)' },
      { value: '+19%', label: 'Growth since 2020' },
      { value: '$162.2M', label: 'FY2026 Budget' },
      { value: '87.4%', label: 'Jail capacity used' }
    ],
    chart: {
      type: 'bar',
      title: 'The Gap: Population Growth vs. Budget Growth',
      items: [
        { label: 'Population growth (5yr)', value: 19, color: 'accent' },
        { label: 'Budget growth (5yr)', value: 3.6, color: 'blue' },
        { label: 'Jail capacity used', value: 87.4, color: 'accent' },
        { label: 'IT positions added', value: 0, color: 'blue' }
      ],
      unit: '%'
    },
    body: 'Commissioner Holton: <em>"The budget does not match the county\'s recent growth rate."</em> Voters rejected a $190M bond. You must close this gap through efficiency, not spending.'
  },

  {
    id: 'pain-points',
    type: 'grid',
    title: 'Six Problems We Can See From the Outside',
    subtitle: 'Based on budget documents, news coverage, and public records. Click any card for evidence.',
    cards: [
      { label: 'No Cross-Department Analytics', tag: 'Data', detail: 'Development Services has 4 separate contact points (Planning 208-402-4164, Building 208-402-4163, GIS 208-402-4166, Code Enforcement 208-402-4165). OnBase ECM has 1 administrator. No unified reporting connects permits to growth projections to service demand.' },
      { label: 'Interim CIO Stretched Thin', tag: 'Leadership', detail: 'Steve Webb holds both COO and Interim CIO responsibilities simultaneously. Five IT divisions (Business, Development, Operations, Security, PMO) report to someone who also runs county operations. No dedicated strategic technology executive.' },
      { label: '$8M ARPA — Clock Ticking', tag: 'Deadline', detail: '$8M remaining from $44.6M ARPA allocation. Must be completed by December 2026. The Sheriff\'s Admin Building consumes most of it, but technology investments are ARPA-eligible and the window is closing.' },
      { label: '$37.6M in New Buildings, No Intelligence Layer', tag: 'Infrastructure', detail: '$27.6M Sheriff\'s Admin Building (spring 2026, Okland Construction) + $10M new 192-bed jail (Pond Lane, Hwy 20/26). New buildings need integrated systems — security, inmate management, cross-agency data sharing. What runs inside them?' },
      { label: 'Public Safety Coordination Breakdown', tag: 'Operations', detail: 'Sheriff Donahue vs. Caldwell over police fees ($7K for Night Rodeo). Drug networks shifting Idaho from "depository" to "distributorship." ETS/CCIT MOU shows complex coordination needs. No unified operations picture.' },
      { label: 'Voters Won\'t Approve Bonds', tag: 'Political', detail: '$190M bond proposal rejected. County now funds $10M jail from reserves — depleting savings. Every technology investment must demonstrate ROI within existing budget. No room for experiments.' }
    ]
  },

  {
    id: 'insight',
    type: 'content',
    layout: 'split',
    visual: 'alert',
    title: 'Something You Might Not See Yet',
    body: 'We cross-referenced your growth rate, jail population trend, and budget trajectory. Here’s what the math says:',
    items: [
      { label: 'Jail hits 100% capacity in ~4 months', detail: 'At 87.4% (457/523) with population growing 2.9%/year and no new beds until the 192-bed facility opens (late 2027 at earliest), you’ll exceed capacity by Q4 2026. Boarding costs will spike from $750K to $1.2M+ annually.' },
      { label: 'Your IT team hasn’t grown since 2020', detail: 'Population up 19%. Budget up 3.6%. IT positions added: zero. The 5 divisions (Business, Development, Operations, Security, PMO) are serving 44,000 more residents with the same headcount. OnBase has 1 administrator for the entire county.' },
      { label: 'EMS response time is degrading', detail: 'Canyon County Paramedics are seeking a property tax levy increase — a signal that current funding can’t sustain service levels. At 2.9% annual population growth, every year without investment compounds the response time gap.' }
    ]
  },

  {
    id: 'tech-landscape',
    type: 'grid',
    title: 'Your Current Technology Landscape',
    subtitle: 'What we identified from public records and budget documents. Click for details.',
    cards: [
      { label: 'OnBase ECM', tag: 'Document Management', detail: 'Hyland OnBase deployed county-wide for document management and workflow automation. Single ECM Administrator position. Foundation platform but under-resourced for optimization.' },
      { label: 'Spillman Flex (Motorola)', tag: 'CAD / Public Safety', detail: 'Computer-Aided Dispatch and Records Management for Sheriff\'s Office. Managed by Emergency Technical Services (ETS) division with dedicated Spillman Administrator.' },
      { label: 'Dayforce HCM', tag: 'HR / Recruiting', detail: 'Ceridian Dayforce for human capital management. Job postings at jobs.dayforcehcm.com/canyoncounty. Modern cloud HR platform.' },
      { label: 'Microsoft Exchange', tag: 'Email / Collaboration', detail: 'OWA webmail at ccmail.canyonco.org. Standard email infrastructure. No evidence of Microsoft 365 advanced features (Power BI, Power Automate).' },
      { label: 'In-House GIS', tag: 'Geospatial', detail: 'Dedicated GIS & Addressing team within Development Services (208-402-4166). GIS Analysts in both Development and ETS divisions. Parcel data via GovernMaxa PropertyMax.' },
      { label: 'CAPS Application', tag: 'Custom Development', detail: 'Custom-built Development Services application. Dedicated part-time Programmer Analyst II (19.5 hrs/week). Suggests in-house development capability but limited capacity.' }
    ]
  },

  {
    id: 'what-if',
    type: 'stats',
    title: 'What If You Could See This?',
    subtitle: 'The intelligence layer that connects your existing systems into a unified operational picture.',
    stats: [
      { value: '6', label: 'Disconnected systems' },
      { value: '0', label: 'Cross-dept dashboards' },
      { value: '25', label: 'Departments served' },
      { value: '5', label: 'IT divisions' }
    ],
    chart: {
      type: 'bar',
      title: 'Where Growth Is Hitting Hardest (Illustrative)',
      items: [
        { label: 'Building permits (YoY)', value: 34, color: 'accent' },
        { label: 'Jail population', value: 87, color: 'accent' },
        { label: '911 call volume', value: 22, color: 'accent' },
        { label: 'Court caseload', value: 18, color: 'blue' },
        { label: 'IT staff growth', value: 0, color: 'blue' }
      ],
      unit: '% capacity/growth'
    },
    items: [
      { label: 'Growth Impact Dashboard', detail: 'Real-time: population growth vs. service capacity across every department. Building permits, 911 calls, jail occupancy, court cases, Development Services workload. Shows commissioners WHERE you\'ll break before it happens.' },
      { label: 'Public Safety Resource Optimizer', detail: 'For the new Sheriff\'s HQ: patrol deployment across 1,079 sq miles based on incident history + population density shifts + drug distribution patterns. Response time projections. Staffing calculator.' },
      { label: 'AI Constituent Services Agent', detail: '275K residents, no chatbot, no after-hours digital service. An AI agent handling routine inquiries (permits, property tax, court dates, DMV scheduling) — frees staff without adding positions voters won\'t fund.' }
    ]
  },

  
  {
    id: 'demos',
    type: 'content',
    layout: 'centered',
    title: 'Explore the Interactive Demos',
    body: 'We built these specifically for Canyon County. Each one uses real public data to show what\u2019s possible.<br><br><a href="./growth-impact-dashboard.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Growth Impact Dashboard</a><br><span style="font-size:0.8em;color:#94a3b8">Population vs. capacity with breaking point projections</span><br><br><a href="./public-safety-optimizer.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Public Safety Optimizer</a><br><span style="font-size:0.8em;color:#94a3b8">Patrol deployment, staffing model, jail trends</span><br><br><a href="./ai-constituent-services.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 AI Constituent Services</a><br><span style="font-size:0.8em;color:#94a3b8">ROI model for 24/7 AI agent serving 275K residents</span>'
  },

  {
    id: 'timeline',
    type: 'timeline',
    title: 'How We\'d Work Together',
    subtitle: 'A phased approach designed for your budget reality. No large upfront commitment.',
    tracks: [
      { label: 'Discovery & Assessment', start: 0, end: 2, color: 'accent', detail: 'Map current systems, data flows, integration gaps. Interview department heads. Identify quick wins. Deliverable: Current State Report + Quick Win Roadmap.' },
      { label: 'Quick Wins (2-3 dashboards)', start: 2, end: 5, color: 'accent', detail: 'Build first cross-department dashboards connecting permits → growth → service demand. Give commissioners real-time visibility. Prove value fast.' },
      { label: 'Strategic Roadmap', start: 4, end: 6, color: 'blue', detail: '3-year technology plan aligned with budget constraints. Prioritized by ROI. Designed for a team that can\'t add headcount. Includes grant funding opportunities.' },
      { label: 'Implementation Support', start: 6, end: 8, color: 'blue', detail: 'Hands-on help building the solutions identified in the roadmap. Knowledge transfer to your team. No vendor lock-in.' }
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
    body: '30 minutes. No pitch deck theater. Just a direct conversation about your priorities, your constraints, and whether we can help.<br><br><strong>mouliqe.com/contact</strong> &middot; imtiaz@mouliqe.com',
    items: [
      { label: 'What we\'ll cover', detail: 'Your top 2-3 technology priorities for the next 12 months. Where the biggest pain is. What\'s been tried before. Whether external help makes sense right now.' },
      { label: 'What you\'ll get', detail: 'Even if we never work together: an honest outside perspective on your technology landscape from someone who\'s seen dozens of counties navigate the same growth challenges.' }
    ]
  }
];
