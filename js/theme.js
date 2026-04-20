// theme.js — light/dark theme toggle with localStorage persistence
// Runs early (before DOM paint) to avoid flash of wrong theme.

const STORAGE_KEY = 'mouliqe-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
}

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (_) {}
  return 'dark';  // default: dark
}

// Apply immediately (inline-script pattern still works as module too)
applyTheme(getInitialTheme());

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

export function mountThemeToggle(el) {
  if (!el) return;
  el.addEventListener('click', toggleTheme);
}
