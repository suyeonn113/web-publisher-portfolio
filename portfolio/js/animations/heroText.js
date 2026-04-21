import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

export function initHeroText(onIntroComplete) {
  const hero = document.querySelector('.hero');
  const chars = Array.from(document.querySelectorAll('.main-title .char, .main-title .dot'));
  if (!chars.length) {
    if (typeof onIntroComplete === "function") onIntroComplete();
    return;
  }

  const floatWrappers = document.querySelectorAll('.float-wrap');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isTouchPointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  let isPointerInteractive = false;
  let pointerActive = false;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  const scrollHint = document.querySelector('.hero__scroll-hint');
  if (scrollHint) {
    gsap.to(scrollHint, {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "15% top",
        scrub: true,
      },
      y: 20,
      opacity: 0,
      ease: "none",
    });
  }

  chars.forEach((char, index) => {
    char.dataset.scatterIndex = String(index);
  });

  gsap.fromTo(
    chars,
    {
      opacity: 0,
      y: 24,
      scale: 0.92,
      rotate: 2
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.72,
      stagger: 0.04,
      ease: "power3.out",
      onComplete: () => {
        startFloating(floatWrappers, chars);
        initHeroExit(chars);
        isPointerInteractive = !prefersReducedMotion && canHover;

        if (typeof onIntroComplete === "function") {
          onIntroComplete();
        }
      }
    }
  );

  function startFloating(wrappers, targets) {
    if (!wrappers.length) {
      let amp = 0;
      gsap.to({ value: 0 }, {
        value: 1,
        duration: 1,
        ease: "power2.out",
        onUpdate: function () {
          amp = this.targets()[0].value;
        }
      });

      const configs = targets.map((_, index) => ({
        yAmp: gsap.utils.random(1.6, 2.6),
        speed: gsap.utils.random(1.4, 1.85),
        secondarySpeed: gsap.utils.random(2.15, 2.8),
        phase: gsap.utils.random(0, Math.PI * 2),
        secondaryPhase: gsap.utils.random(0, Math.PI * 2)
      }));

      gsap.ticker.add(() => {
        const t = gsap.ticker.time;

        targets.forEach((target, index) => {
          const c = configs[index];
          const primary = Math.sin(t * c.speed + c.phase);
          const secondary = Math.sin(t * c.secondarySpeed + c.secondaryPhase) * 0.35;
          const yFloat = (primary + secondary) * c.yAmp;
          const rect = target.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = pointerX - centerX;
          const deltaY = pointerY - centerY;
          const dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
          const maxDist = 180;
          const proximity = pointerActive ? Math.max(0, 1 - dist / maxDist) : 0;
          const lift = Math.pow(proximity, 1.55);
          const pointerScale = 1 + (lift * 0.16);
          const pointerXShift = deltaX * 0.08 * proximity;
          const pointerYShift = (deltaY * 0.05 * proximity) - (lift * 16);
          const pointerRotate = deltaX * 0.015 * proximity;

          gsap.set(target, {
            x: pointerXShift,
            y: (yFloat * amp) + pointerYShift,
            scale: pointerScale,
            rotation: pointerRotate
          });
        });
      });

      const accentState = { active: false };
      const runAccent = () => {
        if (accentState.active) return;
        accentState.active = true;

        const accentCount = Math.min(3, Math.max(2, Math.round(targets.length / 6)));
        const shuffled = [...targets].sort(() => Math.random() - 0.5);
        const picks = shuffled.slice(0, accentCount);

        gsap.timeline({
          onComplete: () => {
            accentState.active = false;
          }
        })
          .to(picks, {
            y: "-=3.5",
            scale: "+=0.02",
            duration: 0.2,
            stagger: 0.04,
            ease: "power2.out",
            overwrite: false
          })
          .to(picks, {
            y: "+=3.5",
            scale: "-=0.02",
            duration: 0.3,
            stagger: 0.04,
            ease: "power2.inOut",
            overwrite: false
          });
      };

      gsap.delayedCall(1.8, function accentLoop() {
        runAccent();
        gsap.delayedCall(gsap.utils.random(1.25, 2.05), accentLoop);
      });
      return;
    }

    let amp = 0;
    gsap.to({ value: 0 }, {
      value: 1,
      duration: 0.8,
      ease: "power1.out",
      onUpdate: function () {
        amp = this.targets()[0].value;
      }
    });

    const configs = Array.from(wrappers).map(() => ({
      speed: gsap.utils.random(2.0, 3.0),
      phase: gsap.utils.random(0, Math.PI * 2),
      amp: gsap.utils.random(2, 6) * gsap.utils.clamp(0.3, 1, window.innerWidth / 1200)
    }));

    gsap.ticker.add(() => {
      const t = gsap.ticker.time;

      wrappers.forEach((el, i) => {
        const c = configs[i];
        const y = Math.sin(t * c.speed + c.phase) * c.amp * amp;
        gsap.set(el, { y });
      });
    });
  }

  function initHeroExit(targets) {
    if (prefersReducedMotion) {
      gsap.to(targets, {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -28,
        opacity: 0,
        stagger: 0.03
      });
      return;
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.15,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > 0.12 && isPointerInteractive) {
            isPointerInteractive = false;
            resetPointerState();
          }
          if (self.progress <= 0.12 && canHover) {
            isPointerInteractive = true;
          }
        }
      }
    })
      .to(targets, {
        y: (index) => -18 - ((index % 3) * 8),
        x: (index, target) => {
          const itemIndex = Number(target.dataset.scatterIndex || index);
          const center = (targets.length - 1) / 2;
          return (itemIndex - center) * 10;
        },
        rotation: (index) => (index % 2 === 0 ? -1 : 1) * (2.4 + index * 0.35),
        scale: 0.96,
        filter: "blur(1.5px)",
        opacity: 0.55,
        stagger: {
          amount: 0.18,
          from: "center"
        },
        ease: "power1.out"
      }, 0)
      .to(targets, {
        y: "-=20",
        opacity: 0,
        filter: "blur(5px)",
        stagger: {
          amount: 0.2,
          from: "edges"
        },
        ease: "power1.inOut"
      }, 0.42);
  }

  const onMouseMove = (e) => {
    if (!isPointerInteractive) {
      return;
    }
    pointerActive = true;
    pointerX = e.clientX;
    pointerY = e.clientY;
  };

  const resetPointerState = () => {
    pointerActive = false;
  };

  const onMouseLeave = () => {
    if (!isPointerInteractive) return;
    resetPointerState();
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);

  if (hero && isTouchPointer && !prefersReducedMotion) {
    const onTouchMove = (event) => {
      if (!isPointerInteractive) return;

      const touch = event.touches[0];
      if (!touch) return;

      pointerActive = true;
      pointerX = touch.clientX;
      pointerY = touch.clientY;
    };

    const onTouchEnd = () => {
      resetPointerState();
    };

    hero.addEventListener('touchmove', onTouchMove, { passive: true });
    hero.addEventListener('touchend', onTouchEnd, { passive: true });
    hero.addEventListener('touchcancel', onTouchEnd, { passive: true });
  }
}
