import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}

export function POST(request: NextRequest) {
  return NextResponse.redirect(new URL("/login", request.url));
}
