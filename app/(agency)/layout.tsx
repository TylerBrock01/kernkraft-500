import AgencyHeader from '@/components/layout/AgencyHeader';
import AgencyFooter from '@/components/layout/AgencyFooter';

export default function AgencyLayout({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <AgencyHeader />
            <main className="flex-grow">
                {children}
            </main>
            <AgencyFooter />
        </div>
    );
}