import { GameData } from "@/app/types";
import React, { useEffect, useState } from "react";
import SecurityQuestion from "./SecurityQuestion";
import Success from "./Success";
import TwoFA from "./TwoFA";
import UserPass from "./UserPass";

export default function MainGame({ gameData }: { gameData: GameData }) {
  const [currentScreen, setCurrentScreen] = useState("userpass");

  useEffect(() => {
    const storedIsSuccess = localStorage.getItem(gameData.Date);
    if (storedIsSuccess === "success") {
      setCurrentScreen("success");
    }
  }, [gameData]);

  return (
    <>
      {currentScreen === "userpass" ? (
        <UserPass setCurrentScreen={setCurrentScreen} gameData={gameData} />
      ) : currentScreen === "securityq" ? (
        <SecurityQuestion
          setCurrentScreen={setCurrentScreen}
          gameData={gameData}
        ></SecurityQuestion>
      ) : currentScreen === "twofa" ? (
        <TwoFA setCurrentScreen={setCurrentScreen} gameData={gameData}></TwoFA>
      ) : currentScreen === "success" ? (
        <Success date={gameData.Date} />
      ) : (
        <></>
      )}
    </>
  );
}
