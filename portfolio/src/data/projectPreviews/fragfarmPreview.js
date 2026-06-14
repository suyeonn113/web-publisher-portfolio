export const fragfarmPreview = {
  projectId: "fragfarm",
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
      features: ["메인 비주얼", "신상품/세일 상품 섹션", "리뷰와 브랜드 소개 진입"],
    },
    {
      id: "product-list",
      title: "상품 목록",
      path: "/pages/product.php",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["카테고리 필터", "1열/2열 보기 전환", "페이지네이션"],
    },
    {
      id: "product-detail",
      title: "상품 상세",
      path: "/pages/product-detail.php?id=top-008-na",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["상품 이미지 갤러리", "옵션/수량 선택", "상세 정보와 리뷰 영역"],
    },
    {
      id: "about",
      title: "브랜드 소개",
      path: "/pages/about.php",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["브랜드 스토리", "이미지 중심 레이아웃", "모바일 본문 흐름"],
    },
    {
      id: "login",
      title: "로그인",
      path: "/pages/login.php",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["로그인 폼", "아이디/비밀번호 찾기 진입", "소셜 로그인 버튼"],
    },
    {
      id: "join",
      title: "회원가입",
      path: "/pages/join.php",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["회원 정보 입력", "약관 체크박스", "폼 검증 구조"],
    },
  ],
};
