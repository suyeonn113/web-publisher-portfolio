
/* ========================================
   Main
======================================== */

import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/+esm';
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
});

function initLenis() {
    const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    initDirectionHeader();
    ScrollTrigger.refresh();
}

function initDirectionHeader() {
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
            if (self.scroll < 10) {
                gsap.set(header, { yPercent: 0 });
                return;
            }

            if (self.direction === -1) {
                showAnim.reverse();
            } else {
                showAnim.play();
            }
        },
    });
}