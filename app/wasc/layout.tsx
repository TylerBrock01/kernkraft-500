import WascNavbar from "@/app/wasc/_components/wascNavbar";
import WascFooter from "@/app/wasc/_components/footer";
import type {Metadata} from "next";
import {logoWasc0} from "@/app/wasc/data/url";

export const metadata: Metadata = {
    title: "WE ARE SAN CARLOS",
    description: "Encuentra el espacio perfecto para tu próximo capítulo.",
    icons: {
        icon: `${logoWasc0}`,
        // También puedes agregar atajos para apple si lo deseas:
        apple: `${logoWasc0}`,
    },
};

export default function WascLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white flex flex-col min-h-screen">
            <WascNavbar />
            <div className="flex-grow">
                {children}
            </div>
            <WascFooter />
        </div>
    );
}