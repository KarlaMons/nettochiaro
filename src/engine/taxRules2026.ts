interface TaxBracket {
  readonly upperBound: number
  readonly rate: number
}

interface TaxRuleSourceMetadata {
  readonly taxYear: 2026
  readonly jurisdiction: 'Italy / Lombardy / Milan'
  readonly scenario: string
  readonly precisionPolicy: string
  readonly provenance: string
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
      'Standard private non-manager permanent full-time employee, full year, without dependents, other income, deductions, or relief',
    precisionPolicy:
      'Annual prototype formulas use full floating-point ratio precision; currency rounding is display-only',
    provenance: 'Approved IT-02 fiscal specification',
  })
