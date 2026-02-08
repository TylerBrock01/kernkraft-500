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
        redirect('/')
    }
    console.log(json)
    return DeckCategoryWithProductsResponseSchema.parse(json)
}
export default async function StorePage({params}: { params: Params}) {
    const {deckId} = await params
    const deck = await getProducts(deckId)
    return(
        <div>
            <h2 className={" bg-fondo3 text-2xl p-1 border-l-5 border-fondo2"}>{deck.name}:</h2>
            <div className='p-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 bg-fondo2'>
                { deck.products?.map(product =>
                    // <ProductCard key={product.id} product={product}/>
                    <h2 key={product.id}>{product.name}</h2>
                )
                }
            </div>
        </div>
    )
}