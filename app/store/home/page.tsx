import Hero from "@/components/layout/Hero";
import LastProducts from "@/app/(store)/products/lastProducts/page";
import MainNav from "@/components/UI/MainNav";

export default function Home() {
    return(
        <main className="flex flex-col min-h-screen">
            {/* El impacto visual */}
            <Hero />
            {/* La mercancía */}
            <section className=" md:px-10">
                <LastProducts />
            </section>
        </main>
    )
}