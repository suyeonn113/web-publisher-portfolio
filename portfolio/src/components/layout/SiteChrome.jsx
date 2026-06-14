import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./SiteChrome.scss";

const SiteChrome = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastScrollYRef = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isHomePage = location.pathname === "/";

  const handleBackClick = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp =
        currentScrollY < lastScrollYRef.current || currentScrollY < 8;

      setIsHeaderVisible(isScrollingUp);
      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={[
          "site-header",
          isHeaderVisible ? "is-visible" : "is-hidden",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="site-header__brand">
          {!isHomePage && (
            <button
              className="site-header__back"
              type="button"
              aria-label="이전 페이지로 이동"
              onClick={handleBackClick}
            >
              <span aria-hidden="true">←</span>
            </button>
          )}
          <Link className="site-header__logo" to="/">
            수연의 Web Publisher Portfolio
          </Link>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <p>© 2026 Suyeon. All rights reserved.</p>
        <nav aria-label="푸터 링크">
          <a href="https://github.com/suyeonn113" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:suyeonn113@naver.com" target="_blank" rel="noopener noreferrer">
            Email
          </a>
        </nav>
      </footer>
    </>
  );
};

export default SiteChrome;
