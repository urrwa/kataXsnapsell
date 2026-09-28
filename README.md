# Kata × SnapSell Academy

A visual refinement of the supplied React / TypeScript website. The original centered hero, scrolling media strip, all 13 sections, section order, content and interactive components are retained. The card and section imagery now uses a varied set of real editorial photographs, the supplied Kata portrait and simple interface illustrations. SnapSell-inspired mint/emerald accents, dark surfaces, typography and button styling are applied without restructuring the page.

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
- `image-sources.json`: source and license records for the current images. Earlier generated artwork is no longer referenced by the website.
- `src/components/ApplicationForm.tsx`: validated application form.
- `src/components/Modal.tsx`: existing policy content, with keyboard dismissal and focus management.

## Applications

The form defaults to an explicitly labelled preview. It validates locally and does not send or save applications. The imported website originally simulated a successful submission; that behavior has been removed.

To enable real submissions, set `VITE_APPLICATION_ENDPOINT` in `.env.local` to your public HTTPS intake endpoint and restart/rebuild. The endpoint must accept JSON POST requests with `firstName`, `email`, `socialHandle`, `creatorStage`, `mainGoal` and `confirmedAge`, and return a successful HTTP status only after accepting an application. Cross-origin endpoints must allow the deployed site's origin. Keep authentication secrets on your server, never in a `VITE_` variable. Validate, protect against spam and handle storage server-side.

Existing legal copy is carried over from the supplied project. Editorial stock photos and interface illustrations are served locally. Stock scenes illustrate themes rather than actual academy facilities; the founder portrait comes from the supplied project. The original coaching video remains available on play from Cloudinary; fonts use Google Fonts. No AI API key is needed to render this landing page.

## Pillar cards

The pillars use the adapted React Bits Flip Card with click/drag spring rotation. Hover effects are intentionally subtle: 4-degree tilt, 0.06 glare opacity and 1.01 hover scale. Existing Explore sliders are isolated from card gestures.
