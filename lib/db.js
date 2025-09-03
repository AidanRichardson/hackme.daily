import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path where SQLite DB is stored (matches Docker volume mount)
const dbPath = path.join(__dirname, "../data/db.sqlite");

// Ensure data folder exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize DB connection
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
CREATE TABLE IF NOT EXISTS "Games" (
  "Date" DATE NOT NULL,
  "Target" TEXT NOT NULL,
  "Info" TEXT NOT NULL,
  "Username" TEXT NOT NULL,
  "PasswordHint" TEXT NOT NULL,
  "Password" TEXT NOT NULL,
  "SecurityQ" TEXT NOT NULL,
  "SecurityQAnswer" TEXT NOT NULL,
  "TwoFACode" TEXT NOT NULL,
  PRIMARY KEY("Date")
);

CREATE TABLE IF NOT EXISTS "Players" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE IF NOT EXISTS "Player_Attempts" (
  "player_id" INTEGER NOT NULL,
  "date" DATE NOT NULL,
  "userpass_attempts" INTEGER DEFAULT 0,
  "securityq_attempts" INTEGER DEFAULT 0,
  "twofa_attempts" INTEGER DEFAULT 0,
  PRIMARY KEY("player_id","date"),
  FOREIGN KEY("date") REFERENCES "Games"("Date"),
  FOREIGN KEY("player_id") REFERENCES "Players"("id")
);
`);

export default db;
