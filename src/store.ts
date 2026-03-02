// src/store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"; // 👈 Importamos persist
import { Coupon, CouponResponseSchema, Product, ShoppingCart } from "@/src/schema";

interface Store {
    userId: string | null;
    total: number;
    discount: number;
    contents: ShoppingCart;
    coupon: CouponState; // Estructura industrial
    isCartOpen: boolean;
    toggleCart: () => void;
    closeCart: () => void;
    setUserId: (id: string | null) => void;
    addtoCart: (product: Product) => void;
    updateStock: (id: Product['id'], quantity: number) => void;
    clearCart: (id: Product['id']) => void;
    calculateTotal: () => void;
    applyCoupon: (data: { coupon_name: string, total: number }) => Promise<void>; // 👈 DTO de entrada
    removeCoupon: () => void;
    applyDiscount: () => void;
    clearOrder: () => void;
}
interface CouponState {
    id: number;
    name: string;
    discount: number;
    isPercentage: boolean;
    minPurchase: number;
    message: string;
}
const initialState = {
    userId: null,
    total: 0,
    discount: 0,
    contents: [],
    isCartOpen: false,
    coupon: { id: 0, name: '', discount: 0, isPercentage: true, minPurchase: 0, message: '' },
}
export const useStore = create<Store>()(
    devtools(
        persist( // 👈 Envolvemos con persist
            (set, get) => ({
                ...initialState,
                toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

                closeCart: () => set({ isCartOpen: false }),

                setUserId: (id) => {
                    const currentId = get().userId;

                    // Solo actuamos si el ID es distinto al que ya tenemos
                    if (id !== currentId) {
                        // Si había un usuario y entra uno nuevo (o se cierra sesión)
                        if (currentId !== null || id !== null) {
                            get().clearOrder();
                        }
                        set({ userId: id });
                    }
                },

                addtoCart: (product) => {
                    const { id: productId, category, ...data } = product
                    let contents: ShoppingCart = []
                    const duplicate = get().contents.findIndex(item => item.productId === productId)

                    if (duplicate >= 0) {
                        if (get().contents[duplicate].quantity >= get().contents[duplicate].stock) {
                            // Cambiamos el alert por algo más "Cyber" en el futuro, por ahora se queda
                            return alert(`El producto ${product.name} ya alcanzó el límite de stock en tu carrito`);
                        }
                        contents = get().contents.map(item => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
                    } else {
                        contents = [...get().contents, {
                            ...data,
                            quantity: 1,
                            productId,
                        }]
                    }
                    set(() => ({ contents }))
                    get().calculateTotal()
                },

                updateStock: (id, quantity) => {
                    const contents = get().contents.map(item => item.productId === id ? { ...item, quantity } : item)
                    set(() => ({ contents }))
                    get().calculateTotal()
                },

                clearCart: (id) => {
                    const filteredContents = get().contents.filter(item => item.productId !== id);
                    set(() => ({ contents: filteredContents }));

                    if (!filteredContents.length) {
                        get().clearOrder()
                    } else {
                        get().calculateTotal()
                    }
                },

                calculateTotal: () => {
                    const subtotal = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);

                    // Si hay un cupón activo, recalculamos el descuento basado en el subtotal actual
                    if (get().coupon.id !== 0) {
                        get().applyDiscount();
                    } else {
                        set(() => ({ total: subtotal, discount: 0 }));
                    }
                },

                applyCoupon: async ({ coupon_name, total }) => {
                    try {
                        // Enviamos el protocolo de validación al backend (Proxy de Next.js)
                        const req = await fetch('/coupons/api', { // 👈 Asegúrate que esta ruta exista en tu Next.js
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ coupon_name, total })
                        });

                        const json = await req.json();

                        if (req.ok) {
                            // Si NestJS acepta el cupón, lo inyectamos en el estado
                            set({
                                coupon: {
                                    ...json.coupon,
                                    message: "Protocolo Aceptado: Descuento Aplicado"
                                }
                            });
                            get().applyDiscount();
                        } else {
                            // Si falla (expirado, límite alcanzado, etc), limpiamos y mostramos error
                            set({
                                coupon: {
                                    ...initialState.coupon,
                                    message: json.message || "Error de Validación"
                                }
                            });
                            get().calculateTotal();
                        }
                    } catch (e) {
                        set({ coupon: { ...initialState.coupon, message: "Error de Conexión con Mainframe" } });
                    }
                },

                applyDiscount: () => {
                    const subTotal = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);
                    const { discount: val, isPercentage } = get().coupon;

                    // LÓGICA DE DESCUENTO DUAL:
                    let discountAmount = isPercentage ? (val / 100) * subTotal : val;

                    // Blindaje: El descuento nunca puede ser mayor que lo que el usuario va a pagar
                    discountAmount = Math.min(discountAmount, subTotal);

                    const finalTotal = subTotal - discountAmount;

                    set(() => ({
                        discount: discountAmount,
                        total: finalTotal
                    }));
                },

                removeCoupon: () => {
                    set({ coupon: initialState.coupon });
                    get().calculateTotal();
                },

                clearOrder: () => set(() => ({ ...initialState })),
            }),
            {
                name: 'vask8-secure-storage',
                // Opcional: Podrías usar un filtro para no guardar el cupón si expira
                partialize: (state) => ({
                    // Guardamos solo el carrito y el usuario
                    contents: state.contents,
                    userId: state.userId
                }),
            }
        )
    )
);