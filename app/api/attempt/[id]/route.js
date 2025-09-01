import db from "@/lib/db";

export async function POST(req, { params }) {
  try {
    const { date } = await req.json();

    const { id } = await params;

    const stmt = db.prepare(`
    INSERT INTO Player_Attempts (player_id, date, attempt_value)
    VALUES (?, ?, 1)
    ON CONFLICT(player_id, date) DO UPDATE SET
      attempt_value = attempt_value + 1
    `);

    stmt.run(id, date);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error writing data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
