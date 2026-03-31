// Mouliqe — Components v4

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { label: 'Demo', href: '/demo', children: [
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
  if (href === '/demo') return path === '/demo' || path === '/demo.html';
  if (href === '/tools') return path.startsWith('/tools');
  return path === href || path === href + '.html';
}

function isToolsActive() {
  return path.startsWith('/tools') || path === '/demo' || path === '/demo.html';
}

function buildLinks() {
  return NAV_LINKS.map(l => {
    if (l.children) {
      const toolsOpen = isToolsActive() || (l.href && isActive(l.href));
      const childLinks = l.children.map(c => {
        const tagHtml = c.tag ? `<span class="nav-tag nav-tag-${c.tag}">${c.tag === 'ai' ? 'AI' : 'Local'}</span>` : '';
        return `<a href="${c.href}" class="sidebar-link sidebar-sublink${isActive(c.href) ? ' active' : ''}">${isActive(c.href) ? CHEVRON : ''}<span>${c.label}</span>${tagHtml}</a>`;
      }).join('');
      const groupActive = (l.href && isActive(l.href)) || toolsOpen;
      return `<div class="sidebar-group${toolsOpen ? ' open' : ''}">
        <div class="sidebar-link sidebar-group-toggle${groupActive ? ' active' : ''}" style="display:flex;align-items:center;gap:0.5rem">
          ${groupActive ? CHEVRON : ''}<a href="${l.href || '#'}" style="text-decoration:none;color:inherit;flex:1">${l.label}</a>
          <button type="button" class="sidebar-expand-btn" style="background:none;border:none;cursor:pointer;padding:0.2rem;color:inherit;display:flex;align-items:center">${EXPAND_ARROW}</button>
        </div>
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

function injectSchema() {
  const schemas = [];
  const p = window.location.pathname.replace(/\/+$/, '') || '/';

  // Organization schema — every page
  schemas.push({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Mouliqe",
    "url": "https://mouliqe.com",
    "logo": "https://mouliqe.com/favicon.svg",
    "description": "AI consulting that starts with understanding your business. Custom AI solutions, data engineering, and analytics architecture.",
    "founder": { "@type": "Person", "name": "Imtiaz Ahmed" },
    "areaServed": "Worldwide",
    "priceRange": "$$",
    "knowsAbout": ["Artificial Intelligence", "Data Engineering", "Data Architecture", "Business Intelligence", "Machine Learning", "AI Agents"]
  });

  // Homepage — WebSite + SearchAction
  if (p === '/' || p === '' || p === '/index' || p === '/index.html') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Mouliqe",
      "url": "https://mouliqe.com",
      "description": "AI consulting and data architecture for businesses navigating AI transformation."
    });
  }

  // About — Person
  if (p === '/about' || p === '/about.html') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Imtiaz Ahmed",
      "jobTitle": "AI Solutions Architect & Data Consultant",
      "url": "https://mouliqe.com/about",
      "worksFor": { "@type": "Organization", "name": "Mouliqe", "url": "https://mouliqe.com" },
      "knowsAbout": ["AI Architecture", "Data Engineering", "Business Intelligence", "Multi-Agent Systems", "Production AI Systems"]
    });
  }

  // Services — Service items
  if (p === '/services' || p === '/services.html') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "AI Solutions & Architecture",
      "provider": { "@type": "ProfessionalService", "name": "Mouliqe", "url": "https://mouliqe.com" },
      "description": "Custom AI application development, intelligent process automation, AI architecture design and review, model integration and orchestration.",
      "areaServed": "Worldwide"
    }, {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Data Engineering & Infrastructure",
      "provider": { "@type": "ProfessionalService", "name": "Mouliqe", "url": "https://mouliqe.com" },
      "description": "Data pipeline design, data warehouse architecture, system integration, ETL development, and data quality frameworks.",
      "areaServed": "Worldwide"
    }, {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Analytics & Business Intelligence",
      "provider": { "@type": "ProfessionalService", "name": "Mouliqe", "url": "https://mouliqe.com" },
      "description": "Dashboard and reporting development, KPI framework design, executive reporting systems, and self-service analytics.",
      "areaServed": "Worldwide"
    });
  }

  // FAQ page — FAQPage schema (Google rich results)
  // Tool pages — SoftwareApplication schema
  if (p.startsWith('/tools/')) {
    const title = document.querySelector('title')?.textContent?.replace(/\s*[|—].*$/, '') || '';
    const desc = document.querySelector('meta[name="description"]')?.content || '';
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": title,
      "description": desc,
      "url": window.location.href,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "author": { "@type": "Person", "name": "Imtiaz Ahmed", "url": "https://mouliqe.com/about" }
    });
  }

  if (p === '/faq' || p === '/faq.html') {
    const faqItems = typeof FAQS !== 'undefined' ? FAQS : [];
    if (faqItems.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a.replace(/<[^>]*>/g, '') }
        }))
      });
    }
  }

  // Blog posts — Article schema
  if (p.startsWith('/blog/') && p !== '/blog' && p !== '/blog/') {
    const title = document.querySelector('title')?.textContent?.replace(' — Mouliqe', '') || '';
    const desc = document.querySelector('meta[name="description"]')?.content || '';
    const canonical = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
    const dateEl = document.querySelector('time');
    const datePublished = dateEl?.getAttribute('datetime') || dateEl?.textContent || '';
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": desc,
      "url": canonical,
      "datePublished": datePublished,
      "author": { "@type": "Person", "name": "Imtiaz Ahmed", "url": "https://mouliqe.com/about" },
      "publisher": { "@type": "Organization", "name": "Mouliqe", "url": "https://mouliqe.com", "logo": { "@type": "ImageObject", "url": "https://mouliqe.com/favicon.svg" } },
      "image": "https://mouliqe.com/og-image.png",
      "mainEntityOfPage": canonical
    });
  }

  // Inject all schemas
  schemas.forEach(s => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(s);
    document.head.appendChild(el);
  });
}

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
  document.querySelectorAll('.sidebar-expand-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.closest('.sidebar-group').classList.toggle('open');
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

function injectBlogCTA() {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  if (!p.startsWith('/blog/') || p === '/blog' || p === '/blog/') return;

  const serviceMap = {
    'stop-building-ai-features': { service: 'AI Solutions & Architecture', href: '/services' },
    'poc-to-production': { service: 'AI Solutions & Architecture', href: '/services' },
    'data-problem-not-ai-problem': { service: 'Data Engineering & Infrastructure', href: '/services' },
    'context-windows-are-a-lie': { service: 'AI Solutions & Architecture', href: '/services' },
    'guardrails-problem': { service: 'AI Solutions & Architecture', href: '/services' },
    'ai-memory-systems': { service: 'AI Solutions & Architecture', href: '/services' },
    'planner-worker-synthesizer': { service: 'AI Solutions & Architecture', href: '/services' },
    'costume-change-vs-new-actor': { service: 'AI Solutions & Architecture', href: '/services' },
  };

  const slug = p.split('/').pop();
  const mapping = serviceMap[slug] || { service: 'AI & Data Consulting', href: '/services' };

  const ctaHTML = `
    <div style="margin-top:3rem;padding:2rem;border-radius:0.85rem;border:1px solid rgba(34,197,94,0.12);background:rgba(34,197,94,0.02);position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(74,222,128,0.2),transparent)"></div>
      <p style="font-size:0.65rem;font-weight:600;color:rgba(74,222,128,0.6);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:0.75rem">Need help with this?</p>
      <p style="font-size:0.92rem;font-weight:700;color:rgba(255,255,255,0.8);margin-bottom:0.5rem">This is the kind of problem I solve for businesses.</p>
      <p style="font-size:0.78rem;color:rgba(255,255,255,0.4);line-height:1.75;margin-bottom:1.25rem">If you're navigating these challenges, I'd love to have a conversation. Every engagement starts with a free discovery call — no pitch, no pressure.</p>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
        <a href="/contact" style="display:inline-flex;align-items:center;justify-content:center;line-height:1;border-radius:0.5rem;font-weight:600;padding:0.65rem 1.25rem;font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;white-space:nowrap;color:rgba(10,46,24,0.9);background:rgba(74,222,128,0.85);text-decoration:none;transition:all 0.3s">Book a Discovery Call</a>
        <a href="${mapping.href}" style="font-size:0.68rem;color:rgba(74,222,128,0.5);text-decoration:none;transition:color 0.3s" onmouseover="this.style.color='rgba(74,222,128,0.8)'" onmouseout="this.style.color='rgba(74,222,128,0.5)'">Learn about ${mapping.service} &rarr;</a>
      </div>
    </div>`;

  const linkedInLinks = document.querySelectorAll('a[href*="linkedin.com/in/"]');
  if (linkedInLinks.length > 0) {
    const container = linkedInLinks[linkedInLinks.length - 1].closest('div');
    if (container) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = ctaHTML;
      container.parentNode.insertBefore(wrapper.firstElementChild, container);
    }
  }
}

function injectShareBar() {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  const isBlog = p.startsWith('/blog/') && p !== '/blog' && p !== '/blog/';
  const isTool = p.startsWith('/tools/');
  if (!isBlog && !isTool) return;

  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title.replace(' | Mouliqe', '').replace(' — Mouliqe', ''));

  const shareCard = document.createElement('div');
  shareCard.className = 'sidebar-card';
  shareCard.innerHTML = `
    <p style="font-size:0.6rem;font-weight:600;color:rgba(255,255,255,0.25);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:0.75rem">Share this</p>
    <div style="display:flex;align-items:center;gap:0.5rem">
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" title="Share on LinkedIn" style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:0.4rem;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.015);color:rgba(255,255,255,0.3);transition:all 0.3s;text-decoration:none" onmouseover="this.style.borderColor='rgba(74,222,128,0.3)';this.style.color='rgba(74,222,128,0.7)';this.style.background='rgba(74,222,128,0.04)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.3)';this.style.background='rgba(255,255,255,0.015)'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href="https://twitter.com/intent/tweet?url=${url}&text=${title}" target="_blank" rel="noopener" title="Share on X" style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:0.4rem;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.015);color:rgba(255,255,255,0.3);transition:all 0.3s;text-decoration:none" onmouseover="this.style.borderColor='rgba(74,222,128,0.3)';this.style.color='rgba(74,222,128,0.7)';this.style.background='rgba(74,222,128,0.04)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.3)';this.style.background='rgba(255,255,255,0.015)'">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <button title="Copy link" onclick="navigator.clipboard.writeText(window.location.href).then(()=>{const s=this.querySelector('.copy-label');s.textContent='Copied!';setTimeout(()=>s.textContent='Copy link',1500)})" style="display:flex;align-items:center;justify-content:center;gap:0.35rem;height:32px;padding:0 0.65rem;border-radius:0.4rem;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.015);color:rgba(255,255,255,0.3);cursor:pointer;font-family:inherit;font-size:0.58rem;font-weight:600;letter-spacing:0.04em;transition:all 0.3s" onmouseover="this.style.borderColor='rgba(74,222,128,0.3)';this.style.color='rgba(74,222,128,0.7)';this.style.background='rgba(74,222,128,0.04)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.3)';this.style.background='rgba(255,255,255,0.015)'">
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
        <span class="copy-label">Copy link</span>
      </button>
    </div>`;

  // Find the sticky sidebar container and append the share card
  const stickyContainer = document.querySelector('.hidden.lg\\:block div[style*="sticky"]');
  if (stickyContainer) {
    stickyContainer.appendChild(shareCard);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
  injectSchema();
  injectBlogCTA();
  injectShareBar();
  initMobileMenu();
  initToolsToggle();
  initScrollReveal();
  initScrollProgress();
  initProcessHover();
  initFormSuccess();
});
