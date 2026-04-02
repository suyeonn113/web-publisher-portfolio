<?php
header('Content-Type: application/json; charset=utf-8');

include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/youth-programs.php';
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
 * - 기존 서비스 함수 유지
 * - 표시용 정렬 재사용
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
    echo '<p class="programs__empty">조건에 맞는 프로그램이 없습니다.</p>';
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
 * 5) 평생교육 프로그램
 * - 아직 데이터 연결 전이므로 빈 상태 반환
 * - 나중에 education 데이터 붙이면 그대로 확장 가능
 * -----------------------------------------
 */
$educationHtml = '<p class="programs__empty">준비 중입니다.</p>';

/**
 * -----------------------------------------
 * 6) 응답
 * -----------------------------------------
 */
echo json_encode([
    'youthHtml' => $youthHtml,
    'educationHtml' => $educationHtml,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);