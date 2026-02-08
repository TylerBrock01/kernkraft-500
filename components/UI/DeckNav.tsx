import {redirect} from "next/navigation";
import { DeckCategoryResponseSchema} from "@/src/schema";
import ProductCardDemo from "@/components/products/ProductCardDemo";
import Link from "next/link";

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
        <div className='flex flex-nowrap items-center justify-end '>
            { decksCategory.map(deck =>
                <Link
                    key={deck.id}
                    href={`/categories/${deck.id}`}
                    className="text-white hover:text-black hover:underline hover:bg-fondo3 rounded-md  font-bold p-1">
                    {deck.name}
                </Link>
            )
            }
        </div>
    )
}