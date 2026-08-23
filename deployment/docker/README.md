# Docker

IT-03 will add one root Dockerfile for the Next.js standalone production build.

- Multi-stage Node.js 24 Alpine build
- Non-root runtime user
- Port 3000 and `/api/health` health check
- No database, volume, or reverse proxy inside the container
