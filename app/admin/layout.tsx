// app/admin/layout.tsx
import ToastNotification from "@/components/UI/ToastNotification";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-black selection:bg-yellow-400 selection:text-black">
            {/* Navegación Superior */}
            <AdminNav />

            <main className="container mx-auto py-10 px-4 md:px-10 lg:px-8 max-w-[1400px]">
                {/* CONTENEDOR DE LA TERMINAL:
                    Cambiamos bg-white por un fondo zinc profundo con desenfoque
                */}
                <div className="relative bg-zinc-900/30 border border-white/5 backdrop-blur-md p-6 md:p-12 shadow-2xl overflow-hidden">

                    {/* Detalle Táctico: Línea de estado en la parte superior */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

                    {/* Decoración de Esquina (Look Industrial) */}
                    <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-yellow-400/10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-yellow-400/5 pointer-events-none" />

                    {/* Contenido Principal */}
                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </main>

            <ToastNotification />
        </div>
    );
}