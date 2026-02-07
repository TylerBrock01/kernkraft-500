import {Deck} from "@/src/schema";
import Image from "next/image";

export default function ProductCardDemo({deck}: { deck: Deck}) {
    return (
        <div key={deck.id} className='grid bg-fondo2 p-4 rounded-md'>
            <Image className={"rounded-md"} src={deck.image} alt={deck.name} width="300" height="900"/>
            <h2 className="flex justify-center text-white py-2" key={deck.id}>{deck.name}</h2>
        </div>
    )
}