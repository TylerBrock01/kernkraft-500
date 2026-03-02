// components/cart/SubmitOrder.tsx
"use client"

import { submitOrderAction } from "@/actions/submit-order-action";
import { useActionState, useEffect } from "react";
import { useStore } from "@/src/store";
import { toast } from "react-toastify";
import { useFormStatus } from "react-dom";
import { ShieldCheck, Lock, Loader2 } from "lucide-react";

export default function SubmitOrder() {
    const coupon = useStore(state => state.coupon.name);
    const contents = useStore(state => state.contents);
    const clearOrder = useStore(state => state.clearOrder);

    // El objeto que enviaremos
    const order = { coupon, contents };
    const submitOrderWithData = submitOrderAction.bind(null, order);

    const [state, dispatch] = useActionState(submitOrderWithData, {
        errors: [],
        success: '',
    });

    useEffect(() => {
        if (state.errors && state.errors.length > 0) {
            state.errors.forEach(error => toast.error(error));
            // No limpiamos la orden en error para que el usuario no pierda su carrito
        }

        if (state.success) {
            toast.success(state.success);
            clearOrder();
        }
    }, [state, clearOrder]);

    return (
        <form action={dispatch} className="mt-6 space-y-4">
            {/* Detalles de Seguridad (Estilo Cyber) */}
            <div className="flex items-center justify-center gap-4 py-3 border-y border-white/5 opacity-40">
                <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Encrypted</span>
                </div>
                <div className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
                </div>
            </div>

            <SubmitButton />

            <p className="text-[9px] text-zinc-600 text-center uppercase font-bold tracking-tighter">
                Al confirmar, aceptas los términos de servicio de VASK8 System.
            </p>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            id="submit-order-button"
            disabled={pending}
            className={`
                relative w-full py-5 overflow-hidden transition-all duration-300
                font-black italic uppercase tracking-tighter text-xl
                transform -skew-x-12 group
                ${pending
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] active:scale-95"}
            `}
        >
            {/* El texto se inclina en sentido opuesto para verse derecho dentro del botón inclinado */}
            <span className="flex items-center justify-center gap-3 transform skew-x-12">
                {pending ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sincronizando...
                    </>
                ) : (
                    "Confirmar Compra"
                )}
            </span>

            {/* Efecto de brillo que pasa sobre el botón (Cyber touch) */}
            {!pending && (
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            )}
        </button>
    );
}