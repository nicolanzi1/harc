# Health Assured - Frontend Tech Task for Junior and Middleweight Developer Role

Single-page React app that **groups resources by category** on first load, with:
- **Details on click** (accessible modal: ESC/overlay close, focus restore)
- **Filter by title/tags**
- **Sort categories** (Default / A-Z / Z-A)

## Stack & rationale
- Vite + React + TypeScript - fast DX, minimal scaffolding
- Tailwind - quick, consistent UI
- Vitest + React Testing Library - TDD-friendly component testing
- ESLint - Prettier - code quality and formatting

## Getting started
```
npm i
npm run dev        # http://localhost:5173
npm run test       # watch mode
npm run test:run   # CI mode
npm run lint       # Run ESLint static analysis on .ts/.tsx; fails on any warnings (max-warnings=0)
npm run typecheck  # Run TypeScript compiler in "noEmit" mode to verify types without building
```

## Build & preview
```
npm run build       # creates production bundle in /dist
npm run preview     # serves /dist (default: http://localhost:4173) 
```

## Key decisions
- Grouped layout meets the brief; category badges on each card give context
- Modal a11y: role="dialog", aria-modal, ESC/overlay close, initial focus + restore
- Filtering and sorting: lightweight state + memorized transforms; no global state lib

## Tests
- App.test.tsx - renders all categories with correct card counts
- Filter.test.tsx - filters by title/tags; hides empty categories; "No results" live region
- ResourceInteractions.test.tsx - modal opens on click, close on ESQ
- SortCategories.test.tsx - reorders sections (Default / A-Z / Z-A)
- utils/group.test.ts - grouping utility correctness

## Accessibility
- Semantic landmarks (header, main, sections with labelled headings)
- Live region for "No results"
- Keyboard support (Enter to open, ESC/overlay close)
- Focus management inside modal (initial focus + return)

## What I'd do with more time
- Focus trap inside the modal; return focus to the triggering card
- Image skeletons and error fallbacks
- CI workflow, preview deply (Vercel/Netlify)
- Storybook for isolated component docs
- Visual regression tests (e.g., Playwright)