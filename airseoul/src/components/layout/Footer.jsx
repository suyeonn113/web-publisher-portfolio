import { Link } from 'react-router-dom';
import { footerCompanyInfo, footerLinkGroups } from '../../data/footerLinks';
import Logo from '../common/Logo';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Logo ariaLabel="AIR SEOUL 홈으로 이동" />
          </div>

          <nav className="site-footer__nav" aria-label="푸터 메뉴">
            {footerLinkGroups.map((group) => (
              <section className="site-footer__group" key={group.id}>
                <h2>{group.title}</h2>
                <ul className="site-footer__links">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <section className="site-footer__company" aria-label="회사 정보">
          <h2>회사 정보</h2>
          <address>
            {footerCompanyInfo.map((info) => (
              <span key={info}>{info}</span>
            ))}
          </address>
        </section>

        <small className="site-footer__copyright">
          © AIR SEOUL, Inc. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
