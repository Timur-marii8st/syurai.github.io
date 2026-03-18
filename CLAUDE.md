# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint on entire codebase
npm run preview   # Preview production build locally
```

There are no tests in this project. Always run `npm run build` to validate changes (catches TypeScript errors).

## Tech Stack

- **React 19** + **React Router 7** (react-router-dom)
- **TypeScript 5.9** (strict mode)
- **Tailwind CSS 3** (utility-only, no CSS modules)
- **Vite** (via rolldown-vite 7.2.5)
- **Lucide React** for icons
- **ESLint 9** (flat config)
- **SWC** for fast React transforms (`@vitejs/plugin-react-swc`)

## Architecture

**Syurai.ai** is a bilingual (EN/RU) React portfolio site for an AI research company. All routing is centralized in `src/App.tsx`.

### Directory Structure

```
src/
├── App.tsx                    # All routes + Home page + global nav helpers
├── main.tsx                   # Entrypoint: LanguageProvider → BrowserRouter → App
├── Agents.tsx                 # Agent showcase grid (Motivi_AI, Saby-Agent)
├── Research.tsx               # Paper list + conditional article rendering
├── Stack.tsx                  # Tech stack showcase (Python, PyTorch, etc.)
├── Team.tsx                   # Team member grid (Timur, Arjun)
├── MLClubPage.tsx             # ML Club community page
├── EducationPage.tsx          # Education section (coming soon placeholder)
├── products/
│   ├── MotiviPage.tsx         # AI productivity agent detail page
│   └── SabyAgentPage.tsx      # Enterprise procurement agent detail page
├── team/
│   ├── TimurProfile.tsx       # Timur Sabitov — Founder profile
│   └── ArjunProfile.tsx       # Arjun Patel — Lead Systems Engineer profile
├── articles/
│   ├── PsychProfilingPaper.tsx    # "Evaluating Capabilities of Modern LLMs..." (Dec 2025)
│   └── PsychoScopePaper.tsx       # "Do Language Models Build Implicit Psychological Models..." (Feb 2026)
├── components/
│   └── LanguageSwitcher.tsx   # EN/RU toggle
├── contexts/
│   └── LanguageContext.tsx     # i18n context + auto-detection (localStorage → browser lang)
├── i18n/
│   └── translations.ts        # All English + Russian translations
└── assets/                    # Images (webp, avif, png, svg)
```

### Routes

| Path | Component | Back destination |
|------|-----------|-----------------|
| `/` | Home (in App.tsx) | — |
| `/agents` | AgentsPage | `/` |
| `/motivi` | MotiviPage | `/agents` |
| `/saby-agent` | SabyAgentPage | `/agents` |
| `/research` | ResearchPage | `/` |
| `/stack` | StackPage | `/` |
| `/team` | TeamPage | `/` |
| `/team/timur` | TimurProfile | `/team` |
| `/team/arjun` | ArjunProfile | `/team` |
| `/ml-club` | MLClubPage | `/` |
| `/education` | EducationPage | `/` |
| `*` | NotFound (404) | `/` |

### Routing & Navigation

Routes are defined in `App.tsx`'s `<Routes>` block. Every sub-page is wrapped in a standard shell:

```tsx
<Route path="/example" element={
  <div className="min-h-screen bg-black font-sans">
    <ExamplePage onBack={() => navigate('/parent')} />
  </div>
} />
```

Pages do **not** use React Router hooks internally — navigation is injected as callback props (`onBack`, `onNavigateToX`). The parent `App.tsx` wires these via `useNavigate()`.

`GlobalBackButton` (fixed, top-left) appears on all pages except those in `hiddenPaths`:
```
['/', '/motivi', '/saby-agent', '/team/timur', '/team/arjun', '/ml-club']
```
Add new product/profile paths there so they don't show a redundant back button alongside the page's own nav.

`ScrollToTop` handles scroll-to-top on every route change automatically.

### Internationalization (i18n)

- `LanguageContext.tsx` provides `useLanguage()` hook → `{ lang, setLang, t }`
- `Lang` type: `'en' | 'ru'`
- Auto-detects from `localStorage`, falls back to `navigator.language`
- All user-facing strings live in `src/i18n/translations.ts` under namespaced keys (e.g., `t.home.title`, `t.agents.motivi.desc`)
- `LanguageSwitcher` component is rendered globally in `main.tsx`
- **All new user-facing text must be added to both `en` and `ru` in `translations.ts`**

## Adding Content

**New agent/product:**
1. Create `src/products/NewProductPage.tsx` — accepts `{ onBack: () => void }`
2. Add route in `App.tsx` + add path to `hiddenPaths` in `GlobalBackButton`
3. Add card in `Agents.tsx` grid with `onClick={onNavigateToNewProduct}` — update the Active Agents counter (currently `"02"`)
4. Inject callback in `App.tsx`: `onNavigateToNewProduct={() => navigate('/new-product')}`
5. Extend `AgentsPageProps` interface in `Agents.tsx`
6. Add translations for the new product in `src/i18n/translations.ts` (both `en` and `ru`)

**New research paper:**
1. Create `src/articles/NewPaper.tsx`
2. Add metadata to the `papers` array in `Research.tsx` (includes `id`, `title`, `authors`, `date`, `abstract`, `tags`, optional `pdfUrl`)
3. Add render condition in `Research.tsx`: `{activePaperId === 'new-paper' && <NewPaper />}`

**New team member:**
1. Create `src/team/NewMemberProfile.tsx` — accepts `{ onBack: () => void }`
2. Add route in `App.tsx` + add path to `hiddenPaths`
3. Add card in `Team.tsx`, inject navigation callback in `App.tsx`
4. Add translations in `src/i18n/translations.ts`

## Styling Conventions

- **Tailwind utility classes only** — no CSS modules or inline styles beyond Tailwind
- Dark aesthetic: `bg-black`, `bg-[#050505]`, `bg-[#0a0c10]` backgrounds
- Accent color scheme:
  - **Amber/gold** (`amber-500`, `amber-400`) — productivity products (Motivi), founder highlights
  - **Blue/indigo** (`blue-400`, `indigo-400`) — enterprise products (Saby-Agent), engineering profiles
  - **Violet** — ML Club
- Glassmorphism: `backdrop-blur-md bg-white/10 border border-white/10`
- Hover interactivity: `group` + `group-hover:*` pattern on cards
- Scroll-triggered animations: `FadeInSection` (Intersection Observer, defined locally in each product page)
- Page entry: `animate-in fade-in duration-700` on outermost container
- Team photos: grayscale by default → color on hover

## Key Files

| File | Role |
|------|------|
| `src/App.tsx` | All routes + Home page component + global nav helpers |
| `src/Agents.tsx` | Agent showcase grid — owns `AgentsPageProps` interface |
| `src/Research.tsx` | Paper list + conditional rendering of article components |
| `src/products/MotiviPage.tsx` | Reference implementation for a product detail page |
| `src/products/SabyAgentPage.tsx` | Enterprise product page (blue/indigo theme) |
| `src/i18n/translations.ts` | All i18n strings — **must update both `en` and `ru`** |
| `src/contexts/LanguageContext.tsx` | Language detection + context provider |
| `src/main.tsx` | App entrypoint (LanguageProvider → BrowserRouter → App) |
| `tailwind.config.js` | Tailwind config (content paths, no theme extensions) |
| `vite.config.ts` | Vite config (React SWC plugin, base `/`) |
