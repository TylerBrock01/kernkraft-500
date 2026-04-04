'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/app/lib/axios/axios';
import TeamDrawer from '@/components/team/TeamDrawer';

export default function TeamPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            // 🚀 VERIFICA ESTA RUTA: Debe coincidir con tu @Get() en NestJS
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error obteniendo personal:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Gestión de Personal</h1>
                    <p className="text-zinc-500 text-sm mt-1">Control de accesos y roles operativos</p>
                </div>
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2"
                >
                    <span>+</span> Reclutar Personal
                </button>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden flex-1">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50">
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Credencial</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Nombre</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Contacto</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Estado</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                        {isLoading ? (
                            <tr><td colSpan={4} className="text-center py-8 text-zinc-500 text-sm">Verificando credenciales...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-8 text-zinc-500 text-sm">No hay personal registrado.</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-zinc-800/20 transition-colors group">
                                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border ${
                          user.role === 'ADMIN' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              user.role === 'ALMACEN' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                  'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}>
                        {user.role}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-zinc-100">{user.name} {user.lastName}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-zinc-400 font-mono">{user.email}</p>
                                        {user.phone && <p className="text-xs text-zinc-600 font-mono mt-0.5">{user.phone}</p>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Activo</span>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TeamDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSuccess={fetchUsers} />
        </div>
    );
}