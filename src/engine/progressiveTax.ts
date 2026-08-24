export interface ProgressiveTaxBracket {
  readonly upperBound: number
  readonly rate: number
}

export function calculateProgressiveTax(
  income: number,
  brackets: readonly ProgressiveTaxBracket[],
): number {
  let tax = 0
  let lowerBound = 0

  for (const bracket of brackets) {
    const taxableInBracket = Math.max(
      0,
      Math.min(income, bracket.upperBound) - lowerBound,
    )
    tax += taxableInBracket * bracket.rate

    if (income <= bracket.upperBound) {
      break
    }
    lowerBound = bracket.upperBound
  }

  return tax
}
