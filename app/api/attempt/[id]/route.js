import db from "@/lib/db";

export async function POST(req, { params }) {
  try {
    const { date, section, attempts } = await req.json();

    const { id } = await params;

    if (
      !["userpass_attempts", "securityq_attempts", "twofa_attempts"].includes(
        section
      )
    ) {
      throw new Error("Invalid section column");
    }

    const sql = `
    INSERT INTO Player_Attempts (player_id, date, ${section})
    VALUES (?, ?, ?)
    ON CONFLICT(player_id, date) DO UPDATE SET
      ${section} = ${section} + excluded.${section};
  `;

    const stmt = db.prepare(sql);
    stmt.run(id, date, attempts);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error writing data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
