/* ============================================================
    Home
============================================================ */

    import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
   
document.addEventListener('DOMContentLoaded', () => {
    initHero();
});


function initHero() {
  const tl = gsap.timeline();

  tl.from(".hero__title", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .from(".hero__desc", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.3")

  // 잠깐 보여주고
  .to({}, { duration: 1 })

  // 다시 사라짐
  .to(".hero__title, .hero__desc", {
    y: -20,
    opacity: 0,
    duration: 0.6,
    ease: "power2.in"
  });
}
