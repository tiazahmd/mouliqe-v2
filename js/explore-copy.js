// explore-copy.js — Node descriptions, summaries, toggle text, timeline data
export const DESC = {
  sources: {
    automation:   'The inputs to your automation. We map every existing data source — systems, APIs, manual exports — and establish reliable, monitored connections.',
    reliability:  'Your existing inputs. For a reliability problem, source data is usually fine. The issues are downstream.',
    data:         'The root of the problem. Multiple sources with no shared identifier, inconsistent formats, and no clear owner. This is where the audit starts.',
    'ai-product': 'The data your product needs to function. We map what exists today, what needs to be created, and what will arrive in real time.',
    cost:         'Your current data sources may be over-fetched or redundantly queried. We audit what\u2019s actually needed versus what\u2019s being pulled \u2014 reducing token waste starts at the input layer.',
    migrate:      'The systems you\u2019re moving away from. We catalog every source, its schema, data volume, and downstream dependencies before touching anything.',
    reporting:    'The raw inputs feeding your reports. We map every source to ensure nothing is missed and every metric traces back to an authoritative origin.',
  },
  ingestion: {
    automation:   'The backbone of your automation. Reliable ETL pipelines that move and transform data without human intervention — and alert when something breaks.',
    reliability:  'Likely not your core problem. But clean ingestion is a prerequisite for anything trustworthy downstream.',
    data:         'The most critical layer for your situation. Standardizing schemas, consolidating sources, building a single definition for every metric.',
    'ai-product': 'The pipeline feeding your AI. Data quality here directly determines output quality — garbage in, confident garbage out.',
    cost:         'Inefficient pipelines often duplicate processing or send unnecessary context to AI models. Optimizing ingestion can cut costs before you even touch the model layer.',
    migrate:      'The most critical layer in a migration. Building new pipelines that replicate existing logic while improving reliability, with parallel runs to validate before cutover.',
    reporting:    'The pipeline that feeds your dashboards. Automated, scheduled, and monitored \u2014 so reports are always current and nobody spends Monday morning debugging a broken refresh.',
  },
  warehouse: {
    automation:   'Consolidated, queryable data that automation can rely on. The difference between automation that holds and automation that quietly drifts.',
    reliability:  'A clean warehouse is non-negotiable for reliable AI. Without it, models pick between conflicting numbers — and you never know which one they chose.',
    data:         'The primary deliverable for your situation. A properly structured warehouse with documented lineage, consistent schemas, and a single source of truth per metric.',
    'ai-product': 'The knowledge base your AI draws from. Quality and structure here determine how useful and trustworthy your product actually is.',
    cost:         'A well-structured warehouse enables caching, pre-computation, and semantic search \u2014 all of which dramatically reduce the number of expensive AI model calls needed.',
    migrate:      'The target destination. Schema design, data type mapping, and constraint validation happen here. Get this wrong and everything downstream inherits the problems.',
    reporting:    'The single source of truth your reports draw from. Consistent metric definitions, documented lineage, and a schema that makes self-service queries possible.',
  },
  ai: {
    automation:   'AI where it genuinely makes sense — not everywhere. Classification, extraction, generation — each with validation before any action is taken.',
    reliability:  'The core of your problem. Not just a model call — a structured multi-agent pipeline with output validation, guardrails, and context management built in from the start.',
    data:         'The goal, but not yet. Build the data foundation first, or this layer generates confident, well-formatted wrong answers.',
    'ai-product': 'The core of what you\'re building. Production AI requires context management, memory systems, guardrails, and validated outputs — not just a model wrapped in an API.',
    cost:         'The primary cost driver. Model selection, prompt optimization, caching strategies, semantic routing, and RAG architecture \u2014 each decision directly impacts your monthly bill.',
    migrate:      'Usually not the focus of a migration \u2014 but if you\'re moving AI workloads between platforms, model compatibility, context management, and eval parity all need attention.',
    reporting:    'AI-enhanced reporting: automated narrative generation, anomaly detection, and natural language queries against your data. Useful but not always necessary \u2014 depends on your team\'s needs.',
  },
  output: {
    automation:   'Automated reports, triggered workflows, and actions that run without human intervention. This is where the time savings and ROI show up.',
    reliability:  'Validated, trustworthy outputs that users can actually rely on. Every guardrail upstream exists to make this layer dependable.',
    data:         'Better reporting and cleaner answers — once the data underneath them is worth trusting.',
    'ai-product': 'Your product\'s interface. API responses, a conversational UI, generated content, or automated decisions — built on a reliable foundation.',
    cost:         'Optimized outputs mean fewer redundant calls. Response caching, tiered model routing, and batch processing can reduce costs by 60\u201390% without degrading quality.',
    migrate:      'Your users shouldn\'t notice the migration happened. Same reports, same APIs, same dashboards \u2014 just faster, more reliable, and on modern infrastructure.',
    reporting:    'The dashboards, reports, and alerts your team actually uses. Built for the questions leadership actually asks, not vanity metrics nobody acts on.',
  },
};

export const SUMMARY = {
  'automation-scattered':  'Significant data infrastructure work comes before the automation layer is viable. Scattered inputs make any automation fragile. Expect 8–12 weeks: 4–6 weeks of data foundation, then the automation layer on top.',
  'automation-siloed':     'The data is there — it\'s just fragmented. Consolidate first, then automate. Expect 6–10 weeks total depending on the number of systems.',
  'automation-clean':      'Clean data means you can move fast. Automation pipelines are achievable in 4–6 weeks from here, without a major infrastructure project first.',
  'reliability-scattered': 'Messy data is likely contributing to your reliability problems. Fixing the foundation will resolve a significant portion of the unreliability you\'re seeing upstream.',
  'reliability-siloed':    'Fragmented sources may be silently degrading AI performance. Worth auditing the data layer before investing further in the AI layer itself.',
  'reliability-clean':     'With clean data, reliability improvements are purely architectural — guardrails, multi-agent pipelines, output validation. This is very fixable.',
  'data-scattered':        'Start with data consolidation — not AI. You need a single source of truth before anything useful can be built on top. Typically 4–8 weeks for the foundation.',
  'data-siloed':           'The data exists, it\'s just fragmented. Consolidation and a proper warehouse is the first milestone. AI comes after the foundation is solid.',
  'data-clean':            'Better shape than most. A lightweight warehouse cleanup and AI layer are likely achievable without a major data overhaul first.',
  'ai-product-scattered':  'Building a product on messy data produces a messy product. Data foundation first — then the AI layer can actually deliver on what it promises.',
  'ai-product-siloed':     'Doable, but siloed data will create blind spots in your AI product. Worth resolving early before it becomes a product quality issue.',
  'ai-product-clean':      'Good data foundation — the focus can go where it belongs. AI architecture, guardrails, context management, and building the product experience.',
  'cost-scattered':        'Scattered data means your AI is probably processing far more than it needs to. Consolidating sources and adding a caching layer can cut costs dramatically — but the data work comes first.',
  'cost-siloed':           'Siloed data often leads to redundant AI calls across systems. Unifying the data layer and adding semantic caching and model routing can reduce costs by 60-80%.',
  'cost-clean':            'Clean data is the best starting point for cost optimization. The focus is purely on the AI layer — prompt engineering, model tiering, caching, and routing. Fast wins likely.',
  'migrate-scattered':     'Migrating scattered data is the hardest variant. Every source needs mapping, cleaning, and validation before it lands in the new system. Plan for 8-12 weeks minimum.',
  'migrate-siloed':        'Structured but siloed data migrates well with proper planning. The risk is in the joins and relationships between systems that only exist in people\'s heads.',
  'migrate-clean':         'Clean, centralized data is the easiest migration. Schema mapping, parallel runs, and cutover planning. Typically 4-6 weeks with minimal risk.',
  'reporting-scattered':   'You can\'t build trustworthy reports on messy data. The first milestone is a clean, consolidated data layer — then the dashboards practically build themselves.',
  'reporting-siloed':      'The data exists but lives in silos. Consolidating into a single warehouse with consistent metric definitions is the unlock. Dashboards follow quickly after.',
  'reporting-clean':       'With clean data, this is primarily a design and delivery engagement. KPI frameworks, dashboard builds, and self-service access for your team. Fast turnaround.',
};

export const TOGGLE_DESC = {
  skipData: {
    sources:   'Unvalidated, inconsistent raw inputs — no normalization, no common identifiers.',
    ingestion: 'Skipped entirely. No schema enforcement, no cleaning, no single source of truth.',
    warehouse: 'Non-existent. Raw data feeds the AI directly with no structure or validation.',
    ai:        'Running on raw, inconsistent inputs. Outputs will be confident, well-formatted, and wrong.',
    output:    'Unreliable. The AI generates answers — they just can\'t be trusted without the foundation underneath.',
  },
  noGuardrails: {
    ai: 'No output validation, no permission classification, no behavioral constraints. The model interprets your request literally — including edge cases you didn\'t anticipate.',
  },
  singleAgent: {
    ai: 'One model handles planning, execution, and response synthesis. Works at small scale. As context grows, signal-to-noise degrades and hallucinations gradually increase.',
  },
  noMonitoring: {
    ingestion: 'Pipelines run without health checks. When a source schema changes or a job fails silently, you won\u2019t know until someone notices bad data in a report \u2014 days or weeks later.',
    warehouse: 'No data quality monitoring. Duplicate records, null values, and schema drift accumulate silently. The warehouse looks fine until someone makes a decision based on wrong numbers.',
    output:    'Dashboards and APIs serve stale or incorrect data with no indication anything is wrong. Users lose trust gradually, then all at once.',
  },
  noCaching: {
    ai:     'Every request \u2014 including repeated questions \u2014 hits the model API at full cost. No semantic caching, no pre-computation. Costs scale linearly with usage instead of flattening.',
    output: 'Identical queries generate fresh responses every time. Response times are slower, costs are higher, and the system can\u2019t handle traffic spikes without degradation.',
  },
  skipTesting: {
    ingestion: 'No validation that transformed data matches the source. Schema changes, rounding errors, and dropped rows go undetected until they surface as business problems.',
    warehouse: 'No reconciliation between old and new systems. Row counts, aggregates, and edge cases are assumed correct. Migration bugs become permanent data quality issues.',
    ai:        'No eval framework. Model regressions are invisible \u2014 accuracy degrades over time and nobody notices until users complain. No baseline to compare against.',
  },
};

export const TOGGLE_WARN = {
  skipData:     'Without a data foundation, AI outputs are confident guesses. You won\'t know they\'re wrong until they cause a problem.',
  noGuardrails: 'An AI without guardrails will eventually take an action you didn\'t intend. The question isn\'t if — it\'s when, and whether you\'ll catch it first.',
  singleAgent:  'A single-agent approach works fine initially. The cracks appear gradually — missed tool calls, hallucinated results — until the system quietly stops being reliable.',
  noMonitoring: 'Without monitoring, failures are silent. You\u2019ll find out something broke when a stakeholder asks why the numbers look wrong \u2014 not when it actually happens.',
  noCaching:    'No caching means every request costs full price. Repeated queries, common questions, and batch operations all hit the model API individually. Costs grow linearly with usage.',
  skipTesting:  'Without testing, you\u2019re trusting that everything works correctly on the first try. In data systems, it never does. The bugs you don\u2019t catch become the data your business runs on.',
};

export const DRILLDOWN = {
  sources: {
    stack:   'PostgreSQL · MySQL · REST & GraphQL APIs · S3 · Salesforce · HubSpot · CSV / Excel exports',
    breaks:  'Undocumented APIs that change without notice. Missing credentials. Sources with no clear owner. Inconsistent field names across systems causing silent join failures.',
    mouliqe: 'Integration design, connector implementation, monitoring & alerting',
    client:  'Access credentials, data ownership decisions, stakeholder sign-off on source priority',
  },
  ingestion: {
    stack:   'Apache Airflow · dbt · Fivetran · Airbyte · Python ETL scripts · Great Expectations · AWS Glue',
    breaks:  'Schema changes upstream breaking pipelines silently. No data quality checks. Manual hotfixes becoming permanent. Pipelines without alerting failing for hours undetected.',
    mouliqe: 'Pipeline design, ETL code, data quality rules, alerting setup, documentation',
    client:  'Business rules validation, acceptance testing, cadence & scheduling requirements',
  },
  warehouse: {
    stack:   'Snowflake · BigQuery · Redshift · DuckDB · dbt for transformations · data lineage tooling',
    breaks:  'Multiple conflicting definitions of the same metric. No lineage documentation. Schema drift over time. Access controls not enforced — any query can read any table.',
    mouliqe: 'Schema design, implementation, dbt models, query optimization, lineage docs',
    client:  'Data governance decisions, metric definitions sign-off, access policy approval',
  },
  ai: {
    stack:   'OpenAI · Anthropic · LangChain · LlamaIndex · Pinecone · Redis · custom eval frameworks · LangSmith',
    breaks:  'Context window overflow as usage scales. Guardrails bypassed by edge-case inputs. No evals — regressions are invisible until users complain. Single-model bottleneck under load.',
    mouliqe: 'Model selection & architecture, orchestration, guardrails, eval framework, cost optimization',
    client:  'Domain knowledge & edge cases, acceptable-use policy, human-in-the-loop review process',
  },
  output: {
    stack:   'FastAPI · Next.js · Retool · Metabase · Grafana · Slack & email webhooks · custom UI components',
    breaks:  'Dashboards disconnected from the live data model. APIs with no rate limiting. No error states shown to users. Outputs delivered without provenance or trust signals.',
    mouliqe: 'Build, deployment, performance tuning, error handling, monitoring',
    client:  'Requirements definition, UX decisions, user acceptance testing & sign-off',
  },
};

export const TIMELINE = {
  'automation-scattered':  { phases: ['Data audit & source mapping','ETL pipeline build','Automation layer'], weeks: ['2–3w','3–4w','2–3w'], total: '7–10 weeks', cost: 'High',    costReason: 'Data foundation required before automation is viable' },
  'automation-siloed':     { phases: ['Source consolidation','Warehouse setup','Automation pipelines'], weeks: ['2–3w','1–2w','2–3w'], total: '5–8 weeks', cost: 'Medium', costReason: 'Data mostly available — integration & pipeline work' },
  'automation-clean':      { phases: ['Quick data audit','Automation pipeline build','Testing & deploy'], weeks: ['1w','2–3w','1–2w'], total: '4–6 weeks', cost: 'Medium', costReason: 'Clean data means focused scope and faster delivery' },
  'reliability-scattered': { phases: ['Data audit & cleanup','Reliability architecture redesign','Guardrails & validation'], weeks: ['3–4w','2–3w','2w'], total: '7–9 weeks', cost: 'High', costReason: 'Data quality must be addressed before AI reliability is fixable' },
  'reliability-siloed':    { phases: ['Data unification','AI architecture refactor','Guardrails & monitoring'], weeks: ['2–3w','2–3w','1–2w'], total: '5–8 weeks', cost: 'High', costReason: 'Multi-agent refactor with data consolidation in parallel' },
  'reliability-clean':     { phases: ['AI architecture redesign','Guardrails & output validation','Load testing & monitoring'], weeks: ['2–3w','1–2w','1w'], total: '4–6 weeks', cost: 'Medium', costReason: 'Pure architecture problem — no upstream data work needed' },
  'data-scattered':        { phases: ['Audit & source mapping','Schema design & ETL build','Warehouse delivery & docs'], weeks: ['2–3w','3–4w','1–2w'], total: '6–9 weeks', cost: 'High', costReason: 'Extensive consolidation and standardization from scratch' },
  'data-siloed':           { phases: ['Source mapping & gap analysis','Warehouse consolidation','Validation & handoff'], weeks: ['1–2w','2–3w','1w'], total: '4–6 weeks', cost: 'Medium', costReason: 'Structure exists — consolidation is the primary workstream' },
  'data-clean':            { phases: ['Gap analysis & AI-readiness audit','Optimization & lineage','Docs & handoff'], weeks: ['1w','2–3w','1w'], total: '4–5 weeks', cost: 'Medium', costReason: 'Incremental improvement on an already-solid foundation' },
  'ai-product-scattered':  { phases: ['Data foundation build','AI architecture & guardrails','Product build & deployment'], weeks: ['3–4w','3–4w','2–3w'], total: '8–11 weeks', cost: 'Complex', costReason: 'Full-stack engagement: data layer + AI architecture + product' },
  'ai-product-siloed':     { phases: ['Data consolidation','AI architecture & guardrails','Product build & deployment'], weeks: ['2–3w','2–3w','2–3w'], total: '6–9 weeks', cost: 'Complex', costReason: 'AI product build with upstream data consolidation required' },
  'ai-product-clean':      { phases: ['AI architecture & guardrails','Product build','Testing & deployment'], weeks: ['2–3w','2–4w','1–2w'], total: '5–9 weeks', cost: 'High', costReason: 'Focused AI product build on an already-solid data foundation' },
  'cost-scattered':        { phases: ['Data audit & consolidation','AI architecture review','Cost optimization & caching'], weeks: ['3–4w','2–3w','1–2w'], total: '6–9 weeks', cost: 'High', costReason: 'Data foundation work required before AI cost optimization is meaningful' },
  'cost-siloed':           { phases: ['Data unification','Model routing & caching','Monitoring & optimization'], weeks: ['2–3w','2–3w','1w'], total: '5–7 weeks', cost: 'Medium', costReason: 'Data consolidation enables caching and routing optimizations' },
  'cost-clean':            { phases: ['AI cost audit','Prompt & model optimization','Caching & routing deploy'], weeks: ['1w','2–3w','1w'], total: '4–5 weeks', cost: 'Medium', costReason: 'Pure AI layer optimization — no upstream data work needed' },
  'migrate-scattered':     { phases: ['Source audit & mapping','Schema design & ETL build','Parallel run & cutover'], weeks: ['3–4w','3–4w','2–3w'], total: '8–11 weeks', cost: 'Complex', costReason: 'Full migration from scattered sources to modern infrastructure' },
  'migrate-siloed':        { phases: ['Schema mapping & gap analysis','Pipeline build & data transfer','Validation & cutover'], weeks: ['2–3w','2–3w','1–2w'], total: '5–8 weeks', cost: 'High', costReason: 'Structured migration with cross-system dependency resolution' },
  'migrate-clean':         { phases: ['Schema mapping','Data transfer & validation','Cutover & monitoring'], weeks: ['1–2w','2–3w','1w'], total: '4–6 weeks', cost: 'Medium', costReason: 'Clean source data makes migration straightforward' },
  'reporting-scattered':   { phases: ['Data audit & consolidation','Warehouse & metric definitions','Dashboard build & rollout'], weeks: ['3–4w','2–3w','2–3w'], total: '7–10 weeks', cost: 'High', costReason: 'Data foundation required before reporting is trustworthy' },
  'reporting-siloed':      { phases: ['Data consolidation','KPI framework & warehouse','Dashboard build & training'], weeks: ['2–3w','1–2w','2–3w'], total: '5–8 weeks', cost: 'Medium', costReason: 'Consolidation unlocks reporting — dashboards follow quickly' },
  'reporting-clean':       { phases: ['KPI framework design','Dashboard build','Self-service setup & training'], weeks: ['1w','2–3w','1w'], total: '4–5 weeks', cost: 'Medium', costReason: 'Clean data means focused dashboard and reporting delivery' },
};
