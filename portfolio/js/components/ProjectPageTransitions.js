import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

function getFrame(root, sectionName) {
  return root.querySelector(`[data-section="${sectionName}"] [data-section-transition-frame]`);
}

function createIncomingTransition(section, frame, config) {
  if (!section || !frame) return null;

  gsap.set(frame, {
    autoAlpha: 1,
    yPercent: config.fromY,
    clipPath: config.fromClip
  });

  return gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: config.start,
      end: config.end,
      scrub: config.scrub,
      invalidateOnRefresh: true
    }
  }).to(frame, {
    yPercent: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    autoAlpha: 1,
    duration: 1
  });
}

function createHeroExitTransition(summarySection, heroFrame, config) {
  if (!summarySection || !heroFrame) return null;

  gsap.set(heroFrame, {
    yPercent: 0,
    autoAlpha: 1,
    scale: 1
  });

  return gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: summarySection,
      start: config.start,
      end: config.end,
      scrub: config.scrub,
      invalidateOnRefresh: true
    }
  }).to(heroFrame, {
    yPercent: config.toY,
    autoAlpha: config.toAlpha,
    scale: config.toScale,
    duration: 1
  });
}

export function initProjectPageTransitions(root) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroFrame = getFrame(root, 'hero');
  const highlightsFrame = getFrame(root, 'highlights');
  const etcFrame = getFrame(root, 'etc');

  if (prefersReducedMotion) {
    gsap.set([heroFrame, highlightsFrame, etcFrame].filter(Boolean), {
      clearProps: 'all'
    });
    return null;
  }

  const media = gsap.matchMedia();

  media.add(
    {
      mobile: '(max-width: 767px)',
      desktop: '(min-width: 768px)'
    },
    (context) => {
      const isMobile = context.conditions.mobile;
      const summarySection = root.querySelector('[data-section="summary"]');
      const highlightsSection = root.querySelector('[data-section="highlights"]');
      const etcSection = root.querySelector('[data-section="etc"]');

      createHeroExitTransition(summarySection, heroFrame, {
        start: isMobile ? 'top bottom-=4%' : 'top bottom-=10%',
        end: isMobile ? 'top 72%' : 'top 68%',
        scrub: isMobile ? 0.65 : 0.85,
        toY: isMobile ? -4 : -8,
        toAlpha: isMobile ? 0.92 : 0.82,
        toScale: isMobile ? 0.998 : 0.99
      });

      createIncomingTransition(highlightsSection, highlightsFrame, {
        start: isMobile ? 'top bottom-=2%' : 'top bottom-=6%',
        end: isMobile ? 'top 78%' : 'top 72%',
        scrub: isMobile ? 0.7 : 0.9,
        fromY: isMobile ? 6 : 9,
        fromClip: isMobile ? 'inset(8% 0% 0% 0%)' : 'inset(12% 0% 0% 0%)'
      });

      createIncomingTransition(etcSection, etcFrame, {
        start: isMobile ? 'top bottom' : 'top bottom-=4%',
        end: isMobile ? 'top 82%' : 'top 76%',
        scrub: isMobile ? 0.65 : 0.85,
        fromY: isMobile ? 4 : 6,
        fromClip: isMobile ? 'inset(5% 0% 0% 0%)' : 'inset(8% 0% 0% 0%)'
      });
    }
  );

  return media;
}
