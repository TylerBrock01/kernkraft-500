import MainNav from "@/components/UI/MainNav";
import {ShoppingCart} from "@/components/cart/ShoppingCart";
import ToastNotification from "@/components/UI/ToastNotification";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <MainNav/>
            <main className="lg:flex  lg:h-screen lg:overflow-y-hidden">
                <div className="md:flex-1 md: md:overflow-y-scroll">
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