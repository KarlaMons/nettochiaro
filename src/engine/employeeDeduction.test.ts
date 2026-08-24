import { describe, expect, it } from 'vitest'

import { calculateEmployeeDeduction } from './employeeDeduction'

describe('calculateEmployeeDeduction', () => {
  it.each([
    [15_000, 1_955],
    [15_001, 1_910 + (1_190 * 12_999) / 13_000],
    [25_000, 1_910 + (1_190 * 3_000) / 13_000],
    [25_001, 1_910 + (1_190 * 2_999) / 13_000 + 65],
    [28_000, 1_975],
    [35_000, 1_367.2727272727273],
    [35_001, (1_910 * 14_999) / 22_000],
    [50_000, 0],
    [50_001, 0],
  ])('calculates the deduction at taxable income %s', (income, expected) => {
    expect(calculateEmployeeDeduction(income)).toBeCloseTo(expected, 10)
  })

  it('retains the full ratio precision', () => {
    const expected = 1_910 + (1_190 * 757) / 13_000 + 65

    expect(calculateEmployeeDeduction(27_243)).toBeCloseTo(expected, 12)
  })
})
