import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

export function initHeroText(onIntroComplete) {
  const scrollHint = document.querySelector('.hero__scroll-hint');

  if (scrollHint) {
    gsap.to(scrollHint, {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "15% top",
        scrub: true,
      },
      y: 20,
      opacity: 0,
      ease: "none",
    });
  }

  if (typeof onIntroComplete === "function") {
    onIntroComplete();
  }
}