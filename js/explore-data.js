// explore.js — Configurator data constants
export const NODES = ['sources', 'ingestion', 'warehouse', 'ai', 'output'];

export const BADGE = { critical: 'Core', active: 'Needed', secondary: 'Relevant', future: 'Later', warning: 'At Risk', 'at-risk': 'Degraded', default: '—' };

export const PRIORITY = { critical: 6, active: 5, secondary: 4, future: 3, 'at-risk': 2, warning: 1, default: 0 };

export const AI_ONLY_TOGGLES = ['noGuardrails', 'singleAgent', 'noCaching'];

export const INTEREST_MAP = {
  automation:   'AI Solutions & Architecture',
  reliability:  'AI Solutions & Architecture',
  data:         'Data Engineering & Infrastructure',
  'ai-product': 'AI Solutions & Architecture',
  cost:         'AI Solutions & Architecture',
  migrate:      'Data Engineering & Infrastructure',
  reporting:    'Analytics & Business Intelligence',
};

export const NODE_META = {
  sources: {
    label: 'Data Sources',
    examples: 'Databases · APIs · Spreadsheets · Third-party tools',
    icon: `<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" stroke-width="1.5"/><path stroke-width="1.5" stroke-linecap="round" d="M3 5v6c0 1.657 4.03 3 9 3s9-1.343 9-3V5"/><path stroke-width="1.5" stroke-linecap="round" d="M3 11v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6"/></svg>`,
  },
  ingestion: {
    label: 'Ingestion & Cleaning',
    examples: 'ETL · Pipelines · Normalization · Validation',
    icon: `<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>`,
  },
  warehouse: {
    label: 'Data Warehouse',
    examples: 'Single source of truth · Lineage · Queryable structure',
    icon: `<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
  },
  ai: {
    label: 'AI Layer',
    examples: 'Models · Guardrails · Context · Orchestration',
    icon: `<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
  },
  output: {
    label: 'Output',
    examples: 'Dashboards · APIs · Automation · User interfaces',
    icon: `<svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,
  },
};

export const BASE = {
  automation:   { sources: 'active',    ingestion: 'critical', warehouse: 'active',    ai: 'active',    output: 'critical'  },
  reliability:  { sources: 'secondary', ingestion: 'secondary',warehouse: 'active',    ai: 'critical',  output: 'active'    },
  data:         { sources: 'critical',  ingestion: 'critical', warehouse: 'critical',  ai: 'future',    output: 'secondary' },
  'ai-product': { sources: 'active',    ingestion: 'active',   warehouse: 'active',    ai: 'critical',  output: 'critical'  },
  cost:         { sources: 'secondary', ingestion: 'active',   warehouse: 'active',    ai: 'critical',  output: 'secondary' },
  migrate:      { sources: 'critical',  ingestion: 'critical', warehouse: 'critical',  ai: 'future',    output: 'secondary' },
  reporting:    { sources: 'active',    ingestion: 'active',   warehouse: 'critical',  ai: 'secondary', output: 'critical'  },
};

export const PRESETS = [
  { label: 'E-commerce analytics',  c: 'data',        m: 'siloed',    s: 'insights'            },
  { label: 'Internal AI assistant', c: 'ai-product',  m: 'clean',     s: 'reliable-production' },
  { label: 'Support automation',    c: 'automation',  m: 'siloed',    s: 'save-time'           },
  { label: 'Fix AI in production',  c: 'reliability', m: 'clean',     s: 'reliable-production' },
  { label: 'Data mess first',       c: 'data',        m: 'scattered', s: 'insights'            },
  { label: 'Cut AI spending',       c: 'cost',        m: 'siloed',    s: 'save-time'           },
  { label: 'Legacy to cloud',       c: 'migrate',     m: 'siloed',    s: 'reliable-production' },
  { label: 'Executive dashboards',  c: 'reporting',   m: 'siloed',    s: 'insights'            },
];
