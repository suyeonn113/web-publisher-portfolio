import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { Draggable } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/Draggable.min.js?module";

gsap.registerPlugin(Draggable);

export const initWorkSlider = () => {
  const container = document.querySelector('.work__slider-container');
  const wrapper = document.querySelector('.work__cards-wrapper');
  const cards = gsap.utils.toArray('.work__card');
  const [btnPrev, btnNext] = [document.querySelector('.is-prev'), document.querySelector('.is-next')];

  if (!container || !wrapper || !cards.length) return;

  const spacing = 1 / cards.length;
  let currentProgress = 0;
  let isAnimating = false;

  // 초기 셋팅
  gsap.set(wrapper, { position: "relative" });
  gsap.set(cards, {
    position: "absolute", top: "50%", left: "50%",
    xPercent: -50, yPercent: -50, willChange: "transform"
  });

  const wrapProgress = gsap.utils.wrap(-0.5, 0.5);

  function getSliderMode() {
    const w = window.innerWidth;
    // 질문자님의 원본 데이터 그대로 유지
    if (w >= 1440) return { visibleCount: 5, gapRatio: -0.02, centerScale: 1, sideScale: 0.8, farScale: 0.76, liftY: -20, fadeOut: false, dragFactor: 0.00045, dragPreviewFactor: 1, isMobile: false };
    if (w >= 768) return { visibleCount: 3, gapRatio: -0.01, centerScale: 1, sideScale: 0.84, farScale: 0.78, liftY: -12, fadeOut: false, dragFactor: 0.00038, dragPreviewFactor: 0.85, isMobile: false };
    return { visibleCount: 1, gapRatio: -0.04, centerScale: 1, sideScale: 0.82, farScale: 0.64, liftY: -6, fadeOut: false, dragFactor: 0.00018, dragPreviewFactor: 0.35, isMobile: true };
  }

  function updateA11y(centerIndex) {
    cards.forEach((card, i) => {
      const isCurrent = i === centerIndex;
      const interactive = card.querySelectorAll('a, button');
      card.setAttribute('aria-hidden', !isCurrent);
      interactive.forEach(el => el.setAttribute('tabindex', isCurrent ? '0' : '-1'));
      gsap.set(card, { pointerEvents: isCurrent ? 'auto' : 'none' });
    });
  }

  function updateSlider(progress) {
    currentProgress = wrapProgress(progress);
    const mode = getSliderMode();
    const cardWidth = cards[0].offsetWidth;
    const baseX = cardWidth + (cardWidth * mode.gapRatio);

    let closestIndex = 0;
    let minAbs = Infinity;

    cards.forEach((card, i) => {
      const offset = wrapProgress(currentProgress + i * spacing);
      const absOffset = Math.abs(offset);
      if (absOffset < minAbs) { minAbs = absOffset; closestIndex = i; }

      const dist = offset / spacing;
      const absDist = Math.abs(dist);

      // [모양 보존] 원본 보간 로직 100% 동일
      const scale = absDist <= 1
        ? gsap.utils.interpolate(mode.centerScale, mode.sideScale, absDist)
        : gsap.utils.interpolate(mode.sideScale, mode.farScale, Math.min(absDist - 1, 1));

      const y = absDist < 0.6 ? gsap.utils.interpolate(mode.liftY, 0, absDist / 0.6) : 0;

      // [오퍼시티 핵심 수정] 
      // 기본은 원본 유지하되, 모바일 버전일 때만 강제로 오퍼시티 보정 적용
      let opacity = mode.fadeOut ? (absDist <= 1 ? gsap.utils.interpolate(1, 0.28, absDist) : 0) : 1;
      
      if (mode.isMobile) {
        // 모바일일 때: 중앙에서 벗어나면 즉시 0.3으로 흐려지게 (원본 모양은 유지됨)
        opacity = gsap.utils.interpolate(1, 0.3, Math.min(absDist, 1));
      }

      gsap.set(card, {
        x: dist * baseX,
        y,
        scale,
        opacity: opacity < 0.05 ? 0 : opacity,
        zIndex: 100 - Math.round(absDist * 20),
        force3D: true
      });
    });

    updateA11y(closestIndex);
  }

  function animateTo(target) {
    if (isAnimating) return;
    isAnimating = true;
    gsap.to({ v: currentProgress }, {
      v: target,
      duration: 0.42,
      ease: "power2.out",
      onUpdate: function() { updateSlider(this.targets()[0].v); },
      onComplete: () => {
        currentProgress = wrapProgress(target);
        isAnimating = false;
      }
    });
  }

  const getSnappedProgress = () => Math.round(currentProgress / spacing) * spacing;

  const moveNext = () => animateTo(getSnappedProgress() - spacing);
  const movePrev = () => animateTo(getSnappedProgress() + spacing);

  btnNext?.addEventListener('click', moveNext);
  btnPrev?.addEventListener('click', movePrev);

  Draggable.create(document.createElement("div"), {
    trigger: container,
    type: "x",
    minimumMovement: 10,

    onPress() { 
      this.startP = currentProgress; 
      const mode = getSliderMode();
      this.f = mode.dragFactor;
      this.previewF = mode.dragPreviewFactor;
    },
    onDrag() { 
      updateSlider(this.startP + this.x * this.f * this.previewF); 
    },
    onDragEnd() {
      const movedX = this.x;
      const threshold = window.innerWidth < 768 ? 40 : 60;
      const base = getSnappedProgress();

      if (movedX <= -threshold) {
        animateTo(base - spacing);
      } else if (movedX >= threshold) {
        animateTo(base + spacing);
      } else {
        animateTo(base);
      }
    }
  });

  const onKey = (e) => {
    if (e.key === "ArrowRight") moveNext();
    if (e.key === "ArrowLeft") movePrev();
  };
  window.addEventListener('keydown', onKey);
  window.addEventListener('resize', () => updateSlider(currentProgress));
  
  updateSlider(0);
};