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
- `styles.css` — all custom CSS (v8); Tailwind is loaded from CDN in each HTML file's `<head>`
- `components.js` — injected into every page; handles sidebar nav, mobile menu, scroll effects, back-to-top, and progress bar
- `blog/posts.json` — drives the blog listing page; `blog/index.html` fetches and renders it client-side

### Layout Pattern
- **Desktop**: Fixed 200px left sidebar (nav) + main content with left margin
- **Mobile**: Sidebar becomes top bar with hamburger menu (breakpoint: 768px / Tailwind `md:`)
- Navigation links and active state detection live in `components.js` (`NAV_LINKS` array, `isActive()` function)

### Blog System
Each post requires two things:
1. An entry in `blog/posts.json` (slug, title, date, excerpt, tags, linkedinUrl)
2. A static HTML file at `blog/<slug>.html`

The listing page renders from JSON; individual posts are standalone HTML files.

### Booking System (contact.html)
3-step flow: date → time slot → details form. Availability is fetched live from a Google Apps Script endpoint that reads the owner's Google Calendar. The Apps Script source is in `cons/mouliqe-booking.gs`.

### Clean URL Routing
`serve.py` maps `/page` → `page.html` and `/blog` → `blog/index.html` for local dev. Cloudflare Pages handles this natively in production.

## Design System

- **Background**: `#060a14`
- **Primary accent**: `#4ade80` (forest-400 green)
- **Font**: Oxanium (Google Fonts, weights 300–700)
- **Tailwind config**: Defined inline in each HTML `<head>` — custom `forest` palette (50–950 shades) and Oxanium font family override

## Full Documentation

`AGENTS.md` contains the comprehensive build log including full design system tokens, component patterns, the booking system API details, all CSS class names, and a changelog. Consult it for deep architectural context.
