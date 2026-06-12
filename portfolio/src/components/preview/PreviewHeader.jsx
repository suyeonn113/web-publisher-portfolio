import { Link } from "react-router-dom";

const PreviewHeader = ({ project }) => {
  return (
    <header className="preview-header">
      <p>Responsive Preview</p>
      <h1>{project.title}</h1>
      <nav aria-label="프리뷰 링크">
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          실제 사이트 열기
        </a>
        <Link to={`/projects/${project.slug}`}>프로젝트 상세로 돌아가기</Link>
      </nav>
    </header>
  );
};

export default PreviewHeader;
