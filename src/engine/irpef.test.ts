import { describe, expect, it } from 'vitest'

import { calculateGrossIrpef } from './irpef'

describe('calculateGrossIrpef', () => {
  it.each([
    [28_000, 6_440],
    [28_001, 6_440.33],
    [50_000, 13_700],
    [50_001, 13_700.43],
  ])('calculates the progressive tax at %s', (income, expected) => {
    expect(calculateGrossIrpef(income)).toBeCloseTo(expected, 10)
  })
})
