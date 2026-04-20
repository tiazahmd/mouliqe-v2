// boot.js — standard page boot: nav + reveal + seo. Pages with extra modules
// import this first, then call their specific mount fns.
import { mountNav } from '/js/nav.js';
import { mountReveal } from '/js/reveal.js';
import { injectSchema } from '/js/seo.js';

mountNav();
mountReveal();
injectSchema();
