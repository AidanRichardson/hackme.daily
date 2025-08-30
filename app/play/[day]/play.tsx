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
        if (storedResult === "Success") {
          setSuccess("success");
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
          ) : loading || !gameData ? (
            <div></div>
          ) : (
            <>
              <GameInfo gameData={gameData} />
              <GameForm
                success={success}
                setSuccess={setSuccess}
                gameData={gameData}
              />
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
