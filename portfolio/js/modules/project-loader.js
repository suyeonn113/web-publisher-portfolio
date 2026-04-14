export async function loadProjects() {
  try {
    const response = await fetch('./data/projects.json');
    const data = await response.json();
    const wrapper = document.querySelector('.work__cards-wrapper');

    if (!wrapper) return false;

    // 1. 가이드 객체를 제외하고 실제 프로젝트만 필터링 후 HTML 문자열로 변환
    const cardHTML = data
      .filter(project => project.id !== "GUIDE")
      .map(project => {
        const { Common, preview, slug } = project;
        
        // filterTags 가이드: [0]카테고리, [1]환경, [2~]키워드
        const category = preview.filterTags[0] || "General";
        const keywords = preview.filterTags.slice(2).filter(tag => tag !== ""); // 빈 값 제외
        const filterClass = preview.filterTags
          .filter(tag => tag !== "") // 빈 문자열 클래스 방지
          .join(' ')
          .toLowerCase();

        return `
          <article class="work__card ${filterClass}">
            <a href="./project/${slug}.html" class="work__card-inner">
              <figure class="work__img-box">
                <img src="${preview.thumbnail}" alt="${Common.title}" loading="lazy">
                <div class="work__overlay"></div>
              </figure>

              <div class="work__info">
                <div class="work__info-top">
                  <span class="work__date">${Common.year}</span>
                  <span class="work__category">${category}</span>
                </div>

                <div class="work__info-middle">
                  <h3 class="work__card-title">${Common.title}</h3>
                </div>

                <div class="work__info-bottom">
                  <ul class="work__keywords" aria-label="프로젝트 키워드">
                    ${keywords.map(tag => `<li>#${tag}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </a>
          </article>
        `;
      })
      .join(''); // 배열을 하나의 문자열로 합침

    // 2. HTML 주입
    wrapper.innerHTML = cardHTML;

    console.log("✅ Projects Loaded");
    return true;

  } catch (error) {
    console.error("❌ Data load error:", error);
    return false;
  }
}