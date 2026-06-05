const INDEX_URL = './data/projects-index.json';

export async function fetchProjectIndex() {
  const response = await fetch(INDEX_URL);

  if (!response.ok) {
    throw new Error('Failed to load project index.');
  }

  const data = await response.json();
  const projects = Array.isArray(data) ? data : data?.projects;

  if (!Array.isArray(projects)) {
    throw new TypeError('projects-index.json must contain a projects array.');
  }

  return projects
    .filter((project) => project.slug)
    .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));
}

export async function fetchProject(slug) {
  const response = await fetch(`./data/projects/${slug}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load project: ${slug}`);
  }

  return response.json();
}

export function getProjectYear(date = '') {
  return date.match(/\d{4}/)?.[0] || '';
}

export function getProjectMeta(project) {
  return [project.device, project.projectType, ...(project.keywords || [])].filter(Boolean);
}
