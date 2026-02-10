import Link from "next/link";
import LastProductPage from "@/app/(store)/products/[productId]/page";



export default function LastProducts() {

    return (
        <section className="">
            <h2 className="text-4xl font-bold text-center text-white bg-black/50 p-2">
                Nuevos <span className="text-yellow-400"> Productos</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  px-2">
                <LastProductPage/>
            </div>
            <div className="text-center mt-10">
                <Link href="#" className="text-white hover:text-yellow-400 border border-white hover:border-yellow-400 py-3 px-8 rounded-full transition duration-300">
                    Ver Tienda Completa
                </Link>
            </div>
        </section>
    );
}
