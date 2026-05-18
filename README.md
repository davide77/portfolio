# Starter kit

Opinionated Next.js 16 + TypeScript + Sass starter pre-wired with the conventions used across the projects in this Documents folder.

## What is in this kit

```
starter-kit/
  CLAUDE.md                       Project instructions for Claude Code (rules below)
  brand.md                        Fillable brand source-of-truth (positioning, voice, colours, type)
  package.json                    Next.js 16, React 19, TypeScript, Sass
  tsconfig.json
  next.config.ts
  next-env.d.ts
  eslint.config.mjs
  .gitignore

  .claude/
    settings.local.json           Empty allow list (extend per project)
    skills/
      brand-guidelines/SKILL.md   Visual brand styling (defers to brand.md)
      brand-voice/SKILL.md        Voice and copy auditing (defers to brand.md)
      scss-utility-architecture/SKILL.md   Token + utility + BEM conventions

  src/
    app/
      layout.tsx
      page.tsx
    components/
      Button.tsx
      Button.module.scss
      cx.ts                       Conditional className helper
    styles/
      main.scss
      abstracts/                  Maps + accessor functions, NO CSS output
        _index.scss               @forwards the layer
        _breakpoints.scss         bp(name) viewport map
        _spacers.scss             spacer(n) scale
        _colors.scss              $theme-colors + color() + .bg-/.is-/.has-border- utilities
        _typography.scss          font stacks, font-size/weight/line-height maps + accessors
        _variables.scss           radii, transitions, focus ring, z-index
        _mixins.scss              min/max media, focus-ring, flex-center
      base/                       Element-level resets and defaults
        _index.scss
        _reset.scss
        _base.scss                emits the gap, text-size, font-weight, leading utilities
        _headings.scss
        _measures.scss            margin/padding utility classes (responsive)
      layout/
        _index.scss
        _container.scss
      utilities/
        _index.scss
        _flex.scss                .is-flex / is-justify- / is-align- / responsive variants
        _display.scss
        _radius.scss
        _sr-only.scss             screen-reader only + skip-link
      components/
        _index.scss               Empty starter

  public/                         Static assets (favicon etc.)
```

## How to use

```bash
# 1. Copy this folder for the new project
cp -r starter-kit ~/Documents/my-new-project

# 2. Initialise git
cd ~/Documents/my-new-project
git init
git add .
git commit -m "Initial commit"

# 3. Replace the {{PLACEHOLDERS}}
#    - Edit brand.md (positioning, voice, colours, type)
#    - Edit CLAUDE.md (search for {{PROJECT_NAME}})
#    - Edit package.json (rename "name")
#    - Edit src/styles/abstracts/_colors.scss with the brand palette
#    - Edit src/styles/abstracts/_typography.scss with the brand fonts
#    - Edit src/app/layout.tsx (load fonts via next/font)

# 4. Install and run
npm install
npm run dev
```

## Project conventions (already wired)

- **Token-driven SCSS:** every colour, spacer, font-size, etc. goes through a map and accessor function. See [src/styles/abstracts](src/styles/abstracts).
- **Utility-first JSX:** layout, spacing, text size, colour live as classes in JSX, not as component SCSS. See [CLAUDE.md](CLAUDE.md) "Utility classes over component SCSS".
- **No inline styles:** except for framer-motion `MotionValue`s and per-instance CSS custom properties.
- **No em-dashes or en-dashes:** anywhere, in code or copy. Plain hyphens only.
- **No AI co-author trailer:** in commits or PR bodies.
- **BEM CSS modules:** every component has a sibling `.module.scss` file.

## Optional modules (copy in when needed)

These are not pre-wired to keep the starter lean. Add per project:

| Module | Add when | Reference |
| --- | --- | --- |
| Stripe + payments | Selling something | `cheamsportsfc` |
| Drizzle + MySQL | Need a relational DB | `cheamsportsfc` |
| Better Auth | Need authenticated users | `cheamsportsfc` |
| Playwright | Want E2E tests | `cheamsportsfc` |
| framer-motion | Want animation | `striver.football`, `origin-social-club` |
| `gray-matter` + markdown content | Long-form content / blog | `striver.football` |
| `@vercel/og` | Need OG image generation | `striver.football`, `cheamsportsfc` |

## Next.js 16 heads-up

Next.js 16 changed several conventions vs 15: Turbopack is the default, `params` are async, `middleware.ts` was renamed to `proxy.ts`, and `next lint` was removed (use `eslint` directly). Read the upgrade notes before touching framework-level config.
