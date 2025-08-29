"use client";

import { useEffect, useState } from "react";
import GameForm from "./game-components/gameform";
import GameInfo from "./game-components/gameinfo";
import MatrixBackground from "./game-components/matrixbackground";
import Success from "./game-components/success";
import { GameData } from "./types";

export default function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const res = await fetch(`/api/today`);
        const data: GameData = await res.json();
        setGameData(data);

        const storedResult = localStorage.getItem(data.Date);
        if (storedResult === "Success") {
          setIsSuccess(true);
        }
      } catch (err) {
        console.error("Failed to fetch game data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, []);

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
          {loading ? (
            <h2 className="text-green-400 text-2xl animate-pulse">
              Loading...
            </h2>
          ) : isSuccess ? (
            <Success />
          ) : (
            <>
              {gameData && <GameInfo />}
              <GameForm setIsSuccess={setIsSuccess} />
            </>
          )}
        </main>
      </div>
    </>
  );
}
