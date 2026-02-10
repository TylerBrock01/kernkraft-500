import Hero from "@/components/UI/Hero";
import LastProducts from "@/app/(store)/products/lastProducts/page";

export default function Home() {
    return(
        <div className={"grid gap-1"}>
            <Hero/>
            {/*<LastProducts/>*/}
        </div>
    )
}