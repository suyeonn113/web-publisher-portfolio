export function text(value, fallback = '') {
  if (Array.isArray(value)) return value.filter(Boolean).join(' ');
  return value || fallback;
}

export function dateRange(meta = {}) {
  const { dateStart, dateEnd } = meta;

  if (!dateStart && !dateEnd) return '';
  if (!dateStart) return dateEnd;
  if (!dateEnd || dateStart === dateEnd) return dateStart;

  return `${dateStart} - ${dateEnd}`;
}

export function roleText(role) {
  if (!Array.isArray(role)) return role || '';
  return role.filter(Boolean).join(', ');
}
