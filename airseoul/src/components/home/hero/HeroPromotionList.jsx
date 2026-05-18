import { Link } from 'react-router-dom';

import { heroPromotions } from '../../../data/heroPromotions';

function HeroPromotionList() {
  return (
    <div
      className="hero-promotion-list"
      aria-label="프로모션 혜택"
    >
      {heroPromotions.map((promotion) => (
        <Link
          className="hero-promotion-card"
          key={promotion.id}
          to={promotion.path}
        >
          <div className="hero-promotion-card__image">
            <img
              src={promotion.image}
              alt=""
            />
          </div>

          <div className="hero-promotion-card__content">
            <strong className="hero-promotion-card__title">
              {promotion.title}
            </strong>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HeroPromotionList;