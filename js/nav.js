// nav.js — sidebar navigation injector + active state + mobile toggle
import { mountThemeToggle } from './theme.js';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About', children: [
    { href: '/resume', label: 'Resume' },
  ]},
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/demo', label: 'Demo', children: [
    { href: '/tools/data-quality', label: 'Data Quality', tag: 'ai' },
    { href: '/tools/rag-pipeline', label: 'RAG Pipeline', tag: 'ai' },
    { href: '/tools/agent-workflow', label: 'Agent Workflow', tag: 'ai' },
    { href: '/tools/kpi-dashboard', label: 'KPI Dashboard', tag: 'local' },
    { href: '/tools/etl-pipeline', label: 'ETL Pipeline', tag: 'local' },
    { href: '/tools/cost-simulator', label: 'Cost Simulator', tag: 'local' },
    { href: '/tools/supply-chain', label: 'Supply Chain', tag: 'ai' },
    { href: '/tools/document-intelligence', label: 'Doc Intelligence', tag: 'ai' },
    { href: '/tools/prompt-security', label: 'Prompt Security', tag: 'ai' },
    { href: '/tools/data-migration', label: 'Data Migration', tag: 'ai' },
    { href: '/tools/anomaly-detection', label: 'Anomaly Detection', tag: 'ai' },
  ]},
  { href: '/explore', label: 'Explore' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const LOGO_HTML = `
  <div class="sidebar-logo__wrap">
    <span class="sidebar-logo__name">Mouliqe</span>
    <span class="sidebar-logo__ipa">fundamental &middot; /moʊ.liːk/</span>
  </div>`;

const CHEVRON = `<svg class="chevron" width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>`;
const EXPAND  = `<svg class="sidebar-group-toggle__expand" width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`;
const SUN     = `<svg class="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
const MOON    = `<svg class="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

const path = window.location.pathname.replace(/\/+$/, '') || '/';

function isActive(href) {
  if (href === '/') return path === '/' || path === '' || path === '/index' || path === '/index.html';
  if (href === '/blog') return path.startsWith('/blog');
  if (href === '/demo') return path === '/demo' || path === '/demo.html';
  if (href === '/tools') return path.startsWith('/tools');
  return path === href || path === href + '.html';
}

function isToolsActive() {
  return path.startsWith('/tools') || path === '/demo' || path === '/demo.html';
}

function renderLinks() {
  return NAV_LINKS.map(l => {
    if (l.children) {
      const anyChildActive = l.children.some(c => isActive(c.href));
      const open = isToolsActive() || (l.href && isActive(l.href)) || anyChildActive;
      const children = l.children.map(c => {
        const tag = c.tag ? `<span class="nav-tag nav-tag--${c.tag}">${c.tag === 'ai' ? 'AI' : 'Local'}</span>` : '';
        return `<a href="${c.href}" class="sidebar-link sidebar-sublink${isActive(c.href) ? ' active' : ''}">
          ${isActive(c.href) ? CHEVRON : ''}<span>${c.label}</span>${tag}
        </a>`;
      }).join('');
      const groupActive = (l.href && isActive(l.href)) || open;
      return `
        <div class="sidebar-group${open ? ' open' : ''}">
          <div class="sidebar-link sidebar-group-toggle${groupActive ? ' active' : ''}">
            ${groupActive ? CHEVRON : ''}
            <a href="${l.href || '#'}" style="color:inherit;flex:1">${l.label}</a>
            <button type="button" class="sidebar-expand-btn" aria-label="Toggle submenu">${EXPAND}</button>
          </div>
          <div class="sidebar-children">${children}</div>
        </div>`;
    }
    return `<a href="${l.href}" class="sidebar-link${isActive(l.href) ? ' active' : ''}">
      ${isActive(l.href) ? CHEVRON : ''}<span>${l.label}</span>
    </a>`;
  }).join('');
}

function renderSidebar(targetId) {
  const el = document.getElementById(targetId);
  if (!el || el.dataset.injected) return;
  el.dataset.injected = 'true';

  el.innerHTML = `
    <aside class="sidebar" aria-label="Primary">
      <a href="/" class="sidebar-logo">${LOGO_HTML}</a>
      <nav class="sidebar-nav">${renderLinks()}</nav>
      <div class="sidebar-footer-row">
        <p class="sidebar-footer__copy">&copy; 2026 Mouliqe</p>
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
          ${SUN}${MOON}
        </button>
      </div>
    </aside>

    <div class="mobile-overlay" id="mobile-overlay"></div>
    <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile">
      <a href="/" class="sidebar-logo" style="margin-bottom:2rem">${LOGO_HTML}</a>
      <div class="sidebar-nav" style="flex:none">${renderLinks()}</div>
      <div class="sidebar-footer-row">
        <button type="button" class="theme-toggle" id="theme-toggle-mobile" aria-label="Toggle theme">
          ${SUN}${MOON}
        </button>
      </div>
    </nav>
    <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
    </button>`;
}

function wireInteractions() {
  // Theme toggle
  mountThemeToggle(document.getElementById('theme-toggle'));
  mountThemeToggle(document.getElementById('theme-toggle-mobile'));

  // Expand/collapse nav groups
  document.querySelectorAll('.sidebar-expand-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      btn.closest('.sidebar-group')?.classList.toggle('open');
    });
  });

  // Mobile toggle
  const mToggle  = document.getElementById('mobile-toggle');
  const mMenu    = document.getElementById('mobile-menu');
  const mOverlay = document.getElementById('mobile-overlay');
  console.log('[NAV DEBUG] mToggle:', mToggle);
  console.log('[NAV DEBUG] mMenu:', mMenu);
  console.log('[NAV DEBUG] mOverlay:', mOverlay);
  console.log('[NAV DEBUG] mToggle display:', mToggle && getComputedStyle(mToggle).display);
  console.log('[NAV DEBUG] mMenu display:', mMenu && getComputedStyle(mMenu).display);
  const closeMobile = () => {
    mToggle?.classList.remove('active');
    mMenu?.classList.remove('open');
    mOverlay?.classList.remove('open');
    mToggle?.setAttribute('aria-expanded', 'false');
  };
  mToggle?.addEventListener('click', () => {
    console.log('[NAV DEBUG] toggle clicked');
    const open = !mMenu?.classList.contains('open');
    console.log('[NAV DEBUG] setting open:', open);
    mToggle.classList.toggle('active', open);
    mMenu?.classList.toggle('open', open);
    mOverlay?.classList.toggle('open', open);
    mToggle.setAttribute('aria-expanded', String(open));
    console.log('[NAV DEBUG] mMenu classes after:', mMenu?.className);
    console.log('[NAV DEBUG] mMenu transform:', mMenu && getComputedStyle(mMenu).transform);
  });
  mOverlay?.addEventListener('click', closeMobile);

  // Back-to-top visibility + click
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

export function mountNav(targetId = 'site-nav') {
  renderSidebar(targetId);
  wireInteractions();
}
