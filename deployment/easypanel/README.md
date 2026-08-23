# EasyPanel

EasyPanel will build the root Dockerfile from private GitHub branch `main`.

- One stateless service on port 3000
- Health path `/api/health`
- Managed domain and HTTPS
- `NODE_ENV`, `PORT`, and optional `NEXT_PUBLIC_SITE_URL`; no secrets
