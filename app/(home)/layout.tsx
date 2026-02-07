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
                <div className=" bg-fondo3 md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10">
                    {children}
                </div>
                <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-fondo5 ">
                    <ShoppingCart/>
                </aside>
            </main>
            <ToastNotification />
        </>
    );
}