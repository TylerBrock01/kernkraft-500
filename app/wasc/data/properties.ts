// data/properties.ts
export const logoWasc='https://res.cloudinary.com/tyler-brock/image/upload/v1792034299/logo_wasc_3x_lx5snu.png'

export interface Property {
    id: string;
    title: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sqm: number;
    image: string; // Mantenemos la portada principal para vistas rápidas/tarjetas
    images: string[]; // Arreglo de fotos para la galería detallada
    description: string;
}

export const propertiesData: Property[] = [
    {
        id: "1",
        title: "Residencia Exclusiva en Zona Norte",
        price: "$4,500,000 MXN",
        location: "San Pedro, Zona Norte",
        bedrooms: 4,
        bathrooms: 4.5,
        sqm: 350,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Hermosa residencia con acabados de lujo, alberca privada, amplia estancia y cocina integral equipada. Ubicada en una de las zonas de mayor plusvalía."
    },
    {
        id: "2",
        title: "Departamento Moderno con Vista Panorámica",
        price: "$2,800,000 MXN",
        location: "Centro Financiero",
        bedrooms: 2,
        bathrooms: 2,
        sqm: 120,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Espectacular departamento vertical con ventanales de piso a techo, seguridad 24/7, amenidades exclusivas y excelente conectividad urbana."
    },
    {
        id: "3",
        title: "Casa Campestre con Amplio Jardín",
        price: "$3,900,000 MXN",
        location: "Suburbio Residencial",
        bedrooms: 3,
        bathrooms: 3,
        sqm: 450,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
        ],
        description: "Ideal para familias que buscan tranquilidad. Espacios abiertos, terraza techada para eventos, jardín masivo y acabados en madera natural."
    }
];