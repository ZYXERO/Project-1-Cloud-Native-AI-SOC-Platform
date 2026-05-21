# Project 1: Cloud-Native AI SOC Platform

Production-grade **Security Operations Center (SOC)** platform with real-time log ingestion, AI incident analysis (RAG), and a cloud-deployed dashboard — built as a portfolio system comparable in spirit to Splunk / Sentinel / Security Hub.

| Area | Location |
|------|----------|
| **Application** (React, APIs, Kafka, AI, AWS) | [`app/`](./app/) |
| **Implementation planning & scheduling** | [`implementation-planning-and-scheduling/`](./implementation-planning-and-scheduling/) |

## Sprint timeline

- **Start:** May 20, 2026  
- **Deadline:** June 30, 2026  
- **Workload:** 45 hours/week · 270 hours total · 40% learning / 60% building  

Open the interactive schedule locally:

```text
implementation-planning-and-scheduling/schedule.html
```

**Share online (Vercel):** Import this repo on [Vercel](https://vercel.com) — config is in root `vercel.json`. Step-by-step: [implementation-planning-and-scheduling/DEPLOY.md](./implementation-planning-and-scheduling/DEPLOY.md).

## Repository layout

```text
.
├── README.md                          ← You are here
├── app/                               ← SOC platform application code
│   ├── frontend/
│   ├── backend/
│   ├── ai/
│   ├── kafka/
│   └── infra/
└── implementation-planning-and-scheduling/
    ├── README.md
    ├── schedule.html                  ← Main planner UI
    ├── EXECUTION_SCHEDULE.md          ← Week-by-week sprint reference
    └── ROUTINE.md                     ← Personal daily routine template
```

## Status

| Phase | Target |
|-------|--------|
| MVP | Week 3 (June 8) |
| Production deploy | Week 5–6 (June 22–30) |

See [implementation-planning-and-scheduling/EXECUTION_SCHEDULE.md](./implementation-planning-and-scheduling/EXECUTION_SCHEDULE.md) for full task breakdown.
