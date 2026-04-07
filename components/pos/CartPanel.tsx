import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {PaymentMethod} from "@/app/types";

// Definimos una interfaz robusta para las propiedades
interface CartPanelProps {
    cart: any[];
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    selectedCustomer: any;
    setSelectedCustomer: (c: any) => void;
    customerSearch: string;
    setCustomerSearch: (s: string) => void;
    customerResults: any[];
    setCustomerResults: (r: any[]) => void;
    setIsCustomerDrawerOpen: (v: boolean) => void;
    transactionType: 'SALE' | 'RENTAL';
    setTransactionType: (t: 'SALE' | 'RENTAL') => void;
    depositAmount: number;
    setDepositAmount: (a: number) => void;
    returnDate: string;
    setReturnDate: (d: string) => void;
    paymentMethod: string;
    setPaymentMethod: (m: PaymentMethod) => void;
    subtotal: number;
    total: number;
    isProcessing: boolean;
    handleCheckout: () => void;
    isMobileOpen: boolean;
    onCloseMobile: () => void;
}

export default function CartPanel(props: CartPanelProps) {
    const {
        cart, removeFromCart, updateQuantity, selectedCustomer, setSelectedCustomer,
        customerSearch, setCustomerSearch, customerResults, setCustomerResults,
        setIsCustomerDrawerOpen, transactionType, setTransactionType, depositAmount,
        setDepositAmount, returnDate, setReturnDate, paymentMethod, setPaymentMethod,
        subtotal, total, isProcessing, handleCheckout,
        isMobileOpen, onCloseMobile // 🚀 Recibimos las nuevas props
    } = props;

    return (
        <>
            {/* 🌑 OVERLAY OSCURO PARA MÓVIL */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onCloseMobile}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* 🛒 EL PANEL (Fijo en PC, Drawer en Móvil) */}
            <div className={`
                fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-zinc-900 flex flex-col shadow-2xl border-l border-zinc-800
                transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                md:relative md:w-96 md:h-auto md:z-20 md:shadow-none md:translate-x-0
                ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>

                {/* 📱 HEADER SOLO PARA MÓVIL (Para poder cerrar el ticket) */}
                <div className="flex md:hidden items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
                    <h3 className="font-black text-sm uppercase tracking-widest text-white">Ticket en Curso</h3>
                    <button onClick={onCloseMobile} className="text-red-600 hover:text-white p-2">✕</button>
                </div>

                {/* 👤 SECCIÓN DE CLIENTE */}
                <div className="p-3 md:p-4 border-b border-zinc-800 bg-zinc-950 relative z-10 shrink-0">
                    {!selectedCustomer ? (
                        <div className="relative">
                            <div className="flex gap-2">
                                <input type="text" value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)} placeholder="Vincular Cliente..." className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors" />
                                <button onClick={() => setIsCustomerDrawerOpen(true)} className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-bold text-zinc-300 transition-colors shrink-0">+ Nuevo</button>
                            </div>
                            {/* Menú Flotante */}
                            {customerResults.length > 0 && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50">
                                    {customerResults.map(c => (
                                        <button key={c.id} onClick={() => { setSelectedCustomer(c); setCustomerSearch(''); setCustomerResults([]); }} className="w-full text-left px-4 py-2 text-xs text-zinc-200 hover:bg-blue-600 hover:text-white transition-colors flex justify-between items-center">
                                            <span className="truncate pr-2">{c.name}</span>
                                            {c.hasRetainedId && <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-900/30 px-1.5 py-0.5 rounded shrink-0">ID Retenida</span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-between items-center bg-blue-900/10 border border-blue-900/30 rounded-lg p-2.5">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold text-sm shrink-0">{selectedCustomer.name.charAt(0)}</div>
                                <div className="truncate">
                                    <p className="text-xs font-bold text-blue-100 truncate">{selectedCustomer.name}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedCustomer(null)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-500/20 text-zinc-500 hover:text-red-500 shrink-0">✕</button>
                        </div>
                    )}
                </div>

                {/* Tipo de Operación */}
                <div className="p-3 md:p-4 border-b border-zinc-800 bg-zinc-950/50 shrink-0">
                    <div className="flex rounded-lg bg-zinc-900 p-1 border border-zinc-800">
                        <button onClick={() => setTransactionType('SALE')} className={`flex-1 py-1.5 text-[9px] md:text-[10px] font-bold tracking-widest uppercase rounded-md transition-all ${transactionType === 'SALE' ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-white'}`}>Venta Directa</button>
                        <button onClick={() => setTransactionType('RENTAL')} className={`flex-1 py-1.5 text-[9px] md:text-[10px] font-bold tracking-widest uppercase rounded-md transition-all ${transactionType === 'RENTAL' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}>Alquiler</button>
                    </div>
                </div>

                {/* Lista de Items */}
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3">
                    <AnimatePresence>
                        {cart.length === 0 ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center text-zinc-600 text-[10px] md:text-xs font-mono uppercase text-center">El ticket está en blanco</motion.div>
                        ) : (
                            cart.map(item => (
                                <motion.div key={item.product.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col p-2.5 md:p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-xs md:text-sm truncate pr-2">{item.product.name}</span>
                                        <button onClick={() => removeFromCart(item.product.id)} className="text-zinc-600 hover:text-red-500 shrink-0">✕</button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 md:gap-3 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                                            <button onClick={() => updateQuantity(item.product.id, -1)} className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded">-</button>
                                            <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product.id, 1)} className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded">+</button>
                                        </div>
                                        <span className="font-mono font-bold text-emerald-400 text-xs md:text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Zona de Cobro */}
                <div className="bg-zinc-950 border-t border-zinc-800 p-3  md:p-4  pb-12 md:pb-4">

                    {/* 🚀 EL BLOQUE DE RENTAS RESTAURADO */}
                    <AnimatePresence>
                        {transactionType === 'RENTAL' && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3 md:mb-4">
                                <div className="space-y-2 md:space-y-3 p-2.5 md:p-3 bg-blue-900/10 border border-blue-900/30 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-blue-400">Depósito</label>
                                        <input type="number" min="500" value={depositAmount} onChange={e => setDepositAmount(Number(e.target.value))} className="w-20 md:w-24 bg-zinc-900 border border-zinc-800 rounded p-1 text-right font-mono text-[10px] md:text-xs text-white outline-none focus:border-blue-500" placeholder="0.00" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-blue-400">Devolución</label>
                                        <input type="date" required={transactionType === 'RENTAL'} value={returnDate} onChange={e => setReturnDate(e.target.value)} className="w-32 md:w-36 bg-zinc-900 border border-zinc-800 rounded p-1 text-[10px] md:text-xs text-zinc-300 outline-none focus:border-blue-500 cursor-pointer" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                        <div className="flex justify-between text-[10px] md:text-xs text-zinc-500 font-mono"><span>Subtotal Operación</span><span>${subtotal.toFixed(2)}</span></div>
                        {transactionType === 'RENTAL' && depositAmount > 0 && <div className="flex justify-between text-[10px] md:text-xs text-blue-400 font-mono"><span>Depósito</span><span>+ ${depositAmount.toFixed(2)}</span></div>}
                        <div className="flex justify-between items-end mt-2 pt-2 border-t border-zinc-800"><span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-zinc-400">Total a Cobrar</span><span className="text-2xl md:text-3xl font-black font-mono text-emerald-400">${total.toFixed(2)}</span></div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-3 md:mb-4">
                        {[{ id: 'CASH', label: 'Efectivo', icon: '💵' }, { id: 'CARD', label: 'Tarjeta', icon: '💳' }, { id: 'TRANSFER', label: 'Transf.', icon: '📲' }].map(method => (
                            <button key={method.id} onClick={() => setPaymentMethod(method.id as PaymentMethod)} className={`flex flex-col items-center justify-center p-1.5 md:p-2 border rounded-lg transition-all ${paymentMethod === method.id ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}>
                                <span className="text-sm md:text-lg mb-0.5 md:mb-1">{method.icon}</span><span className="text-[8px] md:text-[9px] uppercase font-bold tracking-widest">{method.label}</span>
                            </button>
                        ))}
                    </div>

                    <button onClick={handleCheckout} disabled={isProcessing || cart.length === 0} className="w-full py-3 md:py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs md:text-sm uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50">
                        {isProcessing ? 'Autorizando...' : 'Confirmar Cobro'}
                    </button>
                </div>
            </div>
        </>
    )
}