import { EMPLOYEE_CONTRIBUTION_RULE } from './taxRules2026'

export function calculateEmployeeContributions(
  grossAnnualSalary: number,
): number {
  const ordinaryContribution =
    grossAnnualSalary * EMPLOYEE_CONTRIBUTION_RULE.ordinaryRate
  const salaryAboveAdditionalRateThreshold = Math.max(
    0,
    grossAnnualSalary -
      EMPLOYEE_CONTRIBUTION_RULE.additionalRateThreshold,
  )

  return (
    ordinaryContribution +
    salaryAboveAdditionalRateThreshold *
      EMPLOYEE_CONTRIBUTION_RULE.additionalRate
  )
}
