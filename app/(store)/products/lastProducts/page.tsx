import { ProductResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";
import Link from "next/link";

// async function getProduct() {
//     const url = `${process.env.API_URL}/products?take=4`
//     const req = await fetch(url,{
//         next:{
//             tags:['products-by-category']
//         }
//     })
//     const json = await req.json()
//     if (!req.ok){
//         redirect('/categories/1')
//     }
//     return ProductResponseSchema.parse(json)
// }
export default async function LastProductPage() {
    // const products = await getProduct()
    return(
        <section className="grid">
            <h2 className="italic text-4xl font-bold text-center text-white bg-black/50 py-2">
                Nuevos <span className="text-yellow-400"> Productos</span>
            </h2>
            <div className="">
                <div className={""}>
                    <div className='p-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 '>
                        {/*{ products.products.map(product =>*/}
                        {/*    <ProductCard key={product.id} product={product}/>)}*/}
                    </div>
                </div>
            </div>
            <div className="text-center flex justify-center  p-3">
                <Link href="#" className="   text-white hover:text-yellow-400 border border-white hover:border-yellow-400 py-3 px-8 rounded-full transition duration-300">
                    Ver Tienda Completa
                </Link>
            </div>
        </section>

    )
}