const deviceIcons = {
  Mobile: 'smartphone',
  Tablet: 'tablet',
  PC: 'monitor',
  Responsive: 'monitor-check',
  Desktop: 'monitor',
};

const typeIcons = {
  'E-commerce': 'shopping-bag',
  Commercial: 'briefcase',
  Public: 'landmark',
  Brand: 'award',
  Promotion: 'megaphone',
  Personal: 'user',
  Editorial: 'book-open',
};

function createSvgIds(rawId, index) {
  const seed = String(rawId || `project-${index}`)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-');

  return {
    backMask: `${seed}-folder-back-mask`,
    backRadial: `${seed}-folder-back-radial`,
    backStrokePrimary: `${seed}-folder-back-stroke-primary`,
    backStrokeSecondary: `${seed}-folder-back-stroke-secondary`,
    frontRadial: `${seed}-folder-front-radial`,
    frontStroke: `${seed}-folder-front-stroke`,
    hoverRadial: `${seed}-folder-hover-radial`,
    hoverOverlay: `${seed}-folder-hover-overlay`,
    hoverStroke: `${seed}-folder-hover-stroke`,
  };
}

function renderFolderBackSvg(ids) {
  return `
    <svg viewBox="0 0 413 373" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="${ids.backMask}" fill="white">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M66.5763 0C29.8072 0 0 29.8072 0 66.5763V145.522V153.369V266.478C0 303.764 0 322.407 7.25639 336.649C13.6393 349.176 23.8242 359.361 36.3513 365.744C50.5928 373 69.2359 373 106.522 373H306.478C343.764 373 362.407 373 376.649 365.744C389.176 359.361 399.361 349.176 405.744 336.649C413 322.407 413 303.764 413 266.478V145.522C413 108.236 413 89.5928 405.744 75.3513C399.361 62.8242 389.176 52.6393 376.649 46.2564C362.407 39 343.764 39 306.478 39H261.793C227.43 39 194.417 0 160.054 0H66.5763Z"/>
      </mask>
      <path class="folder-svg__back-base" fill-rule="evenodd" clip-rule="evenodd" d="M66.5763 0C29.8072 0 0 29.8072 0 66.5763V145.522V153.369V266.478C0 303.764 0 322.407 7.25639 336.649C13.6393 349.176 23.8242 359.361 36.3513 365.744C50.5928 373 69.2359 373 106.522 373H306.478C343.764 373 362.407 373 376.649 365.744C389.176 359.361 399.361 349.176 405.744 336.649C413 322.407 413 303.764 413 266.478V145.522C413 108.236 413 89.5928 405.744 75.3513C399.361 62.8242 389.176 52.6393 376.649 46.2564C362.407 39 343.764 39 306.478 39H261.793C227.43 39 194.417 0 160.054 0H66.5763Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M66.5763 0C29.8072 0 0 29.8072 0 66.5763V145.522V153.369V266.478C0 303.764 0 322.407 7.25639 336.649C13.6393 349.176 23.8242 359.361 36.3513 365.744C50.5928 373 69.2359 373 106.522 373H306.478C343.764 373 362.407 373 376.649 365.744C389.176 359.361 399.361 349.176 405.744 336.649C413 322.407 413 303.764 413 266.478V145.522C413 108.236 413 89.5928 405.744 75.3513C399.361 62.8242 389.176 52.6393 376.649 46.2564C362.407 39 343.764 39 306.478 39H261.793C227.43 39 194.417 0 160.054 0H66.5763Z" fill="url(#${ids.backRadial})"/>
      <path d="M7.25639 336.649L9.62918 335.44L9.62918 335.44L7.25639 336.649ZM36.3513 365.744L35.1423 368.116H35.1423L36.3513 365.744ZM376.649 365.744L377.858 368.116V368.116L376.649 365.744ZM405.744 336.649L408.116 337.858V337.858L405.744 336.649ZM405.744 75.3513L408.116 74.1423V74.1423L405.744 75.3513ZM376.649 46.2564L375.44 48.6292H375.44L376.649 46.2564ZM2.66305 66.5763C2.66305 31.278 31.278 2.66305 66.5763 2.66305V-2.66305C28.3365 -2.66305 -2.66305 28.3365 -2.66305 66.5763H2.66305ZM2.66305 145.522V66.5763H-2.66305V145.522H2.66305ZM2.66305 153.369V145.522H-2.66305V153.369H2.66305ZM2.66305 266.478V153.369H-2.66305V266.478H2.66305ZM9.62918 335.44C6.22416 328.757 4.45485 320.925 3.56126 309.988C2.66512 299.02 2.66305 285.165 2.66305 266.478H-2.66305C-2.66305 285.077 -2.66512 299.187 -1.74716 310.422C-0.826657 321.688 1.03223 330.299 4.88359 337.858L9.62918 335.44ZM37.5603 363.371C25.5343 357.243 15.7568 347.466 9.62918 335.44L4.88359 337.858C11.5218 350.886 22.1141 361.478 35.1423 368.116L37.5603 363.371ZM106.522 370.337C87.8351 370.337 73.9799 370.335 63.0118 369.439C52.0747 368.545 44.243 366.776 37.5603 363.371L35.1423 368.116C42.701 371.968 51.3116 373.827 62.5781 374.747C73.8134 375.665 87.923 375.663 106.522 375.663V370.337ZM306.478 370.337H106.522V375.663H306.478V370.337ZM375.44 363.371C368.757 366.776 360.925 368.545 349.988 369.439C339.02 370.335 325.165 370.337 306.478 370.337V375.663C325.077 375.663 339.187 375.665 350.422 374.747C361.688 373.827 370.299 371.968 377.858 368.116L375.44 363.371ZM403.371 335.44C397.243 347.466 387.466 357.243 375.44 363.371L377.858 368.116C390.886 361.478 401.478 350.886 408.116 337.858L403.371 335.44ZM410.337 266.478C410.337 285.165 410.335 299.02 409.439 309.988C408.545 320.925 406.776 328.757 403.371 335.44L408.116 337.858C411.968 330.299 413.827 321.688 414.747 310.422C415.665 299.187 415.663 285.077 415.663 266.478H410.337ZM410.337 145.522V266.478H415.663V145.522H410.337ZM403.371 76.5603C406.776 83.243 408.545 91.0747 409.439 102.012C410.335 112.98 410.337 126.835 410.337 145.522H415.663C415.663 126.923 415.665 112.813 414.747 101.578C413.827 90.3116 411.968 81.701 408.116 74.1423L403.371 76.5603ZM375.44 48.6292C387.466 54.7568 397.243 64.5342 403.371 76.5603L408.116 74.1423C401.478 61.1141 390.886 50.5218 377.858 43.8836L375.44 48.6292ZM306.478 41.6631C325.165 41.6631 339.02 41.6651 349.988 42.5613C360.925 43.4548 368.757 45.2242 375.44 48.6292L377.858 43.8836C370.299 40.0322 361.688 38.1733 350.422 37.2528C339.187 36.3349 325.077 36.3369 306.478 36.3369V41.6631ZM261.793 41.6631H306.478V36.3369H261.793V41.6631ZM66.5763 2.66305H160.054V-2.66305H66.5763V2.66305ZM261.793 36.3369C245.468 36.3369 229.282 27.0498 212.258 17.1952C195.594 7.54976 178.092 -2.66305 160.054 -2.66305V2.66305C176.379 2.66305 192.565 11.9502 209.589 21.8048C226.253 31.4502 243.754 41.6631 261.793 41.6631V36.3369Z" fill="url(#${ids.backStrokePrimary})" mask="url(#${ids.backMask})"/>
      <path d="M7.25639 336.649L9.62918 335.44L9.62918 335.44L7.25639 336.649ZM36.3513 365.744L35.1423 368.116H35.1423L36.3513 365.744ZM376.649 365.744L377.858 368.116V368.116L376.649 365.744ZM405.744 336.649L408.116 337.858V337.858L405.744 336.649ZM405.744 75.3513L408.116 74.1423V74.1423L405.744 75.3513ZM376.649 46.2564L375.44 48.6292H375.44L376.649 46.2564ZM2.66305 66.5763C2.66305 31.278 31.278 2.66305 66.5763 2.66305V-2.66305C28.3365 -2.66305 -2.66305 28.3365 -2.66305 66.5763H2.66305ZM2.66305 145.522V66.5763H-2.66305V145.522H2.66305ZM2.66305 153.369V145.522H-2.66305V153.369H2.66305ZM2.66305 266.478V153.369H-2.66305V266.478H2.66305ZM9.62918 335.44C6.22416 328.757 4.45485 320.925 3.56126 309.988C2.66512 299.02 2.66305 285.165 2.66305 266.478H-2.66305C-2.66305 285.077 -2.66512 299.187 -1.74716 310.422C-0.826657 321.688 1.03223 330.299 4.88359 337.858L9.62918 335.44ZM37.5603 363.371C25.5343 357.243 15.7568 347.466 9.62918 335.44L4.88359 337.858C11.5218 350.886 22.1141 361.478 35.1423 368.116L37.5603 363.371ZM106.522 370.337C87.8351 370.337 73.9799 370.335 63.0118 369.439C52.0747 368.545 44.243 366.776 37.5603 363.371L35.1423 368.116C42.701 371.968 51.3116 373.827 62.5781 374.747C73.8134 375.665 87.923 375.663 106.522 375.663V370.337ZM306.478 370.337H106.522V375.663H306.478V370.337ZM375.44 363.371C368.757 366.776 360.925 368.545 349.988 369.439C339.02 370.335 325.165 370.337 306.478 370.337V375.663C325.077 375.663 339.187 375.665 350.422 374.747C361.688 373.827 370.299 371.968 377.858 368.116L375.44 363.371ZM403.371 335.44C397.243 347.466 387.466 357.243 375.44 363.371L377.858 368.116C390.886 361.478 401.478 350.886 408.116 337.858L403.371 335.44ZM410.337 266.478C410.337 285.165 410.335 299.02 409.439 309.988C408.545 320.925 406.776 328.757 403.371 335.44L408.116 337.858C411.968 330.299 413.827 321.688 414.747 310.422C415.665 299.187 415.663 285.077 415.663 266.478H410.337ZM410.337 145.522V266.478H415.663V145.522H410.337ZM403.371 76.5603C406.776 83.243 408.545 91.0747 409.439 102.012C410.335 112.98 410.337 126.835 410.337 145.522H415.663C415.663 126.923 415.665 112.813 414.747 101.578C413.827 90.3116 411.968 81.701 408.116 74.1423L403.371 76.5603ZM375.44 48.6292C387.466 54.7568 397.243 64.5342 403.371 76.5603L408.116 74.1423C401.478 61.1141 390.886 50.5218 377.858 43.8836L375.44 48.6292ZM306.478 41.6631C325.165 41.6631 339.02 41.6651 349.988 42.5613C360.925 43.4548 368.757 45.2242 375.44 48.6292L377.858 43.8836C370.299 40.0322 361.688 38.1733 350.422 37.2528C339.187 36.3349 325.077 36.3369 306.478 36.3369V41.6631ZM261.793 41.6631H306.478V36.3369H261.793V41.6631ZM66.5763 2.66305H160.054V-2.66305H66.5763V2.66305ZM261.793 36.3369C245.468 36.3369 229.282 27.0498 212.258 17.1952C195.594 7.54976 178.092 -2.66305 160.054 -2.66305V2.66305C176.379 2.66305 192.565 11.9502 209.589 21.8048C226.253 31.4502 243.754 41.6631 261.793 41.6631V36.3369Z" fill="url(#${ids.backStrokeSecondary})" mask="url(#${ids.backMask})"/>
      <defs>
        <radialGradient id="${ids.backRadial}" cx="0" cy="0" r="1" gradientTransform="matrix(-399.677 -386.29 427.241 -412.931 413 373.414)" gradientUnits="userSpaceOnUse">
          <stop class="folder-svg__back-radial-stop-end"/>
          <stop offset="1" class="folder-svg__back-radial-stop-start"/>
        </radialGradient>
        <linearGradient id="${ids.backStrokePrimary}" x1="0" y1="0" x2="399.156" y2="406.328" gradientUnits="userSpaceOnUse">
          <stop offset="0.508799" class="folder-svg__back-stroke-primary-start"/>
          <stop offset="1" class="folder-svg__back-stroke-primary-end"/>
        </linearGradient>
        <linearGradient id="${ids.backStrokeSecondary}" x1="0" y1="0" x2="461.525" y2="318.701" gradientUnits="userSpaceOnUse">
          <stop offset="0.228092" class="folder-svg__back-stroke-secondary-start"/>
          <stop offset="0.99027" class="folder-svg__back-stroke-secondary-end"/>
        </linearGradient>
      </defs>
    </svg>
  `;
}

function renderFolderFrontSvg(ids) {
  return `
    <svg class="svg-default" aria-hidden="true" focusable="false"
         viewBox="0 0 413 373" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.00116616 200C0.00116616 162.663 -0.259206 143.261 7.00117 129C13.3876 116.456 23.4671 106.392 36.0012 100C50.2505 92.7338 69.6944 93 107.001 93H306.001C343.308 93 362.752 92.7338 377.001 100C389.535 106.392 399.615 116.456 406.001 129C413.262 143.261 413.001 162.663 413.001 200V266C413.001 303.337 413.262 322.739 406.001 337C399.615 349.544 389.535 359.608 377.001 366C362.752 373.266 343.308 373 306.001 373H107.001C69.6944 373 50.2505 373.266 36.0012 366C23.4671 359.608 13.3876 349.544 7.00117 337C-0.259206 322.739 0.00116616 303.337 0.00116616 266V200Z" fill="url(#${ids.frontRadial})"/>
      <path d="M107.001 94.3318H306.001C324.681 94.3318 338.806 94.2662 350.049 95.1032C361.281 95.9395 369.501 97.6699 376.396 101.186C388.681 107.451 398.556 117.312 404.814 129.604C408.328 136.506 410.059 144.719 410.896 155.945C411.733 167.183 411.67 181.305 411.67 200V266C411.67 284.694 411.733 298.816 410.896 310.054C410.059 321.281 408.328 329.494 404.814 336.396C398.556 348.689 388.681 358.55 376.396 364.814C369.501 368.331 361.281 370.061 350.049 370.897C338.806 371.734 324.681 371.669 306.001 371.669H107.001C88.3213 371.669 74.1963 371.734 62.9531 370.897C51.7216 370.061 43.502 368.33 36.6064 364.814C24.3221 358.55 14.4459 348.689 8.1875 336.396C4.67356 329.494 2.94339 321.281 2.10645 310.054C1.26865 298.816 1.33301 284.694 1.33301 266V200C1.33301 181.305 1.26864 167.183 2.10645 155.945C2.94339 144.719 4.67367 136.506 8.1875 129.604C14.4459 117.312 24.3221 107.451 36.6064 101.186C43.502 97.67 51.7215 95.9395 62.9531 95.1032C74.1963 94.2662 88.3213 94.3318 107.001 94.3318Z" stroke="url(#${ids.frontStroke})" stroke-width="2.66305"/>
      <defs>
        <radialGradient id="${ids.frontRadial}" cx="0" cy="0" r="1" gradientTransform="matrix(-413.002 -280.002 413.002 -467.157 413.002 373.001)" gradientUnits="userSpaceOnUse">
          <stop class="folder-svg__front-radial-stop-end"/>
          <stop offset="1" class="folder-svg__front-radial-stop-start"/>
          <stop offset="1" class="folder-svg__front-radial-stop-start"/>
        </radialGradient>
        <linearGradient id="${ids.frontStroke}" x1="0" y1="92.9987" x2="368.817" y2="432.647" gradientUnits="userSpaceOnUse">
          <stop offset="0.228092" class="folder-svg__front-stroke-start"/>
          <stop offset="0.946844" class="folder-svg__front-stroke-end"/>
        </linearGradient>
      </defs>
    </svg>
  `;
}

function renderFolderHoverSvg(ids) {
  return `
    <svg class="svg-hover" aria-hidden="true" focusable="false"
         viewBox="0 0 413 373" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.00116616 200C0.00116616 162.663 -0.259206 143.261 7.00117 129C13.3876 116.456 23.4671 106.392 36.0012 100C50.2505 92.7338 69.6944 93 107.001 93H306.001C343.308 93 362.752 92.7338 377.001 100C389.535 106.392 399.615 116.456 406.001 129C413.262 143.261 413.001 162.663 413.001 200V266C413.001 303.337 413.262 322.739 406.001 337C399.615 349.544 389.535 359.608 377.001 366C362.752 373.266 343.308 373 306.001 373H107.001C69.6944 373 50.2505 373.266 36.0012 366C23.4671 359.608 13.3876 349.544 7.00117 337C-0.259206 322.739 0.00116616 303.337 0.00116616 266V200Z" fill="url(#${ids.hoverRadial})"/>
      <path d="M0.00116616 200C0.00116616 162.663 -0.259206 143.261 7.00117 129C13.3876 116.456 23.4671 106.392 36.0012 100C50.2505 92.7338 69.6944 93 107.001 93H306.001C343.308 93 362.752 92.7338 377.001 100C389.535 106.392 399.615 116.456 406.001 129C413.262 143.261 413.001 162.663 413.001 200V266C413.001 303.337 413.262 322.739 406.001 337C399.615 349.544 389.535 359.608 377.001 366C362.752 373.266 343.308 373 306.001 373H107.001C69.6944 373 50.2505 373.266 36.0012 366C23.4671 359.608 13.3876 349.544 7.00117 337C-0.259206 322.739 0.00116616 303.337 0.00116616 266V200Z" fill="url(#${ids.hoverOverlay})"/>
      <path d="M107.001 94.3318H306.001C324.681 94.3318 338.806 94.2662 350.049 95.1032C361.281 95.9395 369.501 97.6699 376.396 101.186C388.681 107.451 398.556 117.312 404.814 129.604C408.328 136.506 410.059 144.719 410.896 155.945C411.733 167.183 411.67 181.305 411.67 200V266C411.67 284.694 411.733 298.816 410.896 310.054C410.059 321.281 408.328 329.494 404.814 336.396C398.556 348.689 388.681 358.55 376.396 364.814C369.501 368.331 361.281 370.061 350.049 370.897C338.806 371.734 324.681 371.669 306.001 371.669H107.001C88.3213 371.669 74.1963 371.734 62.9531 370.897C51.7216 370.061 43.502 368.33 36.6064 364.814C24.3221 358.55 14.4459 348.689 8.1875 336.396C4.67356 329.494 2.94339 321.281 2.10645 310.054C1.26865 298.816 1.33301 284.694 1.33301 266V200C1.33301 181.305 1.26864 167.183 2.10645 155.945C2.94339 144.719 4.67367 136.506 8.1875 129.604C14.4459 117.312 24.3221 107.451 36.6064 101.186C43.502 97.67 51.7215 95.9395 62.9531 95.1032C74.1963 94.2662 88.3213 94.3318 107.001 94.3318Z" stroke="url(#${ids.hoverStroke})" stroke-opacity="0.8" stroke-width="2.66066"/>
      <defs>
        <radialGradient id="${ids.hoverRadial}" cx="0" cy="0" r="1" gradientTransform="matrix(-413.002 -280.002 413.002 -467.157 413.002 373.001)" gradientUnits="userSpaceOnUse">
          <stop class="folder-svg__hover-radial-stop-end"/>
          <stop offset="1" class="folder-svg__hover-radial-stop-start"/>
        </radialGradient>
        <linearGradient id="${ids.hoverOverlay}" x1="206.5" y1="93" x2="206.5" y2="373" gradientUnits="userSpaceOnUse">
          <stop class="folder-svg__hover-overlay-stop-top"/>
          <stop offset="0.0001" class="folder-svg__hover-overlay-stop-mid"/>
          <stop offset="1" class="folder-svg__hover-overlay-stop-bottom"/>
        </linearGradient>
        <linearGradient id="${ids.hoverStroke}" x1="206.5" y1="93" x2="206.5" y2="373" gradientUnits="userSpaceOnUse">
          <stop class="folder-svg__hover-stroke-stop-top"/>
          <stop offset="1" class="folder-svg__hover-stroke-stop-bottom"/>
        </linearGradient>
      </defs>
    </svg>
  `;
}

function renderTechStackIcons(techStack = []) {
  return techStack
    .map((tool) => {
      const fileName = tool.toLowerCase().replace(/\s+/g, '');
      const iconPath = `./assets/icons/tech/${fileName}.svg`;

      return `
        <li class="folder__tech-item">
          <span class="tech-icon is-${fileName}"
            style="-webkit-mask-image: url('${iconPath}'); mask-image: url('${iconPath}');"
            aria-label="${tool}"
            role="img"
            title="${tool}">
          </span>
        </li>
      `;
    })
    .join('');
}

export async function loadProjects() {
  try {
    const response = await fetch('./data/projects.json');
    const data = await response.json();
    const wrapper = document.querySelector('.work__cards-wrapper');

    if (!wrapper) return false;

    const folderHTML = data
      .filter((project) => !project.DATA_MASTER_GUIDE)
      .map((project, index) => {
        const id = project.id || '';
        const common = project.Common || {};
        const preview = project.preview || {};
        const spec = preview.spec || {};
        const svgIds = createSvgIds(id, index);

        const dIcon = deviceIcons[spec.device] || 'monitor';
        const tIcon = typeIcons[spec.projectType] || 'briefcase';
        const filterClass = (preview.filterTags || [])
          .map((tag) => tag.trim().toLowerCase())
          .join(' ');

        return `
          <article class="work__card is-folder ${filterClass}">
            <a href="#" class="work-card__inner" aria-label="${common.title} 상세 보기">
              <div class="folder__back" aria-hidden="true" focusable="false">
                ${renderFolderBackSvg(svgIds)}
              </div>

              <figure class="folder__img-box">
                <img src="${preview.thumbnail || ''}" alt="" loading="lazy">
                <div class="folder__overlay"></div>
              </figure>

              <div class="folder__front-container">
                <div class="folder__front">
                  ${renderFolderFrontSvg(svgIds)}
                  ${renderFolderHoverSvg(svgIds)}
                </div>

                <div class="folder__info">
                  <div class="folder__info-header">
                    <h3 class="folder__title">${common.title || 'Untitled'}</h3>
                  </div>

                  <div class="folder__info-meta">
                    <span class="folder__year">${common.year || ''}</span>
                    <div class="folder__category-icons">
                      <i data-lucide="${dIcon}"></i>
                      <i data-lucide="${tIcon}"></i>
                    </div>
                  </div>

                  <div class="folder__info-footer">
                    <ul class="folder__tech-list" aria-label="사용 기술">
                      ${renderTechStackIcons(spec.techStack || [])}
                    </ul>
                  </div>
                </div>
              </div>
            </a>
          </article>
        `;
      })
      .join('');

    wrapper.innerHTML = folderHTML;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    console.log('Projects loaded with themed folder SVG tokens.');
    return true;
  } catch (error) {
    console.error('Data load error:', error);
    return false;
  }
}
