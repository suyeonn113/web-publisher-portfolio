import "./SeoulYouthCenterUiDesign.scss";
import { getPublicAssetPath } from "../../../../../utils/assetPaths";

const uiDesignFigmaUrl =
  "https://www.figma.com/design/iipzgdotDJzzW46sqkONIq/Responsive-Website-Renewal-Project---%EC%84%9C%EC%9A%B8%EC%8B%9C%EB%A6%BD%EC%B2%AD%EC%86%8C%EB%85%84%EC%84%BC%ED%84%B0-?node-id=465-2034&m=dev&t=o5twbfDtI8g3X7QH-1";

const pcUiImage = getPublicAssetPath(
  "images/projects/seoul-youth-center/ui-main-pc.png",
);

const uiDesignFrames = [
  {
    objectPosition: "center top",
    imageOffset: "0",
  },
  {
    objectPosition: "center 50%",
    imageOffset: "-6%",
  },
  {
    objectPosition: "center bottom",
    imageOffset: "-32%",
  },
];

const uiDesignPoints = [
  {
    title: "시각적 위계",
    description:
      "프로그램 탐색과 신청 행동이 먼저 보이도록 메인 콘텐츠의 우선순위를 정리했습니다.",
  },
  {
    title: "친근한 톤",
    description:
      "청소년센터의 공공성과 친근함이 함께 보이도록 밝은 이미지와 명확한 카드 구조를 사용했습니다.",
  },
  {
    title: "행동 유도",
    description:
      "퀵메뉴, 프로그램 카드, 맞춤 탐색처럼 사용자의 행동이 필요한 영역을 분명하게 구분했습니다.",
  },
];

const SeoulYouthCenterUiDesign = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__ui-design"
        aria-labelledby="seoul-youth-center-ui-design-title"
      >
        <header className="seoul-youth-center__ui-design-header">
          <p className="seoul-youth-center__ui-design-eyebrow">
            14. UI Design
          </p>

          <h2 id="seoul-youth-center-ui-design-title">
            디자인 시안
          </h2>

          <p className="seoul-youth-center__ui-design-summary">
            와이어프레임에서 정리한 메인 접근 구조를 바탕으로,
            PC 화면 기준의 최종 UI 시안을 구성했습니다. <br /> 
            콘텐츠 우선순위, 프로그램 탐색, 신청 진입점이 명확하게 드러나도록
            화면 구간별 시각 위계를 정리했습니다.
          </p>

          <a
            className="seoul-youth-center__ui-design-figma-link"
            href={uiDesignFigmaUrl}
            target="_blank"
            rel="noreferrer"
          >
            View UI Design in Figma
          </a>
        </header>

        <section className="seoul-youth-center__ui-design-section">
          <div className="seoul-youth-center__ui-design-section-heading">
            <p>PC Main UI Design</p>
            <h3>메인 화면 디자인 흐름</h3>
          </div>

          <div className="seoul-youth-center__ui-design-board">
            {uiDesignFrames.map(({ objectPosition, imageOffset }) => (
              <article
                className="seoul-youth-center__ui-design-frame"
                key={objectPosition}
              >
                <div className="seoul-youth-center__ui-design-viewport">
                  <img
                    src={pcUiImage}
                    alt="서울시립청소년센터 PC UI 디자인 화면 구간"
                    style={{
                      objectPosition,
                      "--ui-design-image-offset": imageOffset,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="seoul-youth-center__ui-design-note">
          <p>UI Direction</p>

          <ul>
            {uiDesignPoints.map(({ title, description }) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{description}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default SeoulYouthCenterUiDesign;
