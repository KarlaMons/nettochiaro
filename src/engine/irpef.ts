import { calculateProgressiveTax } from './progressiveTax'
import { IRPEF_BRACKETS } from './taxRules2026'

export function calculateGrossIrpef(taxableIncome: number): number {
  return calculateProgressiveTax(taxableIncome, IRPEF_BRACKETS)
}
