import CategoryBar from "@/components/category/CategoryBar";
import DeckBar from "@/components/deck/DeckBar";

export default async function MainNav() {

    return (
        <div className="my-1 grid md:flex md:justify-between border-y border-y-amber-400/50">
            <CategoryBar/>
            <DeckBar/>
        </div>
    )
}