import { describe, expect, it } from 'vitest'

import type { SalaryCalculationInput } from '../types/salary'
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

    const {
      monthlyPayments: thirteenPayments,
      averageMonthlyNetSalary: thirteenMonthlyNet,
      ...thirteenAnnualResults
    } = thirteen
    const {
      monthlyPayments: fourteenPayments,
      averageMonthlyNetSalary: fourteenMonthlyNet,
      ...fourteenAnnualResults
    } = fourteen

    expect(thirteenPayments).toBe(13)
    expect(fourteenPayments).toBe(14)
    expect(fourteenAnnualResults).toEqual(thirteenAnnualResults)
    expect(fourteenAnnualResults.annualNetSalary).toBe(
      thirteenAnnualResults.annualNetSalary,
    )
    expect(fourteenMonthlyNet).toBeCloseTo(
      fourteenAnnualResults.annualNetSalary / 14,
      12,
    )
    expect(fourteenMonthlyNet).not.toBe(thirteenMonthlyNet)
  })

  it.each([25_000, 100_000])(
    'accepts inclusive supported RAL boundary %s',
    (grossAnnualSalary) => {
      expect(
        calculateSalary({ grossAnnualSalary, monthlyPayments: 13 })
          .grossAnnualSalary,
      ).toBe(grossAnnualSalary)
    },
  )

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

  it('rejects a runtime non-number gross annual salary', () => {
    const input = {
      grossAnnualSalary: '30.000',
      monthlyPayments: 13,
    } as unknown as SalaryCalculationInput

    expect(() => calculateSalary(input)).toThrow(TypeError)
  })

  it('rejects a runtime non-number monthly payment count', () => {
    const input = {
      grossAnnualSalary: 30_000,
      monthlyPayments: '13',
    } as unknown as SalaryCalculationInput

    expect(() => calculateSalary(input)).toThrow(TypeError)
  })
})
