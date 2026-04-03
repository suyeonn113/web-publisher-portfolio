document.addEventListener('DOMContentLoaded', () => {
    /**
     * =========================
     * 공통 슬라이더 초기화
     * - 카드가 없거나 이동할 구간이 없으면 버튼 비활성화
     * - recommend 결과 갱신 시 재초기화 가능
     * =========================
     */
    function initCardSlider({
        section,
        sliderSelector,
        trackSelector,
        prevSelector,
        nextSelector,
        cardSelector = '.card',
        snapToEndWhenNearLast = false
    }) {
        if (!section) return null;

        if (typeof section._destroyCardSlider === 'function') {
            section._destroyCardSlider();
        }

        const slider = section.querySelector(sliderSelector);
        const track = section.querySelector(trackSelector);
        const prevBtn = section.querySelector(prevSelector);
        const nextBtn = section.querySelector(nextSelector);

        if (!slider || !track) {
            return null;
        }

        const cards = Array.from(track.querySelectorAll(cardSelector)).filter((card) => !card.hidden);
        const controller = new AbortController();
        const { signal } = controller;

        let currentIndex = 0;
        let positions = [];
        let maxTranslate = 0;

        let startX = 0;
        let isDragging = false;

        const DRAG_THRESHOLD = 50;

        function clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }

        function setButtonState(button, isAvailable) {
            if (!button) return;
            button.dataset.available = isAvailable ? 'true' : 'false';
            button.disabled = !isAvailable;
        }

        function resetButtons() {
            setButtonState(prevBtn, false);
            setButtonState(nextBtn, false);
        }

        function applyTranslate(value) {
            track.style.transform = `translate3d(${-value}px, 0, 0)`;
        }

        function getLastIndex() {
            return Math.max(positions.length - 1, 0);
        }

        function buildPositions() {
            maxTranslate = Math.max(0, track.scrollWidth - slider.clientWidth);

            if (cards.length === 0 || maxTranslate <= 1) {
                positions = [0];
                return;
            }

            const result = [];

            cards.forEach((card) => {
                const clamped = clamp(card.offsetLeft, 0, maxTranslate);

                if (!result.some((savedPos) => Math.abs(savedPos - clamped) < 1)) {
                    result.push(clamped);
                }
            });

            if (result.length === 0) {
                result.push(0);
            }

            if (Math.abs(result[result.length - 1] - maxTranslate) > 1) {
                result.push(maxTranslate);
            }

            positions = result;
        }

        function updateButtons() {
            const hasPrev = currentIndex > 0;
            const hasNext = positions.length > 1 && currentIndex < getLastIndex();

            setButtonState(prevBtn, hasPrev);
            setButtonState(nextBtn, hasNext);
        }

        function shouldSnapToEnd(nextPos) {
            if (!snapToEndWhenNearLast) return false;
            if (cards.length === 0) return false;

            const lastCard = cards[cards.length - 1];
            const viewportRight = nextPos + slider.clientWidth;

            return viewportRight > lastCard.offsetLeft;
        }

        function goTo(index) {
            currentIndex = clamp(index, 0, getLastIndex());
            applyTranslate(positions[currentIndex] ?? 0);
            updateButtons();
        }

        function goNext() {
            if (currentIndex >= getLastIndex()) return;

            const nextIndex = currentIndex + 1;
            const nextPos = positions[nextIndex] ?? 0;

            if (shouldSnapToEnd(nextPos)) {
                goTo(getLastIndex());
                return;
            }

            goTo(nextIndex);
        }

        function goPrev() {
            if (currentIndex <= 0) return;
            goTo(currentIndex - 1);
        }

        function handlePointerDown(event) {
            if (event.pointerType === 'mouse' && event.button !== 0) return;

            startX = event.clientX;
            isDragging = true;
            track.dataset.dragging = 'true';
        }

        function handlePointerUp(event) {
            if (!isDragging) return;

            isDragging = false;
            delete track.dataset.dragging;

            const delta = event.clientX - startX;

            if (delta <= -DRAG_THRESHOLD) {
                goNext();
                return;
            }

            if (delta >= DRAG_THRESHOLD) {
                goPrev();
            }
        }

        function handlePointerCancel() {
            isDragging = false;
            delete track.dataset.dragging;
        }

        function handleResize() {
            buildPositions();
            goTo(Math.min(currentIndex, getLastIndex()));
        }

        prevBtn?.addEventListener('click', goPrev, { signal });
        nextBtn?.addEventListener('click', goNext, { signal });

        slider.addEventListener('pointerdown', handlePointerDown, { signal });
        slider.addEventListener('pointerup', handlePointerUp, { signal });
        slider.addEventListener('pointercancel', handlePointerCancel, { signal });
        slider.addEventListener('pointerleave', handlePointerCancel, { signal });

        window.addEventListener('resize', handleResize, { signal });

        if (cards.length === 0) {
            applyTranslate(0);
            resetButtons();
        } else {
            buildPositions();
            goTo(0);
        }

        section._destroyCardSlider = () => {
            controller.abort();
            delete track.dataset.dragging;
            applyTranslate(0);
            resetButtons();
        };

        return {
            refresh() {
                buildPositions();
                goTo(Math.min(currentIndex, getLastIndex()));
            },
            destroy() {
                if (typeof section._destroyCardSlider === 'function') {
                    section._destroyCardSlider();
                    delete section._destroyCardSlider;
                }
            }
        };
    }

    function initProgramSections() {
        document.querySelectorAll('.programs.inner').forEach((section) => {
            initCardSlider({
                section,
                sliderSelector: '.programs__slider',
                trackSelector: '.programs__track',
                prevSelector: '.programs__prev',
                nextSelector: '.programs__next',
                cardSelector: '.card',
                snapToEndWhenNearLast: true
            });
        });
    }

    function initRecommendSections() {
        document.querySelectorAll('.recommend-result__youth, .recommend-result__education').forEach((section) => {
            const slider = section.querySelector('.recommend-result__slider');
            const track = section.querySelector('.recommend-result__list');

            if (!slider || slider.hidden || !track) {
                const prevBtn = section.querySelector('.programs__prev, .education__prev');
                const nextBtn = section.querySelector('.programs__next, .education__next');

                if (prevBtn) {
                    prevBtn.disabled = true;
                    prevBtn.dataset.available = 'false';
                }

                if (nextBtn) {
                    nextBtn.disabled = true;
                    nextBtn.dataset.available = 'false';
                }

                return;
            }

            initCardSlider({
                section,
                sliderSelector: '.recommend-result__slider',
                trackSelector: '.recommend-result__list',
                prevSelector: '.programs__prev, .education__prev',
                nextSelector: '.programs__next, .education__next',
                cardSelector: '.card',
                snapToEndWhenNearLast: false
            });
        });
    }

    initProgramSections();
    initRecommendSections();

    document.addEventListener('recommend:updated', () => {
        initRecommendSections();
    });
});