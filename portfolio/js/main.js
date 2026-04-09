
/* ========================================
   Main
   - 공통 UI 초기화 실행
======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCommonUI();
});

import { initSiteHeader } from './header.js';

/* ---------- 공통 초기화 ---------- */
function initCommonUI() {
    initSiteHeader();
    
}