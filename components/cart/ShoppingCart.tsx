"use client"

import {useStore} from "@/src/store";
import ShoppingCartItem from "@/components/cart/ShoppingCardItem";
import Amount from "@/components/cart/Amount";
import CouponForm from "@/components/cart/CouponForm";
import SubmitOrder from "@/components/cart/SubmitOrder";

export function ShoppingCart() {
    const contents = useStore((state)=> state.contents)
    const total:number = useStore(state=> state.total)
    const discount:number = useStore(state=> state.discount)
    return(
        <>
            {contents.length?(
                <div>
                    <h2 className='text-4xl font-bold text-gray-900'>Carrito de compras</h2>
                    <ul role="list" className="divide-y divide-gray-200 mt-6 border-t border-gray-200 font-medium text-gray-500">
                        {contents.map(item => (
                            <ShoppingCartItem
                                key={item.productId} item={item}>
                            </ShoppingCartItem>
                        ))}
                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 py-6 text-sm font-medium text-gray-500">
                        {discount>0 &&
                            <Amount label="Descuento" amount={discount} discount={true}/>
                        }
                        <Amount label="Total a pagar" amount={total}/>
                    </dl>
                    <CouponForm/>
                    <SubmitOrder/>
                </div>
            ): (<p className="text-xl text-center text-gray-900">No hay productos en el carrito</p>)}
        </>
    )
}