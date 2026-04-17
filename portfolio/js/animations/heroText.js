import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

let heroFloatTick = null;

export function initHeroText() {
  const hero = document.querySelector(".hero");
  const title = document.querySelector(".main-title");
  const originalItems = document.querySelectorAll(".main-title .char, .main-title .dot");

  if (!hero || !title || !originalItems.length) return;

  /* ============================================================
      1. DOM 구조 재구성
  ============================================================ */
  originalItems.forEach((item) => {
    if (item.parentElement?.classList.contains("float-wrap")) return;

    const wrapper = document.createElement("span");
    wrapper.className = "float-wrap";
    wrapper.style.display = "inline-block";

    item.parentNode.insertBefore(wrapper, item);
    wrapper.appendChild(item);
  });

  const floatWrappers = document.querySelectorAll(".float-wrap");
  const chars = document.querySelectorAll(".main-title .char, .main-title .dot");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
      2. 중복 ticker / trigger 정리
  ============================================================ */
  if (heroFloatTick) {
    gsap.ticker.remove(heroFloatTick);
    heroFloatTick = null;
  }

  ScrollTrigger.getAll().forEach((trigger) => {
    const triggerEl = trigger.vars?.trigger;
    if (triggerEl === hero || triggerEl === ".hero") {
      trigger.kill();
    }
  });

  /* ============================================================
      3. 상태 세팅
  ============================================================ */
  function setHeroHiddenState() {
    gsap.set(chars, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.5,
      rotation: 0,
      clearProps: "filter"
    });

    gsap.set(floatWrappers, {
      y: 0
    });
  }

  function setHeroRestState() {
    gsap.set(chars, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      clearProps: "filter"
    });

    gsap.set(floatWrappers, {
      y: 0
    });
  }

  function setHeroIntroStartState() {
    gsap.set(chars, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.5,
      rotation: 0,
      clearProps: "filter"
    });

    gsap.set(floatWrappers, {
      y: 0
    });
  }

  function isPastHero() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    return window.scrollY > heroBottom - 8;
  }

  /* ============================================================
      4. 현재 위치 판단
  ============================================================ */
  const heroRect = hero.getBoundingClientRect();
  const shouldPlayIntro = heroRect.top >= -40;
  const pastHeroOnLoad = isPastHero();

  if (pastHeroOnLoad) {
    setHeroHiddenState();
  } else if (shouldPlayIntro) {
    setHeroIntroStartState();
  } else {
    setHeroRestState();
  }

  /* ============================================================
      5. 부유 효과
  ============================================================ */
  function startFloating(wrappers) {
    const configs = Array.from(wrappers).map(() => ({
      speed: gsap.utils.random(2.0, 3.0),
      phase: gsap.utils.random(0, Math.PI * 2),
      amp: gsap.utils.random(2, 6)
    }));

    heroFloatTick = () => {
      const t = gsap.ticker.time;

      wrappers.forEach((el, i) => {
        const c = configs[i];
        const y = Math.sin(t * c.speed + c.phase) * c.amp;
        gsap.set(el, { y });
      });
    };

    gsap.ticker.add(heroFloatTick);
  }

  function stopFloating() {
    if (heroFloatTick) {
      gsap.ticker.remove(heroFloatTick);
      heroFloatTick = null;
    }
  }

  /* ============================================================
      6. 인트로 애니메이션
  ============================================================ */
  const introTl = gsap.timeline({
    paused: true,
    onComplete: () => {
      if (!heroFloatTick && !isPastHero()) {
        startFloating(floatWrappers);
      }
    }
  });

  introTl.to(chars, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: "back.out(1.7)"
  });

  /* ============================================================
      7. 스크롤 흩어짐 효과
  ============================================================ */
  const scatterTl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1.5,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        if (isPastHero()) {
          stopFloating();
          setHeroHiddenState();
          introTl.progress(1);
          self.animation.progress(1);
          return;
        }

        if (self.progress <= 0) {
          if (shouldPlayIntro) {
            setHeroIntroStartState();
          } else {
            setHeroRestState();
          }
          return;
        }

        setHeroRestState();
        introTl.progress(1);

        if (!heroFloatTick) {
          startFloating(floatWrappers);
        }
      }
    }
  });

  if (prefersReducedMotion) {
    scatterTl.fromTo(
      chars,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        rotation: 0
      },
      {
        y: -50,
        opacity: 0,
        stagger: 0.02,
        ease: "none"
      }
    );
  } else {
    scatterTl.fromTo(
      chars,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        rotation: 0
      },
      {
        x: () => (Math.random() - 0.5) * window.innerWidth,
        y: () => (Math.random() - 1) * window.innerHeight * 0.7,
        rotation: () => (Math.random() - 0.5) * 120,
        scale: 0.5,
        opacity: 0,
        stagger: { amount: 0.8, from: "random" },
        ease: "none"
      }
    );
  }

  /* ============================================================
      8. 인트로 실행 여부 분기
  ============================================================ */
  if (pastHeroOnLoad) {
    stopFloating();
    introTl.progress(1);
    scatterTl.progress(1);
    setHeroHiddenState();
  } else if (shouldPlayIntro) {
    introTl.play();
  } else {
    introTl.progress(1);
    startFloating(floatWrappers);
  }

  /* ============================================================
      9. 스크롤 다운 힌트 퇴장
  ============================================================ */
  const scrollHint = document.querySelector(".scroll-down");

  if (scrollHint) {
    gsap.set(scrollHint, { autoAlpha: 1, y: 0 });

    gsap.to(scrollHint, {
      autoAlpha: 0,
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "top+=180 top",
        scrub: true,
        invalidateOnRefresh: true,
        onLeave: () => gsap.set(scrollHint, { autoAlpha: 0, y: 40 }),
        onEnterBack: () => gsap.set(scrollHint, { autoAlpha: 1, y: 0 })
      }
    });
  }

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}