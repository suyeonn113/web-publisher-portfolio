import "./SeoulYouthCenterGoals.scss";

const goalItems = [
  {
    number: "01",
    title: "정보 구조 재정비",
    description:
      "청소년 프로그램, 센터 이용 정보, 주요 소식을 사용자가 빠르게 찾을 수 있도록 메뉴 체계와 콘텐츠 우선순위를 재정비합니다.",
    keyword: "Structure",
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
        <path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" />
        <path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "반응형 접근성 강화",
    description:
      "PC뿐 아니라 모바일과 태블릿에서도 동일하게 정보를 확인하고 조작할 수 있도록 기기별 화면 구조와 인터랙션을 최적화합니다.",
    keyword: "Responsive",
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
        <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
        <path d="M10 19v-3.96 3.15" />
        <path d="M7 19h5" />
        <rect width="6" height="10" x="16" y="12" rx="2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "사용자 경험 개선",
    description:
      "정보 탐색부터 활동 참여까지 자연스럽게 이어질 수 있도록 시각적 위계, 탐색 경로, 주요 행동 버튼을 명확하게 설계합니다.",
    keyword: "UX/UI",
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
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "프로그램 참여 흐름 구축",
    description:
      "프로그램 탐색, 상세 정보 확인, 신청, 신청 내역 확인과 수정까지 하나의 홈페이지 안에서 이어지는 통합 이용 흐름을 구축합니다.",
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
        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
        <path d="M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
        <path d="M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
      </svg>
    ),
  },
];

const SeoulYouthCenterGoals = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__goals"
        aria-labelledby="seoul-youth-center-goals-title"
      >
        <header className="seoul-youth-center__goals-header">
          <p className="seoul-youth-center__goals-eyebrow">
            04. Project Goals
          </p>

          <h2 id="seoul-youth-center-goals-title">
            프로젝트 목표
          </h2>

          <p className="seoul-youth-center__goals-intro">
            서울시립청소년센터 홈페이지의 정보 구조와 반응형
            UX/UI를 개선하여, <br /> 청소년 사용자가 모바일과 태블릿
            환경에서도 필요한 정보를 직관적으로 탐색하고 활동에
            참여할 수 있도록 합니다.
          </p>
        </header>

        <ol className="seoul-youth-center__goals-list">
          {goalItems.map(
            ({ number, title, description, keyword, icon }) => (
              <li
                className="seoul-youth-center__goals-item"
                key={number}
              >
                <div className="seoul-youth-center__goals-meta">
                  <span className="seoul-youth-center__goals-icon">
                    {icon}
                  </span>

                  <div className="seoul-youth-center__goals-label">
                    <span className="seoul-youth-center__goals-number">
                      {number}
                    </span>

                    <span className="seoul-youth-center__goals-keyword">
                      {keyword}
                    </span>
                  </div>
                </div>

                <div className="seoul-youth-center__goals-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ),
          )}
        </ol>

        <div className="seoul-youth-center__goals-statement">
          <p>Core Goal</p>

          <strong>
            홈페이지가 단순한 정보 나열을 넘어
            청소년 활동 참여를 촉진하는 핵심 접점으로 기능하도록 개선
          </strong>
        </div>
      </section>
    </div>
  );
};

export default SeoulYouthCenterGoals;