document.addEventListener('DOMContentLoaded', () => {
    initProductDetailThumbs();
    initSelectedProduct();
    initWishToggle();
    initReviewSection();
    initReviewWrite();
    initQnaSection();
    initPlaceholderActions();
});

function initProductDetailThumbs() {
    const mainImage = document.querySelector('#product-main-image');
    const thumbs = Array.from(document.querySelectorAll('.product-detail__thumb'));

    if (!mainImage || thumbs.length === 0) return;

    let currentIndex = thumbs.findIndex((thumb) => thumb.classList.contains('is-current'));
    let swipeStartX = 0;
    let swipeStartY = 0;

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    const renderImage = (index) => {
        const nextIndex = (index + thumbs.length) % thumbs.length;
        const nextThumb = thumbs[nextIndex];
        const nextSrc = nextThumb.dataset.imageSrc;
        const nextAlt = nextThumb.dataset.imageAlt || '';

        if (!nextSrc) return;

        currentIndex = nextIndex;
        mainImage.src = nextSrc;
        mainImage.alt = nextAlt;

        thumbs.forEach((item, itemIndex) => {
            const isCurrent = itemIndex === currentIndex;
            item.classList.toggle('is-current', isCurrent);
            item.setAttribute('aria-current', String(isCurrent));
        });

        nextThumb.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    };

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            renderImage(index);
        });
    });

    mainImage.addEventListener('pointerdown', (event) => {
        swipeStartX = event.clientX;
        swipeStartY = event.clientY;
    });

    mainImage.addEventListener('pointerup', (event) => {
        const deltaX = event.clientX - swipeStartX;
        const deltaY = event.clientY - swipeStartY;

        if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;

        renderImage(currentIndex + (deltaX < 0 ? 1 : -1));
    });
}

function initPlaceholderActions() {
    const buttons = document.querySelectorAll('[data-placeholder="true"]');

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            showProductToast(button.dataset.toastMessage || getPlaceholderMessage(button));
        });
    });
}

function initSelectedProduct() {
    const orderForm = document.querySelector('.product-detail__order');
    const selectedProduct = document.querySelector('[data-selected-product]');

    if (!orderForm || !selectedProduct) return;

    const sizeInputs = orderForm.querySelectorAll('input[name="size"]');
    const selectedName = selectedProduct.querySelector('[data-selected-name]');
    const selectedQty = selectedProduct.querySelector('[data-selected-qty]');
    const selectedPrice = selectedProduct.querySelector('[data-selected-price]');
    const removeButton = selectedProduct.querySelector('[data-selected-remove]');
    const qtyButtons = selectedProduct.querySelectorAll('[data-qty-action]');
    const productName = selectedProduct.dataset.productName || '';
    const unitPrice = Number(selectedProduct.dataset.unitPrice || 0);
    let quantity = 1;

    const formatPrice = (price) => `${price.toLocaleString('ko-KR')}원`;

    const updateQuantity = () => {
        if (selectedQty) {
            selectedQty.textContent = String(quantity);
        }

        if (selectedPrice) {
            selectedPrice.textContent = formatPrice(unitPrice * quantity);
        }
    };

    const renderSelectedProduct = (size) => {
        quantity = 1;
        selectedProduct.hidden = false;

        if (selectedName) {
            selectedName.textContent = `${productName} (${size})`;
        }

        updateQuantity();
    };

    const clearSelectedProduct = () => {
        quantity = 1;
        selectedProduct.hidden = true;

        sizeInputs.forEach((input) => {
            input.checked = false;
            input.dataset.wasChecked = 'false';
        });

        updateQuantity();
    };

    sizeInputs.forEach((input) => {
        input.addEventListener('click', () => {
            const isAlreadyChecked = input.dataset.wasChecked === 'true';

            sizeInputs.forEach((item) => {
                item.dataset.wasChecked = 'false';
            });

            if (isAlreadyChecked) {
                input.checked = false;
                clearSelectedProduct();
                return;
            }

            input.checked = true;
            input.dataset.wasChecked = 'true';

            renderSelectedProduct(input.value);
        });
    });

    qtyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const action = button.dataset.qtyAction;

            if (action === 'increase') {
                quantity += 1;
            }

            if (action === 'decrease') {
                quantity = Math.max(1, quantity - 1);
            }

            updateQuantity();
        });
    });

    removeButton?.addEventListener('click', clearSelectedProduct);
}

function initWishToggle() {
    const wishButton = document.querySelector('[data-wish-toggle]');

    if (!wishButton) return;

    wishButton.addEventListener('click', (event) => {
        event.preventDefault();

        const isActive = wishButton.getAttribute('aria-pressed') === 'true';
        const nextState = !isActive;

        wishButton.setAttribute('aria-pressed', String(nextState));
        wishButton.setAttribute('aria-label', nextState ? '위시리스트에서 제거' : '위시리스트 추가');
        showProductToast(wishButton.dataset.toastMessage || '준비중입니다.');
    });
}

function initReviewSection() {
    const closeButtons = document.querySelectorAll('[data-review-close]');
    const deleteButtons = document.querySelectorAll('[data-comment-delete]');
    const loginRequiredControls = document.querySelectorAll('[data-login-required]');

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const reviewItem = button.closest('.review-item');

            if (reviewItem) {
                reviewItem.open = false;
            }
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.closest('.review-comment')?.remove();
        });
    });

    loginRequiredControls.forEach((control) => {
        control.addEventListener('click', (event) => {
            event.preventDefault();
            showProductToast(control.dataset.toastMessage || '로그인 후 이용해주세요.');
        });
    });
}

function initReviewWrite() {
    const reviewForm = document.querySelector('[data-review-write]');

    if (!reviewForm) return;

    const panel = reviewForm.querySelector('[data-review-write-panel]');
    const toggleButton = reviewForm.querySelector('[data-review-write-toggle]');
    const isLoggedOut = reviewForm.querySelector('[data-login-required]') !== null;

    if (!isLoggedOut && panel && toggleButton) {
        toggleButton.addEventListener('click', (event) => {
            event.preventDefault();

            const shouldOpen = panel.hidden;

            panel.hidden = !shouldOpen;
            toggleButton.classList.toggle('is-active', shouldOpen);
            toggleButton.setAttribute('aria-expanded', String(shouldOpen));
        });

        return;
    }

    reviewForm.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        showProductToast('로그인 후 이용해주세요.');
    }, true);
}

function initQnaSection() {
    const qnaForm = document.querySelector('.qna-form');

    if (!qnaForm) return;

    const isLoggedOut = document.querySelector('[data-login-required]') !== null;
    const controls = qnaForm.querySelectorAll('textarea, button');

    controls.forEach((control) => {
        control.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            showProductToast(isLoggedOut ? '로그인 후 이용해주세요.' : '상품 문의를 남겨주세요.');
        });
    });
}

function getPlaceholderMessage(control) {
    if (control.closest('[data-review-write]')) {
        return '후기를 남겨주세요.';
    }

    if (control.closest('.review-comment-form')) {
        return '댓글을 작성해주세요.';
    }

    if (control.closest('.qna-form')) {
        return '상품 문의를 남겨주세요.';
    }

    return '준비중입니다.';
}

let productToastTimer;

function showProductToast(message) {
    const toast = getProductToast();

    if (!toast) return;

    window.clearTimeout(productToastTimer);
    toast.textContent = message;
    toast.hidden = false;

    productToastTimer = window.setTimeout(() => {
        toast.hidden = true;
    }, 1800);
}

function getProductToast() {
    const existingToast = document.querySelector('[data-product-toast]');

    if (existingToast) return existingToast;

    const toast = document.createElement('p');
    toast.className = 'product-toast';
    toast.dataset.productToast = '';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.hidden = true;

    document.querySelector('.mobile-shell')?.appendChild(toast);

    return toast;
}
