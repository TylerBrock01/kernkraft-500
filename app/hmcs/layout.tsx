import HmcsNavBar from "@/app/hmcs/_components/hmcsNavBar";
import type {Metadata} from "next";
import {cazaicon} from "@/app/types";

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
        <div className="bg-white flex flex-col min-h-screen">
            <HmcsNavBar/>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}