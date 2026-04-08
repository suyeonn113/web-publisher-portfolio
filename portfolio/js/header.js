/* ========================================
   Header
   - PC / Mobile 상태 분기
   - 스크롤 방향에 따라 nav ↔ lead 전환
======================================== */

function initSiteHeader() {
    /* ---------- DOM ---------- */
    const header = document.querySelector('.site-header');
    if (!header) return;

    const nav = header.querySelector('.site-header__nav');
    const menuToggle = header.querySelector('.site-header__menu-toggle');

    if (!nav || !menuToggle) return;

    /* ---------- 상수 ---------- */
    const DESKTOP_BREAKPOINT = 1200;   // PC 기준
    const SCROLL_THRESHOLD = 24;       // 스크롤 전환 기준값

    /* ---------- 상태 ---------- */
    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;

    /* ---------- 유틸 ---------- */
    function isDesktop() {
        return window.innerWidth >= DESKTOP_BREAKPOINT;
    }

    function setHeaderState(state) {
        // data-header-state="nav | lead"
        header.dataset.headerState = state;
    }

    /* ---------- 모바일 메뉴 ---------- */
    function openMobileMenu() {
        nav.dataset.menuState = 'open';
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', '메뉴 닫기');
    }

    function closeMobileMenu() {
        nav.dataset.menuState = 'closed';
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', '메뉴 열기');
    }

    /* ---------- 상태 동기화 ---------- */
    function syncDesktopState() {
        // PC 진입 시 모바일 메뉴 초기화
        closeMobileMenu();

        // 최상단은 항상 nav
        if (window.scrollY <= 0) {
            setHeaderState('nav');
            return;
        }

        // 초기 상태 보정
        const currentState = header.dataset.headerState;
        if (currentState !== 'lead' && currentState !== 'nav') {
            setHeaderState('nav');
        }
    }

    function syncMobileState() {
        // 모바일은 항상 lead 고정
        setHeaderState('lead');
        closeMobileMenu();
    }

    /* ---------- 스크롤 ---------- */
    function handleScroll() {
        // 모바일에서는 무시
        if (!isDesktop()) return;

        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        // 최상단
        if (currentScrollY <= 0) {
            setHeaderState('nav');
            accumulatedDelta = 0;
            lastScrollY = currentScrollY;
            return;
        }

        if (delta === 0) return;

        // 방향 바뀌면 누적 초기화
        if ((accumulatedDelta > 0 && delta < 0) ||
            (accumulatedDelta < 0 && delta > 0)) {
            accumulatedDelta = 0;
        }

        accumulatedDelta += delta;

        // 아래 스크롤 → lead
        if (accumulatedDelta > SCROLL_THRESHOLD) {
            setHeaderState('lead');
            accumulatedDelta = 0;
        }

        // 위 스크롤 → nav
        if (accumulatedDelta < -SCROLL_THRESHOLD) {
            setHeaderState('nav');
            accumulatedDelta = 0;
        }

        lastScrollY = currentScrollY;
    }

    /* ---------- 리사이즈 ---------- */
    function handleResize() {
        if (isDesktop()) {
            syncDesktopState();
        } else {
            syncMobileState();
        }
    }

    /* ---------- 토글 ---------- */
    function handleToggleClick() {
        const isOpen = nav.dataset.menuState === 'open';

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    /* ---------- 초기 실행 ---------- */
    function init() {
        // 초기 상태
        if (isDesktop()) {
            setHeaderState('nav');
            syncDesktopState();
        } else {
            syncMobileState();
        }

        // 이벤트
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        menuToggle.addEventListener('click', handleToggleClick);
    }

    init();
}