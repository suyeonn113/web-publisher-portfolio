import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

export function initScrollDownMotion() {
  const hint = document.querySelector(".hero__scroll-hint");
  const scrollText = document.querySelector(".scroll-down__text");
  const scrollIcon = document.querySelector(".scroll-down__icon");

  if (!hint || !scrollText || !scrollIcon) return;

  const tl = gsap.timeline({
    repeat: -1,
    defaults: {
      duration: 1.2,
      ease: "sine.inOut"
    }
  });

  tl.to(scrollText, { opacity: 0.62 }, 0)
    .to(scrollIcon, { y: 6 }, 0)
    .to(scrollText, { opacity: 1 }, 1.2)
    .to(scrollIcon, { y: 0 }, 1.2);
}
