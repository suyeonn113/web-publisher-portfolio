
/* ========================================
    Cursor Component
======================================== */

export function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    /* =========================
        Move
    ========================= */
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    }

    /* =========================
        Hover Targets
    ========================= */
    function handleMouseOver(e) {
        const target = e.target.closest('a, button, [data-cursor-hover]');
        if (target) {
            cursor.classList.add('cursor--hover');
        }
    }

    function handleMouseOut(e) {
        const target = e.target.closest('a, button, [data-cursor-hover]');
        if (target) {
            cursor.classList.remove('cursor--hover');
        }
    }

    /* =========================
        Click
    ========================= */
    function handleMouseDown() {
        cursor.classList.add('cursor--active');
    }

    function handleMouseUp() {
        cursor.classList.remove('cursor--active');
    }

    /* =========================
        Bind Events
    ========================= */
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
}