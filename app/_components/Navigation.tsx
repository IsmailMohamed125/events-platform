"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // or use any menu icon you like
import { useSession } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav aria-label="Main navigation">
      {/* Desktop nav */}
      <ul className="hidden sm:flex gap-16 items-center text-xl">
        <li>
          <Link
            href="/events"
            className="hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded"
            aria-label="View events"
          >
            Events
          </Link>
        </li>
        <li>
          {session ? (
            <Link
              href="/dashboard"
              className="hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded"
              aria-label="Go to dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded"
              aria-label="Login to your account"
            >
              Login
            </Link>
          )}
        </li>
      </ul>

      {/* Mobile nav */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="w-6 h-6 " />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetTitle className="sr-only">Main navigation</SheetTitle>
            <ul className="flex flex-col gap-6 p-6 text-lg">
              <li>
                <Link
                  href="/events"
                  className="hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded text-primary-900"
                  aria-label="View events"
                >
                  Events
                </Link>
              </li>
              <li>
                {session ? (
                  <Link
                    href="/dashboard"
                    className="hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded text-primary-900"
                    aria-label="Go to dashboard"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="hover:text-accent-400 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 rounded text-primary-900"
                    aria-label="Login to your account"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
