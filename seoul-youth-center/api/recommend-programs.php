<?php
header('Content-Type: application/json; charset=utf-8');

include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/youth-programs.php';
include __DIR__ . '/../includes/data/education-programs.php';
include __DIR__ . '/../includes/functions/program.service.php';

/**
 * -----------------------------------------
 * 1) 청소년 프로그램 필터링
 * -----------------------------------------
 */
$filteredYouthPrograms = getRecommendPrograms($youthPrograms, $_GET);

/**
 * -----------------------------------------
 * 2) 청소년 프로그램 HTML 생성
 * -----------------------------------------
 */
ob_start();

if (empty($filteredYouthPrograms)) {
    echo '<p class="programs__empty">등록된 프로그램이 없습니다.</p>';
} else {
    foreach ($filteredYouthPrograms as $program) {
        $programMeta = getProgramCardMeta($program);
        $cardVariant = 'home-recommend';
        include __DIR__ . '/../includes/components/program-card.php';
    }
}

$youthHtml = ob_get_clean();

/**
 * -----------------------------------------
 * 3) 평생교육 프로그램 필터링
 * -----------------------------------------
 */
$educationPrograms = isset($educationPrograms) && is_array($educationPrograms)
    ? $educationPrograms
    : [];

$filteredEducationPrograms = getRecommendPrograms($educationPrograms, $_GET);

/**
 * -----------------------------------------
 * 4) 평생교육 프로그램 HTML 생성
 * - ul.education__track 안에 들어가므로 li 구조 사용
 * - 카드 전체 클릭 가능하도록 a.card__link로 감싸기
 * - 메타는 항상 출력해서 높이 흐트러짐 방지
 * -----------------------------------------
 */
ob_start();

if (empty($filteredEducationPrograms)) {
    echo '<p class="programs__empty">등록된 프로그램이 없습니다.</p>';
} else {
    foreach ($filteredEducationPrograms as $program) {
        $programMeta = getProgramCardMeta($program);

        $title = $program['title'] ?? '';
        $url = $program['url'] ?? '#';
        $statusLabel = $programMeta['status_label'] ?? '';
        $activityPeriod = $programMeta['activity_period'] ?? '';

        if ($activityPeriod === '') {
            $activityPeriod = ' ';
        }
        ?>
        <li class="card card--education">
            <a
                href="<?= htmlspecialchars($url, ENT_QUOTES, 'UTF-8'); ?>"
                class="card__link"
                aria-label="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?>"
            >
                <span class="card__badge">
                    <?= htmlspecialchars($statusLabel, ENT_QUOTES, 'UTF-8'); ?>
                </span>

                <h4 class="card__title">
                    <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?>
                </h4>

                <p class="card__meta">
                    <?= htmlspecialchars($activityPeriod, ENT_QUOTES, 'UTF-8'); ?>
                </p>
            </a>
        </li>
        <?php
    }
}

$educationHtml = ob_get_clean();

/**
 * -----------------------------------------
 * 5) 응답
 * -----------------------------------------
 */
echo json_encode([
    'youthHtml' => $youthHtml,
    'educationHtml' => $educationHtml,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
