// /app/hmcs/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CartProvider } from "@/app/hmcs/_context/CartContext";
import CartDrawer from "@/app/hmcs/_components/CartDrawer";
import HmcsNavBar from "@/app/hmcs/_components/hmcsNavBar";

export const metadata: Metadata = {
    title: {
        default: "Las Hamacas",
        template: "%s | Las Hamacas",
    },
    description: "Restaurante",
};

export default function HmcsLayout({ children }: { children: ReactNode }) {
    return (
        <CartProvider>
            <div className="flex min-h-dvh flex-col bg-white">
                <HmcsNavBar />

                <main className="grow">{children}</main>

                <CartDrawer />
            </div>
        </CartProvider>
    );
}