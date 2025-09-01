// components/AttemptsChart.tsx
"use client";

import {
  Bar,
  BarChart,
  Label,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import type { attemptData } from "../../types";

export default function AttemptsChart({
  attemptData,
}: {
  attemptData: attemptData;
}) {
  return (
    <div className="p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-400 text-center">
        Player Scores
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={attemptData.chart}
          margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
        >
          <XAxis dataKey="attempts" tick={{ fill: "#05df72" }}>
            <Label
              value="Number of Attempts"
              offset={-5}
              position="insideBottom"
              fill="#05df72"
            />
          </XAxis>

          <YAxis allowDecimals={false} tick={{ fill: "#05df72" }}>
            <Label
              value="Number of Players"
              angle={-90}
              position="insideLeft"
              fill="#05df72"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>

          <Bar dataKey="players" fill="#05df72" radius={[4, 4, 0, 0]}>
            <LabelList dataKey="players" position="top" fill="#05df72" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-between text-yellow-700 text-lg font-semibold">
        <span>Average Attempts: {attemptData.avgAttempts}</span>
        <span>Total Players: {attemptData.totalPlayers}</span>
      </div>
    </div>
  );
}
