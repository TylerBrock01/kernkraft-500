import Link from "next/link";

export default function LastProducts() {

    return (
        <section className="py-20 px-4 md:px-8 bg-black">
            <h2 className="text-4xl font-bold text-center mb-10 text-white">
                Lo Más <span className="text-yellow-400">Vendido</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            </div>
            <div className="text-center mt-10">
                <Link href="/shop" className="text-white hover:text-yellow-400 border border-white hover:border-yellow-400 py-3 px-8 rounded-full transition duration-300">
                    Ver Tienda Completa
                </Link>
            </div>
        </section>
    );
}
