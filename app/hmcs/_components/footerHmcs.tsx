// /app/hmcs/_components/HmcsFooter.tsx
import Link from "next/link";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import {BUSINESS} from "@/app/hmcs/_lib/Business";

const LINKS = [
    { href: "/hmcs", label: "Inicio" },
    { href: "/hmcs/menu", label: "Menú completo" },
    { href: "/hmcs/quickcategory", label: "Pedido rápido" },
];

const linkClass =
    "rounded transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function HmcsFooter() {
    return (
        <footer className="bg-[#2C4A3E] pb-24 pt-10 text-[#F8F9FA] md:pb-10">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
                {/* Marca */}
                <div>
                    <p className="text-lg font-bold">{BUSINESS.name}</p>
                    <p className="mt-2 max-w-xs text-sm opacity-70">
                        Tu oasis de descanso entre clases. Pide desde tu dispositivo y
                        pasa a recoger.
                    </p>
                </div>

                {/* Enlaces */}
                <nav aria-label="Enlaces del pie de página">
                    <p className="mb-3 text-sm font-semibold">Explora</p>
                    <ul className="space-y-2 text-sm opacity-80">
                        {LINKS.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={linkClass}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contacto */}
                <address className="space-y-3 text-sm not-italic opacity-80">
                    <p className="mb-3 font-semibold opacity-100">Visítanos</p>
                    <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        {BUSINESS.location}
                    </p>
                    <p className="flex items-start gap-2">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        {BUSINESS.hours}
                    </p>
                    {BUSINESS.whatsapp && (
                        <a
                            href={`https://wa.me/${BUSINESS.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 ${linkClass}`}
                        >
                            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                            Escríbenos por WhatsApp
                        </a>
                    )}
                </address>
            </div>

            <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-center sm:px-6">
                <p className="text-sm opacity-70">
                    © {new Date().getFullYear()} {BUSINESS.name}. Todos los derechos
                    reservados.
                </p>
            </div>
        </footer>
    );
}