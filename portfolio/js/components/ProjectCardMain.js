export async function loadProjects() {
  try {
    const response = await fetch('./data/projects.json');
    const data = await response.json();
    const wrapper = document.querySelector('.work__cards-wrapper');

    if (!wrapper) return false;

    // 기기별 아이콘 매핑
    const deviceIcons = {
      "Mobile": "smartphone",
      "Tablet": "tablet",
      "PC": "monitor",
      "Responsive": "monitor-check",
      "Desktop": "monitor"
    };

    // 프로젝트 유형별 아이콘 매핑
    const typeIcons = {
      "E-commerce": "shopping-bag",
      "Commercial": "briefcase",
      "Public": "landmark",
      "Brand": "award",
      "Promotion": "megaphone",
      "Personal": "user",
      "Editorial": "book-open"
    };

    const folderHTML = data
      // 가이드 데이터(DATA_MASTER_GUIDE) 항목은 화면에 그리지 않고 걸러냄
      .filter(project => !project.DATA_MASTER_GUIDE)
      .map(project => {
        // 데이터가 비어있을 경우를 대비한 방어 코드
        const id = project.id || "";
        const Common = project.Common || {};
        const preview = project.preview || {};
        const spec = preview.spec || {};

        // 사전에서 아이콘 매칭 (없으면 기본값 지정)
        const dIcon = deviceIcons[spec.device] || "monitor";
        const tIcon = typeIcons[spec.projectType] || "briefcase";

        // 필터링을 위한 클래스 문자열 생성
        const filterClass = (preview.filterTags || []).map(tag => tag.trim().toLowerCase()).join(' ');

        return `
          <article class="work__card is-folder ${filterClass}">
            <a href="#" class="work-card__inner" aria-label="${Common.title} 상세 보기">
              <div class="folder__back"></div>

              <figure class="folder__img-box">
                <img src="${preview.thumbnail || ''}" alt="" loading="lazy">
                <div class="folder__overlay"></div>
              </figure>

              <div class="folder__front-container">
                <div class="folder__front" aria-hidden="true">
                  <svg viewBox="0 0 541 374" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 338V36C0 16.1178 16.1178 0 36 0H202.742C212.284 0 221.435 3.78826 228.186 10.5324L251.459 33.7844C258.21 40.5285 267.361 44.3167 276.903 44.3167H505C524.882 44.3167 541 60.4344 541 80.3167V338C541 357.882 524.882 374 505 374H36C16.1178 374 0 357.882 0 338Z" fill="currentColor"/>
                  </svg>
                </div>

                <div class="folder__info">
                  <div class="folder__info-header">
                    <h3 class="folder__title">${Common.title || 'Untitled'}</h3>
                  </div>

                  <div class="folder__info-meta">
                    <span class="folder__year">${Common.year || ''}</span>
                    <div class="folder__category-icons">
                      <i data-lucide="${dIcon}"></i>
                      <i data-lucide="${tIcon}"></i>
                    </div>
                  </div>

                  <div class="folder__info-footer">
                    <ul class="folder__tech-list" aria-label="사용 기술">
                      ${(spec.techStack || []).map(tool => {
                        // 기술명을 소문자로 변환해 파일명 매칭 (예: Figma -> figma.svg)
                        const fileName = tool.toLowerCase().replace(/\s+/g, '');
                        const iconPath = `./assets/icons/tech/${fileName}.svg`;
                        return `
                          <li>
                            <span class="tech-icon" 
                              style="-webkit-mask-image: url('${iconPath}'); mask-image: url('${iconPath}');"
                              aria-label="${tool}"
                              role="img"
                              title="${tool}">
                            </span>
                          </li>`;
                      }).join('')}
                    </ul>
                  </div>
                </div>
              </div>
            </a>
          </article>
        `;
      }).join('');

    // 생성된 HTML을 컨테이너에 삽입
    wrapper.innerHTML = folderHTML;

    // Lucide 아이콘 렌더링 실행
    if (window.lucide) {
      window.lucide.createIcons();
    }

    console.log("✅ Projects Loaded (Guide Excluded, Tech SVGs Applied)");
    return true;

  } catch (error) {
    console.error("❌ Data load error:", error);
    return false;
  }
}