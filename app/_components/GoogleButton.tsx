"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function GoogleButton({ type }: { type: "login" | "signup" }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="flex items-center gap-2 w-full max-w-sm justify-center"
      onClick={() => signIn("google", { callbackUrl: "/events" })}
      aria-label="Sign in with Google"
    >
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
        <g clipPath="url(#clip0_17_40)">
          <path
            d="M47.532 24.552c0-1.636-.147-3.2-.419-4.704H24.48v9.02h13.02c-.528 2.84-2.12 5.24-4.52 6.86v5.68h7.32c4.28-3.94 6.73-9.74 6.73-16.856z"
            fill="#4285F4"
          />
          <path
            d="M24.48 48c6.12 0 11.26-2.04 15.01-5.54l-7.32-5.68c-2.04 1.36-4.66 2.18-7.69 2.18-5.91 0-10.92-3.99-12.72-9.34H4.24v5.86C7.98 43.98 15.62 48 24.48 48z"
            fill="#34A853"
          />
          <path
            d="M11.76 29.62A14.98 14.98 0 0 1 9.6 24c0-1.96.35-3.86.96-5.62v-5.86H4.24A23.98 23.98 0 0 0 .48 24c0 3.98.96 7.76 2.68 11.14l7.32-5.86z"
            fill="#FBBC05"
          />
          <path
            d="M24.48 9.52c3.34 0 6.32 1.15 8.68 3.4l6.48-6.48C35.74 2.36 30.6 0 24.48 0 15.62 0 7.98 4.02 4.24 10.14l7.32 5.86c1.8-5.35 6.81-9.34 12.92-9.34z"
            fill="#EA4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_17_40">
            <path fill="#fff" d="M0 0h48v48H0z" />
          </clipPath>
        </defs>
      </svg>
      {type === "login" ? "Sign in with Google" : "Sign up with Google"}
    </Button>
  );
}
