import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import {cookies} from "next/headers";
const outfit = Outfit ({subsets:['latin']})

export const metadata: Metadata = {
  title: "VASK8 - STORE",
  description: "POS - NEXT.JS",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();

    // Obtenemos el token o un ID único del usuario para identificar la sesión
    const userSessionId = cookieStore.get('skate_token')?.value || null;

    return (
        <html lang="en">
        <body className={`${outfit.className} bg-black text-zinc-400`}>
        {/* Le pasamos el ID al cliente a través de Providers */}
        <Providers userId={userSessionId}>
            {children}
        </Providers>
        </body>
        </html>
    );
}
