import { GameData, Screens, storedData } from "@/app/types";
import React, { useEffect, useState } from "react";
import Success from "../success/Success";
import SecurityQuestion from "./SecurityQuestion";
import TwoFA from "./TwoFA";
import UserPass from "./UserPass";

export default function Forms({ gameData }: { gameData: GameData }) {
  const [currentScreen, setCurrentScreen] = useState<Screens>("userpass");

  useEffect(() => {
    const storedData = localStorage.getItem(gameData.Date);
    const parsedData: storedData = storedData ? JSON.parse(storedData) : null;

    setCurrentScreen(parsedData ? parsedData.screen : "userpass");
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
