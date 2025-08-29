// components/AttemptsChart.tsx
"use client";

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { attempts: 1, players: 50 },
  { attempts: 2, players: 120 },
  { attempts: 3, players: 300 },
  { attempts: 4, players: 200 },
  { attempts: 5, players: 80 },
];

const totalPlayers = data.reduce((sum, d) => sum + d.players, 0);
const avgAttempts = (
  data.reduce((sum, d) => sum + d.attempts * d.players, 0) / totalPlayers
).toFixed(2);

export default function AttemptsChart() {
  return (
    <div className="p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-400 text-center">
        Players' Scores
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <XAxis dataKey="attempts" tick={{ fill: "#05df72" }} />
          <YAxis allowDecimals={false} tick={{ fill: "#05df72" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#000",
              border: "1px solid #05df72",
              color: "#05df72",
            }}
            labelStyle={{ color: "#0f0" }}
          />
          <Bar dataKey="players" fill="#05df72" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="players" position="top" fill="#05df72" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-between text-yellow-700 text-lg font-semibold">
        <span>Average Attempts: {avgAttempts}</span>
        <span>Total Players: {totalPlayers}</span>
      </div>
    </div>
  );
}
