import { mainNav } from '../../../data/navigation/mainNav';

export default function HeaderMegaMenu({ activeMenuId }) {
  const activeMenu = mainNav.find((item) => item.id === activeMenuId);

  if (!activeMenu?.children?.length) return null;

  return (
    <div className="site-header__mega-menu">
      <ul className="site-header__mega-list">
        {activeMenu.children.map((item) => (
          <li className="site-header__mega-item" key={item.id}>
            <a className="site-header__mega-link" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}