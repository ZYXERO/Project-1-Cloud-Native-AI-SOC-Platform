# Deploy the schedule on Vercel

Share a public link so anyone can open your sprint planner in a browser.

## One-time setup (GitHub → Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub login is easiest).
2. Click **Add New… → Project**.
3. Import **`Project-1-Cloud-Native-AI-SOC-Platform`** from your GitHub account.
4. Vercel reads **`vercel.json`** at the repo root — you usually **do not** need to change settings:
   - **Build Command:** `node implementation-planning-and-scheduling/build-schedule.mjs`
   - **Output Directory:** `implementation-planning-and-scheduling`
   - **Framework Preset:** Other (static)
5. Click **Deploy**.

Your site will be live at something like:

```text
https://project-1-cloud-native-ai-soc-platform.vercel.app
```

The root URL `/` serves **`schedule.html`** (weekly columns, day-by-day, sprint plan).

## Redeploy after changes

1. Edit `index-soc.html` or `soc-schedule-data.js`.
2. Commit and push to `master` on GitHub.
3. Vercel redeploys automatically (if Git integration is enabled).

Or rebuild locally and push ( `schedule.html` is committed after build):

```bash
node implementation-planning-and-scheduling/build-schedule.mjs
git add implementation-planning-and-scheduling/schedule.html
git commit -m "Update schedule"
git push
```

## Deploy from your machine (CLI)

```bash
npm i -g vercel
cd path/to/Project-1-Cloud-Native-AI-SOC-Platform
vercel login
vercel --prod
```

Follow prompts; link to the existing Vercel project if you already created one from GitHub.

## What gets deployed

| Deployed | Not deployed |
|----------|----------------|
| `schedule.html` (planner UI) | `app/` React scaffold (separate project later) |
| Static assets in this folder | `node_modules` |

## Custom domain (optional)

In the Vercel project: **Settings → Domains** → add your domain.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page | Hard refresh (Ctrl+F5). Confirm latest `schedule.html` was built and pushed. |
| 404 on `/` | Ensure root `vercel.json` rewrite to `/schedule.html` is in the repo. |
| Wrong app deployed | Root Directory must be repo root (where `vercel.json` lives), not `app/`. |
