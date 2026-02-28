import CategoryBar from "@/components/category/CategoryBar";
import DeckBar from "@/components/deck/DeckBar";

export default async function MainNav() {

    return (
        <>
            {/* CAPA 2: CategoryBar (Navegación de Catálogo) */}
            <div className="border-t border-white/5 bg-black/80 backdrop-blur-xl px-6 md:px-12">
                <div className="max-w-7xl mx-auto h-12 flex items-center overflow-x-auto no-scrollbar">
                    <CategoryBar />
                </div>
            </div>

            {/* CAPA 3: DeckBar (Filtros Rápidos de Hardware) */}
            <div className="bg-black/80 border-t border-white/5 px-6 md:px-12 h-10 flex items-center overflow-x-auto no-scrollbar">
                <div className="max-w-7xl mx-auto w-full">
                    <DeckBar />
                </div>
            </div>
        </>
    );
}