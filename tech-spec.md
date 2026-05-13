# Tech Spec — Race Digital

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3 | UI framework |
| react-dom | ^18.3 | React DOM renderer |
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.3 | Vite React plugin |
| tailwindcss | ^4.0 | Utility CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| gsap | ^3.12 | Animation engine (ScrollTrigger) |
| lenis | ^1.2 | Smooth scroll with velocity |
| three | ^0.170 | 3D engine |
| @react-three/fiber | ^9.0 | React Three.js renderer |
| @react-three/drei | ^10.0 | R3F helpers (Text, useTexture) |
| postprocessing | ^6.36 | EffectComposer for custom shaders |
| space-grotesk | (Google Fonts) | Primary typeface |
| clash-display | (CDN / local) | Display typeface for hero |
| typescript | ^5.7 | Type checking |
| @types/react | ^18.3 | React type definitions |
| @types/react-dom | ^18.3 | ReactDOM type definitions |
| @types/three | ^0.170 | Three.js type definitions |

---

## Component Inventory

### Layout (shared)

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed top bar, text logo + links. Lenis scroll-to on click. |
| CustomCursor | Custom | Global small dot cursor, scales + turns gold on interactive hover. Rendered outside main scroll container to avoid transform interference. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | R3F Canvas (absolute, z-0, pointer-events-none) + HTML overlay (z-10). Contains ChromaticText background + centered copy + CTAs. |
| StatementSection | Custom | Centered text block. GSAP ScrollTrigger fade-up entrance. |
| ServiceShowcaseSection | Custom | Hosts two KineticRibbonCarousels (top/bottom) + frosted-glass overlay panel. |
| PricingSection | Custom | 3-column grid. Cards have gold border on middle card. GSAP staggered entrance. |
| AuditFooterSection | Custom | Split layout (form left, watermark right). Minimalist borderless inputs. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| ChromaticText | Custom (R3F) | HeroSection background. Three Text meshes + custom post-processing ShaderPass. |
| KineticRibbonCarousel | Custom (R3F) | ServiceShowcaseSection (×2). Infinite scroll-driven image rows with custom shaders. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| **Kinetic Ribbon Carousel** | Three.js + R3F + custom GLSL | Two rows of PlaneGeometry meshes with custom vertex/fragment shaders. Infinite wrapping via position modulo in useFrame. Scroll velocity from useLenis drives position.x and shader uScrollSpeed uniform. | **High** 🔒 |
| **Chromatic Text** | Three.js + R3F + postprocessing | Three overlapping Text meshes (RGB) with slight Z offsets. Custom ShaderPass in EffectComposer applies RGB channel displacement based on lerped mouse position + sine wave. | **High** 🔒 |
| **Smooth scrolling** | Lenis | Global Lenis instance with lerp 0.08. useLenis() hook provides velocity to carousel components. | Low |
| **Section text entrances** | GSAP + ScrollTrigger | Batch: y: 20→0, opacity: 0→1, triggered at top 80%. Applied to all section headings and body text. | Low |
| **Pricing card hover** | CSS transitions | bg-surface → #1a1a1a, translateY(-4px). Pure CSS. | Low |
| **Nav link hover** | CSS transition | Color transition to accent-gold. Pure CSS. | Low |
| **Custom cursor** | RAF loop | position tracked via mousemove, lerped in requestAnimationFrame. Scale/color change on :hover detection via event delegation. | Low |

---

## State & Logic

### Lenis ↔ R3F Velocity Bridge

`useLenis(({ velocity }) => { ... })` inside KineticRibbonCarousel must read scroll velocity and write to two targets simultaneously:
1. Each mesh's `position.x` (for physical translation)
2. Each mesh's material uniform `uScrollSpeed.value` (for vertex shader deformation)

Both must be updated in the same callback to stay in sync.

### Chromatic Text Mouse Pipeline

Mouse coordinates go through a 3-stage pipeline:
1. **Raw input**: `mousemove` → normalized device coords [-1, 1]
2. **Lerp target**: Stored in a ref, updated every frame with damping
3. **Shader uniform**: `uOffset` written in `useFrame`, driving both the RGB split direction and the post-processing displacement

The same lerped offset must drive both the mesh positions (small Z-offset multiplier) and the ShaderPass uniforms.

### Carousel Infinite Wrapping Math

Each image mesh has a precomputed wrap boundary. In `useFrame`:
- If `position.x > limit`: `position.x -= totalWidth`
- If `position.x < -totalWidth`: `position.x += totalWidth`

The `limit` and `totalWidth` values are computed once from image count × spacing + image width, stored in a `useMemo` array alongside initial X positions.

### Custom Cursor Isolation

The cursor element must be rendered outside the Lenis scroll container (or use `position: fixed` with `pointer-events: none`) to avoid being affected by scroll transforms. Hover detection should use event delegation on `document` checking `e.target.closest('a, button, [data-cursor-hover]')`.

---

## Other Key Decisions

### No shadcn/ui components

The design is fully bespoke with custom styling throughout. No standard UI primitives (dialogs, dropdowns, tables) are needed. All components are custom-built.

### Font loading strategy

- **Space Grotesk**: Load via Google Fonts `<link>` in index.html (weights 300, 400, 500, 700)
- **Clash Display**: Load via CDN or self-hosted woff2 files. Only needed for the hero background text.

### Image assets

6 carousel images will be generated via AI image generation and stored as static assets in `/public/images/`. The design requires unpolished/"before" style photos (messy restaurant, outdated website screenshot, etc.) to represent the problem Race Digital solves.

### Three.js version pinning

Use `three@^0.170` and matching `@types/three@^0.170`. Newer Three.js versions (r172+) have breaking changes in color management and material APIs that would require shader adjustments.

### Post-processing approach

Use the `postprocessing` npm package (not `@react-three/postprocessing`) for the Chromatic Text hero effect. The design specifies a custom `ShaderPass` integrated into `EffectComposer`, which maps directly to the vanilla postprocessing API. The R3F EffectComposer from `@react-three/postprocessing` uses a different API that would require adapting the custom shader.
