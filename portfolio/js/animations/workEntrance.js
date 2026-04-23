import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";
import { getWorkCardLayout } from "../components/workSlider.js";

gsap.registerPlugin(ScrollTrigger);

export const initWorkEntrance = () => {
  const cards = gsap.utils.toArray('.home-work__card');
  const workSection = document.querySelector('.home-work');
  const headerItems = [".home-work__header", ".home-work__nav-controls"];
  if (!cards.length) return;

  const isMobile = window.innerWidth < 768;
  const cardData = getWorkCardLayout(cards, 0);
  const sortedByRight = [...cardData].sort((a, b) => b.x - a.x);

  const resetEntranceState = () => {
    if (workSection) {
      gsap.set(workSection, {
        yPercent: isMobile ? 4 : 3,
        autoAlpha: 0
      });
    }

    gsap.set(headerItems, {
      autoAlpha: 0,
      y: isMobile ? 12 : 16
    });

    sortedByRight.forEach((data) => {
      gsap.set(data.el, {
        x: data.x + (isMobile ? -28 : -42),
        y: data.y + (isMobile ? 32 : 44),
        scale: data.scale * 0.92,
        rotation: isMobile ? -4 : -6,
        autoAlpha: 0,
        zIndex: data.zIndex,
        force3D: true
      });
    });
  };

  resetEntranceState();

  const tl = gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out"
    }
  });

  if (workSection) {
    tl.fromTo(
      workSection,
      {
        yPercent: isMobile ? 4 : 3,
        autoAlpha: 0
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: isMobile ? 0.54 : 0.62,
        ease: "power2.out"
      }
    );
  }

  sortedByRight.forEach((data, index) => {
    tl.fromTo(
      data.el,
      {
        x: data.x + (isMobile ? -28 : -42),
        y: data.y + (isMobile ? 32 : 44),
        scale: data.scale * 0.92,
        rotation: isMobile ? -4 : -6,
        autoAlpha: 0
      },
      {
        x: data.x,
        y: data.y,
        scale: data.scale,
        rotation: 0,
        autoAlpha: 1,
        zIndex: data.zIndex,
        duration: isMobile ? 0.52 : 0.58,
        ease: "power2.out"
      },
      (workSection ? 0.12 : 0) + (index * (isMobile ? 0.05 : 0.06))
    );
  });

  tl.add(() => {
    if (typeof window.updateWorkSlider === 'function') {
      window.updateWorkSlider(0);
    }
  });

  tl.to(headerItems, {
    autoAlpha: 1,
    y: 0,
    duration: 0.36,
    stagger: 0.07
  }, "+=0.02");

  ScrollTrigger.create({
    trigger: ".home-work",
    start: isMobile ? "top 68%" : "top 72%",
    end: isMobile ? "top 8%" : "top 10%",
    onEnter: () => {
      tl.restart();
    },
    onEnterBack: () => {
      tl.play(0);
    },
    onLeaveBack: () => {
      tl.pause(0);
      resetEntranceState();
    }
  });
};
