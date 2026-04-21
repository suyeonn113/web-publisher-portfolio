import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

export function initHeroText(onIntroComplete) {
  const chars = Array.from(document.querySelectorAll('.main-title .char, .main-title .dot'));
  if (!chars.length) {
    if (typeof onIntroComplete === "function") onIntroComplete();
    return;
  }

  const floatWrappers = document.querySelectorAll('.float-wrap');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let isPointerInteractive = false;
  let scatterProgress = 0;

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
        initScatter(chars);
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
        scaleAmp: gsap.utils.random(0.008, 0.018),
        speed: gsap.utils.random(1.4, 1.85),
        secondarySpeed: gsap.utils.random(2.15, 2.8),
        phase: gsap.utils.random(0, Math.PI * 2),
        secondaryPhase: gsap.utils.random(0, Math.PI * 2)
      }));

      gsap.ticker.add(() => {
        const t = gsap.ticker.time;
        const floatStrength = gsap.utils.clamp(0, 1, 1 - (scatterProgress / 0.14));

        targets.forEach((target, index) => {
          const c = configs[index];
          const primary = Math.sin(t * c.speed + c.phase);
          const secondary = Math.sin(t * c.secondarySpeed + c.secondaryPhase) * 0.35;
          const yFloat = (primary + secondary) * c.yAmp;
          const scaleFloat = 1 + ((((primary * 0.55) + secondary) * c.scaleAmp) * floatStrength);

          gsap.set(target, {
            yPercent: yFloat * amp * floatStrength,
            scale: scaleFloat
          });
        });
      });

      const accentState = { active: false };
      const runAccent = () => {
        if (accentState.active || scatterProgress > 0.08) return;
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
            yPercent: "-=3.5",
            scale: 1.035,
            duration: 0.2,
            stagger: 0.04,
            ease: "power2.out",
            overwrite: false
          })
          .to(picks, {
            yPercent: "+=3.5",
            scale: 1,
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

  function initScatter(targets) {
    if (prefersReducedMotion) {
      gsap.to(targets, {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -30,
        opacity: 0,
        stagger: 0.05
      });
      return;
    }

    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=160vh",
          scrub: 1.45,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scatterProgress = self.progress;

          if (self.progress > 0.08 && isPointerInteractive) {
            isPointerInteractive = false;
            resetPointerState();
          }
        }
      }
    });

    tl.to(targets, {
      x: (index, target) => {
        const itemIndex = Number(target.dataset.scatterIndex || index);
        const center = (targets.length - 1) / 2;
        return (itemIndex - center) * Math.min(window.innerWidth * 0.09, 72);
      },
      y: (index) => -(window.innerHeight * 0.18) - (index % 3) * 18,
      rotation: (index) => (index % 2 === 0 ? -1 : 1) * (8 + index * 1.5),
      scale: 0.78,
      filter: "blur(1.5px)",
      force3D: true,
      stagger: {
        amount: 0.28,
        from: "center"
      },
      ease: "power2.out",
    }, 0.16);

    tl.to(targets, {
      opacity: 0,
      y: "-=36",
      immediateRender: false,
      stagger: {
        amount: 0.24,
        from: "end"
      },
      ease: "power1.in"
    }, 0.62);
  }

  const onMouseMove = (e) => {
    if (!isPointerInteractive || scatterProgress > 0.08) {
      return;
    }

    const { clientX: mouseX, clientY: mouseY } = e;

    chars.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
      const maxDist = 180;
      const proximity = Math.max(0, 1 - dist / maxDist);
      const magnify = Math.pow(proximity, 1.6);

      gsap.to(item, {
        scale: 1 + magnify * 0.54,
        y: (magnify * -28) + (deltaY * 0.09 * proximity),
        x: deltaX * 0.15 * proximity,
        rotation: deltaX * 0.028 * proximity,
        duration: 0.26,
        ease: "power3.out",
        overwrite: "auto"
      });
    });
  };

  const resetPointerState = () => {
    gsap.to(chars, {
      scale: 1,
      y: 0,
      x: 0,
      rotation: 0,
      duration: 0.42,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const onMouseLeave = () => {
    if (!isPointerInteractive) return;
    resetPointerState();
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);
}
