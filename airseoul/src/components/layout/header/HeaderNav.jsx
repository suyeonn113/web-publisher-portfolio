import { mainNav } from '../../../data/navigation/mainNav';

export default function HeaderNav({ activeMenuId, onActiveMenuChange }) {
  return (
    <nav className="site-header__nav" aria-label="주요 메뉴">
      <ul className="site-header__nav-list">
        {mainNav.map((item) => {
          const isActive = activeMenuId === item.id;

          return (
            <li className="site-header__nav-item" key={item.id}>
              <a
                className="site-header__nav-link"
                href={item.href}
                aria-expanded={isActive}
                onMouseEnter={() => onActiveMenuChange(item.id)}
                onFocus={() => onActiveMenuChange(item.id)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}