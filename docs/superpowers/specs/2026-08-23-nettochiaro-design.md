# NettoChiaro — Product and Technical Design

## Objective

NettoChiaro is a public Italian web calculator created as a prototype for Jet HR. A visitor enters annual gross salary (RAL) and selects 12, 13, or 14 payments. The page returns estimated annual and average monthly net salary, then explains every deduction and credit that produced the result.

The evaluation focus is domain understanding: the product must show why each rule applies, not merely display an answer. All salary figures therefore come from deterministic, source-backed functions. No generative AI is used at runtime.

## Standard Case

The calculator is fixed to tax year 2025 and assumes a private-sector employee on a permanent contract, resident in Milan for the full year, with no other income, dependants, deductions, benefits, bonuses, or special relief. The employee contribution rate is simplified to 9.19%, plus the additional 1% on annual pay above EUR 55,448.

The engine computes employee contributions, taxable income, gross IRPEF, employment deduction, 2025 tax-wedge measures, Lombardy regional surtax, Milan municipal surtax, applicable integrative treatment, and final net salary. Monthly net is an annual average, not a simulation of individual payslips.

## Experience

The `/` route contains one dashboard. The form accepts RAL from EUR 5,000 to EUR 120,000, shows payment count and assumptions, and provides an explicit **Calcola** action. Results present three headline values, a pre-credit RAL allocation, refundable credits separately, and a reconciled calculation table. Every row includes a short definition, applied formula, reason for applicability, and official source. Method, limitations, and a worked EUR 30,000 example remain available below the results.

The visual language is original rather than an imitation of Jet HR: ivory background, petrol blue, restrained lime accent, strong numeric hierarchy, and responsive single-column behavior on mobile.

## Architecture

Use Next.js App Router, React, strict TypeScript, Tailwind CSS, and Node.js. The interactive calculator is a client component; all tax logic lives in framework-independent pure functions. No database, authentication, analytics, cookies, external API, or admin panel is required because the product stores no data and exposes no mutable configuration.

A public `GET /api/health` endpoint supports Docker and EasyPanel health checks. The production build uses Next.js standalone output in a multi-stage, non-root Docker image.

## Quality and Delivery

Vitest covers formulas, statutory thresholds, rounding, reconciliation, and reference cases. Playwright verifies the complete user flow, errors, keyboard use, source links, and mobile layout. The acceptance gate is lint, typecheck, unit tests, end-to-end tests, production build, container health check, and manual desktop/mobile review.

Production is delivered from a private GitHub repository to a single EasyPanel service. The hiring team receives only the live HTTPS URL.
