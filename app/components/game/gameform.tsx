"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import type { GameAnswers, GameData, newplayerresponse } from "../../types";

async function getOrCreatePlayerId() {
  let playerId = localStorage.getItem("playerId");
  const check = await fetch(`/api/checkplayer/${playerId}`);
  if (!playerId || !check.ok) {
    const res = await fetch("/api/createplayer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data: newplayerresponse = await res.json();
    playerId = data.id;
    localStorage.setItem("playerId", playerId);
  }
  return playerId;
}

async function addAttempt(id: string, date: string) {
  const res = await fetch(`/api/attempt/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date: date }),
  });
  await res.json();
}

export default function GameForm({
  setSuccess,
  gameData,
}: {
  setSuccess: (val: string) => void;
  gameData: GameData;
}) {
  const [formData, setFormData] = useState<GameAnswers>({
    Username: "",
    Password: "",
    SecurityQAnswer: "",
    TwoFACode: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const playerId = await getOrCreatePlayerId();
    await addAttempt(playerId, gameData.Date);

    if (
      gameData.Username === formData.Username &&
      gameData.Password === formData.Password &&
      gameData.SecurityQAnswer === formData.SecurityQAnswer &&
      gameData.TwoFACode === formData.TwoFACode
    ) {
      localStorage.setItem(gameData.Date, "success");
      setSuccess("success");
    } else {
      setSuccess("failure");
    }
  };

  const renderInputField = (
    name: keyof GameAnswers,
    label: string,
    type: string = "text"
  ) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-green-400 mb-2"
      >
        {`> ${label}`}
      </label>
      <div className="blinking-cursor">
        <input
          type={type}
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleChange}
          autoComplete="off"
          className="w-full bg-gray-900/50 text-green-300 rounded-md border border-green-500/30 p-2 focus:border-green-400 focus:ring focus:ring-green-500/50 outline-none transition duration-200"
        />
      </div>
    </div>
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-6"
      >
        <h2 className="text-xl font-bold text-green-400">
          --BREACH INTERFACE--
        </h2>
        {renderInputField("Username", "Enter Username")}
        {renderInputField("Password", "Enter Password", "password")}
        {renderInputField("SecurityQAnswer", "Security Question Answer")}
        {renderInputField("TwoFACode", "2FA Code")}

        <button
          type="submit"
          className="w-full bg-green-500/20 text-green-400 font-bold py-3 rounded-lg border border-green-500 hover:bg-green-500/40 transition duration-200"
        >
          [ EXECUTE ]
        </button>
      </form>
    </>
  );
}
