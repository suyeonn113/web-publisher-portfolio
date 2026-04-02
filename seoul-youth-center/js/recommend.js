document.addEventListener('DOMContentLoaded', () => {
    /* =========================
     * 1) 요소 찾기
     * ========================= */
    const recommendSection = document.querySelector('.recommend');
    if (!recommendSection) return;

    const youthSection = recommendSection.querySelector('.recommend-result__youth');
    const educationSection = recommendSection.querySelector('.recommend-result__education');

    const youthList = youthSection?.querySelector('.recommend-result__list');
    const educationList = educationSection?.querySelector('.recommend-result__list');

    if (!youthList) return;

    /* =========================
     * 2) 초기 SSR HTML 백업
     * - 필터 전체 해제 시 복구용
     * - DB 연결 후에도 초기 렌더 fallback 역할 유지
     * ========================= */
    const initialMarkup = {
        youth: youthList.innerHTML,
        education: educationList ? educationList.innerHTML : '',
    };

    /* =========================
     * 3) 상태
     * - URL 기준
     * - age / field 동시 선택 가능
     * ========================= */
    const state = {
        age: null,
        field: null,
    };

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

    function hasActiveFilters() {
        return Boolean(state.age || state.field);
    }

    /* =========================
     * 4) 버튼 UI 반영
     * - 선택된 버튼만 true
     * - 나머지는 false
     * ========================= */
    function applyButtonState() {
        const buttons = recommendSection.querySelectorAll('.button--filter');

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
     * 5) 공통 렌더 함수
     * ========================= */
    function getEmptyMessageHtml(message = '조건에 맞는 프로그램이 없습니다.') {
        return `<p class="programs__empty">${message}</p>`;
    }

    function restoreInitialResults() {
        youthList.innerHTML = initialMarkup.youth;

        if (educationList) {
            educationList.innerHTML = initialMarkup.education;
        }
    }

    function renderEmptyResults(message) {
        youthList.innerHTML = getEmptyMessageHtml(message);

        if (educationList) {
            educationList.innerHTML = getEmptyMessageHtml(message);
        }
    }

    function renderResults(payload) {
        const youthHtml = typeof payload?.youthHtml === 'string' ? payload.youthHtml.trim() : '';
        const educationHtml = typeof payload?.educationHtml === 'string' ? payload.educationHtml.trim() : '';

        youthList.innerHTML = youthHtml || getEmptyMessageHtml();

        if (educationList) {
            educationList.innerHTML = educationHtml || getEmptyMessageHtml('조건에 맞는 프로그램이 없습니다.');
        }

        /*
         * 필요하면 여기서 슬라이더 재초기화 이벤트 발행
         * programs.js 쪽에서 듣게 만들 수 있음
         */
        document.dispatchEvent(new CustomEvent('recommend:updated'));
    }

    /* =========================
     * 6) 로딩 상태
     * ========================= */
    function setLoading(isLoading) {
        recommendSection.dataset.loading = isLoading ? 'true' : 'false';
    }

    /* =========================
     * 7) API URL 생성
     * - 로컬/서브폴더 배포 모두 대응
     * - BASE_URL 있으면 우선 사용
     * ========================= */
    function buildApiUrl() {
        return new URL('api/recommend-programs.php', window.location.href).href;
    }

    /* =========================
     * 8) 데이터 요청
     * - 필터 없으면 fetch 안 함
     * - 초기 SSR 상태 복구
     * - 결과 없음 / 요청 실패 분리
     * ========================= */
    async function fetchRecommendResults() {
        if (!hasActiveFilters()) {
            restoreInitialResults();
            setLoading(false);
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

            const rawText = await response.text();
            console.log('recommend api response:', rawText);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = JSON.parse(rawText);
            renderResults(data);
        } catch (error) {
            console.error('추천 프로그램을 불러오지 못했습니다.', error);
            renderEmptyResults('데이터를 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    }

    /* =========================
     * 9) 버튼 클릭
     * - 같은 그룹 내 단일 선택
     * - 다시 누르면 해제
     * ========================= */
    function handleFilterClick(event) {
        const button = event.target.closest('.button--filter');
        if (!button || !recommendSection.contains(button)) return;

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
     * 10) 이벤트 바인딩
     * ========================= */
    recommendSection.addEventListener('click', handleFilterClick);

    /* =========================
     * 11) 초기 실행
     * - URL에 필터가 있으면 fetch
     * - 없으면 PHP 초기 마크업 유지
     * ========================= */
    readStateFromUrl();
    applyButtonState();
    fetchRecommendResults();
});