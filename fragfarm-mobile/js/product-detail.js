document.addEventListener('DOMContentLoaded', () => {
    initProductDetailThumbs();
    initSelectedProduct();
    initWishToggle();
    initReviewSection();
    initPlaceholderActions();
});

function initProductDetailThumbs() {
    const mainImage = document.querySelector('#product-main-image');
    const thumbs = document.querySelectorAll('.product-detail__thumb');

    if (!mainImage || thumbs.length === 0) return;

    thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
            const nextSrc = thumb.dataset.imageSrc;
            const nextAlt = thumb.dataset.imageAlt || '';

            if (!nextSrc) return;

            mainImage.src = nextSrc;
            mainImage.alt = nextAlt;

            thumbs.forEach((item) => {
                const isCurrent = item === thumb;
                item.classList.toggle('is-current', isCurrent);
                item.setAttribute('aria-current', String(isCurrent));
            });
        });
    });
}

function initPlaceholderActions() {
    const buttons = document.querySelectorAll('[data-placeholder="true"]');
    const feedback = document.querySelector('.product-detail__feedback');

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            if (feedback) {
                feedback.textContent = '연결 준비중입니다.';
                clearFeedbackAfterDelay(feedback);
            }
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

    const renderSelectedProduct = (size) => {
        quantity = 1;
        selectedProduct.hidden = false;

        if (selectedName) {
            selectedName.textContent = `${productName} (${size})`;
        }

        updateQuantity();
    };

    const updateQuantity = () => {
        if (selectedQty) {
            selectedQty.textContent = String(quantity);
        }

        if (selectedPrice) {
            selectedPrice.textContent = formatPrice(unitPrice * quantity);
        }
    };

    const clearSelectedProduct = () => {
        quantity = 1;
        selectedProduct.hidden = true;

        sizeInputs.forEach((input) => {
            input.checked = false;
        });

        updateQuantity();
    };

    sizeInputs.forEach((input) => {
        input.addEventListener('change', () => {
            if (input.checked) {
                renderSelectedProduct(input.value);
            }
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
    const feedback = document.querySelector('.product-detail__feedback');

    if (!wishButton) return;

    wishButton.addEventListener('click', () => {
        const isActive = wishButton.getAttribute('aria-pressed') === 'true';
        const nextState = !isActive;

        wishButton.setAttribute('aria-pressed', String(nextState));
        wishButton.setAttribute('aria-label', nextState ? '위시리스트에서 제거' : '위시리스트 추가');

        if (feedback) {
            feedback.textContent = nextState ? '위시리스트에 담겼습니다.' : '위시리스트에서 삭제되었습니다.';
            clearFeedbackAfterDelay(feedback);
        }
    });
}

function initReviewSection() {
    const closeButtons = document.querySelectorAll('[data-review-close]');
    const deleteButtons = document.querySelectorAll('[data-comment-delete]');
    const loginRequiredControls = document.querySelectorAll('[data-login-required]');
    const feedback = document.querySelector('.product-detail__feedback');

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

            if (feedback) {
                feedback.textContent = '로그인 후 이용해 주세요.';
                clearFeedbackAfterDelay(feedback);
            } else {
                window.alert('로그인 후 이용해 주세요.');
            }
        });
    });
}

let feedbackTimer;

function clearFeedbackAfterDelay(feedback) {
    window.clearTimeout(feedbackTimer);

    feedbackTimer = window.setTimeout(() => {
        feedback.textContent = '';
    }, 1800);
}
