/* ==========================================================================
   Mouliqe — Proposal Presentation Engine v2
   Renders slides from data, handles nav, layouts, animations, theme toggle.
   ========================================================================== */

export function initPresentation({ meta, slides }) {
  const deck = document.getElementById('p-deck');
  if (!deck || !slides?.length) return;

  let current = 0;
  let transitioning = false;

  const progressFill = qs('.p-progress-fill');
  const counter = qs('.p-counter');
  const prevBtn = qs('.p-nav-prev');
  const nextBtn = qs('.p-nav-next');
  const overlay = qs('.p-detail-overlay');
  const detailTitle = qs('.p-detail-title');
  const detailBody = qs('.p-detail-body');
  const detailClose = qs('.p-detail-close');
  const themeBtn = qs('.p-theme-toggle');

  // ---- Theme ----
  function initTheme() {
    const saved = localStorage.getItem('mouliqe-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon();
  }

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mouliqe-theme', next);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    if (!themeBtn) return;
    const isDark = (document.documentElement.getAttribute('data-theme') || 'dark') === 'dark';
    themeBtn.textContent = isDark ? '\u2600' : '\u263E';
  }

  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  initTheme();

  // ---- Render Slides ----
  slides.forEach((s, i) => {
    const layout = s.layout || 'centered';
    const typeClass = `p-slide--${s.type}`;
    const layoutClass = s.type === 'title' ? '' : ` p-slide--${layout}`;
    const el = document.createElement('div');
    el.className = `p-slide ${typeClass}${layoutClass}${i === 0 ? ' active' : ''}`;
    el.dataset.index = i;
    el.dataset.id = s.id;
    el.innerHTML = renderSlide(s);
    deck.appendChild(el);
  });

  // ---- Navigation ----
  function goTo(index) {
    if (transitioning || index < 0 || index >= slides.length || index === current) return;
    transitioning = true;

    const dir = index > current ? 1 : -1;
    const allSlides = deck.querySelectorAll('.p-slide');
    const oldSlide = allSlides[current];
    const newSlide = allSlides[index];

    newSlide.style.transition = 'none';
    newSlide.style.transform = `translateX(${dir * 30}px)`;
    newSlide.style.opacity = '0';
    newSlide.classList.add('active');
    newSlide.offsetHeight; // force reflow

    newSlide.style.transition = '';
    newSlide.style.transform = '';
    newSlide.style.opacity = '';

    oldSlide.style.transform = `translateX(${dir * -30}px)`;
    oldSlide.style.opacity = '0';

    current = index;
    updateUI();

    setTimeout(() => {
      oldSlide.classList.remove('active');
      oldSlide.style.transform = '';
      oldSlide.style.opacity = '';
      transitioning = false;
    }, 400);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function updateUI() {
    const pct = ((current + 1) / slides.length) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
    if (counter) counter.textContent = (current + 1) + ' / ' + slides.length;
    if (prevBtn) prevBtn.classList.toggle('disabled', current === 0);
    if (nextBtn) nextBtn.classList.toggle('disabled', current === slides.length - 1);
    history.replaceState(null, '', '#' + slides[current].id);
    updatePicker();
  }

  // ---- Slide Picker ----
  const picker = document.createElement('div');
  picker.className = 'p-picker';
  slides.forEach((s, i) => {
    const item = document.createElement('div');
    item.className = 'p-picker-item';
    item.innerHTML = `<span class="p-picker-num">${i + 1}</span>${s.title.replace(/&amp;/g, '&')}`;
    item.addEventListener('click', () => { goTo(i); closePicker(); });
    picker.appendChild(item);
  });
  document.body.appendChild(picker);

  function updatePicker() {
    picker.querySelectorAll('.p-picker-item').forEach((el, i) => {
      el.classList.toggle('active', i === current);
    });
  }

  function closePicker() { picker.classList.remove('open'); }
  function togglePicker() { picker.classList.toggle('open'); }

  if (counter) counter.addEventListener('click', (e) => { e.stopPropagation(); togglePicker(); });
  document.addEventListener('click', (e) => {
    if (!picker.contains(e.target) && e.target !== counter) closePicker();
  });

  // ---- Events ----
  document.addEventListener('keydown', (e) => {
    if (overlay?.classList.contains('open')) {
      if (e.key === 'Escape') closeDetail();
      return;
    }
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  });

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  deck.addEventListener('click', (e) => {
    const item = e.target.closest('.p-item[data-detail]');
    if (item) { item.classList.toggle('expanded'); return; }

    const card = e.target.closest('.p-card[data-detail]');
    if (card) {
      openDetail(card.dataset.label || card.querySelector('.p-card-label')?.textContent, card.dataset.detail);
      return;
    }

    const ph = e.target.closest('.p-pricing-section-header');
    if (ph) { ph.closest('.p-pricing-section')?.classList.toggle('expanded'); return; }
  });

  function openDetail(title, body) {
    if (!overlay) return;
    if (detailTitle) detailTitle.textContent = title || '';
    if (detailBody) detailBody.innerHTML = body || '';
    overlay.classList.add('open');
  }

  function closeDetail() {
    if (overlay) overlay.classList.remove('open');
  }

  if (detailClose) detailClose.addEventListener('click', closeDetail);
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDetail();
  });

  let touchStartX = 0;
  deck.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  deck.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx > 0 ? prev() : next();
  }, { passive: true });

  // Hash routing
  const hash = location.hash.replace('#', '');
  if (hash) {
    const idx = slides.findIndex(s => s.id === hash);
    if (idx > 0) {
      deck.querySelector('.p-slide.active')?.classList.remove('active');
      deck.querySelectorAll('.p-slide')[idx]?.classList.add('active');
      current = idx;
    }
  }

  updateUI();
}


// ---- Slide Renderers ----

function renderSlide(s) {
  const inner = (html) => `<div class="p-slide-inner">${html}</div>`;

  // Split layout wraps content into two columns
  if (s.layout === 'split' && s.type === 'content') return inner(renderSplit(s));

  switch (s.type) {
    case 'title':    return inner(renderTitle(s));
    case 'content':  return inner(renderContent(s));
    case 'grid':     return inner(renderGrid(s));
    case 'timeline': return inner(renderTimeline(s));
    case 'pricing':  return inner(renderPricing(s));
    case 'stats':    return inner(renderStats(s));
    default:         return inner(renderContent(s));
  }
}

function renderTitle(s) {
  return `
    ${s.label ? `<div class="p-title-label p-anim">${s.label}</div>` : ''}
    <div class="p-title-main p-anim p-anim-d1">${s.title}</div>
    ${s.subtitle ? `<div class="p-title-sub p-anim p-anim-d2">${s.subtitle}</div>` : ''}
    <div class="p-title-divider p-anim p-anim-d3"></div>
    ${s.meta ? `<div class="p-title-meta p-anim p-anim-d4">${s.meta}</div>` : ''}
  `;
}

function renderContent(s) {
  return `
    <div class="p-slide-title p-anim">${s.title}</div>
    ${s.subtitle ? `<div class="p-slide-subtitle p-anim p-anim-d1">${s.subtitle}</div>` : ''}
    ${s.body ? `<div class="p-slide-body p-anim p-anim-d2">${s.body}</div>` : ''}
    ${s.items ? renderItems(s.items, 2) : ''}
  `;
}

function renderSplit(s) {
  const rightContent = s.visual
    ? `<div class="p-visual p-anim p-anim-right p-anim-d3">${renderVisual(s.visual)}</div>`
    : (s.items ? renderItems(s.items, 0) : '');
  const leftItems = s.visual && s.items ? renderItems(s.items, 2) : (!s.visual ? '' : '');
  return `
    <div class="p-split-left">
      <div class="p-slide-title p-anim p-anim-left">${s.title}</div>
      ${s.subtitle ? `<div class="p-slide-subtitle p-anim p-anim-left p-anim-d1">${s.subtitle}</div>` : ''}
      ${s.body ? `<div class="p-slide-body p-anim p-anim-left p-anim-d2">${s.body}</div>` : ''}
      ${leftItems}
    </div>
    <div class="p-split-right p-anim p-anim-right p-anim-d2">
      ${rightContent}
    </div>
  `;
}

function renderItems(items, delayStart) {
  const d = delayStart || 0;
  return `<div class="p-items">${items.map((it, i) => {
    const dc = Math.min(i + d, 5);
    return `
    <div class="p-item p-anim p-anim-d${dc}"${it.detail ? ' data-detail="1"' : ''}>
      ${it.detail ? '<div class="p-item-icon">+</div>' : ''}
      <div>
        <div class="p-item-label">${it.label}</div>
        ${it.detail ? `<div class="p-item-detail">${it.detail}</div>` : ''}
      </div>
    </div>`;
  }).join('')}</div>`;
}

function renderGrid(s) {
  const tagColors = {
    'Infrastructure': 'blue', 'Staffing': 'amber', 'Governance': 'purple',
    'Risk': 'red', 'Operations': 'blue', 'Strategy': 'accent',
    'Approach': 'accent', 'Delivery': 'blue', 'Quality': 'purple',
    'Sustainability': 'amber', 'Philosophy': 'accent',
    'Cloud Infrastructure': 'blue', 'Cloud': 'blue', 'Asset Management': 'amber',
    'GIS': 'purple', '311 Platform': 'blue', '311 Voice': 'blue',
    'Enterprise AI': 'accent', 'Website Chatbot': 'red', 'Collaboration': 'blue',
    'Engagement': 'amber', 'Communications': 'amber', 'Meetings': 'purple',
    'Budget': 'blue', 'Permitting': 'amber', 'Procurement': 'purple', 'Website CMS': 'blue'
  };
  return `
    <div class="p-slide-title p-anim">${s.title}</div>
    ${s.subtitle ? `<div class="p-slide-subtitle p-anim p-anim-d1">${s.subtitle}</div>` : ''}
    <div class="p-grid">${s.cards.map((c, i) => {
      const dc = Math.min(i % 6, 5);
      const accent = tagColors[c.tag] || 'accent';
      return `
      <div class="p-card p-anim-scale p-anim p-anim-d${dc}" data-accent="${accent}"${c.detail ? ` data-detail="${esc(c.detail)}" data-label="${esc(c.label)}"` : ''}>
        ${c.detail ? '<span class="p-card-icon">+</span>' : ''}
        <div class="p-card-label">${c.label}</div>
        ${c.tag ? `<div class="p-card-tag">${c.tag}</div>` : ''}
      </div>`;
    }).join('')}</div>
  `;
}

function renderTimeline(s) {
  const weeks = Array.from({ length: 8 }, (_, i) => `<div class="p-timeline-week">W${i + 1}</div>`).join('');
  const tracks = s.tracks.map(t => `
    <div class="p-timeline-track">
      <div class="p-timeline-label">${t.label}</div>
      <div class="p-timeline-bar-container">
        <div class="p-timeline-bar" data-color="${t.color}"
             style="grid-column: ${t.start} / ${t.end + 1}">
          W${t.start}${t.start !== t.end ? '-' + t.end : ''}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="p-slide-title p-anim">${s.title}</div>
    ${s.subtitle ? `<div class="p-slide-subtitle p-anim p-anim-d1">${s.subtitle}</div>` : ''}
    <div class="p-timeline p-anim p-anim-d2">
      <div class="p-timeline-header">
        <div></div>
        <div class="p-timeline-weeks">${weeks}</div>
      </div>
      ${tracks}
    </div>
    ${s.items ? renderItems(s.items, 3) : ''}
  `;
}

function renderPricing(s) {
  const sections = s.sections.map((sec, i) => {
    const dc = Math.min(i + 1, 5);
    return `
    <div class="p-pricing-section p-anim p-anim-d${dc}">
      <div class="p-pricing-section-header">
        <div class="p-pricing-section-label">${sec.label}</div>
        <div>
          <span class="p-pricing-section-subtotal">${sec.subtotal}</span>
          <span class="p-pricing-section-chevron">&#9654;</span>
        </div>
      </div>
      <div class="p-pricing-items">
        ${sec.items.map(it => `
          <div class="p-pricing-line">
            <span>${it.label}</span>
            <span class="p-pricing-line-price">${it.price}</span>
          </div>
        `).join('')}
      </div>
    </div>`;
  }).join('');

  return `
    <div class="p-slide-title p-anim">${s.title}</div>
    ${s.subtitle ? `<div class="p-slide-subtitle p-anim p-anim-d1">${s.subtitle}</div>` : ''}
    <div class="p-pricing">${sections}
      <div class="p-pricing-total p-anim p-anim-d4">
        <div class="p-pricing-total-label">Engagement Total</div>
        <div class="p-pricing-total-amount">${s.total}</div>
      </div>
    </div>
    ${s.items ? renderItems(s.items, 4) : ''}
  `;
}

function renderStats(s) {
  const chartHtml = s.chart ? renderChart(s.chart) : '';
  return `
    <div class="p-slide-title p-anim">${s.title}</div>
    ${s.subtitle ? `<div class="p-slide-subtitle p-anim p-anim-d1">${s.subtitle}</div>` : ''}
    <div class="p-stats">${s.stats.map((st, i) => `
      <div class="p-stat p-anim-scale p-anim p-anim-d${Math.min(i + 1, 5)}">
        <div class="p-stat-value">${st.value}</div>
        <div class="p-stat-label">${st.label}</div>
      </div>
    `).join('')}</div>
    ${chartHtml}
    ${s.body ? `<div class="p-slide-body p-anim p-anim-d3">${s.body}</div>` : ''}
    ${s.items ? renderItems(s.items, 3) : ''}
  `;
}

function renderChart(chart) {
  if (chart.type === 'bar') return renderBarChart(chart);
  return '';
}

function renderBarChart(chart) {
  const max = Math.max(...chart.items.map(i => i.value));
  const bars = chart.items.map((item, i) => {
    const pct = (item.value / max) * 100;
    const dc = Math.min(i + 2, 5);
    return `
      <div class="p-bar-row p-anim p-anim-d${dc}">
        <div class="p-bar-label">${item.label}</div>
        <div class="p-bar-track">
          <div class="p-bar-fill" data-color="${item.color}" style="width: ${pct}%"></div>
        </div>
        <div class="p-bar-value">${item.value}${chart.unit ? ' ' + chart.unit : ''}</div>
      </div>`;
  }).join('');

  return `
    <div class="p-chart p-anim p-anim-d2">
      ${chart.title ? `<div class="p-chart-title">${chart.title}</div>` : ''}
      <div class="p-bar-chart">${bars}</div>
    </div>`;
}

// ---- Visual Renderers ----

function renderVisual(type) {
  const v = {
    'disconnected-systems': vizDisconnectedSystems,
    'ai-adoption-stats': vizAiAdoption,
    'system-silos': vizSystemSilos,
    'workstream-flow': vizWorkstreamFlow,
    'assessment-checklist': vizChecklist,
    'priority-queue': vizPriorityQueue,
    'dashboard-mockup': vizDashboard,
    'governance-doc': vizGovernance,
    'roadmap': vizRoadmap,
  };
  return (v[type] || (() => ''))();
}

function vizDisconnectedSystems() {
  const nodes = [
    { x: 65, y: 35, label: 'Oracle ERP' }, { x: 195, y: 28, label: 'GovAI' }, { x: 320, y: 40, label: 'ArcGIS' },
    { x: 40, y: 105, label: 'Cityworks' }, { x: 185, y: 115, label: 'OneView' }, { x: 330, y: 100, label: 'Copilot' },
    { x: 75, y: 175, label: 'SharePoint' }, { x: 260, y: 180, label: 'Trakit' },
    { x: 160, y: 235, label: 'Zoom 311' }, { x: 310, y: 240, label: 'Sitecore' }
  ];
  const lines = [[0,1],[1,2],[3,4],[6,7],[0,3],[1,4],[2,5],[3,6],[4,7],[7,9],[8,4]];
  const dashes = lines.map(([a,b]) =>
    `<line x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}" class="p-svg-line-faint" stroke-dasharray="4,6"/>`
  ).join('');
  const rects = nodes.map(n =>
    `<rect x="${n.x-40}" y="${n.y-14}" width="80" height="28" rx="6" class="p-svg-node"/>
     <text x="${n.x}" y="${n.y+4}" text-anchor="middle" class="p-svg-label">${n.label}</text>`
  ).join('');
  return `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg">${dashes}${rects}
    <text x="190" y="274" text-anchor="middle" class="p-svg-caption">16 systems · no unified data layer</text></svg>`;
}

function vizAiAdoption() {
  return `<div class="p-viz-stats">
    <div class="p-viz-stat-card"><div class="p-viz-stat-num">200</div><div class="p-viz-stat-label">Active GovAI Users</div></div>
    <div class="p-viz-stat-card"><div class="p-viz-stat-num">4</div><div class="p-viz-stat-label">Knowledge Bases</div></div>
    <div class="p-viz-stat-card"><div class="p-viz-stat-num">16</div><div class="p-viz-stat-label">Systems in Landscape</div></div>
    <div class="p-viz-stat-card"><div class="p-viz-stat-num">3</div><div class="p-viz-stat-label">Depts Using AI</div></div>
    <div class="p-viz-stat-card"><div class="p-viz-stat-num">1K+</div><div class="p-viz-stat-label">Work Orders / Month</div></div>
    <div class="p-viz-stat-card accent"><div class="p-viz-stat-num">0</div><div class="p-viz-stat-label">Governance Framework</div></div>
    <div class="p-viz-stat-card accent"><div class="p-viz-stat-num">0</div><div class="p-viz-stat-label">Data Engineers on Staff</div></div>
    <div class="p-viz-stat-card accent"><div class="p-viz-stat-num">0</div><div class="p-viz-stat-label">Cross-Dept Reporting</div></div>
  </div>`;
}

function vizSystemSilos() {
  const cx = 220, cy = 180;
  const systems = [
    { x: 220, y: 50, label: 'Oracle ERP' },
    { x: 355, y: 100, label: 'Cityworks' },
    { x: 380, y: 195, label: 'ArcGIS' },
    { x: 325, y: 280, label: 'Granicus' },
    { x: 220, y: 310, label: 'GovAI' },
    { x: 110, y: 280, label: 'SharePoint' },
    { x: 55, y: 195, label: 'Trakit' },
    { x: 80, y: 100, label: 'Zoom 311' },
  ];
  const lines = systems.map(s =>
    `<line x1="${s.x}" y1="${s.y}" x2="${cx}" y2="${cy}" class="p-svg-line-faint" stroke-dasharray="6,8"/>`
  ).join('');
  const center = `<circle cx="${cx}" cy="${cy}" r="36" class="p-svg-node"/>
    <circle cx="${cx}" cy="${cy}" r="36" fill="none" stroke="var(--p-red)" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.7"/>
    <text x="${cx}" y="${cy-5}" text-anchor="middle" fill="var(--p-red)" font-size="8" font-weight="700" font-family="Oxanium,sans-serif" opacity="0.9">NO UNIFIED</text>
    <text x="${cx}" y="${cy+7}" text-anchor="middle" fill="var(--p-red)" font-size="8" font-weight="700" font-family="Oxanium,sans-serif" opacity="0.9">DATA LAYER</text>`;
  const nodes = systems.map(s =>
    `<rect x="${s.x-48}" y="${s.y-15}" width="96" height="30" rx="6" class="p-svg-node"/>
     <rect x="${s.x-48}" y="${s.y-15}" width="96" height="30" rx="6" fill="none" stroke="var(--p-accent-border)" stroke-width="1"/>
     <text x="${s.x}" y="${s.y+4}" text-anchor="middle" class="p-svg-label">${s.label}</text>`
  ).join('');
  return `<svg viewBox="0 0 440 360" xmlns="http://www.w3.org/2000/svg">
    ${lines}${center}${nodes}
  </svg>`;
}

function vizWorkstreamFlow() {
  const ws = [
    { label: 'WS1: Assessment', weeks: 'Weeks 1-3', cls: 'accent' },
    { label: 'WS2: Work Order Tool', weeks: 'Weeks 3-6', cls: 'blue' },
    { label: 'WS3: Dashboards', weeks: 'Weeks 4-7', cls: 'amber' },
    { label: 'WS4: Governance', weeks: 'Weeks 5-8', cls: 'accent' }
  ];
  const items = ws.map((w, i) =>
    `<div class="p-viz-flow-item p-viz-flow-${w.cls}">
      <div class="p-viz-flow-num">${String(i+1).padStart(2,'0')}</div>
      <div class="p-viz-flow-content">
        <div class="p-viz-flow-label">${w.label}</div>
        <div class="p-viz-flow-weeks">${w.weeks}</div>
      </div>
    </div>`
  ).join('<div class="p-viz-flow-arrow"></div>');
  return `<div class="p-viz-flow">${items}</div>`;
}

function vizChecklist() {
  const sections = [
    { header: 'Systems & Data', items: ['Systems Inventory', 'Data Flow Mapping', 'API Availability Audit'] },
    { header: 'People & Process', items: ['Stakeholder Interviews (3-4 depts)', 'Data Ownership Mapping', 'Workflow Documentation'] },
    { header: 'AI Readiness', items: ['AI Policy Review', 'GovAI Deployment Audit', 'Knowledge Base Assessment', 'Use Case Prioritization'] }
  ];
  const html = sections.map(s =>
    `<div class="p-viz-check-section">${s.header}</div>` +
    s.items.map(item => `<div class="p-viz-check-row"><div class="p-viz-check-box"></div><span>${item}</span></div>`).join('')
  ).join('');
  return `<div class="p-viz-checklist"><div class="p-viz-checklist-header">Assessment Scope</div>${html}</div>`;
}
function vizPriorityQueue() {
  const rows = [
    { id: 'WO-4819', type: 'Water Main Leak', loc: 'N 35th Ave', sev: 'Critical', color: 'var(--p-red)', pct: 98 },
    { id: 'WO-4821', type: 'Pothole Repair', loc: 'W 10th St', sev: 'High', color: 'var(--p-red)', pct: 85 },
    { id: 'WO-4826', type: 'Sewer Backup', loc: 'E 24th St', sev: 'High', color: 'var(--p-amber)', pct: 78 },
    { id: 'WO-4823', type: 'Sidewalk Crack', loc: 'E 20th St', sev: 'Medium', color: 'var(--p-amber)', pct: 52 },
    { id: 'WO-4818', type: 'Street Light Out', loc: 'S 8th Ave', sev: 'Medium', color: 'var(--p-amber)', pct: 44 },
    { id: 'WO-4827', type: 'Sign Replacement', loc: 'N 11th Ave', sev: 'Low', color: 'var(--p-accent)', pct: 28 },
    { id: 'WO-4825', type: 'Tree Trimming', loc: 'W 16th St', sev: 'Low', color: 'var(--p-accent)', pct: 15 },
  ];
  const trs = rows.map((r, i) =>
    `<div class="p-viz-queue-row">
      <span class="p-viz-queue-rank">${i+1}</span>
      <span class="p-viz-queue-id">${r.id}</span>
      <span class="p-viz-queue-type">${r.type}</span>
      <span class="p-viz-queue-loc">${r.loc}</span>
      <span class="p-viz-queue-sev" style="color:${r.color}">${r.sev}</span>
      <div class="p-viz-queue-bar"><div style="width:${r.pct}%;background:${r.color};height:100%;border-radius:2px;opacity:0.4"></div></div>
    </div>`
  ).join('');
  return `<div class="p-viz-queue">
    <div class="p-viz-queue-header">AI Priority Queue — Live Preview</div>
    <div class="p-viz-queue-subheader"><span>#</span><span>ID</span><span>Type</span><span>Location</span><span>Severity</span><span>Score</span></div>
    ${trs}
    <div class="p-viz-queue-footer">Human-in-the-loop: supervisor reviews and confirms before dispatch</div>
    <div class="p-viz-queue-stats">
      <div class="p-viz-queue-stat"><span class="p-viz-queue-stat-val">127</span><span class="p-viz-queue-stat-lbl">Today's orders</span></div>
      <div class="p-viz-queue-stat"><span class="p-viz-queue-stat-val">18 min</span><span class="p-viz-queue-stat-lbl">Avg triage time</span></div>
      <div class="p-viz-queue-stat"><span class="p-viz-queue-stat-val">94%</span><span class="p-viz-queue-stat-lbl">Auto-prioritized</span></div>
    </div>
    <div class="p-viz-queue-validation">
      <div class="p-viz-queue-val-header">Dual-Layer Validation</div>
      <div class="p-viz-queue-val-row"><span class="p-viz-queue-val-dot ok"></span>Deterministic checks passed</div>
      <div class="p-viz-queue-val-row"><span class="p-viz-queue-val-dot ok"></span>AI coherence validation passed</div>
      <div class="p-viz-queue-val-row"><span class="p-viz-queue-val-dot ok"></span>Source data verified against Cityworks</div>
    </div>
  </div>`;
}

function vizDashboard() {
  return `<div class="p-viz-dash">
    <div class="p-viz-dash-header">Operations Dashboard — Live Preview</div>
    <div class="p-viz-dash-grid">
      <div class="p-viz-dash-card">
        <div class="p-viz-dash-card-label">311 AI Accuracy</div>
        <div class="p-viz-dash-card-value" style="color:var(--p-accent)">94.2%</div>
        <div class="p-viz-dash-card-bar"><div style="width:94%;background:var(--p-accent-dim);border-right:2px solid var(--p-accent);height:100%;border-radius:2px"></div></div>
        <div class="p-viz-dash-card-delta">+2.1% vs last month</div>
      </div>
      <div class="p-viz-dash-card">
        <div class="p-viz-dash-card-label">GovAI KB Health</div>
        <div class="p-viz-dash-card-value" style="color:var(--p-amber)">78.5%</div>
        <div class="p-viz-dash-card-bar"><div style="width:78%;background:var(--p-amber-dim);border-right:2px solid var(--p-amber);height:100%;border-radius:2px"></div></div>
        <div class="p-viz-dash-card-delta" style="color:var(--p-amber)">12 stale entries flagged</div>
      </div>
      <div class="p-viz-dash-card">
        <div class="p-viz-dash-card-label">Work Orders Today</div>
        <div class="p-viz-dash-card-value">127</div>
        <div class="p-viz-dash-card-sub">43 auto-prioritized</div>
      </div>
      <div class="p-viz-dash-card">
        <div class="p-viz-dash-card-label">Avg Triage Time</div>
        <div class="p-viz-dash-card-value" style="color:var(--p-accent)">18 min</div>
        <div class="p-viz-dash-card-sub">was 62 min (before AI)</div>
      </div>
      <div class="p-viz-dash-card">
        <div class="p-viz-dash-card-label">Active GovAI Users</div>
        <div class="p-viz-dash-card-value">200</div>
        <div class="p-viz-dash-card-sub">across 4 knowledge bases</div>
      </div>
      <div class="p-viz-dash-card">
        <div class="p-viz-dash-card-label">Copilot Accuracy</div>
        <div class="p-viz-dash-card-value" style="color:var(--p-red)">71.3%</div>
        <div class="p-viz-dash-card-bar"><div style="width:71%;background:rgba(248,113,113,0.15);border-right:2px solid var(--p-red);height:100%;border-radius:2px"></div></div>
        <div class="p-viz-dash-card-delta" style="color:var(--p-red)">needs attention</div>
      </div>
    </div>
  </div>`;
}

function vizGovernance() {
  const framework = [
    'Source of Truth Definitions', 'Data Update Cadence & Ownership',
    'Accuracy Monitoring Protocols', 'AI Policy Extension'
  ];
  const bizcase = [
    'Current State Summary', 'Phase 1 Measured Results',
    'Future Opportunity Roadmap', 'Investment Narrative'
  ];
  const fRows = framework.map(s => `<div class="p-viz-doc-row"><div class="p-viz-doc-bullet"></div><span>${s}</span></div>`).join('');
  const bRows = bizcase.map(s => `<div class="p-viz-doc-row"><div class="p-viz-doc-bullet biz"></div><span>${s}</span></div>`).join('');
  return `<div class="p-viz-doc">
    <div class="p-viz-doc-header"><div class="p-viz-doc-icon">GOV</div><div><div class="p-viz-doc-title">AI Governance Framework</div><div class="p-viz-doc-sub">Operational standards for AI accuracy</div></div></div>
    <div class="p-viz-doc-body">${fRows}</div>
    <div class="p-viz-doc-divider"></div>
    <div class="p-viz-doc-header" style="margin-top:0.5rem"><div class="p-viz-doc-icon biz">BIZ</div><div><div class="p-viz-doc-title">Executive Business Case</div><div class="p-viz-doc-sub">For City Manager & CIO</div></div></div>
    <div class="p-viz-doc-body">${bRows}</div>
  </div>`;
}

function vizRoadmap() {
  const phases = [
    { label: 'Phase 1 (Current)', desc: 'Assessment + Tools + Governance', status: 'current', items: ['Work order prioritization', '3 operational dashboards', 'Governance framework', 'Executive business case'] },
    { label: 'Phase 2', desc: 'Unified Data Infrastructure', status: 'future', items: ['Azure data layer', 'System API integrations', '311 validation pipeline'] },
    { label: 'Phase 3', desc: 'Expanded AI Deployment', status: 'future', items: ['Field worker data capture', 'Citizen-facing AI rollout', 'Cross-dept AI agents'] },
  ];
  const items = phases.map(p => {
    const subs = p.items.map(i => `<div class="p-viz-road-sub">${i}</div>`).join('');
    return `<div class="p-viz-road-item ${p.status}">
      <div class="p-viz-road-dot"></div>
      <div>
        <div class="p-viz-road-label">${p.label}</div>
        <div class="p-viz-road-desc">${p.desc}</div>
        <div class="p-viz-road-subs">${subs}</div>
      </div>
    </div>`;
  }).join('');
  return `<div class="p-viz-road"><div class="p-viz-road-line"></div>${items}</div>`;
}

function qs(sel) { return document.querySelector(sel); }
function esc(str) { return str.replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
