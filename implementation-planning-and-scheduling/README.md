# Implementation Planning & Scheduling

Interactive execution plan for **Project 1: Cloud-Native AI SOC Platform** (May 22 → June 30, 2026). Project work begins **Friday, May 22**.

## Quick start

Open the planner in any browser:

```text
schedule.html
```

No build step required for local use. Optional rebuild after editing source files:

**Deploy on Vercel (public link):** See [DEPLOY.md](./DEPLOY.md).

```bash
node build-schedule.mjs
```

## What's in this folder

| File | Purpose |
|------|---------|
| `schedule.html` | **Main UI** — weekly columns, day-by-day list, sprint overview |
| `index-soc.html` | Source template for the planner (edit this, then run build) |
| `soc-schedule-data.js` | Week definitions, personal routine, daily task generator |
| `build-schedule.mjs` | Bundles data into single `schedule.html` |
| `EXECUTION_SCHEDULE.md` | Written sprint reference (weeks 1–6) |
| `ROUTINE.md` | Personal daily routine (heavy vs light days) |

## Planner views

1. **Weekly columns** — Sun–Sat with full personal routine + SOC tasks per time block  
2. **Day-by-day** — Every date May 22–Jun 30 with learn/build tasks  
3. **Sprint plan** — Week focus, deliverables, dependencies  
4. **Overview & Gantt** — 18h learn / 27h build per week  
5. **My routine** — Template for Mon/Wed/Sat/Sun vs Tue/Thu/Fri  

## Constraints

- **45 hrs/week** mapped to your real availability blocks  
- **40% learning** (just-in-time, applied in code same week)  
- **60% building**  
- **MVP:** Week 3 · **Production:** Weeks 5–6  

## Docs

- [EXECUTION_SCHEDULE.md](./EXECUTION_SCHEDULE.md) — full week-by-week breakdown  
- [ROUTINE.md](./ROUTINE.md) — wake, gym, meals, family, SOC blocks  
