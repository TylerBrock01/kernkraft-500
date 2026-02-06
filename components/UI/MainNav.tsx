import Logo from "@/components/UI/Logo";
import {CategoriesResponseSchema} from "@/src/schema";
import Link from "next/link";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    return CategoriesResponseSchema.parse(json)
}

export default async function MainNav() {
    const categories =await getCategories()

    return (
        <header className="px-10 py-1 gap-1 bg-fondo1 grid">
            <Logo/>
            <nav className="flex flex-col justify-end md:flex-row gap-2 items-center mt-5 md:mt-0 border-t border-fondo2 capitalize">
                {categories.map(category => (
                    <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className="text-white hover:text-fondo2 hover:underline hover:bg-fondo3 rounded-md  font-bold p-2">

                        {category.name}
                    </Link>))}
                <Link href={'/admin/sales'} className={'hidden rounded bg-green-400 font-bold py-2 px-10 text-purple-600 '}>panel admin</Link>
            </nav>
        </header>
    )
}