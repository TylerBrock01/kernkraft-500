'use client';

import { useMemo, useState } from "react";
import { BUSINESS_SLUG, type PropertyTypeFilter as FilterType } from "./constants";
import { useCatalog } from "./_hooks/useCatalog";
import { filterProperties } from "./_utils/filterProperties";
import {PropertiesHeader} from "@/app/wasc/_components/PropertiesHeader";
import {PropertyTypeFilter} from "@/app/wasc/_components/PropertyTypeFilter";
import {PropertiesSkeleton} from "@/app/wasc/_components/PropertiesSkeleton";
import {PropertiesError} from "@/app/wasc/_components/PropertiesError";
import {PropertiesGrid} from "@/app/wasc/_components/PropertiesGrid";
import {PropertiesEmpty} from "@/app/wasc/_components/PropertiesEmpty";

export default function PropertiesPage() {
    const [selectedType, setSelectedType] = useState<FilterType>("Todos");
    const { properties, isLoading, error } = useCatalog(BUSINESS_SLUG);

    const filtered = useMemo(
        () => filterProperties(properties, selectedType),
        [properties, selectedType]
    );

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <PropertiesHeader />
            <PropertyTypeFilter selected={selectedType} onChange={setSelectedType} />

            {isLoading ? (
                <PropertiesSkeleton />
            ) : error ? (
                <PropertiesError message={error} />
            ) : filtered.length > 0 ? (
                <PropertiesGrid properties={filtered} />
            ) : (
                <PropertiesEmpty
                    selectedType={selectedType}
                    onReset={() => setSelectedType("Todos")}
                />
            )}
        </main>
    );
}