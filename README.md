# Kata × SnapSell Academy

A visual refinement of the supplied React / TypeScript website. The original centered hero, scrolling media strip, all 13 sections, section order, content and interactive components are retained. The card and section imagery uses eight purpose-made Google Flow photographs, two optional video previews and the supplied real Kata portrait. SnapSell-inspired mint/emerald accents, dark surfaces, typography and button styling are applied without restructuring the page.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run lint` for TypeScript validation and `npm run build` for the production build in `dist`.

## Main files

- `src/App.tsx`: original 13-section composition and navigation.
- `src/components/sections/`: original individual sections and layouts.
- `src/index.css`: original layout styles plus SnapSell typography and button finishes.
- `src/components/FlexCarousel.jsx` and `.css`: supplied OGL carousel adapted to continuous looping, hover/focus pause, card details and tap interaction; includes a DOM fallback for browsers without WebGL.
- `src/components/HeroMediaStrip.tsx`: eight academy cards with coordinated imagery, labels and their expanded details.
- `src/components/FaultyTerminal.jsx` and `.css`: React Bits Faulty Terminal hero background with the supplied green preset; decorative, mouse-reactive, paused offscreen, and static for reduced-motion preferences, with a CSS fallback when WebGL is unavailable.
- `src/components/SlideCommit.jsx` and `.css`: adapted from [React Bits Slide Commit](https://reactbits.dev/micro/slide-commit), using the existing Motion and Lucide dependencies. Dragging to the end activates the action; a short/cancelled drag springs back. Enter, Space, End and arrow keys are supported, with Escape to reset.
- `src/components/SlideButton.tsx`: responsive, green-styled adapter for arrow-labelled CTAs, mobile navigation, pillar details and the flow's next-step action. Compact icon-only carousel navigation stays directly clickable.
- `src/data/content.ts`: source content and section image mappings.
- `src/data/images.ts`: local image paths and descriptive alt text.
- `public/images/editorial/`: optimized WebP photographs, supplied portrait and code-drawn interface illustrations.
- `public/images/flow/`: eight optimized section-specific photos and two video posters generated in Google Flow.
- `public/videos/flow/`: two 8-second 720p video examples; both load on demand through `FilmPreview` and do not autoplay.
- `google-flow-creative-brief.json`: heading-to-asset mapping, prompts, model, Flow asset IDs and project link.
- `higgsfield-image-sources.json`: provenance for the earlier imagery exploration, superseded by the active Flow assets.
- `image-sources.json`: provenance for generated and retained assets. Earlier assets remain available but replaced paths are no longer used by the active image registry.
- `src/components/ApplicationForm.tsx`: validated application form.
- `src/components/Modal.tsx`: existing policy content, with keyboard dismissal and focus management.

## Applications

The form defaults to an explicitly labelled preview. It validates locally and does not send or save applications. The imported website originally simulated a successful submission; that behavior has been removed.

To enable real submissions, set `VITE_APPLICATION_ENDPOINT` in `.env.local` to your public HTTPS intake endpoint and restart/rebuild. The endpoint must accept JSON POST requests with `firstName`, `email`, `socialHandle`, `creatorStage`, `mainGoal` and `confirmedAge`, and return a successful HTTP status only after accepting an application. Cross-origin endpoints must allow the deployed site's origin. Keep authentication secrets on your server, never in a `VITE_` variable. Validate, protect against spam and handle storage server-side.

Existing legal copy is carried over from the supplied project. Generated scenes and interface illustrations are served locally. Generated people and settings illustrate services rather than depicting actual academy staff or events; the real founder portrait comes from the supplied project. The original coaching video remains available on play from Cloudinary; fonts use Google Fonts. No AI API key is needed to render this landing page.

## Pillar cards

The pillars use the adapted React Bits Flip Card with click/drag spring rotation. Hover effects are intentionally subtle: 4-degree tilt, 0.06 glare opacity and 1.01 hover scale. Existing Explore sliders are isolated from card gestures.
