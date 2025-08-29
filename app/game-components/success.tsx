import AttemptsChart from "./attemptchart";

export default function Success() {
  const stats = {
    failedAttempts: 2,
    timeToSolve: "03:42",
    streak: 5,
    efficiency: 50,
    accessLevel: "Root Admin",
  };
  return (
    <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-green-400 animate-pulse">
        --LOGIN SUCCESSFUL--
      </h1>

      <h1 className="text-2xl font-bold mb-2 text-green-400">
        \\ TODAY'S STATS
      </h1>

      <div className="space-y-2">
        <h2 className="text-xl text-red-400">
          - FAILED ATTEMPTS: {stats.failedAttempts}
        </h2>
        <h2 className="text-xl text-yellow-400">
          - TIME TO SOLVE: {stats.timeToSolve}
        </h2>
        <h2 className="text-xl text-blue-400">- STREAK: {stats.streak} DAYS</h2>
        <h2 className="text-xl text-green-300">
          - BREACH EFFICIENCY: {stats.efficiency}%
        </h2>
      </div>
      <AttemptsChart />
    </div>
  );
}
