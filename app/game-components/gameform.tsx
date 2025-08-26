"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { GameAnswers, GameData } from "../types";

export default function GameForm() {
  const [gameAnswersData, setGameAnswersData] = useState<GameAnswers>({
    Username: "",
    Password: "",
    SecurityQAnswer: "",
    TwoFACode: "",
  });

  useEffect(() => {
    const fetchGameAnswers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getgame`
        );
        const data: GameData = await res.json();
        const gameAnswersData: GameAnswers = {
          Username: data.Username,
          Password: data.Password,
          SecurityQAnswer: data.SecurityQAnswer,
          TwoFACode: data.TwoFACode,
        };
        setGameAnswersData(gameAnswersData);
      } catch (err) {
        console.error("Failed to fetch game data:", err);
      }
    };

    fetchGameAnswers();
  }, []);

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
    if (
      gameAnswersData.Username === formData.Username &&
      gameAnswersData.Password === formData.Password &&
      gameAnswersData.SecurityQAnswer === formData.SecurityQAnswer &&
      gameAnswersData.TwoFACode === formData.TwoFACode
    ) {
      console.log(true);
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
