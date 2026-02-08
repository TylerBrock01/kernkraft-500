'use client'
import {Deck } from "@/src/schema";
import Link from "next/link";
import {usePathname} from "next/navigation";


export default async function DeckNav({deck}: {deck: Deck}) {
    const pathname = usePathname();
    const isActive = pathname === `/decks/${deck.id}`;

    return (
        <Link
            key={deck.id}
            href={`/decks/${deck.id}`}
            className={` hover:text-black hover:underline hover:bg-fondo3 rounded-md  font-bold p-1 ${isActive?'bg-fondo3 underline ': 'text-white'}`}>
            {deck.name}
        </Link>
    )
}