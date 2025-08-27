export interface GameData {
  Date: string;
  Target: string;
  Info: string;
  PasswordHint: string;
  SecurityQ: string;
  Username: string;
  Password: string;
  SecurityQAnswer: string;
  TwoFACode: string;
}

export interface GameAnswers {
  Username: string;
  Password: string;
  SecurityQAnswer: string;
  TwoFACode: string;
}
