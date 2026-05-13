import { useState } from 'react';

export default function HeaderNavItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubMenu = Boolean(item.children?.length);
  const submenuId = `header-nav-submenu-${item.id}`;

  const openSubMenu = () => {
    if (!hasSubMenu) return;

    window.dispatchEvent(new CustomEvent('header-hover-menu-open'));
    setIsOpen(true);
  };

  const closeSubMenu = (event) => {
    if (!hasSubMenu) return;
    if (event.currentTarget.contains(event.relatedTarget)) return;

    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape') return;

    setIsOpen(false);
    event.currentTarget.querySelector('.site-header__nav-link')?.focus();
  };

  return (
    <li
      className={`site-header__nav-item${isOpen ? ' site-header__nav-item--open' : ''}`}
      onMouseEnter={openSubMenu}
      onMouseLeave={closeSubMenu}
      onFocus={openSubMenu}
      onBlur={closeSubMenu}
      onKeyDown={handleKeyDown}
    >
      <a
        className="site-header__nav-link"
        href={item.href}
        aria-haspopup={hasSubMenu ? 'true' : undefined}
        aria-expanded={hasSubMenu ? isOpen : undefined}
        aria-controls={hasSubMenu ? submenuId : undefined}
      >
        <span>{item.label}</span>
      </a>

      {hasSubMenu && isOpen && (
        <ul
          className="site-header__nav-sublist"
          id={submenuId}
        >
          {item.children.map((child) => (
            <li className="site-header__nav-subitem" key={child.id}>
              <a className="site-header__nav-sublink" href={child.href}>
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
