# AGENTS.md — Mouliqe Website Build Log

> Complete documentation of every decision, change, and architectural detail.
> Written by Mimir (AI assistant) during build sessions with Imtiaz via Kiro CLI.
> Last updated: March 28, 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Tech Stack](#tech-stack)
4. [Design System](#design-system)
5. [Architecture: Components & Navigation](#architecture-components--navigation)
6. [Architecture: Clean URL Routing](#architecture-clean-url-routing)
7. [Pages](#pages)
8. [Blog System](#blog-system)
9. [Booking System (Contact Page)](#booking-system-contact-page)
10. [Google Apps Script Backend](#google-apps-script-backend)
11. [Hosting & Deployment](#hosting--deployment)
12. [Change Log](#change-log)
13. [How To: Add a New Blog Post](#how-to-add-a-new-blog-post)
14. [How To: Run Locally](#how-to-run-locally)

---

## Project Overview

- **Company**: Mouliqe (Bengali word meaning fundamental, original, foundational)
- **Pronunciation**: /moʊ.liːk/
- **Domain**: mouliqe.com
- **Purpose**: Consultancy website for AI solutions, data engineering, and analytics consulting
- **Owner**: Imtiaz Ahmed
- **Contact email**: imtiaz@mouliqe.com
- **Primary CTA**: Free discovery call (30 min, Google Meet, no commitment)
- **No pricing on website** — all engagements start with discovery

---

## File Structure

```
site/
├── index.html                          # Home page
├── about.html                          # About page (background, experience)
├── services.html                       # Services page (3 service areas)
├── process.html                        # The Mouliqe Way (6-stage process)
├── explore.html                        # Interactive AI architecture configurator
├── contact.html                        # Booking system (3-step flow)
├── styles.css                          # All styles (v9)
├── components.js                       # Nav/footer injection, scroll effects (v4)
├── favicon.svg                         # SVG favicon (green "M")
├── serve.py                            # Local dev server with clean URL routing
├── sitemap.xml                         # XML sitemap (submitted to Google Search Console)
├── blog/
│   ├── index.html                      # Blog listing page (reads posts.json)
│   ├── posts.json                      # Blog post metadata (drives listing)
│   ├── stop-building-ai-features.html
│   ├── poc-to-production.html
│   ├── data-problem-not-ai-problem.html
│   ├── context-windows-are-a-lie.html
│   ├── guardrails-problem.html
│   ├── ai-memory-systems.html
│   ├── planner-worker-synthesizer.html
│   └── costume-change-vs-new-actor.html
├── tools/
│   ├── data-quality.html               # AI: Data Quality Scanner
│   ├── rag-pipeline.html               # AI: RAG Pipeline Explorer
│   ├── agent-workflow.html             # AI: Agent Workflow Simulator (5 agentic patterns)
│   ├── kpi-dashboard.html              # Local: KPI Dashboard Builder
│   └── etl-pipeline.html              # Local: ETL Pipeline Simulator
├── worker/
│   └── index.js                        # Cloudflare Worker script (unused — tools use simulation)
└── .git/
```

Supporting files (outside site/):
```
cons/
├── mouliqe-booking.gs                  # Google Apps Script for booking backend
├── services.md                         # Services content draft
├── process.md                          # Process content draft
├── about.md                            # About content draft
└── linkedin-bio.md                     # LinkedIn bio draft
```

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | HTML + Tailwind CSS (CDN) + vanilla JS | No build step, no framework |
| Font | Oxanium (Google Fonts) | Weights: 300-700 |
| Styling | `styles.css` + Tailwind utility classes | Custom CSS for components, Tailwind for layout |
| Navigation | `components.js` | Injects sidebar nav + mobile menu into all pages |
| Blog data | `posts.json` | Listing page reads this via fetch, renders cards |
| Booking backend | Google Apps Script | Reads Google Calendar, creates events, sends invites |
| Hosting | Cloudflare Pages | Free tier, auto-deploys from GitHub |
| Domain | Cloudflare (~$10/yr) | |
| Email | Google Workspace ($84/yr) | imtiaz@mouliqe.com |
| Local dev | `serve.py` (Python http.server) | Clean URL handler on port 8000 |

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#060a14` | Page background |
| forest-400 | `#4ade80` | Primary accent (green) |
| forest-500 | `#22c55e` | Secondary green |
| forest-700 | `#15803d` | Button gradient start |
| forest-800 | `#166534` | Button gradient end |
| forest-950 | `#0a2e18` | Deep green accents |
| Text primary | `rgba(255,255,255,0.80)` | Body default |
| Text secondary | `rgba(255,255,255,0.55)` | Prose/body paragraphs |
| Text muted | `rgba(255,255,255,0.35-0.45)` | Subtitles, descriptions |
| Text dim | `rgba(255,255,255,0.15-0.25)` | Dates, metadata, borders |

### Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Base font size | `14.5px` (html) | — | — |
| Page title (h1) | `text-3xl` / `text-4xl` | 700 | white |
| Section heading (h2) | `text-2xl` / `1.75rem` | 700 | white |
| Card heading (h3) | `0.92rem` | 600 | white |
| Blog post h2 | `1.1rem` | 700 | white |
| Blog post h3 | `0.95rem` | 700 | `white/85` |
| Section intro text | `0.84rem` | — | `white/55` |
| Card body text | `0.75rem` | — | `white/55` |
| Prose body (about) | via `.prose-custom p` | — | `rgba(255,255,255,0.55)` |
| Label/tag | `0.65rem` | 600-700 | forest-400 |
| Metadata/dates | `0.65-0.72rem` | — | `white/15-25` |

### Key CSS Components

- `.sidebar-link` — Nav links with `::after` underline on active (green gradient)
- `.sidebar-cta` — Green-tinted CTA card (used on about, services, process, blog posts)
- `.sidebar-card` — Neutral info card
- `.card` — Content card with border and hover state
- `.card-highlight` — First card in a set, slightly different border
- `.btn-primary` — Green gradient button, lifts on hover (`translateY(-2px)`)
- `.btn-secondary` — Ghost button, lifts on hover
- `.prose-custom p` — Long-form text styling (about page, blog posts)
- `.reveal` / `.visible` — Scroll-triggered fade-in animation
- `.stagger-1` through `.stagger-3` — Staggered animation delays
- `.anim-fade`, `.anim-up`, `.anim-d1`, `.anim-d2` — Page load animations

### Blockquotes

Used for callout text in about page and blog posts:
```html
<div style="border-left:2px solid rgba(34,197,94,0.3);padding-left:1rem;margin:1.15rem 0">
  <p style="color:rgba(255,255,255,0.65);font-size:0.86rem;font-weight:500;margin:0">Quote text</p>
</div>
```

### Tag Pills

Used on blog listing and post pages:
```html
<span style="font-size:0.55rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;
  color:rgba(74,222,128,0.5);background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.1);
  padding:0.15rem 0.45rem;border-radius:0.25rem">Tag Name</span>
```

---

## Architecture: Components & Navigation

`components.js` (v3) handles:

1. **Sidebar navigation** — Injected into `<div id="site-nav">` on every page
2. **Mobile menu** — Hamburger toggle, overlay, slide-in menu
3. **Scroll reveal** — IntersectionObserver on `.reveal` elements
4. **Scroll progress bar** — Top-of-page progress indicator
5. **Back to top button** — Appears after 400px scroll
6. **Process hover** — Card hover highlights flow labels (home page)
7. **Process tracker** — Scroll-based sidebar tracker (process page)

### Nav Links (current)

```js
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { label: 'Demo', children: [
    { href: '/tools/data-quality', label: 'Data Quality', tag: 'ai' },
    { href: '/tools/rag-pipeline', label: 'RAG Pipeline', tag: 'ai' },
    { href: '/tools/agent-workflow', label: 'Agent Workflow', tag: 'ai' },
    { href: '/tools/kpi-dashboard', label: 'KPI Dashboard', tag: 'local' },
    { href: '/tools/etl-pipeline', label: 'ETL Pipeline', tag: 'local' },
  ]},
  { href: '/explore', label: 'Explore' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];
```

The Demo group is a collapsible sidebar section (`.sidebar-group`, `.sidebar-children` with `max-height` transition). Tags render as colored badges: `.nav-tag-ai` (amber `#fbbf24`) and `.nav-tag-local` (blue `#38bdf8`). The group auto-opens when on any `/tools/*` path via `isToolsActive()`.

### Active State Logic

```js
function isActive(href) {
  if (href === '/') return path === '/' || path === '' || path === '/index' || path === '/index.html';
  if (href === '/blog') return path.startsWith('/blog');  // All blog pages highlight "Blog"
  return path === href || path === href + '.html';
}
```

### Page Template (minimal)

Every page follows this structure:
```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page] — Mouliqe</title>
  <meta name="description" content="...">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={theme:{extend:{colors:{forest:{50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d',950:'#0a2e18'}},fontFamily:{sans:['Oxanium','sans-serif']}}}}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="bg-[#060a14] text-white/80 font-sans antialiased overflow-x-hidden">
  <div id="site-nav"></div>
  <div class="main-content">
    <!-- Page content here -->
  </div>
  <script src="/components.js"></script>
</body>
</html>
```

---

## Architecture: Clean URL Routing

All internal links use clean URLs (no `.html` extension):
- `/` → `index.html`
- `/about` → `about.html`
- `/services` → `services.html`
- `/process` → `process.html`
- `/contact` → `contact.html`
- `/blog` → `blog/index.html`
- `/blog/post-slug` → `blog/post-slug.html`

### Local dev (`serve.py`)

```python
import http.server, os

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        clean = self.path.split('?')[0].split('#')[0].rstrip('/')
        if clean == '/blog':
            self.path = '/blog/index.html'
        elif '.' not in os.path.basename(clean) and clean != '/':
            test = clean + '.html'
            if os.path.isfile(self.translate_path(test)):
                self.path = test
        super().do_GET()

http.server.HTTPServer(('', 8000), CleanURLHandler).serve_forever()
```

### Cloudflare Pages

Cloudflare Pages handles clean URLs natively — no config needed. It automatically serves `page.html` for `/page` requests.

---

## Pages

### Home (`index.html`)

- Hero section (no decorative blur blobs — removed for cleaner look)
- Services preview: 3 cards linking to `/services`
- Process preview: "The Mouliqe Way" — 6 steps (00-05) with full green numbers and arrows
  - Desktop: horizontal flow with arrow SVGs between steps
  - Mobile: vertical list
  - Description text: `white/40` at `0.72rem`
- CTA section: "Let's figure out what you actually need"

### About (`about.html`)

- Two alternating content sections (left/right layout)
- Blockquote callouts at `white/65` opacity
- Right sidebar: discovery call CTA + LinkedIn link
- Prose content uses `.prose-custom` styling

### Services (`services.html`)

- 3 service areas with detailed descriptions:
  - AI Solutions & Architecture
  - Data Engineering & Infrastructure
  - Analytics & Business Intelligence
- Asymmetric alternating card layout (left/right)
- Right sidebar: "Not sure which area fits?" CTA

### Process (`process.html`)

- 6-stage process: Discovery (00), Diagnosis (01), Blueprint (02), Build (03), Refine (04), Support (05)
- Step numbers in full solid green (`rgba(74,222,128,1)`)
- Alternating left/right card layout with detailed descriptions
- Right sidebar: sticky CTA ("Every good solution starts with the right conversation.") + process tracker
- Process tracker highlights steps on scroll

### Explore (`explore.html`)

Interactive AI architecture configurator — see the March 28, 2026 changelog entry for the full architectural breakdown.

### Contact (`contact.html`)

- 3-step booking flow (see [Booking System](#booking-system-contact-page))
- Right sidebar: call details (30 min, Google Meet, free) + email fallback

### Blog Listing (`blog/index.html`)

- Reads `blog/posts.json` via fetch
- Renders cards with: tag pills, title, excerpt, date, "Read" link
- Cards use `.card` styling with `.learn-more-arrow` interaction
- No sidebar — single column, max-width `42rem`

### Blog Posts (`blog/*.html`)

- Back to Blog link at top
- Title, date, tag pills in header
- Content area: `.prose-custom` styling, max-width `42rem`
- h2 at `1.1rem` white, h3 at `0.95rem` `white/85`
- Blockquotes for callouts
- Footer: series links + original LinkedIn link
- Right sidebar: "Have a similar challenge?" CTA

---

## Blog System

### How It Works

1. `blog/posts.json` contains metadata for all posts (ordered newest first)
2. `blog/index.html` fetches this JSON and renders cards dynamically
3. Each post is a standalone HTML file in `blog/`
4. Nav highlights "Blog" for all `/blog/*` paths

### posts.json Schema

```json
[
  {
    "slug": "post-file-name-without-html",
    "title": "Full Post Title",
    "date": "YYYY-MM-DD",
    "excerpt": "One-sentence summary for the listing card.",
    "tags": ["Tag One", "Tag Two"],
    "linkedin": "https://linkedin.com/pulse/..."
  }
]
```

### Current Posts

| # | Slug | Title | Date | Tags |
|---|------|-------|------|------|
| 1 | `costume-change-vs-new-actor` | When Your AI Agent Needs a Costume Change vs. a Whole New Actor | Feb 19, 2026 | AI Architecture, Multi-Agent Systems |
| 2 | `planner-worker-synthesizer` | Planner, Worker, Synthesizer: The 3-Agent Pattern That Actually Works | Feb 26, 2026 | AI Architecture, Multi-Agent Systems |

---

## Booking System (Contact Page)

### Flow

1. **Step 1 — Pick a date**: Fetches available slots from Google Apps Script API, renders date buttons with slot counts
2. **Step 2 — Pick a time**: Shows available time slots for selected date
3. **Step 3 — Details**: Name, email, company (optional), interest dropdown, message (optional)
4. **Success**: Confirmation message, "calendar invite sent to your email"

### UI Components

- Step indicator with animated connectors (`.step-dot`, `.step-connector`, `.step-connector-fill`)
- Skeleton loading states (`.skeleton-slot` with shimmer animation)
- Square spinner (`.spinner` with rotating border colors)
- Slot buttons (`.slot-btn`) for dates and times
- Today badge (`.today-badge`)
- Custom dropdown for "Interested in" field

### API Endpoint

```
https://script.google.com/macros/s/AKfycbzg3YyUhQGz-DSj966ma53mP79g5-u00OIjv8WUtW4cJOTcHu387uMbKpPNpS_kMoE/exec
```

- `GET` → Returns available slots grouped by date
- `POST` → Creates booking (calendar event + email notification + guest invite)

### Error Handling

- If API fails to load: shows "Could not load availability" with email fallback link
- If no slots available: shows "No available slots in the next 2 weeks" with email fallback
- If slot taken between selection and submission: server returns error, handled gracefully

---

## Google Apps Script Backend

File: `cons/mouliqe-booking.gs`

### Configuration

```js
const CONFIG = {
  calendarId: 'primary',
  timezone: 'America/New_York',
  slotDuration: 30,       // minutes
  bufferBefore: 15,        // minutes before each slot
  bufferAfter: 15,         // minutes after each slot
  daysAhead: 14,           // 2 weeks of availability
  startHour: 9,            // 9am ET
  endHour: 16,             // 4pm ET (last slot at 3:30)
  workDays: [1,2,3,4,5],   // Mon-Fri
};
```

### Functions

- `doGet()` — Returns available slots as JSON
- `doPost()` — Creates calendar event, sends invite to guest, emails notification to owner
- `getAvailableSlots()` — Reads Google Calendar, finds free 30-min windows with 15-min buffers
- `createBooking(data)` — Double-checks availability, creates event, sends emails

### Deployment

Deployed as Google Apps Script web app. Must be redeployed (new version) after any changes to the script.

---

## Hosting & Deployment

### Cloudflare Pages

- Source: GitHub repository (manually uploaded files)
- Auto-deploys on push to main branch
- Clean URLs handled natively by Cloudflare
- Free tier

### Deployment Process (current)

1. Make changes locally
2. Manually upload changed files to GitHub web interface
3. Cloudflare Pages auto-deploys

### Local Development

```bash
cd /Users/imtiazar/Desktop/GCIPM/Dev/cons/site
python3 serve.py
# Open http://localhost:8000
```

Kill existing server if port is busy:
```bash
lsof -i :8000  # Find PID
kill <PID>
```

---

## Demo Section (Tools)

Five interactive tool pages at `/tools/*`. Designed as LinkedIn-shareable demos that showcase Mouliqe's AI/data capabilities. All tools use simulated responses with realistic delays — no real API calls required.

### Layout Pattern

Each tool page uses a 70/30 layout:
- **70% tool area**: pipeline visualization + dynamic context panel + output/results
- **30% right sidebar**: explanation card + discovery call CTA

### Pipeline Visualization (shared pattern)

All 5 tools use the same pipeline stage component (`.tool-pipeline`, `.tool-stage`):
- States: `pending` → `active` → `done`
- Regular active stages: amber dot + amber label (`#fbbf24`)
- AI-powered stages marked with `data-ai` attribute: purple dot + purple label (`#c084fc`) + "AI" micro-badge on label
- Context panel (`.tool-context`) accumulates log entries (each stage appends, never replaces); pulses with amber animation while processing, stops when complete

### AI vs Deterministic Visual Distinction

In pipeline stages: `data-ai` attribute triggers CSS overrides — purple color scheme instead of amber/green for all active/done states. Each AI stage also gets an "AI" micro-badge rendered via CSS `::after` on `.tool-stage-label`.

Within tool output, log entries use `→` (amber, outgoing) and `←` (green, incoming) arrows for tool calls.

### Tool Pages

#### Data Quality Scanner (`tools/data-quality.html`) — AI-Powered
- 3 sample datasets: HR Employee Data, Product Inventory, Transaction Log
- Pipeline: **Parse** → **Profile** → **Detect** (AI) → **Score** (AI) → **Report**
- AI Detect stage: coordinator dispatches specialist detector agents (Null Detector, Format Validator, Outlier Detector, Duplicate Checker, Pattern Analyzer)
- AI Score stage: context-aware quality scoring considering cross-column dependencies
- Output: overall quality score, per-column scores + type + issues, expandable issue list with fix suggestions, data preview with flagged cells
- Accepts CSV upload (max 1MB) with client-side analysis

#### RAG Pipeline Explorer (`tools/rag-pipeline.html`) — AI-Powered
- 3 sample documents: Company Policy, Product FAQ, Legal Contract
- Pipeline: **Chunk** → **Embed** (AI) → **Search** → **Retrieve** (AI) → **Generate** (AI)
- AI Embed: embedding model converts chunks to 8D fake vectors (seeded, deterministic)
- AI Retrieve: re-ranking agent uses cross-encoder to refine initial vector search results
- AI Generate: LLM synthesizes answer from retrieved chunks, streamed word-by-word (30–70ms delays)
- Visualizations: chunk overlap regions (amber highlight), vector displays, similarity score bars (green/amber/gray), retrieved vs non-retrieved distinction

#### Agent Workflow Simulator (`tools/agent-workflow.html`) — AI-Powered
- 5 presets demonstrating 5 distinct agentic architecture patterns
- All stages marked `data-ai` except Deliver
- Pattern badge shown in analysis card; pattern description explains architecture choice

| Preset | Pattern | Badge Color | Architecture |
|--------|---------|-------------|--------------|
| Process Invoices | Fan-Out / Fan-In | Purple | Planner → parallel Workers → Synthesizer |
| Triage Tickets | Router → Specialist | Amber | Router classifies → dispatches to 1 specialist (others dimmed) |
| Weekly Reports | Map-Reduce | Blue | Parallel Mappers collect data → Reducer aggregates |
| Onboard Customer | Sequential Chain | Green | Agents in strict order with validation gates between steps |
| Monitor Health | ReAct Loop | Orange | Single agent: Observe→Think→Act cycles (3 iterations) |

The graph visualization area (`#agent-graph`) is fully dynamic — each pattern's `run*()` function builds its own DOM. Patterns: `runFanOut()`, `runRouter()`, `runMapReduce()`, `runChain()`, `runReAct()`.

**Router pattern**: Active specialist executes, non-active specialists get `.dimmed` class (`.skip-icon` shows "—"). Router decision rendered as a `.router-decision` callout.

**Chain pattern**: `.checkpoint-gate` dividers between agents; gate transitions to `.passed` state (green) after each agent completes.

**ReAct pattern**: `.iteration-header` per cycle; phases use icons: 👁 Observe (blue), 💡 Think (amber), ⚡ Act (orange), ← Result (green). "next cycle" arrow between iterations.

#### KPI Dashboard Builder (`tools/kpi-dashboard.html`) — Runs Locally
- 3 sample datasets: SaaS Metrics, E-commerce, Marketing
- Pipeline: **Parse** → **Profile** → **Classify** → **Select Charts** → **Render** (all deterministic, no `data-ai`)
- Renders Chart.js charts (Bar, Line, Doughnut) in fixed 180px containers to prevent infinite resize loop
- CSV upload (max 1MB); samples and upload on same row separated by a vertical divider

#### ETL Pipeline Simulator (`tools/etl-pipeline.html`) — Runs Locally
- 3 scenarios: Merge Customer Data (3 sources), Clean Sales Pipeline, Build Reporting Table
- Pipeline: **Extract** → **Validate** → **Clean** → **Transform** → **Load** (all deterministic)
- Live data table updates at each stage with visual cell badges: `.cell-badge.warn`, `.error`, `.fixed`, `.dup`
- Strikethrough styling for removed rows; source color tags per data origin
- Final quality score card with score/rows/issues metrics

### New CSS Classes (styles.css)

**Nav:**
- `.sidebar-group` / `.sidebar-group.open` — collapsible nav group with `max-height` transition on `.sidebar-children`
- `.sidebar-group-toggle` — toggle button for the group
- `.sidebar-sublink` — indented child link
- `.nav-tag` / `.nav-tag-ai` (amber) / `.nav-tag-local` (blue) — tool type badges

**Tool pipeline:**
- `.tool-pipeline` — horizontal flex container for stages
- `.tool-stage` — individual stage (states: `pending`, `active`, `done`)
- `.tool-stage[data-ai]` — purple color scheme overrides for AI stages
- `.tool-stage-dot` / `.tool-stage-label` / `.tool-stage-connector` — stage subcomponents
- `.tool-context` / `.tool-context.pulsing` — context log panel with amber pulse animation
- `.tool-result-card` / `.tool-result-header` / `.tool-result-label` — result card components
- `.tool-score.high` (green) / `.tool-score.medium` (amber) / `.tool-score.low` (red) — score badges

**Agent workflow specific (inline `<style>`):**
- `.agent-node` / `.agent-node.executing` (amber border) / `.agent-node.complete` (green border) / `.agent-node.dimmed` — agent graph nodes
- `.tool-pill` — tool badge inside agent node
- `.flow-arrow` / `.flow-arrow.active` / `.flow-arrow.done` — directional connectors
- `.tool-log` / `.tool-log-line` — tool call log container; `.arrow-out` (amber) / `.arrow-in` (green)
- `.pattern-badge.fan-out/.router/.map-reduce/.chain/.react` — per-pattern color badges
- `.checkpoint-gate` / `.checkpoint-gate.passed` — sequential chain validation gates
- `.iteration-header` — ReAct cycle header
- `.router-decision` — routing dispatch callout

---

## Change Log

### Session: March 28, 2026 (Claude Code) — Demo section (5 tool pages)

**New: Demo Section (`/tools/*`)**
- Added collapsible "Demo" nav group in `components.js` with 5 sub-links (3 AI, 2 Local)
- Nav tags: `.nav-tag-ai` (amber) and `.nav-tag-local` (blue) — rendered from `tag` property on NAV_LINKS children
- All 5 tool pages built with the shared pipeline visualization pattern (see Demo Section docs above)
- `components.js` updated to v4; `styles.css` updated to v9

**New: Tool Pages**
- `tools/data-quality.html` — AI Data Quality Scanner with multi-agent detector visualization
- `tools/rag-pipeline.html` — RAG Pipeline Explorer with embedding/re-ranking/streaming
- `tools/agent-workflow.html` — Agent Workflow Simulator with 5 architecture patterns (Fan-Out, Router, Map-Reduce, Sequential Chain, ReAct Loop)
- `tools/kpi-dashboard.html` — KPI Dashboard Builder with Chart.js (runs locally)
- `tools/etl-pipeline.html` — ETL Pipeline Simulator with live table updates (runs locally)

**Cloudflare Workers Setup (partial)**
- `worker/index.js` created for `/api/*` endpoints using Cloudflare Workers AI
- Worker registered in Cloudflare dashboard (mouliqe-tools-api) with AI binding
- Currently unused — all tools use simulated responses with `setTimeout` delays

---

### Session: March 28, 2026 (Claude Code) — Explore page, SEO, booking fix

**Booking System Fix**
- `Session.getActiveUser().getEmail()` returns empty string for anonymous web app callers — replaced with hardcoded `to: 'imtiaz@mouliqe.com'` in Apps Script `doPost()`. Must redeploy as new version after any script changes.

**Site-wide: SEO**
- Added Open Graph + Twitter Card meta tags to all 14 HTML files (batch Python script)
- Added `<link rel="canonical">` to all pages
- Improved `<title>` on about, services, process, contact, blog/index
- Added internal cross-links to blog post footers (two clusters: architecture series and strategy series)
- Created `sitemap.xml` with all 14 URLs; submitted to Google Search Console

**New Page: `/explore` (`explore.html`)**

Interactive AI architecture configurator. Full architecture:

*Configurator (3 sequential questions):*
- Q1: challenge (`automation` / `reliability` / `data` / `ai-product`)
- Q2: maturity (`scattered` / `siloed` / `clean`)
- Q3: success (`save-time` / `reliable-production` / `insights`)
- Questions reveal sequentially; architecture section hidden until Q3 answered

*Pipeline diagram:*
- 5 nodes: Sources → Ingestion → Warehouse → AI → Output
- 7 level states: `critical`, `active`, `secondary`, `future`, `warning`, `at-risk`, `default`
- `computeLevels()`: BASE[challenge] + maturity modifier + success modifier + toggle overrides
- 3 toggles show degradation: "Skip data foundation" (sources/ingestion/warehouse → warning, ai/output → at-risk), "Remove guardrails" (ai → warning), "Single agent" (cosmetic on ai node)
- Connectors color = minimum priority of the two adjacent nodes

*6 additional features:*
1. **Timeline + cost estimate** — phase breakdown with week ranges per challenge×maturity; cost badge (Medium/High/Complex) with one-line reason; disclaimer text below
2. **Node drill-down** — click any node → panel with tech stack, what breaks, Mouliqe handles, client provides; `state.activeNode` tracks open node; re-renders on toggle change
3. **Scenario presets** — 5 pill buttons: E-commerce analytics, Internal AI assistant, Support automation, Fix AI in production, Data mess first
4. **Share URL** — `?c=&m=&s=&t=` params; `updateURL()` called on every answer/toggle; `restoreFromURL()` at init; "⎘ Copy link" in sticky bar
5. **Cost tier** — Medium / High / Complex badge rendered alongside timeline
6. **Mouliqe vs client split** — inside drill-down panel

*Inline action row (`#explore-actions`):*
- `display:flex; justify-content:flex-end` — sits right above the Quick Start preset pills, inside the normal content width
- Hidden (`display:none`) until architecture reveals; removed on reset
- Contains "⎘ Copy link" (`#copy-link-btn`) and "↺ Start over" (`#reset-btn`)
- Inline placement ensures it works identically on mobile and desktop

*Embedded full booking form:*
- Same 3-step flow as `contact.html`, embedded at page bottom in a `.card`
- All IDs prefixed `eb-` to avoid pipeline connector ID conflicts
- `setBookingInterest()` auto-fills interest dropdown from `state.challenge` on reveal
- Booking state variables (`ebSlots`, `ebSelectedDate`, etc.) are separate from configurator state

---

### Session: March 27–28, 2026 (Claude Code)

**Process Page: Tracker Sidebar Redesign**
- Replaced numbered circle badges (00–05) with contextual SVG icons per step: magnifying glass (Discovery), document (Diagnosis), pencil (Blueprint), code brackets (Build), sliders (Refine), shield-check (Support)
- Added vertical timeline connecting line threading through icons via CSS `::after` on `.process-track-item`
- Icon container (`.process-track-icon`) uses `background:#060a14` to mask the line behind icons; no border or circle
- Active step: icon turns green (`rgba(74,222,128,0.9)`), label goes semibold/80% white, connector line lights up brighter green
- Upgraded `.sidebar-card` to match `.sidebar-cta` treatment: green-tinted background, green border, top gradient line

**Home Page: Mobile "How I Work" Redesign**
- Replaced bare vertical list with a snake-flow 2-column grid (`grid md:hidden`, `grid-template-columns:1fr auto 1fr`)
- Flow order: Discovery→Diagnosis (row 1, right arrow), down connector on RIGHT, Build←Blueprint (row 2, left arrow reversed), down connector on LEFT, Refine→Support (row 3, right arrow)
- Each step is a tile (subtle bg, border, border-radius)
- Icons match the process page tracker SVGs
- **Key**: `display:grid` must be a Tailwind class (`grid`), NOT inline style — inline style overrides `md:hidden`

**Site-wide: Merged Sidebar CTA + LinkedIn Card**
- All `.sidebar-cta` cards now include a divider and "Follow on LinkedIn" link below the button
- Updated on 12 files: about.html, services.html, process.html, blog/index.html, and all 8 blog posts
- LinkedIn link uses `display:flex;justify-content:center;align-items:center;line-height:1` for correct icon/text alignment

**Mobile CTA Cards for Blog Posts and Process Page**
- Blog posts had `hidden lg:block` on their sidebar — no mobile CTA existed
- Added `lg:hidden` card after main content on all 8 blog posts, preserving each post's contextual headline
- Process page: replaced minimal `lg:hidden` button with full merged card

**About Page: Description Copy Update**
- Sidebar CTA description: "30-minute conversation about your business." → "30 min on Google Meet. No prep needed, no pitch — just an honest conversation."

**New Files**
- `CLAUDE.md` — Claude Code guidance file

---

### Session: March 27, 2026 (Kiro CLI + Mimir)

Changes made since initial commit (all relative to the initial commit):

**Site-wide: SEO & Favicon**
- Added `favicon.svg` to all pages
- Added `<meta name="description">` to all pages

**Site-wide: Clean URL Routing**
- All links changed from `page.html` to `/page`
- `components.js` updated with `isActive()` function handling clean URLs and `.html` fallbacks
- `serve.py` updated to handle clean URL routing including `/blog` paths

**Site-wide: Visual Polish**
- Body text opacity: `0.30-0.42` → `0.45-0.55` (better readability)
- Section intro text size: `0.88rem` → `0.84rem` (slightly smaller)
- Section intro text opacity: `white/45` → `white/55` (crisper subtitles)
- Card body text: `0.78rem` → `0.75rem`
- Card body text opacity: `white/45` → `white/55`
- Blockquote text in about.html: `0.55` → `0.65` opacity
- Prose body (`.prose-custom p`): `0.42` → `0.55` opacity
- Hero section: removed decorative blur blobs
- Removed background gradient overlays from sections
- Buttons: added `translateY(-2px)` lift + softer box shadows on hover
- Sidebar nav: removed background hover/active states, added subtle `::after` underline for active link
- Nav links vertically centered (`justify-content: center`)

**Home Page: Process Section ("The Mouliqe Way")**
- Step numbers (00-05): `forest-400/15` → `forest-400` (full solid green)
- Arrows between steps: `forest-500/15` → `forest-400` (full solid green)
- Description text: `white/20` at `0.68rem` → `white/40` at `0.72rem`
- Same changes applied to mobile layout

**Process Page**
- Step numbers (00-05): `rgba(74,222,128,0.15)` → `rgba(74,222,128,1)` (full solid green)
- Sidebar CTA text: "Discovery is free, no commitment." → "Every good solution starts with the right conversation."

**About, Services, Process Pages: Sidebar CTA**
- Old: `.sidebar-card` with just a button
- New: `.sidebar-cta` component with green-tinted border, top gradient line, descriptive text above button

**Contact Page: Complete Rebuild**
- Old: Simple contact form (name, email, company, interest, message → submit)
- New: 3-step booking flow (date → time → details → confirmation)
- Pulls live availability from Google Apps Script API
- Step indicator with animated connectors
- Skeleton loading states
- Email changed from `hello@mouliqe.com` to `imtiaz@mouliqe.com`

**New: Blog System**
- Created `blog/` directory with listing page, posts.json, and 2 posts
- Blog listing auto-renders from JSON (no manual HTML editing for new posts)
- Added "Blog" to sidebar nav
- Blog nav highlights on all `/blog/*` paths
- Posts: full article content from LinkedIn, styled with prose-custom + blockquotes
- Each post has sidebar CTA: "Have a similar challenge?"

**New Files**
- `favicon.svg`
- `serve.py`
- `blog/index.html`
- `blog/posts.json`
- `blog/costume-change-vs-new-actor.html`
- `blog/planner-worker-synthesizer.html`

---

## How To: Add a New Blog Post

### Step 1: Create the post file

Copy an existing post (e.g. `blog/planner-worker-synthesizer.html`) and save as `blog/your-slug.html`.

Update:
- `<title>` tag
- `<meta name="description">`
- Back to Blog link (already correct if copied)
- h1 title
- Date
- Tag pills
- All content in the `.prose-custom` div
- Footer links/attribution

### Step 2: Add entry to posts.json

Add a new object at the TOP of the array (newest first):

```json
{
  "slug": "your-slug",
  "title": "Your Post Title",
  "date": "2026-03-15",
  "excerpt": "One sentence summary.",
  "tags": ["AI Architecture"],
  "linkedin": "https://linkedin.com/pulse/..."
}
```

### Step 3: Deploy

Upload both files to GitHub. Cloudflare auto-deploys.

---

## How To: Run Locally

```bash
cd /Users/imtiazar/Desktop/GCIPM/Dev/cons/site
python3 serve.py
```

Open `http://localhost:8000`

If port 8000 is busy:
```bash
lsof -i :8000
kill <PID>
python3 serve.py
```

Hard refresh in browser: `Cmd+Shift+R` (clears cache).
