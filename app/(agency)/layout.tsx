import AgencyFooter from '@/components/layout/Footer';
import Navbar from "@/components/layout/Navbar";

export default function AgencyLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <AgencyFooter />
        </div>
    );
}