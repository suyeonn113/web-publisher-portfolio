/* ========================================
   Project Detail Component
======================================== */

function getProjectSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug') || 'fragfarm-mobile';
}

async function fetchProjectData() {
  const slug = getProjectSlug();
  const response = await fetch(`./data/projects/${slug}.json`);

  if (!response.ok) {
    throw new Error(`프로젝트 데이터를 불러오지 못했습니다: ${slug}`);
  }

  return response.json();
}

function formatDateRange(start, end) {
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  return `${start} - ${end}`;
}

function formatRole(role) {
  if (!Array.isArray(role)) return role || '';
  return role.join(', ');
}

function normalizeProject(project) {
  return {
    ...project,
    meta: {
      ...project.meta,
      dateRange: formatDateRange(project.meta?.dateStart, project.meta?.dateEnd),
      roleText: formatRole(project.meta?.role)
    }
  };
}

function setText(selector, value, scope = document) {
  const element = scope.querySelector(selector);
  if (!element) return;
  element.textContent = value || '';
}

function setLink(selector, href, scope = document) {
  const element = scope.querySelector(selector);
  if (!element) return;

  if (!href) {
    element.hidden = true;
    return;
  }

  element.href = href;
  element.hidden = false;
}

function renderHeroDescription(project, root) {
  const container = root.querySelector('[data-field="hero.description"]');
  const template = root.querySelector('#tpl-hero-desc');

  if (!container || !template) return;

  container.innerHTML = '';

  project.hero?.description?.forEach((line) => {
    const node = template.content.cloneNode(true);
    const text = node.querySelector('.project-hero__desc-line');
    if (text) text.textContent = line;
    container.appendChild(node);
  });
}

function renderHeroTags(project, root) {
  const container = root.querySelector('[data-field="hero.tags"]');
  const template = root.querySelector('#tpl-hero-tag');

  if (!container || !template) return;

  container.innerHTML = '';

  project.hero?.tags?.forEach((tag) => {
    const node = template.content.cloneNode(true);
    const item = node.querySelector('.project-hero__tag');
    if (item) item.textContent = `# ${tag}`;
    container.appendChild(node);
  });
}

function getHeroFrames(project) {
  const mode = project.meta?.projectMode;
  const visuals = project.hero?.visuals || {};

  let frames = [];

  if (mode === 'mobile') {
    frames = ['mobile'];
  } else if (mode === 'responsive') {
    frames = ['mobile', 'tablet', 'pc'];
  } else if (mode === 'pc') {
    frames = ['pc'];
  }

  return frames.filter((frame) => visuals[frame]);
}

function renderHeroVisuals(project, root) {
  const container = root.querySelector('[data-field="hero.visuals"]');
  const template = root.querySelector('#tpl-hero-visual');

  if (!container || !template) return;

  container.innerHTML = '';

  const frames = getHeroFrames(project);
  const visuals = project.hero?.visuals || {};

  frames.forEach((frame) => {
    const visual = visuals[frame];
    if (!visual) return;

    const node = template.content.cloneNode(true);
    const figure = node.querySelector('figure');
    const image = node.querySelector('img');

    if (figure) {
      figure.classList.add(`project-hero__device`, `project-hero__device--${frame}`);
    }

    if (image) {
      image.src = visual.src || '';
      image.alt = visual.alt || '';
    }

    container.appendChild(node);
  });
}

function renderSummary(project, root) {
  setText('[data-field="summary.overview"]', project.summary?.overview, root);
  setText('[data-field="summary.role"]', project.summary?.role, root);
  setText('[data-field="summary.tech"]', project.summary?.tech, root);
}

function renderCaseList(project, root, selectedId) {
  const container = root.querySelector('[data-field="caseList"]');
  const template = root.querySelector('#tpl-case-item');

  if (!container || !template) return;

  container.innerHTML = '';

  project.caseList?.forEach((item) => {
    const node = template.content.cloneNode(true);
    const button = node.querySelector('.case-item');
    const title = node.querySelector('.case-item__title');
    const summary = node.querySelector('.case-item__summary');

    if (button) {
      button.dataset.caseId = item.id;
      button.setAttribute('aria-selected', String(item.id === selectedId));
      if (item.id === selectedId) button.classList.add('is-active');
    }

    if (title) title.textContent = item.title || '';
    if (summary) summary.textContent = item.summary || '';

    container.appendChild(node);
  });
}

function renderCaseSteps(caseItem, root) {
  const container = root.querySelector('[data-field="caseDetail.steps"]');
  const template = root.querySelector('#tpl-case-step');

  if (!container || !template) return;

  container.innerHTML = '';

  const steps = caseItem.steps || [];
  const stepCount = Math.min(Math.max(steps.length, 1), 4);
  container.dataset.stepCount = String(stepCount);

  steps.forEach((step) => {
    const node = template.content.cloneNode(true);
    const image = node.querySelector('img');
    const caption = node.querySelector('figcaption');

    if (image) {
      image.src = step.image || '';
      image.alt = step.alt || step.label || '';
    }

    if (caption) {
      caption.textContent = step.label || '';
    }

    container.appendChild(node);
  });
}

function renderCaseImplementation(caseItem, root) {
  const container = root.querySelector('[data-field="caseDetail.implementation"]');

  if (!container) return;

  container.innerHTML = '';

  caseItem.implementation?.forEach((text) => {
    const item = document.createElement('li');
    item.className = 'case-detail__implementation-item';
    item.textContent = text;
    container.appendChild(item);
  });
}

function renderCaseDetail(project, root, selectedId) {
  const currentCase =
    project.caseDetail?.find((item) => item.id === selectedId) ||
    project.caseDetail?.[0];

  if (!currentCase) return;

  setText('[data-field="caseDetail.title"]', currentCase.title, root);
  setText('[data-field="caseDetail.problem"]', currentCase.problem, root);
  setText('[data-field="caseDetail.solution"]', currentCase.solution, root);
  setText('[data-field="caseDetail.keyPoint"]', currentCase.keyPoint, root);

  renderCaseSteps(currentCase, root);
  renderCaseImplementation(currentCase, root);
}

function renderHighlights(project, root) {
  const container = root.querySelector('[data-field="highlights"]');
  const template = root.querySelector('#tpl-highlight');

  if (!container || !template) return;

  container.innerHTML = '';

  project.highlights?.forEach((item) => {
    const node = template.content.cloneNode(true);
    const title = node.querySelector('h3');
    const text = node.querySelector('p');

    if (title) title.textContent = item.title || '';
    if (text) text.textContent = item.description || '';

    container.appendChild(node);
  });
}

function renderEtc(project, root) {
  setText('[data-field="etc.deployment"]', project.etc?.deployment, root);
  setText('[data-field="etc.tools"]', project.etc?.tools, root);
  setText('[data-field="etc.contribution"]', project.etc?.contribution, root);
}

function renderMeta(project, root) {
  setText('[data-field="meta.label"]', project.meta?.label, root);
  setText('[data-field="meta.title"]', project.meta?.title, root);
  setText('[data-field="meta.dateRange"]', project.meta?.dateRange, root);
  setText('[data-field="meta.role"]', project.meta?.roleText, root);
  setText('[data-field="meta.projectType"]', project.meta?.projectType, root);
  setText('[data-field="meta.projectScale"]', project.meta?.projectScale, root);

  setLink('[data-link-type="live"]', project.meta?.liveLink, root);
}

function bindCaseEvents(project, root, state) {
  const container = root.querySelector('[data-field="caseList"]');
  if (!container) return;

  container.addEventListener('click', (event) => {
    const button = event.target.closest('.case-item');
    if (!button) return;

    const caseId = button.dataset.caseId;
    if (!caseId || caseId === state.selectedCaseId) return;

    state.selectedCaseId = caseId;

    renderCaseList(project, root, state.selectedCaseId);
    renderCaseDetail(project, root, state.selectedCaseId);
  });
}

function renderProjectDetail(project, root, state) {
  renderMeta(project, root);
  renderHeroDescription(project, root);
  renderHeroTags(project, root);
  renderHeroVisuals(project, root);
  renderSummary(project, root);
  renderCaseList(project, root, state.selectedCaseId);
  renderCaseDetail(project, root, state.selectedCaseId);
  renderHighlights(project, root);
  renderEtc(project, root);
}

export async function loadProjectDetail() {
  const root = document.querySelector('[data-page-root]');
  if (!root) return false;

  try {
    const rawProject = await fetchProjectData();
    const project = normalizeProject(rawProject);

    const state = {
      selectedCaseId: project.caseList?.[0]?.id || ''
    };

    renderProjectDetail(project, root, state);
    bindCaseEvents(project, root, state);

    return true;
  } catch (error) {
    console.error(error);
    root.innerHTML = '<p class="project-detail__error">프로젝트 데이터를 불러오지 못했습니다.</p>';
    return false;
  }
}
