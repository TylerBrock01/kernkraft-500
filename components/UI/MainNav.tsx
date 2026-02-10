import CategoryBar from "@/components/category/CategoryBar";
import DeckBar from "@/components/deck/DeckBar";

export default async function MainNav() {

    return (
        <>
            <div className="overflow-x-auto py-1 grid md:flex md:justify-between border-t border-y-amber-400/50">
                <CategoryBar/>
            </div>
            <div className="overflow-x-auto py-1 grid md:flex md:justify-between border-b border-y-amber-400/50">
                <DeckBar/>
            </div>
        </>

    )
}