"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

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
        setAvailableGames(data);
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
                {availableGames.map((game) => (
                  <button
                    key={game.Date}
                    onClick={() => handlePlayDay(game.Date)}
                    className="flex flex-col items-center p-2 rounded-xl bg-cyan-500/10 border border-cyan-400 group hover:bg-cyan-400 hover:text-black transition-all duration-200"
                  >
                    <FaFolder className="text-5xl mb-1 group-hover:hidden" />
                    <FaFolderOpen className="text-5xl mb-1 hidden group-hover:flex" />
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
