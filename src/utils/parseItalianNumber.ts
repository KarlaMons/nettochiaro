const ITALIAN_NUMBER_PATTERN =
  /^(?:\d+|\d{1,3}([.\u00a0 ])\d{3}(?:\1\d{3})*)(?:,\d+)?$/

export function parseItalianNumber(input: string): number {
  if (typeof input !== 'string') {
    throw new TypeError('Italian number input must be a string')
  }

  const trimmedInput = input.trim()
  const euroSymbolCount = [...trimmedInput].filter(
    (character) => character === '€',
  ).length
  const withoutCurrency = trimmedInput
    .replace(/^€\s*/, '')
    .replace(/\s*€$/, '')
    .trim()

  if (
    withoutCurrency.length === 0 ||
    euroSymbolCount > 1 ||
    !ITALIAN_NUMBER_PATTERN.test(withoutCurrency)
  ) {
    throw new TypeError('Invalid Italian number format')
  }

  const normalizedValue = withoutCurrency
    .replace(/[.\u00a0 ]/g, '')
    .replace(',', '.')
  const parsedValue = Number(normalizedValue)

  if (!Number.isFinite(parsedValue)) {
    throw new TypeError('Invalid Italian number format')
  }

  return parsedValue
}
