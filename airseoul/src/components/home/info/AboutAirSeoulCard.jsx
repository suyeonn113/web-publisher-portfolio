import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { airSeoulStats } from '../../../data/homeInfo';
import { iconSize } from '../../../tokens/size';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

function AboutAirSeoulCard() {
  return (
    <article className="home-info-about">
      <div className="home-info-about__content">
        <span className="home-info-about__eyebrow">ABOUT AIR SEOUL</span>
        <h3>
          더 새로운 여행의 시작,
          <br />
          <strong>에어서울</strong>
        </h3>
        <p>
          합리적인 가격과 편안한 서비스로
          <br />
          특별한 여행 경험을 선사합니다.
        </p>
        <Link className="home-info-about__button" to={ROUTES.service.root}>
          <span>에어서울 소개</span>
          <ChevronRightIcon size={iconSize.sm} />
        </Link>
      </div>

      <img
        className="home-info-about__visual"
        src="/images/home-info/about-airseoul.png"
        alt=""
        aria-hidden="true"
      />

      <ul className="home-info-about__stats">
        {airSeoulStats.map((stat) => {
          const StatIcon = stat.icon;

          return (
            <li className="home-info-about__stat" key={stat.id}>
              <StatIcon />
              <span>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default AboutAirSeoulCard;
