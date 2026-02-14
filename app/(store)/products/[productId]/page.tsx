import {ProductSchema} from "@/src/schema";
import {redirect} from "next/navigation";
import Image from "next/image";
import AddProductButton from "@/components/products/AddProductButton";
import {formatCurrency, getImagePath, isAvailable} from "@/src/utils";
import LastProductPage from "@/app/(store)/products/lastProducts/page";

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
export default async function ProductPage({params}: { params: Params}) {
    const {productId} = await params
    const product = await getProducts(productId)
    return(
        <div className="my-1 min-h-screen text-white">
            <h1 className="md:col-span-2 border-l-3 p-2 mx-auto max-w-7xl bg-black/45 border-amber-400 text-3xl md:text-5xl font-black italic uppercase leading-none ">
                {product.name}
            </h1>

            <div className=" p-5 bg-black max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                {/* Columna Izquierda: Imagen Grande */}
                <div className=" relative  aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-white/5">
                    <Image
                        src={`${getImagePath(product.image)}`}
                        alt={product.name}
                        fill
                        className="object-contain p-1" // 'contain' para que la tabla se vea completa
                        priority
                    />
                </div>

                {/* Columna Derecha: Información y Compra */}
                <div className="flex flex-col justify-center">
                    <span className="text-yellow-400 font-black uppercase tracking-[0.3em] text-xs mb-2">
                        Tipo: {product.deck?.name}
                    </span>

                    <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-xl">
                        Modelo: {product.category?.name || "Esta tabla de skate de alto rendimiento está fabricada con 7 capas de arce canadiense, ideal para dominar cualquier spot urbano o park."}
                    </p>

                    {/* Specs Técnicas */}
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="bg-zinc-900/90 p-4 rounded-2xl border border-white/5">
                            <p className="text-zinc-500 text-xs uppercase font-bold">Medida</p>
                            <p className="text-xl font-bold">{product.size}"</p>
                        </div>
                        <div className="bg-zinc-900/90 p-4 rounded-2xl border border-white/5">
                            <p className="text-zinc-500 text-xs uppercase font-bold">Color</p>
                            <p className="text-xl font-bold">{product.color}</p>
                        </div>
                    </div>

                    <div className="mt-10 p-8 rounded-3xl border border-white/5 bg-zinc-900/90 backdrop-blur-sm">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex flex-col">
                                <span className="text-zinc-500 text-xs uppercase font-black tracking-widest mb-1">Precio Final</span>
                                <span className={`text-5xl font-black italic tracking-tighter ${!isAvailable(product.stock) ? 'text-zinc-700 line-through' : 'text-white'}`}>
                                    {formatCurrency(product.price)}
                                </span>
                            </div>

                            {/* Condicional para el Botón o Mensaje de Agotado */}
                            {isAvailable(product.stock) ? (
                                // <AddProductButton product={product} />
                                <p className="text-yellow-400 text-sm font-bold uppercase border-b border-yellow-400/30 hover:border-yellow-400 transition-all">
                                    disponible en stock
                                </p>
                            ) : (
                                <div className="flex flex-col items-end">
                                    <span className="bg-red-600 text-white px-6 py-3 rounded-xl font-black uppercase italic -rotate-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                                      Sold Out
                                    </span>
                                    <p className="text-[10px] text-zinc-500 mt-2 uppercase font-bold tracking-tighter">
                                        Próxima reposición: Pronto
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Mensaje extra si no hay stock */}
                        {!isAvailable(product.stock) && (
                            <div className="mt-6 pt-6 border-t border-white/5">
                                <p className="text-zinc-400 text-sm italic">
                                    "Este modelo voló de las calles. Déjanos tu correo y te avisamos en cuanto aterrice el próximo embarque."
                                </p>
                                <button className="mt-4 text-yellow-400 text-sm font-bold uppercase border-b border-yellow-400/30 hover:border-yellow-400 transition-all">
                                    Notificarme disponibilidad
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <LastProductPage/>
        </div>
    )
}