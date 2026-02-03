import Heading from "@/components/UI/Heading";
import Link from "next/link";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";

export default function NewProductPage() {
    return(
        <>
            <Link href="/admin/products?page=1"
                  className={"rounded bg-green-400 font-bold py-2 px-10"}>
                Volver
            </Link>
            <Heading>Nuevo producto</Heading>
            <AddProductForm>
                <ProductForm/>
            </AddProductForm>
        </>
    )
}