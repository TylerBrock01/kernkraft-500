import {DeckCategoryResponseSchema} from "@/src/schema";
import DeckNav from "@/components/UI/DeckNav";

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

export default async function DeckBar(){
    const decks = await getDecks()
    return (
        <nav className=" flex flex-nowrap row gap-1 justify-center md:justify-end md:gap-2 items-center   capitalize p-1">
            {decks.map(deck => (
                <DeckNav key={deck.name+deck.id} deck={deck}/>
            ))}
        </nav>

    )
}