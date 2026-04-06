document.addEventListener('DOMContentLoaded', () => {
    /**
     * ========================================
     * 평생교육 프로그램 슬라이더
     * - 480 미만: 버튼 숨김 + 가로 스와이프
     *   - 카드 1장 노출 + 다음 카드 살짝 보이기
     * - 480 이상: 버튼 표시 + 좌우 페이지 이동
     *   - 480~767: 페이지당 카드 3개
     *   - 768 이상: 페이지당 카드 6개
     * - recommend 결과 갱신 시 재초기화 가능
     * ========================================
     */

    function initEducationSlider(section) {
        if (!section) return null;

        if (typeof section._destroyEducationSlider === 'function') {
            section._destroyEducationSlider();
        }

        const slider = section.querySelector('.education__slider');
        const track = section.querySelector('.education__track');
        const prevBtn = section.querySelector('.education__prev');
        const nextBtn = section.querySelector('.education__next');

        if (!slider || !track) return null;

        const controller = new AbortController();
        const { signal } = controller;

        const MOBILE_BREAKPOINT = 480;
        const TABLET_BREAKPOINT = 768;
        const SWIPE_THRESHOLD = 40;

        let cards = [];
        let mode = 'desktop';

        let pageItems = [];
        let currentPage = 0;
        let desktopPageWidth = 0;

        let mobilePositions = [];
        let currentIndex = 0;
        let mobileMaxTranslate = 0;

        let startX = 0;
        let startY = 0;
        let isDragging = false;

        function getVisibleCards() {
            return Array.from(track.querySelectorAll('.card')).filter((card) => !card.hidden);
        }

        function clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }

        function applyTranslateX(value) {
            track.style.transform = `translate3d(${-value}px, 0, 0)`;
        }

        function resetTrackTransform() {
            track.style.transform = 'translate3d(0, 0, 0)';
        }

        function setButtonState(button, isAvailable) {
            if (!button) return;

            button.disabled = !isAvailable;
            button.dataset.available = isAvailable ? 'true' : 'false';
            button.setAttribute('aria-disabled', isAvailable ? 'false' : 'true');
        }

        function resetButtons() {
            setButtonState(prevBtn, false);
            setButtonState(nextBtn, false);
        }

        function updateDesktopButtons() {
            setButtonState(prevBtn, currentPage > 0);
            setButtonState(nextBtn, currentPage < pageItems.length - 1);
        }

        function updateMobileButtons() {
            resetButtons();
        }

        function clearDesktopInlineStyles() {
            track.style.width = '';
            track.style.flexDirection = '';
            track.style.gap = '';

            Array.from(track.querySelectorAll('.education__page')).forEach((page) => {
                page.style.width = '';
                page.style.flex = '';
            });
        }

        function unwrapDesktopPages() {
            Array.from(track.querySelectorAll('.education__page')).forEach((page) => {
                while (page.firstChild) {
                    track.insertBefore(page.firstChild, page);
                }
                page.remove();
            });

            clearDesktopInlineStyles();
        }

        function getDesktopCardsPerPage() {
            return window.innerWidth >= TABLET_BREAKPOINT ? 6 : 3;
        }

        function buildDesktopPages() {
            unwrapDesktopPages();
            pageItems = [];

            if (cards.length === 0) {
                slider.style.height = '0px';
                return;
            }

            const cardsPerPage = getDesktopCardsPerPage();
            desktopPageWidth = slider.clientWidth;

            for (let startIndex = 0; startIndex < cards.length; startIndex += cardsPerPage) {
                const page = document.createElement('div');
                const pageCards = cards.slice(startIndex, startIndex + cardsPerPage);

                page.className = 'education__page';
                page.style.width = `${desktopPageWidth}px`;
                page.style.flex = `0 0 ${desktopPageWidth}px`;

                pageCards.forEach((card) => {
                    page.appendChild(card);
                });

                track.appendChild(page);
                pageItems.push(page);
            }

            track.style.width = `${desktopPageWidth * pageItems.length}px`;
            track.style.flexDirection = 'row';
            track.style.gap = '0px';
        }

        function buildMobilePositions() {
            unwrapDesktopPages();
            mobilePositions = [];

            if (cards.length === 0) {
                slider.style.height = '0px';
                mobileMaxTranslate = 0;
                return;
            }

            mobileMaxTranslate = Math.max(0, track.scrollWidth - slider.clientWidth);

            cards.forEach((card) => {
                const position = clamp(card.offsetLeft, 0, mobileMaxTranslate);

                if (!mobilePositions.some((saved) => Math.abs(saved - position) < 1)) {
                    mobilePositions.push(position);
                }
            });

            if (mobilePositions.length === 0) {
                mobilePositions.push(0);
            }

            if (Math.abs(mobilePositions[mobilePositions.length - 1] - mobileMaxTranslate) > 1) {
                mobilePositions.push(mobileMaxTranslate);
            }
        }

        function goDesktop(pageIndex) {
            if (pageItems.length === 0) {
                resetTrackTransform();
                slider.style.height = '0px';
                resetButtons();
                return;
            }

            currentPage = clamp(pageIndex, 0, pageItems.length - 1);

            const page = pageItems[currentPage];
            const pageHeight = page.offsetHeight;

            slider.style.height = `${pageHeight}px`;
            applyTranslateX(currentPage * desktopPageWidth);
            updateDesktopButtons();
        }

        function goMobile(cardIndex) {
            if (mobilePositions.length === 0) {
                resetTrackTransform();
                slider.style.height = '0px';
                updateMobileButtons();
                return;
            }

            currentIndex = clamp(cardIndex, 0, mobilePositions.length - 1);

            const firstCard = cards[0];
            if (firstCard) {
                slider.style.height = `${firstCard.offsetHeight}px`;
            }

            applyTranslateX(mobilePositions[currentIndex]);
            updateMobileButtons();
        }

        function goNext() {
            if (mode === 'mobile') {
                goMobile(currentIndex + 1);
                return;
            }

            goDesktop(currentPage + 1);
        }

        function goPrev() {
            if (mode === 'mobile') {
                goMobile(currentIndex - 1);
                return;
            }

            goDesktop(currentPage - 1);
        }

        function handlePointerDown(event) {
            if (event.pointerType === 'mouse' && event.button !== 0) return;

            startX = event.clientX;
            startY = event.clientY;
            isDragging = true;
            track.dataset.dragging = 'true';
        }

        function handlePointerUp(event) {
            if (!isDragging) return;

            isDragging = false;
            delete track.dataset.dragging;

            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;

            if (mode === 'mobile') {
                if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

                if (deltaX <= -SWIPE_THRESHOLD) {
                    goNext();
                    return;
                }

                if (deltaX >= SWIPE_THRESHOLD) {
                    goPrev();
                }

                return;
            }

            if (deltaX <= -SWIPE_THRESHOLD) {
                goNext();
                return;
            }

            if (deltaX >= SWIPE_THRESHOLD) {
                goPrev();
            }
        }

        function handlePointerCancel() {
            isDragging = false;
            delete track.dataset.dragging;
        }

        function refresh() {
            cards = getVisibleCards();

            if (cards.length === 0) {
                unwrapDesktopPages();
                resetTrackTransform();
                slider.style.height = '0px';
                resetButtons();
                return;
            }

            mode = window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop';

            if (mode === 'mobile') {
                buildMobilePositions();
                currentIndex = clamp(currentIndex, 0, Math.max(mobilePositions.length - 1, 0));
                goMobile(currentIndex);
                return;
            }

            buildDesktopPages();
            currentPage = clamp(currentPage, 0, Math.max(pageItems.length - 1, 0));
            goDesktop(currentPage);
        }

        prevBtn?.addEventListener('click', goPrev, { signal });
        nextBtn?.addEventListener('click', goNext, { signal });

        slider.addEventListener('pointerdown', handlePointerDown, { signal });
        slider.addEventListener('pointerup', handlePointerUp, { signal });
        slider.addEventListener('pointercancel', handlePointerCancel, { signal });
        slider.addEventListener('pointerleave', handlePointerCancel, { signal });

        window.addEventListener('resize', refresh, { signal });

        refresh();

        section._destroyEducationSlider = () => {
            controller.abort();
            delete track.dataset.dragging;
            unwrapDesktopPages();
            resetTrackTransform();
            slider.style.height = '';
            resetButtons();
        };

        return {
            refresh,
            destroy() {
                if (typeof section._destroyEducationSlider === 'function') {
                    section._destroyEducationSlider();
                    delete section._destroyEducationSlider;
                }
            }
        };
    }

    function initEducationRecommendSections() {
        document.querySelectorAll('.recommend-result__education, .education').forEach((section) => {
            const slider = section.querySelector('.education__slider');
            const track = section.querySelector('.education__track');
            const prevBtn = section.querySelector('.education__prev');
            const nextBtn = section.querySelector('.education__next');

            if (!slider || slider.hidden || !track || track.querySelectorAll('.card').length === 0) {
                if (typeof section._destroyEducationSlider === 'function') {
                    section._destroyEducationSlider();
                    delete section._destroyEducationSlider;
                }

                if (prevBtn) {
                    prevBtn.disabled = true;
                    prevBtn.dataset.available = 'false';
                    prevBtn.setAttribute('aria-disabled', 'true');
                }

                if (nextBtn) {
                    nextBtn.disabled = true;
                    nextBtn.dataset.available = 'false';
                    nextBtn.setAttribute('aria-disabled', 'true');
                }

                return;
            }

            initEducationSlider(section);
        });
    }

    initEducationRecommendSections();

    document.addEventListener('recommend:updated', () => {
        initEducationRecommendSections();
    });
});