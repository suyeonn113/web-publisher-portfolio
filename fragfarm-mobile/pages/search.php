<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/products.php';

$pageTitle = 'Fragfarm';
$pageCss = 'search.css';
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main class="search-page" id="main">
        <section class="search-result">
            <div class="search-result__header">
                <h2 class="search-result__title page-title">Search</h2>
                <p class="search-result__text" id="search-result-text"></p>
                <p class="search-result__count" id="search-result-count"></p>
            </div>

            <ul id="search-result-list" class="catalog__list">
                <?php foreach ($products as $product): ?>
                    <?php include __DIR__ . '/../includes/components/product-card.php'; ?>
                <?php endforeach; ?>
            </ul>

            <button 
                class="button--more"
                type="button"
                data-action="load-more"
                aria-controls="search-result-list">
                <span class="button--more__text">더보기</span>
            </button>

            <div class="search-empty" id="search-empty" hidden>
                <p class="search-empty__title">검색 결과가 없습니다.</p>
                <p class="search-empty__text">다른 검색어로 다시 시도해 주세요.</p>
            </div>

            <form class="search" role="search" action="<?= BASE_URL ?>/pages/search.php" method="get">
                <label class="search__label visually-hidden" for="search">검색어 입력</label>
                <div class="search__bar">
                    <input 
                        class="search__input" 
                        type="search" 
                        name="q" 
                        id="search" 
                        placeholder="What are you looking for?">
                    <button class="search__btn" type="submit" aria-label="검색">
                        <img src="<?= BASE_URL ?>/assets/icons/search.svg" alt="" aria-hidden="true">
                    </button>
                </div>
            </form> 
        </section>
    </main>


    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>

    <!-- Chat Launcher -->
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/search.js"></script>
</body>
</html>