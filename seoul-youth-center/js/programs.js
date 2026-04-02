document.addEventListener('DOMContentLoaded', () => {
    /* =========================
     * 공통 슬라이더 초기화
     * - section: 각 슬라이더 영역 루트
     * - sliderSelector: 뷰포트 요소
     * - trackSelector: 이동 대상 요소
     * - prevSelector / nextSelector: 버튼 요소
     * - cardSelector: 카드 선택자
     * - snapToEndWhenNearLast:
     *   마지막 카드가 보이기 시작할 때
     *   마지막 정렬 위치로 보정할지 여부
     *   - true  : 프로그램 섹션
     *   - false : 레코멘트 섹션
     * ========================= */
    function initCardSlider({
        section,
        sliderSelector,
        trackSelector,
        prevSelector,
        nextSelector,
        cardSelector = '.card',
        snapToEndWhenNearLast = false
    }) {
        if (!section) return;

        const slider = section.querySelector(sliderSelector);
        const track = section.querySelector(trackSelector);
        const prevBtn = section.querySelector(prevSelector);
        const nextBtn = section.querySelector(nextSelector);
        const cards = Array.from(track?.querySelectorAll(cardSelector) ?? []);

        if (!slider || !track || cards.length === 0) return;

        /* =========================
         * 상태값
         * ========================= */
        let currentIndex = 0;
        let positions = [];
        let maxTranslate = 0;

        let startX = 0;
        let isDragging = false;

        const DRAG_THRESHOLD = 50;

        /* =========================
         * 유틸
         * ========================= */
        function clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }

        function applyTranslate(value) {
            track.style.transform = `translate3d(${-value}px, 0, 0)`;
        }

        function getLastIndex() {
            return Math.max(positions.length - 1, 0);
        }

        /* =========================
         * 스냅 포인트 생성
         * ========================= */
        function buildPositions() {
            maxTranslate = Math.max(0, track.scrollWidth - slider.clientWidth);

            const basePositions = cards.map((card) => card.offsetLeft);
            const result = [];

            basePositions.forEach((pos) => {
                const clamped = clamp(pos, 0, maxTranslate);

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

        /* =========================
         * 버튼 상태 업데이트
         * ========================= */
        function updateButtons() {
            if (!prevBtn || !nextBtn) return;

            const hasPrev = currentIndex > 0;
            const hasNext = currentIndex < getLastIndex();

            prevBtn.dataset.available = hasPrev ? 'true' : 'false';
            nextBtn.dataset.available = hasNext ? 'true' : 'false';

            prevBtn.disabled = !hasPrev;
            nextBtn.disabled = !hasNext;
        }

        /* =========================
         * 끝 보정 조건
         * - 프로그램 섹션에서만 사용
         * - 다음 이동 시 마지막 카드가 화면에 걸치기 시작하면
         *   마지막 정렬 위치(maxTranslate)로 보정
         * ========================= */
        function shouldSnapToEnd(nextPos) {
            if (!snapToEndWhenNearLast) return false;
            if (cards.length === 0) return false;

            const lastCard = cards[cards.length - 1];
            const viewportRight = nextPos + slider.clientWidth;

            return viewportRight > lastCard.offsetLeft;
        }

        /* =========================
         * 이동
         * ========================= */
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

        /* =========================
         * 버튼 이벤트
         * ========================= */
        prevBtn?.addEventListener('click', goPrev);
        nextBtn?.addEventListener('click', goNext);

        /* =========================
         * 스와이프
         * ========================= */
        slider.addEventListener('pointerdown', (e) => {
            startX = e.clientX;
            isDragging = true;
        });

        slider.addEventListener('pointerup', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const delta = e.clientX - startX;

            if (delta < -DRAG_THRESHOLD) {
                goNext();
            } else if (delta > DRAG_THRESHOLD) {
                goPrev();
            }
        });

        slider.addEventListener('pointercancel', () => {
            isDragging = false;
        });

        slider.addEventListener('pointerleave', () => {
            isDragging = false;
        });

        /* =========================
         * 리사이즈 대응
         * ========================= */
        function handleResize() {
            buildPositions();
            goTo(currentIndex);
        }

        window.addEventListener('resize', handleResize);

        /* =========================
         * 초기 실행
         * ========================= */
        buildPositions();
        goTo(0);
    }

    /* =========================
     * 1) 모집 중인 청소년 프로그램
     * - 마지막 카드가 보이기 시작하면
     *   마지막 위치로 보정
     * ========================= */
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

    /* =========================
     * 2) 나에게 맞는 프로그램 살펴보기
     * - 한 칸씩만 이동
     * - 첫 클릭에 맨 끝으로 점프 방지
     * ========================= */
    document.querySelectorAll('.recommend-result__youth').forEach((section) => {
        initCardSlider({
            section,
            sliderSelector: '.recommend-result__slider',
            trackSelector: '.recommend-result__list',
            prevSelector: '.programs__prev',
            nextSelector: '.programs__next',
            cardSelector: '.card',
            snapToEndWhenNearLast: false
        });
    });
});