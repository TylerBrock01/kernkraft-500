"use client"

export default function AddProductForm({children}:{children:React.ReactNode}) {
    return (
        <form className="space-y-5">
            {children}
            <input type={"submit"}
            className={"rounded bg-green-400 font-bold py-2 w-full cursor-pointer"}
                   value={"Agregar Producto"}
            />
        </form>
    )
}