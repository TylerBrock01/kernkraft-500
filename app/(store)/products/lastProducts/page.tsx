import { ProductResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";
import Link from "next/link";
import HeadingHighlight from "@/components/UI/HeadingHighlight";

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
        <section className="grid">
            <div className="bg-zinc-950/40 border-l-4 border-yellow-400 py-3 md:p-6 backdrop-blur-md">
                <div className="uppercase tracking-tighter leading-none">
                    <HeadingHighlight highlight="colección">
                        nueva
                    </HeadingHighlight>
                </div>

            </div>

            <div className='bg-black py-5 px-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 '>
                { products.products.map(product =>
                    <ProductCard key={product.id} product={product}/>)}
            </div>
            <div className="bg-black text-center flex justify-center  p-3">
                <Link href="/products?take=10&skip=0" className="   text-white hover:text-yellow-400 border border-white hover:border-yellow-400 py-3 px-8 rounded-full transition duration-300">
                    Ver Tienda Completa
                </Link>
            </div>
        </section>

    )
}