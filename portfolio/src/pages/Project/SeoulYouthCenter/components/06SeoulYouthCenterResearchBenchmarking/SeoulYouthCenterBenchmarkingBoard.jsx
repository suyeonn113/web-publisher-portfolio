import "./SeoulYouthCenterResearchBenchmarking.scss";
import { getPublicAssetPath } from "../../../../../utils/assetPaths";

const benchmarkImages = [
  {
    src: getPublicAssetPath("images/projects/seoul-youth-center/benchmark-gov24.png"),
    alt: "정부24 대표 화면",
  },
  {
    src: getPublicAssetPath("images/projects/seoul-youth-center/benchmark-sen.png"),
    alt: "서울특별시교육청 대표 화면",
  },
  {
    src: getPublicAssetPath("images/projects/seoul-youth-center/benchmark-youth-info.png"),
    alt: "서울시청소년몽땅정보통 대표 화면",
  },
  {
    src: getPublicAssetPath("images/projects/seoul-youth-center/benchmark-youth-facility.png"),
    alt: "청소년시설 대표 화면",
  },
];

const SeoulYouthCenterBenchmarkingBoard = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__research-benchmarking-board"
        aria-labelledby="seoul-youth-center-research-benchmarking-board-title"
      >
        <header className="seoul-youth-center__research-benchmarking-board-header">
          <p className="seoul-youth-center__research-benchmarking-board-eyebrow">
            06. Research &amp; Benchmarking
          </p>

          <h2 id="seoul-youth-center-research-benchmarking-board-title">
            벤치마킹 화면 비교
          </h2>

          <p className="seoul-youth-center__research-benchmarking-board-summary">
            공공 포털과 청소년 기관의 대표 화면을 함께 배치해
            정보 구조, 접근성, 탐색 흐름의 차이를 비교했습니다.
          </p>
        </header>

        <figure
          className="seoul-youth-center__research-benchmarking-media"
          aria-label="벤치마킹 대상 사이트 캡쳐 영역"
        >
          {/* 이미지 가이드: 아래 파일명으로 각각 저장하면 코드에서 2x2 벤치마킹 보드로 자동 배치합니다.
              - benchmark-gov24.png
              - benchmark-sen.png
              - benchmark-youth-info.png
              - benchmark-youth-facility.png
              저장 위치: public/images/projects/seoul-youth-center/
              권장 캡쳐: 사이트 대표 화면 상단이 보이는 16:9 또는 4:3 비율 */}
          {benchmarkImages.map(({ src, alt }) => (
            <div
              className="seoul-youth-center__research-benchmarking-shot"
              key={src}
            >
              <img
                src={src}
                alt={alt}
              />
            </div>
          ))}
        </figure>
      </section>
    </div>
  );
};

export default SeoulYouthCenterBenchmarkingBoard;
