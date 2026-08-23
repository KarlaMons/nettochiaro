import type { SalaryCalculationResult } from '../types/salary'
import {
  EMPLOYEE_CONTRIBUTION_RULE,
  EMPLOYEE_DEDUCTION_RULE,
  IRPEF_BRACKETS,
  LOMBARDY_REGIONAL_TAX_BRACKETS,
  MILAN_MUNICIPAL_TAX_RULE,
  TAX_RULES_2026_SOURCE_METADATA,
  TAX_WEDGE_DEDUCTION_RULE,
} from './taxRules2026'

type RuleSource = (typeof TAX_RULES_2026_SOURCE_METADATA.sources)[keyof typeof TAX_RULES_2026_SOURCE_METADATA.sources]

export type CalculationSign = 'neutral' | 'minus' | 'plus'

export interface CalculationStepDetails {
  readonly base: number
  readonly formula: string
  readonly rule: string
  readonly result: number
  readonly explanation: string
  readonly source: RuleSource
  readonly ruleYear: 2026
}

export interface CalculationStep {
  readonly id: string
  readonly label: string
  readonly value: number
  readonly sign: CalculationSign
  readonly details?: CalculationStepDetails
}

function details(base: number, formula: string, rule: string, result: number, explanation: string, source: RuleSource): CalculationStepDetails {
  return { base, formula, rule, result, explanation, source, ruleYear: 2026 }
}

function formatRate(rate: number) {
  return `${(rate * 100).toLocaleString('it-IT', { maximumFractionDigits: 2 })}%`
}

export function buildCalculationBreakdown(result: SalaryCalculationResult): readonly CalculationStep[] {
  const sources = TAX_RULES_2026_SOURCE_METADATA.sources
  return [
    { id: 'ral', label: 'RAL', value: result.grossAnnualSalary, sign: 'neutral' },
    {
      id: 'contributi', label: 'Contributi previdenziali', value: result.employeeContributions, sign: 'minus',
      details: details(result.grossAnnualSalary, `RAL × ${formatRate(EMPLOYEE_CONTRIBUTION_RULE.ordinaryRate)} + quota aggiuntiva oltre soglia`, `${formatRate(EMPLOYEE_CONTRIBUTION_RULE.ordinaryRate)}; + ${formatRate(EMPLOYEE_CONTRIBUTION_RULE.additionalRate)} sulla parte oltre ${EMPLOYEE_CONTRIBUTION_RULE.additionalRateThreshold.toLocaleString('it-IT')} €`, result.employeeContributions, 'La quota previdenziale a carico del dipendente viene sottratta dalla RAL.', sources.employeeContributions),
    },
    {
      id: 'imponibile', label: 'Imponibile fiscale', value: result.taxableIncome, sign: 'neutral',
      details: details(result.grossAnnualSalary, 'RAL − contributi previdenziali', 'I contributi previdenziali deducibili riducono la base fiscale', result.taxableIncome, 'È la base di reddito sulla quale vengono calcolate IRPEF e addizionali.', sources.employeeContributions),
    },
    {
      id: 'irpef-lorda', label: 'IRPEF lorda', value: result.grossIrpef, sign: 'neutral',
      details: details(result.taxableIncome, 'Somma dell’imposta calcolata progressivamente in ogni scaglione', IRPEF_BRACKETS.map((bracket) => `${formatRate(bracket.rate)} fino a ${Number.isFinite(bracket.upperBound) ? `${bracket.upperBound.toLocaleString('it-IT')} €` : 'oltre 50.000 €'}`).join('; '), result.grossIrpef, 'L’IRPEF lorda applica aliquote crescenti alle sole quote di reddito comprese nei rispettivi scaglioni.', sources.irpef),
    },
    {
      id: 'detrazione-lavoro', label: 'Detrazione lavoro dipendente', value: result.employeeDeduction, sign: 'plus',
      details: details(result.taxableIncome, 'Detrazione base + quota variabile prevista per la fascia di reddito', `Soglie a ${EMPLOYEE_DEDUCTION_RULE.firstThreshold.toLocaleString('it-IT')} €, ${EMPLOYEE_DEDUCTION_RULE.secondThreshold.toLocaleString('it-IT')} € e ${EMPLOYEE_DEDUCTION_RULE.finalThreshold.toLocaleString('it-IT')} €`, result.employeeDeduction, 'Questa detrazione riduce l’IRPEF lorda per il lavoro dipendente svolto per l’intero anno.', sources.employeeDeduction),
    },
    {
      id: 'detrazione-cuneo', label: 'Detrazione cuneo fiscale', value: result.taxWedgeDeduction, sign: 'plus',
      details: details(result.taxableIncome, '1.000 € fino alla soglia piena, poi riduzione proporzionale', `${TAX_WEDGE_DEDUCTION_RULE.fullAmount.toLocaleString('it-IT')} € oltre ${TAX_WEDGE_DEDUCTION_RULE.lowerExclusive.toLocaleString('it-IT')} € e fino a ${TAX_WEDGE_DEDUCTION_RULE.fullAmountUpperInclusive.toLocaleString('it-IT')} €; azzeramento a ${TAX_WEDGE_DEDUCTION_RULE.taperUpperInclusive.toLocaleString('it-IT')} €`, result.taxWedgeDeduction, 'La detrazione aggiuntiva sul cuneo fiscale riduce l’imposta dovuta nella fascia prevista.', sources.taxWedge),
    },
    {
      id: 'irpef-netta', label: 'IRPEF netta', value: result.netIrpef, sign: 'neutral',
      details: details(result.grossIrpef, 'IRPEF lorda − detrazione lavoro dipendente − detrazione cuneo fiscale', 'Il risultato non può essere inferiore a zero', result.netIrpef, 'È l’imposta nazionale dopo le due detrazioni incluse nella simulazione.', sources.irpef),
    },
    {
      id: 'regionale', label: 'Addizionale regionale', value: result.regionalTax, sign: 'minus',
      details: details(result.taxableIncome, 'Somma dell’addizionale calcolata progressivamente per scaglioni lombardi', LOMBARDY_REGIONAL_TAX_BRACKETS.map((bracket) => formatRate(bracket.rate)).join(' · '), result.regionalTax, 'L’addizionale regionale della Lombardia si applica all’imponibile fiscale per scaglioni.', sources.regionalTax),
    },
    {
      id: 'comunale', label: 'Addizionale comunale', value: result.municipalTax, sign: 'minus',
      details: details(result.taxableIncome, `Imponibile fiscale × ${formatRate(MILAN_MUNICIPAL_TAX_RULE.rate)}`, `Esenzione fino a ${MILAN_MUNICIPAL_TAX_RULE.exemptionThreshold.toLocaleString('it-IT')} €; oltre la soglia, aliquota sull’intero imponibile`, result.municipalTax, 'Per un residente a Milano oltre la soglia, l’aliquota comunale si applica all’intero imponibile.', sources.municipalTax),
    },
    { id: 'netto', label: 'Netto annuale', value: result.annualNetSalary, sign: 'neutral' },
  ]
}
