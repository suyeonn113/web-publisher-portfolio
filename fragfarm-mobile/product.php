<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile-Project</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/typograph.css">

    <link rel="icon" href="assets/icons/favicon.ico">
    <link rel="icon" href="assets/icons/favicon.png">
    <link rel="apple-touch-icon" href="assets/icons/favicon.png">

    <link rel="stylesheet" href="css/layout/header.css">
    <link rel="stylesheet" href="css/layout/footer.css">

    <link rel="stylesheet" href="css/component/button.css">
    <link rel="stylesheet" href="css/component/card.css">

    <link rel="stylesheet" href="css/pages/product.css">
</head>
<body>
<!-- Header -->
<?php include __DIR__ . '/includes/header.php'; ?>

<main id="main">
    <!-- Category -->
    <nav class="category-nav" aria-label="상품 카테고리">
        <ul class="category-nav__list">
            <li><a 
                    href="#"
                    data-category="sale">
                    SALE
                </a>
            </li>
            <li><a 
                    href="#"
                    aria-current="page"
                    data-category="all">
                    ALL
                </a>
            </li>
            <li><a 
                    href="#"
                    data-category="new">
                    NEW
                </a>
            </li>
            <li><a 
                    href="#"
                    data-category="skirts">
                    Skirts
                </a>
            </li>
            <li><a 
                    href="#"
                    data-category="bottoms">
                    Bottoms
                </a>
            </li>
            <li><a 
                    href="#"
                    data-category="tops">
                    Tops
                </a>
            </li>
            <li><a 
                    href="#"
                    data-category="accessories">
                    Accessories
                </a>
            </li>
        </ul>
    </nav>
    <!--  -->
    <section class="catalog-toolbar" aria-label="상품 목록 제어">
        <!-- View Toggle -->
        <div class="view-toggle" role="group">
            표시 제품 수
            <button 
                class="view-toggle__btn" 
                type="button"
                aria-pressed="false"
                data-view="1col">
                1
            </button>
            <button 
                class="view-toggle__btn" 
                type="button"
                aria-pressed="true"
                data-view="2col">
                2
            </button>
        </div>
        <!-- Catalog Sort -->
        <label class="visually-hidden" for="sort">
            정렬 기준
        </label>
        <select id="sort" name="sort" class="catalog-sort">
            <option value="latest">최신순</option>
            <option value="review">후기 많은 순</option>
            <option value="discount">높은 할인율 순</option>
        </select> 
    </section>
    <section class="catalog">
        <!-- Product Actions Form -->
        <form id="product-form" class="product-form" data-module="product">
            <!-- Product Name -->
            <p 
                class="product-form__name"
                data-role="product-name">
                [ SET 1 ] - Peony Flower Wrap T-Shirt + Floral Lace Wrap Skirt
            </p>
            <input type="hidden" name="product_id" value="set-001">
            <!-- Size Selector -->
            <fieldset class="product-form__size">
                <legend>사이즈</legend>
                <label class="product-form__size-option">
                    <input type="radio" name="size" value="S" required>
                    <span>S</span>
                </label>
                <label class="product-form__size-option">
                    <input type="radio" name="size" value="M">
                    <span>M</span>
                </label>
                <label class="product-form__size-option">
                    <input type="radio" name="size" value="L">
                    <span>L</span>
                </label>
                <label class="product-form__size-option">
                    <input type="radio" name="size" value="XL">
                    <span>XL</span>
                </label>
            </fieldset>
            <!-- Quantity -->
            <input type="hidden" name="qty" value="1">
            <!-- Cart Feedback -->
            <p  
                id="product-feedback"
                class="product-form__feedback" 
                role="status" 
                aria-live="polite" 
                aria-atomic="true"
                data-role="product-feedback">
            </p>
            <div class="product-form__btn">
                <button class="product-form__btn--buy" type="submit">구매하기</button>
                <button class="product-form__btn--cart" type="button">장바구니 담기</button>
            </div>
        </form>
        <!-- Product Card -->
        <ul class="catalog__list" data-view="2col">
        <!------------Product 1------------>
            <li>
                <article
                    class="product__card product__card--detail" 
                    data-id="set-001"
                    data-name="[ SET 1 ] - Peony Flower Wrap T-Shirt + Floral Lace Wrap Skirt"
                    data-price="104400"
                    data-original-price="116000"
                    data-discount="10"
                    data-image="assets/images/product/all/all-1-1.jpg"
                    data-category="all"
                    data-state="new sale">
                    <a 
                        class="product__link" 
                        href="#" 
                        data-role="link">
                        <div class="product__media">
                            <!-- Product Image Gallery -->
                            <div class="product__gallery" aria-label="상품 이미지 미리보기">
                                <ul class="product__gallery-track">
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-1.jpg" 
                                            alt="Peony Flower 랩 티셔츠 블랙 + Floral Lace 랩 스커트 블랙 세트 착용 이미지">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-2.jpg" 
                                            alt="Peony Flower 랩 티셔츠 블랙 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-3.jpg" 
                                            alt="Floral Lace 랩 스커트 블랙 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-4.jpg" 
                                            alt="Peony Flower 랩 티셔츠 화이트 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-5.jpg" 
                                            alt="Floral Lace 랩 스커트 화이트 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-6.jpg" 
                                            alt="Peony Flower 랩 티셔츠 그레이 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-7.jpg" 
                                            alt="Peony Flower 랩 티셔츠 화이트 착용 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-8.jpg" 
                                            alt="Floral Lace 랩 스커트 화이트 매듭 디테일">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-1-9.jpg" 
                                            alt="Peony Flower 랩 티셔츠 그레이 착용 정면">
                                    </li>
                                </ul>
                            </div>
                            <!-- Pagination -->
                            <nav class="pagination__dots" aria-label="상품 이미지 슬라이드">
                                <button type="button" aria-label="1번째 이미지" aria-current="true"></button>
                                <button type="button" aria-label="2번째 이미지"></button>
                                <button type="button" aria-label="3번째 이미지"></button>
                                <button type="button" aria-label="4번째 이미지"></button>
                                <button type="button" aria-label="5번째 이미지"></button>
                                <button type="button" aria-label="6번째 이미지"></button>
                                <button type="button" aria-label="7번째 이미지"></button>
                                <button type="button" aria-label="8번째 이미지"></button>
                                <button type="button" aria-label="9번째 이미지"></button>
                            </nav>
                            <!-- Badge -->
                            <span 
                                class="product__badge" 
                                data-role="product-badge"
                                aria-label="신제품">
                                NEW
                            </span>
                        </div>
                    
                        <!-- Name + Price -->
                        <div class="product__meta">
                            <h3 class="product__name" data-role="product-name">
                                [ SET 1 ] - Peony Flower Wrap T-Shirt + Floral Lace Wrap Skirt
                            </h3>
                            <p class="product__price" data-role="product-price">
                                <span class="product__price--discount" data-role="product-price-discount">
                                    10%
                                </span>
                                <span class="product__price--original" data-role="product-price-original">
                                    116,000원
                                </span>
                                <span class="product__price--sale" data-role="product-price-sale">
                                    104,400원
                                </span>
                            </p>
                            <!-- Review Rating-->
                            <p class="product__rating" aria-label="평점 5점 만점에 0점, 리뷰 0개">
                                <span class="product__rating-value" data-role="product-rating">0.0</span>
                                <span class="product__rating-count" data-role="product-review-count">(0개)</span>
                            </p>
                        </div>
                    </a>
                    <!-- Product Actions -->
                    <div class="product__actions-icon">
                        <button 
                            class="product__btn product__btn--cart" 
                            type="button" 
                            data-action="add-to-cart" 
                            aria-label="장바구니에 담기">
                                <svg viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                                </svg>
                        </button>
                        <button 
                            class="product__btn product__btn--wish"
                            type="button" 
                            data-action="toggle-wish"
                            aria-pressed="false" 
                            aria-label="위시리스트에 추가">
                                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                                </svg>
                        </button>
                    </div>
                </article> 
            </li>
        <!------------Product 2------------>
            <li>
                <article 
                    class="product__card product__card--detail" 
                    data-id="set-002"
                    data-name="[ SET 2 ] - Floral Lace Scarf + Floral Lace Wrap Skirt"
                    data-price="90900"
                    data-original-price="101000"
                    data-discount="10"
                    data-image="assets/images/product/all/all-2-1.jpg"
                    data-category="all"
                    data-state="new sale">
                    <a 
                        class="product__link" 
                        href="#" 
                        data-role="link">
                        <div class="product__media">
                            <!-- Product Image Gallery -->
                            <div class="product__gallery" aria-label="상품 이미지 미리보기">
                                <ul class="product__gallery-track">
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-2-1.jpg" 
                                            alt="Floral Lace 스카프 화이트 + Floral Lace 랩 스커트 화이트 세트 착용 이미지">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-2-2.jpg" 
                                            alt="Floral Lace 스카프 화이트 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-2-3.jpg" 
                                            alt="Floral Lace 랩 스커트 화이트 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-2-4.jpg" 
                                            alt="Floral Lace 스카프 블랙 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-2-5.jpg" 
                                            alt="Floral Lace 랩 스커트 화이트 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-2-6.jpg" 
                                            alt="Cherry Blossom 자수 쉬폰 스카프 아이보리 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-2-7.jpg" 
                                            alt="Cherry Blossom 자수 쉬폰 스카프 블랙 단품 정면">
                                    </li>
                                </ul>
                            </div>
                            <!-- Pagination -->
                            <nav class="pagination__dots" aria-label="상품 이미지 슬라이드">
                                <button type="button" aria-label="1번째 이미지" aria-current="true"></button>
                                <button type="button" aria-label="2번째 이미지"></button>
                                <button type="button" aria-label="3번째 이미지"></button>
                                <button type="button" aria-label="4번째 이미지"></button>
                                <button type="button" aria-label="5번째 이미지"></button>
                                <button type="button" aria-label="6번째 이미지"></button>
                                <button type="button" aria-label="7번째 이미지"></button>
                            </nav>
                            <!-- Badge -->
                            <span 
                                class="product__badge" 
                                data-role="product-badge"
                                aria-label="신제품">
                                NEW
                            </span>
                        </div>
                        <!-- Name + Price -->
                        <div class="product__meta">
                            <h3 class="product__name" data-role="product-name">
                                [ SET 2 ] - Floral Lace Scarf + Floral Lace Wrap Skirt
                            </h3>
                            <p class="product__price" data-role="product-price">
                                <span class="product__price--discount" data-role="product-price-discount">
                                    10%
                                </span>
                                <span class="product__price--original" data-role="product-price-original">
                                    101,000원
                                </span>
                                <span class="product__price--sale" data-role="product-price-sale">
                                    90,900원
                                </span>
                            </p>
                            <!-- Review Rating-->
                            <p class="product__rating" aria-label="평점 5점 만점에 0점, 리뷰 0개">
                                <span class="product__rating-value" data-role="product-rating">0.0</span>
                                <span class="product__rating-count" data-role="product-review-count">(0개)</span>
                            </p>
                        </div>
                    </a>
                    <!-- Product Actions -->
                    <div class="product__actions-icon">
                        <button 
                            class="product__btn product__btn--cart" 
                            type="button" 
                            data-action="add-to-cart" 
                            aria-label="장바구니에 담기">
                                <svg viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                                </svg>
                        </button>
                        <button 
                            class="product__btn product__btn--wish"
                            type="button" 
                            data-action="toggle-wish"
                            aria-pressed="false" 
                            aria-label="위시리스트에 추가">
                                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                                </svg>
                        </button>
                    </div>
                </article>
            </li>
        <!------------Product 3------------>
            <li> 
                <article
                    class="product__card product__card--detail" 
                    data-id="gloves-001"
                    data-name="Sentimental Rose Wool Gloves (Sky Blue)"
                    data-price="19950"
                    data-original-price="28500"
                    data-discount="30"
                    data-image="assets/images/product/all/all-3-1.jpg"
                    data-category="all"
                    data-state="sale">
                    <a 
                        class="product__link" 
                        href="#" 
                        data-role="link">
                        <div class="product__media">
                            <!-- Product Image Gallery -->
                            <div class="product__gallery" aria-label="상품 이미지 미리보기">
                                <ul class="product__gallery-track">
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-3-1.jpg" 
                                            alt="Sentimental Rose 울 장갑 스카이 블루 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-3-2.jpg" 
                                            alt="Sentimental Rose 울 장갑 스카이 블루 핑거홀 디테일">
                                    </li>
                                </ul>
                            </div>
                            <!-- Pagination -->
                            <nav class="pagination__dots" aria-label="상품 이미지 슬라이드">
                                <button type="button" aria-label="1번째 이미지" aria-current="true"></button>
                                <button type="button" aria-label="2번째 이미지"></button>
                            </nav>
                            <!-- Badge -->
                            <span 
                                class="product__badge" 
                                data-role="product-badge"
                                aria-label="세일">
                                SALE
                            </span>
                        </div>
                        <!-- Name + Price -->
                        <div class="product__meta">
                            <h3 class="product__name" data-role="product-name">
                                Sentimental Rose Wool Gloves (Sky Blue)
                            </h3>
                            <p class="product__price" data-role="product-price">
                                <span class="product__price--discount" data-role="product-price-discount">
                                    30%
                                </span>
                                <span class="product__price--original" data-role="product-price-sale">
                                    28,500원
                                </span>
                                <span class="product__price--sale" data-role="product-price-original">
                                    19,950원
                                </span>
                            </p>
                            <!-- Review rating-->
                            <p class="product__rating" aria-label="평점 5점 만점에 5점, 리뷰 1개">
                                <span class="product__rating-value" data-role="product-rating">5.0</span>
                                <span class="product__rating-count" data-role="product-review-count">(1개)</span>
                            </p>
                        </div>
                    </a>
                    <!-- Product Actions -->
                    <div class="product__actions-icon">
                        <button 
                            class="product__btn product__btn--cart" 
                            type="button" 
                            data-action="add-to-cart" 
                            aria-label="장바구니에 담기">
                                <svg viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                                </svg>
                        </button>
                        <button 
                            class="product__btn product__btn--wish"
                            type="button" 
                            data-action="toggle-wish"
                            aria-pressed="false" 
                            aria-label="위시리스트에 추가">
                                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                                </svg>
                        </button>
                    </div>
                </article>
            </li>
        <!------------Product 4------------>
            <li>
                <article 
                    class="product__card product__card--detail" 
                    data-id="muffler-001"
                    data-name="Sentimental Rose Muffler (Ivory)"
                    data-price="21000"
                    data-original-price="30000"
                    data-discount="30"
                    data-image="assets/images/product/all/all-4-1.jpg"
                    data-category="all"
                    data-state="sale">
                    <a 
                        class="product__link" 
                        href="#" 
                        data-role="link">
                        <div class="product__media">
                            <!-- Product Image Gallery -->
                            <div class="product__gallery" aria-label="상품 이미지 미리보기">
                                <ul class="product__gallery-track">
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-4-1.jpg" 
                                            alt="Sentimental Rose 머플러 아이보리 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-4-2.jpg" 
                                            alt="Sentimental Rose 머플러 아이보리 단품 정면 2개">
                                    </li>
                                </ul>
                            </div>
                            <!-- Pagination -->
                            <nav class="pagination__dots" aria-label="상품 이미지 슬라이드">
                                <button type="button" aria-label="1번째 이미지" aria-current="true"></button>
                                <button type="button" aria-label="2번째 이미지"></button>
                            </nav>
                            <!-- Badge -->
                            <span 
                                class="product__badge" 
                                data-role="product-badge"
                                aria-label="세일">
                                SALE
                            </span>
                        </div>
                        <!-- Name + Price -->
                        <div class="product__meta">
                            <h3 class="product__name" data-role="product-name">
                                Sentimental Rose Muffler (Ivory)
                            </h3>
                            <p class="product__price" data-role="product-price">
                                <span class="product__price--discount" data-role="product-price-discount">
                                    30%
                                </span>
                                <span class="product__price--original" data-role="product-price-sale">
                                    30,000원
                                </span>
                                <span class="product__price--sale" data-role="product-price-original">
                                    21,000원
                                </span>
                            </p>
                            <!-- Review rating-->
                            <p class="product__rating" aria-label="평점 5점 만점에 4.6점, 리뷰 5개">
                                <span class="product__rating-value" data-role="product-rating">4.6</span>
                                <span class="product__rating-count" data-role="product-review-count">(5개)</span>
                            </p>
                        </div>
                    </a>
                    <!-- Product Actions -->
                    <div class="product__actions-icon">
                        <button 
                            class="product__btn product__btn--cart" 
                            type="button" 
                            data-action="add-to-cart" 
                            aria-label="장바구니에 담기">
                                <svg viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                                </svg>
                        </button>
                        <button 
                            class="product__btn product__btn--wish"
                            type="button" 
                            data-action="toggle-wish"
                            aria-pressed="false" 
                            aria-label="위시리스트에 추가">
                                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                                </svg>
                        </button>
                    </div>
                </article> 
            </li>
        <!------------Product 5------------>
            <li>
                <article 
                    class="product__card product__card--detail" 
                    data-id="tee-001"
                    data-name="Foliage Tee"
                    data-price="38000"
                    data-original-price="38000"
                    data-discount="0"
                    data-image="assets/images/product/all/all-5-1.jpg"
                    data-category="all"
                    data-state="normal">
                    <a 
                        class="product__link" 
                        href="#" 
                        data-role="link">
                        <div class="product__media">
                            <!-- Product Image Gallery -->
                            <div class="product__gallery" aria-label="상품 이미지 미리보기">
                                <ul class="product__gallery-track">
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-5-1.jpg" 
                                            alt="Foliage 티셔츠 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-5-2.jpg" 
                                            alt="Foliage 티셔츠 단품 뒷면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-5-3.jpg" 
                                            alt="Foliage 티셔츠 프린팅 디테일">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-5-4.jpg" 
                                            alt="Foliage 티셔츠 룩북 이미지">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-5-5.jpg" 
                                            alt="Foliage 티셔츠 룩북 이미지 2">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-5-6.jpg" 
                                            alt="Foliage 티셔츠 자연광 착용 이미지">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-5-7.jpg" 
                                            alt="Foliage 티셔츠 실내 착용 이미지">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-5-8.jpg" 
                                            alt="Foliage 티셔츠 실내 착용 플래시 이미지">
                                    </li>
                                </ul>
                            </div>
                            <!-- Pagination -->
                            <nav class="pagination__dots" aria-label="상품 이미지 슬라이드">
                                <button type="button" aria-label="1번째 이미지" aria-current="true"></button>
                                <button type="button" aria-label="2번째 이미지"></button>
                                <button type="button" aria-label="3번째 이미지"></button>
                                <button type="button" aria-label="4번째 이미지"></button>
                                <button type="button" aria-label="5번째 이미지"></button>
                                <button type="button" aria-label="6번째 이미지"></button>
                                <button type="button" aria-label="7번째 이미지"></button>
                                <button type="button" aria-label="8번째 이미지"></button>
                            </nav>
                            <!-- Badge -->
                            <span 
                                class="product__badge" 
                                data-role="badge">
                            </span>
                        </div>
                        <!-- Name + Price -->
                        <div class="product__meta">
                            <h3 class="product__name" data-role="product-name">
                                Foliage Tee
                            </h3>
                            <p class="product__price" data-role="product-price">
                                <span class="product__price--discount" data-role="product-price-discount">
                                    0%
                                </span>
                                <span class="product__price--original" data-role="product-price-sale">
                                    38,000원
                                </span>
                                <span class="product__price--sale" data-role="product-price-original">
                                0원
                                </span>
                            </p>
                            <!-- Review rating-->
                            <p class="product__rating" aria-label="평점 5점 만점에 4.9점, 리뷰 97개">
                                <span class="product__rating-value" data-role="product-rating">4.9</span>
                                <span class="product__rating-count" data-role="product-review-count">(97개)</span>
                            </p>
                        </div>
                    </a>
                    <!-- Product Actions -->
                    <div class="product__actions-icon">
                        <button 
                            class="product__btn product__btn--cart" 
                            type="button" 
                            data-action="add-to-cart" 
                            aria-label="장바구니에 담기">
                                <svg viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                                </svg>
                        </button>
                        <button 
                            class="product__btn product__btn--wish"
                            type="button" 
                            data-action="toggle-wish"
                            aria-pressed="false" 
                            aria-label="위시리스트에 추가">
                                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                                </svg>
                        </button>
                    </div>
                </article> 
            </li>
        <!------------Product 6------------>
            <li>
                <article 
                    class="product__card product__card--detail" 
                    data-id="pants-001"
                    data-name="Trumpet Flower Wide Pants (White)"
                    data-price="88000"
                    data-original-price="88000"
                    data-discount="0"
                    data-image="assets/images/product/all/all-6-1.jpg"
                    data-category="all"
                    data-state="normal">
                    <a 
                        class="product__link" 
                        href="#" 
                        data-role="link">
                        <div class="product__media">
                            <!-- Product Image Gallery -->
                            <div class="product__gallery" aria-label="상품 이미지 미리보기">
                                <ul class="product__gallery-track">
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-6-1.jpg" 
                                            alt="Trumpet Flower 와이드 팬츠 화이트 단품 뒷면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-6-2.jpg" 
                                            alt="Trumpet Flower 와이드 팬츠 화이트 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-6-3.jpg" 
                                            alt="Trumpet Flower 와이드 팬츠 화이트 프린팅 디테일">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-6-4.jpg" 
                                            alt="Trumpet Flower 와이드 팬츠 화이트 착용 이미지">
                                    </li>
                                </ul>
                            </div>
                            <!-- Pagination -->
                            <nav class="pagination__dots" aria-label="상품 이미지 슬라이드">
                                <button type="button" aria-label="1번째 이미지" aria-current="true"></button>
                                <button type="button" aria-label="2번째 이미지"></button>
                                <button type="button" aria-label="3번째 이미지"></button>
                                <button type="button" aria-label="4번째 이미지"></button>
                            </nav>
                            <!-- Badge -->
                            <span 
                                class="product__badge" 
                                data-role="badge">
                            </span>
                        </div>
                        <!-- Name + Price -->
                        <div class="product__meta">
                            <h3 class="product__name" data-role="product-name">
                                Trumpet Flower Wide Pants (White)
                            </h3>
                            <p class="product__price" data-role="product-price">
                                <span class="product__price--discount" data-role="product-price-discount">
                                    0%
                                </span>
                                <span class="product__price--original" data-role="product-price-sale">
                                    88,000원
                                </span>
                                <span class="product__price--sale" data-role="product-price-original">
                                0원
                                </span>
                            </p>
                            <!-- Review rating-->
                            <p class="product__rating" aria-label="평점 5점 만점에 4.8점, 리뷰 28개">
                                <span class="product__rating-value" data-role="product-rating">4.8</span>
                                <span class="product__rating-count" data-role="product-review-count">(28개)</span>
                            </p>
                        </div>
                    </a>
                    <!-- Product Actions -->
                    <div class="product__actions-icon">
                        <button 
                            class="product__btn product__btn--cart" 
                            type="button" 
                            data-action="add-to-cart" 
                            aria-label="장바구니에 담기">
                                <svg viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                                </svg>
                        </button>
                        <button 
                            class="product__btn product__btn--wish"
                            type="button" 
                            data-action="toggle-wish"
                            aria-pressed="false" 
                            aria-label="위시리스트에 추가">
                                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                                </svg>
                        </button>
                    </div>
                </article> 
            </li>
        <!------------Product 7------------>
            <li> 
                <article 
                    class="product__card product__card--detail" 
                    data-id="skirt-001"
                    data-name="Day Lily Midi Skirt"
                    data-price="118000"
                    data-original-price="118000"
                    data-discount="0"
                    data-image="assets/images/product/all/all-7-1.jpg"
                    data-category="all"
                    data-state="normal">
                    <a 
                        class="product__link" 
                        href="#" 
                        data-role="link">
                        <div class="product__media">
                            <!-- Product Image Gallery -->
                            <div class="product__gallery" aria-label="상품 이미지 미리보기">
                                <ul class="product__gallery-track">
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-7-1.jpg" 
                                            alt="Day Lily 미디 스커트 단품 정면">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-7-2.jpg" 
                                            alt="Day Lily 미디 스커트 정면 전신 이미지">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-7-3.jpg" 
                                            alt="Day Lily 미디 스커트 측면 전신 이미지">
                                    </li>
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-7-4.jpg" 
                                            alt="Day Lily 미디 스커트 착용 이미지">
                                    </li>
                                </ul>
                            </div>
                            <!-- Pagination -->
                            <nav class="pagination__dots" aria-label="상품 이미지 슬라이드">
                                <button type="button" aria-label="1번째 이미지" aria-current="true"></button>
                                <button type="button" aria-label="2번째 이미지"></button>
                                <button type="button" aria-label="3번째 이미지"></button>
                                <button type="button" aria-label="4번째 이미지"></button>
                            </nav>
                            <!-- Badge -->
                            <span 
                                class="product__badge" 
                                data-role="badge">
                            </span>
                        </div>
                        <!-- Name + Price -->
                        <div class="product__meta">
                            <h3 class="product__name" data-role="product-name">
                                Day Lily Midi Skirt
                            </h3>
                            <p class="product__price" data-role="product-price">
                                <span class="product__price--discount" data-role="product-price-discount">
                                    0%
                                </span>
                                <span class="product__price--original" data-role="product-price-sale">
                                    118,000원
                                </span>
                                <span class="product__price--sale" data-role="product-price-original">
                                0원
                                </span>
                            </p>
                            <!-- Review rating-->
                            <p class="product__rating" aria-label="평점 5점 만점에 5점, 리뷰 1개">
                                <span class="product__rating-value" data-role="product-rating">5.0</span>
                                <span class="product__rating-count" data-role="product-review-count">(1개)</span>
                            </p>
                        </div>
                    </a>
                    <!-- Product Actions -->
                    <div class="product__actions-icon">
                        <button 
                            class="product__btn product__btn--cart" 
                            type="button" 
                            data-action="add-to-cart" 
                            aria-label="장바구니에 담기">
                                <svg viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                                </svg>
                        </button>
                        <button 
                            class="product__btn product__btn--wish"
                            type="button" 
                            data-action="toggle-wish"
                            aria-pressed="false" 
                            aria-label="위시리스트에 추가">
                                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                                </svg>
                        </button>
                    </div>
                </article> 
            </li>
        <!------------Product 8------------>
            <li>
                <article
                    class="product__card product__card--detail" 
                    data-id="blouse-001"
                    data-name="Sentimental Rose Blouse"
                    data-price="88000"
                    data-original-price="88000"
                    data-discount="0"
                    data-image="assets/images/product/all/all-8-1.jpg"
                    data-category="all"
                    data-state="soldout">
                    <a 
                        class="product__link" 
                        href="#" 
                        data-role="link">
                        <div class="product__media">
                            <!-- Product Image Gallery -->
                            <div class="product__gallery" aria-label="상품 이미지 미리보기">
                                <ul class="product__gallery-track">
                                    <li class="product__gallery-item">
                                        <img class="product__gallery-image" src="assets/images/product/all/all-8-1.jpg" 
                                            alt="Trumpet Flower 와이드 팬츠 화이트 단품 뒷면">
                                    </li>
                                </ul>
                            </div>
                            <!-- Pagination -->
                            <nav class="pagination__dots" aria-label="상품 이미지 슬라이드">
                                <button type="button" aria-label="1번째 이미지" aria-current="true"></button>
                                <button type="button" aria-label="2번째 이미지"></button>
                                <button type="button" aria-label="3번째 이미지"></button>
                                <button type="button" aria-label="4번째 이미지"></button>
                            </nav>
                            <!-- Badge -->
                            <span 
                                class="product__badge" 
                                data-role="badge"
                                aria-label="품절">
                            SOLD<br>OUT
                            </span>
                        </div>
                        <!-- Name + Price -->
                        <div class="product__meta">
                            <h3 class="product__name" data-role="product-name">
                                Sentimental Rose Blouse
                            </h3>
                            <p class="product__price" data-role="product-price">
                                <span class="product__price--discount" data-role="product-price-discount">
                                    0%
                                </span>
                                <span class="product__price--original" data-role="product-price-sale">
                                    88,000원
                                </span>
                                <span class="product__price--sale" data-role="product-price-original">
                                0원
                                </span>
                            </p>
                            <!-- Review rating-->
                            <p class="product__rating" aria-label="평점 5점 만점에 4.8점, 리뷰 28개">
                                <span class="product__rating-value" data-role="product-rating">4.8</span>
                                <span class="product__rating-count" data-role="product-review-count">(28개)</span>
                            </p>
                        </div>
                    </a>
                    <!-- Product Actions -->
                    <div class="product__actions-icon">
                        <button 
                            class="product__btn product__btn--cart" 
                            type="button" 
                            data-action="add-to-cart" 
                            aria-label="장바구니에 담기">
                                <svg viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                                </svg>
                        </button>
                        <button 
                            class="product__btn product__btn--wish"
                            type="button" 
                            data-action="toggle-wish"
                            aria-pressed="false" 
                            aria-label="위시리스트에 추가">
                                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                                </svg>
                        </button>
                    </div>
                </article> 
            </li>
        </ul>
    </section>
    <!-- Pagination -->
    <nav class="pagination" aria-label="페이지 이동">
        <a class="pagination__btn pagination__btn--first" href="#">
            &laquo;<span class="visually-hidden">첫 페이지로 이동</span>
        </a>
        <a href="#" aria-current="page">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a class="pagination__btn pagination__btn--last" href="#">
            &raquo;<span class="visually-hidden">마지막 페이지로 이동</span>
        </a>
    </nav>
</main>

<!-- Footer -->
<?php include __DIR__ . '/includes/footer.php'; ?>

<!-- Chat Launcher -->
<?php include __DIR__ . '/includes/chat-launcher.php'; ?>

</body>
</html>