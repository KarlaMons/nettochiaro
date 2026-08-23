# Non-Functional Requirements

## Performance

- Calculation completes in the browser in under 100 ms on a typical mobile device.
- Initial page targets Lighthouse performance >= 90 and avoids runtime calls for calculation.
- Production container becomes healthy within 30 seconds.

## Security

- No authentication, personal data storage, cookies, database, or third-party runtime APIs.
- Validate input client-side and server-side where applicable; never render untrusted HTML.
- Production runs as a non-root container with no writable persistent volume.
- Level 1 secrets: none. Level 2 configuration: `NODE_ENV`, `PORT`, optional public site URL. Level 3 credentials: none.

## Accessibility

- Meet WCAG 2.2 AA for contrast, focus, labels, semantic headings, keyboard use, error association, and reduced motion.
- Results use text and tables in addition to color or charts.

## Observability

- `GET /api/health` reports a minimal healthy/version response without environment details.
- Log only startup and unexpected server errors; never log entered RAL values.
- EasyPanel health monitoring and container logs are sufficient for prototype scope.

## Scalability

- One stateless instance is sufficient; the pure client-side calculator supports concurrent visitors without server load.
- Horizontal scaling requires no shared state if added later.

## Reliability and Compatibility

- Support current Chrome, Firefox, Safari, and Edge plus common mobile viewports.
- Calculation must be deterministic: identical inputs and rule version produce identical outputs.
- Production build, Docker health check, and end-to-end smoke test must pass before delivery.
