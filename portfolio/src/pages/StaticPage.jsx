import { Link } from 'react-router-dom';
import StaticPageDocument from '../components/project/StaticPageDocument';
import { ROUTES } from '../constants/routes';

function StaticPage({ page }) {
  return (
    <main className="project-page" data-page={page}>
      <div className="project-page__topbar">
        <Link className="project-page__back" to={ROUTES.home}>
          Menu
        </Link>
      </div>
      <StaticPageDocument page={page} />
    </main>
  );
}

export default StaticPage;
