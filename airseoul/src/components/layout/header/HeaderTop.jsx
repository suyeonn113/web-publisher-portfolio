import { utilityNav } from '../../../data/navigation/utilityNav';

export default function HeaderTop() {
  return (
    <div className="site-header__top">
      <ul className="site-header__utility-list">
        {utilityNav.map((item) => (
          <li className="site-header__utility-item" key={item.id}>
            <a className="site-header__utility-link" href={item.href || '#'}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}