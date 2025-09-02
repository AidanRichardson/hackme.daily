import { GameData } from "@/app/types";
import React, { useState } from "react";
import SecurityQuestion from "./SecurityQuestion";
import UserPass from "./userpass";

export default function MainGame({
  gameData,
  setSuccess,
}: {
  gameData: GameData;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [currentScreen, setCurrentScreen] = useState("");

  return (
    <>
      {currentScreen === "" ? (
        <UserPass
          setSuccess={setSuccess}
          setCurrentScreen={setCurrentScreen}
          gameData={gameData}
        />
      ) : currentScreen === "securityQ" ? (
        <SecurityQuestion
          setCurrentScreen={setCurrentScreen}
          gameData={gameData}
        ></SecurityQuestion>
      ) : (
        <></>
      )}
    </>
  );
}
