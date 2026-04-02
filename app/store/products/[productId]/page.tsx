import {ProductSchema} from "@/src/schema";
import {redirect} from "next/navigation";
import Image from "next/image";
import AddProductButton from "@/components/products/AddProductButton";
import {formatCurrency, getImagePath, isAvailable} from "@/src/utils";
import LastProductPage from "@/app/(store)/products/lastProducts/page";
import {cookies} from "next/headers";

type Params = Promise<{productId: string}>;

async function getProducts(productId: string) {
    const url = `${process.env.API_URL}/products/${productId}`
    const req = await fetch(url,{
        next:{
            tags:['products-by-category']
        }
    })
    const json = await req.json()
    if (!req.ok){
        redirect('/')
    }
    return ProductSchema.parse(json)
}

import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default async function ProductPage({ params }: { params: Params }) {
    const { productId } = await params;
    const product = await getProducts(productId);
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.has('skate_token');

    return (
        <div className="min-h-screen text-white bg-black">
            {/* Header de Producto: Estilo Brutalista */}
            <div className="w-full bg-zinc-950/80 border-b border-white/5  md:py-12 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-5">
                    <p className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4">
                        Equipment / {product.deck?.name || "Hardware"}
                    </p>
                    <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight max-w-4xl">
                        {product.name}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-5 grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">

                {/* COLUMNA IZQUIERDA (7/12): Media Display */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="relative aspect-square bg-zinc-900/50 rounded-3xl overflow-hidden border border-white/10 group">
                        <Image
                            src={getImagePath(product.image)}
                            alt={product.name}
                            fill
                            className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                            priority
                        />
                        {/* Glow decorativo de fondo */}
                        <div className="absolute inset-0 bg-yellow-400/5 blur-[100px] -z-10" />
                    </div>
                </div>

                {/* COLUMNA DERECHA (5/12): Panel de Control de Compra */}
                <div className="lg:col-span-5 flex flex-col gap-8">

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="bg-zinc-800 text-zinc-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/5">
                                Ref: {product.id.toString().padStart(5, '0')}
                            </span>
                            {isAvailable(product.stock) && (
                                <span className="text-green-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                    In Stock
                                </span>
                            )}
                        </div>

                        <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                            {product.category?.name
                                ? `Explora lo mejor de nuestra categoría ${product.category.name}.`
                                : "Hardware de alta gama diseñado para soportar impactos de alto nivel en concreto y metal."}
                        </p>
                    </div>

                    {/* Specs Técnicas: Estilo Grid Industrial */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900/40 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-1">Medida</p>
                            <p className="text-2xl font-black italic">{product.size}"</p>
                        </div>
                        <div className="bg-zinc-900/40 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest mb-1">Acabado</p>
                            <p className="text-2xl font-black italic">{product.color}</p>
                        </div>
                    </div>

                    {/* Caja de Acción de Compra */}
                    <div className="p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl relative overflow-hidden">
                        <div className="flex flex-col gap-6 relative z-10">
                            <div>
                                <span className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em] mb-2 block">Price Tag</span>
                                <span className={`text-6xl font-black italic tracking-tighter ${!isAvailable(product.stock) ? 'text-zinc-800 line-through' : 'text-yellow-400'}`}>
                                    {formatCurrency(product.price)}
                                </span>
                            </div>

                            {isAvailable(product.stock) ? (
                                isAuthenticated ? (
                                    <AddProductButton product={product} />
                                ) : (
                                    <div className="space-y-4">
                                        <p className="text-zinc-500 text-xs italic">Inicia sesión para armar tu carrito.</p>
                                        <button className="w-full py-4 bg-white text-black font-black uppercase tracking-tighter rounded-full hover:bg-yellow-400 transition-all">
                                            Log In to Shop
                                        </button>
                                    </div>
                                )
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-red-600/10 border border-red-600/20 p-4 rounded-xl text-center">
                                        <p className="text-red-500 font-black uppercase italic tracking-tighter">Agotado Temporalmente</p>
                                    </div>
                                    <button className="w-full py-4 border border-white/10 text-white font-black uppercase tracking-tighter rounded-full hover:bg-white hover:text-black transition-all">
                                        Notificarme
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Trust Badges (Estilo Shein/E-commerce Pro) */}
                    <div className="grid grid-cols-3 gap-2 py-6 border-t border-white/5">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Truck className="w-4 h-4 text-zinc-600" />
                            <span className="text-[8px] font-bold uppercase text-zinc-500 tracking-tighter">Fast Ship</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-zinc-600" />
                            <span className="text-[8px] font-bold uppercase text-zinc-500 tracking-tighter">Original Gear</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <RotateCcw className="w-4 h-4 text-zinc-600" />
                            <span className="text-[8px] font-bold uppercase text-zinc-500 tracking-tighter">Easy Return</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de productos relacionados */}
            <div className=" border-t border-white/5">
                <div className="max-w-7xl mx-auto px-5">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                        También te <span className="text-yellow-400">interesa</span>
                    </h2>
                </div>
                <LastProductPage />
            </div>
        </div>
    );
}