'use client';

import React, { useState, useEffect, use } from 'react';
import { api } from '@/app/lib/axios/axios';

// Utilidades de formateo
const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-MX', options);
};

const translatePaymentMethod = (method: string) => {
    const methods: Record<string, string> = { CASH: 'Efectivo', CARD: 'Tarjeta', TRANSFER: 'Transferencia' };
    return methods[method] || method;
};

export default function PublicTicketPage({ params }: { params: Promise<{ uuid: string }> }) {
    const resolvedParams = use(params);
    const { uuid } = resolvedParams;

    const [ticket, setTicket] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                // Al ser un endpoint público, no requiere JWT
                const response = await api.get(`/tickets/${uuid}`);
                setTicket(response.data);
            } catch (err: any) {
                // Capturamos tu ForbiddenException de la Regla SaaS o el 404
                setError(err.response?.data?.message || 'El ticket no pudo ser localizado.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicket();
    }, [uuid]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin mb-4"></div>
                    <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">Desencriptando Recibo...</p>
                </div>
            </div>
        );
    }

    if (error || !ticket) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-zinc-900/50 border border-red-900/30 rounded-2xl p-8 text-center backdrop-blur-md">
                    <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">✕</div>
                    <h2 className="text-white font-black uppercase tracking-widest mb-2">Acceso Denegado</h2>
                    <p className="text-sm text-zinc-400 font-mono">{error}</p>
                </div>
            </div>
        );
    }

    const { header, customer, details, financials, footer } = ticket;
    const isRental = details.type === 'RENTAL';
    const getStatusTheme = () => {
        // Caso 1: Todo terminado, devuelto o completado (Verde)
        if (
            details.rentalStatus === 'RETURNED' ||
            details.rentalStatus === 'FULFILLED' ||
            details.status === 'COMPLETED'
        ) {
            return {
                titleColor: 'text-emerald-500/70',
                badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
                badgeText: 'text-emerald-400',
                label: 'Completado'
            };
        }

        // Caso 2: Rentas pendientes o no entregadas (Ámbar)
        if (details.rentalStatus === 'UNFULFILLED') {
            return {
                titleColor: 'text-amber-500/70',
                badgeBg: 'bg-amber-500/10 border-amber-500/20',
                badgeText: 'text-amber-400',
                label: 'Pendiente'
            };
        }

        // Caso 3: Rentas activas/En uso (Azul)
        if (details.type === 'RENTAL') {
            return {
                titleColor: 'text-blue-500/70',
                badgeBg: 'bg-blue-500/10 border-blue-500/20',
                badgeText: 'text-blue-400',
                label: 'En Uso'
            };
        }

        // Fallback por defecto
        return {
            titleColor: 'text-zinc-500/70',
            badgeBg: 'bg-zinc-800/50 border-zinc-700/50',
            badgeText: 'text-zinc-400',
            label: details.status || 'Desconocido'
        };
    };

    const theme = getStatusTheme(); // Ejecutamos la función

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 py-12 selection:bg-zinc-800 selection:text-white">

            {/* 🧾 CONTENEDOR DEL TICKET (Estilo Recibo Térmico Digital) */}
            <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative">

                {/* Efecto visual de borde de ticket arriba */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-emerald-500"></div>

                <div className="p-6 md:p-8">

                    {/* ================= CABECERA DEL NEGOCIO ================= */}
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-black text-white uppercase tracking-tight mb-1">{header.businessName}</h1>
                        {header.address && <p className="text-[10px] text-zinc-500 font-mono uppercase leading-relaxed">{header.address}</p>}
                        {header.phone && <p className="text-[10px] text-zinc-500 font-mono uppercase">{header.phone}</p>}
                    </div>

                    <div className="w-full border-b border-dashed border-zinc-800 mb-6"></div>

                    {/* ================= METADATOS ================= */}
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span className="uppercase tracking-widest">Fecha</span>
                            <span>{formatDate(header.date)}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span className="uppercase tracking-widest">Folio</span>
                            <span>{String(header.transactionId).padStart(8, '0')}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span className="uppercase tracking-widest">Cajero</span>
                            <span className="truncate max-w-[150px]">{header.attendedBy.split('@')[0]}</span>
                        </div>

                        <div className="flex justify-between text-[10px] font-mono mt-2 pt-2 border-t border-zinc-900">
                            <span className="uppercase tracking-widest text-zinc-500">Operación</span>
                            <span className={`font-bold uppercase tracking-widest ${isRental ? 'text-blue-400' : 'text-zinc-300'}`}>
                {isRental ? 'Alquiler' : 'Venta'}
              </span>
                        </div>
                    </div>

                    <div className="w-full border-b border-dashed border-zinc-800 mb-6"></div>

                    {/* ================= DATOS DEL CLIENTE Y RENTA (Si aplica) ================= */}
                    <div className="mb-6 space-y-4">
                        {customer ?
                            <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800/50">
                                <p className="text-[9px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Cliente</p>
                                <p className="text-xs font-bold text-zinc-200">{customer.name}</p>
                                <p className="text-[10px] font-mono text-zinc-500 mt-0.5">#{customer.phone}</p>
                            </div>
                                : null
                            }

                        <div className="bg-zinc-900/30 rounded-xl p-4 border border-zinc-800/80">
                            <div className="flex justify-between items-center mb-3">
            <span className={`text-[9px] uppercase font-bold tracking-[0.2em] ${theme.titleColor}`}>
                Estado Operativo
            </span>

                                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${theme.badgeBg} ${theme.badgeText}`}>
                {theme.label}
            </span>
                            </div>

                            {financials.returnDate && (
                                <div className="flex justify-between items-center pt-3 mt-1 border-t border-zinc-800/50 text-[10px] font-mono">
                                    <span className="text-zinc-500 uppercase tracking-wider text-[9px]">Retorno Programado:</span>
                                    <span className="text-zinc-300">
                    {new Date(financials.returnDate).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })}
                </span>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* ================= LISTA DE ARTÍCULOS ================= */}
                    <div className="mb-6">
                        <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest text-zinc-600 mb-2 px-1">
                            <span>Cant x Artículo</span>
                            <span>Importe</span>
                        </div>
                        <div className="space-y-3">
                            {details.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-start text-xs font-mono text-zinc-300 px-1">
                                    <div className="flex gap-2">
                                        <span className="text-zinc-500">{item.quantity}x</span>
                                        <span className="max-w-[160px] leading-tight">{item.name}</span>
                                    </div>
                                    <span>{formatMoney(item.subtotal)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full border-b border-dashed border-zinc-800 mb-4"></div>

                    {/* ================= DESGLOSE FINANCIERO ================= */}
                    <div className="space-y-2 mb-6 px-1">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                            <span>Subtotal</span>
                            <span>{formatMoney(financials.subtotal)}</span>
                        </div>

                        {financials.discount > 0 && (
                            <div className="flex justify-between text-[10px] font-mono text-red-400">
                                <span>Descuento</span>
                                <span>-{formatMoney(financials.discount)}</span>
                            </div>
                        )}

                        {financials.deposit > 0 && (
                            <div className="flex justify-between text-[10px] font-mono text-blue-400">
                                <span>Depósito en Garantía</span>
                                <span>+{formatMoney(financials.deposit)}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-end mt-2 pt-2 border-t border-zinc-900">
                            <span className="text-xs uppercase font-bold tracking-widest text-zinc-300">Total Pago</span>
                            <span className="text-xl font-black font-mono text-emerald-400">{formatMoney(financials.grandTotal)}</span>
                        </div>

                        <div className="flex justify-between text-[9px] uppercase font-bold tracking-widest text-zinc-600 pt-2">
                            <span>Método de Pago</span>
                            <span>{translatePaymentMethod(financials.paymentMethod)}</span>
                        </div>
                    </div>

                    {/* ================= FOOTER Y MENSAJE ================= */}
                    <div className="text-center pt-6 border-t border-zinc-800">
                        <p className="text-xs text-zinc-400 italic mb-6">"{footer.message}"</p>

                        {/* Código de Barras Simulado */}
                        <div className="flex justify-center gap-1 mb-2 opacity-50">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className={`h-8 bg-zinc-600 ${Math.random() > 0.5 ? 'w-1' : 'w-0.5'}`}></div>
                            ))}
                        </div>
                        <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.2em]">{footer.uuid}</p>
                    </div>

                </div>

                {/* ================= MARCA DE AGUA DEL MOTOR CAZA ================= */}
                <div className="bg-black py-3 text-center border-t border-zinc-900 flex flex-col items-center justify-center">
                    <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Comprobante Digitalizado por</p>
                    <a href="https://tu-dominio-caza.com" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mt-0.5 hover:text-white transition-colors">
                        Motor CAZA ⚡
                    </a>
                </div>

            </div>
        </div>
    );
}