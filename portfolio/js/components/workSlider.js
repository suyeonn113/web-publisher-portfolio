import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { Draggable } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/Draggable.min.js?module";

gsap.registerPlugin(Draggable);

export const initWorkSlider = () => {
  const container = document.querySelector('.work__slider-container');
  const wrapper = document.querySelector('.work__cards-wrapper');
  const cards = gsap.utils.toArray('.work__card');
  const btnPrev = document.querySelector('.is-prev');
  const btnNext = document.querySelector('.is-next');
  
  if (cards.length === 0 || !container || !wrapper) return;

  const spacing = 1 / cards.length; 
  let totalProgress = 0;   
  let currentProgress = 0; 
  
  gsap.set(cards, {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    transformPerspective: 1200,
    transformStyle: "preserve-3d"
  });

  const updateSlider = () => {
    const viewWidth = window.innerWidth;
    
    // [보정 1] 카드가 너무 크지 않도록 반경 재조절
    const xRadius = viewWidth > 1200 ? 400 : viewWidth * 0.35; 
    const zRadius = viewWidth > 1200 ? 250 : 150; 

    cards.forEach((card, i) => {
      const startOffset = i * spacing;
      const p = gsap.utils.wrap(0, 1, startOffset + currentProgress); 
      
      const angle = p * Math.PI * 2;
      const x = Math.cos(angle) * xRadius; 
      const z = Math.sin(angle) * zRadius; 
      const factor = Math.sin(angle); // 1(앞) ~ -1(뒤)

      // [보정 2] 3장이 다 보이도록 autoAlpha와 opacity 수치 대폭 하향
      // factor가 -0.9보다 클 때 보이게 하여, 뒤에 있는 카드도 필터링되지 않게 함
      gsap.set(card, {
        x: x,
        z: z,
        // [보정 3] 너무 커지지 않게 scale 최대치를 0.7~0.8 정도로 제한
        scale: 0.4 + (factor + 1) * 0.18, 
        zIndex: Math.round(factor * 100),
        
        // 시각적 노출 설정
        autoAlpha: factor > -0.95 ? 1 : 0, // 거의 모든 각도에서 보이게 수정
        opacity: factor > -0.7 ? 1 : 0.5,  // 뒤로 가면 반투명해지며 깊이감만 부여
        pointerEvents: factor > 0.4 ? "auto" : "none" 
      });

      // [접근성] 전면 카드 위주로 포커스 유지
      const anchor = card.querySelector('a');
      if (anchor) {
        if (factor > 0.5) { // 기준을 완화하여 옆에 살짝 걸친 카드도 클릭 가능하게 함
          anchor.removeAttribute('tabindex');
          card.setAttribute('aria-hidden', 'false');
        } else {
          anchor.setAttribute('tabindex', '-1');
          card.setAttribute('aria-hidden', 'true');
        }
      }
    });
  };

  gsap.ticker.add(() => {
    currentProgress += (totalProgress - currentProgress) * 0.08;
    updateSlider();
  });

  const moveNext = () => { totalProgress -= spacing; };
  const movePrev = () => { totalProgress += spacing; };

  btnNext.addEventListener('click', moveNext);
  btnPrev.addEventListener('click', movePrev);

  const dragProxy = document.createElement("div");
  Draggable.create(dragProxy, {
    type: "x",
    trigger: container,
    inertia: true,
    onDrag: function() {
      totalProgress += this.deltaX * 0.0006; 
    },
    onThrowUpdate: function() {
      totalProgress += this.deltaX * 0.0006;
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") moveNext();
    if (e.key === "ArrowLeft") movePrev();
  });

  updateSlider();
};