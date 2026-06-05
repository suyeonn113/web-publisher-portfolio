import { useEffect, useState } from 'react';
import ProjectDocument from './ProjectDocument';
import { fetchProject } from '../../services/projects';

function ProjectPreview({ project, registerNode }) {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let isAlive = true;

    fetchProject(project.slug)
      .then((data) => {
        if (!isAlive) return;
        setDetail(data);
      })
      .catch(() => {
        if (!isAlive) return;
        setDetail(null);
      });

    return () => {
      isAlive = false;
    };
  }, [project.slug]);

  return (
    <div
      className="project-preview"
      data-project-preview={project.slug}
      ref={(node) => registerNode(project.slug, node)}
    >
      {detail ? (
        <div className="project-preview__scale">
          <ProjectDocument project={detail} variant="preview" />
        </div>
      ) : (
        <div className="project-preview__fallback">
          <p>{project.title}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectPreview;
