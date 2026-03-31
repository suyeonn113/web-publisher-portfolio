document.addEventListener('DOMContentLoaded', () => {

    // Filter
    const filterButtons = Array.from(
        document.querySelectorAll('.category-nav__list button[data-category]')
    );
    const cardItems = Array.from(
        document.querySelectorAll('.catalog__list > li')
    );

    function getTokens(value) {
        return (value || '')
            .trim()
            .split(/\s+/)
            .filter(Boolean);
    }

    function isMatch(card, selectedFilter) {
        if (selectedFilter === 'all') {
            return true;
        }

        const categoryTokens = getTokens(card.dataset.category);
        const stateTokens = getTokens(card.dataset.state);

        if (selectedFilter === 'sale' || selectedFilter === 'new') {
            return stateTokens.includes(selectedFilter);
        }

        return categoryTokens.includes(selectedFilter);
    }

    function updateActiveFilter(activeButton) {
        filterButtons.forEach((button) => {
            button.setAttribute('aria-pressed', 'false');
        });

        activeButton.setAttribute('aria-pressed', 'true');
    }

    function filterCards(selectedFilter) {
        cardItems.forEach((item) => {
            const card = item.querySelector('.product__card');
            if (!card) return;

            item.hidden = !isMatch(card, selectedFilter);
        });
    }

    if (filterButtons.length && cardItems.length) {
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedFilter = button.dataset.category;
                if (!selectedFilter) return;

                updateActiveFilter(button);
                filterCards(selectedFilter);
            });
        });
    }

    // Sort
    const $sort = $('#sort');
    const $list = $('.catalog__list');

    if ($sort.length && $list.length) {
        const originalItems = $list.children('li').toArray();

        function getNumber($card, key) {
            return Number($card.data(key)) || 0;
        }

        function sortCatalog(sortValue) {
            const items = $list.children('li').toArray();

            items.sort((a, b) => {
                const $cardA = $(a).find('.product__card');
                const $cardB = $(b).find('.product__card');

                const isSoldOutA = ($cardA.data('state') || '').includes('soldout');
                const isSoldOutB = ($cardB.data('state') || '').includes('soldout');

                if (isSoldOutA !== isSoldOutB) {
                    return isSoldOutA ? 1 : -1;
                }

                if (sortValue === 'latest') {
                    return new Date($cardB.data('created-at')) - new Date($cardA.data('created-at'));
                }

                if (sortValue === 'review') {
                    return getNumber($cardB, 'review-count') - getNumber($cardA, 'review-count');
                }

                if (sortValue === 'discount') {
                    return getNumber($cardB, 'discount') - getNumber($cardA, 'discount');
                }

                return 0;
            });

            $list.empty().append(items);
        }

        $sort.on('change', function () {
            const sortValue = $(this).val();
            sortCatalog(sortValue);
        });
    }
});