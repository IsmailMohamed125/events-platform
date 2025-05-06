import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./_styles/globals.css";
import Header from "./_components/Header";
import Providers from "./_components/Providers";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Events platform",
  description: "Events platform app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} antialiased bg-primary-950 text-primary-50 min-h-screen flex flex-col relative`}
      >
        <Providers>
          <Header />
          <div className="flex-1 grid">
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
