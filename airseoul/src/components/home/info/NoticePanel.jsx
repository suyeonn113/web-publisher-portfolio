import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { homeNotices } from '../../../data/homeInfo';
import { iconSize } from '../../../tokens/size';
import BellIcon from '../../icons/BellIcon';
import ChevronRightIcon from '../../icons/ChevronRightIcon';
import MegaphoneIcon from '../../icons/MegaphoneIcon';

function NoticePanel() {
  return (
    <article className="home-info-notice">
      <header className="home-info-card-header">
        <div className="home-info-card-header__title">
          <MegaphoneIcon />
          <h3>공지사항</h3>
        </div>
        <Link className="home-info-more" to={ROUTES.contact.notice}>
          <span>더보기</span>
          <ChevronRightIcon size={iconSize.sm} />
        </Link>
      </header>

      <ul className="home-info-notice__list">
        {homeNotices.map((notice) => (
          <li className="home-info-notice__item" key={notice.id}>
            <Link className="home-info-notice__link" to={notice.to}>
              <span className="home-info-notice__title">{notice.title}</span>
              <time dateTime={notice.date.replaceAll('.', '-')}>{notice.date}</time>
              <ChevronRightIcon size={iconSize.sm} />
            </Link>
          </li>
        ))}
      </ul>

      <Link className="home-info-status" to={ROUTES.booking.flightStatus}>
        <BellIcon />
        <span>
          <strong>운항 현황 안내</strong>
          <small>실시간 운항 정보를 확인하세요.</small>
        </span>
        <ChevronRightIcon size={iconSize.md} />
      </Link>
    </article>
  );
}

export default NoticePanel;
