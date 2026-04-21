import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { Draggable } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/Draggable.min.js?module";

gsap.registerPlugin(Draggable);

export function getSliderMode(width = window.innerWidth) {
  if (width >= 1440) {
    return {
      visibleCount: 5,
      gapRatio: -0.02,
      centerScale: 1,
      sideScale: 0.8,
      farScale: 0.76,
      liftY: -20,
      fadeOut: false,
      dragFactor: 0.00045,
      dragPreviewFactor: 1,
      isMobile: false
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
      dragFactor: 0.00038,
      dragPreviewFactor: 0.85,
      isMobile: false
    };
  }

  return {
    visibleCount: 1,
    gapRatio: -0.04,
    centerScale: 1,
    sideScale: 0.82,
    farScale: 0.64,
    liftY: -6,
    fadeOut: false,
    dragFactor: 0.00012,
    dragPreviewFactor: 0.2,
    isMobile: true
  };
}

export function getWorkCardLayout(cards, progress = 0, width = window.innerWidth) {
  if (!cards.length) return [];

  const spacing = 1 / cards.length;
  const wrapProgress = gsap.utils.wrap(-0.5, 0.5);
  const mode = getSliderMode(width);
  const cardWidth = cards[0].offsetWidth;
  const baseX = cardWidth + (cardWidth * mode.gapRatio);
  const normalizedProgress = wrapProgress(progress);

  return cards.map((card, i) => {
    const offset = wrapProgress(normalizedProgress + i * spacing);
    const dist = offset / spacing;
    const absDist = Math.abs(dist);

    const scale = absDist <= 1
      ? gsap.utils.interpolate(mode.centerScale, mode.sideScale, absDist)
      : gsap.utils.interpolate(mode.sideScale, mode.farScale, Math.min(absDist - 1, 1));

    const y = absDist < 0.6 ? gsap.utils.interpolate(mode.liftY, 0, absDist / 0.6) : 0;
    let opacity = mode.fadeOut ? (absDist <= 1 ? gsap.utils.interpolate(1, 0.28, absDist) : 0) : 1;

    if (mode.isMobile) {
      opacity = gsap.utils.interpolate(1, 0.3, Math.min(absDist, 1));
    }

    return {
      el: card,
      x: dist * baseX,
      y,
      scale,
      opacity: opacity < 0.05 ? 0 : opacity,
      zIndex: 100 - Math.round(absDist * 20),
      distance: dist,
      absDistance: absDist
    };
  });
}

export const initWorkSlider = () => {
  const container = document.querySelector('.work__slider-container');
  const wrapper = document.querySelector('.work__cards-wrapper');
  const cards = gsap.utils.toArray('.work__card');
  const [btnPrev, btnNext] = [document.querySelector('.is-prev'), document.querySelector('.is-next')];

  if (!container || !wrapper || !cards.length) return;

  const spacing = 1 / cards.length;
  let currentProgress = 0;
  let isAnimating = false;
  let resizeRaf = 0;
  let lastViewportWidth = window.innerWidth;
  let lastViewportHeight = window.innerHeight;
  const wrapProgress = gsap.utils.wrap(-0.5, 0.5);

  gsap.set(wrapper, { position: "relative" });
  gsap.set(cards, {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    willChange: "transform"
  });

  const isTouchLikeDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const clearTouchHover = (exceptCard = null) => {
    cards.forEach((card) => {
      if (card !== exceptCard) {
        card.classList.remove('is-touch-hover');
      }
    });
  };

  function updateA11y(centerIndex) {
    cards.forEach((card, i) => {
      const isCurrent = i === centerIndex;
      const interactive = card.querySelectorAll('a, button');

      card.setAttribute('aria-hidden', !isCurrent);
      interactive.forEach((el) => el.setAttribute('tabindex', isCurrent ? '0' : '-1'));
      gsap.set(card, { pointerEvents: isCurrent ? 'auto' : 'none' });
      if (!isCurrent) {
        card.classList.remove('is-touch-hover');
      }
    });
  }

  function updateSlider(progress) {
    currentProgress = wrapProgress(progress);
    const layout = getWorkCardLayout(cards, currentProgress);

    let closestIndex = 0;
    let minAbs = Infinity;

    layout.forEach((item, i) => {
      if (item.absDistance < minAbs) {
        minAbs = item.absDistance;
        closestIndex = i;
      }

      gsap.set(item.el, {
        x: item.x,
        y: item.y,
        scale: item.scale,
        opacity: item.opacity,
        zIndex: item.zIndex,
        force3D: false
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
      onUpdate: function () {
        updateSlider(this.targets()[0].v);
      },
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

  window.updateWorkSlider = updateSlider;

  if (isTouchLikeDevice) {
    cards.forEach((card) => {
      const touchState = {
        timer: null,
        startX: 0,
        startY: 0
      };

      const clearHoldTimer = () => {
        if (touchState.timer) {
          clearTimeout(touchState.timer);
          touchState.timer = null;
        }
      };

      const clearHoldState = () => {
        clearHoldTimer();
        card.classList.remove('is-touch-hover');
      };

      card.addEventListener('touchstart', (event) => {
        if (card.getAttribute('aria-hidden') === 'true') return;

        const touch = event.touches[0];
        if (!touch) return;

        clearTouchHover(card);
        clearHoldState();
        touchState.startX = touch.clientX;
        touchState.startY = touch.clientY;

        touchState.timer = setTimeout(() => {
          card.classList.add('is-touch-hover');
        }, 380);
      }, { passive: true });

      card.addEventListener('touchmove', (event) => {
        const touch = event.touches[0];
        if (!touch) return;

        const movedX = touch.clientX - touchState.startX;
        const movedY = touch.clientY - touchState.startY;

        if (Math.hypot(movedX, movedY) > 12) {
          clearHoldState();
        }
      }, { passive: true });

      card.addEventListener('touchend', clearHoldState, { passive: true });
      card.addEventListener('touchcancel', clearHoldState, { passive: true });
    });
  }

  Draggable.create(document.createElement("div"), {
    trigger: container,
    type: "x",
    minimumMovement: 6,

    onPress(e) {
      this.startP = currentProgress;
      this.dragOriginX = this.x || 0;
      clearTouchHover();

      const mode = getSliderMode();
      this.f = mode.dragFactor;
      this.previewF = mode.dragPreviewFactor;
      this.isHorizontalDrag = false;

      const rect = container.getBoundingClientRect();
      const hitRatio = window.innerWidth < 768 ? 0.7 : 0.75;
      const hitWidth = rect.width * hitRatio;
      const hitLeft = rect.left + ((rect.width - hitWidth) / 2);
      const hitRight = hitLeft + hitWidth;
      const pointerX = e?.clientX ?? this.pointerX;

      this.canDrag = pointerX >= hitLeft && pointerX <= hitRight;
    },

    onDrag() {
      if (!this.canDrag) return;

      const dragDeltaX = this.x - this.dragOriginX;

      if (!this.isHorizontalDrag) {
        if (Math.abs(dragDeltaX) < 12) return;
        this.isHorizontalDrag = true;
      }

      updateSlider(this.startP + dragDeltaX * this.f * this.previewF);
    },

    onDragEnd() {
      const movedX = (this.x || 0) - (this.dragOriginX || 0);
      gsap.set(this.target, { x: 0 });
      this.update();

      if (!this.canDrag || !this.isHorizontalDrag) return;

      const threshold = window.innerWidth < 768 ? 75 : 60;
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

  const onResize = () => {
    if (resizeRaf) {
      cancelAnimationFrame(resizeRaf);
    }

    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;

      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const widthChanged = Math.abs(nextWidth - lastViewportWidth) > 1;
      const heightChanged = Math.abs(nextHeight - lastViewportHeight) > 1;
      const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

      // Ignore Mobile Safari-style toolbar resize noise when width stays the same.
      if (isCoarsePointer && !widthChanged && heightChanged) {
        lastViewportHeight = nextHeight;
        return;
      }

      lastViewportWidth = nextWidth;
      lastViewportHeight = nextHeight;
      updateSlider(currentProgress);
    });
  };

  window.addEventListener('keydown', onKey);
  window.addEventListener('resize', onResize);

  updateSlider(0);
};
