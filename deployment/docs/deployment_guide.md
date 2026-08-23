# Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Private GitHub repository containing `main`
- Access to the target EasyPanel project and DNS provider

## Environment Setup

No secret is required. Configure `NODE_ENV=production`, `PORT=3000`, and optionally `NEXT_PUBLIC_SITE_URL=https://<domain>` in EasyPanel.

## Local Deployment

```bash
docker compose up --build
curl -f http://localhost:3000/api/health
```

## Production Deployment (EasyPanel)

1. Connect GitHub repository to EasyPanel
2. Select branch `main` and Dockerfile build mode
3. Configure environment and expose port `3000`
4. Set `/api/health` as the health path
5. Attach the domain and enable managed HTTPS
6. Deploy, then verify `/`, the EUR 30,000 case, mobile layout, and `/api/health`

## Rollback Plan

1. Identify the last healthy EasyPanel deployment and Git commit.
2. Redeploy that immutable build without rewriting Git history.
3. Confirm the health endpoint and reference calculation.
4. Record the failed release and cause in `docs/work_log.md` before retrying.
