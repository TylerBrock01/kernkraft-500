import MainNav from "@/components/UI/MainNav";
import {ShoppingCart} from "@/components/cart/ShoppingCart";
import ToastNotification from "@/components/UI/ToastNotification";
import Logo from "@/components/UI/Logo";
import Link from "next/link";
import DeckPage from "@/components/UI/DeckNav";
import LastProducts from "@/app/(store)/products/lastProducts/page";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen overflow-hidden ">
            {/* Header Fijo */}
            <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl px-5 md:px-10 py-1 grid animate-fade-in-down border-b border-white/10 shrink-0">
                <Logo/>
                <MainNav/>
            </header>

            {/* Contenedor Principal (Cuerpo) */}
            <main className="flex flex-1 overflow-hidden">

                {/* Sección del Catálogo (Children) con Scroll Propio */}
                <section className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
                    <div className="max-w-7xl mx-auto  px-4">
                        {children}
                    </div>
                </section>

                {/* Aside (Carrito) con Scroll Propio */}
                <aside className="hidden lg:block w-96 h-full overflow-y-auto border-l border-white/10 bg-white p-6 custom-scrollbar">
                    <ShoppingCart/>
                </aside>

            </main>

            <ToastNotification />
        </div>

    );
}