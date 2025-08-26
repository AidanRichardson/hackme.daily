"use client";
import React, { useEffect, useState } from "react";
import type { GameData } from "../types";

export default function GameInfo() {
  const [data, setData] = useState<GameData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getgame`
        );
        const gameData: GameData = await res.json();
        setData(gameData);
      } catch (err) {
        console.error("Failed to fetch game data:", err);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] text-center">
        <h1 className="text-2xl font-bold text-green-400 animate-pulse">
          --ESTABLISHING CONNECTION--
        </h1>
      </div>
    );
  }

  const displayData = {
    "TARGET IDENTIFIED": data.Target,
    INTEL: data.Info,
    "PASSWORD HINT": data.PasswordHint,
    "SECURITY QUESTION": data.SecurityQ,
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-green-400 animate-pulse">
        --INCOMING TRANSMISSION--
      </h1>
      <div className="space-y-3">
        {Object.entries(displayData).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col sm:flex-row justify-between p-3 bg-gray-900/50 rounded-md border-l-4 border-green-500"
          >
            <span className="font-medium text-green-400">{`> ${key}:`}</span>
            <span className="text-gray-300 text-right mt-1 sm:mt-0 whitespace-pre-wrap">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
