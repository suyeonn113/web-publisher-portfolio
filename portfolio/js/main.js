/* ========================================
   Main Controller
======================================== */

// Library
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

// Global
import { initLenis } from './global/scroll.js';
import { initCursor } from './global/cursor.js';

// Components
import { initDirectionHeader } from './components/header.js';
import { loadProjects } from './components/ProjectCardMain.js';
import { initWorkSlider } from './components/workSlider.js';

// Animations
import { initHeroText } from './animations/heroText.js';
import { initScrollDownMotion } from "./animations/scrollDown.js";
import { initWorkEntrance } from "./animations/workEntrance.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', async () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  // 기초 환경 설정
  initLenis();
  // 공통 UI 인터랙션
  initDirectionHeader();

  initCursor();
  initHeroText();
  initScrollDownMotion();

  // 데이터 로드 및 렌더링 (비동기)
  const isProjectLoaded = await loadProjects();

  // 데이터 로드 완료 후 특정 섹션 인터랙션 실행
  if (isProjectLoaded) {
    initWorkSlider(); 
    ScrollTrigger.refresh();
    initWorkEntrance();
  }
});