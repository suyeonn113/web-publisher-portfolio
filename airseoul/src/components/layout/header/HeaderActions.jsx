import HeaderContactMenu from './HeaderContactMenu';
import HeaderLanguageMenu from './HeaderLanguageMenu';
import HeaderLoginLink from './HeaderLoginLink';
import HeaderMobileButton from './HeaderMobileButton';
import { iconSize } from '../../../tokens/size';

export default function HeaderActions({
  isMobileMenuOpen,
  onMobileMenuToggle,
}) {
  return (
    <div className="site-header__actions">
      <div className="site-header__desktop-actions">
        <HeaderContactMenu labelMode="full" />
        <HeaderLanguageMenu labelMode="full" />
        <HeaderLoginLink labelMode="full" />
      </div>

      <div className="site-header__mobile-actions">
        <HeaderLoginLink labelMode="icon" iconSizeValue={iconSize.sm} />
        <HeaderMobileButton
          isOpen={isMobileMenuOpen}
          onClick={onMobileMenuToggle}
        />
      </div>
    </div>
  );
}
