export const seoulYouthCenterPreview = {
  projectId: "seoul-youth-center",
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
      path: "/index.php",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["메인 배너", "빠른 메뉴", "프로그램/캘린더/SNS 섹션"],
    },
    {
      id: "programs",
      title: "프로그램 탐색",
      path: "/programs.php",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["상태/검색 필터", "프로그램 카드", "페이지네이션"],
    },
    {
      id: "program-detail",
      title: "프로그램 상세",
      path: "/program-detail.php?id=1",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["프로그램 정보 요약", "신청 CTA", "상세 안내 레이아웃"],
    },
    {
      id: "applications",
      title: "신청 내역",
      path: "/applications.php",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["신청 목록 검색", "상태 정보", "목록형 정보 구조"],
    },
  ],
};
