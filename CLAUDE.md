# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mouliqe is a static consultancy website for AI/data engineering services. It is **not a Node.js project** — there is no package.json, no build step, and no framework. Everything is raw HTML, Tailwind CSS (CDN), and vanilla JavaScript.

## Development

**Run locally:**
```bash
python3 serve.py
```
Serves on port 8000 with clean URL routing (`/about` → `about.html`).

**Deploy:** Push to `main` — Cloudflare Pages auto-deploys. No build command needed.

## Architecture

### Key Files
- `styles.css` — all custom CSS; Tailwind is loaded from CDN in each HTML file's `<head>`
- `components.js` — injected into every page; handles sidebar nav, mobile menu, scroll effects, back-to-top, and progress bar
- `blog/posts.json` — drives the blog listing page; `blog/index.html` fetches and renders it client-side
- `_headers` — Cloudflare Pages custom headers; sets `Cache-Control: no-cache, must-revalidate` on `components.js` to prevent stale nav after deployments
- `og-image.png` / `og-image.svg` — social card preview image referenced in OG meta tags across all pages

### Layout Pattern
- **Desktop**: Fixed 200px left sidebar (nav) + main content with left margin
- **Mobile**: Sidebar becomes top bar with hamburger menu (breakpoint: 768px / Tailwind `md:`)
- Navigation links and active state detection live in `components.js` (`NAV_LINKS` array, `isActive()`, `isToolsActive()`)
- The "Demo" nav item is both a link (`/demo`) and a collapsible group (`.sidebar-group`) with child links tagged `ai` or `local`. Clicking the label navigates to the demo landing page; clicking the expand arrow toggles children.

### Demo Section (`/tools/*` + `/demo`)

Seven interactive tool pages: 4 AI-powered (`data-quality`, `rag-pipeline`, `agent-workflow`, `supply-chain`) and 3 local (`kpi-dashboard`, `etl-pipeline`, `cost-simulator`). A landing page at `/demo` (`demo.html`) renders all tools as cards in a grid, split into "AI-Powered" and "Runs Locally" sections. Cards are generated dynamically from a `DEMOS` array.

The Demo nav item is both a link (`/demo`) and a collapsible parent — clicking the label navigates, clicking the expand arrow toggles children.

All tool pages use a **70/30 layout**: 70% tool area (pipeline + context + output), 30% sticky right sidebar (explanation + CTA).

**Pipeline visualization** (shared across all 5): `.tool-pipeline` with `.tool-stage` elements. Regular stages: amber when active. AI stages marked with `data-ai` attribute: purple color scheme + "AI" micro-badge via CSS `::after`. The context panel (`.tool-context`) accumulates log entries — never replaces them.

**Agent Workflow Simulator** has 5 distinct agentic patterns, one per preset:
- `fan-out` (invoices) — Planner → parallel Workers → Synthesizer
- `router` (tickets) — Router classifies → dispatches to one Specialist (others dimmed)
- `map-reduce` (reports) — Parallel Mappers → Reducer
- `chain` (onboard) — Sequential agents with `.checkpoint-gate` validation gates
- `react` (monitor) — Single agent iterating Observe→Think→Act cycles

The `#agent-graph` container is fully dynamic — pattern-specific `run*()` functions build the DOM. Pattern badge shown in analysis card (color-coded per pattern).

**Chart.js** (KPI dashboard): wrap `<canvas>` in `<div style="position:relative;height:180px">` — required to prevent infinite resize loop with `maintainAspectRatio:false`.

### Sidebar CTA Pattern
Every content page has a sticky right sidebar with a `.sidebar-cta` card containing:
1. A contextual headline + description
2. "Book a Discovery Call" button (`/contact`)
3. A subtle divider + "Follow on LinkedIn" link

On mobile, pages where the sidebar is `hidden lg:block` (blog posts, process page) have a `lg:hidden` version of this card appended after the main content. Pages without `hidden lg:block` (about, services) naturally stack the sidebar below content on mobile.

### Blog System
Each post requires two things:
1. An entry in `blog/posts.json` (slug, title, date, excerpt, tags, linkedinUrl)
2. A static HTML file at `blog/<slug>.html`

The listing page renders from JSON; individual posts are standalone HTML files. Each post has a per-post contextual CTA headline in the sidebar (and mobile card).

### Booking System (contact.html + explore.html)
3-step flow: date → time slot → details form. Availability is fetched live from a Google Apps Script endpoint that reads the owner's Google Calendar. The Apps Script source is in `cons/mouliqe-booking.gs`.

The same booking form is also embedded at the bottom of `explore.html`. All IDs in that copy are prefixed `eb-` to avoid conflicts with the pipeline's `conn-*` IDs. The `ebSelectedInterest` variable is auto-populated from `state.challenge` via `setBookingInterest()` when the architecture reveals.

**Known Apps Script fix**: `Session.getActiveUser().getEmail()` returns empty for anonymous callers — the recipient must be hardcoded as `to: 'imtiaz@mouliqe.com'`.

### Clean URL Routing
`serve.py` maps `/page` → `page.html` and `/blog` → `blog/index.html` for local dev. Cloudflare Pages handles this natively in production.

## Design System

- **Background**: `#060a14`
- **Primary accent**: `#4ade80` (forest-400 green)
- **Font**: Oxanium (Google Fonts, weights 300–700)
- **Tailwind config**: Defined inline in each HTML `<head>` — custom `forest` palette (50–950 shades) and Oxanium font family override

### Key CSS Classes
- `.sidebar-cta` — Green-tinted card with top gradient line. Used for all CTAs sitewide. Contains Discovery Call button + LinkedIn link.
- `.sidebar-card` — Same green treatment as `.sidebar-cta` (green bg, border, top gradient line). Used for the process tracker on process.html.
- `.process-track-icon` — Icon container for the process tracker sidebar. Uses `background:#060a14` to mask the vertical timeline line behind each icon. No border/circle — just the icon itself.
- `.card` / `.card-highlight` — Main content cards with border and hover state.
- `.reveal` — Scroll-triggered fade-in (IntersectionObserver in `components.js`).

### Explore Page (`explore.html`)
Interactive configurator — 3 questions reveal a dynamic AI pipeline architecture. Key concepts:

- **State machine**: `state = { challenge, maturity, success, toggles, activeNode }` drives everything. `computeLevels()` combines base levels + maturity/success modifiers + toggle overrides.
- **Node levels**: `critical → active → secondary → future` (good) and `warning → at-risk` (bad). Each maps to a CSS class (`level-critical`, etc.) and badge class (`badge-critical`, etc.).
- **Data constants**: `BASE` (base levels per challenge), `DESC` (per-node per-challenge descriptions), `SUMMARY` (per challenge×maturity), `TOGGLE_DESC`/`TOGGLE_WARN` (toggle overrides), `TIMELINE` (phase breakdown + cost tier per challenge×maturity), `DRILLDOWN` (tech stack, what breaks, responsibility split per node), `PRESETS` (5 scenario quick-starts).
- **Action row**: `#explore-actions` is an inline `display:flex; justify-content:flex-end` row sitting above the Quick Start presets. Shows when architecture reveals, hides on reset. Contains `#copy-link-btn` and `#reset-btn`. Inline (not fixed) so it works on all screen sizes without sidebar offset math.
- **Node drill-down**: Click any pipeline node → `#node-drilldown` panel appears below pipeline with 4 columns (tech stack, what breaks, Mouliqe handles, client provides). `state.activeNode` tracks which node is open.
- **Share URL**: `updateURL()` encodes `?c=&m=&s=&t=` on every interaction. `restoreFromURL()` runs at init to restore state from params.
- **Presets**: `applyPreset(p)` sets all 3 state values, updates tile selections, and triggers full render + URL update.
- **Interest auto-fill**: `setBookingInterest()` maps `state.challenge` → interest dropdown value; skips if user already picked manually (`has-value` class check).

**ID conflict note**: The explore page has pipeline connectors `conn-0` through `conn-3` AND step indicator connectors in the embedded booking form. The booking form uses `eb-conn-1-2` / `eb-conn-2-3` to avoid collision.

### Mobile "How I Work" (index.html)
The desktop version is `hidden md:flex` (horizontal flow with arrows). The mobile version is `grid md:hidden` — a 3-column CSS grid (`1fr auto 1fr`) with a snake-flow layout:
- Row 1: Discovery → Diagnosis (right arrow)
- Down connector on the RIGHT (Diagnosis → Blueprint)
- Row 2: Build ← Blueprint (left arrow, reversed)
- Down connector on the LEFT (Build → Refine)
- Row 3: Refine → Support (right arrow)

**Important**: Mobile display uses `class="grid md:hidden"` — do NOT put `display:grid` in inline styles or it will override Tailwind's `md:hidden` and show on desktop.

### SEO
All pages have OG + Twitter Card tags, canonical URLs, and descriptive `<title>` / `<meta name="description">` tags. `sitemap.xml` in the repo root lists all URLs and is submitted to Google Search Console.

## Full Documentation

`AGENTS.md` contains the comprehensive build log including full design system tokens, component patterns, the booking system API details, all CSS class names, and a changelog. Consult it for deep architectural context.
