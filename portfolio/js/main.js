/* ========================================
   Main Controller
======================================== */

// Library
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

// Global
import { initLenis, initHomeScrollAssist, initScrollStability } from './global/scroll.js';
import { initCursor } from './global/cursor.js';
import { initInteractiveTone } from './global/hoverTone.js';
import { initTheme } from "./global/theme.js";

// Components
import {
  renderHeader,
  initHeaderFixed,
  initHeaderState,
  initHeaderEntrance,
  initHeaderScroll
} from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderFixedMenu, initFixedMenu } from "./components/fixedMenu.js";
import { loadProjects } from './components/ProjectCardMain.js';
import { loadWorkCardList } from './components/WorkCardList.js';
import { initWorkSlider } from './components/workSlider.js';
import { loadProjectDetail } from './components/ProjectDetail.js';

// Animations
import { initHeroText } from './animations/heroText.js';
import { initScrollDownMotion } from "./animations/scrollDown.js";
import { initWorkEntrance } from "./animations/workEntrance.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body?.dataset.page || '';

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const lenis = initLenis(page);
  initScrollStability(lenis);

  renderHeader();
  renderFooter();
  if (page !== 'contact') {
    renderFixedMenu();
  }

  initTheme();

  if (page === 'home') {
    initHeaderState();
  } else {
    initHeaderFixed();
    initHeaderScroll();
  }

  initCursor();
  initInteractiveTone();
  if (page !== 'contact') {
    initFixedMenu(lenis);
  }

  if (page === 'home') {
    initHeroText(() => {
      initHeaderEntrance();
      initHeaderScroll();
    });
  }

  initScrollDownMotion();

  if (page === 'home') {
    const isProjectLoaded = await loadProjects();

    if (isProjectLoaded) {
      initWorkSlider();
      initWorkEntrance();
      initHomeScrollAssist(lenis);
      ScrollTrigger.refresh();
    }
  }

  if (page === 'work') {
    const isWorkListLoaded = await loadWorkCardList();

    if (isWorkListLoaded) {
      ScrollTrigger.refresh();
    }
  }

  if (page === 'project-detail') {
    const isProjectDetailLoaded = await loadProjectDetail();

    if (isProjectDetailLoaded) {
      ScrollTrigger.refresh();
    }
  }

});
