const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatCount(value: number): string {
  if (value < 0) {
    throw new Error(`件数が負数です: ${value}`);
  }
  return value.toLocaleString("en-US");
}

function ordinal(day: number): string {
  const mod100 = day % 100;
  if (mod100 >= 11 && mod100 <= 13) {
    return `${day.toString()}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day.toString()}st`;
    case 2:
      return `${day.toString()}nd`;
    case 3:
      return `${day.toString()}rd`;
    default:
      return `${day.toString()}th`;
  }
}

export function formatRelativeTime(iso: string, now: number): string {
  const created = new Date(iso);
  if (Number.isNaN(created.getTime())) {
    throw new Error(`不正な日時です: ${iso}`);
  }
  const diff = now - created.getTime();
  if (diff < 30_000) {
    return "less than 20 seconds ago";
  }
  if (diff < MINUTE) {
    return "less than a minute ago";
  }
  if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE);
    if (minutes === 1) {
      return "1 minute ago";
    }
    return `about ${minutes.toString()} minutes ago`;
  }
  if (diff < DAY) {
    const hours = Math.floor(diff / HOUR);
    if (hours === 1) {
      return "about 1 hour ago";
    }
    return `about ${hours.toString()} hours ago`;
  }
  const hours = created.getHours();
  const minutes = created.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const month = MONTHS[created.getMonth()];
  if (month === undefined) {
    throw new Error(`月が不正です: ${created.getMonth().toString()}`);
  }
  const day = ordinal(created.getDate());
  return `${hour12.toString()}:${minutes} ${ampm} ${month} ${day}`;
}
