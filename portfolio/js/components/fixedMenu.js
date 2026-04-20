import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";

/* ========================================
   Fixed Menu Component (Toggle & Tracking)
======================================== */

const MENU_ITEMS = [
  {
    id: 'about',
    icon: 'user-round',
    title: '자기소개',
    content: '포트폴리오 정보입니다.',
    previewImg: 'assets/images/fixedMenu/preview-about.jpg'
  },
  {
    id: 'resume',
    icon: 'file-down',
    title: '이력서 다운로드',
    content: 'PDF 형식의 이력서를 다운로드할 수 있습니다.',
    previewImg: 'assets/images/fixedMenu/preview-resume.jpg'
  },
  {
    id: 'github',
    icon: 'git-fork',
    title: '깃허브 링크',
    content: 'GitHub 바로가기',
    previewImg: 'assets/images/fixedMenu/preview-github.jpg'
  }
];

export function renderFixedMenu() {
  const menuHTML = `
    <nav class="fixed-menu" aria-label="퀵 메뉴">
      <ul class="fixed-menu__list">
        ${MENU_ITEMS.map(item => `
          <li class="fixed-menu__item">
            <button type="button" 
                    class="fixed-menu__btn js-fixed-btn" 
                    data-id="${item.id}"
                    data-img="${item.previewImg}"
                    data-title="${item.title}"
                    data-state="closed"
                    aria-expanded="false"
                    aria-label="${item.title}"
                    aria-controls="panel-${item.id}">
              <i data-lucide="${item.icon}" aria-hidden="true"></i>
            </button>
            <div id="panel-${item.id}" class="fixed-menu__panel" data-state="closed">
              <div class="fixed-menu__content">${item.content}</div>
            </div>
          </li>
        `).join('')}
      </ul>
      <div class="fixed-menu__preview js-fixed-preview" aria-hidden="true">
        <img src="" alt="" class="fixed-menu__preview-img">
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML("beforeend", menuHTML);
  if (window.lucide) window.lucide.createIcons();
}

/**
 * @param {Lenis} lenis - 스크롤 제어를 위해 메인에서 전달받은 lenis 인스턴스
 */
export function initFixedMenu(lenis) {
  const btns = document.querySelectorAll('.js-fixed-btn');
  const panels = document.querySelectorAll('.fixed-menu__panel');
  const preview = document.querySelector('.js-fixed-preview');
  const previewImg = preview?.querySelector('.fixed-menu__preview-img');

  if (!btns.length || !panels.length || !preview || !previewImg) return;

  // 초기 preview 상태
  gsap.set(preview, {
    autoAlpha: 0,
    scale: 0.8,
    x: 0,
    y: 0
  });

  // 모든 패널 닫기 및 스크롤 재개 함수
  function closeAll() {
    btns.forEach(b => {
      b.dataset.state = 'closed';
      b.setAttribute('aria-expanded', 'false');
    });

    panels.forEach(p => {
      p.dataset.state = 'closed';
      gsap.set(p, { clearProps: 'opacity,visibility,transform' });
    });

    if (lenis) lenis.start();
  }

  // 토글 로직
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const targetId = btn.dataset.id;
      const targetPanel = document.getElementById(`panel-${targetId}`);
      const isCurrentlyOpen = btn.dataset.state === 'open';

      if (!targetPanel) return;

      if (isCurrentlyOpen) {
        closeAll();
      } else {
        closeAll();

        btn.dataset.state = 'open';
        btn.setAttribute('aria-expanded', 'true');
        targetPanel.dataset.state = 'open';

        if (lenis) lenis.stop();

        gsap.fromTo(
          targetPanel,
          { autoAlpha: 0, x: 20 },
          { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  });

  // 패널 자체를 클릭해도 닫기
  panels.forEach(panel => {
    panel.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAll();
    });
  });

  // 외부 클릭 시 닫기
  document.addEventListener('click', closeAll);

  // 마우스 트래킹 로직 (PC 전용)
  if (window.innerWidth > 1024) {
    btns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        const nextImg = btn.dataset.img;

        if (nextImg) {
          previewImg.src = nextImg;
          previewImg.alt = `${btn.dataset.id} preview image`;
        }

        gsap.to(preview, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.3,
          overwrite: true
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(preview, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.3,
          overwrite: true
        });
      });

      btn.addEventListener('mousemove', (e) => {
        gsap.to(preview, {
          x: e.clientX - 200,
          y: e.clientY - 50,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }
}