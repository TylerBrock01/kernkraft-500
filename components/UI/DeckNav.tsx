import {Deck } from "@/src/schema";
import Link from "next/link";

export default async function DeckNav({deck}: {deck: Deck}) {

    return (
        <Link
            key={deck.id}
            href={`/decks/${deck.id}`}
            className="text-white hover:text-black hover:underline hover:bg-fondo3 rounded-md  font-bold p-1">
            {deck.name}
        </Link>
    )
}