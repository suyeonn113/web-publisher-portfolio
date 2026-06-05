import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProjectPage from './pages/ProjectPage';
import StaticPage from './pages/StaticPage';
import WorkIndex from './pages/WorkIndex';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<WorkIndex />} />
        <Route path="introduction" element={<StaticPage page="introduction" />} />
        <Route path="resume" element={<StaticPage page="resume" />} />
        <Route path="project/:slug" element={<ProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
