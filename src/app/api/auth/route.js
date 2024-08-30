import { NextResponse } from "next/server";
import { query } from "@/utils/dbConnect";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    const result = await query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    const user = result.rows[0];

    if (user) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
