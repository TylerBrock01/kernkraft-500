import {ShoppingCart} from "@/components/cart/ShoppingCart";
import ToastNotification from "@/components/UI/ToastNotification";
import Footer from "@/components/UI/Footer";
import {cookies} from "next/headers";
import Header from "@/components/UI/Header";
import MainNav from "@/components/UI/MainNav";

// app/layout.tsx
export default async function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.has('skate_token');

    return (
        <div className="flex flex-col h-[100dvh] overflow-hidden bg-black text-zinc-400 font-sans selection:bg-yellow-400 selection:text-black">
            {/* Header: Siempre visible en la parte superior */}
            <Header/>

            <main className="flex flex-1 overflow-hidden relative">
                {/* Contenedor Único de Scroll:
                   Aquí vive el MainNav, los Productos y el Footer.
                   Es la mejor experiencia para pulgares en móvil.
                */}
                <section className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar bg-black">

                    {/* Contenedor de Navegación: Lo separamos visualmente con un fondo sutil */}
                    <div className="bg-zinc-950/50 border-b border-white/5 mb-6">
                        <MainNav/>
                    </div>

                    {/* Contenido Dinámico: Hero, Listas de productos, etc. */}
                    <div className=" px-4 md:px-10">
                        {children}
                    </div>

                    <Footer/>
                </section>

                {/* Carrito lateral:
                   Solo aparece en pantallas gigantes (xl) para no estorbar.
                */}
                {isAuthenticated && <ShoppingCart />}
            </main>

            <ToastNotification />
        </div>
    );
}