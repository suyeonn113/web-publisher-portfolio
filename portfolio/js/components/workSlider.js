import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

export const initWorkSlider = () => {
  const cards = gsap.utils.toArray('.work__card');
  
  if (cards.length === 0) return;

  // 8pt 그리드 시스템의 리듬감을 애니메이션에 반영
  gsap.from(cards, {
    scrollTrigger: {
      trigger: '.work', // 워크 섹션 전체
      start: 'top 75%', 
      toggleActions: 'play none none reverse',
    },
    y: 40,             // $spacer * 5 정도의 적당한 이동 거리
    opacity: 0,
    duration: 0.6,     // $motions의 base(0.4s)보다 조금 더 여유 있게
    stagger: 0.1,      // 카드들이 순차적으로 쓱- 올라오는 효과
    ease: "power2.out" // Apple 스타일의 부드러운 감속
  });
};