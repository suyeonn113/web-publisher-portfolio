import "./SeoulYouthCenterWireframes.scss";
import { getPublicAssetPath } from "../../../../../utils/assetPaths";

const wireframeFigmaUrl =
  "https://www.figma.com/design/iipzgdotDJzzW46sqkONIq/Responsive-Website-Renewal-Project---%EC%84%9C%EC%9A%B8%EC%8B%9C%EB%A6%BD%EC%B2%AD%EC%86%8C%EB%85%84%EC%84%BC%ED%84%B0-?node-id=2-4&m=dev&t=o5twbfDtI8g3X7QH-1";

const pcWireframeImage = getPublicAssetPath(
  "images/projects/seoul-youth-center/wireframe-main-pc.png",
);

const pcFlowFrames = [
  {
    title: "진입",
    objectPosition: "center top",
    points: [
      {
        label: "Quick Menu",
        description: "사용 빈도가 높은 기능에 빠르게 접근",
        x: 32,
        y: 20,
      },
      {
        label: "Program",
        description: "모집 중인 프로그램을 우선 노출",
        x: 72,
        y: 70,
      },
    ],
  },
  {
    title: "탐색",
    objectPosition: "center 58%",
    imageOffset: "-6%",
    points: [
      {
        label: "Filter",
        description: "연령과 분야 중심 탐색 흐름 제공",
        x: 68,
        y: 20,
      },
      {
        label: "Schedule",
        description: "센터 일정을 달력 구조로 확인",
        x: 40,
        y: 54,
      },
    ],
  },
  {
    title: "확인",
    objectPosition: "center bottom",
    imageOffset: "-5%",
    points: [
      {
        label: "Notice",
        description: "운영 소식과 안내 정보를 정리",
        x: 50,
        y: 10,
      },
      {
        label: "Activity",
        description: "활동사진으로 참여 결과를 노출",
        x: 68,
        y: 58,
      },
      {
        label: "SNS",
        description: "외부 홍보 채널과 콘텐츠 연결",
        x: 26,
        y: 90,
      },
    ],
  },
];

const SeoulYouthCenterWireframes = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__wireframes seoul-youth-center__wireframes--pc-flow"
        aria-labelledby="seoul-youth-center-wireframes-pc-title"
      >
        <header className="seoul-youth-center__wireframes-header">
          <p className="seoul-youth-center__wireframes-eyebrow">
            13. Wireframes
          </p>

          <h2 id="seoul-youth-center-wireframes-pc-title">
            화면 구조 설계
          </h2>

          <p className="seoul-youth-center__wireframes-summary">
            PC 와이어프레임의 상단부터 일정 영역까지를 기준으로, <br />
            주요 탐색과 정보 확인 지점이 어떻게 배치되는지 정리했습니다.
          </p>

          <a
            className="seoul-youth-center__wireframes-figma-link"
            href={wireframeFigmaUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Wireframes in Figma
          </a>
        </header>

        <section className="seoul-youth-center__wireframes-section">
          <div className="seoul-youth-center__wireframes-section-heading">
            <p>PC Main Wireframe</p>
            <h3>메인 화면 주요 진입 구조</h3>
          </div>

          <div className="seoul-youth-center__wireframes-pc-flow">
            {pcFlowFrames.map(({ title, objectPosition, imageOffset, points }) => (
              <article
                className="seoul-youth-center__wireframes-flow-frame"
                key={title}
              >
                <div className="seoul-youth-center__wireframes-flow-label">
                  <p>{title}</p>
                </div>

                <div className="seoul-youth-center__wireframes-flow-viewport">
                  <img
                    src={pcWireframeImage}
                    alt={`서울시립청소년센터 PC 와이어프레임 ${title} 구간`}
                    style={{
                      objectPosition,
                      "--wireframe-image-offset": imageOffset,
                    }}
                  />

                  <ol className="seoul-youth-center__wireframes-points">
                    {points.map(({ label, description, x, y }) => (
                      <li
                        key={label}
                        style={{
                          "--point-x": `${x}%`,
                          "--point-y": `${y}%`,
                        }}
                      >
                        <span>{label}</span>
                        <p>{description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default SeoulYouthCenterWireframes;
