import {redirect} from "next/navigation";
import { DeckCategoryResponseSchema} from "@/src/schema";
import ProductCardDemo from "@/components/products/ProductCardDemo";

async function getDecks(){
    const url = `${process.env.API_URL}/decks`;
    const req = await fetch(url, {
        next:{
            tags:['products-by-category']
        }
    })
    const json = await req.json()
    return DeckCategoryResponseSchema.parse(json)
}
export default async function DeckPage() {
    const decksCategory = await getDecks()

    return (
        <div className="bg-white p-2">
            <h2 className="text-2xl p-2 mb-2 border-l-10 border-fondo2 bg-fondo3 underline">Categories:</h2>
            <div className='grid grid-cols-3 gap-2 md:grid-cols-4 '>
                { decksCategory.map(deck =>
                    <ProductCardDemo deck={deck} key={deck.id}/>
                )
                }
            </div>
        </div>
    )
}