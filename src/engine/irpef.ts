import { calculateProgressiveTax } from './progressiveTax'
import { IRPEF_BRACKETS } from './taxRules2026'

export function calculateGrossIrpef(taxableIncome: number): number {
  return calculateProgressiveTax(taxableIncome, IRPEF_BRACKETS)
}

export function calculateNetIrpef(
  grossIrpef: number,
  employeeDeduction: number,
  taxWedgeDeduction: number,
): number {
  return Math.max(
    0,
    grossIrpef - employeeDeduction - taxWedgeDeduction,
  )
}
