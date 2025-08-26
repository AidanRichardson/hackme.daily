export async function POST(req) {
  const data = await req.json();
  console.log("Form data received:", data); // 👈 prints in terminal
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
