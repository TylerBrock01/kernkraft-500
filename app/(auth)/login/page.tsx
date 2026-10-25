import Link from 'next/link';
import type { Metadata } from 'next';
import {FadeIn} from "@/app/features/auth/components/ui/FadeIn";
import {LoginForm} from "@/app/features/auth/components/LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = { title: 'Acceso al Motor' };

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center relative overflow-hidden px-4">
            <div aria-hidden className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div aria-hidden className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-zinc-600/10 rounded-full blur-[120px] pointer-events-none" />

            <FadeIn className="w-full max-w-md relative z-10">
                <div className="bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                    <header className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-zinc-100 rounded-sm flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <span className="text-zinc-950 font-black text-xl">C</span>
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Acceso al Motor</h1>
                        <p className="text-zinc-500 text-sm mt-2">Autenticación requerida para operar</p>
                    </header>

                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 hover:text-zinc-400 flex items-center justify-center gap-2 transition-colors"
                    >
                        <span aria-hidden className="rotate-180">➜</span> Abortar y volver a la terminal pública
                    </Link>
                </div>
            </FadeIn>
        </div>
    );
}