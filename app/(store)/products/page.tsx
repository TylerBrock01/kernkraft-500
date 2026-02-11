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
        <section className="grid">
            <HeadingHighlight highlight={"productos"}>catalogos de </HeadingHighlight>
            <div className='p-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 '>
                { products.map(product =>
                    <ProductCard key={product.id} product={product}/>)}
            </div>
            <Pagination
                page={+page}
                totalPages={+totalPages}
                baseUrl={"/products"}
            />
            <div className="text-center flex justify-center  p-3">
                <Link href="#" className="   text-white hover:text-yellow-400 border border-white hover:border-yellow-400 py-3 px-8 rounded-full transition duration-300">
                    Ver Tienda Completa
                </Link>
            </div>
        </section>

    )
}