import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';

function MainLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainLayout;
