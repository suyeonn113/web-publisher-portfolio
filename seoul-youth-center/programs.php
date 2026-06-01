<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/functions/program.service.php';

$pageTitle = '청소년 활동 신청';
$pageCss = ['programs.css', 'program-confirm-modal.css'];

$statusFilter = isset($_GET['status']) ? trim((string) $_GET['status']) : '';
$keyword = isset($_GET['keyword']) ? trim((string) $_GET['keyword']) : '';
$allowedStatuses = [
    '',
    ProgramStatus::ALWAYS,
    ProgramStatus::ONGOING,
    ProgramStatus::UPCOMING,
    ProgramStatus::CLOSED,
];

if (!in_array($statusFilter, $allowedStatuses, true)) {
    $statusFilter = '';
}

function matchesProgramKeyword(array $program, string $keyword): bool
{
    if ($keyword === '') {
        return true;
    }

    $haystacks = [
        $program['title'] ?? '',
        $program['field_code'] ?? '',
        implode(' ', $program['hashtags'] ?? []),
        implode(' ', $program['search_keywords'] ?? []),
    ];

    foreach ($haystacks as $text) {
        if (mb_stripos((string) $text, $keyword, 0, 'UTF-8') !== false) {
            return true;
        }
    }

    return false;
}

$programs = filterActivePrograms($youthPrograms);
$programs = sortProgramsForDisplay($programs);
$programs = array_values(array_filter(
    $programs,
    static function (array $program) use ($statusFilter, $keyword): bool {
        $matchesStatus = $statusFilter === '' || getProgramStatus($program) === $statusFilter;

        return $matchesStatus && matchesProgramKeyword($program, $keyword);
    }
));
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="program-page">
    <section class="program-page__header inner" aria-labelledby="program-page-title">
        <h1 id="program-page-title">청소년 활동 신청</h1>
        <p>
            총 <strong><?= count($programs) ?></strong>개의 프로그램이 등록되어 있습니다.
        </p>

        <form class="program-search" action="<?= BASE_URL ?>/programs.php" method="get" role="search">
            <label class="visually-hidden" for="program-status">모집 상태 선택</label>
            <select id="program-status" name="status">
                <option value=""<?= $statusFilter === '' ? ' selected' : '' ?>>전체</option>
                <option value="<?= ProgramStatus::ONGOING ?>"<?= $statusFilter === ProgramStatus::ONGOING ? ' selected' : '' ?>>모집중</option>
                <option value="<?= ProgramStatus::ALWAYS ?>"<?= $statusFilter === ProgramStatus::ALWAYS ? ' selected' : '' ?>>상시</option>
                <option value="<?= ProgramStatus::UPCOMING ?>"<?= $statusFilter === ProgramStatus::UPCOMING ? ' selected' : '' ?>>예정</option>
                <option value="<?= ProgramStatus::CLOSED ?>"<?= $statusFilter === ProgramStatus::CLOSED ? ' selected' : '' ?>>마감</option>
            </select>

            <label class="visually-hidden" for="program-keyword">프로그램 검색어</label>
            <input
                id="program-keyword"
                name="keyword"
                type="search"
                value="<?= htmlspecialchars($keyword, ENT_QUOTES, 'UTF-8') ?>"
                placeholder="검색어를 입력하세요"
            >

            <button class="program-search__submit button" type="submit">검색</button>
        </form>
    </section>

    <section class="program-list inner" aria-label="청소년 활동 신청 프로그램 목록">
        <?php if (empty($programs)): ?>
            <p class="program-list__empty">조건에 맞는 프로그램이 없습니다.</p>
        <?php else: ?>
            <?php foreach ($programs as $program): ?>
                <?php
                $programMeta = getProgramCardMeta($program);
                $status = $programMeta['status'];
                $isClosed = $status === ProgramStatus::CLOSED;
                $image = $program['image'] ?? [];
                $imageSrc = BASE_URL . ($image['src'] ?? '');
                $imageAlt = $image['alt'] ?? ($program['title'] ?? '');
                $title = $program['title'] ?? '';
                $ageLabel = getProgramAgeLabel($program);
                $recruitmentPeriod = $programMeta['recruitment_period'] !== ''
                    ? $programMeta['recruitment_period']
                    : '상시 모집';
                $activityPeriod = $programMeta['activity_period'] !== ''
                    ? $programMeta['activity_period']
                    : '상시 운영';
                ?>
                <article class="program-apply-card" id="program-<?= (int) ($program['id'] ?? 0) ?>">
                    <a class="program-apply-card__media" href="<?= BASE_URL ?>/program-detail.php?id=<?= (int) ($program['id'] ?? 0) ?>">
                        <img
                            src="<?= htmlspecialchars($imageSrc, ENT_QUOTES, 'UTF-8') ?>"
                            alt="<?= htmlspecialchars($imageAlt, ENT_QUOTES, 'UTF-8') ?>"
                        >
                        <div class="program-apply-card__overlay" aria-hidden="true">
                            <strong><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></strong>
                            <dl>
                                <div>
                                    <dt>신청기간</dt>
                                    <dd><?= htmlspecialchars($recruitmentPeriod, ENT_QUOTES, 'UTF-8') ?></dd>
                                </div>
                                <div>
                                    <dt>신청대상</dt>
                                    <dd><?= htmlspecialchars($ageLabel, ENT_QUOTES, 'UTF-8') ?></dd>
                                </div>
                                <div>
                                    <dt>활동기간</dt>
                                    <dd><?= htmlspecialchars($activityPeriod, ENT_QUOTES, 'UTF-8') ?></dd>
                                </div>
                            </dl>
                            <span class="program-apply-card__plus">+</span>
                        </div>
                    </a>

                    <div class="program-apply-card__actions">
                        <?php if ($isClosed): ?>
                            <button class="program-apply-card__cta is-closed" type="button" disabled>마감</button>
                        <?php else: ?>
                            <a
                                class="program-apply-card__cta is-apply"
                                href="<?= BASE_URL ?>/program-apply.php?id=<?= (int) ($program['id'] ?? 0) ?>"
                            >
                                신청하기
                            </a>
                        <?php endif; ?>
                        <button
                            class="program-apply-card__cta is-confirm"
                            type="button"
                            data-program-id="<?= (int) ($program['id'] ?? 0) ?>"
                            data-program-title="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>"
                        >
                            신청확인
                        </button>
                    </div>
                </article>
            <?php endforeach; ?>
        <?php endif; ?>
    </section>

    <nav class="program-pagination inner" aria-label="프로그램 목록 페이지">
        <button type="button" disabled aria-label="첫 페이지">«</button>
        <button type="button" disabled aria-label="이전 페이지">‹</button>
        <strong aria-current="page">1</strong>
        <button type="button" disabled aria-label="다음 페이지">›</button>
        <button type="button" disabled aria-label="마지막 페이지">»</button>
    </nav>

    <?php include __DIR__ . '/includes/components/program-confirm-modal.php'; ?>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script>
    window.APP_BASE_URL = '<?= BASE_URL ?>';
</script>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/program-confirm-modal.js"></script>

</body>
</html>
