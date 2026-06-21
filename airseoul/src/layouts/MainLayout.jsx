import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/header/Header';
import { ROUTES } from '../constants/routes';

function MainLayout() {
  const location = useLocation();
  const hasHero = location.pathname === ROUTES.home;

  useEffect(() => {
    if (location.hash) {
      const frameId = window.requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ block: 'start' });
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    window.scrollTo({ top: 0, left: 0 });
    return undefined;
  }, [location.hash, location.pathname]);

  return (
    <>
      <Header hasHero={hasHero} />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
