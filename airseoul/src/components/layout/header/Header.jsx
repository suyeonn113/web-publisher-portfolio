import { useEffect, useState } from 'react';

import Logo from '../../common/Logo';
import LoginPanel from '../../login/LoginPanel';
import HeaderActions from './HeaderActions';
import HeaderMobileMenu from './HeaderMobileMenu';
import HeaderNav from './HeaderNav';

export default function Header() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const openLoginPanel = () => {
    setIsLoginPanelOpen(true);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const heroSection = document.querySelector('.hero-section');

    if (!heroSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const closeMobileMenu = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', closeMobileMenu);

    return () => {
      document.removeEventListener('keydown', closeMobileMenu);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`
        site-header
        ${!isHeroVisible ? 'is-scrolled' : ''}
      `}
    >
      <div className="site-header__main">
        <Logo className="site-header__logo" />

        <HeaderNav />

        <HeaderActions
          isMobileMenuOpen={isMobileMenuOpen}
          onLoginOpen={openLoginPanel}
          onMobileMenuToggle={toggleMobileMenu}
        />
      </div>

      <HeaderMobileMenu isOpen={isMobileMenuOpen} />
      <LoginPanel
        isOpen={isLoginPanelOpen}
        onClose={() => setIsLoginPanelOpen(false)}
      />
    </header>
  );
}
