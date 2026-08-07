# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite + React + TypeScript frontend for the Syurai site.

- `src/` contains all application code.
- `src/articles/`, `src/products/`, and `src/team/` hold page-level React components by domain.
- `src/components/` contains shared UI pieces (for example, `LanguageSwitcher`).
- `src/contexts/` and `src/i18n/` hold app-wide state and localization resources.
- `src/assets/` and `public/` store static assets (images, SVGs, redirects).
- `.github/workflows/deploy.yml` defines CI/CD deployment to GitHub Pages on pushes to `master`.

Prefer colocating related assets and component files inside the same feature folder when adding new pages.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start local dev server (Vite, default `http://localhost:5173`).
- `npm run build`: run TypeScript build (`tsc -b`) and production bundle.
- `npm run preview`: preview the production build locally.
- `npm run lint`: run ESLint across the repo.

Run `npm run lint` and `npm run build` before opening a PR.

## Coding Style & Naming Conventions
Use TypeScript with strict compiler settings (`strict`, `noUnusedLocals`, `noUnusedParameters` are enabled).

- Indentation: 2 spaces.
- Components/pages: PascalCase file names (for example, `MLClubPage.tsx`).
- Context providers and hooks: descriptive PascalCase / camelCase (`LanguageContext`, `use...`).
- Keep route/page components in domain folders (`articles`, `products`, `team`) and shared primitives in `components`.

Linting is enforced via `eslint.config.js` with `@eslint/js`, `typescript-eslint`, `react-hooks`, and `react-refresh`.

## Testing Guidelines
There is currently no dedicated automated test suite in this repository. For now:

- Treat `npm run lint` + `npm run build` as mandatory validation.
- Manually verify key routes and language switching in `npm run dev`.

If you add tests, place them as `*.test.ts(x)` near the related source file and document the run command in `package.json`.

## Commit & Pull Request Guidelines
Recent commits use short, imperative summaries (for example, `fix i18n type errors`, `add Russian localization`). Keep commit messages concise and focused on one change.

For PRs, include:
- what changed and why;
- screenshots/GIFs for UI changes;
- linked issue (if available);
- validation steps executed (`npm run lint`, `npm run build`).
