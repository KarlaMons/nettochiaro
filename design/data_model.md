# Data Model

## Persistence Decision

No database or browser storage is used. The “data model” is an in-memory calculation contract. This keeps salary inputs private and makes the same pure result easy to test.

## Domain Types

### `CalculationInput`

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| ral | number | EUR 5,000–120,000; max 2 decimals | Annual gross salary; capped below the 2025 contribution massimale |
| mensilita | 12 \| 13 \| 14 | required | Divisor for average monthly net |

### `CalculationAssumptions`

| Field | Type | Fixed value |
|-------|------|-------------|
| taxYear | 2025 | 2025 |
| location | string | Milano, Lombardia |
| employment | string | Private-sector permanent employee |
| workDays | number | 365 |
| employeeContributionRate | number | 0.0919 |

### `SalaryProjection`

| Field | Type | Meaning |
|-------|------|---------|
| input | CalculationInput | Validated visitor input |
| assumptions | CalculationAssumptions | Rule context rendered in UI |
| ral | Money | Annual gross salary |
| contributiBase | Money | 9.19% employee contribution |
| contributoAggiuntivo | Money | 1% above EUR 55,448 |
| contributiTotali | Money | Total employee contributions |
| imponibileFiscale | Money | RAL less employee contributions |
| irpefLorda | Money | Progressive national income tax |
| detrazioneLavoro | Money | Standard employment deduction |
| ulterioreDetrazione | Money | 2025 tax-wedge deduction above EUR 20,000 |
| irpefNetta | Money | Gross IRPEF less capped deductions |
| addizionaleRegionale | Money | Progressive Lombardy surtax |
| addizionaleComunale | Money | Milan surtax after exemption test |
| sommaCuneo | Money | Non-taxable 2025 tax-wedge sum up to EUR 20,000 |
| trattamentoIntegrativo | Money | Applicable EUR 1,200 credit or zero |
| nettoPrimaDeiCrediti | Money | RAL less contributions and all net taxes |
| nettoAnnuale | Money | Final annual estimate |
| nettoMensileMedio | Money | Annual net divided by payments |
| imposteEContributi | Money | Contributions plus net taxes, excluding credits |
| aliquotaEffettiva | number | Taxes and contributions divided by RAL; refundable credits are separate |
| breakdown | BreakdownItem[] | Ordered rows with rule IDs and amounts |
| reconciliationDelta | Money | Must equal EUR 0.00 |

### `TaxRule`

| Field | Type | Meaning |
|-------|------|---------|
| id | string | Stable key such as `IRPEF_2025` |
| label | string | Italian display name |
| rationale | string | Why the rule applies to the standard case |
| formula | string | Human-readable formula actually implemented |
| sourceTitle | string | Official source name |
| sourceUrl | URL string | Direct official link |
| caveat | string? | Relevant simplification |

### Relationships

- One `CalculationInput` produces one `SalaryProjection` using one immutable assumption set.
- Each `BreakdownItem` references one `TaxRule`; rules are static content, not persisted records.

### Indexes

Not applicable because there is no persistence layer.

## Formula Order

`RAL - contributi - IRPEF netta - addizionali + somma cuneo + trattamento integrativo = netto annuale`.

Deductions from IRPEF are capped at gross IRPEF; refundable sums are added separately. This distinction must remain visible in both types and UI.
