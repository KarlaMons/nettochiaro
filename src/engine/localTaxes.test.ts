import { describe, expect, it } from 'vitest'

import {
  calculateLombardyRegionalTax,
  calculateMilanMunicipalTax,
} from './localTaxes'

describe('calculateLombardyRegionalTax', () => {
  it.each([
    [15_000, 184.5],
    [15_001, 184.5158],
    [28_000, 389.9],
    [28_001, 389.9172],
    [50_000, 768.3],
    [50_001, 768.3173],
  ])('calculates the progressive tax at %s', (income, expected) => {
    expect(calculateLombardyRegionalTax(income)).toBeCloseTo(expected, 10)
  })
})

describe('calculateMilanMunicipalTax', () => {
  it.each([
    [22_999, 0],
    [23_000, 0],
    [23_001, 184.008],
  ])('calculates the tax at %s', (income, expected) => {
    expect(calculateMilanMunicipalTax(income)).toBeCloseTo(expected, 10)
  })
})
