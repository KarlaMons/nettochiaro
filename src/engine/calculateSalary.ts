import type {
  MonthlyPayments,
  SalaryCalculationInput,
  SalaryCalculationResult,
} from '../types/salary'
import { calculateEmployeeContributions } from './contributions'
import { calculateEmployeeDeduction } from './employeeDeduction'
import { calculateGrossIrpef, calculateNetIrpef } from './irpef'
import {
  calculateLombardyRegionalTax,
  calculateMilanMunicipalTax,
} from './localTaxes'
import {
  SUPPORTED_GROSS_ANNUAL_SALARY,
  SUPPORTED_MONTHLY_PAYMENTS,
} from './taxRules2026'
import { calculateTaxWedgeDeduction } from './taxWedgeRelief'

function validateGrossAnnualSalary(grossAnnualSalary: unknown): asserts grossAnnualSalary is number {
  if (typeof grossAnnualSalary !== 'number') {
    throw new TypeError('grossAnnualSalary must be a number')
  }
  if (!Number.isFinite(grossAnnualSalary)) {
    throw new RangeError('grossAnnualSalary must be finite')
  }
  if (
    grossAnnualSalary < SUPPORTED_GROSS_ANNUAL_SALARY.minimum ||
    grossAnnualSalary > SUPPORTED_GROSS_ANNUAL_SALARY.maximum
  ) {
    throw new RangeError(
      `grossAnnualSalary must be between ${SUPPORTED_GROSS_ANNUAL_SALARY.minimum} and ${SUPPORTED_GROSS_ANNUAL_SALARY.maximum} inclusive`,
    )
  }
}

function validateMonthlyPayments(
  monthlyPayments: unknown,
): asserts monthlyPayments is MonthlyPayments {
  if (typeof monthlyPayments !== 'number') {
    throw new TypeError('monthlyPayments must be a number')
  }
  if (
    !SUPPORTED_MONTHLY_PAYMENTS.some(
      (supportedValue) => supportedValue === monthlyPayments,
    )
  ) {
    throw new RangeError('monthlyPayments must be either 13 or 14')
  }
}

export function calculateSalary(
  input: SalaryCalculationInput,
): SalaryCalculationResult {
  validateGrossAnnualSalary(input.grossAnnualSalary)
  validateMonthlyPayments(input.monthlyPayments)

  const { grossAnnualSalary, monthlyPayments } = input
  const employeeContributions =
    calculateEmployeeContributions(grossAnnualSalary)
  const taxableIncome = grossAnnualSalary - employeeContributions
  const grossIrpef = calculateGrossIrpef(taxableIncome)
  const employeeDeduction = calculateEmployeeDeduction(taxableIncome)
  const taxWedgeDeduction = calculateTaxWedgeDeduction(taxableIncome)
  const netIrpef = calculateNetIrpef(
    grossIrpef,
    employeeDeduction,
    taxWedgeDeduction,
  )
  const regionalTax = calculateLombardyRegionalTax(taxableIncome)
  const municipalTax = calculateMilanMunicipalTax(taxableIncome)
  const totalTaxes = netIrpef + regionalTax + municipalTax
  const totalWithholdings = employeeContributions + totalTaxes
  const annualNetSalary = grossAnnualSalary - totalWithholdings

  return {
    grossAnnualSalary,
    monthlyPayments,
    employeeContributions,
    taxableIncome,
    grossIrpef,
    employeeDeduction,
    taxWedgeDeduction,
    netIrpef,
    regionalTax,
    municipalTax,
    totalTaxes,
    totalWithholdings,
    annualNetSalary,
    averageMonthlyNetSalary: annualNetSalary / monthlyPayments,
    contributionRatePercentage:
      (employeeContributions / grossAnnualSalary) * 100,
    taxRatePercentage: (totalTaxes / grossAnnualSalary) * 100,
    totalWithholdingRatePercentage:
      (totalWithholdings / grossAnnualSalary) * 100,
    netRatePercentage: (annualNetSalary / grossAnnualSalary) * 100,
  }
}
