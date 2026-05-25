# Vercel React Best Practices Audit

Audit date: 2026-05-24  
Project: `factory-bloom-hub`  
Framework: React with TanStack Start/Vite

This audit uses the `vercel-react-best-practices` skill. The project is not a Next.js app, so Next-specific guidance such as `next/dynamic` is translated to React/TanStack/Vite equivalents such as `React.lazy`, route lazy loading, intent-based preloading, and in-viewport loading.

## Executive Summary

The project already has several strong performance patterns:

- Route chunks are generated in the production build.
- Static product/service data is mostly held at module scope.
- Most images include `width`, `height`, `sizes`, `loading`, and `decoding`.
- The home page preloads product images on hover/focus before a user switches category.
- Reduced-motion preferences are respected for videos, carousels, and hero media.

The highest-value improvements are around below-the-fold bundle loading, shared browser subscriptions, hydration behavior for language selection, and one carousel cleanup issue.

## Build Snapshot

Latest checked command:

```bash
npm run build
```

Result: passed.

Notable client build output:

- Main app/runtime chunk: about `361.57 kB`, `114.75 kB gzip`.
- Home route chunk: about `21.99 kB`, `6.19 kB gzip`.
- `CertificatesSlider` chunk: about `59.40 kB`, `21.17 kB gzip`.
- Home hero video asset: about `3.07 MB`.
- Certificate image assets range from about `216 kB` to `1.61 MB` each.

Project-wide lint currently fails because of existing unrelated formatting/no-empty issues in files such as `src/i18n/LanguageContext.tsx`, `src/i18n/translations.ts`, `src/components/ui/skeleton.tsx`, and `src/server.ts`.

## Findings

### 1. Lazy-load the below-the-fold certificates carousel

Severity: High  
Rules: `bundle-dynamic-imports`, `rendering-content-visibility`

Evidence:

- `src/components/CertificatesSlider.tsx:1` imports the carousel wrapper.
- `src/components/CertificatesSlider.tsx:8` imports `embla-carousel-autoplay`.
- `src/components/CertificatesSlider.tsx:11` to `src/components/CertificatesSlider.tsx:16` import six certificate images.
- The component is used near the bottom of service pages, for example `src/routes/services.production-capabilities.tsx:6` and `src/routes/services.production-capabilities.tsx:275`.

Why it matters:

The certificates carousel is below the main content on service pages, but its carousel code is loaded as part of the route work. The built `CertificatesSlider` chunk is about `59.40 kB`, and the related image assets are large. The images are lazy, but the component and carousel library still add work before the user reaches that section.

Recommended fix:

- Convert `CertificatesSlider` to a lazy-loaded component.
- Load it only when the section is close to the viewport, or at least behind `React.lazy` and `Suspense`.
- Add `content-visibility: auto` and `contain-intrinsic-size` to below-the-fold sections that contain large media.

Example shape:

```tsx
const CertificatesSlider = lazy(() =>
  import("@/components/CertificatesSlider").then((mod) => ({
    default: mod.CertificatesSlider,
  })),
);
```

### 2. Deduplicate reduced-motion `matchMedia` listeners

Severity: Medium  
Rule: `client-event-listeners`
Status: Fixed in `src/hooks/use-reduced-motion.ts`

Original evidence:

- The previous `src/hooks/use-reduced-motion.ts` implementation created a `matchMedia` subscription in every hook instance.
- The hook is used by `Home`, `PageHero`, `ServiceMediaHero`, and `CertificatesSlider`.

Why it matters:

Each component instance that calls `useReducedMotion()` adds its own `change` listener. This is not a large bug, but it is easy to avoid and follows the Vercel guidance to deduplicate global browser subscriptions.

Implemented fix:

- Replaced per-instance subscriptions with a small shared external store.
- Used `useSyncExternalStore` so all components read the same media-query state while only one global listener exists.
- Kept the server snapshot as reduced motion to preserve the previous SSR-safe first render behavior.

### 3. Prevent language preference flicker and version localStorage

Severity: Medium  
Rules: `rendering-hydration-no-flicker`, `client-localstorage-schema`

Evidence:

- `src/i18n/LanguageContext.tsx:13` starts with `lang` set to `"en"`.
- `src/i18n/LanguageContext.tsx:15` to `src/i18n/LanguageContext.tsx:20` reads `localStorage` after hydration.
- `src/i18n/LanguageContext.tsx:24` writes to the unversioned key `"lang"`.

Why it matters:

When a returning user has selected Myanmar, the server and first client render still start as English, then switch after the effect runs. This can cause a visible language flash and briefly incorrect `<html lang>`.

Recommended fix:

- Prefer a cookie-backed language value if SSR should render the correct language.
- If staying with `localStorage`, add a small pre-hydration script that sets the initial document language before React hydrates.
- Version the storage key, for example `ql:lang:v1`, to avoid future schema conflicts.

### 4. Clean up all carousel event listeners

Severity: Medium  
Rule: `client-event-listeners`
Status: Fixed in `src/components/ui/carousel.tsx`

Original evidence:

- The previous implementation registered `api.on("reInit", onSelect)`.
- It also registered `api.on("select", onSelect)`.
- The cleanup only removed the `select` listener.

Why it matters:

If the carousel unmounts or reinitializes, the `reInit` listener can remain registered. This can produce stale callbacks or duplicate updates over time.

Implemented fix:

```tsx
return () => {
  api.off("reInit", onSelect);
  api.off("select", onSelect);
};
```

### 5. Gate the homepage autoplay video more aggressively

Severity: Medium  
Rules: `bundle-conditional`, `rendering-resource-hints`
Status: Fixed in `src/routes/index.tsx`

Original evidence:

- `src/routes/index.tsx:4` imports the hero video.
- The previous hero rendered an autoplay background video immediately when reduced motion was not enabled.
- The built video asset is about `3.07 MB`.

Why it matters:

The poster image protects LCP better than a blank video, and `preload="metadata"` is better than full preload. Still, autoplay video is expensive on slower mobile connections and can compete with initial page work.

Implemented fix:

- `warehouse.webp` is now the default first hero paint and is preloaded by the route head.
- The video mounts only after hydration plus a short delay and `requestIdleCallback`.
- The video keeps running for mobile, data-saver, and reduced-motion users per product direction.
- The video now uses `preload="none"` so it does not start fetching during the first paint.

### 6. Hoist remaining static arrays created inside render

Severity: Low  
Rule: `rendering-hoist-jsx`

Evidence:

- `src/routes/index.tsx:287` creates the stats array inside render.
- `src/routes/index.tsx:448` creates product-tab config inside render.
- `src/routes/index.tsx:567` creates the why-choose-us list inside render.

Why it matters:

These arrays are small, so this is not urgent. But the home page has local state for category switching, and these arrays are recreated on every category change. Hoisting them to module scope is simple and keeps render work cleaner.

Recommended fix:

- Move static arrays to module constants.
- Keep render functions focused on state and markup.

## Positive Checks

These areas already match the spirit of the Vercel guidance:

- `src/server.ts:10` hoists the TanStack server-entry import promise at module scope, which matches `server-hoist-static-io` style caching.
- `src/routes/index.tsx:127` to `src/routes/index.tsx:139` preloads product images based on hover/focus intent.
- `src/router.tsx:4` creates a fresh `QueryClient` per router instance instead of using shared mutable request state.
- Route chunks are present in `dist/client/assets`, which means the build is already splitting route code.

## Suggested Fix Order

1. Fix carousel listener cleanup in `src/components/ui/carousel.tsx`.
2. Convert `useReducedMotion` to a shared `useSyncExternalStore` hook.
3. Add language bootstrapping/versioned storage or move language preference to a cookie.
4. Lazy-load `CertificatesSlider` below the fold.
5. Gate homepage video loading by connection/device and delay it until after first paint.
6. Hoist small inline arrays from route render functions.

## Validation Notes

Commands checked during the audit:

```bash
npm run build
npx eslint src/routes/__root.tsx
npx eslint src/hooks/use-reduced-motion.ts
```

Both passed.

Project-wide lint still needs separate cleanup before it can be used as a reliable whole-project gate.
