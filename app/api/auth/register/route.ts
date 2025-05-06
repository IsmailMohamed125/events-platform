import { NextResponse } from "next/server";
import { UserService } from "@/_lib/user";

console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();
    console.log(email, password, fullName);
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const user = await UserService.createUser({
      email,
      password,
      full_name: fullName,
    });
    console.log("User created:", user);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
    console.error("Registration error:", error);
    const message =
      error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
