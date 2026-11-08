// /hmcs/_store/orderStore.ts
import { create } from "zustand";
import {Product} from "@/app/hmcs/_types/catalog";

export interface OrderItem {
    product: Product;
    quantity: number;
}

interface OrderState {
    items: OrderItem[];
    add: (product: Product) => void;
    remove: (productId: string) => void;
    clear: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    items: [],
    add: (product) =>
        set((state) => {
            const existing = state.items.find((i) => i.product.id === product.id);
            if (existing) {
                return {
                    items: state.items.map((i) =>
                        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                };
            }
            return { items: [...state.items, { product, quantity: 1 }] };
        }),
    remove: (productId) =>
        set((state) => ({
            items: state.items.filter((i) => i.product.id !== productId),
        })),
    clear: () => set({ items: [] }),
}));

// Selectores: cada componente se suscribe solo a lo que necesita
export const selectCount = (s: OrderState) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectTotal = (s: OrderState) =>
    s.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);