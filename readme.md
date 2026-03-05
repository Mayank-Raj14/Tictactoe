# ✦ Tic · Tac · Toe

A polished, fully-featured two-player Tic Tac Toe game built with React. Features a customizable setup screen, live scoreboard, animated game board, and a victory overlay — all in a single self-contained component.

---

## ✨ Features

- **20 Symbol Sets** — Choose from Classic (X/O), emoji themes like Energy ⚡🔥, Beasts 🐉🦄, Space 🚀🛸, and more
- **14 Background Themes** — Cyber, Ocean, Forest, Sunset, Space, Lava, Aurora, Rose, Gold, Ice, Toxic, Candy, Midnight, and Crimson
- **Custom Player Names** — Each player can enter a display name (up to 12 characters)
- **Persistent Score Tracking** — Scores accumulate across rounds until you return to the menu
- **Animated Board** — Cell pop-in animation on placement, winning cell pulse, and smooth transitions throughout
- **Victory Overlay** — Full-screen modal with winner announcement, score summary, and Play Again / Menu options
- **Draw Detection** — Correctly identifies and announces a draw when the board is full with no winner
- **Responsive Design** — Scales cleanly from mobile to desktop using `clamp()` and `min()` sizing
- **Dynamic Theming** — Background, accent colors, and gradients all react to the chosen theme in real time

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 16
- A React project (Vite, Create React App, or similar)

### Installation

1. Copy `TicTacToe.jsx` into your project's component directory:

```bash
cp TicTacToe.jsx src/components/
```

2. Import and render the component in your app:

```jsx
import TicTacToe from "./components/TicTacToe";

export default function App() {
  return <TicTacToe />;
}
```

3. No additional dependencies or CSS files are required — everything is self-contained.

---

## 🧩 Component Structure

```
TicTacToe.jsx
├── SYMBOL_SETS       — 20 emoji/text symbol theme pairs
├── BG_SETS           — 14 dark background & accent color themes
├── CSS               — Injected global keyframe animations & base styles
├── SetupScreen       — Player name input, symbol picker, background picker
├── GameScreen        — Live board, scoreboard, win/draw logic, victory overlay
└── App (default)     — Root component managing setup → game navigation
```

---

## 🎮 How to Play

1. On the **Setup Screen**, enter names for Player 1 and Player 2 (optional — defaults to "Player 1" / "Player 2")
2. Pick a **Symbol Set** for the game pieces
3. Pick a **Background Theme**
4. Press **START GAME**
5. Players alternate clicking cells to place their symbol
6. First to get three in a row (horizontal, vertical, or diagonal) wins
7. After a win or draw, choose **Play Again** to keep scores and start a new round, or **Menu** to return to setup

---

## 🛠 Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI & state management (`useState`, `useCallback`) |
| CSS-in-JS | Inline styles + dynamically injected `<style>` tag |
| Google Fonts | `Outfit` (display) + `JetBrains Mono` (labels/scores) |

No third-party UI libraries or external CSS files required.

---

## 📁 File Overview

| File | Description |
|---|---|
| `TicTacToe.jsx` | Complete self-contained game component |

---

## 👤 Author

**Mayank Raj**
- GitHub: [@Mayank-Raj14](https://github.com/Mayank-Raj14)

---

## 📄 License

MIT — free to use, modify, and distribute.
