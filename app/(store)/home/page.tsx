import Hero from "@/components/UI/Hero";
import LastProducts from "@/app/(store)/products/lastProducts/page";
import Footer from "@/components/UI/Footer";

export default function Home() {
    return(
        <div className={"grid"}>
            <Hero/>
            <LastProducts/>
        </div>
    )
}