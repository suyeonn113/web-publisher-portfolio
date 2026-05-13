import { iconSize } from '../../../tokens/size';
import MenuIcon from '../../icons/MenuIcon';

export default function HeaderMobileButton({ isOpen, onClick }) {
  return (
    <button
      className="site-header__mobile-button"
      type="button"
      aria-label={isOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <MenuIcon
        className="site-header__mobile-icon"
        size={iconSize.md}
      />
    </button>
  );
}
