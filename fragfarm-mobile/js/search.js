document.addEventListener('DOMContentLoaded', () => {
    const PAGE_SIZE = 4;

    const params = new URLSearchParams(window.location.search);
    const keywordRaw = params.get('q') || '';
    const keyword = normalize(keywordRaw);

    const resultText = document.querySelector('#search-result-text');
    const resultCount = document.querySelector('#search-result-count');
    const emptyBox = document.querySelector('#search-empty');
    const list = document.querySelector('#search-result-list');
    const moreButton = document.querySelector('[data-action="load-more"]');
    const searchInput = document.querySelector('.search__input');
    const cards = Array.from(document.querySelectorAll('#search-result-list .product__card'));

    if (!resultText || !resultCount || !emptyBox || !list || !moreButton) return;

    const categoryAliasMap = {
        top: ['top', 'tops', 'shirt', 'shirts', 'tee', 't-shirt', 'blouse'],
        bottom: ['bottom', 'bottoms', 'pants', 'trousers', 'skirt', 'skirts'],
        outer: ['outer', 'outers', 'jacket', 'jackets', 'coat', 'coats', 'cardigan'],
        dress: ['dress', 'dresses', 'onepiece', 'one-piece'],
        acc: ['acc', 'accessory', 'accessories', 'bag', 'bags', 'hat', 'hats']
    };

    let matchedItems = [];
    let visibleLimit = PAGE_SIZE;

    function normalize(text) {
        return String(text || '')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getCanonicalCategory(rawCategory) {
        const normalizedCategory = normalize(rawCategory);
        if (!normalizedCategory) return '';

        for (const [key, aliases] of Object.entries(categoryAliasMap)) {
            if (key === normalizedCategory || aliases.includes(normalizedCategory)) {
                return key;
            }
        }

        return normalizedCategory;
    }

    function getCategorySearchTerms(rawCategory) {
        const canonicalCategory = getCanonicalCategory(rawCategory);
        if (!canonicalCategory) return [];

        return [canonicalCategory, ...(categoryAliasMap[canonicalCategory] || [])];
    }

    function hideAllItems() {
        cards.forEach((card) => {
            const item = card.closest('li');
            if (item) item.hidden = true;
        });
    }

    function updateMoreButton() {
        if (matchedItems.length === 0 || matchedItems.length <= visibleLimit) {
            moreButton.hidden = true;
            return;
        }

        moreButton.hidden = false;
    }

    function renderVisibleItems() {
        hideAllItems();

        matchedItems.slice(0, visibleLimit).forEach((item) => {
            item.hidden = false;
        });

        updateMoreButton();
    }

    function collectMatchedItems() {
        return cards.reduce((acc, card) => {
            const name = normalize(card.dataset.name);
            const states = normalize(card.dataset.state).split(' ').filter(Boolean);
            const categoryTerms = getCategorySearchTerms(card.dataset.category);

            const searchableText = normalize([
                name,
                ...categoryTerms,
                ...states
            ].join(' '));

            const isMatch = searchableText.includes(keyword);
            const item = card.closest('li');

            if (isMatch && item) {
                acc.push(item);
            }

            return acc;
        }, []);
    }

    if (searchInput) {
        searchInput.value = keywordRaw;
    }

    if (!keyword) {
        resultCount.textContent = '';
        emptyBox.hidden = false;
        list.hidden = true;
        moreButton.hidden = true;
        hideAllItems();
        return;
    }

    matchedItems = collectMatchedItems();
    visibleLimit = PAGE_SIZE;

    resultText.textContent = `"${keywordRaw}" 검색 결과`;
    resultCount.textContent = `총 ${matchedItems.length}개 상품`;

    if (matchedItems.length === 0) {
        emptyBox.hidden = false;
        list.hidden = true;
        moreButton.hidden = true;
        hideAllItems();
        return;
    }

    emptyBox.hidden = true;
    list.hidden = false;
    renderVisibleItems();

    moreButton.addEventListener('click', () => {
        visibleLimit += PAGE_SIZE;
        renderVisibleItems();
    });
});