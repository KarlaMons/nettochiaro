import { describe, expect, it } from 'vitest'

import { calculateSalary } from './calculateSalary'
import { buildCalculationBreakdown } from './buildCalculationBreakdown'
import {
  IRPEF_BRACKETS,
  LOMBARDY_REGIONAL_TAX_BRACKETS,
  TAX_RULES_2026_SOURCE_METADATA,
} from './taxRules2026'

describe('buildCalculationBreakdown', () => {
  const result = calculateSalary({ grossAnnualSalary: 30_000, monthlyPayments: 13 })

  it('returns the required ordered annual reconciliation descriptors', () => {
    const steps = buildCalculationBreakdown(result)

    expect(steps.map(({ label }) => label)).toEqual([
      'RAL', 'Contributi previdenziali', 'Imponibile fiscale', 'IRPEF lorda',
      'Detrazione lavoro dipendente', 'Detrazione cuneo fiscale', 'IRPEF netta',
      'Addizionale regionale', 'Addizionale comunale', 'Netto annuale',
    ])
    expect(steps.map(({ value }) => value)).toEqual([
      result.grossAnnualSalary, result.employeeContributions, result.taxableIncome,
      result.grossIrpef, result.employeeDeduction, result.taxWedgeDeduction,
      result.netIrpef, result.regionalTax, result.municipalTax, result.annualNetSalary,
    ])
  })

  it('assigns coherent signs only to deductions and withholdings', () => {
    const byLabel = Object.fromEntries(buildCalculationBreakdown(result).map((step) => [step.label, step]))

    expect(byLabel['RAL']?.sign).toBe('neutral')
    expect(byLabel['Imponibile fiscale']?.sign).toBe('neutral')
    expect(byLabel['IRPEF lorda']?.sign).toBe('neutral')
    expect(byLabel['IRPEF netta']?.sign).toBe('neutral')
    expect(byLabel['Netto annuale']?.sign).toBe('neutral')
    expect(byLabel['Contributi previdenziali']?.sign).toBe('minus')
    expect(byLabel['Addizionale regionale']?.sign).toBe('minus')
    expect(byLabel['Addizionale comunale']?.sign).toBe('minus')
    expect(byLabel['Detrazione lavoro dipendente']?.sign).toBe('plus')
    expect(byLabel['Detrazione cuneo fiscale']?.sign).toBe('plus')
  })

  it('maps significant steps to centralized official source records', () => {
    const steps = buildCalculationBreakdown(result)
    const contributions = steps.find((step) => step.label === 'Contributi previdenziali')
    const wedge = steps.find((step) => step.label === 'Detrazione cuneo fiscale')
    const municipal = steps.find((step) => step.label === 'Addizionale comunale')

    expect(contributions?.details?.source).toBe(TAX_RULES_2026_SOURCE_METADATA.sources.employeeContributions)
    expect(wedge?.details?.source).toBe(TAX_RULES_2026_SOURCE_METADATA.sources.taxWedge)
    expect(municipal?.details?.source).toBe(TAX_RULES_2026_SOURCE_METADATA.sources.municipalTax)
    expect(steps.filter((step) => step.details)).toHaveLength(8)
    expect(steps.filter((step) => step.details).every((step) => step.details?.ruleYear === 2026)).toBe(true)
  })

  it('describes every national and regional bracket boundary from centralized rules', () => {
    const steps = buildCalculationBreakdown(result)
    const nationalRule = steps.find((step) => step.label === 'IRPEF lorda')?.details?.rule ?? ''
    const regionalRule = steps.find((step) => step.label === 'Addizionale regionale')?.details?.rule ?? ''

    for (const bracket of IRPEF_BRACKETS.slice(0, -1)) {
      expect(nationalRule).toContain(bracket.upperBound.toLocaleString('it-IT'))
    }
    expect(nationalRule).toContain(`oltre ${IRPEF_BRACKETS.at(-2)?.upperBound.toLocaleString('it-IT')}`)

    for (const bracket of LOMBARDY_REGIONAL_TAX_BRACKETS.slice(0, -1)) {
      expect(regionalRule).toContain(bracket.upperBound.toLocaleString('it-IT'))
    }
    expect(regionalRule).toContain(`oltre ${LOMBARDY_REGIONAL_TAX_BRACKETS.at(-2)?.upperBound.toLocaleString('it-IT')}`)
  })
})
