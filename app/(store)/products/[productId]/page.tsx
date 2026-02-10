import { ProductResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";

async function getProduct() {
    const url = `${process.env.API_URL}/products?take=4`
    const req = await fetch(url,{
        next:{
            tags:['products-by-category']
        }
    })
    const json = await req.json()
    if (!req.ok){
        redirect('/categories/1')
    }
    return ProductResponseSchema.parse(json)
}
export default async function LastProductPage() {
    const products = await getProduct()
    return(
        <div className={""}>
            <div className='p-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 '>
                { products.products.map(product =>
                    <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
    )
}