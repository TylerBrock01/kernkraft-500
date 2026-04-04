import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import { cookies } from "next/headers";
import { AuthProvider } from "./context/AuthContext";
import {Toaster} from "react-hot-toast";

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
            <AuthProvider>
                {children}
            </AuthProvider>
        </Providers>
        <Toaster
            position="bottom-right"
            toastOptions={{
                // Estilo por defecto (cristal oscuro)
                className: '!bg-zinc-900/90 !text-zinc-100 !border !border-zinc-800 !backdrop-blur-md',
                style: {
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                },
                success: {
                    iconTheme: { primary: '#10b981', secondary: '#09090b' },
                },
                error: {
                    iconTheme: { primary: '#ef4444', secondary: '#09090b' },
                },
            }}
        />
        </body>
        </html>
    );
}