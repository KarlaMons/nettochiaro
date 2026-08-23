# Style Guide

## Visual System

- **Base Style**: Warm editorial-finance dashboard; light mode only. Avoid glassmorphism and “AI neon” effects.
- **Typography**: `Geist Sans` for UI and tabular numbers; weights 400/500/600/700. Use `font-variant-numeric: tabular-nums` for amounts.
- **Colors**: Canvas `#F6F2E8`, surface `#FFFCF5`, petrol `#123C3A`, deep text `#152624`, muted `#61706D`, lime `#C9F36A`, border `#D9DED6`, error `#B42318`.
- **Spacing**: 4 px base scale; primary gaps 8/12/16/24/32/48/64 px.
- **Border Radius**: 10 px controls, 16 px cards, pill only for badges and segmented controls.
- **Elevation**: One restrained card shadow; hierarchy should come from spacing and contrast.

## Component Patterns

- **Cards**: Opaque warm surface, 1 px border, generous padding; KPI numbers lead visually.
- **Buttons**: Petrol primary with light text and visible hover/focus; secondary outlined. Minimum touch target 44 px.
- **Forms**: Persistent labels, euro affix outside editable text, clear help/error text, no placeholder-only labels.
- **Allocation bar**: Petrol for net, muted blue for INPS, amber/red families for taxes, lime for credits; always pair with legend and values.
- **Tables**: Logical calculation order, right-aligned tabular amounts, plus/minus signs, expandable explanation immediately after its row.
- **Navigation**: Compact top bar with three in-page anchors; no sidebar.

## Responsive Breakpoints

- Mobile: `< 640px`, single column and stacked breakdown rows.
- Tablet: `640–1023px`, two-column KPI grid where space permits.
- Desktop: `>= 1024px`, centered content up to 1180 px and multi-column result summary.

## Accessibility

- Minimum contrast ratio: 4.5:1 (AA)
- Focus indicators on all interactive elements
- Keyboard navigation support
- Respect `prefers-reduced-motion`; transitions are decorative and <= 200 ms.
- Do not rely on color, position, or icons alone to communicate signs and categories.
- Source links have descriptive names; external-link behavior is announced visually and to assistive technology.
