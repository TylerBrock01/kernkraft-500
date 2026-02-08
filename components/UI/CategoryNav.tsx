import {Category} from "@/src/schema";
import Link from "next/link";

export default function CategoryNav({category} :{category: Category}) {
    return (
        <>
            <Link
                key={category.name+category.id}
                href={`/categories/${category.id}`}
                className="text-white hover:text-black hover:underline hover:bg-fondo3 rounded-md  font-bold p-1">
                {category.name}
            </Link>
        </>
    )
}