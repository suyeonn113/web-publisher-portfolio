<?php
header('Content-Type: application/json; charset=utf-8');

include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/youth-programs.php';
include __DIR__ . '/../includes/data/education-programs.php';
include __DIR__ . '/../includes/functions/program.service.php';

/**
 * -----------------------------------------
 * 1) 입력값
 * -----------------------------------------
 */
$age = isset($_GET['age']) ? trim((string) $_GET['age']) : null;
$field = isset($_GET['field']) ? trim((string) $_GET['field']) : null;

/**
 * -----------------------------------------
 * 2) 유틸
 * - 배열/문자열 모두 대응
 * - 나중에 DB로 바뀌면 이 구간 대신 SQL 조건으로 교체
 * -----------------------------------------
 */
function normalizeToArray($value) {
    if (is_array($value)) {
        return array_values(array_filter(array_map('strval', $value)));
    }

    if (is_string($value) && $value !== '') {
        $parts = preg_split('/[\s,]+/u', $value);
        return array_values(array_filter(array_map('trim', $parts)));
    }

    return [];
}

function matchAgeFilter($program, $age) {
    if (!$age) return true;

    $candidates = [];

    if (isset($program['age_group_codes'])) {
        $candidates = array_merge($candidates, normalizeToArray($program['age_group_codes']));
    }

    if (isset($program['age_groups'])) {
        $candidates = array_merge($candidates, normalizeToArray($program['age_groups']));
    }

    if (isset($program['target_codes'])) {
        $candidates = array_merge($candidates, normalizeToArray($program['target_codes']));
    }

    if (isset($program['target_code'])) {
        $candidates = array_merge($candidates, normalizeToArray($program['target_code']));
    }

    $candidates = array_unique($candidates);

    return in_array($age, $candidates, true);
}

function matchFieldFilter($program, $field) {
    if (!$field) return true;

    $candidates = [];

    if (isset($program['field_code'])) {
        $candidates = array_merge($candidates, normalizeToArray($program['field_code']));
    }

    if (isset($program['field_codes'])) {
        $candidates = array_merge($candidates, normalizeToArray($program['field_codes']));
    }

    if (isset($program['field'])) {
        $candidates = array_merge($candidates, normalizeToArray($program['field']));
    }

    $candidates = array_unique($candidates);

    return in_array($field, $candidates, true);
}

function filterRecommendPrograms($programs, $age, $field) {
    $filtered = array_filter($programs, function ($program) use ($age, $field) {
        return matchAgeFilter($program, $age) && matchFieldFilter($program, $field);
    });

    return array_values($filtered);
}

/**
 * -----------------------------------------
 * 3) 청소년 프로그램 필터링
 * -----------------------------------------
 */
$programs = filterActivePrograms($youthPrograms);
$programs = sortProgramsForDisplay($programs);
$filteredYouthPrograms = filterRecommendPrograms($programs, $age, $field);

/**
 * -----------------------------------------
 * 4) 청소년 프로그램 HTML 생성
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
 * 5) 평생교육 프로그램 필터링
 * -----------------------------------------
 */
$educationPrograms = isset($educationPrograms) && is_array($educationPrograms)
    ? $educationPrograms
    : [];

$educationPrograms = array_values(array_filter($educationPrograms, function ($program) {
    return !empty($program['is_active']);
}));

$filteredEducationPrograms = filterRecommendPrograms($educationPrograms, $age, $field);

/**
 * -----------------------------------------
 * 6) 평생교육 프로그램 HTML 생성
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
 * 7) 응답
 * -----------------------------------------
 */
echo json_encode([
    'youthHtml' => $youthHtml,
    'educationHtml' => $educationHtml,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);