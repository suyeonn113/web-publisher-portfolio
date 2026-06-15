import "./SeoulYouthCenterWireframes.scss";
import { getPublicAssetPath } from "../../../../../utils/assetPaths";

const responsiveSections = [
  {
    title: "Recommend",
    description: "PC는 여러 프로그램을 비교하기 쉽게, 모바일은 세로 탐색과 터치 흐름에 맞춰 정리했습니다.",
    images: [
      {
        label: "PC",
        variant: "pc",
        src: getPublicAssetPath(
          "images/projects/seoul-youth-center/wireframe-recommend-pc.png",
        ),
        alt: "서울시립청소년센터 추천 프로그램 PC 와이어프레임",
      },
      {
        label: "Mobile",
        variant: "mobile",
        src: getPublicAssetPath(
          "images/projects/seoul-youth-center/wireframe-recommend-mobile.png",
        ),
        alt: "서울시립청소년센터 추천 프로그램 모바일 와이어프레임",
      },
    ],
  },
  {
    title: "Schedule",
    description: "PC는 달력과 목록을 함께 보여주고, 모바일은 필요한 일정 확인에 집중했습니다.",
    images: [
      {
        label: "PC",
        variant: "pc",
        src: getPublicAssetPath(
          "images/projects/seoul-youth-center/wireframe-schedule-pc.png",
        ),
        alt: "서울시립청소년센터 일정 섹션 PC 와이어프레임",
      },
      {
        label: "Mobile",
        variant: "mobile",
        src: getPublicAssetPath(
          "images/projects/seoul-youth-center/wireframe-schedule-mobile.png",
        ),
        alt: "서울시립청소년센터 일정 섹션 모바일 와이어프레임",
      },
    ],
  },
  {
    title: "Navigation",
    description: "넓은 화면은 전체 메뉴 탐색을, 모바일은 엄지 조작 중심의 빠른 이동을 우선했습니다.",
    images: [
      {
        label: "PC",
        variant: "pc",
        src: getPublicAssetPath(
          "images/projects/seoul-youth-center/wireframe-navigation-pc.png",
        ),
        alt: "서울시립청소년센터 PC 헤더와 전체 메뉴 와이어프레임",
      },
      {
        label: "Mobile",
        variant: "mobile",
        src: getPublicAssetPath(
          "images/projects/seoul-youth-center/wireframe-navigation-mobile.png",
        ),
        alt: "서울시립청소년센터 모바일 하단바와 메뉴서랍 와이어프레임",
      },
    ],
  },
];

const renderDescription = (description) =>
  description.split(",").map((line, index, lines) => (
    <span key={line}>
      {line}
      {index < lines.length - 1 ? "," : null}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));

const SeoulYouthCenterSectionResponsiveWireframes = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__wireframes seoul-youth-center__wireframes--section-responsive"
        aria-labelledby="seoul-youth-center-section-responsive-wireframes-title"
      >
        <header className="seoul-youth-center__wireframes-header">
          <p className="seoul-youth-center__wireframes-eyebrow">
            13. Wireframes
          </p>

          <h2 id="seoul-youth-center-section-responsive-wireframes-title">
            섹션별 반응형 구조 설계
          </h2>

          <p className="seoul-youth-center__wireframes-summary">
            추천 프로그램, 일정, 내비게이션처럼 사용 맥락이 다른 영역은
            PC와 모바일에서 배치와 조작 방식을 다르게 설계했습니다.
          </p>
        </header>

        <div className="seoul-youth-center__wireframes-section-compare">
          {responsiveSections.map(({ title, description, images }) => (
            <article
              className="seoul-youth-center__wireframes-section-card"
              key={title}
            >
              <div className="seoul-youth-center__wireframes-section-card-heading">
                <p>{title}</p>
                <h3>{renderDescription(description)}</h3>
              </div>

              <div className="seoul-youth-center__wireframes-section-pair">
                {images.map(({ label, variant, src, alt }) => (
                  <figure
                    className={`seoul-youth-center__wireframes-section-shot is-${variant}`}
                    key={label}
                  >
                    <figcaption>{label}</figcaption>
                    <div>
                      <img src={src} alt={alt} />
                    </div>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SeoulYouthCenterSectionResponsiveWireframes;
