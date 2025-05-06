"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // Sign in the user after successful registration
      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInResult?.error) {
        setError(
          "Registration successful but login failed. Please try logging in manually."
        );
        setLoading(false);
        return;
      }

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to dashboard
      router.push("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm"
      aria-label="Registration form"
      autoComplete="on"
    >
      <label htmlFor="fullName" className="sr-only">
        Full Name
      </label>
      <Input
        id="fullName"
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        autoComplete="name"
        aria-invalid={!!error}
        aria-describedby={error ? "register-error" : undefined}
      />
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <Input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        aria-invalid={!!error}
        aria-describedby={error ? "register-error" : undefined}
      />
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <Input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
        aria-invalid={!!error}
        aria-describedby={error ? "register-error" : undefined}
      />
      <label htmlFor="confirmPassword" className="sr-only">
        Confirm Password
      </label>
      <Input
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
        aria-invalid={!!error}
        aria-describedby={error ? "register-error" : undefined}
      />
      {error && (
        <div id="register-error" className="text-red-500 text-sm" role="alert">
          {error}
        </div>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
