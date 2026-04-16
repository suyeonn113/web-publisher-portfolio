import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

export function initScrollDownMotion() {
  const scrollText = document.querySelector(".scroll-down");
  const scrollIcon = document.querySelector(".scroll-down__icon");

  if (scrollText) {
    gsap.to(scrollText, {
      y: 6,
      opacity: 0.55,
      duration: 1.4,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }

  if (scrollIcon) {
    gsap.to(scrollIcon, {
      y: 8,
      duration: 1.2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }
}