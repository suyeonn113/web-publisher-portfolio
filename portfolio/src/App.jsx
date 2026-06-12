import { Navigate, Route, Routes } from "react-router-dom";

import { NotFoundPage } from "./pages/NotFound";
import SeoulYouthCenterDetail from "./pages/Project/SeoulYouthCenter/SeoulYouthCenterDetail";
import ProjectPreviewPage from "./pages/ProjectPreview/ProjectPreviewPage";

const App = () => {
  return (
    <Routes>
      {/* 인덱스 페이지 제작 전 임시 연결 */}
      <Route
        path="/"
        element={<Navigate to="/projects/seoul-youth-center" replace />}
      />

      <Route
        path="/projects/seoul-youth-center"
        element={<SeoulYouthCenterDetail />}
      />

      <Route
        path="/projects/:slug/preview"
        element={<ProjectPreviewPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
