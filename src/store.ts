import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {Product, ShoppingCart} from "@/src/schema";

interface Store {
    total: number
    contents: ShoppingCart
    addtoCart: (product: Product) => void
}

export const useStore = create<Store>()(devtools((set,get)=>({
    total: 0,
    contents: [],
    addtoCart: (product) => {
        const {id: productId, category,...data}= product
        let contents: ShoppingCart =[]

        contents = [...get().contents, {
            ...data,
            quantity: 1,
            productId,
        }]
        set(()=> ({contents}))
    }
})))