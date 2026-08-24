import { calculateProgressiveTax } from './progressiveTax'
import {
  LOMBARDY_REGIONAL_TAX_BRACKETS,
  MILAN_MUNICIPAL_TAX_RULE,
} from './taxRules2026'

export function calculateLombardyRegionalTax(taxableIncome: number): number {
  return calculateProgressiveTax(
    taxableIncome,
    LOMBARDY_REGIONAL_TAX_BRACKETS,
  )
}

export function calculateMilanMunicipalTax(taxableIncome: number): number {
  if (taxableIncome <= MILAN_MUNICIPAL_TAX_RULE.exemptionThreshold) {
    return 0
  }

  return taxableIncome * MILAN_MUNICIPAL_TAX_RULE.rate
}
