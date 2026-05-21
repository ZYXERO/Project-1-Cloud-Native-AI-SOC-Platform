# Execution Schedule — Cloud-Native AI SOC Platform

**May 22 → June 30, 2026** (project work starts Friday May 22) · 6 weeks · 270 hours · 45 hrs/week · 40% learn / 60% build

---

## Week 1: Architecture, Auth & Core API Foundation

**May 22 – May 27** · 18h learn / 27h build

**Focus:** System design, monorepo scaffold, JWT auth, PostgreSQL schema, Docker Compose local stack.

### Learning (18h)

- REST API design patterns — resource naming, status codes, versioning
- JWT deep dive — signing, expiry, refresh token flow, secure storage
- PostgreSQL schema design — normalization, indexes, JSONB for log payloads
- Docker Compose multi-service setup — networking, volumes, healthchecks

### Building (27h)

- Finalize system architecture doc (services, data flow, API contracts)
- Scaffold monorepo: `/frontend`, `/backend`, `/infra`, `/ai`, `/kafka`
- Docker Compose: Postgres + Redis + backend + frontend
- Database schema: users, incidents, logs, alerts, audit_logs
- Backend skeleton: health endpoints, error middleware, config
- JWT auth: register, login, refresh, logout with token rotation
- Alembic/Sequelize migrations baseline committed

**Deliverable:** `docker compose up` healthy. JWT tested via Postman. Migrations + architecture doc committed.

**Dependencies:** None — foundation week.

---

## Week 2: Log Ingestion — Kafka + PostgreSQL + Redis

**May 28 – June 3** · 18h learn / 27h build

**Focus:** Real-time ingestion, persistence, caching, REST APIs.

### Learning (18h)

- Kafka fundamentals — topics, partitions, consumer groups, offsets
- Redis caching — cache-aside, TTL, invalidation
- Kafka client library (Node or Python)
- Event-driven architecture — at-least-once delivery, idempotent consumers

### Building (27h)

- Kafka + Zookeeper in Compose
- Log producer — synthetic syslog / Windows Event / CloudTrail
- Log consumer — PostgreSQL persistence + deduplication
- Redis on query endpoints
- REST: `GET /logs`, `POST /logs/ingest`, `GET /incidents`
- Log schema validation middleware
- Basic alert rule engine by severity
- Seed 10k+ realistic events

**Deliverable:** Synthetic logs → Kafka → Postgres. Redis improves query latency. Consumer lag monitored.

**Dependencies:** Week 1 auth, Compose stack, schema.

---

## Week 3: MVP — Dashboard + Basic AI Summarization

**June 4 – June 10** · 18h learn / 27h build · **MVP TARGET**

**Focus:** Next.js dashboard, first LLM summarizer, demo-able end-to-end flow.

### Learning (18h)

- Next.js App Router + SWR/React Query
- LLM API integration + security-context prompts
- Vector embeddings basics (scaffold for Week 4)
- Recharts / Shadcn UI

### Building (27h)

- Auth-protected dashboard routes
- Incident feed — severity, pagination, filter
- Log stream (polling; SSE in Week 4)
- Metrics overview charts
- LLM incident summarizer service
- `POST /ai/summarize` in incident detail
- Alert notification panel
- GitHub Actions CI — lint, test, Docker build

**Deliverable:** Login → dashboard → live feed → AI summary. Green CI. Stakeholder demo ready.

**Dependencies:** Week 1 auth, Week 2 pipeline, LLM API key.

---

## Week 4: RAG — Vector DB, Embeddings, Intelligent Search

**June 11 – June 17** · 18h learn / 27h build

**Focus:** Full RAG replaces naive LLM; natural language SOC search; SSE streaming.

### Learning (18h)

- RAG architecture end-to-end
- pgvector / Pinecone / Qdrant
- Embedding pipelines — chunking, models, batch upserts
- RAG prompt engineering — SOC analyst persona, citations

### Building (27h)

- pgvector or Qdrant in Compose
- Embedding pipeline for incidents/logs
- Kafka hook → trigger embeddings on new batches
- RAG query service with top-k + LLM
- RAG-powered summarizer
- `POST /ai/analyze` with citations
- “Ask the SOC” search bar
- SSE real-time log stream in UI

**Deliverable:** RAG integrated. NL search live. AI cites historical incidents. SSE stream in UI.

**Dependencies:** Week 3 LLM, Week 2 Kafka, vector store running.

---

## Week 5: AWS Deployment — EC2, S3, IAM + Hardening

**June 18 – June 24** · 18h learn / 27h build · **PROD TARGET**

**Focus:** Public HTTPS deployment, S3 archival, least-privilege IAM.

### Learning (18h)

- EC2 + security groups
- IAM roles vs users, instance profiles
- S3 policies + lifecycle rules
- Nginx + Certbot or ACM + ALB

### Building (27h)

- EC2 + Docker Compose deploy
- Nginx reverse proxy + SSL
- IAM role on EC2 (no root keys)
- S3 log archival from consumer
- Secrets Manager / runtime env injection
- Rate limiting, CORS, helmet, SQL audit
- OAuth2 Google login
- CloudWatch metrics + alarms

**Deliverable:** Public HTTPS SOC. EC2 + S3 + scoped IAM. Security checklist green.

**Dependencies:** All prior weeks, AWS account, domain, cert.

---

## Week 6: Kubernetes, CI/CD Hardening, Polish

**June 25 – June 30** · 18h learn / 27h build

**Focus:** K8s manifests, staging→prod CI/CD, observability, portfolio docs.

### Learning (18h)

- Kubernetes Pod, Deployment, Service, ConfigMap, Secret
- GitHub Actions environments + deployment gates
- Structured logging + health checks
- Production runbooks + on-call basics

### Building (27h)

- K8s manifests + HPA
- Full CI/CD → ECR → staging → prod gate
- Separated staging environment
- JSON logging → CloudWatch
- `/health`, `/ready` on all services
- Dashboard polish + mobile responsive
- OpenAPI/Swagger spec
- README + architecture diagram + runbook
- Load test (k6/Locust) — 500 events/sec target

**Deliverable:** Production-grade CI/CD. K8s committed. Load test documented. **Portfolio-ready.**

**Dependencies:** Week 5 deployment stable.

---

## Architecture decisions

1. **Week 1:** Architecture + API contracts before feature coding.  
2. **Week 2 before Week 4:** Kafka accumulates real data for RAG retrieval.  
3. **Week 3:** Naive LLM MVP; RAG is Week 4 upgrade.  
4. **Week 5:** Highest risk — bank Week 4 buffer for IAM/SSL debugging.

## Final goal (June 30)

- Cloud-deployed SOC platform  
- Kafka log ingestion  
- RAG-based incident analysis  
- React/Next dashboard  
- Auth + security layer  
- CI/CD + Dockerized architecture  
