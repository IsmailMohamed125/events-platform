import LoginForm from "../_components/LoginForm";
import Link from "next/link";
import GoogleButton from "../_components/GoogleButton";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex flex-col gap-8 mt-10 items-center px-4 w-full min-h-screen ">
      <h2
        className="text-2xl font-semibold text-center max-w-xs md:max-w-md lg:max-w-lg"
        tabIndex={0}
      >
        Sign in to access your dashboard area
      </h2>
      <LoginForm />
      <div
        className="flex items-center w-full max-w-sm gap-2"
        aria-label="or sign in with Google"
      >
        <div
          className="flex-grow h-px bg-muted-foreground/30"
          aria-hidden="true"
        />
        <span className="text-muted-foreground text-sm">or</span>
        <div
          className="flex-grow h-px bg-muted-foreground/30"
          aria-hidden="true"
        />
      </div>
      <GoogleButton type="login" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary-50 mr-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
