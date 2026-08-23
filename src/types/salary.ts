export type MonthlyPayments = 13 | 14

export interface SalaryCalculationInput {
  grossAnnualSalary: number
  monthlyPayments: MonthlyPayments
}

export interface SalaryCalculationResult {
  grossAnnualSalary: number
  monthlyPayments: MonthlyPayments
  employeeContributions: number
  taxableIncome: number
  grossIrpef: number
  employeeDeduction: number
  taxWedgeDeduction: number
  netIrpef: number
  regionalTax: number
  municipalTax: number
  totalTaxes: number
  totalWithholdings: number
  annualNetSalary: number
  averageMonthlyNetSalary: number
  contributionRatePercentage: number
  taxRatePercentage: number
  totalWithholdingRatePercentage: number
  netRatePercentage: number
}
