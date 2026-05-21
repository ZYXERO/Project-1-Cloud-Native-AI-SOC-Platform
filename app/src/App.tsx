import { useCallback, useMemo, useState } from "react";
import EventModal from "./EventModal";
import {
  addWeeks,
  canGoNextWeek,
  canGoPrevWeek,
  clampToSchedule,
  formatDayHeader,
  formatHour,
  formatWeekRange,
  getWeekDays,
  HOURS,
  isToday,
  isWithinSchedule,
  SCHEDULE_END,
  startOfWeek,
  timeToMinutes,
  toDateKey,
} from "./dates";
import { loadEvents, saveEvents } from "./storage";
import type { ScheduleEvent } from "./types";

const ROW_HEIGHT = 48;
const GRID_START_MIN = 6 * 60;

function initialWeekStart(): Date {
  const today = new Date();
  const start = startOfWeek(
    isWithinSchedule(today) ? today : new Date(2026, 4, 20)
  );
  return clampToSchedule(start);
}

export default function App() {
  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [events, setEvents] = useState<ScheduleEvent[]>(loadEvents);
  const [modal, setModal] = useState<{
    open: boolean;
    initial: Partial<ScheduleEvent> & { date: string };
  }>({ open: false, initial: { date: toDateKey(new Date()) } });

  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);

  const persist = useCallback((next: ScheduleEvent[]) => {
    setEvents(next);
    saveEvents(next);
  }, []);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, ScheduleEvent[]>();
    for (const ev of events) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    for (const [, list] of map) {
      list.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    }
    return map;
  }, [events]);

  const goToday = () => setWeekStart(initialWeekStart());
  const goPrev = () => {
    if (canGoPrevWeek(weekStart)) setWeekStart((w) => addWeeks(w, -1));
  };
  const goNext = () => {
    if (canGoNextWeek(weekStart)) setWeekStart((w) => addWeeks(w, 1));
  };

  const openNew = (date: string, hour?: number) => {
    const start = hour != null ? `${String(hour).padStart(2, "0")}:00` : "09:00";
    const endHour = hour != null ? Math.min(hour + 1, 22) : 10;
    const end = `${String(endHour).padStart(2, "0")}:00`;
    setModal({
      open: true,
      initial: { date, startTime: start, endTime: end },
    });
  };

  const openEdit = (ev: ScheduleEvent) => {
    setModal({ open: true, initial: ev });
  };

  const handleSave = (ev: ScheduleEvent) => {
    const exists = events.some((e) => e.id === ev.id);
    persist(
      exists ? events.map((e) => (e.id === ev.id ? ev : e)) : [...events, ev]
    );
  };

  const handleDelete = (id: string) => {
    persist(events.filter((e) => e.id !== id));
  };

  const layoutEvent = (ev: ScheduleEvent) => {
    const top =
      ((timeToMinutes(ev.startTime) - GRID_START_MIN) / 60) * ROW_HEIGHT;
    const height =
      ((timeToMinutes(ev.endTime) - timeToMinutes(ev.startTime)) / 60) *
      ROW_HEIGHT;
    return { top, height: Math.max(height, 24) };
  };

  return (
    <div className="app">
      <header className="toolbar">
        <div className="toolbar-brand">
          <h1>2026 Schedule</h1>
          <p className="toolbar-sub">Weekly planner · Jan – Dec 2026</p>
        </div>

        <div className="toolbar-nav">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={goPrev}
            disabled={!canGoPrevWeek(weekStart)}
            aria-label="Previous week"
          >
            ←
          </button>
          <button type="button" className="btn btn-ghost btn-today" onClick={goToday}>
            Today
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={goNext}
            disabled={!canGoNextWeek(weekStart)}
            aria-label="Next week"
          >
            →
          </button>
        </div>

        <p className="week-label">{formatWeekRange(weekStart)}</p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => openNew(toDateKey(weekDays[0]))}
        >
          + Add event
        </button>
      </header>

      <main className="calendar-wrap">
        <div className="calendar">
          <div className="calendar-header">
            <div className="time-gutter header-gutter" />
            {weekDays.map((day) => {
              const { weekday, day: label } = formatDayHeader(day);
              const key = toDateKey(day);
              return (
                <div
                  key={key}
                  className={`day-header ${isToday(day) ? "is-today" : ""}`}
                >
                  <span className="day-weekday">{weekday}</span>
                  <span className="day-date">{label}</span>
                </div>
              );
            })}
          </div>

          <div className="calendar-body">
            <div className="time-column">
              {HOURS.map((h) => (
                <div key={h} className="time-label" style={{ height: ROW_HEIGHT }}>
                  {formatHour(h)}
                </div>
              ))}
            </div>

            <div className="days-grid">
              {weekDays.map((day) => {
                const key = toDateKey(day);
                const dayEvents = eventsByDate.get(key) ?? [];
                const inRange = isWithinSchedule(day);

                return (
                  <div
                    key={key}
                    className={`day-column ${isToday(day) ? "is-today" : ""} ${!inRange ? "out-of-range" : ""}`}
                  >
                    {HOURS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        className="hour-cell"
                        style={{ height: ROW_HEIGHT }}
                        onClick={() => inRange && openNew(key, h)}
                        aria-label={`Add event on ${key} at ${formatHour(h)}`}
                        disabled={!inRange}
                      />
                    ))}

                    {dayEvents.map((ev) => {
                      const { top, height } = layoutEvent(ev);
                      return (
                        <button
                          key={ev.id}
                          type="button"
                          className={`event-block color-${ev.color}`}
                          style={{ top, height }}
                          onClick={() => openEdit(ev)}
                        >
                          <span className="event-title">{ev.title}</span>
                          <span className="event-time">
                            {ev.startTime} – {ev.endTime}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <span>
          {events.length} event{events.length !== 1 ? "s" : ""} saved locally
        </span>
        <span>Schedule ends {SCHEDULE_END.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
      </footer>

      <EventModal
        open={modal.open}
        initial={modal.initial}
        onSave={handleSave}
        onDelete={handleDelete}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
      />
    </div>
  );
}
