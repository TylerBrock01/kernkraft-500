import WascNavbar from "@/app/wasc/_components/wascNavbar";
import WascFooter from "@/app/wasc/_components/footer";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "WE ARE SAN CARLOS",
    description: "Inmobiliaria",
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