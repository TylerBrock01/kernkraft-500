"use client";

import React from "react";
import { useCart } from "@/app/hmcs/_context/CartContext";
import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";

export default function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, totalPrice, totalItems } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Overlay Oscuro */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">

                    {/* Header del Carrito */}
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#F8F9FA]">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-[#2C4A3E]" />
                            <h2 className="text-xl font-bold text-[#1E1E1E]">Tu Pedido ({totalItems})</h2>
                        </div>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-200/60 text-gray-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Lista de Productos */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                                <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.5]" />
                                <p className="font-medium text-gray-600">Tu carrito está vacío</p>
                                <p className="text-sm">Agrega unos tacos o bebidas para comenzar.</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-[#F8F9FA]">
                                    <div>
                                        <h4 className="font-semibold text-[#1E1E1E] text-sm">{item.name}</h4>
                                        <span className="text-xs text-[#2C4A3E] font-bold">{item.price}</span>
                                    </div>

                                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-200">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-1 hover:text-red-600 transition-colors"
                                        >
                                            {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => addToCart(item)}
                                            className="p-1 hover:text-[#2C4A3E] transition-colors"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer del Carrito con Total y Checkout */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-gray-100 bg-white space-y-4">
                            <div className="flex justify-between items-center text-lg font-bold">
                                <span className="text-[#1E1E1E]">Total a pagar:</span>
                                <span className="text-[#2C4A3E]">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-[#2C4A3E] text-white py-3.5 rounded-xl font-bold hover:bg-[#1f352c] transition-all shadow-md active:scale-[0.98]">
                                Enviar Pedido por WhatsApp
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}