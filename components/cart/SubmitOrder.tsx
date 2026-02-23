import {submitOrderAction} from "@/actions/submit-order-action";
import {useActionState, useEffect} from "react";
import {useStore} from "@/src/store";
import {toast} from "react-toastify";
import {useFormStatus} from "react-dom";

export default function SubmitOrder() {
    const coupon = useStore(state => state.coupon.coupon?.name);
    const contents = useStore(state => state.contents);
    const clearOrder = useStore(state => state.clearOrder);

    function SubmitButton() {
        const { pending } = useFormStatus();

        return (
            <input
                type="submit"
                id="submit-order-button"
                disabled={pending}
                value={pending ? "Procesando..." : "Confirmar Compra"}
                className={`mt-5 w-full p-3 uppercase font-bold transition-all ${
                    pending
                        ? "bg-zinc-700 cursor-not-allowed"
                        : "bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer"
                }`}
            />
        );
    }

    // El objeto que enviaremos
    const order = { coupon, contents };

    // Bind para pasar la data a la Server Action
    const submitOrderWithData = submitOrderAction.bind(null, order);

    const [state, dispatch] = useActionState(submitOrderWithData, {
        errors: [],
        success: '', // 👈 Asegúrate de que el nombre coincida con la acción (success con 'ss')
    });

    useEffect(() => {
        // Validamos que existan errores y que el array no esté vacío
        if (state.errors && state.errors.length > 0) {
            state.errors.forEach(error => toast.error(error));
            toast.error(state.errors)
            clearOrder();
        }

        if (state.success) {
            toast.success(state.success);
            clearOrder(); // Limpia Zustand después del éxito
        }
    }, [state, clearOrder]);

    return (
        <form action={dispatch}>
            <SubmitButton />
        </form>
    );
}