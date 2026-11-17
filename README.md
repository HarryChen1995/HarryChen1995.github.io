# Hanlin Chen — Portfolio

A React + TypeScript portfolio with a dark Linear-inspired visual system, subtle motion, project storytelling, and live public GitHub repository data.

## Run locally

Requirements: Node.js 18+

```bash
npm install --include=dev
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Customize

- Main content and project data: `src/App.tsx`
- Visual design: `src/styles.css`
- Resume: `public/resume.pdf`
- GitHub repository feed: currently reads the public GitHub REST API for `HarryChen1995`.

The GitHub repository section is intentionally resilient to API rate limits: if the API is unavailable, the direct GitHub profile link remains available.

## Deploy

Pushing to `main` automatically builds the site and publishes the generated `dist/` directory to the `gh-pages` branch using GitHub Actions. The repository’s Pages source should be set to **Deploy from a branch**, using `gh-pages` and `/(root)`. The Vite base path is `/`, appropriate for the `HarryChen1995.github.io` user site.

To build locally, run `npm run build`; the production site is written to `dist/`.


The hero and About sections use your supplied portrait (`public/profile-photo.png`). The visual theme is a brighter, light-mode take on the original Linear-inspired layout.
