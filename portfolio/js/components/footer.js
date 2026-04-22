/* ========================================
   Footer Component
======================================== */

export function renderFooter() {
  const footerHTML = `
    <footer class="site-footer l-fullspan">
      <div class="site-footer__inner">
        <nav class="site-footer__contact" aria-label="연락처">
          <a href="mailto:suyeonn113@naver.com" class="site-footer__link">email</a>
          <a href="https://github.com/suyeonn113" target="_blank" class="site-footer__link">github</a>
        </nav>
        <p class="site-footer__copy"><small>© ${new Date().getFullYear()} suyeon</small></p>
      </div>
    </footer>
  `;

  const main = document.querySelector("#main");
  if (!main) return;

  main.insertAdjacentHTML("afterend", footerHTML);
}