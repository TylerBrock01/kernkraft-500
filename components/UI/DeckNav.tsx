// components/UI/DeckNav.tsx
'use client'
import { Deck } from "@/src/schema";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/utils";

export default function DeckNav({ deck }: { deck: Deck }) {
    const pathname = usePathname();
    const isActive = pathname === `/decks/${deck.id}`;

    return (
        <Link
            href={`/decks/${deck.id}`}
            className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                isActive
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    : "bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white"
            )}
        >
            {deck.name}
        </Link>
    );
}