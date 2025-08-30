import db from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const data = db.prepare("SELECT id FROM Players WHERE id=?").all(id);

    if (data.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error writing data:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
