import { describe, expect, it } from 'vitest'

import { calculateSalary } from './calculateSalary'

describe('calculateSalary', () => {
  it('calculates the complete EUR 30,000 reference case at full precision', () => {
    const expectedEmployeeDeduction =
      1_910 + (1_190 * (28_000 - 27_243)) / 13_000 + 65
    const result = calculateSalary({
      grossAnnualSalary: 30_000,
      monthlyPayments: 13,
    })

    expect(result.grossAnnualSalary).toBe(30_000)
    expect(result.monthlyPayments).toBe(13)
    expect(result.employeeContributions).toBeCloseTo(2_757, 10)
    expect(result.taxableIncome).toBeCloseTo(27_243, 10)
    expect(result.grossIrpef).toBeCloseTo(6_265.89, 10)
    expect(result.employeeDeduction).toBeCloseTo(
      expectedEmployeeDeduction,
      12,
    )
    expect(result.taxWedgeDeduction).toBeCloseTo(1_000, 10)
    expect(result.netIrpef).toBeCloseTo(
      6_265.89 - expectedEmployeeDeduction - 1_000,
      12,
    )
    expect(result.regionalTax).toBeCloseTo(377.9394, 10)
    expect(result.municipalTax).toBeCloseTo(217.944, 10)
    expect(result.totalTaxes).toBeCloseTo(3_817.478784615385, 12)
    expect(result.totalWithholdings).toBeCloseTo(6_574.478784615385, 12)
    expect(result.annualNetSalary).toBeCloseTo(23_425.521215384615, 12)
    expect(result.averageMonthlyNetSalary).toBeCloseTo(
      1_801.9631704142012,
      12,
    )
  })

  it('changes only the average monthly net when payments change', () => {
    const thirteen = calculateSalary({
      grossAnnualSalary: 30_000,
      monthlyPayments: 13,
    })
    const fourteen = calculateSalary({
      grossAnnualSalary: 30_000,
      monthlyPayments: 14,
    })

    expect(fourteen.annualNetSalary).toBe(thirteen.annualNetSalary)
    expect(fourteen.totalWithholdings).toBe(thirteen.totalWithholdings)
    expect(fourteen.averageMonthlyNetSalary).toBeCloseTo(
      fourteen.annualNetSalary / 14,
      12,
    )
    expect(fourteen.averageMonthlyNetSalary).not.toBe(
      thirteen.averageMonthlyNetSalary,
    )
  })

  it('reports percentages against gross annual salary and reconciles', () => {
    const result = calculateSalary({
      grossAnnualSalary: 30_000,
      monthlyPayments: 13,
    })

    expect(result.contributionRatePercentage).toBeCloseTo(9.19, 12)
    expect(result.taxRatePercentage).toBeCloseTo(
      (result.totalTaxes / result.grossAnnualSalary) * 100,
      12,
    )
    expect(result.totalWithholdingRatePercentage).toBeCloseTo(
      (result.totalWithholdings / result.grossAnnualSalary) * 100,
      12,
    )
    expect(result.netRatePercentage).toBeCloseTo(
      (result.annualNetSalary / result.grossAnnualSalary) * 100,
      12,
    )
    expect(result.annualNetSalary + result.totalWithholdings).toBeCloseTo(
      result.grossAnnualSalary,
      10,
    )
  })

  it.each([24_999.99, 100_000.01, Number.NaN, Number.POSITIVE_INFINITY])(
    'rejects invalid gross annual salary %s',
    (grossAnnualSalary) => {
      expect(() =>
        calculateSalary({ grossAnnualSalary, monthlyPayments: 13 }),
      ).toThrow(RangeError)
    },
  )

  it.each([12, 15, 13.5])('rejects invalid monthly payments %s', (payments) => {
    expect(() =>
      calculateSalary({
        grossAnnualSalary: 30_000,
        monthlyPayments: payments as 13,
      }),
    ).toThrow(RangeError)
  })
})
