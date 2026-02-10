import Image from "next/image";
import Link from "next/link";

export default function Hero(){
    return (
        <div className="relative mt-1 mx-1 grid bg-black ">
            <Image className=" object-cover opacity-50" src={"https://cdn.pixabay.com/photo/2019/02/22/12/31/fashion-4013456_1280.jpg"}
                   alt={"hero"}
                   width="2500"
                   height="2500"/>
            <div className="absolute mt-5 py-5 md:m-10 lg:m-40 md:p-5 text-center ">
                <h1 className="text-3xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">
                    Domina las <span className="text-yellow-400">Calles</span>
                </h1>
                <p className="mt-6  md:text-xl text-gray-300 max-w-2xl mx-auto font-medium">
                    Desde Street Boards hasta Longboards de descenso. Encuentra las mejores refacciones y tablas armadas con envíos a todo el país.
                </p>
                <div className="invisible md:visible mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={'/products'} className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-all hover:scale-105 uppercase tracking-wider">
                        Ver Catálogo
                    </Link>
                    <Link href={'/products'} className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-wider">
                        Refacciones
                    </Link>
                </div>
            </div>
        </div>
    )
}