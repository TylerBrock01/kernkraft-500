import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/layout/Hero";
import EngineFeatures from "@/components/layout/EngineFeatures";

export default function CazaLandingPage() {

    return (
        <>
            <Hero />
            <EngineFeatures/>
        </>
    );
}