# Nitesh Kumar Choubey — Executive Portfolio

Premium personal portfolio built with **React 18 + TypeScript + Vite + Tailwind CSS v4 + Motion (Framer Motion) + Lucide**.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel → **Add New Project** → import the repo. The Vite preset is detected automatically
   (`vercel.json` already sets build command `npm run build` and output `dist`).
3. Deploy. No environment variables, backend or database are needed.

Or from the terminal: `npx vercel --prod`.

## Editing content

**All text lives in one file: `src/data/content.ts`.** Components never hard-code content.

| What | Where |
|---|---|
| Name, headline, intro, location | `profile` |
| Email / LinkedIn | `contact` — an empty string hides that element everywhere. Every “Let’s Connect” button opens `contact.linkedinUrl` in a new tab |
| JEEVAN showcase | `jeevan` + images in `public/jeevan/` |
| Biography | `about` |
| Experience timeline | `experience` |
| Education | `education` |
| Certificates | `certificates` + image files in `public/certificates/` |
| Skills | `skills` |
| Quote & philosophy | `philosophy` |

### Adding a certificate
1. Export it as an image (PNG/JPG). Convert to WebP if you can (~1800px wide full size, ~760px thumbnail).
2. Put both files in `public/certificates/`.
3. Fill in `image` and `thumb` for the entry in `certificates`. An entry with `image: null` is never shown.

### Replacing the portrait
Put a high-resolution square photo at `public/images/portrait.webp` (≥ 1000 × 1000 px).
The current image is cropped from the LinkedIn screenshot and is low resolution.

## ⚠️ Verify before publishing

Search the code for `VERIFY` to find every one of these.

- **Email**: `proanshu4@gmail.com` comes from the LinkedIn banner and doesn't match the profile name. Confirm it.
- **TP metric**: "maintaining a 95%…" is cut off on LinkedIn, so it's left out on purpose.
- **Jamia Millia Islamia**: LinkedIn shows only "Oct 2026" for the Master's in History. Confirm the date and status.
- **Missing certificate**: *Microsoft Excel — Excel from Beginner to Advanced 2026* (Sep 12, 2026, 22.5 hrs). The file wasn't supplied, and the issuer still needs confirming.
- **Institution logos**: none of the supplied logos were high enough resolution, so typographic monograms are used instead.

## JEEVAN showcase

The flagship section (`src/components/Jeevan.tsx`, `#jeevan`) uses only material from the official site, https://jeevan-lpu.vercel.app/:

- `public/jeevan/jeevan-logo.webp` is the official logo (the site's `images/jeevan-logo.png`, cropped to its circle)
- `public/jeevan/jeevan-site-desktop.webp` and `jeevan-site-mobile.webp` are screenshots of the live homepage

If the JEEVAN site changes, replace these screenshots. The Founder entry in Experience (`featured: true`) links to `#jeevan` and to the website.

## Features

- Preloader with an animated "NC" monogram
- Custom cursor (dot, ring and glow) with magnetic buttons. Fine pointers only.
- Hero with a drifting particle field, a 3D portrait that follows the cursor, staggered type and scroll parallax
- Scroll-linked progress bar, a floating nav that tracks the active section, and a full-screen mobile menu
- Experience timeline that fills as you scroll, with tilt cards
- Certificate gallery with a modal viewer. Supports keyboard (← → Esc + −), zoom up to 250% with drag-to-pan, and traps focus.
- Copy-email button with a fallback for browsers that block the clipboard
- `prefers-reduced-motion` respected throughout. Motion uses `MotionConfig reducedMotion="user"`, CSS animations are disabled, and the particle field renders static.
- Semantic landmarks, skip link, alt text, visible focus states and JSON-LD `Person` schema
