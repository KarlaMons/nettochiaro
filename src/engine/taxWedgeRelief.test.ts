import { describe, expect, it } from 'vitest'

import { calculateTaxWedgeDeduction } from './taxWedgeRelief'

describe('calculateTaxWedgeDeduction', () => {
  it.each([
    [32_000, 1_000],
    [36_000, 500],
    [40_000, 0],
    [40_001, 0],
  ])('calculates the deduction at taxable income %s', (income, expected) => {
    expect(calculateTaxWedgeDeduction(income)).toBeCloseTo(expected, 10)
  })
})
