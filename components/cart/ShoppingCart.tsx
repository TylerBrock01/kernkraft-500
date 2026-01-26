"use client"

import {useStore} from "@/src/store";
import ShoppingCartItem from "@/components/cart/ShoppingCardItem";
import Amount from "@/components/cart/Amount";
export function ShoppingCart() {
    const contents = useStore((state)=> state.contents)
    const total = useStore(state=> state.total)
    return(
        <>
            {contents.length?(
                <>
                    <h2 className='text-4xl font-bold text-gray-900'>Carrito de compras</h2>
                    <ul role="list" className="divide-y divide-gray-200 mt-6 border-t border-gray-200 font-medium text-gray-500">
                        {contents.map(item => (
                            <ShoppingCartItem
                                key={item.productId} item={item}>
                            </ShoppingCartItem>
                        ))}
                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 py-6 text-sm font-medium text-gray-500">
                        <Amount label="Total a pagar" amount={total}/>
                    </dl>
                </>
            ): (<p className="text-xl text-center text-gray-900">No hay productos en el carrito</p>)}
        </>
    )
}