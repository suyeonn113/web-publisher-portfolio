import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

export const initWorkEntrance = () => {
  const cards = gsap.utils.toArray('.work__card');
  if (!cards.length) return;

  const spacing = 1 / cards.length;
  const wrapProgress = gsap.utils.wrap(-0.5, 0.5);
  const cardWidth = cards[0].offsetWidth;
  const baseX = cardWidth * 0.98; // 슬라이더의 gapRatio를 반영한 간격

  // 1. 각 카드의 최종 도착 x좌표를 미리 계산하여 객체 배열 생성
  const cardData = cards.map((card, i) => {
    const offset = wrapProgress(0 + i * spacing);
    const dist = offset / spacing;
    const absDist = Math.abs(dist);

    return {
      el: card,
      x: dist * baseX,
      scale: absDist <= 1 ? gsap.utils.interpolate(1, 0.8, absDist) : 0.76,
      zIndex: 100 - Math.round(absDist * 20)
    };
  });

  // 2. ⭐ 핵심: x 좌표가 큰 순서(오른쪽)대로 카드 정렬
  const sortedByRight = [...cardData].sort((a, b) => b.x - a.x);

  // 초기 상태 숨김
  gsap.set(cards, { opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".work",
      start: "top 60%", 
      end: "top 10%",
      scrub: 4,
      toggleActions: "play none none reverse",
    }
  });

  // 3. 오른쪽 끝 카드부터 순차적으로 등장
  sortedByRight.forEach((data, index) => {
    tl.fromTo(data.el, 
      {
        x: "-150vw", // 왼쪽 아래 멀리서 시작
        y: "100vh",
        scale: 0.2,
        rotation: -90,
        opacity: 0
      },
      {
        x: data.x,   // 미리 계산된 슬라이더 자리로 안착
        y: 0,
        scale: data.scale,
        rotation: 0,
        opacity: 1,
        zIndex: data.zIndex,
        duration: 1.4,
        ease: "power3.out",
        onComplete: () => {
          if (index === sortedByRight.length - 1) {
            // 전역 또는 외부에서 접근 가능한 슬라이더 업데이트 함수 호출
            // 만약 함수 호출이 어렵다면 스크롤 이벤트를 살짝 발생시켜 트리거할 수도 있습니다.
            if (typeof window.updateWorkSlider === 'function') {
              window.updateWorkSlider(0);
            }
          }
        }
      }, 
      index * 0.1
    );
  });

  tl.fromTo([".work__header", ".work__nav-controls"], 
    { 
      opacity: 0, 
      y: 20 
    }, 
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: "power2.out",
      stagger: 0
    }, 
    ">0.5"
  );
};