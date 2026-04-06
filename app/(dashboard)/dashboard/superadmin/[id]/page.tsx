'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';

export default function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const businessId = resolvedParams.id;

    const [business, setBusiness] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Estado para la extensión de suscripción
    const [monthsToAdd, setMonthsToAdd] = useState<number | ''>('');

    const fetchBusiness = async () => {
        setIsLoading(true);
        try {
            // ⚠️ Ajustando a tu endpoint /business
            const response = await api.get(`/business/${businessId}`);
            setBusiness(response.data);
        } catch (error) {
            toast.error('Error crítico: Instancia no encontrada');
            router.back();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (businessId) fetchBusiness();
    }, [businessId]);

    // ================= 🚀 ACCIONES SUPERADMIN =================

    // 1. Apagar/Encender Motor
    const handleToggleStatus = async () => {
        // Si la instancia está activa, vamos a apagarla (y viceversa)
        const newStatus = !business.isActive;

        // Doble confirmación si vas a apagar a un cliente
        if (!newStatus && !window.confirm(`¿ESTÁS SEGURO? Vas a apagar la instancia de ${business.name}. Perderán acceso inmediatamente.`)) {
            return;
        }

        setIsProcessing(true);
        const toastId = toast.loading(newStatus ? 'Restaurando conexión...' : 'Cortando suministro...');

        try {
            await api.patch(`/business/${businessId}/status`, { isActive: newStatus });
            toast.success(`Motor ${newStatus ? 'En Línea' : 'Suspendido'}`, { id: toastId });
            fetchBusiness(); // Recargar expediente
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al modificar estado', { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

    // 2. Renovar Suscripción
    const handleExtendSubscription = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!monthsToAdd || monthsToAdd < 1) {
            toast.error('Debes añadir mínimo 1 mes');
            return;
        }

        setIsProcessing(true);
        const toastId = toast.loading('Inyectando meses de servicio...');

        try {
            await api.patch(`/business/${businessId}/subscription`, { monthsToAdd: Number(monthsToAdd) });
            toast.success('Licencia extendida exitosamente', { id: toastId });
            setMonthsToAdd('');
            fetchBusiness(); // Recargar expediente
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Fallo al extender licencia', { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

    // ================= UI RENDER =================

    if (isLoading) return <div className="p-8 text-zinc-500 font-mono text-sm uppercase animate-pulse">Desencriptando base de datos del cliente...</div>;
    if (!business) return null;

    return (
        <div className="max-w-5xl mx-auto w-full pt-8 pb-20">
            <button onClick={() => router.back()} className="mb-8 text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                ← Volver a la Red
            </button>

            {/* 💳 TARJETA DE IDENTIFICACIÓN DE LA INSTANCIA */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl backdrop-blur-md overflow-hidden mb-8 shadow-xl">
                <div className="p-8 border-b border-zinc-800 bg-zinc-950/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-xl border-2 border-zinc-800 shadow-inner flex items-center justify-center font-black text-2xl text-zinc-300" style={{ backgroundColor: business.config?.primaryColor || '#3b82f6' }}>
                            {business.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                {business.name}
                                <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md border ${
                                    business.isActive
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : 'bg-red-500/10 text-red-500 border-red-500/20 animate-pulse'
                                }`}>
                  {business.isActive ? 'ONLINE' : 'OFFLINE'}
                </span>
                            </h1>
                            <p
                                onClick={(e) => {
                                    e.stopPropagation(); // 🛡️ Evita que el click accione la redirección de la fila
                                    navigator.clipboard.writeText(business.id);
                                    toast.success('UUID copiado al portapapeles', {
                                        icon: '📋',
                                        style: { background: '#18181b', color: '#fff', border: '1px solid #27272a', fontSize: '12px' }
                                    });
                                }}
                                className="text-zinc-500 font-mono text-xs mt-1 cursor-copy"
                                title="Clic para copiar UUID"
                            >ID: {business.id}</p>
                            <div className="flex gap-2 mt-3">
                                <span className="px-2 py-1 bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px] font-bold uppercase tracking-widest rounded-md">/{business.slug}</span>
                                <span className="px-2 py-1 bg-blue-900/20 text-blue-400 border border-blue-900/50 text-[10px] font-bold uppercase tracking-widest rounded-md">{business.plan}</span>
                                <span className="px-2 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 text-[10px] font-bold uppercase tracking-widest rounded-md">{business.type}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-left md:text-right w-full md:w-auto bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Configuración Core</p>
                        <p className="text-sm font-mono text-zinc-300">Moneda: <span className="text-emerald-400 font-bold">{business.config?.currency || 'N/A'}</span></p>
                        <p className="text-sm font-mono text-zinc-300">Impuesto: <span className="text-blue-400 font-bold">{business.config?.taxRate || 0}%</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* 🛑 PANEL 1: CONTROL DE ENERGÍA (STATUS) */}
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${business.isActive ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">Switch Principal</h2>
                    <p className="text-sm text-zinc-400 mb-8">
                        {business.isActive
                            ? 'El negocio está operando normalmente. Al suspenderlo, los cajeros y administradores no podrán acceder al sistema.'
                            : 'El negocio está suspendido. Actívalo para restaurar sus operaciones.'}
                    </p>

                    <button
                        onClick={handleToggleStatus}
                        disabled={isProcessing}
                        className={`w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 ${
                            business.isActive
                                ? 'bg-red-950/50 hover:bg-red-600 text-red-500 hover:text-white border border-red-900/50'
                                : 'bg-emerald-950/50 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-900/50'
                        }`}
                    >
                        {isProcessing ? 'Procesando...' : (business.isActive ? '⚠ Suspender Instancia' : '⚡ Reactivar Instancia')}
                    </button>
                </div>

                {/* ⏳ PANEL 2: RENOVACIÓN DE SUSCRIPCIÓN */}
                <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight mb-2">Inyección de Tiempo</h2>
                    <p className="text-sm text-zinc-400 mb-6">Añade meses a la suscripción activa. El sistema sumará el tiempo a su fecha de expiración actual.</p>

                    <form onSubmit={handleExtendSubscription} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Meses a renovar</label>
                            <input
                                type="number"
                                min="1"
                                required
                                value={monthsToAdd}
                                onChange={(e) => setMonthsToAdd(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono text-xl rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                                placeholder="Ej. 12"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isProcessing || !monthsToAdd}
                            className="py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all disabled:opacity-50"
                        >
                            Extender
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}