export type EventColor =
  | "blue"
  | "green"
  | "amber"
  | "rose"
  | "violet"
  | "slate";

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
  color: EventColor;
}

export const EVENT_COLORS: { id: EventColor; label: string }[] = [
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
  { id: "amber", label: "Amber" },
  { id: "rose", label: "Rose" },
  { id: "violet", label: "Violet" },
  { id: "slate", label: "Gray" },
];
