import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import App from './App'
import * as salaryEngine from './engine/calculateSalary'
import { SUPPORTED_GROSS_ANNUAL_SALARY } from './engine/taxRules2026'

const title = 'Dalla RAL al netto, con i calcoli in chiaro'
const supportedRalRange = `${SUPPORTED_GROSS_ANNUAL_SALARY.minimum.toLocaleString('it-IT')} e ${SUPPORTED_GROSS_ANNUAL_SALARY.maximum.toLocaleString('it-IT')}`
const rangeError = `Inserisci una RAL compresa tra ${supportedRalRange} euro.`

async function submitWithSalary(value: string, payments: 13 | 14 = 13) {
  const user = userEvent.setup()
  const input = screen.getByRole('textbox', { name: /retribuzione annua lorda/i })
  await user.clear(input)
  if (value) await user.type(input, value)
  if (payments === 14) {
    await user.click(screen.getByRole('radio', { name: /14 mensilità/i }))
  }
  await user.click(screen.getByRole('button', { name: 'Calcola il netto' }))
  return { input, user }
}

describe('App', () => {
  it('renders the exact introduction and initial form without calculating', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument()
    expect(
      screen.getByText(
        'Inserisci la retribuzione annua lorda e ottieni una proiezione del netto annuale e mensile per un dipendente residente a Milano.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Regole fiscali 2026')).toBeInTheDocument()
    expect(screen.getByText('Scenario standard Milano')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /retribuzione annua lorda/i })).toHaveValue('30.000')
    expect(screen.getByRole('radio', { name: /13 mensilità/i })).toBeChecked()
    expect(screen.queryByText('Netto annuale stimato')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('announces a concise result in the persistent status region', async () => {
    render(<App />)
    const status = screen.getByRole('status')

    await userEvent.click(screen.getByRole('button', { name: 'Calcola il netto' }))

    expect(screen.getByRole('status')).toBe(status)
    expect(status).toHaveTextContent(/Calcolo completato.*23\.425,52\s€/)
  })

  it('calculates and renders the reconciled 30,000 reference case', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'Calcola il netto' }))

    const results = screen.getByRole('region', { name: /risultato della simulazione/i })
    expect(within(results).getByText('Netto annuale stimato')).toBeInTheDocument()
    expect(within(results).getByText(/23\.425,52\s€/)).toBeInTheDocument()
    expect(within(results).getByText(/1\.801,96\s€/)).toBeInTheDocument()
    expect(within(results).getByText(/3\.817,48\s€/)).toBeInTheDocument()
    expect(within(results).getByText(/2\.757,00\s€/)).toBeInTheDocument()
    expect(
      within(results).getByText(
        'Media calcolata su 13 mensilità. I cedolini effettivi possono variare.',
      ),
    ).toBeInTheDocument()

    const breakdown = screen.getByRole('region', {
      name: 'Come siamo arrivati a questo risultato',
    })
    const terms = within(breakdown).getAllByRole('term').map((term) => term.textContent)
    expect(terms).toEqual([
      'RAL',
      'Contributi previdenziali',
      'Imponibile fiscale',
      'IRPEF lorda',
      'Detrazione lavoro dipendente',
      'Detrazione cuneo fiscale',
      'IRPEF netta',
      'Addizionale regionale',
      'Addizionale comunale',
      'Netto annuale',
    ])
    expect(within(breakdown).getByText(/\+ 2\.044,29\s€/)).toBeInTheDocument()
    expect(within(breakdown).getByText(/\+ 1\.000,00\s€/)).toBeInTheDocument()
    expect(within(breakdown).getByText(/− 2\.757,00\s€/)).toBeInTheDocument()
    const composition = screen.getByRole('img', { name: /Netto:/ })
    expect(composition).toHaveAccessibleName(expect.stringContaining('78,1%'))
    expect(composition.getAttribute('aria-label')).not.toMatch(/\d+\.\d+%/)
    expect(composition.tagName).toBe('svg')
    const rectangles = composition.querySelectorAll('rect')
    expect(rectangles).toHaveLength(3)
    expect(rectangles[0]).toHaveClass('composition-segment', 'net')
    expect(rectangles[0]).toHaveAttribute('x', '0')
    expect(Number(rectangles[0]?.getAttribute('width'))).toBeCloseTo(78.0850707)
    expect(rectangles[1]).toHaveClass('composition-segment', 'contributions')
    expect(Number(rectangles[1]?.getAttribute('x'))).toBeCloseTo(78.0850707)
    expect(Number(rectangles[1]?.getAttribute('width'))).toBeCloseTo(9.19)
    expect(rectangles[2]).toHaveClass('composition-segment', 'taxes')
    expect(Number(rectangles[2]?.getAttribute('x'))).toBeCloseTo(87.2750707)
    expect(Number(rectangles[2]?.getAttribute('width'))).toBeCloseTo(12.7249293)
    expect(document.querySelector('[style]')).not.toBeInTheDocument()
  })

  it('keeps annual results unchanged and shows the precise 14-payment average', async () => {
    render(<App />)
    await submitWithSalary('30000', 14)

    const results = screen.getByRole('region', { name: /risultato della simulazione/i })
    expect(within(results).getByText(/23\.425,52\s€/)).toBeInTheDocument()
    expect(within(results).getByText(/1\.673,25\s€/)).toBeInTheDocument()
    expect(
      screen.getByText(
        'Media calcolata su 14 mensilità. I cedolini effettivi possono variare.',
      ),
    ).toBeInTheDocument()
  })

  it('invalidates the displayed result immediately when the RAL changes', async () => {
    render(<App />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Calcola il netto' }))
    expect(screen.getByText('Netto annuale stimato')).toBeInTheDocument()

    await user.type(screen.getByRole('textbox', { name: /retribuzione annua lorda/i }), '0')

    expect(screen.queryByText('Netto annuale stimato')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })

  it('invalidates the displayed result when payments change until resubmission', async () => {
    render(<App />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Calcola il netto' }))

    await user.click(screen.getByRole('radio', { name: /14 mensilità/i }))

    expect(screen.queryByText('Netto annuale stimato')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
    await user.click(screen.getByRole('button', { name: 'Calcola il netto' }))
    expect(screen.getByText('Netto annuale stimato')).toBeInTheDocument()
    expect(screen.getByText(/Media calcolata su 14 mensilità/)).toBeInTheDocument()
  })

  it.each([
    ['', 'Inserisci la RAL.'],
    ['trentamila', 'Inserisci un importo numerico valido.'],
    ['-30000', 'Inserisci una RAL maggiore di zero.'],
    [String(SUPPORTED_GROSS_ANNUAL_SALARY.minimum - 1), rangeError],
    [String(SUPPORTED_GROSS_ANNUAL_SALARY.maximum + 1), rangeError],
  ])('rejects invalid RAL %j with an associated error and no results', async (value, error) => {
    const calculateSpy = vi.spyOn(salaryEngine, 'calculateSalary')
    render(<App />)
    const { input } = await submitWithSalary(value)

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveFocus()
    expect(input.getAttribute('aria-describedby')).toContain('ral-error')
    expect(document.getElementById('ral-error')).toHaveTextContent(error)
    expect(screen.queryByText('Netto annuale stimato')).not.toBeInTheDocument()
    expect(calculateSpy).not.toHaveBeenCalled()
    calculateSpy.mockRestore()
  })

  it.each([
    SUPPORTED_GROSS_ANNUAL_SALARY.minimum,
    SUPPORTED_GROSS_ANNUAL_SALARY.maximum,
  ])('accepts the centralized supported RAL boundary %s', async (value) => {
    render(<App />)

    const { input } = await submitWithSalary(String(value))

    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(screen.getByText(`Importo annuo lordo tra ${supportedRalRange} euro.`)).toBeInTheDocument()
    expect(screen.getByText('Netto annuale stimato')).toBeInTheDocument()
  })

  it('expands a formula with source metadata and updates disclosure semantics', async () => {
    render(<App />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Calcola il netto' }))

    const button = screen.getByRole('button', { name: 'Mostra formula: Contributi previdenziali' })
    expect(screen.getByRole('button', { name: 'Mostra formula: Imponibile fiscale' })).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveAccessibleName('Nascondi formula: Contributi previdenziali')
    const panel = document.getElementById(button.getAttribute('aria-controls') ?? '')
    expect(panel).toHaveTextContent('Base di calcolo')
    expect(panel).toHaveTextContent('Regola 2026')
    expect(within(panel as HTMLElement).getByRole('link')).toHaveAttribute('href', expect.stringMatching(/^https:\/\//))
  })

  it('toggles assumptions coherently and restores focus after the close control', async () => {
    render(<App />)
    const user = userEvent.setup()
    const trigger = screen.getByRole('button', { name: 'Vedi le ipotesi utilizzate' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)

    const assumptions = screen.getByRole('region', { name: 'Cosa considera questa proiezione' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAccessibleName('Nascondi le ipotesi utilizzate')
    expect(assumptions).toHaveFocus()
    expect(within(assumptions).getByRole('heading', { name: 'Incluso' })).toBeInTheDocument()
    expect(within(assumptions).getByRole('heading', { name: 'Non incluso' })).toBeInTheDocument()

    await user.click(within(assumptions).getByRole('button', { name: 'Chiudi' }))
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('region', { name: 'Cosa considera questa proiezione' })).not.toBeInTheDocument()
  })
})
