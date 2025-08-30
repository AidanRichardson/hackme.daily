"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";

type Game = {
  Date: string;
};

export default function Archive() {
  const router = useRouter();
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`/api/getgames/`);
        const data: Game[] = await res.json();
        setAvailableGames(data.slice(0, -1));
      } catch (err) {
        console.error("Failed to fetch game data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handlePlayDay = (day: string) => {
    router.push(`/play/${day}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');

        body {
          font-family: 'Fira Code', monospace;
        }
      `}</style>

      <div className="relative min-h-screen bg-black text-cyan-400">
        <main className="relative z-10 flex flex-col items-center justify-center gap-8 p-4">
          <div className="w-full max-w-5xl p-8 bg-black bg-opacity-70 rounded-2xl border border-cyan-500/50 shadow-[0_0_30px_rgba(0,255,0,0.4)] space-y-6 text-center">
            <h1 className="text-5xl font-bold animate-pulse tracking-widest text-green-400">
              -- ARCHIVE --
            </h1>

            {loading ? (
              <p className="text-xl text-cyan-300 animate-pulse">Loading...</p>
            ) : availableGames.length === 0 ? (
              <p className="text-xl text-cyan-300">No games found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
                {availableGames.map((game) => (
                  <button
                    key={game.Date}
                    onClick={() => handlePlayDay(game.Date)}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-cyan-500/10 border border-cyan-400 shadow-[0_0_15px_rgba(0,255,0,0.2)] hover:bg-cyan-400 hover:text-black transition-all duration-200"
                  >
                    <FaFolder className="text-5xl mb-2 drop-shadow-[0_0_10px_rgba(0,255,0,0.6)]" />
                    <span className="text-lg font-semibold">{game.Date}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
