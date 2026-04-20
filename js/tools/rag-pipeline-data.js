// tools/rag-pipeline-data.js — sample documents, Q&A results, stage context
export const DOCS = {
  policy: {
    title: 'Company Policy',
    sub: 'PTO, Remote Work, Expenses',
    text: `Paid Time Off (PTO) Policy. All full-time employees accrue 20 days of paid time off per calendar year, prorated for mid-year hires. PTO accrues at a rate of 1.67 days per month and begins accruing on your first day of employment. Unused PTO may be carried over to the following year, up to a maximum balance of 30 days. Any balance exceeding 30 days will be forfeited on January 1st. Employees must submit PTO requests at least two weeks in advance for absences of three or more consecutive days. Requests of one to two days require at least 48 hours' notice. All requests are subject to manager approval based on team coverage needs.

Remote Work Policy. Employees may work remotely up to three days per week, with at least two days per week spent in the office. Remote work days must be agreed upon with your direct manager and logged in the scheduling system by Friday of the preceding week. During remote work days, employees must be available on Slack and responsive to messages within 30 minutes during core hours (10:00 AM to 3:00 PM local time). Home office setups must meet ergonomic standards outlined in the IT handbook. The company provides a one-time $500 stipend for home office equipment upon approval of your remote work arrangement.

Expense Reimbursement Policy. Business-related expenses must be submitted through the expense management portal within 30 days of the transaction. All expenses over $50 require an itemized receipt. Meal expenses during business travel are reimbursed up to $75 per day. Client entertainment expenses require pre-approval from a director-level manager and are capped at $200 per event. Mileage reimbursement for personal vehicle use on company business is calculated at the current IRS standard rate of $0.67 per mile. Air travel must be booked at economy class rates unless the flight duration exceeds six hours, in which case premium economy may be approved. Hotel accommodations should not exceed $250 per night in standard markets or $350 per night in high-cost cities (New York, San Francisco, London, Tokyo). Expense reports not submitted within the 30-day window may be denied at the discretion of the finance department.`,
    questions: [
      'How many PTO days do employees get per year?',
      'What are the rules for working remotely?',
      'What is the daily meal reimbursement limit during travel?',
    ],
  },
  faq: {
    title: 'Product FAQ',
    sub: 'Pricing, Features, Support',
    text: `What is NovaCRM? NovaCRM is a cloud-based customer relationship management platform designed for mid-market B2B companies. It combines contact management, deal pipeline tracking, email automation, and analytics in a single unified workspace. NovaCRM integrates natively with over 150 tools including Salesforce, HubSpot, Slack, Gmail, Outlook, Zapier, and most major marketing automation platforms.

Pricing and Plans. NovaCRM offers three plans: Starter at $29 per user per month (up to 10 users, 5,000 contacts, basic pipeline), Professional at $79 per user per month (unlimited users, 50,000 contacts, advanced automation, custom fields, API access), and Enterprise at $149 per user per month (unlimited everything, dedicated account manager, SSO/SAML, audit logs, custom SLA). All plans include a 14-day free trial with no credit card required. Annual billing saves 20% compared to monthly billing. Volume discounts are available for teams of 50 or more users.

Key Features. The deal pipeline supports unlimited custom stages with drag-and-drop movement, weighted probability scoring, and automated stage progression triggers. Email automation includes sequence builders, A/B testing, open and click tracking, and smart send-time optimization. The analytics dashboard provides real-time revenue forecasting, win-rate analysis by rep, pipeline velocity metrics, and custom report builders with scheduled delivery.

Integrations and API. NovaCRM's REST API supports full CRUD operations on all objects (contacts, companies, deals, activities, notes). Rate limits are 100 requests per minute on Starter, 500 on Professional, and 2,000 on Enterprise. Webhook support is available on Professional and Enterprise plans. The API documentation is available at docs.novacrm.io and includes SDKs for Python, Node.js, Ruby, and Go.

Support and Uptime. All plans include email support with a 24-hour response time. Professional plans add live chat support during business hours (Mon-Fri, 8 AM to 8 PM EST). Enterprise plans include 24/7 phone support with a dedicated support engineer and a guaranteed 4-hour response time for critical issues. NovaCRM maintains a 99.95% uptime SLA for Enterprise customers, backed by service credits. Status updates are published in real time at status.novacrm.io.`,
    questions: [
      'How much does the Professional plan cost?',
      'What integrations does NovaCRM support?',
      'What is the API rate limit for Enterprise users?',
    ],
  },
  legal: {
    title: 'Legal Contract',
    sub: 'SLA, Liability, Termination',
    text: `Service Agreement between Acme Solutions Ltd. ("Provider") and the undersigned client ("Client"). This agreement governs the provision of data engineering and analytics consulting services as outlined in the attached Statement of Work (SOW).

Term and Renewal. This agreement is effective for an initial term of twelve (12) months from the date of execution. The agreement will automatically renew for successive twelve-month periods unless either party provides written notice of non-renewal at least sixty (60) days prior to the end of the current term. Either party may terminate this agreement for convenience upon ninety (90) days' written notice to the other party.

Service Level Agreement (SLA). Provider commits to the following service levels: system availability of 99.9% measured monthly (excluding scheduled maintenance windows announced at least 48 hours in advance), incident response time of 15 minutes for Severity 1 (complete service outage), 1 hour for Severity 2 (major feature degradation), and 4 hours for Severity 3 (minor issues). If Provider fails to meet the availability SLA in any calendar month, Client is entitled to a service credit equal to 5% of that month's fees for each 0.1% below the 99.9% threshold, up to a maximum credit of 30% of monthly fees.

Limitation of Liability. In no event shall either party's total cumulative liability under this agreement exceed the total fees paid by Client during the twelve (12) months immediately preceding the claim. Neither party shall be liable for any indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of profits, revenue, data, or business opportunity, regardless of whether such damages were foreseeable. This limitation does not apply to (a) breaches of confidentiality obligations, (b) willful misconduct or gross negligence, or (c) indemnification obligations under Section 9 of this agreement.

Intellectual Property. All pre-existing intellectual property remains the property of the respective party. Work product created by Provider specifically for Client under a SOW shall be assigned to Client upon full payment of all associated fees. Provider retains the right to use general knowledge, skills, techniques, and methodologies (including reusable code components, frameworks, and tools) developed or refined during the engagement, provided such use does not disclose Client's confidential information.

Termination for Cause. Either party may terminate this agreement immediately upon written notice if the other party (a) commits a material breach that remains uncured for thirty (30) days after written notice specifying the breach, (b) becomes insolvent, files for bankruptcy, or makes an assignment for the benefit of creditors, or (c) fails to pay undisputed invoices within forty-five (45) days of the due date. Upon termination, Client shall pay for all services rendered through the termination date, and Provider shall deliver all work product completed to date.`,
    questions: [
      'What are the SLA response times for critical incidents?',
      'How can either party terminate this agreement?',
      'Who owns the intellectual property created during the engagement?',
    ],
  },
};

export const RESULTS = {
  policy: [
    { question: 'How many PTO days do employees get per year?',                 topChunks: [0, 1], answer: 'Full-time employees receive 20 days of paid time off per calendar year. This is prorated for mid-year hires, with PTO accruing at a rate of 1.67 days per month starting from the first day of employment. Unused PTO can be carried over up to a maximum balance of 30 days.' },
    { question: 'What are the rules for working remotely?',                     topChunks: [2, 3], answer: 'Employees may work remotely up to three days per week, with at least two in-office days required. Remote days must be agreed upon with your manager and logged by Friday of the preceding week. During remote work, you must be available on Slack and respond within 30 minutes during core hours (10 AM to 3 PM). The company provides a one-time $500 stipend for home office equipment.' },
    { question: 'What is the daily meal reimbursement limit during travel?',    topChunks: [4, 5], answer: 'Meal expenses during business travel are reimbursed up to $75 per day. All expenses over $50 require an itemized receipt, and expense reports must be submitted through the expense management portal within 30 days of the transaction. Reports submitted after the 30-day window may be denied by the finance department.' },
  ],
  faq: [
    { question: 'How much does the Professional plan cost?',                    topChunks: [2, 3],    answer: 'The NovaCRM Professional plan costs $79 per user per month. It includes unlimited users, up to 50,000 contacts, advanced automation, custom fields, and API access. Annual billing saves 20% compared to monthly billing, and volume discounts are available for teams of 50 or more users.' },
    { question: 'What integrations does NovaCRM support?',                      topChunks: [0, 1, 6], answer: 'NovaCRM integrates natively with over 150 tools, including Salesforce, HubSpot, Slack, Gmail, Outlook, Zapier, and most major marketing automation platforms. The platform also offers a REST API with full CRUD operations on all objects, with SDKs available for Python, Node.js, Ruby, and Go.' },
    { question: 'What is the API rate limit for Enterprise users?',             topChunks: [6, 7],    answer: 'Enterprise users have an API rate limit of 2,000 requests per minute. For comparison, Starter plans allow 100 requests per minute and Professional plans allow 500. Enterprise plans also include webhook support and full API documentation with SDKs at docs.novacrm.io.' },
  ],
  legal: [
    { question: 'What are the SLA response times for critical incidents?',      topChunks: [3, 4],    answer: 'For Severity 1 incidents (complete service outage), the response time is 15 minutes. Severity 2 incidents (major feature degradation) have a 1-hour response time, and Severity 3 (minor issues) have a 4-hour response time. The Provider also commits to 99.9% monthly system availability, with service credits of 5% per 0.1% shortfall, up to 30% of monthly fees.' },
    { question: 'How can either party terminate this agreement?',               topChunks: [1, 2, 8], answer: 'There are three termination paths: (1) for convenience, with 90 days written notice; (2) non-renewal, by providing written notice at least 60 days before the current term ends; or (3) for cause, effective immediately if the other party commits an uncured material breach (30-day cure period), becomes insolvent, or fails to pay undisputed invoices within 45 days. Upon termination, the Client pays for services rendered and the Provider delivers all completed work product.' },
    { question: 'Who owns the intellectual property created during the engagement?', topChunks: [7, 8], answer: "Work product created specifically for the Client under a Statement of Work is assigned to the Client upon full payment of all associated fees. However, the Provider retains the right to use general knowledge, skills, techniques, and reusable code components developed during the engagement, as long as this does not disclose the Client's confidential information. All pre-existing IP remains with its original owner." },
  ],
};

export const STAGE_CONTEXT = {
  chunk:    { title: 'Splitting into Chunks',        text: 'Splitting the document into overlapping chunks of approximately 200 characters with a 50-character overlap. Chunk boundaries are placed at sentence breaks to preserve meaning. Overlap ensures that information spanning two chunks is captured in at least one.', isAI: false },
  embed:    { title: 'AI: Computing Embeddings',     text: 'An embedding model converts each text chunk into a high-dimensional vector that captures semantic meaning. Similar concepts produce similar vectors, even when different words are used. The AI model learns these representations from billions of text examples.', isAI: true },
  search:   { title: 'Semantic Search',              text: 'Computing the embedding of your question, then calculating cosine similarity between the query vector and every chunk vector. Chunks with higher similarity scores are more likely to contain the answer. This replaces keyword matching with meaning-based retrieval.', isAI: false },
  retrieve: { title: 'AI: Re-Ranking & Retrieving',  text: 'A re-ranking agent evaluates the top candidate chunks for relevance, coherence, and answer coverage. Unlike the initial vector search, re-ranking uses a cross-encoder model that reads the query and each chunk together — slower but significantly more accurate.', isAI: true },
  generate: { title: 'AI: Generating Answer',        text: 'A language model synthesizes an answer grounded in the retrieved chunks. The AI agent reasons across multiple source passages, resolves any conflicts between them, and produces a coherent response. Grounding in retrieved text is what reduces hallucination.', isAI: true },
};
