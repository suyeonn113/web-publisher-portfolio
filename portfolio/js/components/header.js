import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

/* ========================================
   Header Component
======================================== */

function getPageType() {
  return document.body.dataset.page || "";
}

function createHeaderIcons() {
  if (!window.lucide) return;
  window.lucide.createIcons();
}

/* 헤더 DOM 주입 */
export function renderHeader() {
  const headerHTML = `
    <header class="site-header l-fullspan">
      <nav class="site-header__nav">
        <ul class="site-header__menu">
          <li><a class="site-header__link" href="index.html">HOME</a></li>
          <li><a class="site-header__link" href="work.html">WORK</a></li>
          <li><a class="site-header__link" href="log.html">LOG</a></li>
          <li><a class="site-header__link" href="contact.html">CONTACT</a></li>
          <li>
            <button type="button"
                    class="site-header__theme-toggle"
                    aria-label="다크모드 전환"
                    aria-pressed="false">
              <i data-lucide="moon" aria-hidden="true"></i>
              <span class="visually-hidden">다크모드 전환</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  createHeaderIcons();
}

/* 고정 상태 */
export function initHeaderFixed() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  gsap.set(header, {
    yPercent: 0,
    autoAlpha: 1
  });
}

/* 초기 숨김 상태 */
export function initHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  gsap.set(header, {
    yPercent: -100,
    autoAlpha: 0
  });
}

/* 첫 진입 */
export function initHeaderEntrance() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  return gsap.to(header, {
    yPercent: 0,
    autoAlpha: 1,
    duration: 0.6,
    ease: "power2.out"
  });
}

/* 스크롤 방향 반응 */
export function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const pageType = getPageType();

  if (pageType === "home") return;
  // 페이지 추가

  let lastY = window.scrollY;
  let isHidden = false;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastY;
      const hasMovedEnough = Math.abs(currentY - lastY) > 6;

      if (!hasMovedEnough) {
        return;
      }

      if (isScrollingDown && !isHidden) {
        isHidden = true;
        gsap.to(header, {
          yPercent: -100,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else if (!isScrollingDown && isHidden) {
        isHidden = false;
        gsap.to(header, {
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      lastY = currentY;
    }
  });
}
