"use client"

import {useStore} from "@/src/store";
import ShoppingCartItem from "@/components/cart/ShoppingCardItem";
export function ShoppingCart() {
    const contents = useStore((state)=> state.contents)
    return(
        <>
            <h2 className='text-4xl font-bold text-gray-900'>Carrito de compras</h2>
            <ul role="list" className="divide-y divide-gray-200 mt-6 border-t border-gray-200 font-medium text-gray-500">
                {contents.map(item => (
                    <ShoppingCartItem
                        key={item.productId} item={item}>
                    </ShoppingCartItem>
                ))}
            </ul>
        </>
    )
}