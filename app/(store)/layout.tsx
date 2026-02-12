import MainNav from "@/components/UI/MainNav";
import {ShoppingCart} from "@/components/cart/ShoppingCart";
import ToastNotification from "@/components/UI/ToastNotification";
import Logo from "@/components/UI/Logo";
import Footer from "@/components/UI/Footer";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen overflow-hidden ">
            {/* Header Fijo */}
            <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl px-5 md:px-10 py-1 grid  border-b border-white/10 shrink-0">
                <Logo/>
                <MainNav/>
            </header>

            {/* Contenedor Principal (Cuerpo) */}
            <main className=" lg:flex flex-1 overflow-y-scroll">

                {/* Sección del Catálogo (Children) con Scroll Propio */}
                <section className="flex-1 scroll-smooth custom-scrollbar">
                    <div className="max-w-7xl ">
                        {children}
                    </div>
                    <Footer/>

                </section>

                {/* Aside (Carrito) con Scroll Propio */}
                <aside className="lg:sticky inset-0 lg:block md:w-96 h-full overflow-y-scroll border-l border-white/10 bg-white p-6 custom-scrollbar">
                    <ShoppingCart/>
                </aside>
            </main>

            <ToastNotification />
        </div>

    );
}