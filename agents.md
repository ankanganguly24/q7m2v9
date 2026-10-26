# Agent Rulebook: Zero-Drift & Clean Code Contract

> **Status:** Binding project contract. Validate every file creation, edit, and refactor against these rules.

## Project layout and paths

This project follows the root-level layout established by its HLD: `app/`, `components/`, `features/`, and `dummy/`. The submitted addendum's `@/src/...` paths map to `@/...` in this repository; do not introduce a `src/` wrapper.

## Architecture and specifications

1. Keep `app/` files as routing shells. Each `page.tsx` stays under 30 lines and renders feature components only.
2. Keep domain logic inside `features/[feature-name]/`. Each feature exposes its supported entry points through `features/[feature-name]/index.ts`. Import other features only through their public API; do not deep-import another feature's component, hook, type, or utility.
3. Hoist components or hooks shared by multiple features into `components/` or `lib/`.
4. Read `docs/hld.md` before changing global layout, routing, data flow, or state boundaries. Read `docs/features/[feature-name].md` before changing a feature. Update the relevant spec before implementing architectural or UX changes. Do not add fields or flows outside the spec.
5. Keep shared mock data, metrics, labels, UI copy, and fixtures in `dummy/`; import them into components. Do not embed mock datasets or user-facing copy in UI components.

## TypeScript and clean code

1. Ban `any` and loose casts. Use explicit props, state, return, and mock-data types. Avoid non-null assertions unless a runtime assertion guarantees the value.
2. Prefer readonly data and immutable transformations. Do not mutate arrays or objects in place, including `.push()` and `.splice()`.
3. Components have one responsibility. Split components that exceed roughly 120 lines. Export reusable prop types. Keep complex state, event handling, and data processing in co-located hooks or utilities.
4. Avoid spreading broad props into components except for thin UI primitives. Avoid inline callbacks in large list renders; use stable handlers where that improves clarity.
5. Name components and their files in PascalCase; hooks and utilities in camelCase; types in PascalCase without an `I` prefix; and directories in kebab-case.
6. Prefer guard clauses and explicit loading, empty, and error states where the interface can enter those states.

## Design and styling

1. Use Tailwind utilities and shadcn primitives, with semantic design tokens from `tailwind.config.ts` / the configured theme. Never add inline hex colors or arbitrary style values unless the feature specification requires them.
2. Keep the Modo Energy inspired interface crisp and information-dense: clear hierarchy, restrained color, subtle borders, legible tables, and tight radiuses.
3. Do not place styling parameters, random strings, or mock content directly in components when they belong in theme tokens or `dummy/`.

## Next.js version guidance

Before using an unfamiliar Next.js API or convention, consult the matching guide under `node_modules/next/dist/docs/` and follow its deprecation notices.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
