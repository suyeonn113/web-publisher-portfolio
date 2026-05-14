export const toDate = (dateText) => new Date(`${dateText}T00:00:00`);

export const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatKoreanMonthDay = (dateText) => {
  if (!dateText) {
    return '';
  }

  const date = toDate(dateText);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}월 ${day}일 (${weekdays[date.getDay()]})`;
};
