import {CategoriesResponseSchema} from "@/src/schema";
import Link from "next/link";
import DeckPage from "@/components/UI/DeckNav";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    return CategoriesResponseSchema.parse(json)
}

export default async function MainNav() {
    const categories =await getCategories()

    return (
        <div className="grid">
            <nav className="mt-3 flex flex-nowrap row gap-1 justify-center md:justify-end md:gap-2 items-center border-y border-fondo2 capitalize p-1">
                {categories.map(category => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className="text-white hover:text-black hover:underline hover:bg-fondo3 rounded-md  font-bold p-1">
                        {category.name}
                    </Link>
                ))}
                <Link href={'/admin/sales'} className={'hidden rounded bg-green-400 font-bold py-1 text--600 '}>panel admin</Link>
            </nav>
            <DeckPage/>
        </div>
    )
}