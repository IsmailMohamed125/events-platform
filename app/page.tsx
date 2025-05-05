import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image and overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={bg}
          alt="Cards showing different events"
          fill
          className="object-cover object-center w-full h-full"
          priority
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-primary-950/60"
          aria-hidden="true"
        />
      </div>
      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl text-white mb-6 sm:mb-8 md:mb-10 tracking-tight font-normal drop-shadow-lg text-center">
          Discover and share events that bring people together
        </h1>
        <Link
          href="/events"
          className="bg-accent-500 px-6 sm:px-8 py-4 sm:py-6 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all rounded focus:outline-none focus:ring-2 focus:ring-accent-400"
          aria-label="Explore events"
        >
          Explore events
        </Link>
      </main>
    </div>
  );
}
