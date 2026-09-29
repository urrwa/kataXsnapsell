# Katharina Academy × SnapSell

Bilingual English/German creator academy landing page built with React, TypeScript and Vite.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

The development server runs on port 3000. Use `?lang=en` or `?lang=de` to select a language.

## Verify and build

```sh
npm run lint
npm run build
npm run preview
```

The production build is generated in `dist/`.

## Media and application form

Bundled dashboard and feature videos are in `public/media/`. Some existing portraits and coaching media load from external image/video providers.

The application form defaults to labelled demo mode. See `.env.example` for the optional intake endpoint configuration. Do not place private secrets in `VITE_*` variables.
