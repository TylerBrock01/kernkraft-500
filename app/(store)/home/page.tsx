import {redirect} from "next/navigation";
import Hero from "@/components/UI/Hero";
import DeckPage from "@/components/UI/DeckNav";

export default function Home() {
    return(
        <div className={"grid"}>
            <Hero/>
            <DeckPage/>
        </div>
    )
}