import type { GameData } from "@/app/types";
import React from "react";

export default function Intel({ gameData }: { gameData: GameData }) {
  return (
    <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-green-400 animate-pulse">
        --INCOMING TRANSMISSION--
      </h1>
      <div className="space-y-3">
        <div
          key="Target"
          className="flex flex-col sm:flex-row justify-between p-3 bg-gray-900/50 rounded-md border-l-4 border-green-500"
        >
          <span className="font-medium text-green-400">{`> TARGET IDENTIFIED`}</span>
          <span className="text-gray-300 text-right mt-1 sm:mt-0 whitespace-pre-wrap">
            {gameData.Target}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <div
          key="Intel"
          className="flex flex-col sm:flex-row justify-between p-3 bg-gray-900/50 rounded-md border-l-4 border-green-500"
        >
          <span className="font-medium text-green-400">{`> INTEL`}</span>
          <span className="text-gray-300 text-right mt-1 sm:mt-0 whitespace-pre-wrap">
            {gameData.Info}
          </span>
        </div>
      </div>
    </div>
  );
}
