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
        const duplicate = get().contents.findIndex(item => item.productId === productId)
        if(duplicate >=0){
            contents = get().contents.map(item => item.productId === productId ? {...item, quantity: item.quantity + 1} : item)
        }else{
            contents = [...get().contents, {
                ...data,
                quantity: 1,
                productId,
            }]
        }


        set(()=> ({contents}))
    }
})))