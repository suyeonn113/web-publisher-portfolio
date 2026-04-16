import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

export function initDirectionHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const showAnim = gsap.to(header, {
    yPercent: -100,
    paused: true,
    duration: 0.25,
    ease: 'power2.out',
  });

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      if (self.scroll() < 10) {
        gsap.set(header, { yPercent: 0 });
        return;
      }
    self.direction === -1 ? showAnim.reverse() : showAnim.play();
    },  
  });
}