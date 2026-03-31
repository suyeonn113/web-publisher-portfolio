
document.addEventListener('DOMContentLoaded', () => {
    initSortSubmit();
    initProductGalleryIndicators();
});

function initSortSubmit() {
    const sortSelect = document.querySelector('#sort');

    if (!sortSelect || !sortSelect.form) return;

    sortSelect.addEventListener('change', () => {
        sortSelect.form.submit();
    });
}

function initProductGalleryIndicators() {
    const cards = document.querySelectorAll('.product__card');

    cards.forEach((card) => {
        const gallery = card.querySelector('.product__gallery');
        const items = card.querySelectorAll('.product__gallery-item');
        const dots = card.querySelectorAll('.pagination__dot');

        if (!gallery || items.length <= 1 || dots.length === 0) return;

        const updateCurrentDot = () => {
            const itemWidth = items[0].clientWidth;
            if (!itemWidth) return;

            const index = Math.round(gallery.scrollLeft / itemWidth);

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('is-current', dotIndex === index);
            });
        };

        gallery.addEventListener('scroll', updateCurrentDot, { passive: true });
        window.addEventListener('resize', updateCurrentDot);

        updateCurrentDot();
    });
}