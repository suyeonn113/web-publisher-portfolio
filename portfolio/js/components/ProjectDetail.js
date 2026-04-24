/* ========================================
   Project Detail Component
======================================== */

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

function getProjectSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug') || 'fragfarm-mobile';
}

async function fetchProjectData() {
  const slug = getProjectSlug();
  const response = await fetch(`./data/projects/${slug}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load project data: ${slug}`);
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
  const caseMetaMap = new Map((project.caseList || []).map((item) => [item.id, item]));
  const cases = (project.caseDetail || []).map((item, index) => ({
    ...caseMetaMap.get(item.id),
    ...item,
    order: index + 1
  }));

  return {
    ...project,
    cases,
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
      figure.classList.add('project-hero__device', `project-hero__device--${frame}`);
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

function renderCaseSteps(steps, container, root) {
  const template = root.querySelector('#tpl-case-step');

  if (!container || !template) return;

  container.innerHTML = '';

  const safeSteps = Array.isArray(steps) ? steps : [];
  const stepCount = Math.min(Math.max(safeSteps.length, 1), 4);
  container.dataset.stepCount = String(stepCount);

  safeSteps.forEach((step) => {
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

function renderCaseImplementation(items, container) {
  if (!container) return;

  container.innerHTML = '';

  (items || []).forEach((text) => {
    const item = document.createElement('li');
    item.className = 'case-panel__implementation-item';
    item.textContent = text;
    container.appendChild(item);
  });
}

function renderCaseListItems(project, container, template, selectedId, options = {}) {
  const { isIsland = false } = options;

  if (!container || !template) return;

  container.innerHTML = '';

  project.cases.forEach((item) => {
    const node = template.content.cloneNode(true);
    const button = node.querySelector('.case-item');
    const title = node.querySelector('.case-item__title');

    if (button) {
      const panelId = `case-panel-${item.id}`;
      const isActive = item.id === selectedId;

      button.dataset.caseId = item.id;
      button.setAttribute('aria-pressed', String(isActive));
      button.setAttribute('aria-controls', panelId);
      button.classList.toggle('is-active', isActive);

      if (isIsland) {
        button.classList.add('case-item--island', 'btn', 'btn--compact');
      }
    }

    if (title) {
      title.textContent = item.title || '';
    }

    container.appendChild(node);
  });
}

function renderCaseList(project, root, selectedId) {
  const container = root.querySelector('[data-field="caseList"]');
  const template = root.querySelector('#tpl-case-item');

  renderCaseListItems(project, container, template, selectedId);
}

function renderCaseIslandList(project, root, selectedId) {
  const container = root.querySelector('[data-field="caseListMobile"]');
  const template = root.querySelector('#tpl-case-item');

  renderCaseListItems(project, container, template, selectedId, { isIsland: true });
}

function renderCasePanels(project, root) {
  const container = root.querySelector('[data-field="casePanels"]');
  const template = root.querySelector('#tpl-case-panel');

  if (!container || !template) return;

  container.innerHTML = '';

  project.cases.forEach((item) => {
    const node = template.content.cloneNode(true);
    const panel = node.querySelector('.case-panel');
    const index = node.querySelector('.case-panel__index');
    const title = node.querySelector('.case-panel__title');
    const problem = node.querySelector('.case-panel__problem');
    const solution = node.querySelector('.case-panel__solution');
    const keyPoint = node.querySelector('.case-panel__key-point');
    const implementation = node.querySelector('.case-panel__implementation');
    const steps = node.querySelector('.case-steps');

    if (panel) {
      panel.id = `case-panel-${item.id}`;
      panel.dataset.caseId = item.id;
    }

    if (index) {
      index.textContent = String(item.order).padStart(2, '0');
    }

    if (title) title.textContent = item.title || '';
    if (problem) problem.textContent = item.problem || '';
    if (solution) solution.textContent = item.solution || '';
    if (keyPoint) keyPoint.textContent = item.keyPoint || '';

    renderCaseImplementation(item.implementation, implementation);
    renderCaseSteps(item.steps, steps, root);

    container.appendChild(node);
  });
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

function setActiveCase(root, caseId, state) {
  if (!caseId) return;

  state.selectedCaseId = caseId;

  root.querySelectorAll('.case-item').forEach((button) => {
    const isActive = button.dataset.caseId === caseId;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  root.querySelectorAll('.case-panel').forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.caseId === caseId);
  });

  syncIslandFocus(root, caseId);
}

function getCaseScrollOffset() {
  if (window.innerWidth >= 1440) return 120;
  if (window.innerWidth >= 768) return 104;
  return 88;
}

function scrollToCase(caseId) {
  const panel = document.getElementById(`case-panel-${caseId}`);
  if (!panel) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const absoluteTop = panel.getBoundingClientRect().top + window.pageYOffset;
  const top = Math.max(absoluteTop - getCaseScrollOffset(), 0);

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });
}

function bindCaseEvents(root, state) {
  root.addEventListener('click', (event) => {
    const button = event.target.closest('.case-item');
    if (!button || !root.contains(button)) return;

    const caseId = button.dataset.caseId;
    if (!caseId) return;

    setActiveCase(root, caseId, state);
    scrollToCase(caseId);
  });
}

function initCaseScrollSync(root, state) {
  const section = root.querySelector('.project-cases');
  const nav = root.querySelector('.project-cases__nav-inner');
  const island = root.querySelector('[data-case-island]');
  const panels = gsap.utils.toArray('.case-panel', root);

  if (!section || !nav || !panels.length) return;

  const media = gsap.matchMedia();
  state.caseMatchMedia = media;

  media.add('(min-width: 768px)', () => {
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: () => `top top+=${getCaseScrollOffset()}`,
      end: () => `bottom bottom-=${32}`,
      pin: nav,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true
    });

    return () => {
      pinTrigger.kill();
    };
  });

  media.add('(max-width: 767px)', () => {
    if (!island) return undefined;

    const islandTrigger = ScrollTrigger.create({
      trigger: section,
      start: () => `top bottom-=${96}`,
      end: 'bottom bottom',
      onEnter: () => toggleCaseIsland(island, true),
      onEnterBack: () => toggleCaseIsland(island, true),
      onLeave: () => toggleCaseIsland(island, false),
      onLeaveBack: () => toggleCaseIsland(island, false)
    });

    return () => {
      toggleCaseIsland(island, false);
      islandTrigger.kill();
    };
  });

  panels.forEach((panel) => {
    const caseId = panel.dataset.caseId;
    if (!caseId) return;

    const trigger = ScrollTrigger.create({
      trigger: panel,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveCase(root, caseId, state),
      onEnterBack: () => setActiveCase(root, caseId, state)
    });

    state.caseTriggers.push(trigger);
  });

  const firstCaseId = panels[0]?.dataset.caseId;
  if (firstCaseId) {
    setActiveCase(root, firstCaseId, state);
  }
}

function renderProjectDetail(project, root, state) {
  renderMeta(project, root);
  renderHeroDescription(project, root);
  renderHeroTags(project, root);
  renderHeroVisuals(project, root);
  renderSummary(project, root);
  renderCaseList(project, root, state.selectedCaseId);
  renderCaseIslandList(project, root, state.selectedCaseId);
  renderCasePanels(project, root);
  renderHighlights(project, root);
  renderEtc(project, root);
}

function syncIslandFocus(root, caseId) {
  const track = root.querySelector('[data-field="caseListMobile"]');
  const islandButton = root.querySelector(`[data-field="caseListMobile"] .case-item[data-case-id="${caseId}"]`);
  if (!track || !islandButton) return;

  const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
  if (maxScrollLeft <= 0) return;

  const anchorRatio = 0.34;
  const targetCenter = islandButton.offsetLeft + (islandButton.offsetWidth / 2);
  const anchorPosition = track.clientWidth * anchorRatio;
  const nextScrollLeft = Math.min(
    Math.max(targetCenter - anchorPosition, 0),
    maxScrollLeft
  );

  track.scrollTo({
    left: nextScrollLeft,
    behavior: 'auto'
  });
}

function toggleCaseIsland(island, isVisible) {
  island.classList.toggle('is-visible', isVisible);
  island.setAttribute('aria-hidden', String(!isVisible));
}

export async function loadProjectDetail() {
  const root = document.querySelector('[data-page-root]');
  if (!root) return false;

  try {
    const rawProject = await fetchProjectData();
    const project = normalizeProject(rawProject);

    const state = {
      selectedCaseId: project.cases?.[0]?.id || '',
      caseTriggers: [],
      caseMatchMedia: null
    };

    renderProjectDetail(project, root, state);
    bindCaseEvents(root, state);
    initCaseScrollSync(root, state);

    return true;
  } catch (error) {
    console.error(error);
    root.innerHTML = '<p class="project-detail__error">Failed to load project data.</p>';
    return false;
  }
}
