"use client";

import { getOrCreatePlayerId, postAttempts } from "@/app/hooks";
import React, { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { GameData, Screens, storedData } from "../../../types";
import Failure from "../Failure";
import Intel from "./Intel";
import SubmitButton from "./SubmitButton";

export default function UserPass({
  gameData,
  setCurrentScreen,
}: {
  gameData: GameData;
  setCurrentScreen: React.Dispatch<React.SetStateAction<Screens>>;
}) {
  const [failure, setFailure] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [pageAttempts, setPageAttempts] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem(gameData.Date);
    const parsedData: storedData = storedData ? JSON.parse(storedData) : null;
    setPageAttempts(parsedData ? parsedData.attempts : 0);
  }, [gameData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("Username")?.toString() || "";
    const password = form.get("Password")?.toString() || "";

    const playerId = await getOrCreatePlayerId();

    if (
      gameData.Username.toLowerCase() === username.toLowerCase() &&
      gameData.Password === password
    ) {
      await postAttempts(playerId, gameData.Date, "userpass", pageAttempts);
      localStorage.setItem(
        gameData.Date,
        JSON.stringify({ screen: "securityq", attempts: 0 })
      );
      setCurrentScreen("securityq");
    } else {
      setPageAttempts(pageAttempts + 1);
      setFailure(true);
      setShowHint(true);
    }
  };

  return (
    <>
      <Intel gameData={gameData} />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-6"
      >
        <h2 className="text-xl font-bold text-green-400">
          --BREACH INTERFACE--
        </h2>
        <div>
          <label
            htmlFor="Username"
            className="block text-sm font-medium text-green-400 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="Username"
            id="Username"
            autoComplete="off"
            className="w-full bg-gray-900/50 text-green-300 rounded-md border border-green-500/30 p-2 focus:border-green-400 focus:ring focus:ring-green-500/50 outline-none transition duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-green-400 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              id="Password"
              autoComplete="off"
              className="w-full bg-gray-900/50 text-green-300 rounded-md border border-green-500/30 p-2 focus:border-green-400 focus:ring focus:ring-green-500/50 outline-none transition duration-200 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-green-400 hover:text-green-200 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {showHint && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row justify-between p-3 bg-black/70 rounded-lg border border-red-500/80 shadow-[0_0_15px_rgba(0,255,0,0.3)] animate-pulse-border">
              <span className="font-bold text-red-400 tracking-wider">
                PASSWORD HINT:
              </span>
              <span className="text-red-300 text-right mt-1 sm:mt-0 whitespace-pre-wrap">
                {gameData.PasswordHint}
              </span>
            </div>
          </div>
        )}

        <SubmitButton />
        {pageAttempts >= 3 && (
          <button
            onClick={async () => {
              const playerId = await getOrCreatePlayerId();

              await postAttempts(
                playerId,
                gameData.Date,
                "userpass",
                pageAttempts
              );

              setCurrentScreen("securityq");
              localStorage.setItem(
                gameData.Date,
                JSON.stringify({ screen: "securityq", attempts: 0 })
              );
            }}
            className="w-full bg-green-500/20 text-green-400 font-bold py-3 rounded-lg border border-green-500 hover:bg-green-500/40 transition duration-200"
          >
            [ Use AutoFill Instead? ]
          </button>
        )}
      </form>

      {failure && <Failure setFailure={setFailure} />}
    </>
  );
}
