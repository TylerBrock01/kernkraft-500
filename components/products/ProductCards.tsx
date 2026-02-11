import {Product} from "@/src/schema";
import {formatCurrency, getImagePath, isAvalaible} from "@/src/utils";
import Image from "next/image";
import AddProductButton from "@/components/products/AddProductButton";

export default function ProductCard({product}: { product: Product}) {
    return (
        <div
            className='flex flex-col justify-between align-middle py-2 bg-zinc-900/60 border border-black rounded-2xl shadow text-white hover:bg-zinc-900/80 transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400 p-1 animate-fade-in-up'
        >
            <div className={`${!isAvalaible(product.stock)&& 'opacity-40'} `}>
                <Image
                    className={"bg-black rounded-2xl"}
                    src={'https://cdn.pixabay.com/photo/2014/04/02/16/29/skate-board-307418_1280.png'}
                    alt={`imagen de ${product.name}`}
                    width={400}
                    height={600}
                    unoptimized={true}
                    priority={true}
                />
                <div className="flex flex-col p-2 space-y-1  tracking-tight leading-snug transition-colors ">
                    <h3 className="text-xl font-bold  ">{product.name}</h3>
                    <div className={"grid grid-cols-2 gap-1 "}>
                        <p className="">Size: {product.size}</p>
                        <p className="">stock: {product.stock}</p>
                        <p className="col-span-2">Type: {product.deck!.name}</p>
                    </div>
                    <div className={"flex justify-center p-1"}>
                        <p className="text-xl font-black text-green-400">MXN: {formatCurrency(product.price)}</p>
                    </div>
                </div>
            </div>
            {isAvalaible(product.stock) ? (
                <AddProductButton product={product}/>
            ):<p className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white opacity-60 w-full text-center py-5 text-2xl uppercase font-black"}>Agotado</p>}
        </div>
    )
}