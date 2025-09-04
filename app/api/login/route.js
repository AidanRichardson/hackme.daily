// app/api/login/route.ts
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();

  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminHash) {
    return NextResponse.json(
      { success: false, error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const valid = await bcrypt.compare(password, adminHash);

  if (!valid) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
