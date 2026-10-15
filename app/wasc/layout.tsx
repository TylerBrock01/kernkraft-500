import WascFooter from "@/app/wasc/components/footer";
import WascNavbar from "@/app/wasc/components/navbar";

export default function WascLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-red-500/70 flex flex-col min-h-screen">
            <WascNavbar />
            <p>Wascchildren</p>
            <div className="flex-grow">
                {children}
            </div>
            <p>Wascchildren</p>

            <WascFooter />
        </div>
    );
}