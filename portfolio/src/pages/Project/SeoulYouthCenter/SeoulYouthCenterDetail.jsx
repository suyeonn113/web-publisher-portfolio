import { getProjectBySlug } from "../../../data/projects";
import { prepareProjectDetail } from "../../../utils/projectHelpers";
import "./SeoulYouthCenterDetail.scss";

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
              {projectDetail.eyebrow}
            </p>

            <div className="seoul-youth-center__heading">
              <p>{project.englishTitle}</p>

              <h1 id="seoul-youth-center-title">{project.title}</h1>
            </div>

            <p className="seoul-youth-center__summary">
              {project.summary}
            </p>

            <dl className="seoul-youth-center__meta">
              <div>
                <dt>기간</dt>
                <dd>{projectDetail.periodLabel}</dd>
              </div>

              <div>
                <dt>프로젝트 유형</dt>
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

            <div className="seoul-youth-center__links">
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

          <figure className="seoul-youth-center__cover-visual">
            <img
              src={project.coverImage}
              alt={project.coverAlt}
            />
          </figure>
        </section>
      </div>
    </main>
  );
};

export default SeoulYouthCenterDetail;
