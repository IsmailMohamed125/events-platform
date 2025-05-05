import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 sm:gap-4 z-10 focus:outline-none focus:ring-2 focus:ring-accent-400 rounded"
      aria-label="Go to homepage"
    >
      <Image
        src={logo}
        height={48}
        width={48}
        quality={100}
        alt="Events Platform Logo"
        priority
      />
      <span className="text-lg sm:text-xl font-semibold text-primary-50">
        EventHub
      </span>
    </Link>
  );
}

export default Logo;
