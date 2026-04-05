'use client';

import React, { useState, useEffect } from 'react';
// 🚀 1. Importamos el Router
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';
import CreateBusinessModal from '@/components/superadmin/CreateBusinessModal';

export default function SuperAdminPage() {
    // 🚀 2. Inicializamos el Router
    const router = useRouter();

    const [businesses, setBusinesses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchBusinesses = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/business');
                setBusinesses(Array.isArray(response.data) ? response.data : response.data.data || []);
            } catch (error) {
                toast.error('Error al contactar el servidor maestro');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBusinesses();
    }, [refreshKey]);

    return (
        <div className="w-full h-full flex flex-col pt-4 pb-20">

            {/* HEADER DE MANDO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">Red de Instancias</h1>
                    <p className="text-zinc-500 font-mono text-xs mt-1 uppercase tracking-widest">Nivel de Acceso: SuperAdmin // ROOT</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                >
                    + Desplegar Nuevo Negocio
                </button>
            </div>

            {/* LA TABLA MAESTRA */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md flex flex-col flex-1 min-h-0 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-950/80">
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">ID / Empresa</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Slug</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Suscripción</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Giro</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Estado</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                        {isLoading ? (
                            <tr><td colSpan={5} className="text-center py-10 text-zinc-500 font-mono text-sm animate-pulse">Consultando red de bases de datos...</td></tr>
                        ) : businesses.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-10 text-zinc-500 font-mono text-sm">El servidor no tiene instancias activas.</td></tr>
                        ) : (
                            businesses.map((biz) => (
                                <tr
                                    key={biz.id}
                                    // 🚀 3. EL DETONADOR: Al hacer clic, viajamos al expediente
                                    onClick={() => router.push(`/dashboard/superadmin/${biz.id}`)}
                                    // 🚀 4. UX: Cambiamos cursor-default por cursor-pointer
                                    className="hover:bg-zinc-800/30 transition-colors group cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: biz.config?.primaryColor || '#3b82f6' }}
                                            ></div>
                                            <div>
                                                <p className="text-sm font-bold text-zinc-100">{biz.name}</p>
                                                <p className="text-[9px] text-zinc-500 font-mono mt-0.5">{biz.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-zinc-400 font-mono bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">/{biz.slug}</span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-md border ${
                          biz.plan === 'ZENITH' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' :
                              biz.plan === 'BUSINESS' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                  'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {biz.plan || 'N/A'}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        {biz.type}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {/* Aquí más adelante podemos conectar un isActive real del backend */}
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest border bg-emerald-900/20 text-emerald-400 border-emerald-900/50">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        ONLINE
                      </span>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CreateBusinessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => setRefreshKey(prev => prev + 1)}
            />
        </div>
    );
}