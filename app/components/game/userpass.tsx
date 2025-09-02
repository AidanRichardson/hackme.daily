"use client";

import { addAttempt, getOrCreatePlayerId } from "@/app/services";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import type { GameData } from "../../types";
import Failure from "./Failure";

export default function UserPass({
  gameData,
  setCurrentScreen,
}: {
  gameData: GameData;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
  });
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showHint, setShowHint] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      gameData.Username === formData.Username &&
      gameData.Password === formData.Password
    ) {
      setCurrentScreen("securityq");
    } else {
      const playerId = await getOrCreatePlayerId();
      await addAttempt(playerId, gameData.Date);
      setSuccess("failure");
      setShowHint(true);
    }
  };

  return (
    <>
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

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-6"
      >
        <h2 className="text-xl font-bold text-green-400">
          --BREACH INTERFACE--
        </h2>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-green-400 mb-2"
          >
            Username
          </label>
          <div>
            <input
              type="text"
              name="Username"
              id="Username"
              value={formData.Username}
              onChange={handleChange}
              autoComplete="off"
              className="w-full bg-gray-900/50 text-green-300 rounded-md border border-green-500/30 p-2 focus:border-green-400 focus:ring focus:ring-green-500/50 outline-none transition duration-200"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-green-400 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              id="Password"
              value={formData.Password}
              onChange={handleChange}
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
        {showHint ? (
          <div className="space-y-3">
            <div
              key="Hint"
              className="flex flex-col sm:flex-row justify-between p-3 bg-black/70 rounded-lg border border-red-500/80 shadow-[0_0_15px_rgba(0,255,0,0.3)] animate-pulse-border"
            >
              <span className="font-bold text-red-400 tracking-wider">
                {`PASSWORD HINT:`}
              </span>
              <span className="text-red-300 text-right mt-1 sm:mt-0 whitespace-pre-wrap">
                {gameData.PasswordHint}
              </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <button
          type="submit"
          className="w-full bg-green-500/20 text-green-400 font-bold py-3 rounded-lg border border-green-500 hover:bg-green-500/40 transition duration-200"
        >
          [ EXECUTE ]
        </button>
      </form>

      {success === "failure" && <Failure setSuccess={setSuccess} />}
    </>
  );
}
