# Hossam & Manar — Wedding Website

A cinematic, romantic wedding site built with Next.js, Tailwind CSS, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Assets

### Hero video

Place your hero background video at:

- **`public/video/hero.mp4`**

The hero section uses this file with autoplay (muted), loop, and a dark overlay for text readability. If the file is missing, the hero will show a broken video placeholder until you add it.

### Background music

Place your romantic audio file at:

- **`public/audio/romantic.mp3`** (or `.ogg`)

Music does **not** autoplay with sound until the user clicks **"Enter Our Story"** (browsers block unmuted autoplay). After that, the floating music button in the bottom-right controls play/pause.

### Gallery and timeline images

Replace the placeholder assets with your own:

- **`public/gallery/placeholder.svg`** — used for all timeline and gallery slots until you add real photos.
- To use your own images: add files (e.g. `1.jpg` … `6.jpg`) to `public/gallery/` and update the image paths in **`lib/wedding.ts`** (`TIMELINE_STEPS` and `GALLERY_IMAGES`).

### Map embed

To show your venue on the Event Details section:

1. In [Google Maps](https://www.google.com/maps), find your venue and click **Share** → **Embed a map**.
2. Copy the `src` URL from the iframe.
3. Create a `.env.local` file (see `.env.example`) and set:
   ```env
   NEXT_PUBLIC_MAP_EMBED_URL=https://www.google.com/maps/embed?pb=...
   ```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Framer Motion
