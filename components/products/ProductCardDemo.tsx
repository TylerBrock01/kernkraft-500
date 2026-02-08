import {Deck} from "@/src/schema";
import Image from "next/image";

export default function ProductCardDemo({deck}: { deck: Deck}) {
    return (
        <div key={deck.id} className='flex flex-col bg-fondo2 justify-center rounded-md p-2 animate-zoom-in'>
            <Image className={` rounded-md`} src={deck.image} alt={deck.name} width="100" height="100"/>
            <h2 className=" text-white underline " key={deck.id}>Go to {deck.name}</h2>
        </div>
    )
}