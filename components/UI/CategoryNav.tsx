// components/UI/CategoryNav.tsx
'use client'
import { Category } from "@/src/schema";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/utils";

export default function CategoryNav({ category }: { category: Category }) {
    const pathname = usePathname();
    const isActive = pathname === `/categories/${category.id}`;

    return (
        <Link
            href={`/categories/${category.id}`}
            className={cn(
                "relative py-2 px-1 text-[11px] font-black italic uppercase tracking-[0.15em] transition-all duration-300 group",
                isActive
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-200"
            )}
        >
            {category.name}

            {/* Indicador Cyber: Línea de neón inferior */}
            <span className={cn(
                "absolute bottom-0 left-0 h-[2px] bg-yellow-400 transition-all duration-300 shadow-[0_0_10px_rgba(250,204,21,0.5)]",
                isActive ? "w-full" : "w-0 group-hover:w-1/2"
            )} />

            {/* Micro-glow en el texto cuando está activo */}
            {isActive && (
                <span className="absolute inset-0 bg-yellow-400/5 blur-md -z-10 rounded-full" />
            )}
        </Link>
    );
}