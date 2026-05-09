# Verdiawan Raafi — Portfolio

> Hyper-cinematic Sci-Fi HUD personal portfolio for an AI & Back-End Engineer.

## Live Demo
Deploy on Replit or Vercel — see instructions below.

## Features
- **GSAP Text Scramble** — name deciphers from random characters on load; nav scrambles on hover
- **Magnetic Custom Cursor** — glowing cyan dot + lagging outer ring (GSAP quickTo)
- **Glassmorphism Navigation** — floating tooltips appear on nav hover
- **Hero Section** — hexagonal avatar with cyan/purple duotone + holographic glitch hover
- **Quantum Skill Matrix** — floating zero-gravity skill tags (Framer Motion physics)
- **3D Tilt Project Cards** — rotateX/Y respond to mouse position (Framer Motion)
- **Live BTC/USDT Ticker** — polls Binance API every 5 seconds, glows green/red on price change
- **SVG Grid + Scanline CRT overlay** — deep space HUD atmosphere
- **Video Background slot** — uncomment `<video>` in `Portfolio.tsx` and inject your 8K CGI video URL

## Stack
- React 18 + Vite 7
- Tailwind CSS v4
- Framer Motion
- GSAP 3
- TypeScript

## Getting Started

```bash
# Install dependencies
npm install
# or
pnpm install

# Start dev server
npm run dev
```

## Inject Your Video Background
Open `src/pages/Portfolio.tsx` and find the commented `<video>` block (~line 17). Uncomment it and replace `YOUR_VIDEO_URL_HERE` with your 8K CGI quantum robot video URL.

## Built by
**Verdiawan Raafi** — Back-End Developer & AI Agent Engineer

