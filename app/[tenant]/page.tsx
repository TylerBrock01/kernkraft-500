'use client';

import React, { useEffect, useState, use } from 'react';
import { api } from '@/app/lib/axios/axios';
import { useRouter } from 'next/navigation';

// 🎨 IMPORTAMOS TUS TEMAS PERSONALIZADOS
import { motion } from "framer-motion";
import HotdogsDemo from "@/components/themes/HotDogsDemo";
import MadeByAyax from "@/components/themes/Made-by-ayax";
import BurritoThemeMockup from "@/components/themes/Burritos";
import TamalesThemeMockup from "@/components/themes/Tamales";
import TortasFightTheme from "@/components/themes/Tortas";
import BurgerPicnicTheme from "@/components/themes/burger";
// import BarberiaDemo from '@/components/themes/BarberiaDemo';

export default function TenantPublicPage({ params }: { params: Promise<{ tenant: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const tenantSlug = resolvedParams.tenant;

    const [businessData, setBusinessData] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        const fetchTenantData = async () => {
            try {
                const businessRes = await api.get(`/business/slug/${tenantSlug}`);
                setBusinessData(businessRes.data);

                // Traemos el inventario
                const productsRes = await api.get(`/products/public/${tenantSlug}`);
                setProducts(productsRes.data.products || productsRes.data || []);
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    setIsAvailable(true);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (tenantSlug) fetchTenantData();
    }, [tenantSlug]);

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando ecosistema...</div>;
    // if (isAvailable) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Este espacio está libre.</div>; // (Aquí va el espectacular que ya hicimos)

    // 🧠 EL MOTOR DE TEMAS (SWITCHER)
    // Dependiendo del slug del negocio, renderizamos una interfaz completamente distinta

    if (tenantSlug === 'hotdogs') {
        return <HotdogsDemo />;
    }
    else if (tenantSlug === 'made-by-ayax') {
        return <MadeByAyax/>
    }
    else if (tenantSlug === 'burritos') {
        return <BurritoThemeMockup/>
    }
    else if (tenantSlug === 'tamales'){
        return <TamalesThemeMockup/>
    }
    else if (tenantSlug ==='tortas'){
        return <TortasFightTheme/>
    }
    else if (tenantSlug ==='burger'){
        return <BurgerPicnicTheme/>
    }

    // if (tenantSlug === 'barberia-bro') {
    //   return <BarberiaDemo business={businessData} products={products} />;
    // }

    // 🛡️ FALLBACK: Si es un cliente nuevo y aún no le diseñas su tema único,
    // le muestras la plantilla genérica oscura y corporativa.
    return (
        <div className="min-h-screen bg-zinc-950 relative flex items-center justify-center overflow-hidden">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-2xl text-center px-6">

                <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">

                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Espacio Digital Disponible</span>

                </div>

                <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter mb-6 lowercase">{tenantSlug}<span className="text-zinc-700">.</span></h1>

                <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">Este dominio de comercio está vacío. Sé el primero en reclamarlo y lanza tu ecosistema digital completo con toda la potencia del <strong className="text-zinc-200 font-bold">Motor CAZA</strong>.</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                    <button onClick={() => router.push('/register?tenant=' + tenantSlug)} className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 font-bold uppercase tracking-widest text-xs rounded-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">Reclamar este espacio</button>

                    <button onClick={() => router.push('/')} className="w-full sm:w-auto px-8 py-4 bg-transparent border border-zinc-800 text-zinc-300 font-bold uppercase tracking-widest text-xs rounded-lg hover:bg-zinc-900 transition-all">Conocer más</button>

                </div>

            </motion.div>

        </div>
    );
}