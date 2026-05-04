/* ========================================
   Work Card List
======================================== */

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import Flip from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/Flip/+esm";
import { initInteractiveTone } from '../global/hoverTone.js';

gsap.registerPlugin(Flip);

/* ========================================
   Selector / State
======================================== */
const SELECTOR = {
  list: '#work-list',
  count: '.work-page__count',
  sort: '#work-sort',
  filterBtn: '.work-page__filter-btn',
  empty: '.work-page__empty'
};

const state = {
  projects: [],
  filtered: [],
  filters: { device: null, type: null },
  sort: 'featured',
  elements: new Map()
};

let workPinObserver = null;

/* ========================================
   Utils
======================================== */
const normalize = (v = '') => String(v).trim().toLowerCase();

const getYear = (date = '') => (date.match(/\d{4}/)?.[0] || '');

const getMeta = (project) => {
  return [project.device, project.projectType, ...(project.keywords || [])].filter(Boolean);
};

/* ========================================
   Filter / Sort
======================================== */
function applyState() {
  let list = [...state.projects];

  list = list.filter((project) => {
    const device = state.filters.device;
    const type = state.filters.type;

    return (!device || project._device === device) && (!type || project._type === type);
  });

  if (state.sort === 'name') {
    list.sort((a, b) => a._title.localeCompare(b._title));
  } else if (state.sort === 'featured') {
    list.sort((a, b) => a._featuredOrder - b._featuredOrder);
  } else {
    list.sort((a, b) => b.date.localeCompare(a.date));
  }

  state.filtered = list;
  syncFilterButtons();
  updateList(list);
}

function syncFilterButtons() {
  document.querySelectorAll(SELECTOR.filterBtn).forEach((btn) => {
    const group = btn.dataset.filterGroup;
    const value = normalize(btn.dataset.filterValue);
    const isActive = state.filters[group] === value;

    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

/* ========================================
   Render
======================================== */
function render(list = []) {
  const listEl = document.querySelector(SELECTOR.list);
  if (!listEl) return;

  const cardsMarkup = list.map((project) => cardMarkup(project)).join('');
  listEl.innerHTML = `${cardsMarkup}<li class="work-page__empty" hidden>No projects</li>`;

  state.elements.clear();
  listEl.querySelectorAll('.work-page__item').forEach((item) => {
    state.elements.set(item.dataset.projectId, item);
  });

  updateCount(list.length);
  toggleEmptyState(!list.length);
  initInteractiveTone();
}

function updateList(list = []) {
  const listEl = document.querySelector(SELECTOR.list);
  if (!listEl) return;

  if (!state.elements.size) {
    render(list);
    return;
  }

  const cards = state.projects
    .map((project) => state.elements.get(project.id))
    .filter(Boolean);
  const nextIds = new Set(list.map((project) => project.id));
  const flipState = Flip.getState(cards);

  list.forEach((project) => {
    const card = state.elements.get(project.id);
    if (card) {
      listEl.appendChild(card);
    }
  });

  cards.forEach((card) => {
    const isVisible = nextIds.has(card.dataset.projectId);
    card.style.display = isVisible ? '' : 'none';
    card.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
  });

  updateCount(list.length);
  toggleEmptyState(!list.length);

  Flip.from(flipState, {
    duration: 0.72,
    ease: 'power2.inOut',
    absolute: true,
    scale: true,
    stagger: 0.045,
    prune: true,
    onEnter: (elements) => gsap.fromTo(
      elements,
      { autoAlpha: 0, scale: 0.88, filter: 'blur(16px)' },
      {
        autoAlpha: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.62,
        ease: 'power2.out',
        clearProps: 'filter'
      }
    ),
    onLeave: (elements) => gsap.to(elements, {
      autoAlpha: 0,
      scale: 0.88,
      filter: 'blur(16px)',
      duration: 0.42,
      ease: 'power2.in'
    })
  });
}

function updateCount(count) {
  const countEl = document.querySelector(SELECTOR.count);
  if (countEl) {
    countEl.textContent = count;
  }
}

function toggleEmptyState(isEmpty) {
  const emptyEl = document.querySelector(SELECTOR.empty);
  if (!emptyEl) return;

  emptyEl.hidden = !isEmpty;
}

function initMobileWorkPinObserver() {
  if (workPinObserver) {
    workPinObserver.disconnect();
    workPinObserver = null;
  }

  const cards = document.querySelectorAll('.work-card');
  if (!cards.length) return;

  workPinObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, {
    threshold: 0.55
  });

  cards.forEach((card) => workPinObserver.observe(card));
}

function cardMarkup(project) {
  const title = project.title;
  const year = project._year;
  const thumb = project.thumbnail;
  const detailHref = `./project-detail.html?slug=${project.slug || project.id}`;
  const previewAlt = `${title} preview`;

  return `
    <li class="work-page__item" data-project-id="${project.id}">
      <article class="work-card">
        <a href="${detailHref}" class="work-card__link">
          <img class="work-card__image" src="${thumb}" alt="${previewAlt}" loading="lazy">
          <div class="work-card__body">
            <h3 class="work-card__title">${title}</h3>
            <p class="work-card__year">${year}</p>
            <ul class="work-card__meta">
              ${getMeta(project).map((meta) => `<li>${meta}</li>`).join('')}
            </ul>
          </div>
        </a>
      </article>
    </li>
  `;
}

/* ========================================
   Event
======================================== */
function bindEvents() {
  document.querySelectorAll(SELECTOR.filterBtn).forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.filterGroup;
      const value = normalize(btn.dataset.filterValue);

      state.filters[group] = state.filters[group] === value ? null : value;
      applyState();
    });
  });

  document.querySelector(SELECTOR.sort)?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    applyState();
  });
}

/* ========================================
   Init
======================================== */
export async function loadWorkCardList() {
  const response = await fetch('./data/projects-index.json');
  const data = await response.json();
  const projects = Array.isArray(data) ? data : data?.projects;

  if (!Array.isArray(projects)) {
    throw new TypeError('projects-index.json must contain a projects array.');
  }

  state.projects = projects
    .map((project) => ({
      ...project,
      _title: project.title,
      _year: getYear(project.date),
      _device: normalize(project.device),
      _type: normalize(project.projectType),
      _featuredOrder: project.featuredOrder ?? 999
    }));

  bindEvents();
  applyState({ animate: false });
  initMobileWorkPinObserver();


  return true;
}
