/* ========================================
   Theme Controller
======================================== */

const THEME_KEY = 'theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

function getSavedTheme() {
  return localStorage.getItem(THEME_KEY);
}

function getPreferredTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? DARK_THEME
    : LIGHT_THEME;
}

function getCurrentTheme() {
  return document.documentElement.dataset.theme || LIGHT_THEME;
}

function renderThemeIcon() {
  if (!window.lucide) return;
  window.lucide.createIcons();
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  updateThemeToggle(theme);
}

function updateThemeToggle(theme) {
  const toggleButton = document.querySelector('.site-header__theme-toggle');
  const icon = toggleButton?.querySelector('[data-lucide]');

  if (!toggleButton || !icon) return;

  const isDark = theme === DARK_THEME;

  toggleButton.setAttribute('aria-pressed', String(isDark));
  toggleButton.setAttribute(
    'aria-label',
    isDark ? '라이트모드 전환' : '다크모드 전환'
  );

  icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  renderThemeIcon();
}

export function initTheme() {
  const savedTheme = getSavedTheme();
  const initialTheme = savedTheme || getPreferredTheme();

  applyTheme(initialTheme);

  const toggleButton = document.querySelector('.site-header__theme-toggle');
  if (!toggleButton) return;
  if (toggleButton.dataset.themeBound === 'true') return;

  toggleButton.dataset.themeBound = 'true';

  toggleButton.addEventListener('click', () => {
    const nextTheme =
      getCurrentTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME;

    applyTheme(nextTheme);
  });
}
