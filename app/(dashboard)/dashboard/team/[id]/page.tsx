'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';
import TeamDrawer from '@/components/team/TeamDrawer';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const userId = resolvedParams.id;

    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            toast.error('No se pudo localizar el expediente');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchUser();
    }, [userId]);

    // ⚡ Táctica de Suspensión Inmediata
    const handleToggleStatus = async () => {
        const toastId = toast.loading('Modificando acceso...');
        try {
            // NOTA: Asegúrate de tener 'isActive' en tu base de datos de usuarios
            // Si no lo tienes, deberás agregarlo a la entidad User en NestJS
            await api.patch(`/users/${userId}`, { isActive: !user.isActive });
            await fetchUser();
            toast.success(user.isActive ? 'Credencial suspendida' : 'Credencial reactivada', { id: toastId });
        } catch (error) {
            console.error('Error cambiando el estado:', error);
            toast.error('Fallo de autorización', { id: toastId });
        }
    };

    if (isLoading) return <div className="p-8 text-zinc-500 font-mono text-sm uppercase tracking-widest animate-pulse">Recopilando credenciales...</div>;
    if (!user) return <div className="p-8 text-red-500 font-mono text-sm uppercase tracking-widest">Operador no encontrado.</div>;

    return (
        <div className="max-w-6xl w-full">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white flex items-center gap-2 transition-colors"
                >
                    ← Volver a Gestión
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={handleToggleStatus}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${
                            user.isActive !== false // Asumimos true por defecto si no está definido
                                ? 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500 hover:text-white'
                        }`}
                    >
                        {user.isActive !== false ? 'Revocar Acceso' : 'Restaurar Acceso'}
                    </button>

                    <button
                        onClick={() => setIsEditDrawerOpen(true)}
                        className="px-4 py-2 bg-zinc-100 text-zinc-950 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        Editar Credencial
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 🪪 TARJETA DE IDENTIFICACIÓN (Izquierda) */}
                <div className="lg:col-span-1 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 backdrop-blur-md h-fit">
                    <div className="flex flex-col items-center text-center border-b border-zinc-800/50 pb-8 mb-8">
                        <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-3xl font-black text-zinc-500 mb-4 shadow-inner">
                            {user.name.charAt(0)}{user.lastName?.charAt(0)}
                        </div>
                        <h1 className="text-2xl font-bold text-zinc-100">{user.name} {user.lastName}</h1>
                        <span className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border ${
                            user.role === 'ADMIN' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                user.role === 'ALMACEN' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    'bg-zinc-800 text-zinc-300 border-zinc-700'
                        }`}>
              {user.role}
            </span>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">ID Operativo</p>
                            <p className="text-sm text-zinc-300 font-mono break-all">{user.id}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Correo Electrónico</p>
                            <p className="text-sm text-zinc-300 font-mono">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Teléfono</p>
                            <p className="text-sm text-zinc-300 font-mono">{user.phone || 'No registrado'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Estado del Sistema</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${user.isActive !== false ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
                                <p className="text-sm font-mono text-zinc-300">{user.isActive !== false ? 'Autorizado' : 'Bloqueado'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 📊 PANEL DE TRANSACCIONES Y ACTIVIDAD (Derecha) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/20 border border-zinc-800 border-dashed rounded-2xl p-10 backdrop-blur-md h-full flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center text-2xl mb-4 border border-zinc-700/50">
                            📈
                        </div>
                        <h3 className="text-lg font-bold text-zinc-300 mb-2">Historial Operativo y Ventas</h3>
                        <p className="text-sm text-zinc-500 max-w-sm mb-6">
                            El registro de tickets procesados, cortes de caja y métricas de rendimiento del punto de venta se enlazarán aquí próximamente.
                        </p>
                        <div className="px-4 py-2 bg-zinc-950 rounded-lg text-[10px] uppercase tracking-widest font-bold text-zinc-600 border border-zinc-900">
                            Módulo en Construcción
                        </div>
                    </div>
                </div>
            </div>

            <TeamDrawer
                isOpen={isEditDrawerOpen}
                onClose={() => setIsEditDrawerOpen(false)}
                onSuccess={fetchUser}
                userToEdit={user}
            />
        </div>
    );
}