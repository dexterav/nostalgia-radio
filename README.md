# Nostalgia Radio

Build me a single-page nostalgia music website in Next.js (App Router + TypeScript).

### Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- No external UI library
- No state management library
- Use only React hooks

### Assets I will provide
- /public/bg/scene-wide.png (landscape version)
- /public/bg/scene-tall.png (portrait version)

### Layout Requirements
- Full screen immersive experience
- Background image should cover the entire screen
- On mobile use portrait image, on desktop use landscape image (using CSS media queries)
- Dark overlay so text remains readable
- Fixed top bar: Current time (left) + Online count (center)
- Fixed bottom music player
- Big Hindi title in the center of the screen

### Music Player (Very Important)
Desktop:
- Floating glassmorphic horizontal bar at the bottom
- Spinning vinyl/cover art on the left
- Song title + artist name
- Progress bar
- Previous / Play-Pause / Next buttons

Mobile:
- Stacked card style player at the bottom

### Features needed
1. Auto-play music when page loads (with user interaction fallback)
2. Continuous playlist (loop the list)
3. Live online counter (can be fake/random between 20-80)
4. Real current time that updates every second
5. Smooth animations (vinyl spin only when playing)
6. Glassmorphism effect on the player
7. Fully responsive

### Hindi Title
Big centered text: "डीलक्स पानवाला"

### Design Style
- Same atmospheric nostalgic feeling as saloon.wtf
- Warm reds, deep shadows, soft glow
- Clean typography
- Minimal UI

Please write clean, production-ready code with proper file structure.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cf04dbcd-c407-417b-9383-bc2268f30919).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
