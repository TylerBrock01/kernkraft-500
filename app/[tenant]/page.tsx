'use client';

import React, { useEffect, useState, use } from 'react';
import { motion } from 'framer-motion';
// ⚠️ Usamos tu import ajustado
import { api } from '@/app/lib/axios/axios';
import { useRouter } from 'next/navigation';

export default function TenantPublicPage({ params }: { params: Promise<{ tenant: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const tenantSlug = resolvedParams.tenant;

    const [businessData, setBusinessData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        const fetchTenantData = async () => {
            try {
                // ⚠️ Asumimos que tienes un endpoint público para buscar por slug
                const response = await api.get(`/business/slug/${tenantSlug}`);
                setBusinessData(response.data);
            } catch (error: any) {
                // Si el backend nos dice 404, significa que el espacio está libre
                if (error.response && error.response.status === 404) {
                    setIsAvailable(true);
                } else {
                    console.error('Error buscando el tenant:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (tenantSlug) fetchTenantData();
    }, [tenantSlug]);

    // 1. PANTALLA DE CARGA (Elegante)
    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-zinc-800 border-t-white rounded-full animate-spin"></div>
                    <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Localizando servidor...</p>
                </div>
            </div>
        );
    }

    // 2. EL "ESPECTACULAR" (Tenant Inexistente / Disponible)
    if (isAvailable) {
        return (
            <div className="min-h-screen bg-zinc-950 relative flex items-center justify-center overflow-hidden">
                {/* Fondo estilo "Blueprint / Matrix" de CAZA */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-2xl text-center px-6"
                >
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
              Espacio Digital Disponible
            </span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter mb-6 lowercase">
                        {tenantSlug}<span className="text-zinc-700">.</span>
                    </h1>

                    <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        Este dominio de comercio está vacío. Sé el primero en reclamarlo y lanza tu ecosistema digital completo con toda la potencia del <strong className="text-zinc-200 font-bold">Motor CAZA</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => router.push('/register?tenant=' + tenantSlug)} // Los mandamos a registrarse
                            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 font-bold uppercase tracking-widest text-xs rounded-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            Reclamar este espacio
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-zinc-800 text-zinc-300 font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-zinc-900 transition-all"
                        >
                            Conocer más
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // 3. EL CATÁLOGO PÚBLICO (Si el tenant SÍ existe)
    return (
        <div className="min-h-screen bg-zinc-950 p-8 text-white">
            {/* Aquí construiremos la tienda real en el siguiente paso */}
            <h1 className="text-3xl font-bold">Bienvenido a {businessData.name}</h1>
            <p className="text-zinc-500 font-mono mt-2">ID del Tenant: {businessData.id}</p>
            <div className="mt-8 border border-dashed border-zinc-800 rounded-xl p-12 text-center text-zinc-600 uppercase tracking-widest text-xs">
                Área de construcción: Catálogo Público
            </div>
        </div>
    );
}