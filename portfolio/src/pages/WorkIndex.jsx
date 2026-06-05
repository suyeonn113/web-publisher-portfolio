import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectPreview from '../components/project/ProjectPreview';
import StaticPagePreview from '../components/project/StaticPagePreview';
import { ROUTES } from '../constants/routes';
import { useProjectIndex } from '../hooks/useProjects';

const RETURN_KEY = 'portfolio:return';

function animatePreviewToDetail(node, onComplete) {
  if (!node) {
    onComplete();
    return;
  }

  const rect = node.getBoundingClientRect();
  const clone = node.cloneNode(true);

  clone.classList.add('project-preview--opening');

  Object.assign(clone.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: 0,
    zIndex: 2000,
    pointerEvents: 'none',
    transition: 'left 560ms cubic-bezier(0.16, 1, 0.3, 1), top 560ms cubic-bezier(0.16, 1, 0.3, 1), width 560ms cubic-bezier(0.16, 1, 0.3, 1), height 560ms cubic-bezier(0.16, 1, 0.3, 1)',
  });

  document.body.appendChild(clone);
  document.body.classList.add('is-project-opening');

  requestAnimationFrame(() => {
    clone.style.left = '0px';
    clone.style.top = '0px';
    clone.style.width = `${window.innerWidth}px`;
    clone.style.height = `${window.innerHeight}px`;
  });

  window.setTimeout(() => {
    clone.remove();
    document.body.classList.remove('is-project-opening');
    onComplete();
  }, 590);
}

function WorkIndex() {
  const navigate = useNavigate();
  const previewRefs = useRef(new Map());
  const { projects, isLoading, error } = useProjectIndex();

  useEffect(() => {
    const raw = sessionStorage.getItem(RETURN_KEY);
    if (!raw) return;

    const state = JSON.parse(raw);
    sessionStorage.removeItem(RETURN_KEY);

    requestAnimationFrame(() => {
      const target = previewRefs.current.get(state.slug);
      if (target) {
        target.closest('.work-page__item')?.scrollIntoView({ block: 'start' });
        return;
      }

      if (Number.isFinite(state.scrollY)) {
        window.scrollTo({ top: state.scrollY, left: 0 });
      }
    });
  }, [projects]);

  const registerNode = (slug, node) => {
    if (!node) {
      previewRefs.current.delete(slug);
      return;
    }

    previewRefs.current.set(slug, node);
  };

  const openProject = (project) => {
    const node = previewRefs.current.get(project.slug);

    sessionStorage.setItem(
      RETURN_KEY,
      JSON.stringify({
        slug: project.slug,
        scrollY: window.scrollY,
      })
    );

    animatePreviewToDetail(node, () => {
      navigate(ROUTES.project(project.slug));
    });
  };

  const openStaticPage = (page) => {
    const node = previewRefs.current.get(page);

    sessionStorage.setItem(
      RETURN_KEY,
      JSON.stringify({
        slug: page,
        scrollY: window.scrollY,
      })
    );

    animatePreviewToDetail(node, () => {
      navigate(page === 'resume' ? ROUTES.resume : ROUTES.introduction);
    });
  };

  return (
    <main className="work-page" data-page="work">
      <h1 className="visually-hidden">Work Index</h1>
      <div className="work-page__inner">
        {isLoading && <p className="work-page__state">Loading...</p>}
        {error && <p className="work-page__state">Failed to load works.</p>}
        <ul className="work-page__list" aria-label="Work list">
          <li className="work-page__item">
            <button
              className="work-page__trigger"
              type="button"
              onClick={() => openStaticPage('introduction')}
            >
              <span className="work-page__item-title">Introduction</span>
              <StaticPagePreview page="introduction" registerNode={registerNode} />
            </button>
          </li>
          <li className="work-page__item">
            <button
              className="work-page__trigger"
              type="button"
              onClick={() => openStaticPage('resume')}
            >
              <span className="work-page__item-title">Resume</span>
              <StaticPagePreview page="resume" registerNode={registerNode} />
            </button>
          </li>
          {projects.map((project) => (
            <li className="work-page__item" key={project.id || project.slug}>
              <button
                className="work-page__trigger"
                type="button"
                onClick={() => openProject(project)}
              >
                <span className="work-page__item-title">{project.title}</span>
                <ProjectPreview project={project} registerNode={registerNode} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default WorkIndex;
