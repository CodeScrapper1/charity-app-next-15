import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextUiProvider } from "@/providers/NextUiProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Charity app",
  description: "donation application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <NextUiProvider
          themeProps={{ attribute: "class", defaultTheme: "light" }}
        >
          <div className="relative flex flex-col h-screen">
            <main className="flex-grow">
              <Navbar /> {children}
            </main>
          </div>
        </NextUiProvider>
      </body>
    </html>
  );
}
