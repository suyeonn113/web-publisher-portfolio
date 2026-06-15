import "./SeoulYouthCenterBackground.scss";

const backgroundIntro =
  "서울시립청소년센터는 서울시를 대표하는 청소년 기관임에도 기존 홈페이지가 반응형 환경을 충분히 지원하지 않아\n모바일과 태블릿 이용자의 정보 접근성이 낮았습니다.";

const backgroundItems = [
  {
    number: "01",
    title: "대표 기관 역할 대비 낮은 디지털 접근성",
    description:
      "서울시를 대표하는 청소년 기관임에도 모바일과 태블릿 환경에서 정보 확인이 어려워, 다양한 사용자가 홈페이지를 원활하게 이용하기 어려웠습니다.",
    keyword: "Accessibility",
    icon: (
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
        focusable="false"
      >
        <rect width="10" height="14" x="3" y="8" rx="2" />
        <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
        <path d="M8 18h.01" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "프로그램과 혜택 정보 전달력 부족",
    description:
      "활발히 진행되는 프로그램과 청소년에게 필요한 혜택이 충분히 전달되지 못해, 홈페이지가 기관 활동을 알리는 핵심 채널로 기능하는 데 한계가 있었습니다.",
    keyword: "Communication",
    icon: (
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
        focusable="false"
      >
        <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
        <path d="M8 6v8" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "참여로 이어지기 어려운 이용 흐름",
    description:
      "청소년 관련 기관에서 활동한 경험을 바탕으로 볼 때, 사용자가 정보를 확인한 뒤 실제 활동 참여로 이어지기 위해서는 탐색과 신청 흐름의 연결성이 필요했습니다.",
    keyword: "Participation",
    icon: (
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
        focusable="false"
      >
        <path d="M18 21a8 8 0 0 0-16 0" />
        <circle cx="10" cy="8" r="5" />
        <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
      </svg>
    ),
  },
];

const backgroundConclusion = {
  label: "Project Direction",
  description:
    "반응형 웹과 UX/UI 개선을 통해 홈페이지가 청소년 활동 참여를 높이는 핵심 매개체가 되도록 재구성",
};

const SeoulYouthCenterBackground = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__background"
        aria-labelledby="seoul-youth-center-background-title"
      >
        <header className="seoul-youth-center__background-header">
          <p className="seoul-youth-center__background-eyebrow">
            03. Background &amp; Rationale
          </p>

          <h2 id="seoul-youth-center-background-title">
            추진 배경 및 필요성
          </h2>

          <p className="seoul-youth-center__background-intro">
            {backgroundIntro}
          </p>
        </header>

        <ol className="seoul-youth-center__background-list">
          {backgroundItems.map(
            ({ number, title, description, keyword, icon }) => (
              <li
                className="seoul-youth-center__background-item"
                key={number}
              >
                <div className="seoul-youth-center__background-item-heading">
                  <span className="seoul-youth-center__background-icon">
                    {icon}
                  </span>

                  <div className="seoul-youth-center__background-meta">
                    <span className="seoul-youth-center__background-number">
                      {number}
                    </span>

                    <span className="seoul-youth-center__background-keyword">
                      {keyword}
                    </span>
                  </div>
                </div>

                <div className="seoul-youth-center__background-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ),
          )}
        </ol>

        <div className="seoul-youth-center__background-conclusion">
          <p>{backgroundConclusion.label}</p>
          <strong>{backgroundConclusion.description}</strong>
        </div>
      </section>
    </div>
  );
};

export default SeoulYouthCenterBackground;