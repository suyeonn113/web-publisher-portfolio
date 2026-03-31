<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/products.php';

$pageTitle = 'Fragfarm';
$pageCss = 'home.css';

$newProducts = array_values(array_filter($products, function ($product) {
    $stateTokens = $product['state'] ?? [];
    return is_array($stateTokens) && in_array('new', $stateTokens, true);
}));

$saleProducts = array_values(array_filter($products, function ($product) {
    $stateTokens = $product['state'] ?? [];
    return is_array($stateTokens) && in_array('sale', $stateTokens, true);
}));
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/includes/header.php'; ?>

    <!-- Main -->
    <main id="main">
        <!-- Hero -->
        <section class="hero">
            <img class="hero__img" src="<?= BASE_URL ?>/assets/images/hero-2.jpg" alt="메인 이미지">
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

            <a class="section__view-all" href="<?= BASE_URL ?>/pages/product.php?category=new">
                view all
            </a>

            <ul class="product__list">
                <?php foreach (array_slice($newProducts, 0, 9) as $product): ?>
                    <li class="product__card product__card--compact">
                        <a class="product__link" 
                           href="#">
                            <span class="effect-fairy">
                                <img
                                    class="product__image"
                                    src="<?= BASE_URL . htmlspecialchars($product['images'][0]['src'], ENT_QUOTES, 'UTF-8') ?>"
                                    alt="<?= htmlspecialchars($product['images'][0]['alt'], ENT_QUOTES, 'UTF-8') ?>">
                            </span>
                            <div class="product__name font-brand">
                                <?= htmlspecialchars($product['name'], ENT_QUOTES, 'UTF-8') ?>
                            </div>
                            <div class="product__color font-brand">
                                <?= count($product['images'] ?? []) ?> Color
                            </div>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
        <!-- Sale -->
        <section class="sale">
            <h2 class="section__title font-brand">
                SALE <small>˚⋆ ｡⋆ .✧˚</small>
            </h2>

            <a class="section__view-all" href="<?= BASE_URL ?>/pages/product.php?category=sale">
                view all
            </a>
            <!-- 중복은 안 보이게 -->
            <?php
                $groupedSaleProducts = [];

                foreach ($saleProducts as $product) {
                    $baseName = preg_replace('/\s*\([^)]*\)\s*$/', '', $product['name']);

                    if (!isset($groupedSaleProducts[$baseName])) {
                        $groupedSaleProducts[$baseName] = $product;
                    }
                }
            ?>
            <ul class="product__list">
                <?php foreach (array_slice(array_values($groupedSaleProducts), 0, 6) as $product): ?>
                    <li class="product__card product__card--compact">
                        <a class="product__link" 
                           href="#">
                            <div class="product__media">
                                <?php if (($product['discount'] ?? 0) > 0): ?>
                                    <span class="product__badge" aria-label="<?= (int) $product['discount'] ?>퍼센트 할인">
                                        -<?= (int) $product['discount'] ?>%
                                    </span>
                                <?php endif; ?>

                                <img
                                    class="product__image"
                                    src="<?= BASE_URL . htmlspecialchars($product['images'][0]['src'], ENT_QUOTES, 'UTF-8') ?>"
                                    alt="<?= htmlspecialchars($product['images'][0]['alt'], ENT_QUOTES, 'UTF-8') ?>">
                            </div>

                            <div class="product__name font-brand">
                                <?= htmlspecialchars($product['name'], ENT_QUOTES, 'UTF-8') ?>
                            </div>

                            <div class="product__color font-brand">
                                <?= count($product['images'] ?? []) ?> Color
                            </div>
                        </a>
                    </li>
                <?php endforeach; ?>
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
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-1.jpeg" 
                            alt="Pink Gaura 스카프 세트 롱 슬리브 고객 착용 후기 사진"> 
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="#">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-2.jpeg"
                            alt="Trumpet Flower 와이드 팬츠 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="#">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-3.jpeg"
                            alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="#">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-4.jpeg"
                            alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="#">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-5.jpg" 
                            alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="#">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-6.jpeg"  
                            alt="Sentimental Rose 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="#">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-7.jpeg" 
                            alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="#">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-8.jpeg" 
                            alt="Iris 버뮤다 팬츠 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="#">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-9.jpeg" 
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
            <img class="about__image motion-card-spin" src="<?= BASE_URL ?>/assets/images/about-2.png" 
                alt="여러 스타일링 착용 컷이 배열된 이미지 콜라주">
            <h3 class="about__title font-brand">About FRAGFARM</h3>
            <a class="about__link" href="<?= BASE_URL ?>/pages/about.php">
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
</div>
<!-- Script -->
<script src="<?= BASE_URL ?>/js/popup.js"></script>
</body>
</html>