import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.resolve("./app//api/data/data.json");

    const fileContents = await fs.readFile(filePath, "utf8");

    const data = JSON.parse(fileContents);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error reading data.json:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
