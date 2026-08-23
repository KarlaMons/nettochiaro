# API Contracts

## Base URL

`/api`

## Authentication

None. The application exposes only a public, read-only health endpoint. Calculation happens locally through the internal function contract below.

## Endpoints

### Operations

#### `GET /api/health`

- **Auth**: Public.
- **Request**: No body or query parameters.
- **Response 200**: `{ "status": "ok", "service": "nettochiaro", "taxYear": 2025 }`.
- **Headers**: `Cache-Control: no-store`, `Content-Type: application/json`.
- **Errors**: A process-level failure returns a non-2xx response and causes the container health check to fail.

## Internal Calculation Interface

```ts
calculateSalary(input: CalculationInput): SalaryProjection
```

- Throws/returns a typed validation failure when RAL is outside EUR 5,000–120,000, has more than two decimals, or `mensilita` is not 12, 13, or 14.
- Has no network, filesystem, clock, environment, locale, or framework dependency.
- Always uses the immutable `IT_2025_MILANO_STANDARD` rule set.
- Returns amounts as numeric euro values rounded to cents and a zero reconciliation delta.

## Client Error Contract

| Code | Italian message | Trigger |
|------|-----------------|---------|
| `RAL_REQUIRED` | Inserisci una RAL. | Empty field |
| `RAL_INVALID` | Inserisci un importo valido, con massimo due decimali. | Malformed number |
| `RAL_RANGE` | La RAL deve essere compresa tra 5.000 € e 120.000 €. | Outside supported range |
| `PAYMENTS_INVALID` | Seleziona 12, 13 o 14 mensilità. | Unsupported payment count |

No raw stack trace or internal exception is rendered to the visitor.
