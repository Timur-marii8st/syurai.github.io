# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server at http://localhost:5173
npm run build     # TypeScript check + Vite production build
npm run lint      # ESLint on entire codebase
npm run preview   # Preview production build locally
```

There are no tests in this project.

## Architecture

**Syurai.ai** is a React 19 + React Router 7 portfolio site. All routing is centralized in `src/App.tsx`.

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

`GlobalBackButton` (fixed, top-left) appears on all pages except those listed in `hiddenPaths`. Add a new product/profile path there so it doesn't show a redundant back button alongside the page's own nav.

`ScrollToTop` handles scroll-to-top on every route change automatically.

### Adding Content

**New agent/product:**
1. Create `src/products/NewProductPage.tsx` — accepts `{ onBack: () => void }`
2. Add route in `App.tsx` + add path to `hiddenPaths` in `GlobalBackButton`
3. Add card in `Agents.tsx` grid with `onClick={onNavigateToNewProduct}` — update the Active Agents counter
4. Inject callback in `App.tsx`: `onNavigateToNewProduct={() => navigate('/new-product')}`
5. Extend `AgentsPageProps` interface in `Agents.tsx`

**New research paper:**
1. Create `src/articles/NewPaper.tsx`
2. Add metadata to the `papers` array in `Research.tsx`
3. Add render condition in `Research.tsx`: `{activePaperId === 'new-paper' && <NewPaper />}`

**New team member:**
1. Create `src/team/NewMemberProfile.tsx`
2. Add route, add card in `Team.tsx`, inject callback in `App.tsx`

### Styling Conventions

- **Tailwind utility classes only** — no CSS modules or inline styles beyond Tailwind
- Dark aesthetic: `bg-black`, `bg-[#050505]`, `bg-[#0a0c10]` backgrounds
- Accent colors: amber/gold (`amber-500`) for Motivi-class products, blue/indigo (`blue-400`, `indigo-400`) for enterprise products
- Glassmorphism: `backdrop-blur-md bg-white/10 border border-white/10`
- Hover interactivity: `group` + `group-hover:*` pattern on cards
- Scroll-triggered animations: `FadeInSection` (Intersection Observer, defined locally in each product page)
- Page entry: `animate-in fade-in duration-700` on outermost container

### Key Files

| File | Role |
|------|------|
| `src/App.tsx` | All routes + Home page component + global nav helpers |
| `src/Agents.tsx` | Agent showcase grid — owns `AgentsPageProps` interface |
| `src/products/MotiviPage.tsx` | Reference implementation for a product detail page |
| `src/Research.tsx` | Paper list + conditional rendering of article components |
