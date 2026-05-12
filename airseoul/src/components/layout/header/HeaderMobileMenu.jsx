export default function HeaderMobileButton() {
  return (
    <button
      className="site-header__mobile-button"
      type="button"
      aria-label="모바일 메뉴 열기"
    >
      <span className="site-header__mobile-line" />
      <span className="site-header__mobile-line" />
      <span className="site-header__mobile-line" />
    </button>
  );
}