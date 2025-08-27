import db from "@/lib/db";

export async function GET() {
  try {
    const date = new Date().toISOString().split("T")[0];

    const data = db.prepare("SELECT * FROM Games WHERE Date = ?").all(date);

    if (data.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(data[0]), { status: 200 });
  } catch (error) {
    console.error("Error reading data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
