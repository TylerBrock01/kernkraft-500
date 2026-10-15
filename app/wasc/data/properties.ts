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
    image: string;
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
        description: "Ideal para familias que buscan tranquilidad. Espacios abiertos, terraza techada para eventos, jardín masivo y acabados en madera natural."
    }
];