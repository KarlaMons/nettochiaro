const ITALIAN_PERCENTAGE_FORMATTER = new Intl.NumberFormat('it-IT', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export function formatPercentage(percentage: number): string {
  return `${ITALIAN_PERCENTAGE_FORMATTER.format(percentage)}%`
}
