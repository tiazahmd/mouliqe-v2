// seo.js — inject JSON-LD schema based on current path
const ORG = {
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
};

const PAGE_SCHEMAS = {
  '/': [{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mouliqe",
    "url": "https://mouliqe.com",
    "description": "AI consulting and data architecture for businesses navigating AI transformation."
  }],
  '/about': [{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Imtiaz Ahmed",
    "jobTitle": "AI Solutions Architect & Data Consultant",
    "url": "https://mouliqe.com/about",
    "worksFor": { "@type": "Organization", "name": "Mouliqe", "url": "https://mouliqe.com" },
    "knowsAbout": ["AI Architecture", "Data Engineering", "Business Intelligence", "Multi-Agent Systems", "Production AI Systems"]
  }],
  '/services': [{
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Solutions & Architecture",
    "provider": { "@type": "ProfessionalService", "name": "Mouliqe", "url": "https://mouliqe.com" },
    "description": "Custom AI application development, intelligent process automation, AI architecture design and review, model integration and orchestration.",
    "areaServed": "Worldwide"
  }],
  '/contact': [{
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": "https://mouliqe.com/contact",
    "name": "Book a Discovery Call — Mouliqe",
    "description": "Schedule a free 30-minute Discovery call to discuss AI and data architecture for your business."
  }]
};

export function injectSchema() {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  const key = p === '' ? '/' : p.replace(/\.html$/, '');
  const schemas = [ORG, ...(PAGE_SCHEMAS[key] || [])];
  schemas.forEach(s => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(s);
    document.head.appendChild(script);
  });
}
