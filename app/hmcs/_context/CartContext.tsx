// /app/hmcs/_context/CartContext.tsx
"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { Product } from "@/app/hmcs/_types/catalog";

export type CartProduct = Pick<Product, "id" | "name" | "price">;

export interface CartItem extends CartProduct {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: CartProduct) => void;
    increase: (id: CartItem["id"]) => void;
    decrease: (id: CartItem["id"]) => void; // resta 1 y elimina si llega a 0
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = useCallback((product: CartProduct) => {
        setCart((prev) => {
            const exists = prev.some((i) => i.id === product.id);
            if (exists) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            const { id, name, price } = product; // solo lo necesario
            return [...prev, { id, name, price, quantity: 1 }];
        });
    }, []);

    const increase = useCallback((id: CartItem["id"]) => {
        setCart((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
        );
    }, []);

    const decrease = useCallback((id: CartItem["id"]) => {
        setCart((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
                .filter((i) => i.quantity > 0)
        );
    }, []);

    const clearCart = useCallback(() => setCart([]), []);
    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    const value = useMemo<CartContextType>(() => {
        const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
        const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

        return {
            cart,
            addToCart,
            increase,
            decrease,
            clearCart,
            totalItems,
            totalPrice,
            isCartOpen,
            openCart,
            closeCart,
        };
    }, [cart, isCartOpen, addToCart, increase, decrease, clearCart, openCart, closeCart]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
}