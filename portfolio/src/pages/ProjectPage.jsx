import { Link, useParams } from 'react-router-dom';
import ProjectDocument from '../components/project/ProjectDocument';
import { ROUTES } from '../constants/routes';
import { useProject } from '../hooks/useProjects';

function ProjectPage() {
  const { slug } = useParams();
  const { project, isLoading, error } = useProject(slug);

  return (
    <main className="project-page" data-page="project">
      <div className="project-page__topbar">
        <Link className="project-page__back" to={ROUTES.home}>
          Menu
        </Link>
      </div>
      {isLoading && <p className="project-page__state">Loading...</p>}
      {error && <p className="project-page__state">Failed to load project.</p>}
      {project && <ProjectDocument project={project} />}
    </main>
  );
}

export default ProjectPage;
