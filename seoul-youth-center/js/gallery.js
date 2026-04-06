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

    const galleryList = gallerySection.querySelector('.gallery__list');
    const prevButton = gallerySection.querySelector('.gallery__prev');
    const nextButton = gallerySection.querySelector('.gallery__next');

    if (!galleryList || !prevButton || !nextButton) return;

    const BREAKPOINT_MOBILE = 480;
    let resizeTimer = null;

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
            imageSrc: '../assets/images/gallery/gallery-01.jpg',
            imageAlt: '프로그램 참여자들이 실내에서 활동에 참여하고 있는 모습',
            href: '#'
        },
        {
            id: 2,
            title: '2026년 청소년 연합 발대식',
            label: '',
            imageSrc: '../assets/images/gallery/gallery-02.jpg',
            imageAlt: '청소년들이 현수막을 들고 있는 단체 사진',
            href: '#'
        },
        {
            id: 3,
            title: '2026년 3월 특성화사업 움: 트다',
            label: '[움아트]',
            imageSrc: '../assets/images/gallery/gallery-03.jpg',
            imageAlt: '청소년들이 직접 만든 작품을 들고 있는 모습',
            href: '#'
        },
        {
            id: 4,
            title: '2026년 인공지능 청소년 프로그램 기획단',
            label: '[서울AI메이커]',
            imageSrc: '../assets/images/gallery/gallery-04.jpg',
            imageAlt: '참여 청소년들의 단체 사진',
            href: '#'
        },
        {
            id: 5,
            title: '2026년 2월 24기 청소년운영위원회',
            label: '[청춘]',
            imageSrc: '../assets/images/gallery/gallery-05.jpg',
            imageAlt: '청소년들이 원으로 모여 회의를 진행하고 있는 모습',
            href: '#'
        },
        {
            id: 6,
            title: '2026년 겨울방학 우.다.다 프로젝트',
            label: '',
            imageSrc: '../assets/images/gallery/gallery-06.jpg',
            imageAlt: '참여자들이 둥글게 둥글게 활동을 진행하고 있는 모습',
            href: '#'
        },
        {
            id: 7,
            title: '2025년 12월 청소년특봉대',
            label: '',
            imageSrc: '../assets/images/gallery/gallery-07.jpg',
            imageAlt: '참가자들이 안대를 쓰고 시각장애인 체험 활동을 하는 모습',
            href: '#'
        },
        {
            id: 8,
            title: '2025년 11월 예술로 다독다독',
            label: '',
            imageSrc: '../assets/images/gallery/gallery-08.jpg',
            imageAlt: '참가자들이 그린 내가 바라는 미래 모습 작품 전시 사진',
            href: '#'
        }
    ];

    /**
     * -----------------------------------------
     * 2) 카드 마크업 생성
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
     * 3) 리스트 렌더링
     * -----------------------------------------
     */
    function renderGallery(items) {
        galleryList.innerHTML = '';

        if (!items.length) {
            galleryList.innerHTML = '<li class="gallery__empty">등록된 활동사진이 없습니다.</li>';
            return;
        }

        const fragment = document.createDocumentFragment();

        items.forEach((photo) => {
            fragment.appendChild(createGalleryItem(photo));
        });

        galleryList.appendChild(fragment);
    }

    /**
     * -----------------------------------------
     * 4) 모바일 여부
     * -----------------------------------------
     */
    function isMobileGridMode() {
        return window.innerWidth < BREAKPOINT_MOBILE;
    }

    /**
     * -----------------------------------------
     * 5) 카드 1칸 이동 거리 계산
     * -----------------------------------------
     */
    function getMoveDistance() {
        const firstItem = galleryList.querySelector('.gallery__item');
        if (!firstItem) return 0;

        const itemWidth = firstItem.getBoundingClientRect().width;
        const listStyle = window.getComputedStyle(galleryList);
        const gap = parseFloat(listStyle.columnGap || listStyle.gap || 0);

        return itemWidth + gap;
    }

    /**
     * -----------------------------------------
     * 6) 버튼 상태 갱신
     * - 모바일에서는 버튼 숨김 + 비활성
     * - 슬라이더에서는 disabled / data-available 동시 관리
     * -----------------------------------------
     */
    function updateButtonState() {
        if (isMobileGridMode()) {
            prevButton.hidden = true;
            nextButton.hidden = true;

            prevButton.disabled = true;
            nextButton.disabled = true;

            prevButton.dataset.available = 'false';
            nextButton.dataset.available = 'false';

            return;
        }

        prevButton.hidden = false;
        nextButton.hidden = false;

        const maxScrollLeft = galleryList.scrollWidth - galleryList.clientWidth;
        const currentScrollLeft = Math.ceil(galleryList.scrollLeft);

        const prevAvailable = currentScrollLeft > 0;
        const nextAvailable = currentScrollLeft < maxScrollLeft - 1;

        prevButton.disabled = !prevAvailable;
        nextButton.disabled = !nextAvailable;

        prevButton.dataset.available = String(prevAvailable);
        nextButton.dataset.available = String(nextAvailable);
    }

    /**
     * -----------------------------------------
     * 7) 버튼으로 1칸 이동
     * -----------------------------------------
     */
    function scrollGallery(direction) {
        if (isMobileGridMode()) return;

        const moveDistance = getMoveDistance();
        if (!moveDistance) return;

        galleryList.scrollBy({
            left: direction * moveDistance,
            behavior: 'smooth'
        });
    }

    /**
     * -----------------------------------------
     * 8) 모드 전환 대응
     * - 모바일로 내려오면 스크롤 위치 초기화
     * -----------------------------------------
     */
    function syncGalleryState() {
        if (isMobileGridMode()) {
            galleryList.scrollLeft = 0;
        }

        updateButtonState();
    }

    function handleResize() {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(() => {
            syncGalleryState();
        }, 120);
    }

    /**
     * -----------------------------------------
     * 9) 초기 실행
     * -----------------------------------------
     */
    renderGallery(activityPhotos);
    syncGalleryState();

    /**
     * -----------------------------------------
     * 10) 이벤트 바인딩
     * -----------------------------------------
     */
    prevButton.addEventListener('click', () => {
        scrollGallery(-1);
    });

    nextButton.addEventListener('click', () => {
        scrollGallery(1);
    });

    galleryList.addEventListener('scroll', () => {
        if (isMobileGridMode()) return;
        updateButtonState();
    });

    window.addEventListener('resize', handleResize);
});