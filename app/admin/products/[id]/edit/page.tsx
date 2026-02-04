import Link from "next/link";
import Heading from "@/components/UI/Heading";
import ProductForm from "@/components/products/ProductForm";
import UpdateProductForm from "@/components/products/UpdateProductForm";
import {notFound} from "next/navigation";
import {ProductSchema} from "@/src/schema";

async function getProduct(id: string) {
    const url = `${process.env.API_URL}/products/${id}`;
    const request = await fetch(url);
    const json = await request.json();
    if (!request.ok) {
        notFound()
    }
    return ProductSchema.parse(json);
}
type Params = Promise<{id: string}>
export default async function EditProductPage({params} : {params: Params}) {
    const {id} = await params;
    const product = await getProduct(id);
    return(
        <>
            <Link href="/admin/products?page=1"
                  className={"rounded bg-green-400 font-bold py-2 px-10"}>
                Volver
            </Link>
            <Heading>Editar Producto: {product.name}</Heading>
            <UpdateProductForm>
                <ProductForm product = {product} />
            </UpdateProductForm>
            EditProductPage
        </>
    )
}