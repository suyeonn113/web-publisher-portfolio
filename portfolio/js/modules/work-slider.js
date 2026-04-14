import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

export function initWorkSlider() {
  const slider = document.querySelector('.work__cards-wrapper');
  const cards = gsap.utils.toArray('.work__card');

  if (!slider || cards.length === 0) return;

  // 1. 무한 루프를 위해 카드 복제 (컨텐츠가 충분히 길어지도록)
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    slider.appendChild(clone);
  });

  // 2. 전체 너비 계산
  const totalWidth = slider.scrollWidth / 2;

  // 3. GSAP 애니메이션 설정
  const loop = gsap.to(slider, {
    x: `-=${totalWidth}`,
    duration: 30, // 숫자가 클수록 느려짐
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(val => parseFloat(val) % totalWidth)
    }
  });

  // 4. 마우스 호버 인터랙션 (매끄러운 감속/가속)
  slider.addEventListener("mouseenter", () => {
    gsap.to(loop, { timeScale: 0.2, duration: 0.5 });
  });

  slider.addEventListener("mouseleave", () => {
    gsap.to(loop, { timeScale: 1, duration: 0.5 });
  });
}