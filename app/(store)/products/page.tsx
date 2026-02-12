import { ProductResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";
import Link from "next/link";
import Pagination from "@/components/UI/Pagination";
import {isValidPage} from "@/src/utils";
import HeadingHighlight from "@/components/UI/HeadingHighlight";

async function getProducts(take:number, skip:number){
    const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
    const req = await fetch(url,{
        next:{
            tags:['products-by-category']
        }
    })
    const json = await req.json()
    if (!req.ok){
        redirect('/home')
    }
    const data = ProductResponseSchema.parse(json)
    return {products: data.products, total: data.total};
}
type SearchParams = Promise<{page:string}>

export default async function ProductsPage({searchParams}: {searchParams: SearchParams}) {
    const {page} = await searchParams
    if (!isValidPage(+page)) redirect('/products?page=1');
    const producstPerPage = 10
    const skip = (+page - 1) * producstPerPage;
    const {products, total} =await getProducts(producstPerPage,skip)
    const totalPages = Math.ceil( total!/producstPerPage );
    if (+page > totalPages) redirect('/products?page=1');

    return(
        <section className=" grid mt-2">
            <div className="bg-zinc-950/40 border-l-4 border-yellow-400 py-3 md:p-6 backdrop-blur-md">
                <div className="uppercase tracking-tighter leading-none">
                    <HeadingHighlight highlight="colección">
                        nueva
                    </HeadingHighlight>
                </div>

            </div>
            <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black py-5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
            <Pagination
                page={+page}
                totalPages={+totalPages}
                baseUrl={"/products"}
            />

        </section>

    )
}