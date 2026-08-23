# Validazione

## Copertura automatizzata

La suite Vitest copre:

- contributi ordinari, soglia 56.224 inclusa e 1% soltanto sull’eccedenza;
- scaglioni IRPEF e Lombardia nei punti di confine e oltre i limiti;
- esenzione Milano a 23.000 inclusi e aliquota sull’intero imponibile sopra soglia;
- tutti i confini stretti/inclusivi della detrazione da lavoro (15.000, 25.000, 28.000, 35.000, 50.000), inclusi i 65 euro e la precisione del rapporto;
- tutti i confini del cuneo (20.000, 32.000, 40.000) e l’azzeramento dell’IRPEF netta;
- caso integrato da RAL 30.000, percentuali e riconciliazione `netto + trattenute = RAL`;
- RAL minima/massima incluse, valori fuori intervallo, non finiti e tipi runtime errati;
- parser italiano: formati accettati, separatori di migliaia coerenti e input malformati/ambigui respinti;
- formattazione euro a due decimali solo in output e percentuali in notazione italiana;
- invariante 13/14: tutti i risultati annuali sono identici e cambia soltanto la media mensile;
- adattatore delle formule: ordine, segni, riconciliazione, fonti e descrizioni derivate dagli scaglioni;
- interfaccia: stato iniziale, submit, caso 30.000, media su 14, errori associati e focus, invalidazione di risultati obsoleti, annunci accessibili, disclosure di formule/ipotesi e ripristino del focus.

## Comandi ed esiti IT-03

Eseguiti il 23 agosto 2026 nella branch `feature/ral-netto-2026`:

| Comando | Esito osservato |
|---|---|
| `npm test` | superato: 13 file, 88 test, 0 fallimenti |
| `npm run typecheck` | superato: tutti e tre i progetti TypeScript senza errori |
| `npm run lint` | superato: ESLint senza errori |
| `npm run build` | superato: Vite 8.2.2, 28 moduli trasformati, output statico in `dist/` |
| `npm audit --audit-level=high` | superato: 0 vulnerabilità rilevate |
| `git diff --check` | superato: nessun errore di whitespace |
| `docker build --no-cache -t ral-netto-calculator .` | superato; build multi-stage con `npm ci` e `npm run build`, immagine finale `sha256:29613b559fa6979b71d9b8a293f7e9b8525d07c60acb3696e751d13a427bbfb9` |

I digest degli indici multi-architettura sono stati ricavati e verificati con `docker buildx imagetools inspect`: Node `24.15.0-alpine3.23@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f`; Nginx `1.30.4-alpine3.24@sha256:97d490c12ba55b4946b01546d1c3ed324e8d41ab1c9fcb2a616aa470620e5b46`. Il log di build ha confermato `cap_net_bind_service=ep`; una scansione diagnostica effimera con `getcap -r /` ha restituito soltanto `/usr/sbin/nginx cap_net_bind_service=ep`. Gli strumenti libcap sono poi assenti dall’immagine normale.

Ispezione runtime: `Config.User` è `nginx`; `id` restituisce UID/GID 101. `docker top` mostra master e tutti i worker Nginx come UID 101. PID e cinque directory temporanee sono sotto `/tmp`, scrivibili e di proprietà 101:101. `command -v node`, `command -v npm` e l’elenco pacchetti Alpine non hanno trovato Node/npm/libcap nell’immagine finale. `docker image inspect` ha confermato porta esposta `80/tcp` e health check HTTP su `/healthz`.

Smoke test finale con il solo container `ral-netto-calculator-it03-hardened` su porta host libera `18080`; `nginx -t`, eseguito come utente predefinito non-root, ha confermato sintassi e configurazione valide:

- `/` → HTTP 200, HTML con `Cache-Control: no-store`;
- `/percorso/profondo` → HTTP 200 e contenuto identico alla home (fallback SPA);
- `/healthz` → HTTP 200, `Content-Type: text/plain`, corpo esatto `ok\n`, stato Docker `healthy`;
- asset JavaScript reale con hash → HTTP 200 e `Cache-Control: public, max-age=31536000, immutable`;
- asset inesistente → HTTP 404 con `Cache-Control: no-store`, senza `immutable`;
- home, fallback, health e asset includono CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`; `Server` espone soltanto `nginx`, senza versione;
- il container specifico è stato fermato e rimosso dopo la prova; non è rimasto alcun container con quel nome.

Il root filesystem read-only con `tmpfs` su `/tmp` non è dichiarato verificato: la documentazione corrente dell’App Service EasyPanel non espone questi controlli. È una misura futura subordinata al supporto della piattaforma e alla ripetizione degli smoke test.

## Confronto con fonti esterne

La validazione esterna svolta riguarda esclusivamente la corrispondenza fra costanti/formule e le fonti istituzionali registrate in `src/engine/taxRules2026.ts`: INPS, Gazzetta Ufficiale, Agenzia delle Entrate, Regione Lombardia e Comune di Milano. Il 730/2026, presentato nel 2026 per i redditi 2025, comprova soltanto formula della detrazione da lavoro e convenzione delle prime quattro cifre decimali; la formula è assunta invariata nel perimetro 2026. Il 33% IRPEF applicabile nel 2026 è verificato separatamente sulla legge n. 199/2025. Non è stato effettuato né dichiarato alcun confronto con software paghe, cedolini reali o simulatori commerciali.

## Differenze residue attese

- Il 9,19% è assunto come aliquota ordinaria annua fissa; l’inquadramento reale può modificarla.
- L’1% contributivo è annualizzato, mentre la gestione INPS effettiva opera per periodi/mese.
- I rapporti delle detrazioni mantengono la precisione completa e non seguono il troncamento ufficiale alle prime quattro cifre decimali.
- Il modello non arrotonda ogni voce intermedia come può avvenire nei processi di paga; arrotonda solo la visualizzazione.
- La media su 13/14 non riproduce la distribuzione reale fra mensilità ordinarie e aggiuntive.
- Sono esclusi conguagli, periodi parziali, componenti variabili, situazione personale e casi territoriali/professionali diversi dallo scenario supportato.

Queste differenze spiegano perché il risultato è una proiezione annuale trasparente, non un importo garantito di cedolino.
