# Calculation Rules — Italy 2025, Milan Standard Case

## Purpose and Rule Context

This document is the source of truth for the deterministic engine. It explains not only each formula but why its base differs from the previous line. The supported person is employed for all 365 days on a permanent private-sector contract, lives in Milan, and has no other income, dependants, deductions, benefits, or relief.

`RAL` is contribution income. `R` is taxable employment income after employee social-security contributions. All output amounts are rounded to cents; statutory employment-deduction quotients are truncated to four decimals before multiplication.

## 1. Employee Contributions

The prototype assumes the general employee FPLD share of 9.19%. For 2025, an additional employee contribution of 1% applies to pay above EUR 55,448.

```text
base contributions = RAL × 9.19%
additional contribution = max(RAL − 55,448, 0) × 1%
total contributions = base + additional
R = RAL − total contributions
```

Contributions reduce taxable income; they are not IRPEF. Sector-specific rates such as CIGS are outside scope.

## 2. Gross National IRPEF

IRPEF is progressive: each rate applies only to the portion inside its bracket.

```text
23% on R up to 28,000
35% on the portion from 28,000 to 50,000
43% on the portion above 50,000
```

This implements article 1(2) of Law 207/2024, not one rate applied to all income.

## 3. Employment Deduction

The deduction reduces gross IRPEF and cannot create a refund. For 365 employment days:

```text
R ≤ 15,000:        1,955
15,000 < R ≤ 28,000:
  1,910 + 1,190 × trunc4((28,000 − R) / 13,000)
28,000 < R ≤ 50,000:
  1,910 × trunc4((50,000 − R) / 22,000)
R > 50,000:        0
```

Add EUR 65 when `25,000 < R ≤ 35,000`. The permanent-contract minimum of EUR 690 is irrelevant in this full-year case because the calculated low-income deduction is already higher.

## 4. 2025 Tax-Wedge Measures

These measures are separate from the ordinary employment deduction.

For `R ≤ 20,000`, add a non-taxable sum to net pay:

```text
R ≤ 8,500:          R × 7.1%
8,500 < R ≤ 15,000: R × 5.3%
15,000 < R ≤ 20,000:R × 4.8%
```

For `20,000 < R ≤ 40,000`, reduce gross IRPEF with an additional deduction:

```text
20,000 < R ≤ 32,000: 1,000
32,000 < R ≤ 40,000: 1,000 × (40,000 − R) / 8,000
R > 40,000:           0
```

The deduction is capped together with the ordinary deduction at gross IRPEF. The non-taxable sum is instead refundable and is added after taxes.

## 5. Net IRPEF and Integrative Treatment

```text
net IRPEF = max(gross IRPEF − employment deduction − additional deduction, 0)
```

For the supported case, the EUR 1,200 integrative treatment applies only when `R ≤ 15,000` and gross IRPEF exceeds the employment deduction reduced by EUR 75. Between EUR 15,001 and EUR 28,000, entitlement depends on other deductions that the prototype explicitly excludes, so the amount is zero.

## 6. Lombardy Regional Surtax

Apply progressively to `R` using the same bracket method:

```text
1.23% up to 15,000
1.58% from 15,000 to 28,000
1.72% from 28,000 to 50,000
1.73% above 50,000
```

## 7. Milan Municipal Surtax

Milan exempts taxable income up to EUR 23,000. If `R` exceeds that threshold, 0.8% applies to the entire `R`, not only the excess:

```text
R ≤ 23,000: 0
R > 23,000: R × 0.8%
```

This creates a real discontinuity at the exemption boundary and must not be smoothed by the application.

## 8. Final Net and Monthly Average

```text
annual net = RAL
             − total contributions
             − net IRPEF
             − regional surtax
             − municipal surtax
             + non-taxable tax-wedge sum
             + integrative treatment

average monthly net = annual net / selected payments
```

The average does not reproduce withholding timing on individual payslips.

## Worked Example — EUR 30,000, 13 Payments

| Step | Calculation | Amount |
|------|-------------|-------:|
| RAL | Input | EUR 30,000.00 |
| Employee contributions | 30,000 × 9.19% | −EUR 2,757.00 |
| Taxable income `R` | 30,000 − 2,757 | EUR 27,243.00 |
| Gross IRPEF | 27,243 × 23% | −EUR 6,265.89 |
| Employment deduction | 1,910 + bracket amount + EUR 65 | +EUR 2,044.26 |
| Additional 2025 deduction | R between 20,000 and 32,000 | +EUR 1,000.00 |
| Net IRPEF | 6,265.89 − 2,044.26 − 1,000 | −EUR 3,221.63 |
| Lombardy surtax | Progressive regional brackets | −EUR 377.94 |
| Milan surtax | 27,243 × 0.8% | −EUR 217.94 |
| Annual net | Reconciled total | **EUR 23,425.49** |
| Average monthly net | 23,425.49 / 13 | **EUR 1,801.96** |

## Primary Sources

- [Law 30 December 2024, no. 207, article 1(2–9)](https://www.gazzettaufficiale.it/atto/serie_generale/caricaArticolo?art.codiceRedazionale=24G00229&art.dataPubblicazioneGazzetta=2024-12-31&art.flagTipoArticolo=0&art.idArticolo=1&art.idGruppo=1&art.idSottoArticolo=1&art.idSottoArticolo1=10&art.progressivo=1&art.versione=1)
- [INPS 24th Annual Report 2025 — net-income methodology using the 9.19% employee contribution](https://www.inps.it/content/dam/inps-site/pdf/dati-analisi-bilanci/rapporti-annuali/xxiv-rapporto-annuale/RA_XXIV_2025.pdf)
- [INPS circular 26/2025 — additional 1% and EUR 55,448 threshold](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2025.01.circolare-numero-26-del-30-01-2025_14806.html)
- [Lombardy regional IRPEF surtax](https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef)
- [Finance Department — Milan municipal IRPEF surtax, 2025](https://www1.finanze.gov.it/finanze2/dipartimentopolitichefiscali/fiscalitalocale/nuova_addcomirpef/risultato.htm?anno=9999&cc=F205&pr=MI&r=1)
- [Revenue Agency — 2025 employment income and integrative treatment guidance](https://infoprecompilata.agenziaentrate.gov.it/portale/quadro-c-lavoro-dipendente)
