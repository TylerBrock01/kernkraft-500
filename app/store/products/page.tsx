import { ProductResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";
import Link from "next/link";
import Pagination from "@/components/UI/Pagination";
import {isValidPage} from "@/src/utils";
import HeadingHighlight from "@/components/UI/HeadingHighlight";
import {SlidersHorizontal} from "lucide-react";

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

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;

    if (!isValidPage(currentPage)) redirect('/products?page=1');

    const producstPerPage = 12;
    const skip = (currentPage - 1) * producstPerPage;
    const { products, total } = await getProducts(producstPerPage, skip);

    const totalPages = Math.ceil(Number(total) / producstPerPage);
    if (currentPage > totalPages && totalPages > 0) redirect('/products?page=1');

    return (
        <section className="flex flex-col  bg-black">
            {/* 1. Header del Catálogo: Ahora fluye con el scroll y es más compacto */}
            <div className="bg-zinc-950/30 border-b border-white/5">
                <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-row justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-[2px] bg-yellow-400" /> {/* Línea minimalista */}
                        <div>
                            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                                Store / All
                            </p>
                            <h2 className="text-xl md:text-2xl font-black italic text-white uppercase tracking-tighter">
                                Inventario <span className="text-zinc-500">Total</span>
                            </h2>
                        </div>
                    </div>

                    {/* Stats rápidos en una sola línea */}
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:block text-right border-r border-white/10 pr-6">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mr-2">Items:</span>
                            <span className="text-sm font-black italic text-yellow-400">{total}</span>
                        </div>
                        <button className="text-zinc-400 hover:text-yellow-400 transition-colors">
                            <SlidersHorizontal className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Grid de Productos */}
            <div className="flex py-8 px-4 sm:px-6 lg:px-10">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-10">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Paginación */}
            <div className=" border-t border-white/5">
                <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    baseUrl={"/products"}
                />
            </div>
        </section>
    );
}