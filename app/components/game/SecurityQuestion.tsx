import { addAttempt, getOrCreatePlayerId } from "@/app/services";
import { GameData } from "@/app/types";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Failure from "./failure";

export default function SecurityQuestion({
  gameData,
  setCurrentScreen,
}: {
  gameData: GameData;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [formData, setFormData] = useState({
    SecurityQAnswer: "",
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gameData.SecurityQAnswer === formData.SecurityQAnswer) {
      setCurrentScreen("twofa");
    } else {
      const playerId = await getOrCreatePlayerId();
      await addAttempt(playerId, gameData.Date);
      setSuccess("failure");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-6"
      >
        <h2 className="text-xl font-bold text-green-400">
          --BREACH INTERFACE--
        </h2>
        <div className="space-y-3">
          <div
            key="SecurityQ"
            className="flex flex-col sm:flex-row justify-between p-3 bg-gray-900/50 rounded-md border-l-4 border-green-500"
          >
            <span className="font-medium text-green-400">{`> SECURITY QUESTION`}</span>
            <span className="text-gray-300 text-right mt-1 sm:mt-0 whitespace-pre-wrap">
              {gameData.SecurityQ}
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="SecurityQAnswer"
            className="block text-sm font-medium text-green-400 mb-2"
          >
            Answer
          </label>
          <div>
            <input
              type="text"
              name="SecurityQAnswer"
              id="SecurityQAnswer"
              value={formData.SecurityQAnswer}
              onChange={handleChange}
              autoComplete="off"
              className="w-full bg-gray-900/50 text-green-300 rounded-md border border-green-500/30 p-2 focus:border-green-400 focus:ring focus:ring-green-500/50 outline-none transition duration-200"
            />
          </div>
        </div>

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
