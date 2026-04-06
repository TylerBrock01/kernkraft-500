'use client';

import React from 'react';
import CustomerDrawer from "@/components/customers/CustomerDrawer";
import ProductGrid from "@/components/pos/ProductGrid";
import CartPanel from "@/components/pos/CartPanel";
import TerminalHeader from "@/components/pos/TerminalHeader";
// 🚀 Importamos el cerebro
import { useTerminal } from '@/app/hooks/useTerminal';

export default function POSTerminalPage() {
    // 🚀 Instanciamos el motor lógico
    const terminal = useTerminal();

    return (
        <div className="h-screen flex flex-col bg-zinc-950 font-sans text-zinc-100 overflow-hidden relative">

            {/* 1. HEADER */}
            <TerminalHeader
                searchTerm={terminal.searchTerm}
                setSearchTerm={terminal.setSearchTerm}
            />

            {/* 2. CONTENEDOR PRINCIPAL */}
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

                <ProductGrid
                    isLoading={terminal.isLoading}
                    products={terminal.products}
                    addToCart={terminal.addToCart}
                />

                <CartPanel
                    cart={terminal.cart}
                    removeFromCart={terminal.removeFromCart}
                    updateQuantity={terminal.updateQuantity}
                    selectedCustomer={terminal.selectedCustomer}
                    setSelectedCustomer={terminal.setSelectedCustomer}
                    customerSearch={terminal.customerSearch}
                    setCustomerSearch={terminal.setCustomerSearch}
                    customerResults={terminal.customerResults}
                    setCustomerResults={terminal.setCustomerResults}
                    setIsCustomerDrawerOpen={terminal.setIsCustomerDrawerOpen}
                    transactionType={terminal.transactionType}
                    setTransactionType={terminal.setTransactionType}
                    depositAmount={terminal.depositAmount}
                    setDepositAmount={terminal.setDepositAmount}
                    returnDate={terminal.returnDate}
                    setReturnDate={terminal.setReturnDate}
                    paymentMethod={terminal.paymentMethod}
                    setPaymentMethod={terminal.setPaymentMethod}
                    subtotal={terminal.subtotal}
                    total={terminal.total}
                    isProcessing={terminal.isProcessing}
                    handleCheckout={terminal.handleCheckout}
                    isMobileOpen={terminal.isMobileCartOpen}
                    onCloseMobile={() => terminal.setIsMobileCartOpen(false)}
                />

            </div>

            {/* 3. BOTÓN FLOTANTE MÓVIL */}
            <button
                onClick={() => terminal.setIsMobileCartOpen(true)}
                className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3.5 rounded-full shadow-[0_10px_40px_rgba(37,99,235,0.4)] font-black text-xs uppercase tracking-widest flex items-center gap-3 z-30"
            >
                <div className="relative">
                    <span>🛒</span>
                    {terminal.totalItems > 0 && (
                        <span className="absolute -top-2 -right-3 bg-emerald-500 text-zinc-950 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                            {terminal.totalItems}
                        </span>
                    )}
                </div>
                Ver Cuenta · ${terminal.total.toFixed(2)}
            </button>

            {/* 4. MODALES */}
            <CustomerDrawer
                isOpen={terminal.isCustomerDrawerOpen}
                onClose={() => terminal.setIsCustomerDrawerOpen(false)}
                onSuccess={(newCustomer) => terminal.setSelectedCustomer(newCustomer)}
            />
        </div>
    );
}