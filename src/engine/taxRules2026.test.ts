import { describe, expect, it } from 'vitest'

import { TAX_RULES_2026_SOURCE_METADATA } from './taxRules2026'

describe('TAX_RULES_2026_SOURCE_METADATA', () => {
  it('provides immutable, traceable metadata for every fiscal rule source', () => {
    const metadata = TAX_RULES_2026_SOURCE_METADATA
    const sources = Object.values(metadata.sources)

    expect(Object.isFrozen(metadata)).toBe(true)
    expect(Object.isFrozen(metadata.sources)).toBe(true)
    expect(sources).toHaveLength(6)

    for (const source of sources) {
      expect(Object.isFrozen(source)).toBe(true)
      expect(source.authority.length).toBeGreaterThan(0)
      expect(source.title.length).toBeGreaterThan(0)
      expect(source.url).toMatch(/^https:\/\//)
      expect(source.effectiveYear).toBe(2026)
      expect(source.verifiedOn).toBe('2026-08-23')
    }
  })

  it('records the source-specific instruments and employee deduction page', () => {
    const { sources } = TAX_RULES_2026_SOURCE_METADATA

    expect(sources.irpef.instrument).toContain('art. 1, comma 3')
    expect(sources.employeeDeduction.page).toBe(149)
    expect(sources.taxWedge.instrument).toContain('Circolare n. 4/E')
    expect(sources.employeeContributions.instrument).toContain(
      'Circolare n. 6/2026',
    )
  })

  it('makes the included relief and deliberate precision policy explicit', () => {
    const metadata = TAX_RULES_2026_SOURCE_METADATA

    expect(metadata.scenario).toContain(
      'includes statutory employee deduction and tax-wedge deduction',
    )
    expect(metadata.scenario).toContain(
      'excludes personal/additional relief, dependents, other deductions, and trattamento integrativo',
    )
    expect(metadata.precisionPolicy).toContain(
      'intentionally retains full ratio precision',
    )
    expect(metadata.precisionPolicy).toContain(
      'official first-four-decimal convention',
    )
  })
})
