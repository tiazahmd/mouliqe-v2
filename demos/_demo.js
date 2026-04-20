/* Mouliqe v2 — Outreach Demo Shared Helpers
   Theme toggle (light/dark via localStorage 'mouliqe-theme') + Chart.js defaults. */
(function(){
  // Pre-hydrate is done inline in <head> for flash prevention.
  // Here we wire up the toggle button and Chart.js defaults.

  function cssVar(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

  function setupThemeToggle(){
    var btn = document.getElementById('demoThemeToggle');
    if (!btn) return;
    btn.addEventListener('click', function(){
      var cur = document.documentElement.getAttribute('data-theme') || 'dark';
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('mouliqe-theme', next); } catch(_){}
      if (window.demoRerenderCharts) window.demoRerenderCharts();
    });
  }

  function setupChartDefaults(){
    if (typeof Chart === 'undefined') return;
    Chart.defaults.color        = cssVar('--color-fg-faint') || 'rgba(127,127,127,0.4)';
    Chart.defaults.borderColor  = cssVar('--color-border')   || 'rgba(127,127,127,0.1)';
    Chart.defaults.font.family  = 'Oxanium, sans-serif';
    Chart.defaults.font.size    = 11;
  }

  document.addEventListener('DOMContentLoaded', function(){
    setupThemeToggle();
    setupChartDefaults();
  });

  window.demoCssVar = cssVar;
})();
