"use client"

import {useActionState} from "react";
import {addProduct} from "@/actions/add-product-action";

export default function AddProductForm({children}:{children:React.ReactNode}) {
    const [state, dispatch] = useActionState(addProduct,{
        errors:[],
        successs:''
    });
    return (
        <form className="space-y-5"
              action={dispatch}
        >
            {children}
            <input type={"submit"}
            className={"rounded bg-green-400 font-bold py-2 w-full cursor-pointer"}
                   value={"Agregar Producto"}
            />
        </form>
    )
}