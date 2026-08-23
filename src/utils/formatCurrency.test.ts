import { describe, expect, it } from 'vitest'

import { formatCurrency } from './formatCurrency'

describe('formatCurrency', () => {
  it('formats only at the display boundary with two decimal places', () => {
    const formatted = formatCurrency(30_000.5)

    expect(formatted).toContain('30.000,50')
    expect(formatted).toContain('€')
  })
})
