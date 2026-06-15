import { getPublicAssetPath } from "../../../../../utils/assetPaths";
import "./SeoulYouthCenterDesignSystem.scss";

const programCardImage = getPublicAssetPath(
  "images/projects/seoul-youth-center/design-system-program-card.png",
);

const colorItems = [
  { name: "Orange", value: "#FF8A3D" },
  { name: "Purple", value: "#D946EF" },
  { name: "Text", value: "#1F2937" },
  { name: "Surface", value: "#F8F8F8" },
];

const typeSamples = [
  { label: "Section", text: "프로그램 탐색" },
  { label: "Card", text: "청소년 프로그램 카드" },
  { label: "Body", text: "모집 기간과 대상 정보를 확인합니다." },
];

const buttonItems = ["신청하기", "신청 확인", "필터 선택", "접수중"];

const responsiveRules = [
  "PC: 1200px 컨테이너, 프로그램 4열, 홈 퀵메뉴 노출",
  "Tablet: 768px부터 필터 7열, 추천 결과 2열로 확장",
  "Mobile: 1열 흐름과 하단바·메뉴서랍 중심 이동",
];

const designSystemItems = [
  {
    number: "01",
    title: "Color",
    description: "오렌지와 퍼플 포인트, 텍스트, 표면 컬러를 토큰화했습니다.",
    type: "color",
  },
  {
    number: "02",
    title: "Typography",
    description: "섹션 제목, 카드 제목, 본문, 배지 텍스트 크기를 분리했습니다.",
    type: "typography",
  },
  {
    number: "03",
    title: "Buttons & Tags",
    description: "신청, 확인, 필터 선택, 접수 상태의 색상 규칙을 구분했습니다.",
    type: "buttons",
  },
  {
    number: "04",
    title: "Program Card",
    description: "포스터 비율, 모집 배지, 제목, 기간, 해시태그를 카드에 통합했습니다.",
    type: "card",
  },
  {
    number: "05",
    title: "Responsive Rule",
    description: "600, 768, 1024, 1248px 기준으로 그리드와 메뉴 방식을 조정했습니다.",
    type: "responsive",
  },
];

const renderPreview = (type) => {
  if (type === "color") {
    return (
      <div className="seoul-youth-center__design-system-color-set">
        {colorItems.map(({ name, value }) => (
          <div key={name}>
            <span style={{ backgroundColor: value }} />
            <p>{name}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === "typography") {
    return (
      <div className="seoul-youth-center__design-system-type-set">
        {typeSamples.map(({ label, text }) => (
          <div key={label}>
            <span>{label}</span>
            <p>{text}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === "buttons") {
    return (
      <div className="seoul-youth-center__design-system-button-set">
        {buttonItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className="seoul-youth-center__design-system-program-card">
        <div className="seoul-youth-center__design-system-program-card-image">
          <img
            src={programCardImage}
            alt="2026년 청소년 성장역량 부트캠프 스스로 업 프로젝트 참가자 모집 포스터"
          />
          <span>모집중</span>
        </div>

        <div className="seoul-youth-center__design-system-program-card-body">
          <strong>
            2026년 청소년 성장역량 부트캠프
          </strong>
          <p>2026.03.24 ~ 2026.04.08</p>
          <ul>
            <li>역량성장</li>
            <li>부트캠프</li>
            <li>초등고학년</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <ul className="seoul-youth-center__design-system-responsive-set">
      {responsiveRules.map((rule) => (
        <li key={rule}>{rule}</li>
      ))}
    </ul>
  );
};

const SeoulYouthCenterDesignSystem = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__design-system"
        aria-labelledby="seoul-youth-center-design-system-title"
      >
        <header className="seoul-youth-center__design-system-header">
          <p className="seoul-youth-center__design-system-eyebrow">
            15. Design System &amp; Style Guide
          </p>

          <h2 id="seoul-youth-center-design-system-title">
            디자인 시스템 및 스타일 가이드
          </h2>

          <p className="seoul-youth-center__design-system-summary">
            반복되는 UI 요소를 일관되게 사용할 수 있도록 컬러,
            타이포그래피, 버튼, 태그, 카드 스타일을 정리했습니다. <br />
            밝고 친근한 분위기를 유지하면서도 프로그램 상태와 신청
            행동이 명확하게 보이도록 구성했습니다.
          </p>
        </header>

        <ol className="seoul-youth-center__design-system-list">
          {designSystemItems.map(({ number, title, description, type }) => (
            <li key={title}>
              <div className="seoul-youth-center__design-system-card-heading">
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>

              <div className="seoul-youth-center__design-system-preview">
                {renderPreview(type)}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default SeoulYouthCenterDesignSystem;
