// app/admin/products/page.tsx
import { ProductResponseSchema } from "@/src/schema";
import ProductsTable from "@/components/products/ProductsTable";
import { redirect } from "next/navigation";
import { isValidPage } from "@/src/utils";
import Pagination from "@/components/UI/Pagination";
import Link from "next/link";
import { Plus, Box, Terminal } from "lucide-react";

async function getProducts(take: number, skip: number) {
    const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
    const req = await fetch(url);
    const json = await req.json();
    const data = ProductResponseSchema.parse(json);
    return { products: data.products, total: data.total };
}

type SearchParams = Promise<{ page: string }>

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
    const { page } = await searchParams;
    if (!isValidPage(+page)) redirect('/admin/products?page=1');

    const producstPerPage = 10;
    const skip = (+page - 1) * producstPerPage;
    const { products, total } = await getProducts(producstPerPage, skip);
    const totalPages = Math.ceil(total! / producstPerPage);

    if (+page > totalPages && totalPages !== 0) redirect('/admin/products?page=1');

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Action Header: Título y Botón de Comando */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                <div className="relative border-l-4 border-yellow-400 pl-6 py-2">
                    <div className="flex items-center gap-3 mb-2">
                        <Terminal className="w-5 h-5 text-yellow-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                            Inventory_Control / Gear_Database
                        </span>
                    </div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                        Manage_<span className="text-yellow-400">Products</span>
                    </h1>
                </div>

                <Link
                    href="/admin/products/new"
                    id={'add-new-product-link'}
                    className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-yellow-400 text-black font-black italic uppercase text-sm -skew-x-12 hover:bg-white transition-all duration-300 shadow-[4px_4px_0px_rgba(255,255,255,0.1)]"
                >
                    <span className="transform skew-x-12 flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Nuevo Producto
                    </span>
                </Link>
            </div>

            {/* Status Bar: Telemetría de la tabla */}
            <div className="flex items-center gap-6 py-2 px-4 bg-zinc-900/50 border border-white/5 text-[10px] font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                    <Box className="w-3 h-3 text-yellow-400" />
                    <span>TOTAL_ITEMS: {total}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                    <span>PAGE_STATUS: {page} / {totalPages}</span>
                </div>
            </div>

            {/* Tabla de Datos */}
            <div className="bg-zinc-950 border border-white/5 shadow-2xl">
                <ProductsTable products={products} />
            </div>

            {/* Navegación de Datos */}
            <div className="pt-6">
                <Pagination
                    page={+page}
                    totalPages={+totalPages}
                    baseUrl="/admin/products"
                />
            </div>
        </div>
    );
}