import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { heroPromotions } from '../../../data/heroPromotions';

const PROMOTION_AUTOPLAY_DELAY = 5200;
const PROMOTION_LOOP_RESET_DELAY = 560;
const PROMOTION_SWIPE_MEDIA_QUERY = '(max-width: 768px)';

function HeroPromotionList() {
  const listRef = useRef(null);
  const previousIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwipeLayout, setIsSwipeLayout] = useState(false);
  const swipePromotions =
    heroPromotions.length > 1
      ? [
          heroPromotions[heroPromotions.length - 1],
          ...heroPromotions,
          heroPromotions[0],
        ]
      : heroPromotions;
  const visiblePromotions = isSwipeLayout
    ? swipePromotions
    : heroPromotions
        .map((_, index) => {
          return heroPromotions[(activeIndex + index) % heroPromotions.length];
        })
        .slice(0, 3);

  useEffect(() => {
    const mediaQuery = window.matchMedia(PROMOTION_SWIPE_MEDIA_QUERY);
    const updateLayout = () => {
      setIsSwipeLayout(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => {
      mediaQuery.removeEventListener('change', updateLayout);
    };
  }, []);

  useEffect(() => {
    if (heroPromotions.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % heroPromotions.length;
      });
    }, PROMOTION_AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const list = listRef.current;

    if (!isSwipeLayout) return;
    if (!list) return;

    const isLoopReset =
      activeIndex === 0 &&
      previousIndexRef.current === heroPromotions.length - 1;
    const activeCardIndex = isLoopReset
      ? heroPromotions.length + 1
      : activeIndex + 1;
    const activeCard = list.querySelectorAll('.hero-promotion-card')[activeCardIndex];

    if (!activeCard) return;

    list.scrollTo({
      left: activeCard.offsetLeft - list.offsetLeft,
      behavior: 'smooth',
    });

    previousIndexRef.current = activeIndex;

    if (!isLoopReset) return;

    const resetTimer = window.setTimeout(() => {
      const firstCard = list.querySelectorAll('.hero-promotion-card')[1];

      if (!firstCard) return;

      list.scrollTo({
        left: firstCard.offsetLeft - list.offsetLeft,
        behavior: 'auto',
      });
    }, PROMOTION_LOOP_RESET_DELAY);

    return () => {
      window.clearTimeout(resetTimer);
    };
  }, [activeIndex, isSwipeLayout]);

  return (
    <div
      ref={listRef}
      className="hero-promotion-list"
      aria-label="프로모션 선택"
    >
      {visiblePromotions.map((promotion, index) => (
        <Link
          className={`hero-promotion-card hero-promotion-card--${index + 1}`}
          key={isSwipeLayout ? `${promotion.id}-${index}` : `${activeIndex}-${promotion.id}`}
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
