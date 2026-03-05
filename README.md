# ✦ TIC · TAC · TOE

A beautifully crafted, fully customizable Tic Tac Toe game built with React. Features a sleek glassmorphism UI, 20 emoji symbol sets, 14 dynamic themes, persistent score tracking, and smooth animations — all in a single component.

<br />

## ✨ Features

- **20 Symbol Sets** — Play with Classic X/O or choose from themed emoji pairs like 🐉 vs 🦄, 🚀 vs 🛸, ☀️ vs 🌙, and more
- **14 Dynamic Themes** — Cyber, Ocean, Forest, Sunset, Space, Lava, Aurora, Rose, Gold, Ice, Toxic, Candy, Midnight, Crimson
- **Custom Player Names** — Set names (up to 12 characters) before each match
- **Live Score Tracking** — Scores persist across rounds in the same session
- **Victory Overlay** — Animated win/draw screen with result and score summary
- **Smooth Animations** — Cell pop-in, win pulse, and victory entrance animations
- **Glassmorphism Design** — Backdrop blur cards, glowing borders, gradient text, and custom scrollbars
- **Fully Responsive** — Works across desktop and mobile viewports

<br />

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 16
- A React project (Vite, Create React App, or similar)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mayank-Raj14/Tictactoe
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

<br />

## 🧩 Usage

Drop `TicTacToe.jsx` directly into any React project and import it:

```jsx
import App from './TicTacToe';

function Root() {
  return <App />;
}
```

No additional dependencies required — only React hooks (`useState`, `useCallback`) are used.

<br />

## 🗂️ Project Structure

```
TicTacToe.jsx
│
├── SYMBOL_SETS       # 20 emoji symbol pair definitions
├── BG_SETS           # 14 gradient theme definitions
├── checkWin()        # Win condition logic
│
├── <SetupScreen />   # Player name, symbol & theme selection
├── <GameScreen />    # Live board, scoreboard & victory overlay
└── <App />           # Root component — manages screen routing
```

<br />

## 🎮 How to Play

1. On the **Setup Screen**, enter names for Player 1 and Player 2 (optional)
2. Pick your favourite **symbol set** from the scrollable grid
3. Select a **background theme**
4. Hit **START GAME**
5. Players take turns clicking cells to place their symbol
6. First to align **3 in a row** (horizontal, vertical, or diagonal) wins
7. Use **New Round** to replay or **Settings** to go back to the setup screen

<br />

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| React | UI & state management |
| React Hooks (`useState`, `useCallback`) | Game logic & performance |
| CSS-in-JS (inline styles) | Dynamic theming |
| Google Fonts (`Outfit`, `JetBrains Mono`) | Typography |

<br />

## 🤝 Contributing

Contributions are welcome! If you have ideas for new themes, features, or improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br />

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<br />

## 👤 Author

**Mayank Raj**
- GitHub: [@Mayank-Raj14](https://github.com/Mayank-Raj14)

---

<p align="center">Made with love by Mayank Raj</p>
