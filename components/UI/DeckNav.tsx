import {Deck, } from "@/src/schema";
import Link from "next/link";

export default async function DeckPage({Deck}: {Deck: Deck}) {

    return (
        <Link
            key={Deck.id}
            href={`/categories/${Deck.id}`}
            className="text-white hover:text-black hover:underline hover:bg-fondo3 rounded-md  font-bold p-1">
            {Deck.name}
        </Link>
    )
}