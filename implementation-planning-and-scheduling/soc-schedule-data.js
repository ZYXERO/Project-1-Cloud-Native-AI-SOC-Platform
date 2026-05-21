export const PROJECT = {
  title: "Cloud-Native AI SOC Platform",
  subtitle: "Execution Schedule",
  start: "May 20",
  end: "June 30",
  weeks: 6,
  hrsPerWeek: 45,
  totalHrs: 270,
  learnPct: 40,
  buildPct: 60,
  learnHrs: 108,
  buildHrs: 162,
  mvpWeek: 3,
};

export const WEEKS = [
  {
    n: 1,
    color: "#7c3aed",
    tag: null,
    title: "Architecture, Auth & Core API Foundation",
    dates: "May 20 – May 25",
    focus:
      "System design lockdown, project scaffolding, JWT auth, PostgreSQL schema, Docker Compose for local dev stack.",
    learnH: 18,
    buildH: 27,
    learning: [
      "REST API design patterns — resource naming, status codes, versioning",
      "JWT deep dive — signing, expiry, refresh token flow, secure storage",
      "PostgreSQL schema design — normalization, indexes, JSONB for log payloads",
      "Docker Compose multi-service setup — networking, volumes, healthchecks",
    ],
    building: [
      "Finalize system architecture doc (services, data flow, API contracts)",
      "Scaffold monorepo: /frontend, /backend, /infra, /ai, /kafka",
      "Docker Compose: Postgres + Redis + backend + frontend wired up",
      "Database schema: users, incidents, logs, alerts, audit_logs",
      "Backend skeleton: health endpoints, error middleware, config management",
      "JWT auth: register, login, refresh, logout with token rotation",
      "Alembic/Sequelize migrations baseline committed",
    ],
    deliverable:
      "Running local dev stack (docker compose up = all services healthy). JWT auth tested via Postman/HTTPie. Schema migrations committed. Architecture doc finalized.",
    dependencies: ["None — week 1 is the foundation everything else builds on"],
  },
  {
    n: 2,
    color: "#0d9488",
    tag: null,
    title: "Log Ingestion Pipeline — Kafka + PostgreSQL + Redis",
    dates: "May 26 – June 1",
    focus:
      "Real-time log ingestion via Kafka, persistence to PostgreSQL, Redis caching layer, REST endpoints serving cached data.",
    learnH: 18,
    buildH: 27,
    learning: [
      "Kafka fundamentals — topics, partitions, consumer groups, offset management",
      "Redis caching patterns — cache-aside, TTL strategy, invalidation",
      "Kafka Node.js/Python client — producer/consumer library choice",
      "Event-driven architecture — at-least-once delivery, idempotent consumers",
    ],
    building: [
      "Add Kafka + Zookeeper to Docker Compose",
      "Log producer service — synthetic logs (syslog, Windows Event, CloudTrail)",
      "Log consumer service — persist to PostgreSQL with deduplication",
      "Redis caching layer on query endpoints",
      "REST endpoints: GET /logs, POST /logs/ingest, GET /incidents",
      "Log schema validation middleware",
      "Basic alert rule engine — flag logs by severity",
      "Seed script for 10k+ realistic log events",
    ],
    deliverable:
      "End-to-end pipeline: synthetic logs → Kafka → PostgreSQL. Redis cache reduces query latency measurably. Kafka consumer lag monitored.",
    dependencies: [
      "Week 1 auth system",
      "Week 1 Docker Compose stack",
      "Week 1 PostgreSQL schema",
    ],
  },
  {
    n: 3,
    color: "#ea580c",
    tag: "MVP",
    title: "MVP — React Dashboard + Basic AI Incident Summarization",
    dates: "June 2 – June 8",
    focus:
      "React dashboard consuming live APIs, first AI component (LLM incident summarization), end-to-end MVP.",
    learnH: 18,
    buildH: 27,
    learning: [
      "Next.js App Router + SWR/React Query — data fetching, optimistic UI",
      "LLM API integration — OpenAI/Anthropic, prompt engineering for security context",
      "Vector embeddings basics — cosine similarity, chunking (scaffold for Week 4 RAG)",
      "Recharts / Shadcn UI — charting and design system components",
    ],
    building: [
      "Next.js dashboard scaffold — auth-protected routes, JWT token management",
      "Incident feed page — severity badges, pagination, search/filter",
      "Log stream view — real-time updates via polling (SSE upgrade in Week 4)",
      "Metrics overview — incidents by severity, log volume over time (Recharts)",
      "LLM incident summarizer service — raw log cluster → plain-English summary",
      "POST /ai/summarize integrated into incident detail view",
      "Alert notification panel in dashboard",
      "First CI pipeline — GitHub Actions lint + test + Docker build on push",
    ],
    deliverable:
      "Functional MVP: login → dashboard → live incident feed → click incident → AI summary. Green CI pipeline. Demo-able to stakeholders.",
    dependencies: [
      "Week 1 auth",
      "Week 2 Kafka pipeline + REST endpoints",
      "LLM API key obtained",
    ],
  },
  {
    n: 4,
    color: "#b45309",
    tag: null,
    title: "RAG Pipeline — Vector DB, Embeddings & Intelligent Search",
    dates: "June 9 – June 15",
    focus:
      "Full RAG system — embed historical incidents, vector similarity search, context-aware AI analysis. Replace naive LLM calls with RAG.",
    learnH: 18,
    buildH: 27,
    learning: [
      "RAG architecture — retrieval-augmented generation end-to-end",
      "pgvector / Pinecone / Qdrant — vector storage, similarity search, index types",
      "Embedding pipelines — chunking strategy, ada-002 or local models, batch upserts",
      "Prompt engineering for RAG — context injection, hallucination mitigation, SOC analyst persona",
    ],
    building: [
      "pgvector extension on PostgreSQL or Qdrant container in Compose",
      "Embedding pipeline: incidents/logs → embeddings → vector store",
      "Kafka consumer hook: new log batches trigger embedding pipeline",
      "RAG query service: query → embed → top-k → LLM → structured response",
      "Replace naive summarizer with RAG-powered summarizer",
      "POST /ai/analyze — incident analysis with citations",
      "\"Ask the SOC\" natural language search bar in dashboard",
      "SSE endpoint for real-time log streaming in UI",
    ],
    deliverable:
      "RAG fully integrated. Natural language search in dashboard. AI analysis cites historical incidents. Real-time SSE log stream live.",
    dependencies: [
      "Week 3 LLM integration",
      "Week 2 Kafka pipeline",
      "pgvector or Qdrant in compose",
    ],
  },
  {
    n: 5,
    color: "#2563eb",
    tag: "Prod",
    title: "AWS Deployment — EC2, S3, IAM + Security Hardening",
    dates: "June 16 – June 22",
    focus:
      "Production-grade AWS deployment. All services containerized on EC2. S3 log archival. IAM least-privilege. HTTPS enforced.",
    learnH: 18,
    buildH: 27,
    learning: [
      "AWS EC2 + security groups — instance sizing, SGs as firewall, key pairs",
      "IAM roles vs users — least-privilege, instance profiles, no hardcoded creds",
      "S3 bucket policies + lifecycle rules — log archival, presigned URLs, versioning",
      "HTTPS + reverse proxy — Nginx + Certbot or AWS ACM + ALB",
    ],
    building: [
      "EC2 provisioned (t3.medium/large), Docker + Compose installed",
      "All services deployed via docker-compose on EC2",
      "Nginx reverse proxy: /api → backend, / → frontend, SSL via Certbot",
      "IAM role on EC2 — least-privilege S3 + CloudWatch (no root creds)",
      "S3 integration — raw logs archived from Kafka consumer",
      "Secrets management — AWS Secrets Manager, .env never committed",
      "Security hardening — rate limiting, CORS, helmet, SQL injection audit",
      "OAuth2 social login (Google) added to auth",
      "CloudWatch basic metrics + alarms (CPU, memory, error rate)",
    ],
    deliverable:
      "Public HTTPS SOC platform. All services on EC2. Logs archiving to S3. IAM properly scoped. Security audit checklist green.",
    dependencies: [
      "All previous weeks",
      "AWS account + domain name",
      "Certbot or ACM cert",
    ],
  },
  {
    n: 6,
    color: "#16a34a",
    tag: null,
    title: "Kubernetes, CI/CD Hardening & Production Polish",
    dates: "June 23 – June 30",
    focus:
      "Kubernetes basics (optional scaling), full CI/CD staging→prod gates, observability, final polish and documentation.",
    learnH: 18,
    buildH: 27,
    learning: [
      "Kubernetes core objects — Pod, Deployment, Service, ConfigMap, Secret",
      "GitHub Actions advanced — matrix builds, environments, deployment gates",
      "Observability basics — structured logging, metrics, health checks",
      "Production incident response — runbooks, alert routing, on-call simulation",
    ],
    building: [
      "Kubernetes manifests — Deployments, Services, ConfigMaps for all services",
      "Horizontal Pod Autoscaler on backend + Kafka consumer",
      "Full CI/CD: PR → lint/test → ECR → staging → manual gate → prod",
      "Staging environment fully separated from production",
      "Structured logging — Winston/Pino JSON → CloudWatch Logs",
      "Health endpoints /health, /ready on all services",
      "Dashboard polish — loading states, error boundaries, mobile responsive",
      "OpenAPI/Swagger spec auto-generated",
      "README + architecture diagram + deployment runbook",
      "Load testing with k6 or Locust — 500 concurrent events/sec target",
    ],
    deliverable:
      "Production-grade CI/CD. K8s manifests committed. Staging running. Load test documented. Full README + architecture docs. Portfolio-ready.",
    dependencies: [
      "Week 5 AWS deployment",
      "Week 5 HTTPS + domain live",
      "All core features stable",
    ],
  },
];

export const ARCHITECTURE_NOTES = [
  {
    title: "Week 1 — Architecture before code",
    body: "Spend 4–6 hours on system design + API contracts before writing features. Prevents massive refactors when Kafka + vector DB integrate in Weeks 2–4.",
  },
  {
    title: "Kafka before AI (Week 2 → Week 4)",
    body: "Kafka in Week 2 means 2 weeks of real event data before RAG in Week 4. The vector store has meaningful incidents to retrieve — not empty embeddings.",
  },
  {
    title: "MVP with naive LLM (Week 3)",
    body: "Week 3 ships ingestion → dashboard → summary with a simple LLM call. RAG is an upgrade in Week 4, not a Day 1 requirement. De-risks the sprint.",
  },
  {
    title: "Week 5 is highest risk",
    body: "AWS IAM + SSL provisioning is unpredictable. Bank any Week 4 time savings for deployment debugging.",
  },
];

export const HEAVY_DAYS = ["Monday", "Wednesday", "Saturday", "Sunday"];
export const LIGHT_DAYS = ["Tuesday", "Thursday", "Friday"];

/** Full personal routine — Mon / Wed / Sat / Sun */
export const ROUTINE_HEAVY_DETAIL = [
  { time: "6:20 – 6:30", label: "Wake up", cat: "life" },
  { time: "6:30 – 7:05", label: "Fasted cardio", cat: "life" },
  { time: "7:05 – 7:20", label: "Shower", cat: "life" },
  { time: "7:20 – 7:30", label: "Change & hydrate", cat: "life" },
  { time: "7:30 – 8:00", label: "Check day plan & email / follow-up", cat: "admin" },
  { time: "8:00 – 10:45", label: "Available — SOC / project", cat: "work", workKey: "8:00 – 10:45", hrs: 2.75 },
  { time: "10:45 – 11:30", label: "Food prep, eating & cleanup", cat: "food" },
  { time: "11:30 – 2:30", label: "Available — SOC / project", cat: "work", workKey: "11:30 – 2:30", hrs: 3 },
  { time: "2:30 – 3:00", label: "Restroom, light snack, hydrate, walk outside", cat: "life" },
  { time: "3:00 – 5:45", label: "Available — SOC / project", cat: "work", workKey: "3:00 – 5:45", hrs: 2.75 },
  { time: "5:45 – 6:00", label: "Change, fill water, pre-workout (creatine + bottles)", cat: "life" },
  { time: "6:00 – 6:50", label: "Gym — resistance / weight training", cat: "fitness" },
  { time: "6:50 – 7:10", label: "Prepare dinner (simple carbs, healthy fats, protein)", cat: "food" },
  { time: "7:10 – 7:30", label: "Eat dinner & clean dishes", cat: "food" },
  { time: "7:30 – 8:00", label: "Talk with parents (15 min each)", cat: "family" },
  { time: "8:00 – 8:30", label: "Talk with grandparents", cat: "family" },
  { time: "8:30 – 9:45", label: "Available — SOC / project", cat: "work", workKey: "8:30 – 9:45", hrs: 1.25 },
  { time: "9:45 – 10:15", label: "Charge devices — no electronics / blue light", cat: "life" },
  {
    time: "10:15 – 10:20",
    label: "Bedtime routine: teeth, floss, tongue scraper, face wash, facial exercises, hair/beard care, nasal strips",
    cat: "life",
  },
  { time: "10:20+", label: "Reflect on today, plan tomorrow, wind down & sleep", cat: "life" },
];

/** Lighter days — Tue / Thu / Fri */
export const ROUTINE_LIGHT_DETAIL = [
  { time: "Morning – 4:30", label: "Flexible — rest, errands, light review (no fixed blocks)", cat: "free" },
  { time: "4:30 – 5:45", label: "Available — SOC / project", cat: "work", workKey: "4:30 – 5:45", hrs: 1.25 },
  { time: "5:45 – 6:00", label: "Change, water, pre-workout prep", cat: "life" },
  { time: "6:00 – 6:50", label: "Gym — resistance / weight training", cat: "fitness" },
  { time: "6:50 – 7:10", label: "Prepare dinner", cat: "food" },
  { time: "7:10 – 7:30", label: "Eat dinner & clean dishes", cat: "food" },
  { time: "7:30 – 8:00", label: "Talk with parents (15 min each)", cat: "family" },
  { time: "8:00 – 8:30", label: "Talk with grandparents", cat: "family" },
  { time: "8:30 – 9:45", label: "Available — SOC / project", cat: "work", workKey: "8:30 – 9:45", hrs: 1.25 },
  { time: "9:45 – 10:15", label: "Charge devices — no electronics / blue light", cat: "life" },
  {
    time: "10:15 – 10:20",
    label: "Bedtime routine: teeth, floss, tongue scraper, face wash, facial exercises, hair/beard care, nasal strips",
    cat: "life",
  },
  { time: "10:20+", label: "Reflect on today, plan tomorrow, wind down & sleep", cat: "life" },
];

export const ROUTINE_HEAVY = ROUTINE_HEAVY_DETAIL;
export const ROUTINE_LIGHT = ROUTINE_LIGHT_DETAIL;

const _HEAVY_DOW = [0, 1, 3, 6];
const _HEAVY_BLOCKS = [
  { time: "8:00 – 10:45", hrs: 2.75, prefer: "learn" },
  { time: "11:30 – 2:30", hrs: 3, prefer: "build" },
  { time: "3:00 – 5:45", hrs: 2.75, prefer: "build" },
  { time: "8:30 – 9:45", hrs: 1.25, prefer: "build" },
];
const _LIGHT_BLOCKS = [
  { time: "4:30 – 5:45", hrs: 1.25, prefer: "learn" },
  { time: "8:30 – 9:45", hrs: 1.25, prefer: "build" },
];

const _MILESTONES = {
  "2026-05-25": "Week 1 checkpoint: docker compose up — all services healthy",
  "2026-06-01": "Week 2 checkpoint: logs flowing Kafka → Postgres, Redis cache live",
  "2026-06-08": "Week 3 MVP: login → dashboard → AI incident summary demo",
  "2026-06-15": "Week 4 checkpoint: RAG search + SSE log stream in UI",
  "2026-06-22": "Week 5 checkpoint: HTTPS production URL on EC2",
  "2026-06-30": "FINAL: Portfolio-ready — CI/CD, K8s manifests, load test doc",
};

export const SPRINT_WEEK_ANCHORS = [
  { n: 1, anchor: "2026-05-20" },
  { n: 2, anchor: "2026-05-26" },
  { n: 3, anchor: "2026-06-02" },
  { n: 4, anchor: "2026-06-09" },
  { n: 5, anchor: "2026-06-16" },
  { n: 6, anchor: "2026-06-23" },
];

export const SCHEDULE_RANGE = { start: "2026-05-20", end: "2026-06-30" };

function _fmt(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isHeavyDayOfWeek(dow) {
  return _HEAVY_DOW.includes(dow);
}

export function sundayWeekStart(isoDate) {
  const d = new Date(isoDate + "T12:00:00");
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return _fmt(d);
}

export function getWeekDates(weekNum) {
  const anchor = SPRINT_WEEK_ANCHORS.find((w) => w.n === weekNum);
  if (!anchor) return [];
  const start = sundayWeekStart(anchor.anchor);
  const days = [];
  const d = new Date(start + "T12:00:00");
  for (let i = 0; i < 7; i++) {
    days.push(_fmt(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export function buildMergedDay(date) {
  const d = new Date(date + "T12:00:00");
  const dow = d.getDay();
  const heavy = isHeavyDayOfWeek(dow);
  const template = heavy ? ROUTINE_HEAVY_DETAIL : ROUTINE_LIGHT_DETAIL;
  const inSprint = date >= SCHEDULE_RANGE.start && date <= SCHEDULE_RANGE.end;
  const socDay = inSprint ? DAILY_PLAN.find((x) => x.date === date) : null;
  const socByTime = {};
  if (socDay) {
    socDay.blocks.forEach((b) => {
      socByTime[b.time] = b;
    });
  }

  const slots = template.map((slot) => {
    const item = { ...slot, soc: null };
    if (slot.cat === "work" && slot.workKey && socByTime[slot.workKey]) {
      const b = socByTime[slot.workKey];
      item.soc = { mode: b.mode, task: b.task, hrs: b.hrs };
    }
    return item;
  });

  return {
    date,
    day: d.toLocaleDateString("en-US", { weekday: "long" }),
    dow,
    heavy,
    inSprint,
    week: inSprint ? _weekForDate(d) : null,
    milestone: _MILESTONES[date] || null,
    slots,
  };
}

export const HOURS_MATH = {
  heavyDayHrs: 9.75,
  heavyDaysPerWeek: 4,
  lightDayHrs: 2.5,
  lightDaysPerWeek: 3,
  structuredTotal: 41,
  buffer: 4,
  target: 45,
};

function _weekForDate(d) {
  const t = d.getTime();
  if (t >= new Date(2026, 5, 23).getTime()) return 6;
  if (t >= new Date(2026, 5, 16).getTime()) return 5;
  if (t >= new Date(2026, 5, 9).getTime()) return 4;
  if (t >= new Date(2026, 5, 2).getTime()) return 3;
  if (t >= new Date(2026, 4, 26).getTime()) return 2;
  return 1;
}

export function generateDailyPlan() {
  const queues = {};
  WEEKS.forEach((w) => {
    queues[w.n] = { learn: [...w.learning], build: [...w.building], li: 0, bi: 0 };
  });

  function nextTask(week, prefer) {
    const q = queues[week];
    if (prefer === "learn" && q.li < q.learn.length)
      return { mode: "learn", text: q.learn[q.li++] };
    if (q.bi < q.build.length) return { mode: "build", text: q.build[q.bi++] };
    if (q.li < q.learn.length) return { mode: "learn", text: q.learn[q.li++] };
    return { mode: "build", text: "Integration, tests, PR review, docs — week deliverable push" };
  }

  const days = [];
  const start = new Date(2026, 4, 20);
  const end = new Date(2026, 5, 30);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const date = _fmt(d);
    const week = _weekForDate(d);
    const heavy = _HEAVY_DOW.includes(d.getDay());
    const template = heavy ? _HEAVY_BLOCKS : _LIGHT_BLOCKS;
    const blocks = template.map((b) => {
      const t = nextTask(week, b.prefer);
      return { time: b.time, hrs: b.hrs, mode: t.mode, task: t.text };
    });
    const w = WEEKS.find((x) => x.n === week);
    days.push({
      date,
      day: d.toLocaleDateString("en-US", { weekday: "long" }),
      week,
      weekTitle: w.title,
      heavy,
      blocks,
      milestone: _MILESTONES[date] || null,
      dayTotal: Math.round(blocks.reduce((s, b) => s + b.hrs, 0) * 100) / 100,
    });
  }
  return days;
}

export const DAILY_PLAN = generateDailyPlan();
