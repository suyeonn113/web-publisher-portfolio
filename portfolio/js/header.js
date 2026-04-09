/* ========================================
   Header
   - 1200 미만: work-link + toggle
   - 1200 이상: 기본 nav / 스크롤 시 work-link 전환
   - work-link는 nav 내부 항목으로 처리
   - 애니메이션 없이 상태만 제어
======================================== */

import { updateToggleButton } from './components/toggle-button.js';

export function initSiteHeader() {
    /* ---------- DOM ---------- */
    const header = document.querySelector('.site-header');
    if (!header) return;

    const nav = header.querySelector('.site-header__nav');
    const menuToggle = header.querySelector('.site-header__menu-toggle');

    if (!nav || !menuToggle) return;

    const menuList = nav.querySelector('.site-header__menu');
    const workLink = nav.querySelector('.site-header__work-link');
    const workItem = workLink ? workLink.closest('li') : null;

    if (!menuList || !workItem) return;

    const menuItems = Array.from(menuList.children);
    const normalItems = menuItems.filter((item) => item !== workItem);

    /* ---------- 상수 ---------- */
    const DESKTOP_BREAKPOINT = 1200;
    const SCROLL_THRESHOLD = 24;

    /* ---------- 상태 ---------- */
    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;

    /* ---------- 유틸 ---------- */
    function isDesktop() {
        return window.innerWidth >= DESKTOP_BREAKPOINT;
    }

    function isMobileMenuOpen() {
        return nav.dataset.menuState === 'open';
    }

    function setHeaderState(state) {
        // data-header-state="nav | work"
        header.dataset.headerState = state;
    }

    function showWorkOnly() {
        setHeaderState('work');
    }

    function showMenuOnly() {
        setHeaderState('nav');
    }

    function syncMenuButton() {
        updateToggleButton(menuToggle, isMobileMenuOpen(), {
            labelPrefix: '메뉴',
            expandedLabel: '닫기',
            collapsedLabel: '열기'
        });
    }

    /* ---------- 데스크톱 상태 ---------- */
    function applyDesktopState() {
        nav.dataset.menuState = 'closed';
        syncMenuButton();

        if (header.dataset.headerState === 'work') {
            showWorkOnly();
        } else {
            setHeaderState('nav');
            showMenuOnly();
        }
    }

    /* ---------- 모바일 상태 ---------- */
    function applyMobileState() {
        if (isMobileMenuOpen()) {
            setHeaderState('nav');
            showMenuOnly();
        } else {
            setHeaderState('work');
            showWorkOnly();
        }

        syncMenuButton();
    }

    /* ---------- 모바일 메뉴 ---------- */
    function openMobileMenu() {
        nav.dataset.menuState = 'open';
        applyMobileState();
    }

    function closeMobileMenu() {
        nav.dataset.menuState = 'closed';
        applyMobileState();
    }

    /* ---------- 스크롤 ---------- */
    function handleScroll() {
        if (!isDesktop()) return;

        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        if (currentScrollY <= 0) {
            setHeaderState('nav');
            showMenuOnly();
            accumulatedDelta = 0;
            lastScrollY = currentScrollY;
            return;
        }

        if (delta === 0) return;

        if (
            (accumulatedDelta > 0 && delta < 0) ||
            (accumulatedDelta < 0 && delta > 0)
        ) {
            accumulatedDelta = 0;
        }

        accumulatedDelta += delta;

        if (accumulatedDelta > SCROLL_THRESHOLD) {
            setHeaderState('work');
            showWorkOnly();
            accumulatedDelta = 0;
        }

        if (accumulatedDelta < -SCROLL_THRESHOLD) {
            setHeaderState('nav');
            showMenuOnly();
            accumulatedDelta = 0;
        }

        lastScrollY = currentScrollY;
    }

    /* ---------- 리사이즈 ---------- */
    function handleResize() {
        if (isDesktop()) {
            nav.dataset.menuState = 'closed';
            applyDesktopState();
        } else {
            nav.dataset.menuState = 'closed';
            applyMobileState();
        }

        lastScrollY = window.scrollY;
        accumulatedDelta = 0;
    }

    /* ---------- 토글 ---------- */
    function handleToggleClick() {
        if (isDesktop()) return;

        if (isMobileMenuOpen()) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    /* ---------- 초기 실행 ---------- */
    function init() {
        nav.dataset.menuState = 'closed';

        if (isDesktop()) {
            setHeaderState('nav');
            applyDesktopState();
        } else {
            setHeaderState('work');
            applyMobileState();
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        menuToggle.addEventListener('click', handleToggleClick);
    }

    init();
}