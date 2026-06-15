import "./SeoulYouthCenterInformationArchitectureStructure.scss";

const architectureGroups = [
  {
    title: "Global Navigation",
    description: "방문 목적과 프로그램 성격에 따라 전체 메뉴를 재분류",
    items: [
      "청소년센터 안내",
      "청소년 프로그램",
      "평생교육 프로그램",
      "동그라미 학교",
      "이용 안내",
      "소식",
    ],
  },
  {
    title: "Main Access",
    description: "첫 화면에서 탐색·신청·소식 확인으로 바로 진입",
    items: [
      "퀵메뉴",
      "모집 중인 프로그램",
      "맞춤 프로그램 탐색",
      "센터 일정",
      "공지/보도자료",
      "활동사진",
      "SNS",
    ],
  },
];

const architectureFlow = [
  {
    label: "Find",
    title: "정보 찾기",
    description: "사용자 목적에 맞는 메뉴와 프로그램 영역으로 진입",
  },
  {
    label: "Check",
    title: "내용 확인",
    description: "모집 상태, 대상, 일정, 활동 정보 확인",
  },
  {
    label: "Apply",
    title: "신청 이동",
    description: "프로그램 상세와 신청 행동으로 자연스럽게 연결",
  },
];

const SeoulYouthCenterInformationArchitectureStructure = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__information-architecture-structure"
        aria-labelledby="seoul-youth-center-information-architecture-structure-title"
      >
        <header className="seoul-youth-center__information-architecture-structure-header">
          <p className="seoul-youth-center__information-architecture-structure-eyebrow">
            11. Information Architecture
          </p>

          <h2 id="seoul-youth-center-information-architecture-structure-title">
            접근 구조 설계
          </h2>

          <p className="seoul-youth-center__information-architecture-structure-summary">
            리뉴얼에서는 전체 메뉴를 사용자 목적 기준으로 재정리하고,
            메인 화면에서 프로그램 탐색과 신청 진입점이 바로 드러나도록
            접근 구조를 설계했습니다.
          </p>
        </header>

        <div
          className="seoul-youth-center__information-architecture-structure-map"
          aria-label="접근 구조 설계 요약"
        >
          {architectureGroups.map(({ title, description, items }) => (
            <article
              className="seoul-youth-center__information-architecture-structure-group"
              key={title}
            >
              <div>
                <p>{title}</p>
                <h3>{description}</h3>
              </div>

              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <ol className="seoul-youth-center__information-architecture-structure-flow">
          {architectureFlow.map(({ label, title, description }) => (
            <li key={label}>
              <span>{label}</span>
              <div>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default SeoulYouthCenterInformationArchitectureStructure;