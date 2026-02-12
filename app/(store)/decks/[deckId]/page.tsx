import { DeckCategoryWithProductsResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";
import HeadingHighlight from "@/components/UI/HeadingHighlight";

type Params = Promise<{deckId: string}>;

async function getProducts(deckId: string) {
    const url = `${process.env.API_URL}/decks/${deckId}?products=true`
    const req = await fetch(url,{
        next:{
            tags:['products-by-category']
        }
    })
    const json = await req.json()
    if (!req.ok){
        redirect('/decks/1')
    }
    return DeckCategoryWithProductsResponseSchema.parse(json)
}
export default async function StorePage({params}: { params: Params}) {
    const {deckId} = await params
    const deck = await getProducts(deckId)
    return(
        <div className={"mt-2"}>
            <div className="bg-zinc-950/40 border-l-4 border-yellow-400 py-3 md:p-6 backdrop-blur-md">
                <div className="uppercase tracking-tighter leading-none">
                    <HeadingHighlight highlight="colección">
                        Nuestra
                    </HeadingHighlight>
                </div>

                {/* Subtítulo Dinámico (Categoría) */}
                <div className="flex items-center gap-3 mt-3 animate-fade-in-right">
                    <span className="h-[1px] w-8 bg-zinc-700"></span>
                    <h2 className="text-zinc-400 text-sm font-mono uppercase tracking-[0.2em]">
                        Línea de <span className="text-zinc-200 font-bold">{deck.name}</span>
                    </h2>
                </div>
            </div>
            <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black py-5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Tu Heading aquí */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                        {deck.products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}