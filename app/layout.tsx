import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import { cookies } from "next/headers";

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "CAZA | Universal Commerce Engine",
    description: "Plataforma premium de gestión financiera y punto de venta.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();

    // Actualizamos el nombre de la cookie para la nueva identidad del SaaS
    const userSessionId = cookieStore.get('caza_token')?.value || null;

    return (
        <html lang="es">
        {/* Antialiased mejora muchísimo cómo se ven las fuentes en fondos oscuros */}
        <body className={`${outfit.className} bg-[#0a0a0a] text-zinc-400 antialiased selection:bg-zinc-800 selection:text-white`}>
        {/* Le pasamos el ID al cliente a través de Providers */}
        <Providers userId={userSessionId}>
            {children}
        </Providers>
        </body>
        </html>
    );
}