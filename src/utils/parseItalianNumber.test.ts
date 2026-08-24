import { describe, expect, it } from 'vitest'

import { parseItalianNumber } from './parseItalianNumber'

describe('parseItalianNumber', () => {
  it.each([
    ['30000', 30_000],
    ['30.000', 30_000],
    ['30.000,50', 30_000.5],
    ['  € 30.000,50  ', 30_000.5],
    ['30 000,50 €', 30_000.5],
  ])('parses %j', (input, expected) => {
    expect(parseItalianNumber(input)).toBe(expected)
  })

  it.each([
    '',
    '   ',
    'salary 30000',
    '30,00,00',
    '30.00',
    '3.00.000',
    '30.000.00',
    '1.234 567',
    '1 234.567',
    '12.345\u00a0678,90',
    'NaN',
    'Infinity',
  ])('rejects %j', (input) => {
    expect(() => parseItalianNumber(input)).toThrow(TypeError)
  })
})
