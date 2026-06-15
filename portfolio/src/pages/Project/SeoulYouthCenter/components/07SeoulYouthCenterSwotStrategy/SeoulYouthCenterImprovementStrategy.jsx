import ArrowIcon from "../../../../../components/icons/ArrowIcon";
import "./SeoulYouthCenterImprovementStrategy.scss";

const strategyItems = [
  {
    number: "01",
    diagramTitle: "정보 구조 재정립",
    description:
      "주요 서비스와 프로그램 정보를 사용자가 예측 가능한 구조로 재정리합니다.",
    icon: "layers",
  },
  {
    number: "02",
    diagramTitle: "반응형 UX 강화",
    description:
      "모바일과 태블릿에서도 탐색, 필터, 신청 CTA가 자연스럽게 작동하도록 설계합니다.",
    icon: "monitorSmartphone",
  },
  {
    number: "03",
    diagramTitle: "프로그램 탐색 최적화",
    description:
      "모집 상태, 대상, 활동 기간 등 판단 정보를 카드와 필터 중심으로 제공합니다.",
    icon: "fileSearch",
  },
  {
    number: "04",
    diagramTitle: "참여 흐름 연결",
    description:
      "프로그램 목록, 상세, 신청, 신청 확인까지 하나의 흐름으로 연결합니다.",
    icon: "filePen",
  },
];

const StrategyIcon = ({ type }) => {
  const commonProps = {
    className: "seoul-youth-center__improvement-strategy-icon",
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (type === "monitorSmartphone") {
    return (
      <svg {...commonProps}>
        <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
        <path d="M10 19v-3.96 3.15" />
        <path d="M7 19h5" />
        <rect width="6" height="10" x="16" y="12" rx="2" />
      </svg>
    );
  }

  if (type === "fileSearch") {
    return (
      <svg {...commonProps}>
        <path d="M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="m21 22-2.88-2.88" />
        <circle cx="16" cy="17" r="3" />
      </svg>
    );
  }

  if (type === "filePen") {
    return (
      <svg {...commonProps}>
        <path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z" />
        <path d="M14.487 7.858A1 1 0 0 1 14 7V2" />
        <path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516" />
        <path d="M8 18h1" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" />
      <path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" />
    </svg>
  );
};

const SeoulYouthCenterImprovementStrategy = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__improvement-strategy"
        aria-labelledby="seoul-youth-center-improvement-strategy-title"
      >
        <header className="seoul-youth-center__improvement-strategy-header">
          <p className="seoul-youth-center__improvement-strategy-eyebrow">
            07. SWOT &amp; Improvement Strategy
          </p>

          <h2 id="seoul-youth-center-improvement-strategy-title">
            개선 전략
          </h2>

          <p className="seoul-youth-center__improvement-strategy-summary">
            분석과 벤치마킹에서 도출한 핵심 과제를 정보 구조,
            반응형 접근성, 프로그램 탐색, 참여 흐름의 네 가지
            전략으로 구체화했습니다.
          </p>
        </header>

        <div className="seoul-youth-center__improvement-strategy-layout">
          <figure
            className="seoul-youth-center__improvement-strategy-diagram"
            aria-label="개선 전략 흐름 도식 영역"
          >
            {strategyItems.map(
              ({ number, diagramTitle, description, icon }, index) => (
                <article
                  className="seoul-youth-center__improvement-strategy-diagram-step"
                  key={number}
                >
                  <StrategyIcon type={icon} />

                  <div className="seoul-youth-center__improvement-strategy-step-copy">
                    <span className="seoul-youth-center__improvement-strategy-step-number">
                      {number}
                    </span>
                    <h3>{diagramTitle}</h3>
                    <p>{description}</p>
                  </div>
                  {index < strategyItems.length - 1 ? (
                    <ArrowIcon
                      className="seoul-youth-center__improvement-strategy-step-arrow"
                      direction="right"
                    />
                  ) : null}
                </article>
              ),
            )}
          </figure>
        </div>

        <footer className="seoul-youth-center__improvement-strategy-direction">
          <ArrowIcon
            className="seoul-youth-center__improvement-strategy-direction-arrow"
            direction="down"
          />
          <p>Final Direction</p>
          <strong>
            기관 소개 중심 홈페이지에서 청소년 활동 참여를 돕는
            서비스형 플랫폼으로 전환합니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterImprovementStrategy;
