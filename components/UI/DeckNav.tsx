'use client'
import {Deck } from "@/src/schema";
import Link from "next/link";
import {usePathname} from "next/navigation";


export default function DeckNav({deck}: {deck: Deck}) {
    const pathname = usePathname();
    const isActive = pathname === `/decks/${deck.id}`;

    return (
        <Link
            key={deck.name+deck.id}
            href={`/decks/${deck.id}`}
            className={` ${isActive?'text-sm font-medium text-white underline underline-offset-8 decoration-yellow-400': 'text-sm font-medium text-zinc-400 hover:text-white transition-colors'}`}>
            {deck.name}
        </Link>
    )
}