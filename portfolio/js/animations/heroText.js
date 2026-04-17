import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

/**
 * 히어로 섹션 텍스트 애니메이션 컨트롤러
 * 진입, 부유, 마우스 인터랙션, 스크롤 흩어짐 효과 포함
 */
export function initHeroText() {
  const originalItems = document.querySelectorAll('.main-title .char, .main-title .dot');
  if (!originalItems.length) return;

  // DOM 구조 재구성: 개별 글자에 부유 효과 전용 래퍼를 생성하여 애니메이션 계층 분리
  originalItems.forEach(item => {
    const wrapper = document.createElement('span');
    wrapper.className = 'float-wrap';
    wrapper.style.display = 'inline-block';
    item.parentNode.insertBefore(wrapper, item);
    wrapper.appendChild(item);
  });

  const floatWrappers = document.querySelectorAll('.float-wrap');
  const chars = document.querySelectorAll('.main-title .char, .main-title .dot');

  // 첫 진입 애니메이션: 글자들이 작게 시작해 튕기며 등장
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
        initScatter(chars); // 등장 완료 후 스크롤 흩어짐 이벤트 활성화
      }
    }
  );

  // 부유 애니메이션: 각 글자가 서로 다른 속도와 진폭으로 공중에 떠 있는 효과
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

  // 스크롤 흩어짐 애니메이션: 스크롤을 내리면 글자들이 사방으로 랜덤하게 흩뿌려짐
  function initScatter(targets) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
          // 동작 줄이기 사용자: 어지러운 흩어짐 대신, 부드럽게 위로 살짝 올라가며 페이드아웃
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
          return; // 아래의 화려한 흩어짐 로직은 실행하지 않음
        }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        // 조절 포인트 1: 스크롤 구간 늘리기
        end: "+=100vh", 
        scrub: 2.5,
      }
    });

    tl.to(targets, {
      // 조절 포인트 2: 날아가는 반경 줄이기
      x: () => (Math.random() - 0.5) * window.innerWidth * 1.2,
      y: () => (Math.random() - 0.8) * window.innerHeight * 0.5,
      
      transformPerspective: 600,

      // 조절 포인트 3: 회전값 낮추기
      rotation: () => (Math.random() - 0.5) * 90, 
      rotationX: () => (Math.random() - 0.5) * 160, 
      rotationY: () => (Math.random() - 0.5) * 160,

      scale: () => gsap.utils.random(0.5, 0.8),
      filter: "blur(6px)",
      opacity: 0,
      stagger: {
        // 조절 포인트 4: 시간차(stagger) 늘리기
        amount: 1.2, 
        from: "random"
      },
      // 조절 포인트 5: 타이밍 함수(Ease) 변경
      ease: "sine.inOut" 
    });
  }

  // 마우스 무브 인터랙션: 마우스가 가까워지면 글자가 확대되고 밀려나는 효과
  const onMouseMove = (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;

    chars.forEach(item => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

      const maxDist = 350; 
      const proximity = Math.max(0, 1 - dist / maxDist);
      const magnify = Math.pow(proximity, 2); 

      gsap.to(item, {
        scale: 1 + magnify * 1.2,
        y: (magnify * -40) + (deltaY * 0.3 * proximity),
        x: deltaX * 0.3 * proximity, 
        rotation: deltaX * 0.05 * proximity,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto" // 스크롤 애니메이션과 중첩 시 부드러운 전환을 유도
      });
    });
  };

  // 마우스가 화면을 벗어날 때 원래 위치로 복귀
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