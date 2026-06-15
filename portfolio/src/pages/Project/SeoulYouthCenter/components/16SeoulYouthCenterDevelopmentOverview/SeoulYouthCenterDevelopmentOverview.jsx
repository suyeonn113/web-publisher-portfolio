import { getProjectTechItems } from "../../../../../utils/projectHelpers";
import ArrowIcon from "../../../../../components/icons/ArrowIcon";
import "./SeoulYouthCenterDevelopmentOverview.scss";

const ScreenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 8h20" />
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="M6 16h12" />
  </svg>
);

const InteractionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 4.1 12 6" />
    <path d="m5.1 8-2.9-.8" />
    <path d="m6 12-1.9 2" />
    <path d="M7.2 2.2 8 5.1" />
    <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
  </svg>
);

const ServerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2v8" />
    <path d="m16 6-4 4-4-4" />
    <rect width="20" height="8" x="2" y="14" rx="2" />
    <path d="M6 18h.01" />
    <path d="M10 18h.01" />
  </svg>
);

const DataIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.693V5" />
    <path d="m22 22-1.875-1.875" />
    <path d="M3 12a9 3 0 0 0 8.697 2.998" />
    <path d="M3 5v14a9 3 0 0 0 9.28 2.999" />
    <circle cx="18" cy="18" r="3" />
    <ellipse cx="12" cy="5" rx="9" ry="3" />
  </svg>
);

const developmentFlow = [
  {
    number: "01",
    title: "화면 구현",
    stack: "HTML / SCSS",
    description:
      "반응형 레이아웃, 프로그램 목록, 상세 페이지, 신청 UI를 구성했습니다.",
    Icon: ScreenIcon,
  },
  {
    number: "02",
    title: "사용자 인터랙션",
    stack: "JavaScript",
    description:
      "슬라이드, 필터, 버튼 조작과 폼 유효성 검사 등 주요 인터랙션을 구현했습니다.",
    Icon: InteractionIcon,
  },
  {
    number: "03",
    title: "서버 처리",
    stack: "PHP",
    description:
      "프로그램 조회, 신청 등록, 신청 내역 조회와 수정·삭제 흐름을 연결했습니다.",
    Icon: ServerIcon,
  },
  {
    number: "04",
    title: "데이터 관리",
    stack: "MySQL",
    description:
      "프로그램 정보와 신청 데이터를 저장하고 조회·관리할 수 있도록 구성했습니다.",
    Icon: DataIcon,
  },
];

const toolGroupRules = [
  {
    title: "디자인",
    matches: ["figma"],
  },
  {
    title: "프론트엔드",
    matches: ["html", "scss", "javascript", "js"],
  },
  {
    title: "백엔드 / 데이터베이스",
    matches: ["php", "mysql"],
  },
  {
    title: "개발 도구 / 버전 관리",
    matches: ["vscode", "vs code", "git", "github"],
  },
  {
    title: "배포 / 서버",
    matches: ["filezilla", "dothome"],
  },
];

const normalizeToolText = (value) =>
  String(value).toLowerCase().replace(/\s+/g, "");

const getGroupedToolItems = (toolItems) => {
  const usedKeys = new Set();

  const groups = toolGroupRules.map(({ title, matches }) => {
    const items = toolItems.filter(({ key, label }) => {
      const normalizedKey = normalizeToolText(key);
      const normalizedLabel = normalizeToolText(label);
      const normalizedText = `${normalizedKey}${normalizedLabel}`;

      const isMatched = matches.some((match) =>
        normalizedText.includes(normalizeToolText(match)),
      );

      if (isMatched) {
        usedKeys.add(key);
      }

      return isMatched;
    });

    return { title, items };
  });

  const restItems = toolItems.filter(({ key }) => !usedKeys.has(key));

  if (restItems.length > 0) {
    groups.push({
      title: "기타",
      items: restItems,
    });
  }

  return groups.filter(({ items }) => items.length > 0);
};

const SeoulYouthCenterDevelopmentOverview = ({ project }) => {
  const toolItems = getProjectTechItems(project?.tech) ?? [];
  const groupedToolItems = getGroupedToolItems(toolItems);

  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__development-overview"
        aria-labelledby="seoul-youth-center-development-overview-title"
      >
        <header className="seoul-youth-center__development-overview-header">
          <p className="seoul-youth-center__development-overview-eyebrow">
            16. Development Overview
          </p>

          <h2 id="seoul-youth-center-development-overview-title">
            개발 개요
          </h2>

          <p className="seoul-youth-center__development-overview-summary">
            기획과 UI 디자인을 기반으로 프론트엔드와 백엔드,
            데이터베이스를 연동하여 프로그램 탐색부터 신청 및
            관리까지 가능한 반응형 웹사이트를 구현했습니다.
          </p>
        </header>

        <section className="seoul-youth-center__development-overview-flow">
          <div className="seoul-youth-center__development-overview-section-heading">
            <p>Development Flow</p>
            <h3>개발 흐름</h3>
          </div>

          <ol className="seoul-youth-center__development-overview-flow-list">
            {developmentFlow.map(
              ({ number, title, stack, description, Icon }, index) => (
                <li key={number}>
                  <div className="seoul-youth-center__development-overview-flow-card">
                    <div className="seoul-youth-center__development-overview-flow-card-top">
                      <span>{number}</span>

                      <div className="seoul-youth-center__development-overview-flow-icon">
                        <Icon />
                      </div>
                    </div>

                    <div className="seoul-youth-center__development-overview-flow-card-body">
                      <h4>{title}</h4>
                      <strong>{stack}</strong>
                      <p>{description}</p>
                    </div>
                  </div>

                  {index < developmentFlow.length - 1 ? (
                    <ArrowIcon
                      className="seoul-youth-center__development-overview-flow-arrow"
                      direction="right"
                    />
                  ) : null}
                </li>
              ),
            )}
          </ol>
        </section>

        <section className="seoul-youth-center__development-overview-tools">
          <div className="seoul-youth-center__development-overview-section-heading">
            <p>Tools &amp; Stack</p>
            <h3>사용 기술 및 도구</h3>
          </div>

          <div className="seoul-youth-center__development-overview-tools-panel">
            {groupedToolItems.map(({ title, items }) => (
              <article
                className="seoul-youth-center__development-overview-tool-group"
                key={title}
              >
                <h4>{title}</h4>

                <ul>
                  {items.map(({ key, label, Icon }) => (
                    <li key={key}>
                      {Icon ? (
                        <Icon aria-hidden="true" />
                      ) : (
                        <span
                          className="seoul-youth-center__development-overview-tool-placeholder"
                          aria-hidden="true"
                        />
                      )}

                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default SeoulYouthCenterDevelopmentOverview;