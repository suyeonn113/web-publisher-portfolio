document.addEventListener('DOMContentLoaded', () => {
    /* =========================
     * 1) 요소 찾기
     * ========================= */
    const section = document.querySelector('.programs');
    if (!section) return;

    const slider = section.querySelector('.programs__slider');
    const track = section.querySelector('.programs__track');
    const prevBtn = section.querySelector('.programs__prev');
    const nextBtn = section.querySelector('.programs__next');
    const cards = Array.from(section.querySelectorAll('.card'));

    if (!slider || !track || cards.length === 0) return;

    /* =========================
     * 2) 상태값
     * ========================= */
    let currentIndex = 0;
    let positions = [];
    let maxTranslate = 0;

    const DRAG_THRESHOLD = 50;

    /* =========================
     * 3) 유틸
     * ========================= */
    function clamp(v, min, max) {
        return Math.min(Math.max(v, min), max);
    }

    function applyTranslate(value) {
        track.style.transform = `translate3d(${-value}px, 0, 0)`;
    }

    /* =========================
     * 4) 스냅 포인트 생성
     * ========================= */
    function buildPositions() {
        maxTranslate = Math.max(0, track.scrollWidth - slider.clientWidth);

        const basePositions = cards.map(card => card.offsetLeft);

        const result = [];

        basePositions.forEach(pos => {
            const clamped = clamp(pos, 0, maxTranslate);

            // 중복 제거
            if (!result.some(p => Math.abs(p - clamped) < 1)) {
                result.push(clamped);
            }
        });

        // 마지막 끝점 추가
        if (Math.abs(result[result.length - 1] - maxTranslate) > 1) {
            result.push(maxTranslate);
        }

        positions = result;
    }

    /* =========================
     * 5) 버튼 상태 업데이트 (요구사항)
     * ========================= */
    function updateButtons() {
        if (!prevBtn || !nextBtn) return;

        const hasPrev = currentIndex > 0;
        const hasNext = currentIndex < positions.length - 1;

        prevBtn.dataset.available = hasPrev ? 'true' : 'false';
        nextBtn.dataset.available = hasNext ? 'true' : 'false';

        prevBtn.disabled = !hasPrev;
        nextBtn.disabled = !hasNext;
    }

    /* =========================
     * 6) 이동
     * ========================= */
    function goTo(index) {
        currentIndex = clamp(index, 0, positions.length - 1);
        applyTranslate(positions[currentIndex]);
        updateButtons();
    }

    function goNext() {
        if (currentIndex >= positions.length - 1) return;

        const nextIndex = currentIndex + 1;
        const nextPos = positions[nextIndex];

        const lastCard = cards[cards.length - 1];
        const viewportRight = nextPos + slider.clientWidth;

        // 👉 마지막 카드가 걸치기 시작하면 끝으로 바로 이동
        if (viewportRight > lastCard.offsetLeft) {
            goTo(positions.length - 1);
            return;
        }

        goTo(nextIndex);
    }

    function goPrev() {
        if (currentIndex <= 0) return;
        goTo(currentIndex - 1);
    }

    /* =========================
     * 7) 버튼 이벤트
     * ========================= */
    prevBtn?.addEventListener('click', goPrev);
    nextBtn?.addEventListener('click', goNext);

    /* =========================
     * 8) 스와이프 (모바일)
     * ========================= */
    let startX = 0;
    let isDragging = false;

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

    /* =========================
     * 9) 리사이즈 대응
     * ========================= */
    window.addEventListener('resize', () => {
        buildPositions();
        goTo(currentIndex);
    });

    /* =========================
     * 10) 초기 실행
     * ========================= */
    buildPositions();
    goTo(0);
});