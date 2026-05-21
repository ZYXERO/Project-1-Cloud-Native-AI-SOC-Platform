# Cloud-Native AI SOC Platform — Application

This directory contains the **production application** for Project 1.

## Planned stack

| Layer | Technology |
|-------|------------|
| Frontend | React / Next.js dashboard |
| Backend | Node.js or FastAPI — REST APIs, JWT auth |
| Data | PostgreSQL, Redis, Kafka |
| AI | LLM + RAG, vector database, incident summarization |
| Cloud | AWS (EC2, S3, IAM) |
| Infra | Docker, Kubernetes (scaling), GitHub Actions CI/CD |

## Monorepo layout (target)

```text
app/
├── frontend/     # Next.js SOC dashboard
├── backend/      # REST API, auth, business logic
├── ai/           # RAG pipeline, embeddings, summarization
├── kafka/        # Producers, consumers, stream processing
└── infra/        # Docker Compose, K8s manifests, Terraform/CDK (optional)
```

## Getting started (React scaffold)

A Vite + React starter lives at the `app/` root for early UI experiments. When the monorepo is split into subfolders above, move packages accordingly.

```bash
cd app
npm install
npm run dev
```

## Planning & schedule

Sprint tasks, daily routine, and week-by-week deliverables:

[../implementation-planning-and-scheduling/](../implementation-planning-and-scheduling/)
