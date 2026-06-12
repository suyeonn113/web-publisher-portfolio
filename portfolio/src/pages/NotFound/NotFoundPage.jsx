import { Link } from "react-router-dom";

const NotFoundPage = ({ project }) => {
  return (
    <main className="not-found-page" role="status">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>
        <span>요청한 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</span>
        <span>실제 사이트를 확인하거나 포트폴리오 메인으로 돌아가 주세요.</span>
      </p>
      <div className="not-found-page__actions">
        {project?.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            실제 사이트 보기
          </a>
        )}
        <Link to="/">메인으로 돌아가기</Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
