'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { api } from '@/app/lib/axios/axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerDrawer from "@/components/customers/CustomerDrawer";

// Tipos extraídos de tu backend
type TransactionType = 'SALE' | 'RENTAL';
type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER';

interface CartItem {
    product: any;
    quantity: number;
}

export default function POSTerminalPage() {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [customerSearch, setCustomerSearch] = useState('');
    const [customerResults, setCustomerResults] = useState<any[]>([]);
    const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);
    // Este número solo servirá para avisarle al useEffect que debe recargar
    const [refreshKey, setRefreshKey] = useState(0);

    // 🛒 ESTADOS DEL CARRITO Y TICKET
    const [cart, setCart] = useState<CartItem[]>([]);
    const [transactionType, setTransactionType] = useState<TransactionType>('SALE');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');

    // Estados específicos para Rentas
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [returnDate, setReturnDate] = useState<string>('');

    const [isProcessing, setIsProcessing] = useState(false);

    // 1. CARGAR INVENTARIO
// 1. EL RADAR DE PRODUCTOS (Solo se activa si cambia 'searchTerm')
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true); // Opcional, para que se vea el estado de carga al buscar
            try {
                const response = await api.get('/products', { params: { take: 50, search: searchTerm } });
                setProducts(response.data.products || response.data || []);
            } catch (error) {
                toast.error('Error al cargar inventario');
            } finally {
                setIsLoading(false);
            }
        };

        // Delay táctico de 300ms
        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm,refreshKey]);


    // 2. EL RADAR DE CLIENTES (Solo se activa si cambia 'customerSearch')
    useEffect(() => {
        const searchCustomers = async () => {
            if (customerSearch.length < 2) {
                setCustomerResults([]);
                return;
            }
            try {
                const response = await api.get('/customers', { params: { search: customerSearch, take: 5 } });
                setCustomerResults(response.data.customers || response.data || []);
            } catch (error) {
                console.error('Error buscando clientes', error);
            }
        };

        // Delay táctico de 300ms
        const delayDebounceFn = setTimeout(() => {
            searchCustomers();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [customerSearch]);
    // 2. LÓGICA DEL CARRITO
    const addToCart = (product: any) => {
        if (product.stock <= 0) {
            toast.error('Producto sin stock disponible');
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) {
                    toast.error('Límite de stock alcanzado');
                    return prev;
                }
                return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.product.id === productId) {
                const newQuantity = item.quantity + delta;
                if (newQuantity <= 0) return item; // No baja de 1
                if (newQuantity > item.product.stock) {
                    toast.error('Stock máximo alcanzado');
                    return item;
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    // 3. MATEMÁTICAS DEL TICKET
    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0), [cart]);
    const total = transactionType === 'SALE' ? subtotal : subtotal + Number(depositAmount);

    // 4. PROCESAR TRANSACCIÓN (COBRAR)
    const handleCheckout = async () => {
        if (cart.length === 0) {
            toast.error('El carrito está vacío');
            return;
        }

        if (transactionType === 'RENTAL' && !returnDate) {
            toast.error('Debes especificar una fecha de retorno para la renta');
            return;
        }

        setIsProcessing(true);
        const toastId = toast.loading('Procesando pago...');

        try {
            // Armamos el Payload exacto como lo pide tu Entity/DTO
            const payload = {
                customerId: selectedCustomer ? selectedCustomer.id : null, // 👈 Se agrega aquí
                type: transactionType,
                paymentMethod,
                total,
                depositAmount: transactionType === 'RENTAL' ? Number(depositAmount) : 0,
                returnDate: transactionType === 'RENTAL' ? new Date(returnDate).toISOString() : null,
                contents: cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price // Mandamos el precio actual como snapshot
                }))
            };

            await api.post('/transactions', payload);
            setRefreshKey(prev => prev + 1);
            toast.success('Transacción completada', { id: toastId });

            // Limpiamos la terminal para el siguiente cliente
            setCart([]);
            setDepositAmount(0);
            setReturnDate('');
            setTransactionType('SALE');
        } catch (error: any) {
            console.error('Error cobrando:', error);
            toast.error(error.response?.data?.message || 'Error en la transacción', { id: toastId });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-zinc-950 font-sans text-zinc-100 overflow-hidden">
            {/* 🔴 HEADER TÁCTICO */}
            <header className="min-h-[4rem] py-3 lg:py-0 border-b border-zinc-800 bg-zinc-900/50 flex flex-col sm:flex-row items-center justify-between px-4 lg:px-6 shrink-0 gap-3">
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    <button onClick={() => router.push('/dashboard/pos')} className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors shrink-0">
                        ←
                    </button>
                    <h1 className="font-black text-base lg:text-lg tracking-widest uppercase truncate">Terminal CAZA</h1>
                </div>
                <div className="flex items-center w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar producto (F2)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-sm outline-none focus:border-emerald-500 w-full sm:w-64 transition-all"
                        />
                    </div>
                </div>
            </header>

            {/* 🔴 CONTENEDOR PRINCIPAL: Columna en móvil, Fila en Escritorio */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

                {/* =========================================
            PANEL IZQUIERDO: EL RADAR DE PRODUCTOS
            ========================================= */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-black">
                    {isLoading ? (
                        <div className="flex h-full items-center justify-center text-zinc-600 font-mono text-xs uppercase animate-pulse">Cargando inventario...</div>
                    ) : products.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-zinc-600 font-mono text-xs uppercase">No se encontraron productos</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
                            {products.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock <= 0}
                                    className="group relative flex flex-col items-start p-3 lg:p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-all text-left disabled:opacity-30 disabled:cursor-not-allowed h-36 lg:h-40 overflow-hidden"
                                >
                                    <div className="absolute top-2 right-2 lg:top-3 lg:right-3 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-[9px] lg:text-[10px] font-mono text-zinc-400">
                                        Stock: {product.stock}
                                    </div>
                                    <h3 className="font-bold text-xs lg:text-sm text-zinc-200 mt-5 lg:mt-6 line-clamp-2">{product.name}</h3>
                                    <div className="mt-auto pt-2 w-full flex justify-between items-end">
                                        <span className="font-black text-emerald-400 font-mono text-xs lg:text-base">${Number(product.price).toFixed(2)}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* =========================================
            PANEL DERECHO: EL TICKET / CARRITO
            ========================================= */}
                {/* 🔴 Ajuste Táctico: Ocupa el 100% de ancho y 50% de alto en móvil. 96px de ancho y altura completa en escritorio */}
                <div className="w-full lg:w-96 h-[50vh] lg:h-auto bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-800 flex flex-col shrink-0 z-20">
                    {/* 👤 SECCIÓN DE CLIENTE */}
                    <div className="p-3 lg:p-4 border-b border-zinc-800 bg-zinc-950 relative z-10 shrink-0">
                        {!selectedCustomer ? (
                            <div className="relative">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={customerSearch}
                                        onChange={(e) => setCustomerSearch(e.target.value)}
                                        placeholder="Vincular Cliente..."
                                        className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <button onClick={() => setIsCustomerDrawerOpen(true)} className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-bold text-zinc-300 transition-colors shrink-0">
                                        + Nuevo
                                    </button>
                                </div>

                                {/* Menú Flotante de Resultados */}
                                {customerResults.length > 0 && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50">
                                        {customerResults.map(c => (
                                            <button
                                                key={c.id}
                                                onClick={() => { setSelectedCustomer(c); setCustomerSearch(''); setCustomerResults([]); }}
                                                className="w-full text-left px-4 py-2 text-xs text-zinc-200 hover:bg-blue-600 hover:text-white transition-colors flex justify-between items-center"
                                            >
                                                <span className="truncate pr-2">{c.name}</span>
                                                {c.hasRetainedId && <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-900/30 px-1.5 py-0.5 rounded shrink-0">ID Retenida</span>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Cliente Seleccionado Activo
                            <div className="flex justify-between items-center bg-blue-900/10 border border-blue-900/30 rounded-lg p-2.5">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center font-bold text-sm shrink-0">
                                        {selectedCustomer.name.charAt(0)}
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-blue-100 truncate">{selectedCustomer.name}</p>
                                        <div className="flex flex-wrap gap-2 items-center mt-0.5">
                                            {selectedCustomer.phone && <p className="text-[9px] font-mono text-blue-300/70">{selectedCustomer.phone}</p>}
                                            {selectedCustomer.hasRetainedId && <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-400">🛡️ ID Retenida</span>}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedCustomer(null)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-500/20 text-zinc-500 hover:text-red-500 transition-colors shrink-0">✕</button>
                            </div>
                        )}
                    </div>

                    {/* Tipo de Operación */}
                    <div className="p-3 lg:p-4 border-b border-zinc-800 bg-zinc-950/50 shrink-0">
                        <div className="flex rounded-lg bg-zinc-900 p-1 border border-zinc-800">
                            <button onClick={() => setTransactionType('SALE')} className={`flex-1 py-1.5 text-[9px] lg:text-[10px] font-bold tracking-widest uppercase rounded-md transition-all ${transactionType === 'SALE' ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-white'}`}>
                                Venta Directa
                            </button>
                            <button onClick={() => setTransactionType('RENTAL')} className={`flex-1 py-1.5 text-[9px] lg:text-[10px] font-bold tracking-widest uppercase rounded-md transition-all ${transactionType === 'RENTAL' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}>
                                Alquiler
                            </button>
                        </div>
                    </div>

                    {/* Lista de Items */}
                    <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2 lg:space-y-3">
                        <AnimatePresence>
                            {cart.length === 0 ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center text-zinc-600 text-[10px] lg:text-xs font-mono uppercase text-center">
                                    El ticket está en blanco
                                </motion.div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        key={item.product.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col p-2.5 lg:p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-xs lg:text-sm truncate pr-2">{item.product.name}</span>
                                            <button onClick={() => removeFromCart(item.product.id)} className="text-zinc-600 hover:text-red-500 shrink-0">✕</button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 lg:gap-3 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                                                <button onClick={() => updateQuantity(item.product.id, -1)} className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded">-</button>
                                                <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product.id, 1)} className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded">+</button>
                                            </div>
                                            <span className="font-mono font-bold text-emerald-400 text-xs lg:text-sm">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Zona de Cobro */}
                    <div className="bg-zinc-950 border-t border-zinc-800 p-3 lg:p-4 shrink-0">
                        <AnimatePresence>
                            {transactionType === 'RENTAL' && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3 lg:mb-4">
                                    <div className="space-y-2 lg:space-y-3 p-2.5 lg:p-3 bg-blue-900/10 border border-blue-900/30 rounded-xl">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-blue-400">Depósito</label>
                                            <input type="number" min="0" value={depositAmount} onChange={e => setDepositAmount(Number(e.target.value))} className="w-20 lg:w-24 bg-zinc-900 border border-zinc-800 rounded p-1 text-right font-mono text-[10px] lg:text-xs text-white outline-none focus:border-blue-500" placeholder="0.00" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-blue-400">Devolución</label>
                                            <input type="date" required={transactionType === 'RENTAL'} value={returnDate} onChange={e => setReturnDate(e.target.value)} className="w-32 lg:w-36 bg-zinc-900 border border-zinc-800 rounded p-1 text-[10px] lg:text-xs text-zinc-300 outline-none focus:border-blue-500 cursor-pointer" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-1.5 lg:space-y-2 mb-3 lg:mb-4">
                            <div className="flex justify-between text-[10px] lg:text-xs text-zinc-500 font-mono">
                                <span>Subtotal Operación</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {transactionType === 'RENTAL' && depositAmount > 0 && (
                                <div className="flex justify-between text-[10px] lg:text-xs text-blue-400 font-mono">
                                    <span>Depósito de Seguridad</span>
                                    <span>+ ${depositAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-end mt-2 pt-2 border-t border-zinc-800">
                                <span className="text-[10px] lg:text-xs uppercase font-bold tracking-widest text-zinc-400">Total a Cobrar</span>
                                <span className="text-2xl lg:text-3xl font-black font-mono text-emerald-400">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                            {[
                                { id: 'CASH', label: 'Efectivo', icon: '💵' },
                                { id: 'CARD', label: 'Tarjeta', icon: '💳' },
                                { id: 'TRANSFER', label: 'Transf.', icon: '📲' }
                            ].map(method => (
                                <button
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                                    className={`flex flex-col items-center justify-center p-1.5 lg:p-2 border rounded-lg transition-all ${paymentMethod === method.id ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}
                                >
                                    <span className="text-sm lg:text-lg mb-0.5 lg:mb-1">{method.icon}</span>
                                    <span className="text-[8px] lg:text-[9px] uppercase font-bold tracking-widest">{method.label}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing || cart.length === 0}
                            className="w-full py-3 lg:py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs lg:text-sm uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? 'Autorizando...' : 'Confirmar Cobro'}
                        </button>
                    </div>
                </div>
            </div>
            <CustomerDrawer
                isOpen={isCustomerDrawerOpen}
                onClose={() => setIsCustomerDrawerOpen(false)}
                onSuccess={(newCustomer) => {
                    setSelectedCustomer(newCustomer);
                }}
            />
        </div>
    );
}