/* ========================================
   Project Section Navigator
   - 현재 인터랙션 구간을 스킵해 다음 섹션으로 이동
======================================== */

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

const SKIP_ITEMS = [
  {
    current: 'summary',
    next: 'key-flows',
    label: 'Skip Key Flows'
  },
  {
    current: 'key-flows',
    next: 'highlights',
    label: 'Skip Highlights'
  },
  {
    current: 'etc',
    next: 'top',
    label: 'Back to Top',
    direction: 'up'
  }
];

function getSection(root, sectionName) {
  return root.querySelector(`[data-section="${sectionName}"]`);
}

function createSkipButton() {
  const button = document.createElement('button');

  button.className = 'project-section-skip';
  button.type = 'button';
  button.hidden = true;

  button.innerHTML = `
    <span class="project-section-skip__label"></span>
    <span class="project-section-skip__arrow" aria-hidden="true">↓</span>
  `;

  document.body.appendChild(button);

  return button;
}

function updateSkipButton(button, item) {
  const label = button.querySelector('.project-section-skip__label');
  const arrow = button.querySelector('.project-section-skip__arrow');

  if (!item) {
    button.hidden = true;
    button.dataset.nextSection = '';
    if (label) label.textContent = '';
    if (arrow) arrow.textContent = '';
    return;
  }

  button.hidden = false;
  button.dataset.nextSection = item.next;
  button.dataset.direction = item.direction || 'down';
  
  const ariaLabel = item.direction === 'up'
    ? '페이지 상단으로 이동'
    : `${item.label} 섹션으로 이동`;

  button.setAttribute('aria-label', ariaLabel);

  if (label) label.textContent = item.label;
  if (arrow) arrow.textContent = item.direction === 'up' ? '↑' : '↓';
}

function focusSection(section) {
  if (!section) return;

  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
}

function scrollToSection(root, sectionName) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (sectionName === 'top') {
    const main = document.getElementById('main');
    const root = document.documentElement;

    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    window.appLenis?.stop?.();

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    window.requestAnimationFrame(() => {
      window.appLenis?.start?.();
      root.style.scrollBehavior = previousScrollBehavior;

      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();

        main?.setAttribute('tabindex', '-1');
        main?.focus({ preventScroll: true });
      });
    });

    return;
  }

  const section = getSection(root, sectionName);
  if (!section) return;

  section.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start'
  });

  window.setTimeout(() => {
    focusSection(section);
  }, prefersReducedMotion ? 0 : 450);
}

function isFlowIslandViewport() {
  return window.matchMedia('(max-width: 767px)').matches;
}

export function initProjectSectionNavigator(root) {
  if (!root) return null;

  if (document.body.dataset.page !== 'project-detail') {
    return null;
  }

  const button = createSkipButton();
  const triggers = [];

  SKIP_ITEMS.forEach((item) => {
    const section = getSection(root, item.current);
    if (!section) return;

    const handleEnter = () => {
      if (isFlowIslandViewport() && item.current === 'key-flows') {
        updateSkipButton(button, null);
        return;
      }
      updateSkipButton(button, item);
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: item.current === 'etc' ? 'top bottom' : 'top center',
      end: item.current === 'etc' ? 'bottom bottom' : 'bottom center',
      onEnter: handleEnter,
      onEnterBack: handleEnter
    });

    triggers.push(trigger);
  });

  const keyFlowsSection = getSection(root, 'key-flows');

  if (keyFlowsSection) {
    triggers.push(
      ScrollTrigger.create({
        trigger: keyFlowsSection,
        start: () => `top bottom-=${96}`,
        end: 'bottom bottom',
        onEnter: () => {
          if (isFlowIslandViewport()) updateSkipButton(button, null);
        },
        onEnterBack: () => {
          if (isFlowIslandViewport()) updateSkipButton(button, null);
        }
      })
    );
  }

  const summarySection = getSection(root, 'summary');

  if (summarySection) {
    triggers.push(
      ScrollTrigger.create({
        trigger: summarySection,
        start: 'top bottom',
        end: 'top center',
        onLeaveBack: () => updateSkipButton(button, null)
      })
    );
  }

  button.addEventListener('click', () => {
    const nextSection = button.dataset.nextSection;
    if (!nextSection) return;

    scrollToSection(root, nextSection);
  });

  return {
    destroy() {
      triggers.forEach((trigger) => trigger.kill());
      button.remove();
    }
  };
}
