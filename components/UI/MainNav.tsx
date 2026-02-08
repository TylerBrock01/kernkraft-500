import {CategoriesResponseSchema, DeckCategoryResponseSchema} from "@/src/schema";
import Link from "next/link";
import CategoryNav from "@/components/UI/CategoryNav";
import DeckNav from "@/components/UI/DeckNav";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    return CategoriesResponseSchema.parse(json)
}

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

export default async function MainNav() {
    const categories =await getCategories()
    const decks = await getDecks()

    return (
        <div className="grid">
            <nav className="mt-3 flex flex-nowrap row gap-1 justify-center md:justify-end md:gap-2 items-center border-y border-fondo2 capitalize p-1">
                {categories.map(category => (
                    <CategoryNav key={category.id} category={category}/>
                ))}
                <Link href={'/admin/sales'} className={'hidden rounded bg-green-400 font-bold py-1 text--600 '}>panel admin</Link>
            </nav>
            <nav className=" flex flex-nowrap row gap-1 justify-center md:justify-end md:gap-2 items-center   capitalize p-1">
                {decks.map(deck => (
                    <DeckNav key={deck.name+deck.id} deck={deck}/>
                ))}
            </nav>
        </div>
    )
}