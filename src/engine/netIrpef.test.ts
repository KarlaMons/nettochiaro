import { describe, expect, it } from 'vitest'

import { calculateNetIrpef } from './irpef'

describe('calculateNetIrpef', () => {
  it('subtracts both deductions when gross tax remains positive', () => {
    expect(calculateNetIrpef(6_000, 2_000, 1_000)).toBe(3_000)
  })

  it('caps net IRPEF at zero', () => {
    expect(calculateNetIrpef(1_000, 1_500, 500)).toBe(0)
  })
})
