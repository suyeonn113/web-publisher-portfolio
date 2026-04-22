import Lenis from 'https://cdn.jsdelivr.net/npm/lenis@1.3.11/+esm';
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

export function initLenis() {
  // Disable Lenis on mobile for better performance
  if (window.innerWidth <= 768) {
    return null;
  }

  const lenis = new Lenis({
    duration: 0.8,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function initScrollStability(lenis) {
  let refreshRaf = 0;

  const runRefresh = () => {
    refreshRaf = 0;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lenis?.resize?.();
        ScrollTrigger.refresh();
      });
    });
  };

  const queueRefresh = () => {
    if (refreshRaf) return;
    refreshRaf = requestAnimationFrame(runRefresh);
  };

  const pendingImages = Array.from(document.images).filter((img) => !img.complete);

  if (pendingImages.length) {
    pendingImages.forEach((img) => {
      img.addEventListener('load', queueRefresh, { once: true });
      img.addEventListener('error', queueRefresh, { once: true });
    });
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(queueRefresh).catch(() => {});
  }

  window.addEventListener('load', queueRefresh, { once: true });
  queueRefresh();
}

export function initHomeScrollAssist(lenis) {
  const hero = document.querySelector('.hero');
  const work = document.querySelector('.home-work');

  if (!lenis || !hero || !work) return;

  let isAutoScrolling = false;
  let hasSnappedToWork = false;
  let lastScrollY = window.scrollY;

  ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom 45%",
    onUpdate: (self) => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      if (isAutoScrolling) return;

      if (isScrollingDown && self.progress > 0.78 && !hasSnappedToWork) {
        isAutoScrolling = true;
        hasSnappedToWork = true;

        lenis.scrollTo(work, {
          offset: - (window.innerHeight - work.clientHeight) / 2,
          duration: 0.82,
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }

      if (self.progress < 0.2) {
        hasSnappedToWork = false;
      }
    }
  });
}
