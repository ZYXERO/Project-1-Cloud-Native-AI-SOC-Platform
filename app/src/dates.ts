export const SCHEDULE_START = new Date(2026, 0, 1);
export const SCHEDULE_END = new Date(2026, 11, 31);

export function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfWeek(weekStart: Date): Date {
  const d = new Date(weekStart);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

export function clampToSchedule(date: Date): Date {
  if (date < SCHEDULE_START) return new Date(SCHEDULE_START);
  if (date > SCHEDULE_END) return new Date(SCHEDULE_END);
  return date;
}

export function isWithinSchedule(date: Date): boolean {
  const t = date.getTime();
  return t >= SCHEDULE_START.getTime() && t <= SCHEDULE_END.getTime();
}

export function canGoPrevWeek(weekStart: Date): boolean {
  return addWeeks(weekStart, -1) >= startOfWeek(SCHEDULE_START);
}

export function canGoNextWeek(weekStart: Date): boolean {
  return addWeeks(weekStart, 1) <= startOfWeek(SCHEDULE_END);
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatWeekRange(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 6);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const startStr = weekStart.toLocaleDateString("en-US", opts);
  const endStr = weekEnd.toLocaleDateString("en-US", {
    ...opts,
    year: weekStart.getMonth() === 11 ? "numeric" : undefined,
  });
  const year =
    weekStart.getFullYear() !== weekEnd.getFullYear()
      ? ` ${weekEnd.getFullYear()}`
      : weekStart.getMonth() === 0 && weekStart.getDate() <= 7
        ? `, ${weekStart.getFullYear()}`
        : "";
  return `${startStr} – ${endStr}${year}`;
}

export function formatDayHeader(date: Date): { weekday: string; day: string } {
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    day: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
}

export function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export const HOURS = Array.from({ length: 17 }, (_, i) => i + 6);

export function formatHour(hour: number): string {
  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
