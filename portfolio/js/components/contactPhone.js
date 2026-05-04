export async function initContactPhone() {
  const phone = document.querySelector('[data-contact-phone]');

  if (!phone) return false;
  if (phone.querySelector('.contact-hero__phone-svg')) return true;

  try {
    const response = await fetch('./assets/icons/telephone.svg');

    if (!response.ok) return false;

    const svgText = await response.text();
    const template = document.createElement('template');
    template.innerHTML = svgText.trim();

    const svg = template.content.querySelector('svg');

    if (!svg) return false;

    svg.classList.add('contact-hero__phone-svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    phone.prepend(svg);
    phone.classList.add('is-inline-ready');

    return true;
  } catch {
    return false;
  }
}
