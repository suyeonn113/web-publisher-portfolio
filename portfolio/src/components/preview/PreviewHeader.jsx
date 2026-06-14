const PreviewHeader = ({ project }) => {
  return (
    <header className="preview-header">
      <p>Responsive Preview</p>
      <h1>{project.title}</h1>
      <nav aria-label="프리뷰 링크">
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          실제 사이트 보기
        </a>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub 보기
          </a>
        )}
      </nav>
    </header>
  );
};

export default PreviewHeader;
