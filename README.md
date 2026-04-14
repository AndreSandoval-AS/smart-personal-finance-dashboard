# Smart Personal Finance Dashboard

Beginner-friendly personal finance dashboard built with `Next.js`, `TypeScript`, `Tailwind CSS`, `Chart.js`, and `lucide-react`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the repo into [Vercel](https://vercel.com/new).
3. Deploy with default Next.js settings.

No database setup is required because expenses are stored in browser `localStorage`.

## UI style checklist (2025 dark fintech)

- Use a dark navy base with subtle gradients; avoid pure black surfaces.
- Keep a clear hierarchy: KPI cards first, charts second, detailed table third.
- Apply glass panels only on containers/cards, not on dense data text.
- Keep panel opacity around 55–75% with a thin border and medium blur.
- Use 1 primary + 1 secondary accent color and keep supporting colors muted.
- Make chart scaffolding subtle (gridlines/axes) so data is the visual focus.
- Use off-white text, not pure white for all body labels, to reduce glare.
- Maintain WCAG-friendly contrast, especially in labels, table text, and controls.
- Keep insights short and actionable (observation + suggested behavior).

## Tailwind and chart token set

### CSS variables

Defined in `src/app/globals.css`:

- `--background`, `--foreground`
- `--surface-card`, `--surface-card-strong`, `--surface-border`
- `--text-strong`, `--text-body`, `--text-muted`
- `--accent-primary`, `--accent-cyan`

### Reusable glass utilities

- `.glass-card` for standard dashboard cards
- `.glass-card-strong` for emphasis blocks like AI insights

### Chart tokens

Defined in `src/lib/design-tokens.ts`:

- `chartPalette` for category slices/bars
- `chartTheme` for axis text, legend text, gridline color, and line colors

This keeps visual style centralized so you can update the entire dashboard theme quickly.
