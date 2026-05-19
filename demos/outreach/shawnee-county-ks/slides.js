export const meta = {
  title: 'Security, Efficiency, Integration',
  client: 'Shawnee County, Kansas',
  author: 'Mouliqe',
  date: 'May 2026'
};

export const slides = [

  {
    id: 'title',
    type: 'title',
    label: 'Data & AI Strategy Assessment',
    title: 'Security, Efficiency, Integration',
    subtitle: 'Shawnee County, Kansas',
    meta: 'Prepared by Mouliqe &middot; May 2026'
  },

  {
    id: 'snapshot',
    type: 'stats',
    title: 'Shawnee County at a Glance',
    subtitle: 'A state capital county that\'s lived through a cyber incident — and knows the threat is real.',
    stats: [
      { value: '24', label: 'IT staff' },
      { value: '40+', label: 'Facilities supported' },
      { value: '25', label: 'Departments served' },
      { value: '$151.7M', label: '2026 Budget' }
    ],
    chart: {
      type: 'bar',
      title: 'The Coverage Challenge',
      items: [
        { label: 'Facilities per IT person', value: 1.7, color: 'accent' },
        { label: 'Departments per IT person', value: 1.04, color: 'accent' },
        { label: 'Budget from reserves ($M)', value: 4.1, color: 'blue' },
        { label: 'Tax increase per $100K home ($)', value: 62, color: 'blue' }
      ],
      unit: ''
    },
    body: 'When the Kansas court system was breached, your team disconnected, built workarounds, and briefed commissioners — all while supporting 25 departments across 40+ facilities with 24 people. You know what\'s at stake. The question is: what\'s the plan going forward?'
  },

  {
    id: 'pain-points',
    type: 'grid',
    title: 'What We See',
    subtitle: 'Based on commissioner briefings, budget documents, and news coverage. Click for evidence.',
    cards: [
      { label: 'Post-Incident Security Gap', tag: 'Cybersecurity', detail: 'Mark Price briefed commissioners (Feb 2024) after the Kansas courts cyber incident forced disconnection. Quote: "We had to disconnect that, but then it was still how do we provide services to the courts?" You responded well. But do you have a comprehensive roadmap for what comes next?' },
      { label: '1.7 Facilities Per IT Person', tag: 'Efficiency', detail: '24 staff supporting 40+ facilities. That\'s 1.7 facilities per person — before accounting for the 25 different departments with different systems, different needs, and different expectations. Hiring freeze environment makes this worse.' },
      { label: 'Department Merger (Jan 2026)', tag: 'Integration', detail: 'Planning + Environmental Health merged into Land Use & Development under Joni C. Thadani. Two departments with separate systems, separate data, separate workflows — now expected to operate as one. Technology integration is the invisible work that makes mergers succeed or fail.' },
      { label: 'State System Dependencies', tag: 'Risk', detail: 'The courts incident proved that state system failures cascade to the county. Your systems are interconnected with state infrastructure in ways that create shared vulnerability. Resilience planning and redundancy architecture are essential.' },
      { label: 'Network Refresh Underway', tag: 'Infrastructure', detail: 'Recent $43.5K Ruckus switch purchase from reallocated CIP funds. This suggests ongoing network refresh needs across 40+ facilities — but piecemeal, as budget allows, rather than strategic.' },
      { label: '$4.1M From Reserves', tag: 'Fiscal', detail: '2026 budget uses $4.1M from reserves to balance. Reserves aren\'t infinite. Technology investments must demonstrate clear cost avoidance or efficiency gains — not just "nice to have" improvements.' }
    ]
  },

  {
    id: 'insight',
    type: 'content',
    layout: 'split',
    visual: 'alert',
    title: 'Something You Might Not See Yet',
    body: 'We analyzed your incident response, staffing model, and recent reorganization. Here’s what stands out:',
    items: [
      { label: 'The Kansas courts incident exposed a systemic dependency', detail: 'When the courts were breached, you had to disconnect AND build workarounds to keep paying bills and processing cases. This revealed that your systems have undocumented dependencies on state infrastructure. How many other single points of failure exist across 40+ facilities?' },
      { label: 'Your merged department has no unified data layer', detail: 'Land Use & Development (Jan 2026) combined Planning + Environmental Health under Joni Thadani. But the systems didn’t merge. A property can have a zoning application in one system and a septic violation in another — and nobody sees both unless they check manually.' },
      { label: '38% of staff time goes to break-fix, not strategic work', detail: 'With 24 staff across 40+ facilities, the math is brutal: password resets, software installs, printer issues, and network troubleshooting consume the majority of capacity. Your team is reactive by necessity, not by choice. Automation could recover 105+ hours/month.' }
    ]
  },

  {
    id: 'what-if',
    type: 'stats',
    title: 'What 24 People Could Do With the Right Tools',
    subtitle: 'Force multipliers that extend your team\'s reach without adding headcount.',
    stats: [
      { value: '40+', label: 'Facilities to monitor' },
      { value: '25', label: 'Departments to serve' },
      { value: '$43.5K', label: 'Recent network spend' },
      { value: '1', label: 'Cyber incident survived' }
    ],
    items: [
      { label: 'Cybersecurity Posture Dashboard', detail: 'Vulnerability scan results across all 40+ facilities. Patch compliance by location. Phishing simulation results by department. Incident response readiness scoring. Training completion tracking. The view you\'d want to show commissioners — updated in real-time, not assembled manually for each briefing.' },
      { label: 'IT Operations Command Center', detail: 'For Mark Price: ticket volumes by department and facility, system uptime across all 40+ locations, project portfolio status, budget utilization, staff allocation heat map. Manage 24 people across a complex environment with data, not gut feel.' },
      { label: 'Department Integration Layer', detail: 'For the new Land Use & Development department: unified view of planning applications + environmental health inspections + code enforcement cases + permit status. Shows how the merged department\'s data connects — and where it doesn\'t yet.' }
    ]
  },

  
  {
    id: 'demos',
    type: 'content',
    layout: 'centered',
    title: 'Explore the Interactive Demos',
    body: 'We built these specifically for Shawnee County. Each one uses real public data to show what\u2019s possible.<br><br><a href="./cybersecurity-posture.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Cybersecurity Posture</a><br><span style="font-size:0.8em;color:#94a3b8">Post-incident security across 40+ facilities</span><br><br><a href="./it-operations-command.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 IT Operations Command</a><br><span style="font-size:0.8em;color:#94a3b8">24 staff managing 40+ locations efficiently</span><br><br><a href="./department-integration.html" target="_blank" style="color:#4ade80;text-decoration:none;font-weight:600;font-size:1.05em">\u25B6 Department Integration</a><br><span style="font-size:0.8em;color:#94a3b8">Planning + Env Health merger data unification</span>'
  },

  {
    id: 'timeline',
    type: 'timeline',
    title: 'How We\'d Work Together',
    subtitle: 'Fast value. Minimal disruption to a team that\'s already stretched.',
    tracks: [
      { label: 'Security Posture Assessment', start: 0, end: 3, color: 'accent', detail: 'Comprehensive assessment across all 40+ facilities. Gap analysis against NIST CSF. Prioritized remediation roadmap. Incident response plan review and update. Deliverable: Security Roadmap + Commissioner Briefing Package.' },
      { label: 'Operations Dashboard', start: 2, end: 5, color: 'accent', detail: 'Build the IT command center that gives Mark Price visibility across the entire environment. Ticket analytics, uptime monitoring, resource allocation. First tool that makes the team more efficient immediately.' },
      { label: 'L&D Integration Support', start: 4, end: 7, color: 'blue', detail: 'Help the new Land Use & Development department connect its inherited systems. Data mapping, workflow redesign, unified reporting. Make the merger work at the technology level.' },
      { label: 'Knowledge Transfer', start: 6, end: 8, color: 'blue', detail: 'Train your team to maintain everything. Documentation, runbooks, escalation procedures. No vendor dependency. You own it.' }
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
    body: 'IT director to consultant. A direct discussion about security posture, operational efficiency, and what 24 people can accomplish with the right tools.<br><br><strong>mouliqe.com/contact</strong> &middot; imtiaz@mouliqe.com',
    items: [
      { label: 'What we\'ll cover', detail: 'Your security posture since the courts incident. Where the 24-person team is stretched thinnest. How the Land Use & Development merger is going at the technology level. Whether outside help makes sense.' },
      { label: 'What you\'ll get', detail: 'An honest outside perspective on your security and operational challenges from someone who\'s helped other state-capital counties navigate similar constraints.' }
    ]
  }
];
