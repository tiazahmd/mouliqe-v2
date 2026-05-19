export const meta = {
  title: 'Modernization in Motion',
  client: 'Santa Fe County, New Mexico',
  author: 'Mouliqe',
  date: 'May 2026'
};

export const slides = [

  {
    id: 'title',
    type: 'title',
    label: 'Data & AI Strategy Assessment',
    title: 'Modernization in Motion',
    subtitle: 'Santa Fe County, New Mexico',
    meta: 'Prepared by Mouliqe &middot; May 2026'
  },

  {
    id: 'snapshot',
    type: 'stats',
    title: 'Santa Fe County at a Glance',
    subtitle: 'You\'re already investing heavily in technology. The question is: are you getting full value?',
    stats: [
      { value: '$305M+', label: 'FY2026 Budget' },
      { value: '$5.18M', label: 'Cybersecurity grant' },
      { value: '2', label: 'Major system implementations' },
      { value: '$382M', label: 'Broadband coming to NM' }
    ],
    chart: {
      type: 'bar',
      title: 'Active Technology Investments',
      items: [
        { label: 'Cybersecurity grant (federal)', value: 5.18, color: 'accent' },
        { label: 'Cloud ERP implementation', value: 3, color: 'blue' },
        { label: 'Jail management system', value: 2, color: 'blue' },
        { label: 'Code enforcement portal', value: 0.5, color: 'blue' },
        { label: 'Tax parcel viewer update', value: 0.3, color: 'blue' }
      ],
      unit: '$M (estimated)'
    },
    body: 'You\'re implementing a new cloud ERP, a new jail management system, a modernized code enforcement portal, and deploying $5.18M in cybersecurity funding — all simultaneously. That\'s ambitious. It\'s also risky without integration strategy.'
  },

  {
    id: 'pain-points',
    type: 'grid',
    title: 'Where Complexity Creates Risk',
    subtitle: 'Based on BCC meeting records, budget documents, and state-level reporting.',
    cards: [
      { label: 'Two Major Systems at Once', tag: 'Change Risk', detail: 'New cloud ERP AND new jail management system implementing simultaneously. Each is complex alone. Together: integration challenges, change fatigue, data migration risks, staff overwhelm, and competing vendor timelines.' },
      { label: '$5.18M With Federal Strings', tag: 'Compliance', detail: 'State and Local Cybersecurity Grant Program — one of the largest allocations for a county this size. Requires comprehensive deployment plan, milestone reporting, and federal compliance documentation. Are you maximizing it?' },
      { label: 'IT Buried in ASD', tag: 'Visibility', detail: 'Information Technology is a Division within Administrative Services — not a standalone department. This can limit strategic visibility, budget advocacy, and the ability to drive cross-department initiatives.' },
      { label: 'Broadband Expanding Attack Surface', tag: 'Security', detail: '$382M federal broadband buildout approved for 32 NM counties. As connectivity expands across rural Santa Fe County, so does the cybersecurity attack surface. Security must scale with infrastructure.' },
      { label: 'Behavioral Health Data Silos', tag: 'Policy Gap', detail: 'Commissioners declared May as Mental Health Awareness Month. Emphasis on trauma-informed, culturally responsive systems. But behavioral health data spans county, state, and nonprofit systems with no integration.' },
      { label: 'Housing + Environment + Planning', tag: 'Integration', detail: '$1M Developer Assistance Program + new prairie dog colony requirements (Resolution 2026-062) + environmental reports for development. Planning decisions increasingly require data from multiple disconnected sources.' }
    ]
  },

  {
    id: 'insight',
    type: 'content',
    layout: 'split',
    visual: 'alert',
    title: 'Something You Might Not See Yet',
    body: 'We looked at your implementation timeline, grant obligations, and organizational structure. Here’s what concerns us:',
    items: [
      { label: 'You’re implementing 2 major systems with no integration plan', detail: 'New cloud ERP and new jail management system deploying simultaneously. Both will contain overlapping data (people, payments, cases). Without an integration layer designed NOW, you’ll build new silos that are harder to connect later.' },
      { label: '$5.18M cybersecurity grant is only 24% deployed', detail: 'Based on the grant timeline, you should be closer to 40-50% deployed by now. Federal grants have strict milestone requirements. Falling behind on deployment pace risks compliance issues and potential clawback.' },
      { label: 'IT is invisible in your org chart', detail: 'Information Technology is a Division within ASD — not a department. It doesn’t have a seat at the leadership table. During simultaneous ERP + jail system implementations, technology decisions are being made without dedicated IT executive advocacy.' }
    ]
  },

  {
    id: 'what-if',
    type: 'stats',
    title: 'What Full Value Looks Like',
    subtitle: 'The intelligence layer that makes your technology investments work together.',
    stats: [
      { value: '5+', label: 'New systems deploying' },
      { value: '0', label: 'Integration layer' },
      { value: '155K', label: 'Residents served' },
      { value: '5', label: 'Commissioners expecting results' }
    ],
    items: [
      { label: 'ERP Analytics Dashboard', detail: 'What your ERP vendor doesn\'t provide out-of-box: budget vs. actuals in real-time, procurement cycle analysis, vendor performance scoring, grant spending rates against federal deadlines. Cross-department visibility for County Manager Shaffer.' },
      { label: 'Cybersecurity Posture Intelligence', detail: 'Deploy the $5.18M strategically: vulnerability landscape visualization, patch compliance tracking, training completion rates, incident response readiness scoring. Federal compliance reporting automated — not manual.' },
      { label: 'Cross-System Integration', detail: 'Connect ERP + jail management + code enforcement + tax parcel viewer into a unified data layer. When a property has a code violation AND a tax delinquency AND a development application — everyone sees the full picture.' }
    ]
  },

  
  {
    id: 'demos',
    type: 'content',
    layout: 'centered',
    title: 'Explore the Interactive Demos',
    body: 'We built these specifically for Santa Fe County. Each one uses real public data to show what\u2019s possible.<br><br><a href="./erp-analytics.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 ERP Analytics</a><br><span style="font-size:0.8em;color:#94a3b8">Budget execution, grant compliance, procurement cycles</span><br><br><a href="./cybersecurity-posture.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Cybersecurity Posture</a><br><span style="font-size:0.8em;color:#94a3b8">$5.18M grant deployment and NIST CSF maturity</span><br><br><a href="./cross-system-integration.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Cross-System Integration</a><br><span style="font-size:0.8em;color:#94a3b8">How 5 new systems should talk to each other</span>'
  },

  {
    id: 'timeline',
    type: 'timeline',
    title: 'How We\'d Work Together',
    subtitle: 'Complementing your active implementations — not competing with them.',
    tracks: [
      { label: 'Integration Assessment', start: 0, end: 2, color: 'accent', detail: 'Map how your new ERP, jail system, code enforcement portal, and tax viewer will (or won\'t) talk to each other. Identify integration gaps before they become problems.' },
      { label: 'Cybersecurity Roadmap', start: 1, end: 4, color: 'accent', detail: 'Comprehensive plan for deploying the $5.18M: posture assessment, gap analysis against NIST CSF, training program design, incident response planning. Meets federal reporting requirements.' },
      { label: 'Analytics Layer', start: 3, end: 6, color: 'blue', detail: 'Build the reporting and intelligence that your ERP vendor doesn\'t provide. Real-time dashboards for County Manager and commissioners. Cross-system insights.' },
      { label: 'Ongoing Optimization', start: 6, end: 8, color: 'blue', detail: 'Post-implementation optimization as your new systems mature. Performance tuning, user adoption support, advanced analytics as data accumulates.' }
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
    body: '30 minutes with someone who understands government technology implementations — the politics, the vendor dynamics, and the integration challenges that nobody warns you about.<br><br><strong>mouliqe.com/contact</strong> &middot; imtiaz@mouliqe.com',
    items: [
      { label: 'What we\'ll cover', detail: 'Where you are in your ERP and jail system implementations. How the cybersecurity grant deployment is going. What integration challenges have emerged. Whether outside help makes sense.' },
      { label: 'What you\'ll get', detail: 'An honest assessment of your integration risks and a perspective on how other counties have navigated simultaneous system implementations.' }
    ]
  }
];
