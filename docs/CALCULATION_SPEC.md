# Specifica di calcolo RAL → netto 2026

## Ambito e significato delle voci

La specifica descrive una proiezione annuale per dipendente privato standard, non dirigente, a tempo pieno e indeterminato per tutto il 2026, residente a Milano/Lombardia, con RAL fra 25.000 e 100.000 euro inclusi.

I **contributi previdenziali** sono trattenute destinate alla copertura previdenziale e riducono l’imponibile fiscale; non sono imposte. IRPEF e addizionali sono **imposte**. La detrazione da lavoro dipendente e la detrazione per cuneo sono **detrazioni fiscali previste dalla legge**, sottratte dall’IRPEF lorda: non rappresentano deduzioni dall’imponibile né agevolazioni personali inserite dall’utente. Familiari, spese, altri oneri e trattamento integrativo sono esclusi.

Indichiamo con `R` la RAL e con `I` l’imponibile fiscale.

## Formule e confini

### 1. Contributi del lavoratore

`C = R × 0,0919 + max(0, R − 56.224) × 0,01`

Il 9,19% si applica all’intera RAL. L’1% non si applica a `R ≤ 56.224`; si applica soltanto alla parte strettamente superiore a 56.224 euro.

### 2. Imponibile fiscale

`I = R − C`

### 3. IRPEF lorda

Applicazione progressiva per porzioni di imponibile:

- `I ≤ 28.000`: `I × 0,23`;
- `28.000 < I ≤ 50.000`: `28.000 × 0,23 + (I − 28.000) × 0,33`;
- `I > 50.000`: `28.000 × 0,23 + 22.000 × 0,33 + (I − 50.000) × 0,43`.

Il 33% deriva dalla legge 30 dicembre 2025, n. 199, efficace per il 2026, non dalle istruzioni del modello 730/2026.

### 4. Detrazione per lavoro dipendente

Detrazione base `D`:

- `I ≤ 15.000`: `D = 1.955`;
- `15.000 < I ≤ 28.000`: `D = 1.910 + 1.190 × (28.000 − I) / 13.000`;
- `28.000 < I ≤ 50.000`: `D = 1.910 × (50.000 − I) / 22.000`;
- `I > 50.000`: `D = 0`.

A `D` si sommano 65 euro se, e solo se, `25.000 < I ≤ 35.000`. Quindi 25.000 è escluso e 35.000 è incluso.

### 5. Detrazione per cuneo fiscale

`W` vale:

- `I ≤ 20.000`: `0`;
- `20.000 < I ≤ 32.000`: `1.000`;
- `32.000 < I ≤ 40.000`: `1.000 × (40.000 − I) / 8.000`;
- `I > 40.000`: `0`.

20.000 è escluso dal beneficio; 32.000 è incluso nell’importo pieno; a 40.000 la formula restituisce esattamente zero.

### 6. IRPEF netta

`N = max(0, IRPEF lorda − D − W)`

La detrazione non genera IRPEF negativa.

### 7. Addizionale regionale Lombardia

È progressiva:

- `I ≤ 15.000`: `I × 0,0123`;
- `15.000 < I ≤ 28.000`: `15.000 × 0,0123 + (I − 15.000) × 0,0158`;
- `28.000 < I ≤ 50.000`: quota precedente + `(I − 28.000) × 0,0172`;
- `I > 50.000`: quote precedenti + `(I − 50.000) × 0,0173`.

### 8. Addizionale comunale Milano

- `I ≤ 23.000`: `M = 0`;
- `I > 23.000`: `M = I × 0,008`.

Superata la soglia, lo 0,8% si applica all’intero imponibile, non soltanto all’eccedenza.

### 9. Netto

`imposte totali = N + addizionale regionale + M`

`trattenute totali = C + imposte totali`

`netto annuale = R − trattenute totali`

`media mensile = netto annuale / mensilità`

La scelta fra 13 e 14 non entra in nessun’altra formula e non modifica contributi, imposte o netto annuale.

## Esempio completo: RAL 30.000 euro, 13 mensilità

| Passaggio | Calcolo a precisione completa | Visualizzazione |
|---|---:|---:|
| RAL | 30.000 | 30.000,00 € |
| Contributi | `30.000 × 9,19%` = 2.757 | 2.757,00 € |
| Imponibile | `30.000 − 2.757` = 27.243 | 27.243,00 € |
| IRPEF lorda | `27.243 × 23%` = 6.265,89 | 6.265,89 € |
| Detrazione lavoro | `1.910 + 1.190 × 757 / 13.000 + 65` = 2.044,2946153846153 | 2.044,29 € |
| Detrazione cuneo | 1.000 | 1.000,00 € |
| IRPEF netta | 3.221,5953846153852 | 3.221,60 € |
| Addizionale Lombardia | `15.000 × 1,23% + 12.243 × 1,58%` = 377,9394 | 377,94 € |
| Addizionale Milano | `27.243 × 0,8%` = 217,944 | 217,94 € |
| Imposte totali | 3.817,4787846153854 | 3.817,48 € |
| Trattenute totali | 6.574,478784615385 | 6.574,48 € |
| Netto annuale | 23.425,521215384615 | 23.425,52 € |
| Media su 13 | 1.801,9631704142012 | 1.801,96 € |
| Media su 14 | 1.673,2515153846155 | 1.673,25 € |

La riconciliazione è `23.425,521215384615 + 6.574,478784615385 = 30.000` entro la normale tolleranza floating-point.

## Precisione e visualizzazione

Il motore non arrotonda gli intermedi e conserva la precisione JavaScript. Euro e percentuali vengono formattati in italiano soltanto al confine di presentazione (euro a due decimali). Per scelta deliberata, i rapporti delle detrazioni non vengono troncati alle prime quattro cifre decimali.

Il **Modello 730/2026 viene presentato nel 2026, ma riguarda i redditi del periodo d’imposta 2025**. In questa specifica è usato soltanto come evidenza ufficiale della formula della detrazione per lavoro dipendente e della convenzione di considerare le prime quattro cifre decimali dei relativi rapporti. La formula è riportata nella proiezione 2026 perché, nel perimetro approvato, è assunta invariata. L’aliquota IRPEF nazionale del 33% è invece una regola nuova e indipendente: la sua fonte è la legge 30 dicembre 2025, n. 199, efficace nel 2026.

## Razionale, assunzioni e fonti

Il modello privilegia una stima annuale spiegabile e riconciliabile. Assume 9,19% ordinario annuo e annualizza l’1% aggiuntivo; nella realtà INPS le verifiche avvengono per periodo/mese e aliquota/inquadramento possono variare. Non è una simulazione del cedolino.

- [INPS, Circolare n. 6 del 30 gennaio 2026](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html)
- [Gazzetta Ufficiale, legge 30 dicembre 2025, n. 199, art. 1, comma 3](https://www.gazzettaufficiale.it/eli/id/2025/12/30/25G00212/sg)
- [Agenzia delle Entrate, istruzioni 730/2026 per i redditi 2025, tabella 6, p. 149](https://infoprecompilata.agenziaentrate.gov.it/portale/documents/d/guest/730_istruzioni_2026.pdf)
- [Agenzia delle Entrate, lavoro dipendente e pensioni](https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni)
- [Regione Lombardia, addizionale regionale IRPEF](https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef)
- [Comune di Milano, addizionale comunale IRPEF](https://www.comune.milano.it/aree-tematiche/tributi/addizionale-comunale-irpef)
