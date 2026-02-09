import {CategoriesResponseSchema} from "@/src/schema";
import CategoryNav from "@/components/UI/CategoryNav";
import Link from "next/link";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`
    const req = await fetch(url)
    const json = await req.json()
    return CategoriesResponseSchema.parse(json)
}

export default async function CategoryBar(){
    const categories =await getCategories()

    return (
        <nav className=" flex flex-nowrap row gap-1 justify-center md:justify-end md:gap-2 items-center capitalize p-1">
            {categories.map(category => (
                <CategoryNav key={category.id} category={category}/>
            ))}
            <Link href={'/admin/sales'} className={'hidden rounded bg-green-400 font-bold py-1 text--600 '}>panel admin</Link>

        </nav>

    )
};