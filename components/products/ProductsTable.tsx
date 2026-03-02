// components/products/ProductsTable.tsx
import { Product } from "@/src/schema";
import Image from "next/image";
import { formatCurrency, getImagePath, isAvailable } from "@/src/utils";
import Link from "next/link";
import DeleteProduct from "@/components/products/DeleteProductForm";
import { Edit3, Package, DollarSign, Image as ImageIcon, BarChart2 } from "lucide-react";

export default function ProductsTable({ products }: { products: Product[] }) {
    return (
        <div className="flow-root overflow-hidden">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full border-separate border-spacing-y-2">
                        <thead>
                        <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">
                            <th scope="col" className="py-4 pl-4 pr-3 text-left sm:pl-0">
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="w-3 h-3" /> Visual
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-4 text-left">
                                <div className="flex items-center gap-2">
                                    <Package className="w-3 h-3" /> Hardware_Name
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-4 text-left">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-3 h-3" /> Price_Unit
                                </div>
                            </th>
                            <th scope="col" className="px-3 py-4 text-left">
                                <div className="flex items-center gap-2">
                                    <BarChart2 className="w-3 h-3" /> Stock_Status
                                </div>
                            </th>
                            <th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-0 text-right">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody className="space-y-2">
                        {products.map(product => (
                            <tr key={product.id} className="group bg-zinc-900/40 border border-white/5 hover:bg-zinc-900/80 transition-all duration-300">
                                {/* IMAGEN */}
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-4">
                                    <div className="relative w-20 h-20 bg-black border border-white/5 group-hover:border-yellow-400/30 transition-colors overflow-hidden">
                                        <Image
                                            src={getImagePath(product.image)}
                                            alt={product.name}
                                            unoptimized={true}
                                            fill
                                            className="object-contain p-2"
                                            priority
                                        />
                                    </div>
                                </td>

                                {/* NOMBRE */}
                                <td className="whitespace-nowrap px-3 py-4">
                                    <p className="text-sm font-black italic uppercase text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                                        {product.name}
                                    </p>
                                    <p className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">ID: {product.id.toString().slice(0,8)}...</p>
                                </td>

                                {/* PRECIO */}
                                <td className="whitespace-nowrap px-3 py-4">
                                        <span className="text-sm font-mono font-bold text-zinc-300 bg-zinc-950 px-2 py-1 border border-white/5">
                                            {formatCurrency(product.price)}
                                        </span>
                                </td>

                                {/* STOCK */}
                                <td className="whitespace-nowrap px-3 py-4">
                                    {isAvailable(product.stock) ? (
                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-xs font-black text-zinc-400 font-mono">
                                                    {product.stock.toString().padStart(2, '0')} <span className="text-[10px] text-zinc-600">UNITS</span>
                                                </span>
                                        </div>
                                    ) : (
                                        <span className="px-3 py-1 bg-red-950/30 border border-red-500/50 text-red-500 text-[10px] font-black uppercase italic tracking-widest animate-pulse">
                                                Out_Of_Stock
                                            </span>
                                    )}
                                </td>

                                {/* ACCIONES */}
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right sm:pr-4">
                                    <div className='flex gap-4 justify-end items-center'>
                                        <Link
                                            id={`update-product${product.id}-link`}
                                            href={`/admin/products/${product.id}/edit`}
                                            className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                                        >
                                            <Edit3 className="w-3 h-3" />
                                            Editar
                                        </Link>

                                        <div className="w-[1px] h-4 bg-white/5" />

                                        <DeleteProduct productId={product.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}