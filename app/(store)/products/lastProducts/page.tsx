import Link from "next/link";
import LastProductPage from "@/app/(store)/products/[productId]/page";

export default function LastProducts() {

    return (
        <section className="grid">
            <h2 className="italic text-4xl font-bold text-center text-white bg-black/50 py-2">
                Nuevos <span className="text-yellow-400"> Productos</span>
            </h2>
            <div className="">
                <LastProductPage/>
            </div>
            <div className="text-center flex justify-center  p-3">
                <Link href="#" className="   text-white hover:text-yellow-400 border border-white hover:border-yellow-400 py-3 px-8 rounded-full transition duration-300">
                    Ver Tienda Completa
                </Link>
            </div>
        </section>
    );
}
