<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/banners.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/data/education-programs.php';
include __DIR__ . '/includes/functions/program.service.php';

$pageTitle = '시립서울청소년센터';
$pageCss = 'home.css';

// 청소년프로그램 필터 함수
$programs = filterActivePrograms($youthPrograms);
$programs = sortProgramsForDisplay($programs);
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ <Head> ------------>
<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<!------------ <Header> & Menu ------------>
<?php include './includes/global-nav.php'; ?>

<!------------ <Main> ------------>
<main>
<!------------ Hero ------------>
    <section class="hero inner">
        <!-- Banner -->
        <div class="banner">
            <div class="banner__gallery">
                <ul class="banner__list">
                    <?php if (!empty($heroBanners)): ?>
                        <?php foreach ($heroBanners as $banner): ?>
                            <?php
                            $bannerLink = $banner['link'] ?? '#';
                            $bannerTarget = $banner['target'] ?? '_self';
                            $bannerRel = $banner['rel'] ?? '';
                            $bannerImage = BASE_URL . '/' . ltrim($banner['image'] ?? '', '/');
                            $bannerAlt = $banner['alt'] ?? '';
                            ?>
                            <li class="banner__item" data-banner-id="<?= (int) ($banner['id'] ?? 0) ?>">
                                <a href="<?= htmlspecialchars($bannerLink, ENT_QUOTES, 'UTF-8') ?>"
                                target="<?= htmlspecialchars($bannerTarget, ENT_QUOTES, 'UTF-8') ?>"
                                <?= $bannerRel !== '' ? 'rel="' . htmlspecialchars($bannerRel, ENT_QUOTES, 'UTF-8') . '"' : '' ?>>
                                    <img class="banner__image"
                                        src="<?= htmlspecialchars($bannerImage, ENT_QUOTES, 'UTF-8') ?>"
                                        alt="<?= htmlspecialchars($bannerAlt, ENT_QUOTES, 'UTF-8') ?>">
                                </a>
                            </li>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <li class="banner__item">
                            <p>등록된 배너가 없습니다.</p>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
            <div class="banner__controls">
                <span class="banner__count">1 / <?= count($heroBanners) ?></span>
                <button class="banner__prev" 
                        type="button"
                        aria-label="이전 배너">
                    <svg class="icon--prev icon" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true" 
                        focusable="false">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                        <path fill="none" d="M13.26 15.53L9.74001 12L13.26 8.46997"/>
                    </svg>
                </button>
                <button class="banner__next" 
                        type="button"
                        aria-label="다음 배너">
                    <svg class="icon--next icon" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true" 
                        focusable="false">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                        <path fill="none" d="M10.74 15.53L14.26 12L10.74 8.46997"/>
                    </svg>
                </button>
                <button class="banner__pause" 
                        type="button"
                        aria-label="자동재생 일시정지">
                    <svg class="icon--pause icon" 
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true" 
                        focusable="false">
                        <path class="icon__circle" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
                        <path class="icon__symbol" d="M10 8V15.6M14 15.6V8"/>
                    </svg>
                </button>
            </div>
        </div>
        <!-- Quick Menu -->
        <nav class="quick-menu--home" aria-label="센터 바로 이용하기">
            <h2 class="quick-menu--home__title">센터 바로 이용하기</h2>
            <ul class="quick-menu--home__list">
                <li class="quick-menu--home__item">
                    <a class="quick-menu--home__link" 
                    href="#">
                        <span class="line">
                            <svg class="icon--youth icon--quick-menu home icon stroke" 
                                viewBox="0 0 40 40" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.3333 6.66671C23.3333 8.50766 21.8409 10 20 10C18.159 10 16.6666 8.50766 16.6666 6.66671C16.6666 4.82576 18.159 3.33337 20 3.33337C21.8409 3.33337 23.3333 4.82576 23.3333 6.66671Z" fill="#2563EB"/>
                                <path d="M13.7052 19.2906L10.0797 18.0821C9.03681 17.7344 8.33337 16.7585 8.33337 15.6592C8.33337 14.0332 9.83259 12.8212 11.4225 13.1619L14.5851 13.8396C14.7609 13.8773 14.8489 13.8961 14.9361 13.9142C18.2767 14.6052 21.7234 14.6052 25.064 13.9142C25.1512 13.8961 25.2391 13.8773 25.415 13.8396L28.5776 13.1619C30.1675 12.8212 31.6667 14.0332 31.6667 15.6592C31.6667 16.7585 30.9633 17.7344 29.9204 18.0821L26.2949 19.2906C25.8568 19.4366 25.6377 19.5096 25.473 19.6113C24.9119 19.9576 24.6078 20.6021 24.6971 21.2554C24.7233 21.4472 24.8062 21.6627 24.972 22.0937L27.05 27.4965C27.6686 29.1048 26.4814 30.8333 24.7583 30.8333C23.8772 30.8333 23.0636 30.3612 22.6264 29.5961L20 25L17.3737 29.5961C16.9365 30.3612 16.1229 30.8333 15.2418 30.8333C13.5187 30.8333 12.3315 29.1048 12.9501 27.4965L15.0281 22.0937C15.1939 21.6627 15.2768 21.4472 15.303 21.2554C15.3923 20.6021 15.0882 19.9576 14.5271 19.6113C14.3624 19.5096 14.1433 19.4366 13.7052 19.2906Z" fill="#2563EB"/>
                                <path d="M32.4229 24.1666C35.062 25.4935 36.6667 27.2457 36.6667 29.1666C36.6667 33.3088 29.2048 36.6666 20 36.6666C10.7953 36.6666 3.33337 33.3088 3.33337 29.1666C3.33337 27.2457 4.93812 25.4935 7.57723 24.1666"/>
                            </svg>
                        </span>
                        청소년프로그램
                    </a>
                </li>
                <li class="quick-menu--home__item">
                    <a class="quick-menu--home__link" 
                    href="#">
                        <span class="line">
                            <svg class="icon--education icon--quick-menu home icon" 
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false">
                                <path fill="#FBBF24" d="M12 21C10.204 21 7.8537 19.8787 6.38533 19.0656C5.5035 18.5772 5 17.6334 5 16.6254V11.5H19V16.6254C19 17.6334 18.4965 18.5772 17.6147 19.0656C16.1463 19.8787 13.796 21 12 21Z"/>
                                <path fill="#FBBF24" d="M9.78272 3.49965C11.2037 2.83345 12.7962 2.83345 14.2172 3.49965L20.9084 6.63664C22.3639 7.31899 22.3639 9.68105 20.9084 10.3634L14.2173 13.5003C12.7963 14.1665 11.2038 14.1665 9.78281 13.5003L3.0916 10.3634C1.63613 9.68101 1.63614 7.31895 3.0916 6.63659L9.78272 3.49965Z"/>
                                <path d="M2 8.5V14"/>
                            </svg>
                        </span>
                        평생교육평생교육
                    </a>
                </li>
                <li class="quick-menu--home__item">
                    <a class="quick-menu--home__link" 
                    href="#">
                        <span class="line">
                            <svg class="icon--youth icon--quick-menu icon" 
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false">
                                <path fill="#B6C2CF" d="M2.95001 22L3.00002 9.96999C3.00002 9.35999 3.29001 8.78004 3.77001 8.40004L10.77 2.95003C11.49 2.39003 12.5 2.39003 13.23 2.95003L20.23 8.39003C20.72 8.77003 21 9.34999 21 9.96999V22"/>
                                <path d="M2.95001 22L3.00002 9.96999C3.00002 9.35999 3.29001 8.78004 3.77001 8.40004L10.77 2.95003C11.49 2.39003 12.5 2.39003 13.23 2.95003L20.23 8.39003C20.72 8.77003 21 9.34999 21 9.96999V22"/>
                                <path d="M2 22H22"/>
                                <path fill="#FBBF24" d="M15.5 11H8.5C7.67 11 7 11.67 7 12.5V22H17V12.5C17 11.67 16.33 11 15.5 11Z"/>
                                <path d="M10 16.25V17.75"/>
                                <path d="M10.5 7.5H13.5"/>
                            </svg>
                        </span>
                        청소년공감센터'움'
                    </a>
                </li>
                <li class="quick-menu--home__item">
                    <a class="quick-menu--home__link" 
                    href="#">
                        <span class="line">
                            <svg class="icon--youth icon--quick-menu home icon" 
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false">
                                <path fill="#14B8A6" d="M2 12C2 13.1046 2.89543 14 4 14H5L5 10H4C2.89543 10 2 10.8954 2 12Z"/>
                                <path fill="#14B8A6" d="M22 12C22 13.1046 21.1046 14 20 14H19V10H20C21.1046 10 22 10.8954 22 12Z"/>
                                <path d="M9 12H15M4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14H5L5 10H4ZM20 10C21.1046 10 22 10.8954 22 12C22 13.1046 21.1046 14 20 14H19V10H20Z"/>
                                <path fill="#14B8A6" d="M15.5 9L15.5 15C15.5 15.465 15.5 15.6975 15.5511 15.8882C15.6898 16.4059 16.0941 16.8102 16.6118 16.9489C16.8025 17 17.035 17 17.5 17C17.965 17 18.1975 17 18.3882 16.9489C18.9059 16.8102 19.3102 16.4059 19.4489 15.8882C19.5 15.6975 19.5 15.465 19.5 15V9C19.5 8.53501 19.5 8.30252 19.4489 8.11177C19.3102 7.59413 18.9059 7.18981 18.3882 7.05111C18.1975 7 17.965 7 17.5 7C17.035 7 16.8025 7 16.6118 7.05111C16.0941 7.18981 15.6898 7.59413 15.5511 8.11177C15.5 8.30252 15.5 8.53501 15.5 9Z"/>
                                <path fill="#14B8A6" d="M4.5 9L4.5 15C4.5 15.465 4.5 15.6975 4.55111 15.8882C4.68981 16.4059 5.09413 16.8102 5.61177 16.9489C5.80252 17 6.03501 17 6.5 17C6.96499 17 7.19748 17 7.38823 16.9489C7.90587 16.8102 8.31019 16.4059 8.44889 15.8882C8.5 15.6975 8.5 15.465 8.5 15V9C8.5 8.53501 8.5 8.30252 8.44889 8.11177C8.31019 7.59413 7.90587 7.18981 7.38823 7.05111C7.19748 7 6.96499 7 6.5 7C6.03501 7 5.80252 7 5.61177 7.05111C5.09413 7.18981 4.68981 7.59413 4.55111 8.11177C4.5 8.30252 4.5 8.53501 4.5 9Z"/>
                            </svg>
                        </span>
                        종합체력실
                    </a>
                </li>
                <li class="quick-menu--home__item">
                    <a class="quick-menu--home__link" 
                    href="#">
                        <span class="line">
                            <svg class="icon--youth icon--quick-menu home icon" 
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false">
                                <path fill="#B6C2CF" d="M3.95491 19.9389C3 18.6246 3 16.7497 3 13C3 11.8311 3 10.8443 3.02893 10H20.9711C21 10.8443 21 11.8311 21 13C21 14.1689 21 15.1557 20.9711 16C20.9072 17.8642 20.7023 19.0343 20.0451 19.9389C19.7367 20.3634 19.3634 20.7367 18.9389 21.0451C18.0343 21.7023 16.8642 21.9072 15 21.9711C14.1557 22 13.1689 22 12 22H12C8.25026 22 6.3754 22 5.06107 21.0451C4.6366 20.7367 4.26331 20.3634 3.95491 19.9389Z"/>
                                <path class="no-stroke" fill="#1F2937" d="M3.95491 19.9389L4.56168 19.4981H4.56168L3.95491 19.9389ZM19.2178 16.0616L19.1005 15.3208L19.1005 15.3208L19.2178 16.0616ZM15.0616 20.2178L14.3208 20.1005V20.1005L15.0616 20.2178ZM20.0451 19.9389L19.4383 19.4981L19.4383 19.4981L20.0451 19.9389ZM3.02893 10V9.25H2.30418L2.27937 9.97432L3.02893 10ZM18.9389 21.0451L18.4981 20.4383V20.4383L18.9389 21.0451ZM5.06107 21.0451L4.62023 21.6518H4.62023L5.06107 21.0451ZM20.9711 10L21.7206 9.97432L21.6958 9.25H20.9711V10ZM3 13H2.25C2.25 14.8582 2.24897 16.312 2.37373 17.4635C2.50001 18.6291 2.76232 19.5734 3.34815 20.3798L3.95491 19.9389L4.56168 19.4981C4.19259 18.9901 3.97745 18.3399 3.865 17.302C3.75103 16.25 3.75 14.8916 3.75 13H3ZM19.2178 16.0616L19.1005 15.3208C16.6401 15.7105 14.7105 17.6401 14.3208 20.1005L15.0616 20.2178L15.8023 20.3352C16.0904 18.5166 17.5166 17.0904 19.3352 16.8023L19.2178 16.0616ZM21 13H20.25C20.25 14.1731 20.2499 15.1456 20.2215 15.9743L20.9711 16L21.7206 16.0257C21.7501 15.1658 21.75 14.1648 21.75 13H21ZM20.9711 16L20.9711 15.25C20.0888 15.25 19.5579 15.2484 19.1005 15.3208L19.2178 16.0616L19.3352 16.8023C19.647 16.7529 20.0338 16.75 20.9711 16.75L20.9711 16ZM20.9711 16L20.2215 15.9743C20.158 17.8292 19.9509 18.7925 19.4383 19.4981L20.0451 19.9389L20.6518 20.3798C21.4537 19.2761 21.6564 17.8991 21.7206 16.0257L20.9711 16ZM3 13H3.75C3.75 11.8269 3.75009 10.8544 3.77849 10.0257L3.02893 10L2.27937 9.97432C2.24991 10.8342 2.25 11.8352 2.25 13H3ZM20.0451 19.9389L19.4383 19.4981C19.1762 19.8589 18.8589 20.1762 18.4981 20.4383L18.9389 21.0451L19.3798 21.6518C19.8679 21.2972 20.2972 20.8679 20.6518 20.3798L20.0451 19.9389ZM5.06107 21.0451L5.50191 20.4383C5.14111 20.1762 4.82382 19.8589 4.56168 19.4981L3.95491 19.9389L3.34815 20.3798C3.70281 20.8679 4.13209 21.2972 4.62023 21.6518L5.06107 21.0451ZM15 21.9711L15.0257 22.7206C16.8991 22.6564 18.2761 22.4537 19.3798 21.6518L18.9389 21.0451L18.4981 20.4383C17.7925 20.9509 16.8292 21.158 14.9743 21.2215L15 21.9711ZM21 13H21.75C21.75 11.8352 21.7501 10.8342 21.7206 9.97432L20.9711 10L20.2215 10.0257C20.2499 10.8544 20.25 11.8269 20.25 13H21ZM12 22V21.25H12V22V22.75H12V22ZM12 22V21.25C10.1084 21.25 8.74999 21.249 7.69804 21.135C6.66013 21.0225 6.00992 20.8074 5.50191 20.4383L5.06107 21.0451L4.62023 21.6518C5.42656 22.2377 6.37094 22.5 7.53647 22.6263C8.68797 22.751 10.1418 22.75 12 22.75V22ZM15 21.9711L15.75 21.9711C15.75 21.0338 15.7529 20.647 15.8023 20.3352L15.0616 20.2178L14.3208 20.1005C14.2484 20.5579 14.25 21.0888 14.25 21.9711L15 21.9711ZM12 22V22.75C13.1648 22.75 14.1658 22.7501 15.0257 22.7206L15 21.9711L14.9743 21.2215C14.1456 21.2499 13.1731 21.25 12 21.25V22ZM3.02893 10V10.75H20.9711V10V9.25H3.02893V10Z"/>
                                <path d="M9 14H15"/>
                                <path fill="#B6C2CF" fill-opacity="0.4" d="M20.0451 6.06107C20.7023 6.96568 20.9072 8.13581 20.9711 10H3.02893C3.0928 8.13581 3.29768 6.96568 3.95492 6.06107C4.26332 5.6366 4.6366 5.26331 5.06108 4.95492C5.96568 4.29768 7.13582 4.0928 9 4.02893C9.84435 4 10.8311 4 12 4C13.1689 4 14.1557 4 15 4.02893C16.8642 4.0928 18.0343 4.29768 18.9389 4.95492C19.3634 5.26331 19.7367 5.6366 20.0451 6.06107Z"/>
                                <path class="no-stroke" fill="#1F2937" d="M20.9711 10V10.75H21.7472L21.7206 9.97432L20.9711 10ZM20.0451 6.06107L19.4383 6.50191L19.4383 6.50191L20.0451 6.06107ZM18.9389 4.95492L18.4981 5.56168V5.56168L18.9389 4.95492ZM14.25 5C14.25 5.41421 14.5858 5.75 15 5.75C15.4142 5.75 15.75 5.41421 15.75 5H15H14.25ZM3.02893 10L2.27937 9.97432L2.25279 10.75H3.02893V10ZM3.95492 6.06107L4.56168 6.50191H4.56168L3.95492 6.06107ZM15.75 2C15.75 1.58579 15.4142 1.25 15 1.25C14.5858 1.25 14.25 1.58579 14.25 2H15H15.75ZM5.06108 4.95492L5.50191 5.56168V5.56168L5.06108 4.95492ZM9.75 2C9.75 1.58579 9.41422 1.25 9 1.25C8.58579 1.25 8.25 1.58579 8.25 2H9H9.75ZM8.25 5C8.25 5.41421 8.58579 5.75 9 5.75C9.41422 5.75 9.75 5.41421 9.75 5H9H8.25ZM20.9711 10L21.7206 9.97432C21.6564 8.10088 21.4537 6.7239 20.6518 5.62023L20.0451 6.06107L19.4383 6.50191C19.9509 7.20746 20.158 8.17075 20.2215 10.0257L20.9711 10ZM15 4.02893L14.9743 4.77849C16.8292 4.84204 17.7925 5.04907 18.4981 5.56168L18.9389 4.95492L19.3798 4.34815C18.2761 3.5463 16.8991 3.34356 15.0257 3.27937L15 4.02893ZM18.9389 4.95492L18.4981 5.56168C18.8589 5.82382 19.1762 6.14111 19.4383 6.50191L20.0451 6.06107L20.6519 5.62024C20.2972 5.13209 19.8679 4.70281 19.3798 4.34815L18.9389 4.95492ZM15 5H15.75V4.02893H15H14.25V5H15ZM3.02893 10L3.77849 10.0257C3.84204 8.17075 4.04907 7.20746 4.56168 6.50191L3.95492 6.06107L3.34815 5.62023C2.5463 6.7239 2.34356 8.10087 2.27937 9.97432L3.02893 10ZM15 4.02893H15.75V2H15H14.25V4.02893H15ZM5.06108 4.95492L4.62024 4.34815C4.13209 4.70281 3.70281 5.13209 3.34815 5.62023L3.95492 6.06107L4.56168 6.50191C4.82382 6.14111 5.14111 5.82382 5.50191 5.56168L5.06108 4.95492ZM9 4.02893H9.75V2H9H8.25V4.02893H9ZM9 5H9.75V4.02893H9H8.25V5H9ZM12 4V3.25C10.8352 3.25 9.83425 3.24991 8.97432 3.27937L9 4.02893L9.02568 4.77849C9.85445 4.75009 10.8269 4.75 12 4.75V4ZM9 4.02893L8.97432 3.27937C7.10088 3.34355 5.7239 3.5463 4.62024 4.34815L5.06108 4.95492L5.50191 5.56168C6.20746 5.04907 7.17076 4.84204 9.02568 4.77849L9 4.02893ZM12 4V4.75C13.1731 4.75 14.1456 4.75009 14.9743 4.77849L15 4.02893L15.0257 3.27937C14.1658 3.24991 13.1648 3.25 12 3.25V4ZM3.02893 10V10.75H20.9711V10V9.25H3.02893V10Z"/>
                            </svg>
                        </span>
                        시설대관
                    </a>
                </li>
                <li class="quick-menu--home__item">
                    <a class="quick-menu--home__link" 
                    href="#">
                        <span class="line">
                            <svg class="icon--contact icon--quick-menu home icon" 
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false">
                                <path fill="#fff" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88836 21.6244 10.4003 22 12 22Z"/>
                                <path d="M8 12H8.009M11.991 12H12M15.991 12H16"/>
                            </svg>
                        </span>
                        문의하기
                    </a>
                </li>
            </ul>
        </nav>
    </section>

    <!------------ Programs ------------>
    <div class="programs wrapper padding-block">
        <?php
        $openPrograms = getOpenProgramsForDisplay($programs);
        ?>
        <section class="programs inner">
            <h2 class="section__title">모집 중인 청소년 프로그램</h2>
            <div class="programs__controls">
                <button class="programs__prev" 
                        type="button"
                        aria-label="이전 프로그램">
                    <svg class="icon--prev icon" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true" 
                        focusable="false">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                        <path fill="none" d="M13.26 15.53L9.74001 12L13.26 8.46997"/>
                    </svg>
                </button>
                <button class="programs__next" 
                        type="button"
                        aria-label="다음 프로그램">
                    <svg class="icon--next icon" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true" 
                        focusable="false">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                        <path fill="none" d="M10.74 15.53L14.26 12L10.74 8.46997"/>
                    </svg>
                </button>
            </div>
            <a class="button--more button"
               href="#"
               aria-label="청소년 프로그램 더보기">
                더보기
            </a>
            <div class="programs__slider">
                <div class="programs__track">

                    <?php if (empty($openPrograms)): ?>
                        <p class="programs__empty">모집 중인 프로그램이 없습니다.</p>
                    <?php else: ?>

                        <?php foreach ($openPrograms as $program): ?>
                            <?php
                            $programMeta = getProgramCardMeta($program);
                            $cardVariant = 'home-program';
                            include __DIR__ . '/includes/components/program-card.php';
                            ?>
                        <?php endforeach; ?>

                    <?php endif; ?>

                </div>
            </div>
        </section>
    </div>
    <!------------ recommend ------------>
    <section class="recommend inner padding-block">
        <h2 class="section__title">나에게 맞는 프로그램 살펴보기</h2>
        <div class="recommend__content">
            <form class="recommend-filter" action="" method="get" data-has-selection="false">
                <fieldset class="recommend-filter__group age_group_codes">
                    <legend class="recommend-filter__title">연령 기준</legend>
                    <div class="recommend-filter__list" role="group">
                        <button class="button--filter button" type="button" name="age" value="infant" aria-pressed="false">유아</button>
                        <button class="button--filter button" type="button" name="age" value="elementary-low" aria-pressed="false">초등 저학년</button>
                        <button class="button--filter button" type="button" name="age" value="elementary-high" aria-pressed="false">초등 고학년</button>
                        <button class="button--filter button" type="button" name="age" value="early-youth" aria-pressed="false">초기 청소년</button>
                        <button class="button--filter button" type="button" name="age" value="mid-youth" aria-pressed="false">중기 청소년</button>
                        <button class="button--filter button" type="button" name="age" value="late-youth" aria-pressed="false">후기 청소년</button>
                        <button class="button--filter button" type="button" name="age" value="citizen" aria-pressed="false">시민</button>
                    </div>
                </fieldset>

                <fieldset class="recommend-filter__group field_code">
                    <legend class="recommend-filter__title">분야 기준</legend>
                    <div class="recommend-filter__list" role="group">
                        <button class="button--filter button" type="button" name="field" value="career" aria-pressed="false">진로 직업</button>
                        <button class="button--filter button" type="button" name="field" value="culture-art" aria-pressed="false">문화 예술</button>
                        <button class="button--filter button" type="button" name="field" value="emotional" aria-pressed="false">정서 관계</button>
                        <button class="button--filter button" type="button" name="field" value="competency" aria-pressed="false">역량 성장</button>
                        <button class="button--filter button" type="button" name="field" value="citizen" aria-pressed="false">시민 참여</button>
                    </div>
                </fieldset>
            </form>
            <div class="recommend-result">
                <section class="recommend-result__youth">
                    <h3 class="recommend-result__title">청소년 프로그램</h3>
                    <div class="programs__controls">
                        <button class="programs__prev" 
                                type="button"
                                aria-label="이전 프로그램">
                            <svg class="icon--prev icon" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" 
                                focusable="false">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                                <path fill="none" d="M13.26 15.53L9.74001 12L13.26 8.46997"/>
                            </svg>
                        </button>
                        <button class="programs__next" 
                                type="button"
                                aria-label="다음 프로그램">
                            <svg class="icon--next icon" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" 
                                focusable="false">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                                <path fill="none" d="M10.74 15.53L14.26 12L10.74 8.46997"/>
                            </svg>
                        </button>
                    </div>
                    <a class="button--more button"
                        href="#"
                        aria-label="청소년 프로그램 더보기">
                        더보기
                    </a>
                    <div class="recommend-result__body" data-state="idle">
                        <p class="programs__empty recommend-result__status" aria-live="polite">
                            기준을 선택해주세요.
                        </p>

                        <div class="recommend-result__slider" hidden>
                            <ul class="recommend-result__list"></ul>
                        </div>
                    </div>
                </section>
                <section class="recommend-result__education">
                    <h3 class="recommend-result__title">평생교육 프로그램</h3>
                    <div class="education__controls">
                        <button class="education__prev" 
                                type="button"
                                aria-label="이전 프로그램">
                            <svg class="icon--prev icon" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" 
                                focusable="false">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                                <path fill="none" d="M13.26 15.53L9.74001 12L13.26 8.46997"/>
                            </svg>
                        </button>
                        <button class="education__next" 
                                type="button"
                                aria-label="다음 프로그램">
                            <svg class="icon--next icon" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" 
                                focusable="false">
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                                <path fill="none" d="M10.74 15.53L14.26 12L10.74 8.46997"/>
                            </svg>
                        </button>
                    </div>
                    <a class="button--more button"
                        href="#"
                        aria-label="평생교육 프로그램 더보기">
                        더보기
                    </a>

                    <div class="recommend-result__body" data-state="idle">
                        <p class="programs__empty recommend-result__status" aria-live="polite">
                            기준을 선택해주세요.
                        </p>

                        <div class="education__slider" hidden>
                            <ul class="education__track"></ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </section>

    <section class="schedule inner">
        <h2 class="section__title">센터 일정 둘러보기</h2>

        <div class="schedule__layout">
            <!-- 달력 영역 -->
            <div class="schedule-calendar" aria-labelledby="schedule-calendar__title">
                <h3 id="schedule-calendar__title" class="visually-hidden">센터 일정 달력</h3>

                <div class="schedule-calendar__box">
                    <div class="schedule-calendar__header">
                        <div class="schedule-calendar__nav-group">
                            <button class="schedule-calendar__nav schedule-calendar__nav--prev"
                                    type="button"
                                    aria-label="이전 달 보기">
                                <svg class="icon--calendar-prev icon"
                                     viewBox="0 0 24 24" 
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.09 20.67C15.28 20.67 15.47 20.6 15.62 20.45C15.91 20.16 15.91 19.68 15.62 19.39L9.10002 12.87C8.62002 12.39 8.62002 11.61 9.10002 11.13L15.62 4.61002C15.91 4.32002 15.91 3.84002 15.62 3.55002C15.33 3.26002 14.85 3.26002 14.56 3.55002L8.04002 10.07C7.53002 10.58 7.24002 11.27 7.24002 12C7.24002 12.73 7.52002 13.42 8.04002 13.93L14.56 20.45C14.71 20.59 14.9 20.67 15.09 20.67Z"/>
                                </svg>
                            </button>

                            <button class="schedule-calendar__heading"
                                    type="button"
                                    aria-label="데모 기준 오늘 날짜가 있는 달로 이동">
                                <p class="schedule-calendar__month" id="calendar-month">3월</p>
                                <p class="schedule-calendar__year" id="calendar-year">2026</p>
                            </button>

                            <button class="schedule-calendar__nav schedule-calendar__nav--next"
                                    type="button"
                                    aria-label="다음 달 보기">
                                <svg class="icon--calendar-next icon"
                                     viewBox="0 0 24 24" 
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.90998 20.67C8.71998 20.67 8.52998 20.6 8.37998 20.45C8.08998 20.16 8.08998 19.68 8.37998 19.39L14.9 12.87C15.38 12.39 15.38 11.61 14.9 11.13L8.37998 4.61002C8.08998 4.32002 8.08998 3.84002 8.37998 3.55002C8.66998 3.26002 9.14998 3.26002 9.43998 3.55002L15.96 10.07C16.47 10.58 16.76 11.27 16.76 12C16.76 12.73 16.48 13.42 15.96 13.93L9.43998 20.45C9.28998 20.59 9.09998 20.67 8.90998 20.67Z"/>
                                </svg>
                            </button>
                        </div>

                        <!-- 범례 -->
                        <ul class="schedule-calendar__legend" aria-label="일정 유형 안내">
                            <li class="schedule-calendar__legend-item">
                                <span class="schedule-calendar__legend-dot schedule-calendar__legend-dot--program" aria-hidden="true"></span>
                                <span class="schedule-calendar__legend-text">프로그램</span>
                            </li>
                            <li class="schedule-calendar__legend-item">
                                <span class="schedule-calendar__legend-dot schedule-calendar__legend-dot--center-event" aria-hidden="true"></span>
                                <span class="schedule-calendar__legend-text">센터 일정</span>
                            </li>
                            <li class="schedule-calendar__legend-item">
                                <span class="schedule-calendar__legend-dot schedule-calendar__legend-dot--closed-day" aria-hidden="true"></span>
                                <span class="schedule-calendar__legend-text">휴관일</span>
                            </li>
                        </ul>
                    </div>

                    <div class="schedule-calendar__body">
                        <div class="schedule-calendar__grid-wrap">
                            <!-- 요일 헤더 -->
                            <div class="schedule-calendar__weekdays" aria-hidden="true">
                                <span>일</span>
                                <span>월</span>
                                <span>화</span>
                                <span>수</span>
                                <span>목</span>
                                <span>금</span>
                                <span>토</span>
                            </div>

                            <!-- JS가 날짜 셀 생성 -->
                            <div class="schedule-calendar__grid"
                                 id="schedule-calendar-grid"
                                 role="grid"
                                 aria-label="센터 일정 달력">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 일정 목록 영역 -->
            <div class="schedule-agenda" aria-labelledby="schedule-agenda__title">
                <h3 id="schedule-agenda__title" class="visually-hidden">선택한 날짜 기준 일정 목록</h3>

                <div class="schedule-agenda__group yesterday">
                    <h4 class="schedule-agenda__heading">어제</h4>
                    <ul class="schedule-agenda__list"
                        id="schedule-list-yesterday"
                        aria-label="어제 일정">
                    </ul>
                </div>

                <div class="schedule-agenda__group today">
                    <h4 class="schedule-agenda__heading">오늘</h4>
                    <ul class="schedule-agenda__list"
                        id="schedule-list-today"
                        aria-label="오늘 일정">
                    </ul>
                </div>

                <div class="schedule-agenda__group tomorrow">
                    <h4 class="schedule-agenda__heading">내일</h4>
                    <ul class="schedule-agenda__list"
                        id="schedule-list-tomorrow"
                        aria-label="내일 일정">
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="news inner">
        <h2 class="visually-hidden">센터 소식 모아보기</h2>
        <article class="news-card news-card--notice">
            <h3 class="section__title">공지사항</h3>
            <a class="button--more button"
                href="#"
                aria-label="공지사항 더보기">
                더보기
            </a>
            <ul class="news-card__list news-card__list--notice">
                <li class="news-card__item pin">
                    <a class="news-card__link"
                       href="#">
                        홈페이지 회원 자동탈퇴(파기) 안내 및 재동의 사전 안내
                    </a>
                </li>
                <li class="news-card__item pin">
                    <a class="news-card__link"
                       href="#">
                        홈페이지 자녀계정 로그인 방법 안내
                    </a>
                </li>
                <li class="news-card__item">
                    <a class="news-card__link"
                       href="#">
                        [공고] 2026년 평생교육 기구필라테스 강사 채용 공고
                    </a>
                </li>
                <li class="news-card__item">
                    <a class="news-card__link"
                       href="#">
                        [안내] 시립서울청소년센터 운영백서(2025년)
                    </a>
                </li>
                <li class="news-card__item">
                    <a class="news-card__link"
                       href="#">
                        [고시] 수의계약 공개내역서(2026년 3월 꿈꾸는 아이들 책걸상 구매)
                    </a>
                </li>
            </ul>
        </article>

        <article class="news-card news-card--city">
            <h3 class="section__title">서울시정</h3>
            <a class="button--more button"
                href="#"
                aria-label="서울시정 더보기">
                더보기
            </a>
            <ul class="news-card__list">
                <li class="news-card__item">
                    <a class="news-card__link"
                       href="#">
                    제1기 청년 공존·공감위원회청년위원 모집 공고
                    </a>
                </li>
                <li class="news-card__item">
                    <a class="news-card__link"
                       href="#">                
                    서울특별시 청소년참여위원회 모집
                    </a>
                </li>
            </ul>
        </article>

        <article class="news-card news-card--sm">
            <h3 class="section__title">보도자료</h3>
            <a class="button--more button"
                href="#"
                aria-label="보도자료 더보기">
                더보기
            </a>

            <ul class="news-card__list news-card__list--press">
                    <a class="news-card__link"
                       href="#">                
                    [2025.02.05] 소셜임팩트뉴스-청다온 등 35건(2025년 3분기)
                    </a>
                    <a class="news-card__link"
                       href="#">                
                    [2025.01.06] KNS뉴스통신-움아트 외 39건
                    </a>                    
            </ul>
        </article>
    </section>

    <section class="gallery inner">
        <h3 class="section__title">활동 사진</h3>
        <div class="gallery__controls">
            <button class="gallery__prev" 
                    type="button"
                    aria-label="이전 활동사진">
                <svg class="icon--prev icon" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" 
                    focusable="false">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                    <path fill="none" d="M13.26 15.53L9.74001 12L13.26 8.46997"/>
                </svg>
            </button>
            <button class="gallery__next" 
                    type="button"
                    aria-label="다음 활동사진">
                <svg class="icon--next icon" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" 
                    focusable="false">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                    <path fill="none" d="M10.74 15.53L14.26 12L10.74 8.46997"/>
                </svg>
            </button>
        </div>
        <a class="button--more button"
            href="#"
            aria-label="활동 사진 더보기">
            더보기
        </a>
        <div class="gallery__slider">
                <ul class="gallery__track">
                    <!-- JS로 li.gallery__item 생성 -->
                </ul>
            </div>
    </section>

    <section class="sns">

<section class="sns inner" aria-labelledby="sns-title">
    <div class="sns__header">
        <h3 class="section__title" id="sns-title">SNS</h3>

        <div class="sns__platforms" role="tablist" aria-label="SNS 채널 선택">
            <button class="sns__platform is-active"
                    type="button"
                    role="tab"
                    id="sns-tab-all"
                    aria-selected="true"
                    aria-controls="sns-panel-all"
                    data-platform="all">
                <span class="sns__platform-icon" aria-hidden="true">
                    <!-- 전체 아이콘 -->
                </span>
                <span class="sns__platform-label">전체</span>
            </button>

            <button class="sns__platform"
                    type="button"
                    role="tab"
                    id="sns-tab-instagram"
                    aria-selected="false"
                    aria-controls="sns-panel-instagram"
                    data-platform="instagram"
                    tabindex="-1">
                <span class="sns__platform-icon" aria-hidden="true">
                    <!-- 인스타그램 아이콘 -->
                </span>
                <span class="sns__platform-label">인스타그램</span>
            </button>

            <button class="sns__platform"
                    type="button"
                    role="tab"
                    id="sns-tab-youtube"
                    aria-selected="false"
                    aria-controls="sns-panel-youtube"
                    data-platform="youtube"
                    tabindex="-1">
                <span class="sns__platform-icon" aria-hidden="true">
                    <!-- 유튜브 아이콘 -->
                </span>
                <span class="sns__platform-label">유튜브</span>
            </button>

            <button class="sns__platform"
                    type="button"
                    role="tab"
                    id="sns-tab-facebook"
                    aria-selected="false"
                    aria-controls="sns-panel-facebook"
                    data-platform="facebook"
                    tabindex="-1">
                <span class="sns__platform-icon" aria-hidden="true">
                    <!-- 페이스북 아이콘 -->
                </span>
                <span class="sns__platform-label">페이스북</span>
            </button>

            <button class="sns__platform"
                    type="button"
                    role="tab"
                    id="sns-tab-blog"
                    aria-selected="false"
                    aria-controls="sns-panel-blog"
                    data-platform="blog"
                    tabindex="-1">
                <span class="sns__platform-icon" aria-hidden="true">
                    <!-- 블로그 아이콘 -->
                </span>
                <span class="sns__platform-label">블로그</span>
            </button>
        </div>
    </div>

    <div class="sns__body">
        <!-- 전체 -->
        <div class="sns__panel"
             id="sns-panel-all"
             role="tabpanel"
             aria-labelledby="sns-tab-all"
             data-platform-panel="all">
            <ul class="sns__list" aria-label="전체 SNS 최신 게시글 목록">
                <li class="sns__item">
                    <a class="sns__link"
                       href="https://www.instagram.com/"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="인스타그램 게시글 새 창 열기">
                        <figure class="sns__figure">
                            <div class="sns__thumb">
                                <img src="./assets/images/sns/sns-01.jpg"
                                     alt="인스타그램 게시글 썸네일">
                            </div>
                            <figcaption class="sns__meta">
                                <span class="sns__channel">인스타그램</span>
                                <span class="sns__text">봄 특별 프로그램 안내</span>
                            </figcaption>
                        </figure>
                    </a>
                </li>

                <li class="sns__item">
                    <a class="sns__link"
                       href="https://blog.naver.com/"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="블로그 게시글 새 창 열기">
                        <figure class="sns__figure">
                            <div class="sns__thumb">
                                <img src="./assets/images/sns/sns-02.jpg"
                                     alt="블로그 게시글 썸네일">
                            </div>
                            <figcaption class="sns__meta">
                                <span class="sns__channel">블로그</span>
                                <span class="sns__text">1분기 특별 프로그램</span>
                            </figcaption>
                        </figure>
                    </a>
                </li>

                <li class="sns__item">
                    <a class="sns__link"
                       href="https://www.facebook.com/"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="페이스북 게시글 새 창 열기">
                        <figure class="sns__figure">
                            <div class="sns__thumb">
                                <img src="./assets/images/sns/sns-03.jpg"
                                     alt="페이스북 게시글 썸네일">
                            </div>
                            <figcaption class="sns__meta">
                                <span class="sns__channel">페이스북</span>
                                <span class="sns__text">육아 힐링 톡 참여 안내</span>
                            </figcaption>
                        </figure>
                    </a>
                </li>

                <li class="sns__item">
                    <a class="sns__link"
                       href="https://www.youtube.com/"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="유튜브 게시글 새 창 열기">
                        <figure class="sns__figure">
                            <div class="sns__thumb">
                                <img src="./assets/images/sns/sns-04.jpg"
                                     alt="유튜브 게시글 썸네일">
                            </div>
                            <figcaption class="sns__meta">
                                <span class="sns__channel">유튜브</span>
                                <span class="sns__text">유연구 4.0 카드뉴스</span>
                            </figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </div>

        <!-- 인스타그램 -->
        <div class="sns__panel"
             id="sns-panel-instagram"
             role="tabpanel"
             aria-labelledby="sns-tab-instagram"
             data-platform-panel="instagram"
             hidden>
            <ul class="sns__list" aria-label="인스타그램 게시글 목록">
                <li class="sns__item">
                    <a class="sns__link"
                       href="#"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="인스타그램 게시글 새 창 열기">
                        <figure class="sns__figure">
                            <div class="sns__thumb">
                                <img src="./assets/images/sns/instagram-01.jpg"
                                     alt="인스타그램 게시글 썸네일">
                            </div>
                            <figcaption class="sns__meta">
                                <span class="sns__channel">인스타그램</span>
                                <span class="sns__text">게시글 제목</span>
                            </figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </div>

        <!-- 유튜브 -->
        <div class="sns__panel"
             id="sns-panel-youtube"
             role="tabpanel"
             aria-labelledby="sns-tab-youtube"
             data-platform-panel="youtube"
             hidden>
            <ul class="sns__list" aria-label="유튜브 게시글 목록">
                <li class="sns__item">
                    <a class="sns__link"
                       href="#"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="유튜브 게시글 새 창 열기">
                        <figure class="sns__figure">
                            <div class="sns__thumb">
                                <img src="./assets/images/sns/youtube-01.jpg"
                                     alt="유튜브 게시글 썸네일">
                            </div>
                            <figcaption class="sns__meta">
                                <span class="sns__channel">유튜브</span>
                                <span class="sns__text">게시글 제목</span>
                            </figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </div>

        <!-- 페이스북 -->
        <div class="sns__panel"
             id="sns-panel-facebook"
             role="tabpanel"
             aria-labelledby="sns-tab-facebook"
             data-platform-panel="facebook"
             hidden>
            <ul class="sns__list" aria-label="페이스북 게시글 목록">
                <li class="sns__item">
                    <a class="sns__link"
                       href="#"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="페이스북 게시글 새 창 열기">
                        <figure class="sns__figure">
                            <div class="sns__thumb">
                                <img src="./assets/images/sns/facebook-01.jpg"
                                     alt="페이스북 게시글 썸네일">
                            </div>
                            <figcaption class="sns__meta">
                                <span class="sns__channel">페이스북</span>
                                <span class="sns__text">게시글 제목</span>
                            </figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </div>

        <!-- 블로그 -->
        <div class="sns__panel"
             id="sns-panel-blog"
             role="tabpanel"
             aria-labelledby="sns-tab-blog"
             data-platform-panel="blog"
             hidden>
            <ul class="sns__list" aria-label="블로그 게시글 목록">
                <li class="sns__item">
                    <a class="sns__link"
                       href="#"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="블로그 게시글 새 창 열기">
                        <figure class="sns__figure">
                            <div class="sns__thumb">
                                <img src="./assets/images/sns/blog-01.jpg"
                                     alt="블로그 게시글 썸네일">
                            </div>
                            <figcaption class="sns__meta">
                                <span class="sns__channel">블로그</span>
                                <span class="sns__text">게시글 제목</span>
                            </figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</section>
    
    </section>

    <section class="links">
        
    </section>

</main>

<!------------ <Footer> ------------>
<?php include './includes/footer.php'; ?>

<!------------- <Script> ------------>
<script src="<?= BASE_URL ?>/js/gloval-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/banner.js"></script>
<script src="<?= BASE_URL ?>/js/programs.js"></script>
<script src="<?= BASE_URL ?>/js/education.js"></script>
<script src="<?= BASE_URL ?>/js/recommend.js"></script>
<script src="<?= BASE_URL ?>/js/calendar.js"></script>
<script src="<?= BASE_URL ?>/js/gallery.js"></script>

</body>
</html>