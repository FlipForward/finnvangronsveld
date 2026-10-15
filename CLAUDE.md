# CLAUDE.md — finnvangronsveld (persoonlijke site, Lovable-versie)

## Wat is dit?
Persoonlijke website/portfolio van **Finn Vangronsveld** (oprichter van FlipForward), gegenereerd in **Lovable**
(project ec43c5cf-dca7-4ca1-b5f8-03218f30c152; wijzigingen in Lovable worden automatisch naar deze repo gecommit).
Laatste commit: 10/02/2026.

**Let op:** finnvangronsveld.be toont sinds 14/10/2026 "Founder of FlipForward" + Person-JSON-LD met een link naar
flipforward.be, maar dat staat **niet** in deze repo (geen enkele vermelding van FlipForward). De live site wordt dus
waarschijnlijk uit een andere repo/project gebouwd. Eerst bij Finn nagaan welke repo de live site is vóór je hier iets wijzigt.

## Stack
- Vite + React 18 + TypeScript + Tailwind + shadcn/ui (49 componenten in `src/components/ui/`), react-router-dom.
- `lovable-tagger` in dev-modus (`vite.config.ts`).
- Tweetalig EN/NL via `src/contexts/LanguageContext.tsx`; kleurthema via `ColorContext.tsx` (`ColorSlider`).

## Structuur
```
src/App.tsx               Routes: / · /about · /portfolio · * (NotFound)
src/pages/                Index, About ("Content coming soon..." in de vertalingen), Portfolio, NotFound
src/components/           EnterScreen + LoadingScreen (intro met logo-reveal), Hero, Navigation, AboutSection,
                          PhotoGallery (src/assets/gallery/finn-*.jpg), ContactSection, Footer, CustomCursor,
                          FloatingParticles, ScrollProgress, ColorSlider, icons/
src/contexts/             LanguageContext (teksten EN/NL), ColorContext
```

## Commando's
- `npm install` · `npm run dev` · `npm run build` (→ `dist/`)

## Regels
- Eigen project van Finn: enkel aanpassen op vraag.
- Wijzigingen hier kunnen botsen met Lovable (die commit rechtstreeks naar deze repo): eerst pullen.
- README is nog de standaard Lovable-README.
