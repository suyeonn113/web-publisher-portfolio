/* ========================================
   Toggle
   - 공통 토글 상태 반영
   - 실제 열고 닫기 판단은 부모 컴포넌트가 담당
   - 재사용 가능 (header / modal / accordion 등)
======================================== */

/* ---------- 상태 반영 ---------- */
export function updateToggleButton(button, expanded, options = {}) {
    if (!button) return;

    const {
        expandedLabel = '닫기',
        collapsedLabel = '열기',
        labelPrefix = '메뉴'
    } = options;

    /* aria-expanded */
    button.setAttribute('aria-expanded', String(expanded));

    /* aria-label */
    button.setAttribute(
        'aria-label',
        expanded
            ? `${labelPrefix} ${expandedLabel}`
            : `${labelPrefix} ${collapsedLabel}`
    );
}