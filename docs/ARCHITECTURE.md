# Architecture

Marketing site for the agency, built as a static Next.js 16 App Router app
(Turbopack). Everything below is a contract: a file's location tells you what
it may depend on and who may depend on it.

## Folder contract

| Path | Holds | Must never hold |
| --- | --- | --- |
| `src/app/` | Routing shell only: layouts, pages, and the framework conventions (`error`, `not-found`, `global-error`, `sitemap`, `robots`, `opengraph-image`, `icon`). | Content literals, reusable UI, browser state. |
| `src/app/(marketing)/` | The public routes. All six render as static HTML. | — |
| `src/app/(marketing)/services/[slug]/sections/` | Client leaves used by exactly one route (`feature-grid`, `pricing-tiers`). | Anything reused elsewhere — move it to `src/components/`. |
| `src/components/layout/` | Chrome shared by every route: `site-header/`, `site-footer`, `section-header`, `social-icons`, `menu-toggle-icon`. | Page-specific copy blocks. |
| `src/components/sections/` | Page-level blocks that a route composes (hero, gallery, calculator, contact grid). | Routing decisions, `<head>` data. |
| `src/components/effects/` | Visual primitives (parallax, border glow, marquee, loaders). | Agency content, business data. |
| `src/components/mockups/` | Device / map frames. | Data fetching. |
| `src/components/providers/` | Client wrappers mounted by layouts (page transition). | Content. |
| `src/components/ui/` | Generic shadcn/Base UI primitives. | Any knowledge of this business. |
| `src/config/` | Deployment facts: `SITE`, `OG_IMAGE`, `absoluteUrl()`. | Content, JSX. |
| `src/data/` | Every piece of site content, typed, re-exported from `data/index.ts`. | JSX, components. |
| `src/lib/` | Pure helpers: `utils`, `navigation` (derives nav from data), `metadata` (one metadata shape). | Side effects, React. |
| `src/styles/` | Cross-cutting CSS: `tokens`, `base`, `utilities`. | Component selectors. |
| `src/types/` | Shared TypeScript contracts. | Values. |
| `public/` | Static files, referenced only through `src/data/assets.ts`. | — |
| `docs/`, `scripts/` | Contracts and guardrails for humans and CI. | — |

## Dependency direction

```
app  →  sections  →  layout / effects / mockups  →  ui
 ↑            ↑             ↑
 └────────  data / types / lib / config  ─────────┘
```

Read downward only. `ui` never imports `sections`; `data` never imports a
component; `lib` and `config` import nothing from `components`. A new module
that needs to sit against this arrow is a signal that it is really two modules.

## Why content lives in `src/data`

The same registry (`data/services/*`) drives the nav menu, the home page cards,
the `/services/[slug]` pages, the sitemap and the 404 page. Editing a division's
description or adding a tier is a data change with no component touched, and
`generateStaticParams` cannot drift from the menu because both read one source.
Asset paths are declared once in `data/assets.ts`, so a file move in `public/`
is a one-line change instead of a repo-wide grep.

## Static asset layout (`public/`)

```
public/
├─ brand/          mark.avif, wordmark.avif
├─ clients/        <client-slug>.avif — reserved for real client logos; empty
│                  until one is handed over (see wordmark note below)
├─ icons/          <industry-slug>.avif — the 12 target-client segments
├─ imagery/        tantangan, solusi, web, system, tangan-leptop, border-leptop
├─ media/          bc.mp4 (ambient loop), h.mp4 (hero loop)
└─ services/
   ├─ web-studio/   Web-Studio.avif + case-study images
   └─ system-lab/   System-Lab.avif + POS demo video
```

- **Names are slugs**: lowercase, hyphens, no spaces and no `&`. That is not
  style — `/_next/image` answers `400 "The requested resource isn't a valid
  image"` for a `url=` containing an encoded space or ampersand, which is how
  the old `public/icon/"Kafe & Coffee Shop.avif"` set failed. `data/industries.ts`
  no longer derives a filename from a display title; `INDUSTRY_ICONS` lists
  every icon as a full literal.
- **Nothing is composed at runtime.** Every value in `data/assets.ts` is a
  complete literal, because `scripts/check-assets.ts` reads source text instead
  of executing it. Prefix + name concatenation is invisible to that guard.
- **`npm run check:assets`** fails (exit 1) when a local asset literal in `src/`
  has no matching file under `public/`, listing `path <- file:line`. It also
  lists `public/` files that nothing references — a warning only, so a reserved
  asset can exist deliberately.
- **Portfolio covers are optional.** `PORTFOLIO_THUMBS` is a `Partial` map:
  a project with no real screenshot has no entry, and `LaptopMockup` then
  renders only its video instead of requesting a `poster` that does not exist.
  Adding cover art = drop the file in `public/`, add one line to
  `PORTFOLIO_THUMBS`. Inventing placeholder imagery is not allowed.
- **The client logo strip has no files at all.** `data/clients.ts` supplies
  display names, sectors and brand accents, and
  `components/sections/client-logos.tsx` renders them as text wordmarks — no
  client handed over a logo file, and a literal path to one would fail
  `npm run check:assets`. When real logos arrive: `public/clients/<slug>.avif`,
  one full literal per file in `data/assets.ts`, then swap the wordmark for
  `<Image />` in the tile.
- **External URLs stay out of the registry** (Supabase video files, Unsplash
  testimonial avatars, the Google Maps embed). They belong to the data module
  that uses them and are not verifiable from the filesystem. The partner strip
  (`data/partners.ts`, keyed by slug in `PARTNER_STRIPS`) is the same case:
  third-party tech-brand logo URLs rendered by
  `components/sections/logo-carousel.tsx`. It deliberately sits outside the
  `Service` object — the home page ships `SERVICES` to a client card, so a
  field there would send every logo URL to routes that never render them. Move
  them local by dropping SVGs in `public/tech-logos/`, registering each full
  literal in `data/assets.ts`, then pointing `src` at `"/..."`.

## Why routes stay server components

Pages are prerendered: `/`, `/portfolio`, `/pricing`, `/kontak` and both service
pages ship 74–186 KB of real markup, so first paint and crawlers never wait for
JS. `"use client"` is pushed down to leaves (heroes, galleries, calculators,
nav) and the only client files inside `src/app` are the error boundaries, which
the framework requires. `useSearchParams` was removed from the transition
provider for exactly this reason — it forced every route to bail out to client
side rendering.

## CSS ownership

- `src/app/globals.css` is a 10-line manifest. No rules live in it.
- Cross-cutting CSS goes in `src/styles/{tokens,base,utilities}.css`.
- Anything owned by a single component sits next to it and is imported by that
  component: `effects/parallax-cosmic.css`, `effects/border-glow/border-glow.css`,
  `effects/ripple-pulse-loader.css`, `sections/faq-scroller.css`,
  `sections/client-logos.css`, `sections/logo-carousel.css`. Next ships
  these only to the routes that import the component, which is why moving rules
  out of the global sheet also shrinks every page's stylesheet.
- Hand-written rules stay **unlayered** (except the `@layer utilities` block),
  so they outrank Tailwind's layered utilities. Do not wrap `base.css` or the
  component sheets in `@layer` — it silently inverts that precedence.
- There is no `keyframes.css`: every `@keyframes` in the original sheet turned
  out to be either owned by one component (moved beside it) or unreferenced
  (deleted).

## Font / CDN trade-off (deliberate, not finished work)

`src/styles/base.css` loads the display face from a third party:

```css
@import url("https://fonts.cdnfonts.com/css/product-sans");
```

- **Why it stays remote:** "Product Sans" is a Google-proprietary face, not on
  Google Fonts, and no licensed copy of the files exists in this repo. The
  plan's preferred fix — `next/font/local` with the woff2 files in
  `public/fonts/` — needs someone to supply those files first.
- **What it costs:** one render-blocking, third-party request on every page,
  plus availability risk outside our control.
- **Ordering constraint:** `@import "../styles/base.css"` must remain the
  **first** import in `globals.css`. Once Tailwind expands `@import "tailwindcss"`
  into real rules, a nested `@import url()` that lands after them is dropped
  from the bundle without a build error — the font then silently falls back.
  Verified by checking that the emitted stylesheet still starts with the
  `fonts.cdnfonts.com` import.
- **Escape hatch:** when the files are available, add them to `public/fonts/`,
  register the face with `next/font/local` in `app/layout.tsx`, and delete the
  `@import` from `base.css`.
