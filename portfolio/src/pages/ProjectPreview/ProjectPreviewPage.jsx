import { useParams } from "react-router-dom";

import { ResponsivePreviewPage } from "../../components/preview";
import { getProjectBySlug } from "../../data/projects";
import { getProjectPreviewById } from "../../data/projectPreviews";
import { NotFoundPage } from "../NotFound";

const ProjectPreviewPage = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const preview = project ? getProjectPreviewById(project.id) : null;

  if (!project) {
    return <NotFoundPage />;
  }

  if (!preview) {
    return <NotFoundPage project={project} />;
  }

  return (
    <ResponsivePreviewPage
      project={project}
      preview={preview}
    />
  );
};

export default ProjectPreviewPage;
