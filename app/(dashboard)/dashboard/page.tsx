'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {useAuth} from "@/app/context/AuthContext";

export default function CommandCenter() {
    const { user } = useAuth();

    // Definimos qué roles pueden ver qué acciones
    const canOpenRegister = ['admin', 'supervisor', 'vendedor'].includes(user?.role || '');
    const canManageInventory = ['admin', 'supervisor', 'almacen'].includes(user?.role || '');
    const canSeeAnalytics = ['admin', 'supervisor'].includes(user?.role || '');

    return (
        <div className="w-full">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">
                    Bienvenido, Operador <span className="text-zinc-500 uppercase">{user?.name}</span>
                </h1>
                <p className="text-zinc-400 text-sm mt-1">
                    Nivel de Autorización: <span className="text-blue-400 font-mono">{user?.role}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* 🟢 TARJETA DE CAJA (Solo Cajeros y Admins) */}
                {canOpenRegister && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-40 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between hover:border-blue-500/50 hover:bg-zinc-800/50 transition-all text-left group"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                            <span className="text-blue-400">💵</span>
                        </div>
                        <div>
                            <h3 className="text-zinc-100 font-bold text-lg">Terminal de Venta</h3>
                            <p className="text-zinc-500 text-xs mt-1">Abrir caja y procesar cobros</p>
                        </div>
                    </motion.button>
                )}

                {/* 📦 TARJETA DE INVENTARIO (Solo Almacén y Admins) */}
                {canManageInventory && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-40 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:bg-zinc-800/50 transition-all text-left group"
                    >
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                            <span className="text-emerald-400">📦</span>
                        </div>
                        <div>
                            <h3 className="text-zinc-100 font-bold text-lg">Recepción de Carga</h3>
                            <p className="text-zinc-500 text-xs mt-1">Ajustar stock y cancelar productos</p>
                        </div>
                    </motion.button>
                )}

                {/* 📊 TARJETA DE AUDITORÍA (Solo Admins) */}
                {canSeeAnalytics && (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-40 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col justify-between hover:border-purple-500/50 hover:bg-zinc-800/50 transition-all text-left group"
                    >
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                            <span className="text-purple-400">📈</span>
                        </div>
                        <div>
                            <h3 className="text-zinc-100 font-bold text-lg">Auditoría Financiera</h3>
                            <p className="text-zinc-500 text-xs mt-1">Revisar cortes y métricas globales</p>
                        </div>
                    </motion.button>
                )}

            </div>
        </div>
    );
}