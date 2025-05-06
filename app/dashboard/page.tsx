"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="hover:bg-accent-400 hover:text-primary-950"
        >
          Sign Out
        </Button>
      </div>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}
