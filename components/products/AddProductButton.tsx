"use client"
import {Product} from "@/src/schema";
import {useStore} from "@/src/store";

export default function AddProductButton({product}: { product: Product}) {

    const addToCart = useStore((state) => state.addtoCart)
    return(
        <button
            type="button"
            className="border p-3 rounded-full text-black bg-green-400 hover:bg-green-700 hover:text-yellow-400 hover:border-yellow-400 "
            onClick={()=> addToCart(product)}
        >
            <p className="font-bold ">Agregar al carrito</p>
        </button>
    )
}