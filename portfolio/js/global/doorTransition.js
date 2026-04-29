import Swup from "https://cdn.jsdelivr.net/npm/swup@4/+esm";
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

let swup = null;
let historyNavigationDirection = null;

function getPage() {
  return document.body?.dataset.page || '';
}

function getOverlay() {
  return document.querySelector('.door-transition');
}

function getPanel() {
  return document.querySelector('.door-transition__panel');
}

function getOrigin(direction) {
  return direction === 'backward' ? 'left center' : 'right center';
}

function normalizeDirection(direction) {
  if (direction === 'back' || direction === 'backward' || direction === 'backwards') {
    return 'backward';
  }

  if (direction === 'forward' || direction === 'forwards') {
    return 'forward';
  }

  return '';
}

function getDirection(visit) {
  const trigger = visit?.trigger?.el;
  const swupDirection = visit?.history?.direction || visit?.to?.history?.direction;
  const cachedDirection = visit?.meta?.doorDirection;

  if (cachedDirection) {
    return cachedDirection;
  }

  const direction =
    normalizeDirection(trigger?.dataset?.transitionDirection) ||
    normalizeDirection(swupDirection) ||
    historyNavigationDirection ||
    'forward';

  if (visit?.meta) {
    visit.meta.doorDirection = direction;
  }

  if (historyNavigationDirection) {
    historyNavigationDirection = null;
  }

  return direction;
}

function closeDoor(direction = 'forward') {
  const overlay = getOverlay();
  const panel = getPanel();

  if (!overlay || !panel) return Promise.resolve();

  gsap.killTweensOf(panel);

  gsap.set(overlay, {
    autoAlpha: 1,
    pointerEvents: 'auto'
  });

  gsap.set(panel, {
    scaleX: 0,
    transformOrigin: getOrigin(direction)
  });

  return gsap.to(panel, {
    scaleX: 1,
    duration: 0.48,
    ease: 'power3.inOut'
  });
}

function openDoor(direction = 'forward') {
  const overlay = getOverlay();
  const panel = getPanel();

  if (!overlay || !panel) return Promise.resolve();

  gsap.killTweensOf(panel);

  gsap.set(overlay, {
    autoAlpha: 1,
    pointerEvents: 'auto'
  });

  gsap.set(panel, {
    scaleX: 1,
    transformOrigin: getOrigin(direction)
  });

  return gsap.to(panel, {
    scaleX: 0,
    duration: 0.68,
    ease: 'power3.inOut',
    onComplete: () => {
      gsap.set(overlay, {
        autoAlpha: 0,
        pointerEvents: 'none'
      });
    }
  });
}

export function initDoorTransition(onPageView) {
  const overlay = getOverlay();
  const panel = getPanel();

  if (!overlay || !panel) return;

  gsap.set(overlay, {
    autoAlpha: 0,
    pointerEvents: 'none'
  });

  gsap.set(panel, {
    scaleX: 0,
    transformOrigin: 'right center'
  });

  window.addEventListener('popstate', () => {
    historyNavigationDirection = 'backward';
  });

  swup = new Swup({
    containers: ['#main'],
    animationSelector: false,
    animateHistoryBrowsing: true,
    linkSelector: `
      a[href]:not([target="_blank"]):not([download]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="javascript:"])
    `
  });

  swup.hooks.before('content:replace', async (visit) => {
    await closeDoor(getDirection(visit));
  });

  swup.hooks.on('page:view', async (visit) => {
    document.body.dataset.page =
      document.querySelector('#main')?.dataset.page || getPage();

    if (typeof onPageView === 'function') {
      await onPageView();
    }

    await openDoor(getDirection(visit));
  });
}
