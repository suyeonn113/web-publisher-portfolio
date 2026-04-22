/* ========================================
   Work Card List
======================================== */

import { initInteractiveTone } from '../global/hoverTone.js';

/* ========================================
   Selector / State
======================================== */
const SELECTOR = {
  list: '#work-list',
  count: '.work-page__count',
  sort: '#work-sort',
  filterBtn: '.work-page__filter-btn'
};

const state = {
  projects: [],
  filtered: [],
  filters: { device: null, type: null },
  sort: 'latest'
};

/* ========================================
   Utils
======================================== */
const normalize = (v = '') => String(v).trim().toLowerCase();

const getYear = (date = '') => (date.match(/\d{4}/)?.[0] || '');

const getMeta = (p) => {
  const spec = p?.preview?.spec || {};
  return [spec.device, spec.projectType, ...(spec.keywords || [])].filter(Boolean);
};

/* ========================================
   Filter / Sort
======================================== */
function applyState() {
  let list = [...state.projects];

  // filter
  list = list.filter(p => {
    const d = state.filters.device;
    const t = state.filters.type;
    return (!d || p._device === d) && (!t || p._type === t);
  });

  // sort
  if (state.sort === 'name') {
    list.sort((a, b) => a._title.localeCompare(b._title));
  } else if (state.sort === 'featured') {
    list.sort((a, b) => a._featuredOrder - b._featuredOrder);
  } else {
    list.sort((a, b) => b.Common.date.localeCompare(a.Common.date));
  }

  state.filtered = list;
  syncFilterButtons();
  render(list);
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
  const el = document.querySelector(SELECTOR.list);
  if (!el) return;

  el.innerHTML = list.length
    ? list.map(cardMarkup).join('')
    : `<li class="work-page__empty">No projects</li>`;

  document.querySelector(SELECTOR.count).textContent = list.length;

  initInteractiveTone();
}

function cardMarkup(p) {
  const title = p.Common.title;
  const year = p._year;
  const thumb = p.preview.thumbnail;

  return `
    <li class="work-page__item">
      <article class="work-card">
        <a href="./work-detail.html?project=${p.slug || p.id}" class="work-card__link">
          <img src="${thumb}" alt="${title} 미리보기" loading="lazy">
          
          <div class="work-card__body">
            <h3 class="work-card__title">${title}</h3>
            <p class="work-card__year">${year}</p>

            <ul class="work-card__meta">
              ${getMeta(p).map(m => `<li>${m}</li>`).join('')}
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
  // filter
  document.querySelectorAll(SELECTOR.filterBtn).forEach(btn => {
    btn.addEventListener('click', () => {
      const g = btn.dataset.filterGroup;
      const v = normalize(btn.dataset.filterValue);

      state.filters[g] = state.filters[g] === v ? null : v;
      applyState();
    });
  });

  // sort
  document.querySelector(SELECTOR.sort)?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    applyState();
  });
}

/* ========================================
   Init
======================================== */
export async function loadWorkCardList() {
  const res = await fetch('./data/projects.json');
  const data = await res.json();

  // 최소 정규화
  state.projects = data
    .filter(p => p?.Common && p?.preview)
    .map(p => ({
      ...p,
      _title: p.Common.title,
      _year: getYear(p.Common.date),
      _device: normalize(p.preview.spec?.device),
      _type: normalize(p.preview.spec?.projectType),
      _featuredOrder: p.preview.featuredOrder ?? 999
    }));

  bindEvents();
  applyState();

  return true;
}
