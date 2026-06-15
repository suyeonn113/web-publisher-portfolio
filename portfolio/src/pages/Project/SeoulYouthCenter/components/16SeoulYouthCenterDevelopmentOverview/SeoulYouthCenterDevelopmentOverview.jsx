import { getProjectTechItems } from "../../../../../utils/projectHelpers";
import { getPublicAssetPath } from "../../../../../utils/assetPaths";
import "./SeoulYouthCenterDevelopmentOverview.scss";

const developmentScreens = [
  {
    title: "PC",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/development-main-pc.png",
    ),
    alt: "서울시립청소년센터 PC 구현 화면",
    note: "PC 실제 구현 메인 화면",
  },
  {
    title: "Tablet",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/development-main-tablet.png",
    ),
    alt: "서울시립청소년센터 태블릿 구현 화면",
    note: "태블릿 실제 구현 메인 화면",
  },
  {
    title: "Mobile",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/development-main-mobile.png",
    ),
    alt: "서울시립청소년센터 모바일 구현 화면",
    note: "모바일 실제 구현 메인 화면",
  },
];

const developmentPoints = [
  {
    title: "Publishing",
    description: "반응형 레이아웃, 메인 섹션, 카드 UI, 모바일 내비게이션 구현",
  },
  {
    title: "Interaction",
    description: "메인 슬라이드, 프로그램 슬라이더, 필터, 탭 조작 요소 구현",
  },
  {
    title: "PHP",
    description: "프로그램, 게시판, 신청 관련 페이지의 서버 사이드 구조 구성",
  },
  {
    title: "MySQL",
    description: "프로그램 정보, 신청 데이터, 게시글 데이터 저장 구조 설계",
  },
];

const SeoulYouthCenterDevelopmentOverview = ({ project }) => {
  const toolItems = getProjectTechItems(project?.tech);

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
            기획과 UI 디자인을 바탕으로 HTML, SCSS, JavaScript,
            PHP, MySQL을 활용해 반응형 웹사이트를 구현했습니다. <br />
            메인 화면, 프로그램 탐색, 신청 흐름, 게시판 구조를
            실제 사용 가능한 페이지로 연결하는 데 중점을 두었습니다.
          </p>
        </header>

        <div className="seoul-youth-center__development-overview-layout">
          <section className="seoul-youth-center__development-overview-preview">
            <div className="seoul-youth-center__development-overview-section-heading">
              <p>Implemented Screens</p>
              <h3>반응형 구현 화면</h3>
            </div>

            <div className="seoul-youth-center__development-overview-screens">
              {developmentScreens.map(({ title, src, alt, note }) => (
                <figure key={title}>
                  {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
                  <img src={src} alt={alt} />
                  <figcaption>{title}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <aside className="seoul-youth-center__development-overview-points">
            <div className="seoul-youth-center__development-overview-section-heading">
              <p>Development Points</p>
              <h3>구현 포인트</h3>
            </div>

            <ul>
              {developmentPoints.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="seoul-youth-center__development-overview-tools">
          <div className="seoul-youth-center__development-overview-section-heading">
            <p>Tools &amp; Stack</p>
            <h3>사용 기술 및 도구</h3>
          </div>

          <ul>
            {toolItems.map(({ key, label, Icon }) => (
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
        </section>
      </section>
    </div>
  );
};

export default SeoulYouthCenterDevelopmentOverview;