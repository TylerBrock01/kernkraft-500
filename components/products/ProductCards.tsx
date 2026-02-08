import {Product} from "@/src/schema";
import {formatCurrency, getImagePath, isAvalaible} from "@/src/utils";
import Image from "next/image";
import AddProductButton from "@/components/products/AddProductButton";

export default function ProductCard({product}: { product: Product}) {
    return (
        <div
            className='rounded bg-fondo3 shadow relative p-5'
        >
            <div className={`${!isAvalaible(product.stock)&& 'opacity-40'}`}>
                <Image
                    className={"bg-fondo2"}
                    src={getImagePath(product.image)}
                    alt={`imagen de ${product.name}`}
                    width={400}
                    height={600}
                    unoptimized={true}
                    priority={true}
                />
                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold ">{product.name}</h3>
                    <p className="">Size: {product.size}</p>
                    <p className="">stock: {product.stock}</p>
                    <p className="">Type: {product.deck.name}</p>
                    <p className="text-2xl font-extrabold  text-gray-900">{formatCurrency(product.price)}</p>
                </div>
            </div>
            {isAvalaible(product.stock) ? (
                <AddProductButton product={product}/>
            ):<p className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 bg-white opacity-60 w-full text-center py-5 text-2xl uppercase font-black"}>Agotado</p>}
        </div>
    )
}