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
        <nav className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2">
            {categories.map((category) => (
                <CategoryNav key={category.id} category={category} />
            ))}
        </nav>
    )
};