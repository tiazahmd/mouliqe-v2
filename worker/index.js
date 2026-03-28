// Mouliqe Tools API — Cloudflare Worker
// Paste this into the Cloudflare dashboard editor for mouliqe-tools-api
// Requires: Workers AI binding named "AI"

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const MODEL_TEXT = '@cf/meta/llama-3.1-8b-instruct';
const MODEL_EMBED = '@cf/baai/bge-base-en-v1.5';

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'POST required' }, 405);
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/api/, '');

    try {
      const body = await request.json();

      switch (path) {
        case '/data-quality':
          return await handleDataQuality(env, body);
        case '/rag':
          return await handleRAG(env, body);
        case '/agent':
          return await handleAgent(env, body);
        default:
          return jsonResponse({ error: 'Unknown endpoint' }, 404);
      }
    } catch (err) {
      return jsonResponse({ error: err.message || 'Internal error' }, 500);
    }
  }
};

// ── Data Quality Scanner ──
async function handleDataQuality(env, { columns, sample }) {
  const prompt = `You are a data quality analyst. Analyze these CSV columns and sample data.

Columns: ${JSON.stringify(columns)}
Sample rows (first 5): ${JSON.stringify(sample)}

For each column, identify:
1. Data type (string, number, date, email, phone, boolean, etc.)
2. Issues found (nulls, inconsistent formats, duplicates, outliers, mixed types)
3. A specific fix suggestion for each issue

Respond ONLY with valid JSON in this exact format:
{
  "columns": [
    {
      "name": "column_name",
      "detectedType": "type",
      "issues": [
        { "type": "issue_type", "severity": "high|medium|low", "description": "what's wrong", "fix": "how to fix it", "affectedRows": 3 }
      ],
      "qualityScore": 85
    }
  ],
  "overallScore": 78,
  "summary": "One sentence overall assessment"
}`;

  const result = await env.AI.run(MODEL_TEXT, {
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1500,
  });

  return jsonResponse(parseAIJSON(result.response));
}

// ── RAG Pipeline ──
async function handleRAG(env, { action, text, chunks, query }) {
  if (action === 'embed') {
    // Generate embeddings for chunks
    const embeddings = await env.AI.run(MODEL_EMBED, { text: chunks });
    return jsonResponse({ embeddings: embeddings.data });
  }

  if (action === 'embed-query') {
    const embeddings = await env.AI.run(MODEL_EMBED, { text: [query] });
    return jsonResponse({ embedding: embeddings.data[0] });
  }

  if (action === 'generate') {
    const result = await env.AI.run(MODEL_TEXT, {
      messages: [
        { role: 'system', content: 'Answer the question using ONLY the provided context. If the context doesn\'t contain the answer, say so. Be concise.' },
        { role: 'user', content: `Context:\n${text}\n\nQuestion: ${query}` }
      ],
      max_tokens: 500,
    });
    return jsonResponse({ answer: result.response });
  }

  return jsonResponse({ error: 'Unknown action' }, 400);
}

// ── Agent Workflow ──
async function handleAgent(env, { action, task, context }) {
  if (action === 'plan') {
    const result = await env.AI.run(MODEL_TEXT, {
      messages: [
        { role: 'system', content: `You are an AI workflow planner. Decompose the given business task into a multi-agent workflow using the Planner-Worker-Synthesizer pattern.

Respond ONLY with valid JSON:
{
  "taskAnalysis": "One sentence describing what this task requires",
  "agents": [
    {
      "id": "planner",
      "role": "Planner",
      "action": "What the planner does for this task",
      "output": "What it produces"
    },
    {
      "id": "worker-1",
      "role": "Worker",
      "action": "Specific subtask",
      "tools": ["tool_name"],
      "output": "What it produces"
    },
    {
      "id": "worker-2",
      "role": "Worker",
      "action": "Specific subtask",
      "tools": ["tool_name"],
      "output": "What it produces"
    },
    {
      "id": "synthesizer",
      "role": "Synthesizer",
      "action": "How it combines results",
      "output": "Final deliverable"
    }
  ],
  "dataFlow": [
    { "from": "planner", "to": "worker-1", "label": "subtask assignment" },
    { "from": "planner", "to": "worker-2", "label": "subtask assignment" },
    { "from": "worker-1", "to": "synthesizer", "label": "partial result" },
    { "from": "worker-2", "to": "synthesizer", "label": "partial result" }
  ],
  "estimatedSteps": 4,
  "complexity": "low|medium|high"
}` },
        { role: 'user', content: task }
      ],
      max_tokens: 1000,
    });
    return jsonResponse(parseAIJSON(result.response));
  }

  if (action === 'execute-step') {
    const result = await env.AI.run(MODEL_TEXT, {
      messages: [
        { role: 'system', content: 'You are an AI agent executing a specific task. Describe what you would do step by step, what tools you would call, and what the output would be. Be specific and realistic. Keep it under 100 words.' },
        { role: 'user', content: `Task: ${task}\nContext from previous agents: ${context || 'None'}` }
      ],
      max_tokens: 300,
    });
    return jsonResponse({ result: result.response });
  }

  return jsonResponse({ error: 'Unknown action' }, 400);
}

// ── Helpers ──
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function parseAIJSON(text) {
  // Extract JSON from AI response (may have markdown fences)
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); }
    catch { return { raw: text }; }
  }
  return { raw: text };
}
