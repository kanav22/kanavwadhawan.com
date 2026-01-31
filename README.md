# Kanav Wadhawan — Resume & Portfolio Site

A production-grade, SEO-optimized resume and portfolio site built with the Next.js App Router. It demonstrates server-first architecture, a typed single-source-of-truth data layer, and a minimal client boundary—suitable as a reference implementation for content-driven marketing or personal-brand sites.

**Value proposition for Tech Leads:** This codebase illustrates how to ship a fast, maintainable content site without a CMS or client-side state library: Server Components handle rendering and metadata, TypeScript modules own all content, and the only client logic is a hydration-safe theme toggle. You get strong SEO (JSON-LD, sitemap, robots, per-page Open Graph), design-system consistency via shadcn/ui and Tailwind, and a clear path to extend with more routes or dynamic content.

---

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Server Components by default** | Pages are server-rendered; no client bundle for static content. Only the theme toggle and shell that depend on `localStorage` / DOM are marked `"use client"`. This reduces JS payload and improves LCP. |
| **Typed data modules over CMS or API** | Profile, experience, and projects live in `src/data/*.ts` as typed exports. A single source of truth keeps metadata, JSON-LD, sitemap, and UI in sync without runtime fetches or env-dependent backends. Content updates are code changes with type safety. |
| **Centralized metadata factory** | `lib/metadata.ts` derives all `Metadata` (title, description, Open Graph, Twitter, canonical, robots) from the profile and page inputs. Every route calls `generatePageMetadata()` so SEO and social cards stay consistent and DRY. |
| **Composition over global state** | No Redux, Zustand, or context beyond theme. Pages compose presentational components and pass data via props from the data layer. State is minimal and explicit. |
| **Minimal client boundary** | The only substantial client component is `ThemeProvider` (theme + `localStorage`). It uses a mounted check before reading `localStorage` and applying theme to avoid hydration mismatch. |
| **shadcn/ui (New York) + Radix** | UI is built from Radix primitives and shadcn’s New York variants. Components are composable, accessible, and styled with Tailwind and CSS variables. Design tokens live in `globals.css` and support light/dark via `@custom-variant dark`. |
| **Static generation for dynamic routes** | Project detail pages use `generateStaticParams()` so all `/projects/[slug]` routes are built at build time. Metadata is generated with `generateMetadata()` per slug. |

---

## Tech Stack

- **Runtime & framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4, PostCSS, tw-animate-css, CSS variables (oklch)
- **UI:** Radix UI (Avatar, Dialog, Separator, Slot), shadcn/ui (New York), class-variance-authority, clsx, tailwind-merge
- **Icons & fonts:** Lucide React, next/font (Geist, Geist Mono)
- **SEO & discoverability:** JSON-LD (Person, WebSite, WebPage, BreadcrumbList), sitemap.xml, robots.txt, per-page Open Graph and Twitter cards
- **Tooling:** ESLint 9, eslint-config-next

---

## Running the Project

**Prerequisites:** Node.js 20+ (or compatible LTS).

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000). Changes hot-reload.

3. **Production build and run**
   ```bash
   npm run build
   npm run start
   ```
   Serves the optimized build on the default port (3000 unless overridden).

4. **Lint**
   ```bash
   npm run lint
   ```

---

## Project Structure (High Level)

- `src/app/` — App Router routes, layouts, `globals.css`, `sitemap.ts`, `robots.ts`
- `src/components/` — React components (navbar, footer, cards, sections, theme provider, JSON-LD)
- `src/components/ui/` — shadcn/ui primitives (Button, Card, Badge, etc.)
- `src/data/` — Typed content: `profile.ts`, `experience.ts`, `projects.ts`
- `src/lib/` — Shared utilities and metadata factory
- `public/` — Static assets (resume PDF, images, logos)

Content and links (profile, experience, projects) are edited in `src/data/`. Metadata and SEO defaults are driven from `src/lib/metadata.ts` and the same data sources.
