
document.addEventListener('DOMContentLoaded', () => {
    /* ==============================
     * 1) 기본 요소 찾기
     * ============================== */
    const section = document.querySelector('.programs');
    if (!section) return;

    const slider = section.querySelector('.programs__slider');
    const track = section.querySelector('.programs__track');
    const prevButton = section.querySelector('.programs__prev');
    const nextButton = section.querySelector('.programs__next');
    const cards = Array.from(section.querySelectorAll('.card'));

    if (!slider || !track || cards.length === 0) return;

    /* ==============================
    * 카드 마감일 빠른 순 정렬
    * - DB 붙기 전: data-end-date 사용
    * - DB 붙은 후: 서버가 넣어준 값을 그대로 사용
    * - ongoing(상시모집)은 맨 뒤로 보냄
    * ============================== */
    function sortCardsByEndDate() {
        const sortedCards = [...cards].sort((a, b) => {
            const aEndDate = a.dataset.endDate;
            const bEndDate = b.dataset.endDate;

            if (aEndDate === 'ongoing') return 1;
            if (bEndDate === 'ongoing') return -1;

            return new Date(aEndDate) - new Date(bEndDate);
        });

        sortedCards.forEach((card) => {
            track.appendChild(card);
        });
    }

    /* ==============================
     * 2) 기본 설정
     * - scrollLeft 방식이 아니라 transform 방식 사용
     * - 세로 스크롤은 유지, 가로 스와이프는 JS가 처리
     * ============================== */
    slider.style.overflow = 'hidden';
    slider.style.touchAction = 'pan-y';

    track.style.willChange = 'transform';
    track.style.transform = 'translate3d(0, 0, 0)';
    track.style.transition = 'transform 400ms ease';

    /* ==============================
     * 3) 상태값
     * ============================== */
    const ANIMATION_DURATION = 400;
    const DRAG_START_THRESHOLD = 6;   // 드래그로 인정할 최소 이동값
    const DRAG_SNAP_THRESHOLD = 48;   // 이전/다음 스텝으로 넘길 기준
    const POSITION_TOLERANCE = 1;     // 중복 위치 제거용

    let snapPositions = [];
    let currentStepIndex = 0;
    let currentTranslate = 0;
    let maxTranslate = 0;

    let isAnimating = false;
    let animationTimer = null;

    let isPointerDown = false;
    let isDragging = false;
    let shouldBlockClick = false;

    let startX = 0;
    let startTranslate = 0;
    let startStepIndex = 0;
    let dragDeltaX = 0;

    /* ==============================
     * 4) 유틸 함수
     * ============================== */
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function setAnimating(state) {
        isAnimating = state;
        window.clearTimeout(animationTimer);

        if (!state) return;

        animationTimer = window.setTimeout(() => {
            isAnimating = false;
        }, ANIMATION_DURATION);
    }

    function applyTranslate(value) {
        currentTranslate = clamp(value, 0, maxTranslate);
        track.style.transform = `translate3d(${-currentTranslate}px, 0, 0)`;
    }

    function setTrackTransition(enabled) {
        track.style.transition = enabled ? 'transform 400ms ease' : 'none';
    }

    /* ==============================
     * 5) 스냅 위치 생성
     * - 각 카드의 left 위치를 기준으로 이동 지점 생성
     * - 마지막 카드는 maxTranslate로 보정되어
     *   "반만 보이다가 한 번 더 눌러야 함" 문제 방지
     * ============================== */
    function buildSnapPositions() {
        maxTranslate = Math.max(0, track.scrollWidth - slider.clientWidth);

        const lastCard = cards[cards.length - 1];
        const lastCardLeft = lastCard.offsetLeft;

        const rawPositions = cards.map((card) => {
            return clamp(card.offsetLeft, 0, maxTranslate);
        });

        const uniquePositions = [];

        rawPositions.forEach((position) => {
            const lastPosition = uniquePositions[uniquePositions.length - 1];

            if (
                typeof lastPosition === 'undefined' ||
                Math.abs(lastPosition - position) > POSITION_TOLERANCE
            ) {
                uniquePositions.push(position);
            }
        });

        const filteredPositions = uniquePositions.filter((position) => {
            const viewportRight = position + slider.clientWidth;

            // 마지막 위치는 무조건 살림
            if (Math.abs(position - maxTranslate) <= POSITION_TOLERANCE) {
                return true;
            }

            // 마지막 카드가 보이기 시작하는 중간 step은 제거
            // 즉, 마지막 카드가 걸치는 순간이면 바로 끝 정렬로 보내기
            return viewportRight <= lastCardLeft + POSITION_TOLERANCE;
        });

        if (filteredPositions.length === 0 || filteredPositions[0] !== 0) {
            filteredPositions.unshift(0);
        }

        if (
            Math.abs(filteredPositions[filteredPositions.length - 1] - maxTranslate) >
            POSITION_TOLERANCE
        ) {
            filteredPositions.push(maxTranslate);
        }

        snapPositions = filteredPositions;
    }

    function findNearestStepIndex(position) {
        let nearestIndex = 0;
        let minDistance = Infinity;

        snapPositions.forEach((snapPosition, index) => {
            const distance = Math.abs(snapPosition - position);

            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = index;
            }
        });

        return nearestIndex;
    }

    /* ==============================
     * 6) 버튼 상태 업데이트
     * - 이전/다음 이동 가능하면 data-available="true"
     * - 아니면 false + disabled
     * ============================== */
    function updateButtons() {
        if (!prevButton || !nextButton) return;

        const hasPrev = currentStepIndex > 0;
        const hasNext = currentStepIndex < snapPositions.length - 1;

        prevButton.dataset.available = hasPrev ? 'true' : 'false';
        nextButton.dataset.available = hasNext ? 'true' : 'false';

        prevButton.disabled = !hasPrev;
        nextButton.disabled = !hasNext;
    }

    /* ==============================
     * 7) 특정 스텝으로 이동
     * ============================== */
    function goToStep(index, options = {}) {
        const { immediate = false } = options;
        const safeIndex = clamp(index, 0, snapPositions.length - 1);

        currentStepIndex = safeIndex;

        if (immediate) {
            setTrackTransition(false);
            applyTranslate(snapPositions[currentStepIndex]);

            requestAnimationFrame(() => {
                setTrackTransition(true);
            });

            isAnimating = false;
        } else {
            setTrackTransition(true);
            applyTranslate(snapPositions[currentStepIndex]);
            setAnimating(true);
        }

        updateButtons();
    }

    function goToPrev() {
        if (isAnimating || currentStepIndex <= 0) return;
        goToStep(currentStepIndex - 1);
    }

    function goToNext() {
        if (isAnimating || currentStepIndex >= snapPositions.length - 1) return;

        const nextIndex = currentStepIndex + 1;
        const nextPosition = snapPositions[nextIndex];
        const lastCard = cards[cards.length - 1];
        const viewportRight = nextPosition + slider.clientWidth;

        if (viewportRight > lastCard.offsetLeft + POSITION_TOLERANCE) {
            goToStep(snapPositions.length - 1);
            return;
        }

        goToStep(nextIndex);
    }

    /* ==============================
     * 8) 현재 레이아웃 기준으로 재계산
     * - 반응형에서 카드 폭이 바뀌어도 재정렬
     * ============================== */
    function refreshSlider(options = {}) {
        const { reset = false } = options;

        buildSnapPositions();

        if (reset) {
            currentStepIndex = 0;
        } else {
            currentStepIndex = findNearestStepIndex(currentTranslate);
        }

        goToStep(currentStepIndex, { immediate: true });
    }

    /* ==============================
     * 9) 버튼 이벤트
     * ============================== */
    if (prevButton) {
        prevButton.addEventListener('click', goToPrev);
    }

    if (nextButton) {
        nextButton.addEventListener('click', goToNext);
    }

    /* ==============================
     * 10) 포인터 드래그 / 스와이프
     * - 모바일: 손가락 스와이프
     * - PC: 마우스 드래그
     * - 버튼과 동일한 스냅 규칙 사용
     * ============================== */
    function onPointerDown(event) {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        if (isAnimating) return;

        isPointerDown = true;
        isDragging = false;
        shouldBlockClick = false;

        startX = event.clientX;
        startTranslate = currentTranslate;
        startStepIndex = currentStepIndex;
        dragDeltaX = 0;

        setTrackTransition(false);

        if (slider.setPointerCapture) {
            slider.setPointerCapture(event.pointerId);
        }
    }

    function onPointerMove(event) {
        if (!isPointerDown) return;

        dragDeltaX = event.clientX - startX;

        if (!isDragging && Math.abs(dragDeltaX) > DRAG_START_THRESHOLD) {
            isDragging = true;
            shouldBlockClick = true;
        }

        if (!isDragging) return;

        const nextTranslate = startTranslate - dragDeltaX;
        applyTranslate(nextTranslate);
    }

    function onPointerUp(event) {
        if (!isPointerDown) return;

        isPointerDown = false;

        if (slider.releasePointerCapture) {
            slider.releasePointerCapture(event.pointerId);
        }

        setTrackTransition(true);

        if (!isDragging) {
            goToStep(currentStepIndex);
            return;
        }

        let nextStepIndex = startStepIndex;

        if (dragDeltaX <= -DRAG_SNAP_THRESHOLD) {
            nextStepIndex = startStepIndex + 1;
        } else if (dragDeltaX >= DRAG_SNAP_THRESHOLD) {
            nextStepIndex = startStepIndex - 1;
        } else {
            nextStepIndex = findNearestStepIndex(currentTranslate);
        }

        goToStep(nextStepIndex);

        window.setTimeout(() => {
            shouldBlockClick = false;
        }, 0);
    }

    slider.addEventListener('pointerdown', onPointerDown);
    slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', onPointerUp);
    slider.addEventListener('pointercancel', onPointerUp);
    slider.addEventListener('lostpointercapture', onPointerUp);

    /* ==============================
     * 11) 드래그 후 링크 클릭 방지
     * - 카드 전체가 링크라서 필수
     * ============================== */
    slider.addEventListener('click', (event) => {
        if (!shouldBlockClick) return;

        event.preventDefault();
        event.stopPropagation();
    }, true);

    /* ==============================
     * 12) 리사이즈 대응
     * ============================== */
    let resizeTimer = null;

    window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(() => {
            refreshSlider();
        }, 100);
    });

    /* ==============================
     * 13) 초기 세팅
     * ============================== */
    sortCardsByEndDate();
    refreshSlider({ reset: true });
});