import type { Property } from "@/app/wasc/_lib/property";
import type { PropertyTypeFilter } from "../constants";
import {getPropertyMeta} from "@/app/wasc/properties/_utils/property";

export function filterProperties(
    properties: Property[],
    selectedType: PropertyTypeFilter
): Property[] {
    if (selectedType === "Todos") return properties;

    const target = selectedType.toLowerCase();
    return properties.filter(
        (item) => getPropertyMeta(item).propertyTypes?.toLowerCase() === target
    );
}