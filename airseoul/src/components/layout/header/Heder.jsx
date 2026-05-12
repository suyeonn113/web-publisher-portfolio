import { useState } from 'react';

import Logo from '../../common/logo/Logo';
import HeaderTop from './HeaderTop';
import HeaderNav from './HeaderNav';
import HeaderMegaMenu from './HeaderMegaMenu';
import HeaderMobileButton from './HeaderMobileButton';

export default function Header() {
  const [activeMenuId, setActiveMenuId] = useState(null);

  return (
    <header
      className="site-header"
      onMouseLeave={() => setActiveMenuId(null)}
    >
      <HeaderTop />

      <div className="site-header__main">
        <Logo className="site-header__logo" />

        <HeaderNav
          activeMenuId={activeMenuId}
          onActiveMenuChange={setActiveMenuId}
        />

        <HeaderMobileButton />
      </div>

      <HeaderMegaMenu activeMenuId={activeMenuId} />
    </header>
  );
}