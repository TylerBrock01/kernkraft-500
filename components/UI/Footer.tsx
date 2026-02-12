import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-5 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                {/* Columna 1: Brand & Logo */}
                <div className="flex flex-col gap-4">
          <span className="text-2xl font-black italic tracking-tighter text-white uppercase">
            SKATE<span className="text-yellow-400">SHOP</span>
          </span>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        La mejor selección de tablas, refacciones y cultura urbana desde 2024.
                        Patina o muere. 🛹
                    </p>
                    <div className="flex gap-4 mt-2">
                        {/* Aquí puedes poner tus iconos de redes sociales */}
                        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer text-white">IG</div>
                        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer text-white">FB</div>
                        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors cursor-pointer text-white">TK</div>
                    </div>
                </div>

                {/* Columna 2: Tienda */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Categorías</h3>
                    <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
                        <li><Link href="/categories/1" className="hover:text-yellow-400 transition-colors">Skateboards</Link></li>
                        <li><Link href="/categories/2" className="hover:text-yellow-400 transition-colors">Longboards</Link></li>
                        <li><Link href="/categories/3" className="hover:text-yellow-400 transition-colors">Penny Boards</Link></li>
                        <li><Link href="/products" className="hover:text-yellow-400 transition-colors">Refacciones</Link></li>
                    </ul>
                </div>

                {/* Columna 3: Soporte */}
                <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-6 text-sm">Soporte</h3>
                    <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
                        <li><Link href="#" className="hover:text-yellow-400 transition-colors">Envíos y Entregas</Link></li>
                        <li><Link href="#" className="hover:text-yellow-400 transition-colors">Guía de Tallas</Link></li>
                        <li><Link href="#" className="hover:text-yellow-400 transition-colors">Términos y Condiciones</Link></li>
                        <li><Link href="#" className="hover:text-yellow-400 transition-colors">Contacto</Link></li>
                    </ul>
                </div>

                {/* Columna 4: Newsletter / GIF */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-white font-bold uppercase tracking-widest mb-4 text-sm">Keep Rolling</h3>
                    <div className="relative h-32 w-full rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all">
                        {/* Aquí usamos tu GIF de Giphy */}
                        <Image
                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHI0OWt6cmYzc2Q3OXA4ZWluMThia3pjY2VlanZ0N3RmZmZyajUzdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OTfveh3PRaAPS/giphy.gif"
                            alt="Skate GIF"
                            // width={100}
                            // height={100}
                            fill
                            unoptimized
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Barra Inferior de Copyright */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-zinc-600 text-xs uppercase tracking-widest">
                    © 2024 SkateShop. Todos los derechos reservados.
                </p>
                <p className="text-zinc-600 text-[10px] uppercase">
                    Diseñado para la calle.
                </p>
            </div>
        </footer>
    );
}
