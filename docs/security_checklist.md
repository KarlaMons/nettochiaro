# Security Checklist

## UJ-01 — Transparent Salary Calculator

- [x] No hardcoded secrets, tokens, passwords, or API keys.
- [x] No sensitive data is stored, logged, or shown beyond user-entered salary values and calculated results.
- [x] All user-entered RAL values are validated for presence, numeric format, positivity, and the approved EUR 25,000–100,000 range before the engine is called.
- [x] React escapes rendered content; no raw HTML rendering is used.
- [x] Official external links are fixed engine metadata and use `target="_blank"` with `rel="noreferrer"`.
- [x] Dependencies come from the configured npm registry; the high-severity audit reports zero vulnerabilities.
- [x] Authentication, authorization, admin routes, database queries, API responses, and file-upload checks are not applicable to this client-only, no-persistence journey.

## IT-03 — Documented Docker Delivery and Final Review

- [x] No secrets, tokens, credentials, environment values, sensitive logs, external API calls, or deployment automation were added.
- [x] The final multi-stage image contains Nginx and static assets only; runtime inspection found no `node`, `npm`, or retained libcap package.
- [x] `Config.User` is `nginx` (UID/GID 101); the Nginx master and every worker run as UID 101 while binding the approved internal port 80. Only `/usr/sbin/nginx` is granted `cap_net_bind_service=ep` during the build.
- [x] PID, client, proxy, FastCGI, uWSGI, and SCGI temporary paths are under `/tmp` and their writable directories are owned by UID/GID 101.
- [x] The container exposes only internal port 80 and has an exact HTTP `/healthz` health check with no application or environment detail.
- [x] Nginx hides its version and sends a restrictive app-compatible CSP, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, and restrictive `Permissions-Policy` on HTML, assets, SPA fallback, and health responses.
- [x] HTML/fallback responses use `no-store`; only successful/partial/not-modified hashed assets use one-year immutable caching. Missing assets return 404 with `no-store`, no `immutable`, and all security headers preserved.
- [x] SPA fallback serves the application without exposing filesystem listings or missing-file details; unknown asset paths return 404.
- [x] Node.js `24.15.0-alpine3.23` and Nginx `1.30.4-alpine3.24` are pinned to verified multi-architecture manifest digests, alongside exact `npm ci` and the committed lockfile. Updates are deliberate tag/digest/package reviews followed by full rebuild verification; no automatic freshness is claimed. `npm audit --audit-level=high` reports zero vulnerabilities.
- [x] React still escapes rendered content; no raw HTML, backend, persistence, authentication/authorization surface, database, uploads, or calculation API/AI exists.
- [x] EasyPanel instructions require HTTPS and health verification but no external deploy, domain, certificate, or credential action was performed.
- [x] Current official EasyPanel App Service documentation does not document root-filesystem read-only or `tmpfs` controls. They are recorded only as future hardening requiring platform support and fresh runtime verification, not as an enabled setting.
- [x] Final local smoke tests verified HTTP status, exact health body, SPA deep-link fallback, headers, cache behavior, container health, and exact-container cleanup.
