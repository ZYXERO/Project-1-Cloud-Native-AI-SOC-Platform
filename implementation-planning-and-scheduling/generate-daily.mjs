import fs from "fs";

const WEEKS = JSON.parse(
  fs.readFileSync("soc-schedule-data.js", "utf8").match(/export const WEEKS = (\[[\s\S]*?\]);/)[1]
);

const HEAVY = [0, 1, 3, 6];
const HEAVY_BLOCKS = [
  { time: "8:00 – 10:45", hrs: 2.75, prefer: "learn" },
  { time: "11:30 – 2:30", hrs: 3, prefer: "build" },
  { time: "3:00 – 5:45", hrs: 2.75, prefer: "build" },
  { time: "8:30 – 9:45", hrs: 1.25, prefer: "build" },
];
const LIGHT_BLOCKS = [
  { time: "4:30 – 5:45", hrs: 1.25, prefer: "learn" },
  { time: "8:30 – 9:45", hrs: 1.25, prefer: "build" },
];

function weekForDate(d) {
  const t = d.getTime();
  const bounds = [
    [new Date(2026, 4, 22), 1],
    [new Date(2026, 4, 28), 2],
    [new Date(2026, 5, 4), 3],
    [new Date(2026, 5, 11), 4],
    [new Date(2026, 5, 18), 5],
    [new Date(2026, 5, 25), 6],
  ];
  for (let i = bounds.length - 1; i >= 0; i--) {
    if (t >= bounds[i][0].getTime()) return bounds[i][1];
  }
  return 1;
}

function fmt(d) {
  return d.toISOString().slice(0, 10);
}

function dayName(d) {
  return d.toLocaleDateString("en-US", { weekday: "long" });
}

function expandTasks(tasks, count) {
  const out = [];
  tasks.forEach((t) => {
    const parts = Math.max(1, Math.ceil(count / tasks.length));
    for (let i = 0; i < parts; i++) {
      out.push(t + (parts > 1 ? ` (session ${i + 1})` : ""));
    }
  });
  return out;
}

const queues = {};
WEEKS.forEach((w) => {
  queues[w.n] = { learn: [...w.learning], build: [...w.building], li: 0, bi: 0 };
});

function nextTask(week, prefer) {
  const q = queues[week];
  if (prefer === "learn" && q.li < q.learn.length) return { mode: "learn", text: q.learn[q.li++] };
  if (q.bi < q.build.length) return { mode: "build", text: q.build[q.bi++] };
  if (q.li < q.learn.length) return { mode: "learn", text: q.learn[q.li++] };
  return { mode: "build", text: "Buffer / review / tests / docs for week deliverable" };
}

const MILESTONES = {
  "2026-05-25": "Week 1 checkpoint: docker compose up — all services healthy",
  "2026-06-01": "Week 2 checkpoint: logs flowing Kafka → Postgres, Redis cache live",
  "2026-06-08": "Week 3 MVP: login → dashboard → AI incident summary demo",
  "2026-06-15": "Week 4 checkpoint: RAG search + SSE log stream in UI",
  "2026-06-22": "Week 5 checkpoint: HTTPS production URL on EC2",
  "2026-06-30": "FINAL: Portfolio-ready — CI/CD, K8s manifests, load test doc",
};

const days = [];
const start = new Date(2026, 4, 22);
const end = new Date(2026, 5, 30);

for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
  const date = fmt(d);
  const week = weekForDate(d);
  const heavy = HEAVY.includes(d.getDay());
  const blocks = (heavy ? HEAVY_BLOCKS : LIGHT_BLOCKS).map((b) => {
    const t = nextTask(week, b.prefer);
    return { time: b.time, hrs: b.hrs, mode: t.mode, task: t.text };
  });
  const w = WEEKS.find((x) => x.n === week);
  days.push({
    date,
    day: dayName(d),
    week,
    weekTitle: w.title,
    heavy,
    blocks,
    milestone: MILESTONES[date] || null,
    dayTotal: blocks.reduce((s, b) => s + b.hrs, 0),
  });
}

const snippet =
  "\nexport const DAILY_PLAN = " + JSON.stringify(days, null, 2) + ";\n";

let src = fs.readFileSync("soc-schedule-data.js", "utf8");
if (src.includes("export const DAILY_PLAN")) {
  src = src.replace(/export const DAILY_PLAN[\s\S]*?;\n/, snippet.trim() + "\n");
} else {
  src = src.trimEnd() + snippet;
}
fs.writeFileSync("soc-schedule-data.js", src);
console.log("Generated", days.length, "days");
