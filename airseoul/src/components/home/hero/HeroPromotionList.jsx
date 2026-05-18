import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { heroPromotions } from '../../../data/heroPromotions';

function HeroPromotionList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visiblePromotions = heroPromotions
    .map((_, index) => {
      return heroPromotions[(activeIndex + index) % heroPromotions.length];
    })
    .slice(0, 3);

  useEffect(() => {
    if (heroPromotions.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % heroPromotions.length;
      });
    }, 5200);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div
      className="hero-promotion-list"
      aria-label="프로모션 혜택"
    >
      {visiblePromotions.map((promotion, index) => (
        <Link
          className={`hero-promotion-card hero-promotion-card--${index + 1}`}
          key={`${activeIndex}-${promotion.id}`}
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

      <div className="hero-promotion-list__pagination" aria-hidden="true">
        {heroPromotions.map((promotion, index) => (
          <span
            className={index === activeIndex ? 'is-active' : ''}
            key={promotion.id}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroPromotionList;
