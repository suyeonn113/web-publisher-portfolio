export const airSeoulPreview = {
  projectId: "air-seoul",
  defaultDevice: "desktop",
  devices: {
    mobile: {
      width: 390,
      frameHeight: 720,
    },
    tablet: {
      width: 768,
      frameHeight: 720,
    },
    desktop: {
      width: 1440,
      frameHeight: 900,
      maxShellHeight: 720,
    },
  },
  reviewSteps: [
    {
      id: "main",
      title: "메인 화면",
      path: "/",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["히어로 프로모션", "항공권 검색 진입", "모바일 퀵바"],
    },
    {
      id: "booking",
      title: "항공권 검색",
      path: "/booking",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["여정/탑승객 선택", "공항 선택 패널", "날짜/운임 검색 흐름"],
    },
    {
      id: "search-result",
      title: "검색 결과",
      path: "/booking/flight?tripType=roundTrip&from=ICN&to=NRT&departureDate=2026-05-14&returnDate=2026-05-18&adult=1&child=0&infant=0",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["운임 리스트", "예약 단계 네비게이션", "선택 요약 영역"],
    },
  ],
};
