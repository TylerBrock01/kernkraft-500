import MainNav from "@/components/UI/MainNav";
import {ShoppingCart} from "@/components/cart/ShoppingCart";
import ToastNotification from "@/components/UI/ToastNotification";
import Image from "next/image";
import Hero from "@/components/UI/Hero";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MainNav/>
            <main className="grid lg: lg:overflow-y-hidden">
                <Hero/>
                <div className="bg-fondo3 md:bg-fondo3/0 md:absolute  md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10">
                    {children}
                </div>
                <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-fondo3 ">
                    <ShoppingCart/>
                </aside>
            </main>
            <ToastNotification />
        </>
    );
}