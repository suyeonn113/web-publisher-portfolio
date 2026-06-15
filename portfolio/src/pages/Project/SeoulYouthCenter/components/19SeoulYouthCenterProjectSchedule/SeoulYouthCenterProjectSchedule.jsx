import "./SeoulYouthCenterProjectSchedule.scss";

const scheduleWeeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

const scheduleSteps = [
  {
    label: "01",
    period: "Week 1",
    title: "기획 및 자료 조사",
    description: "기존 사이트 분석, 사용자 상황 정리, 벤치마킹 기준 수립",
    start: 1,
    duration: 1,
  },
  {
    label: "02",
    period: "Week 1 - Week 2",
    title: "정보 구조 및 사용자 흐름 설계",
    description: "메뉴 구조 재정리, 메인 접근 구조, 프로그램 신청 흐름 설계",
    start: 1,
    duration: 2,
  },
  {
    label: "03",
    period: "Week 2 - Week 3",
    title: "와이어프레임 및 UI 디자인",
    description: "PC·태블릿·모바일 와이어프레임과 최종 UI 시안 제작",
    start: 2,
    duration: 2,
  },
  {
    label: "04",
    period: "Week 3 - Week 4",
    title: "반응형 퍼블리싱",
    description: "반응형 레이아웃, 메인 섹션, 카드 UI, 모바일 내비게이션 구현",
    start: 3,
    duration: 2,
  },
  {
    label: "05",
    period: "Week 4 - Week 5",
    title: "PHP·MySQL 연동",
    description: "프로그램, 신청, 게시판 데이터 흐름 연결",
    start: 4,
    duration: 2,
  },
  {
    label: "06",
    period: "Week 5",
    title: "테스트 및 최종 보완",
    description: "디바이스별 화면 확인, 신청 흐름 점검, 콘텐츠 정리",
    start: 5,
    duration: 1,
  },
];

const SeoulYouthCenterProjectSchedule = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__project-schedule"
        aria-labelledby="seoul-youth-center-project-schedule-title"
      >
        <header className="seoul-youth-center__project-schedule-header">
          <p className="seoul-youth-center__project-schedule-eyebrow">
            19. Project Schedule
          </p>

          <h2 id="seoul-youth-center-project-schedule-title">
            프로젝트 일정
          </h2>

          <p className="seoul-youth-center__project-schedule-summary">
            프로젝트는 약 5주 동안 분석, 설계, 디자인, 퍼블리싱,
            데이터 연동, 테스트의 흐름으로 진행했습니다. <br /> 각 단계가
            분리되지 않고 다음 작업으로 이어지도록 주차별 진행 범위를
            조정했습니다.
          </p>
        </header>

        <section className="seoul-youth-center__project-schedule-board">
          <div className="seoul-youth-center__project-schedule-heading">
            <div>
              <p>5-Week Timeline</p>
              <h3>3월 - 4월 진행 일정</h3>
            </div>

            <div className="seoul-youth-center__project-schedule-weeks">
              {scheduleWeeks.map((week) => (
                <span key={week}>{week}</span>
              ))}
            </div>
          </div>

          <ol className="seoul-youth-center__project-schedule-list">
            {scheduleSteps.map(
              ({ label, title, description, start, duration }) => (
                <li
                  className="seoul-youth-center__project-schedule-row"
                  key={title}
                >
                  <div className="seoul-youth-center__project-schedule-info">
                    <span>{label}</span>

                    <div>
                      <strong>{title}</strong>
                      <small>{description}</small>
                    </div>
                  </div>

                  <div className="seoul-youth-center__project-schedule-track">
                    {scheduleWeeks.map((week) => (
                      <span key={`${title}-${week}`} aria-hidden="true" />
                    ))}

                    <div
                      className="seoul-youth-center__project-schedule-bar"
                      style={{
                        gridColumn: `${start} / span ${duration}`,
                      }}
                    >
                      <span>{title}</span>
                    </div>
                  </div>
                </li>
              ),
            )}
          </ol>
        </section>
      </section>
    </div>
  );
};

export default SeoulYouthCenterProjectSchedule;