import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

export const initWorkEntrance = () => {
  const cards = gsap.utils.toArray('.work__card');
  if (!cards.length) return;

  const isMobile = window.innerWidth < 768;

  const spacing = 1 / cards.length;
  const wrapProgress = gsap.utils.wrap(-0.5, 0.5);
  const cardWidth = cards[0].offsetWidth;
  const baseX = cardWidth * 0.98; // 슬라이더의 gapRatio를 반영한 간격

  // 각 카드의 최종 도착 x좌표를 미리 계산하여 객체 배열 생성
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

  // 핵심: x 좌표가 큰 순서(오른쪽)대로 카드 정렬
  const sortedByRight = [...cardData].sort((a, b) => b.x - a.x);

  // 초기 상태 숨김
  gsap.set(cards, { opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".work",
      start: isMobile ? "top 50%" : "top 60%",
      end: isMobile ? "top 5%" : "top 10%",
      scrub: isMobile ? 9 : 7,
      toggleActions: "play none none reverse",
    }
  });

  // 오른쪽 끝 카드부터 순차적으로 등장
  sortedByRight.forEach((data, index) => {
    tl.fromTo(data.el, 
      {
        x: isMobile ? "-100vw" : "-150vw", // 모바일은 진입 거리를 조금 단축
        y: isMobile ? "70vh" : "100vh",   // 모바일은 시작 높이를 조금 상향
        scale: 0.2,
        rotation: isMobile ? -15 : -90,   // 모바일에서 "눕는 느낌"을 줄이기 위해 -45도로 완화
        opacity: 0
      },
      {
        x: data.x,   // 미리 계산된 슬라이더 자리로 안착
        y: 0,
        scale: data.scale,
        rotation: 0,
        opacity: 1,
        zIndex: data.zIndex,
        duration: isMobile ? 0.9 : 1.4,   // 모바일은 조금 더 쫀득하게 빠르게
        ease: "power3.out",
        onComplete: () => {
          if (index === sortedByRight.length - 1) {
            // 전역 또는 외부에서 접근 가능한 슬라이더 업데이트 함수 호출
            if (typeof window.updateWorkSlider === 'function') {
              window.updateWorkSlider(0);
            }
          }
        }
      }, 
      index * (isMobile ? 0.05 : 0.1) // 모바일은 카드가 들어오는 간격을 살짝 더 촘촘하게
    );
  });

  gsap.fromTo(
    [".work__header", ".work__nav-controls"],
    {
      opacity: 0,
      y: isMobile ? 18 : 28
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".work",
        start: isMobile ? "top 10%" : "top 10%",
        end: isMobile ? "top 5%" : "top 5%",
        scrub: isMobile ? 2 : 1.2,
      }
    }
  );
};