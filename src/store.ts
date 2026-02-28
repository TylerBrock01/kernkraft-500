// src/store.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"; // 👈 Importamos persist
import { Coupon, CouponResponseSchema, Product, ShoppingCart } from "@/src/schema";

interface Store {
    userId: string | null
    total: number
    discount: number
    contents: ShoppingCart
    coupon: Coupon
    // --- ESTOS SON LOS NUEVOS ---
    isCartOpen: boolean
    toggleCart: () => void
    closeCart: () => void
    setUserId: (id: string | null) => void
    // ----------------------------
    addtoCart: (product: Product) => void
    updateStock: (id: Product['id'], quantity: number) => void
    clearCart: (id: Product['id']) => void
    calculateTotal: () => void
    applyCoupon: (couponName: string) => Promise<void>
    applyDiscount: () => void
    clearOrder: () => void
}

const initialState = {
    userId: null,
    total: 0,
    discount: 0,
    contents: [],
    isCartOpen: false, // Empezamos con el carrito cerrado
    coupon: { name: '', discount: 0, message: '' },
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
                    const subtotal = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0)

                    if (get().coupon.coupon?.discount) {
                        get().applyDiscount()
                    } else {
                        set(() => ({ total: subtotal, discount: 0 }))
                    }
                },

                applyCoupon: async (couponName) => {
                    try {
                        const req = await fetch('/coupons/api', {
                            method: 'POST',
                            body: JSON.stringify({ coupon_name: couponName })
                        });

                        const json = await req.json();
                        const result = CouponResponseSchema.safeParse(json);

                        if (result.success) {
                            set({ coupon: result.data });
                            get().applyDiscount()
                        } else {
                            // Si el cupón falla, mantenemos el mensaje pero limpiamos el descuento
                            set({ coupon: { ...initialState.coupon, message: json.message || "Cupón no válido" } });
                            get().calculateTotal();
                        }
                    } catch (e) {
                        console.error('Error al aplicar cupón:', e);
                    }
                },

                applyDiscount: () => {
                    const subTotal = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0)
                    const discountPercent = get().coupon.coupon?.discount || 0;
                    const discount = (discountPercent / 100) * subTotal
                    const total = subTotal - discount
                    set(() => ({ discount, total }))
                },

                clearOrder: () => {
                    set(() => ({ ...initialState }))
                }
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