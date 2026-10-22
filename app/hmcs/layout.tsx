import HmcsNavBar from "@/app/hmcs/_components/hmcsNavBar";

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