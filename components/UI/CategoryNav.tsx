'use client'
import {Category} from "@/src/schema";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function CategoryNav({category} :{category: Category}) {
    const pathname = usePathname();
    const isActive = pathname === `/categories/${category.id}`;
    return (
        <>
            <Link
                key={category.name+category.id}
                href={`/categories/${category.id}`}
                className={` hover:text-black hover:underline hover:bg-fondo3 rounded-md  font-bold p-1 ${isActive?'bg-fondo3 underline ': 'text-white'}`}>
                {category.name}
            </Link>
        </>
    )
}