/* ========================================
   Contact Cardcase Interaction
======================================== */

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { Flip } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/Flip/+esm";

gsap.registerPlugin(Flip);

export function initContactCardcase() {
  const cardcase = document.querySelector('.contact-cardcase');
  const hintCard = document.querySelector('.contact-cardcase__hint-card');
  const contactList = document.querySelector('.contact-list');
  const cards = gsap.utils.toArray('.contact-card');

  if (!cardcase || !hintCard || !contactList) return;
  if (cardcase.dataset.cardcaseInitialized === 'true') return;

  cardcase.dataset.cardcaseInitialized = 'true';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const baseXRatio = 0.15;
  const hoverMoveXRatio = 0.18;
  const baseRotate = 3;
  const hoverRotate = 5;
  const activeRangeRatio = 3.6;
  const closeRangeRatio = 0.22;
  let isOpen = false;

  if (prefersReducedMotion) {
    isOpen = true;
    cardcase.classList.add('is-open');
    contactList.classList.add('is-open');
    gsap.set(cards, { clearProps: 'all' });
    return;
  }

  const animateCardcaseLayout = (state, onComplete) => {
    const previousTransitions = {
      cardcase: cardcase.style.transition,
      contactList: contactList.style.transition,
    };

    cardcase.style.transition = 'none';
    contactList.style.transition = 'none';

    Flip.from(state, {
      duration: 0.96,
      ease: 'power2.inOut',
      scale: false,
      absolute: false,
      clearProps: 'transform,width,height',
      onComplete: () => {
        cardcase.style.transition = previousTransitions.cardcase;
        contactList.style.transition = previousTransitions.contactList;

        if (typeof onComplete === 'function') {
          onComplete();
        }
      },
    });
  };

  const getConfig = () => {
    const rect = cardcase.getBoundingClientRect();

    return {
      rect,
      baseX: rect.width * baseXRatio,
      hoverMoveX: rect.width * hoverMoveXRatio,
      activeRange: rect.width * activeRangeRatio,
      closeRange: rect.width * closeRangeRatio,
    };
  };

  const getDistance = (event, rect) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  };

  const resetCard = () => {
    if (isOpen) return;

    const { baseX } = getConfig();

    hintCard.style.transform = `
      translateX(${baseX}px)
      rotate(${baseRotate}deg)
    `;
  };

  const openCards = () => {
    if (isOpen) return;

    isOpen = true;
    gsap.killTweensOf([cardcase, cards]);
    const cardcaseState = Flip.getState(cardcase);

    gsap.set(cards, {
      autoAlpha: 0,
      y: 8,
      rotate: -0.4,
    });

    cardcase.classList.add('is-open');
    contactList.classList.add('is-open');

    animateCardcaseLayout(cardcaseState);

    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      rotate: 0,
      duration: 0.64,
      delay: 0.34,
      stagger: 0.06,
      ease: 'power2.out',
      overwrite: 'auto',
      clearProps: 'transform,opacity,visibility',
    });
  };

  const closeCards = ({ immediate = false } = {}) => {
    if (!isOpen) return;

    isOpen = false;
    gsap.killTweensOf([cardcase, cards]);

    if (immediate) {
      cardcase.classList.remove('is-open');
      contactList.classList.remove('is-open');
      gsap.set(cards, { clearProps: 'all' });
      resetCard();
      return;
    }

    gsap.to(cards, {
      autoAlpha: 0,
      y: 12,
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.in',
      onComplete: () => {
        const cardcaseState = Flip.getState(cardcase);

        cardcase.classList.remove('is-open');
        contactList.classList.remove('is-open');
        gsap.set(cards, { clearProps: 'all' });
        animateCardcaseLayout(cardcaseState, resetCard);
      },
    });
  };

  resetCard();

  window.addEventListener('mousemove', (event) => {
    if (isOpen) return;

    const { rect, baseX, hoverMoveX, activeRange } = getConfig();
    const distance = getDistance(event, rect);

    if (distance > activeRange) {
      resetCard();
      return;
    }

    const progress = 1 - distance / activeRange;
    const moveX = baseX + progress * hoverMoveX;
    const rotate = baseRotate + progress * hoverRotate;

    hintCard.style.transform = `
      translateX(${moveX}px)
      rotate(${rotate}deg)
    `;
  });

  window.addEventListener('click', (event) => {
    if (event.target.closest?.('.site-header__link')) return;

    const { rect, activeRange, closeRange } = getConfig();
    const distance = getDistance(event, rect);

    if (isOpen) {
      if (distance <= closeRange) {
        closeCards();
      }
      return;
    }

    if (distance > activeRange) return;

    openCards();
  });

  window.addEventListener('resize', resetCard);
  document.addEventListener('mouseleave', resetCard);
}
