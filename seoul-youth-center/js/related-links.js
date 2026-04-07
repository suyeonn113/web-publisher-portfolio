document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('related-links__toggle');
  const panel = document.getElementById('related-links__list');

  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    btn.setAttribute('aria-expanded', String(!isOpen));
    panel.hidden = isOpen;
  });
});