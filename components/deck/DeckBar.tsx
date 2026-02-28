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
        <nav className="flex items-center gap-3 md:gap-4 overflow-x-auto no-scrollbar">
            {/* Etiqueta técnica para el DeckBar */}
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest border-r border-white/10 pr-4 mr-2 hidden md:block">
        Hardware / Type
      </span>
            {decks.map((deck) => (
                <DeckNav key={deck.id} deck={deck} />
            ))}
        </nav>

    )
}