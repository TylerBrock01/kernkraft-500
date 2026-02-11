import CategoryBar from "@/components/category/CategoryBar";
import DeckBar from "@/components/deck/DeckBar";

export default async function MainNav() {

    return (
        <div className={"grid md:flex md:justify-between border-y border-y-amber-400/50"}>
            <div className="overflow-x-auto py-1 grid md:flex md:justify-between ">
                <CategoryBar/>
            </div>
            <div className="overflow-x-auto py-1 grid md:flex md:justify-between ">
                <DeckBar/>
            </div>
        </div>

    )
}