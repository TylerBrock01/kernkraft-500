import {Deck} from "@/src/schema";
import Image from "next/image";
import Link from "next/link";

export default function ProductCardDemo({deck}: { deck: Deck}) {
    return (
        <Link href={`/decks/${deck.id}`} key={deck.id} className='flex flex-col bg-fondo2 justify-center rounded-md p-2 animate-zoom-in'>
            <h2 className=" text-white underline " key={deck.id}>Go to {deck.name}</h2>
        </Link>
    )
}