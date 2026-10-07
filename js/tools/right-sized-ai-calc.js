// tools/right-sized-ai-calc.js — pure maths for the right-sized AI demo (no DOM, no imports)

/** Dollars for one call. price = { input, output } in $ per million tokens; no output price means output is free. */
export function costPerCall(price, tokensIn, tokensOut = 0) {
  if (!price) return 0;
  return (tokensIn * price.input + tokensOut * (price.output || 0)) / 1_000_000;
}

/** Cost of one call for a tool in a sample. Rules and the small model have no per-call fee. */
export function toolCost(sample, tool, price) {
  if (tool === 'jev') return costPerCall(price.jev, sample.jev.tokensIn);
  if (tool === 'chatbot') return costPerCall(price.chatbot, sample.chatbot.tokensIn, sample.chatbot.tokensOut);
  return 0;
}

/** Share of requests handled without a person at threshold t. curve: [{ t, autoShare }] sorted by t. */
export function autoShareAt(curve, t) {
  const first = curve[0];
  const last = curve[curve.length - 1];
  if (t <= first.t) return first.autoShare;
  if (t >= last.t) return last.autoShare;
  for (let i = 1; i < curve.length; i++) {
    const a = curve[i - 1];
    const b = curve[i];
    if (t <= b.t) return a.autoShare + ((t - a.t) / (b.t - a.t)) * (b.autoShare - a.autoShare);
  }
  return last.autoShare;
}

/** The tools the recommended setup uses, each once, in first-use order. */
export function routeTools(sample) {
  return [...new Set(Object.values(sample.route.assign))];
}

/** How sure a tool is about one answer, 0..1. Rules are exact, so they count as certain. The chatbot never says. */
export function answerConfidence(sample, tool, q) {
  if (tool === 'rules') return 1;
  if (tool === 'small') return sample.small.conf[q.id];
  if (tool === 'jev') {
    const a = sample.jev.response.answers[q.id];
    return a.type === 'noul' ? Math.max(a.noul, 1 - a.noul) : a.confidence;
  }
  return null;
}

/** The weakest confidence among the answers the recommended setup relies on. */
export function requestConfidence(sample) {
  return Math.min(...sample.questions.map((q) => answerConfidence(sample, sample.route.assign[q.id], q)));
}

/** Monthly figures for the Route step. */
export function routeSummary(sample, volume, threshold, price) {
  const autoShare = autoShareAt(sample.route.curve, threshold);
  const handled = Math.round(volume * autoShare);
  const perCall = routeTools(sample).reduce((sum, tool) => sum + toolCost(sample, tool, price), 0);
  return {
    autoShare,
    handled,
    toPerson: volume - handled,
    rightSizedMonthly: volume * perCall,
    chatbotMonthly: volume * toolCost(sample, 'chatbot', price),
  };
}

/** Log-scale volume slider: 0..100 maps to 1,000..1,000,000, rounded to two significant figures. */
export function volumeFromSlider(v) {
  const raw = Math.pow(10, 3 + (3 * v) / 100);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)) - 1);
  return Math.round(raw / mag) * mag;
}

export function sliderFromVolume(volume) {
  return Math.round(((Math.log10(volume) - 3) / 3) * 100);
}

/** Two significant figures under a cent, cents under $100, whole dollars above. */
export function fmtMoney(n) {
  if (n === 0) return '$0';
  if (n < 0.01) return '$' + n.toFixed(Math.min(10, 1 - Math.floor(Math.log10(n))));
  if (n < 100) return '$' + n.toFixed(2);
  return '$' + Math.round(n).toLocaleString('en-US');
}

export function fmtCount(n) {
  return Math.round(n).toLocaleString('en-US');
}

export function fmtMs(ms) {
  return ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(1)} s`;
}
