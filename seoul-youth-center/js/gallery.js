/**
 * =========================================
 * Gallery Section
 * - 활동사진 데이터 렌더링
 * - < 480 : 2x2 grid / 버튼 숨김 / 스와이프 제거
 * - >= 480 : 가로 슬라이더 / 버튼 1칸 이동 / 스와이프 가능
 * - 나중에 DB/API 응답으로 그대로 치환 가능
 * =========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const gallerySection = document.querySelector('.gallery');
    if (!gallerySection) return;

    const gallerySlider = gallerySection.querySelector('.gallery__slider');
    const galleryTrack = gallerySection.querySelector('.gallery__track');
    const prevButton = gallerySection.querySelector('.gallery__prev');
    const nextButton = gallerySection.querySelector('.gallery__next');

    if (!gallerySlider || !galleryTrack || !prevButton || !nextButton) return;

    const BREAKPOINT_MOBILE = 480;
    const DRAG_THRESHOLD = 50;

    let resizeTimer = null;
    let currentIndex = 0;
    let positions = [];
    let maxTranslate = 0;

    let startX = 0;
    let isDragging = false;

    /**
     * -----------------------------------------
     * 1) 임시 데이터
     * - 나중에 DB/API 붙일 때 이 배열만 교체
     * -----------------------------------------
     */
    const activityPhotos = [
        {
            id: 1,
            title: '2026년 3월 특성화사업 움: 트다',
            label: '[움연구소 4.0]',
            imageSrc: '/seoul-youth-center/assets/images/gallery/gallery-01.jpg',
            imageAlt: '프로그램 참여자들이 실내에서 활동에 참여하고 있는 모습',
            href: '#'
        },
        {
            id: 2,
            title: '2026년 청소년 연합 발대식',
            label: '',
            imageSrc: '/seoul-youth-center/assets/images/gallery/gallery-02.jpg',
            imageAlt: '청소년들이 현수막을 들고 있는 단체 사진',
            href: '#'
        },
        {
            id: 3,
            title: '2026년 3월 특성화사업 움: 트다',
            label: '[움아트]',
            imageSrc: '/seoul-youth-center/assets/images/gallery/gallery-03.jpg',
            imageAlt: '청소년들이 직접 만든 작품을 들고 있는 모습',
            href: '#'
        },
        {
            id: 4,
            title: '2026년 인공지능 청소년 프로그램 기획단',
            label: '[서울AI메이커]',
            imageSrc: '/seoul-youth-center/assets/images/gallery/gallery-04.jpg',
            imageAlt: '참여 청소년들의 단체 사진',
            href: '#'
        },
        {
            id: 5,
            title: '2026년 2월 24기 청소년운영위원회',
            label: '[청춘]',
            imageSrc: '/seoul-youth-center/assets/images/gallery/gallery-05.jpg',
            imageAlt: '청소년들이 원으로 모여 회의를 진행하고 있는 모습',
            href: '#'
        },
        {
            id: 6,
            title: '2026년 겨울방학 우.다.다 프로젝트',
            label: '',
            imageSrc: '/seoul-youth-center/assets/images/gallery/gallery-06.jpg',
            imageAlt: '참여자들이 둥글게 둥글게 활동을 진행하고 있는 모습',
            href: '#'
        },
        {
            id: 7,
            title: '2025년 12월 청소년특봉대',
            label: '',
            imageSrc: '/seoul-youth-center/assets/images/gallery/gallery-07.jpg',
            imageAlt: '참가자들이 안대를 쓰고 시각장애인 체험 활동을 하는 모습',
            href: '#'
        },
        {
            id: 8,
            title: '2025년 11월 예술로 다독다독',
            label: '',
            imageSrc: '/seoul-youth-center/assets/images/gallery/gallery-08.jpg',
            imageAlt: '참가자들이 그린 내가 바라는 미래 모습 작품 전시 사진',
            href: '#'
        }
    ];

    /**
     * -----------------------------------------
     * 2) 유틸
     * -----------------------------------------
     */
    function isMobileGridMode() {
        return window.innerWidth < BREAKPOINT_MOBILE;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function getGalleryItems() {
        return Array.from(galleryTrack.querySelectorAll('.gallery__item')).filter((item) => !item.hidden);
    }

    function setButtonState(button, isAvailable) {
        if (!button) return;

        button.dataset.available = String(isAvailable);
        button.disabled = !isAvailable;
    }

    function resetButtons() {
        setButtonState(prevButton, false);
        setButtonState(nextButton, false);
    }

    function applyTranslate(value) {
        galleryTrack.style.transform = `translate3d(${-value}px, 0, 0)`;
    }

    function getLastIndex() {
        return Math.max(positions.length - 1, 0);
    }

    /**
     * -----------------------------------------
     * 3) 카드 마크업 생성
     * -----------------------------------------
     */
    function createGalleryItem(photo) {
        const item = document.createElement('li');
        item.className = 'gallery__item';

        item.innerHTML = `
            <a class="gallery__link" href="${photo.href}">
                <div class="gallery__image">
                    <img src="${photo.imageSrc}" alt="${photo.imageAlt}">
                </div>
                <div class="gallery__content">
                    <p class="gallery__title">${photo.title}
                        <span class="gallery__label">${photo.label}</span>
                    </p>
                </div>
            </a>
        `;

        return item;
    }

    /**
     * -----------------------------------------
     * 4) 리스트 렌더링
     * -----------------------------------------
     */
    function renderGallery(items) {
        galleryTrack.innerHTML = '';

        if (!items.length) {
            galleryTrack.innerHTML = '<li class="gallery__empty">등록된 활동사진이 없습니다.</li>';
            return;
        }

        const fragment = document.createDocumentFragment();

        items.forEach((photo) => {
            fragment.appendChild(createGalleryItem(photo));
        });

        galleryTrack.appendChild(fragment);
    }

    /**
     * -----------------------------------------
     * 5) 슬라이더 위치값 생성
     * - 프로그램 슬라이더와 같은 기준
     * -----------------------------------------
     */
    function buildPositions() {
        const items = getGalleryItems();

        maxTranslate = Math.max(0, galleryTrack.scrollWidth - gallerySlider.clientWidth);

        if (items.length === 0 || maxTranslate <= 1) {
            positions = [0];
            return;
        }

        const result = [];

        items.forEach((item) => {
            const clamped = clamp(item.offsetLeft, 0, maxTranslate);

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
        if (isMobileGridMode()) {
            prevButton.hidden = true;
            nextButton.hidden = true;
            resetButtons();
            return;
        }

        prevButton.hidden = false;
        nextButton.hidden = false;

        const hasPrev = currentIndex > 0;
        const hasNext = positions.length > 1 && currentIndex < getLastIndex();

        setButtonState(prevButton, hasPrev);
        setButtonState(nextButton, hasNext);
    }

    function goTo(index) {
        currentIndex = clamp(index, 0, getLastIndex());
        applyTranslate(positions[currentIndex] ?? 0);
        updateButtons();
    }

    function goNext() {
        if (isMobileGridMode()) return;
        if (currentIndex >= getLastIndex()) return;
        goTo(currentIndex + 1);
    }

    function goPrev() {
        if (isMobileGridMode()) return;
        if (currentIndex <= 0) return;
        goTo(currentIndex - 1);
    }

    /**
     * -----------------------------------------
     * 6) 드래그
     * - 모바일 grid 모드에서는 비활성
     * -----------------------------------------
     */
    function handlePointerDown(event) {
        if (isMobileGridMode()) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        startX = event.clientX;
        isDragging = true;
        galleryTrack.dataset.dragging = 'true';
    }

    function handlePointerUp(event) {
        if (!isDragging) return;

        isDragging = false;
        delete galleryTrack.dataset.dragging;

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
        delete galleryTrack.dataset.dragging;
    }

    /**
     * -----------------------------------------
     * 7) 모드 전환 / 리사이즈
     * -----------------------------------------
     */
    function syncGalleryState() {
        if (isMobileGridMode()) {
            currentIndex = 0;
            applyTranslate(0);
            updateButtons();
            return;
        }

        buildPositions();
        goTo(Math.min(currentIndex, getLastIndex()));
    }

    function handleResize() {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(() => {
            syncGalleryState();
        }, 120);
    }

    /**
     * -----------------------------------------
     * 8) 초기 실행
     * -----------------------------------------
     */
    renderGallery(activityPhotos);
    syncGalleryState();

    /**
     * -----------------------------------------
     * 9) 이벤트 바인딩
     * -----------------------------------------
     */
    prevButton.addEventListener('click', goPrev);
    nextButton.addEventListener('click', goNext);

    gallerySlider.addEventListener('pointerdown', handlePointerDown);
    gallerySlider.addEventListener('pointerup', handlePointerUp);
    gallerySlider.addEventListener('pointercancel', handlePointerCancel);
    gallerySlider.addEventListener('pointerleave', handlePointerCancel);

    window.addEventListener('resize', handleResize);
});