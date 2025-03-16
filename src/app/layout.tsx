import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoundTap - Create, Remix, Share",
  description: "A modern platform for creating and sharing audio experiences",
  keywords: ["audio", "music", "remix", "sound", "creation", "sharing"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
