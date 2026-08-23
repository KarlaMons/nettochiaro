interface TaxBracket {
  readonly upperBound: number
  readonly rate: number
}

interface FiscalRuleSource {
  readonly authority: string
  readonly title: string
  readonly instrument?: string
  readonly page?: number
  readonly url: string
  readonly effectiveYear: 2026
  readonly referenceTaxPeriod?: 2025 | 2026
  readonly applicabilityNote?: string
  readonly verifiedOn: '2026-08-23'
}

interface TaxRuleSourceMetadata {
  readonly taxYear: 2026
  readonly jurisdiction: 'Italy / Lombardy / Milan'
  readonly scenario: string
  readonly precisionPolicy: string
  readonly sources: Readonly<
    Record<
      | 'employeeContributions'
      | 'irpef'
      | 'employeeDeduction'
      | 'taxWedge'
      | 'regionalTax'
      | 'municipalTax',
      Readonly<FiscalRuleSource>
    >
  >
}

export const SUPPORTED_GROSS_ANNUAL_SALARY = Object.freeze({
  minimum: 25_000,
  maximum: 100_000,
})

export const SUPPORTED_MONTHLY_PAYMENTS = Object.freeze([13, 14] as const)

export const EMPLOYEE_CONTRIBUTION_RULE = Object.freeze({
  ordinaryRate: 0.0919,
  additionalRateThreshold: 56_224,
  additionalRate: 0.01,
})

export const IRPEF_BRACKETS: readonly TaxBracket[] = Object.freeze([
  Object.freeze({ upperBound: 28_000, rate: 0.23 }),
  Object.freeze({ upperBound: 50_000, rate: 0.33 }),
  Object.freeze({ upperBound: Number.POSITIVE_INFINITY, rate: 0.43 }),
])

export const EMPLOYEE_DEDUCTION_RULE = Object.freeze({
  firstThreshold: 15_000,
  secondThreshold: 28_000,
  finalThreshold: 50_000,
  lowIncomeDeduction: 1_955,
  middleIncomeBase: 1_910,
  middleIncomeVariable: 1_190,
  middleIncomeDivisor: 13_000,
  upperIncomeDivisor: 22_000,
  additionalDeduction: 65,
  additionalDeductionLowerExclusive: 25_000,
  additionalDeductionUpperInclusive: 35_000,
})

export const TAX_WEDGE_DEDUCTION_RULE = Object.freeze({
  lowerExclusive: 20_000,
  fullAmountUpperInclusive: 32_000,
  taperUpperInclusive: 40_000,
  fullAmount: 1_000,
  taperDivisor: 8_000,
})

export const LOMBARDY_REGIONAL_TAX_BRACKETS: readonly TaxBracket[] =
  Object.freeze([
    Object.freeze({ upperBound: 15_000, rate: 0.0123 }),
    Object.freeze({ upperBound: 28_000, rate: 0.0158 }),
    Object.freeze({ upperBound: 50_000, rate: 0.0172 }),
    Object.freeze({ upperBound: Number.POSITIVE_INFINITY, rate: 0.0173 }),
  ])

export const MILAN_MUNICIPAL_TAX_RULE = Object.freeze({
  exemptionThreshold: 23_000,
  rate: 0.008,
})

export const TAX_RULES_2026_SOURCE_METADATA: TaxRuleSourceMetadata =
  Object.freeze({
    taxYear: 2026,
    jurisdiction: 'Italy / Lombardy / Milan',
    scenario:
      'Standard private non-manager permanent full-time employee, full year, Milan/Lombardy; includes statutory employee deduction and tax-wedge deduction; excludes personal/additional relief, dependents, other deductions, and trattamento integrativo',
    precisionPolicy:
      'The app intentionally retains full ratio precision instead of the official first-four-decimal convention described for the employee-deduction ratios; currency rounding is display-only',
    sources: Object.freeze({
      employeeContributions: Object.freeze({
        authority: 'Istituto Nazionale della Previdenza Sociale (INPS)',
        title:
          'Determinazione per l’anno 2026 del limite minimo di retribuzione giornaliera e degli altri valori per il calcolo delle contribuzioni',
        instrument: 'Circolare n. 6/2026 del 30 gennaio 2026',
        url: 'https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html',
        effectiveYear: 2026,
        verifiedOn: '2026-08-23',
      }),
      irpef: Object.freeze({
        authority: 'Gazzetta Ufficiale della Repubblica Italiana',
        title:
          'Bilancio di previsione dello Stato per l’anno finanziario 2026 e bilancio pluriennale per il triennio 2026-2028',
        instrument: 'Legge 30 dicembre 2025, n. 199, art. 1, comma 3',
        url: 'https://www.gazzettaufficiale.it/eli/id/2025/12/30/25G00212/sg',
        effectiveYear: 2026,
        verifiedOn: '2026-08-23',
      }),
      employeeDeduction: Object.freeze({
        authority: 'Agenzia delle Entrate',
        title:
          'Modello 730/2026 — Istruzioni per la compilazione (redditi 2025)',
        instrument: 'Tabella 6 — Detrazioni per redditi di lavoro dipendente',
        page: 149,
        url: 'https://infoprecompilata.agenziaentrate.gov.it/portale/documents/d/guest/730_istruzioni_2026.pdf',
        effectiveYear: 2026,
        referenceTaxPeriod: 2025,
        applicabilityNote:
          'Official evidence for the employee-deduction formula and first-four-decimal ratio convention; carried into the approved 2026 projection because the rule is unchanged in scope',
        verifiedOn: '2026-08-23',
      }),
      taxWedge: Object.freeze({
        authority: 'Agenzia delle Entrate',
        title: 'Lavoro dipendente e pensioni',
        instrument:
          'Pagina informativa della dichiarazione precompilata; Circolare n. 4/E del 16 maggio 2025',
        url: 'https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni',
        effectiveYear: 2026,
        verifiedOn: '2026-08-23',
      }),
      regionalTax: Object.freeze({
        authority: 'Regione Lombardia',
        title: 'Addizionale Regionale all’IRPEF',
        instrument: 'Aliquote dell’addizionale regionale IRPEF',
        url: 'https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef',
        effectiveYear: 2026,
        verifiedOn: '2026-08-23',
      }),
      municipalTax: Object.freeze({
        authority: 'Comune di Milano',
        title: 'Addizionale comunale IRPEF',
        instrument: 'Aliquota ed esenzione dell’addizionale comunale IRPEF',
        url: 'https://www.comune.milano.it/aree-tematiche/tributi/addizionale-comunale-irpef',
        effectiveYear: 2026,
        verifiedOn: '2026-08-23',
      }),
    }),
  })
