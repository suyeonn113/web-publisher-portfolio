import { useState } from 'react';

import Logo from '../../common/Logo';
import HeaderActions from './HeaderActions';
import HeaderMobileMenu from './HeaderMobileMenu';
import HeaderNav from './HeaderNav';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  return (
    <header className="site-header">
      <div className="site-header__main">
        <Logo className="site-header__logo" />

        <HeaderNav />

        <HeaderActions
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={toggleMobileMenu}
        />
      </div>

      <HeaderMobileMenu isOpen={isMobileMenuOpen} />
    </header>
  );
}
