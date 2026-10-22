
export default function HmcsLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white flex flex-col min-h-screen">
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}