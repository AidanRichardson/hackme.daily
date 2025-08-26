"use client";

import GameForm from "./game-components/gameform";
import GameInfo from "./game-components/gameinfo";
import MatrixBackground from "./game-components/matrixbackground";

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');

        body {
          font-family: 'Fira Code', monospace;
        }

        .blinking-cursor {
          position: relative;
        }

        .blinking-cursor::after {
          content: '_';
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          animation: blink 1s step-end infinite;
          color: #00ff41;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="relative min-h-screen bg-black">
        <MatrixBackground />

        <main className="relative z-10 flex flex-col items-center gap-8 p-4 pb-32">
          <GameInfo />
          <GameForm />
        </main>
      </div>
    </>
  );
}
