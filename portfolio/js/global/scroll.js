import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';
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
