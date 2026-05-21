import type { ScheduleEvent } from "./types";

const STORAGE_KEY = "weekly-schedule-2026";

export function loadEvents(): ScheduleEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScheduleEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveEvents(events: ScheduleEvent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}
