"use client"

import {useActionState, useEffect} from "react";
import {toast} from "react-toastify";
import { useRouter } from 'next/navigation'

export default function UpdateProductForm({children}:{children:React.ReactNode}) {

    const router = useRouter()

    return (
        <form className="space-y-5"

        >
            {children}
            <input type={"submit"}
                   className={"rounded bg-green-400 font-bold py-2 w-full cursor-pointer"}
                   value={"Actualizar Producto"}
            />
        </form>
    )
}