// app/api/login/route.ts
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const ADMIN_PASSWORD_HASH =
  "$2a$12$m2s82YDm8wkCW42BMCUAo.SdDo4Den3vsA2aj3dxts.NGG8QKRove";

export async function POST(req) {
  const { password } = await req.json();

  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!valid) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
