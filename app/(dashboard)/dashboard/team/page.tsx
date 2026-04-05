'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { api } from '@/app/lib/axios/axios';
import TeamDrawer from '@/components/team/TeamDrawer';
import SearchInput from '@/components/inventory/SearchInput';
import {useRouter} from "next/navigation"; // 🔍 Reutilizamos nuestra arma secreta

export default function TeamPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const router = useRouter(); // Instanciamos el chofer

    // 🧠 ESTADO DEL RADAR
    const [searchTerm, setSearchTerm] = useState('');
    // 🧠 1. LOS ESTADOS DE PAGINACIÓN
    const take = 10; // Cuántos traemos por página
    const [skip, setSkip] = useState(0); // Cuántos nos saltamos
    const [total, setTotal] = useState(0); // El total real en la base de datos

    // Envolvemos con useCallback para que no haya re-renders innecesarios
    const fetchUsers = useCallback(async (currentSkip = skip, search = searchTerm) => {
        setIsLoading(true);
        try {
            const response = await api.get('/users', {
                // Axios manda esto como ?take=10&skip=0&search=...
                // ¡Exactamente lo que tu PaginationQueryDto espera!
                params: { take, skip: currentSkip, search }
            });

            // Asegúrate de extraer users y total como los manda tu backend
            setUsers(response.data.users || []);
            setTotal(response.data.total || 0);
        } catch (error) {
            console.error('Error obteniendo personal:', error);
        } finally {
            setIsLoading(false);
        }
    }, [skip, searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setSkip(0);
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">Gestión de Personal</h1>
                    <p className="text-zinc-500 text-sm mt-1">Control de accesos y roles operativos</p>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <SearchInput onSearch={handleSearch} />

                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 shrink-0"
                    >
                        <span>+</span> Reclutar
                    </button>
                </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md flex flex-col flex-1 min-h-0">
                <div className="overflow-x-auto flex-1">
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
                            <tr><td colSpan={4} className="text-center py-8 text-zinc-500 text-sm">Escaneando base de datos...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={4} className="text-center py-8 text-zinc-500 text-sm">No se encontraron registros.</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} onClick={() => router.push(`/dashboard/team/${user.id}`)}  className="hover:bg-zinc-800/20 transition-colors group">
                                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest border ${
                          user.role === 'admin' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              user.role === 'almacen' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                  'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}>
                        {user.role}
                      </span>
                                    </td>
                                    <td className="px-6 py-4"><p className="text-sm font-medium text-zinc-100">{user.name} {user.lastName}</p></td>
                                    <td className="px-6 py-4"><p className="text-xs text-zinc-400 font-mono">{user.email}</p></td>
                                    <td className="px-6 py-4 text-right"><span className={`text-[10px] uppercase tracking-widest font-bold ${user.isActive ? 'text-emerald-500' : 'text-red-600'}`}>
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span></td>                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* 🎛️ 3. CONTROLES DE PAGINACIÓN */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-950/50 shrink-0">
                    <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                        Mostrando {users.length > 0 ? skip + 1 : 0} - {Math.min(skip + take, total)} de {total}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSkip(Math.max(0, skip - take))}
                            disabled={skip === 0 || isLoading}
                            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => setSkip(skip + take)}
                            disabled={skip + take >= total || isLoading}
                            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            <TeamDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSuccess={() => fetchUsers(0)} />
        </div>
    );
}