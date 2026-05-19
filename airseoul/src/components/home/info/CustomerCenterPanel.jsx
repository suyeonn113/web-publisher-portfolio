import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import {
  customerActionLinks,
  customerCenterInfo,
  partnershipInquiries,
} from '../../../data/homeInfo';
import { iconSize } from '../../../tokens/size';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

function CustomerCenterPanel() {
  return (
    <article className="home-info-customer">
      <header className="home-info-card-header">
        <div className="home-info-card-header__title">
          <img src="/images/home-info/icons/customer.svg" alt="" aria-hidden="true" />
          <h3>고객센터</h3>
        </div>
        <Link className="home-info-more" to={ROUTES.contact.root}>
          <span>더보기</span>
          <ChevronRightIcon size={iconSize.sm} />
        </Link>
      </header>

      <div className="home-info-customer__main">
        <img src={customerCenterInfo.icon} alt="" aria-hidden="true" />
        <div>
          <strong>{customerCenterInfo.title}</strong>
          <a href={`tel:${customerCenterInfo.phone.replaceAll('-', '')}`}>
            {customerCenterInfo.phone}
          </a>
          <span>{customerCenterInfo.hours}</span>
        </div>
      </div>

      <div className="home-info-customer__actions">
        {customerActionLinks.map((action) => (
          <Link className="home-info-customer__button" to={action.to} key={action.id}>
            <span>{action.label}</span>
            <ChevronRightIcon size={iconSize.sm} />
          </Link>
        ))}
      </div>

      <ul className="home-info-customer__inquiries">
        <li className="home-info-customer__inquiry-title">제휴 / 단체문의</li>
        {partnershipInquiries.map((item) => (
          <li className="home-info-customer__inquiry" key={item.id}>
            <strong>{item.title}</strong>
            <a href={`mailto:${item.email}`}>{item.email}</a>
            {item.description.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default CustomerCenterPanel;
