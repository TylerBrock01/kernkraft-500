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
        <>
            <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl px-5 md:px-10 py-1 gap-1  grid animate-fade-in-down">
                <Logo/>
                <MainNav/>
            </header>
            <main className="lg:flex  lg:h-screen lg:overflow-y-hidden gap-1">
                <div className="">
                    {children}
                </div>
                <aside className="md:w-96 md:h-screen md:overflow-y-scroll mt-10 pt-10 pb-32 px-5 bg-white">
                    <ShoppingCart/>
                </aside>
            </main>
            <ToastNotification />
        </>
    );
}