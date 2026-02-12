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
            <div className={" bg-black/50"}>
                <HeadingHighlight highlight={"coleccion"}>Nuestra </HeadingHighlight>

                <h2 className={"text-zinc-200 mt-2 text-2xl p-1 animate-fade-in-right"}>{deck.name}:</h2>

            </div>
            <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black py-5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Tu Heading aquí */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                        {deck.products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}