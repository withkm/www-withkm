import type { Metadata } from "next";

import "../styles/style.scss";
import CursorProvider from "@/components/CursorProvider";

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
    <html lang="en" className="cursor-none">
      <body className="min-h-screen bg-background text-foreground">
        <CursorProvider />
        {children}
      </body>
    </html>
  );
}
