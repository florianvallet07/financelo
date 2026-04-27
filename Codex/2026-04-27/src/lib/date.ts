const DAY_MS = 24 * 60 * 60 * 1000;

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function isYesterday(dateKey?: string) {
  if (!dateKey) return false;
  const yesterday = new Date(Date.now() - DAY_MS).toISOString().slice(0, 10);
  return dateKey === yesterday;
}

export function isToday(dateKey?: string) {
  return dateKey === todayKey();
}
