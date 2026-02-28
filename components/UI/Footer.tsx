// components/UI/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import HeadingHighlight from "@/components/UI/HeadingHighlight";
import { Instagram, Facebook, Youtube, Send, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6 md:px-12">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Columna 1: Brand Identity */}
                    <div className="flex flex-col gap-6">
                        <div className="scale-75 origin-left">
                            <HeadingHighlight highlight={"vask8"}>skate shop </HeadingHighlight>
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed uppercase tracking-wider font-medium max-w-[280px]">
                            Hardware de alta precisión y cultura urbana.
                            Nacidos en el asfalto, diseñados para la resistencia. 🛹
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/Vask888..." },
                                { Icon: Facebook, href: "https://www.facebook.com/..." },
                                { Icon: Youtube, href: "#" }
                            ].map(({ Icon, href }, index) => (
                                <Link
                                    key={index}
                                    href={href}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 group"
                                >
                                    <Icon className="w-4 h-4 group-hover:scale-110" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Columna 2: Navegación Técnica */}
                    <div>
                        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-yellow-400"></span> Inventario
                        </h3>
                        <ul className="flex flex-col gap-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                            <li><Link href="/categories/1" className="hover:text-white transition-colors">Skateboards</Link></li>
                            <li><Link href="/categories/2" className="hover:text-white transition-colors">Longboards</Link></li>
                            <li><Link href="/categories/3" className="hover:text-white transition-colors">Penny Boards</Link></li>
                            <li><Link href="/products" className="hover:text-yellow-400 transition-colors italic font-black">Full Catalog</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Support Protocol */}
                    <div>
                        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-yellow-400"></span> Soporte
                        </h3>
                        <ul className="flex flex-col gap-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                            <li><Link href="#" className="hover:text-white transition-colors">Envíos Tácticos</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Guía de Hardware</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Garantía de Impacto</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terminal de Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Columna 4: Newsletter Cyber */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-yellow-400"></span> Únete a la Crew
                        </h3>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="TU_EMAIL@VASK8.COM"
                                className="w-full bg-zinc-900/50 border border-white/10 px-4 py-3 text-[10px] font-bold text-white uppercase tracking-widest focus:border-yellow-400 focus:outline-none transition-all"
                            />
                            <button className="absolute right-2 top-2 p-1.5 bg-yellow-400 text-black hover:scale-110 transition-transform">
                                <Send className="w-3 h-3" />
                            </button>
                        </div>
                        <div className="relative h-24 w-full rounded-lg overflow-hidden border border-white/5 opacity-40 hover:opacity-100 transition-opacity">
                            <Image
                                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHI0OWt6cmYzc2Q3OXA4ZWluMThia3pjY2VlanZ0N3RmZmZyajUzdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OTfveh3PRaAPS/giphy.gif"
                                alt="Skate GIF"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Bar: Metadata */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.2em]">
                            © 2026 VASK8 System / CAZA Agency
                        </p>
                    </div>

                    <div className="flex items-center gap-6 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.1em]">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> 19.4326° N, 99.1332° W</span>
                        <span>Designed for the streets</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}