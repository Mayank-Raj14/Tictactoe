import { useState, useCallback } from "react";

// ── Data ────────────────────────────────────────────────────────────────────

const SYMBOL_SETS = [
  { p1: "X",  p2: "O",  label: "Classic"  },
  { p1: "⚡", p2: "🔥", label: "Energy"   },
  { p1: "🐉", p2: "🦄", label: "Beasts"   },
  { p1: "☀️", p2: "🌙", label: "Cosmos"   },
  { p1: "💀", p2: "👾", label: "Spooky"   },
  { p1: "🍕", p2: "🍔", label: "Food"     },
  { p1: "🗡️", p2: "🛡️", label: "Battle"   },
  { p1: "🚀", p2: "🛸", label: "Space"    },
  { p1: "🦁", p2: "🐺", label: "Wild"     },
  { p1: "🌊", p2: "🌪️", label: "Elements" },
  { p1: "🍎", p2: "🍊", label: "Fruits"   },
  { p1: "🎸", p2: "🎹", label: "Music"    },
  { p1: "⚽", p2: "🏀", label: "Sports"   },
  { p1: "🤖", p2: "👽", label: "SciFi"    },
  { p1: "🌹", p2: "🌸", label: "Flowers"  },
  { p1: "🦊", p2: "🐼", label: "Cute"     },
  { p1: "💎", p2: "👑", label: "Royale"   },
  { p1: "🧊", p2: "🌋", label: "Forces"   },
  { p1: "🎃", p2: "🎄", label: "Festive"  },
  { p1: "🦋", p2: "🐝", label: "Nature"   },
];

const BG_SETS = [
  { id: "cyber",    label: "Cyber",    accent: "#e8ff45", accent2: "#ff4593", bg: "linear-gradient(135deg,#0a0a0f 0%,#0d0a1f 40%,#120820 100%)", swatch: "linear-gradient(135deg,#0a0a0f 0%,#1a0a2e 100%)" },
  { id: "ocean",    label: "Ocean",    accent: "#00d4ff", accent2: "#0066ff", bg: "linear-gradient(160deg,#020c18 0%,#04213d 50%,#001830 100%)", swatch: "linear-gradient(135deg,#030d1c 0%,#003a66 100%)" },
  { id: "forest",   label: "Forest",   accent: "#6dff4e", accent2: "#00cc66", bg: "linear-gradient(160deg,#020a02 0%,#06200a 50%,#041508 100%)", swatch: "linear-gradient(135deg,#040d04 0%,#0a2a10 100%)" },
  { id: "sunset",   label: "Sunset",   accent: "#ff9933", accent2: "#ff2266", bg: "linear-gradient(160deg,#0f0208 0%,#2a0a14 40%,#180608 100%)", swatch: "linear-gradient(135deg,#160410 0%,#3a1005 100%)" },
  { id: "space",    label: "Space",    accent: "#bf7fff", accent2: "#5eaaff", bg: "linear-gradient(135deg,#020008 0%,#0a0020 50%,#030012 100%)", swatch: "linear-gradient(135deg,#020008 0%,#120025 100%)" },
  { id: "lava",     label: "Lava",     accent: "#ff5500", accent2: "#ffcc00", bg: "linear-gradient(160deg,#150300 0%,#2a0800 45%,#1a0400 100%)", swatch: "linear-gradient(135deg,#150300 0%,#2a0800 100%)" },
  { id: "aurora",   label: "Aurora",   accent: "#00ffcc", accent2: "#aa00ff", bg: "linear-gradient(160deg,#010a08 0%,#002a1a 40%,#001a2a 100%)", swatch: "linear-gradient(135deg,#010a08 0%,#002a1a 60%,#001a2a 100%)" },
  { id: "rose",     label: "Rose",     accent: "#ff66aa", accent2: "#ff99cc", bg: "linear-gradient(135deg,#0f0008 0%,#2a0018 50%,#1a000f 100%)", swatch: "linear-gradient(135deg,#0f0008 0%,#2a0018 100%)" },
  { id: "gold",     label: "Gold",     accent: "#ffd700", accent2: "#ff8c00", bg: "linear-gradient(160deg,#0d0900 0%,#1f1400 50%,#120e00 100%)", swatch: "linear-gradient(135deg,#0d0900 0%,#2a1c00 100%)" },
  { id: "ice",      label: "Ice",      accent: "#aaeeff", accent2: "#66ccff", bg: "linear-gradient(160deg,#00080f 0%,#001a2e 50%,#000d1a 100%)", swatch: "linear-gradient(135deg,#00080f 0%,#002040 100%)" },
  { id: "toxic",    label: "Toxic",    accent: "#aaff00", accent2: "#00ffaa", bg: "linear-gradient(135deg,#030a00 0%,#0a1f00 50%,#061200 100%)", swatch: "linear-gradient(135deg,#030a00 0%,#0d2800 100%)" },
  { id: "candy",    label: "Candy",    accent: "#ff44ff", accent2: "#ffaa00", bg: "linear-gradient(160deg,#0f000f 0%,#1f001f 50%,#120012 100%)", swatch: "linear-gradient(135deg,#0f000f 0%,#280028 100%)" },
  { id: "midnight", label: "Midnight", accent: "#4466ff", accent2: "#aaccff", bg: "linear-gradient(135deg,#000005 0%,#05051a 50%,#02020e 100%)", swatch: "linear-gradient(135deg,#000005 0%,#080820 100%)" },
  { id: "crimson",  label: "Crimson",  accent: "#ff2222", accent2: "#ff8888", bg: "linear-gradient(160deg,#0a0000 0%,#200000 50%,#150000 100%)", swatch: "linear-gradient(135deg,#0a0000 0%,#280000 100%)" },
];

const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWin(board) {
  for (const [a, b, c] of WINS) {
    if (board[a] !== null && board[a] === board[b] && board[b] === board[c])
      return { cells: [a, b, c], player: board[a] };
  }
  return null;
}


const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html, body, #root { height: 100%; }
  body {
    font-family: 'Outfit', sans-serif;
    color: #f0f0f0;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px 16px;
    transition: background 0.5s ease;
  }
  #root { width: 100%; display: flex; justify-content: center; align-items: flex-start; }

  /* scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

  @keyframes pulse       { 0%,100%{opacity:1;transform:scale(1)}  50%{opacity:.4;transform:scale(.65)} }
  @keyframes winPulse    { 0%{transform:scale(1)} 35%{transform:scale(1.14)} 65%{transform:scale(.94)} 100%{transform:scale(1)} }
  @keyframes cellPop     { 0%{transform:scale(.3);opacity:0} 100%{transform:scale(1);opacity:1} }
  @keyframes victoryIn   { 0%{transform:scale(.65);opacity:0} 100%{transform:scale(1);opacity:1} }
  @keyframes bounce      { from{transform:translateY(0) scale(1)} to{transform:translateY(-10px) scale(1.05)} }

  .pop     { animation: cellPop   .28s cubic-bezier(.34,1.56,.64,1) both; }
  .winCell { animation: winPulse  .55s ease forwards; }
`;

if (!document.getElementById("ttt-styles")) {
  const s = document.createElement("style");
  s.id = "ttt-styles";
  s.textContent = CSS;
  document.head.appendChild(s);
}

function SetupScreen({ onStart }) {
  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");
  const [symIdx, setSymIdx]  = useState(0);
  const [bgIdx,  setBgIdx]   = useState(0);

  const theme = BG_SETS[bgIdx];

  const handleStart = () => {
    onStart({
      p1Name: p1Name.trim() || "Player 1",
      p2Name: p2Name.trim() || "Player 2",
      symIdx,
      bgIdx,
    });
  };

  const cardStyle = {
    background: "rgba(8,8,14,0.72)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 28,
    padding: "44px 40px 40px",
    backdropFilter: "blur(28px) saturate(1.4)",
    boxShadow: "0 32px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04) inset, 0 1px 0 rgba(255,255,255,.1) inset",
    width: "min(460px, 94vw)",
  };

  const logoStyle = {
    fontSize: "clamp(30px,6.5vw,44px)",
    fontWeight: 900,
    letterSpacing: 6,
    textAlign: "center",
    marginBottom: 36,
    background: `linear-gradient(120deg, ${theme.accent} 0%, ${theme.accent2} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const sectionLabel = (text) => (
    <div style={{ fontSize:10, fontFamily:"'JetBrains Mono',monospace", letterSpacing:"3.5px", textTransform:"uppercase", color:theme.accent, opacity:.7, marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
      {text}
      <span style={{ flex:1, height:1, background:"rgba(255,255,255,.07)", display:"block" }} />
    </div>
  );

  return (
    <div style={cardStyle}>
      <div style={logoStyle}>TIC · TAC · TOE</div>

      {sectionLabel("Players")}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:28 }}>
        {[
          { key:"p1", label:"Player 1", val:p1Name, set:setP1Name, color:theme.accent },
          { key:"p2", label:"Player 2", val:p2Name, set:setP2Name, color:theme.accent2 },
        ].map(({ key, label, val, set, color }) => (
          <div key={key}>
            <label style={{ display:"block", fontSize:10, fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginBottom:8 }}>{label}</label>
            <input
              maxLength={12}
              placeholder="Enter name"
              value={val}
              onChange={e => set(e.target.value)}
              style={{ width:"100%", padding:"13px 16px", background:"rgba(255,255,255,.05)", border:`1px solid rgba(255,255,255,.09)`, borderRadius:14, color:"#fff", fontFamily:"'Outfit',sans-serif", fontSize:15, fontWeight:600, outline:"none" }}
              onFocus={e => { e.target.style.borderColor = color; e.target.style.background = "rgba(255,255,255,.08)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,.09)"; e.target.style.background = "rgba(255,255,255,.05)"; }}
            />
          </div>
        ))}
      </div>

      {sectionLabel("Symbols")}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, maxHeight:180, overflowY:"auto", paddingRight:4, marginBottom:26 }}>
        {SYMBOL_SETS.map((set, i) => (
          <div
            key={i}
            title={set.label}
            onClick={() => setSymIdx(i)}
            style={{
              width:54, height:54, borderRadius:14,
              border: i === symIdx ? `1.5px solid ${theme.accent}` : "1.5px solid rgba(255,255,255,.07)",
              background: i === symIdx ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.04)",
              boxShadow: i === symIdx ? `0 0 16px -4px ${theme.accent}` : "none",
              cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2,
              transition:"all .18s",
              userSelect:"none",
            }}
          >
            <span style={{ fontSize:21, lineHeight:1 }}>{set.p1}</span>
            <span style={{ fontSize:10, opacity:.6 }}>{set.p2}</span>
          </div>
        ))}
      </div>

      {sectionLabel("Background")}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, maxHeight:130, overflowY:"auto", paddingRight:4, marginBottom:32 }}>
        {BG_SETS.map((bg, i) => (
          <div
            key={bg.id}
            title={bg.label}
            onClick={() => setBgIdx(i)}
            style={{
              width:54, height:54, borderRadius:14,
              border: i === bgIdx ? `1.5px solid ${theme.accent}` : "1.5px solid rgba(255,255,255,.07)",
              boxShadow: i === bgIdx ? `0 0 16px -4px ${theme.accent}` : "none",
              background: bg.swatch,
              cursor:"pointer", position:"relative", overflow:"hidden",
              transition:"all .18s",
            }}
          >
            <span style={{ position:"absolute", bottom:0, left:0, right:0, fontSize:"7.5px", textAlign:"center", fontFamily:"'JetBrains Mono',monospace", background:"rgba(0,0,0,.65)", padding:"3px 0", letterSpacing:.5 }}>{bg.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleStart}
        style={{
          width:"100%", padding:17,
          background: `linear-gradient(120deg, ${theme.accent}, ${theme.accent2})`,
          border:"none", borderRadius:16,
          fontFamily:"'Outfit',sans-serif", fontSize:14, fontWeight:900, letterSpacing:4, textTransform:"uppercase",
          color:"#000", cursor:"pointer",
          boxShadow:"0 6px 28px rgba(0,0,0,.35)",
          transition:"all .22s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 36px rgba(0,0,0,.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 6px 28px rgba(0,0,0,.35)"; }}
        onMouseDown={e => { e.currentTarget.style.transform="translateY(-1px)"; }}
        onMouseUp={e => { e.currentTarget.style.transform="translateY(-3px)"; }}
      >
        START GAME
      </button>
    </div>
  );
}

function GameScreen({ config, onBack }) {
  const { p1Name, p2Name, symIdx, bgIdx } = config;
  const theme = BG_SETS[bgIdx];
  const sym   = SYMBOL_SETS[symIdx];

  const [board,   setBoard]   = useState(Array(9).fill(null));
  const [current, setCurrent] = useState(0); // 0=p1, 1=p2
  const [scores,  setScores]  = useState({ p1: 0, p2: 0 });
  const [winInfo, setWinInfo] = useState(null); // { cells, player } | "draw"
  const [popIdx,  setPopIdx]  = useState(null);

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrent(0);
    setWinInfo(null);
    setPopIdx(null);
  }, []);

  const handleCell = useCallback((idx) => {
    if (winInfo || board[idx] !== null) return;
    const next = [...board];
    next[idx] = current;
    setBoard(next);
    setPopIdx(idx);

    const win = checkWin(next);
    if (win) {
      setWinInfo(win);
      setScores(s => ({ ...s, [current === 0 ? "p1" : "p2"]: s[current === 0 ? "p1" : "p2"] + 1 }));
      return;
    }
    if (next.every(c => c !== null)) {
      setWinInfo("draw");
      return;
    }
    setCurrent(c => 1 - c);
  }, [board, current, winInfo]);

  const isDraw   = winInfo === "draw";
  const isWin    = winInfo && !isDraw;
  const winCells = isWin ? winInfo.cells : [];
  const winPlayer = isWin ? winInfo.player : null;

  const p1Color = theme.accent;
  const p2Color = theme.accent2;

  const playerCard = (player, side) => {
    const isP1   = player === 0;
    const name   = isP1 ? p1Name : p2Name;
    const color  = isP1 ? p1Color : p2Color;
    const score  = isP1 ? scores.p1 : scores.p2;
    const symbol = isP1 ? sym.p1 : sym.p2;
    const active = current === player && !winInfo;

    return (
      <div style={{
        flex:1,
        background: active ? "rgba(12,12,20,.8)" : "rgba(8,8,14,.65)",
        border: `1px solid ${active ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.08)"}`,
        borderLeft:  side === "left"  ? `3px solid ${color}` : undefined,
        borderRight: side === "right" ? `3px solid ${color}` : undefined,
        borderRadius:16, padding:"14px 16px",
        backdropFilter:"blur(20px)",
        textAlign: side === "right" ? "right" : "left",
        boxShadow: active ? (side === "left" ? `-6px 0 24px -8px ${color}` : `6px 0 24px -8px ${color}`) : "none",
        transition:"all .3s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{ fontSize:17, lineHeight:1, marginBottom:2 }}>{symbol}</div>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:.5, color, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", opacity:.75 }}>{name}</div>
        <div style={{ fontSize:30, fontWeight:900, fontFamily:"'JetBrains Mono',monospace", lineHeight:1.1, color }}>{score}</div>
      </div>
    );
  };

  const cellStyle = (idx) => {
    const val     = board[idx];
    const isP1C   = val === 0;
    const isP2C   = val === 1;
    const winning = winCells.includes(idx);
    return {
      aspectRatio:"1",
      background:"rgba(255,255,255,.04)",
      border:`1px solid rgba(255,255,255,.08)`,
      borderRadius:14,
      cursor: val === null && !winInfo ? "pointer" : "default",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:"clamp(28px,7vw,50px)",
      userSelect:"none",
      position:"relative", overflow:"hidden",
      color: isP1C ? p1Color : isP2C ? p2Color : "transparent",
      transition:"background .15s, border-color .15s",
    };
  };

  // Victory overlay
  const showOverlay = !!winInfo;
  const winSym = winPlayer === 0 ? sym.p1 : sym.p2;
  const overlayEmoji = isDraw ? "🤝" : (winSym.length <= 2 ? winSym : "🏆");
  const overlayTitle = isDraw ? "IT'S A DRAW" : "WINNER";
  const overlayName  = isDraw ? "No Winner"  : (winPlayer === 0 ? p1Name : p2Name);
  const overlaySub   = isDraw ? "Well played both!"
    : `Score: ${winPlayer === 0 ? scores.p1 + 1 : scores.p2 + 1} | Well played!`;

  const btnStyle = (primary) => ({
    flex:1, padding:13,
    background: primary ? `linear-gradient(120deg, ${p1Color}, ${p2Color})` : "rgba(8,8,14,.65)",
    border: primary ? "none" : "1px solid rgba(255,255,255,.09)",
    borderRadius:14,
    color: primary ? "#000" : "rgba(255,255,255,.8)",
    fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight: primary ? 900 : 700,
    letterSpacing:.5, cursor:"pointer",
    transition:"all .2s",
  });

  return (
    <div style={{ width:"min(460px,94vw)" }}>
      {/* Scoreboard */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
        {playerCard(0, "left")}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, fontSize:9, letterSpacing:2, textTransform:"uppercase", fontFamily:"'JetBrains Mono',monospace", color:"rgba(255,255,255,.25)", flexShrink:0 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:p1Color, boxShadow:`0 0 8px ${p1Color}`, animation:"pulse 1.4s infinite" }} />
          <span style={{ maxWidth:50, textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            {current === 0 ? p1Name.split(" ")[0] : p2Name.split(" ")[0]}
          </span>
        </div>
        {playerCard(1, "right")}
      </div>

      {/* Board */}
      <div style={{ position:"relative", marginBottom:14 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, padding:10, background:"rgba(8,8,14,.6)", border:"1px solid rgba(255,255,255,.07)", borderRadius:22, backdropFilter:"blur(16px)" }}>
          {Array(9).fill(null).map((_, idx) => {
            const val = board[idx];
            const isWC = winCells.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => handleCell(idx)}
                className={[
                  idx === popIdx ? "pop" : "",
                  isWC ? "winCell" : "",
                ].join(" ")}
                style={cellStyle(idx)}
              >
                {val !== null ? (val === 0 ? sym.p1 : sym.p2) : ""}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action bar */}
      <div style={{ display:"flex", gap:10 }}>
        <button style={btnStyle(false)} onClick={resetBoard}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.1)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(8,8,14,.65)"; e.currentTarget.style.color="rgba(255,255,255,.8)"; }}>
          New Round
        </button>
        <button style={btnStyle(false)} onClick={onBack}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.1)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(8,8,14,.65)"; e.currentTarget.style.color="rgba(255,255,255,.8)"; }}>
          ⚙ Settings
        </button>
      </div>

      {/* Victory overlay */}
      {showOverlay && (
        <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,.8)", backdropFilter:"blur(16px) saturate(1.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"rgba(10,10,18,.92)", border:"1px solid rgba(255,255,255,.1)", borderRadius:28, padding:"48px 40px", textAlign:"center", maxWidth:340, width:"90%", boxShadow:"0 40px 100px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.08)", animation:"victoryIn .4s cubic-bezier(.34,1.56,.64,1)" }}>
            <span style={{ fontSize:60, marginBottom:16, display:"block", animation:"bounce .6s infinite alternate ease-in-out" }}>{overlayEmoji}</span>
            <div style={{ fontSize:10, letterSpacing:4, textTransform:"uppercase", fontFamily:"'JetBrains Mono',monospace", color:"rgba(255,255,255,.35)", marginBottom:8 }}>{overlayTitle}</div>
            <div style={{ fontSize:34, fontWeight:900, background:`linear-gradient(120deg,${p1Color},${p2Color})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:6, letterSpacing:-.5 }}>{overlayName}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,.35)", fontFamily:"'JetBrains Mono',monospace", marginBottom:32, letterSpacing:.5 }}>{overlaySub}</div>
            <div style={{ display:"flex", gap:10 }}>
              <button style={btnStyle(false)} onClick={onBack}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.1)"; e.currentTarget.style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(8,8,14,.65)"; e.currentTarget.style.color="rgba(255,255,255,.8)"; }}>
                Menu
              </button>
              <button style={btnStyle(true)} onClick={() => { resetBoard(); }}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default function App() {
  const [gameConfig, setGameConfig] = useState(null);

  const theme = gameConfig ? BG_SETS[gameConfig.bgIdx] : BG_SETS[0];

  // Apply background to body dynamically
  const bodyBg = theme.bg;

  return (
    <div style={{ width:"100%", display:"flex", justifyContent:"center", alignItems:"flex-start", minHeight:"100vh", padding:"24px 16px", background: bodyBg, transition:"background .5s ease" }}>
      {gameConfig ? (
        <GameScreen
          key={`${gameConfig.symIdx}-${gameConfig.bgIdx}`}
          config={gameConfig}
          onBack={() => setGameConfig(null)}
        />
      ) : (
        <SetupScreen onStart={setGameConfig} />
      )}
    </div>
  );
}
