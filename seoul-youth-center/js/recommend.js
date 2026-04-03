document.addEventListener('DOMContentLoaded', () => {
    /* =========================
     * 1) 요소 찾기
     * ========================= */
    const recommendSection = document.querySelector('.recommend');
    if (!recommendSection) return;

    const form = recommendSection.querySelector('.recommend-filter');
    if (!form) return;

    const youthSection = recommendSection.querySelector('.recommend-result__youth');
    const educationSection = recommendSection.querySelector('.recommend-result__education');

    function getResultElements(section) {
        if (!section) return null;

        const body = section.querySelector('.recommend-result__body');
        const status = section.querySelector('.recommend-result__status');

        // 청소년 결과 구조
        const recommendSlider = section.querySelector('.recommend-result__slider');
        const recommendList = section.querySelector('.recommend-result__list');

        // 평생교육 결과 구조
        const educationSlider = section.querySelector('.education__slider');
        const educationList = section.querySelector('.education__track');

        const slider = recommendSlider || educationSlider || null;
        const list = recommendList || educationList || null;

        return {
            section,
            body,
            status,
            slider,
            list,
            prevBtn: section.querySelector('.programs__prev, .education__prev'),
            nextBtn: section.querySelector('.programs__next, .education__next'),
            moreBtn: section.querySelector('.button--more'),
            mode: recommendList ? 'ajax' : (educationList ? 'ssr' : 'unknown'),
        };
    }

    const youth = getResultElements(youthSection);
    const education = getResultElements(educationSection);

    if (!youth || !youth.list) return;

    /* =========================
     * 2) 상태
     * ========================= */
    const state = {
        age: null,
        field: null,
    };

    function hasActiveFilters() {
        return Boolean(state.age || state.field);
    }

    function readStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        state.age = params.get('age') || null;
        state.field = params.get('field') || null;
    }

    function writeStateToUrl() {
        const params = new URLSearchParams(window.location.search);

        if (state.age) {
            params.set('age', state.age);
        } else {
            params.delete('age');
        }

        if (state.field) {
            params.set('field', state.field);
        } else {
            params.delete('field');
        }

        const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
        window.history.replaceState({}, '', nextUrl);
    }

    /* =========================
     * 3) 버튼 UI 반영
     * ========================= */
    function applyButtonState() {
        const buttons = form.querySelectorAll('.button--filter');

        form.dataset.hasSelection = hasActiveFilters() ? 'true' : 'false';

        buttons.forEach((button) => {
            const { name, value } = button;
            let isSelected = false;

            if (name === 'age') {
                isSelected = state.age === value;
            }

            if (name === 'field') {
                isSelected = state.field === value;
            }

            button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        });
    }

    /* =========================
     * 4) 컨트롤 상태
     * ========================= */
    function disableSectionControls(elements) {
        if (!elements) return;

        if (elements.prevBtn) {
            elements.prevBtn.disabled = true;
            elements.prevBtn.dataset.available = 'false';
        }

        if (elements.nextBtn) {
            elements.nextBtn.disabled = true;
            elements.nextBtn.dataset.available = 'false';
        }

        if (elements.moreBtn) {
            elements.moreBtn.hidden = true;
            elements.moreBtn.setAttribute('aria-hidden', 'true');
        }
    }

    function enableSectionControls(elements) {
        if (!elements) return;

        if (elements.prevBtn) {
            elements.prevBtn.disabled = false;
            elements.prevBtn.dataset.available = 'true';
        }

        if (elements.nextBtn) {
            elements.nextBtn.disabled = false;
            elements.nextBtn.dataset.available = 'true';
        }

        if (elements.moreBtn) {
            elements.moreBtn.hidden = false;
            elements.moreBtn.removeAttribute('aria-hidden');
        }
    }

    /* =========================
     * 5) 상태 메시지 유틸
     * ========================= */
    function ensureStatusElement(elements) {
        if (!elements) return null;
        if (elements.status) return elements.status;

        const status = document.createElement('p');
        status.className = 'programs__empty recommend-result__status';
        status.setAttribute('aria-live', 'polite');

        if (elements.slider && elements.slider.parentNode) {
            elements.slider.parentNode.insertBefore(status, elements.slider);
        } else if (elements.body) {
            elements.body.appendChild(status);
        } else {
            elements.section.appendChild(status);
        }

        elements.status = status;
        return status;
    }

    /* =========================
     * 6) 결과 영역 렌더링
     * ========================= */
    function resetSliderPosition(elements) {
        if (!elements || !elements.list) return;
        elements.list.style.transform = 'translate3d(0, 0, 0)';
    }

    function renderSectionIdle(elements, message = '기준을 선택해주세요.') {
        if (!elements) return;

        elements.section.dataset.state = 'idle';
        if (elements.body) elements.body.dataset.state = 'idle';

        const status = ensureStatusElement(elements);

        if (status) {
            status.textContent = message;
            status.hidden = false;
        }

        if (elements.slider) {
            elements.slider.hidden = true;
        }

        if (elements.list) {
            elements.list.innerHTML = '';
            resetSliderPosition(elements);
        }

        disableSectionControls(elements);
    }

    function renderSectionEmpty(elements, message = '등록된 프로그램이 없습니다.') {
        if (!elements) return;

        elements.section.dataset.state = 'empty';
        if (elements.body) elements.body.dataset.state = 'empty';

        const status = ensureStatusElement(elements);

        if (status) {
            status.textContent = message;
            status.hidden = false;
        }

        if (elements.slider) {
            elements.slider.hidden = true;
        }

        if (elements.list) {
            elements.list.innerHTML = '';
            resetSliderPosition(elements);
        }

        disableSectionControls(elements);
    }

    function renderSectionReady(elements, html) {
        if (!elements) return;

        const normalizedHtml = typeof html === 'string' ? html.trim() : '';

        if (!normalizedHtml) {
            renderSectionEmpty(elements);
            return;
        }

        elements.section.dataset.state = 'ready';
        if (elements.body) elements.body.dataset.state = 'ready';

        if (elements.list) {
            elements.list.innerHTML = normalizedHtml;
            resetSliderPosition(elements);
        }

        const status = ensureStatusElement(elements);
        if (status) {
            status.hidden = true;
        }

        if (elements.slider) {
            elements.slider.hidden = false;
        }

        enableSectionControls(elements);
    }

    function renderIdleResults() {
        renderSectionIdle(youth, '기준을 선택해주세요.');
        renderSectionIdle(education, '기준을 선택해주세요.');
        document.dispatchEvent(new CustomEvent('recommend:updated'));
    }

    function renderErrorResults() {
        renderSectionEmpty(youth, '데이터를 불러오지 못했습니다.');
        renderSectionEmpty(education, '데이터를 불러오지 못했습니다.');
        document.dispatchEvent(new CustomEvent('recommend:updated'));
    }

    function renderResults(payload) {
        const youthHtml = typeof payload?.youthHtml === 'string' ? payload.youthHtml : '';
        const educationHtml = typeof payload?.educationHtml === 'string' ? payload.educationHtml : '';

        if (youthHtml.trim()) {
            renderSectionReady(youth, youthHtml);
        } else {
            renderSectionEmpty(youth, '등록된 프로그램이 없습니다.');
        }

        if (education) {
            if (educationHtml.trim()) {
                renderSectionReady(education, educationHtml);
            } else {
                renderSectionEmpty(education, '등록된 프로그램이 없습니다.');
            }
        }

        document.dispatchEvent(new CustomEvent('recommend:updated'));
    }

    /* =========================
     * 7) 로딩 상태
     * ========================= */
    function setLoading(isLoading) {
        recommendSection.dataset.loading = isLoading ? 'true' : 'false';
    }

    /* =========================
     * 8) API URL 생성
     * ========================= */
    function buildApiUrl() {
        const basePath = window.location.pathname.replace(/\/[^/]*$/, '/');
        return new URL(`${basePath}api/recommend-programs.php`, window.location.origin).href;
    }

    /* =========================
     * 9) 데이터 요청
     * ========================= */
    async function fetchRecommendResults() {
        if (!hasActiveFilters()) {
            setLoading(false);
            renderIdleResults();
            return;
        }

        const params = new URLSearchParams();

        if (state.age) params.set('age', state.age);
        if (state.field) params.set('field', state.field);

        const url = `${buildApiUrl()}?${params.toString()}`;

        setLoading(true);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            renderResults(data);
        } catch (error) {
            console.error('추천 프로그램을 불러오지 못했습니다.', error);
            renderErrorResults();
        } finally {
            setLoading(false);
        }
    }

    /* =========================
     * 10) 필터 클릭
     * ========================= */
    function handleFilterClick(event) {
        const button = event.target.closest('.button--filter');
        if (!button || !form.contains(button)) return;

        const { name, value } = button;
        if (!name || !value) return;

        if (name === 'age') {
            state.age = state.age === value ? null : value;
        }

        if (name === 'field') {
            state.field = state.field === value ? null : value;
        }

        applyButtonState();
        writeStateToUrl();
        fetchRecommendResults();
    }

    /* =========================
     * 11) 이벤트 바인딩
     * ========================= */
    form.addEventListener('click', handleFilterClick);

    /* =========================
     * 12) 초기 실행
     * ========================= */
    readStateFromUrl();
    applyButtonState();
    fetchRecommendResults();
});