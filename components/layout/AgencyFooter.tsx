import Link from 'next/link';
import { Terminal } from 'lucide-react';

export default function AgencyFooter() {
    return (
        <footer className="border-t border-zinc-800/50 bg-[#0a0a0a] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-12">

                    <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-zinc-500" />
                        <span className="font-medium tracking-widest text-zinc-500">CAZA</span>
                    </div>

                    <div className="flex gap-6 text-sm text-zinc-500 font-light">
                        <Link href="/terms" className="hover:text-zinc-300 transition-colors">Términos de Servicio</Link>
                        <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Aviso de Privacidad</Link>
                    </div>
                </div>

                <div className="text-center text-xs text-zinc-600 font-light">
                    <p>© {new Date().getFullYear()} CAZA Universal Commerce Engine. Construido para el control total.</p>
                </div>
            </div>
        </footer>
    );
}