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

const DEFAULT_FILTERS = { device: null, type: null };
const DEFAULT_SORT = 'featured';

const state = {
  projects: [],
  filtered: [],
  filters: { ...DEFAULT_FILTERS },
  sort: DEFAULT_SORT,
  elements: new Map()
};

let workPinObserver = null;
let cleanupWorkPinMediaQuery = null;
const mobilePinQuery = window.matchMedia('(max-width: 480px)');
let workMasonryResizeObserver = null;
let workMasonryFrame = null;

/* ========================================
   Utils
======================================== */
const normalize = (v = '') => String(v).trim().toLowerCase();

const getYear = (date = '') => (date.match(/\d{4}/)?.[0] || '');

const getMeta = (project) => {
  return [project.device, project.projectType, ...(project.keywords || [])].filter(Boolean);
};

const getBackThumbnail = (src = '') => src.replace(/(\.[^./?#]+)([?#].*)?$/, '-back$1$2');

/* START responsive card caption */
function syncCardCaptionPlacement(card) {
  const image = card.querySelector('.work-card__image');
  if (!image?.naturalWidth || !image?.naturalHeight) return;

  const ratio = image.naturalWidth / image.naturalHeight;
  const isPortrait = ratio < 0.82;

  card.classList.toggle('work-card--portrait', isPortrait);
}

function applyCardCaptionPlacement(listEl) {
  listEl.querySelectorAll('.work-card').forEach((card) => {
    const image = card.querySelector('.work-card__image');
    if (!image) return;

    if (image.complete) {
      syncCardCaptionPlacement(card);
      queueWorkMasonryLayout(listEl);
      return;
    }

    image.addEventListener('load', () => {
      syncCardCaptionPlacement(card);
      queueWorkMasonryLayout(listEl);
    }, { once: true });
  });
}
/* END responsive card caption */

/* START work card back thumbnail */
function applyCardBackThumbnails(listEl) {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;

  listEl.querySelectorAll('.work-card__image').forEach((image) => {
    const card = image.closest('.work-card');
    const frontSrc = image.getAttribute('src');
    if (!card || !frontSrc) return;

    const backSrc = getBackThumbnail(frontSrc);
    if (backSrc === frontSrc) return;

    const backImage = new Image();

    backImage.addEventListener('load', () => {
      let flipTween = null;

      const flipTo = (nextSrc) => {
        flipTween?.kill();

        flipTween = gsap.timeline({
          defaults: { duration: 0.1, ease: 'expo.out' }
        })
          .to(image, {
            autoAlpha: 0.72,
            scale: 0.992,
            onComplete: () => {
              image.src = nextSrc;
            }
          })
          .to(image, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.52,
            ease: 'expo.out',
            clearProps: 'opacity,visibility,transform'
          });
      };

      card.addEventListener('mouseenter', () => {
        flipTo(backSrc);
      });

      card.addEventListener('mouseleave', () => {
        flipTo(frontSrc);
      });
    }, { once: true });

    backImage.src = backSrc;
  });
}
/* END work card back thumbnail */

/* START work pin position */
function syncWorkPinPosition(card) {
  const image = card.querySelector('.work-card__image');
  if (!image) return;

  const cardRect = card.getBoundingClientRect();
  const imageRect = image.getBoundingClientRect();
  const pinX = imageRect.left - cardRect.left + imageRect.width * 0.58;
  const pinY = imageRect.top - cardRect.top - 28;

  card.style.setProperty('--work-pin-left', `${Math.round(pinX)}px`);
  card.style.setProperty('--work-pin-top', `${Math.round(pinY)}px`);
}

function applyWorkPinPositions(listEl) {
  listEl.querySelectorAll('.work-card').forEach((card) => {
    const image = card.querySelector('.work-card__image');
    if (!image) return;

    if (image.complete) {
      syncWorkPinPosition(card);
      return;
    }

    image.addEventListener('load', () => syncWorkPinPosition(card), { once: true });
  });
}

function refreshWorkPinPositions() {
  const listEl = document.querySelector(SELECTOR.list);
  if (!listEl) return;

  queueWorkMasonryLayout(listEl);
}
/* END work pin position */

/* START masonry layout */
function getListGap(listEl) {
  const styles = window.getComputedStyle(listEl);
  const columnGap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
  const rowGap = Number.parseFloat(styles.rowGap || styles.gap) || columnGap;

  return { columnGap, rowGap };
}

function getVisibleItems(listEl) {
  return [...listEl.querySelectorAll('.work-page__item')]
    .filter((item) => item.style.display !== 'none' && item.getAttribute('aria-hidden') !== 'true');
}

function layoutWorkMasonry(listEl) {
  const items = getVisibleItems(listEl);

  if (!items.length) {
    listEl.style.height = '';
    return;
  }

  const { columnGap, rowGap } = getListGap(listEl);
  const listWidth = listEl.clientWidth;
  const placed = [];

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemWidth = Math.min(rect.width, listWidth);
    const itemHeight = rect.height;
    const candidates = [0, ...placed.map((entry) => entry.x + entry.width + columnGap)]
      .filter((x) => x + itemWidth <= listWidth + 1);
    const target = candidates
      .map((x) => {
        const y = placed
          .filter((entry) => x < entry.x + entry.width + columnGap && x + itemWidth + columnGap > entry.x)
          .reduce((bottom, entry) => Math.max(bottom, entry.y + entry.height + rowGap), 0);

        return { x, y };
      })
      .sort((a, b) => a.y - b.y || a.x - b.x)[0] || { x: 0, y: 0 };

    item.style.transform = `translate(${Math.round(target.x)}px, ${Math.round(target.y)}px)`;
    item.classList.add('is-masonry-ready');
    placed.push({
      x: target.x,
      y: target.y,
      width: itemWidth,
      height: itemHeight,
    });
  });

  const height = Math.max(...placed.map((entry) => entry.y + entry.height));
  listEl.style.height = `${Math.max(0, Math.ceil(height))}px`;
  applyWorkPinPositions(listEl);
}

function queueWorkMasonryLayout(listEl = document.querySelector(SELECTOR.list)) {
  if (!listEl) return;

  window.cancelAnimationFrame(workMasonryFrame);
  workMasonryFrame = window.requestAnimationFrame(() => {
    layoutWorkMasonry(listEl);
  });
}

function observeWorkMasonry(listEl) {
  workMasonryResizeObserver?.disconnect();

  if (!listEl || !window.ResizeObserver) return;

  workMasonryResizeObserver = new ResizeObserver(() => queueWorkMasonryLayout(listEl));
  workMasonryResizeObserver.observe(listEl);
  getVisibleItems(listEl).forEach((item) => workMasonryResizeObserver.observe(item));
}
/* END masonry layout */

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

function resetControls() {
  state.filtered = [];
  state.filters = { ...DEFAULT_FILTERS };
  state.sort = DEFAULT_SORT;
  state.elements.clear();

  document.querySelectorAll(SELECTOR.filterBtn).forEach((btn) => {
    btn.setAttribute('aria-pressed', 'false');
  });

  const sortEl = document.querySelector(SELECTOR.sort);
  if (sortEl) {
    sortEl.value = DEFAULT_SORT;
  }
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

  applyCardCaptionPlacement(listEl);
  applyCardBackThumbnails(listEl);
  queueWorkMasonryLayout(listEl);
  observeWorkMasonry(listEl);
  updateCount(list.length);
  toggleEmptyState(!list.length);
  initInteractiveTone();
}

function updateList(list = []) {
  const listEl = document.querySelector(SELECTOR.list);
  if (!listEl) return;

  const hasCurrentCards = Boolean(listEl.querySelector('.work-page__item'));

  if (!state.elements.size || !hasCurrentCards) {
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

  applyCardCaptionPlacement(listEl);
  layoutWorkMasonry(listEl);
  observeWorkMasonry(listEl);
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
    }),
    onComplete: () => queueWorkMasonryLayout(listEl)
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

  cleanupWorkPinMediaQuery?.();
  cleanupWorkPinMediaQuery = null;

  const cards = document.querySelectorAll('.work-card');
  if (!cards.length) return;

  const visibleCards = new Set();

  function syncActivePin() {
    cards.forEach((card) => card.classList.remove('is-active'));

    if (!mobilePinQuery.matches) {
      visibleCards.clear();
      return;
    }

    const firstVisibleCard = [...cards].find((card) => visibleCards.has(card));
    firstVisibleCard?.classList.add('is-active');
  }

  workPinObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleCards.add(entry.target);
      } else {
        visibleCards.delete(entry.target);
      }
    });

    syncActivePin();
  }, {
    threshold: 0.55
  });

  cards.forEach((card) => workPinObserver.observe(card));

  mobilePinQuery.addEventListener('change', syncActivePin);
  cleanupWorkPinMediaQuery = () => mobilePinQuery.removeEventListener('change', syncActivePin);
  syncActivePin();
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
  resetControls();

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

  window.removeEventListener('resize', refreshWorkPinPositions);
  window.addEventListener('resize', refreshWorkPinPositions);


  return true;
}
