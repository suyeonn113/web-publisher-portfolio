
// src/data/projects.js

export const projects = [
  {
    // 기본 정보
    id: "seoul-youth-center",
    slug: "seoul-youth-center",
    title: "시립서울청소년센터",
    englishTitle: "Seoul Youth Center",
    summary: "복잡한 공공기관 정보를 명확하게 재구성한 반응형 웹사이트",

    // 분류
    detailType: "case-study",
    workType: "personal",

    // 프로젝트 정보
    period: {
      start: "2026-03",
      end: "2026-04",
    },

    // 이미지
    thumbnail: "/images/projects/seoul-youth-center/thumbnail.webp",
    coverImage: "/images/projects/seoul-youth-center/cover.webp",
    coverAlt: "시립서울청소년센터 메인 화면",

    // 링크
    liveUrl: "https://suyeonn.dothome.co.kr/seoul-youth-center/index.php",
    githubUrl: "https://github.com/suyeonn113/web-publisher-portfolio/tree/main/seoul-youth-center",

    // 노출 설정
    featured: true,
    visible: true,
    order: 1,

    // 복수 정보
    platforms: ["responsive"],
    responsibilities: [
      "planning",
      "ui-design",
      "publishing",
      "frontend",
    ],
    tech: ["html", "scss", "javascript", "php"],
    tags: ["planning", "accessibility", "responsive"],
  },
];

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);