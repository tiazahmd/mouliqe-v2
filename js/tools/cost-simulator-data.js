// tools/cost-simulator-data.js — scenarios + stage context + pricing
export const PRICE = {
  'Claude Sonnet 4.6': { input: 3.00, output: 15.00 },
  'Claude Haiku 4.5':  { input: 0.80, output: 4.00  },
};

export const STAGES = ['profile', 'baseline', 'optimize', 'compare', 'recommend'];
export const STAGE_CTX = {
  profile:   { title: 'AI: Profiling Architecture', text: 'Analysing token usage patterns, model selection efficiency, caching opportunities, and routing potential across the current setup...', isAI: true },
  baseline:  { title: 'Computing Baseline Cost',    text: 'Calculating current monthly spend based on tokens per query, Claude pricing, and query volume at your selected scale...',                   isAI: false },
  optimize:  { title: 'AI: Applying Optimisations', text: 'Sequentially applying architectural improvements — RAG, caching, model routing — and measuring the cost impact of each decision...',        isAI: true },
  compare:   { title: 'Comparing Before & After',   text: 'Building a side-by-side breakdown of the current setup vs the optimised architecture at each stage...',                                     isAI: false },
  recommend: { title: 'AI: Final Recommendations',  text: 'Identifying which changes drove the most savings and what the architecture now looks like at scale...',                                      isAI: true },
};

export const SCENARIOS = {
  support: {
    label: 'Customer Support AI', sub: 'Q&A from a large knowledge base',
    name: 'Customer Support AI',
    unit: 'queries/day',
    defaultVol: 500,
    baseline: {
      inputTok: 65000, outputTok: 1000, model: 'Claude Sonnet 4.6',
      desc: 'Full knowledge base passed to Claude Sonnet 4.6 on every call',
      arch: [
        { label: 'User Query',        sub: null,                        type: 'neutral' },
        { label: '65K Context',       sub: 'Full manual in every call', type: 'warn'    },
        { label: 'Claude Sonnet 4.6', sub: '$0.21 per query',           type: 'warn'    },
        { label: 'Response',          sub: '1K tokens out',             type: 'neutral' },
      ],
    },
    optimizations: [
      {
        name: 'Add RAG Layer',
        pattern: 'Retrieval-Augmented Generation',
        desc: 'Embed the knowledge base and retrieve only the top 3 relevant chunks per query — reducing context from 65K to 4K tokens without losing answer quality.',
        inputTok: 4000, outputTok: 800, model: 'Claude Sonnet 4.6', cacheHit: 0, routeFrac: 0, miniModel: null,
        arch: [
          { label: 'User Query',        sub: null,                    type: 'neutral' },
          { label: 'RAG Retrieval',     sub: 'Top 3 relevant chunks', type: 'new'     },
          { label: '4K Context',        sub: '94% fewer tokens',      type: 'better'  },
          { label: 'Claude Sonnet 4.6', sub: '$0.024 per query',      type: 'better'  },
          { label: 'Response',          sub: '800 tokens out',        type: 'neutral' },
        ],
      },
      {
        name: 'Semantic Caching',
        pattern: 'Query-Level Caching',
        desc: '35% of support queries are semantically identical — same question, different wording. Cache those responses once and serve them instantly at zero LLM cost.',
        inputTok: 4000, outputTok: 800, model: 'Claude Sonnet 4.6', cacheHit: 0.35, routeFrac: 0, miniModel: null,
        arch: [
          { label: 'User Query',        sub: null,                     type: 'neutral' },
          { label: 'RAG Retrieval',     sub: 'Relevant chunks only',   type: 'better'  },
          { label: '4K Context',        sub: 'Relevant chunks only',   type: 'better'  },
          { label: 'Claude Sonnet 4.6', sub: '$0.016 blended/query',   type: 'better'  },
          { label: 'Semantic Cache',    sub: '35% responses cached',   type: 'new'     },
          { label: 'Response',          sub: null,                     type: 'neutral' },
        ],
      },
      {
        name: 'Route by Complexity',
        pattern: 'Model Routing',
        desc: '70% of support queries are simple FAQ lookups — Claude Haiku 4.5 handles them at 14× lower input cost. Reserve Sonnet 4.6 for multi-step reasoning and nuanced edge cases only.',
        inputTok: 4000, outputTok: 800, model: 'Claude Sonnet 4.6', cacheHit: 0.35, routeFrac: 0.70, miniModel: 'Claude Haiku 4.5',
        arch: [
          { label: 'User Query',        sub: null,                          type: 'neutral' },
          { label: 'RAG Retrieval',     sub: 'Relevant chunks only',        type: 'better'  },
          { label: 'Complexity Router', sub: '70% simple / 30% complex',    type: 'new'     },
          { label: 'Claude Haiku 4.5',  sub: '70% of queries',              type: 'new'     },
          { label: 'Claude Sonnet 4.6', sub: '30% of queries',              type: 'better'  },
          { label: 'Semantic Cache',    sub: '35% responses cached',        type: 'better'  },
          { label: 'Response',          sub: null,                          type: 'neutral' },
        ],
      },
    ],
  },

  data: {
    label: 'Internal Data Assistant', sub: 'AI querying business databases',
    name: 'Internal Data Assistant',
    unit: 'queries/day',
    defaultVol: 200,
    baseline: {
      inputTok: 45000, outputTok: 1500, model: 'Claude Sonnet 4.6',
      desc: 'Full database schema + conversation history sent with every query',
      arch: [
        { label: 'User Query',        sub: null,                         type: 'neutral' },
        { label: '45K Context',       sub: 'Full schema + 20-turn hist', type: 'warn'    },
        { label: 'Claude Sonnet 4.6', sub: '$0.16 per query',            type: 'warn'    },
        { label: 'Response',          sub: '1.5K tokens out',            type: 'neutral' },
      ],
    },
    optimizations: [
      {
        name: 'Schema Pruning',
        pattern: 'Context Selection',
        desc: 'Use lightweight classification to identify which tables are relevant to each query — pass only those (~5K tokens) instead of the full 800-table schema.',
        inputTok: 5000, outputTok: 1200, model: 'Claude Sonnet 4.6', cacheHit: 0, routeFrac: 0, miniModel: null,
        arch: [
          { label: 'User Query',        sub: null,                      type: 'neutral' },
          { label: 'Schema Selector',   sub: 'Relevant tables only',    type: 'new'     },
          { label: '5K Context',        sub: '89% fewer schema tokens', type: 'better'  },
          { label: 'Claude Sonnet 4.6', sub: '$0.033 per query',        type: 'better'  },
          { label: 'Response',          sub: '1.2K tokens out',         type: 'neutral' },
        ],
      },
      {
        name: 'Context Summarisation',
        pattern: 'Conversation Compression',
        desc: 'After 5 turns, summarise older history into a compact paragraph instead of keeping the full raw exchange — reducing conversation context from 10K to 1.5K tokens.',
        inputTok: 3500, outputTok: 1200, model: 'Claude Sonnet 4.6', cacheHit: 0, routeFrac: 0, miniModel: null,
        arch: [
          { label: 'User Query',        sub: null,                         type: 'neutral' },
          { label: 'Schema Selector',   sub: 'Relevant tables only',       type: 'better'  },
          { label: 'History Summariser',sub: '10K → 1.5K history tokens',  type: 'new'     },
          { label: '3.5K Context',      sub: '92% fewer tokens total',     type: 'better'  },
          { label: 'Claude Sonnet 4.6', sub: '$0.029 per query',           type: 'better'  },
          { label: 'Response',          sub: null,                         type: 'neutral' },
        ],
      },
      {
        name: 'Route by Query Type',
        pattern: 'Model Routing',
        desc: '60% of queries are simple lookups — aggregations, filters, counts. Claude Haiku 4.5 handles these well at 14× lower cost. Complex joins and multi-table analytics stay on Sonnet 4.6.',
        inputTok: 3500, outputTok: 1200, model: 'Claude Sonnet 4.6', cacheHit: 0, routeFrac: 0.60, miniModel: 'Claude Haiku 4.5',
        arch: [
          { label: 'User Query',        sub: null,                         type: 'neutral' },
          { label: 'Schema Selector',   sub: 'Relevant tables only',       type: 'better'  },
          { label: 'History Summariser',sub: 'Compressed context',         type: 'better'  },
          { label: 'Query Router',      sub: '60% simple / 40% complex',   type: 'new'     },
          { label: 'Claude Haiku 4.5',  sub: '60% of queries',             type: 'new'     },
          { label: 'Claude Sonnet 4.6', sub: '40% of queries',             type: 'better'  },
          { label: 'Response',          sub: null,                         type: 'neutral' },
        ],
      },
    ],
  },

  content: {
    label: 'Content Generation Pipeline', sub: 'Automated writing at scale',
    name: 'Content Generation Pipeline',
    unit: 'tasks/day',
    defaultVol: 300,
    baseline: {
      inputTok: 22000, outputTok: 1800, model: 'Claude Sonnet 4.6',
      desc: 'Verbose prompts, full catalog context, Claude Sonnet 4.6 for every task',
      arch: [
        { label: 'Task Request',      sub: null,                        type: 'neutral' },
        { label: '22K Context',       sub: '8K prompt + 14K catalog',   type: 'warn'    },
        { label: 'Claude Sonnet 4.6', sub: '$0.093 per task',           type: 'warn'    },
        { label: 'Output',            sub: '1.8K tokens prose',         type: 'neutral' },
      ],
    },
    optimizations: [
      {
        name: 'Prompt Compression',
        pattern: 'Structured Templates',
        desc: 'Replace verbose freeform prompts with structured templates. Trim the system prompt from 8K to 1.5K tokens, and pass only relevant product context (2K) instead of the full catalog (14K).',
        inputTok: 4000, outputTok: 1500, model: 'Claude Sonnet 4.6', cacheHit: 0, routeFrac: 0, miniModel: null,
        arch: [
          { label: 'Task Request',      sub: null,                         type: 'neutral' },
          { label: 'Template Engine',   sub: '8K prompt → 1.5K template',  type: 'new'     },
          { label: '4K Context',        sub: '82% fewer input tokens',     type: 'better'  },
          { label: 'Claude Sonnet 4.6', sub: '$0.035 per task',            type: 'better'  },
          { label: 'Output',            sub: '1.5K tokens',                type: 'neutral' },
        ],
      },
      {
        name: 'Route by Task Type',
        pattern: 'Model Routing',
        desc: '75% of tasks are mechanical — reformats, subject line variants, short descriptions. Claude Haiku 4.5 handles these at 14× lower input cost. Sonnet 4.6 stays for creative and long-form work.',
        inputTok: 4000, outputTok: 1500, model: 'Claude Sonnet 4.6', cacheHit: 0, routeFrac: 0.75, miniModel: 'Claude Haiku 4.5',
        arch: [
          { label: 'Task Request',      sub: null,                         type: 'neutral' },
          { label: 'Template Engine',   sub: 'Compressed prompts',         type: 'better'  },
          { label: 'Task Router',       sub: '75% simple / 25% creative',  type: 'new'     },
          { label: 'Claude Haiku 4.5',  sub: '75% of tasks',               type: 'new'     },
          { label: 'Claude Sonnet 4.6', sub: '25% of tasks',               type: 'better'  },
          { label: 'Output',            sub: null,                         type: 'neutral' },
        ],
      },
      {
        name: 'Structured Outputs + Caching',
        pattern: 'Output Optimisation & Cache',
        desc: 'Request JSON instead of prose for structured tasks — cuts output tokens by 40%. Cache results for repeated product categories, intercepting ~25% of tasks before they hit the LLM.',
        inputTok: 4000, outputTok: 900, model: 'Claude Sonnet 4.6', cacheHit: 0.25, routeFrac: 0.75, miniModel: 'Claude Haiku 4.5',
        arch: [
          { label: 'Task Request',      sub: null,                         type: 'neutral' },
          { label: 'Template Engine',   sub: 'Compressed prompts',         type: 'better'  },
          { label: 'Task Router',       sub: '75% simple / 25% creative',  type: 'better'  },
          { label: 'Claude Haiku 4.5',  sub: 'JSON out (900 tok)',         type: 'better'  },
          { label: 'Claude Sonnet 4.6', sub: 'JSON out (900 tok)',         type: 'better'  },
          { label: 'Result Cache',      sub: '25% responses cached',       type: 'new'     },
          { label: 'Output',            sub: null,                         type: 'neutral' },
        ],
      },
    ],
  },
};
