
export const projects = [
  {
    id: "daisomall",
    slug: "daisomall",
    title: "Daiso Mall",
    englishTitle: "Daiso Mall",
    projectName: "다이소몰 웹사이트 구축",
    summary: "생활용품 쇼핑 경험을 정리한 커머스 프로젝트",
    detailType: "showcase",
    workType: "team",
    siteType: "commerce",
    period: {
      start: "2026-01",
      end: "2026-02",
    },
    contribution: 100,
    target: ["온라인 쇼핑 이용자"],
    objective: "상품 탐색부터 구매 전환까지 이어지는 쇼핑 흐름 구성",
    scope: ["메인 페이지", "상품 목록", "상품 상세", "반응형 화면"],
    liveUrl: "https://suyeonn.dothome.co.kr/daisomall/",
    githubUrl:
      "https://github.com/suyeonn113/web-publisher-portfolio/tree/main",
    featured: true,
    visible: true,
    order: 1,
    platforms: ["responsive"],
    responsibilities: ["publishing", "frontend"],
    tech: ["vscode", "html", "scss", "javascript", "git", "github", "dothome"],
    tags: ["commerce", "responsive"],
  },
  {
    id: "air-seoul",
    slug: "air-seoul",
    title: "Air Seoul",
    englishTitle: "Air Seoul",
    projectName: "에어서울 웹사이트 리뉴얼",
    summary: "항공권 탐색과 예약 흐름을 구현한 React 프로젝트",
    detailType: "showcase",
    workType: "personal",
    siteType: "brand-website",
    period: {
      start: "2026-02",
      end: "2026-03",
    },
    contribution: 100,
    target: ["항공권 예매 이용자", "여행객"],
    objective: "항공권 검색, 운임 비교, 예약 진입 흐름을 반응형으로 구현",
    scope: ["메인 페이지", "항공권 검색", "검색 결과", "예약 플로우"],
    liveUrl: "https://suyeonn.dothome.co.kr/airseoul/",
    githubUrl:
      "https://github.com/suyeonn113/web-publisher-portfolio/tree/main/airseoul",
    featured: true,
    visible: true,
    order: 2,
    platforms: ["responsive"],
    responsibilities: ["ui-design", "publishing", "frontend"],
    tech: ["vscode", "react", "scss", "javascript", "git", "github", "dothome"],
    tags: ["react", "responsive"],
  },
  {
    // 기본 정보
    id: "seoul-youth-center",
    slug: "seoul-youth-center",
    title: "시립서울청소년센터",
    englishTitle: "Seoul Youth Center",
    projectName: "시립서울청소년센터 웹사이트 리뉴얼",
    summary: "청소년 프로그램 참여를 잇는 통합 허브",

    // 분류
    detailType: "case-study",
    workType: "personal",
    siteType: "public-website",

    // 프로젝트 정보
    period: {
      start: "2026-03",
      end: "2026-04",
    },

    contribution: 100,

    target: [
      "청소년",
      "보호자",
      "청소년 프로그램 이용자",
    ],

    objective:
      "청소년이 자신에게 맞는 프로그램을 쉽게 탐색하고 신청까지 이어갈 수 있는 통합 허브 구축",

    scope: [
      "메인 페이지",
      "프로그램 탐색 및 상세",
      "프로그램 신청",
      "게시판",
      "반응형 내비게이션",
    ],

    // 링크
    liveUrl:
      "https://suyeonn.dothome.co.kr/seoul-youth-center/index.php",
    githubUrl:
      "https://github.com/suyeonn113/web-publisher-portfolio/tree/main/seoul-youth-center",
    detailPath: "/projects/seoul-youth-center",

    // 노출 설정
    featured: true,
    visible: true,
    order: 3,

    // 복수 정보
    platforms: ["responsive"],

    responsibilities: [
      "planning",
      "ui-design",
      "publishing",
      "frontend",
    ],

    tech: [
      "vscode",
      "figma",
      "html",
      "scss",
      "javascript",
      "php",
      "mysql",
      "git",
      "github",
      "filezilla",
      "dothome",
    ],

    tags: [
      "planning",
      "accessibility",
      "responsive",
    ],
  },
  {
    id: "fragfarm",
    slug: "fragfarm",
    title: "Fragfarm",
    englishTitle: "Fragfarm",
    projectName: "Fragfarm 모바일 쇼핑몰",
    summary: "모바일 중심 패션 커머스 퍼블리싱 프로젝트",
    detailType: "showcase",
    workType: "personal",
    siteType: "commerce",
    period: {
      start: "2026-04",
      end: "2026-05",
    },
    contribution: 100,
    target: ["모바일 쇼핑 이용자"],
    objective: "모바일 환경에서 상품 탐색, 회원, 리뷰 흐름을 자연스럽게 연결",
    scope: ["메인 페이지", "상품 목록", "상품 상세", "회원", "리뷰"],
    liveUrl: "https://suyeonn.dothome.co.kr/fragfarm-mobile/index.php",
    githubUrl:
      "https://github.com/suyeonn113/web-publisher-portfolio/tree/main/fragfarm-mobile",
    featured: true,
    visible: true,
    order: 4,
    platforms: ["mobile"],
    responsibilities: ["ui-design", "publishing", "frontend"],
    tech: [
      "vscode",
      "html",
      "css",
      "javascript",
      "php",
      "mysql",
      "git",
      "github",
      "dothome",
    ],
    tags: ["mobile", "commerce"],
  },
];

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);
