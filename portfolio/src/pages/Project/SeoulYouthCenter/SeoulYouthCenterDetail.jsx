import { getProjectBySlug } from "../../../data/projects";
import { prepareProjectDetail } from "../../../utils/projectHelpers";
import "./SeoulYouthCenterDetail.scss";

const coverImages = {
  desktop: "/images/projects/seoul-youth-center/main-desktop.webp",
  mobile: "/images/projects/seoul-youth-center/main-mobile.webp",
};

const coverCopy = {
  eyebrow: "Case Study · Responsive Web",
  title: "서청센 웹사이트 리뉴얼",
  summary:
    "복잡한 공공기관 정보를 명확한 정보 구조와 반응형 메뉴로 재구성한 웹 퍼블리싱 프로젝트입니다.",
};

const formatPeriodLabel = ({ start, end }) => {
  const formatDate = (date) => date.replace("-", ".");

  return `${formatDate(start)} - ${end ? formatDate(end) : "Present"}`;
};

const SeoulYouthCenterDetail = () => {
  const project = getProjectBySlug("seoul-youth-center");

  if (!project) {
    return <p>Project information was not found.</p>;
  }

  const projectDetail = prepareProjectDetail(project);

  return (
    <main className="seoul-youth-center">
      <div className="ppt-page-wrap seoul-youth-center__cover-wrap">
        <section
          className="ppt-page seoul-youth-center__cover"
          aria-labelledby="seoul-youth-center-title"
        >
          <div className="seoul-youth-center__cover-copy">
            <p className="seoul-youth-center__eyebrow">
              {coverCopy.eyebrow}
            </p>

            <div className="seoul-youth-center__heading">
              <p>{project.englishTitle}</p>

              <h1 id="seoul-youth-center-title">{coverCopy.title}</h1>
            </div>

            <p className="seoul-youth-center__summary">
              {coverCopy.summary}
            </p>

            <dl className="seoul-youth-center__meta">
              <div>
                <dt>기간</dt>
                <dd>{formatPeriodLabel(project.period)}</dd>
              </div>

              <div>
                <dt>유형</dt>
                <dd>{projectDetail.workTypeLabel}</dd>
              </div>

              <div>
                <dt>역할</dt>
                <dd>{projectDetail.responsibilityLabel}</dd>
              </div>

              <div>
                <dt>기술</dt>
                <dd>
                  <ul className="seoul-youth-center__tech-list">
                    {projectDetail.techItems.map(({ key, label, Icon }) => (
                      <li key={key}>
                        {Icon ? <Icon size={18} aria-hidden="true" /> : null}
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="seoul-youth-center__links no-print">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View website
                </a>
              ) : null}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View GitHub
                </a>
              ) : null}
            </div>
          </div>

          <figure
            className="seoul-youth-center__cover-visual"
            aria-label="서청센 반응형 메인 화면"
          >
            <div className="seoul-youth-center__desktop-screen">
              <img
                src={coverImages.desktop}
                alt="서청센 데스크톱 메인 화면"
              />
            </div>

            <div className="seoul-youth-center__mobile-screen">
              <img
                src={coverImages.mobile}
                alt="서청센 모바일 메인 화면"
              />
            </div>
          </figure>
        </section>
      </div>
    </main>
  );
};

export default SeoulYouthCenterDetail;
