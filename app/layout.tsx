import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
const outfit = Outfit ({subsets:['latin']})

export const metadata: Metadata = {
  title: "VASK8 - STORE",
  description: "POS - NEXT.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} bg-fondo2`}
      >
      <Providers>{children}</Providers>

      </body>
    </html>
  );
}
