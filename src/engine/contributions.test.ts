import { describe, expect, it } from 'vitest'

import { calculateEmployeeContributions } from './contributions'

describe('calculateEmployeeContributions', () => {
  it('applies the ordinary employee rate', () => {
    expect(calculateEmployeeContributions(30_000)).toBeCloseTo(2_757, 10)
  })

  it('does not apply the additional rate at the threshold', () => {
    expect(calculateEmployeeContributions(56_224)).toBeCloseTo(
      56_224 * 0.0919,
      10,
    )
  })

  it('applies one percent only to salary above the threshold', () => {
    expect(calculateEmployeeContributions(60_000)).toBeCloseTo(5_551.76, 10)
  })
})
