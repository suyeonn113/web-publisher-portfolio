import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

export function initLenis() {
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
  const work = document.querySelector('.work');

  if (!lenis || !hero || !work) return;

  let isAutoScrolling = false;
  let hasSnappedToWork = false;
  let lastScrollY = window.scrollY;

  ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom 35%",
    onUpdate: (self) => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      if (isAutoScrolling) return;

      if (isScrollingDown && self.progress > 0.72 && !hasSnappedToWork) {
        isAutoScrolling = true;
        hasSnappedToWork = true;

        lenis.scrollTo(work, {
          offset: 0,
          duration: 1.1,
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