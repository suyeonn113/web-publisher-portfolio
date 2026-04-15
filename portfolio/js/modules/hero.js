import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

export function initHeroText() {
  const originalItems = document.querySelectorAll('.main-title .char, .main-title .dot');
  if (!originalItems.length) return;

  // DOM Structure
  originalItems.forEach(item => {
    const wrapper = document.createElement('span');
    wrapper.className = 'float-wrap';
    wrapper.style.display = 'inline-block';
    item.parentNode.insertBefore(wrapper, item);
    wrapper.appendChild(item);
  });

  const floatWrappers = document.querySelectorAll('.float-wrap');
  const chars = document.querySelectorAll('.main-title .char, .main-title .dot');

  // Entry Animation
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
      }
    }
  );

  // Floating Animation (Modified: More Rhythmic)

  // function startFloating(floatWrappers) {
  //   let amp = 0; // 진폭
  // 
  //   // 진폭 서서히 증가
  //   gsap.to({ value: 0 }, {
  //     value: 1,
  //     duration: 0.8,
  //     ease: "power1.out",
  //     onUpdate: function () {
  //       amp = this.targets()[0].value;
  //     }
  //   });
  //   gsap.ticker.add(() => {
  //     const t = gsap.ticker.time;

  //     floatWrappers.forEach((el, i) => {
  //       const y = Math.sin(t * 2.5 + i * 0.6) * 15 * amp;
  //       /*
  //         t * 2     → 전체 속도 (값 ↑ = 더 빨라짐)
  //         i * 0.45  → 파도 간격 (값 ↑ = 더 넓게 퍼짐)
  //         * 12      → 부유 높이 (값 ↑ = 더 크게 움직임)
  //       */
  //       gsap.set(el, { y });
  //     });
  //   });
  // }

  
  function startFloating(floatWrappers) {
    let amp = 0;

    // 진폭 서서히 증가
    gsap.to({ value: 0 }, {
      value: 1,
      duration: 0.8,
      ease: "power1.out",
      onUpdate: function () {
        amp = this.targets()[0].value;
      }
    });

    // 요소별 랜덤 값 미리 생성 (중요: 고정된 랜덤)
    const configs = Array.from(floatWrappers).map(() => {
      const baseAmp = gsap.utils.random(2, 6);

      const scale = gsap.utils.clamp(0.3, 1, window.innerWidth / 1200);

      return {
        speed: gsap.utils.random(2.0, 3.0),
        phase: gsap.utils.random(0, Math.PI * 2),
        amp: baseAmp * scale
      };       
    });

    gsap.ticker.add(() => {
      const t = gsap.ticker.time;

      floatWrappers.forEach((el, i) => {
        const c = configs[i];

        const y = Math.sin(t * c.speed + c.phase) * c.amp * amp;
        gsap.set(el, { y });
      });
    });
  }
  
  
  // Mouse Move Interaction (Dock Effect)
  const onMouseMove = (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;

    chars.forEach(item => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 1. 마우스와 글자 사이의 거리 계산
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

      const maxDist = 350; 
      const proximity = Math.max(0, 1 - dist / maxDist);
      const magnify = Math.pow(proximity, 2); 

      gsap.to(item, {
        scale: 1 + magnify * 1.2,
        // 위로 뜨는 힘 + 마우스 Y축으로 끌려가는 힘
        y: (magnify * -40) + (deltaY * 0.3 * proximity),
        // 마우스 X축으로 끌려가는 힘
        x: deltaX * 0.3 * proximity, 
        // 마우스 방향에 따른 미세한 회전
        rotation: deltaX * 0.05 * proximity,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  };

  // Mouse Leave Reset
  const onMouseLeave = () => {
    gsap.to(chars, {
      scale: 1,
      y: 0,
      x: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);
}