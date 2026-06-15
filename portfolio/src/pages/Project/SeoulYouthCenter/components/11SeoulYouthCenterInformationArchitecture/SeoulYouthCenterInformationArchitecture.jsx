import "./SeoulYouthCenterInformationArchitecture.scss";

const structureIssues = [
  {
    title: "신청 진입점의 위치 불명확",
    description:
      "프로그램을 신청하려는 사용자가 자연스럽게 청소년 프로그램 메뉴를 확인하게 되지만, 실제 모집 안내와 신청 포스터는 커뮤니티 게시판 안에 배치되어 있었습니다.",
  },
  {
    title: "게시판 중심의 정보 혼재",
    description:
      "공지, 모집 안내, 활동 사진, 보도자료처럼 성격이 다른 정보가 커뮤니티에 함께 묶여 있어 사용자가 정보의 목적을 예측하기 어려웠습니다.",
  },
  {
    title: "메인 화면의 역할 부족",
    description:
      "첫 화면이 프로그램 탐색이나 신청 행동으로 바로 이어지기보다, 여러 정보가 분산되어 노출되는 안내형 구조에 가까웠습니다.",
  },
];

const structureImprovements = [
  {
    title: "목적별 메뉴 재분류",
    description:
      "청소년센터 안내, 청소년 프로그램, 평생교육 프로그램, 이용 안내, 소식처럼 방문 목적과 콘텐츠 성격에 따라 메뉴를 재정리했습니다.",
  },
  {
    title: "신청 정보의 접근성 강화",
    description:
      "커뮤니티 안에 묶여 있던 모집 안내와 신청 정보를 프로그램 탐색 흐름 안에서 확인할 수 있도록 구조를 조정했습니다.",
  },
  {
    title: "메인 화면의 탐색 역할 강화",
    description:
      "모집 중인 프로그램과 맞춤 탐색 영역을 메인에 배치해 사용자가 첫 화면에서 참여 가능한 활동을 바로 확인할 수 있도록 했습니다.",
  },
];

const SeoulYouthCenterInformationArchitecture = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__information-architecture"
        aria-labelledby="seoul-youth-center-information-architecture-title"
      >
        <header className="seoul-youth-center__information-architecture-header">
          <p className="seoul-youth-center__information-architecture-eyebrow">
            11. Information Architecture
          </p>

          <h2 id="seoul-youth-center-information-architecture-title">
            정보 구조 설계
          </h2>

          <p className="seoul-youth-center__information-architecture-summary">
            기존 사이트는 프로그램 모집과 신청 정보가 커뮤니티 게시판
            안에 섞여 있어, <br />
            사용자가 프로그램을 탐색한 뒤 참여로
            이어지는 흐름을 파악하기 어려웠습니다.
          </p>
        </header>

        <div className="seoul-youth-center__information-architecture-compare">
          <article className="seoul-youth-center__information-architecture-panel">
            <p>Before</p>
            <h3>프로그램 신청 경로가 커뮤니티에 매몰됨</h3>

            <ul>
              {structureIssues.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="seoul-youth-center__information-architecture-panel">
            <p>After</p>
            <h3>탐색과 신청이 이어지는 구조로 재정리</h3>

            <ul>
              {structureImprovements.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
};

export default SeoulYouthCenterInformationArchitecture;