"use client";

import { Toaster } from "react-hot-toast";
import "./globals.css";
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
