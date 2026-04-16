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

  // 초기 설정
  const spacing = 1 / cards.length; 
  let totalProgress = 0;   // 목표 위치
  let currentProgress = 0; // 부드러운 이동을 위한 현재 위치 값
  
  // 1. 카드를 중앙으로 모으고 3D 환경 설정
  gsap.set(cards, {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    transformPerspective: 1200,
    transformStyle: "preserve-3d"
  });

  /**
   * 실시간 위치 및 크기 갱신 함수
   */
  const updateSlider = () => {
    const viewWidth = window.innerWidth;
    
    // [크기 최적화] 화면 너비에 따라 회전 반경 조절
    // xRadius가 너무 크면 카드가 양옆으로 너무 벌어집니다.
    const xRadius = viewWidth > 1200 ? 450 : viewWidth * 0.35; 
    // zRadius가 너무 크면 카드가 눈앞으로 너무 튀어나옵니다.
    const zRadius = viewWidth > 1200 ? 300 : 200; 

    cards.forEach((card, i) => {
      const startOffset = i * spacing;
      const p = gsap.utils.wrap(0, 1, startOffset + currentProgress); 
      
      const angle = p * Math.PI * 2;
      const x = Math.cos(angle) * xRadius; 
      const z = Math.sin(angle) * zRadius; 
      const factor = Math.sin(angle); // 1(앞) ~ -1(뒤)

      // [크기 최적화] scale 범위를 0.4(뒤) ~ 0.8(앞)로 설정하여 부담을 줄임
      gsap.set(card, {
        x: x,
        z: z,
        scale: 0.4 + (factor + 1) * 0.2, 
        zIndex: Math.round(factor * 100),
        
        // [접근성] 뒤로 넘어간 카드는 투명하게 및 상호작용 차단
        autoAlpha: factor > -0.5 ? 1 : 0, 
        pointerEvents: factor > 0.6 ? "auto" : "none" 
      });

      // [접근성] 전면 카드만 탭 키 포커스 및 스크린 리더 허용
      const anchor = card.querySelector('a');
      if (anchor) {
        if (factor > 0.8) {
          anchor.removeAttribute('tabindex');
          card.setAttribute('aria-hidden', 'false');
        } else {
          anchor.setAttribute('tabindex', '-1');
          card.setAttribute('aria-hidden', 'true');
        }
      }
    });
  };

  // 2. 매 프레임마다 화면을 다시 그려주는 루프
  // 이게 있어야 totalProgress 변화가 화면에 반영됩니다.
  gsap.ticker.add(() => {
    currentProgress += (totalProgress - currentProgress) * 0.08;
    updateSlider();
  });

  // 3. 네비게이션 버튼 이벤트
  const moveNext = () => { totalProgress -= spacing; };
  const movePrev = () => { totalProgress += spacing; };

  btnNext.addEventListener('click', moveNext);
  btnPrev.addEventListener('click', movePrev);

  // 4. 드래그 인터랙션
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

  // 5. [접근성] 키보드 제어 추가
  window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") moveNext();
    if (e.key === "ArrowLeft") movePrev();
  });

  // 초기 렌더링
  updateSlider();
};