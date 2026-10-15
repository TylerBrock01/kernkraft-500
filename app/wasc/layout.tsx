import WascFooter from "@/app/wasc/components/footer";
import WascNavbar from "@/app/wasc/components/navbar";

export default function WascLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <WascNavbar />
            <div className="flex-grow">
                {children}
            </div>
            <WascFooter />
        </div>
    );
}