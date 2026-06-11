import { Navigate, Route, Routes } from "react-router-dom";

import SeoulYouthCenterDetail from "./pages/Project/SeoulYouthCenter/SeoulYouthCenterDetail";

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
    </Routes>
  );
};

export default App;