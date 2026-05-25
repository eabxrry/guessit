# Guess it. — Can you find the number?

A number guessing game — pick your range, pick your difficulty, and find the hidden number before running out of attempts.

---

## Features

**Difficulty levels**
- Easy — unlimited attempts
- Normal — 10 attempts
- Hard — 5 attempts

**Number ranges**
- 1 – 10
- 1 – 100
- 1 – 500
- 1 – 1000

**In-game feedback**
- Higher / Lower hints after each guess
- Win / lose screen at the end of each game
- Selected difficulty saved via localStorage

**Modern, responsive UI**

---

## Tech stack

| | Technologies |
|---|---|
| Frontend | React, CSS |
| Bundler | Vite |
| Icons | lucide-react |
| Persistence | localStorage |

---

## Run locally

Requirements: Node.js >= 18, npm

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

---

## Available scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

---

## Project structure

```
src/
├── gameConfig.js      # Shared config (levels, ranges, helpers)
├── Start.jsx          # Game configuration menu
├── Game.jsx           # Game interface and main logic
├── Start.css          # Menu styles
├── Game.css           # Game styles
├── index.css          # Global styles
└── main.jsx           # React entry point
```

---

## Author

Personal project by eabarry — built to practice React state management and game logic.