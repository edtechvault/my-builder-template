# AGENTS.md

A small, repo-level playbook for AI agents working in this project. Keep it short, concrete, and opinionated. Prefer file‑scoped actions, small diffs, and our established stack.

---

## What is this?
**AGENTS.md** tells any AI agent (Builder.io, Cursor, Claude Code, etc.) how this project works, so it doesn’t rediscover the stack and preferences on every run. Treat this as a README **for agents**: defaults, boundaries, examples, and commands.

Why it matters: without this, agents waste cycles relearning structure and make “almost right” choices (e.g., wrong styling pattern, missing tokens, heavy deps). With this, you get faster, safer, more consistent changes.

---

## Do / Don’t

### Do
- **Builder + React**
  - Use `@builder.io/react` components and **register** all new components in `builder.registry.ts` with clear `inputs`.
- **Styling and tokens**
  - Use **Tailwind + daisyUI tokens only** (`btn-primary`, `bg-base-100`, `text-base-content`, etc.).
  - **No hex colors.**
  - If alpha is needed, use token variables: `hsl(var(--p) / 0.30)` (note the spaces around `/`).
  - If no custom theme exists, assume `data-theme="light"` or `"dark"` only.
- **Interactions & motion**
  - Use **framer-motion** for micro-interactions.
  - For particle backgrounds, use **react-tsparticles** with **tsparticles-slim**.
- **Analytics**
  - Use `analytics/ga.ts` → `track('cta_clicked' | 'pricing_view' | 'form_submit', {...})`.
  - `pricing_view`: fire **once per session** via `IntersectionObserver({threshold≈0.3})`, then `disconnect()`.
- **Data**
  - Use `lib/supabase.ts` for data access and put domain calls behind `services/*` with `types/*` interfaces.
  - Do **not** fetch directly in React components.
- **Architecture**
  - Prefer **small, focused components** and **small diffs**.
  - Components must be **props-driven** (no hard-coded copy or colors).
  - Meet **WCAG AA**: keyboard navigable, visible focus, correct ARIA.
  - Keep **page weight < 2MB**; prefer **WebP/AVIF** with `loading="lazy"`.
- **Performance defaults**
  - Keep particle counts lean (≈25). Defer non-critical scripts if needed.

### Don’t
- Don’t introduce **new hex colors** or non-existent themes.
- Don’t add **heavy dependencies** without approval.
- Don’t use generic `<div>` when semantic elements or existing components apply.
- Don’t run repo‑wide build/tests unless explicitly asked—prefer **file‑scoped** checks first.
- Don’t wire analytics ad‑hoc; always use `track(...)` from `analytics/ga.ts`.

---

## File‑scoped commands (fast loops)
Prefer these per‑file commands to keep feedback loops seconds-long.

```bash
# Type check a single file by path
npm run tsc --noEmit path/to/file.tsx

# Format a single file by path
npm run prettier --write path/to/file.tsx

# Lint a single file by path
npm run eslint --fix path/to/file.tsx

# Unit tests (pick one)
npm run vitest run path/to/file.test.tsx

# Full build ONLY when explicitly requested
npm run build:app
```

**Always** lint, test, and type‑check the files you modify. Use project‑wide builds sparingly.

---

## Safety & permissions

**Allowed without asking:**
- Read/list files
- File‑scoped: `tsc`, `prettier`, `eslint`
- Run a single `vitest` test file

**Ask first:**
- Package installs/updates
- `git push`, deleting files, changing permissions
- Running full build, E2E suites, or long‑running tasks

**Rationale:** Avoid surprises, keep local state safe, and minimize unnecessary network/CI work.

---

## Project structure hints
Short pointers so agents start in the right place.

- Routing/layout: `src/App.tsx` (or `src/routes/*` if present)
- Builder registry: `builder.registry.ts`
- Components (reusable): `components/vault/*`
- Analytics helper: `analytics/ga.ts`
- Data access: `lib/supabase.ts` and domain services in `services/*`
- Shared types: `types/*`
- Styling config: `tailwind.config.js` (daisyUI enabled)
- Entry HTML & GA4 script order: `index.html`

> If a path is missing, propose a minimal PR to add it rather than guessing alternatives.

---

## Good vs. bad examples

**Prefer**
- Functional React components with hooks
- Tokenized styles only: `className="btn btn-primary"` or `hsl(var(--p) / 0.3)`
- Builder-registered, props‑driven blocks (see: `HeroAurora.tsx`, `HeroParticles.tsx`, `PricingTableFancy.tsx`, `FAQAccordionFancy.tsx`, `CTAButtonMagnet.tsx`, `SpotlightTestimonialCard.tsx`)
- Analytics: call `track('cta_clicked', {...})` on CTAs; `pricing_view` via IO threshold once

**Avoid**
- Class‑based components and large “god” components
- Hard‑coded copy/color
- Direct network calls from React components
- Custom HTML chart tooltips when library provides built‑ins

---

## API / data pointers
- Prefer typed clients via `lib/supabase.ts` with narrow `services/*` functions.
- Co-locate DTOs/interfaces in `types/*`.
- Keep React components data‑agnostic; pass props from containers or Builder inputs.

> If additional docs exist under `./api/docs/*.md`, reference them in PRs and keep examples short.

---

## Nested AGENTS.md files
Large repos may add **directory‑local** `AGENTS.md` files for package‑specific guidance (e.g., legacy React 17 vs. React 18). The **nearest** file governs. Keep rules consistent; avoid duplication.

---

## PR checklist
- Title: `feat(scope): short description`
- Lint, type‑check, and tests: **green**
- Diff: small and focused; include a brief rationale
- Remove leftover logs/comments
- For UI changes, attach before/after screenshots or a short Loom

---

## When stuck (plan first)
If uncertain:
- Ask a clarifying question, or
- Propose a short plan, or
- Open a **draft PR** with notes and small diffs (do **not** push large speculative changes)

---

## Optional “test‑first” mode
For trickier tasks:
- Write/update unit tests **first**, then code until green
- Prefer component tests for UI state changes
- For regressions: add a failing test that reproduces the bug, then fix to green

---

## Design system guidance
- Use **daisyUI** component classes where applicable; extend via tokens (no hex).
- If a separate DS package exists (e.g., `@acme/ui`), follow its indexed docs under `./design-system-index/*.md` and use tokens from `@acme/ui/tokens`.

---

## Tool interop
Some tools (e.g., `CLAUDE.md`) may not support `AGENTS.md` yet. Add a simple pointer file at repo root:

```
# CLAUDE.md
Strictly follow the rules in ./AGENTS.md
```

Symlinking to `AGENTS.md` is also acceptable.

---

## Recap
Keep this file **small and evolving**. Each time you see the same mistake twice, add one line here to prevent it a third time. Favor **props-driven**, **tokenized**, **accessible**, and **well‑instrumented** components that are easy to reuse in Builder.

