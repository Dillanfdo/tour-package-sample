# Your Brand Name — Europe tours design pitch

A Next.js prototype with three visual directions for the same travel catalogue. There is no backend. Package data lives in `data/packages.ts`.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page links to each direction.

```bash
npm run build
npm start
```

## Routes

| Path | What it is |
| --- | --- |
| `/` | Chooser with colour swatches |
| `/design-1` | Classic Travel Agency — home |
| `/design-1/packages` | Classic packages, sidebar filters |
| `/design-2` | Modern Editorial — home |
| `/design-2/packages` | Editorial collection, pill filters |
| `/design-3` | Bold & Vibrant — home |
| `/design-3/packages` | Chip filters and list cards |

Each header has **Switch design**, which returns to `/`.

## Folder structure

```
app/
  layout.tsx              root shell and chooser font
  page.tsx                design chooser
  globals.css             Tailwind and the three theme scopes
  design-1/               navy and orange, Poppins + Inter
  design-2/               editorial cream, Playfair Display + DM Sans
  design-3/               dark hero and gradient, Outfit + Manrope
data/packages.ts          packages, destinations, testimonials, stats
lib/                      price format, filters, enquiry validation
```

Visual components stay inside each `design-*` folder (header, footer, cards, filters, enquiry form, image fallback). Designs share only data and helpers.

## Deploy a preview

1. Push the project to GitHub.
2. Import it on [Vercel](https://vercel.com). The framework preset is Next.js; no environment variables are required.
3. Vercel runs `npm run build` and gives you a preview URL.

To preview on a machine you control: `npm run build && npm start`, then share that host.

Images load from `images.unsplash.com`. If one fails, the card shows a gradient instead of a broken image.

Type is loaded with `next/font/local` from `fonts/` (Poppins, Inter, Playfair Display, DM Sans, Outfit, Manrope). The files are the Latin subsets, so `npm run build` does not call Google Fonts.
