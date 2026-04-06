'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import CashMovementModal from "@/components/pos/CashMovementModal";
import Link from "next/link";
import RegisterSummaryTicket from "@/components/pos/RegisterSummaryTicket";
import OpenRegisterForm from "@/components/pos/OpenRegisterForm";
import ActiveRegisterDashboard from "@/components/pos/ActiveRegisterDashboard";
import CloseRegisterModal from "@/components/pos/CloseRegisterModal";
import {useCashRegister} from "@/app/hooks/useCashRegister";

export default function POSTerminalPage() {
    const vault = useCashRegister();
    // refactor
    if (vault.isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest animate-pulse">
                Sincronizando bóveda...
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex flex-col pt-8">

            {/* 1. TICKET FINAL (Si se acaba de cerrar) */}
            <RegisterSummaryTicket
                closeSummary={vault.closeSummary}
                onClose={() => vault.setCloseSummary(null)}
            />

            {/* 2. HEADER DE ESTADO */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Control de Bóveda</h1>
                    <p className="text-zinc-500 text-sm mt-1">Gestión de flujo de efectivo y arqueo de caja</p>
                </div>

                <div className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold border flex items-center gap-2 ${
                    vault.activeSession ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                    <div className={`w-2 h-2 rounded-full ${vault.activeSession ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                    {vault.activeSession ? 'Operativa' : 'Bloqueada'}
                </div>
            </div>

            {/* 3. SWITCHER DE PANTALLAS (Cara A o Cara B) */}
            {!vault.activeSession ? (
                <OpenRegisterForm
                    openingBalance={vault.openingBalance}
                    setOpeningBalance={vault.setOpeningBalance}
                    handleOpenRegister={vault.handleOpenRegister}
                    isOpening={vault.isOpening}
                />
            ) : (
                <ActiveRegisterDashboard
                    activeSession={vault.activeSession}
                    movements={vault.movements}
                    onOpenMovementModal={() => vault.setIsMovementModalOpen(true)}
                    onOpenCloseModal={() => vault.setIsCloseModalOpen(true)}
                    onGoToTerminal={() => toast('El POS está listo', { icon: '💳' })}
                />
            )}

            {/* 4. MODALES ADICIONALES */}
            <CloseRegisterModal
                isOpen={vault.isCloseModalOpen}
                onClose={() => vault.setIsCloseModalOpen(false)}
                actualBalance={vault.actualBalance}
                setActualBalance={vault.setActualBalance}
                closeNotes={vault.closeNotes}
                setCloseNotes={vault.setCloseNotes}
                handleCloseRegister={vault.handleCloseRegister}
                isClosing={vault.isClosing}
            />

            <CashMovementModal
                isOpen={vault.isMovementModalOpen}
                onClose={() => vault.setIsMovementModalOpen(false)}
                onSuccess={vault.fetchMyMovements}
            />

        </div>
    );
}