# UI Wireframes

## Navigation Structure

- Single route `/`; no application navigation or hidden screens.
- Header anchors: `Calcolatore`, `Metodo`, `Fonti`.
- Footer repeats tax year, disclaimer, and official-source access.

## Key Screens

### Calculator Dashboard

- **Route**: `/`
- **Purpose**: Calculate and understand the estimated net salary for the supported standard case.
- **Desktop layout**:
  1. Compact header with NettoChiaro wordmark and “Anno fiscale 2025” badge.
  2. Hero copy: “Dalla RAL al netto, passaggio per passaggio.”
  3. Calculator card: RAL input, segmented 12/13/14 control, assumptions summary, **Calcola** button.
  4. Results region announced with `aria-live="polite"`: three KPI cards, pre-credit RAL allocation with text legend, separate credits callout, and calculation table.
  5. “Perché questo calcolo” detail cards linked to each breakdown row.
  6. Worked EUR 30,000 example, methodology, limitations, and official sources.
  7. Minimal footer.
- **Mobile layout**: Same reading order in one column; table becomes stacked labeled rows without horizontal scrolling.
- **Actions**: Enter RAL, select payment count, calculate, expand rule details, follow source links, start a new calculation.

### Empty and Error States

- Before calculation, show a neutral sample hint but no fabricated result.
- Invalid input keeps focus on the field, associates the Italian error through `aria-describedby`, and does not clear the prior valid value silently.
- An unexpected calculation error shows a concise recovery message and permits retry.

## User Flows

### Calculate and Inspect

1. Visitor reads the fixed assumptions and enters `30.000`.
2. Visitor keeps 13 mensilità and activates **Calcola**.
3. Focus/viewport moves to the result heading without disorienting animation.
4. Visitor sees annual and average monthly net plus total employee taxes/contributions.
5. Visitor follows the ordered breakdown from RAL to net and expands any rule explanation.
6. Visitor compares the result with the worked example and can open official sources in a new tab.

### Correct an Invalid RAL

1. Visitor submits an empty, malformed, or unsupported value.
2. The form announces one specific error and focuses the RAL field.
3. Visitor corrects the value and calculates without re-entering the payment count.

## Content Rules

- Use “imposte” for IRPEF/addizionali and “contributi” for INPS; do not call every deduction “tasse”.
- Use “netto mensile medio”, never “busta paga mensile”.
- Display positive credits with a plus sign and deductions with a minus sign.
- Partition pre-credit RAL into net, contributions, and taxes; render refundable credits separately so low-income results never produce allocation above 100%.
- Every chart value must also exist as selectable text.
