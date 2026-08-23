# Risk Register

## Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|------------|--------|------------|
| R1 | A simplified result is mistaken for a payslip or tax opinion. | Med | High | Label every result as an estimate; keep assumptions and exclusions adjacent to output. |
| R2 | A formula or threshold is copied incorrectly. | Low | High | Encode each rule once, cite primary sources, test every boundary, and reconcile the result algebraically. |
| R3 | The generic 9.19% contribution rate differs from a real employer's scheme. | High | Med | State the sector simplification prominently and exclude CIGS/special funds. |
| R4 | Monthly average differs from actual monthly cash flow. | High | Med | Call it “netto mensile medio” and explain that real withholding differs across ordinary and additional payments. |
| R5 | Municipal exemption creates an unexpected discontinuity near EUR 23,000 taxable income. | Med | Med | Test both sides and explain that the 0.8% applies to the whole taxable base once the exemption is exceeded. |
| R6 | 2025 rules are later confused with current rules. | Med | Med | Display “Anno fiscale 2025” in header, result, methodology, and metadata. |
| R7 | Public deployment becomes unavailable during evaluation. | Low | High | Add health check, restart policy, HTTPS, post-deploy smoke test, and documented rollback. |
| R8 | Formula detail overwhelms the first-time visitor. | Med | Med | Lead with three outputs; keep technical detail progressively disclosed but fully available. |
