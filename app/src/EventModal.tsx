import { useEffect, useState } from "react";
import type { EventColor, ScheduleEvent } from "./types";
import { EVENT_COLORS } from "./types";
import { timeToMinutes } from "./dates";

interface EventModalProps {
  open: boolean;
  initial: Partial<ScheduleEvent> & { date: string };
  onSave: (event: ScheduleEvent) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

function newId(): string {
  return crypto.randomUUID();
}

export default function EventModal({
  open,
  initial,
  onSave,
  onDelete,
  onClose,
}: EventModalProps) {
  const isEdit = Boolean(initial.id);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [notes, setNotes] = useState("");
  const [color, setColor] = useState<EventColor>("blue");

  useEffect(() => {
    if (!open) return;
    setTitle(initial.title ?? "");
    setDate(initial.date);
    setStartTime(initial.startTime ?? "09:00");
    setEndTime(initial.endTime ?? "10:00");
    setNotes(initial.notes ?? "");
    setColor(initial.color ?? "blue");
  }, [open, initial]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (timeToMinutes(endTime) <= timeToMinutes(startTime)) return;

    onSave({
      id: initial.id ?? newId(),
      title: title.trim(),
      date,
      startTime,
      endTime,
      notes: notes.trim(),
      color,
    });
    onClose();
  };

  const endInvalid = timeToMinutes(endTime) <= timeToMinutes(startTime);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <header className="modal-header">
          <h2 id="modal-title">{isEdit ? "Edit event" : "New event"}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <label className="field">
            <span>Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Class, meeting, study block…"
              autoFocus
              required
            />
          </label>

          <label className="field">
            <span>Date</span>
            <input
              type="date"
              value={date}
              min="2026-01-01"
              max="2026-12-31"
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span>Start</span>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </label>
            <label className="field">
              <span>End</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </label>
          </div>
          {endInvalid && (
            <p className="field-error">End time must be after start time.</p>
          )}

          <fieldset className="color-picker">
            <legend>Color</legend>
            <div className="color-options">
              {EVENT_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`color-swatch color-${c.id} ${color === c.id ? "selected" : ""}`}
                  onClick={() => setColor(c.id)}
                  aria-label={c.label}
                  aria-pressed={color === c.id}
                />
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span>Notes (optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Location, links, reminders…"
              rows={3}
            />
          </label>

          <div className="modal-actions">
            {isEdit && onDelete && initial.id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onDelete(initial.id!);
                  onClose();
                }}
              >
                Delete
              </button>
            )}
            <div className="modal-actions-right">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!title.trim() || endInvalid}
              >
                {isEdit ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
