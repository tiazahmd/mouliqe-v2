// Mouliqe — Components v4

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

const LOGO_HTML = `<div style="display:flex;flex-direction:column;align-items:center;width:100%">
  <span style="font-size:0.95rem;font-weight:700;color:#4ade80;letter-spacing:0.2em;text-transform:uppercase">Mouliqe</span>
  <span style="font-size:0.68rem;color:rgba(255,255,255,0.4);letter-spacing:0.06em;margin-top:0.35rem">fundamental &middot; /moʊ.liːk/</span>
</div>`;
const CHEVRON = `<svg class="chevron" width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>`;
const EXPAND_ARROW = `<svg class="expand-arrow" width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`;
const path = window.location.pathname.replace(/\/+$/, '') || '/';

function isActive(href) {
  if (href === '/') return path === '/' || path === '' || path === '/index' || path === '/index.html';
  if (href === '/blog') return path.startsWith('/blog');
  if (href === '/tools') return path.startsWith('/tools');
  return path === href || path === href + '.html';
}

function isToolsActive() {
  return path.startsWith('/tools');
}

function buildLinks() {
  return NAV_LINKS.map(l => {
    if (l.children) {
      const toolsOpen = isToolsActive();
      const childLinks = l.children.map(c => {
        const tagHtml = c.tag ? `<span class="nav-tag nav-tag-${c.tag}">${c.tag === 'ai' ? 'AI' : 'Local'}</span>` : '';
        return `<a href="${c.href}" class="sidebar-link sidebar-sublink${isActive(c.href) ? ' active' : ''}">${isActive(c.href) ? CHEVRON : ''}<span>${c.label}</span>${tagHtml}</a>`;
      }).join('');
      return `<div class="sidebar-group${toolsOpen ? ' open' : ''}">
        <button class="sidebar-link sidebar-group-toggle${toolsOpen ? ' active' : ''}" type="button">
          ${toolsOpen ? CHEVRON : ''}<span>${l.label}</span>${EXPAND_ARROW}
        </button>
        <div class="sidebar-children">${childLinks}</div>
      </div>`;
    }
    return `<a href="${l.href}" class="sidebar-link${isActive(l.href) ? ' active' : ''}">${isActive(l.href) ? CHEVRON : ''}<span>${l.label}</span></a>`;
  }).join('');
}

function injectNav() {
  const el = document.getElementById('site-nav');
  if (!el || el.dataset.injected) return;
  el.dataset.injected = 'true';
  el.innerHTML = `
    <div class="scroll-progress"><div class="scroll-progress-bar" id="scroll-bar"></div></div>
    <aside class="sidebar">
      <a href="/" class="sidebar-logo">${LOGO_HTML}</a>
      <nav class="sidebar-nav">${buildLinks()}</nav>
      <div class="sidebar-footer mt-auto pt-8"><p class="text-[0.6rem] text-white/15 tracking-wider">&copy; 2026 Mouliqe</p></div>
    </aside>
    <div class="mobile-overlay" id="mobile-overlay"></div>
    <div class="mobile-menu" id="mobile-menu">
      <a href="/" class="sidebar-logo" style="margin-bottom:2rem">${LOGO_HTML}</a>
      <nav class="flex flex-col gap-1">${buildLinks()}</nav>
    </div>
    <button id="menu-toggle" class="mobile-toggle hidden fixed top-4 right-4 z-50 md:hidden flex-col gap-[5px] p-2" aria-label="Menu">
      <span class="bar-1 w-5 h-[1.5px] bg-white/60 transition-all duration-300 origin-center block"></span>
      <span class="bar-2 w-5 h-[1.5px] bg-white/60 transition-all duration-300 block"></span>
      <span class="bar-3 w-5 h-[1.5px] bg-white/60 transition-all duration-300 origin-center block"></span>
    </button>
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
    </button>`;
}

function injectFooter() {}

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  if (!toggle || !menu || !overlay) return;
  toggle.addEventListener('click', () => { menu.classList.toggle('open'); overlay.classList.toggle('open'); });
  overlay.addEventListener('click', () => { menu.classList.remove('open'); overlay.classList.remove('open'); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); overlay.classList.remove('open'); }));
}

function initToolsToggle() {
  document.querySelectorAll('.sidebar-group-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
    });
  });
}

function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-bar');
  const btn = document.getElementById('back-to-top');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = pct + '%';
    if (btn) btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initProcessHover() {
  // Card hover -> flow label highlight (home page)
  const cards = document.querySelectorAll('[data-process]');
  const labels = document.querySelectorAll('.process-flow-label');
  const arrows = document.querySelectorAll('.process-flow-arrow');
  if (cards.length && labels.length) {
    cards.forEach(card => {
      const idx = parseInt(card.dataset.process);
      card.addEventListener('mouseenter', () => {
        labels.forEach((l, i) => l.classList.toggle('highlighted', i === idx));
        arrows.forEach((a, i) => a.classList.toggle('highlighted', i === idx || i === idx - 1));
      });
      card.addEventListener('mouseleave', () => {
        labels.forEach(l => l.classList.remove('highlighted'));
        arrows.forEach(a => a.classList.remove('highlighted'));
      });
    });
  }

  // Scroll-based tracker (process page sidebar)
  const tracker = document.getElementById('process-tracker');
  if (!tracker || !cards.length) return;
  const trackItems = tracker.querySelectorAll('.process-track-item');
  let trackStarted = false;
  function startTracking() {
    if (trackStarted) return;
    trackStarted = true;
    const trackObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const idx = parseInt(e.target.dataset.process);
        if (idx >= 0 && trackItems[idx]) {
          if (e.isIntersecting) {
            trackItems[idx].classList.add('active');
          } else if (e.boundingClientRect.top > 0) {
            trackItems[idx].classList.remove('active');
          }
        }
      });
    }, { threshold: 0.3 });
    cards.forEach(c => trackObs.observe(c));
  }
  window.addEventListener('scroll', startTracking, { once: true, passive: true });
}

function initFormSuccess() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.style.display = 'none';
    success.classList.add('show');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  initMobileMenu();
  initToolsToggle();
  initScrollReveal();
  initScrollProgress();
  initProcessHover();
  initFormSuccess();
});
