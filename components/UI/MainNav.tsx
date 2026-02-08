import CategoryBar from "@/components/category/CategoryBar";
import DeckBar from "@/components/deck/DeckBar";

export default async function MainNav() {

    return (
        <div className="grid">
            <CategoryBar/>
            <DeckBar/>
        </div>
    )
}