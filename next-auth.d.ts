// File: types/next-auth.d.ts
import NextAuth from "next-auth";
import { Database } from "@/_lib/types/supabase";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role?: Database["public"]["Enums"]["user_role"];
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role?: Database["public"]["Enums"]["user_role"];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string; // subject (user id)
    email: string;
    role?: Database["public"]["Enums"]["user_role"];
  }
}
