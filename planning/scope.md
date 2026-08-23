# Scope

## In Scope

- One Italian, public RAL-to-net calculator for tax year 2025.
- Deterministic employee-side contributions, national IRPEF, employment deductions, 2025 tax-wedge measures, Lombardy and Milan surtaxes, and integrative treatment for the supported standard case.
- Transparent formulas, rationale, official sources, assumptions, and worked example.
- Responsive and accessible single-page UI.
- Automated unit and end-to-end tests, Docker packaging, and EasyPanel deployment guidance.

## Out of Scope

- Employer cost, employer contributions, TFR, INAIL, welfare, benefits, bonuses, overtime, and stock compensation.
- Other municipalities or regions, tax years, contract types, sectors, contribution schemes, or partial-year employment.
- Dependants, multiple incomes or employers, personal deductions, disability, expatriate regimes, and other relief.
- Exact monthly payslip timing, rounding, municipal advance/balance withholding, or payroll-provider parity.
- Accounts, saved calculations, database, admin panel, analytics, generative AI, or professional tax advice.

## Assumptions

- Private-sector permanent employee, full tax year, Milan domicile, no special circumstances.
- General employee contribution rate 9.19%; schemes such as CIGS that can produce a different rate are excluded.
- The EUR 120,000 upper input limit stays below the 2025 contribution massimale, avoiding an unsupported insurance-seniority assumption.
- Monthly output is annual net divided by the selected payment count.
- Statutory thresholds use taxable employment income unless the governing rule explicitly uses gross contribution income.
- All displayed monetary results are rounded to euro cents; statutory ratios that require four decimals are truncated before use.
