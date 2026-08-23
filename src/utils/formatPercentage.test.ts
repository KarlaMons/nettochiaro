import { describe, expect, it } from 'vitest'

import { formatPercentage } from './formatPercentage'

describe('formatPercentage', () => {
  it('uses Italian decimal notation consistently', () => {
    expect(formatPercentage(78.08507071794872)).toBe('78,1%')
    expect(formatPercentage(9.19)).toBe('9,2%')
  })
})
