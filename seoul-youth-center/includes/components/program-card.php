<?php
/**
 * 프로그램 카드 컴포넌트
 *
 * 사용 위치:
 * - 홈: $cardVariant = 'home'
 * - 프로그램 페이지: $cardVariant = 'program'
 *
 * 제어 방식:
 * - PHP 조건으로 출력 분기 (CSS 숨김 X)
 */

if (!isset($program, $programMeta)) return;

$cardVariant = $cardVariant ?? 'home'; // 기본값: 홈

$image = $program['image'] ?? [];
$imageSrc = $image['src'] ?? '';
$imageAlt = $image['alt'] ?? ($program['title'] ?? '');

$url = $program['url'] ?? '#';
$title = $program['title'] ?? '';
$summary = $program['summary'] ?? '';

$hashtags = $program['hashtags'] ?? [];

$statusLabel = $programMeta['status_label'] ?? '';
$recruitmentPeriod = $programMeta['recruitment_period'] ?? '';

$activityPeriod = $programMeta['activity_period'] ?? '';
$activityDays = $programMeta['activity_days'] ?? 0;

$priceLabel = $programMeta['price_label'] ?? '';
$durationLabel = $programMeta['duration_label'] ?? '';

$dataAttributes = $programMeta['data_attributes'] ?? [];

/**
 * 내가 추가한 클래스
 * - card--home
 * - card--program
 */
$cardClasses = ['card', 'card--' . $cardVariant];

$cardAttributes = '';
foreach ($dataAttributes as $name => $value) {
    if ($value === '' || $value === null) continue;

    $cardAttributes .= ' ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8')
        . '="' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '"';
}
?>

<article class="<?= implode(' ', $cardClasses) ?>"<?= $cardAttributes ?>>
    <a class="card__link" href="<?= htmlspecialchars(BASE_URL . $url) ?>">

        <!-- 이미지 영역 (공통) -->
        <div class="card__image">
            <img src="<?= htmlspecialchars(BASE_URL . $imageSrc) ?>"
                 alt="<?= htmlspecialchars($imageAlt) ?>">

            <!-- 모집 상태 배지 (공통) -->
            <span class="card__badge">
                <span class="visually-hidden">모집 상태:</span>
                <?= htmlspecialchars($statusLabel) ?>
            </span>
        </div>

        <div class="card__body">

            <!-- 제목 (공통) -->
            <h3 class="card__title">
                <?= htmlspecialchars($title) ?>
            </h3>

            <!-- 모집기간 (공통) -->
            <p class="card__date">
                <?= $recruitmentPeriod 
                    ? htmlspecialchars($recruitmentPeriod)
                    : '&nbsp;' ?>
            </p>

            <!-- =========================
                 홈에서는 안나옴
                 프로그램 페이지 전용
            ========================== -->
            <?php if ($cardVariant === 'program'): ?>

                <!-- 설명 -->
                <?php if ($summary): ?>
                    <p class="card__summary">
                        <?= htmlspecialchars($summary) ?>
                    </p>
                <?php endif; ?>

                <!-- 메타 정보 (분야 / 비용 / 기간 등) -->
                <?php if ($priceLabel || $durationLabel): ?>
                    <div class="card__meta">
                        <?php if ($priceLabel): ?>
                            <span class="card__meta-item">
                                <?= htmlspecialchars($priceLabel) ?>
                            </span>
                        <?php endif; ?>

                        <?php if ($durationLabel): ?>
                            <span class="card__meta-item">
                                <?= htmlspecialchars($durationLabel) ?>
                            </span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <!-- 활동기간 -->
                <?php if ($activityPeriod): ?>
                    <p class="card__activity">
                        활동기간: <?= htmlspecialchars($activityPeriod) ?>
                        <?php if ($activityDays): ?>
                            (<?= $activityDays ?>일)
                        <?php endif; ?>
                    </p>
                <?php endif; ?>

            <?php endif; ?>

            <!-- 태그 (공통) -->
            <?php if (!empty($hashtags)): ?>
                <ul class="card__tags">
                    <?php foreach ($hashtags as $tag): ?>
                        <li class="card__tag"><?= htmlspecialchars($tag) ?></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

        </div>
    </a>
</article>