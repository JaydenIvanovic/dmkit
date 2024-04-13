import type { Metadata } from "next";
import { Macondo } from "next/font/google";
import "./globals.css";

const font = Macondo({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dungeon Masters Toolkit",
  description:
    "A set of tools for Dungeon Masters to keep Dungeons & Dragons games flowing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} text-white bg-[color:#10181c]`}>
        <div className="z-0 absolute w-full h-screen bg-[url('/images/dungeon.jpg')] bg-[position:center] bg-repeat-x filter blur-sm"></div>
        <main className="z-10 flex min-h-screen">{children}</main>
      </body>
    </html>
  );
}
