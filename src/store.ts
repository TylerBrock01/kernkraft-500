import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {Product, ShoppingCart} from "@/src/schema";

interface Store {
    total: number
    contents: ShoppingCart
    addtoCart: (product: Product) => void
    updateStock: (id: Product['id'], quantity: number) => void
    clearCart: (id: Product['id']) => void
    calculateTotal: () => void
}

export const useStore = create<Store>()(devtools((set,get)=>({
    total: 0,
    contents: [],
    addtoCart: (product) => {
        const {id: productId, category,...data}= product
        let contents: ShoppingCart =[]
        const duplicate = get().contents.findIndex(item => item.productId === productId)
        if(duplicate >=0){
            if (get().contents[duplicate].quantity >= get().contents[duplicate].stock) return alert(
                `El producto ${product.name} no puede ser agregado, ya se encuentra agregado en el carrito`
            )
            contents = get().contents.map(item => item.productId === productId ? {...item, quantity: item.quantity + 1} : item)
        }else{
            contents = [...get().contents, {
                ...data,
                quantity: 1,
                productId,
            }]
        }
        set(()=> ({contents}))
        get().calculateTotal()
    },
    updateStock: (id, quantity) => {
        const contents = get().contents.map(item => item.productId === id ? {...item, quantity} : item)
        set(()=> ({contents}))
    },
    clearCart: (id) => {
        set((state)=> ({
            contents: state.contents.filter(item => item.productId !== id)
        }))
    },
    calculateTotal: () =>{
        const total = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0)
        set(()=> ({total}))
    }
})))