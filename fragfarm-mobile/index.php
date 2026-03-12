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
    <link rel="stylesheet" href="css/component/check-box.css">
    <link rel="stylesheet" href="css/component/modal.css">
    <link rel="stylesheet" href="css/component/motion.css">
    <link rel="stylesheet" href="css/component/page-head.css">

    <link rel="stylesheet" href="css/pages/index.css">
</head>
<body>
<!-- Header -->
<?php include __DIR__ . '/includes/header.php'; ?>

<main id="main">
    <!-- Hero -->
    <section class="hero">
        <img class="hero__img" src="assets/images/hero-2.jpg" alt="메인 이미지">
        <a class="hero__title-group" href="#">
            <h3 class="hero__subtitle">
                26 SS Collection 1st Release
            </h3>
            <h2 class="hero__title font-brand">
               SOME NATURE LAYERS
            </h2>
        </a>    
    </section>
    <!-- New -->
    <section class="new">
        <h2 class="section__title font-brand">
            NEW <small>₊ ⊹ . ݁˖ . ݁ 𝜗𝜚 ˖⁺‧₊‧⁺˖</small>
        </h2>
        <a class="section__view-all" href="product.php">
            view all
        </a>
        <ul class="product__list">
            <li class="product__card product__card--compact">
                <a class="product__link" href="#">
                    <span class="effect-fairy">
                        <img class="product__image" src="assets/images/product/new/new-1.jpg" 
                            alt="Cherry Blossom 자수 쉬폰 스카프 착용 이미지 ">
                    </span>
                    <div class="product__name font-brand">
                        Cherry Blossom Embroidered Chiffon Scarf
                    </div>
                    <div class="product__color font-brand">
                        2 Color
                    </div>
                </a>
            </li>
            <li class="product__card product__card--compact">
                <a class="product__link" href="#">
                    <span class="effect-fairy">
                        <img class="product__image" src="assets/images/product/new/new-2.jpg" 
                            alt="Floral 레이스 스카프 착용 이미지">
                        </span>
                    <div class="product__name font-brand">
                        Floral Lace Scarf
                    </div>
                    <div class="product__color font-brand">
                        2 Color
                    </div>
                </a>
            </li>
            <li class="product__card product__card--compact">
                <a class="product__link" href="#">
                    <span class="effect-fairy">
                        <img class="product__image" src="assets/images/product/new/new-3.jpg" 
                            alt="Floral 레이스 랩 스커트 착용 이미지">
                    </span>        
                    <div class="product__name font-brand">
                        Floral Lace Wrap Skirt
                    </div>
                    <div class="product__color font-brand">
                        2 Color
                    </div>
                </a>
            </li>
            <li class="product__card product__card--compact">
                <a class="product__link" href="#">
                    <span class="effect-fairy">
                        <img class="product__image" src="assets/images/product/new/new-4.jpg" 
                            alt="Peony Flower 랩 티셔츠 착용 이미지">
                    </span>
                    <div class="product__name font-brand">
                        Peony Flower Wrap T-Shirt
                    </div>
                    <div class="product__color font-brand">
                        2 Color
                    </div>
                </a>
            </li>
            <li class="product__card product__card--compact">
                <a class="product__link" href="#">
                    <span class="effect-fairy">
                        <img class="product__image" src="assets/images/product/new/new-5.jpg" 
                            alt="Peony Flower 반팔티 착용 이미지">
                    </span>        
                    <div class="product__name font-brand">
                        Peony Flower Short-Sleeve T-Shirt
                    </div>
                    <div class="product__color font-brand">
                        2 Color
                    </div>
                </a>
            </li>
            <li class="product__card product__card--compact">
                <a class="product__link" href="#">
                    <span class="effect-fairy">
                        <img class="product__image" src="assets/images/product/new/new-6.jpg" 
                            alt="FR Angel 그래픽 체크 토트백 착용 이미지">
                    </span>        
                    <div class="product__name font-brand">
                        FR Angel Graphic Check Tote Bag
                    </div>
                    <div class="product__color font-brand">
                        1 Color
                    </div>
                </a>
            </li>
        </ul>    
    </section>
    <!-- Sale -->
    <section class="sale">
        <h2 class="section__title font-brand">
            SALE <small>˚⋆ ｡⋆ .✧˚</small>
        </h2>
        <a class="section__view-all" href="product.php">
            view all
        </a>
        <ul class="product__list">
            <li class="product__card product__card--compact"
                data-state="sale">
                <a class="product__link" href="#">
                    <div class="product__media">
                        <span class="product__badge" aria-label="20퍼센트 할인">
                            -30%
                        </span>
                        <img class="product__image" src="assets/images/product/sale/sale-1.jpg" 
                            alt="Sentimental Rose 울 장갑 제품 이미지">
                    </div>    
                    <div class="product__name font-brand">
                        Sentimental Rose Wool Gloves
                    </div>
                    <div class="product__color font-brand">
                        5 Color
                    </div>
                </a>
            </li>
            <li class="product__card product__card--compact"
                data-state="sale">
                <a class="product__link" href="#">
                    <div class="product__media">
                        <span class="product__badge" aria-label="20퍼센트 할인">
                            -30%
                        </span>
                        <img class="product__image" src="assets/images/product/sale/sale-2.jpg" 
                            alt="Sentimental Rose 머플러 제품 이미지">
                    </div>
                    <div class="product__name font-brand">
                        Sentimental Rose Muffler
                    </div>
                    <div class="product__color font-brand">
                        3 Color
                    </div>
                </a>
            </li>
        </ul>
    </section>
    <!-- Review -->
    <section class="review">
        <h2 class="section__title font-brand">
            REVIEW  <small>⋅˚⋆₊‧ .｡⋆ ⋅˚₊‧.࿔｡˚</small>
        </h2>
        <a class="section__view-all" href="#">
            view all
        </a>
        <!-- review__content는 추후 DB연동 예정 / 본문 최대 -자 까지 불러오기 -->
        <ul class="review__list">
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-1.jpeg" 
                         alt="Pink Gaura 스카프 세트 롱 슬리브 고객 착용 후기 사진"> 
                </a>
            </li>
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-2.jpeg"
                         alt="Trumpet Flower 와이드 팬츠 고객 착용 후기 사진">
                </a>
            </li>
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-3.jpeg"
                         alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                </a>
            </li>
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-4.jpeg"
                         alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                </a>
            </li>
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-5.jpg" 
                         alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                </a>
            </li>
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-6.jpeg"  
                         alt="Sentimental Rose 스커트 고객 착용 후기 사진">
                </a>
            </li>
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-7.jpeg" 
                         alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                </a>
            </li>
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-8.jpeg" 
                         alt="Iris 버뮤다 팬츠 고객 착용 후기 사진">
                </a>
            </li>
            <li class="review__card review__card--compact">
                <a class="review__link" href="#">
                    <img class="review__image" src="assets/images/review/review-9.jpeg" 
                         alt="Magic Lily 미디 스커트 고객 착용 후기 사진">
                </a>
            </li>
        </ul>
    </section>
    <!-- About -->
    <section class="about">
        <h2 class="section__title--about font-brand">
            ABOUT <small>⠂⠄⠄⠂⠁⠁⠂⠄⠄⠂ ⠂⠄⠄⠂☆</small>
        </h2>
        <img class="about__image motion-card-spin" src="assets/images/about-2.png" 
             alt="여러 스타일링 착용 컷이 배열된 이미지 콜라주">
        <h3 class="about__title font-brand">About FRAGFARM</h3>
        <a class="about__link" href="about.php">
            <span class="about__read-more">read more</span>
        </a>
    </section>
</main>

<!-- Footer -->
<?php include __DIR__ . '/includes/footer.php'; ?>

<!-- Chat Launcher -->
<?php include __DIR__ . '/includes/chat-launcher.php'; ?>

<!-- Popup -->
<div class="popup" hidden>
    <div class="popup__dim" aria-hidden="true"></div>
    <section
        class="popup__dialog"
        role="dialog"
        aria-modal="true">
            <button class="popup__dismiss" type="button">
                오늘 다시 보지 않기
            </button>
    </section>
</div>
<script>
    const hero_titles = document.querySelectorAll('.hero__title-group');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.dataset.visible = "true";
            }
        });
    });

    hero_titles.forEach(title => observer.observe(title));
</script>
<script src="js/popup.js"></script>
</body>
</html>