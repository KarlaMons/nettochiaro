import { EMPLOYEE_DEDUCTION_RULE } from './taxRules2026'

export function calculateEmployeeDeduction(taxableIncome: number): number {
  const rule = EMPLOYEE_DEDUCTION_RULE
  let deduction: number

  if (taxableIncome <= rule.firstThreshold) {
    deduction = rule.lowIncomeDeduction
  } else if (taxableIncome <= rule.secondThreshold) {
    deduction =
      rule.middleIncomeBase +
      rule.middleIncomeVariable *
        ((rule.secondThreshold - taxableIncome) / rule.middleIncomeDivisor)
  } else if (taxableIncome <= rule.finalThreshold) {
    deduction =
      rule.middleIncomeBase *
      ((rule.finalThreshold - taxableIncome) / rule.upperIncomeDivisor)
  } else {
    deduction = 0
  }

  const qualifiesForAdditionalDeduction =
    taxableIncome > rule.additionalDeductionLowerExclusive &&
    taxableIncome <= rule.additionalDeductionUpperInclusive

  return deduction +
    (qualifiesForAdditionalDeduction ? rule.additionalDeduction : 0)
}
