import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

export function initCursor() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  if (isTouchDevice || prefersReducedMotion) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor-satellite';
  document.body.appendChild(cursor);

  // Initial State
  gsap.set(cursor, {
    xPercent: 250,
    yPercent: 200,
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 9999
  });

  // Follow Animation
  window.addEventListener("mousemove", e => {    
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  // Hover State
  const targets = document.querySelectorAll('a, button, .char, .float-wrap');
  
  targets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { 
        scale: 1.5, 
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        duration: 0.3 
      });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        duration: 0.3 
      });
    });
  });
}