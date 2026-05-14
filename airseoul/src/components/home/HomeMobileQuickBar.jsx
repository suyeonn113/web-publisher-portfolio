import { ROUTES } from '../../constants/routes';
import { iconSize } from '../../tokens/size';
import ClockIcon from '../icons/ClockIcon';
import PlaneIcon from '../icons/PlaneIcon';
import TicketIcon from '../icons/TicketIcon';
import UserIcon from '../icons/UserIcon';

const quickMenus = [
  {
    id: 'booking-flight',
    label: '항공권 예매',
    href: ROUTES.booking.flight,
    Icon: PlaneIcon,
  },
  {
    id: 'my-trip',
    label: '나의 여행',
    href: ROUTES.booking.bookingCheck,
    Icon: UserIcon,
  },
  {
    id: 'check-in',
    label: '체크인',
    href: ROUTES.booking.checkin,
    Icon: TicketIcon,
  },
  {
    id: 'schedule',
    label: '출도착/스케줄',
    href: ROUTES.booking.flightStatus,
    Icon: ClockIcon,
  },
];

export default function HomeMobileQuickBar() {
  return (
    <nav className="home-mobile-quick" aria-label="모바일 빠른 메뉴">
      <ul className="home-mobile-quick__list">
        {quickMenus.map(({ href, Icon, id, label }) => (
          <li className="home-mobile-quick__item" key={id}>
            <a className="home-mobile-quick__link" href={href}>
              <Icon className="home-mobile-quick__icon" size={iconSize.md} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
