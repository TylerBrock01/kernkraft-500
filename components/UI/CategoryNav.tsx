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
                className={` ${isActive?'text-sm font-medium text-white underline underline-offset-8 decoration-yellow-400': 'text-sm font-medium text-zinc-400 hover:text-white transition-colors'}`}>
                {category.name}
            </Link>

        </>
    )
}