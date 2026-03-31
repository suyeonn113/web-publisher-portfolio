
document.addEventListener('DOMContentLoaded', () => {
    const searchPanel = document.getElementById('search-panel');
    if (!searchPanel) return;

    const toggleButton = searchPanel.querySelector('.button--search__toggle');
    const searchBody = searchPanel.querySelector('#search__body');
    const searchInput = searchPanel.querySelector('#search__input');

    if (!toggleButton || !searchBody || !searchInput) return;

    let isClosing = false;

    function openSearch() {
        isClosing = false;
        searchBody.hidden = false;

        requestAnimationFrame(() => {
            searchPanel.dataset.state = 'open';
            toggleButton.setAttribute('aria-expanded', 'true');
            toggleButton.setAttribute('aria-label', '검색 실행');
            searchInput.focus();
        });
    }

    function finishClose({ focusButton = false } = {}) {
        searchBody.hidden = true;
        isClosing = false;

        if (focusButton) {
            toggleButton.focus();
        }
    }

    function closeSearch({ keepValue = false, focusButton = false } = {}) {
        if (isClosing) return;
        isClosing = true;

        searchPanel.dataset.state = 'closed';
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', '검색 열기');

        if (!keepValue) {
            searchInput.value = '';
        }

        const handleTransitionEnd = (event) => {
            if (event.target !== searchBody) return;
            if (event.propertyName !== 'clip-path') return;

            finishClose(focusButton);
        };

        searchBody.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }

    function submitSearch() {
        const keyword = searchInput.value.trim();

        if (!keyword) {
            closeSearch();
            return;
        }

        searchPanel.requestSubmit();
    }

    toggleButton.addEventListener('click', () => {
        const isOpen = searchPanel.dataset.state === 'open';

        if (!isOpen) {
            openSearch();
            return;
        }

        submitSearch();
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeSearch({ focusButton: true });
        }
    });

    document.addEventListener('pointerdown', (event) => {
        const isOpen = searchPanel.dataset.state === 'open';
        if (!isOpen) return;

        if (searchPanel.contains(event.target)) return;

        closeSearch({ keepValue: true });
    }, true);

    document.addEventListener('focusin', (event) => {
        const isOpen = searchPanel.dataset.state === 'open';
        if (!isOpen) return;

        if (searchPanel.contains(event.target)) return;

        closeSearch({ keepValue: true });
    });
});