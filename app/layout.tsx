import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build Log — What did you ship?",
  description: "A public wall for builders to share what they shipped.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
