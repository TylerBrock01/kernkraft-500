import { DeckCategoryWithProductsResponseSchema} from "@/src/schema";
import ProductCard from "@/components/products/ProductCards";
import {redirect} from "next/navigation";

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
        <div className={""}>
            <div className={""}>
                <h2 className=" p-1 text-3xl font-black text-white uppercase italic animate-fade-in-right">
                    Nuestra <span className="text-yellow-400">Colección</span>
                </h2>
                <h2 className={"text-zinc-400 mt-2 text-2xl p-1 animate-fade-in-right"}>{deck.name}:</h2>

            </div>
            <div className='bg-fondo3/20 p-2 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-5 '>
                { deck.products?.map(product =>
                    <ProductCard key={product.id} product={product}/>
                )
                }
            </div>
        </div>
    )
}