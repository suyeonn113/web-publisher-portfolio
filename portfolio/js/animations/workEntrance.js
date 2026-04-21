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
  const prefersTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const disableDirectionReverse = isMobile || prefersTouch;
  const cardData = getWorkCardLayout(cards, 0);
  const sortedByRight = [...cardData].sort((a, b) => b.x - a.x);

  const resetEntranceState = () => {
    if (workSection) {
      gsap.set(workSection, {
        yPercent: isMobile ? 12 : 8,
        opacity: 0.96,
        clipPath: isMobile
          ? "inset(14% 0 0 0 round 28px 28px 0 0)"
          : "inset(18% 0 0 0 round 40px 40px 0 0)"
      });
    }

    gsap.set(headerItems, {
      opacity: 0,
      y: isMobile ? 18 : 24
    });

    sortedByRight.forEach((data) => {
      gsap.set(data.el, {
        x: data.x + (isMobile ? -180 : -300),
        y: data.y + (isMobile ? 96 : 140),
        scale: data.scale * 0.76,
        rotation: isMobile ? -10 : -18,
        opacity: 0,
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
        yPercent: isMobile ? 12 : 8,
        opacity: 0.96,
        clipPath: isMobile
          ? "inset(14% 0 0 0 round 28px 28px 0 0)"
          : "inset(18% 0 0 0 round 40px 40px 0 0)"
      },
      {
        yPercent: 0,
        opacity: 1,
        clipPath: "inset(0% 0 0 0 round 0px 0px 0 0)",
        duration: isMobile ? 0.48 : 0.56
      }
    );
  }

  sortedByRight.forEach((data, index) => {
    tl.fromTo(
      data.el,
      {
        x: data.x + (isMobile ? -180 : -300),
        y: data.y + (isMobile ? 96 : 140),
        scale: data.scale * 0.76,
        rotation: isMobile ? -10 : -18,
        opacity: 0
      },
      {
        x: data.x,
        y: data.y,
        scale: data.scale,
        rotation: 0,
        opacity: 1,
        zIndex: data.zIndex,
        duration: isMobile ? 0.42 : 0.5,
        ease: "power3.out"
      },
      (workSection ? 0.1 : 0) + (index * (isMobile ? 0.045 : 0.055))
    );
  });

  tl.add(() => {
    if (typeof window.updateWorkSlider === 'function') {
      window.updateWorkSlider(0);
    }
  });

  tl.to(headerItems, {
    opacity: 1,
    y: 0,
    duration: 0.32,
    stagger: 0.07
  }, "+=0.06");

  ScrollTrigger.create({
    trigger: ".home-work",
    start: isMobile ? "top 68%" : "top 72%",
    end: isMobile ? "top 8%" : "top 10%",
    onEnter: () => {
      tl.restart();
    },
    onEnterBack: () => {
      tl.play();
    },
    onUpdate: (self) => {
      if (disableDirectionReverse) {
        if (self.direction === 1 && tl.progress() === 0) {
          tl.restart();
        }
        return;
      }

      if (self.direction === -1) {
        tl.timeScale(1.15).reverse();
        return;
      }

      if (self.direction === 1) {
        if (tl.progress() === 0) {
          tl.restart();
          return;
        }

        tl.timeScale(1.1).play();
      }
    },
    onLeaveBack: () => {
      if (disableDirectionReverse) {
        tl.pause(0);
        resetEntranceState();
        return;
      }

      tl.timeScale(1.15).reverse();
    }
  });
};
