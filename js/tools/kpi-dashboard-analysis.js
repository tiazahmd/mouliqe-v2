// tools/kpi-dashboard-analysis.js — CSV parsing, column profiling, metric classification
export function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = lines.slice(1).filter(l => l.trim()).map(line => {
    const vals = [];
    let current = '', inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQuotes = !inQuotes;
      else if (ch === ',' && !inQuotes) { vals.push(current.trim()); current = ''; }
      else current += ch;
    }
    vals.push(current.trim());
    return vals;
  });
  return { headers, rows };
}

export function profileColumns(headers, rows) {
  return headers.map((name, i) => {
    const values = rows.map(r => r[i]).filter(v => v !== '' && v !== undefined && v !== null);
    const nulls = rows.length - values.length;
    const numericVals = values.map(Number).filter(v => !isNaN(v));
    const isNumeric = numericVals.length > values.length * 0.8;
    const isDate = values.length > 0 && values.every(v => /^\d{4}-\d{2}/.test(v));
    const isPercentage = name.toLowerCase().includes('rate') || name.toLowerCase().includes('%') ||
      (isNumeric && numericVals.every(v => v >= 0 && v <= 100) && name.toLowerCase().match(/rate|ratio|pct|percent|ctr|conversion/));

    let type = 'text';
    if (isDate) type = 'date';
    else if (isPercentage) type = 'percentage';
    else if (isNumeric) type = 'number';

    const profile = { name, type, nulls, unique: new Set(values).size, count: values.length };
    if (isNumeric) {
      profile.min = Math.min(...numericVals);
      profile.max = Math.max(...numericVals);
      profile.mean = numericVals.reduce((a, b) => a + b, 0) / numericVals.length;
      profile.latest = numericVals[numericVals.length - 1];
      profile.previous = numericVals.length > 1 ? numericVals[numericVals.length - 2] : null;
      profile.trend = numericVals.length >= 2 ? (numericVals[numericVals.length - 1] - numericVals[0]) / Math.abs(numericVals[0] || 1) * 100 : 0;
    }
    return profile;
  });
}

export function classifyMetrics(profiles) {
  const dateCol = profiles.find(p => p.type === 'date');
  const kpis = [];
  const chartConfigs = [];

  profiles.forEach(p => {
    if (p.type === 'date') return;
    if (p.type === 'number' || p.type === 'percentage') {
      const isCurrency = /revenue|mrr|spend|cost|ltv|aov|cac|arpu|churned mrr|new mrr/i.test(p.name);
      const isRate = p.type === 'percentage' || /rate|ratio|ctr/i.test(p.name);
      const isCount = /customers|orders|leads|mqls|sqls|conversions|visitors/i.test(p.name);
      const isScore = /nps|csat|score/i.test(p.name);

      kpis.push({
        ...p,
        format: isCurrency ? 'currency' : isRate ? 'percentage' : isCount ? 'number' : isScore ? 'score' : 'number',
        importance: isCurrency ? 3 : isRate ? 2 : isCount ? 2 : 1,
        isCurrency, isRate, isCount, isScore,
      });

      if (dateCol) {
        let chartType = 'line';
        if (isCount && !isCurrency) chartType = 'bar';
        chartConfigs.push({ type: chartType, metric: p.name, label: p.name, fill: isCurrency, isRate, isCurrency, isCount, isScore });
      }
    }
  });

  kpis.sort((a, b) => b.importance - a.importance);

  const funnelNames = ['Leads', 'MQLs', 'SQLs', 'Conversions'];
  const funnelMetrics = funnelNames.map(n => kpis.find(k => k.name === n)).filter(Boolean);

  const grouped = groupCharts(chartConfigs);

  const compPairs = [
    { label: 'MRR Composition (Latest Month)', pos: 'New MRR', neg: 'Churned MRR' },
    { label: 'Customer Flow (Latest Month)',   pos: 'New Customers', neg: 'Churned Customers' },
  ];
  compPairs.forEach(cp => {
    const posK = kpis.find(k => k.name === cp.pos);
    const negK = kpis.find(k => k.name === cp.neg);
    if (posK && negK) {
      grouped.push({ type: 'doughnut', label: cp.label, metrics: [{ metric: cp.pos }, { metric: cp.neg }] });
    }
  });

  const gaugeRates = kpis.filter(k => k.isRate).slice(0, 2);
  gaugeRates.forEach(k => {
    grouped.push({ type: 'gauge', label: k.name + ' (Current)', metric: k.name, value: k.latest, max: k.type === 'percentage' ? 100 : k.max * 1.2 });
  });

  const scores = kpis.filter(k => k.isScore);
  if (scores.length) {
    grouped.push({ type: 'bar', metrics: scores.map(s => ({ metric: s.name, label: s.name })), label: scores.map(s => s.name).join(' & ') + ' Trend' });
  }

  return { kpis, chartConfigs: grouped, dateCol: dateCol ? dateCol.name : null, funnelMetrics };
}

function groupCharts(configs) {
  const used = new Set();
  const grouped = [];

  const pairs = [
    [/^mrr$/i,          /new mrr|churned mrr/i,               'line'],
    [/revenue/i,        /orders/i,                            'bar'],
    [/leads/i,          /mqls|sqls|conversions/i,             'bar'],
    [/customers$/i,     /new customers|churned customers/i,   'bar'],
    [/ad spend/i,       /roas/i,                              'bar'],
  ];

  pairs.forEach(([primary, secondary, type]) => {
    const p = configs.find(c => primary.test(c.metric) && !used.has(c.metric));
    const ss = configs.filter(c => secondary.test(c.metric) && !used.has(c.metric));
    if (p && ss.length) {
      used.add(p.metric);
      ss.forEach(s => used.add(s.metric));
      grouped.push({ type, metrics: [p, ...ss], label: p.label + ' Breakdown' });
    }
  });

  configs.forEach(c => {
    if (!used.has(c.metric)) {
      grouped.push({ type: c.isRate ? 'line' : c.type, metrics: [c], label: c.label });
    }
  });

  return grouped.slice(0, 8);
}

export function formatValue(val, format) {
  const n = Number(val);
  if (isNaN(n)) return val;
  if (format === 'currency')   return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (format === 'percentage') return n.toFixed(1) + '%';
  if (format === 'score')      return n.toFixed(0);
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export function generateReportData(kpis, headers, rows) {
  const sections = [];
  const lastRow = rows[rows.length - 1];
  const firstRow = rows[0];

  const exec = [];
  kpis.slice(0, 6).forEach(k => {
    const ci = headers.indexOf(k.name);
    if (ci < 0) return;
    const first = Number(firstRow[ci]);
    const last = Number(lastRow[ci]);
    const delta = first !== 0 ? ((last - first) / Math.abs(first) * 100) : 0;
    if (Math.abs(delta) > 5) {
      const dir = delta > 0 ? 'increased' : 'decreased';
      const positive = k.name.match(/churn|abandon|cost|cac|cpc/i) ? delta < 0 : delta > 0;
      exec.push({ text: `${k.name} ${dir} ${Math.abs(delta).toFixed(0)}% (${formatValue(first, k.format)} to ${formatValue(last, k.format)})`, positive });
    }
  });
  if (exec.length) sections.push({ title: 'Executive Summary', type: 'exec', desc: 'Period-over-period performance across your most important metrics.', items: exec });

  const risks = [];
  kpis.forEach(k => {
    if (k.name.match(/churn/i) && k.trend > 10)                risks.push(`${k.name} has risen ${k.trend.toFixed(0)}% — customer retention may be deteriorating.`);
    if (k.name.match(/abandon/i) && k.latest > 65)             risks.push(`Cart abandonment at ${k.latest.toFixed(1)}% — checkout friction is high.`);
    if (k.name.match(/cac/i) && k.trend > 0)                    risks.push(`Customer acquisition cost trending up — efficiency declining.`);
    if (k.name.match(/return rate/i) && k.latest > 8)          risks.push(`Return rate at ${k.latest.toFixed(1)}% — product quality or expectation mismatch.`);
    if (k.name.match(/conversion rate/i) && k.trend < -5)       risks.push(`Conversion rate declining — funnel optimization needed.`);
  });
  if (risks.length) sections.push({ title: 'Risks & Watch Items', type: 'risks', desc: 'Metrics trending in the wrong direction that need investigation.', items: risks });

  const opps = [];
  kpis.forEach(k => {
    if (k.name.match(/repeat/i) && k.trend > 10)                opps.push(`Repeat customer rate growing — loyalty programs could accelerate this.`);
    if (k.name.match(/aov/i) && k.trend > 5)                    opps.push(`AOV trending up ${k.trend.toFixed(0)}% — upsell/cross-sell strategies are working.`);
    if (k.name.match(/roas/i) && k.latest > 3)                  opps.push(`ROAS at ${k.latest.toFixed(1)}x — consider scaling ad spend in top channels.`);
    if (k.name.match(/nps/i) && k.trend > 10)                   opps.push(`NPS improving — leverage promoters for referral programs.`);
    if (k.name.match(/email open/i) && k.latest > 25)           opps.push(`Email open rate at ${k.latest.toFixed(1)}% — strong engagement, test more campaigns.`);
  });
  if (opps.length) sections.push({ title: 'Opportunities', type: 'opps', desc: 'Positive trends worth doubling down on.', items: opps });

  const actions = [];
  if (risks.length) actions.push('Investigate top risk items within the next sprint cycle.');
  if (opps.length)  actions.push('Prioritize highest-ROI opportunity for next quarter planning.');
  actions.push('Set automated alerts for KPIs that deviate more than 15% from trailing average.');
  actions.push('Schedule monthly review of this dashboard with stakeholders.');
  sections.push({ title: 'Recommended Next Steps', type: 'actions', desc: 'Concrete steps to take based on what the data is showing.', items: actions });

  return sections;
}
