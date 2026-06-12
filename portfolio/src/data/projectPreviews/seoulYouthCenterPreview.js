export const seoulYouthCenterPreview = {
  projectId: "seoul-youth-center",
  mode: "auto",
  defaultDevice: "mobile",
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
      frameHeight: 720,
    },
  },
  reviewSteps: [
    {
      id: "main",
      title: "메인 화면",
      path: "/index.php",
      target: "body",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      guide: "메인에서 주요 프로그램과 센터 정보를 확인합니다.",
      interactionHint: "디바이스를 전환하며 첫 화면 구성을 비교합니다.",
    },
    {
      id: "programs",
      title: "프로그램 탐색",
      path: "/programs.php",
      target: "body",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      guide: "프로그램 목록과 탐색 흐름을 확인합니다.",
      interactionHint: "카테고리와 프로그램 카드를 직접 살펴봅니다.",
    },
    {
      id: "program-apply",
      title: "프로그램 신청",
      path: "/program-apply.php",
      target: "body",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      guide: "신청 폼의 입력 흐름과 반응형 배치를 확인합니다.",
      interactionHint: "입력 항목이 화면 크기에 맞게 정리되는지 봅니다.",
    },
    {
      id: "applications",
      title: "신청 내역",
      path: "/applications.php",
      target: "body",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      guide: "신청 내역 조회 화면의 정보 구조를 확인합니다.",
      interactionHint: "목록과 상세 진입 흐름을 확인합니다.",
    },
  ],
};
