/* ============================================================
    Home
============================================================ */

   import { updateToggleButton } from './utils/toggle.js'; 

// 스킬 섹션 전용 로직
const skillButtons = document.querySelectorAll('.skills-entry__toggle');

skillButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        updateToggleButton(button, !isExpanded, {
            expandedLabel: '상세 내용 닫기',
            collapsedLabel: '상세 내용 보기',
            labelPrefix: '스킬'
        });
    });
});