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
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchGameData = async (date: string) => {
      try {
        const storedResult = localStorage.getItem(date);
        if (storedResult === "Success") {
          setIsSuccess(true);
          return;
        }

        const res = await fetch(`/api/getgames/${date}`);
        const data: GameData = await res.json();
        setGameData(data);
        setLoading(false);
        return;
      } catch (err) {
        console.error("Failed to fetch game data:", err);
      }
    };

    fetchGameData(today);
  }, [today]);

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
          {isSuccess ? (
            <Success date={today} />
          ) : loading || !gameData ? (
            <div></div>
          ) : (
            <>
              <GameInfo gameData={gameData} />
              <GameForm setIsSuccess={setIsSuccess} gameData={gameData} />
            </>
          )}
        </main>
      </div>
    </>
  );
}
