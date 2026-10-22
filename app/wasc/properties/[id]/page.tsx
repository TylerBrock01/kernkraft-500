import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/app/wasc/_services/catalog.service";
import { buildWhatsappUrl } from "@/app/wasc/_lib/whatsapp";
import { routes } from "@/app/wasc/_lib/routes";
import PropertyGallery from "@/app/wasc/_components/PropertyGallery";
import { PropertyHeader } from "./_components/PropertyHeader";
import { PropertyStats } from "./_components/PropertyStats";
import { PropertyDescription } from "./_components/PropertyDescription";
import { PropertyActions } from "./_components/PropertyActions";
import {getGalleryImages} from "@/app/wasc/_lib/property";
import {getPropertyMeta} from "@/app/wasc/properties/_utils/property";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const property = await getProduct(id);

    if (!property) return { title: "Propiedad no encontrada" };

    return {
        title: `${property.name} | WASC`,
        description: property.description?.slice(0, 160),
    };
}

export default async function PropertyDetailPage({ params }: Props) {
    const { id } = await params;
    const property = await getProduct(id);

    if (!property) notFound();

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
            <Link
                href={routes.properties}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-red-500 transition-colors mb-6 group"
            >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                Volver al catálogo
            </Link>

            <article className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden p-6 md:p-8 space-y-8">
                <PropertyGallery images={getGalleryImages(property)} title={property.name} />
                <PropertyHeader property={property} />
                <PropertyStats meta={getPropertyMeta(property)} />
                <PropertyDescription text={property.description} />
                <PropertyActions whatsappUrl={buildWhatsappUrl(property)} />
            </article>
        </main>
    );
}