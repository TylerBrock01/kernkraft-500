import {redirect} from "next/navigation";
import { DeckCategoryResponseSchema} from "@/src/schema";
import Image from "next/image";

type Params = Promise<{ decks: string }>

async function getDecks(decks: string){
    const url = `${process.env.API_URL}/decks`
    const req = await fetch(url, {
        next:{
            tags:['products-by-category']
        }
    })
    const json = await req.json()
    if(!req.ok){
        redirect('/products')
    }
    return DeckCategoryResponseSchema.parse(json)
}
export default async function MainPage({params}:{params:Params}) {
    const {decks} = await params
    const decksCategory = await getDecks(decks)

    return (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
            { decksCategory.map(deck =>
                <div key={deck.id} className='col-span-6'>
                    <Image src={deck.image} alt={deck.name} width="400" height="400"/>
                    <h2 key={deck.id}>{deck.name}</h2>
                </div>
            )
            }
        </div>
    )
}