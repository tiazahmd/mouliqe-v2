// main.js — single entry point loaded by every page
import { mountNav } from './nav.js';
import { mountReveal } from './reveal.js';
import { injectSchema } from './seo.js';

const boot = () => {
  mountNav();
  mountReveal();
  injectSchema();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
