export const meta = {
  title: 'The Data Center Paradox',
  client: 'Grant County, Washington',
  author: 'Mouliqe',
  date: 'May 2026'
};

export const slides = [

  {
    id: 'title',
    type: 'title',
    label: 'Data & AI Strategy Assessment',
    title: 'The Data Center Paradox',
    subtitle: 'Grant County, Washington',
    meta: 'Prepared by Mouliqe &middot; May 2026'
  },

  {
    id: 'snapshot',
    type: 'stats',
    title: 'Grant County at a Glance',
    subtitle: 'You host the world\'s computing infrastructure. But what about yours?',
    stats: [
      { value: '29', label: 'Hyperscale data centers' },
      { value: '$54M', label: 'Annual DC property tax' },
      { value: '9', label: 'County IT staff' },
      { value: '2,681', label: 'Square miles to cover' }
    ],
    chart: {
      type: 'bar',
      title: 'The Paradox: External vs. Internal Technology',
      items: [
        { label: 'DC property tax growth (20yr)', value: 1277, color: 'accent' },
        { label: 'County IT staff count', value: 9, color: 'blue' },
        { label: 'Tax rate complexity (134 rates)', value: 134, color: 'accent' },
        { label: 'Budget gap ($M)', value: 6, color: 'blue' }
      ],
      unit: ''
    },
    body: 'Grant County generates more computing power per square mile than almost anywhere on Earth. But your own government operates with 9 IT staff, a hiring freeze, and a $6M budget gap.'
  },

  {
    id: 'pain-points',
    type: 'grid',
    title: 'What We See From the Outside',
    subtitle: 'Based on budget documents, commissioner meetings, and regional news. Click for evidence.',
    cards: [
      { label: '134 Tax Rates — No Analytics', tag: 'Complexity', detail: '3rd most complex taxing structure in Washington State. 134 different rates across jurisdictions. Revenue forecasting, assessment optimization, and compliance tracking at this scale demands data tools — not spreadsheets.' },
      { label: 'Hiring Freeze in Effect', tag: 'Constraint', detail: 'Commissioners implemented a hiring freeze and "performance management review" for any new positions after 2026 draft expenditures exceeded revenues by $6M+. You can\'t hire your way out. Technology is the only path.' },
      { label: '$54M Revenue at Risk', tag: 'Dependency', detail: 'Data center property taxes = $54M/year. What if state tax incentives change? If energy costs make the location uncompetitive? If an operator consolidates? No scenario modeling exists for your largest revenue source.' },
      { label: 'Farmers vs. Data Centers', tag: 'Conflict', detail: 'May 2026: Farmers and homeowners fighting eminent domain for 100-foot transmission lines. PUD needs capacity for data centers. Commissioners need data-driven decision support for the most contentious issue in the county.' },
      { label: '9 Staff, 2,681 Square Miles', tag: 'Coverage', detail: 'Joseph Carter (Assistant Director) leads a 9-person Technology Services team supporting the entire county government. With a hiring freeze, automation and AI aren\'t aspirational — they\'re survival.' },
      { label: 'Retail Sales Declining', tag: 'Economy', detail: 'Taxable retail sales: $3.57B in 2024, down 6.6% from 2023 — significantly underperforming the statewide growth rate of 1.2%. The data center boom isn\'t lifting all boats.' }
    ]
  },

  {
    id: 'insight',
    type: 'content',
    layout: 'split',
    visual: 'alert',
    title: 'Something You Might Not See Yet',
    body: 'We analyzed your revenue structure, retail trends, and staffing data. Here’s what stands out:',
    items: [
      { label: 'Retail sales are declining WHILE data center revenue grows', detail: '$3.57B in 2024 retail sales — down 6.6% from 2023, while the state grew 1.2%. The data center boom is NOT lifting the broader economy. Property tax windfalls are masking a weakening consumer base.' },
      { label: 'Your IT team is 56% help desk', detail: '5 of 9 Technology Services staff are Helpdesk Technicians. Only 1 Network Administrator, 1 Systems Administrator, and 1 Assistant Director. There is zero capacity for strategic projects, analytics, or automation — only break-fix.' },
      { label: 'The PUD transmission fight will freeze DC growth', detail: 'If farmers successfully block the 100-foot transmission lines (May 2026 conflict), no new data center capacity can come online. Your $54M/year revenue stream flatlines. The $6M budget gap becomes permanent.' }
    ]
  },

  {
    id: 'what-if',
    type: 'stats',
    title: 'What If You Could See This?',
    subtitle: 'Intelligence tools designed for a 9-person team managing a $325M county.',
    stats: [
      { value: '$325.5M', label: 'Total county budget' },
      { value: '134', label: 'Tax rate zones' },
      { value: '$3.57B', label: 'Taxable retail sales' },
      { value: '-6.6%', label: 'Retail YoY decline' }
    ],
    chart: {
      type: 'bar',
      title: 'Revenue Concentration Risk',
      items: [
        { label: 'Data center property tax', value: 54, color: 'accent' },
        { label: 'Agricultural property tax', value: 18, color: 'blue' },
        { label: 'Retail sales tax', value: 12, color: 'blue' },
        { label: 'All other sources', value: 8, color: 'blue' }
      ],
      unit: '$M (illustrative)'
    },
    items: [
      { label: 'Revenue Scenario Modeler', detail: 'What happens to the budget if one major data center operator leaves? If tax incentives expire? If energy costs rise 20%? Give commissioners data to plan beyond the current windfall.' },
      { label: 'Rural Service Optimizer', detail: '2,681 sq miles, 100K people. AI-powered routing for service requests, emergency response, and resource deployment. Extend the reach of a small team across vast distances.' },
      { label: 'Land Use Decision Support', detail: 'For the data center vs. agriculture conflict: model energy capacity allocation, land conversion rates, tax revenue projections, employment impact, and water usage under different policy scenarios.' }
    ]
  },

  
  {
    id: 'demos',
    type: 'content',
    layout: 'centered',
    title: 'Explore the Interactive Demos',
    body: 'We built these specifically for Grant County. Each one uses real public data to show what\u2019s possible.<br><br><a href="./revenue-intelligence.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Revenue Intelligence</a><br><span style="font-size:0.8em;color:#94a3b8">Data center revenue risk and scenario modeling</span><br><br><a href="./rural-service-optimizer.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Rural Service Optimizer</a><br><span style="font-size:0.8em;color:#94a3b8">Automation that lets 9 staff cover 2,681 sq miles</span><br><br><a href="./land-use-impact.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Land Use Impact Modeler</a><br><span style="font-size:0.8em;color:#94a3b8">Data centers vs. agriculture decision support</span>'
  },

  {
    id: 'timeline',
    type: 'timeline',
    title: 'How We\'d Work Together',
    subtitle: 'Designed for a team that can\'t add headcount. Fast value, minimal overhead.',
    tracks: [
      { label: 'Discovery & Quick Assessment', start: 0, end: 2, color: 'accent', detail: 'Understand your 9-person team\'s priorities. Map the 134 tax rates. Identify the 3 highest-ROI automation opportunities. No disruption to daily operations.' },
      { label: 'Revenue Intelligence Tool', start: 2, end: 4, color: 'accent', detail: 'Build the scenario modeler for data center revenue dependency. Give commissioners visibility into concentration risk. First deliverable with immediate strategic value.' },
      { label: 'Operational Automation', start: 3, end: 6, color: 'blue', detail: 'AI-powered tools that let 9 people do the work of 15. Automated monitoring, intelligent routing, predictive maintenance. Designed to run without dedicated administrators.' },
      { label: 'Knowledge Transfer', start: 6, end: 8, color: 'blue', detail: 'Train your team to maintain and extend everything we build. No vendor dependency. No ongoing licensing. You own it.' }
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
    body: '30 minutes. No sales theater. Just a direct discussion about your priorities and whether we can help.<br><br><strong>mouliqe.com/contact</strong> &middot; imtiaz@mouliqe.com',
    items: [
      { label: 'What we\'ll cover', detail: 'Your top priorities for the next 12 months. Where the hiring freeze hurts most. What the data center revenue risk looks like from your seat. Whether external help makes sense.' },
      { label: 'What you\'ll get', detail: 'An honest outside perspective on your technology landscape from someone who\'s helped dozens of rural counties navigate similar constraints.' }
    ]
  }
];
