import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { date, id } = await params;

    const attemptsData = db
      .prepare(
        `
      SELECT
        userpass_attempts+securityq_attempts+twofa_attempts AS attempts,
        COUNT(DISTINCT player_id) AS players
      FROM
        Player_Attempts
      WHERE date = ? AND attempts NOT NULL
      GROUP BY
          attempts
      ORDER BY
          attempts;
      `
      )
      .all(date);

    const attempts = db
      .prepare(
        `SELECT userpass_attempts AS userpass, securityq_attempts AS securityq, twofa_attempts AS twofa, userpass_attempts+securityq_attempts+twofa_attempts AS total FROM Player_Attempts WHERE date = ? AND player_id=?`
      )
      .all(date, id);

    if (attemptsData.length === 0 || attempts.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Not found" }),
        { status: 404 }
      );
    }

    const totalPlayers = attemptsData.reduce((sum, d) => sum + d.players, 0);
    const avgAttempts = (
      attemptsData.reduce((sum, d) => sum + d.attempts * d.players, 0) /
      totalPlayers
    ).toFixed(2);

    const data = {
      attempts: {
        userpass: attempts[0].userpass,
        securityq: attempts[0].securityq,
        twofa: attempts[0].twofa,
        total: attempts[0].total,
      },
      attemptData: {
        chart: attemptsData,
        totalPlayers: totalPlayers,
        avgAttempts: avgAttempts,
      },
    };

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error reading data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
