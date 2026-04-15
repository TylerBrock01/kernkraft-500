'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import {Fingerprint} from "lucide-react";

type ModalType = 'CANCEL' | 'REFUND' | 'RETURN' | 'UNFULFILLED' | null;

export default function TransactionAuditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const transactionId = resolvedParams.id;

    const [tx, setTx] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // ================= ESTADOS PARA FORMULARIOS =================

    // Para Cancelar
    const [cancelReason, setCancelReason] = useState('');

    // Para Reembolsos (Refund)
    const [refundReason, setRefundReason] = useState('');
    const [refundItems, setRefundItems] = useState<any[]>([]);

    //Para pick up
    const [pickUp, setPickUp] = useState('');


    // Para Retorno de Renta (ReturnRental)
    const [penaltyAmount, setPenaltyAmount] = useState<number>(0);
    const [penaltyReason, setPenaltyReason] = useState('');
    const [damagedItems, setDamagedItems] = useState<any[]>([]);

    // 1. CARGAR EL EXPEDIENTE DE LA TRANSACCIÓN
    const fetchTransaction = async () => {
        setIsLoading(true);
        try {
            // ⚠️ Ajusta la ruta a tu controlador real de transacciones
            const response = await api.get(`/transactions/${transactionId}`);
            const data = response.data;
            setTx(data);

            // Preparamos los arrays para los formularios basados en los contenidos
            if (data.contents) {
                setRefundItems(data.contents.map((item: any) => ({
                    productId: item.productId,
                    productName: item.product?.name || `ID: ${item.productId}`,
                    maxQty: item.quantity,
                    returnQty: 0,
                    defectiveQty: 0
                })));

                setDamagedItems(data.contents.map((item: any) => ({
                    productId: item.productId,
                    productName: item.product?.name || `ID: ${item.productId}`,
                    maxQty: item.quantity,
                    damagedQty: 0
                })));
            }
        } catch (error) {
            toast.error('No se pudo localizar el folio');
            router.back();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (transactionId) fetchTransaction();
    }, [transactionId]);

    // ================= 🚀 ACCIONES DE IMPACTO =================

    const handleCancel = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        const toastId = toast.loading('Anulando folio y revirtiendo operaciones...');
        try {
            await api.patch(`/transactions/${transactionId}/cancel`, { reason: cancelReason });
            toast.success('Transacción cancelada y auditada', { id: toastId });
            setActiveModal(null);
            fetchTransaction();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al cancelar', { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRefund = async (e: React.FormEvent) => {
        e.preventDefault();

        // Filtramos solo los items que realmente están devolviendo (returnQty > 0)
        const itemsToRefund = refundItems
            .filter(item => item.returnQty > 0)
            .map(item => ({
                productId: item.productId,
                quantityToReturn: Number(item.returnQty),
                defectiveQuantity: Number(item.defectiveQty)
            }));

        if (itemsToRefund.length === 0) {
            toast.error('Debes devolver al menos 1 artículo');
            return;
        }

        setIsProcessing(true);
        const toastId = toast.loading('Procesando reembolso y analizando mermas...');
        try {
            await api.post(`/transactions/${transactionId}/refund`, { items: itemsToRefund, reason: refundReason });
            toast.success('Reembolso aplicado exitosamente', { id: toastId });
            setActiveModal(null);
            fetchTransaction();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al reembolsar', { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReturnRental = async (e: React.FormEvent) => {
        e.preventDefault();

        // Filtramos solo los items marcados como dañados
        const itemsDamaged = damagedItems
            .filter(item => item.damagedQty > 0)
            .map(item => ({
                productId: item.productId,
                quantity: Number(item.damagedQty)
            }));

        setIsProcessing(true);
        const toastId = toast.loading('Sellando retorno de alquiler...');
        try {
            const payload: any = {};
            if (penaltyAmount > 0) payload.penaltyAmount = Number(penaltyAmount);
            if (penaltyReason) payload.penaltyReason = penaltyReason;
            if (itemsDamaged.length > 0) payload.damagedItems = itemsDamaged;

            await api.post(`/transactions/${transactionId}/return`, payload);
            toast.success('Alquiler cerrado. Equipo en almacén.', { id: toastId });
            setActiveModal(null);
            fetchTransaction();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Error al retornar equipo', { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };
    const handleConfirmDelivery = async () => {
        setIsProcessing(true);
        const loadingToast = toast.loading('Registrando entrega en el sistema...');

        try {
            // Usamos el mismo endpoint "resolve" que ya creamos en el backend
            await api.patch(`/transactions/${tx.id}/resolve`);

            toast.success('¡Entregado! El paquete ya no aparecerá en el Radar.', { id: loadingToast });
            setActiveModal(null); // Cerramos tu modal

            // Aquí recargas los datos de la transacción para que la UI se actualice
            fetchTransaction();

        } catch (error) {
            toast.error('Error al registrar entrega', { id: loadingToast });
        } finally {
            setIsProcessing(false);
        }
    };

    // ================= UI RENDER =================

    if (isLoading) return <div className="p-8 text-zinc-500 font-mono text-sm uppercase animate-pulse">Desencriptando folio...</div>;
    if (!tx) return null;

    const isRental = tx.type === 'RENTAL';
    const isPickUp = tx.type === 'SALE' && tx.rentalStatus ==='UNFULFILLED'
    const isCompleted = tx.status === 'COMPLETED';
    const isRentalOut = isRental && tx.rentalStatus === 'OUT';

    return (
        <div className="max-w-5xl mx-auto w-full pt-8 pb-20">
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => router.back()} className="text-zinc-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                    ← Volver al Historial
                </button>
                <div className="flex gap-2">
                    {/* BOTONES TÁCTICOS (Se ocultan si la transacción ya no es operable) */}
                    {isCompleted && (
                        <button onClick={() => setActiveModal('CANCEL')} className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            Anular Folio
                        </button>
                    )}

                    {isCompleted && !isRental && (
                        <button onClick={() => setActiveModal('REFUND')} className="px-4 py-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                            Aplicar Reembolso
                        </button>
                    )}

                    {isRentalOut && (
                        <button onClick={() => setActiveModal('RETURN')} className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                            Registrar Devolución (Renta)
                        </button>
                    )}
                    {isPickUp && (
                        <button
                            onClick={() => setActiveModal('UNFULFILLED')}
                            className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                        >
                            Registrar Entrega (Pick-Up)
                        </button>
                    )}
                </div>
            </div>

            {/* 📄 EL DOCUMENTO DEL FOLIO */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl backdrop-blur-md overflow-hidden">
                {/* Cabecera del Documento */}
                <div className=" grid md:flex gap-2 p-8 border-b border-zinc-800 bg-zinc-950/50  justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-black text-white tracking-tight">Folio #{tx.id}</h1>
                            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md border ${
                                tx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    tx.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                        'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                        }`}>
                                {tx.status}
                            </span>
                            <span className={`px-2 py-1 border  text-[10px] font-bold uppercase tracking-widest rounded-md 
                            ${tx.type === "RENTAL" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :"bg-zinc-800 text-zinc-400 border border-zinc-700"}`}>
                                {tx.type}
                            </span>
                        </div>
                        <p
                            onClick={(e) => {
                                e.stopPropagation(); // 🛡️ Evita que el click accione la redirección de la fila
                                navigator.clipboard.writeText(tx.uuid);
                                toast.success('UUID copiado al portapapeles', {
                                    icon: '📋',
                                    style: { background: '#18181b', color: '#fff', border: '1px solid #27272a', fontSize: '12px' }
                                });
                            }}
                            className="text-zinc-500 cursor-copy font-mono text-xs"
                            title="Copiar UUID"
                        >UUID: {tx.uuid}</p>
                        <p className="text-zinc-400 text-sm mt-4">Fecha Operación: {new Date(tx.transactionDate).toLocaleString()}</p>
                        {isRental && tx.rentalStatus && (
                            <p className="text-blue-400 font-mono text-xs mt-2 font-bold uppercase tracking-widest">
                                Estado Equipo: {tx.rentalStatus} {tx.returnDate && `(Devolución: ${new Date(tx.returnDate).toLocaleDateString()})`}
                            </p>
                        )}
                        <div className="flex flex-wrap justify-between md:justify-start gap-3 py-1 mt-3 border-t border-zinc-800/50">

                            {/* 👤 BOTÓN TÁCTICO DE CLIENTE */}
                            {tx.customerId && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // 🚀 Aquí pones tu redirección, ej: router.push(`/dashboard/customers/${tx.customerId}`)
                                    }}
                                    title="Ver expediente del cliente"
                                    className="group flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 hover:bg-blue-900/20 border border-zinc-800 hover:border-blue-500/50 rounded-lg transition-all duration-300 cursor-pointer"
                                >
                                    <div className="w-5 h-5 rounded-md bg-zinc-800 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors">
                                        <svg className="w-3 h-3 text-zinc-400 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-blue-400/70 transition-colors">
                    Cliente
                </span>
                                        <span className="text-xs font-mono font-bold text-zinc-300 group-hover:text-blue-400 transition-colors leading-none mt-0.5">
                    {tx.customerId}
                </span>
                                    </div>
                                    {/* Ícono de flecha de redirección */}
                                    <svg className="w-3 h-3 text-zinc-600 group-hover:text-blue-400 transition-colors ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>
                            )}

                            {/* 🛡️ BADGE DE OPERADOR (Mantenemos el estilo para que haga juego) */}
                            <Link
                                href={`/dashboard/team/${tx.userId}`}
                                // 1. Agregamos 'group' y transiciones suaves para el contenedor
                                className="group flex items-center gap-3 px-3 py-2 bg-zinc-900/40 border border-zinc-800/80 rounded-xl hover:bg-zinc-800/80 hover:border-zinc-600 transition-all duration-300 cursor-pointer"
                            >
                                {/* 2. Contenedor del ícono táctico (Reacciona al hover del padre) */}
                                <div className="p-1.5 bg-zinc-950 border border-zinc-800/80 rounded-lg group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors duration-300">
                                    <Fingerprint size={14} className="text-zinc-600 group-hover:text-emerald-500 transition-colors duration-300" />
                                </div>

                                {/* 3. Bloque de texto */}
                                <div className="flex flex-col text-left">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300">
            Operador
        </span>
                                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white leading-none mt-1 transition-colors duration-300">
            {tx.userId ? tx.userId : 'DESCONOCIDO'}
        </span>
                                </div>
                            </Link>

                        </div>

                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Total Pagado</p>
                        <p className="text-4xl font-black font-mono text-emerald-400">${Number(tx.total).toFixed(2)}</p>
                        <p className="text-xs text-zinc-500 font-mono mt-1">Método: {tx.paymentMethod}</p>
                        {isRental && tx.depositAmount > 0 && (
                            <p className="text-xs text-blue-400 font-mono mt-2">Depósito retenido: ${Number(tx.depositAmount).toFixed(2)}</p>
                        )}
                    </div>
                </div>

                {/* Desglose de Contenidos */}
                <div className="p-8">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Contenido de la Transacción</h3>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-900/50 border-b border-zinc-800 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                            <tr>
                                <th className="px-6 py-3">Cant.</th>
                                <th className="px-6 py-3">Artículo</th>
                                <th className="px-6 py-3 text-right">Precio Unitario</th>
                                <th className="px-6 py-3 text-right">Subtotal</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                            {tx.contents?.map((item: any) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 font-mono text-zinc-300">{item.quantity}x</td>
                                    <td className="px-6 py-4 text-sm text-zinc-100 font-medium">{item.product?.name || 'Producto Desconocido'}</td>
                                    <td className="px-6 py-4 text-right font-mono text-zinc-400">${Number(item.price).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right font-mono text-emerald-400 font-bold">${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ================= MODALES DE AUDITORÍA ================= */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => !isProcessing && setActiveModal(null)} />

                        <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} className="relative bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">

                            {/* === MODAL: CANCELAR === */}
                            {activeModal === 'CANCEL' && (
                                <form onSubmit={handleCancel} className="space-y-6">
                                    <h3 className="text-2xl font-black text-red-500 uppercase tracking-tight mb-2">Anulación Total</h3>
                                    <p className="text-sm text-zinc-400 mb-6">Esta acción destruirá el folio, regresará todo el stock al inventario y registrará un evento crítico en el Audit Log. Esta acción es irreversible.</p>

                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Motivo de la Cancelación (Obligatorio)</label>
                                        <textarea required minLength={5} maxLength={255} value={cancelReason} onChange={e => setCancelReason(e.target.value)} rows={3} className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none" placeholder="Ej. El cliente no tenía fondos en su tarjeta..." />
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-zinc-800">
                                        <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Abortar</button>
                                        <button type="submit" disabled={isProcessing} className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all disabled:opacity-50">Confirmar Anulación</button>
                                    </div>
                                </form>
                            )}

                            {/* === MODAL: REEMBOLSO PARCIAL/TOTAL === */}
                            {activeModal === 'REFUND' && (
                                <form onSubmit={handleRefund} className="space-y-6">
                                    <h3 className="text-2xl font-black text-orange-500 uppercase tracking-tight mb-2">Procesar Devolución</h3>
                                    <p className="text-sm text-zinc-400 mb-6">Selecciona qué artículos devuelve el cliente. Especifica si el artículo está en buen estado (regresa al stock) o si es merma (inservible).</p>

                                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                                        {refundItems.map((item, index) => (
                                            <div key={item.productId} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                                                <p className="font-bold text-sm text-zinc-200 mb-3">{item.productName} <span className="text-zinc-500 font-mono font-normal">(Compró: {item.maxQty})</span></p>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block mb-1">Cantidad a devolver</label>
                                                        <input type="number" min="0" max={item.maxQty} value={item.returnQty} onChange={e => {
                                                            const val = Number(e.target.value);
                                                            const newItems = [...refundItems];
                                                            newItems[index].returnQty = val;
                                                            // Asegurar que mermas no supere lo devuelto
                                                            if (newItems[index].defectiveQty > val) newItems[index].defectiveQty = val;
                                                            setRefundItems(newItems);
                                                        }} className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white font-mono text-sm outline-none focus:border-orange-500" />
                                                    </div>
                                                    <div>
                                                        <label className="text-[9px] uppercase tracking-widest text-red-400 font-bold block mb-1">¿Cuántos vienen ROTOS/MERMA?</label>
                                                        <input type="number" min="0" max={item.returnQty} disabled={item.returnQty === 0} value={item.defectiveQty} onChange={e => {
                                                            const newItems = [...refundItems];
                                                            newItems[index].defectiveQty = Number(e.target.value);
                                                            setRefundItems(newItems);
                                                        }} className="w-full bg-zinc-950 border border-red-900/50 rounded px-3 py-2 text-red-400 font-mono text-sm outline-none focus:border-red-500 disabled:opacity-50" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block mt-4">Motivo / Notas del Cajero</label>
                                        <input type="text" value={refundReason} onChange={e => setRefundReason(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm rounded-lg px-4 py-3 outline-none focus:border-orange-500" placeholder="Ej. Defecto de fábrica en el engranaje..." />
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-zinc-800">
                                        <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white">Cancelar</button>
                                        <button type="submit" disabled={isProcessing} className="flex-1 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest text-xs rounded-xl disabled:opacity-50">Ejecutar Reembolso</button>
                                    </div>
                                </form>
                            )}

                            {/* === MODAL: RETORNO DE ALQUILER === */}
                            {activeModal === 'RETURN' && (
                                <form onSubmit={handleReturnRental} className="space-y-6">
                                    <h3 className="text-2xl font-black text-blue-400 uppercase tracking-tight mb-2">Ingreso de Alquiler</h3>
                                    <p className="text-sm text-zinc-400 mb-6">El equipo regresó al almacén. Revisa la integridad del material. Si hay daños irreparables, regístralos como merma y aplica una penalización si corresponde.</p>

                                    <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-red-400 block mb-1">Mermas (Equipo no recuperable)</label>
                                        {damagedItems.map((item, index) => (
                                            <div key={item.productId} className="flex items-center gap-4 bg-zinc-900 border border-red-900/30 p-3 rounded-lg">
                                                <div className="flex-1 text-sm text-zinc-200">{item.productName} <span className="text-zinc-500 font-mono text-xs">(Rentó: {item.maxQty})</span></div>
                                                <div className="w-24">
                                                    <input type="number" min="0" max={item.maxQty} value={item.damagedQty} onChange={e => {
                                                        const newItems = [...damagedItems];
                                                        newItems[index].damagedQty = Number(e.target.value);
                                                        setDamagedItems(newItems);
                                                    }} className="w-full bg-zinc-950 border border-red-900 rounded px-2 py-1 text-red-400 font-mono text-sm outline-none text-right" placeholder="0" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 bg-blue-900/10 border border-blue-900/30 p-4 rounded-xl">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-2">Cargo por Penalización ($)</label>
                                            <input type="number" min="0" step="0.01" value={penaltyAmount} onChange={e => setPenaltyAmount(Number(e.target.value))} className="w-full bg-zinc-950 border border-zinc-800 text-white font-mono rounded-lg px-4 py-3 outline-none focus:border-blue-500" placeholder="0.00" />
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-2">Motivo de Penalización</label>
                                            <input type="text" value={penaltyReason} onChange={e => setPenaltyReason(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-sm" placeholder="Ej. Lona quemada..." />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-zinc-800">
                                        <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white">Cancelar</button>
                                        <button type="submit" disabled={isProcessing} className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-xl disabled:opacity-50">Cerrar Alquiler</button>
                                    </div>
                                </form>
                            )}

                            {/* 🛑 EL MODAL DE CONFIRMACIÓN */}
                            {activeModal === 'UNFULFILLED' && (
                                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-sm w-full text-center space-y-6">
                                        <h3 className="text-xl font-bold text-white tracking-tight">Confirmar Entrega</h3>
                                        <p className="text-zinc-400 text-sm">
                                            ¿Confirmas que estás entregando este paquete al cliente físicamente? Esta acción lo removerá del Radar Logístico.
                                        </p>
                                        <div className="flex gap-3 justify-center">
                                            <button
                                                onClick={() => setActiveModal(null)}
                                                className="px-4 py-2 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:text-white"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={handleConfirmDelivery}
                                                disabled={isProcessing}
                                                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-blue-500 disabled:opacity-50"
                                            >
                                                {isProcessing ? 'Procesando...' : 'Sí, Entregar'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}