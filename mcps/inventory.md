# MCPs & External APIs Inventory

Registry of available, selected, and rejected MCPs and external APIs.

| Name | Type | Status | Notes |
|------|------|--------|-------|
| Official tax sources | Public web sources | selected | Build-time evidence compiled into versioned rules; no runtime fetching. |
| GitHub | Deployment integration | selected | Private repository supplies the EasyPanel build source. |
| EasyPanel | Deployment platform | selected | Builds and hosts one Docker service with HTTPS and health checks. |
| Runtime MCP/API | MCP/API | rejected | None is needed; calculation remains local and deterministic. |

## Evaluation Criteria

- Does the MCP/API solve a real project need?
- Is it reliable and well-maintained?
- What are the cost and rate limit implications?

No plugin or MCP installation is required.
