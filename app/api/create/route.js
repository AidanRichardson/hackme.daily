import db from "@/lib/db";

export async function POST(req) {
  try {
    const {
      Date,
      Target,
      Info,
      Username,
      PasswordHint,
      Password,
      SecurityQ,
      SecurityQAnswer,
      TwoFACode,
    } = await req.json();

    const stmt = db.prepare(
      `INSERT INTO Games 
      (Date, Target, Info, Username, "PasswordHint", Password, SecurityQ, SecurityQAnswer, TwoFACode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(Date) DO UPDATE SET
        Target = excluded.Target,
        Info = excluded.Info,
        Username = excluded.Username,
        "PasswordHint" = excluded."PasswordHint",
        Password = excluded.Password,
        SecurityQ = excluded.SecurityQ,
        SecurityQAnswer = excluded.SecurityQAnswer,
        TwoFACode = excluded.TwoFACode`
    );

    stmt.run(
      Date,
      Target,
      Info,
      Username,
      PasswordHint,
      Password,
      SecurityQ,
      SecurityQAnswer,
      TwoFACode
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error writing data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
