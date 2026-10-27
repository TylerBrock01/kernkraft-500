import HmcsNavBar from "@/app/hmcs/_components/hmcsNavBar";
import type {Metadata} from "next";
import {cazaicon} from "@/app/types";
import {CartProvider} from "@/app/hmcs/_context/CartContext";
import CartDrawer from "@/app/hmcs/_components/CartDrawer";
import FloatingCartButton from "@/app/hmcs/_components/FloatingCartButton";

export const metadata: Metadata = {
    title: "LAS HAMACAS",
    description: "Restaurante",
    icons: {
        // icon: `${cazaicon}`,
        // También puedes agregar atajos para apple si lo deseas:
        // apple: `${cazaicon}`,
    },
};

export default function HmcsLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            <div className="bg-white flex flex-col min-h-screen relative">
                <HmcsNavBar />
                <div className="flex-grow z-10">{children}</div>

                {/* Componente lateral del Carrito */}
                <CartDrawer />

                {/* Botón flotante para móvil/escritorio */}
                <FloatingCartButton />
            </div>
        </CartProvider>
    );
}