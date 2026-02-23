"use client"
import {Product} from "@/src/schema";
import {useStore} from "@/src/store";
import {toast} from "react-toastify";

export default function AddProductButton({product}: { product: Product}) {

    const addToCart = useStore((state) => state.addtoCart)
    return(
        <>
            <button
                type="button"
                id={`add-product-button-${product.id}`}
                onClick={()=> {
                    addToCart(product)
                    toast.success('Producto agregado al carrito')
                }}
                className="h-11 w-11 flex items-center justify-center rounded-xl bg-white text-black transition-all duration-300 hover:bg-yellow-400 hover:scale-110 active:scale-95 shadow-lg">
                <svg xmlns="http://www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </button>
        </>


    )
}