import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./tokens.css";
import "./globals.css";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Ostorlab · Pentest your mobile app and everything behind it",
  description:
    "Continuous scanning on every release, and AI agents that log in, get past pinning and prove each finding with a working exploit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
