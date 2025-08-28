import db from "@/lib/db";

export async function POST() {
  try {
    const stmt = db.prepare(`INSERT INTO "Players" DEFAULT VALUES;`);

    stmt.run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error writing data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
