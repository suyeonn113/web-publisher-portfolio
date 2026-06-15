import "./SeoulYouthCenterWireframes.scss";
import { getPublicAssetPath } from "../../../../../utils/assetPaths";

const responsiveWireframes = [
  {
    title: "PC",
    className: "is-pc",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/wireframe-main-pc.png",
    ),
    alt: "서울시립청소년센터 메인 PC 와이어프레임",
  },
  {
    title: "Tablet",
    className: "is-tablet",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/wireframe-main-tablet.png",
    ),
    alt: "서울시립청소년센터 메인 태블릿 와이어프레임",
  },
  {
    title: "Mobile",
    className: "is-mobile",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/wireframe-main-mobile.png",
    ),
    alt: "서울시립청소년센터 메인 모바일 와이어프레임",
  },
];

const SeoulYouthCenterResponsiveWireframes = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__wireframes seoul-youth-center__wireframes--responsive-set"
        aria-labelledby="seoul-youth-center-wireframes-responsive-title"
      >
        <header className="seoul-youth-center__wireframes-header">
          <p className="seoul-youth-center__wireframes-eyebrow">
            13. Wireframes
          </p>

          <h2 id="seoul-youth-center-wireframes-responsive-title">
            반응형 화면 구조 설계
          </h2>

          <p className="seoul-youth-center__wireframes-summary">
            동일한 메인 구조를 PC, 태블릿, 모바일에 맞게 재배치하여
            기기별 정보 흐름과 화면 밀도를 검토했습니다.
          </p>
        </header>

        <section className="seoul-youth-center__wireframes-section">
          <div className="seoul-youth-center__wireframes-section-heading">
            <p>Responsive Wireframe Set</p>
            <h3>기기별 구조 비교</h3>
          </div>

          <div className="seoul-youth-center__wireframes-responsive-board">
            {responsiveWireframes.map(({ title, className, src, alt }) => (
              <figure
                className={`seoul-youth-center__wireframes-device-frame ${className}`}
                key={title}
              >
                <div className="seoul-youth-center__wireframes-device-label">
                  <p>{title}</p>
                </div>

                <div className="seoul-youth-center__wireframes-device-viewport">
                  <img src={src} alt={alt} />
                </div>
              </figure>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default SeoulYouthCenterResponsiveWireframes;
