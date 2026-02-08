import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
const outfit = Outfit ({subsets:['latin']})

export const metadata: Metadata = {
  title: "CAZA - STORE",
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
        className={`${outfit.className} bg-black`}
      >
      <Providers>{children}</Providers>

      </body>
    </html>
  );
}
