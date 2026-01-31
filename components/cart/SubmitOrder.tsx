import {useActionState, useEffect} from "react";
import {submitOrderAction} from "@/actions/submit-order-action";
import {useStore} from "@/src/store";
import {toast} from "react-toastify";

export default function SubmitOrder() {
    const coupon = useStore(state=> state.coupon.coupon?.name)
    const contents = useStore(state=> state.contents)
    const clearOrder = useStore(state=> state.clearOrder)
    const order= {coupon,contents}
    const submitOrderWithData = submitOrderAction.bind(null,order)
    const [state, dispatch]= useActionState(submitOrderWithData,{
        errors:[],
        succes: '',
    })

    useEffect(()=>{
        if (state.errors){
            state.errors.forEach(error => toast.error(error))

        }
        if (state.succes){
            toast.success(state.succes)
            clearOrder()
        }
    },[state])

    return(
        <form action={dispatch}>

            <input type="submit"
                   value="confirmar compra"
                   className=" mt-5 w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold hover:cursor-pointer"

            />
        </form>
    )
}