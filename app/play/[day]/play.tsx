"use client";

import { useEffect, useState } from "react";
import Failure from "../../game-components/failure";
import GameForm from "../../game-components/gameform";
import GameInfo from "../../game-components/gameinfo";
import MatrixBackground from "../../game-components/matrixbackground";
import Success from "../../game-components/success";
import { GameData } from "../../types";

export default function Play({ date }: { date: string }) {
  const [success, setSuccess] = useState("");
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async (date: string) => {
      try {
        const storedResult = localStorage.getItem(date);
        if (storedResult === "success") {
          setSuccess("success");
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/getgames/${date}`);
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data: GameData | null = await res.json();
        if (!data || Object.keys(data).length === 0) {
          setGameData(null);
        } else {
          setGameData(data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch game data:", err);
        setGameData(null);
        setLoading(false);
      }
    };

    fetchGameData(date);
  }, [date]);

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
          {success === "success" ? (
            <Success date={date} />
          ) : loading ? (
            <div>Loading...</div>
          ) : gameData === null ? (
            <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-4">
              <h1 className="text-2xl font-bold mb-4 text-center text-red-400 animate-pulse">
                NO GAME TODAY SORRY :(
              </h1>
            </div>
          ) : (
            <>
              <GameInfo gameData={gameData} />
              <GameForm setSuccess={setSuccess} gameData={gameData} />
            </>
          )}

          {success === "failure" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <Failure setSuccess={setSuccess} />
            </div>
          )}
        </main>
      </div>
    </>
  );
}
