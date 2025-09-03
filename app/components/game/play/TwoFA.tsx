import { getOrCreatePlayerId, postAttempts } from "@/app/hooks";
import React, { FormEvent, useEffect, useState } from "react";
import type { GameData, Screens, storedData } from "../../../types";
import Failure from "../Failure";
import Intel from "./Intel";
import SubmitButton from "./SubmitButton";

export default function TwoFA({
  gameData,
  setCurrentScreen,
}: {
  gameData: GameData;
  setCurrentScreen: React.Dispatch<React.SetStateAction<Screens>>;
}) {
  const [failure, setFailure] = useState(false);
  const [pageAttempts, setPageAttempts] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem(gameData.Date);
    const parsedData: storedData = storedData ? JSON.parse(storedData) : null;
    setPageAttempts(parsedData ? parsedData.attempts : 0);
  }, [gameData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const twofa = form.get("TwoFACode") || 0;

    const playerId = await getOrCreatePlayerId();

    if (gameData.TwoFACode == twofa) {
      await postAttempts(playerId, gameData.Date, "userpass", pageAttempts);
      localStorage.setItem(
        gameData.Date,
        JSON.stringify({ screen: "success", attempts: 0 })
      );
      setCurrentScreen("success");
    } else {
      setPageAttempts(pageAttempts + 1);
      setFailure(true);
    }
  };

  return (
    <>
      <Intel gameData={gameData}></Intel>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 bg-black bg-opacity-75 rounded-lg border border-green-500/50 shadow-[0_0_20px_rgba(0,255,0,0.3)] space-y-6"
      >
        <h2 className="text-xl font-bold text-green-400">
          --BREACH INTERFACE--
        </h2>
        <div>
          <label
            htmlFor="TwoFACode"
            className="block text-sm font-medium text-green-400 mb-2"
          >
            2FA Code
          </label>
          <div>
            <input
              type="number"
              name="TwoFACode"
              id="TwoFACode"
              autoComplete="off"
              className="w-full bg-gray-900/50 text-green-300 rounded-md border border-green-500/30 p-2 focus:border-green-400 focus:ring focus:ring-green-500/50 outline-none transition duration-200"
            />
          </div>
        </div>

        <SubmitButton />
        {pageAttempts >= 3 && (
          <button
            onClick={async () => {
              const playerId = await getOrCreatePlayerId();

              await postAttempts(
                playerId,
                gameData.Date,
                "twofa",
                pageAttempts
              );
              localStorage.setItem(
                gameData.Date,
                JSON.stringify({ screen: "success", attempts: 0 })
              );
              setCurrentScreen("success");
            }}
            className="w-full bg-green-500/20 text-green-400 font-bold py-3 rounded-lg border border-green-500 hover:bg-green-500/40 transition duration-200"
          >
            [ Skip 2FA? ]
          </button>
        )}
      </form>

      {failure && <Failure setFailure={setFailure} />}
    </>
  );
}
