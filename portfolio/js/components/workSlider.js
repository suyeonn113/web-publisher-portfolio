import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { Draggable } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/Draggable.min.js?module";

gsap.registerPlugin(Draggable);

export const initWorkSlider = () => {
  const container = document.querySelector('.work__slider-container');
  const wrapper = document.querySelector('.work__cards-wrapper');
  const cards = gsap.utils.toArray('.work__card');
  const btnPrev = document.querySelector('.is-prev');
  const btnNext = document.querySelector('.is-next');

  if (!container || !wrapper || cards.length === 0) return;

  const spacing = 1 / cards.length;
  let currentProgress = 0;
  let isAnimating = false;

  gsap.set(wrapper, {
    position: "relative"
  });

  gsap.set(cards, {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    willChange: "transform"
  });

  function getWrappedOffset(value) {
    let wrapped = gsap.utils.wrap(-0.5, 0.5, value);
    if (wrapped === -0.5) wrapped = 0.5;
    return wrapped;
  }

  function getSliderMode() {
    const width = window.innerWidth;

    if (width >= 1440) {
      return {
        visibleCount: 5,
        gapRatio: -0.02,
        centerScale: 1,
        sideScale: 0.8,
        farScale: 0.76,
        liftY: -20,
        fadeOut: false,
        dragFactor: 0.00055
      };
    }

    if (width >= 768) {
      return {
        visibleCount: 3,
        gapRatio: -0.01,
        centerScale: 1,
        sideScale: 0.84,
        farScale: 0.78,
        liftY: -12,
        fadeOut: false,
        dragFactor: 0.00065
      };
    }

    return {
      visibleCount: 1,
      gapRatio: -0.1,
      centerScale: 1,
      sideScale: 0.72,
      farScale: 0.64,
      liftY: -6,
      fadeOut: true,
      dragFactor: 0.0009
    };
  }

  function updateA11y(centerIndex) {
    cards.forEach((card, i) => {
      const isCurrent = i === centerIndex;
      const focusable = card.querySelector('a, button');

      card.setAttribute('aria-hidden', isCurrent ? 'false' : 'true');

      if (focusable) {
        focusable.setAttribute('tabindex', isCurrent ? '0' : '-1');
      }

      gsap.set(card, {
        pointerEvents: isCurrent ? 'auto' : 'none'
      });
    });
  }

  function updateSlider(progress) {
    currentProgress = progress;

    const mode = getSliderMode();

    const cardWidth = cards[0].offsetWidth;
    const gap = cardWidth * mode.gapRatio;
    const baseX = cardWidth + gap;

    let closestIndex = 0;
    let closestAbsOffset = Infinity;

    cards.forEach((card, i) => {
      const rawOffset = currentProgress + i * spacing;
      const offset = getWrappedOffset(rawOffset);
      const absOffset = Math.abs(offset);

      if (absOffset < closestAbsOffset) {
        closestAbsOffset = absOffset;
        closestIndex = i;
      }

      const distance = offset / spacing;
      const absDistance = Math.abs(distance);

      const x = distance * baseX;

      const scale =
        absDistance <= 1
          ? gsap.utils.interpolate(mode.centerScale, mode.sideScale, absDistance)
          : gsap.utils.interpolate(
              mode.sideScale,
              mode.farScale,
              Math.min(absDistance - 1, 1)
            );

      const y =
        absDistance < 0.6
          ? gsap.utils.interpolate(mode.liftY, 0, absDistance / 0.6)
          : 0;

      const zIndex = 100 - Math.round(absDistance * 20);

      let opacity = 1;

      if (mode.fadeOut) {
        if (absDistance <= 1) {
          opacity = gsap.utils.interpolate(1, 0.28, absDistance);
        } else {
          opacity = 0;
        }
      }

      gsap.set(card, {
        x,
        y,
        scale,
        force3D: true,
        opacity: opacity < 0.05 ? 0 : opacity,
        rotationY: 0,
        zIndex,
        z: 0.01
      });
    });

    updateA11y(closestIndex);
  }

  function animateTo(targetProgress) {
    if (isAnimating) return;

    isAnimating = true;

    const proxy = { value: currentProgress };

    gsap.to(proxy, {
      value: targetProgress,
      duration: 0.55,
      ease: "power3.out",
      onUpdate() {
        updateSlider(proxy.value);
      },
      onComplete() {
        currentProgress = targetProgress;
        isAnimating = false;
      }
    });
  }

  function getSnappedProgress(progress) {
    return Math.round(progress / spacing) * spacing;
  }

  const moveNext = () => animateTo(getSnappedProgress(currentProgress - spacing));
  const movePrev = () => animateTo(getSnappedProgress(currentProgress + spacing));

  if (btnNext) btnNext.addEventListener('click', moveNext);
  if (btnPrev) btnPrev.addEventListener('click', movePrev);

  Draggable.create(document.createElement("div"), {
    type: "x",
    trigger: container,
    inertia: false,
    onPress() {
      this.startProgress = currentProgress;
      this.dragFactor = getSliderMode().dragFactor;
    },
    onDrag() {
      const dragProgress = this.startProgress + this.x * this.dragFactor;
      updateSlider(dragProgress);
    },
    onDragEnd() {
      const snapped = getSnappedProgress(currentProgress);
      animateTo(snapped);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") moveNext();
    if (e.key === "ArrowLeft") movePrev();
  });

  window.addEventListener('resize', () => {
    updateSlider(currentProgress);
  });

  updateSlider(0);
};