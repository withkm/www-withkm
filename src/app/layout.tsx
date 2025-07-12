import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "withkm",
  description: "A creative tech company crafting smart, structured, and forward-thinking digital products.",
  icons: {
    icon: "/assets/branding/withkm-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
