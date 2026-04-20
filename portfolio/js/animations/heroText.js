import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

export function initHeroText() {
  const titleContainer = document.querySelector('.main-title');
  const originalItems = document.querySelectorAll('.main-title .char, .main-title .dot');
  if (!originalItems.length) return;

  // 새로고침 버그 강제 수정
  const forceHideByScroll = () => {
    if (window.scrollY > 700) {
      titleContainer.classList.add('is-hidden');
      titleContainer.style.display = 'none';
    } else {
      titleContainer.classList.remove('is-hidden');
      titleContainer.style.display = 'block';
    }
  };

  // 실행 시점 3단
  forceHideByScroll(); 
  window.addEventListener('scroll', forceHideByScroll);
  window.addEventListener('load', forceHideByScroll);

  originalItems.forEach(item => {
    const wrapper = document.createElement('span');
    wrapper.className = 'float-wrap';
    wrapper.style.display = 'inline-block';
    item.parentNode.insertBefore(wrapper, item);
    wrapper.appendChild(item);
  });

  const floatWrappers = document.querySelectorAll('.float-wrap');
  const chars = document.querySelectorAll('.main-title .char, .main-title .dot');

  // scroll-down 힌트 페이드아웃
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

  gsap.fromTo(chars, 
    { opacity: 0, scale: 0.5 }, 
    { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      duration: 0.8, 
      stagger: 0.05, 
      ease: "back.out(1.7)",
      onComplete: () => {
        startFloating(floatWrappers);
        initScatter(chars);
      }
    }
  );

  function startFloating(wrappers) {
    let amp = 0;
    gsap.to({ value: 0 }, {
      value: 1,
      duration: 0.8,
      ease: "power1.out",
      onUpdate: function () { amp = this.targets()[0].value; }
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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        end: "+=100vh", 
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    });

    // 위치 이동
    tl.to(targets, {
      x: () => (Math.random() - 0.5) * window.innerWidth * 2.5,
      y: () => (Math.random() - 1.0) * window.innerHeight * 1.5,
      rotation: () => (Math.random() - 0.5) * 180, 
      scale: 0.2,
      filter: "blur(4px)",
      stagger: {
        amount: 1.5, 
        from: "expo.out"
      },
      ease: "none",
    }, 0); // 타임라인 시작점 0

    // 투명도
    tl.to(targets, {
      opacity: 0,
      color: "transparent",
      visibility: "hidden",
      immediateRender: false,
      stagger: {
        amount: 0.8,
        from: "random"
      },
      ease: "power1.in" 
    }, 0.8);
  }

  const onMouseMove = (e) => {
    if (window.matchMedia("(max-width: 480px)").matches) return;
    const { clientX: mouseX, clientY: mouseY } = e;

    chars.forEach(item => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

      const maxDist = 200; 
      const proximity = Math.max(0, 1 - dist / maxDist);
      const magnify = Math.pow(proximity, 2); 

      gsap.to(item, {
        scale: 1 + magnify * 1.2,
        y: (magnify * -40) + (deltaY * 0.3 * proximity),
        x: deltaX * 0.3 * proximity, 
        rotation: deltaX * 0.05 * proximity,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  };

  const onMouseLeave = () => {
    gsap.to(chars, {
      scale: 1, y: 0, x: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);
}