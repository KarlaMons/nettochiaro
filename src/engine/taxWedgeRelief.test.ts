import { describe, expect, it } from 'vitest'

import { calculateTaxWedgeDeduction } from './taxWedgeRelief'

describe('calculateTaxWedgeDeduction', () => {
  it.each([
    [20_000, 0],
    [20_001, 1_000],
    [32_000, 1_000],
    [32_001, (1_000 * 7_999) / 8_000],
    [36_000, 500],
    [40_000, 0],
    [40_001, 0],
  ])('calculates the deduction at taxable income %s', (income, expected) => {
    expect(calculateTaxWedgeDeduction(income)).toBeCloseTo(expected, 10)
  })
})
