import db from "@/lib/db";

export async function POST() {
  try {
    const stmt = db.prepare(`INSERT INTO "Players" DEFAULT VALUES;`);

    const dbres = await stmt.run();

    return new Response(JSON.stringify({ id: dbres.lastInsertRowid }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error writing data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
