export function initInteractiveTone() {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!canHover) return;

  const selectors = [
    '.site-header__link',
    '.site-footer a',
    '.btn',
    '.btn-more',
    '.fixed-menu__btn',
    '.scroll-down'
  ];

  document.querySelectorAll(selectors.join(', ')).forEach((element) => {
    element.setAttribute('data-hover-tone', 'accent');
  });
}
