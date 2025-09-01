import { useEffect, useState } from "react";
import type { stats } from "../../types";
import AttemptsChart from "./attemptchart";

export default function Success({ date }: { date: string }) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<stats>();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const playerId = localStorage.getItem("playerId");
        const res = await fetch(`/api/getstats/${date}/${playerId}`);
        const data = await res.json();
        setStats(data);
        setLoading(false);
        return;
      } catch (err) {
        console.error("Failed to fetch game data:", err);
      }
    };

    fetchStats();
  }, [date]);

  return (
    <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-green-400 animate-pulse">
        --LOGIN SUCCESSFUL--
      </h1>

      <h1 className="text-2xl font-bold mb-2 text-green-400">
        \\ TODAY&apos;S STATS
      </h1>

      {loading || !stats ? (
        <h2 className="text-green-400 text-2xl animate-pulse">Loading...</h2>
      ) : (
        <>
          <div className="space-y-2">
            <h2 className="text-xl text-red-400">
              - ATTEMPTS: {stats.attempts}
            </h2>
          </div>
          <AttemptsChart attemptData={stats.attemptData} />
        </>
      )}
    </div>
  );
}
