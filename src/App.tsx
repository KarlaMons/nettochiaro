import { type FormEvent, useEffect, useRef, useState } from 'react'

import { buildCalculationBreakdown, type CalculationStep } from './engine/buildCalculationBreakdown'
import { calculateSalary } from './engine/calculateSalary'
import {
  SUPPORTED_GROSS_ANNUAL_SALARY,
  TAX_RULES_2026_SOURCE_METADATA,
} from './engine/taxRules2026'
import type { MonthlyPayments, SalaryCalculationResult } from './types/salary'
import { buildPercentageSegments } from './utils/buildPercentageSegments'
import { formatCurrency } from './utils/formatCurrency'
import { formatPercentage } from './utils/formatPercentage'
import { parseItalianNumber } from './utils/parseItalianNumber'

const minimumSupportedRal = SUPPORTED_GROSS_ANNUAL_SALARY.minimum.toLocaleString('it-IT')
const maximumSupportedRal = SUPPORTED_GROSS_ANNUAL_SALARY.maximum.toLocaleString('it-IT')
const supportedRalRange = `${minimumSupportedRal} e ${maximumSupportedRal}`
const RANGE_ERROR = `Inserisci una RAL compresa tra ${supportedRalRange} euro.`

function validateRal(value: string): { amount?: number; error?: string } {
  if (!value.trim()) return { error: 'Inserisci la RAL.' }
  if (/^\s*(?:€\s*)?-/.test(value)) return { error: 'Inserisci una RAL maggiore di zero.' }
  try {
    const amount = parseItalianNumber(value)
    if (amount <= 0) return { error: 'Inserisci una RAL maggiore di zero.' }
    if (
      amount < SUPPORTED_GROSS_ANNUAL_SALARY.minimum ||
      amount > SUPPORTED_GROSS_ANNUAL_SALARY.maximum
    ) {
      return { error: RANGE_ERROR }
    }
    return { amount }
  } catch {
    return { error: 'Inserisci un importo numerico valido.' }
  }
}

function signedCurrency(step: CalculationStep) {
  const prefix = step.sign === 'minus' ? '− ' : step.sign === 'plus' ? '+ ' : ''
  return `${prefix}${formatCurrency(step.value)}`
}

function FormulaDisclosure({ step }: { step: CalculationStep }) {
  const [open, setOpen] = useState(false)
  if (!step.details) return null
  const panelId = `formula-${step.id}`
  const source = step.details.source

  return (
    <div className="formula-disclosure">
      <button className="text-button" type="button" aria-label={`${open ? 'Nascondi' : 'Mostra'} formula: ${step.label}`} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((current) => !current)}>
        {open ? 'Nascondi formula' : 'Mostra formula'}
      </button>
      {open && (
        <div className="formula-panel" id={panelId}>
          <dl>
            <div><dt>Base di calcolo</dt><dd>{formatCurrency(step.details.base)}</dd></div>
            <div><dt>Formula</dt><dd>{step.details.formula}</dd></div>
            <div><dt>Aliquota o soglia</dt><dd>{step.details.rule}</dd></div>
            <div><dt>Risultato</dt><dd>{formatCurrency(step.details.result)}</dd></div>
          </dl>
          <p>{step.details.explanation}</p>
          <p className="formula-source"><strong>Regola {step.details.ruleYear}:</strong>{' '}<a href={source.url} target="_blank" rel="noreferrer">{source.authority} — {source.title}</a></p>
        </div>
      )}
    </div>
  )
}

function Results({ result }: { result: SalaryCalculationResult }) {
  const steps = buildCalculationBreakdown(result)
  const segments = [
    { label: 'Netto', value: result.annualNetSalary, percentage: result.netRatePercentage, className: 'net' },
    { label: 'Contributi', value: result.employeeContributions, percentage: result.contributionRatePercentage, className: 'contributions' },
    { label: 'Imposte', value: result.totalTaxes, percentage: result.taxRatePercentage, className: 'taxes' },
  ]
  const segmentGeometry = buildPercentageSegments(segments.map(({ percentage }) => percentage))

  return (
    <div className="results-stack">
      <section className="results-card" aria-labelledby="results-title">
        <div className="section-heading-row">
          <div><p className="eyebrow">La tua stima</p><h2 id="results-title">Risultato della simulazione</h2></div>
          <span className="result-status">Calcolo aggiornato</span>
        </div>
        <div className="kpi-grid">
          <article className="kpi kpi-primary"><p>Netto annuale stimato</p><strong>{formatCurrency(result.annualNetSalary)}</strong></article>
          <article className="kpi"><p>Netto mensile medio</p><strong>{formatCurrency(result.averageMonthlyNetSalary)}</strong></article>
          <article className="kpi"><p>Imposte annuali</p><strong>{formatCurrency(result.totalTaxes)}</strong></article>
          <article className="kpi"><p>Contributi previdenziali</p><strong>{formatCurrency(result.employeeContributions)}</strong></article>
        </div>
        <p className="monthly-note">Media calcolata su {result.monthlyPayments} mensilità. I cedolini effettivi possono variare.</p>
      </section>

      <section className="card composition" aria-labelledby="composition-title">
        <p className="eyebrow">Composizione della RAL</p><h2 id="composition-title">Dove va la retribuzione annua</h2>
        <svg className="composition-bar" role="img" aria-label={segments.map((segment) => `${segment.label}: ${formatCurrency(segment.value)}, ${formatPercentage(segment.percentage)}`).join('; ')} viewBox="0 0 100 12" preserveAspectRatio="none">
          {segments.map((segment, index) => <rect key={segment.label} className={`composition-segment ${segment.className}`} x={segmentGeometry[index]?.x} y="0" width={segmentGeometry[index]?.width} height="12" />)}
        </svg>
        <ul className="legend">{segments.map((segment) => <li key={segment.label}><span className={`legend-dot ${segment.className}`} aria-hidden="true" /><span><strong>{segment.label}</strong><small>{formatCurrency(segment.value)} · {formatPercentage(segment.percentage)}</small></span></li>)}</ul>
      </section>

      <section className="card breakdown" aria-labelledby="breakdown-title">
        <p className="eyebrow">Riconciliazione annuale</p><h2 id="breakdown-title">Come siamo arrivati a questo risultato</h2>
        <dl className="breakdown-list">{steps.map((step) => <div className={`breakdown-row ${step.id === 'netto' ? 'total-row' : ''}`} key={step.id}><dt>{step.label}</dt><dd className={`amount sign-${step.sign}`}>{signedCurrency(step)}</dd>{step.details && <dd className="breakdown-detail"><FormulaDisclosure step={step} /></dd>}</div>)}</dl>
      </section>
    </div>
  )
}

function App() {
  const [ral, setRal] = useState('30.000')
  const [payments, setPayments] = useState<MonthlyPayments>(13)
  const [error, setError] = useState<string>()
  const [result, setResult] = useState<SalaryCalculationResult>()
  const [assumptionsOpen, setAssumptionsOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const assumptionsRef = useRef<HTMLElement>(null)
  const assumptionsTriggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { if (assumptionsOpen) assumptionsRef.current?.focus() }, [assumptionsOpen])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = validateRal(ral)
    if (validation.error || validation.amount === undefined) {
      setError(validation.error)
      setResult(undefined)
      setAnnouncement('')
      inputRef.current?.focus()
      return
    }
    setError(undefined)
    const nextResult = calculateSalary({ grossAnnualSalary: validation.amount, monthlyPayments: payments })
    setResult(nextResult)
    setAnnouncement(`Calcolo completato. Netto annuale stimato: ${formatCurrency(nextResult.annualNetSalary)}.`)
  }

  function invalidateResult() {
    setResult(undefined)
    setAnnouncement('')
  }

  function closeAssumptions() {
    setAssumptionsOpen(false)
    assumptionsTriggerRef.current?.focus()
  }

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      <header className="hero"><div className="page-width hero-content"><div className="badges"><span>Regole fiscali 2026</span><span>Scenario standard Milano</span></div><h1>Dalla RAL al netto, con i calcoli in chiaro</h1><p>Inserisci la retribuzione annua lorda e ottieni una proiezione del netto annuale e mensile per un dipendente residente a Milano.</p></div></header>
      <main className="page-width main-content">
        <section className="card calculator-card" aria-labelledby="calculator-title">
          <div className="form-intro"><p className="eyebrow">Calcolatore</p><h2 id="calculator-title">Inserisci i dati</h2><p>Bastano RAL e numero di mensilità. Non salviamo né inviamo i dati inseriti.</p></div>
          <form noValidate onSubmit={handleSubmit}>
            <div className="field-group"><label htmlFor="ral">Retribuzione annua lorda (RAL)</label><p className="field-hint" id="ral-hint">Importo annuo lordo tra {supportedRalRange} euro.</p><div className={`input-shell ${error ? 'has-error' : ''}`}><span aria-hidden="true">€</span><input ref={inputRef} id="ral" name="ral" type="text" inputMode="decimal" autoComplete="off" value={ral} aria-invalid={error ? 'true' : 'false'} aria-describedby={`ral-hint${error ? ' ral-error' : ''}`} onChange={(event) => { setRal(event.target.value); invalidateResult(); if (error) setError(undefined) }} /></div>{error && <p className="field-error" id="ral-error" role="alert">{error}</p>}</div>
            <fieldset><legend>Numero di mensilità</legend><div className="segmented-control">{([13, 14] as const).map((value) => <label key={value}><input type="radio" name="payments" value={value} checked={payments === value} onChange={() => { setPayments(value); invalidateResult() }} /><span>{value} mensilità</span></label>)}</div></fieldset>
            <div className="scenario-summary"><strong>Scenario applicato</strong><span>Dipendente privato, tempo pieno, residente a Milano per tutto il 2026.</span></div>
            <button ref={assumptionsTriggerRef} className="assumptions-link" type="button" aria-expanded={assumptionsOpen} aria-controls="assumptions" onClick={() => setAssumptionsOpen((current) => !current)}>{assumptionsOpen ? 'Nascondi le ipotesi utilizzate' : 'Vedi le ipotesi utilizzate'}</button>
            <button className="primary-button" type="submit">Calcola il netto</button>
          </form>
        </section>
        {result && <Results result={result} />}
        {assumptionsOpen && <section className="card assumptions" id="assumptions" ref={assumptionsRef} tabIndex={-1} aria-labelledby="assumptions-title"><div className="section-heading-row"><div><p className="eyebrow">Perimetro del calcolo</p><h2 id="assumptions-title">Cosa considera questa proiezione</h2></div><button className="text-button" type="button" onClick={closeAssumptions}>Chiudi</button></div><div className="assumptions-grid"><div><h3>Incluso</h3><ul><li>Regole fiscali 2026</li><li>Dipendente privato non dirigente, a tempo indeterminato e pieno, per 365 giorni</li><li>Residenza fiscale a Milano, Lombardia</li><li>Contributi previdenziali del dipendente</li><li>Detrazione per lavoro dipendente e detrazione cuneo fiscale previste</li></ul></div><div><h3>Non incluso</h3><ul><li>Trattamento integrativo e RAL inferiori a {minimumSupportedRal} o superiori a {maximumSupportedRal} euro</li><li>Anno parziale, part-time o variazioni di CCNL e contribuzione</li><li>Familiari a carico, detrazioni personali o aggiuntive e altri redditi</li><li>Voci di cedolino, ratei, saldi, conguagli e dichiarazione 730</li></ul></div></div></section>}
        <section className="card sources" aria-labelledby="sources-title"><p className="eyebrow">Trasparenza</p><h2 id="sources-title">Fonti ufficiali</h2><p>Regole efficaci per il {TAX_RULES_2026_SOURCE_METADATA.taxYear}, verificate il 23 agosto 2026.</p><ul>{Object.values(TAX_RULES_2026_SOURCE_METADATA.sources).map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><strong>{source.authority}</strong><span>{source.title}{source.instrument ? ` — ${source.instrument}` : ''}</span></a></li>)}</ul></section>
      </main>
      <footer className="page-width disclaimer">Questa simulazione fornisce una proiezione annuale basata sulle regole fiscali 2026 e sulle ipotesi dichiarate. Non costituisce un cedolino né una consulenza fiscale. Gli importi mensili effettivi possono variare.</footer>
    </>
  )
}

export default App
