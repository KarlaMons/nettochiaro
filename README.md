# Jet HR — dalla RAL al netto 2026

Un revisore Jet HR può usare questa applicazione per trasformare una RAL in una stima trasparente del netto annuale e della media mensile. Il risultato non è una “scatola nera”: contributi, imponibile, IRPEF, detrazioni e addizionali sono riconciliati riga per riga.

**Demo:** Da aggiungere dopo il deployment

## Scenario supportato

Il calcolo rappresenta un dipendente privato standard, non dirigente, a tempo indeterminato e pieno, occupato per tutto il 2026 e residente a Milano/Lombardia. Accetta RAL da 25.000 a 100.000 euro, estremi inclusi, e 13 o 14 mensilità.

Non gestisce periodi di lavoro parziali, altri comuni o regioni, dirigenti, apprendisti, part-time, premi e fringe benefit, altri redditi, familiari a carico, detrazioni o deduzioni personali, trattamento integrativo, conguagli, bonus, agevolazioni individuali o dettagli del singolo cedolino.

L’utente inserisce la RAL e sceglie 13 o 14 mensilità. Ottiene netto annuale, media mensile, imposte, contributi, percentuali sulla RAL e dettaglio delle formule. La scelta 13/14 **non cambia alcun valore annuale**: cambia soltanto `netto annuale / mensilità`. Le mensilità mostrate sono quindi medie; i cedolini reali non sono tutti uguali.

## Sequenza di calcolo

Tutti gli importi intermedi conservano la piena precisione; i centesimi sono applicati solo in visualizzazione.

1. **Contributi del lavoratore** = `RAL × 9,19% + max(0, RAL − 56.224) × 1%`.
2. **Imponibile fiscale** = `RAL − contributi`.
3. **IRPEF lorda**, progressiva sull’imponibile: 23% fino a 28.000 euro inclusi; 33% sulla parte oltre 28.000 e fino a 50.000 inclusi; 43% sulla parte oltre 50.000.
4. **Detrazione per lavoro dipendente** sull’imponibile `I`:
   - `I ≤ 15.000`: 1.955 euro;
   - `15.000 < I ≤ 28.000`: `1.910 + 1.190 × (28.000 − I) / 13.000`;
   - `28.000 < I ≤ 50.000`: `1.910 × (50.000 − I) / 22.000`;
   - `I > 50.000`: zero;
   - si aggiungono 65 euro solo se `25.000 < I ≤ 35.000`.
5. **Detrazione per cuneo fiscale**: zero per `I ≤ 20.000`; 1.000 euro per `20.000 < I ≤ 32.000`; `1.000 × (40.000 − I) / 8.000` per `32.000 < I ≤ 40.000`; zero oltre 40.000.
6. **IRPEF netta** = `max(0, IRPEF lorda − detrazione lavoro − detrazione cuneo)`.
7. **Addizionale regionale Lombardia**, progressiva: 1,23% fino a 15.000 euro; 1,58% da oltre 15.000 a 28.000; 1,72% da oltre 28.000 a 50.000; 1,73% oltre 50.000.
8. **Addizionale comunale Milano**: zero per `I ≤ 23.000`; se `I > 23.000`, 0,8% applicato all’intero imponibile.
9. **Netto annuale** = `RAL − contributi − IRPEF netta − addizionale regionale − addizionale comunale`.
10. **Media mensile** = `netto annuale / 13` oppure `/ 14`.

La specifica completa, inclusi confini e caso da 30.000 euro, è in [docs/CALCULATION_SPEC.md](docs/CALCULATION_SPEC.md).

## Fonti e scelte deliberate

- [INPS, Circolare n. 6/2026](https://www.inps.it/it/it/inps-comunica/atti/circolari-messaggi-e-normativa/dettaglio.circolari-e-messaggi.2026.01.circolare-numero-6-del-30-01-2026_15151.html): soglia contributiva aggiuntiva 2026.
- [Legge 30 dicembre 2025, n. 199, art. 1, comma 3](https://www.gazzettaufficiale.it/eli/id/2025/12/30/25G00212/sg): aliquota IRPEF 2026 del 33% nel secondo scaglione.
- [Agenzia delle Entrate, istruzioni 730/2026, tabella 6, p. 149](https://infoprecompilata.agenziaentrate.gov.it/portale/documents/d/guest/730_istruzioni_2026.pdf): modello presentato nel 2026 per i redditi 2025, usato soltanto come fonte ufficiale della formula della detrazione da lavoro e della convenzione delle prime quattro cifre decimali. La formula è assunta invariata nella proiezione 2026 approvata; il 33% IRPEF 2026 è invece documentato separatamente dalla legge n. 199/2025.
- [Agenzia delle Entrate, lavoro dipendente e pensioni](https://infoprecompilata.agenziaentrate.gov.it/portale/semplificata-mod-lavoro-dipendente-e-pensioni): detrazione per cuneo fiscale.
- [Regione Lombardia, addizionale regionale IRPEF](https://www.regione.lombardia.it/bollo-auto-e-tributi-regionali/red-addizionale-regionale-irpef) e [Comune di Milano, addizionale comunale IRPEF](https://www.comune.milano.it/aree-tematiche/tributi/addizionale-comunale-irpef).

Il prototipo assume il 9,19% come aliquota ordinaria annua costante e annualizza anche l’1% aggiuntivo, sebbene la contribuzione INPS reale sia verificata per periodo/mese e possa dipendere dall’inquadramento. Non applica la convenzione ufficiale di troncamento dei rapporti alle prime quattro cifre decimali: mantiene la precisione numerica completa. È una proiezione annuale, non un motore paghe o un cedolino.

## Architettura

È una SPA React 19 + Vite 8 in TypeScript rigoroso, interamente client-side: nessun backend, database, account, segreto, API fiscale o calcolo AI. Le formule pure e le fonti sono esclusivamente in `src/engine/`; `src/App.tsx` rende il risultato e `src/utils/` gestisce parsing e formato. Vitest e Testing Library coprono engine e interfaccia. La build statica è servita da Nginx in un’immagine Docker multi-stage priva di runtime Node.

Requisiti locali: Node.js 24.15.x (il progetto accetta anche Node 26+), npm 11+, Docker solo per la verifica del container.

```bash
npm ci
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
```

La build finisce in `dist/`. Per il container:

```bash
docker build -t ral-netto-calculator .
docker run --rm -p 8080:80 ral-netto-calculator
curl http://localhost:8080/healthz
```

## Deploy su EasyPanel

1. Creare un **App Service** e collegare il repository GitHub.
2. Impostare la directory radice del build sulla root del repository.
3. Scegliere il builder **Dockerfile** e il percorso `Dockerfile`.
4. Configurare la porta target interna `80`; non servono variabili d’ambiente.
5. Collegare il dominio, abilitare HTTPS e il certificate resolver offerto dall’istanza EasyPanel.
6. Avviare il deploy, controllare build log e runtime log.
7. Verificare `https://<dominio>/healthz` (HTTP 200, testo `ok`), la home e un percorso profondo per il fallback SPA.

Questi sono passaggi operativi documentati: il repository non esegue alcuna azione esterna né contiene una configurazione EasyPanel proprietaria.

## Possibili evoluzioni

Estensione a comuni/regioni selezionabili, altri profili contributivi, lavoro parziale, detrazioni personali, conguagli e confronto fra scenari; prima di aggiungerli occorrono nuove regole ufficiali, ipotesi esplicite e test di confine.

## Avvertenza

La stima è informativa e semplificata. Non costituisce consulenza fiscale, previdenziale o del lavoro e non sostituisce il calcolo del datore di lavoro, del consulente o dell’amministrazione finanziaria.
