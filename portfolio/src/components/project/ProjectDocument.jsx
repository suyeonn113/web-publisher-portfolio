import { dateRange, roleText, text } from '../../utils/projectText';

function getVisual(project) {
  const visuals = project?.hero?.visuals || {};
  return visuals.pc || visuals.tablet || visuals.mobile || Object.values(visuals)[0] || null;
}

function ProjectHeroVisual({ project }) {
  const visual = getVisual(project);

  if (!visual?.screen) return null;

  return (
    <figure className="project-doc__visual">
      <img src={`./${visual.screen}`} alt={visual.alt || ''} loading="lazy" />
    </figure>
  );
}

function ProjectIntro({ project }) {
  const meta = project.meta || {};
  const hero = project.hero || {};

  return (
    <section className="project-doc__section project-doc__section--intro" data-preview-section="intro">
      <p className="project-doc__eyebrow">{meta.label || 'Project'}</p>
      <div className="project-doc__intro-grid">
        <div>
          <h1 className="project-doc__title">{meta.title || project.title}</h1>
          <p className="project-doc__description">{text(hero.description, project.summary?.overview)}</p>
          <a className="project-doc__case-link" href={meta.liveLink || '#'} target="_blank" rel="noreferrer">
            View case study
          </a>
        </div>
        <ProjectHeroVisual project={project} />
      </div>
    </section>
  );
}

function ProjectSummary({ project }) {
  const summary = project.summary || {};
  const meta = project.meta || {};

  return (
    <section className="project-doc__section" data-preview-section="summary">
      <p className="project-doc__eyebrow">Overview</p>
      <div className="project-doc__copy-grid">
        <h2 className="project-doc__section-title">From Ambiguity to Impact</h2>
        <div className="project-doc__copy-stack">
          <p>{summary.overview}</p>
          <dl className="project-doc__meta">
            <div>
              <dt>Period</dt>
              <dd>{dateRange(meta)}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{roleText(meta.role)}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{meta.projectType}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function ProjectFlows({ project }) {
  const flows = project.flows || project.keyFlows || [];

  if (!flows.length) return null;

  return (
    <section className="project-doc__section" data-preview-section="flows">
      <p className="project-doc__eyebrow">Process</p>
      <div className="project-doc__list-grid">
        {flows.slice(0, 6).map((flow) => (
          <article className="project-doc__list-item" key={flow.id || flow.title}>
            <h2>{flow.title}</h2>
            <p>{flow.summary || flow.keyPoint}</p>
            <a className="project-doc__case-link" href={`#${flow.id || ''}`}>
              View case study
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectHighlights({ project }) {
  const highlights = project.highlights || [];

  if (!highlights.length) return null;

  return (
    <section className="project-doc__section" data-preview-section="highlights">
      <p className="project-doc__eyebrow">Outcomes</p>
      <div className="project-doc__list-grid project-doc__list-grid--compact">
        {highlights.slice(0, 4).map((item) => (
          <article className="project-doc__list-item" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.description || item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectDocument({ project, variant = 'full' }) {
  if (!project) return null;

  return (
    <article className={`project-doc project-doc--${variant}`}>
      <ProjectIntro project={project} />
      <ProjectSummary project={project} />
      <ProjectFlows project={project} />
      <ProjectHighlights project={project} />
    </article>
  );
}

export default ProjectDocument;
