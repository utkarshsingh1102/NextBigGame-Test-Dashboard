import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/components/ModalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextbigideas.ai",
  description: "Game idea generation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-[#F9FAFB]`}>
        <Header />
        <Sidebar />
        <ModalProvider />
        {/* Main content shifted right of sidebar and below header */}
        <main className="ml-64 pt-14 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
