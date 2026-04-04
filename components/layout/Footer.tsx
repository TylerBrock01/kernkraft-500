import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Grid principal */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Columna 1: Marca y Misión */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-zinc-100 rounded-sm flex items-center justify-center">
                                <span className="text-zinc-950 font-black text-[10px]">C</span>
                            </div>
                            <span className="text-lg font-bold tracking-tighter text-zinc-100">
                CRUX <span className="text-zinc-500 font-light italic">AERO</span>
              </span>
                        </div>
                        <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                            Infraestructura digital para negocios de alto rendimiento.
                            Sistemas de punto de venta, control de inventario y monetización automatizada.
                        </p>
                    </div>

                    {/* Columna 2: Producto (Lo que le vendes al cliente) */}
                    <div>
                        <h4 className="text-zinc-100 text-xs font-bold uppercase tracking-widest mb-6">Motor CAZA</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Punto de Venta Físico</a></li>
                            <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Gestión de Rentas</a></li>
                            <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Auditoría de Empleados</a></li>
                            <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Analíticas del Negocio</a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Empresa y Legal (Confianza) */}
                    <div>
                        <h4 className="text-zinc-100 text-xs font-bold uppercase tracking-widest mb-6">Empresa</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Soporte Técnico</a></li>
                            <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Contacto Ventas</a></li>
                            <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Privacidad de Datos</a></li>
                            <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Términos de Servicio</a></li>
                        </ul>
                    </div>
                </div>

                {/* Línea divisoria y Copyright */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-600 text-xs">
                        &copy; {new Date().getFullYear()} CRUX AERO ZENITH Agency. Todos los derechos reservados.
                    </p>

                    {/* 🟢 Indicador de estado del sistema (El toque de confianza B2B) */}
                    <div className="flex items-center gap-2 cursor-pointer group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
                        <span className="text-zinc-500 text-xs font-medium group-hover:text-zinc-300 transition-colors">
              Todos los sistemas operativos
            </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}