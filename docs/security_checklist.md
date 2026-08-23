# Security Checklist

## UJ-01 — Transparent Salary Calculator

- [x] No hardcoded secrets, tokens, passwords, or API keys.
- [x] No sensitive data is stored, logged, or shown beyond user-entered salary values and calculated results.
- [x] All user-entered RAL values are validated for presence, numeric format, positivity, and the approved EUR 25,000–100,000 range before the engine is called.
- [x] React escapes rendered content; no raw HTML rendering is used.
- [x] Official external links are fixed engine metadata and use `target="_blank"` with `rel="noreferrer"`.
- [x] Dependencies come from the configured npm registry; the high-severity audit reports zero vulnerabilities.
- [x] Authentication, authorization, admin routes, database queries, API responses, and file-upload checks are not applicable to this client-only, no-persistence journey.
