const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function formatCompactCount(value: number): string {
  if (value < 0) {
    throw new Error(`件数が負数です: ${value}`);
  }
  if (value < 10000) {
    return value.toLocaleString("ja-JP");
  }
  if (value < 100000000) {
    const man = value / 10000;
    const rounded = Math.round(man * 10) / 10;
    if (Number.isInteger(rounded)) {
      return `${rounded.toString()}万`;
    }
    return `${rounded.toFixed(1)}万`;
  }
  const oku = value / 100000000;
  const roundedOku = Math.round(oku * 10) / 10;
  if (Number.isInteger(roundedOku)) {
    return `${roundedOku.toString()}億`;
  }
  return `${roundedOku.toFixed(1)}億`;
}

export function formatRelativeTime(iso: string, now: number): string {
  const created = new Date(iso);
  if (Number.isNaN(created.getTime())) {
    throw new Error(`不正な日時です: ${iso}`);
  }
  const diff = now - created.getTime();
  if (diff < MINUTE) {
    return "今";
  }
  if (diff < HOUR) {
    return `${Math.floor(diff / MINUTE).toString()}分`;
  }
  if (diff < DAY) {
    return `${Math.floor(diff / HOUR).toString()}時間`;
  }
  const sameYear = created.getFullYear() === new Date(now).getFullYear();
  const month = created.getMonth() + 1;
  const day = created.getDate();
  if (sameYear) {
    return `${month.toString()}月${day.toString()}日`;
  }
  return `${created.getFullYear().toString()}年${month.toString()}月${day.toString()}日`;
}
