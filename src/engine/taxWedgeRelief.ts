import { TAX_WEDGE_DEDUCTION_RULE } from './taxRules2026'

export function calculateTaxWedgeDeduction(taxableIncome: number): number {
  const rule = TAX_WEDGE_DEDUCTION_RULE

  if (taxableIncome <= rule.lowerExclusive) {
    return 0
  }
  if (taxableIncome <= rule.fullAmountUpperInclusive) {
    return rule.fullAmount
  }
  if (taxableIncome <= rule.taperUpperInclusive) {
    return (
      rule.fullAmount *
      ((rule.taperUpperInclusive - taxableIncome) / rule.taperDivisor)
    )
  }
  return 0
}
