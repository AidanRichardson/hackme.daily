"use client";

import { useRouter } from "next/navigation";
import { FaFolder, FaFolderOpen, FaPlay } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

  const handlePlayToday = () => {
    router.push(`/play/today`);
  };

  const handleArchive = () => {
    router.push("/archive");
  };

  return (
    <div className="relative min-h-screen bg-black text-green-400">
      <main className="relative z-10 flex flex-col items-center justify-center gap-8 p-4">
        <div className="w-full max-w-lg sm:max-w-3xl p-6 sm:p-8 bg-black bg-opacity-70 rounded-2xl border border-green-500/50 shadow-[0_0_30px_rgba(0,255,0,0.4)] space-y-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold animate-pulse tracking-widest">
            -- HACKME.DAILY --
          </h1>
          <ul className="text-left list-disc list-inside text-base sm:text-lg space-y-2">
            <li>Hack the target using the information and hints provided</li>
            <li>A new target with different information every day</li>
            <li>Passwords and Security Question answers are case sensitive</li>
            <li className="font-semibold">
              It&apos;s a test of knowledge, problem-solving, and research. HAVE
              FUN!
            </li>
          </ul>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePlayToday}
              className="px-6 py-3 rounded-2xl flex flex-col items-center w-40 bg-green-500/20 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition font-bold text-lg"
            >
              <FaPlay className="text-5xl mb-2 drop-shadow-[0_0_10px_rgba(0,255,0,0.6)]" />
              <span className="text-lg font-semibold">Play</span>
            </button>

            <button
              onClick={handleArchive}
              className="px-6 py-3 rounded-2xl flex flex-col items-center w-40 bg-green-500/20 border border-green-400 text-green-400 group hover:bg-green-400 hover:text-black transition font-bold text-lg"
            >
              <FaFolder className="text-5xl mb-2 drop-shadow-[0_0_10px_rgba(0,255,0,0.6)] group-hover:hidden" />
              <FaFolderOpen className="text-4xl mb-2 drop-shadow-[0_0_10px_rgba(0,255,0,0.6)] hidden group-hover:flex" />
              <span className="text-lg font-semibold">Archive</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
