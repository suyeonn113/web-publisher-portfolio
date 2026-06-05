import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

function Header() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <Link className="site-header__brand" to={ROUTES.home} aria-label="Go to work index">
        <img className="site-header__sun" src="./assets/icons/light-icon.svg" alt="" aria-hidden="true" />
      </Link>
    </header>
  );
}

export default Header;
