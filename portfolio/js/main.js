/* ========================================
   Main Controller
======================================== */
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";
import { initLenis } from './modules/scroll.js';
import { initCursor } from './modules/cursor.js';
import { initDirectionHeader } from './modules/header.js';
import { loadProjects } from './modules/project-loader.js';
// import { initWorkSlider } from './modules/work-slider.js';
import { initHeroText } from './modules/hero.js';
import { initScrollDownMotion } from "./modules/scroll-down.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', async () => {
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
    // initWorkSlider(); 
    ScrollTrigger.refresh();
  }
});