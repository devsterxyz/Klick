# Akira — Design System Documentation

A complete reference for the visual language, typography, color system, spacing, and interaction patterns used in the Akira Next.js starter kit.

---

## 1. Design Philosophy

Akira follows a **brutalist-minimal** aesthetic — a raw, engineering-forward style with sharp edges, monospaced type, dashed borders, and precise grid lines. It deliberately avoids softness: no border-radius on interactive elements, no gradients on backgrounds. The visual tone is precise, technical, and slightly retro-futuristic — evoking a developer tool rather than a polished consumer product.

Key design principles:
- **No rounded corners on interactive UI** — buttons and cards use `rounded-none`
- **Grid-based structure** — the layout is scaffolded with explicit vertical and horizontal border lines
- **Dashed borders** as a primary decorative motif on interactive elements
- **Corner bracket** accents (4 small L-shaped marks at corners) replace traditional card borders
- **Reveal-on-hover** — most detail is hidden by default and fades in on interaction
- **Dark/light parity** — both themes are fully supported via CSS custom properties

---

## 2. Color System

Colors are defined in `src/app/globals.css` using OKLCH color space and CSS custom properties. The palette is deliberately **achromatic** (zero chroma) — pure blacks, whites, and grays — with a single accent color for destructive states.

### Light Theme (`:root`)

| Token | OKLCH Value | Approximate Hex | Usage |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | `#ffffff` | Page background |
| `--foreground` | `oklch(0.145 0 0)` | `#1a1a1a` | Primary text |
| `--card` | `oklch(1 0 0)` | `#ffffff` | Card background |
| `--card-foreground` | `oklch(0.145 0 0)` | `#1a1a1a` | Card text |
| `--primary` | `oklch(0.205 0 0)` | `#252525` | Primary buttons, key UI |
| `--primary-foreground` | `oklch(0.985 0 0)` | `#fbfbfb` | Text on primary |
| `--secondary` | `oklch(0.97 0 0)` | `#f7f7f7` | Secondary buttons/surfaces |
| `--secondary-foreground` | `oklch(0.205 0 0)` | `#252525` | Text on secondary |
| `--muted` | `oklch(0.97 0 0)` | `#f7f7f7` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.556 0 0)` | `#737373` | Subdued text, labels |
| `--accent` | `oklch(0.97 0 0)` | `#f7f7f7` | Accent hover surfaces |
| `--border` | `oklch(0.922 0 0)` | `#ebebeb` | Borders, dividers |
| `--input` | `oklch(0.922 0 0)` | `#ebebeb` | Input borders |
| `--ring` | `oklch(0.708 0 0)` | `#b3b3b3` | Focus rings |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `~#e5483a` | Error states, destructive actions |

### Dark Theme (`.dark`)

| Token | OKLCH Value | Approximate Hex | Usage |
|---|---|---|---|
| `--background` | `oklch(0.145 0 0)` | `#1a1a1a` | Page background |
| `--foreground` | `oklch(0.985 0 0)` | `#fbfbfb` | Primary text |
| `--card` | `oklch(0.205 0 0)` | `#252525` | Card background |
| `--primary` | `oklch(0.922 0 0)` | `#ebebeb` | Primary UI (inverted) |
| `--primary-foreground` | `oklch(0.205 0 0)` | `#252525` | Text on primary |
| `--muted` | `oklch(0.269 0 0)` | `#363636` | Muted surfaces |
| `--muted-foreground` | `oklch(0.708 0 0)` | `#b3b3b3` | Subdued text |
| `--border` | `oklch(1 0 0 / 10%)` | `rgba(255,255,255,0.10)` | Borders in dark mode |
| `--input` | `oklch(1 0 0 / 15%)` | `rgba(255,255,255,0.15)` | Input borders |
| `--destructive` | `oklch(0.704 0.191 22.216)` | `~#f26a58` | Error (brighter in dark) |

### Chart Colors (used in data visualization)

Light: warm amber (`chart-1`), teal (`chart-2`), muted navy (`chart-3`), golden yellow (`chart-4`, `chart-5`).  
Dark: vivid violet, green, amber, purple, red-orange.

---

## 3. Typography

### Font Stack

Three typefaces are loaded via `next/font/google` (Geist package) and exposed as CSS variables:

| Variable | Font | Usage |
|---|---|---|
| `--font-geist-sans` / `font-sans` | **Geist Sans** | Body text, UI labels, prose, cards |
| `--font-geist-mono` / `font-mono` | **Geist Mono** | Code snippets, technical data (schema fields, provider names, prices) |
| `--font-geist-pixel-square` / `font-pixel-square` | **Geist Pixel Square** | Branding, hero headings, nav logo, footer — the distinctive "retro" voice |

All three fonts are applied to `<body>` as CSS variables via:
```
className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelSquare.variable} antialiased`}
```

### Type Scale & Usage

| Element | Size | Weight | Font | Notes |
|---|---|---|---|---|
| Hero `<h1>` ("Akira") | `text-4xl` → `text-6xl` | — | `font-pixel-square` | Responsive: 36px → 60px |
| Section title (cards) | `20px` | `font-bold` | `font-sans` | `tracking-tight`, `leading-tight` |
| Nav logo | Default | — | `font-pixel-square` | Brand identity |
| Footer text | `text-sm` | — | `font-pixel-square` | All footer copy |
| Tech grid labels | `10px` | — | `font-pixel-square` | `tracking-widest uppercase` |
| Card category label | `8px` | — | `font-sans` | `uppercase tracking-[0.2em]` |
| Card body copy | `9px` | — | `font-sans` | `leading-relaxed` |
| Schema/data rows | `8px` | — | `font-mono` | Provider names, prices, DB fields |
| CTA links in cards | `9px` | `font-medium` | `font-sans` | |
| Badge text | Default | `font-light` | `font-sans` | `<HeroBadge>` |
| Sign-in heading | `text-3xl` | `font-bold` | `font-sans` | |
| Sign-in sub-text | `text-sm` | — | `font-sans` | `text-muted-foreground` |
| Button text (hero) | Default (`text-sm`) | — | `font-sans` | `h-8 px-3 py-1` |

### Tracking & Leading Conventions

- Section labels use extreme letter-spacing: `tracking-[0.2em]` (20% of font size)
- Tech grid names use `tracking-widest` (Tailwind's widest preset)
- Card headings use `tracking-tight` to counteract the bold weight
- Body copy uses `leading-relaxed` for readability at small sizes

---

## 4. Spacing & Layout

### Layout Architecture

The page is structured as a **3-column grid** at `xl` breakpoints:

```
[Ladder aside] [Main content — max-w-7xl] [Ladder aside]
```

- Center column: `max-w-7xl`, bordered with `border-x`
- Ladder asides: decorative hatched backgrounds, hidden below `xl`
- Nav height: `--nav-height: 4rem` (64px)
- Footer height: `--footer-height: 3.75rem` (60px)

### Border Radius Scale

Defined via CSS variables from a `--radius` base of `0.625rem` (10px):

| Token | Value | Tailwind class |
|---|---|---|
| `--radius-sm` | `0.375rem` (6px) | `rounded-sm` |
| `--radius-md` | `0.5rem` (8px) | `rounded-md` |
| `--radius-lg` | `0.625rem` (10px) | `rounded-lg` |
| `--radius-xl` | `0.875rem` (14px) | `rounded-xl` |
| `--radius-2xl` | `1.125rem` (18px) | `rounded-2xl` |
| `--radius-3xl` | `1.375rem` (22px) | `rounded-3xl` |
| `--radius-4xl` | `1.625rem` (26px) | `rounded-4xl` |

> **Important:** Despite these tokens existing, interactive components (buttons, cards, inputs) deliberately use `rounded-none`. The radius scale is available for utility but goes intentionally unused in the core UI.

---

## 5. Component Patterns

### Buttons

All buttons follow the same signature pattern:

```
rounded-none  overflow-hidden  border-dashed  relative
h-8 px-3 py-1  (compact) or  h-10 (full-width)
```

**Corner bracket decoration** — four `<span>` elements placed at absolute corners create L-shaped bracket marks instead of a full border:

```html
<span class="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
<span class="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
<span class="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
<span class="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
```

**Shine sweep effect** — a skewed translucent overlay that plays an animation on group hover:

```html
<span class="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg]
             bg-linear-to-r from-transparent via-white/50 to-transparent" />
```

**Arrow reveal on hover** — right arrow icons start at `w-0 opacity-0` and transition to `w-4 opacity-100` on hover, creating an expanding chevron effect.

### Cards (Micro-Hero Cards)

All three feature cards share:

- Fixed height `h-[214px]`, max-width `max-w-[380px]`
- `border border-border` with `overflow-hidden`
- Corner bracket decorators (10px size, start at `border-foreground/30`, transition to full `border-foreground` on hover)
- Shine sweep overlay at `z-20`
- Motion entrance animation: `opacity: 0 → 1`, `y: 20 → 0`, staggered by `0.1s` per card
- Interior content is revealed on `group-hover` with staggered `transitionDelay` per element

### Badge

```
variant="outline"  border  rounded (default shadcn)
```

Contains an animated live-dot with two synchronized keyframe animations:
- `ping-sequence`: two-pulse ping at intervals
- `rotate-sequence`: diamond/square rotation from 0° → 45° → 90°

### Grid Dividers

The tech grid and layout use explicit SVG/CSS grid lines:
- Vertical rules: `border-l border-border` positioned at percentage widths
- Horizontal rules: `border-t border-border` at midpoints
- Intersection dots: `<Square>` icons with `fill-background stroke-border` and small circles (`rounded-full border border-border bg-background`) at key junctions

---

## 6. Animation System

The project uses **Motion** (Framer Motion v12) for entrance animations, with the following conventions:

### Standard Entrance (cards, sections)

```js
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

Cards are staggered: delay `0`, `0.1`, `0.2`.

### Tech Grid Fade-in (`tech-fade-in` keyframe)

```css
@keyframes tech-fade-in {
  from { opacity: 0; transform: translateY(12px) scale(0.98); filter: blur(2px); }
  to   { opacity: 1; transform: translateY(0) scale(1);      filter: blur(0px); }
}
```

Applied to each tech item with `i * 70ms` stagger.

### Shine Sweep (`shine` keyframe)

```css
@keyframes shine {
  0%   { left: -50%; top: -20%; }
  100% { left: 150%; top: 20%;  }
}
```

Triggers on `group:hover .shine` with `0.9s ease-out` and `0.3s delay`.

### Hover Micro-interactions

- Arrow icons: `transition-all duration-200` — width/opacity expand
- Card corner brackets: `transition-colors duration-300` — opacity ramp
- Card inner items: `opacity-0 → opacity-100` with per-item `transitionDelay` (150ms base + 70ms per item)
- Tech icons: `group-hover:scale-110` on hover

---

## 7. Decorative Motifs

### Hatched Background (Ladder)

The `<Ladder>` component fills the side columns with a diagonal hatch pattern using `repeating-linear-gradient`:

```js
backgroundImage: "repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
backgroundSize: "7px 7px",
color: "oklch(from var(--foreground) l c h / 0.08)",
```

This creates a very subtle 8% opacity crosshatch at 45°, referencing technical/engineering drawing aesthetics.

### Corner Brackets

Used on every interactive card and button. The brackets are 2–2.5px (h-2/h-2.5) per side, made with two-sided borders rather than full corners.

### Dashed Border Dividers

Cards and form elements use `border-dashed` on the main border, with `border-border/40` or `border-border/30` on internal dividers for a layered hierarchy.

### Node Dots

Small `size-2.5 rounded-full border border-border bg-background` circles are placed at grid intersections (nav bottom corners, footer top corners, card divider midpoints) to create a circuit board / connector aesthetic.

---

## 8. Icon Library

**Lucide React** (`lucide-react`) is used exclusively. Icons are rendered at:
- `size-4` (16px) — inline with button text
- `size-3` (12px) — small contextual icons (arrow-up-right, overlay icons)
- `size-[18px]` — tech grid icons, with `strokeWidth={1.5}` for a lighter stroke weight
- `size-3` for `<Square>` grid intersection markers

---

## 9. Theme Switching

Handled by `next-themes` (`ThemeProvider`) with:
- `attribute="class"` — dark mode via `.dark` class on `<html>`
- `defaultTheme="system"` — follows OS preference by default
- `enableSystem` — auto-detection enabled
- `disableTransitionOnChange` — prevents flash/transition on theme toggle

Favicon also switches theme: a black SVG in light mode, white SVG in dark mode, via separate `<link media="(prefers-color-scheme: ...)" />` entries.

---

## 10. Design Tokens Quick Reference

```css
/* Core spacing */
--nav-height:    4rem;    /* 64px */
--footer-height: 3.75rem; /* 60px */
--radius:        0.625rem; /* 10px base */

/* Fonts */
font-sans:         Geist Sans
font-mono:         Geist Mono
font-pixel-square: Geist Pixel Square

/* Achromatic palette (light) */
background:        #ffffff
foreground:        #1a1a1a
muted-foreground:  #737373
border:            #ebebeb
primary:           #252525

/* Achromatic palette (dark) */
background:        #1a1a1a
foreground:        #fbfbfb
muted-foreground:  #b3b3b3
border:            rgba(255,255,255,0.10)
primary:           #ebebeb
```

---

## 11. shadcn/ui Configuration

```json
{
  "style": "new-york",
  "tailwind": { "baseColor": "neutral", "cssVariables": true },
  "iconLibrary": "lucide"
}
```

The **new-york** style is selected — this is shadcn's sharper, more compact variant compared to the default. `baseColor: "neutral"` aligns with the achromatic palette.