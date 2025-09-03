export interface GameData {
  Date: string;
  Target: string;
  Info: string;
  PasswordHint: string;
  SecurityQ: string;
  Username: string;
  Password: string;
  SecurityQAnswer: string;
  TwoFACode: number;
}

export interface GameAnswers {
  Username: string;
  Password: string;
  SecurityQAnswer: string;
  TwoFACode: string;
}

export interface newplayerresponse {
  id: string;
}

export interface attemptData {
  chart: [
    {
      attempts: number;
      players: number;
    }
  ];
  totalPlayers: number;
  avgAttempts: number;
}
export interface stats {
  attempts: {
    userpass: number;
    securityq: number;
    twofa: number;
    total: number;
  };
  attemptData: attemptData;
}

export type Screens = "userpass" | "securityq" | "twofa" | "success";
export interface storedData {
  screen: Screens;
  attempts: number;
}
